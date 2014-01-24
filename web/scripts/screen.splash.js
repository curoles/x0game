
x0game.screens["splash-screen"] = (function() {

  var first_run = true;

  function checkProgress() {
    var $ = x0game.dom.$,
        p = x0game.getLoadProgress() * 100;

    $("#splash-screen .indicator")[0].style.width = p + "%";

    if (p == 100) {
      setup();
    } else {
      setTimeout(checkProgress, 30);
    }
  }

  function setup() {
    console.log("splash-screen setup");

    var dom = x0game.dom,
      $ = dom.$,
      screen = $("#splash-screen")[0];

    $(".continue",screen)[0].style.display = "block";

    dom.bind(screen, "click", function() {
      x0game.showScreen("main-menu");
    });

    dom.bind("#splash-screen", "click", function() {
      x0game.showScreen("main-menu");
    });
  }

  function run() {
    if (first_run) {
      checkProgress();
      first_run = false;
    }
  }

  return {
    run : run
  };

}) ();
