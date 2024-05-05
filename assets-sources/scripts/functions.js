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