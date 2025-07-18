document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll('.section');

  sections.forEach(section => {
    const pointsField = section.querySelector('.points-field');

    for (let i = 0; i < 15; i++) {
      const point = document.createElement("div");
      point.classList.add("point", "small");
      randomizePosition(point);
      pointsField.appendChild(point);
    }

    const socials = [
      { icon: "fab fa-instagram", link: "https://www.instagram.com/lukasxmedia" },
      { icon: "fab fa-youtube", link: "https://www.youtube.com/@LukasXmediA" },
      { icon: "fab fa-twitch", link: "https://www.twitch.tv/lukasxmedia1" }
    ];

    socials.forEach(social => {
      const point = document.createElement("div");
      point.classList.add("point", "social");
      point.innerHTML = `<i class="${social.icon}"></i>`;
      randomizePosition(point);
      point.addEventListener("click", () => window.open(social.link, "_blank"));
      pointsField.appendChild(point);
    });

    const imagePoint = document.createElement("div");
    imagePoint.classList.add("point", "image-point");
    randomizePosition(imagePoint);
    pointsField.appendChild(imagePoint);

    const neutralPoint = document.createElement("div");
    neutralPoint.classList.add("point", "neutral");
    randomizePosition(neutralPoint);
    pointsField.appendChild(neutralPoint);

    // Text Wort für Wort animieren
    const textEl = section.querySelector('.fade-text');
    const text = textEl.textContent.trim();
    textEl.textContent = "";
    const spans = text.split(" ").map(word => {
      const span = document.createElement("span");
      span.textContent = word + " ";
      textEl.appendChild(span);
      return span;
    });

    // Scroll-Steuerung
    let currentWord = 0;
    window.addEventListener("wheel", e => {
      e.preventDefault();
      if (currentWord < spans.length) {
        spans[currentWord].classList.add('active');
        currentWord++;
        if (currentWord === spans.length) {
          const imgSrc = section.getAttribute('data-image');
          if (imgSrc) {
            imagePoint.classList.add('active');
            imagePoint.style.backgroundImage = `url('${imgSrc}')`;
          }
        }
      } else {
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      }
    }, { passive: false });
  });

  function randomizePosition(el) {
    el.style.top = `${Math.random() * 90}%`;
    el.style.left = `${Math.random() * 90}%`;
  }
});
