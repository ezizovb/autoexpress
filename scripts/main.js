// main.js

(function () {
  // --- Burger menu ---
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // --- Hero slider ---
  const slidesWrap = document.getElementById("heroSlides");
  const slides = slidesWrap
    ? Array.from(slidesWrap.querySelectorAll(".hero__slide"))
    : [];
  const dotsWrap = document.getElementById("heroDots");

  if (!slides.length || !dotsWrap) return;

  let index = slides.findIndex((s) => s.classList.contains("is-active"));
  if (index < 0) index = 0;

  // dots
  const dots = slides.map((_, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "hero__dot" + (i === index ? " is-active" : "");
    btn.setAttribute("aria-label", `Слайд ${i + 1}`);
    btn.addEventListener("click", () => go(i));
    dotsWrap.appendChild(btn);
    return btn;
  });

  const prevBtn = document.querySelector(".hero__arrow--left");
  const nextBtn = document.querySelector(".hero__arrow--right");

  prevBtn?.addEventListener("click", () => go(index - 1));
  nextBtn?.addEventListener("click", () => go(index + 1));

  function go(next) {
    const total = slides.length;
    const newIndex = (next + total) % total;

    slides[index].classList.remove("is-active");
    dots[index].classList.remove("is-active");

    slides[newIndex].classList.add("is-active");
    dots[newIndex].classList.add("is-active");

    index = newIndex;
  }

  // автопрокрутка
  let timer = setInterval(() => go(index + 1), 7000);

  // стоп на ховер (десктоп)
  const hero = document.querySelector(".hero");
  hero?.addEventListener("mouseenter", () => clearInterval(timer));
  hero?.addEventListener(
    "mouseleave",
    () => (timer = setInterval(() => go(index + 1), 7000)),
  );
})();
