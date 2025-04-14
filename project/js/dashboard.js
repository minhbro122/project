const logoutBtn = document.getElementById("logoutBtn");
const logoutModal = document.getElementById("logoutModal");
const confirmBtn = document.getElementById("confirmLogout");
const cancelBtn = document.getElementById("cancelLogout");

logoutBtn.addEventListener("click", function () {
    logoutModal.style.display = "flex";
});

cancelBtn.addEventListener("click", function () {
    logoutModal.style.display = "none";
});

confirmBtn.addEventListener("click", function () {
    localStorage.removeItem("userAccount");
    window.location.href = "../quanlyhoctap/login.html";
});

window.addEventListener("click", function (e) {
    if (e.target === logoutModal) {
        logoutModal.style.display = "none";
    }
});