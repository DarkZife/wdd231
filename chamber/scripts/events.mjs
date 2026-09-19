export const setupEvents = async () => {

    const eventImage = document.querySelector("#event-image");
    const eventTitle = document.querySelector("#event-title");
    const eventDate = document.querySelector("#event-date");
    const eventLocation = document.querySelector("#event-location");
    const eventDescription = document.querySelector("#event-description");

    const previousButton = document.querySelector("#previous-event");
    const nextButton = document.querySelector("#next-event");


    try {

        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Could not load event data.");
        }

        const data = await response.json();


        // Take all events from every business
        // and put them into one array.
        const events = data.businesses.flatMap((business) => {

            return business.events
                .filter((event) => event.active)
                .map((event) => {

                    return {
                        ...event,
                        business: business.name
                    };

                });

        });


        // If there are no active events
        if (events.length === 0) {

            eventTitle.textContent = "No Current Events";

            eventDate.textContent = "";
            eventLocation.textContent = "";

            eventDescription.textContent =
                "Check back soon for upcoming events.";

            eventImage.hidden = true;

            return;
        }


        let currentEvent = 0;


        // =========================
        // DISPLAY EVENT
        // =========================

        function displayEvent() {

            const event = events[currentEvent];


            eventTitle.textContent = event.title;

            eventDate.textContent = event.date;

            eventLocation.textContent = event.location;

            eventDescription.textContent =
                event.description;


            // EVENT IMAGE

            if (event.image) {

                eventImage.src = `images/${event.image}`;

                eventImage.alt =
                    `${event.title} event`;

                eventImage.hidden = false;

            } else {

                eventImage.removeAttribute("src");

                eventImage.alt = "";

                eventImage.hidden = true;

            }

        }


        // =========================
        // NEXT EVENT
        // =========================

        function nextEvent() {

            currentEvent++;

            if (currentEvent >= events.length) {
                currentEvent = 0;
            }

            displayEvent();

        }


        // =========================
        // PREVIOUS EVENT
        // =========================

        function previousEvent() {

            currentEvent--;

            if (currentEvent < 0) {
                currentEvent = events.length - 1;
            }

            displayEvent();

        }


        // =========================
        // BUTTON EVENTS
        // =========================

        nextButton.addEventListener(
            "click",
            nextEvent
        );


        previousButton.addEventListener(
            "click",
            previousEvent
        );


        // =========================
        // DISPLAY FIRST EVENT
        // =========================

        displayEvent();


        // =========================
        // AUTO CHANGE EVENT
        // =========================

        setInterval(
            nextEvent,
            5000
        );


    } catch (error) {

        console.error(
            "Error loading events:",
            error
        );


        eventTitle.textContent =
            "Events Could Not Be Loaded";

        eventDate.textContent = "";
        eventLocation.textContent = "";

        eventDescription.textContent =
            "Please try again later.";

        eventImage.hidden = true;

    }

};