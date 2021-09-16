const headerScript = (() => {
  // -------- Variables --------

  const headerNav     = document.querySelector('.header-nav'),
        headerNavList = document.querySelector('.header-nav__list'),
        headerNavLink = document.querySelectorAll('.header-nav__link'),
        header        = document.querySelector('.header'),
        headerHeight  = header.clientHeight,

        targets       = document.querySelector('.header'),
        searchArea    = header.querySelector('.search-area'),
        search        = header.querySelector('.search'),
        btnClose      = header.querySelector('.search-area__btn-close');

  let flag = 1;



  // -------- Functions --------

  /* Teleport onResize function */

  const headerTeleport = () => {
    const viewportWidth =
      window.innerWidth
      || document.documentElement.clientWidth;

    if ((viewportWidth < 991) && (flag === 1)) {
      flag = 0;
      appendElem(headerNavList, burgerMenu)
    }

    if ((viewportWidth > 991) && (flag === 0)) {
      flag = 1;
      appendElem(headerNavList, headerNav)
    }
  }

  /* Search btn animation */

  const initSearchAnimation = () => {
    search.addEventListener('click', () => {
      searchArea.classList.add('active')
    });

    btnClose.addEventListener('click', () =>
      searchArea.classList.remove('active')
    );
  }



  // -------- Execution of functions --------

  initSearchAnimation();

  return {
    headerTeleport: headerTeleport
  }
})();
