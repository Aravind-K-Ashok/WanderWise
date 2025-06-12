// app.js

let nextButton   = document.getElementById('next');
let prevButton   = document.getElementById('prev');
let backButton   = document.getElementById('back');
let seeMoreButtons = document.querySelectorAll('.seeMore');
let carousel     = document.querySelector('.carousel');
let listHTML     = document.querySelector('.carousel .list');

nextButton.onclick = () => showSlider('next');
prevButton.onclick = () => showSlider('prev');

seeMoreButtons.forEach(btn => {
  btn.onclick = () => {
    carousel.classList.add('showDetail');
    backButton.style.opacity = '1';
    backButton.style.pointerEvents = 'auto';
  };
});

backButton.onclick = () => {
  carousel.classList.remove('showDetail');
  backButton.style.opacity = '0';
  backButton.style.pointerEvents = 'none';
};

let unAcceptClick;

function showSlider(type) {
  
  nextButton.style.pointerEvents = 'none';
  prevButton.style.pointerEvents = 'none';

  
  carousel.classList.remove('prev', 'next');

  let items = document.querySelectorAll('.carousel .list .item');

  if (type === 'next') {
   
    listHTML.appendChild(items[0]);
    void carousel.offsetWidth; 
    carousel.classList.add('next');
  } else {
    
    let lastIndex = items.length - 1;
    listHTML.prepend(items[lastIndex]);
    void carousel.offsetWidth; 
    carousel.classList.add('prev');
  }

  
  unAcceptClick = setTimeout(() => {
    nextButton.style.pointerEvents = 'auto';
    prevButton.style.pointerEvents = 'auto';
  }, 2000);
}
