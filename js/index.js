(function () {
  const track = document.getElementById("carouselTrack");
  const slides = track.children;
  const dotsWrap = document.getElementById("carouselDots");
  let idx = 0;

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("div");
    dot.className = "carousel-dot" + (i === 0 ? " active" : "");
    dot.addEventListener("click", () => go(i));
    dotsWrap.appendChild(dot);
  }
  const dots = dotsWrap.children;

  function go(i) {
    idx = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${idx * 100}%)`;
    for (let d of dots) d.classList.remove("active");
    dots[idx].classList.add("active");
  }

  document
    .getElementById("carouselPrev")
    .addEventListener("click", () => go(idx - 1));
  document
    .getElementById("carouselNext")
    .addEventListener("click", () => go(idx + 1));

  setInterval(() => go(idx + 1), 5000);
})();
