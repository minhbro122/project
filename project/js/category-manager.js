document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const modalTitle = modal.querySelector(".modal-header h3");
    const courseNameInput = document.getElementById("courseName");
    const statusInputs = document.getElementsByName("status");
    const errorMessage = document.createElement("p");
    errorMessage.style.color = "red";
    errorMessage.style.fontSize = "12px";
    errorMessage.style.marginTop = "5px";
    courseNameInput.parentNode.insertBefore(errorMessage, courseNameInput.nextSibling);
    let currentRow = null;

    window.openModal = function (mode = "add", element = null) {
        errorMessage.innerText = "";
        if (mode === "edit" && element) {
            currentRow = element.closest("tr");
            const courseName = currentRow.cells[0].innerText;
            const courseStatus = currentRow.cells[1].innerText.includes("Đang hoạt động") ? "Đang hoạt động" : "Ngừng hoạt động";

            courseNameInput.value = courseName;
            statusInputs.forEach(input => input.checked = input.value === courseStatus);
            modalTitle.innerText = "Cập nhật môn học";
        } else {
            courseNameInput.value = "";
            statusInputs[0].checked = true;
            modalTitle.innerText = "Thêm mới môn học";
            currentRow = null;
        }
        modal.classList.add("active");
    };

    window.closeModal = function () {
        modal.classList.remove("active");
    };

    window.addCourse = function () {
        const name = courseNameInput.value.trim();
        if (!name) {
            errorMessage.innerText = "Tên môn học không được để trống";
            return;
        }
        errorMessage.innerText = "";

        const status = [...statusInputs].find(input => input.checked).value;
        const statusClass = status === "Đang hoạt động" ? "status-active" : "status-inactive";
        const statusText = status === "Đang hoạt động" ? "🟢 Đang hoạt động" : "🔴 Ngừng hoạt động";

        if (currentRow) {
            currentRow.cells[0].innerText = name;
            currentRow.cells[1].innerHTML = statusText;
            currentRow.cells[1].className = statusClass;
        } else {
            const tableBody = document.querySelector("tbody");
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${name}</td>
                <td class="${statusClass}">${statusText}</td>
                <td class="actions">
                    <span class="edit-icon" onclick="openModal('edit', this)">✎</span> 
                    <span class="delete-icon" onclick="deleteCourse(this)">🗑️</span>
                </td>
            `;
            tableBody.appendChild(newRow);
        }
        closeModal();
    };

    window.deleteCourse = function (element) {
        const row = element.closest("tr");
        row.remove();
    };

    courseNameInput.addEventListener("input", function () {
        if (courseNameInput.value.trim()) {
            errorMessage.innerText = "";
        }
    });
});
