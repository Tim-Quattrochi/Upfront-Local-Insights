import { imagePath } from "../../config/constants";
export const checkPic = (pic) => {
  if (pic.startsWith("https://maps.googleapis.com")) {
    return pic;
  } else {
    return `${imagePath}${pic}`;
  }
};
