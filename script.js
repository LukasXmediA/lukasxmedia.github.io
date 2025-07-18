document.addEventListener("DOMContentLoaded", () => {
  const pointsField = document.getElementById("pointsField");

  // 15 kleine Punkte random
  for (let i = 0; i < 15; i++) {
    createPoint("small");
  }

  // 3 Social Media Punkte
  const socials = [
    { icon: "fab fa-instagram", link: "https://www.instagram.com/lukasxmedia" },
    { icon: "fab fa-youtube", link: "https://www.youtube.com/@LukasXmediA" },
    { icon: "fab fa-twitch", link: "https://www.twitch.tv/lukasxmedia1" },
  ];

  socials.forEach((s) => createSocialPoint(s.icon, s.link));

  // Bildpunkt (wächst nur wenn aktiv)
  const imagePoint = createPoint("image-point");

  function createPoint(type) {
    const p = document.createElement("div");
    p.classList.add("point", type);
    randomizePosition(p);
    pointsField.appendChild(p);
    return p;
  }

  function createSocialPoint(icon, link) {
    const p = createPoint("social");
    p.innerHTML = `<i class="${icon}"></i>`;
    p.addEventListener("click", () => window.open(link, "_blank"));
  }

  function randomizePosition(el) {
    el.style.top = `${Math.random() * 90}%`;
    el.style.left = `${Math.random() * 90}%`;
  }

  // Scrollsteuerung für Wort-für-Wort und Abschnittswechsel
  const sections = document.querySelectorAll(".content-section");
  let currentSection = 0;
  let currentWord = 0;
  let words = [];

  prepareSection(sections[currentSection]);

  window.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();

      if (currentWord < words.length) {
        words[currentWord].classList.add("active");
        currentWord++;

        if (currentWord === words.length) {
          // Bildpunkt zeigen, falls Bild da ist
          const img = sections[currentSection].getAttribute("data-image");
          if (img) {
            imagePoint.classList.add("active");
            imagePoint.style.backgroundImage = `url('${img}')`;
          } else {
            imagePoint.classList.remove("active");
            imagePoint.style.backgroundImage = "";
          }
        }
      } else if (currentSection < sections.length - 1) {
        currentSection++;
        prepareSection(sections[currentSection]);
      }
    },
    { passive: false }
  );

  function prepareSection(section) {
    const textEl = section.querySelector(".fade-text");
    const text = textEl.textContent.trim();
    textEl.textContent = "";
    words = text.split(" ").map((word) => {
      const span = document.createElement("span");
      span.textContent = word + " ";
      textEl.appendChild(span);
      return span;
    });
    currentWord = 0;

    // Bildpunkt resetten
    imagePoint.classList.remove("active");
    imagePoint.style.backgroundImage = "";
  }
});
