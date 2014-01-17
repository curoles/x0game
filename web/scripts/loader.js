var x0game = {

  screens : {} // namespace
};

// Create an object with functions that mimic the window.console object made  
// available by tools like Firebug or the "Dev Tools" add-on in IE8+  
x0game.dummyConsole = {  
  assert : function(){},  
  log    : function(){},  
  warn   : function(){},  
  error  : function(){},  
  debug  : function(){},  
  dir    : function(){},  
  info   : function(){}  
};
 
if (window.console == undefined) {  
  window.console = x0game.dummyConsole;  
}

 
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
    "scripts/screen.splash.js",
    "scripts/screen.main-menu.js"
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
