// main.js

// IIFE (Immediately Invoked Function Expression)
// Самовызывающаяся функция:
// - изолирует переменные (не попадают в window)
// - запускается сразу после загрузки файла
(function () {
  // ============================================================
  // 1) BURGER MENU (мобильное меню)
  // ============================================================

  // Ищем элементы на странице:
  // - кнопку/иконку бургера
  // - блок навигации (меню)
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav");

  // Если оба элемента существуют в DOM — подключаем логику
  if (burger && nav) {
    burger.addEventListener("click", () => {
      // toggle добавляет класс, если его нет, и убирает, если он есть
      // Возвращает true, если класс был добавлен (меню открыто),
      // и false, если класс убран (меню закрыто)
      const isOpen = nav.classList.toggle("is-open");

      // aria-expanded — атрибут доступности:
      // сообщает скринридерам, раскрыт ли элемент
      // setAttribute принимает строку, поэтому String(isOpen)
      burger.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // ============================================================
  // 2) HERO SLIDER (слайдер в hero-секции)
  // ============================================================

  // Контейнер, где лежат слайды
  const slidesWrap = document.getElementById("heroSlides");

  // Собираем слайды в массив.
  // Если контейнер не найден — кладём пустой массив (чтобы не упасть с ошибкой).
  const slides = slidesWrap
    ? Array.from(slidesWrap.querySelectorAll(".hero__slide"))
    : [];

  // Контейнер для точек (pagination dots)
  const dotsWrap = document.getElementById("heroDots");

  // Если нет слайдов ИЛИ нет контейнера для точек — останавливаем работу слайдера.
  // Важно: это return выходит из всей IIFE, но бургер уже инициализировался выше.
  if (!slides.length || !dotsWrap) return;

  // ============================================================
  // 3) ТЕКУЩИЙ АКТИВНЫЙ СЛАЙД
  // ============================================================

  // Ищем, какой слайд уже помечен классом is-active в HTML
  let index = slides.findIndex((s) => s.classList.contains("is-active"));

  // Если активный не найден (findIndex вернёт -1) — берём первый
  if (index < 0) index = 0;

  // ============================================================
  // 4) СОЗДАНИЕ ТОЧЕК (DOTS)
  // ============================================================

  // Создаём кнопки-точки по количеству слайдов.
  // map возвращает массив созданных кнопок.
  const dots = slides.map((_, i) => {
    // создаём кнопку
    const btn = document.createElement("button");
    btn.type = "button";

    // базовый класс + is-active, если точка соответствует текущему index
    btn.className = "hero__dot" + (i === index ? " is-active" : "");

    // aria-label — подпись для доступности (скринридеры озвучат "Слайд 1", "Слайд 2"...)
    btn.setAttribute("aria-label", `Слайд ${i + 1}`);

    // по клику переходим к соответствующему слайду
    btn.addEventListener("click", () => go(i));

    // добавляем точку в контейнер
    dotsWrap.appendChild(btn);

    // возвращаем кнопку, чтобы она попала в массив dots
    return btn;
  });

  // ============================================================
  // 5) СТРЕЛКИ СЛАЙДЕРА
  // ============================================================

  // Ищем кнопки-стрелки (если их нет, код не упадёт из-за optional chaining ?.)
  const prevBtn = document.querySelector(".hero__arrow--left");
  const nextBtn = document.querySelector(".hero__arrow--right");

  // Левую стрелку — на предыдущий слайд
  prevBtn?.addEventListener("click", () => go(index - 1));

  // Правую стрелку — на следующий слайд
  nextBtn?.addEventListener("click", () => go(index + 1));

  // ============================================================
  // 6) ФУНКЦИЯ ПЕРЕКЛЮЧЕНИЯ СЛАЙДА
  // ============================================================

  // next — индекс, куда хотим перейти (может быть больше/меньше диапазона)
  function go(next) {
    const total = slides.length;

    // Делаем индекс циклическим:
    // - если next = -1 -> станет последний
    // - если next = total -> станет 0
    const newIndex = (next + total) % total;

    // Убираем активность с текущего слайда и точки
    slides[index].classList.remove("is-active");
    dots[index].classList.remove("is-active");

    // Добавляем активность новому слайду и точке
    slides[newIndex].classList.add("is-active");
    dots[newIndex].classList.add("is-active");

    // Обновляем текущий индекс
    index = newIndex;
  }

  // ============================================================
  // 7) АВТОПРОКРУТКА
  // ============================================================

  // Каждые 7 секунд переключаем на следующий слайд
  let timer = setInterval(() => go(index + 1), 7000);

  // ============================================================
  // 8) ПАУЗА НА HOVER (ТОЛЬКО ДЛЯ ДЕСКТОПА)
  // ============================================================

  // При наведении мыши на hero останавливаем автопрокрутку,
  // при уходе — запускаем снова.
  const hero = document.querySelector(".hero");

  // mouseenter — курсор вошёл в блок
  hero?.addEventListener("mouseenter", () => clearInterval(timer));

  // mouseleave — курсор вышел из блока
  hero?.addEventListener("mouseleave", () => {
    // Перезапускаем таймер и сохраняем новый id в переменную timer
    timer = setInterval(() => go(index + 1), 7000);
  });
})();
