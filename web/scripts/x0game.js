x0game.game = ( function() {

  var dom = x0game.dom;
  var $ = dom.$;

  // hide the active screen (if any) and show the screen with the specified id
  function showScreen(screenId) {
    console.log("Show screen: " + screenId);
    var activeScreen = $("#game .screen.active")[0];
    var screen = $("#" + screenId)[0];

    if (activeScreen) {
      dom.removeClass(activeScreen, "active");
    }

    // run the screen module
    x0game.screens[screenId].run();

    // display the screen html
    dom.addClass(screen, "active");
  }

  // create background pattern
  function createBackground() {

    if (!Modernizr.canvas) {
      //console.log("canvas not supported");
      //return;
    }

    var canvas = document.createElement("canvas");
    var graph = canvas.getContext("2d");
    var background = $("#game .background")[0];
    var rect = background.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;

    graph.scale(rect.width, rect.height);

    var gradient = graph.createRadialGradient(
      0.25, 0.15, 0.5,
      0.25, 0.15, 1
    );

    gradient.addColorStop(0, "rgb(55, 65, 50)");
    gradient.addColorStop(1, "rgb(0, 0, 0)");
    graph.fillStyle = gradient;
    graph.fillRect(0, 0, 1, 1);

    //graph.strokeStyle = "rgba(255, 255, 255, 0.02)";
    graph.strokeStyle = "rgba(255, 100, 100, 0.2)";
    graph.lineWidth = 0.008;
    graph.beginPath();
    var i;
    for (i=0; i < 2; i+=0.02) {
      graph.moveTo(i, 0);
      graph.lineTo(i - 1, 1);
    }
    graph.stroke();

    background.appendChild(canvas);
  }

  function setup() {
    console.log("game setup")
    createBackground();
  }

  // expose public methods
  return {
    setup : setup,
    showScreen : showScreen
  };

}) ();
