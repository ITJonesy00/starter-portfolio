/*
 * dark-mode.js
 */

"use strict";

const themeToggle = document.getElementById("theme-light");

if (themeToggle) {
    themeToggle.addEventListener("change", () => {
        if (themeToggle.checked) {
            document.documentElement.dataset.theme = "light";
        } else {
            document.documentElement.removeAttribute("data-theme");
        }
    });
}