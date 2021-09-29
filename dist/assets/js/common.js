//= require common/script.js


// -------- Execution of functions --------

ready(() => {
  // -------- Exports --------

  //= require common/burger-menu/script.js
  //= require common/header/script.js

  window.onresize = () => {
    headerScript.headerTeleport()
  }
})
