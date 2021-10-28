// const $ = document.querySelector.bind(document)
// const $$ = document.querySelectorAll.bind(document)
const itemCart = $('.header__cart-item')
const listItemCart = $$('.header__cart-item')
const isListCart = $('.header__cart-list')
const headerList = $('.header__cart-header h3')
const footerList = $('.footer__cart-footer')
const qualityNotify = $('.header__cart-quality')

if(itemCart === null) {
    isListCart.classList.add('header__cart-list--no-cart')
    headerList.style.display = "none"
    footerList.style.display = "none"
    qualityNotify.style.display = "none"
} else {
    isListCart.classList.remove('header__cart-list--no-cart')
    headerList.style.display = "block"
    footerList.style.display = "flex"
    qualityNotify.style.display = "block"
}

listItemCart[0].onmouseover = function(e) {
    listItemCart[0].style.background = "#f1f1f1";
    if(e.target.closest('.header__cart-item-delete')){
        $('.header__cart-item-delete').style.background = "var(--orange-color)"
        $('.header__cart-dele-active').style.color = "var(--white-color)"
        $('.header__cart-item-delete').onmouseover = function(ev) {
            $('.header__cart-item-delete').style.background = "var(--orange-color)"
            $('.header__cart-dele-active').style.color = "var(--white-color)"
        }
        $('.header__cart-item-delete').onmouseout = function(ev) {
            $('.header__cart-item-delete').style.background = "var(--white-color)"
            $('.header__cart-dele-active').style.color = "var(--black-color)"
        }
    }
    console.log("No")
    
}

listItemCart[0].onmouseout = function() {
    listItemCart[0].style.background = "var(--white-color)";
}
listItemCart[1].onmouseout = function() {
    listItemCart[1].style.background = "var(--white-color)";
}
listItemCart[2].onmouseout = function() {
    listItemCart[2].style.background = "var(--white-color)";
}
listItemCart[1].onmouseover = function(e) {
    listItemCart[1].style.background = "#f1f1f1";
    if(e.target.closest('.header__cart-item-delete')){
        $$('.header__cart-item-delete')[1].style.background = "var(--orange-color)"
        $$('.header__cart-dele-active')[1].style.color = "var(--white-color)"
        $$('.header__cart-item-delete')[1].onmouseover = function(ev) {
            $('.header__cart-item-delete')[1].style.background = "var(--orange-color)"
            $('.header__cart-dele-active')[1].style.color = "var(--white-color)"
        }
        $$('.header__cart-item-delete')[1].onmouseout = function(ev) {
            $$('.header__cart-item-delete')[1].style.background = "var(--white-color)"
            $$('.header__cart-dele-active')[1].style.color = "var(--black-color)"
        }
    }
    console.log("No")
        
}
listItemCart[2].onmouseover = function(e) {
    listItemCart[2].style.background = "#f1f1f1";
    if(e.target.closest('.header__cart-item-delete')){
        $$('.header__cart-item-delete')[2].style.background = "var(--orange-color)"
        $$('.header__cart-dele-active')[2].style.color = "var(--white-color)"
        $$('.header__cart-item-delete')[2].onmouseover = function(ev) {
            $$('.header__cart-item-delete')[2].style.background = "var(--orange-color)"
            $$('.header__cart-dele-active')[2].style.color = "var(--white-color)"
        }
        $$('.header__cart-item-delete')[2].onmouseout = function(ev) {
            $$('.header__cart-item-delete')[2].style.background = "var(--white-color)"
            $$('.header__cart-dele-active')[2].style.color = "var(--black-color)"
        }
    }
    console.log("No")
        
}
