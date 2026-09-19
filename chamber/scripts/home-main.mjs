import { mobileNav } from "./mobile.mjs";
import { theme } from "./light-dark-mode.mjs"
import { setupEvents } from "./events.mjs"
import { weatherApi } from "./weather.mjs";
import { setupSpotlights } from "./spotlights.mjs";
import { setupFooter } from "./footer.mjs";

mobileNav();
theme();
setupEvents();
weatherApi();
setupSpotlights();
setupFooter();