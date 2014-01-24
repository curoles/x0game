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
