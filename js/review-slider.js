document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".review-slider");
    const cards = document.querySelectorAll(".review-slider > div");

    let index = 0;
    const visible = 3; // desktop
    const total = cards.length;

    function slideReviews() {
        index++;
        if (index > total - visible) index = 0;
        slider.style.transform = `translateX(-${index * 33.333}%)`;
    }

    let interval = setInterval(slideReviews, 3500);

    slider.addEventListener("mouseenter", () => clearInterval(interval));
    slider.addEventListener("mouseleave", () => {
        interval = setInterval(slideReviews, 3500);
    });
});
