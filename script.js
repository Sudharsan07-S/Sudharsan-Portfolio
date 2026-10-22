const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

// Highlight the navigation link for the section currently in view.
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-link");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(link => {
          const active = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach(section => observer.observe(section));
}

// Project category filter.
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;
    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    projectCards.forEach(card => {
      card.hidden = category !== "all" && card.dataset.category !== category;
    });
  });
});

// Expand/collapse project learning details.
document.querySelectorAll(".details-toggle").forEach(button => {
  button.addEventListener("click", () => {
    const details = button.nextElementSibling;
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    details.hidden = expanded;
    button.querySelector("span").textContent = expanded ? "＋" : "−";
  });
});

// Validate contact details locally. No message is sent or stored.
const form = document.querySelector("#contactForm");
const feedback = document.querySelector("#formFeedback");
form.addEventListener("submit", event => {
  event.preventDefault();
  const name = document.querySelector("#visitorName").value.trim();
  const email = document.querySelector("#visitorEmail").value.trim();
  const message = document.querySelector("#visitorMessage").value.trim();
  const emailLooksValid = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);

  if (!name || !email || !message) {
    feedback.textContent = "Please complete all three fields before continuing.";
    feedback.style.color = "#fbbf24";
    return;
  }
  if (!emailLooksValid) {
    feedback.textContent = "Please enter a valid email address.";
    feedback.style.color = "#fbbf24";
    return;
  }
  feedback.textContent = `Thanks, ${name}. The form looks complete, but no message was sent. Use the email link to contact Sudharsan directly.`;
  feedback.style.color = "#74e6b0";
});

document.querySelector("#year").textContent = new Date().getFullYear();
