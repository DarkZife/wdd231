export function displayPlaces(places) {
    const discoverGrid = document.querySelector("#discover-grid");

    places.forEach((place, index) => {
        const card = document.createElement("article");

        card.classList.add("discover-card");
        card.classList.add(`card${index + 1}`);

        const title = document.createElement("h2");
        title.textContent = place.name;

        const figure = document.createElement("figure");

        const image = document.createElement("img");
        image.src = place.image;
        image.alt = place.name;
        image.width = 300;
        image.height = 200;
        image.loading = "lazy";

        figure.appendChild(image);

        const address = document.createElement("address");
        address.textContent = place.address;

        const description = document.createElement("p");
        description.textContent = place.description;

        const button = document.createElement("button");
        button.textContent = "Learn More";

        card.appendChild(title);
        card.appendChild(figure);
        card.appendChild(address);
        card.appendChild(description);
        card.appendChild(button);

        discoverGrid.appendChild(card);
    });
}