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
  console.log("val", val, typeof val);
  if (![0, 1].includes(val)) {
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
  if (typeof val !== "string" && val !== null) {
    return "Invalid relation";
  }

  return "";
};

export const validatePassword = (val) => {
  if (val.length < 10) {
    return "Password must be at least 10 characters";
  } else if (!/(?=.*\d)(?=.*[!@#$%^&*])/.test(val)) {
    return "Password must contain at least one number and one special character";
  } else return "";
};

export const validateCreator = () => {
  return "";
};

export const handleRequiredField = (type, val) => {
  switch (type) {
    case "text":
    case "number":
    case "password":
    case "email":
    case "url":
    case "date":
    case "json":
      return val === "";
    case "relation":
      return val === null;
    case "csv":
    case "select":
      return val.length === 0;
    default:
      return false;
  }
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
    case "password":
      return validatePassword;
    default:
      throw new Error("Invalid type");
  }
}
