document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".page-loader");
  window.addEventListener("load", () => {
    if (loader) setTimeout(() => loader.classList.add("done"), 350);
  });

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("open", !isOpen);
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    }));
  }

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index % 4, 3) * 90}ms`;
      observer.observe(item);
    });
  } else revealItems.forEach(item => item.classList.add("visible"));

  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const data = new FormData(form);
      const recipient = "kaku23012009@gmail.com"; // Replace with your real email address.
      const subject = encodeURIComponent(data.get("subject"));
      const body = encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`);
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
      const note = document.getElementById("formNote");
      if (note) note.textContent = "Your email app should open with the message prepared. Replace the placeholder recipient address before publishing.";
    });
  }
});