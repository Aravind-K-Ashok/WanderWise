
let nextDom      = document.getElementById('next');
let prevDom      = document.getElementById('prev');
let carouselDom  = document.querySelector('.carousel');
let SliderDom    = carouselDom ? carouselDom.querySelector('.list') : null;
let thumbnailDom = carouselDom ? carouselDom.querySelector('.thumbnail') : null;
let timeDom      = carouselDom ? carouselDom.querySelector('.time') : null;

if (!nextDom)      console.error("`#next` button not found.");
if (!prevDom)      console.error("`#prev` button not found.");
if (!carouselDom)  console.error("`.carousel` container not found.");
if (!SliderDom)    console.error("`.carousel .list` not found.");
if (!thumbnailDom) console.error("`.carousel .thumbnail` not found.");
if (!timeDom)      console.error("`.carousel .time` not found.");

if (!nextDom || !prevDom || !carouselDom || !SliderDom || !thumbnailDom || !timeDom) {
  throw new Error("app2.js → Missing one or more required elements. Check your HTML selectors.");
}


let timeAutoNext = 7000;   
let timeRunning  = timeAutoNext;  


(() => {
  let thumbs = thumbnailDom.querySelectorAll('.item');
  if (thumbs.length) {
    thumbnailDom.appendChild(thumbs[0]);
  }
})();




let runTimeOut;   
let runNextAuto;   

function startBarAndScheduleNext(direction) {
  
  carouselDom.classList.remove('next', 'prev');
  
  void carouselDom.offsetWidth;

  
  carouselDom.classList.add(direction);

 
  clearTimeout(runTimeOut);
  runTimeOut = setTimeout(() => {
    carouselDom.classList.remove('next', 'prev');
  }, timeRunning);


  clearTimeout(runNextAuto);
  runNextAuto = setTimeout(() => {
    nextDom.click();
  }, timeAutoNext);
}


function showSlider(direction) {

  let slides = SliderDom.querySelectorAll('.item');
  let thumbs = thumbnailDom.querySelectorAll('.item');

  if (slides.length === 0 || thumbs.length === 0) {
    console.warn("showSlider() → No `.item` under `.list` or `.thumbnail`.");
    return;
  }

  
  if (direction === 'next') {
    SliderDom.appendChild(slides[0]);
    thumbnailDom.appendChild(thumbs[0]);
  } else {
    SliderDom.prepend(slides[slides.length - 1]);
    thumbnailDom.prepend(thumbs[thumbs.length - 1]);
  }


  startBarAndScheduleNext(direction);
}



nextDom.addEventListener('click', () => showSlider('next'));
prevDom.addEventListener('click', () => showSlider('prev'));



