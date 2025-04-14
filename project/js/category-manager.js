const modal = document.getElementById("modal");
const confirmDeleteModal = document.getElementById("confirmDeleteModal");
const modalTitle = document.getElementById("modalTitle");
const courseNameInput = document.getElementById("courseName");
const statusInputs = document.getElementsByName("status");
const errorMessage = document.getElementById("error-message");
const toast = document.getElementById("toast");
const searchInput = document.getElementById("searchInput");

let courses = JSON.parse(localStorage.getItem("courses") || "[]");
let editingIndex = null;
let deleteIndex = null;
let currentPage = 1;
const itemsPerPage = 5;

function showToast(message) {
    toast.innerText = message;
    toast.style.display = "block";
    setTimeout(() => toast.style.display = "none", 2000);
}

function openModal(index = null) {
    editingIndex = index;
    errorMessage.style.display = "none";
    if (index !== null) {
        const course = courses[index];
        courseNameInput.value = course.name;
        statusInputs.forEach(input => input.checked = input.value === course.status);
        modalTitle.innerText = "Cập nhật môn học";
    } else {
        courseNameInput.value = "";
        statusInputs[0].checked = true;
        modalTitle.innerText = "Thêm mới môn học";
    }
    modal.classList.add("active");
}

function closeModal() {
    modal.classList.remove("active");
}

function addOrUpdateCourse() {
    const name = courseNameInput.value.trim();
    if (!name) {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Tên môn học không được để trống";
        return;
    }


    const isDuplicate = courses.some((course, index) => course.name.toLowerCase() === name.toLowerCase() && index !== editingIndex);
    if (isDuplicate) {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Tên môn học đã tồn tại";
        return;
    }

    const status = [...statusInputs].find(i => i.checked).value;
    const timestamp = new Date().getTime();

    if (editingIndex !== null) {
        // Cập nhật môn học
        courses[editingIndex].name = name;
        courses[editingIndex].status = status;
        showToast("Cập nhật môn học thành công");
    } else {
        // Thêm mới môn học
        courses.push({ name, status, createdAt: timestamp });
        showToast("Thêm môn học thành công");
    }

    localStorage.setItem("courses", JSON.stringify(courses));
    closeModal();
    renderCourses();
}

function openConfirmDeleteModal(index) {
    deleteIndex = index;
    confirmDeleteModal.classList.add("active");
}

function closeConfirmDeleteModal() {
    confirmDeleteModal.classList.remove("active");
}

function confirmDeleteCourse() {
    courses.splice(deleteIndex, 1);
    localStorage.setItem("courses", JSON.stringify(courses));
    closeConfirmDeleteModal();
    renderCourses();
    showToast("Xoá môn học thành công");
}

function renderCourses() {
    const tbody = document.getElementById("courseTable");
    tbody.innerHTML = "";
    const filterStatus = document.getElementById("filterStatus").value;
    const sortOption = document.getElementById("sortOption").value;
    const keyword = searchInput.value.toLowerCase();

    let filtered = courses.filter(course =>
        (filterStatus === "all" || course.status === filterStatus) &&
        course.name.toLowerCase().includes(keyword)
    );

    if (sortOption === "name") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else {
        filtered.sort((a, b) => b.createdAt - a.createdAt);
    }

    const start = (currentPage - 1) * itemsPerPage;
    const paginated = filtered.slice(start, start + itemsPerPage);

    paginated.forEach((course, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${course.name}</td>
            <td class="${course.status === 'Đang hoạt động' ? 'status-active' : 'status-inactive'}">
                ${course.status === 'Đang hoạt động' ? '🟢 Đang hoạt động' : '🔴 Ngừng hoạt động'}
            </td>
            <td>
                <span onclick="openModal(${courses.indexOf(course)})">✎</span>
                <span onclick="openConfirmDeleteModal(${courses.indexOf(course)})">🗑️</span>
            </td>
        `;
        tbody.appendChild(tr);
    });

    renderPagination(filtered.length);
}

function renderPagination(totalItems) {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const a = document.createElement("a");
        a.textContent = i;
        if (i === currentPage) a.classList.add("active");
        a.onclick = () => { currentPage = i; renderCourses(); };
        pagination.appendChild(a);
    }
}

renderCourses();

document.addEventListener("DOMContentLoaded", function () {
    const userButton = document.getElementById("userButton");
    const userDropdown = document.getElementById("userDropdown");
    const logoutButton = document.getElementById("logoutButton");


    userButton.addEventListener("click", function () {
        userDropdown.classList.toggle("active");
    });


    logoutButton.addEventListener("click", function () {
        openLogoutConfirmModal();
    });


    document.addEventListener("click", function (event) {
        if (!userButton.contains(event.target) && !userDropdown.contains(event.target)) {
            userDropdown.classList.remove("active");
        }
    });
});

const logoutConfirmModal = document.getElementById("logoutConfirmModal");

function openLogoutConfirmModal() {
    logoutConfirmModal.classList.add("active");
}

function closeLogoutConfirmModal() {
    logoutConfirmModal.classList.remove("active");
}

function confirmLogout() {
    localStorage.removeItem("userAccount");
    window.location.href = "./login.html";
}