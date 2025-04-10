const form = document.getElementById('registerForm');
const email = document.getElementById('email');
const password = document.getElementById('password');
const lastname = document.getElementById('lastname');
const firstname = document.getElementById('firstname');
const terms = document.getElementById('terms');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const termsError = document.getElementById('termsError');



form.addEventListener('submit', function (e) {

    e.preventDefault();

    emailError.textContent = '';
    passwordError.textContent = '';
    termsError.textContent = '';

    let isValid = true;

    const emailValue = email.value.trim();
    const passwordValue = password.value;
    const lastnameValue = lastname.value.trim();
    const firstnameValue = firstname.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (lastnameValue === '' || firstnameValue === '') {
        nameError.textContent = 'Họ và tên không được để trống.';
        isValid = false;
    }
    if (emailValue === '') {
        emailError.textContent = 'Email không được để trống.';
        isValid = false;
    } else if (!emailRegex.test(emailValue)) {
        emailError.textContent = 'Email không đúng định dạng.';
        isValid = false;
    }

    if (passwordValue === '') {
        passwordError.textContent = 'Mật khẩu không được để trống.';
        isValid = false;
    } else if (passwordValue.length < 8) {
        passwordError.textContent = 'Mật khẩu phải có ít nhất 8 ký tự.';
        isValid = false;
    }

    if (!terms.checked) {
        termsError.textContent = 'Bạn phải đồng ý với điều khoản.';
        isValid = false;
    }
    if (isValid) {
        const user = {
            hoTen: `${lastnameValue} ${firstnameValue}`,
            email: emailValue,
            password: passwordValue
        };

        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));


        localStorage.setItem("userAccount", JSON.stringify(user));

        window.location.href = '../quanlyhoctap/login.html?msg=success';
    }
});
const user = { email, password };
localStorage.setItem("userAccount", JSON.stringify(user));

document.getElementById("regMsg").textContent = "Đăng ký thành công!";