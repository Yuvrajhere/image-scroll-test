const letsSnap = () => {

    console.log(window.$)
    // VARIABLES
var counter = 1;
var scrollDirection: any;
var slides = window.$("#main div");
var slidesLength = slides.length;
var inTransition = false;

// SCROLL DISTANCES
function scrollAnimate(distance:any) {
  inTransition = true;
  window.$("#main").css("transform", "translate3d(0," + distance + "%,0)");
  setTimeout(function () {
    inTransition = false;
  }, 1300);
}

// SCROLL ANIMATIONS AND LOGIC
function scrollLogic() {
  //---------------- DOWN TRANSITIONS ----------------------------
  // SLIDE 1 --> SLIDE 2
  if (counter == 1 && scrollDirection == "down") {
    scrollAnimate(-20);
  }

  // SLIDE 2 --> SLIDE 3
  else if (counter == 2 && scrollDirection == "down") {
    scrollAnimate(-40);
  }

  // SLIDE 3 --> SLIDE 4
  else if (counter == 3 && scrollDirection == "down") {
    scrollAnimate(-60);
  }

  // SLIDE 3 --> SLIDE 4
  else if (counter == 4 && scrollDirection == "down") {
    scrollAnimate(-80);
  }

  //---------------- UP TRANSITIONS ----------------------------
  // SLIDE 5 --> SLIDE 4
  else if (counter == 5 && scrollDirection == "up") {
    scrollAnimate(-60);
  }

  // SLIDE 4 --> SLIDE 3
  else if (counter == 4 && scrollDirection == "up") {
    scrollAnimate(-40);
  }

  // SLIDE 3 --> SLIDE 2
  else if (counter == 3 && scrollDirection == "up") {
    scrollAnimate(-20);
  }

  // SLIDE 2 --> SLIDE 1
  else if (counter == 2 && scrollDirection == "up") {
    scrollAnimate(0);
  } else {
    inTransition = false;
  }

  //---------------- UPDATE COUNTER ----------------------------
  if (scrollDirection == "down" && counter < slidesLength) {
    counter++;
  } else if (scrollDirection == "up" && counter > 1) {
    counter--;
  }
}

// creates a global "addWheelListener" method
(function (window, document) {
  var prefix = "",
    _addEventListener,
    onwheel,
    support;

  // detect event model
  if (window.addEventListener) {
    _addEventListener = "addEventListener";
  } else {
    _addEventListener = "attachEvent";
    prefix = "on";
  }

  // detect available wheel event
  support =
    "onwheel" in document.createElement("div")
      ? "wheel" // Modern browsers support "wheel"
      : document.onmousewheel !== undefined
      ? "mousewheel" // Webkit and IE support at least "mousewheel"
      : "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

  window.addWheelListener = function (elem, callback, useCapture) {
    _addWheelListener(elem, support, callback, useCapture);

    // handle MozMousePixelScroll in older Firefox
    if (support == "DOMMouseScroll") {
      _addWheelListener(elem, "MozMousePixelScroll", callback, useCapture);
    }
  };

  function _addWheelListener(elem, eventName, callback, useCapture):any {
    elem[_addEventListener](
      prefix + eventName,
      support == "wheel"
        ? callback
        : function (originalEvent) {
            !originalEvent && (originalEvent = window.event);

            // create a normalized event object
            var event = {
              // keep a ref to the original event object
              originalEvent: originalEvent,
              target: originalEvent.target || originalEvent.srcElement,
              type: "wheel",
              deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
              deltaX: 0,
              delatZ: 0,
              preventDefault: function () {
                originalEvent.preventDefault
                  ? originalEvent.preventDefault()
                  : (originalEvent.returnValue = false);
              }
            };

            // calculate deltaY (and deltaX) according to the event
            if (support == "mousewheel") {
              event.deltaY = (-1 / 40) * originalEvent.wheelDelta;
              // Webkit also support wheelDeltaX
              originalEvent.wheelDeltaX &&
                (event.deltaX = (-1 / 40) * originalEvent.wheelDeltaX);
            } else {
              event.deltaY = originalEvent.detail;
            }

            // it's time to fire the callback
            return callback(event);
          },
      useCapture || false
    );
  }
})(window, document);

// LISTEN FOR WHEEL SCROLL
addWheelListener(document.body, function (e) {
  if (inTransition) {
    return;
  }

  // DETERMINE WHEEL scrollDirection
  if (e.deltaY > 0) {
    scrollDirection = "down";
  } else if (e.deltaY < 0) {
    scrollDirection = "up";
  }

  scrollLogic();
});

// KeyStroke Support
window.$(window).keydown(function (e) {
  if (e.keyCode == 38) {
    scrollDirection = "up";
  } else if (e.keyCode == 40) {
    scrollDirection = "down";
  } else if (e.keyCode == 39) {
    scrollDirection = "down";
  } else if ((e.keyCode = 37)) {
    scrollDirection = "up";
  } else {
    return;
  }

  scrollLogic();
});

// Swipe Support
window.$("#wrapper").swipe({
  swipe: function (event, direction, distance, duration, fingerCount) {
    if (direction == "up") {
      scrollDirection = "down";
    } else if (direction == "down") {
      scrollDirection = "up";
    }

    scrollLogic();
  },
  threshold: 100
});

}

export default letsSnap;