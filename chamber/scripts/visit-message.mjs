export function displayVisitMessage() {
    const visitMessage = document.querySelector("#visit-message");

    const lastVisit = localStorage.getItem("lastVisit");
    const currentVisit = Date.now();

    if (!lastVisit) {
        visitMessage.textContent =
            "Welcome! Let us know if you have any questions.";
    } else {
        const difference = currentVisit - Number(lastVisit);
        const millisecondsPerDay = 1000 * 60 * 60 * 24;

        const days = Math.floor(difference / millisecondsPerDay);

        if (days < 1) {
            visitMessage.textContent =
                "Back so soon! Awesome!";
        } else if (days === 1) {
            visitMessage.textContent =
                "You last visited 1 day ago.";
        } else {
            visitMessage.textContent =
                `You last visited ${days} days ago.`;
        }
    }

    localStorage.setItem("lastVisit", currentVisit);
}