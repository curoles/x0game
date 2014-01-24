
x0game.screens["main-menu"] = (function() {

  var game = x0game;
  var dom = x0game.dom;
  var first_run = true;

  function setup() {
    dom.bind("#main-menu ul.menu", "click", function(e) {
      if (e.target.nodeName.toLowerCase() === "button") {
        var action = e.target.getAttribute("name");
        game.showScreen(action);
      }
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
