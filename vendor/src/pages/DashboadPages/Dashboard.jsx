import RevenueChartSkeleton from '@/components/dashboardcomponents/RevenueChartSkeleton';
import RevenueOverviewChart from '@/components/dashboardcomponents/RevenueOverviewChart';
import StatsCard from '@/components/dashboardcomponents/StatsCard';
import StatCardShimmer from '@/components/dashboardcomponents/StatsCardShimmer';
import WelcomeHeader from '@/components/dashboardcomponents/WelcomeHeader';
import { useGetDashboardStatsQuery } from '@/redux/api/DashboardStatsApi';
import { useGetRevenueOverviewQuery } from '@/redux/api/RevenueOverviewApi';
import { formatIndianNumber } from '@/utils/Helpers';
import { MdCalendarMonth, MdGroups, MdLocalShipping, MdPayments, MdPendingActions } from 'react-icons/md';
import { useSelector } from 'react-redux';



const Dashboard = () => {
  const user = useSelector((state)=>state.Auth.user)
  const statsQuery = useGetDashboardStatsQuery()
  const revenueQuery = useGetRevenueOverviewQuery()

  const stats = statsQuery?.data?.data?.stats || {}
  const monthlyRevenue = revenueQuery?.data?.data?.monthlyRevenue
  const growth = revenueQuery?.data?.data?.growth ?? 0

  const statsData = [
    {
      icon: MdCalendarMonth,
      label: "Active Subscriptions",
      value: statsQuery.isError ? "--" : stats?.activeSubscriptions ?? 0,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: MdPayments,
      label: "Monthly Revenue",
      value: ` ₹ ${stats?.monthlyRevenue ? formatIndianNumber(stats?.monthlyRevenue) : 0}`,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      icon: MdPendingActions ,
      label: "Pending Bookings",
      value: statsQuery.isError ? "--" : stats?.pendingBooking ?? 0,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: MdGroups,
      label: "Total Customers",
      value: statsQuery.isError ? "--" : stats?.totalCustomers ?? 0,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },

  ];

  return (
    <div className='w-full p-5 flex flex-col gap-5 '>
         <WelcomeHeader name={user?.displayName || "User"} />
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
      {/* graphs */}
      {
        revenueQuery?.isLoading ? (
          <RevenueChartSkeleton />
        ) : revenueQuery.isError ? (
          <p className="text-red-500 text-center">Failed to load revenue</p>
        ) : (
          <RevenueOverviewChart
            monthlyRevenue={monthlyRevenue}
            growth={growth}
          />
        )
      }
    </div>
  );
}

export default Dashboard;
