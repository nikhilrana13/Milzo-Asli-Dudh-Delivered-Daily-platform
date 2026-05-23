



const PricingRow = ({ label, value, green }) => {

   return (
      <div className={`flex items-center justify-between text-sm
         ${green ? "text-[#16a34a] font-semibold" : "text-gray-500"}
      `}>
         <span>{label}</span>
         <span>{value}</span>
      </div>
   )
}

export default PricingRow;