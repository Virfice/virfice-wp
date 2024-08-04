import { VIRFICE_PLUGIN_BASE } from "./conf";

export const hasQueryParamValue = (
  field,
  value,
  url = window.location.href
) => {
  if (url.indexOf("?" + field + "=" + value) != -1) return true;
  else if (url.indexOf("&" + field + "=" + value) != -1) return true;
  return false;
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
export const createAssetUrl = (asset) =>{
  return VIRFICE_PLUGIN_BASE+'assets/' + asset;
}

export const getSelectOptionsValueFromOptions = (options, selectedValue) =>{
  let obj = {value: '', title: 'Select'};
  options.forEach(option => {
      if(option.value == selectedValue){
          obj = option;
      }
  });
  return obj;
}

export const validateCommaSeparatedEmails = (emailString)=> {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Split the input string by comma and trim whitespace from each email
  const emails = emailString.split(',').map(email => email.trim());

  // Check if each email is valid
  for (let email of emails) {
      if (!emailRegex.test(email)) {
          return false; // Invalid email found
      }
  }

  return true; // All emails are valid
}