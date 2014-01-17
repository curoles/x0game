
x0game.screens["splash-screen"] = (function() {

  var game = x0game.game;
  var dom = x0game.dom;
  var first_run = true;

  function setup() {
    dom.bind("#splash-screen", "click", function() {
      game.showScreen("main-menu");
    });
  }

  function run() {
    if (first_run) {
      setup();
      first_run = false;
    }
  }

  return {
    run : run
  };

}) ();
