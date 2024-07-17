export const truncateAfterDomain = (url) => {
  if (!url) return "";
  const urlObj = new URL(url);
  return urlObj.hostname;
};
