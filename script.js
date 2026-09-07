const header = document.getElementById("header");
const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

const revealElements = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".nav a");
const sections = document.querySelectorAll("main section[id]");


/* HEADER */

function updateHeader() {

    if (window.scrollY > 20) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", updateHeader);

updateHeader();


/* REVEAL */

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
    }
);

revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* ACTIVE NAV */

const sectionObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            const sectionId = entry.target.id;

            navLinks.forEach((link) => {

                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === "#" + sectionId
                );

            });

        });

    },
    {
        threshold: 0.4
    }
);

sections.forEach((section) => {

    sectionObserver.observe(section);

});


/* MOBILE MENU */

function closeMenu() {

    mobileMenu.classList.remove("open");

    menuButton.classList.remove("active");

    document.body.classList.remove("menu-open");

}


menuButton.addEventListener("click", () => {

    const isOpen =
        mobileMenu.classList.contains("open");

    if (isOpen) {

        closeMenu();

    } else {

        mobileMenu.classList.add("open");

        menuButton.classList.add("active");

        document.body.classList.add("menu-open");

    }

});


document
    .querySelectorAll(".mobile-menu a")
    .forEach((link) => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeMenu();

    }

});


/* INITIAL HERO */

window.addEventListener("load", () => {

    document
        .querySelectorAll(".hero .reveal")
        .forEach((element, index) => {

            setTimeout(() => {

                element.classList.add("visible");

            }, index * 90);

        });

});