const dialog = document.querySelector("#membership-details");

export async function displayMembership() {
    const response = await fetch("data/memberships.json");
    const data = await response.json();

    const membershipLinks = document.querySelectorAll(".membership-link");

    membershipLinks.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();

            const membershipId = event.currentTarget.dataset.membership;

            const membership = data.memberships.find(
                item => item.id === membershipId
            );

            dialog.innerHTML = `
                <button type="button" id="close-modal">❌</button>
                <h2>${membership.name}</h2>
                <p>${membership.price}</p>
                <ul>
                    ${membership.benefits
                        .map(benefit => `<li>${benefit}</li>`)
                        .join("")}
                </ul>
            `;

            dialog.showModal();

            const closeButton = document.querySelector("#close-modal");

            closeButton.addEventListener("click", () => {
                dialog.close();
            });
        });
    });
}