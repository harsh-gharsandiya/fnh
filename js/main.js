jQuery(document).on(
    "ready",
    (function ($) {
        "use strict";

        /*--------------------------
        PUSH CONTENT OPEN COLOSE
    ---------------------------*/

        var $content = $(".right-details-content");
        $(".info-button").on("click", function () {
            $content.addClass("content-open");
            return false;
        });
        $(".push-content-close").on("click", function () {
            $content.removeClass("content-open");
        });

        var $contentContact = $(".left-contact-content");
        $(".contact-button").on("click", function () {
            $contentContact.addClass("content-open");
            return false;
        });
        $(".push-content-close").on("click", function () {
            $contentContact.removeClass("content-open");
        });
        $content.css({
            "overflow-x": "hidden",
            "overflow-y": "scroll",
        });
        $contentContact.css({
            "overflow-x": "hidden",
            "overflow-y": "scroll",
        });

        /*--------------------------
        SMOOTH SCROLL
    ----------------------------*/
        $(".right-details-content , .left-contact-content").niceScroll({
            cursorwidth: "0px",
        });

        /*-------------------------------
        COWNDOWN TIMER
    --------------------------------*/
        $(".clock-countdown").downCount(
            {
                date: $(".site-config").attr("data-date"),
                offset: +10,
            },
            function () {
                //callback here if finished
                //alert('YES, done!');
            },
        );

        /*---------------------------
        MICHIMP INTEGRATION
    -----------------------------*/
        $("#mc-form").ajaxChimp({
            url: "http://devitfamily.us14.list-manage.com/subscribe/post?u=a77a312486b6e42518623c58a&amp;id=8e9f692d44", //Set Your Mailchamp URL
            callback: function (resp) {
                if (resp.result === "success") {
                    $(".subscriber-form input, .subscriber-form button").hide();
                }
            },
        });

        /*------------------------------
        GALLEY POPUP
    -------------------------------*/
        $(".single-gallery a").magnificPopup({
            type: "image",
            removalDelay: 500, //delay removal by X to allow out-animation
            callbacks: {
                beforeOpen: function () {
                    // just a hack that adds mfp-anim class to markup
                    this.st.image.markup = this.st.image.markup.replace(
                        "mfp-figure",
                        "mfp-figure mfp-with-anim",
                    );
                    this.st.mainClass = this.st.el.attr("data-effect");
                },
            },
            gallery: {
                enabled: true,
            },
            closeOnContentClick: true,
            midClick: true, // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
        });

        /* MEDIA POPUP */
        $(".popup-media").magnificPopup({
            type: "image",
            gallery: { enabled: true },
            closeOnContentClick: true,
        });

        $(".popup-video").magnificPopup({
            type: "iframe",
            iframe: {
                patterns: {
                    mp4: {
                        index: ".mp4",
                        src: "%id%",
                    },
                },
            },
        });
    })(jQuery),
);

jQuery(window).on("load", function () {
    "use strict";
    /*--------------------------
        PRE LOADER
    ----------------------------*/
    $(".preeloader").fadeOut(1000);
});
