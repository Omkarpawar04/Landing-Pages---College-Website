document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /*** Helper Functions ***/

  // Add or remove a class based on condition
  const toggleClass = (element, className, condition) => {
    if (condition) {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
    }
  };

  /*** Header Scroll Effect ***/
  function handleScrollEffect() {
    const body = document.body;
    const header = document.querySelector("#header");

    if (header?.classList.contains("scroll-up-sticky") || header?.classList.contains("sticky-top") || header?.classList.contains("fixed-top")) {
      toggleClass(body, "scrolled", window.scrollY > 100);
    }
  }
  document.addEventListener("scroll", handleScrollEffect);
  window.addEventListener("load", handleScrollEffect);

  /*** Mobile Navigation Toggle ***/
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("mobile-nav-active");
      mobileNavToggleBtn.classList.toggle("bi-list");
      mobileNavToggleBtn.classList.toggle("bi-x");
    });
  }

  /*** Preloader ***/
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => preloader.remove());
  }

  /*** Scroll Top Button ***/
  const scrollTopBtn = document.querySelector(".scroll-top");
  const handleScrollTop = () => {
    toggleClass(scrollTopBtn, "active", window.scrollY > 100);
  };
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    document.addEventListener("scroll", handleScrollTop);
    window.addEventListener("load", handleScrollTop);
  }

  /*** Testimonials Section ***/
  function initTestimonials() {
    const next = document.querySelector("#testimonials .next");
    const prev = document.querySelector("#testimonials .previous");
    const slides = document.querySelectorAll("#testimonials .slide");

    let currentIndex = 0;

    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.style.display = i === index ? "flex" : "none";
      });
    };

    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    };

    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    };

    if (next && prev) {
      next.addEventListener("click", nextSlide);
      prev.addEventListener("click", prevSlide);
    }

    // Show the first slide initially
    showSlide(currentIndex);
  }
  initTestimonials();

  /*** Modularized AOS Initialization ***/
  const aosInit = () => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  };
  window.addEventListener("load", aosInit);

  /*** Modularized FAQ Toggle ***/
/*** FAQ Toggle Functionality ***/
function initFaqToggle() {
  const faqItems = document.querySelectorAll(".faq .faq-container .faq-item");

  faqItems.forEach((item) => {
    const header = item.querySelector("h3");
    const toggle = item.querySelector(".faq-toggle");

    // Event listener for both the question and the toggle button
    [header, toggle].forEach((trigger) => {
      trigger.addEventListener("click", () => {
        // Toggle the active state of the clicked item
        const isActive = item.classList.contains("faq-active");
        item.classList.toggle("faq-active", !isActive);

        // Adjust the FAQ content visibility
        const content = item.querySelector(".faq-content");
        if (content) {
          content.style.gridTemplateRows = isActive ? "0fr" : "1fr";
          content.style.visibility = isActive ? "hidden" : "visible";
          content.style.opacity = isActive ? "0" : "1";
        }
      });
    });
  });
}

// Initialize FAQ toggle
initFaqToggle();





  /*** Navmenu Scrollspy ***/
  const navLinks = document.querySelectorAll(".navmenu a");
  const handleScrollSpy = () => {
    navLinks.forEach((link) => {
      const section = document.querySelector(link.hash);
      if (section) {
        const offset = window.scrollY + 200;
        const isActive = offset >= section.offsetTop && offset <= section.offsetTop + section.offsetHeight;
        toggleClass(link, "active", isActive);
      }
    });
  };
  document.addEventListener("scroll", handleScrollSpy);
  window.addEventListener("load", handleScrollSpy);
});




// Countdown Timer
const endDate = new Date('February 10, 2025 23:59:59').getTime(); // Set your end date here

const countdown = setInterval(() => {
  const now = new Date().getTime();
  const distance = endDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Update the numbers in the countdown
  document.getElementById('days').innerHTML = String(days).padStart(2, '0');
  document.getElementById('hours').innerHTML = String(hours).padStart(2, '0');
  document.getElementById('minutes').innerHTML = String(minutes).padStart(2, '0');
  document.getElementById('seconds').innerHTML = String(seconds).padStart(2, '0');

  // If the countdown is over
  if (distance < 0) {
    clearInterval(countdown);
    document.getElementById('countdown').innerHTML = "EXPIRED";
  }
}, 1000);


