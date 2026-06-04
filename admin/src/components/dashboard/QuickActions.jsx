import { MdStorefront, MdCampaign, MdPeople } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Manage Vendors",
      description: "Review, approve or reject vendor requests",
      icon: <MdStorefront className="text-3xl" />,
      onClick: () => navigate("/admin/vendors"),
      gradient: "from-emerald-500 to-green-600",
    },
    {
      title: "Create Campaign",
      description: "Launch offers and promotions for vendors",
      icon: <MdCampaign className="text-3xl" />,
      onClick: () => navigate("/admin/campaigns"),
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      title: "View Campaigns",
      description: "Monitor and manage active campaigns",
      icon: <MdPeople className="text-3xl" />,
      onClick: () => navigate("/admin/campaigns"),
      gradient: "from-orange-500 to-amber-600",
    },
  ];

  return (
    <div className="">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-900">
          Quick Actions
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Frequently used admin actions
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="group relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-6 text-left shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* background glow */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
            />
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.gradient} text-white flex items-center justify-center shadow-lg`}
            >
              {action.icon}
            </div>
            <h3 className="mt-5 text-lg font-bold text-slate-900">
              {action.title}
            </h3>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              {action.description}
            </p>
            <div className="mt-5 flex items-center text-sm font-semibold text-emerald-600">
              Open →
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;