
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