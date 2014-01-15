x0game.dom = ( function () {

  var $ = Sizzle;

  function hasClass(el, clsName) {
    var regex = new RegExp("(^|\\s)" + clsName + "(\\s|$)");
    return regex.test(el.className);
  }

  function removeClass(el, clsName) {
    console.log("Remove class " + clsName + " from " + el.className);

    var regex = new RegExp("(^|\\s)" + clsName + "(\\s|$)");
    el.className = el.className.replace(regex, " ");
  }

  function addClass(el, clsName) {
    console.log("Add class " + clsName + " to " + el.className);

    if (!hasClass(el, clsName)) {
      el.className += " " + clsName;
    }
  }

  return {
    $ : $,
    hasClass : hasClass,
    addClass : addClass,
    removeClass : removeClass
  };

}) ();
