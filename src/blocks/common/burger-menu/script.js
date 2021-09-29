const burgerMenuScript = (() => {
  // -------- Variables --------

  const viewportWidth =
    window.innerWidth
    || document.documentElement.clientWidth;

  const burgerBtn     = document.querySelectorAll('.burger-btn'),
        burgerMenu    = document.querySelector('.burger-menu'),
        burgerMenuBg  = document.querySelector('.burger-menu-bg'),
        btnClose      = document.querySelector('.btn-close');

  let flag = 1;



  // -------- Functions --------

  /* Burger menu */


  const initBurgerMenu = () => {
    const burgerEvent = () => {
      const closeBurgerMenu = () => {
        [].forEach.call(burgerBtn, btn =>
          btn.classList.remove('active')
        );

        burgerMenu.classList.remove('active');
        burgerMenu.classList.add('transition');
        burgerMenu.classList.add('hidden')
      }

      [].forEach.call(burgerBtn, btn => {
        btn.addEventListener('click', e => {
          btn.classList.toggle('active');
          burgerMenu.classList.toggle('active');

          if (burgerMenu.classList.contains('hidden')) {
            // show
            burgerMenu.classList.add('transition');
            burgerMenu.clientWidth;
            burgerMenu.classList.remove('hidden');
          } else {
            // hide
            burgerMenu.classList.add('transition');
            burgerMenu.classList.add('hidden');
          }
        })
      });

      if (document.querySelector('.burger-menu')) {
        if (document.querySelector('.burger-menu-bg'))
          burgerMenuBg.addEventListener('click', e => closeBurgerMenu());

        btnClose.addEventListener('click', e => closeBurgerMenu());

        burgerMenu.addEventListener('transitionend', () =>
          burgerMenu.classList.remove('transition')
        )
      }
    }

    burgerEvent();
  }



  // -------- Functions execution --------

  initBurgerMenu()
})();
