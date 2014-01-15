var x0game = {};

// wait untill main document is loaded
window.addEventListener("load", function() {

// start dynamic loading
Modernizr.load([
{
  // these files are always loaded
  load : [
    "scripts/sizzle.js",
    "scripts/dom.js",
    "scripts/x0game.js",
  ],
  // called when all files have finished loading and executing
  complete : function() {
    console.log("All scripts loaded.");
    // show the first screen
    x0game.game.showScreen("splash-screen");
  }
}
]);

}, false);
