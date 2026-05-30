import EmptySubscriptions from '@/components/subscription/EmptySubscriptions';
import SubscriptionCard from '@/components/subscription/SubscriptionCard';
import SubscriptionCardShimmer from '@/components/subscription/SubscriptionCardShimmer';
import SubsisErrorState from '@/components/subscription/SubsisErrorState';
import { useGetMySubscriptionsQuery } from '@/redux/api/SubscriptionsApi';
import React, { useEffect, useRef, useState } from 'react';


const Subscriptions = () => {
  const [page, setPage] = useState(1)
  const SubsQuery = useGetMySubscriptionsQuery({
    page: page,
    limit: 6,
  }, {
    refetchOnMountOrArgChange: true,
  }
  )
  const mysubs = SubsQuery?.data?.data?.subscriptions ?? []
  const loaderRef = useRef(null)
  const pagination = SubsQuery?.data?.data?.pagination ?? {}
  const [allSubs, setAllSubs] = useState([])
  // prevent multiple observer triggers
  const fetchingRef = useRef(false)

  // sync fetching state with ref
  useEffect(() => {
    fetchingRef.current = SubsQuery.isFetching
  }, [SubsQuery.isFetching])
  // append new subscriptions while avoiding duplicates
  // first page  replace old data with latest subscriptions
  // next pages  append only unique subscriptions avoid duplicates
  useEffect(() => {
    if (page === 1) {
      setAllSubs((prev) => {
        // prevent unnecessary state updates
        if (prev.length === mysubs.length && prev.every((s, i) => s._id === mysubs[i]?._id)) {
          return prev;
        }
        return mysubs;
      });
      return;
    }
    // append unique subscriptions for next pages
    if (mysubs?.length > 0) {
      setAllSubs((prev) => {
        const existingIds = new Set(prev.map((s) => s._id))
        const newSubs = mysubs?.filter(
          (s) => !existingIds.has(s._id)
        )
        return newSubs.length ? [...prev, ...newSubs] : prev;
      })
    }
  }, [mysubs, page])
  const isFetchingMore = SubsQuery?.isFetching && page > 1
  // infinite scroll intersection observer
  useEffect(() => {
    // stop observer if: loader missing loading error  no subscriptions
    if (!loaderRef.current || SubsQuery?.isLoading || SubsQuery?.isError || allSubs.length === 0) return
    const observer = new IntersectionObserver((entries) => {
      const first = entries[0]
      if (first.isIntersecting && pagination?.currentPage < pagination?.totalPages && !SubsQuery.isFetching && !fetchingRef.current) {
        // lock fetching to prevent multiple triggers
        fetchingRef.current = true;
        //  console.log("Current Page:", pagination?.currentPage);
        //  console.log("Loading Next Page:",pagination?.currentPage + 1);
        setPage((prev) => prev + 1)
      }
    },
      {
        threshold: 0.3,
        rootMargin: "100px"
      })
    const currentLoader = loaderRef.current
    if (currentLoader) {
      observer.observe(currentLoader)
    }
    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader)
      }
    }
  }, [pagination?.currentPage, pagination?.totalPages, SubsQuery?.isLoading, SubsQuery?.isError, allSubs?.length])
  const isInitialLoading =   (SubsQuery.isLoading || SubsQuery.isFetching) && page === 1 && allSubs.length === 0;
   // show empty state only after first page data loads successfully 
  // prevents empty state flash while subscriptions are being synced to local state
  const showEmptyState =   SubsQuery?.isSuccess && page === 1 && mysubs.length === 0 && allSubs.length === 0;

  return (
    <div className="w-full max-w-7xl  py-5 mx-auto px-5 sm:px-6">
      {
        isInitialLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {[1, 2, 3, 4].map((_, i) => {
              return (
                <SubscriptionCardShimmer key={i} />
              )
            })}
          </div>
        ) : SubsQuery?.isError ? (
          <SubsisErrorState onIsError={() => SubsQuery?.refetch()} />
        ) : allSubs?.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {allSubs?.map((sub) => {
              return (
                <SubscriptionCard key={sub?._id} subscription={sub} />
              )
            })}
          </div>
        ) : showEmptyState ? (
          <div className="flex items-center justify-center">
            <EmptySubscriptions />
          </div>
        ):null
      }
      {/* infinite scroll loader */}
      {allSubs?.length > 0 && (
        <div ref={loaderRef} className="h-20 flex items-center justify-center">
          {isFetchingMore &&
            pagination?.currentPage < pagination?.totalPages && (
              <div className="h-10 w-10 rounded-full border-4 border-[#dcfce7] border-t-[#16a34a] animate-spin" />
            )}
        </div>
      )}
    </div>
  );
}

export default Subscriptions;

