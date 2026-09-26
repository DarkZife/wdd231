import { mobileNav } from "./mobile.mjs";
import { theme } from "./light-dark-mode.mjs"
import { displaySubmittedInfo } from "./thankyou.mjs";
import { setupFooter } from "./footer.mjs";

mobileNav();
theme();
displaySubmittedInfo();
setupFooter();