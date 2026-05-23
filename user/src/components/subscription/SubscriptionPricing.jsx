import PricingRow from "./PricingRow";





const SubscriptionPricing = ({dailyAmount,totalDays,quantity,subtotalAmount,discountAmount,finalAmount}) => {

   return (
      <div className="border-t border-[#eef0f2] pt-6 space-y-4 mb-8">
         <PricingRow
            label="Daily Amount"
            value={`₹${dailyAmount}`}
         />
         <PricingRow
            label="Total Days"
            value={`${totalDays} Days`}
         />
         <PricingRow
            label="Quantity"
            value={quantity}
         />
         <PricingRow
            label="Subtotal"
            value={`₹${subtotalAmount}`}
         />
         {
            discountAmount > 0 && (
               <PricingRow
                  label="Offer Discount"
                  value={`-₹${discountAmount}`}
                  green
               />
            )
         }
         <div className="flex items-center justify-between pt-3 border-t border-dashed">
            <span className="text-xl font-black">
               Final Total
            </span>
            <span className="text-3xl font-black text-[#16a34a]">
               ₹{finalAmount}
            </span>
         </div>
      </div>
   )
}


export default SubscriptionPricing;