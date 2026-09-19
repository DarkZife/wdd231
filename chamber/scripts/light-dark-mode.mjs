export const theme = () => {
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
};