// -------- Variables --------

const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

const burgerBtn     = document.querySelectorAll('.burger-btn'),
      burgerMenu    = document.querySelector('.burger-menu');



// -------- Functions --------

/* Document ready function */

const ready = callback => {
  if (document.readyState !== 'loading') callback();
  else document.addEventListener('DOMContentLoaded', callback)
}



/* Teleport functions */

const appendElem = (elem, cont) => {
  if (cont) cont.appendChild(elem)
}

const teleportEach = (elements, conts) => {
  const containers = conts.map(cont => document.querySelector(cont));

  const elems = elements.forEach((item, itemIndex) => {
    const $item = document.querySelector(item);

    containers[itemIndex].appendChild($item)
  })
}



/* Smooth scroll to anchor */

const links = document.querySelectorAll('.header-nav__list a');

const clickHandler = e => {
  e.preventDefault();

  const href      = e.currentTarget.getAttribute('href'),
        offsetTop = document.querySelector(href).offsetTop - 60;

  window.scrollTo({
    top: offsetTop,
    behavior: 'smooth'
  });

  setTimeout(() => {
    burgerMenu.classList.remove('transition')
  }, 10)
}

links.forEach(link => link.addEventListener('click', clickHandler));



/* Lazyload */

const lazyLoadInstance = new LazyLoad({
  threshold: 700,
});



// -------- Functions execution --------
