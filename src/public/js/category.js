// Cate Mobile
document.documentElement.style.setProperty("--width-cate-mobile", $('.home__mobile-cate').offsetWidth+`px`);

// Category
const withItemCate = $$('.grid__row-cate-item')[0].offsetWidth
const amountCate = getComputedStyle($('.grid__row-cate-slides')).getPropertyValue('--amountCate')
console.log("width: " + withItemCate + "amout: " + amountCate)
$('.btn-next').addEventListener('click', function(){
    const positionCate = -1*withItemCate*(13-amountCate)
    console.log("Cate: " + positionCate)
    $('.grid__row-cate-slides').style = `transform: translateX(${positionCate}px)`
    $('.btn-prev').style.display = "flex"
    $('.btn-next').style.display = "none"
})

$('.btn-prev').addEventListener('click', function(){
    $('.grid__row-cate-slides').style = `transform: translateX(0px)`
    $('.btn-prev').style.display = "none"
    $('.btn-next').style.display = "flex"
})

// Flash sale
window.addEventListener('load', function() {
    const listItemFlash = $$('.grid__row-flash-item')
    const withFlash = $('.grid__row-flash-slides') //khung chứa các item
    const showFlash = $('.grid__row-flash-slider') //khung hiển thị nhìn thấy
    const btnFlashPrev = $('.btn-prev-flash')
    const btnFlashNext = $('.btn-next-flash')
    
    const withItemFlash = listItemFlash[0].offsetWidth
    const heightItemFlash = listItemFlash[0].offsetHeight
    const flashLength = listItemFlash.length
    console.log(flashLength, withItemFlash, heightItemFlash)
    let indexFlash = 1
    let postionFlashX = 0

    const amountPro = getComputedStyle(withFlash).getPropertyValue('--amountPro')
    console.log(amountPro)
    
    btnFlashNext.addEventListener('click', function() {
        handleChangeFlash(1)
    })
    
    btnFlashPrev.addEventListener('click', function() {
        handleChangeFlash(-1)
    })
    
    function handleChangeFlash(number) {
        if(number === 1){
            if(indexFlash*amountPro > (flashLength - amountPro) && indexFlash == Math.floor(flashLength/amountPro)) {
                if((postionFlashX - withItemFlash*amountPro)  == (-flashLength*withItemFlash + withItemFlash*amountPro)) {
                    postionFlashX = postionFlashX - (withItemFlash*amountPro)
                    withFlash.style = `transform: translateX(${postionFlashX}px)`
                    btnFlashNext.style.display = "none"
                    indexFlash = indexFlash + 1
                    return
                } else{
                    postionFlashX = postionFlashX - (flashLength - indexFlash*amountPro)*withItemFlash
                    withFlash.style = `transform: translateX(${postionFlashX}px)`
                    btnFlashNext.style.display = "none"
                    if(indexFlash == 1 && (postionFlashX > withItemFlash*(-amountPro))) {
                        btnFlashPrev.style.display = "flex"
                    }
                    indexFlash = indexFlash + 1
                    // console.log("return   " + indexFlash + ": "+ postionFlashX)
                    return
                }
            } else{ 
                postionFlashX = postionFlashX - (withItemFlash*amountPro)
                withFlash.style = `transform: translateX(${postionFlashX}px)`
                btnFlashPrev.style.display = "flex"
            }
            indexFlash++
            if(indexFlash*amountPro === flashLength) {
                btnFlashNext.style.display = "none"
            }
            if(indexFlash*amountPro > (flashLength - amountPro) && postionFlashX <= (-flashLength*withItemFlash + withItemFlash*amountPro)){
                btnFlashNext.style.display = "none"
            }
        } else if(number === -1) {
            if(indexFlash*amountPro < (flashLength - amountPro) && indexFlash == 2) {
                postionFlashX = 0
                withFlash.style = `transform: translateX(${postionFlashX}px)`
                btnFlashPrev.style.display = "none"
                indexFlash = 1
                // console.log("return prev  " + indexFlash + ": "+ postionFlashX)
                return
            } else{
                // amountPro < số lượng item < 12
                if(indexFlash == 2 && indexFlash*amountPro > (flashLength - amountPro)) {
                    postionFlashX = 0
                    withFlash.style = `transform: translateX(${postionFlashX}px)`
                    btnFlashPrev.style.display = "none"
                    btnFlashNext.style.display = "flex"
                    indexFlash = 1
                    return
                }
                postionFlashX = postionFlashX + (withItemFlash*amountPro)
                withFlash.style = `transform: translateX(${postionFlashX}px)`
                if(postionFlashX === 0) {
                    btnFlashPrev.style.display = "none"
                }
                btnFlashNext.style.display = "flex"
            }
            indexFlash--
        }
        // console.log(indexFlash + ": " + postionFlashX)
    }
})

const amoutItem = $$('.grid__row-flash-item-amount-name')
let dem = 1;

amoutItem.forEach(amount => {
    const parentAmount = amount.closest(".grid__row-flash-item-amount");
    const value = Math.ceil(amount.innerText.split(" ")[2]/10)
    // console.log(parentAmount, value)
    if(parentAmount) {
        const classPercent = parentAmount.children[0].className.split(" ")[0]
        $(`.${classPercent}.dem-${dem}`).style = `width: ${value}%`
        // console.log($(`.${classPercent}.dem-${dem}`).style.width)
    }
    dem++
});