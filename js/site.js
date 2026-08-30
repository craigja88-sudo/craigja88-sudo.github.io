(function () {
  "use strict";

  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  function normalize(s) {
    return (s || "").toLowerCase().replace(/\s+/g, " ").trim();
  }

  function bindCityFilter(input, list, emptyEl, countEl) {
    if (!input || !list) return;
    var items = list.querySelectorAll("li");
    function apply() {
      var q = normalize(input.value);
      var shown = 0;
      items.forEach(function (li) {
        var hay = normalize(li.getAttribute("data-filter") || li.textContent);
        var match = !q || hay.indexOf(q) !== -1;
        li.classList.toggle("is-hidden", !match);
        if (match) shown += 1;
      });
      if (emptyEl) emptyEl.classList.toggle("is-shown", shown === 0);
      if (countEl) {
        countEl.textContent =
          shown === items.length
            ? items.length + " cities"
            : shown + " of " + items.length + " cities";
      }
    }
    input.addEventListener("input", apply);
    input.addEventListener("search", apply);
    apply();
  }

  bindCityFilter(
    document.getElementById("city-search"),
    document.getElementById("city-list"),
    document.getElementById("city-empty"),
    document.getElementById("city-count")
  );

  var chooser = document.getElementById("size-chooser");
  var chooserOut = document.getElementById("size-chooser-result");
  if (chooser && chooserOut) {
    var recs = {
      "": { size: "", text: "Pick a project type to see a typical size. This is a starting point — a hauler can confirm once they know the debris." },
      bathroom: { size: "10-yard", text: "A 10-yard dumpster covers most single-bathroom remodels (tile, vanity, tub). If you are opening walls on more than one room, step up to 15." },
      kitchen: { size: "15-yard", text: "A 15-yard dumpster fits a typical kitchen (cabinets, appliances, drywall). Full gut of a large kitchen, or kitchen plus another room, is often a 20." },
      roof: { size: "20-yard", text: "Asphalt shingles from a single-story house usually land in a 20-yard. Steep roofs, two stories, or heavy tile/slate can need a 30 — ask the hauler about weight, not just volume." },
      cleanout: { size: "20-yard", text: "A whole-house or garage cleanout is the job 20-yard dumpsters were made for. Light household junk can fit in a 15; estate/basement plus garage often wants a 20 or 30." },
      deck: { size: "10-yard", text: "A small deck or fence run often fits in a 10-yard. Large multi-level decks, or deck plus landscaping waste, usually need a 15 or 20." },
      concrete: { size: "10-yard", text: "Concrete, brick, and dirt are heavy. Haulers often require a 10-yard (sometimes 12- or 15-yard) and a lower weight cap. Do not book a 30 or 40 for concrete unless the company says so." },
      addition: { size: "30-yard", text: "Room additions and large remodels generate mixed construction debris. A 30-yard is the usual starting point; a full gut of a house may need a 40 or a second haul." },
      newbuild: { size: "40-yard", text: "New construction and major tear-outs typically use 30- or 40-yard dumpsters, often with scheduled swaps. Your builder or framer will know the cadence." }
    };
    function renderChooser() {
      var rec = recs[chooser.value] || recs[""];
      if (!rec.size) {
        chooserOut.innerHTML = "<p>" + rec.text + "</p>";
        return;
      }
      chooserOut.innerHTML =
        '<p><span class="size-num">' + rec.size + "</span></p><p>" + rec.text + "</p>";
    }
    chooser.addEventListener("change", renderChooser);
    renderChooser();
  }

  var forms = document.querySelectorAll("form.js-quote");
  forms.forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector(".form-status");
      if (status) {
        status.classList.add("is-shown");
        status.setAttribute("role", "status");
      }
      var btn = form.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;
    });
  });
})();
