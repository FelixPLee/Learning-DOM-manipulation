'use strict';

const header = document.querySelector('.header');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')
const nav =  document.querySelector('.nav')
const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')

///////////////////////////////////////
// Modal window


const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});



///////////////////////////////////////
// Page navegarion

btnScrollTo.addEventListener('click', function(e) {
  const s1coords = section1.getBoundingClientRect()
  console.log(e.target.getBoundingClientRect())
  
  //valores de scroll do topo e da lateral 
  // console.log(window. scrollX, scrollY)
  // console.log(document.documentElement.clientHeight)
  // console.log(document.documentElement.clientWidth)
  // console.log(s1coords.left)
  // console.log(s1coords.top)
  // window.scrollTo({
    //   left: s1coords.left + window.scrollX,
    //   top: s1coords.top + scrollY,
    //   behavior: 'smooth'
    // })
    section1.scrollIntoView({behavior: 'smooth'})
  })
  
  //document.querySelectorAll('.nav__link').forEach(function(el) {
    //  el.addEventListener('click', function(e) {
      //    e.preventDefault()
      //    const id = this.getAttribute('href')
      //    console.log(id)
      //    document.querySelector(id).scrollIntoView({behavior: 'smooth'})
      //  })
      //})
      
      // 1. add event listener to comon parent element
      // 2. Dertemine what element originated the event
      
      document.querySelector('.nav__links').addEventListener('click', function(e) {
        e.preventDefault()
        if(e.target.classList.contains('nav__link')) {
          const id = e.target.getAttribute('href')
          console.log(id)
          document.querySelector(id).scrollIntoView({behavior: 'smooth'})   
        }
      })
      
      
      tabsContainer.addEventListener('click', function(e) {
        const clicked = e.target.closest('.operations__tab')
        if(!clicked) return;
        
        tabs.forEach(t => t.classList.remove('operations__tab--active'))
        tabsContent.forEach(c => c.classList.remove('operations__content--active'))
        
        //Activate tab
        clicked.classList.add('operations__tab--active')
        
        //Activate content area
        document.querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add('operations__content--active')
      })
      
      // menu fade
      const handleHover = function (e) {
        if(e.target.classList.contains('nav__link')) {
          const link = e.target
          const siblings = link.closest('.nav').querySelectorAll('.nav__link')
          const logo = link.closest('.nav').querySelector('img')
          
          siblings.forEach(el => {
      if(el !== link) el.style.opacity = this
    })
    logo.style.opacity = this
  }
}

// passing 'argument' into handler
nav.addEventListener('mouseover', handleHover.bind(0.5))
nav.addEventListener('mouseout', handleHover.bind(1))

//Stity nav
const navHeight =nav.getBoundingClientRect().height

const stickyNav = function (entries) {
  const [entry] = entries
  if (!entry.isIntersecting) nav.classList.add('sticky')
    else nav.classList.remove('sticky')
}

const headerObserver = new IntersectionObserver
(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
})

headerObserver.observe(header)

//Reveal Sections
const allSections = document.querySelectorAll('.section')
const revealSection = function(entries, observer) {
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden')
    observer.unobserve(entry.target)
  })
}

const sectionObserver = new IntersectionObserver
(revealSection, {
  root: null,
  threshold: 0.15
})
allSections.forEach(function (section) {
  sectionObserver.observe(section)
  section.classList.add('section--hidden')
})

//Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]')
console.log(imgTargets)

const loadImg = function(entries, observer) {
  const [entry] = entries
  console.log(entry)
  if(!entry.isIntersecting) return
  
  //replace src with data-src
  entry.target.src = entry.target.dataset.src
  entry.target.addEventListener('load', function() {})
  entry.target.classList.remove('lazy-img')
  observer.unobserve(entry.target)
}

const imgObserver = new IntersectionObserver
(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px'
})

imgTargets.forEach(img => imgObserver.observe(img))

//Slider
const slides = document.querySelectorAll('.slide')
const slider = document.querySelector('.slider')
const btnRight = document.querySelector('.slider__btn--right')
const btnLeft = document.querySelector('.slider__btn--left')

