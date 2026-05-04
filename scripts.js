/* =============================================================
   WORKSHOP OS — scripts
   Boot sequence, window manager, taskbar, project preview.
   ============================================================= */

(function () {
  "use strict";

  // -------------------------------------------------------------
  // 1.  PROJECT DATA
  //     (Lives in JS so the file browser can render previews.)
  // -------------------------------------------------------------

  const PROJECTS = {
    tuned: {
      name: "tuned",
      title: ["tuned", "— single"],
      status: "live",
      statusLabel: "live · framekit studios",
      runtime: "2026",
      meta: "javascript · logic puzzles · framekit",
      body: [
        "Ten dead-simple games that calibrate your senses. Five rounds each. See how sharp you really are. ",
      ],
      tags: ["javascript", "html", "puzzles", "framekit"],
      actions: [
        {
          label: "visit site ↗",
          href: "https://dafydd-rhys.github.io/tuned",
          primary: true,
        },
        {
          label: "source ↗",
          href: "https://github.com/dafydd-rhys/tuned",
        },
      ],
    },
    refinery: {
      name: "maunds-refinery",
      title: ["Maunds Refinery", "— single"],
      status: "live",
      statusLabel: "live · maunds-refinery.com",
      runtime: "2026",
      meta: "api-first html toolkit · javascript · node · express",
      body: [
        "An API-first HTML refinery that cleans, prettifies, condenses, and optimises markup. Designed to be safe by default, deterministic, and suitable for automated pipelines — the kind of thing you reach for when you need to trust the output, not eyeball it.",
      ],
      tags: ["javascript", "node.js", "express", "npm package", "html", "css"],
      actions: [
        {
          label: "visit site ↗",
          href: "https://maunds-refinery.com",
          primary: true,
        },
        {
          label: "source ↗",
          href: "https://github.com/dafydd-rhys/maunds-refinery",
        },
      ],
    },
    "sql-duel": {
      name: "sql-duel",
      title: ["SQL Duel", "— single"],
      status: "live",
      statusLabel: "live · dafydd-rhys.github.io/sql-duel",
      runtime: "2026",
      meta: "browser app · neon-styled · query optimisation",
      body: [
        "Define a database schema, write two SELECT queries, and find out which one is likely to cost you less. Estimates relative cost from indexes, row counts, joins, filters, and sort behaviour, then explains why.",
      ],
      tags: ["javascript", "sql", "query optimisation"],
      actions: [
        {
          label: "visit site ↗",
          href: "https://dafydd-rhys.github.io/sql-duel",
          primary: true,
        },
        { label: "source ↗", href: "https://github.com/dafydd-rhys/sql-duel" },
      ],
    },
    "degree-classify": {
      name: "degree-classify",
      title: ["Degree Classify", "— single"],
      status: "live",
      statusLabel: "live · degreeclassify.co.uk",
      runtime: "2025",
      meta: "90+ uk universities · framekit",
      body: [
        "A web platform that calculates UK degree outcomes using institution-specific classification rules across 90+ universities. Grade analysis, module planning, and progress tracking — built for the students who actually need to know what they need to score.",
      ],
      tags: ["javascript", "full-stack", "framekit"],
      actions: [
        {
          label: "visit site ↗",
          href: "https://degreeclassify.co.uk",
          primary: true,
        },
      ],
    },
    "poster-composer": {
      name: "poster-composer",
      title: ["Poster Composer", "— single"],
      status: "live",
      statusLabel: "live · postercomposer.com",
      runtime: "2024",
      meta: "spotify api · canvas · framekit",
      body: [
        "A poster-generation platform for custom album artwork. Editable templates, dynamic rendering, and a Spotify API integration that pulls real album data so the poster you make actually matches the record on your shelf. Reusable templates, edit-preview-download workflow.",
      ],
      tags: ["javascript", "spotify api", "canvas", "framekit"],
      actions: [
        {
          label: "visit site ↗",
          href: "https://postercomposer.com",
          primary: true,
        },
      ],
    },
    "uni-chatbot": {
      name: "swansea-chatbot",
      title: ["Swansea Uni Chatbot", "— msc thesis"],
      status: "archived",
      statusLabel: "production-ready · msc thesis",
      runtime: "2025",
      meta: "rasa · roberta · fastapi",
      body: [
        "An IT-services chatbot for Swansea University. Trained on real helpline data, leveraging NLP and rule-based dialogue flows to handle support requests at scale. The thesis project that turned into something the university could actually use.",
      ],
      tags: ["python", "rasa", "react", "node.js", "postgresql", "nlp"],
      actions: [
        {
          label: "source ↗",
          href: "https://github.com/dafydd-rhys/swansea-uni-chatbot",
        },
      ],
    },
    watchalong: {
      name: "watchalong",
      title: ["Watchalong", "— bsc dissertation"],
      status: "archived",
      statusLabel: "bsc dissertation",
      runtime: "2024",
      meta: "react · socket.io · multi-platform sync",
      body: [
        "A synchronous media-streaming app — watch and listen together across YouTube, SoundCloud, Twitch, and Facebook in real time. The watchalong / listenalong service I wanted to exist. Drift correction, persistent rooms, chat that doesn't break.",
      ],
      tags: ["react", "node.js", "socket.io", "real-time"],
      actions: [
        {
          label: "source ↗",
          href: "https://github.com/dafydd-rhys/full-stack-entertainment-react",
        },
      ],
    },
    "text-editor": {
      name: "realtime-editor",
      title: ["Real-time text editor", ""],
      status: "archived",
      statusLabel: "collaborative · multi-user",
      runtime: "2025",
      meta: "quill · mongodb · socket.io",
      body: [
        "A real-time collaborative editor — Google-Docs-style multi-user editing, rich-text formatting, autosaves to MongoDB, persistent sessions. React + Quill + Socket.io.",
      ],
      tags: ["react", "quill.js", "socket.io", "mongodb"],
      actions: [
        {
          label: "source ↗",
          href: "https://github.com/dafydd-rhys/real-time-text-editor",
        },
      ],
    },
    "land-cover": {
      name: "land-cover",
      title: ["Land cover detection", ""],
      status: "archived",
      statusLabel: "cnn · svd · hog · satellite imagery",
      runtime: "2024",
      meta: "machine learning · computer vision",
      body: [
        "A machine-learning pipeline classifying land-cover types from satellite and aerial imagery. SVD for dimensionality, HoG features, CNN on top. Comparing classical and deep approaches end-to-end.",
      ],
      tags: ["python", "cnn", "computer vision", "jupyter"],
      actions: [
        {
          label: "source ↗",
          href: "https://github.com/dafydd-rhys/land-cover-detection",
        },
      ],
    },
    galactic: {
      name: "galactic-siege",
      title: ["Galactic Siege", ""],
      status: "archived",
      statusLabel: "unity · arcade shooter",
      runtime: "2024",
      meta: "unity · c# · game design",
      body: [
        "A Unity arcade shooter — Asteroids meets Space Invaders. Diverse enemy types, dynamic power-ups, special abilities. Built mostly because it was fun to build.",
      ],
      tags: ["c#", "unity", "game design"],
      actions: [
        {
          label: "source ↗",
          href: "https://github.com/dafydd-rhys/galactic-siege",
        },
      ],
    },
    spacex: {
      name: "spacex-analysis",
      title: ["SpaceX data analysis", ""],
      status: "archived",
      statusLabel: "data science · viz",
      runtime: "2024",
      meta: "launches & landings · pandas",
      body: [
        "End-to-end analysis of SpaceX launch and landing data — collection, cleaning, exploratory analysis, and visualisation across rocket models and mission profiles.",
      ],
      tags: ["python", "pandas", "matplotlib", "jupyter"],
      actions: [
        {
          label: "source ↗",
          href: "https://github.com/dafydd-rhys/spacex-data-analysis",
        },
      ],
    },
    "path-finder": {
      name: "visual-pathfinder",
      title: ["Visual path finder", ""],
      status: "archived",
      statusLabel: "a* · algorithm viz",
      runtime: "2024",
      meta: "java · algorithms",
      body: [
        "An interactive A* pathfinder. Drop blockers, set multiple goals, watch the algorithm reason its way through. Built to make the heuristic stop being abstract.",
      ],
      tags: ["java", "algorithms", "a*"],
      actions: [
        {
          label: "source ↗",
          href: "https://github.com/dafydd-rhys/visual-path-finder",
        },
      ],
    },
  };

  // Section labels for the now-playing widget
  const SECTION_LABELS = {
    readme: "README.md",
    career: "Career.log — side a",
    projects: "Projects/ — side b",
    studio: "Studio/ — framekit",
    skills: "Skills.term",
    awards: "Awards.txt",
    contact: "Contact.vcf",
  };

  // -------------------------------------------------------------
  // 2.  BOOT SEQUENCE
  // -------------------------------------------------------------

  const bootScreen = document.getElementById("boot-screen");
  const bootLog = document.getElementById("boot-log");

  const BOOT_LINES = [
    {
      t: 60,
      html: '<span class="dim">[</span><span class="ok">  OK  </span><span class="dim">]</span> <span class="ink">mounting filesystem</span> <span class="dim">/dev/sda1</span>',
    },
    {
      t: 220,
      html: '<span class="dim">[</span><span class="ok">  OK  </span><span class="dim">]</span> <span class="ink">loading user profile</span> <span class="info">dafydd</span>',
    },
    {
      t: 380,
      html: '<span class="dim">[</span><span class="ok">  OK  </span><span class="dim">]</span> <span class="ink">initialising display server</span>',
    },
    {
      t: 540,
      html: '<span class="dim">[</span><span class="ok">  OK  </span><span class="dim">]</span> <span class="ink">starting now-playing daemon</span>',
    },
    {
      t: 700,
      html: '<span class="dim">[</span><span class="ok">  OK  </span><span class="dim">]</span> <span class="ink">restoring window session</span> <span class="dim">(README.md)</span>',
    },
    {
      t: 860,
      html: '<span class="dim">[</span><span class="ok">  OK  </span><span class="dim">]</span> <span class="ink">workshop ready</span>',
    },
    { t: 1020, html: "" },
    { t: 1080, html: '<span class="info">welcome back, dafydd.</span>' },
  ];

  function runBoot() {
    if (!bootScreen) return;
    BOOT_LINES.forEach(({ t, html }) => {
      setTimeout(() => {
        const div = document.createElement("div");
        div.className = "line";
        div.style.opacity = "1";
        div.innerHTML = html || "&nbsp;";
        bootLog.appendChild(div);
      }, t);
    });

    const dismiss = () => {
      bootScreen.classList.add("fading");
      setTimeout(() => bootScreen.remove(), 700);
      bootScreen.removeEventListener("click", dismiss);
      window.removeEventListener("keydown", onKey);
    };
    const onKey = (e) => {
      if (e.key) dismiss();
    };

    bootScreen.addEventListener("click", dismiss);
    window.addEventListener("keydown", onKey);

    // auto-dismiss after the lines finish
    setTimeout(dismiss, 2400);
  }

  // -------------------------------------------------------------
  // 3.  WINDOW MANAGER
  // -------------------------------------------------------------

  const WindowManager = (function () {
    const layer = document.getElementById("window-layer");
    const taskbarWins = document.getElementById("taskbar-windows");
    const npSection = document.getElementById("np-section");
    const npMiniLbl = document.getElementById("np-mini-label");

    const windows = new Map(); // key -> { el, taskbarBtn, isOpen, isMin }
    let zCounter = 10;
    let activeKey = null;

    function init() {
      document.querySelectorAll(".window").forEach((el) => {
        const key = el.dataset.window;
        if (!key) return;
        windows.set(key, {
          el,
          taskbarBtn: null,
          isOpen: el.classList.contains("is-open"),
          isMin: false,
        });

        // Wire titlebar drag
        const titlebar = el.querySelector(".window-titlebar");
        if (titlebar) makeDraggable(el, titlebar);

        // Click anywhere in the window → bring to front
        el.addEventListener("mousedown", () => focus(key));
        el.addEventListener("touchstart", () => focus(key), { passive: true });

        // Wire control buttons
        el.querySelectorAll(".ctrl").forEach((btn) => {
          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const action = btn.dataset.action;
            if (action === "close") close(key);
            if (action === "minimize") minimize(key);
            if (action === "maximize") toggleMaximize(key);
          });
        });

        // If pre-opened in markup, register taskbar entry
        if (el.classList.contains("is-open")) {
          addTaskbarBtn(key);
          if (el.classList.contains("is-active")) activeKey = key;
        }
      });

      // Wire all "data-opens" triggers (icons, links, start-menu)
      document.querySelectorAll("[data-opens]").forEach((trigger) => {
        trigger.addEventListener("click", (e) => {
          // Allow ctrl/cmd-click etc. to fall through if it's an anchor with href
          if (trigger.tagName === "A" && trigger.href) return;
          e.preventDefault();
          open(trigger.dataset.opens);
        });
      });

      // Initial focus
      if (activeKey) {
        const w = windows.get(activeKey);
        if (w) w.el.style.zIndex = String(++zCounter);
        updateNowPlaying(activeKey);
      }
    }

    function open(key) {
      const w = windows.get(key);
      if (!w) return;

      if (!w.isOpen) {
        w.el.classList.add("is-open");
        // Re-trigger animation by removing & re-adding
        w.el.style.animation = "none";
        // eslint-disable-next-line no-unused-expressions
        w.el.offsetHeight;
        w.el.style.animation = "";
        w.isOpen = true;
        addTaskbarBtn(key);

        // Cascade position so multiple windows don't stack identically
        const openCount = Array.from(windows.values()).filter(
          (x) => x.isOpen,
        ).length;
        if (openCount > 1) {
          const offsetX = (openCount - 1) * 28;
          const offsetY = (openCount - 1) * 28;
          const baseX = parseInt(
            w.el.style.getPropertyValue("--x") || "120",
            10,
          );
          const baseY = parseInt(
            w.el.style.getPropertyValue("--y") || "90",
            10,
          );
          // Avoid drifting off-screen on small viewports
          const safeX = Math.min(baseX + offsetX, window.innerWidth - 320);
          const safeY = Math.min(baseY + offsetY, window.innerHeight - 220);
          w.el.style.left = (safeX > 0 ? safeX : baseX) + "px";
          w.el.style.top = (safeY > 0 ? safeY : baseY) + "px";
        }
      }

      // If minimised, restore
      if (w.isMin) {
        w.isMin = false;
        w.el.classList.remove("is-minimized");
        if (w.taskbarBtn) w.taskbarBtn.classList.remove("is-minimized");
      }

      focus(key);
    }

    function close(key) {
      const w = windows.get(key);
      if (!w) return;
      w.el.classList.remove("is-open", "is-active", "is-maximized");
      w.isOpen = false;
      w.isMin = false;
      removeTaskbarBtn(key);

      if (activeKey === key) {
        activeKey = null;
        // Focus next available window
        const remaining = Array.from(windows.entries())
          .filter(([, x]) => x.isOpen && !x.isMin)
          .sort(
            (a, b) =>
              parseInt(b[1].el.style.zIndex || "0", 10) -
              parseInt(a[1].el.style.zIndex || "0", 10),
          );
        if (remaining.length > 0) focus(remaining[0][0]);
        else updateNowPlaying(null);
      }
    }

    function minimize(key) {
      const w = windows.get(key);
      if (!w || !w.isOpen) return;
      w.isMin = true;
      w.el.classList.add("is-minimized");
      w.el.classList.remove("is-active");
      if (w.taskbarBtn) {
        w.taskbarBtn.classList.add("is-minimized");
        w.taskbarBtn.classList.remove("is-active");
      }
      if (activeKey === key) {
        activeKey = null;
        const remaining = Array.from(windows.entries()).filter(
          ([, x]) => x.isOpen && !x.isMin,
        );
        if (remaining.length > 0) focus(remaining[0][0]);
        else updateNowPlaying(null);
      }
    }

    function toggleMaximize(key) {
      const w = windows.get(key);
      if (!w) return;
      w.el.classList.toggle("is-maximized");
    }

    function focus(key) {
      const w = windows.get(key);
      if (!w || !w.isOpen) return;

      // If it was minimised, treat focus as restore
      if (w.isMin) {
        w.isMin = false;
        w.el.classList.remove("is-minimized");
        if (w.taskbarBtn) w.taskbarBtn.classList.remove("is-minimized");
      }

      // De-activate previous
      windows.forEach((other, k) => {
        other.el.classList.remove("is-active");
        if (other.taskbarBtn) other.taskbarBtn.classList.remove("is-active");
      });

      // Activate this one
      w.el.classList.add("is-active");
      w.el.style.zIndex = String(++zCounter);
      if (w.taskbarBtn) w.taskbarBtn.classList.add("is-active");
      activeKey = key;
      updateNowPlaying(key);
    }

    function addTaskbarBtn(key) {
      const w = windows.get(key);
      if (!w || w.taskbarBtn) return;

      const btn = document.createElement("button");
      btn.className = "taskbar-window";
      btn.dataset.windowKey = key;

      const dot = document.createElement("span");
      dot.className = "taskbar-window-dot";
      btn.appendChild(dot);

      const lbl = document.createElement("span");
      lbl.textContent = labelFor(key);
      btn.appendChild(lbl);

      btn.addEventListener("click", () => {
        if (activeKey === key && !w.isMin) {
          minimize(key);
        } else {
          open(key);
        }
      });

      taskbarWins.appendChild(btn);
      w.taskbarBtn = btn;
    }

    function removeTaskbarBtn(key) {
      const w = windows.get(key);
      if (!w || !w.taskbarBtn) return;
      w.taskbarBtn.remove();
      w.taskbarBtn = null;
    }

    function labelFor(key) {
      // Use the window's titlebar text
      const w = windows.get(key);
      if (!w) return key;
      const titleEl = w.el.querySelector(".window-title");
      return titleEl ? titleEl.textContent : key;
    }

    function updateNowPlaying(key) {
      if (!key) {
        npSection.textContent = "no window focused";
        npMiniLbl.textContent = "desktop · idle";
        return;
      }
      const label = SECTION_LABELS[key] || labelFor(key);
      npSection.textContent = label;
      npMiniLbl.textContent = label.toLowerCase();
    }

    // Drag handler
    function makeDraggable(winEl, handle) {
      let dragX = 0,
        dragY = 0;
      let startL = 0,
        startT = 0;
      let dragging = false;

      function onMouseDown(e) {
        // Don't drag on control-button clicks
        if (e.target.closest(".window-controls")) return;
        // Don't drag if window is maximised
        if (winEl.classList.contains("is-maximized")) return;
        // Mobile: skip
        if (window.innerWidth < 720) return;

        dragging = true;
        const rect = winEl.getBoundingClientRect();
        startL = rect.left;
        startT = rect.top;
        dragX = e.clientX;
        dragY = e.clientY;

        winEl.style.transition = "none";
        document.body.style.userSelect = "none";

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        e.preventDefault();
      }

      function onMouseMove(e) {
        if (!dragging) return;
        const dx = e.clientX - dragX;
        const dy = e.clientY - dragY;
        let newL = startL + dx;
        let newT = startT + dy;

        // Constrain within viewport (loosely)
        const minX = -winEl.offsetWidth + 80;
        const maxX = window.innerWidth - 80;
        const minY = 30; // below menubar
        const maxY = window.innerHeight - 80;

        newL = Math.max(minX, Math.min(maxX, newL));
        newT = Math.max(minY, Math.min(maxY, newT));

        winEl.style.left = newL + "px";
        winEl.style.top = newT + "px";
      }

      function onMouseUp() {
        dragging = false;
        winEl.style.transition = "";
        document.body.style.userSelect = "";
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      }

      handle.addEventListener("mousedown", onMouseDown);
    }

    return { init, open, close, minimize, focus };
  })();

  // -------------------------------------------------------------
  // 4.  PROJECTS PREVIEW PANE
  // -------------------------------------------------------------

  function initProjectsPane() {
    const list = document.getElementById("projects-list");
    const preview = document.getElementById("projects-preview");
    if (!list || !preview) return;

    function render(key) {
      const p = PROJECTS[key];
      if (!p) {
        preview.innerHTML =
          '<p style="color: var(--ink-3); font-family: var(--mono); font-size: 12px;">// select a project</p>';
        return;
      }

      const titleHTML =
        p.title[0] + (p.title[1] ? " <em>" + p.title[1] + "</em>" : "");

      const statusHTML = `
        <div class="preview-status ${p.status}">
          <span class="status-dot"></span>${p.statusLabel}
        </div>`;

      const bodyHTML = p.body.map((line) => `<p>${line}</p>`).join("");

      const tagsHTML = p.tags.length
        ? `<div class="preview-tags">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div>`
        : "";

      const actionsHTML = p.actions.length
        ? `<div class="preview-actions">${p.actions
            .map((a) => {
              const cls = a.primary
                ? "preview-action primary"
                : "preview-action";
              return `<a class="${cls}" href="${a.href}" target="_blank" rel="noopener">${a.label}</a>`;
            })
            .join("")}</div>`
        : "";

      preview.innerHTML = `
        <div class="preview-meta">/ projects / ${p.name}</div>
        <h2 class="preview-title">${titleHTML}</h2>
        ${statusHTML}
        <div class="preview-body">${bodyHTML}</div>
        ${tagsHTML}
        ${actionsHTML}
        <div class="preview-meta-footer">
          <span>${p.meta}</span>
          <span>${p.runtime}</span>
        </div>
      `;
    }

    list.querySelectorAll(".finder-item").forEach((btn) => {
      btn.addEventListener("click", () => {
        list
          .querySelectorAll(".finder-item")
          .forEach((x) => x.classList.remove("is-selected"));
        btn.classList.add("is-selected");
        render(btn.dataset.project);
      });
    });

    // Render initial selection
    const initial =
      list.querySelector(".finder-item.is-selected") ||
      list.querySelector(".finder-item");
    if (initial) render(initial.dataset.project);
  }

  // -------------------------------------------------------------
  // 5.  CLOCK
  // -------------------------------------------------------------

  function initClock() {
    const el = document.getElementById("clock");
    if (!el) return;
    function tick() {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      el.textContent = `${hh}:${mm}`;
    }
    tick();
    setInterval(tick, 30 * 1000);
  }

  // -------------------------------------------------------------
  // 6.  START MENU
  // -------------------------------------------------------------

  function initStartMenu() {
    const startBtn = document.getElementById("taskbar-start");
    const menu = document.getElementById("start-menu");
    if (!startBtn || !menu) return;

    function openMenu() {
      menu.classList.add("is-open");
      menu.setAttribute("aria-hidden", "false");
      startBtn.classList.add("is-open");
    }
    function closeMenu() {
      menu.classList.remove("is-open");
      menu.setAttribute("aria-hidden", "true");
      startBtn.classList.remove("is-open");
    }

    startBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (menu.classList.contains("is-open")) closeMenu();
      else openMenu();
    });

    // Click anywhere else to close
    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && !startBtn.contains(e.target)) closeMenu();
    });

    // Close after selecting an item
    menu.querySelectorAll(".start-menu-item").forEach((item) => {
      item.addEventListener("click", closeMenu);
    });

    // Esc closes the menu
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  // -------------------------------------------------------------
  // 7.  KEYBOARD SHORTCUTS
  // -------------------------------------------------------------

  function initKeyboard() {
    window.addEventListener("keydown", (e) => {
      // Esc closes the active window
      if (e.key === "Escape") {
        const active = document.querySelector(".window.is-active");
        if (active && active.dataset.window) {
          WindowManager.close(active.dataset.window);
        }
      }
    });
  }

  // -------------------------------------------------------------
  // 8.  BOOT
  // -------------------------------------------------------------

  function init() {
    runBoot();
    WindowManager.init();
    initProjectsPane();
    initClock();
    initStartMenu();
    initKeyboard();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
