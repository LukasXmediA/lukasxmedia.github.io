document.addEventListener("DOMContentLoaded", () => {
  const pointsField = document.getElementById("pointsField");

  // 15 kleine Punkte
  for (let i = 0; i < 15; i++) {
    const p = document.createElement("div");
    p.classList.add("point", "small");
    pointsField.appendChild(p);
  }

  // Social Media Punkte (3) - nur einmal!
  const socials = [
    { icon: "fab fa-instagram", link: "https://www.instagram.com/lukasxmedia" },
    { icon: "fab fa-youtube", link: "https://www.youtube.com/@LukasXmediA" },
    { icon: "fab fa-twitch", link: "https://www.twitch.tv/lukasxmedia1" },
  ];

  socials.forEach(({ icon, link }) => {
    const p = document.createElement("div");
    p.classList.add("point", "social");
    p.innerHTML = `<i class="${icon}"></i>`;
    p.addEventListener("click", () => window.open(link, "_blank"));
    pointsField.appendChild(p);
  });

  // Bildpunkt (wächst nur bei erstem Abschnitt)
  const imagePoint = document.createElement("div");
  imagePoint.classList.add("point", "image-point");
  pointsField.appendChild(imagePoint);

  // Scrollsteuerung Wort-für-Wort + Abschnittswechsel
  const sections = document.querySelectorAll(".content-section");
  let currentSection = 0;
  let currentWord = 0;
  let words = [];

  prepareSection(sections[currentSection]);

  // Blockiere natürliches Scrollen
  window.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();

      if (currentWord < words.length) {
        words[currentWord].classList.add("active");
        currentWord++;

        // Wenn Text komplett weiß, zeige Bild (sofern gesetzt)
        if (currentWord === words.length) {
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

  // Wortweise vorbereiten
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

    imagePoint.classList.remove("active");
    imagePoint.style.backgroundImage = "";
  }
});
