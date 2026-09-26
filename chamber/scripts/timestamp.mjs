export function setTimestamp() {
    const timestamp = document.querySelector("#timestamp");

    timestamp.value = new Date().toISOString();
}