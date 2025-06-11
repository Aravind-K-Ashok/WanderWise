// app.js

let nextButton   = document.getElementById('next');
let prevButton   = document.getElementById('prev');
let backButton   = document.getElementById('back');
let seeMoreButtons = document.querySelectorAll('.seeMore');
let carousel     = document.querySelector('.carousel');
let listHTML     = document.querySelector('.carousel .list');

nextButton.onclick = () => showSlider('next');
prevButton.onclick = () => showSlider('prev');

// Re-add “See More” listeners so clicking it adds .showDetail
seeMoreButtons.forEach(btn => {
  btn.onclick = () => {
    carousel.classList.add('showDetail');
    backButton.style.opacity = '1';
    backButton.style.pointerEvents = 'auto';
  };
});

// “Go Back” should remove .showDetail
backButton.onclick = () => {
  carousel.classList.remove('showDetail');
  backButton.style.opacity = '0';
  backButton.style.pointerEvents = 'none';
};

let unAcceptClick;

function showSlider(type) {
  // disable buttons immediately
  nextButton.style.pointerEvents = 'none';
  prevButton.style.pointerEvents = 'none';

  // clear any old “prev”/“next” class
  carousel.classList.remove('prev', 'next');

  let items = document.querySelectorAll('.carousel .list .item');

  if (type === 'next') {
    // move first item to end
    listHTML.appendChild(items[0]);
    void carousel.offsetWidth; // force reflow
    carousel.classList.add('next');
  } else {
    // move last item to front
    let lastIndex = items.length - 1;
    listHTML.prepend(items[lastIndex]);
    void carousel.offsetWidth; // force reflow
    carousel.classList.add('prev');
  }

  // re-enable buttons after 2s (match your CSS durations)
  unAcceptClick = setTimeout(() => {
    nextButton.style.pointerEvents = 'auto';
    prevButton.style.pointerEvents = 'auto';
  }, 2000);
}
