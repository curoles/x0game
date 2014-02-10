x0game.screens["rules-screen"] = (function() {
    var firstRun = true;

    function setup() {
        var $ = x0game.dom.$,
            backButton = $("#rules-screen button.back")[0];

        x0game.dom.bind(backButton, "click", function() {
            x0game.showScreen("main-menu");
        });
    }

    function run() {
        if (firstRun) {
            setup();
            firstRun = false;
        }
        showRules();
    }

    
    function showRules() {
    }

    return {
        run : run
    };

})();

