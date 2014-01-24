var x0game = (function() {


    // Create an object with functions that mimic the window.console object made  
    // available by tools like Firebug or the "Dev Tools" add-on in IE8+  
    x0game_dummyConsole = {  
        assert : function(){},  
        log    : function(){},  
        warn   : function(){},  
        error  : function(){},  
        debug  : function(){},  
        dir    : function(){},  
        info   : function(){}  
    };
     
    if (window.console == undefined) {  
        window.console = x0game_dummyConsole;  
    }

    var scriptQueue = [],
        numResourcesLoaded = 0,
        numResources = 0,
        executeRunning = false;

    function executeScriptQueue() {
        var next = scriptQueue[0],
            first, script;
        if (next && next.loaded) {
            console.log("next in script queue is " + next.src);

            executeRunning = true;
            // remove the first element in the queue
            scriptQueue.shift();
            first = document.getElementsByTagName("script")[0];
            script = document.createElement("script");
            script.onload = function() {
                if (next.callback) {
                    next.callback();
                }
                // try to execute more scripts
                executeScriptQueue();
            };
            script.src = next.src;
            first.parentNode.insertBefore(script, first);
        } else {
            executeRunning = false;
        }
    }


    function load(src, callback) {
        console.log("x0game.load src=" + src);

        var image, queueEntry;
        numResources++;

        // add this resource to the execution queue
        queueEntry = {
            src: src,
            callback: callback,
            loaded: false
        };
        scriptQueue.push(queueEntry);

        image = new Image();
        image.onload = image.onerror = function() {
            numResourcesLoaded++;
            queueEntry.loaded = true;
            if (!executeRunning) {
                executeScriptQueue();
            }
        };
        image.src = src;
    }
    
    // hide the active screen (if any) and show the screen
    // with the specified id
    function showScreen(screenId) {
        console.log("Show screen: " + screenId);

        var dom = x0game.dom,
            $ = dom.$,
            activeScreen = $("#game .screen.active")[0],
            screen = $("#" + screenId)[0];

        if (!x0game.screens[screenId]) {
            alert("This module is not implemented yet!");
            return;
        }

        if (activeScreen) {
            dom.removeClass(activeScreen, "active");
        }

        dom.addClass(screen, "active");

        // run the screen module
        x0game.screens[screenId].run();
    }

    function isStandalone() {
        return (window.navigator.standalone !== false);
    }

    function setup() {
        console.log("x0game.setup");

        // hide the address bar on Android devices
        if (/Android/.test(navigator.userAgent)) {
            x0game.dom.$("html")[0].style.height = "200%";
            setTimeout(function() {
                window.scrollTo(0, 1);
            }, 0);
        }

        // disable native touchmove behavior to 
        // prevent overscroll
        x0game.dom.bind(document, "touchmove", function(event) {
            event.preventDefault();
        });

        if (isStandalone()) {
            showScreen("splash-screen");
        } else {
            showScreen("install-screen");
        }

        createBackground();
    }


  // create background pattern
  function createBackground() {
    var dom = x0game.dom, $ = dom.$;

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

    return {
        isStandalone: isStandalone,
        load: load,
        setup: setup,
        showScreen : showScreen,
        screens: {}
    };
})();
