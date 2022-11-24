import { useCallback, useEffect, useRef, useState } from "react";
import { useCacheImages } from "../hooks/useCacheImages";
import scrollIntoView from "scroll-into-view-if-needed";
import { motion } from "framer-motion";

export default function Home() {
  const [loading] = useCacheImages(305);

  const [_lastScrolledPoint, _setLastScrolledPoint] = useState(0);
  const lastScrolledPoint = useRef(_lastScrolledPoint);
  const setLastScrolledPoint = (val: number) => {
    lastScrolledPoint.current = val;
    _setLastScrolledPoint(val);
  };

  const [_isScrolling, _setIsScrolling] = useState(false);
  const isScrolling = useRef(_isScrolling);
  const setIsScrolling = (val: boolean) => {
    isScrolling.current = val;
    _setIsScrolling(val);
  };

  const [_currentSlide, _setCurrentSlide] = useState(1);
  const currentSlide = useRef(_currentSlide);
  const setCurrentSlide = (val: number) => {
    currentSlide.current = val;
    _setCurrentSlide(val);
  };

  const scrollToSlide = (slideNo: number) => {
    const id = `#slide-${slideNo}`;

    const node = document.querySelector(id);
    scrollIntoView(node, {
      behavior: "smooth",
      scrollMode: "if-needed",
      block: "start",
      inline: "start",
    });
  };

  const updateView = (slide: number) => {
    console.log("Update View");
    switch (slide) {
      case 1:
        scrollToSlide(1);
        return;
      case 2:
        scrollToSlide(2);
        return;
      case 3:
        scrollToSlide(3);
        return;
      case 4:
        scrollToSlide(4);
        return;
      case 5:
        scrollToSlide(5);
        return;
    }
  };

  const handleScroll = (e: Event) => {
    const scrollTop = document.documentElement.scrollTop;

    if (!isScrolling.current) {
      console.log("Scroll event");

      if (scrollTop > lastScrolledPoint.current) {
        console.log("Go Down");
        setIsScrolling(true);
        const newSlide = Math.min(currentSlide.current + 1, 5);
        setCurrentSlide(newSlide);
      } else if (scrollTop < lastScrolledPoint.current) {
        console.log("Go Up");
        setIsScrolling(true);
        const newSlide = Math.max(currentSlide.current - 1, 1);
        setCurrentSlide(newSlide);
      }

      updateView(currentSlide.current);
    } else {
      console.log("Handle calls during scrolling");
    }

    optimizedFn(scrollTop);
  };

  const debounce = (func: Function) => {
    let timer: any;
    return function (...args: any) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 100);
    };
  };

  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

  function preventDefault(e: Event) {
    e.preventDefault();
  }

  function preventDefaultForScrollKeys(e: Event) {
    if ((keys as any)[(e as any).keyCode]) {
      preventDefault(e);
      return false;
    }
  }

  // modern Chrome requires { passive: false } when adding event
  var supportsPassive = false;
  try {
    (window as any).addEventListener(
      "test",
      null,
      Object.defineProperty({}, "passive", {
        get: function () {
          supportsPassive = true;
        },
      })
    );
  } catch (e) {}

  var wheelOpt: any;
  var wheelEvent: any;

  useEffect(() => {
    wheelOpt = supportsPassive ? { passive: false } : false;
    wheelEvent =
      "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";
  }, []);

  // // call this to Disable
  // function disableScroll() {
  //   window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
  //   window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  //   window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
  //   window.addEventListener("keydown", preventDefaultForScrollKeys, false);
  // }

  // // call this to Enable
  // function enableScroll() {
  //   window.removeEventListener("DOMMouseScroll", preventDefault, false);
  //   (window as any).removeEventListener(wheelEvent, preventDefault, wheelOpt);
  //   window.removeEventListener("touchmove", preventDefault, wheelOpt as any);
  //   window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
  // }

  function disableScroll() {
    // Get the current page scroll position
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    // if any scroll is attempted, set this to the previous value
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }

  // function enableScroll() {
  //   window.onscroll = function () {};
  // }

  const handleChange = (value: any) => {
    setLastScrolledPoint(document.documentElement.scrollTop);
    setIsScrolling(false);
    // enableScroll();
  };

  const optimizedFn = useCallback(debounce(handleChange), []);

  console.log({ isScrolling: isScrolling.current });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-black">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-screen scroll-smooth">
      <motion.div
        id="slide-1"
        className="w-full h-screen bg-slate-500 flex justify-center items-center text-white"
      >
        <p>1</p>
      </motion.div>
      <div className="w-full h-screen bg-orange-500 flex justify-center items-center text-white">
        <p>2</p>
      </div>
      <div className="w-full h-screen bg-zinc-500 flex justify-center items-center text-white">
        <p>3</p>
      </div>
      <div
        id="slide-2"
        className="w-full h-screen bg-green-500 flex justify-center items-center text-white"
      >
        <p>4</p>
      </div>
      <div className="w-full h-screen bg-stone-500 flex justify-center items-center text-white">
        <p>5</p>
      </div>
      <div className="w-full h-screen bg-red-500 flex justify-center items-center text-white">
        <p>6</p>
      </div>
      <motion.div
        id="slide-3"
        className="w-full h-screen bg-gray-500 flex justify-center items-center text-white"
      >
        <p>7</p>
      </motion.div>
      <div className="w-full h-screen bg-amber-500 flex justify-center items-center text-white">
        <p>8</p>
      </div>
      <div className="w-full h-screen bg-neutral-500 flex justify-center items-center text-white">
        <p>9</p>
      </div>
      <div className="w-full h-screen bg-sky-500 flex justify-center items-center text-white">
        <p>10</p>
      </div>
      <motion.div
        id="slide-4"
        className="w-full h-screen bg-pink-500 flex justify-center items-center text-white"
      >
        <p>11</p>
      </motion.div>
      <div className="w-full h-screen bg-purple-500 flex justify-center items-center text-white">
        <p>12</p>
      </div>
      <div className="w-full h-screen bg-cyan-500 flex justify-center items-center text-white">
        <p>13</p>
      </div>
      <div className="w-full h-screen bg-fuchsia-500 flex justify-center items-center text-white">
        <p>14</p>
      </div>
      <div className="w-full h-screen bg-teal-500 flex justify-center items-center text-white">
        <p>15</p>
      </div>
      <motion.div
        id="slide-5"
        className="w-full h-screen bg-rose-500 flex justify-center items-center text-white"
      >
        <p>16</p>
      </motion.div>
    </div>
  );
}