slider.style.overflow = 'visible(0.5)'

let curSlide = 0
const maxSlide = slides.length

const goToSlide = function(slide) {
  slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`)
}
goToSlide(0)

const nextSlide = function() {
  if (curSlide === maxSlide -1) curSlide = 0
  else curSlide++ 
  goToSlide(curSlide)
}
const prevSlide = function(){ 
  if (curSlide === 0) curSlide = maxSlide -1
  else curSlide--
  goToSlide(curSlide)
}
btnRight.addEventListener('click', nextSlide)
btnLeft.addEventListener('click', prevSlide)
// const initialCoords = section1.getBoundingClientRect()

// window.addEventListener('scroll', function () {
//   if(this.window.scrollY > initialCoords.top) nav.
//   classList.add('sticky')
//   else nav.classList.remove('sticky')
// })

////////////////////////////////////////////
/////////////////Aprendendo/////////////////
////////////////////////////////////////////

//-------------Cookies
//const message = document.createElement('div')
//message.classList.add('cookie-message')
//message.textContent = 'We use cookies for improved functionality and analytics.'
//message.innerHTML = 'We use cookies for improved functionality and analytics.<button class="btn btn--close-cookie">Got it</button>'
//header.prepend(message)
//header.append(message)
//cloning
//header.append(message.cloneNode(true))
//header.before(message)
//document.querySelector('.btn--close-cookie').addEventListener('click', function() {
//  message.remove()
//-------------------

//console.log(document.documentElement)
//'console.log(document)'


//const allSections = document.querySelectorAll('.selection')
//console.log(allSections)

//document.getElementById('section--1')
//const allButtons = document.getElementsByTagName('button')
//console.log(allButtons)

//console.log(document.getElementsByClassName('btn'))

//Creating and inserting elements
// . insertAdjacentHTML

//})

//Styles

//message.style.backgroundColor = '#37383d'
//message.style.width = '120%'

//console.log(message.style.backgroundColor) won't work
// console.log(message.style.backgroundColor)
// console.log(getComputedStyle(message).color)
// console.log(getComputedStyle(message).height)
// message.style.height = Number.parseFloat(getComputedStyle(message).height) + 40 + 'px'

//access the styles and can modify them
//document.documentElement.style.setProperty('--color-primary', 'orangered')

//Attributes

//only reads expected classes 
// const logo = document.querySelector('.nav__logo')
// console.log(logo.alt)
// console.log(logo.getAttribute('src'))
// console.log(logo.src)
// console.log(logo.className)

// logo.alt = 'Logo minimalsita'
// // non-standard
// console.log(logo.designer)
// console.log(logo.getAttribute('designer'))
// logo.setAttribute('company', 'Bankist')

// const link = document.querySelector('.nav__link--btn')
// console.log(link.href)
// console.log(link.getAttribute('href'))



// //data Atributes
// console.log(logo.dataset.verionNumber)

//Classes
//logo.classList.add()
//remove toggle contains
//Don't use. Will ovewrite 
//logo.className = 'Felix'



// testing event bubbling 
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min +1) + min)
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0,255)},${randomInt(0,255)})`

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   console.log('Link', e.target, e.currentTarget)
//   this.style.backgroundColor = randomColor()
//   console.log(this === e.currentTarget)

//   //Stop propagation
//   //e.stopPropagation()
// })

// document.querySelector('.nav__links').addEventListener('click', function (e) {console.log('Container')
//   this.style.backgroundColor = randomColor()  
// })

// document.querySelector('.nav').addEventListener('click', function (e) {console.log('NAV')
//   this.style.backgroundColor = randomColor()  
//   //executing in the first fase
// },false)

///////////Intersection Observer API
// const obsCallback = function(entries, observer) {
//   entries.forEach(entry => {console.log(entry)})
// }

// const obsOptions = {
//   root: null,
//   threshold: 0.4
// }

// const observer = new IntersectionObserver
// (obsCallback, obsOptions)
// observer.observe(section1)