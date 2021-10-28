
const slider = $('.slider') //khung hiển thị
const slides = $('.slides') //khung chứa tổng item
const slidesItem = $$('.slide-item')  //list item 
const slideshow = $('.slide-item-link')
const prevBtn = $('.click-prev')
const nextBtn = $('.click-next')
const dotItem = $$('.slides-dot-item')
const slidesItemWidth = slidesItem[0].offsetWidth;
const slidesLength = slidesItem.length;


let index = 0;
let postionX = 0;

setInterval(function() {
    handleChangeSlide(1)
}, 3000);

nextBtn.addEventListener('click', function(){
    console.log("yes")
    handleChangeSlide(1)
})

prevBtn.addEventListener('click', function(){
    handleChangeSlide(-1)
})

dotItem.forEach( (item) => item.addEventListener("click", function(e) {
    dotItem.forEach(element => element.classList.remove('active'))
    e.target.classList.add('active')
    const slideIndex = parseInt(e.target.dataset.index);
    index = slideIndex;
    postionX = -1 * index * slidesItemWidth;
    slides.style = `transform: translateX(${postionX}px)`;
}));

function handleChangeSlide(direction) {
    if(direction === 1) {
        index++;
        postionX = postionX - slidesItemWidth;
        slides.style = `transform: translateX(${postionX}px)`;

        if(index > slidesItem.length-1) {
            index = 0;
            postionX = 0;
            slides.style = `transform: translateX(${postionX}px)`;
            dotItem.forEach(element => element.classList.remove('active'))
            dotItem[index].classList.add('active')
            return;
        }
    } else if(direction === -1) {
        index--;
        postionX = postionX + slidesItemWidth;
        slides.style = `transform: translateX(${postionX}px)`;

        if(index < 0) {
            index = slidesItem.length-1;
            postionX = -1 * index * slidesItemWidth;
            slides.style = `transform: translateX(${postionX}px)`;
            dotItem.forEach(element => element.classList.remove('active'))
            dotItem[index].classList.add('active')
            return;
        }
    }
    dotItem.forEach(element => element.classList.remove('active'))
    dotItem[index].classList.add('active')
}



$('.slide-show').addEventListener("mouseover", function() {
    $('.click-prev').style.display = "flex";
    $('.click-next').style.display = "flex";
});

$('.slide-show').addEventListener("mouseout", function() {
    $('.click-prev').style.display = "none";
    $('.click-next').style.display = "none";
});
