const headerScript = (() => {
  // -------- Variables --------

  const headerNav     = document.querySelector('.header-nav'),
        headerNavList = document.querySelector('.header-nav__list'),
        headerNavLink = document.querySelectorAll('.header-nav__link'),
        header        = document.querySelector('.header'),
        burgerMenu    = document.querySelector('.burger-menu__cont'),
        headerHeight  = header.clientHeight;

  let flag = 1;



  // -------- Functions --------

  /* Teleport onResize function */

  const headerTeleport = () => {
    const viewportWidth =
      window.innerWidth
      || document.documentElement.clientWidth;

    if ((viewportWidth < 993) && (flag === 1)) {
      flag = 0;
      appendElem(headerNavList, burgerMenu)
    }

    if ((viewportWidth > 993) && (flag === 0)) {
      flag = 1;
      appendElem(headerNavList, headerNav)
    }
  }


  // -------- Execution of functions --------

  headerTeleport();

  return {
    headerTeleport: headerTeleport
  }
})();
