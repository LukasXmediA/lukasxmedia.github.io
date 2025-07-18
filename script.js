document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section");
  let currentSection = 0;
  let textActive = false;

  // Punkte und Social Media für alle Sektionen
  sections.forEach((section) => {
    const pointsContainer = section.querySelector(".points");

    // 15 kleine Punkte
    for (let i = 0; i < 15; i++) {
      const p = document.createElement("div");
      p.classList.add("point");
      pointsContainer.appendChild(p);
    }

    // Social Media Punkte (einmal pro Section)
    const socials = [
      { icon: "fab fa-instagram", link: "https://www.instagram.com/lukasxmedia" },
      { icon: "fab fa-youtube", link: "https://www.youtube.com/@LukasXmediA" },
      { icon: "fab fa-twitch", link: "https://www.twitch.tv/lukasxmedia1" },
    ];

    socials.forEach(({ icon, link }) => {
      const sp = document.createElement("div");
      sp.classList.add("point", "social");
      sp.innerHTML = `<i class="${icon}"></i>`;
      sp.addEventListener("click", () => window.open(link, "_blank"));
      pointsContainer.appendChild(sp);
    });
  });

  // Aktivier den Text (weiß machen)
  function activateText(section) {
    const text = section.querySelector(".text");
    text.classList.add("active");
  }

  // Deaktivier den Text (grau)
  function deactivateText(section) {
    const text = section.querySelector(".text");
    text.classList.remove("active");
  }

  // Zeig initial nur den ersten Text grau, andere grau auch
  sections.forEach((sec, i) => {
    if (i === 0) activateText(sec); else deactivateText(sec);
  });

  // Scrollverhalten:
  window.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();

      if (!textActive) {
        // Weiß machen + Scrollen blockieren bis fertig
        activateText(sections[currentSection]);
        textActive = true;
      } else {
        // Wenn Text aktiv (weiß), dann wechsle zur nächsten Sektion
        if (currentSection < sections.length - 1) {
          deactivateText(sections[currentSection]);
          currentSection++;
          activateText(sections[currentSection]);
          textActive = false;
        }
      }
    },
    { passive: false }
  );

  // Touch Scroll auch
  let touchStartY = 0;
  window.addEventListener(
    "touchstart",
    (e) => {
      touchStartY = e.touches[0].clientY;
    },
    { passive: true }
  );
  window.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();
      let touchEndY = e.touches[0].clientY;
      let delta = touchStartY - touchEndY;

      if (Math.abs(delta) > 30) {
        if (!textActive) {
          activateText(sections[currentSection]);
          textActive = true;
        } else {
          if (currentSection < sections.length - 1) {
            deactivateText(sections[currentSection]);
            currentSection++;
            activateText(sections[currentSection]);
            textActive = false;
          }
        }
      }
    },
    { passive: false }
  );
});
