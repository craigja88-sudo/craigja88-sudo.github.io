(function () {
  "use strict";

  /* Homepage overlay: honest mailto for "Email a follow-up".
     site.js still shows the status and disables the button. */
  var form = document.querySelector("form.js-quote");
  if (!form) return;

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
})();
