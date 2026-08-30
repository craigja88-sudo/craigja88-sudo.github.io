(function () {
  "use strict";

  function normalize(s) {
    return (s || "").toLowerCase().replace(/\s+/g, " ").trim();
  }

  function cityHref(href) {
    if (!href) return "";
    if (href.indexOf("cities/") === 0 || href.indexOf("/") === 0 || href.indexOf("http") === 0) return href;
    return "cities/" + href.replace(/^\.\//, "");
  }

  function parseCities(html) {
    var doc = new DOMParser().parseFromString(html, "text/html");
    var out = [];
    doc.querySelectorAll("li[data-filter] a").forEach(function (a) {
      var li = a.closest("li");
      var nameEl = a.querySelector("span:not(.st)");
      var stEl = a.querySelector(".st");
      out.push({
        name: nameEl ? nameEl.textContent.trim() : a.textContent.trim(),
        st: stEl ? stEl.textContent.trim() : "",
        href: cityHref(a.getAttribute("href")),
        filter: li ? li.getAttribute("data-filter") || "" : ""
      });
    });
    return out;
  }

  function bindTypeahead(cities) {
    var input = document.getElementById("city-search");
    var list = document.getElementById("city-suggest");
    var emptyEl = document.getElementById("city-suggest-empty");
    if (!input || !list) return;

    var active = -1;
    var shown = [];

    function hide() {
      list.hidden = true;
      list.innerHTML = "";
      input.setAttribute("aria-expanded", "false");
      active = -1;
      shown = [];
      if (emptyEl) emptyEl.hidden = true;
    }

    function go(city) {
      if (!city || !city.href) return;
      window.location.href = city.href;
    }

    function render(q) {
      q = normalize(q);
      if (!q) {
        hide();
        return;
      }
      shown = cities.filter(function (c) {
        return normalize(c.filter + " " + c.name + " " + c.st).indexOf(q) !== -1;
      }).slice(0, 8);
      list.innerHTML = "";
      active = shown.length ? 0 : -1;
      shown.forEach(function (c, i) {
        var li = document.createElement("li");
        li.setAttribute("role", "option");
        li.id = "city-opt-" + i;
        if (i === active) li.className = "is-active";
        li.innerHTML = "<span>" + c.name + "</span><span class=\"st\">" + c.st + "</span>";
        li.addEventListener("mousedown", function (e) {
          e.preventDefault();
          go(c);
        });
        list.appendChild(li);
      });
      list.hidden = shown.length === 0;
      input.setAttribute("aria-expanded", shown.length ? "true" : "false");
      if (emptyEl) emptyEl.hidden = shown.length !== 0;
    }

    function move(delta) {
      if (!shown.length) return;
      var items = list.querySelectorAll("[role='option']");
      if (active >= 0 && items[active]) items[active].classList.remove("is-active");
      active = (active + delta + shown.length) % shown.length;
      if (items[active]) {
        items[active].classList.add("is-active");
        input.setAttribute("aria-activedescendant", items[active].id);
      }
    }

    input.addEventListener("input", function () {
      render(input.value);
    });
    input.addEventListener("search", function () {
      render(input.value);
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (list.hidden) render(input.value);
        else move(1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        move(-1);
      } else if (e.key === "Enter") {
        if (shown.length && active >= 0) {
          e.preventDefault();
          go(shown[active]);
        }
      } else if (e.key === "Escape") {
        hide();
      }
    });
    input.addEventListener("blur", function () {
      window.setTimeout(hide, 120);
    });
  }

  fetch("cities/index.html", { credentials: "same-origin" })
    .then(function (r) { return r.ok ? r.text() : ""; })
    .then(function (html) {
      var cities = html ? parseCities(html) : [];
      bindTypeahead(cities);
    })
    .catch(function () {
      bindTypeahead([]);
    });

  var form = document.querySelector("form.js-quote");
  if (form) {
    form.addEventListener("submit", function () {
      function val(name) {
        var el = form.elements[name];
        return el && el.value ? String(el.value).trim() : "";
      }
      var city = val("city");
      var zip = val("zip");
      var size = val("size") || "Not sure yet";
      var project = val("project") || "(not selected)";
      var email = val("email");
      var notes = val("notes");
      var lines = [
        "Follow-up request (quote matching is not live)",
        "",
        "City: " + city,
        "ZIP: " + zip,
        "Size: " + size,
        "Project: " + project,
        "Email: " + email,
        "Notes: " + notes
      ];
      var href =
        "mailto:craigja88@gmail.com?subject=" +
        encodeURIComponent("Dumpster follow-up" + (city ? " — " + city : "")) +
        "&body=" +
        encodeURIComponent(lines.join("\n"));
      window.location.href = href;
    });
  }
})();
