const form = document.getElementById("loginForm");
const messageContainer = document.getElementById("message");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const emailInput = form.email;
  const passwordInput = form.password;
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  document.querySelectorAll(".error-msg").forEach((el) => el.remove());
  messageContainer.textContent = "";
  messageContainer.className = "";

  let hasError = false;

  if (email === "") {
    showError(emailInput, "Vui lòng nhập email.");
    hasError = true;
  }

  if (password === "") {
    showError(passwordInput, "Vui lòng nhập mật khẩu.");
    hasError = true;
  }

  if (hasError) return;


  const storedUser = JSON.parse(localStorage.getItem("userAccount"));

  if (
    storedUser &&
    storedUser.email === email &&
    storedUser.password === password
  ) {
    messageContainer.textContent = "Đang đăng nhập...";
    messageContainer.className = "success-msg";

    setTimeout(() => {
      window.location.href = "./category-manager.html";
    }, 2000);
  } else {
    showError(passwordInput, "Email hoặc mật khẩu không đúng.");
  }
});

function showError(inputElement, message) {
  const error = document.createElement("div");
  error.className = "error-msg";
  error.textContent = message;
  inputElement.parentNode.insertBefore(error, inputElement.nextSibling);
}
const params = new URLSearchParams(window.location.search);
if (params.get("msg") === "success") {
  messageContainer.textContent = "Đăng ký thành công! Vui lòng đăng nhập.";
  messageContainer.className = "success-msg";
}