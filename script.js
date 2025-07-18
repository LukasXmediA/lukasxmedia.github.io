document.addEventListener("DOMContentLoaded", () => {
  const pointsField = document.getElementById("pointsField");

  // 15 kleine Punkte
  for (let i = 0; i < 15; i++) {
    const point = document.createElement("div");
    point.classList.add("point", "small");
    randomizePosition(point);
    pointsField.appendChild(point);
  }

  // 3 Social Media Punkte
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

  // 1 Bildpunkt
  const imagePoint = document.createElement("div");
  imagePoint.classList.add("point", "image-point");
  randomizePosition(imagePoint);
  pointsField.appendChild(imagePoint);

  // 2 neutrale Punkte
  for (let i = 0; i < 2; i++) {
    const point = document.createElement("div");
    point.classList.add("point", "neutral");
    randomizePosition(point);
    pointsField.appendChild(point);
  }

  function randomizePosition(el) {
    el.style.top = `${Math.random() * 90}%`;
    el.style.left = `${Math.random() * 90}%`;
  }

  // Wort für Wort Textanimation
  document.querySelectorAll(".fade-text").forEach(section => {
    const text = section.textContent.trim();
    section.textContent = "";
    text.split(" ").forEach(word => {
      const span = document.createElement("span");
      span.textContent = word + " ";
      section.appendChild(span);
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll("span").forEach((span, i) => {
          setTimeout(() => span.classList.add("active"), i * 100);
        });

        const image = entry.target.getAttribute("data-image");
        if (image) {
          imagePoint.classList.add("active");
          imagePoint.style.backgroundImage = `url('${image}')`;
        }
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll(".fade-text").forEach(el => observer.observe(el));
});
