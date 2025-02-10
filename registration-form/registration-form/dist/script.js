const scriptURL = "https://script.google.com/macros/s/AKfycbyqeusJvN4CoofrewuztTTrjV-mJlXLSnQbYoQtOkhQZdRYvKWcJEetAwPtx709Q2xm/exec";
    const form = document.getElementById("submit-to-google-sheet");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let isValid = true;

      // Validate required fields
      document.querySelectorAll("[data-required]").forEach((el) => {
        const small = el.nextElementSibling;
        if (el.value.trim() === "") {
          small.style.display = "block";
          isValid = false;
        } else {
          small.style.display = "none";
        }
      });

      // Validate email
      document.querySelectorAll("[data-email]").forEach((el) => {
        const small = el.nextElementSibling.nextElementSibling;
        const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailReg.test(el.value)) {
          small.style.display = "block";
          isValid = false;
        } else {
          small.style.display = "none";
        }
      });

      // Validate numbers and character count
      document.querySelectorAll("[data-number]").forEach((el) => {
        const smallNum = el.nextElementSibling.nextElementSibling;
        const smallChar = smallNum.nextElementSibling;
        if (!/^\d+$/.test(el.value)) {
          smallNum.style.display = "block";
          isValid = false;
        } else {
          smallNum.style.display = "none";
        }
        if (el.value.length !== parseInt(el.getAttribute("data-count"))) {
          smallChar.style.display = "block";
          isValid = false;
        } else {
          smallChar.style.display = "none";
        }
      });

      // Submit the form if valid
      if (isValid) {
        const formData = new FormData(form);
        const ex = document.getElementById("ex").checked;
        formData.append("ex", ex ? "Yes" : "No");

        fetch(scriptURL, { method: "POST", body: formData })
          .then((response) => {
            Swal.fire("Success", "Form submitted successfully!", "success");
            form.reset();
          })
          .catch((error) => {
            Swal.fire("Error", "Something went wrong. Please try again.", "error");
          });
      } else {
        Swal.fire("Error", "Please correct the errors and try again.", "error");
      }
      
    });