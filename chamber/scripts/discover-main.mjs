import { mobileNav } from "./mobile.mjs";
import { theme } from "./light-dark-mode.mjs"
import { displayVisitMessage } from "./visit-message.mjs";
import { places } from "../data/discover.mjs";
import { displayPlaces } from "./discover-card.mjs";
import { setupFooter } from "./footer.mjs";

mobileNav();
theme();
displayVisitMessage();
displayPlaces(places);
setupFooter();