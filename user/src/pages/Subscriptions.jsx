import EmptySubscriptions from '@/components/subscription/EmptySubscriptions';
import SubscriptionCard from '@/components/subscription/SubscriptionCard';
import SubscriptionCardShimmer from '@/components/subscription/SubscriptionCardShimmer';
import { useGetMySubscriptionsQuery } from '@/redux/api/SubscriptionsApi';
import React from 'react';


const Subscriptions = () => {
  const SubsQuery = useGetMySubscriptionsQuery()
  const mysubs = SubsQuery?.data?.data?.subscriptions || []


  // console.log("mysubs",mysubs)
  return (
    <div className="w-full max-w-7xl  py-5 mx-auto px-5 sm:px-6">
      {
        SubsQuery?.isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {[1,2,3,4].map((_,i)=>{
              return (
                <SubscriptionCardShimmer key={i} />
              )
            })}
          </div>
        ):mysubs?.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {mysubs?.map((sub)=>{
              return (
                <SubscriptionCard key={sub?._id} subscription={sub}  />
              )
            })}
          </div>
        ):(
          <div className="flex items-center justify-center">
              <EmptySubscriptions />
          </div>
        )
      }
    </div>
  );
}

export default Subscriptions;
