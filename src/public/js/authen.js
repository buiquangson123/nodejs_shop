
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const authenRegis = $('.header__navbar-item--regis')
const authenLogin = $('.header__navbar-item--login')
const overlay = $('.modal__overlay')

const loginLogoutItem = $('.header__navbar-item--strong')
const loginLogoutItem1 = $('.header__navbar-item--strong:last-child')

authenRegis.onclick = function() {
    
    const main = $('.modal__body')
    if(main) {
        $('.modal').style.display = 'flex'
        const body = document.createElement('div')
        body.classList.add('auth-form')
        body.innerHTML = `
            <div class="auth-form__container">
                <div class="auth-form__header">
                    <h3 class="auth-form__heading">Đăng ký</h3>
                    <button onclick="loginClick();" class="auth-form__switch-btn">Đăng nhập</button>
                </div>
                    
                <div class="auth-form__form">
                    <div class="auth-form__group">
                        <input type="text" class="auth-form__input" placeholder="Nhập số điện thoại">
                    </div>
                    <div class="auth-form__group">
                        <input type="text" class="auth-form__input" placeholder="Nhập mã hiển thị ở bên phải">
                    </div>
                    <div class="auth-form__group auth-form__group-code">
                        <input type="text" class="auth-form__input" placeholder="Mã xác minh">
                        <input type="button" class="auth-form__input auth-form__input-btn" value="Gửi mã xác minh">
                    </div>
                </div>

                <div class="auth-form__aside">
                    <p class="auth-form__policy-text">
                        Bằng việc đăng ký, bạn đã đồng ý với Shopee về
                        <a href="" class="auth-form__text-link">Điều khoản dịch vụ</a> & 
                        <a href="" class="auth-form__text-link">Chính sách bảo mật</a>
                    </p>
                </div>

                <div class="auth-form__controls">
                    <button onclick="btnBack()" class="btn btn-normal auth-form__controls-back">TRỞ LẠI</button>
                    <button class="btn btn--orange">ĐĂNG KÝ</button>
                </div>
            </div>

            <div class="auth-form__socials">
                <a href="" class="auth-form__socials--fb btn btn--size-s btn--with-icon">
                    <i class="auth-form__socials-icon fab fa-facebook-square"></i>
                    <span class="auth-form__socials-title">
                        Kết nối với Facebook
                    </span>
                </a>
                <a href="" class="auth-form__socials--gg btn btn--size-s btn--with-icon">
                    <!-- <i class="auth-form__socials-icon fab fa-google"></i> -->
                    <img src="./img/app/google.png" alt="ket nối gg" class="auth-form__socials-icon">
                    <span class="auth-form__socials-title">
                        Kết nối với Google
                    </span>
                </a>
            </div>
        `
        main.appendChild(body)
    
    }

   
}
    

