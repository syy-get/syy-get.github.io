document.addEventListener("DOMContentLoaded", () => {

    // /* ===============================
    //    1️⃣ BOOT SOUND + TRANSITION
    // =============================== */
    // const bootSound = new Audio("pipboy-boot.mp3");
    // bootSound.volume = 0.5;
    // bootSound.play().catch(() => {
    //     // autoplay may be blocked; safe fallback
    // });

    setTimeout(() => {
        const boot = document.getElementById("boot");
        const ui = document.getElementById("ui");

        if (boot && ui) {
            boot.style.display = "none";
            ui.style.display = "block";
        }
    }, 4000);
/* ===============================
   BOOT SOUND (AUTOPLAY SAFE)
=============================== */

const bootSound = new Audio("pipboy-boot.mp3");
bootSound.volume = 0.4;

function playBootSoundOnce() {
    bootSound.play().catch(() => {});
    document.removeEventListener("click", playBootSoundOnce);
    document.removeEventListener("keydown", playBootSoundOnce);
    document.removeEventListener("touchstart", playBootSoundOnce);
}

// Wait for FIRST user interaction
document.addEventListener("click", playBootSoundOnce);
document.addEventListener("keydown", playBootSoundOnce);
document.addEventListener("touchstart", playBootSoundOnce);


    /* ===============================
       2️⃣ TAB BEEP SOUND
    =============================== */
    const beep = new Audio("pipboy-beep.mp3");
    beep.volume = 0.4;


    /* ===============================
       3️⃣ VAULT-BOY + SCREEN SWITCH
    =============================== */
    const vaultboy = document.getElementById("vaultboy");
    const navTabs = document.querySelectorAll("nav span");
    const screens = document.querySelectorAll(".screen");

    navTabs.forEach(tab => {
        tab.addEventListener("click", () => {

            /* 🔊 Beep */
            beep.currentTime = 0;
            beep.play();

            /* Vault-Boy animation */
            if (vaultboy) {
                vaultboy.className = "logo";
                const mode = tab.getAttribute("data-mode");
                if (mode) vaultboy.classList.add(mode);
            }

            /* Screen switching */
            /* Pip-Boy screen flicker */
const main = document.querySelector("main");
main.classList.add("flicker");
setTimeout(() => main.classList.remove("flicker"), 200);

            const target = tab.getAttribute("data-target");

            screens.forEach(screen => {
                screen.classList.remove("active");
            });

            const activeScreen = document.getElementById(target);
            if (activeScreen) {
                activeScreen.classList.add("active");
            }

        });
    });
/* ===============================
   OCCASIONAL CRT FLICKER
=============================== */

function triggerCRTFlicker() {
    document.body.classList.add("crt-flicker");

    setTimeout(() => {
        document.body.classList.remove("crt-flicker");
    }, 180);
}

function randomFlickerLoop() {
    const delay = Math.random() * 12000 + 8000; // 8–20 seconds

    setTimeout(() => {
        triggerCRTFlicker();
        randomFlickerLoop();
    }, delay);
}

// Start random flicker
randomFlickerLoop();
/* ===============================
   HEADER RESUME DOWNLOAD
=============================== */

const resumeDownload = document.getElementById("resumeDownload");

if (resumeDownload) {
    resumeDownload.addEventListener("click", () => {

        // play pip-boy beep if available
        if (typeof beep !== "undefined") {
            beep.currentTime = 0;
            beep.play();
        }

        // trigger download
        const link = document.createElement("a");
        link.href = "resume.pdf";
        link.download = "said.roshan_resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}
/* ===============================
   KEYBOARD ARROW NAVIGATION
=============================== */

let currentTabIndex = 0;

// cache tabs
const tabs = Array.from(document.querySelectorAll("nav span"));

// find initially active screen
tabs.forEach((tab, index) => {
    const target = tab.getAttribute("data-target");
    const screen = document.getElementById(target);
    if (screen && screen.classList.contains("active")) {
        currentTabIndex = index;
    }
});

// function to activate tab by index
function activateTab(index) {
    const tab = tabs[index];
    if (!tab) return;

    // 🔊 beep
    if (typeof beep !== "undefined") {
        beep.currentTime = 0;
        beep.play();
    }

    // flicker effect
    const main = document.querySelector("main");
    if (main) {
        main.classList.add("flicker");
        setTimeout(() => main.classList.remove("flicker"), 200);
    }

    // vault-boy animation
    if (vaultboy) {
        vaultboy.className = "logo";
        const mode = tab.getAttribute("data-mode");
        if (mode) vaultboy.classList.add(mode);
    }

    // screen switching
    const target = tab.getAttribute("data-target");
    screens.forEach(screen => screen.classList.remove("active"));

    const activeScreen = document.getElementById(target);
    if (activeScreen) activeScreen.classList.add("active");
}

// keyboard listener
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
        currentTabIndex = (currentTabIndex + 1) % tabs.length;
        activateTab(currentTabIndex);
    }

    if (e.key === "ArrowLeft") {
        currentTabIndex =
            (currentTabIndex - 1 + tabs.length) % tabs.length;
        activateTab(currentTabIndex);
    }
});

});
