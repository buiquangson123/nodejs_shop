const bodyHistory = $('.header-search-history')
const focusSearch = $('.header-search-input')
const main = $('.main')
const noti = $('.header__notify')
const headerNoti = $('.header__navbar-item--notify')

bodyHistory.onmouseover = function(e) {
    bodyHistory.style.display = "block"
}

focusSearch.addEventListener('focus', function(){
    bodyHistory.style.display = "block"
})

main.addEventListener('click', function(e){
    bodyHistory.style.display = "none"
    if(e.target.closest('.header-search-input')){
        bodyHistory.style.display = "block"
    }
})

// noti.addEventListener('mouseout', function() {
//     noti.style.animation = 'headerNotifyOut ease 0.3s'
// })