// About us Section

// Initialize Swiper
var swiper = new Swiper(".swiper", {
  effect: "cards",
  grabCursor: true,
  initialSlide: 0, // Start on the third slide
  speed: 500,      // Transition speed in ms
  loop: true,      // Infinite looping
  rotate: true,    // Enable rotation effect
  mousewheel: {
    invert: false, // Mousewheel scrolling behavior
  },
});

// Get all list items
const contentItems = document.querySelectorAll('.content-item');

// Add click event listeners to each item
contentItems.forEach((item) => {
  item.addEventListener('click', (event) => {
    // Remove active class from all items
    contentItems.forEach((i) => i.classList.remove('active'));

    // Add active class to the clicked item
    item.classList.add('active');

    // Get the corresponding card ID from the clicked list item
    const cardId = item.getAttribute('data-card');

    // Find the index of the corresponding Swiper slide using Swiper's API
    const slides = swiper.slides; // Access all slides (including duplicated ones in loop mode)
    const targetIndex = Array.from(slides).findIndex(
      (slide) => slide.id === cardId
    );

    // Slide to the correct index in the looped structure
    if (targetIndex !== -1) { // Ensure the index is valid
      swiper.slideToLoop(targetIndex - swiper.loopedSlides); // Account for looped slides
    }
  });
});

// VIDEO
// Get modal elements
const videoModal = document.getElementById("videoModal");
const closeBtnn = document.querySelector(".close-btnn");
const playButtonOverlay = document.querySelector(".play-button-overlay");
const iframe = videoModal.querySelector("iframe");

// YouTube embed link for the video
const videoUrl = "https://www.youtube.com/embed/VWtf_j-A-8E?autoplay=1";

// Show modal and play video when the play button is clicked
playButtonOverlay.addEventListener("click", () => {
  videoModal.style.display = "flex";
  iframe.src = videoUrl; // Add YouTube video URL with autoplay
});

// Close modal and stop video when the close button is clicked
closeBtnn.addEventListener("click", () => {
  videoModal.style.display = "none";
  iframe.src = ""; // Reset iframe to stop the video
});

// Close modal when clicking outside the video
videoModal.addEventListener("click", (event) => {
  if (event.target === videoModal) {
    videoModal.style.display = "none";
    iframe.src = ""; // Reset iframe to stop the video
  }
});


// Carousel section
let increment = 0;
const carousel = document.getElementById("carousel");

setInterval(() => {
  increment++;
  const rotationAngle = increment * -60; // Rotate by -60° for each figure
  carousel.style.transform = `rotateX(${rotationAngle}deg)`;
  carousel.setAttribute("data-state", (increment % 6) + 1); // Cycle through states 1 to 6
}, 1000); // Change every 2 seconds






// document.querySelectorAll("#course-features .container").forEach((card) => {
//   card.addEventListener("click", (event) => {
//     event.stopPropagation(); // Prevents click event from interfering with Swiper
//   });
// });



// Main Form Submit Validation Code
//   https://script.google.com/macros/s/AKfycbwyD2aZHx-PkrFU4E24Y8Q2rgTw9CKHGfmteAsckbful0hX7NZ7CQEMhwxsJspK8M5J/exec

