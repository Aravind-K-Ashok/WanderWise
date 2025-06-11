// ===== app2.js =====

// 1) SELECT YOUR DOM NODES
// ─────────────────────────────────────────────────────────────────────────────
let nextDom      = document.getElementById('next');
let prevDom      = document.getElementById('prev');
let carouselDom  = document.querySelector('.carousel');
let SliderDom    = carouselDom ? carouselDom.querySelector('.list') : null;
let thumbnailDom = carouselDom ? carouselDom.querySelector('.thumbnail') : null;
let timeDom      = carouselDom ? carouselDom.querySelector('.time') : null;

// 2) SANITY CHECK
// ─────────────────────────────────────────────────────────────────────────────
if (!nextDom)      console.error("`#next` button not found.");
if (!prevDom)      console.error("`#prev` button not found.");
if (!carouselDom)  console.error("`.carousel` container not found.");
if (!SliderDom)    console.error("`.carousel .list` not found.");
if (!thumbnailDom) console.error("`.carousel .thumbnail` not found.");
if (!timeDom)      console.error("`.carousel .time` not found.");

if (!nextDom || !prevDom || !carouselDom || !SliderDom || !thumbnailDom || !timeDom) {
  throw new Error("app2.js → Missing one or more required elements. Check your HTML selectors.");
}


// 3) TIMING CONSTANTS (must match your CSS “runningTime 7s”)
// ─────────────────────────────────────────────────────────────────────────────
let timeAutoNext = 7000;   // 7 s per slide
let timeRunning  = timeAutoNext;  // keep bar animating the full 7 s


// 4) MOVE THE FIRST THUMBNAIL TO THE END (initial alignment)
// ─────────────────────────────────────────────────────────────────────────────
(() => {
  let thumbs = thumbnailDom.querySelectorAll('.item');
  if (thumbs.length) {
    thumbnailDom.appendChild(thumbs[0]);
  }
})();


// 5) HELPERS FOR THE PROGRESS BAR + AUTO-ADVANCE
// ─────────────────────────────────────────────────────────────────────────────
// We want “bar” to animate for timeRunning ms, then automatically trigger “Next.”

let runTimeOut;    // will clear() the timeout that removes .next/.prev
let runNextAuto;   // will clear() the timeout that calls nextDom.click()

function startBarAndScheduleNext(direction) {
  // 5a) REMOVE any existing .next or .prev so CSS animation can restart
  carouselDom.classList.remove('next', 'prev');
  // Force a reflow so that removing above class takes effect immediately
  void carouselDom.offsetWidth;

  // 5b) ADD the correct class for THIS slide
  //     (this both triggers slide-out/slide-in CSS *and* the .time animation)
  carouselDom.classList.add(direction);

  // 5c) After timeRunning ms, remove that class so it can be re-applied next time
  clearTimeout(runTimeOut);
  runTimeOut = setTimeout(() => {
    carouselDom.classList.remove('next', 'prev');
  }, timeRunning);

  // 5d) Schedule auto-advance after timeAutoNext ms
  clearTimeout(runNextAuto);
  runNextAuto = setTimeout(() => {
    nextDom.click();
  }, timeAutoNext);
}


// 6) THE showSlider FUNCTION (for both manual clicks and auto-advance)
// ─────────────────────────────────────────────────────────────────────────────
function showSlider(direction) {
  // (a) Get up-to-date lists of slides + thumbnails
  let slides = SliderDom.querySelectorAll('.item');
  let thumbs = thumbnailDom.querySelectorAll('.item');

  if (slides.length === 0 || thumbs.length === 0) {
    console.warn("showSlider() → No `.item` under `.list` or `.thumbnail`.");
    return;
  }

  // (b) Move the DOM nodes
  if (direction === 'next') {
    SliderDom.appendChild(slides[0]);
    thumbnailDom.appendChild(thumbs[0]);
  } else {
    SliderDom.prepend(slides[slides.length - 1]);
    thumbnailDom.prepend(thumbs[thumbs.length - 1]);
  }

  // (c) Start the bar + CSS animations for this new slide
  startBarAndScheduleNext(direction);
}


// 7) WIRE UP CLICK HANDLERS
// ─────────────────────────────────────────────────────────────────────────────
nextDom.addEventListener('click', () => showSlider('next'));
prevDom.addEventListener('click', () => showSlider('prev'));


// 8) ON PAGE LOAD: kick off the “first slide” animation exactly the same way
// ─────────────────────────────────────────────────────────────────────────────
// We use “next” here purely to trigger the bar. We are *not* shifting slides yet.
/*window.addEventListener('DOMContentLoaded', () => {
  startBarAndScheduleNext('next');

  // Add SEE MORE button logic
  const seeMoreButtons = document.querySelectorAll('.carousel .buttons button');
  seeMoreButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      alert('See more coming soon!'); // Replace with modal or navigation as needed
    });
  });
});*/
