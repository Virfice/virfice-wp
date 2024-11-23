import { VIRFICE_PLUGIN_BASE } from "@conf";
import { store } from "./Dashboard/store";

export const hasQueryParamValue = (
  field,
  value,
  url = window.location.href
) => {
  // Create a URL object and URLSearchParams instance
  const urlParams = new URLSearchParams(new URL(url).search);

  // Get the value of the query parameter for the given field
  const paramValue = urlParams.get(field);

  // Check if the value exists and matches exactly
  return paramValue === value;
};
export const addParams = (paramsObj, url = window.location.href) => {
  let urlObj = new URL(url);
  for (const [key, value] of Object.entries(paramsObj)) {
    urlObj.searchParams.set(key, value);
  }
  return urlObj.toString();
};
export const getParamValue = (field, url = window.location.href) => {
  let urlObj = new URL(url);
  return urlObj.searchParams.get(field);
};
export const createAssetUrl = (asset) => {
  return VIRFICE_PLUGIN_BASE + "assets/" + asset;
};

export const getSelectOptionsValueFromOptions = (options, selectedValue) => {
  let obj = { value: "", title: "Select" };
  options.forEach((option) => {
    if (option.value == selectedValue) {
      obj = option;
    }
  });
  return obj;
};

export const validateCommaSeparatedEmails = (emailString) => {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Split the input string by comma and trim whitespace from each email
  const emails = emailString.split(",").map((email) => email.trim());

  // Check if each email is valid, ignoring empty strings
  for (let email of emails) {
    if (email && !emailRegex.test(email)) {
      return false; // Invalid email found
    }
  }

  return true; // All emails are valid or empty strings are ignored
};

export function dispatchDashboardAction(action, payload) {
  store.dispatch(action(payload)); // Dispatch action using the store's dispatch method
}

export const generateRandomId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};
