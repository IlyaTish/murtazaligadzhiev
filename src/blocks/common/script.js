// -------- Variables --------

const viewportWidth = window.innerWidth || document.documentElement.clientWidth;



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



const initAccordeon = () => {
  [].forEach.call(document.querySelectorAll('.item'), item => {
    const head    = item.querySelector('.head'),
          content = item.querySelector('.content');

    head.addEventListener('click', e => {
      const collection = e.path;

      e.preventDefault();

      collection.forEach(e => {
        if (e === item) item.classList.add('active')
      });

      const animateHeight = (e, val_1, val_2, timeout) => {
        content.setAttribute('style', `height:${val_1}px`);

        e.stopPropagation();

        if (timeout) {
          setTimeout(() => {
            content.setAttribute('style', `height:${val_2}px`);
            content.addEventListener('transitionend', () =>
              content.removeAttribute('style')
            )
          })
        } else {
          content.setAttribute('style', `height:${content.offsetHeight}px`);
          setTimeout(() =>
            content.setAttribute('style', `height:${val_2}px`)
          )
        }
      }

      if (content.classList.contains('collapsed')) {
        // show

        content.classList.add('transition');

        window.getComputedStyle(content).width;

        content.classList.remove('hidden');
        content.classList.remove('collapsed');

        const contentHeight = content.offsetHeight;

        animateHeight(e, 0, contentHeight, true)
      }

      else {
        // hide

        const contentHeight = content.offsetHeight;

        animateHeight(e, contentHeight, 0)

        content.removeAttribute('style');

        content.classList.add('transition');
        content.classList.add('hidden');
        content.classList.add('collapsed');

        item.classList.remove('active');
      }
    });

    content.addEventListener('transitionend', () =>
      content.classList.remove('transition')
    )
  })
}



// -------- Functions execution --------

initAccordeon();
