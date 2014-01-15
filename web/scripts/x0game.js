x0game.game = ( function() {

  var dom = x0game.dom;
  var $ = dom.$;

  // hide the active screen (if any) and show the screen with the specified id
  function showScreen(screenId) {
    console.log("Show screen: " + screenId);
    var activeScreen = $("#game .screen.active")[0];
    var screen = $("#" + screenId)[0];

    if (activeScreen) {
      dom.removeClass(screen/*activeScreen FIXME*/, "active");
    }

    dom.addClass(screen, "active");
  }

  // expose public methods
  return {
    showScreen : showScreen
  };

}) ();
