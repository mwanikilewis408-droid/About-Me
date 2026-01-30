/* ============================
   3D MOUSE PARALLAX EFFECT
   ============================ */

const isMobile = window.innerWidth < 768;

if (!isMobile) {
  document.addEventListener("mousemove", (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 30;
    const y = (window.innerHeight / 2 - e.clientY) / 30;

    sections.forEach(section => {
      section.style.setProperty("--parallax-x", `${x}px`);
      section.style.setProperty("--parallax-y", `${y}px`);
    });
  });
}

const sections = document.querySelectorAll(".section");

document.addEventListener("mousemove", (e) => {
  const x = (window.innerWidth / 2 - e.clientX) / 30;
  const y = (window.innerHeight / 2 - e.clientY) / 30;

 sections.forEach(section => {
  const bgLayer = section;
  bgLayer.style.setProperty(
    "--parallax-x",
    `${x}px`
  );
  bgLayer.style.setProperty(
    "--parallax-y",
    `${y}px`
  );
});
});

/* Reset transform when mouse leaves window */
document.addEventListener("mouseleave", () => {
  sections.forEach(section => {
    section.style.transform = "translate(0, 0) scale(1)";
  });
});


/* ============================
   SCROLL-BASED DEPTH EFFECT
   ============================ */

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  sections.forEach((section, index) => {
    const speed = 0.15 + index * 0.05;
    section.style.backgroundPosition = `center ${scrollY * speed}px`;
  });
});


/* ============================
   GALLERY IMAGE DEPTH TILT
   ============================ */

const galleryImages = document.querySelectorAll(".gallery-grid img");

galleryImages.forEach(img => {
  img.addEventListener("mousemove", (e) => {
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    img.style.transform = `
      perspective(600px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.1)
    `;
  });

  img.addEventListener("mouseleave", () => {
    img.style.transform = "scale(1)";
  });
});


/* ============================
   SECTION FADE-IN ON VIEW
   ============================ */

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.15
});

sections.forEach(section => {
  observer.observe(section);
});
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";

    setTimeout(() => {
      loader.style.display = "none";
    }, 800);
  }, 1200);
});
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
