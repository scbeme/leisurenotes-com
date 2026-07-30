(function () {
  const triggers = document.querySelectorAll(".js-lightbox");
  if (!triggers.length) return;

  const overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";
  overlay.innerHTML =
    '<button class="lightbox-close" aria-label="Close">&times;</button>' +
    '<img class="lightbox-image" src="" alt="">';
  document.body.appendChild(overlay);

  const overlayImg = overlay.querySelector(".lightbox-image");
  const closeBtn = overlay.querySelector(".lightbox-close");

  function open(src, alt) {
    overlayImg.src = src;
    overlayImg.alt = alt || "";
    overlay.classList.add("is-open");
    document.body.classList.add("lightbox-locked");
  }

  function close() {
    overlay.classList.remove("is-open");
    document.body.classList.remove("lightbox-locked");
    overlayImg.src = "";
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      if (trigger.tagName === "A") {
        event.preventDefault();
        const img = trigger.querySelector("img");
        open(trigger.getAttribute("href"), img ? img.alt : "");
      } else {
        open(trigger.currentSrc || trigger.src, trigger.alt);
      }
    });
  });

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) close();
  });

  closeBtn.addEventListener("click", close);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && overlay.classList.contains("is-open")) close();
  });
})();
