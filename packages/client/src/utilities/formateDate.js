export const options = {
  month: "short",
  day: "numeric",
  year: "numeric",
  time: "EST",
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const dateString = date.toLocaleDateString("en-US", options);
  const timeString = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${dateString} ${timeString}`;
};
