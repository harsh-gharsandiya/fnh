let autoSlideInterval;

document.addEventListener("DOMContentLoaded", () => {
    let currentIndex = 0;
    const slider = document.querySelector(".simple-slider");

    if (!slider) return;

    // Count all children (videos AND images)
    const totalSlides = slider.children.length;

    function pauseAllVideos() {
        slider.querySelectorAll("video").forEach((video) => {
            video.pause();
            video.currentTime = 0;
            const slide = video.closest(".video-slide");
            if (slide) slide.classList.remove("playing");
        });
    }

    function shouldResetOnMobile(index) {
        return window.innerWidth <= 767 && index >= totalSlides - 1;
    }

    function getVisibleCount() {
        if (window.innerWidth <= 767) return 1; // Mobile: 1 slide
        if (window.innerWidth <= 991) return 2; // Tablet: 2 slides
        return 3; // Desktop: 3 slides
    }

    function updateSlider() {
        const slideWidth = slider.children[0].offsetWidth;

        if (shouldResetOnMobile(currentIndex)) {
            currentIndex = 0;
        }

        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    // Auto-slide function
    function startAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            pauseAllVideos();

            const visibleCount = getVisibleCount();
            const maxIndex = totalSlides - visibleCount;

            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }

            if (window.innerWidth <= 767 && currentIndex === maxIndex) {
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
            clearInterval(autoSlideInterval);

            const visibleCount = getVisibleCount();
            const maxIndex = totalSlides - visibleCount;

            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }

            updateSlider();
            startAutoSlide();
        };
    }

    // Previous button
    const prevBtn = document.getElementById("slidePrev");
    if (prevBtn) {
        prevBtn.onclick = () => {
            pauseAllVideos();
            clearInterval(autoSlideInterval);

            const visibleCount = getVisibleCount();
            const maxIndex = totalSlides - visibleCount;

            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = maxIndex;
            }

            updateSlider();
            startAutoSlide();
        };
    }

    // VIDEO PLAY FUNCTIONALITY
    document.querySelectorAll(".video-slide").forEach((slide) => {
        const video = slide.querySelector("video");
        const playBtn = slide.querySelector(".video-play");

        if (!video || !playBtn) return;

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

        video.addEventListener("play", () => {
            clearInterval(autoSlideInterval);
            slide.classList.add("playing");
        });

        video.addEventListener("pause", () => {
            slide.classList.remove("playing");
            startAutoSlide();
        });

        video.addEventListener("ended", () => {
            slide.classList.remove("playing");
            video.currentTime = 0;
            startAutoSlide();
        });
    });

    // Responsive handling
    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const visibleCount = getVisibleCount();
            const maxIndex = totalSlides - visibleCount;

            // Reset if current position is invalid
            if (currentIndex > maxIndex) {
                currentIndex = 0;
            }

            updateSlider();
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }, 250);
    });

    // Initialize
    updateSlider();
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
    const reviews = Array.from(document.querySelectorAll(".review-card"));
    const prevBtn = document.getElementById("reviewPrev");
    const nextBtn = document.getElementById("reviewNext");
    const dotsContainer = document.querySelector(".review-dots");

    if (!reviews.length) return;

    let currentPage = 0;
    let autoSlideInterval;

    function getReviewsPerView() {
        return window.innerWidth <= 767 ? 1 : 2;
    }

    function getTotalPages() {
        return Math.ceil(reviews.length / getReviewsPerView());
    }

    function renderDots() {
        if (!dotsContainer) return;

        dotsContainer.innerHTML = "";
        const totalPages = getTotalPages();

        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement("span");
            dot.className = "dot";
            if (i === currentPage) dot.classList.add("active");

            dot.addEventListener("click", () => {
                stopAutoSlide();
                showPage(i);
                startAutoSlide();
            });

            dotsContainer.appendChild(dot);
        }
    }

    function showPage(page) {
        const perView = getReviewsPerView();
        const totalPages = getTotalPages();

        if (page >= totalPages) currentPage = 0;
        else if (page < 0) currentPage = totalPages - 1;
        else currentPage = page;

        reviews.forEach((r) => r.classList.remove("active"));

        const start = currentPage * perView;
        for (let i = 0; i < perView; i++) {
            if (reviews[start + i]) {
                reviews[start + i].classList.add("active");
            }
        }

        renderDots();
    }

    function nextPage() {
        showPage(currentPage + 1);
    }

    function prevPage() {
        showPage(currentPage - 1);
    }

    function startAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextPage, 6000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // INIT
    showPage(0);
    startAutoSlide();

    nextBtn?.addEventListener("click", () => {
        stopAutoSlide();
        nextPage();
        startAutoSlide();
    });

    prevBtn?.addEventListener("click", () => {
        stopAutoSlide();
        prevPage();
        startAutoSlide();
    });

    // Responsive handling
    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            currentPage = 0;
            showPage(0);
            startAutoSlide();
        }, 250);
    });
});
