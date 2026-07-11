(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var header = document.getElementById("siteHeader");
    var navToggle = document.getElementById("navToggle");
    var nav = document.getElementById("mainNav");

    /* Sticky header state */
    function onScroll() {
      if (window.scrollY > 40) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* Mobile nav toggle */
    if (navToggle && nav) {
      navToggle.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        navToggle.classList.toggle("open", open);
        navToggle.setAttribute("aria-expanded", String(open));
      });
      nav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          nav.classList.remove("open");
          navToggle.classList.remove("open");
          navToggle.setAttribute("aria-expanded", "false");
        });
      });
    }

    /* Scroll reveal with stagger for grouped items */
    var revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var el = entry.target;
              var parent = el.parentElement;
              var siblings = parent
                ? Array.prototype.filter.call(parent.children, function (c) {
                    return c.classList.contains("reveal");
                  })
                : [el];
              var idx = siblings.indexOf(el);
              el.style.transitionDelay = Math.min(idx * 80, 480) + "ms";
              el.classList.add("in");
              observer.unobserve(el);
            }
          });
        },
        { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
      );
      revealEls.forEach(function (el) { observer.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add("in"); });
    }

    /* Ensure hero video autoplays where allowed */
    var heroVideo = document.querySelector(".hero-video");
    if (heroVideo) {
      var playPromise = heroVideo.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(function () {
          /* Autoplay blocked — fallback poster/image remains visible */
        });
      }
    }

    /* Signature cocktails lightbox */
    var lightbox = document.getElementById("lightbox");
    if (lightbox) {
      var lbImg = document.getElementById("lightboxImg");
      var lbName = document.getElementById("lightboxName");
      var lbTag = document.getElementById("lightboxTag");
      var lbClose = document.getElementById("lightboxClose");
      var lastFocused = null;

      function openLightbox(card) {
        lastFocused = card;
        lbImg.src = card.getAttribute("data-img");
        lbImg.alt = card.getAttribute("data-name") || "";
        lbName.textContent = card.getAttribute("data-name") || "";
        lbTag.textContent = card.getAttribute("data-tag") || "";
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        lbClose.focus();
      }
      function closeLightbox() {
        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        if (lastFocused) lastFocused.focus();
      }

      document.querySelectorAll(".sig-card").forEach(function (card) {
        card.addEventListener("click", function () { openLightbox(card); });
      });
      lbClose.addEventListener("click", closeLightbox);
      lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) closeLightbox();
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
      });
    }

    /* Current year in footer */
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();
