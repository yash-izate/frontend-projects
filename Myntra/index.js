/* =========================================================
   MYNTRA CLONE - PHASE 2 INTERACTIONS
   ========================================================= */


/* =========================================================
   1. SCROLL-AWARE HEADER
   ========================================================= */

const header = document.querySelector("header");

function handleHeaderScroll() {
    if (window.scrollY > 20) {
        header.classList.add("header_scrolled");
    } else {
        header.classList.remove("header_scrolled");
    }
}

window.addEventListener("scroll", handleHeaderScroll, {
    passive: true
});


/* =========================================================
   2. SCROLL REVEAL
   ========================================================= */

const revealElements = document.querySelectorAll(
    ".category_heading, .category_items, .footer_container"
);

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal_visible");

                /*
                    Once the element has appeared, stop observing it.
                    This prevents the animation from repeatedly playing
                    every time the user scrolls up and down.
                */
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
    }
);

revealElements.forEach((element) => {
    element.classList.add("reveal");

    revealObserver.observe(element);
});


/* =========================================================
   3. BACK TO TOP BUTTON
   ========================================================= */

const backToTop = document.createElement("button");

backToTop.className = "back_to_top";
backToTop.setAttribute("aria-label", "Back to top");
backToTop.innerHTML = `
    <span class="material-symbols-outlined">
        arrow_upward
    </span>
`;

document.body.appendChild(backToTop);


/*
    Show button only after meaningful scrolling.
*/

function handleBackToTopVisibility() {
    if (window.scrollY > 500) {
        backToTop.classList.add("back_to_top_visible");
    } else {
        backToTop.classList.remove("back_to_top_visible");
    }
}

window.addEventListener("scroll", handleBackToTopVisibility, {
    passive: true
});


/*
    Smoothly return to the top.
*/

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


/* =========================================================
   4. HERO / BANNER CTA
   ========================================================= */

const bannerContainer = document.querySelector(".banner_container");

if (bannerContainer) {

    const bannerCTA = document.createElement("a");

    bannerCTA.className = "banner_cta";
    bannerCTA.href = "#shop";
    bannerCTA.innerHTML = `
        Shop Now
        <span class="material-symbols-outlined">
            arrow_forward
        </span>
    `;

    bannerContainer.appendChild(bannerCTA);
}


/* =========================================================
   5. CREATE A TARGET FOR THE BANNER CTA
   ========================================================= */

/*
    Your current page does not have a dedicated #shop section.

    Therefore, we make the first "Medal Worthy Brands To Bag"
    section the CTA destination.
*/

const categoryHeadings = document.querySelectorAll(".category_heading");

if (categoryHeadings.length > 0) {
    categoryHeadings[0].id = "shop";
}


/* =========================================================
   6. NAVIGATION ACTIVE FEEDBACK
   ========================================================= */

const navLinks = document.querySelectorAll(".nav_bar a");

navLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        /*
            These links currently point to "#".
            Prevent the browser from jumping to the top.
        */

        if (link.getAttribute("href") === "#") {
            event.preventDefault();
        }

        navLinks.forEach((navLink) => {
            navLink.classList.remove("nav_active");
        });

        link.classList.add("nav_active");
    });

});


/* =========================================================
   7. PREVENT CTA DEFAULT BEHAVIOUR IF TARGET IS MISSING
   ========================================================= */

const bannerCTA = document.querySelector(".banner_cta");

if (bannerCTA) {

    bannerCTA.addEventListener("click", (event) => {

        const target = document.querySelector("#shop");

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

}