// Setting Box
let icon = document.querySelector(".setting-icon");
let settingBox = document.querySelector(".setting ")

// Open And Close Setting Box
icon.onclick = () => {
    settingBox.classList.toggle("open");
    icon.classList.toggle("fa-spin");
}

let listItems = document.querySelectorAll(".color-box-list li");
let mainColor = localStorage.getItem("main-color");

// Add Colors To LocalStorage
if (mainColor !== null) {
    document.querySelector("html").style.setProperty("--main-color", mainColor);

    listItems.forEach(function (li) {
        li.classList.remove("active");

        if (li.dataset.color === mainColor) {
            li.classList.add("active")
        }
    });
}


listItems.forEach(li => {
    li.addEventListener("click", (e) => {

        // Remove Active Class From All Elements
        listItems.forEach(function (li) {
            li.classList.remove("active");
        })
        
        // Add Active Class When Click
        e.target.classList.add("active");

        // Change the Property of root element
        document.querySelector("html").style.setProperty("--main-color", e.target.dataset.color)

        // Set LocalStorage For (Main-color)
        localStorage.setItem("main-color", e.target.dataset.color)
    });
});


// Bollets 
let bollets = document.querySelectorAll(".bollets .bollet");

// Links
let links = document.querySelectorAll("nav ul.navbar-nav li a");

function scrollToSection(elements) {
    elements.forEach(ele => {
    ele.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior : "smooth"
        });
    })
});
};
scrollToSection(bollets);
scrollToSection(links);

// Show And Hide Bollets
let bolletsBtn = document.querySelectorAll(".setting .random-btn-show span");
let bolletsList = document.querySelector(".list-bollets");

let bolletsStorage = localStorage.getItem("toglle-bollets");

if (bolletsStorage !== null) {
    bolletsBtn.forEach(function (e) {
        e.classList.remove("active")
    });

    if (bolletsStorage === "yes") {
        document.querySelector(".random-btn-show .yes").classList.add("active");
        bolletsList.style.display = "block"
    } else {
        document.querySelector(".random-btn-show .no").classList.add("active");
        bolletsList.style.display = "none"
    }
}

bolletsBtn.forEach(btn => {
    btn.addEventListener("click", function(e) {
        if (e.target.dataset.show === "yes") {
            bolletsList.style.display = "block"
        } else {
            bolletsList.style.display = "none"
        }

        bolletsBtn.forEach(function (e) {
            e.classList.remove("active")
        });
        e.target.classList.add("active");

        localStorage.setItem("toglle-bollets", e.target.dataset.show);
    })
})


// random Option
let randomOption = true;

let randomBtn = document.querySelectorAll(".random-btn span");

randomBtn.forEach(span => {
    span.addEventListener("click", (e) => {

        // Remove Active Class From All Elements
        randomBtn.forEach(function (span) {
            span.classList.remove("active");
        })
        e.target.classList.add("active");


        // change and stop background random on click
        if (e.target.dataset.background === "yes") {
            randomOption = true;
            randomImages();
            localStorage.setItem("background", true);
        } else {
            randomOption = false;
            clearInterval(randomBackgroundInterval);
            localStorage.setItem("background", false);
        }
    });
});

// get localStorage value
let backgroundStorage = localStorage.getItem("background");

if (backgroundStorage !== null) {
    if (backgroundStorage === "true") {
        randomOption = true;
    } else {
        randomOption = false;
    }
    
    randomBtn.forEach(span => {
        // Remove Active Class From All Elements
        randomBtn.forEach(function (span) {
            span.classList.remove("active");
        });
    });

    if (backgroundStorage === "true") {
        document.querySelector(".yes").classList.add("active");
    } else {
        document.querySelector(".no").classList.add("active");
    }
}

// Declare the setInterval
let randomBackgroundInterval;

// Change Background For Heading
let header = document.querySelector("header");
let theImages = ["01.jpg", "02.jpg", "03.jpg", "04.jpg"]

function randomImages() {
    if (randomOption === true) {
        randomBackgroundInterval = setInterval(() => {
            let number = Math.floor(Math.random() * theImages.length)
            header.style.backgroundImage = `url(../imgs/${theImages[number]})`;
        }, 4000);
    };
};
randomImages();

// Reset Option Button 
document.querySelector(".reset").addEventListener("click", function (e) {
    let localStorageItems = ["background", "toglle-bollets", "main-color"];

    localStorageItems.forEach(item => {
        localStorage.removeItem(item);
        console.log(localStorage.removeItem(item))
    })

    window.location.reload();
})


// Popup Image
let imgesPop = document.querySelectorAll(".image img");
let overlay = document.querySelector(".overlay-popup");
let popupImg = document.querySelector(".img-popup");
let imgSrc = document.querySelector(".img-popup img");

imgesPop.forEach(img => {
    img.addEventListener("click", () => {
        // Visible Overlay
        overlay.style.left = 0;

        // visible Popup Img
        popupImg.style.right = 0;

        // Change Popup Img Src
        imgSrc.src = img.src;

        // Change Title Popup To Alt img
        if (img.alt !== "") {
            document.querySelector(".img-popup .popup-title").innerHTML = img.alt;
        } else {
            document.querySelector(".img-popup .popup-title").innerHTML = "check";
        }
    });
});

// Close PopUp
let closeButton = document.querySelector(".close-btn");

closeButton.addEventListener("click", () => {
    // Remove Overlay
    overlay.style.left = "-100%";

    // Remove Popup Img
    popupImg.style.right = "-100%";

});

// Scroll To Top
let scrollToTopBtn = document.querySelector(".scroll-to-top");

scrollToTopBtn.addEventListener("click", function(e) {
    e.preventDefault();
    window.scrollTo({top : 0, behavior: "smooth"})
});