export const GetLastUpdatedText = (lastUpdated) => {
  const diff = Math.floor((Date.now() - lastUpdated.getTime()) / 1000);
  if (diff < 60) return "Updated just now";
  if (diff < 3600) return `Updated ${Math.floor(diff / 60)}m ago`;
  return `Updated ${Math.floor(diff / 3600)}h ago`;
};