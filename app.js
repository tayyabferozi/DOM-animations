$(function () {
  let i = -20;
  let step = 1;
  const initialStep = step;
  let direction = "right";

  let lastScrollTop = 0;

  const limit = Math.floor(
    $("#marquee").css("position", "absolute").width() / 2
  );
  $("#marquee").css("position", "");

  setInterval(() => {
    if (direction === "left") {
      if (i > -limit) {
        i -= step;
      } else {
        i = 0;
      }
    } else if (direction === "right") {
      if (i < -limit || i > 0) {
        i = -limit;
      } else {
        i += step;
      }
    }
    if (step > initialStep) {
      const shouldBeSubtractedThis = step / 0.00005;
      step = step - shouldBeSubtractedThis;
    }
    if (step < initialStep) {
      step = initialStep;
    }
    $("#marquee").css("margin-left", i + "px");
  }, 5);

  $(window).scroll(function () {
    let st = $(document).scrollTop();

    if (st > lastScrollTop) {
      direction = "left";
    } else {
      direction = "right";
    }
    lastScrollTop = st <= 0 ? 0 : st;
  });

  var checkScrollSpeed = (function (settings) {
    settings = settings || {};

    var lastPos,
      newPos,
      timer,
      delta,
      delay = settings.delay || 50; // in "ms" (higher means lower fidelity )

    function clear() {
      lastPos = null;
      delta = 0;
    }

    clear();

    return function () {
      newPos = window.scrollY;
      if (lastPos != null) {
        // && newPos < maxScroll
        delta = newPos - lastPos;
      }
      lastPos = newPos;
      clearTimeout(timer);
      timer = setTimeout(clear, delay);
      return delta;
    };
  })();

  // listen to "scroll" event
  window.onscroll = function () {
    const scrollSpeed = Math.abs(checkScrollSpeed() * 2);
    console.log(step);
    step = step * scrollSpeed;
    console.log(step);
  };
});
