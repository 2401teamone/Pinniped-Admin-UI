/**
 * Validators receive the current value along with an options object specific to the type
 */

export const validateText = (val, { minLength, maxLength }, required) => {
  if (required && val === "") {
    return "Field is required";
  }
  if (!required && val === "") {
    return "";
  }
  if (val.length < minLength) {
    return `Must be at least ${minLength} characters`;
  }
  if (val.length > maxLength) {
    return `Must be less than ${maxLength} characters`;
  }
  return "";
};

export const validateNumber = (val, { min, max }, required) => {
  if (required && val === "") {
    return "Field is required";
  }
  if (!required && val === "") {
    return "";
  }
  if (required && isNaN(val)) {
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

export const validateBool = (val, options, required) => {
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

export const validateDate = (val, options, required) => {
  if (required && val === "") {
    return "Field is required";
  }
  if (!required && val === "") {
    return "";
  }
  if (isNaN(Date.parse(val))) {
    return "Invalid date";
  }
  return "";
};

export const validateEmail = (val, options, required) => {
  if (required && val === "") {
    return "Field is required";
  }
  if (!required && val === "") {
    return "";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(val)) {
    return "Invalid email";
  }
  return "";
};

export const validateUrl = (val, options, required) => {
  if (required && val === "") {
    return "Field is required";
  }
  if (!required && val === "") {
    return "";
  }
  const urlRegex = /^(http|https):\/\/[^ "]+$/;
  if (!urlRegex.test(val)) {
    return "Invalid url";
  }
  return "";
};

export const validateRelation = (val, { tableId, cascadeDelete }, required) => {
  if (required && val === null) {
    return "Field is required";
  }
  if (!required && val === null) {
    return "";
  }
  if (typeof val !== "string" && val !== null) {
    return "Invalid relation";
  }

  return "";
};

export const validateCreator = () => {
  return "";
};

export const validateUsername = (val, { minLength }) => {
  if (val.length < minLength) {
    return `Username must be at least ${minLength} characters`;
  }
  return "";
};

export const validatePassword = (val, { minLength, requiredPattern }) => {
  console.log(requiredPattern, minLength, "REQUIRED PATTERN");
  if (val.length < minLength) {
    return `Password must be at least ${minLength} characters`;
  }
  if (!new RegExp(requiredPattern).test(val)) {
    return `Password must match: ${requiredPattern}`;
  }
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
    case "username":
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
    case "username":
      return validateUsername;
    default:
      throw new Error("Invalid type");
  }
}
