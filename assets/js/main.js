const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const contactForm = document.querySelector("[data-contact-form]");

if (contactForm) {
  const formStatus = document.querySelector("[data-form-status]");

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = {};
    contactForm.querySelectorAll("input, select, textarea").forEach((input) => {
      if (!input.name) return;
      formData[input.name] = input.value.trim();
    });

    const submitButton = contactForm.querySelector('button[type="submit"]');

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";
    }

    if (formStatus) {
      formStatus.style.display = "block";
      formStatus.style.color = "#617071";
      formStatus.textContent = "Submitting...";
    }

    fetch("https://thinksmart.life/forms/fullservicemovingmiami/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((result) => {
        if (!result.success) {
          throw new Error(result.message || "Submission failed");
        }

        if (formStatus) {
          formStatus.style.color = "#55624d";
          formStatus.textContent = "Thank you! Your inquiry has been received. We will be in touch shortly.";
        }
        contactForm.reset();
      })
      .catch((error) => {
        if (formStatus) {
          formStatus.style.color = "#6f2437";
          formStatus.textContent = "Sorry, there was a problem submitting your inquiry. Please email us directly at ruben@muberpickup.com or try again.";
        }
        console.error("Form submission error:", error);
      })
      .finally(() => {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Send Inquiry";
        }
      });
  });
}