// Main Form Submission
document.getElementById("submit-to-google-sheet").addEventListener("submit", function (e) {
  e.preventDefault();

  // Main Form Elements
  const name = document.getElementById("name").value.trim();
  const contactNumber = document.getElementById("contact_number").value.trim();
  const city = document.getElementById("city").value.trim();
  const courses = document.getElementById("courses").value;

  // Regular Expressions
  const nameRegex = /^[a-zA-Z\s]+$/; // Only letters and spaces
  const phoneRegex = /^[0-9]{10}$/;  // Exactly 10 digits

  // Validation Flags
  let isValid = true;
  let errorMessage = "";

  // Name Validation
  if (!nameRegex.test(name)) {
    isValid = false;
    errorMessage += "Name must contain only alphabets and spaces.\n";
  }

  // Contact Number Validation
  if (!phoneRegex.test(contactNumber)) {
    isValid = false;
    errorMessage += "Contact number must be exactly 10 digits.\n";
  }

  // Courses Validation
  if (!courses) {
    isValid = false;
    errorMessage += "Please select a course.\n";
  }

  // City Validation
  if (!city) {
    isValid = false;
    errorMessage += "City field cannot be empty.\n";
  }

  // Final Validation
  if (!isValid) {
    Swal.fire("Validation Error", errorMessage, "error");
    return;
  }

  // Proceed with Form Submission
  const scriptURL = "https://script.google.com/macros/s/AKfycbwyD2aZHx-PkrFU4E24Y8Q2rgTw9CKHGfmteAsckbful0hX7NZ7CQEMhwxsJspK8M5J/exec";
  const formData = new FormData(this);

  // Show Loader
  Swal.fire({
    title: "Submitting...",
    html: `<i class="fas fa-spinner fa-spin" style="font-size: 24px; color: #007bff;"></i>
           <p>Please wait while we submit your data.</p>`,
    showConfirmButton: false,
    allowOutsideClick: false,
  });

  // Submit Data to Google Sheet
  fetch(scriptURL, { method: "POST", body: formData })
    .then((response) => {
      if (response.ok) {
        Swal.fire("Success", "Form submitted successfully!", "success");
        document.getElementById("submit-to-google-sheet").reset(); // Reset form after successful submission
      } else {
        Swal.fire("Error", "Failed to submit the form. Please try again later.", "error");
      }
    })
    .catch((error) => {
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
      console.error("Submission Error:", error);
    });
});




// Popup Form Validation and Submission
document.addEventListener("DOMContentLoaded", function () {
  // Open the popup on page load
  const popup = document.querySelector(".popup");
  const overlay = document.querySelector(".full-overlay");
  const closeButton = document.querySelector(".popup .close-btn");
  const form = document.querySelector(".popup .form");
  const loadingContainer = document.querySelector(".loading-container");
  const successMessage = document.querySelector(".success-message");

  function showPopup() {
    popup.classList.add("active");
    overlay.classList.add("active");
    popup.style.display = "flex";
    overlay.style.display = "flex";
    document.body.style.overflow = "hidden"; // Prevent scrolling when popup is open
  }

  function hidePopup() {
    popup.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "auto"; 

    // Hide the popup completely after animation
    setTimeout(() => {
      popup.style.display = "none";
      overlay.style.display = "none";
    }, 300); // Matches the CSS transition duration
  }

  // Show popup on page load
  showPopup();

  // Close the popup when clicking the close button
  closeButton.addEventListener("click", function () {
    hidePopup();
    resetPopupState();
  });

  // Form submission handling
  document.querySelector('.popup .form button').addEventListener('click', function (event) {
    event.preventDefault();

    const name = document.querySelector('#popup-name').value.trim();
    const contactNumber = document.querySelector('#popup-contact-number').value.trim();

    // Validate form inputs
    const errorMessage = validatePopupForm(name, contactNumber);
    if (errorMessage) {
      Swal.fire("Validation Error", errorMessage, "error");
      return;
    }

    // Show loading effect
    loadingContainer.style.display = 'block';
    form.style.display = 'none'; // Hide the form

    // Send data to Google Sheets
    sendToGoogleSheets(name, contactNumber);
  });

  // Function to validate popup form fields
  function validatePopupForm(name, contactNumber) {
    const nameRegex = /^[a-zA-Z\s]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!name || !nameRegex.test(name)) {
      return "Name must contain only alphabets and spaces.";
    }
    if (!contactNumber || !phoneRegex.test(contactNumber)) {
      return "Contact number must be exactly 10 digits.";
    }
    return "";
  }

  // Function to reset popup state
  function resetPopupState() {
    form.style.display = 'block';
    loadingContainer.style.display = 'none';
    successMessage.style.display = 'none';
  }

  // Function to send popup form data to Google Sheets
  function sendToGoogleSheets(name, contactNumber) {
    const googleFormURL = 'https://script.google.com/macros/s/AKfycbwyD2aZHx-PkrFU4E24Y8Q2rgTw9CKHGfmteAsckbful0hX7NZ7CQEMhwxsJspK8M5J/exec';
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('contact_number', contactNumber);

    fetch(googleFormURL, {
      method: 'POST',
      body: formData,
      mode: 'no-cors',
    })
      .then(() => {
        loadingContainer.style.display = 'block';
        successMessage.style.display = 'block';

        setTimeout(() => {
          hidePopup();
        }, 3000);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  }
});
