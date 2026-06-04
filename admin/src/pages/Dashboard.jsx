import QuickActions from '@/components/dashboard/QuickActions';
import StatCardShimmer from '@/components/dashboard/StatCardShimmer';
import StatsCard from '@/components/dashboard/StatsCard';
import WelcomeHeader from '@/components/dashboard/WelcomeHeader';
import { useGetDashboardStatsQuery } from '@/redux/api/StatsApi';
import React from 'react';
import { IoPeopleSharp } from 'react-icons/io5';
import { MdCampaign, MdPendingActions } from 'react-icons/md';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const user = useSelector((state) => state.Auth.user)
  const statsQuery = useGetDashboardStatsQuery()
  const stats = statsQuery?.data?.data?.stats || {}

  const statsData = [
    {
      icon: IoPeopleSharp,
      label: "Total Vendors",
      value: statsQuery.isError ? "--" : stats?.totalVendors ?? 0,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: MdPendingActions,
      label: "Pending Vendors",
      value: statsQuery.isError ? "--" : stats?.pendingVendors ?? 0,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: RiVerifiedBadgeFill,
      label: "Approved Vendors ",
      value: statsQuery.isError ? "--" : stats?.approvedVendors ?? 0,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: MdCampaign,
      label: "Total Campaigns ",
      value: statsQuery.isError ? "--" : stats?.totalCampaigns ?? 0,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },

  ];


  return (
    <div className='w-full p-5 flex flex-col gap-8 '>
      {/* welcome header  */}
      <WelcomeHeader username={user?.username} />
      {/* stats card */}
      {statsQuery?.isLoading ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6'>
          {Array(4).fill(0).map((_, i) => <StatCardShimmer key={i} />)}
        </div>
      ) : statsQuery?.isError ? (
        <p className="text-red-500 text-center">Failed to load stats</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6'>
          {statsData.map((stat, i) => <StatsCard key={i} {...stat} />)}
        </div>
      )
      }
      {/* quick buttons */}
      <QuickActions />
    </div>
  );
}

export default Dashboard;
