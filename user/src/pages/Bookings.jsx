import BookingCard from '@/components/booking/BookingCard';
import BookingCardShimmer from '@/components/booking/BookingCardShimmer';
import BookingEmptyState from '@/components/booking/BookingEmptyState';
import BookingErrorState from '@/components/booking/BookingErrorState';
import { useGetUserAllBookingsQuery } from '@/redux/api/BookingApi';
import React, { useEffect, useRef, useState } from 'react';

const Bookings = () => {
  const [page, setPage] = useState(1)
  const loaderRef = useRef(null)
  const BookingQuery = useGetUserAllBookingsQuery({
    page: page,
    limit: 6
  }, {
    refetchOnMountOrArgChange: true
  })
  const mybookings = BookingQuery?.data?.data?.bookings ?? []
  const pagination = BookingQuery?.data?.data?.pagination ?? {}
  const [allbookings, setAllBookings] = useState([])
  // prevent multiple observer triggers
  const fetchingRef = useRef(false)

  // sync fetching state with ref
  useEffect(() => {
    fetchingRef.current = BookingQuery.isFetching
  }, [BookingQuery.isFetching])
  // append new Bookings while avoiding duplicates
   // first page  replace old data with latest bookings
  // next pages  append only unique bookings avoid duplicates
  useEffect(() => {
    if (page === 1) {
      setAllBookings((prev) => {
         // prevent unnecessary state updates
        if (prev.length === mybookings.length && prev.every((b, i) => b._id === mybookings[i]?._id)) {
          return prev;
        }
        return mybookings;
      });
      return;
    }
    // append unique bookings  for next pages
    if (mybookings?.length > 0) {
      setAllBookings((prev) => {
        const existingIds = new Set(prev.map((b) => b._id))
        const newBookings = mybookings?.filter(
          (b) => !existingIds.has(b._id)
        )
        return newBookings.length ? [...prev, ...newBookings] : prev;
      })
    }
  }, [mybookings, page])
  const isFetchingMore = BookingQuery?.isFetching && page > 1
  // infinite scroll intersection observer
  useEffect(() => {
    // stop observer if: loader missing loading error  no bookings
    if (!loaderRef.current || BookingQuery?.isLoading || BookingQuery?.isError || allbookings.length === 0) return
    const observer = new IntersectionObserver((entries) => {
      const first = entries[0]
      if (first.isIntersecting && pagination?.currentPage < pagination?.totalPages && !BookingQuery.isFetching && !fetchingRef.current) {
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
  }, [pagination?.currentPage, pagination?.totalPages, BookingQuery?.isLoading, BookingQuery?.isError, allbookings?.length])
  const isInitialLoading =   (BookingQuery.isLoading || BookingQuery.isFetching) && page === 1 && allbookings.length === 0;
  // show empty state only after first page data loads successfully 
  // prevents empty state flash while bookings are being synced to local state
  const showEmptyState =   BookingQuery?.isSuccess && page === 1 && mybookings.length === 0 && allbookings.length === 0;

  return (
    <div className="w-full max-w-7xl  py-5 mx-auto px-5 sm:px-6">
      {isInitialLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {[1, 2, 3, 4].map((_, i) => {
            return (
              <BookingCardShimmer key={i} />
            )
          })}
        </div>
      ) : BookingQuery?.isError ? (
        <BookingErrorState onRetry={() => BookingQuery?.refetch()} />
      ) : allbookings?.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {allbookings?.map((booking) => {
            return (
              <BookingCard key={booking?._id} booking={booking} />
            )
          })}
        </div>
      ) : showEmptyState ? (
        <div className="flex items-center justify-center">
          <BookingEmptyState />
        </div>
      ):null
      }
      {/* infinite scroll loader */}
      {allbookings?.length > 0 && (
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

export default Bookings;
