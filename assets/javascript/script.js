// Array to hold the list of project IDs for navigation
const projects = ["project1", "project2", "project3", "project4", "project5", "project6", "project7", "project8"]; // Add more project IDs as needed
let currentProjectIndex = 0;

// Function to load the project page based on the project ID
function loadProjectPage(projectId) {
    // Set the current project index based on the project ID
    currentProjectIndex = projects.indexOf(projectId);

    const xhr = new XMLHttpRequest();
    xhr.open("GET", `assets/${projectId}.html`, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Replace #projects section content with project details and navigation buttons
            document.getElementById("projects").innerHTML = generateNavButtons() + xhr.responseText;


            // Update the URL to show the project ID without reloading the page
            window.history.pushState(null, null, `#${projectId}`);
        }
    };
    xhr.send();
}

// Function to generate the "Go Back" and "Next Project" buttons
function generateNavButtons() {
    // Check if the current project is the last one
    const isLastProject = currentProjectIndex === projects.length - 1;

    return `
        <div class="navigation-buttons">
            <button onclick="goBack()">Go Back</button>
            ${isLastProject ? '' : '<button onclick="loadNextProject()">Next Project</button>'}
        </div>
    `;
}

// Function to load the initial project thumbnails (reset view)
function loadInitialProjects() {
    // Load the initial project thumbnails or project list
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "assets/projects.html", true); // Adjust to your initial projects list file
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("projects").innerHTML = xhr.responseText;
            window.history.pushState(null, null, "#projects"); // Update URL hash
        }
    };
    xhr.send();
}

// Updated goBack function to load the previous project or return to index
function goBack() {
    if (currentProjectIndex > 0) {
        currentProjectIndex--; // Decrease index for previous project
        loadProjectPage(projects[currentProjectIndex]); // Load previous project
    } else {
        loadInitialProjects(); // Load the initial project list if at the first project
    }
}

// Function to load the next project in the list
function loadNextProject() {
    // Move to the next project index, or loop back to the first project
    currentProjectIndex = (currentProjectIndex + 1) % projects.length;
    loadProjectPage(projects[currentProjectIndex]);
}

// Handle browser back/forward navigation
window.onpopstate = function () {
    if (window.location.hash === "") {
        loadInitialProjects(); // Load initial projects if the hash is empty
    } else {
        const currentHash = window.location.hash.substring(1); // Remove the '#' character
        loadProjectPage(currentHash); // Load the current project based on hash
    }
};

// Initial setup to load the default projects list on page load
document.addEventListener("DOMContentLoaded", () => {
    loadInitialProjects(); // Load the initial project thumbnails
});


// copy 

document.addEventListener("DOMContentLoaded", function() {
    // Utility function to copy text to clipboard and show a tooltip
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

    // Add event listeners for email and phone elements
    document.getElementById("email").addEventListener("click", () => copyText("email", "tooltip-email"));
    document.getElementById("phone").addEventListener("click", () => copyText("phone", "tooltip-phone"));

    // Show "Click to copy" tooltip on hover
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

    // Initialize hover tooltips for email and phone
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
            // Scrolling down, hide header
            header.style.transform = "translateY(-100%)";
        } else {
            // Scrolling up, show header
            header.style.transform = "translateY(0)";
        }

        lastScrollPosition = currentScrollPosition;
    });
});


// remove br
const mediaQuery = window.matchMedia("(max-width: 760px)");

// Function to toggle <br> elements based on media query
function handleBreakpoint(e) {
    if (e.matches) {
        // If the media query matches (screen is 768px or less), remove <br> elements
        document.querySelectorAll("br").forEach(br => br.style.display = "none");
    } else {
        // Otherwise, restore <br> elements
        document.querySelectorAll("br").forEach(br => br.style.display = "inline");
    }
}

// Initial check
handleBreakpoint(mediaQuery);

// Add a listener for screen size changes
mediaQuery.addListener(handleBreakpoint);



// image slide

let currentIndex = 0;

function moveSlide(direction) {
    const slides = document.querySelector(".slides");
    const totalSlides = document.querySelectorAll(".slide").length;

    // Calculate new index
    currentIndex = (currentIndex + direction + totalSlides) % totalSlides;

    // Move slides container to show the correct slide
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}




// back to top button

document.addEventListener("DOMContentLoaded", function() {
    const backToTopButton = document.getElementById("backToTop");

    // Show the button after scrolling down 100px
    window.addEventListener("scroll", function() {
        if (window.scrollY > 100) {
            backToTopButton.classList.add("show");
        } else {
            backToTopButton.classList.remove("show");
        }
    });

    // Scroll back to the top when the button is clicked
    backToTopButton.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});
