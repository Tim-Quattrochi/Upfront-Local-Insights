/**
 * The function formats a phone number string into a specific format and returns an error message if
 * the input is invalid.
 * @returns It depends on the input `num`. If `num` is not a number or is not a string that can be
 * converted to a number, the function returns a string indicating that the input is invalid. If `num`
 * is a string with exactly 10 digits, the function returns the string with the format "
 */
export function formatPhone(num) {
  if (!num || isNaN(num)) {
    return `Input must be a number. Received ${num}`;
  }
  if (typeof num !== "string") {
    num = num.toString();
  }
  if (num.length === 10) {
    return num.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  } else if (num.length < 10) {
    return "Phone number must be at least 10 digits.";
  } else if (num.length > 10) {
    return "Phone number cannot contain more than 10 digits";
  } else {
    return "could not convert phone number.";
  }
}
