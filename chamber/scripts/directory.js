const membersContainer = document.querySelector("#members");

async function getMembers() {

    try {

        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Could not load member data.");
        }

        const data = await response.json();

        displayMembers(data.businesses);

    } catch (error) {

        console.error("Error loading members:", error);

        membersContainer.innerHTML =
            "<p>Sorry, the business directory could not be loaded.</p>";
    }
}


function displayMembers(members) {

    membersContainer.innerHTML = "";

    members.forEach((member) => {

        const card = document.createElement("section");
        card.classList.add("member-card");


        const name = document.createElement("h2");
        name.textContent = member.name;


        const cardContent = document.createElement("div");
        cardContent.classList.add("card-content");


        const image = document.createElement("img");
        image.src = `images/${member.image}`;
        image.alt = `${member.name} logo`;
        image.loading = "lazy";


        const businessInfo = document.createElement("div");
        businessInfo.classList.add("business-info");


        const email = document.createElement("p");

        const emailLabel = document.createElement("strong");
        emailLabel.textContent = "EMAIL: ";

        const emailText = document.createElement("span");
        emailText.classList.add("fake-link");
        emailText.textContent = member.email;

        email.appendChild(emailLabel);
        email.appendChild(emailText);


        const phone = document.createElement("p");

        const phoneLabel = document.createElement("strong");
        phoneLabel.textContent = "PHONE: ";

        const phoneText = document.createElement("span");
        phoneText.classList.add("fake-link");
        phoneText.textContent = member.phone;

        phone.appendChild(phoneLabel);
        phone.appendChild(phoneText);


        const website = document.createElement("p");

        const websiteLabel = document.createElement("strong");
        websiteLabel.textContent = "URL: ";

        const websiteText = document.createElement("span");
        websiteText.classList.add("fake-link");
        websiteText.textContent = member.website;

        website.appendChild(websiteLabel);
        website.appendChild(websiteText);


        businessInfo.appendChild(email);
        businessInfo.appendChild(phone);
        businessInfo.appendChild(website);


        cardContent.appendChild(image);
        cardContent.appendChild(businessInfo);


        card.appendChild(name);
        card.appendChild(cardContent);


        membersContainer.appendChild(card);
    });
}

getMembers();


const gridButton = document.querySelector("#grid-btn");
const listButton = document.querySelector("#list-btn");


gridButton.addEventListener("click", () => {

    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");

});


listButton.addEventListener("click", () => {

    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");

});


const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");


menuButton.addEventListener("click", () => {

    navigation.classList.toggle("open");

    if (navigation.classList.contains("open")) {

        menuButton.textContent = "✕";
        menuButton.setAttribute("aria-label", "Close navigation menu");

    } else {

        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-label", "Open navigation menu");

    }

});


const themeButton = document.querySelector("#theme-toggle");

const savedTheme = localStorage.getItem("theme");


if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeButton.textContent = "☀️";

    themeButton.setAttribute(
        "aria-label",
        "Switch to light mode"
    );
}


themeButton.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        themeButton.textContent = "☀️";

        themeButton.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

        localStorage.setItem("theme", "dark");

    } else {

        themeButton.textContent = "🌙";

        themeButton.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

        localStorage.setItem("theme", "light");

    }

});


const currentYear = document.querySelector("#currentYear");
const lastModified = document.querySelector("#lastModified");


currentYear.textContent = new Date().getFullYear();

lastModified.textContent =
    `Last Modification: ${document.lastModified}`;