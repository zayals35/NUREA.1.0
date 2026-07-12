/* Elva Tannklinikk — reveals + booking wizard */

(function () {
  "use strict";

  /* ---------- scroll reveals ---------- */

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- booking wizard ---------- */

  var overlay = document.getElementById("wizard");
  if (!overlay) return;

  var steps = overlay.querySelectorAll(".wizard-step");
  var progress = document.getElementById("wizard-progress");
  var barFill = document.getElementById("wizard-bar-fill");
  var btnBack = document.getElementById("wizard-back");
  var btnNext = document.getElementById("wizard-next");
  var btnClose = overlay.querySelector(".wizard-close");
  var summaryEl = document.getElementById("wizard-summary");
  var nav = overlay.querySelector(".wizard-nav");

  var state = { step: 1, intent: null, patient: null, slot: null };
  var lastFocused = null;

  var intentLabels = {
    akutt: "Akuttime, det gjør vondt",
    undersokelse: "Undersøkelse og rens",
    erstatte: "Konsultasjon, erstatte en tann",
    prat: "Bare en prat først"
  };
  var priceHints = {
    akutt: "Akutt undersøkelse: 1 250,- (fast pris)",
    undersokelse: "Undersøkelse med røntgen: 1 190,- (fast pris)",
    erstatte: "Konsultasjon: du får skriftlig prisoverslag",
    prat: "Helt gratis, selvsagt"
  };

  function fieldForStep(step) {
    if (step === 1) return "intent";
    if (step === 2) return "patient";
    if (step === 3) return "slot";
    return null;
  }

  function render() {
    steps.forEach(function (s) {
      s.classList.toggle("active", Number(s.getAttribute("data-step")) === state.step);
    });
    var done = state.step > 3;
    progress.textContent = done ? "Ferdig" : "Steg " + state.step + " av 3";
    barFill.style.width = done ? "100%" : (state.step * 33.4) + "%";
    nav.style.display = done ? "none" : "flex";
    btnBack.style.visibility = state.step === 1 ? "hidden" : "visible";
    var field = fieldForStep(state.step);
    btnNext.disabled = field ? !state[field] : false;
    btnNext.textContent = state.step === 3 ? "Bekreft tid" : "Neste";
    if (done) {
      var priceLine = state.intent === "undersokelse" && state.patient === "ny"
        ? "Ny-pasient-pris: 890,- for undersøkelse, røntgen og rens"
        : priceHints[state.intent];
      var patientLine = state.patient === "ny" ? "Ny pasient" : "Velkommen tilbake";
      summaryEl.innerHTML =
        "<span>" + escapeHtml(intentLabels[state.intent] || "") + "</span>" +
        "<span>" + escapeHtml(state.slot || "") + "</span>" +
        "<span>" + escapeHtml(patientLine) + "</span>" +
        "<span>" + escapeHtml(priceLine || "") + "</span>";
    }
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function openWizard(intent) {
    lastFocused = document.activeElement;
    state.step = 1;
    state.intent = intent || null;
    state.patient = null;
    state.slot = null;
    overlay.querySelectorAll(".choice, .slot").forEach(function (b) {
      b.classList.remove("selected");
    });
    if (intent) {
      var pre = overlay.querySelector('[data-field="intent"] [data-value="' + intent + '"]');
      if (pre) pre.classList.add("selected");
    }
    overlay.hidden = false;
    requestAnimationFrame(function () { overlay.classList.add("open"); });
    document.body.style.overflow = "hidden";
    render();
    btnClose.focus();
  }

  function closeWizard() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
    var delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 300;
    window.setTimeout(function () { overlay.hidden = true; }, delay);
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll("[data-wizard]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openWizard(btn.getAttribute("data-intent"));
    });
  });

  btnClose.addEventListener("click", closeWizard);
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeWizard();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !overlay.hidden) closeWizard();
  });

  overlay.addEventListener("click", function (e) {
    var choice = e.target.closest(".choice, .slot");
    if (!choice) return;
    var group = choice.closest("[data-field]");
    if (!group) return;
    var field = group.getAttribute("data-field");
    if (field === "slot") {
      overlay.querySelectorAll(".slot").forEach(function (b) { b.classList.remove("selected"); });
    } else {
      group.querySelectorAll(".choice").forEach(function (b) { b.classList.remove("selected"); });
    }
    choice.classList.add("selected");
    state[field] = choice.getAttribute("data-value");
    render();
  });

  btnNext.addEventListener("click", function () {
    if (state.step <= 3) {
      state.step += 1;
      render();
      if (state.step > 3) progress.focus && progress.setAttribute("tabindex", "-1");
    }
  });

  btnBack.addEventListener("click", function () {
    if (state.step > 1) {
      state.step -= 1;
      render();
    }
  });
})();

/* ---------- live open / closed status ---------- */

(function () {
  "use strict";

  var el = document.querySelector("[data-open-status]");
  if (!el) return;

  // Åpningstider: [åpner, stenger] per ukedag (0 = søndag … 6 = lørdag); mangler = stengt
  var hours = { 1: [8, 16], 2: [8, 16], 3: [8, 16], 4: [8, 16], 5: [8, 14] };
  var days = ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"];

  var now = new Date();
  var day = now.getDay();
  var h = now.getHours() + now.getMinutes() / 60;
  var today = hours[day];
  var isOpen = !!today && h >= today[0] && h < today[1];

  var label, detail;
  if (isOpen) {
    label = "Åpent nå";
    detail = "stenger " + today[1] + ":00";
  } else {
    label = "Stengt nå";
    var next = null;
    for (var i = 0; i < 7; i++) {
      var d = (day + i) % 7;
      var hh = hours[d];
      if (!hh) continue;
      if (i === 0) {
        if (h < hh[0]) { next = { d: d, o: hh[0], today: true }; break; }
        continue;
      }
      next = { d: d, o: hh[0], today: false };
      break;
    }
    if (next) {
      detail = next.today
        ? "åpner " + next.o + ":00"
        : "åpner " + days[next.d] + " " + next.o + ":00";
    }
  }

  el.className = "open-status " + (isOpen ? "is-open" : "is-closed");
  el.setAttribute("title", detail ? label + " · " + detail : label);
  el.innerHTML = '<span class="dot" aria-hidden="true"></span>' + label;
})();