authenLogin.onclick = function() {
    const main = $('.modal__body')
    if(main) {
        $('.modal').style.display = 'flex'
        const body = document.createElement('div')
        body.classList.add('auth-form')
        body.innerHTML = `
            <div class="auth-form__container">
                <div class="auth-form__header">
                    <h3 class="auth-form__heading">Đăng nhập</h3>
                    <button onclick="regisClick();" class="auth-form__switch-btn">Đăng kí</button>
                </div>
                    
                <div class="auth-form__form">
                    <div class="auth-form__group">
                        <input type="text" class="auth-form-email auth-form__input" placeholder="Nhập số điện thoại/email">
                    </div>
                    <div class="auth-form__group">
                        <input type="password" class="auth-form-pass auth-form__input" placeholder="Nhập mật khẩu">
                    </div>
                </div>

                <div class="auth-form__aside">
                    <div class="auth-form__help">
                        <a href="" class="auth-form__help-link auth-form__help-forgot">Quên mật khẩu</a>
                        <span class="auth-form__help-space"></span>
                        <a href="" class="auth-form__help-link">Cần trợ giúp ?</a>
                    </div>
                </div>

                <div class="auth-form__controls">
                    <button onclick="btnBack()" class="btn btn-normal auth-form__controls-back">TRỞ LẠI</button>
                    <button class="btn btn-login btn--orange">ĐĂNG NHẬP</button>
                </div>
            </div>

            <div class="auth-form__socials">
                <a href="" class="auth-form__socials--fb btn btn--size-s btn--with-icon">
                    <i class="auth-form__socials-icon fab fa-facebook-square"></i>
                    <span class="auth-form__socials-title">
                        Kết nối với Facebook
                    </span>
                </a>
                <a href="" class="auth-form__socials--gg btn btn--size-s btn--with-icon">
                    <!-- <i class="auth-form__socials-icon fab fa-google"></i> -->
                    <img src="./img/app/google.png" alt="ket nối gg" class="auth-form__socials-icon">
                    <span class="auth-form__socials-title">
                        Kết nối với Google
                    </span>
                </a>
            </div>
        `
        main.appendChild(body)
    }
    
    const email = $('.auth-form-email')
    const password = $('.auth-form-pass')
    const btnLogin = $('.btn-login')
    const bodyUser = $('.header__navbar .header__navbar-list:last-child')
    
    const users = [
        {
            username: "buiquangson1909@gmail.com",
            pass: "123456",
            name: "Bùi Quang Sơn",
            img: "https://yt3.ggpht.com/yti/APfAmoEq9hvJ0-C57UkYaKbBqCot0sv7u4U3Sap7xURkGQ=s88-c-k-c0x00ffffff-no-rj-mo"
        },
        {
            username: "vanvitoccho@gmail.com",
            pass: "123456",
            name: "Trần Thị Vân",
            img: "https://lh3.googleusercontent.com/ogw/ADea4I7nyBOwxeSvHtROmpN6L_2zhEbHNpx0M7zVDEhx-Q=s32-c-mo"
        }
    ]
    
    btnLogin.onclick = function(e) {
        if(email.value.length == 0 || password.value.length == 0){
            alert("Thông tin không được để trống. Hãy nhập thông tin")
            if(email.value.length == 0){
                email.focus()
            } else{
                password.focus()
            }
        } 
        else{
            check(email.value, password.value)
        }
    }

        
    function check(emailText, passwordText) {
        const listUser = users.find(user => {
            return user.username == emailText
        });
        
        if(listUser != undefined){
            if(listUser.pass == passwordText){
                if(bodyUser){
                    const mainLogin = document.createElement('li')
                    mainLogin.classList.add('header__navbar-item')
                    mainLogin.classList.add('header__navbar-item-user')
                    mainLogin.innerHTML = `
                        <img src="${listUser.img}" alt="" class="header__navber-item-img">
                        <span class="header__navbar-item-name">${listUser.name}</span>
    
                        
                        <ul class="header__navbar-user-menu">
                            <li class="header__navbar-user-item">
                                <a href="#" class="header__navbar-user-link">
                                    Tài khoản của tôi
                                </a>
                            </li>
                            <li class="header__navbar-user-item">
                                <a href="#" class="header__navbar-user-link">
                                    Đơn hàng
                                </a>
                            </li>
                            <li class="header__navbar-user-item header__navbar-user-item--separate">
                                <a href="#" onclick="return false;" class="header__navbar-user-link">
                                    Đăng xuất
                                </a>
                            </li>
                        
                        </ul>
                    `
                    bodyUser.appendChild(mainLogin)
                }
                const loginLogout = $$('.header__navbar-item--strong')
                const loginItem = $('.header__navbar-list:last-child .header__navbar-item:last-child')
                
                loginLogout[0].style.display = "none"
                loginLogout[1].style.display = "none"
                loginItem.style.display = "flex"
                removeAuthForm()
                
                // logout
                const logoutUser = $('.header__navbar-user-item:last-child .header__navbar-user-link')
                const bodyLogoutUser = $('.header__navbar-item-user')
                logoutUser.onclick = function() {
                    loginLogoutItem.style.display = "flex"
                    loginLogoutItem1.style.display = "flex"
                    bodyLogoutUser.innerHTML = ''
                    bodyLogoutUser.classList.remove('header__navbar-item-user')
                    bodyLogoutUser.classList.remove('header__navbar-item')
                    bodyLogoutUser.parentNode.removeChild(bodyLogoutUser)
                }
            } 
            
        }
        else {  
            alert("Sai mật khẩu hoặc email!")
        }
    }
    
}

function removeAuthForm() {
    const authForm = $('.auth-form')
    authForm.innerHTML = ''
    $('.modal').style.display = 'none'
    authForm.classList.remove('auth-form')
    authForm.parentNode.removeChild(authForm)
}

function loginClick() {
    removeAuthForm()
    authenLogin.onclick()
}

function regisClick() {
    removeAuthForm()
    authenRegis.onclick()
}

function btnBack() {
    removeAuthForm()
}


overlay.onclick = function(e) {
    if(e.target.closest('.modal__overlay')){
        removeAuthForm()
    }    
}
