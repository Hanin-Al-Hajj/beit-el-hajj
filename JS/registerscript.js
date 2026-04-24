//      REGISTER PAGE

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", function(e) {
    const password = document.querySelector('input[name="password"]').value;
    const confirm  = document.querySelector('input[name="confirm_password"]').value;
    if (password !== confirm) {
      e.preventDefault();
      alert("Passwords do not match!");
    }
  });



  document.querySelectorAll(".toggle-password").forEach(function(btn) {
    btn.addEventListener("click", function () {
      const input = this.previousElementSibling;
      const isHidden = input.type === "password";

      input.type = isHidden ? "text" : "password";


      this.classList.toggle("is-visible", isHidden);
    });
  });
});