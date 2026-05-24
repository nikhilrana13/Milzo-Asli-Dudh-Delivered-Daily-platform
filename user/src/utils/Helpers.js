import slugify from "slugify"
export const capitalizeWords = (str = "") => {
  return str
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const formatDistance = (distance) => {
   if (distance < 1) {
      return `${Math.round(distance * 1000)} m away`
   }
   return `${distance.toFixed(1)} km away`
}

export const generateSlug = (text) => slugify(text || "", { lower: true, strict: true })

//  Format a number using the Indian numbering system (e.g. 154000 -> "1,54,000").
export function formatIndianNumber(value) {
  if (value === null || value === undefined || value === "") return "0";
  const num = typeof value === "number" ? value : parseFloat(value);
  if (isNaN(num)) return "0";
  // convert to string without decimals
  const [integer, decimal] = num.toString().split(".");
  let lastThree = integer.slice(-3);
  const otherDigits = integer.slice(0, -3);
  if (otherDigits !== "") {
    lastThree = "," + lastThree;
  }
  const formattedOther = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return formattedOther + lastThree + (decimal ? "." + decimal : "");
}