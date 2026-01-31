// IMPROVED IMAGE SLIDER
let autoSlideInterval;

document.addEventListener("DOMContentLoaded", () => {
    let currentIndex = 0;
    const slider = document.querySelector(".simple-slider");

    if (!slider) return;

    const totalImages = slider.children.length;

    function pauseAllVideos() {
        slider.querySelectorAll("video").forEach((video) => {
            video.pause();
            video.currentTime = 0;
            const slide = video.closest(".video-slide");
            if (slide) slide.classList.remove("playing");
        });
    }

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

    // Auto-slide function
    function startAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            pauseAllVideos();

            const visible = getVisibleCount();
            const maxIndex = totalImages - visible;

            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }

            updateSlider();
        }, 4000);
    }

    // Next button
    const nextBtn = document.getElementById("slideNext");
    if (nextBtn) {
        nextBtn.onclick = () => {
            pauseAllVideos();
            const visible = getVisibleCount();
            const maxIndex = totalImages - visible;

            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }

            updateSlider();
        };
    }

    // Previous button
    const prevBtn = document.getElementById("slidePrev");
    if (prevBtn) {
        prevBtn.onclick = () => {
            pauseAllVideos();
            const visible = getVisibleCount();
            const maxIndex = totalImages - visible;

            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = maxIndex;
            }

            updateSlider();
        };
    }

    // VIDEO PLAY FUNCTIONALITY
    document.querySelectorAll(".video-slide").forEach((slide) => {
        const video = slide.querySelector("video");
        const playBtn = slide.querySelector(".video-play");

        if (!video || !playBtn) return;

        // Click on play button
        playBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (video.paused) {
                clearInterval(autoSlideInterval);
                video.play().catch((err) => console.log("Play error:", err));
                slide.classList.add("playing");
            } else {
                video.pause();
                slide.classList.remove("playing");
                startAutoSlide();
            }
        });

        // Click on video itself
        video.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (video.paused) {
                clearInterval(autoSlideInterval);
                video.play().catch((err) => console.log("Play error:", err));
                slide.classList.add("playing");
            } else {
                video.pause();
                slide.classList.remove("playing");
                startAutoSlide();
            }
        });

        // When video starts playing
        video.addEventListener("play", () => {
            clearInterval(autoSlideInterval);
            slide.classList.add("playing");
        });

        // When video pauses
        video.addEventListener("pause", () => {
            slide.classList.remove("playing");
            startAutoSlide();
        });

        // When video ends
        video.addEventListener("ended", () => {
            slide.classList.remove("playing");
            video.currentTime = 0;
            startAutoSlide();
        });
    });

    // Responsive handling
    window.addEventListener("resize", () => {
        updateSlider();
    });

    // Start auto-slide
    startAutoSlide();
});

// IMAGE MODAL
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const closeModal = document.querySelector(".close-modal");

if (modal && modalImg && closeModal) {
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
}

// GOOGLE REVIEW SLIDER
document.addEventListener("DOMContentLoaded", function () {
    const reviews = document.querySelectorAll(".review-card");
    const dots = document.querySelectorAll(".dot");
    const prevBtn = document.getElementById("reviewPrev");
    const nextBtn = document.getElementById("reviewNext");

    if (!reviews.length) return;

    let currentSlide = 0;
    let reviewAutoSlideInterval;
    const REVIEWS_PER_VIEW = window.innerWidth <= 767 ? 1 : 2;

    function showSlide(n) {
        const totalSlides = Math.ceil(reviews.length / REVIEWS_PER_VIEW);

        if (n >= totalSlides) {
            currentSlide = 0;
        } else if (n < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = n;
        }

        reviews.forEach((review) => review.classList.remove("active"));
        dots.forEach((dot) => dot.classList.remove("active"));

        const startIdx = currentSlide * REVIEWS_PER_VIEW;
        for (
            let i = 0;
            i < REVIEWS_PER_VIEW && startIdx + i < reviews.length;
            i++
        ) {
            reviews[startIdx + i].classList.add("active");
        }

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
        clearInterval(reviewAutoSlideInterval);
        reviewAutoSlideInterval = setInterval(nextSlide, 6000);
    }

    function stopAutoSlide() {
        clearInterval(reviewAutoSlideInterval);
    }

    startAutoSlide();

    if (nextBtn) {
        nextBtn.addEventListener("click", function () {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", function () {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", function () {
            stopAutoSlide();
            showSlide(index);
            startAutoSlide();
        });
    });
});
