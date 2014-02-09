x0game.screens["about-screen"] = (function() {
    var firstRun = true;

    function setup() {
        var $ = x0game.dom.$,
            backButton = $("#about-screen button.back")[0];

        x0game.dom.bind(backButton, "click", function() {
            x0game.showScreen("main-menu");
        });
    }

    function run() {
        if (firstRun) {
            setup();
            firstRun = false;
        }
        showAbout();
    }

    
    function showAbout() {
    }

    return {
        run : run
    };

})();

x0game.screens["exit-screen"] = (function() {
    var firstRun = true;

    function setup() {
    }

    function run() {
        if (firstRun) {
            setup();
            firstRun = false;
        }
        alert("Exit!? Goodbye!");
        window.close();
    }

    return {
        run : run
    };

})();
