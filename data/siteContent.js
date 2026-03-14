import { en } from "./siteContent/en";
import { gu } from "./siteContent/gu";
import { hi } from "./siteContent/hi";

export const defaultLanguage = "en";
export const localizedSiteContent = { en, hi, gu };
export const defaultSiteContent = localizedSiteContent[defaultLanguage];
export const siteContent = defaultSiteContent;
