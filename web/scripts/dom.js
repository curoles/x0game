x0game.dom = ( function () {

  function $(path, parent) {
    parent = parent || document;
    return parent.querySelectorAll(path);
  }

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

  function bind(element, event, handler) {
    console.log("Bind element " + element + " and event " + event);
    if (typeof element == "string") {
      element = $(element)[0];
    }
    element.addEventListener(event, handler, false);
  }

  return {
    $ : $,
    hasClass : hasClass,
    addClass : addClass,
    removeClass : removeClass,
    bind : bind
  };

}) ();
