/**
 * Validators receive the current value along with an options object specific to the type
 */

export const validateText = (val, { minLength, maxLength }) => {
  if (val.length < minLength) {
    return `Must be at least ${minLength} characters`;
  }
  if (val.length > maxLength) {
    return `Must be less than ${maxLength} characters`;
  }
  return "";
};

export const validateNumber = (val, { min, max }) => {
  if (isNaN(val)) {
    return "Must be a number";
  }
  if (val < min) {
    return `Must be at least ${min}`;
  }
  if (val > max) {
    return `Must be less than ${max}`;
  }
  return "";
};

export const validateBool = (val) => {
  if (val !== "true" && val !== "false") {
    return "Must be true or false";
  }
  return "";
};

export const validateSelect = (val, { maxSelect, options }) => {
  if (!Array.isArray(val)) {
    return "Option is not in correct format";
  }
  if (val.length > maxSelect) {
    return `Can select at most ${maxSelect} option(s)`;
  }
  if (val.some((v) => !options.includes(v))) {
    return "Invalid option selected";
  }
  return "";
};

export const validateJson = (val, { maxSize }) => {
  if (val.length > maxSize) {
    return `Must be less than ${maxSize} characters`;
  }
  try {
    JSON.parse(val);
  } catch (e) {
    return "Invalid JSON";
  }
  return "";
};

export const validateDate = (val) => {
  if (isNaN(Date.parse(val))) {
    return "Invalid date";
  }
  return "";
};

export const validateEmail = (val) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(val)) {
    return "Invalid email";
  }
  return "";
};

export const validateUrl = (val) => {
  const urlRegex = /^(http|https):\/\/[^ "]+$/;
  if (!urlRegex.test(val)) {
    return "Invalid url";
  }
  return "";
};

export const validateRelation = (val, { tableId, cascadeDelete }) => {
  if (typeof val !== "string") {
    return "Invalid input";
  }

  return "";
};

export const validateCreator = () => {
  return "";
};

export default function getValidator(type) {
  switch (type) {
    case "text":
      return validateText;
    case "number":
      return validateNumber;
    case "bool":
      return validateBool;
    case "date":
      return validateDate;
    case "email":
      return validateEmail;
    case "url":
      return validateUrl;
    case "select":
      return validateSelect;
    case "json":
      return validateJson;
    case "relation":
      return validateRelation;
    case "creator":
      return validateCreator;
    default:
      throw new Error("Invalid type");
  }
}
