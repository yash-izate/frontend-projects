/* =========================================================
   MYNTRA CLONE - PHASE 2 INTERACTIONS
   ========================================================= */


/* =========================================================
   1. ELEMENT REFERENCES
   ========================================================= */

const header = document.querySelector("header");
const bannerContainer = document.querySelector(".banner_container");


/* =========================================================
   2. SCROLL-AWARE HEADER
   ========================================================= */

function handleHeaderScroll() {

    if (window.scrollY > 20) {
        header.classList.add("header_scrolled");
    } else {
        header.classList.remove("header_scrolled");
    }

}


/* =========================================================
   3. BACK TO TOP VISIBILITY
   ========================================================= */

const backToTop = document.createElement("button");

backToTop.className = "back_to_top";

backToTop.setAttribute(
    "aria-label",
    "Back to top"
);

backToTop.innerHTML = `
    <span class="material-symbols-outlined">
        arrow_upward
    </span>
`;

document.body.appendChild(backToTop);


function handleBackToTopVisibility() {

    if (window.scrollY > 500) {
        backToTop.classList.add("back_to_top_visible");
    } else {
        backToTop.classList.remove("back_to_top_visible");
    }

}


/* =========================================================
   4. COMBINED SCROLL HANDLER
   ========================================================= */

window.addEventListener(
    "scroll",
    () => {

        handleHeaderScroll();
        handleBackToTopVisibility();

    },
    {
        passive: true
    }
);


/* =========================================================
   5. BACK TO TOP ACTION
   ========================================================= */

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================================
   6. SCROLL REVEAL
   ========================================================= */

const revealElements = document.querySelectorAll(
    ".category_heading, .category_items, .footer_container"
);


const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add(
                    "reveal_visible"
                );

                revealObserver.unobserve(
                    entry.target
                );

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
   7. HERO / BANNER CTA
   ========================================================= */

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


    /*
        Create the temporary shop destination.
    */

    const categoryHeadings = document.querySelectorAll(
        ".category_heading"
    );

    if (categoryHeadings.length > 0) {

        categoryHeadings[0].id = "shop";

    }


    /*
        Smooth scroll to the shop section.
    */

    bannerCTA.addEventListener("click", (event) => {

        const target = document.querySelector("#shop");

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

}