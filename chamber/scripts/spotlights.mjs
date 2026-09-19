export const setupSpotlights = async () => {

    const spotlightContainer = document.querySelector("#spotlights");

    try {

        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Could not load member data.");
        }

        const data = await response.json();

        const eligibleMembers = data.businesses.filter((member) => {
            return member.membership === 2 || member.membership === 3;
        });

        const shuffledMembers = [...eligibleMembers].sort(
            () => Math.random() - 0.5
        );

        const spotlightCount =
            Math.random() < 0.5 ? 2 : 3;

        const selectedMembers =
            shuffledMembers.slice(0, spotlightCount);

        displaySpotlights(selectedMembers, spotlightContainer);

    } catch (error) {

        console.error("Error loading spotlights:", error);

        spotlightContainer.innerHTML =
            "<p>Member spotlights could not be loaded.</p>";
    }
};


function displaySpotlights(members, container) {

    container.innerHTML = "";

    members.forEach((member) => {

        const card = document.createElement("article");
        card.classList.add("spotlight-card");


        const image = document.createElement("img");

        image.src = `images/${member.image}`;
        image.alt = `${member.name} building or company image`;
        image.loading = "lazy";


        const name = document.createElement("h3");
        name.textContent = member.name;


        const description = document.createElement("p");
        description.classList.add("spotlight-description");
        description.textContent = member.description;


        const address = document.createElement("p");
        address.textContent = member.address;


        const phone = document.createElement("p");
        phone.textContent = member.phone;


        const website = document.createElement("a");
        website.href = member.website;
        website.textContent = "Visit Website";
        website.target = "_blank";
        website.rel = "noopener noreferrer";


        const membership = document.createElement("p");
        membership.classList.add("membership-level");

        if (member.membership === 3) {
            membership.textContent = "Gold Member";
        } else {
            membership.textContent = "Silver Member";
        }


        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(description);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(membership);

        container.appendChild(card);
    });
}