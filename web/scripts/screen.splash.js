
x0game.screens["splash-screen"] = (function() {

  var game = x0game;
  var dom = x0game.dom;
  var first_run = true;

  function setup() {
    console.log("splash-screen setup");
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
