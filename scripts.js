/* =====================================================
     Behaviour
     ===================================================== */

// 1. Track expand / collapse
document.querySelectorAll(".track").forEach((track) => {
  track.addEventListener("click", (e) => {
    // Don't toggle if clicking a link inside the liner notes
    if (e.target.closest("a")) return;
    track.classList.toggle("open");
  });
  // Keyboard accessibility
  track.setAttribute("role", "button");
  track.setAttribute("tabindex", "0");
  track.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      track.classList.toggle("open");
    }
  });
});

// 2. Reveal-on-scroll using IntersectionObserver
const revealEls = document.querySelectorAll(".reveal, .reveal-stagger");
const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        revealObs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
);
revealEls.forEach((el) => revealObs.observe(el));

// 3. Now-playing tracker (updates as user scrolls through sections)
const sectionMap = [
  { id: "cover", label: "side a · pre-amble" },
  { id: "side-a", label: "side a · the engineer" },
  { id: "side-b", label: "side b · the studio" },
  { id: "hidden", label: "hidden track · framekit studios" },
  { id: "equipment", label: "equipment · used in production" },
  { id: "awards", label: "awards · & credits" },
  { id: "liner", label: "liner notes · sleeve" },
];

const npEl = document.getElementById("now-playing");
const npTrackEl = document.getElementById("np-track");
const navLinks = document.querySelectorAll("#primary-nav a");

let currentSection = null;
let lastScrollY = 0;

function updateNowPlaying() {
  const fromTop = window.scrollY + window.innerHeight * 0.4;
  let active = sectionMap[0];

  for (const s of sectionMap) {
    const el = document.getElementById(s.id);
    if (!el) continue;
    if (el.offsetTop <= fromTop) active = s;
  }

  if (active.id !== currentSection) {
    currentSection = active.id;
    npTrackEl.textContent = active.label;
    // Highlight nav link
    navLinks.forEach((a) => {
      const target = a.getAttribute("data-target");
      a.classList.toggle("active", target === active.id);
    });
  }

  // Show now-playing widget once the user scrolls past the cover
  const cover = document.getElementById("cover");
  if (cover && window.scrollY > cover.offsetHeight * 0.5) {
    npEl.classList.add("visible");
  } else {
    npEl.classList.remove("visible");
  }
}

// Throttle with rAF
let ticking = false;
window.addEventListener(
  "scroll",
  () => {
    lastScrollY = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(() => {
        updateNowPlaying();
        ticking = false;
      });
      ticking = true;
    }
  },
  { passive: true },
);
updateNowPlaying();

// 4. Flip-the-record button
const flipBtn = document.getElementById("flip-btn");
const flipOverlay = document.getElementById("flip-overlay");
const sideB = document.getElementById("side-b");

if (flipBtn && flipOverlay && sideB) {
  flipBtn.addEventListener("click", () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      sideB.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    flipOverlay.classList.add("flipping");
    // Halfway through the flip, scroll so the user lands on Side B
    setTimeout(() => {
      sideB.scrollIntoView({ behavior: "auto", block: "start" });
    }, 450);
    // Remove the class once the animation has fully finished
    setTimeout(() => {
      flipOverlay.classList.remove("flipping");
    }, 950);
  });
}

// 5. Smooth-scroll for masthead nav (respects reduced motion)
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("data-target");
    const target = document.getElementById(targetId);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ============================================================
// Optional: Spotify "now playing" hook
// ------------------------------------------------------------
// If you set up a small endpoint or GitHub Action that
// writes a now-playing.json file to your site, you can
// swap the section-tracker label for the live track:
// ------------------------------------------------------------
//
// fetch('/now-playing.json')
//   .then(r => r.json())
//   .then(d => {
//     if (d && d.is_playing) {
//       document.getElementById('np-track').textContent =
//         d.title + ' — ' + d.artist;
//     }
//   })
//   .catch(() => {});  // keep section-tracker fallback
// ============================================================
