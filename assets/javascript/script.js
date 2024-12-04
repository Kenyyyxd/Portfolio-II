//loading

window.addEventListener("load", function () {
    const loadingScreen = document.getElementById("loading-screen");
    const mainContent = document.getElementById("main-content");

    loadingScreen.style.display = "none";
    mainContent.style.display = "block";
});


// projects

const projects = ["project1", "project2", "project3", "project4", "project5", "project6", "project7", "project8", "project9"]; // Add more project IDs as needed
let currentProjectIndex = 0;

function loadProjectPage(projectId) {

    currentProjectIndex = projects.indexOf(projectId);

    const xhr = new XMLHttpRequest();
    xhr.open("GET", `assets/${projectId}.html`, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            document.getElementById("projects").innerHTML = generateNavButtons() + xhr.responseText;


            
            window.history.pushState(null, null, `#${projectId}`);
        }
    };
    xhr.send();
}

function generateNavButtons() {

    const isLastProject = currentProjectIndex === projects.length - 1;

    return `
        <div class="navigation-buttons">
            <button onclick="goBack()">&#10229; Go Back</button>
            ${isLastProject ? '' : '<button onclick="loadNextProject()">Next Project &#10230;</button>'}
        </div>
    `;
}


function loadInitialProjects() {

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "assets/projects.html", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("projects").innerHTML = xhr.responseText;
            window.history.pushState(null, null, "#projects");
        }
    };
    xhr.send();
}

function goBack() {
    if (currentProjectIndex > 0) {
        currentProjectIndex--;
        loadProjectPage(projects[currentProjectIndex]);
    } else {
        loadInitialProjects();
    }
}

function loadNextProject() {

    currentProjectIndex = (currentProjectIndex + 1) % projects.length;
    loadProjectPage(projects[currentProjectIndex]);
}

window.onpopstate = function () {
    if (window.location.hash === "") {
        loadInitialProjects();
    } else {
        const currentHash = window.location.hash.substring(1);
        loadProjectPage(currentHash);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    loadInitialProjects();
});


// copy 

document.addEventListener("DOMContentLoaded", function() {

    function copyText(elementId, tooltipId) {
        const text = document.getElementById(elementId).innerText;
        navigator.clipboard.writeText(text).then(() => {
            const tooltip = document.getElementById(tooltipId);
            tooltip.style.display = "inline";
            setTimeout(() => {
                tooltip.style.display = "none";
            }, 1000);
        });
    }

    document.getElementById("email").addEventListener("click", () => copyText("email", "tooltip-email"));
    document.getElementById("phone").addEventListener("click", () => copyText("phone", "tooltip-phone"));

    function showHoverTooltip(elementId, tooltipId) {
        const element = document.getElementById(elementId);
        const tooltip = document.getElementById(tooltipId);
        element.addEventListener("mouseenter", () => {
            tooltip.style.display = "block";
            tooltip.style.top = `${element.getBoundingClientRect().top + window.scrollY - 30}px`;
            tooltip.style.left = `${element.getBoundingClientRect().left}px`;
        });
        element.addEventListener("mouseleave", () => {
            tooltip.style.display = "none";
        });
    }

    showHoverTooltip("email", "hover-tooltip-email");
    showHoverTooltip("phone", "hover-tooltip-phone");
});


// animation

AOS.init({
    duration: 1000,
    once: true,
});


// nav scroll

document.addEventListener("DOMContentLoaded", function () {
    let lastScrollPosition = 0;
    const header = document.querySelector("header");

    window.addEventListener("scroll", function () {
        const currentScrollPosition = window.scrollY;

        if (currentScrollPosition > lastScrollPosition) {

            header.style.transform = "translateY(-100%)";
        } else {

            header.style.transform = "translateY(0)";
        }

        lastScrollPosition = currentScrollPosition;
    });
});


// remove br
const mediaQuery = window.matchMedia("(max-width: 760px)");


function handleBreakpoint(e) {
    if (e.matches) {

        document.querySelectorAll("br").forEach(br => br.style.display = "none");
    } else {

        document.querySelectorAll("br").forEach(br => br.style.display = "inline");
    }
}


handleBreakpoint(mediaQuery);

mediaQuery.addListener(handleBreakpoint);



// image slide

let currentIndex = 0;

function moveSlide(direction) {
    const slides = document.querySelector(".slides");
    const totalSlides = document.querySelectorAll(".slide").length;

    currentIndex = (currentIndex + direction + totalSlides) % totalSlides;

    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}




// back to top button

document.addEventListener("DOMContentLoaded", function() {
    const backToTopButton = document.getElementById("backToTop");

    window.addEventListener("scroll", function() {
        if (window.scrollY > 100) {
            backToTopButton.classList.add("show");
        } else {
            backToTopButton.classList.remove("show");
        }
    });

    backToTopButton.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});

