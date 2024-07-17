const isValidURL =
  /^(http(s)?:\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.(com|org|net|anotherTLD)\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

export const truncateAfterDomain = (url) => {
  if (!url || typeof url !== "string") return "";
  if (!isValidURL.test(url)) {
    throw new Error("Invalid URL");
  }

  const urlObj = new URL(url);
  return urlObj.hostname;
};
