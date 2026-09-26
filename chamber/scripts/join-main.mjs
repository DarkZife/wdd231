import { mobileNav } from "./mobile.mjs";
import { theme } from "./light-dark-mode.mjs"
import { displayMembership } from "./membership-ben.mjs";
import { setTimestamp } from "./timestamp.mjs";
import { setupFooter } from "./footer.mjs";

mobileNav();
theme();
displayMembership();
setTimestamp();
setupFooter();