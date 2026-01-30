// IMPROVED IMAGE SLIDER
document.addEventListener("DOMContentLoaded", () => {
    let currentIndex = 0;
    const slider = document.querySelector(".simple-slider");
    const totalImages = slider.children.length;
    let autoSlideInterval;

    function getVisibleCount() {
        if (window.innerWidth <= 575) return 1;
        if (window.innerWidth <= 991) return 2;
        return 3;
    }

    function getSlidePercent() {
        return 100 / getVisibleCount();
    }

    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * getSlidePercent()}%)`;
    }

    // Next button
    document.getElementById("slideNext").onclick = () => {
        const visible = getVisibleCount();
        const maxIndex = totalImages - visible;

        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back to start
        }

        updateSlider();
    };

    // Previous button
    document.getElementById("slidePrev").onclick = () => {
        const visible = getVisibleCount();
        const maxIndex = totalImages - visible;

        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = maxIndex; // Loop to end
        }

        updateSlider();
    };

    // Auto-slide function
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            const visible = getVisibleCount();
            const maxIndex = totalImages - visible;

            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0; // Loop back
            }

            updateSlider();
        }, 4000); // 4 seconds
    }

    // Responsive handling
    window.addEventListener("resize", () => {
        updateSlider();
    });

    // Start auto-slide
    startAutoSlide();
});

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const closeModal = document.querySelector(".close-modal");

document.querySelectorAll(".simple-slider img").forEach((img) => {
    img.addEventListener("click", () => {
        modalImg.src = img.src;
        modal.style.display = "flex";
    });
});

closeModal.onclick = () => {
    modal.style.display = "none";
};

modal.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
};

// google review slider

document.addEventListener("DOMContentLoaded", function () {
    const reviews = document.querySelectorAll(".review-card");
    const dots = document.querySelectorAll(".dot");
    const prevBtn = document.getElementById("reviewPrev");
    const nextBtn = document.getElementById("reviewNext");
    let currentSlide = 0;
    let autoSlideInterval;
    const REVIEWS_PER_VIEW = window.innerWidth <= 767 ? 1 : 2;

    function showSlide(n) {
        // Calculate total slides based on reviews per view
        const totalSlides = Math.ceil(reviews.length / REVIEWS_PER_VIEW);

        // Loop around if out of bounds
        if (n >= totalSlides) {
            currentSlide = 0;
        } else if (n < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = n;
        }

        // Remove active class from all
        reviews.forEach((review) => review.classList.remove("active"));
        dots.forEach((dot) => dot.classList.remove("active"));

        // Add active class to current pair/single
        const startIdx = currentSlide * REVIEWS_PER_VIEW;
        for (
            let i = 0;
            i < REVIEWS_PER_VIEW && startIdx + i < reviews.length;
            i++
        ) {
            reviews[startIdx + i].classList.add("active");
        }

        // Update corresponding dot
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add("active");
        }
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 6000); // Longer for 2 reviews
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Start auto-slide
    startAutoSlide();

    // Next button
    nextBtn.addEventListener("click", function () {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    // Previous button
    prevBtn.addEventListener("click", function () {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });

    // Click on dots
    dots.forEach((dot, index) => {
        dot.addEventListener("click", function () {
            stopAutoSlide();
            showSlide(index);
            startAutoSlide();
        });
    });
});
