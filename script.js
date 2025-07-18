document.addEventListener("DOMContentLoaded", () => {
  // Wort für Wort Text vorbereiten
  document.querySelectorAll(".fade-text").forEach((section) => {
    const text = section.textContent.trim();
    section.textContent = "";
    text.split(" ").forEach((word) => {
      const span = document.createElement("span");
      span.textContent = word + " ";
      section.appendChild(span);
    });
  });

  // Intersection Observer für Text Animation
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll("span").forEach((span, i) => {
            setTimeout(() => span.classList.add("active"), i * 100);
          });

          // Bild im Punkt anzeigen, falls data-image gesetzt
          const image = entry.target.getAttribute("data-image");
          if (image) {
            const imgDot = document.querySelector(".image-dot");
            imgDot.classList.add("active");
            imgDot.style.backgroundImage = `url('${image}')`;
          }
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll(".fade-text").forEach((el) => observer.observe(el));

  // Social Media Klicks
  document.querySelectorAll(".dot.social").forEach((dot) => {
    dot.addEventListener("click", () => {
      const link = dot.getAttribute("data-link");
      window.open(link, "_blank");
    });
  });
});
