export function displaySubmittedInfo() {
    const params = new URLSearchParams(window.location.search);

    document.querySelector("#first-name").textContent = params.get("first-name");
    document.querySelector("#last-name").textContent = params.get("last-name");
    document.querySelector("#email").textContent = params.get("email");
    document.querySelector("#phone").textContent = params.get("phone");
    document.querySelector("#organization").textContent = params.get("organization");

    const timestamp = params.get("timestamp");

    if (timestamp) {
        const date = new Date(timestamp);

        document.querySelector("#timestamp").textContent =
            date.toLocaleString();
    }
}