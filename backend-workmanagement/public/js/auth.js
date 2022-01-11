const back = document.getElementById('icon-back');
const login = document.getElementById('login');
const register = document.getElementById('register');
const linkRegister = document.getElementById('link-register');

if (back) {
    back.addEventListener('click', function() {
        login.style.display = 'block';
        register.style.display = 'none';
    });
}
if (linkRegister) {
    linkRegister.addEventListener('click', function(){
        login.style.display = 'none';
        register.style.display = 'block';
    });
}

const showPassword = document.getElementById('show-password');
const password = document.querySelectorAll('.input-password');
if (showPassword) {
    showPassword.addEventListener('click', function(){
        password.forEach(item => {
            if (item.type === 'password') {
                item.type = 'text';
            } else {
                item.type = 'password';
            }
        });
    });
}

const validate = (value, regex) => {
    return regex.test(value);
}

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
let timer = null;

const showNotification = (message, width, height) => {
    const notification = document.getElementById('notification');
    notification.style.display = 'block';
    if (width) notification.style.width = width;
    if (height) notification.style.height = height;
    document.getElementById('fail-message').innerHTML = message;
    document.querySelector('.fail').style.display = 'block';
    timer = setTimeout(() => {
        document.getElementById('notification').style.display = 'none';
        document.querySelector('.fail').style.display = 'none';
    }, 4000);
};

registerForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const inputText = this.querySelector('input[type=text]');
    clearTimeout(timer);
    if (!validate(inputText.value, /^[a-zA-Z0-9]+$/g)) {
        showNotification('Tên tài khoản không hợp lệ', '320px');
        return;
    }
    const pw1 = document.getElementById('pw1-register');
    const pw2 = document.getElementById('pw2-register');
    let password_1 = pw1.value;
    let password_2 = pw2.value;
    if (
        password_1.length < 6 ||
        password_2.length < 6 ||
        password_1.length > 20 ||
        password_2.length > 20
    ) { 
        showNotification('Mật khẩu từ 6-20 ký tự' , '320px');
        return;
    }
    if (password_1 !== password_2) {
        showNotification('Hai mật khẩu phải giống nhau', '340px');
        return;
    }

    this.submit();
});