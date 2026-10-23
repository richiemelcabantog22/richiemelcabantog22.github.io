/* =========================================================
   Richiemel Cabantog — Portfolio interactions
   Vanilla JS, no dependencies
   ========================================================= */
(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Current year ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Header, progress bar, back-to-top ---------- */
  const header = $(".site-header");
  const progressBar = $(".scroll-progress span");
  const toTop = $(".to-top");

  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 12);

    if (progressBar) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
    }

    if (toTop) toTop.classList.toggle("visible", y > 700);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  /* ---------- Mobile menu ---------- */
  const navToggle = $(".nav-toggle");
  const mobilePanel = $("#mobile-menu");

  const closeMenu = () => {
    if (!navToggle || !mobilePanel) return;
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
    mobilePanel.classList.remove("open");
    document.body.classList.remove("menu-open");
  };

  navToggle?.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
    navToggle.classList.toggle("is-open", !isOpen);
    mobilePanel?.classList.toggle("open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  $$("#mobile-menu a").forEach((link) => link.addEventListener("click", closeMenu));

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) closeMenu();
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = $$("[data-reveal]");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    revealEls.forEach((el) => {
      const siblings = [...el.parentElement.children].filter((child) =>
        child.hasAttribute("data-reveal")
      );
      const index = siblings.indexOf(el);
      el.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 80}ms`);
    });

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* ---------- Active nav link ---------- */
  const navLinks = $$(".nav-links a[href^='#']");
  const sections = $$("main section[id]");

  if ("IntersectionObserver" in window && navLinks.length && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = `#${entry.target.id}`;
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === id);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => spy.observe(section));
  }

  /* ---------- Typewriter role ---------- */
  const roleEl = $("#role-text");
  const roles = [
    "Full-Stack Developer",
    "Flutter Developer",
    "IT Support & Troubleshooting",
    "Problem Solver",
  ];

  if (roleEl) {
    if (reduceMotion) {
      roleEl.textContent = roles[0];
    } else {
      let roleIndex = 0;
      let charIndex = 0;
      let deleting = false;

      const tick = () => {
        const word = roles[roleIndex];
        roleEl.textContent = word.slice(0, charIndex);

        if (!deleting) {
          if (charIndex < word.length) {
            charIndex += 1;
            window.setTimeout(tick, 52);
          } else {
            deleting = true;
            window.setTimeout(tick, 1900);
          }
        } else if (charIndex > 0) {
          charIndex -= 1;
          window.setTimeout(tick, 26);
        } else {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          window.setTimeout(tick, 320);
        }
      };

      window.setTimeout(tick, 450);
    }
  }

  /* ---------- Lazy YouTube player ---------- */
  $$(".video-frame").forEach((frame) => {
    const videoId = frame.dataset.videoId;
    const playButton = $(".video-play", frame);
    if (!videoId || !playButton) return;

    const play = () => {
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
      iframe.title = "TransTrack demo video";
      iframe.loading = "lazy";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;

      frame.classList.add("is-playing");
      frame.replaceChildren(iframe);
      iframe.focus?.();
    };

    playButton.addEventListener("click", play);
  });

  /* ---------- Project filters ---------- */
  const filterButtons = $$(".filter");
  const projectCards = $$(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((other) => {
        const active = other === button;
        other.classList.toggle("is-active", active);
        other.setAttribute("aria-pressed", String(active));
      });

      const filter = button.dataset.filter;

      projectCards.forEach((card) => {
        const matches = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !matches);

        if (matches) {
          card.classList.remove("card-in");
          // Force reflow so the animation can replay.
          void card.offsetWidth;
          card.classList.add("card-in");
        }
      });
    });
  });

  /* ---------- Card spotlight (pointer devices only) ---------- */
  if (window.matchMedia("(pointer: fine)").matches && !reduceMotion) {
    $$(".project-card, .skill-card").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        card.style.setProperty("--my", `${event.clientY - rect.top}px`);
      });
    });
  }

  /* ---------- Copy email ---------- */
  const copyButton = $("[data-copy]");
  const toast = $(".toast");
  let toastTimer;

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2400);
  };

  copyButton?.addEventListener("click", async () => {
    const email = copyButton.dataset.copy;
    if (!email) return;

    try {
      await navigator.clipboard.writeText(email);
      showToast("Email copied — talk soon!");
    } catch {
      const helper = document.createElement("textarea");
      helper.value = email;
      helper.setAttribute("readonly", "");
      helper.style.position = "fixed";
      helper.style.opacity = "0";
      document.body.appendChild(helper);
      helper.select();
      try {
        document.execCommand("copy");
        showToast("Email copied — talk soon!");
      } catch {
        showToast(email);
      }
      helper.remove();
    }
  });

  /* ---------- Screenshot lightbox ---------- */
  const lightbox = $("#lightbox");
  if (lightbox && typeof lightbox.showModal === "function") {
    const lightboxImg = $(".lightbox-inner img", lightbox);
    const lightboxCaption = $(".lightbox-caption", lightbox);
    const lightboxClose = $(".lightbox-close", lightbox);
    const shots = $$(".screens-grid figure");

    const figureLabel = (figure) => {
      const caption = $("figcaption", figure);
      if (!caption) return "";
      return [...caption.children]
        .map((child) => child.textContent.replace(/\s+/g, " ").trim())
        .filter(Boolean)
        .join(" — ");
    };

    const openShot = (figure) => {
      const img = $("img", figure);
      if (!img || !lightboxImg) return;
      lightboxImg.src = img.currentSrc || img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = figureLabel(figure);
      lightbox.showModal();
      document.body.classList.add("lightbox-open");
    };

    shots.forEach((figure) => {
      const label = figureLabel(figure);
      figure.tabIndex = 0;
      figure.setAttribute("role", "button");
      figure.setAttribute("aria-label", `View ${label || "screenshot"} full size`);
      figure.addEventListener("click", () => openShot(figure));
      figure.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openShot(figure);
        }
      });
    });

    lightboxClose?.addEventListener("click", () => lightbox.close());
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) lightbox.close();
    });
    lightbox.addEventListener("close", () => {
      document.body.classList.remove("lightbox-open");
    });
  }
})();
