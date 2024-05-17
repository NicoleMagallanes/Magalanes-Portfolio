const iconBoxes = document.querySelectorAll(".icon-box");
const iconBoxContainers = document.querySelectorAll(".icon-container");
const closeBtns = document.querySelectorAll(".close-btn");
const maximizeBtns = document.querySelectorAll(".maximize-btn");
const body = document.querySelector("body");

iconBoxes.forEach((btn) => {
  btn.addEventListener("click", () => {
    let modal = btn.getAttribute("data-modal");
    document.getElementById(modal).style.display = "block";
    body.classList.add("prevent-background-scroll");
  });
});

closeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let modal = btn.closest(".popup");
    modal.style.display = "none";
    body.classList.remove("prevent-background-scroll");
    iconBoxContainers.forEach((container) => {
      container.style.display = "flex";
    });
  });
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("popup")) {
    e.target.style.display = "none";
    body.classList.remove("prevent-background-scroll");
  }
});

maximizeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let modal = btn.closest(".popup");
    let container = modal.querySelector(".popup-container");
    let body = modal.querySelector(".popup-body");

    if (modal.classList.contains("maximized")) {
      container.style.width = "min(900px, 90%)";
      container.style.top = "45%";
      body.style.height = "70vh";
    } else {
      container.style.width = "100%";
      container.style.top = "50%";
      body.style.height = "90vh";
    }

    modal.classList.toggle("maximized");
    body.classList.toggle("prevent-scroll");
  });
});

var swiper = new Swiper(".swiper", {
  preventClicks: true,
  noSwiping: true,
  freeMode: false,
  spaceBetween: 10,
  navigation: {
    nextEl: ".next",
    prevEl: ".prev",
  },
  mousewheel: {
    invert: false,
    thresholdDelta: 50,
    sensitivity: 1,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    680: {
      slidesPerView: 2,
    },
    1100: {
      slidesPerView: 3,
    },
    1600: {
      slidesPerView: 4,
    },
  },
});

$(document).ready(function () {
  // Show the corresponding popup when "Learn More" button is clicked
  $(".more-btn").click(function () {
    var $popup = $(this).closest(".project-box").find(".custom-model-main");
    $popup.addClass("model-open");
  });

  // Close the popup when the close button or overlay is clicked
  $(".close-btnn, .bg-overlay").click(function () {
    $(".custom-model-main").removeClass("model-open");
  });
});

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Capture form data
    const formData = new FormData(this);

    // Convert form data to JSON
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
    };

    fetch("http://127.0.0.1:5500/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.text(); // or response.json() if your server sends JSON
      })
      .then((data) => {
        console.log("Success:", data);
        alert("Email sent successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to send email.");
      });

    // Optionally, reset the form
    this.reset();
  });
