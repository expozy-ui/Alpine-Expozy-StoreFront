const ki = typeof document < "u" && document.currentScript && document.currentScript.src || "", Hs = ["view", "setTheme", "loadWorkflow"];
let Ee = null, Si = "";
function Ei(a) {
  const e = a && (a.default || a.FormViewer) || a;
  typeof e == "function" && (window.FormViewer = e);
}
function zs(a) {
  if (a && a.formViewerUrl) return a.formViewerUrl;
  if (ki)
    try {
      return new URL("./", ki).href;
    } catch {
    }
  const e = [...document.querySelectorAll('link[rel="stylesheet"]')].map((t) => t.href).find((t) => /contentbox-[a-z-]*runtime[a-z-]*\.css(\?|$)/.test(t));
  if (e)
    try {
      return new URL("./", e).href;
    } catch {
    }
  try {
    return new URL("/runtime/", document.baseURI).href;
  } catch {
    return "";
  }
}
function us(a) {
  return Ee || (a && typeof a.formViewer == "function" ? (Ee = Promise.resolve().then(() => a.formViewer()).then(Ei).catch((e) => {
    throw console.error("[ContentBox] the formViewer loader failed:", e), e;
  }), Ee) : a && a.formViewerUrl ? (Si = zs(a), Ee = new Promise((e, t) => {
    const i = document.createElement("script");
    i.src = Si + "formviewer.min.js", i.onload = e, i.onerror = () => t(new Error("FormViewer could not be loaded from " + i.src)), document.body.appendChild(i);
  }).catch((e) => {
    throw console.error(
      "[ContentBox]",
      e.message,
      "- set formViewerUrl, or include formviewer.min.js yourself."
    ), e;
  }), Ee) : (Ee = Promise.resolve().then(() => Po).then(Ei), Ee));
}
function Bs(a) {
  if (typeof window > "u" || window.FormViewer) return;
  const e = [];
  class t {
    constructor(s, n) {
      this._element = s, this._options = n, this._calls = [], e.push(this), us(a).then(() => {
        const r = window.FormViewer;
        if (!(!r || r === t))
          for (; e.length; ) {
            const o = e.shift(), l = new r(o._element, o._options);
            o._calls.forEach(([u, d]) => {
              typeof l[u] == "function" && l[u](...d);
            });
          }
      }).catch(() => {
      });
    }
  }
  Hs.forEach((i) => {
    t.prototype[i] = function(...s) {
      return this._calls.push([i, s]), this;
    };
  }), window.FormViewer = t;
}
function Ti(a) {
  typeof document > "u" || document.querySelector('[data-module="form-builder"], [data-module="form"]') && us(a).catch(() => {
  });
}
function ii() {
  this.trigger = {
    once: !1,
    offset: {
      viewport: {
        x: 0,
        y: 0
      },
      element: {
        x: 0,
        y: 0
      }
    },
    toggle: {
      class: {
        in: "visible",
        out: "invisible"
      },
      callback: {
        in: null,
        visible: null,
        out: null
      }
    }
  }, this.scroll = {
    sustain: 300,
    element: window,
    callback: () => {
    },
    start: () => {
    },
    stop: () => {
    },
    directionChange: () => {
    }
  };
}
function Fs(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
/*!
 * object-extend
 * A well-tested function to deep extend (or merge) JavaScript objects without further dependencies.
 *
 * http://github.com/bernhardw
 *
 * Copyright 2013, Bernhard Wanger <mail@bernhardwanger.com>
 * Released under the MIT license.
 *
 * Date: 2013-04-10
 */
var $t, Ci;
function Us() {
  return Ci || (Ci = 1, $t = function a(e, t) {
    return e == null || t == null || Object.keys(t).forEach(function(i) {
      Object.prototype.toString.call(t[i]) == "[object Object]" ? Object.prototype.toString.call(e[i]) != "[object Object]" ? e[i] = t[i] : e[i] = a(e[i], t[i]) : e[i] = t[i];
    }), e;
  }), $t;
}
var js = Us();
const wt = /* @__PURE__ */ Fs(js);
Array.prototype.each = function(a) {
  const e = this.length;
  for (let t = 0; t < e; t++) {
    const i = this[t];
    i && a(i, t);
  }
};
typeof window < "u" && typeof NodeList < "u" && (NodeList.prototype.each = Array.prototype.each, NodeList.prototype.filter = Array.prototype.filter);
function st(a) {
  return Number(a) === a && a % 1 === 0;
}
function nt(a) {
  return Number(a) === a && a % 1 !== 0;
}
let ht = class {
  /**
   * Creates a new Trigger from the given element and options
   *
   * @param {Element|HTMLElement} element
   * @param {DefaultOptions.trigger} [options=DefaultOptions.trigger] options
   */
  constructor(e, t) {
    this.element = e, t = wt(new ii().trigger, t), this.offset = t.offset, this.toggle = t.toggle, this.once = t.once, this.visible = null, this.active = !0;
  }
  /**
   * Checks if the Trigger is in the viewport, calls the callbacks and toggles the classes
   * @param {HTMLElement|HTMLDocument|Window} parent
   * @param {string} direction top, bottom, left, right
   * @returns {boolean} If the element is visible
   */
  checkVisibility(e, t) {
    if (!this.active)
      return this.visible;
    const i = e.offsetWidth || e.innerWidth || 0, s = e.offsetHeight || e.innerHeight || 0, n = { w: i, h: s }, r = this.getBounds(), o = this._checkVisibility(r, n, t);
    if (o !== this.visible) {
      this.visible = o;
      const l = this._toggleCallback();
      l instanceof Promise ? l.then(this._toggleClass.bind(this)).catch((u) => {
        console.error("Trigger promise failed"), console.error(u);
      }) : this._toggleClass(), this.visible && this.once && (this.active = !1);
    } else if (o && typeof this.toggle.callback.visible == "function")
      return this.toggle.callback.visible.call(this.element, this);
    return o;
  }
  /**
   * Get the bounds of this element
   * @return {ClientRect | DOMRect}
   */
  getBounds() {
    return this.element.getBoundingClientRect();
  }
  /**
   * Get the calculated offset to place on the element
   * @param {ClientRect} rect
   * @param {string} direction top, bottom, left, right
   * @returns {{x: number, y: number}}
   * @private
   */
  _getElementOffset(e, t) {
    let i = { x: 0, y: 0 };
    return typeof this.offset.element.x == "function" ? i.x = e.width * this.offset.element.x(this, e, t) : nt(this.offset.element.x) ? i.x = e.width * this.offset.element.x : st(this.offset.element.x) && (i.x = this.offset.element.x), typeof this.offset.element.y == "function" ? i.y = e.height * this.offset.element.y(this, e, t) : nt(this.offset.element.y) ? i.y = e.height * this.offset.element.y : st(this.offset.element.y) && (i.y = this.offset.element.y), i;
  }
  /**
   * Get the calculated offset to place on the viewport
   * @param {{w: number, h: number}} parent
   * @param {string} direction top, bottom, left, right
   * @returns {{x: number, y: number}}
   * @private
   */
  _getViewportOffset(e, t) {
    let i = { x: 0, y: 0 };
    return typeof this.offset.viewport.x == "function" ? i.x = e.w * this.offset.viewport.x(this, e, t) : nt(this.offset.viewport.x) ? i.x = e.w * this.offset.viewport.x : st(this.offset.viewport.x) && (i.x = this.offset.viewport.x), typeof this.offset.viewport.y == "function" ? i.y = e.h * this.offset.viewport.y(this, e, t) : nt(this.offset.viewport.y) ? i.y = e.h * this.offset.viewport.y : st(this.offset.viewport.y) && (i.y = this.offset.viewport.y), i;
  }
  /**
   * Check the visibility of the trigger in the viewport, with offsets applied
   * @param {ClientRect} rect
   * @param {{w: number, h: number}} parent
   * @param {string} direction top, bottom, left, right
   * @returns {boolean}
   * @private
   */
  _checkVisibility(e, t, i) {
    const s = this._getElementOffset(e, i), n = this._getViewportOffset(t, i);
    let r = !0;
    return e.left - n.x < -(e.width - s.x) && (r = !1), e.left + n.x > t.w - s.x && (r = !1), e.top - n.y < -(e.height - s.y) && (r = !1), e.top + n.y > t.h - s.y && (r = !1), r;
  }
  /**
   * Toggles the classes
   * @private
   */
  _toggleClass() {
    if (this.visible) {
      Array.isArray(this.toggle.class.in) ? this.toggle.class.in.each((e) => {
        this.element.classList.add(e);
      }) : this.element.classList.add(this.toggle.class.in), Array.isArray(this.toggle.class.out) ? this.toggle.class.out.each((e) => {
        this.element.classList.remove(e);
      }) : this.element.classList.remove(this.toggle.class.out);
      return;
    }
    Array.isArray(this.toggle.class.in) ? this.toggle.class.in.each((e) => {
      this.element.classList.remove(e);
    }) : this.element.classList.remove(this.toggle.class.in), Array.isArray(this.toggle.class.out) ? this.toggle.class.out.each((e) => {
      this.element.classList.add(e);
    }) : this.element.classList.add(this.toggle.class.out);
  }
  /**
   * Toggles the callback
   * @private
   * @return null|Promise
   */
  _toggleCallback() {
    if (this.visible) {
      if (typeof this.toggle.callback.in == "function")
        return this.toggle.callback.in.call(this.element, this);
    } else if (typeof this.toggle.callback.out == "function")
      return this.toggle.callback.out.call(this.element, this);
  }
}, Ys = class {
  /**
   * Initializes the collection
   * @param {Trigger[]} [triggers=[]] triggers A set of triggers to init with, optional
   */
  constructor(e) {
    this.triggers = e instanceof Array ? e : [];
  }
  /**
   * Adds one or multiple Trigger objects
   * @param {Trigger|Trigger[]} objects
   */
  add(e) {
    if (e instanceof ht)
      return this.triggers.push(e);
    e.each((t) => {
      t instanceof ht ? this.triggers.push(t) : console.error("Object added to TriggerCollection is not a Trigger. Object: ", t);
    });
  }
  /**
   * Removes one or multiple Trigger objects
   * @param {Trigger|Trigger[]} objects
   */
  remove(e) {
    e instanceof ht && (e = [e]), this.triggers = this.triggers.filter((t) => {
      let i = !1;
      return e.each((s) => {
        s == t && (i = !0);
      }), !i;
    });
  }
  /**
   * Lookup one or multiple triggers by a query string
   * @param {string} selector
   * @returns {Trigger[]}
   */
  query(e) {
    return this.triggers.filter((t) => {
      const i = t.element, s = i.parentNode;
      return [].slice.call(s.querySelectorAll(e)).indexOf(i) > -1;
    });
  }
  /**
   * Lookup one or multiple triggers by a certain HTMLElement or NodeList
   * @param {HTMLElement|HTMLElement[]|NodeList} element
   * @returns {Trigger|Trigger[]|null}
   */
  search(e) {
    const t = this.triggers.filter((i) => {
      if (e instanceof NodeList || Array.isArray(e)) {
        let s = !1;
        return e.each((n) => {
          i.element == n && (s = !0);
        }), s;
      }
      return i.element == e;
    });
    return t.length == 0 ? null : t.length > 1 ? t : t[0];
  }
  /**
   * Calls a function on all triggers
   * @param {(function())} callback
   */
  call(e) {
    this.triggers.each(e);
  }
}, Ws = class {
  /**
   * ScrollAnimationLoop constructor.
   * Starts a requestAnimationFrame loop as long as the user has scrolled the scrollElement. Stops after a certain time.
   *
   * @param {DefaultOptions.scroll} [options=DefaultOptions.scroll] options The options for the loop
   * @param {ScrollCallback} callback [loop=null] The loop callback
   */
  constructor(e, t) {
    this._parseOptions(e), typeof t == "function" && (this.callback = t), this.direction = "none", this.position = this.getPosition(), this.lastAction = this._getTimestamp(), this._startRun(), this._boundListener = this._didScroll.bind(this), this.element.addEventListener("scroll", this._boundListener);
  }
  /**
   * Parses the options
   *
   * @param {DefaultOptions.scroll} [options=DefaultOptions.scroll] options The options for the loop
   * @private
   */
  _parseOptions(e) {
    let t = new ii().scroll;
    typeof e != "function" ? (t.callback = () => {
    }, t = wt(t, e)) : t.callback = e, this.element = t.element, this.sustain = t.sustain, this.callback = t.callback, this.startCallback = t.start, this.stopCallback = t.stop, this.directionChange = t.directionChange;
  }
  /**
   * Callback when the user scrolled the element
   * @private
   */
  _didScroll() {
    const e = this.getPosition();
    if (this.position !== e) {
      let t = this.direction;
      e.x !== this.position.x ? t = e.x > this.position.x ? "right" : "left" : e.y !== this.position.y ? t = e.y > this.position.y ? "bottom" : "top" : t = "none", t !== this.direction && (this.direction = t, typeof this.directionChange == "function" && this.directionChange(this.direction)), this.position = e, this.lastAction = this._getTimestamp();
    } else
      this.direction = "none";
    this.running || this._startRun();
  }
  /**
   * Starts the loop, calls the start callback
   * @private
   */
  _startRun() {
    this.running = !0, typeof this.startCallback == "function" && this.startCallback(), this._loop();
  }
  /**
   * Stops the loop, calls the stop callback
   * @private
   */
  _stopRun() {
    this.running = !1, typeof this.stopCallback == "function" && this.stopCallback();
  }
  /**
   * The current position of the element
   * @returns {{x: number, y: number}}
   */
  getPosition() {
    const e = this.element.pageXOffset || this.element.scrollLeft || document.documentElement.scrollLeft || 0, t = this.element.pageYOffset || this.element.scrollTop || document.documentElement.scrollTop || 0;
    return { x: e, y: t };
  }
  /**
   * The current timestamp in ms
   * @returns {number}
   * @private
   */
  _getTimestamp() {
    return Number(Date.now());
  }
  /**
   * One single tick of the animation
   * @private
   */
  _tick() {
    this.callback(this.position, this.direction), this._getTimestamp() - this.lastAction > this.sustain && this._stopRun(), this.running && this._loop();
  }
  /**
   * Requests an animation frame
   * @private
   */
  _loop() {
    (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || ((t) => {
      setTimeout(t, 16.666666666666668);
    }))(this._tick.bind(this));
  }
  /**
   * Kills the loop forever
   */
  kill() {
    this.running = !1, this.element.removeEventListener("scroll", this._boundListener);
  }
};
/*!
 * ScrollTrigger
 *
 *
 * http://github.com/terwanerik
 *
 * Copyright 2017, Erik Terwan <erik@erikterwan.com>
 * Released under the MIT license.
 *
 * Date: 2017-07-09
 */
const Ne = ht, Gs = Ys, Vs = Ws;
class Xs {
  /**
   * Constructor for the scroll trigger
   * @param {DefaultOptions} [options=DefaultOptions] options
   */
  constructor(e) {
    this._parseOptions(e), this._initCollection(), this._initLoop();
  }
  /**
   * Parses the options
   * @param {DefaultOptions} [options=DefaultOptions] options
   * @private
   */
  _parseOptions(e) {
    e = wt(new ii(), e), this.defaultTrigger = e.trigger, this.scrollOptions = e.scroll;
  }
  /**
   * Initializes the collection, picks all [data-scroll] elements as initial elements
   * @private
   */
  _initCollection() {
    const e = document.querySelectorAll("[data-scroll]");
    let t = [];
    e.length > 0 && (t = this.createTriggers(e)), this.collection = new Gs(t);
  }
  /**
   * Initializes the scroll loop
   * @private
   */
  _initLoop() {
    this.loop = new Vs({
      sustain: this.scrollOptions.sustain,
      element: this.scrollOptions.element,
      callback: (e, t) => {
        this._scrollCallback(e, t);
      },
      start: () => {
        this._scrollStart();
      },
      stop: () => {
        this._scrollStop();
      },
      directionChange: (e) => {
        this._scrollDirectionChange(e);
      }
    });
  }
  /**
   * Callback for checking triggers
   * @param {{x: number, y: number}} position
   * @param {string} direction
   * @private
   */
  _scrollCallback(e, t) {
    this.collection.call((i) => {
      i.checkVisibility(this.scrollOptions.element, t);
    }), this.scrollOptions.callback(e, t);
  }
  /**
   * When the scrolling started
   * @private
   */
  _scrollStart() {
    this.scrollOptions.start();
  }
  /**
   * When the scrolling stopped
   * @private
   */
  _scrollStop() {
    this.scrollOptions.stop();
  }
  /**
   * When the direction changes
   * @param {string} direction
   * @private
   */
  _scrollDirectionChange(e) {
    this.scrollOptions.directionChange(e);
  }
  /**
   * Creates a Trigger object from a given element and optional option set
   * @param {HTMLElement} element
   * @param {DefaultOptions.trigger} [options=DefaultOptions.trigger] options
   * @returns Trigger
   */
  createTrigger(e, t) {
    return new Ne(e, wt(this.defaultTrigger, t));
  }
  /**
   * Creates an array of triggers
   * @param {HTMLElement[]|NodeList} elements
   * @param {Object} [options=null] options
   * @returns {Trigger[]} Array of triggers
   */
  createTriggers(e, t) {
    let i = [];
    return e.each((s) => {
      i.push(this.createTrigger(s, t));
    }), i;
  }
  /**
   * Adds triggers
   * @param {string|HTMLElement|NodeList|Trigger|Trigger[]} objects A list of objects or a query
   * @param {Object} [options=null] options
   * @returns {ScrollTrigger}
   */
  add(e, t) {
    return e instanceof HTMLElement ? (this.collection.add(this.createTrigger(e, t)), this) : e instanceof Ne ? (this.collection.add(e), this) : e instanceof NodeList ? (this.collection.add(this.createTriggers(e, t)), this) : Array.isArray(e) && e.length && e[0] instanceof Ne ? (this.collection.add(e), this) : Array.isArray(e) && e.length && e[0] instanceof HTMLElement ? (this.collection.add(this.createTriggers(e, t)), this) : (this.collection.add(this.createTriggers(document.querySelectorAll(e), t)), this);
  }
  /**
   * Removes triggers
   * @param {string|HTMLElement|NodeList|Trigger|Trigger[]} objects A list of objects or a query
   * @returns {ScrollTrigger}
   */
  remove(e) {
    return e instanceof Ne ? (this.collection.remove(e), this) : Array.isArray(e) && e.length && e[0] instanceof Ne ? (this.collection.remove(e), this) : e instanceof HTMLElement ? (this.collection.remove(this.search(e)), this) : Array.isArray(e) && e.length && e[0] instanceof HTMLElement ? (this.collection.remove(this.search(e)), this) : e instanceof NodeList ? (this.collection.remove(this.search(e)), this) : Array.isArray(e) && e.length && e[0] instanceof Ne ? (this.collection.remove(e), this) : (this.collection.remove(this.query(e.toString())), this);
  }
  /**
   * Lookup one or multiple triggers by a query string
   * @param {string} selector
   * @returns {Trigger[]}
   */
  query(e) {
    return this.collection.query(e);
  }
  /**
   * Lookup one or multiple triggers by a certain HTMLElement or NodeList
   * @param {HTMLElement|HTMLElement[]|NodeList} element
   * @returns {Trigger|Trigger[]|null}
   */
  search(e) {
    return this.collection.search(e);
  }
  /**
   * Reattaches the scroll listener
   */
  listen() {
    this.loop || this._initLoop();
  }
  /**
   * Kills the scroll listener
   */
  kill() {
    this.loop.kill(), this.loop = null;
  }
}
/*!
 * Kinetra v1.6.1
 * A lightweight, dependency-free animation + scroll engine.
 * Written from scratch. Original API. MIT-style: do whatever you want with it.
 *
 * Exports:
 *   animate(targets, vars)            -> Tween   (animate TO the given values)
 *   fromState(targets, vars)          -> Tween   (animate FROM the given values)
 *   fromTo(targets, fromVars, toVars) -> Tween
 *   sequence(options)                 -> Sequence (a timeline of tweens)
 *   ScrollScene / scrollScene(opts)   -> scroll-driven scenes w/ pin + scrub
 *   easings                           -> built-in easing functions
 *   ticker                            -> shared requestAnimationFrame loop
 *
 * ES6 module. No globals. Works in any framework (React, Vue, Angular, Svelte...).
 */
const _t = {
  linear: (a) => a,
  smooth: (a) => a * a * (3 - 2 * a),
  // smoothstep
  easeIn: (a) => a * a * a,
  easeOut: (a) => 1 - Math.pow(1 - a, 3),
  easeInOut: (a) => a < 0.5 ? 4 * a * a * a : 1 - Math.pow(-2 * a + 2, 3) / 2,
  quadIn: (a) => a * a,
  quadOut: (a) => 1 - (1 - a) * (1 - a),
  quartOut: (a) => 1 - Math.pow(1 - a, 4),
  expoOut: (a) => a === 1 ? 1 : 1 - Math.pow(2, -10 * a),
  backOut: (a) => 1 + 2.70158 * Math.pow(a - 1, 3) + 1.70158 * Math.pow(a - 1, 2),
  backIn: (a) => 2.70158 * a * a * a - 1.70158 * a * a,
  bounceOut: (a) => a < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75 : a < 2.5 / 2.75 ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375 : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375,
  elasticOut: (a) => {
    const e = 2 * Math.PI / 3;
    return a === 0 ? 0 : a === 1 ? 1 : Math.pow(2, -10 * a) * Math.sin((a * 10 - 0.75) * e) + 1;
  }
};
function Js(a) {
  return typeof a == "function" ? a : _t[a] || _t.easeOut;
}
class Ks {
  constructor() {
    this._subs = /* @__PURE__ */ new Set(), this._running = !1, this._frame = this._frame.bind(this), this._last = 0;
  }
  add(e) {
    return this._subs.add(e), this._running || (this._running = !0, this._last = null, requestAnimationFrame(this._frame)), () => this.remove(e);
  }
  remove(e) {
    this._subs.delete(e);
  }
  _frame(e) {
    if (!this._subs.size) {
      this._running = !1;
      return;
    }
    this._last == null && (this._last = e);
    const t = Math.min(Math.max((e - this._last) / 1e3, 0), 0.1);
    this._last = e;
    for (const i of [...this._subs]) i(t, e);
    requestAnimationFrame(this._frame);
  }
}
const Ue = new Ks(), Rt = (a) => !!a && a.nodeType === 1, Zs = (a) => !!a && typeof a.length == "number" && typeof a.item == "function";
function si(a) {
  return a == null ? [] : typeof a == "string" ? Array.from(document.querySelectorAll(a)) : Rt(a) ? [a] : Array.isArray(a) || Zs(a) ? Array.from(a).flatMap((e) => si(e)) : [a];
}
const ni = [
  "x",
  "y",
  "z",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "skewX",
  "skewY"
], Qs = {
  x: 0,
  y: 0,
  z: 0,
  scale: 1,
  scaleX: 1,
  scaleY: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  skewX: 0,
  skewY: 0
}, en = /* @__PURE__ */ new Set([
  "duration",
  "delay",
  "ease",
  "repeat",
  "yoyo",
  "stagger",
  "onStart",
  "onUpdate",
  "onComplete",
  "onRepeat",
  "paused",
  "renderStart"
]), Yt = /* @__PURE__ */ new WeakMap();
function et(a) {
  let e = Yt.get(a);
  return e || (e = { transform: { ...Qs } }, Yt.set(a, e)), e;
}
function tn(a) {
  const e = et(a).transform, t = (r) => Math.round(r * 1e3) / 1e3;
  let i = "";
  e.perspective && (i += `perspective(${t(e.perspective)}px) `), (e.x || e.y || e.z) && (i += `translate3d(${t(e.x)}px, ${t(e.y)}px, ${t(e.z)}px) `), e.rotate && (i += `rotate(${t(e.rotate)}deg) `), e.rotateX && (i += `rotateX(${t(e.rotateX)}deg) `), e.rotateY && (i += `rotateY(${t(e.rotateY)}deg) `), (e.skewX || e.skewY) && (i += `skew(${t(e.skewX)}deg, ${t(e.skewY)}deg) `);
  const s = e.scaleX !== 1 ? e.scaleX : e.scale, n = e.scaleY !== 1 ? e.scaleY : e.scale;
  (s !== 1 || n !== 1) && (i += `scale(${t(s)}, ${t(n)}) `), a.style.transform = i.trim();
}
function Wt(a) {
  if (typeof a != "string") return null;
  if (a = a.trim(), a[0] === "#") {
    let t = a.slice(1);
    if (t.length === 3 && (t = t.split("").map((s) => s + s).join("")), t.length === 6 && (t += "ff"), t.length !== 8) return null;
    const i = parseInt(t, 16);
    return [i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, (i & 255) / 255];
  }
  const e = a.match(/^rgba?\(([^)]+)\)$/i);
  if (e) {
    const t = e[1].split(",").map((i) => parseFloat(i));
    return [t[0], t[1], t[2], t.length > 3 ? t[3] : 1];
  }
  return null;
}
function ds(a, e, t) {
  const i = a.map((s, n) => s + (e[n] - s) * t);
  return `rgba(${Math.round(i[0])}, ${Math.round(i[1])}, ${Math.round(i[2])}, ${+i[3].toFixed(3)})`;
}
function pt(a) {
  if (typeof a == "number") return { num: a, unit: null };
  const e = String(a).trim().match(/^(-?\d*\.?\d+)([a-z%]*)$/i);
  return e ? { num: parseFloat(e[1]), unit: e[2] || null } : null;
}
function ft(a, e) {
  const t = Rt(a);
  if (t && ni.includes(e))
    return et(a).transform[e];
  if (t) {
    const i = getComputedStyle(a);
    return e in a.style || i[e] !== void 0 ? i[e] : a[e];
  }
  return a[e];
}
function Li(a, e, t) {
  const i = pt(t);
  if (!i) return 0;
  if (i.unit === "%" && (e === "x" || e === "y")) {
    const s = e === "x" ? a.offsetWidth : a.offsetHeight;
    return i.num / 100 * s;
  }
  return i.num;
}
function sn(a, e, t, i) {
  const s = Rt(a);
  if (s && ni.includes(e)) {
    const o = t != null ? Li(a, e, t) : et(a).transform[e], l = Li(a, e, i);
    return (u) => {
      et(a).transform[e] = o + (l - o) * u, tn(a);
    };
  }
  const n = Wt(i);
  if (n) {
    const o = t ?? ft(a, e), l = Wt(o) || [0, 0, 0, 1];
    return (u) => {
      const d = ds(l, n, u);
      s ? a.style[e] = d : a[e] = d;
    };
  }
  const r = pt(i);
  if (r) {
    let o = t != null ? pt(t) : pt(ft(a, e));
    o || (o = { num: 0, unit: r.unit });
    const l = r.unit ?? o.unit ?? "", u = o.num, d = r.num;
    return (c) => {
      const h = u + (d - u) * c;
      s ? a.style[e] = l ? h + l : String(h) : a[e] = h;
    };
  }
  if (typeof i == "string") {
    const o = t != null ? String(t) : String(ft(a, e) ?? "");
    let l = Ri(o, i);
    if (!l && s && (l = Ri(
      xt(e, o),
      xt(e, i)
    )), l)
      return (u) => {
        const d = l(u);
        s ? a.style[e] = d : a[e] = d;
      };
  }
  return (o) => {
    o >= 1 && (s ? a.style[e] = i : a[e] = i);
  };
}
function xt(a, e) {
  if (!e || typeof document > "u") return e;
  const t = xt._el || (xt._el = document.createElement("div"));
  try {
    return t.style[a] = "", t.style[a] = e, t.style[a] || e;
  } catch {
    return e;
  }
}
function Ai(a) {
  const e = /(#[0-9a-f]{3,8}\b|rgba?\([^)]*\))|(-?\d*\.?\d+(?:e[-+]?\d+)?)/gi, t = [];
  let i = 0, s;
  for (; (s = e.exec(a)) !== null; ) {
    if (s.index > i && t.push(a.slice(i, s.index)), s[1] !== void 0) {
      const n = Wt(s[1]);
      n ? t.push({ c: n }) : t.push(s[1]);
    } else
      t.push({ n: parseFloat(s[2]) });
    i = e.lastIndex;
  }
  return i < a.length && t.push(a.slice(i)), t;
}
function Mi(a) {
  return a.replace(/\s+/g, " ").toLowerCase();
}
function Ri(a, e) {
  const t = Ai(a), i = Ai(e);
  if (t.length !== i.length) return null;
  let s = 0;
  for (let r = 0; r < t.length; r++) {
    const o = t[r], l = i[r], u = typeof o == "string";
    if (u !== (typeof l == "string")) return null;
    if (u) {
      if (Mi(o) !== Mi(l)) return null;
    } else {
      if ("n" in o != "n" in l)
        return null;
      s++;
    }
  }
  if (!s) return null;
  const n = (r) => Math.round(r * 1e3) / 1e3;
  return (r) => {
    let o = "";
    for (let l = 0; l < i.length; l++) {
      const u = i[l];
      if (typeof u == "string") {
        o += u;
        continue;
      }
      const d = t[l];
      "n" in u ? o += n(d.n + (u.n - d.n) * r) : o += ds(d.c, u.c, r);
    }
    return o;
  };
}
class Te {
  /**
   * @param {*} targets selector | Element | NodeList | array | plain object
   * @param {object} vars animatable props + config (duration, delay, ease,
   *                      repeat, yoyo, stagger, paused, onStart/Update/Complete)
   * @param {object|null} fromVars explicit starting values (fromTo)
   * @param {boolean} runBackwards true = "fromState" mode
   */
  constructor(e, t, i = null, s = !1) {
    this.targets = si(e), this.vars = t, this.duration = t.duration ?? 0.8, this.delay = t.delay ?? 0, this.ease = Js(t.ease), this.repeat = t.repeat ?? 0, this.yoyo = !!t.yoyo, this.stagger = t.stagger ?? 0, this._props = null, this._fromVars = i, this._runBackwards = s, this._elapsed = 0, this._playing = !1, this._done = !1, this._started = !1, this._unsub = null, this.paused = !!t.paused, this.paused ? (this._fromVars || this._runBackwards) && t.renderStart !== !1 && this._render(0) : this.duration <= 0 && this.delay <= 0 && this.stagger <= 0 ? (this.progress(1), this._done = !0, t.onComplete && t.onComplete(this)) : this.play();
  }
  /* total length incl. delay, stagger and repeats (seconds) */
  totalDuration() {
    const e = this.stagger * Math.max(this.targets.length - 1, 0);
    return this.delay + (this.duration + e) * (this.repeat + 1);
  }
  _build() {
    if (this._props) return;
    this._props = [];
    const e = Object.keys(this.vars).filter((i) => !en.has(i)), t = (i, s) => typeof i == "function" ? i(s) : i;
    for (const i of this.targets)
      for (const s of e) {
        let n = this._fromVars ? t(this._fromVars[s], i) : null, r = t(this.vars[s], i);
        this._runBackwards && (n = this.vars[s], r = ft(i, s), Rt(i) && ni.includes(s) && (r = et(i).transform[s])), this._props.push({ target: i, apply: sn(i, s, n, r) });
      }
    (this._runBackwards || this._fromVars) && this._render(0);
  }
  _render(e) {
    this._build();
    const t = this.targets.length, i = Math.max(this.duration, 1e-9), s = this.stagger * Math.max(t - 1, 0), n = Math.max(i + s, 1e-9);
    for (const r of this._props) {
      const o = this.targets.indexOf(r.target), l = this.stagger * o;
      let u = (e * n - l) / i;
      u = Math.min(Math.max(u, 0), 1), r.apply(this.ease(u));
    }
  }
  /** Set progress manually, 0..1 (used by scrub + sequences). */
  progress(e) {
    e = Math.min(Math.max(e, 0), 1);
    let t = e;
    if (this.repeat > 0) {
      const i = 1 / (this.repeat + 1), s = Math.min(Math.floor(e / i), this.repeat);
      t = (e - s * i) / i, this.yoyo && s % 2 === 1 && (t = 1 - t);
    }
    return this._render(t), this;
  }
  play() {
    return this._playing ? this : (this._done && (this._elapsed = 0, this._done = !1), this._playing = !0, this.paused = !1, this._unsub = Ue.add((e) => this._tick(e)), this);
  }
  pause() {
    return this._playing = !1, this.paused = !0, this._unsub && (this._unsub(), this._unsub = null), this;
  }
  restart() {
    return this._elapsed = 0, this._done = !1, this._started = !1, this.play();
  }
  reverse() {
    const e = this.totalDuration();
    return this._elapsed = Math.max(e - this._elapsed, 0), this._reversed = !this._reversed, this._playing || this.play(), this;
  }
  /** Drop built interpolators; the next render re-reads current values
   *  and re-evaluates any function values (e.g. after a resize). */
  invalidate() {
    return this._props = null, this;
  }
  kill() {
    return this.pause(), this._props = null, this;
  }
  _tick(e) {
    this._elapsed += e;
    const t = this.totalDuration();
    let i = this._elapsed - this.delay;
    if (i < 0) return;
    this._started || (this._started = !0, this.vars.onStart && this.vars.onStart(this));
    const s = t - this.delay;
    let n = s <= 0 ? 1 : Math.min(i / s, 1);
    this._reversed && (n = 1 - n), this.progress(n), this.vars.onUpdate && this.vars.onUpdate(this), i >= s && (this._done = !0, this.pause(), this.vars.onComplete && this.vars.onComplete(this));
  }
}
function kt(a, e) {
  return new Te(a, e);
}
function hs(a, e) {
  return new Te(a, e, null, !0);
}
function St(a, e, t) {
  return new Te(a, t, e);
}
function ps(a, e) {
  return new Te(a, { ...e, duration: 0, delay: 0, stagger: 0 });
}
class ri {
  constructor(e = {}) {
    this.options = e, this.steps = [], this._cursor = 0, this._elapsed = 0, this._playing = !1, this._unsub = null, this.paused = !!e.paused;
  }
  /**
   * Add a step.
   * @param {*} targets
   * @param {object} vars
   * @param {number|string} position seconds | '<' (with previous) | '+=0.2' | '-=0.1'
   */
  step(e, t, i) {
    return this._place(new Te(e, { ...t, paused: !0 }), i);
  }
  /**
   * Add a step with explicit starting values — essential when several steps
   * animate the SAME property of the SAME target (e.g. a color journey).
   * The from state is NOT rendered at creation (renderStart: false),
   * so later steps don't stomp earlier ones before their turn.
   */
  fromTo(e, t, i, s) {
    return this._place(
      new Te(e, { ...i, paused: !0, renderStart: !1 }, t),
      s
    );
  }
  _place(e, t) {
    let i = this._cursor;
    if (typeof t == "number") i = t;
    else if (t === "<") i = this._lastStart ?? 0;
    else if (typeof t == "string") {
      const s = t.match(/^([+-])=(\d*\.?\d+)$/);
      s && (i = this._cursor + (s[1] === "-" ? -1 : 1) * parseFloat(s[2]));
    }
    return this.steps.push({ tween: e, start: i }), this._lastStart = i, this._cursor = Math.max(this._cursor, i + e.totalDuration()), this;
  }
  /** Add a callback at a point in time. */
  call(e, t) {
    return this.step({}, {
      duration: 1e-3,
      onComplete: e
    }, t);
  }
  //   totalDuration() {
  //     return this.steps.reduce(
  //       (max, s) => Math.max(max, s.start + s.tween.totalDuration()), 0
  //     );
  //   }
  totalDuration() {
    return this.options.duration != null ? this.options.duration : this.steps.reduce(
      (e, t) => Math.max(e, t.start + t.tween.totalDuration()),
      0
    );
  }
  progress(e) {
    e = Math.min(Math.max(e, 0), 1);
    const t = this.totalDuration(), i = e * t, s = this._lastNow !== void 0 && i < this._lastNow;
    this._lastNow = i;
    const n = s ? [...this.steps].reverse() : this.steps;
    for (const r of n) {
      const o = r.tween.totalDuration();
      let l = o <= 0 ? 1 : (i - r.start) / o;
      l = Math.min(Math.max(l, 0), 1), l !== r._last && (l <= 0 && r._last === void 0 || (r.tween.progress(l), r._last = l));
    }
    return this;
  }
  play() {
    return this._playing ? this : (this._playing = !0, this.paused = !1, this._unsub = Ue.add((e) => {
      this._elapsed += e;
      const t = this.totalDuration(), i = t <= 0 ? 1 : Math.min(this._elapsed / t, 1);
      this.progress(i), this.options.onUpdate && this.options.onUpdate(this), i >= 1 && (this.pause(), this.options.onComplete && this.options.onComplete(this));
    }), this);
  }
  pause() {
    return this._playing = !1, this.paused = !0, this._autoplay = !1, this._unsub && (this._unsub(), this._unsub = null), this;
  }
  restart() {
    return this._elapsed = 0, this.play();
  }
  /** Invalidate every step (function values re-evaluate on next render). */
  invalidate() {
    for (const e of this.steps)
      e.tween.invalidate(), e._last = void 0;
    return this._lastNow = void 0, this;
  }
  kill() {
    return this.pause(), this.steps.forEach((e) => e.tween.kill()), this;
  }
}
function oi(a = {}) {
  const e = new ri(a);
  return a.paused || (e._autoplay = !0, queueMicrotask(() => {
    e._autoplay && !e._playing && e.play();
  })), e;
}
const be = [];
let qi = !1, Me = null;
function fs(a) {
  Me = a || null, be.length && tt.refreshAll();
}
function Pi() {
  return Me ? Me.scrollY() : window.scrollY || window.pageYOffset;
}
function nn() {
  if (qi || typeof window > "u") return;
  qi = !0;
  let a = null;
  const e = () => {
    a || (a = requestAnimationFrame(() => {
      a = null;
      for (const t of be) t._update();
    }));
  };
  window.addEventListener("scroll", e, { passive: !0 }), window.addEventListener("resize", () => tt.refreshAll());
}
function rt(a, e) {
  return a === "top" || a === "left" || a === "start" ? 0 : a === "center" || a === "middle" ? e * 0.5 : a === "bottom" || a === "right" || a === "end" ? e : a.endsWith("%") ? parseFloat(a) / 100 * e : parseFloat(a) || 0;
}
let tt = class {
  /**
   * @param {object} opts
   *   trigger   : Element | selector           (required)
   *   start     : "triggerEdge viewportEdge"    default "top bottom"
   *   end       : same syntax | "+=400" | "+=100%"   default "bottom top"
   *   scrub     : false | true | number(seconds of smoothing)
   *   pin       : false | true | Element | selector
   *   reserveSpace: true (default) keep layout space while pinned
   *   animation : Tween | Sequence (auto-paused & driven by the scene)
   *   once      : play only the first time (non-scrub)
   *   onEnter, onLeave, onEnterBack, onLeaveBack : callbacks
   *   onProgress(progress, scene) : fires every scroll frame
   *   markers   : true -> draw debug lines
   */
  constructor(e) {
    if (this.opts = e, this.trigger = typeof e.trigger == "string" ? document.querySelector(e.trigger) : e.trigger, !this.trigger) throw new Error("ScrollScene: trigger not found");
    this.animation = e.animation || null, this.animation && this.animation.pause(), this.scrub = e.scrub ?? !1, this.pin = e.pin === !0 ? this.trigger : typeof e.pin == "string" ? document.querySelector(e.pin) : e.pin || null, this.reserveSpace = e.reserveSpace !== !1, this.once = !!e.once, this._active = !1, this._entered = !1, this._progress = 0, this._smoothed = 0, this._scrubPrimed = !1, this._pinned = !1, this._spacer = null, this._killed = !1, be.push(this), nn(), this.refresh(), this._update(!0);
  }
  /* ------------ measurement ------------ */
  refresh() {
    if (this._killed) return;
    this.opts.remeasure && this.animation && this.animation.invalidate && this.animation.invalidate(), this._unpin(!0);
    const e = window.innerHeight, t = this.trigger.getBoundingClientRect(), i = Pi(), s = t.top + i, n = t.height, r = this.opts.start || "top bottom", o = this.opts.end || "bottom top", [l, u] = r.split(/\s+/);
    if (this.startY = s + rt(l, n) - rt(u || "bottom", e), /^\+=/.test(o)) {
      const d = o.slice(2);
      this.endY = this.startY + (d.endsWith("%") ? parseFloat(d) / 100 * e : parseFloat(d));
    } else {
      const [d, c] = o.split(/\s+/);
      this.endY = s + rt(d, n) - rt(c || "top", e);
    }
    if (this.endY <= this.startY && (this.endY = this.startY + 1), this.pin) {
      const d = this.pin.getBoundingClientRect();
      this._pinGeom = {
        left: d.left,
        width: d.width,
        height: d.height,
        viewportTop: d.top + i - this.startY,
        // where it sits when pinning begins
        distance: this.endY - this.startY
      }, this._ensureSpacer();
    }
    this.opts.markers && this._drawMarkers();
  }
  static refreshAll() {
    for (const e of be) e.refresh();
    for (const e of be) e._update(!0);
  }
  /** Update every scene against the current scroll value.
   *  Called by smooth-scroll plugins on each animation frame. */
  static updateAll() {
    for (const e of be) e._update();
  }
  /* ------------ per-scroll update ------------ */
  _update(e = !1) {
    if (this._killed || this._preview) return;
    const t = Pi(), i = (t - this.startY) / (this.endY - this.startY), s = Math.min(Math.max(i, 0), 1), n = this._active;
    if (this._active = i >= 0 && i <= 1, this._progress = s, this._active && !n ? (i >= 0 && (this._lastRaw ?? -1) < 0 || e ? this.opts.onEnter && this.opts.onEnter(this) : this.opts.onEnterBack && this.opts.onEnterBack(this), this._entered = !0) : !this._active && n && (i > 1 ? this.opts.onLeave && this.opts.onLeave(this) : this.opts.onLeaveBack && this.opts.onLeaveBack(this)), this._lastRaw = i, this.pin) {
      let r = t;
      const o = Me && Me.pinAbsolute ? 0 : this.opts.pinLookahead;
      if (o) {
        const l = typeof performance < "u" ? performance.now() : Date.now();
        if (this._velTime !== void 0) {
          const u = Math.max(l - this._velTime, 1) / 1e3;
          this._vel = (t - this._velY) / u;
        }
        if (this._velTime = l, this._velY = t, this._vel) {
          const u = Math.min(window.innerHeight, (this.endY - this.startY) * 0.9), d = Math.max(-u, Math.min(u, this._vel * (o / 60)));
          r = t + d;
        }
      }
      this._applyPin(r);
    }
    if (this.animation)
      if (this.scrub) {
        if (this.scrub === !0)
          (s !== this._lastP || e) && (this.animation.progress(s), this._lastP = s);
        else if (this._targetP = s, !this._scrubPrimed)
          this._scrubPrimed = !0, this._smoothed = s, this.animation.progress(s);
        else if (!this._scrubTicking && (e || Math.abs(this._targetP - this._smoothed) > 1e-4)) {
          this._scrubTicking = !0;
          const r = 1 / Math.max(Number(this.scrub), 0.01), o = Ue.add((l) => {
            this._smoothed += (this._targetP - this._smoothed) * Math.min(l * r, 1), this.animation.progress(this._smoothed), Math.abs(this._targetP - this._smoothed) < 5e-4 && (this.animation.progress(this._targetP), o(), this._scrubTicking = !1);
          });
        }
      } else
        this._active && !n && i >= 0 ? this.once && this._playedOnce || (this.animation.restart(), this._playedOnce = !0) : !this._active && n && i < 0 && !this.once && (this.animation.pause(), this.animation.progress(0));
    this.opts.onProgress && this.opts.onProgress(s, this);
  }
  /* ------------ pin mechanics ------------ */
  _applyPin(e) {
    const t = this._pinGeom, i = this.pin;
    if (e < this.startY) {
      this._unpin();
      return;
    }
    this._ensureSpacer(), e >= this.startY && e < this.endY ? Me && Me.pinAbsolute ? (this._pinPhase = "active-abs", Object.assign(i.style, {
      position: "absolute",
      top: e - this.startY + "px",
      left: "0",
      width: t.width + "px",
      margin: "0"
    })) : this._pinPhase !== "fixed" && (this._pinPhase = "fixed", Object.assign(i.style, {
      position: "fixed",
      top: t.viewportTop + "px",
      left: t.left + "px",
      width: t.width + "px",
      margin: "0"
    })) : this._pinPhase !== "after" && (this._pinPhase = "after", Object.assign(i.style, {
      position: "absolute",
      top: t.distance + "px",
      left: "0",
      width: t.width + "px",
      margin: "0"
    })), this._pinned = !0;
  }
  _ensureSpacer() {
    if (this._spacer) return;
    const e = this._pinGeom, t = document.createElement("div");
    if (t.className = "kinetra-pin-spacer", t.style.position = "relative", t.style.width = "100%", t.style.height = (this.reserveSpace ? e.height + e.distance : e.height) + "px", t.style.overflowAnchor = "none", this.opts.pinBackground) {
      const i = this.opts.pinBackground === !0 ? getComputedStyle(this.pin).backgroundColor : this.opts.pinBackground;
      i && i !== "transparent" && i !== "rgba(0, 0, 0, 0)" && (t.style.backgroundColor = i);
    }
    this.pin.parentNode.insertBefore(t, this.pin), t.appendChild(this.pin), this._spacer = t;
  }
  _unpin(e = !1) {
    if (this._pinned) {
      const t = this.pin;
      t.style.position = "", t.style.top = "", t.style.left = "", t.style.width = "", t.style.margin = "", this._pinned = !1, this._pinPhase = null;
    }
    e && this._spacer && (this._spacer.parentNode.insertBefore(this.pin, this._spacer), this._spacer.remove(), this._spacer = null);
  }
  /* ------------ debug markers ------------ */
  _drawMarkers() {
    this._markers?.forEach((t) => t.remove());
    const e = (t, i, s) => {
      const n = document.createElement("div");
      return n.textContent = i, Object.assign(n.style, {
        position: "absolute",
        top: t + "px",
        right: "0",
        borderTop: `2px dashed ${s}`,
        color: s,
        fontSize: "11px",
        fontFamily: "monospace",
        padding: "2px 6px",
        zIndex: 99999,
        pointerEvents: "none"
      }), document.body.appendChild(n), n;
    };
    this._markers = [
      e(this.startY + window.innerHeight * 0, "scene start", "#0a8a4a"),
      e(this.endY, "scene end", "#c0392b")
    ];
  }
  /* ------------ teardown ------------ */
  kill() {
    this._killed = !0, this._unpin(!0), this._markers?.forEach((t) => t.remove());
    const e = be.indexOf(this);
    e > -1 && be.splice(e, 1), this.animation && this.animation.kill();
  }
};
function gs(a) {
  return new tt(a);
}
function ms() {
  [...be].forEach((a) => a.kill());
}
function ai(a) {
  si(a).forEach((e) => Yt.delete(e));
}
function ys(a, e = {}) {
  const t = typeof a == "string" ? document.querySelector(a) : a;
  if (!t) throw new Error("splitText: target not found");
  const i = e.by || "words", s = !!e.mask, n = t.innerHTML, r = t.textContent, o = [], l = [], u = document.createDocumentFragment();
  for (const f of r.split(/(\s+)/)) {
    if (!f) continue;
    if (/^\s+$/.test(f)) {
      u.appendChild(document.createTextNode(f));
      continue;
    }
    const y = document.createElement("span");
    if (y.className = "kinetra-word", y.style.display = "inline-block", i === "chars")
      for (const _ of f) {
        const g = document.createElement("span");
        g.className = "kinetra-char", g.style.display = "inline-block", g.textContent = _, y.appendChild(g), l.push(g);
      }
    else
      y.textContent = f;
    o.push(y), u.appendChild(y);
  }
  t.innerHTML = "", t.appendChild(u);
  const d = [];
  if (i === "lines") {
    const f = [];
    let y = [], _ = null;
    for (const g of o) {
      const v = g.offsetTop;
      _ === null || Math.abs(v - _) <= 2 ? (y.push(g), _ === null && (_ = v)) : (f.push(y), y = [g], _ = v);
    }
    y.length && f.push(y), t.innerHTML = "";
    for (const g of f) {
      const v = document.createElement("span");
      v.className = "kinetra-line", v.style.display = "block", g.forEach((m, b) => {
        b > 0 && v.appendChild(document.createTextNode(" ")), v.appendChild(m);
      }), t.appendChild(v), d.push(v);
    }
  }
  const c = i === "chars" ? l : i === "lines" ? d : o;
  if (s)
    for (const f of c) {
      const y = document.createElement("span");
      y.className = "kinetra-mask", y.style.display = f.style.display === "block" ? "block" : "inline-block", y.style.overflow = "hidden", y.style.verticalAlign = "top", f.parentNode.insertBefore(y, f), y.appendChild(f);
    }
  const h = t.hasAttribute("aria-label"), p = t.getAttribute("aria-label");
  t.setAttribute("aria-label", r);
  for (const f of t.children) f.setAttribute("aria-hidden", "true");
  return {
    element: t,
    words: o,
    chars: l,
    lines: d,
    targets: c,
    revert() {
      t.innerHTML = n, h ? t.setAttribute("aria-label", p) : t.removeAttribute("aria-label");
    }
  };
}
const rn = {
  animate: kt,
  fromState: hs,
  fromTo: St,
  setNow: ps,
  sequence: oi,
  Sequence: ri,
  Tween: Te,
  ScrollScene: tt,
  scrollScene: gs,
  killAllScenes: ms,
  registerScrollSource: fs,
  splitText: ys,
  easings: _t,
  ticker: Ue,
  clearState: ai
}, bs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ScrollScene: tt,
  Sequence: ri,
  Tween: Te,
  animate: kt,
  clearState: ai,
  default: rn,
  easings: _t,
  fromState: hs,
  fromTo: St,
  killAllScenes: ms,
  registerScrollSource: fs,
  scrollScene: gs,
  sequence: oi,
  setNow: ps,
  splitText: ys,
  ticker: Ue
}, Symbol.toStringTag, { value: "Module" }));
/*!
 * skrollrr-kinetra.js — v1.0.0
 *
 * Drop-in replacement for skrollrr.js (the lax.js wrapper) used by the
 * ContentBox Runtime, rebuilt on Kinetra's shared ticker.
 *
 * Public API is identical to the old Skrollrr class:
 *
 *   const skrollrr = new SkrollrrKinetra({ ... });
 *   skrollrr.init();
 *   skrollrr.refresh();     // re-parse attributes + re-measure (pageReRender)
 *   window.skrollrr = skrollrr;
 *
 * DESIGN GOALS (in priority order)
 * --------------------------------
 * 1. BIT-IDENTICAL KEYFRAME MATH with the lax-based skrollrr — including its
 *    quirks — so pages built with existing ContentBox content render at the
 *    same keyframe positions and values. Quirks deliberately preserved:
 *      - The attribute selector string is copied verbatim, including the
 *        missing comma that fuses '[data-out]' + '[data-t]' into the compound
 *        selector '[data-out][data-t]'.
 *      - In attribute values, a `transform:` item REPLACES everything parsed
 *        so far for that attribute (so "opacity:0; transform:..." loses the
 *        opacity, while "transform:...; opacity:0" keeps it).
 *      - Percentage values in translateX/translateY are converted against the
 *        VIEWPORT (innerWidth / innerHeight), not the element size.
 *      - Values are baked at parse time. A live window resize re-resolves
 *        keyframe POSITIONS only (like lax's resize handling); values are
 *        re-baked only on refresh() — exactly the current behavior.
 *      - The data-t-* viewport-height compensation (the minus2/minus1/plus/
 *        plus2 slot shifting) is reproduced arithmetically: identical
 *        boundaries, identical ±100/±200px offsets.
 *      - Only the exact data-t slot set the old engine reads is honored:
 *        data-t and data-t-100 … data-t-2800 in steps of 100 (plus the
 *        data-md-t-*, data-sm-t-*, data-xs-t-* variants and m-data-out),
 *        so attributes the old engine ignored remain ignored.
 *
 * 2. LEGACY SMOOTHING, REPRODUCED AS-IS. The old engine layered a CSS
 *    `transition: all .3s ease-out` on top of lax's per-frame writes. That
 *    transition — not the keyframes — is where legacy's visible smoothness
 *    lived: lax interpolated LINEARLY, and the browser eased the element
 *    toward each frame's value over 300ms.
 *
 *    This port originally replaced it with a frame-rate-independent
 *    exponential catch-up ("scrub"), on the theory that ~0.1s of scrub
 *    matched a 0.3s ease-out. It does not — it is roughly half as soft, and
 *    more importantly it is the wrong KIND of smoothing. A time lag rounds
 *    the velocity discontinuity at every keyframe; a shorter lag does not.
 *    The result was motion that started and stopped abruptly.
 *
 *    Neither easing the keyframe segments nor lengthening the ramp closes
 *    that gap (both were tried): they change where the element is at a given
 *    scroll position, which is not what legacy did. So the CSS transition is
 *    simply put back — see LEGACY_TRANSITION on the class. The engine writes
 *    the true scroll value (scrub forced to 0, or the two would stack) and
 *    the browser does all the smoothing, exactly as before.
 *
 *    Two consequences are inherited from legacy and are not bugs: the
 *    rendered position trails the scroll and briefly drifts the wrong way
 *    when you reverse direction. Elements with data-smooth-scrolling="off"
 *    are hard-locked and get no transition, as before.
 *
 * 3. SCROLL-INVARIANT MEASUREMENT. Elements inside a `.pin-wrap` are measured
 *    relative to the wrap (which is static) instead of the sticky section
 *    (which moves with the viewport while pinned). refresh() is therefore
 *    correct at any scroll position — no dependence on being at scrollY 0.
 *
 * WHAT THIS FILE DOES NOT TOUCH
 * -----------------------------
 * - Pinning. The `.pin-wrap` + `position: sticky` mechanism (created by the
 *   runtime's skrollrSetup() and styled by box-flex.css) is untouched and is
 *   still the pin engine. Kinetra's own `pin:` option is deliberately unused.
 * - Page content. All existing data-* animation attributes keep working
 *   unchanged; nothing new is required in stored pages.
 * - The editor. Like lax, this engine only writes inline `transform` and
 *   `opacity`, which is safe under contentEditable.
 *
 * Requires kinetra.js in the same directory (uses only its shared ticker).
 */
const on = "[data-bottom-top],[data-center],[data-center-bottom],[data-100-top],[data-50-top],[data-top],[data-top-bottom],[data-center-top],[data--300-bottom],[data--150-bottom],[data--50-bottom],[data-bottom],[data-100-bottom],[data-150-bottom],[data-400-bottom],[data--400-bottom],[data--200-bottom],[data--100-bottom],[data-50-bottom],[data-200-bottom],[data-300-bottom],[data-in],[data-in-150],[data-in-300],[data-cen--150],[data-cen],[data-cen-150],[data-out--300],[data-out--150],[data-out][data-t],[data-t-100],[data-t-200],[data-t-300],[data-t-400],[data-t-500],[data-t-600],[data-t-700],[data-t-800],[data-t-900],[data-t-1000],[data-t-1100],[data-t-1200],[data-t-1300],[data-t-1400],[data-t-1500],[data-t-1600],[data-t-1700],[data-t-1800],[data-t-1900],[data-t-2000],[data-t-2100],[data-t-2200],[data-t-2300],[data-t-2400],[data-t-2500],[data-t-2600],[data-t-2700],[data-t-2800]", an = [
  ["data-bottom-top", "in", 0],
  ["data-400-bottom", "in", 50],
  ["data-300-bottom", "in", 100],
  ["data-200-bottom", "in", 150],
  ["data-150-bottom", "in", 200],
  ["data-100-bottom", "in", 250],
  ["data-50-bottom", "in", 300],
  ["data-bottom", "in", 350],
  ["data--50-bottom", "in", 400],
  ["data--100-bottom", "in", 450],
  ["data--150-bottom", "in", 500],
  ["data--200-bottom", "in", 550],
  ["data--300-bottom", "in", 600],
  ["data--400-bottom", "in", 650],
  ["data-center-top", "center", -300],
  ["data-center", "center", 0],
  ["data-center-bottom", "center", 100],
  ["data-100-top", "center", 200],
  ["data-50-top", "center", 300],
  ["data-top", "out", -300],
  ["data-top-bottom", "out", 0],
  ["data-in", "in", 0],
  ["data-in-150", "in", 150],
  ["data-in-300", "in", 300],
  ["data-cen--150", "center", -150],
  ["data-cen", "center", 0],
  ["data-cen-150", "center", 150],
  ["data-out--300", "out", -300],
  ["data-out--150", "out", -150],
  ["data-out", "out", 0]
  // replaced by m-data-out at vw<=970 (see collect)
], $e = [0];
for (let a = 100; a <= 2800; a += 100) $e.push(a);
function ln(a) {
  return a < 730 ? -200 : a >= 730 && a < 790 ? -100 : a >= 790 && a < 840 ? 0 : a >= 840 && a < 1125 ? 100 : 200;
}
function cn(a) {
  const e = /(\w+)\((.+?)\)/g, t = {};
  let i;
  for (; i = e.exec(a); )
    t[i[1]] = t[i[1]] ? t[i[1]].concat([i[2]]) : [i[2]];
  return t;
}
function He(a, e) {
  let t = {};
  const i = a.getAttribute(e);
  return i && i.split(";").forEach((n) => {
    if (n.indexOf("transform") !== -1 && (t = cn(n)), n.indexOf("opacity") !== -1) {
      const r = n.replace("opacity:", "").replace(";", "");
      t.opacity = [parseFloat(r)];
    }
  }), t;
}
function Oi(a, e, t, i) {
  if (e) {
    if (e.translateY) {
      let s;
      e.translateY[0].indexOf("%") !== -1 ? s = parseFloat(e.translateY[0]) / 100 * window.innerHeight : s = parseFloat(e.translateY[0]), (a.translateY || (a.translateY = [])).push({ anchor: t, offset: i, val: s });
    }
    if (e.translateX) {
      let s;
      e.translateX[0].indexOf("%") !== -1 ? s = parseFloat(e.translateX[0]) / 100 * window.innerWidth : s = parseFloat(e.translateX[0]), (a.translateX || (a.translateX = [])).push({ anchor: t, offset: i, val: s });
    }
    e.scale && (a.scale || (a.scale = [])).push({ anchor: t, offset: i, val: parseFloat(e.scale[0]) }), e.rotate && (a.rotate || (a.rotate = [])).push({ anchor: t, offset: i, val: parseFloat(e.rotate[0]) }), e.opacity && (a.opacity || (a.opacity = [])).push({ anchor: t, offset: i, val: parseFloat(e.opacity[0]) });
  }
}
function un(a, e) {
  const t = a.hasAttribute("data-xs"), i = a.hasAttribute("data-sm"), s = a.hasAttribute("data-md"), n = /* @__PURE__ */ new Map(), r = (l, u) => u === 0 ? l : l + "-" + u;
  if (e > 1280 || e > 970 && e <= 1280 && !s || e > 760 && e <= 970 && !i || e <= 760 && !t)
    for (const l of $e)
      n.set(l, He(a, r("data-t", l)));
  if (e > 970 && e <= 1280 && s)
    for (const l of $e) {
      const u = r("data-md-t", l);
      a.hasAttribute(u) && n.set(l, He(a, u));
    }
  if (e > 760 && e <= 970 && i || e <= 760 && !t && i)
    for (const l of $e) {
      const u = r("data-sm-t", l);
      a.hasAttribute(u) && n.set(l, He(a, u));
    }
  if (e <= 414 && t)
    for (const l of $e) {
      const u = r("data-xs-t", l);
      a.hasAttribute(u) && n.set(l, He(a, u));
    }
  return n;
}
function dn(a, e) {
  const t = {};
  for (const [n, r, o] of an) {
    let l;
    n === "data-out" && e <= 970 && a.hasAttribute("m-data-out") ? l = He(a, "m-data-out") : l = He(a, n), Object.keys(l).length !== 0 && Oi(t, l, r, o);
  }
  const i = un(a, e), s = ln(window.innerHeight);
  for (const n of $e) {
    const r = i.get(n);
    r && Object.keys(r).length !== 0 && Oi(t, r, "in", n + s);
  }
  return t;
}
function De() {
  return window.scrollY || window.pageYOffset || 0;
}
function hn(a) {
  const e = De(), t = a.getBoundingClientRect(), i = a.closest(".pin-wrap");
  let s;
  if (i && i.firstElementChild) {
    const o = i.getBoundingClientRect(), l = i.firstElementChild.getBoundingClientRect();
    s = o.top + e + (t.top - l.top);
  } else
    s = t.top + e;
  const n = t.height, r = window.innerHeight;
  return {
    in: s - r,
    center: s + n / 2 - r / 2,
    out: s + n
  };
}
function Ve(a, e) {
  const t = a.length;
  if (t === 0) return null;
  if (e <= a[0].pos) return a[0].val;
  if (e >= a[t - 1].pos) return a[t - 1].val;
  for (let i = 1; i < t; i++)
    if (e <= a[i].pos) {
      const s = a[i - 1], n = a[i], r = n.pos - s.pos;
      return r <= 0 ? n.val : s.val + (n.val - s.val) * ((e - s.pos) / r);
    }
  return a[t - 1].val;
}
const Ht = (a) => Math.round(a * 100) / 100, Ni = (a) => Math.round(a * 1e4) / 1e4;
class li {
  /**
   * @param {object} settings
   *   smoothing  : catch-up time constant in seconds for the scrub easing.
   *                ~0.1 matches the visual softness of the old CSS
   *                `transition: all .3s ease-out` (95% converged in ~0.3s)
   *                without the lag/overshoot. 0 = hard-lock everything.
   *   transition : accepted for constructor compatibility with the old
   *                Skrollrr class. Ignored as CSS (no CSS transition is
   *                ever applied); its presence merely means "smoothing on".
   */
  /* LEGACY CSS-TRANSITION MODE
   * ---------------------------
   * Legacy's softness was a TIME lag, not a keyframe shape: lax wrote the
   * exact value each frame and a CSS transition eased the element toward it.
   * Set this to reproduce that exactly — the engine then writes the true
   * scroll value (scrub off) and the browser does all the smoothing.
   * Scoped to transform/opacity (legacy used `all`, which would also smear
   * properties the fx engine writes). Empty string = Kinetra scrub instead. */
  static LEGACY_TRANSITION = "transform 0.3s ease-out, opacity 0.3s ease-out";
  constructor(e = {}) {
    const t = {
      smoothing: void 0,
      transition: void 0,
      legacyTransition: !0
      // false = pre-1.1 scrub behaviour
    };
    this.settings = Object.assign({}, t, e), this.legacyTransition = this.settings.legacyTransition === !1 ? "" : li.LEGACY_TRANSITION, typeof this.settings.smoothing != "number" && (this.settings.smoothing = this.settings.transition ? 0.1 : 0), this.legacyTransition && (this.settings.smoothing = 0), this.elements = [], this.records = [], this.engine = "kinetra", this._stopTicker = null, this._onResize = null, this._onLoad = null, this._soft = 0;
  }
  init() {
    if (this._stopTicker) return;
    this._soft = De(), this.refresh(), this._stopTicker = Ue.add((t) => this._tick(t));
    let e = null;
    this._onResize = () => {
      e && clearTimeout(e), e = setTimeout(() => this._remeasure(), 100);
    }, window.addEventListener("resize", this._onResize), document.readyState !== "complete" && (this._onLoad = () => this._remeasure(), window.addEventListener("load", this._onLoad, { once: !0 }));
  }
  /* Re-parse all attributes and rebuild every record.
   * Same contract as the old Skrollrr.refresh(). */
  refresh() {
    this.records.forEach((s) => {
      s.dead = !0;
      const n = s.elm;
      n.style && (n.style.transition && (n.style.transition = ""), n.style.transform && (n.style.transform = ""));
    }), this.records = [], this.elements = [];
    const e = document.body.hasAttribute("data-skrollrr-off"), t = window.innerWidth, i = document.querySelectorAll(on);
    i.forEach((s) => {
      s.style.transform = "";
    }), i.forEach((s) => {
      let n = !1;
      if (t <= 760 && s.closest(".m-skrollrr-off") && (n = !0), e || n) {
        s.style.transform = "", s.style.transition = "", s.style.opacity = "";
        return;
      }
      s.style.transition = "";
      const r = {
        elm: s,
        frames: dn(s, t),
        // prop -> [{anchor, offset, val}]
        resolved: null,
        // prop -> [{pos, val}] (sorted)
        hardLock: s.getAttribute("data-smooth-scrolling") === "off",
        lastTransform: null,
        lastOpacity: null,
        dead: !1
      };
      this._measure(r), this.records.push(r), this.elements.push(s), this._render(r, De()), setTimeout(() => {
        r.dead || (s.style.opacity = 1, r.lastOpacity = null, r.lastTransform = null, this.legacyTransition && !r.hardLock && (s.style.transition = this.legacyTransition));
      }, 100);
    }), this._soft = De();
  }
  destroy() {
    this._stopTicker && (this._stopTicker(), this._stopTicker = null), this._onResize && (window.removeEventListener("resize", this._onResize), this._onResize = null), this._onLoad && (window.removeEventListener("load", this._onLoad), this._onLoad = null), this.records.forEach((e) => {
      e.dead = !0, e.elm.style.transform = "", e.elm.style.transition = "";
    }), this.records = [], this.elements = [];
  }
  /* ---------- internals ---------- */
  _measure(e) {
    const t = hn(e.elm), i = {};
    for (const s in e.frames) {
      const n = e.frames[s].map((r) => ({
        pos: t[r.anchor] + r.offset,
        val: r.val
      }));
      n.sort((r, o) => r.pos - o.pos), i[s] = n;
    }
    e.resolved = i;
  }
  _remeasure() {
    const e = !!this.legacyTransition;
    for (const i of this.records)
      e && (i.elm.style.transition = ""), i.elm.style.transform = "", i.lastTransform = null;
    for (const i of this.records) this._measure(i);
    const t = De();
    this._soft = t;
    for (const i of this.records) this._render(i, t);
    e && setTimeout(() => {
      for (const i of this.records)
        i.dead || i.hardLock || (i.elm.style.transition = this.legacyTransition);
    }, 100);
  }
  _tick(e) {
    const t = De(), i = this.settings.smoothing;
    if (i > 0) {
      const s = 1 - Math.exp(-e / i);
      this._soft += (t - this._soft) * s, Math.abs(t - this._soft) < 0.05 && (this._soft = t);
    } else
      this._soft = t;
    for (const s of this.records)
      this._render(s, s.hardLock ? t : this._soft);
  }
  _render(e, t) {
    const i = e.resolved;
    if (!i) return;
    let s = "";
    if (i.translateX && (s += "translateX(" + Ht(Ve(i.translateX, t)) + "px) "), i.translateY && (s += "translateY(" + Ht(Ve(i.translateY, t)) + "px) "), i.rotate && (s += "rotate(" + Ht(Ve(i.rotate, t)) + "deg) "), i.scale && (s += "scale(" + Ni(Ve(i.scale, t)) + ")"), s = s.trim(), s !== e.lastTransform && (e.elm.style.transform = s, e.lastTransform = s), i.opacity) {
      const n = String(Ni(Ve(i.opacity, t)));
      n !== e.lastOpacity && (e.elm.style.opacity = n, e.lastOpacity = n);
    }
  }
}
/*!
 * focus-gate.js — v1.1.0
 *
 * Edit-state vs. play-state gating for DOM-restructuring animations inside a
 * contentEditable surface (ContentBox editor). Written from scratch.
 *
 * THE MODEL
 * ---------
 * Every gated element has two representations:
 *   • SOURCE form — the original, clean, editable markup. What the user types
 *     into and what serialization must see.
 *   • PLAY   form — the restructured markup used only to render the animation.
 *
 * Default is PLAY (so you see the animation while scrolling). An element drops
 * to SOURCE for exactly as long as its editing region owns the caret, then goes
 * back to PLAY when the caret leaves.
 *
 * ============================================================================
 * ISSUE → FIX MAP  (read this before changing anything below)
 * ============================================================================
 * Each of these guards fixes a specific, reproduced editing bug. They interact,
 * so removing or reordering one tends to bring another bug back. Touch with care.
 *
 * [1] TWO CLICKS TO PLACE THE CARET.
 *     Reverting a split element replaces its innerHTML, which detaches the node
 *     the browser was about to drop the caret into — the first click was wasted,
 *     the caret only landed on the second. FIX: on `pointerdown` (BEFORE the
 *     browser resolves focus) we revert to SOURCE, then place the caret at the
 *     click point ourselves via caretRangeFromPoint, with a one-frame retry in
 *     case ContentBox makes the block editable a tick later.
 *     → see _onPointerDown() + _placeCaretAtPoint() + _ensureCaret().
 *     DO NOT move the revert to focusin/mouseup — it must beat caret resolution.
 *
 * [2] CONTROLS (formatting icons) NEEDED A SECOND CLICK.
 *     Removing the pressed node during pointerdown can CANCEL the browser's
 *     native `click`, so ContentBuilder's handleCellClick (bound to click) never
 *     runs and its controls stay hidden. FIX: remember the gesture; if no real
 *     click arrives, synthesize one at the same point on pointerup so
 *     ContentBuilder activates the cell. Guarded so it never double-fires when
 *     the native click survives, and skipped on drag-select.
 *     → see _onPointerUp() + _synthClick() + _onClickCapture + _activateAt.
 *     ContentBuilder has NO isTrusted check, so a synthetic click is accepted.
 *
 * [3] FORMATTING PANEL CLICK RE-ANIMATED THE TEXT.
 *     Clicking Bold/underline in the panel blurred the text and re-split it.
 *     FIX: interactions inside `.keep-selection` (the panel) are ignored so the
 *     edit session stays alive and the element stays editable.
 *     → see _isKeepSelection() + guards in _onPointerDown/_onFocusIn/_onSelectionChange.
 *
 * [4] FIRST KEYSTROKE OK, THEN CARET JUMPED TO START.
 *     Undo snapshots fire on every content change. When beginSerialize used to
 *     teardown+rebuild the whole effects layer, the fresh gate forgot which
 *     element held the caret and re-split it mid-typing. FIX (in the EFFECTS
 *     module, not here): beginSerialize/endSerialize now call gate.suspend()/
 *     resume() — the gate object (and its active-edit memory) survives, so the
 *     element under the caret is never re-split. See contentbox-effects.js.
 *     This file's part: suspend()/resume() must NOT lose _activeEditable.
 *
 * [5] ANIMATION DIDN'T REPLAY WHEN EDITING FINISHED.
 *     Once the gate stopped being rebuilt (fix [4]), blur no longer reset the
 *     per-element reveal state, so the entrance never replayed. FIX: the gate
 *     records WHY an element left play form — editing vs. a transient suspend —
 *     and passes { replay } to toPlay so only "just finished editing" replays.
 *     → see _apply() (rec._leftForEdit) and toPlay(el, { replay }) in the
 *       effects module. Transient suspend/resume must pass replay:false.
 * ============================================================================
 *
 * Animation-agnostic: the caller supplies { toPlay, toSource } per element.
 * No dependencies. Runs in whatever document you hand it (the iframe doc).
 */
class pn {
  /**
   * @param {object}   cfg
   * @param {Element}  cfg.root              content root (e.g. .is-wrapper).
   * @param {Document} [cfg.doc=document]    document to listen on (iframe doc).
   * @param {string}   [cfg.editableSelector='[contenteditable="true"]']
   * @param {boolean}  [cfg.debug=false]
   */
  constructor(e = {}) {
    if (!e.root) throw new Error("FocusGate: `root` is required");
    this.root = e.root, this.doc = e.doc || document, this.win = this.doc.defaultView || window, this.editableSelector = e.editableSelector || '[contenteditable="true"]', this.keepSelectionSelector = e.keepSelectionSelector || ".keep-selection", this.debug = !!e.debug, this.effects = [], this._activeEditable = null, this._suspended = !1, this._raf = 0, this._activateAt = null, this._nativeClick = !1, this._onPointerDown = this._onPointerDown.bind(this), this._onFocusIn = this._onFocusIn.bind(this), this._onSelectionChange = this._onSelectionChange.bind(this), this._onPointerUp = this._onPointerUp.bind(this), this._onClickCapture = () => {
      this._nativeClick = !0;
    }, this.doc.addEventListener("pointerdown", this._onPointerDown, !0), this.doc.addEventListener("pointerup", this._onPointerUp, !0), this.doc.addEventListener("click", this._onClickCapture, !0), this.doc.addEventListener("focusin", this._onFocusIn, !0), this.doc.addEventListener("selectionchange", this._onSelectionChange);
  }
  /* ============================================================
   * Public API
   * ============================================================ */
  register(e, t) {
    if (!e || !t || typeof t.toPlay != "function" || typeof t.toSource != "function")
      throw new Error("FocusGate.register: need (el, { toPlay, toSource })");
    const i = { el: e, def: t, state: "source" };
    return this.effects.push(i), this._apply(i, this._desired(i)), i;
  }
  unregister(e) {
    const t = this.effects.findIndex((i) => i.el === e);
    t < 0 || (this._apply(this.effects[t], "source"), this.effects.splice(t, 1));
  }
  /* Serialization window — force everything to clean source and ignore focus.
   * [issue 4] Called by the effects module's beginSerialize()/endSerialize().
   * CRUCIAL: these keep the gate object alive (unlike a teardown+rebuild), so
   * _activeEditable — the element under the caret — is preserved across an undo
   * snapshot. If you ever make these destroy/recreate the gate, the element the
   * user is typing in gets re-split mid-keystroke and the caret jumps to start. */
  suspend() {
    if (!this._suspended) {
      this._suspended = !0;
      for (const e of this.effects) this._apply(e, "source");
      this._log("suspended → all source");
    }
  }
  resume() {
    this._suspended && (this._suspended = !1, this._reconcile(), this._log("resumed"));
  }
  refresh() {
    this._reconcile();
  }
  destroy() {
    this.doc.removeEventListener("pointerdown", this._onPointerDown, !0), this.doc.removeEventListener("pointerup", this._onPointerUp, !0), this.doc.removeEventListener("click", this._onClickCapture, !0), this.doc.removeEventListener("focusin", this._onFocusIn, !0), this.doc.removeEventListener("selectionchange", this._onSelectionChange), this._raf && (cancelAnimationFrame(this._raf), this._raf = 0);
    for (const e of this.effects) this._apply(e, "source");
    this.effects = [], this._activeEditable = null;
  }
  /* ============================================================
   * Edit-region resolution
   * ============================================================ */
  _editableOf(e) {
    return e ? (e.nodeType !== 1 && (e = e.parentElement), e ? e.closest(this.editableSelector) : null) : null;
  }
  /** [issue 3] Is this node part of the editor's formatting panel
   *  (.keep-selection)? Clicks/focus there must NOT end the edit session, or the
   *  text re-splits and re-animates while you're applying Bold/underline/etc. */
  _isKeepSelection(e) {
    return !this.keepSelectionSelector || !e ? !1 : (e.nodeType !== 1 && (e = e.parentElement), !!(e && e.closest(this.keepSelectionSelector)));
  }
  /** If a node sits inside a registered effect that has no editable ancestor
   *  yet (ContentBox may attach contentEditable on click), use that element. */
  _registeredElOf(e) {
    for (const t of this.effects)
      if (t.el === e || t.el.contains(e)) return t.el;
    return null;
  }
  _overlaps(e, t) {
    return e === t || e.contains(t) || t.contains(e);
  }
  _isEdited(e) {
    const t = this._activeEditable;
    return !t || !this.doc.contains(t) ? !1 : this._overlaps(t, e);
  }
  _desired(e) {
    return this._suspended ? "source" : this.root.contains(e.el) ? this._isEdited(e.el) ? "source" : "play" : "dead";
  }
  /* ============================================================
   * State application
   * ============================================================ */
  _apply(e, t) {
    if (t === "dead") {
      this._apply(e, "source"), e._dead = !0;
      return;
    }
    if (e.state !== t)
      try {
        t === "source" ? (e.def.toSource(e.el), e.state = "source", e._leftForEdit = this._isEdited(e.el)) : (e.def.toPlay(e.el, { replay: !!e._leftForEdit }), e.state = "play", e._leftForEdit = !1);
      } catch (i) {
        this.debug && console.warn("[focus-gate] effect threw during", t, i);
      }
  }
  _reconcile() {
    for (let e = this.effects.length - 1; e >= 0; e--) {
      const t = this.effects[e];
      if (!this.root.contains(t.el)) {
        this._apply(t, "source"), this.effects.splice(e, 1);
        continue;
      }
      this._apply(t, this._desired(t));
    }
  }
  _scheduleReconcile() {
    this._raf || (this._raf = requestAnimationFrame(() => {
      this._raf = 0, this._reconcile();
    }));
  }
  _setActiveEditable(e) {
    this._activeEditable !== e && (this._activeEditable = e, this._log("active editable →", e && e.tagName), this._reconcile());
  }
  /* ============================================================
   * Caret placement — [issue 1] the single-click fix
   * ------------------------------------------------------------
   * Because we replace innerHTML on pointerdown, the browser's own caret
   * placement is thrown away (its target node is gone). So we compute and set
   * the caret ourselves from the click coordinates, on the freshly-reverted DOM.
   * ============================================================ */
  /** Place a collapsed caret at viewport point (x, y) on the CURRENT DOM. */
  _placeCaretAtPoint(e, t, i) {
    const s = this.doc;
    let n = null;
    if (s.caretRangeFromPoint)
      n = s.caretRangeFromPoint(t, i);
    else if (s.caretPositionFromPoint) {
      const u = s.caretPositionFromPoint(t, i);
      u && u.offsetNode && (n = s.createRange(), n.setStart(u.offsetNode, u.offset), n.collapse(!0));
    }
    if (!n || e && e.nodeType === 1 && e !== n.startContainer && !e.contains(n.startContainer))
      return !1;
    const r = n.startContainer.nodeType === 1 ? n.startContainer : n.startContainer.parentElement, o = e && e.isContentEditable ? e : r && r.closest ? r.closest(this.editableSelector) : null;
    if (o && this.doc.activeElement !== o)
      try {
        o.focus({ preventScroll: !0 });
      } catch {
        o.focus();
      }
    const l = s.getSelection ? s.getSelection() : this.win.getSelection();
    return l ? (l.removeAllRanges(), l.addRange(n), !0) : !1;
  }
  /** Try now; if it fails (host not editable yet), retry once next frame. */
  _ensureCaret(e, t, i) {
    this._placeCaretAtPoint(e, t, i) || requestAnimationFrame(() => {
      const s = e && this.doc.contains(e) ? e : this._activeEditable;
      s && this._placeCaretAtPoint(s, t, i);
    });
  }
  /* ============================================================
   * Event handlers
   * ============================================================ */
  _onPointerDown(e) {
    if (this._suspended || e.button != null && e.button !== 0) return;
    const t = e.target;
    if (!t || this._isKeepSelection(t) || !this.root.contains(t)) return;
    const i = this._editableOf(t) || this._registeredElOf(t);
    if (!i) {
      this._setActiveEditable(null);
      return;
    }
    this._activeEditable = i;
    const s = [];
    for (const n of this.effects)
      n.state === "play" && this._overlaps(i, n.el) && s.push(n);
    if (s.length) {
      const n = e.clientX, r = e.clientY;
      for (const o of s) this._apply(o, "source");
      this._ensureCaret(i, n, r), this._activateAt = { x: n, y: r }, this._nativeClick = !1;
    }
    this._scheduleReconcile();
  }
  // [issue 2] Controls-activation recovery. Runs a frame after pointerup: if a
  // real click reached ContentBuilder (_nativeClick set by our capture listener)
  // we do nothing; if the native click was cancelled by the mid-gesture DOM
  // change, we fire a synthetic one so the cell activates and its icons show.
  _onPointerUp(e) {
    const t = this._activateAt;
    if (this._activateAt = null, !t) return;
    const i = e.clientX - t.x, s = e.clientY - t.y;
    i * i + s * s > 36 || requestAnimationFrame(() => {
      this._nativeClick || this._synthClick(t.x, t.y);
    });
  }
  /** [issue 2] Re-fire a click ContentBuilder can act on, at point (x, y).
   *  Safe because ContentBuilder does not check event.isTrusted. */
  _synthClick(e, t) {
    const i = this.doc.elementFromPoint(e, t);
    if (!i || !this.root.contains(i)) return;
    const s = this.win.MouseEvent || MouseEvent;
    i.dispatchEvent(new s("click", {
      bubbles: !0,
      cancelable: !0,
      view: this.win,
      clientX: e,
      clientY: t,
      button: 0
    }));
  }
  _onFocusIn(e) {
    if (this._suspended || this._isKeepSelection(e.target) || !this.root.contains(e.target)) return;
    const t = this._editableOf(e.target);
    t && this._setActiveEditable(t);
  }
  _onSelectionChange() {
    if (this._suspended) return;
    const e = this.doc.getSelection && this.doc.getSelection();
    if (!e || e.rangeCount === 0 || this._isKeepSelection(e.anchorNode)) return;
    const t = this._editableOf(e.anchorNode);
    t && t !== this._activeEditable && this._setActiveEditable(t);
  }
  _log(...e) {
    this.debug && console.log("[focus-gate]", ...e);
  }
}
/*!
 * fx-path.js — motion-path frames for contentbox-effects (data-fx-path)
 *
 * WHAT THIS IS
 * ------------
 * A build-time-style "motion path" compiler that runs at refresh() time.
 * It reads a small authored attribute and expands it — IN MEMORY ONLY —
 * into the same per-percent keyframes the engine already consumes, so the
 * element moves along a smooth curve through a set of waypoints.
 *
 * Nothing is written to the DOM. The saved page contains only the author's
 * attribute; builder.html(), undo snapshots and exports are untouched.
 * The emitted keys are x / y (and optionally rotate) — all inside the
 * editor's inline-allowed property set, so editor preview works unchanged.
 *
 * AUTHORING
 * ---------
 *   data-fx-path="250,-140; -260,20 @60,320; 240,120; -250,-60; 255,60"
 *       Waypoints as "x,y" px offsets from the element's natural position,
 *       separated by ';'. Any point MAY carry an explicit tangent "@tx,ty"
 *       (direction & strength of travel through that point). Points without
 *       a tangent get a Catmull-Rom tangent automatically.
 *
 *   data-fx-path-times="0,25,50,75,100"      optional
 *       Scene progress (0–100) at which each waypoint is reached. Must be
 *       strictly increasing, start at 0, end at 100, and match the waypoint
 *       count. Default: even spacing.
 *
 *   data-fx-path-curve="1"                   optional, default 1
 *       Tension for auto (Catmull-Rom) tangents. 0 = straight polyline,
 *       1 = classic Catmull-Rom, >1 = rounder, swoopier arcs.
 *
 *   data-fx-path-dwell="0.78"                optional, default 0.78
 *       How much the object lingers near waypoints. 0 = constant pace,
 *       1 = comes to a full stop at every waypoint. The default drifts:
 *       it slows near each waypoint but never quite stops.
 *
 *   data-fx-path-rotate / data-fx-path-rotate="90"   optional
 *       Orient the element along the path tangent (auto-rotate). The value
 *       is an offset in degrees added to the tangent angle (bare = 0).
 *       An artwork drawn pointing RIGHT needs 0; pointing UP needs 90.
 *
 *   data-fx-path-step="1"                    optional, default 1
 *       Sampling density in whole percent (1–10). 1 = maximally smooth.
 *
 * OWNERSHIP RULE
 * --------------
 * When a path is present it OWNS x and y (and rotate, when auto-rotate is
 * on). Literal data-fx-N values for owned keys on the same element are
 * dropped with a console warning; all other literal properties (opacity,
 * colors, clip-path, scale, ...) merge and animate alongside the path.
 *
 * INTEGRATION (see [FX-PATH] markers in contentbox-effects.js)
 * ------------------------------------------------------------
 *   import { pathFrames } from './fx-path.js';
 *   // inside collectKeyframes(elm):  merge pathFrames(elm) with literal
 *   // frames; inside _hasKf(el):     treat data-fx-path as keyframes.
 *
 * Pure functions, no state, no listeners, no DOM writes. Any parse error
 * warns and returns null — the element simply behaves as if the attribute
 * were absent. Removing this file (and its 3 marked call sites) restores
 * the previous engine byte-for-byte.
 */
const me = "data-fx-path", Ii = /* @__PURE__ */ new WeakMap();
function zt(a, e, ...t) {
  let i = Ii.get(a);
  i || (i = /* @__PURE__ */ new Set(), Ii.set(a, i)), !i.has(e) && (i.add(e), console.warn(...t));
}
const ot = (a, e) => {
  const t = parseFloat(a);
  return Number.isFinite(t) ? t : e;
};
function fn(a) {
  const e = a.trim().match(
    /^(-?\d*\.?\d+)\s*,\s*(-?\d*\.?\d+)(?:\s*@\s*(-?\d*\.?\d+)\s*,\s*(-?\d*\.?\d+))?$/
  );
  return e ? {
    p: [parseFloat(e[1]), parseFloat(e[2])],
    t: e[3] !== void 0 ? [parseFloat(e[3]), parseFloat(e[4])] : null
  } : null;
}
function gn(a, e) {
  if (a == null)
    return Array.from({ length: e }, (i, s) => 100 * s / (e - 1));
  const t = String(a).split(",").map((i) => parseFloat(i));
  if (t.length !== e || t.some((i) => !Number.isFinite(i)) || t[0] !== 0 || t[e - 1] !== 100) return null;
  for (let i = 1; i < e; i++) if (t[i] <= t[i - 1]) return null;
  return t;
}
function mn(a, e) {
  const t = a.length, i = a.map((r) => r.p), s = (r) => r === 0 ? [2 * i[0][0] - i[1][0], 2 * i[0][1] - i[1][1]] : i[r - 1], n = (r) => r === t - 1 ? [2 * i[t - 1][0] - i[t - 2][0], 2 * i[t - 1][1] - i[t - 2][1]] : i[r + 1];
  return a.map((r, o) => r.t || [
    e * (n(o)[0] - s(o)[0]) / 2,
    e * (n(o)[1] - s(o)[1]) / 2
  ]);
}
function yn(a, e, t, i, s) {
  const n = s * s, r = n * s, o = 2 * r - 3 * n + 1, l = r - 2 * n + s, u = -2 * r + 3 * n, d = r - n;
  return [
    o * a[0] + l * e[0] + u * t[0] + d * i[0],
    o * a[1] + l * e[1] + u * t[1] + d * i[1]
  ];
}
function bn(a, e, t, i, s) {
  const n = s * s, r = 6 * n - 6 * s, o = 3 * n - 4 * s + 1, l = -6 * n + 6 * s, u = 3 * n - 2 * s;
  return [
    r * a[0] + o * e[0] + l * t[0] + u * i[0],
    r * a[1] + o * e[1] + l * t[1] + u * i[1]
  ];
}
function vn(a, e) {
  const t = 6 * a ** 5 - 15 * a ** 4 + 10 * a ** 3;
  return e * t + (1 - e) * a;
}
function wn(a) {
  if (!a.hasAttribute || !a.hasAttribute(me)) return null;
  try {
    const e = a.getAttribute(me) || "", t = e.split(";").map(fn);
    if (t.length < 2 || t.some((y) => y === null))
      return zt(
        a,
        "points:" + e,
        "[fx-path] ignoring invalid " + me + ' (need >= 2 "x,y" points, optionally "@tx,ty" each): "' + e + '"',
        a
      ), null;
    const i = gn(a.getAttribute(me + "-times"), t.length);
    if (!i)
      return zt(
        a,
        "times:" + String(a.getAttribute(me + "-times")),
        "[fx-path] ignoring invalid " + me + "-times (must match the waypoint count, be strictly increasing, start at 0 and end at 100)",
        a
      ), null;
    const s = Math.max(ot(a.getAttribute(me + "-curve"), 1), 0), n = Math.min(Math.max(ot(a.getAttribute(me + "-dwell"), 0.78), 0), 1), r = Math.min(Math.max(Math.round(ot(a.getAttribute(me + "-step"), 1)), 1), 10), o = a.getAttribute(me + "-rotate"), l = o !== null, u = l ? ot(o, 0) : 0, d = mn(t, s), c = t.map((y) => y.p), h = [];
    let p = null;
    for (let y = 0; y <= 100; y += r) {
      let _ = 0;
      for (; _ < i.length - 2 && y > i[_ + 1]; ) _++;
      const g = i[_ + 1] - i[_], v = Math.min(Math.max((y - i[_]) / g, 0), 1), m = vn(v, n), [b, w] = yn(c[_], d[_], c[_ + 1], d[_ + 1], m), x = {
        x: Math.round(b * 100) / 100 + "px",
        y: Math.round(w * 100) / 100 + "px"
      };
      if (l) {
        const [k, S] = bn(c[_], d[_], c[_ + 1], d[_ + 1], m);
        let T = Math.atan2(S, k) * (180 / Math.PI) + u;
        if (p !== null) {
          for (; T - p > 180; ) T -= 360;
          for (; T - p < -180; ) T += 360;
        }
        p = T, x.rotate = Math.round(T * 100) / 100 + "deg";
      }
      h.push({ pct: y, vars: x });
    }
    if (h[h.length - 1].pct !== 100) {
      const y = c[c.length - 1], _ = {
        x: Math.round(y[0] * 100) / 100 + "px",
        y: Math.round(y[1] * 100) / 100 + "px"
      };
      l && p !== null && (_.rotate = Math.round(p * 100) / 100 + "deg"), h.push({ pct: 100, vars: _ });
    }
    const f = new Set(l ? ["x", "y", "rotate"] : ["x", "y"]);
    return { frames: h, owned: f };
  } catch (e) {
    return zt(a, "fail", "[fx-path] failed to build path, ignoring attribute", a, e), null;
  }
}
/*!
 * contentbox-effects.js — v1.7.0
 *
 * The "advanced animation" layer for the ContentBox Runtime, powered by
 * Kinetra. It adds a NEW, namespaced attribute vocabulary (data-fx-*) for
 * content, alongside — never instead of — the legacy skrollrr attributes.
 *
 * DESIGN PRINCIPLES
 * -----------------
 * 1. ADDITIVE ONLY. The module scans for data-fx-* attributes and does
 *    nothing at all on pages that don't use them. Existing content is
 *    untouched by construction.
 * 2. ATTRIBUTES ARE THE SOURCE OF TRUTH (contentEditable-safe). Animation
 *    state lives in attributes; the engine writes inline styles at view
 *    time, exactly like the legacy system.
 * 3. EDITOR PREVIEW MODES (`editorPreview`, booleans accepted as aliases):
 *    'off'  (false) — the module is inert while editing.
 *    'safe' (true, DEFAULT) — full visual preview with zero unsafe writes:
 *           transform/opacity animate inline (the two properties the
 *           ContentBox ecosystem manages at save — empirically, saved
 *           content carries no inline transform/opacity animation styles);
 *           every other keyframed property (clip-path, colors, ...) animates
 *           through a hidden mirror element + a runtime-owned <head>
 *           stylesheet with structural selectors, so the content DOM never
 *           gains a character. Split text previews through the FocusGate
 *           (editable while animating); other DOM-restructuring presets
 *           (typewriter, marquee, draw) and pointer presets render statically.
 *    'full' — production-like preview: DOM presets animate too. ONLY safe
 *           when the editor wraps serialization AND undo/redo snapshots in
 *           the beginSerialize()/endSerialize() hooks; without them, saves
 *           can persist split spans or truncated typewriter text.
 * 4. PINNING STAYS CSS. Pinned scenes ride the existing `.pin-wrap` +
 *    position:sticky mechanism. Scenes use the pin-wrap as their trigger
 *    (it is static, so measurement is scroll-invariant). Kinetra's own
 *    `pin:` option is never used.
 * 5. PROGRESS, NOT PIXELS. New keyframes are expressed as percent-of-scene
 *    progress (data-fx-0 … data-fx-100), so they are resolution-independent
 *    — no viewport-height buckets, ever.
 *
 * THE CONTENT CONTRACT (what page builders write)
 * -----------------------------------------------
 * Scene options (on the .is-section):
 *   data-fx-scrub="0.25"     smoothing seconds; "0" or "true" = hard-locked
 *   data-fx-start / data-fx-end   (non-pinned only) Kinetra edge strings,
 *                            defaults 'top bottom' / 'bottom top'
 *   data-fx-length="300"     (pinned only) pin length in vh — sets the
 *                            runtime-generated .pin-wrap height inline
 *   data-fx-emit             dispatch 'fx:progress' CustomEvents on the
 *                            section (the plugin/canvas/WebGL hook)
 *
 * Keyframes (on any element inside a section):
 *   data-fx-0="opacity:0; transform:translateY(40px)"
 *   data-fx-35="opacity:1; transform:none"
 *   data-fx-ease="expoOut"   segment easing (default 'linear' for scrub feel)
 *
 *   Numbers are percent of scene progress. Declarations are CSS-ish:
 *   transform shorthand is parsed into Kinetra's composed transform
 *   (translateX/Y/Z, scale, scaleX/Y, rotate, rotateX/Y, skewX/Y), and any
 *   other property is camelCased and handed to Kinetra's tween plumbing —
 *   so clip-path, background-color, color, border-color, box-shadow,
 *   letter-spacing, stroke-dashoffset, filter-free numeric+unit values and
 *   colors all tween. Bare Kinetra keys work too: data-fx-0="y:40; scale:.9".
 *   NOTE: '%' in translate is relative to the ELEMENT (Kinetra semantics),
 *   unlike the legacy attributes where '%' meant viewport.
 *
 * Presets (single attributes, implemented below):
 *   data-fx-parallax="120"           px travel over the element's transit
 *   data-fx-horizontal               vertical scroll → horizontal track
 *   data-fx-split="words|chars"      staggered text entrance
 *     data-fx-split-mask             clip each word in an overflow mask
 *     data-fx-split-stagger="0.08"   seconds between items
 *     data-fx-split-scrub            scrub the reveal through the (pinned)
 *                                    scene instead of playing on enter
 *     data-fx-split-from="0.12"      scrub mode: starting opacity
 *   data-fx-typewriter               scrollbar types the element's text
 *     data-fx-typewriter-until=".85" progress at which typing completes
 *   data-fx-draw                     SVG paths draw themselves (scrub)
 *   data-fx-tilt  [data-fx-tilt-max="14"]        pointer 3D tilt
 *   data-fx-magnetic [data-fx-magnetic-strength=".35"]  magnetic pull
 *   data-fx-marquee [data-fx-marquee-speed="90"] [data-fx-marquee-lean]
 *                                    drifting band, velocity-reactive lean
 *
 * MIXING RULE: an element carries legacy attributes OR data-fx-* — never
 * both. Both systems compose the full transform string; the module skips
 * (and warns about) elements that mix.
 */
const {
  setNow: he,
  sequence: Bt,
  scrollScene: Xe,
  ScrollScene: Ft,
  ticker: at
} = bs, vs = /^data-fx-(\d{1,3})$/, Di = /* @__PURE__ */ new WeakSet(), _n = [
  "data-bottom-top",
  "data-center",
  "data-top-bottom",
  "data-top",
  "data-in",
  "data-cen",
  "data-out",
  "data-t",
  "data-t-100",
  "data-t-200",
  "data-t-300",
  "data-t-400",
  "data-t-500",
  "data-t-700",
  "data-t-1000"
], $i = {
  translatex: "x",
  translatey: "y",
  translatez: "z",
  perspective: "perspective",
  rotate: "rotate",
  rotatex: "rotateX",
  rotatey: "rotateY",
  skewx: "skewX",
  skewy: "skewY",
  scalex: "scaleX",
  scaley: "scaleY"
}, Et = /* @__PURE__ */ new Set([
  "x",
  "y",
  "z",
  "perspective",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "skewX",
  "skewY"
]), xn = {
  x: 0,
  y: 0,
  z: 0,
  perspective: 0,
  scale: 1,
  scaleX: 1,
  scaleY: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  skewX: 0,
  skewY: 0
}, kn = (a) => a.trim().replace(/-([a-z])/g, (e, t) => t.toUpperCase()), ie = (a, e) => {
  const t = parseFloat(a);
  return Number.isFinite(t) ? t : e;
};
function Sn() {
  return document.body.classList.contains("data-editor") || !!document.querySelector(".is-wrapper.is-edit");
}
function En(a) {
  return _n.some((e) => a.hasAttribute(e));
}
function Tn(a) {
  const e = {};
  let t = !1;
  for (const i of String(a).split(";")) {
    const s = i.trim();
    if (!s) continue;
    const n = s.indexOf(":");
    if (n === -1) continue;
    const r = kn(s.slice(0, n)), o = s.slice(n + 1).trim();
    if (o)
      if (r === "transform") {
        if (o === "none") {
          t = !0;
          continue;
        }
        const l = /([a-zA-Z0-9]+)\(([^)]*)\)/g;
        let u;
        for (; u = l.exec(o); ) {
          const d = u[1].toLowerCase(), c = u[2].split(",").map((h) => h.trim());
          d === "scale" ? c.length > 1 ? (e.scaleX = c[0], e.scaleY = c[1]) : e.scale = c[0] : d === "translate" ? (c[0] !== void 0 && (e.x = c[0]), c[1] !== void 0 && (e.y = c[1])) : $i[d] && (e[$i[d]] = c[0]);
        }
      } else Et.has(r), e[r] = o;
  }
  return t && (e.__transformNone = !0), e;
}
function Cn(a) {
  const e = [];
  for (const s of a.attributes) {
    const n = vs.exec(s.name);
    if (!n) continue;
    const r = parseInt(n[1], 10);
    r < 0 || r > 100 || e.push({ pct: r, vars: Tn(s.value) });
  }
  const t = wn(a);
  if (t) {
    let s = !1;
    for (const n of e)
      for (const r of t.owned)
        r in n.vars && (delete n.vars[r], s = !0);
    s && !Di.has(a) && (Di.add(a), console.warn("[fx-path] data-fx-path owns " + [...t.owned].join("/") + " on this element; conflicting literal data-fx-N values for those keys were ignored", a)), e.push(...t.frames);
  }
  if (!e.length) return null;
  e.sort((s, n) => s.pct - n.pct);
  const i = /* @__PURE__ */ new Set();
  for (const s of e)
    for (const n of Object.keys(s.vars)) Et.has(n) && i.add(n);
  for (const s of e)
    if (s.vars.__transformNone) {
      delete s.vars.__transformNone;
      for (const n of i)
        n in s.vars || (s.vars[n] = xn[n]), t && t.owned.has(n) && delete s.vars[n];
    }
  return e;
}
function Ln(a) {
  const e = a.parentElement && a.parentElement.classList.contains("pin-wrap") ? a.parentElement : null;
  let t = 0.25;
  const i = a.getAttribute("data-fx-scrub");
  if (i !== null) {
    const r = i.trim().toLowerCase();
    r === "off" || r === "none" || r === "false" ? t = !1 : r === "" || r === "true" || r === "0" ? t = !0 : t = Math.max(ie(i, 0.25), 0.01);
  }
  const s = a.hasAttribute("data-fx-once"), n = Math.max(ie(a.getAttribute("data-fx-duration"), 1), 0.05);
  if (e) {
    const r = a.getAttribute("data-fx-length"), o = ie(r, 0);
    return r && o > 0 ? e.style.setProperty("height", o + "vh", "important") : e.style.removeProperty("height"), {
      pinned: !0,
      wrap: e,
      trigger: e,
      // start: 'top top',
      // end: 'bottom bottom',
      // start: section.getAttribute('data-fx-start') || 'top bottom',
      /* 'bottom bottom' = progress 100 when the section's bottom reaches the
      * viewport bottom, i.e. the moment it's fully in view.
      *
      * The old default was 'bottom top' — progress 100 only once the section
      * had scrolled entirely OFF the top. On the last section of a page that
      * point is unreachable: max scroll leaves progress at h/(h+vh), so the
      * animation could never finish. It also meant every entrance kept
      * animating long after you'd arrived. */
      // end: section.getAttribute('data-fx-end') || 'bottom bottom',
      /* HARDCODED, and must stay that way. The trigger here is the
       * pin-wrap, not the section — so these describe the PIN's geometry:
       * progress 0 when the wrap's top meets the viewport top (the pin
       * engages), progress 100 when its bottom meets the viewport bottom
       * (the pin releases). That's the definition of a pin, not a
       * preference — which is also why the Scene panel hides Start/End on
       * pinned sections. */
      start: "top top",
      end: "bottom bottom",
      scrub: t,
      once: s,
      duration: n
    };
  }
  return {
    pinned: !1,
    wrap: null,
    trigger: a,
    start: a.getAttribute("data-fx-start") || "top bottom",
    // end: section.getAttribute('data-fx-end') || 'bottom top',
    end: a.getAttribute("data-fx-end") || "bottom bottom",
    scrub: t,
    once: s,
    duration: n
  };
}
function Hi(a, e = {}) {
  const t = e.by === "chars" ? "chars" : "words", i = !!e.mask, s = a.innerHTML, n = a.textContent, r = [], o = [];
  function l(p, f) {
    for (const y of Array.from(p.childNodes))
      if (y.nodeType === 3)
        for (const _ of y.nodeValue.split(/(\s+)/)) {
          if (!_) continue;
          if (/^\s+$/.test(_)) {
            f.appendChild(document.createTextNode(_));
            continue;
          }
          const g = document.createElement("span");
          if (g.className = "kinetra-word", g.style.display = "inline-block", g.style.textDecoration = "inherit", t === "chars")
            for (const v of _) {
              const m = document.createElement("span");
              m.className = "kinetra-char", m.style.display = "inline-block", m.style.textDecoration = "inherit", m.textContent = v, g.appendChild(m), o.push(m);
            }
          else
            g.textContent = _;
          r.push(g), f.appendChild(g);
        }
      else if (y.nodeType === 1) {
        const _ = y.cloneNode(!1);
        f.appendChild(_), l(y, _);
      }
  }
  const u = document.createDocumentFragment();
  l(a, u), a.innerHTML = "", a.appendChild(u);
  const d = t === "chars" ? o : r;
  if (i)
    for (const p of d) {
      const f = document.createElement("span");
      f.className = "kinetra-mask", f.style.display = "inline-block", f.style.overflow = "hidden", f.style.verticalAlign = "top", f.style.textDecoration = "inherit", f.style.paddingBottom = "0.15em", f.style.marginBottom = "-0.15em", p.parentNode.insertBefore(f, p), f.appendChild(p);
    }
  const c = a.hasAttribute("aria-label"), h = a.getAttribute("aria-label");
  a.setAttribute("aria-label", n);
  for (const p of a.children) p.setAttribute("aria-hidden", "true");
  return {
    element: a,
    words: r,
    chars: o,
    targets: d,
    revert() {
      a.innerHTML = s, c ? a.setAttribute("aria-label", h) : a.removeAttribute("aria-label");
    }
  };
}
class An {
  constructor(e = {}) {
    this.settings = Object.assign({
      root: ".is-wrapper",
      // where content lives
      defaultEase: "linear",
      editorPreview: "safe"
      // 'off' | 'safe' | 'full' — see header
    }, e);
    const t = this.settings.editorPreview;
    this.settings.editorPreview = t === !1 || t === "off" ? "off" : t === "full" ? "full" : "safe", this.scenes = [], this.reverts = [], this.tickers = [], this.active = !1, this.editor = !1, this._previewStyle = null, this._mirrorHost = null, this.gate = null, this.textFx = [], typeof window < "u" && !window.kinetra && (window.kinetra = bs);
  }
  init() {
    this.refresh();
  }
  /* ---------- serialize hooks (for ContentBox's builder.html()) ----------
   * DOM-restructuring presets (split) leave the element you are NOT editing
   * in play form (split into spans) so the animation shows while scrolling.
   * Anything that reads the live DOM — builder.html(), export(), undo
   * snapshots — must see the ORIGINAL markup, so wrap those reads with:
   *
   *   iframeWin.fx.beginSerialize();   // reverts split spans to clean source
   *   const html = ...serialize...     // pristine, attribute-only content
   *   iframeWin.fx.endSerialize();     // re-applies the live preview
   *
   * These SUSPEND/RESUME the FocusGate rather than tearing down and rebuilding
   * the whole effects layer. That matters during editing: undo snapshots fire
   * on every content change, and a full rebuild would create a fresh gate with
   * no memory of the element under the caret — re-splitting it mid-keystroke
   * and throwing the caret to the start. Suspend keeps the gate (and the
   * active-edit element) intact; the element you're typing in is never
   * re-split. Transform/opacity keyframes are already save-safe (ContentBox
   * strips them) and other keyframed properties never touch the content DOM
   * (mirror + head stylesheet), so only the gated split needs reverting here.
   */
  beginSerialize() {
    this._serializing = !0, this.gate && this.gate.suspend();
  }
  endSerialize() {
    this._serializing = !1, this.gate && this.gate.resume();
  }
  refresh() {
    this.teardown(), this.editor = Sn();
    const e = this.settings.editorPreview;
    if (this.fullPreview = this.editor && e === "full", this.editor && e === "off") return;
    const t = document.querySelector(this.settings.root) || document.body;
    this.editor && !this.gate && (this.gate = new pn({ root: t, doc: document })), t.querySelectorAll(".is-section").forEach((s) => this._buildSection(s)), this._buildPointerPresets(t), this.active = !0, Ft.refreshAll();
  }
  destroy() {
    this.teardown();
  }
  /* ============================================================
   * EDITOR PLAYHEAD API  (consumed by the Motion dock)
   *
   * A scene's animation is a paused Kinetra sequence that scroll normally
   * drives. previewScene() takes that driving away for ONE section and
   * hands it to the caller, so the editor can seek to any progress without
   * scrolling the page. releaseScene() gives it back.
   * ============================================================ */
  /** Every live scene built from `section`. Compacts dead scenes as it goes. */
  scenesFor(e) {
    return this.scenes = this.scenes.filter((t) => !t._killed), this.scenes.filter((t) => t._section === e);
  }
  isPreviewing(e) {
    return this.scenesFor(e).some((t) => t._preview);
  }
  /**
   * Seek one section's scenes to `p` (0..1). Freezes scroll driving
   * (ScrollScene._update early-returns on _preview) and stamps values
   * directly. Fires each scene's onProgress too — that is what keeps the
   * editor's mirror/CSSOM preview (clip-path, colours, …) in sync.
   */
  previewScene(e, t) {
    const i = Math.min(Math.max(Number(t) || 0, 0), 1);
    for (const s of this.scenesFor(e)) {
      s._preview = !0;
      const n = s.animation || s.previewAnimation;
      n && (n.pause && n.pause(), n.progress(i)), s._progress = i, s._smoothed = i, s._targetP = i, s._lastP = i, s.opts && s.opts.onProgress && s.opts.onProgress(i, s);
    }
    return i;
  }
  /**
   * Replay a section's time-based text effects.
   *
   * Split text is NOT scroll-driven — it plays on view, at its own pace. So
   * the playhead deliberately leaves it alone: dragging to 40% must not fake
   * a scrub the published page will never do. Pressing Play from 0 is the one
   * moment where playing it for real is the honest thing to show.
   */
  playTextEffects(e) {
    for (const t of this.textFx)
      t.section === e && typeof t.handle.replay == "function" && t.handle.replay();
  }
  /**
   * Hand the section back to the scrollbar. A full refresh() is the honest
   * way home: it restores every element's resting state (first keyframe),
   * rebuilds the scenes, and re-syncs them to the real scroll position.
   */
  releaseScene(e) {
    let t = !1;
    for (const i of this.scenesFor(e))
      i._preview && (i._preview = !1, t = !0);
    t && this.refresh();
  }
  releaseAll() {
    let e = !1;
    for (const t of this.scenes)
      t._preview && (t._preview = !1, e = !0);
    e && this.refresh();
  }
  teardown() {
    for (const e of this.scenes) e.kill();
    this.scenes = [];
    for (const e of this.tickers) e();
    this.tickers = [];
    for (const e of this.reverts.reverse())
      try {
        e();
      } catch {
      }
    this.reverts = [], this.textFx = [], this._previewStyle && (this._previewStyle.remove(), this._previewStyle = null), this._mirrorHost && (this._mirrorHost.remove(), this._mirrorHost = null), this.gate && (this.gate.destroy(), this.gate = null), this.active = !1;
  }
  /* (see also: _makeMirror/_previewRuleFor/_syncPreview — editor live preview) */
  /* Unique structural selector for an element — nth-child chain from body.
   * Rebuilt on every refresh, so edits that shift siblings self-correct on
   * the editor's next refresh cycle. */
  _cssPath(e) {
    const t = [];
    let i = e;
    for (; i && i.nodeType === 1 && i !== document.body && i.parentElement; ) {
      const s = Array.prototype.indexOf.call(i.parentElement.children, i) + 1;
      t.unshift(i.tagName.toLowerCase() + ":nth-child(" + s + ")"), i = i.parentElement;
    }
    return "body > " + t.join(" > ");
  }
  /* ---------- section pipeline ---------- */
  _buildSection(e) {
    if (e.hasAttribute("data-section-clone") || e.hasAttribute("data-fx-off")) return;
    this._currentSection = e;
    const t = Ln(e);
    this._buildKeyframes(e, t), this._buildHorizontal(e, t), this._buildParallax(e), this._buildEmit(e, t), this.editor ? (this._buildSplitsGated(e, t), this._buildTypewritersGated(e, t), this._buildMarqueesGated(e)) : (this._buildSplits(e, t), this._buildTypewriters(e, t), this._buildMarquees(e)), (!this.editor || this.fullPreview) && this._buildDraws(e, t);
  }
  // _scene(opts, extra) {
  //     const scene = scrollScene(Object.assign({
  //         trigger: opts.trigger,
  //         start: opts.start,
  //         end: opts.end,
  //         scrub: opts.scrub,
  //     }, extra));
  //     this.scenes.push(scene);
  //     return scene;
  // }
  _scene(e, t) {
    const i = Xe(Object.assign({
      trigger: e.trigger,
      start: e.start,
      end: e.end,
      scrub: e.scrub,
      once: e.once
    }, t));
    return this._track(i);
  }
  /* Tag a scene with its owning section and register it. */
  _track(e, t) {
    return e._section = t || this._currentSection || null, this.scenes.push(e), e;
  }
  _eligible(e, t) {
    return e.hasAttribute("data-fx-off") || e.closest(".is-tool, .is-rowadd-tool, .is-section-tool, .is-box-tool, .is-section-info") ? !1 : En(e) ? (console.warn("[contentbox-effects] skipping " + t + ": element mixes legacy animation attributes with data-fx-* (use one system per element)", e), !1) : !0;
  }
  /* ---------- percent keyframes ---------- */
  _buildKeyframes(e, t) {
    const i = [];
    if (this._hasKf(e) && i.push(e), e.querySelectorAll("*").forEach((o) => {
      this._hasKf(o) && i.push(o);
    }), !i.length) return;
    const s = oi({ paused: !0, duration: t.duration || 1 });
    let n = !1;
    const r = [];
    for (const o of i) {
      if (!this._eligible(o, "keyframes")) continue;
      const l = Cn(o);
      if (!l) continue;
      const u = o.getAttribute("data-fx-ease") || this.settings.defaultEase;
      let d = {};
      for (const c of l)
        for (const [h, p] of Object.entries(c.vars))
          (d[h] || (d[h] = [])).push({ pct: c.pct, v: p });
      if (this.editor && !this.fullPreview) {
        const c = {}, h = {};
        for (const [f, y] of Object.entries(d))
          Et.has(f) || f === "opacity" ? c[f] = y : h[f] = y;
        const p = Object.keys(h);
        if (p.length) {
          const f = this._makeMirror(), y = this._previewRuleFor(o), _ = { mirror: f, rule: y, props: p, last: {} };
          for (const g of p) {
            const v = h[g][0].v;
            he(f, { [g]: v }), y.style.setProperty(this._kebab(g), String(f.style[g] || v)), _.last[g] = String(f.style[g] || v);
          }
          for (const [g, v] of Object.entries(h))
            for (let m = 1; m < v.length; m++) {
              const b = v[m - 1], w = v[m], x = t.duration || 1, k = Math.max((w.pct - b.pct) / 100 * x, 1e-4);
              s.fromTo(
                f,
                { [g]: b.v },
                { [g]: w.v, duration: k, ease: u },
                b.pct / 100 * x
              ), n = !0;
            }
          r.push(_);
        }
        if (d = c, !Object.keys(d).length && !p.length) continue;
      }
      if (Object.keys(d).length) {
        o.style.transform = "";
        const c = {};
        for (const [h, p] of Object.entries(d)) c[h] = p[0].v;
        he(o, c), this.reverts.push(() => this._clearInline(o, Object.keys(d)));
        for (const [h, p] of Object.entries(d))
          for (let f = 1; f < p.length; f++) {
            const y = p[f - 1], _ = p[f], g = t.duration || 1, v = Math.max((_.pct - y.pct) / 100 * g, 1e-4);
            s.fromTo(
              o,
              { [h]: y.v },
              { [h]: _.v, duration: v, ease: u },
              y.pct / 100 * g
            ), n = !0;
          }
      }
    }
    if (n) {
      const o = {};
      if (r.length && (o.onProgress = () => this._syncPreview(r)), t.scrub === !1) {
        const l = this._scene(t, o);
        l.previewAnimation = s;
        let u = !1;
        const d = new IntersectionObserver((c) => {
          if (!l._preview)
            for (const h of c)
              if (h.isIntersecting) {
                if (t.once && u) continue;
                s.restart(), u = !0;
              } else t.once || (s.pause(), s.progress(0));
        }, { threshold: 0, rootMargin: "-10% 0px -10% 0px" });
        d.observe(e), this.reverts.push(() => d.disconnect());
      } else
        o.animation = s, this._scene(t, o);
    }
  }
  /* ---------- editor live-preview plumbing (mirrors + CSSOM) ---------- */
  _kebab(e) {
    return e.replace(/[A-Z]/g, (t) => "-" + t.toLowerCase());
  }
  /* Hidden container for mirror elements. Lives directly under <body> but
   * OUTSIDE .is-wrapper — builder.html() serializes wrapper content only,
   * so mirrors can never leak into saved pages. */
  _makeMirror() {
    this._mirrorHost || (this._mirrorHost = document.createElement("div"), this._mirrorHost.setAttribute("data-fx-mirrors", ""), this._mirrorHost.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;visibility:hidden;pointer-events:none;", document.body.appendChild(this._mirrorHost));
    const e = document.createElement("div");
    return this._mirrorHost.appendChild(e), e;
  }
  /* One CSSOM rule per element, in the runtime-owned head stylesheet. */
  _previewRuleFor(e) {
    this._previewStyle || (this._previewStyle = document.createElement("style"), this._previewStyle.setAttribute("data-fx-editor-preview", ""), document.head.appendChild(this._previewStyle));
    const t = this._previewStyle.sheet, i = t.insertRule(this._cssPath(e) + " {}", t.cssRules.length);
    return t.cssRules[i];
  }
  _syncPreview(e) {
    for (const t of e)
      for (const i of t.props) {
        const s = String(t.mirror.style[i] || "");
        s && s !== t.last[i] && (t.rule.style.setProperty(this._kebab(i), s), t.last[i] = s);
      }
  }
  _hasKf(e) {
    if (e.hasAttribute("data-fx-path")) return !0;
    for (const t of e.attributes) if (vs.test(t.name)) return !0;
    return !1;
  }
  _clearInline(e, t) {
    e.style.transform = "", ai(e);
    for (const i of t)
      if (!Et.has(i))
        try {
          e.style[i] = "";
        } catch {
        }
  }
  /* ---------- preset: horizontal gallery ---------- */
  _buildHorizontal(e, t) {
    e.querySelectorAll("[data-fx-horizontal]").forEach((i) => {
      if (this._eligible(i, "horizontal")) {
        if (!t.pinned) {
          console.warn("[contentbox-effects] data-fx-horizontal works inside a pinned (.section-pin) section; skipping", i);
          return;
        }
        this._scene(t, {
          remeasure: !0,
          animation: St(
            i,
            { x: 0 },
            {
              x: () => -Math.max(i.scrollWidth - i.clientWidth, 0),
              duration: 1,
              ease: "linear",
              paused: !0
            }
          )
        }), this.reverts.push(() => {
          i.style.transform = "";
        });
      }
    });
  }
  /* ---------- preset: split text (published) ---------- */
  _buildSplits(e, t) {
    e.querySelectorAll("[data-fx-split]").forEach((i) => {
      if (!this._eligible(i, "split")) return;
      const s = i.getAttribute("data-fx-split") === "chars" ? "chars" : "words", n = i.hasAttribute("data-fx-split-mask"), r = Hi(i, { by: s, mask: n });
      this.reverts.push(() => r.revert());
      const o = s === "chars" ? r.chars : r.words;
      if (o.length)
        if (i.hasAttribute("data-fx-split-scrub")) {
          const l = ie(i.getAttribute("data-fx-split-from"), 0.12), u = ie(i.getAttribute("data-fx-split-stagger"), 0.09);
          he(o, { opacity: l });
          const d = Bt({ paused: !0 });
          d.fromTo(
            o,
            { opacity: l },
            { opacity: 1, duration: 0.6, stagger: u, ease: "linear" }
          ).step({}, { duration: 0.45 }), this._scene(t, { animation: d });
        } else {
          const l = ie(
            i.getAttribute("data-fx-split-stagger"),
            s === "chars" ? 0.018 : 0.08
          ), u = i.getAttribute("data-fx-split-y") || (n ? "115%" : "18px");
          he(o, n ? { y: u } : { opacity: 0, y: u });
          const d = () => kt(o, Object.assign(
            { y: 0, duration: 0.9, stagger: l, ease: "expoOut" },
            n ? {} : { opacity: 1 }
          )), c = Xe({
            trigger: i,
            start: "top 85%",
            end: "bottom top",
            onEnter: d,
            onEnterBack: d
          });
          this.scenes.push(c);
        }
    });
  }
  /* ---------- preset: split text (editor, focus-gated) ----------
   * Same reveal maths as _buildSplits, but each element is registered with the
   * FocusGate (focus-gate.js). It animates by default (play form) and drops to
   * clean, editable markup (source form) while the caret is inside it, then
   * re-splits from the CURRENT text when the caret leaves.
   *
   * Contract with the gate (do not break these — each maps to a fixed bug):
   *   • toSource(el)              — revert to editable text. Must restore the
   *                                 element's *current* content (user edits),
   *                                 which splitPreserving.revert() does.
   *   • toPlay(el, { replay })    — re-split + animate. `replay` comes from the
   *                                 gate: TRUE only when the user just finished
   *                                 editing this element (play the entrance
   *                                 again); FALSE for transient returns such as
   *                                 a serialize suspend/resume on every undo
   *                                 snapshot (restore resting state, no replay).
   *                                 [issue 5 — "didn't replay after editing"]
   *                                 [issue 4 — suspend/resume must not re-animate]
   *   • entrance uses an IntersectionObserver, not a scrollScene, so that a
   *     re-split never force-replays a line already on screen; the persistent
   *     `h.revealed` flag remembers whether it was shown. Scrub mode rebuilds
   *     the scene and re-syncs to the current scroll position. */
  _buildSplitsGated(e, t) {
    this.gate && e.querySelectorAll("[data-fx-split]").forEach((i) => {
      if (!this._eligible(i, "split")) return;
      const s = i.getAttribute("data-fx-split") === "chars" ? "chars" : "words", n = i.hasAttribute("data-fx-split-mask"), r = i.hasAttribute("data-fx-split-scrub"), o = ie(i.getAttribute("data-fx-split-from"), 0.12), l = ie(
        i.getAttribute("data-fx-split-stagger"),
        r ? 0.09 : s === "chars" ? 0.018 : 0.08
      ), u = i.getAttribute("data-fx-split-y") || (n ? "115%" : "18px"), d = { split: null, scene: null, io: null, revealed: !1 }, c = (p, f = {}) => {
        if (d.split) return;
        const y = Hi(p, { by: s, mask: n });
        d.split = y;
        const _ = s === "chars" ? y.chars : y.words;
        if (_.length)
          if (r) {
            he(_, { opacity: o });
            const g = Bt({ paused: !0 });
            g.fromTo(
              _,
              { opacity: o },
              { opacity: 1, duration: 0.6, stagger: l, ease: "linear" }
            ).step({}, { duration: 0.45 }), d.scene = this._track(Xe({
              trigger: t.trigger,
              start: t.start,
              end: t.end,
              scrub: t.scrub,
              animation: g
            }), e), Ft.refreshAll();
          } else {
            const g = () => kt(_, Object.assign(
              { y: 0, duration: 0.9, stagger: l, ease: "expoOut" },
              n ? {} : { opacity: 1 }
            )), v = () => he(
              _,
              n ? { y: u } : { opacity: 0, y: u }
            ), m = () => {
              const b = p.getBoundingClientRect();
              return b.top < window.innerHeight * 0.85 && b.bottom > 0;
            };
            d.replay = () => {
              d.revealed = !0, v(), g();
            }, f.replay ? (v(), m() ? (d.revealed = !0, g()) : d.revealed = !1) : d.revealed ? he(_, n ? { y: 0 } : { opacity: 1, y: 0 }) : v(), d.io = new IntersectionObserver((b) => {
              for (const w of b)
                w.isIntersecting ? d.revealed || (d.revealed = !0, g()) : (d.revealed = !1, v());
            }, { threshold: 0.15 }), d.io.observe(p);
          }
      }, h = (p) => {
        d.replay = null, d.io && (d.io.disconnect(), d.io = null), d.scene && (d.scene.kill(), d.scene = null), d.split && (d.split.revert(), d.split = null), p.style.transform = "", p.style.opacity = "";
      };
      this.gate.register(i, { toPlay: c, toSource: h }), this.textFx.push({ section: e, handle: d });
    });
  }
  /* ---------- preset: typewriter ---------- */
  _buildTypewriters(e, t) {
    e.querySelectorAll("[data-fx-typewriter]").forEach((i) => {
      if (!this._eligible(i, "typewriter")) return;
      const s = i.textContent, n = Math.min(Math.max(
        ie(i.getAttribute("data-fx-typewriter-until"), 0.85),
        0.05
      ), 1);
      i.textContent = "", this.reverts.push(() => {
        i.textContent = s;
      }), this._scene(t, {
        onProgress: (r) => {
          const o = Math.min(r / n, 1);
          i.textContent = s.slice(0, Math.round(o * s.length));
        }
      });
    });
  }
  /* ---------- preset: typewriter (editor, focus-gated) ----------
   * Same scrub-typing as _buildTypewriters, but registered with the FocusGate
   * so the element is editable while it animates.
   *
   * Why typewriter needs the gate at all: play form sets textContent to a
   * PREFIX of the script (or ''), so while editing you'd be typing into
   * truncated text, and any save/undo snapshot taken mid-scroll would persist
   * that truncation as the real content. The gate keeps the element in full,
   * clean text for exactly as long as the caret is inside it.
   *
   * Contract with the gate (mirrors the split preset — keep these):
   *   • toSource(el)           — kill the scene FIRST (its onProgress writes
   *                              textContent every scroll frame and would
   *                              overwrite what the user types), then restore
   *                              the full script text.
   *   • toPlay(el)             — re-capture the CURRENT text as the script (so
   *                              edits are kept), blank it, then rebuild the
   *                              scene and refreshAll() so the correct prefix
   *                              for the CURRENT scroll position is rendered
   *                              immediately.
   *
   * NOTE ON `replay`: split needs the gate's { replay } flag because its
   * entrance is a one-shot timeline (it must be told to re-perform). Typewriter
   * does NOT — it is scrub-driven, so its visible state is always a pure
   * function of scroll position. Re-entering play form simply re-derives the
   * right prefix. Scrolling away and back re-types it, exactly as on a
   * published page. So the flag is deliberately unused here.
   */
  _buildTypewritersGated(e, t) {
    this.gate && e.querySelectorAll("[data-fx-typewriter]").forEach((i) => {
      if (!this._eligible(i, "typewriter")) return;
      const s = Math.min(Math.max(
        ie(i.getAttribute("data-fx-typewriter-until"), 0.85),
        0.05
      ), 1), n = { scene: null, script: "" }, r = (l) => {
        if (n.scene || (n.script = l.textContent, !n.script)) return;
        const u = (d) => {
          const c = Math.min(d / s, 1);
          l.textContent = n.script.slice(0, Math.round(c * n.script.length));
        };
        l.textContent = "", n.scene = this._track(Xe({
          trigger: t.trigger,
          start: t.start,
          end: t.end,
          scrub: t.scrub,
          onProgress: u
        }), e), Ft.refreshAll();
      }, o = (l) => {
        n.scene && (n.scene.kill(), n.scene = null), n.script && (l.textContent = n.script);
      };
      this.gate.register(i, { toPlay: r, toSource: o });
    });
  }
  /* ---------- preset: SVG draw ---------- */
  _buildDraws(e, t) {
    e.querySelectorAll("[data-fx-draw]").forEach((i) => {
      if (!this._eligible(i, "draw")) return;
      const s = i.tagName.toLowerCase() === "path" ? [i] : Array.from(i.querySelectorAll("path"));
      if (!s.length) return;
      const n = Bt({ paused: !0 });
      for (const o of s) {
        let l = 0;
        try {
          l = o.getTotalLength();
        } catch {
          continue;
        }
        if (!l) continue;
        const u = o.style.strokeDasharray, d = o.style.strokeDashoffset;
        o.style.strokeDasharray = l, this.reverts.push(() => {
          o.style.strokeDasharray = u, o.style.strokeDashoffset = d;
        }), n.fromTo(
          o,
          { strokeDashoffset: l },
          { strokeDashoffset: 0, duration: 1, ease: "linear" },
          0
        );
      }
      const r = t.pinned ? t : {
        trigger: i,
        start: "top 80%",
        end: "bottom 55%",
        scrub: t.scrub
      };
      this._scene(r, { animation: n });
    });
  }
  /* ---------- preset: parallax ---------- */
  _buildParallax(e) {
    e.querySelectorAll("[data-fx-parallax]").forEach((t) => {
      if (!this._eligible(t, "parallax")) return;
      const i = t.getAttribute("data-fx-parallax"), s = ie(i, 100), n = /%$/.test(i || "") ? "%" : "px";
      this._track(Xe({
        trigger: t,
        start: "top bottom",
        end: "bottom top",
        scrub: !0,
        animation: St(
          t,
          { y: -s + n },
          { y: s + n, duration: 1, ease: "linear", paused: !0 }
        )
      }), e), this.reverts.push(() => {
        t.style.transform = "";
      });
    });
  }
  /* ---------- preset: marquee ---------- */
  _buildMarquees(e) {
    e.querySelectorAll("[data-fx-marquee]").forEach((t) => {
      if (!this._eligible(t, "marquee")) return;
      const i = ie(t.getAttribute("data-fx-marquee-speed"), 90), s = t.hasAttribute("data-fx-marquee-lean"), n = t.innerHTML;
      t.innerHTML = n + n, t.style.display = "inline-block", t.style.whiteSpace = "nowrap", t.style.willChange = "transform", this.reverts.push(() => {
        t.innerHTML = n, t.style.display = "", t.style.whiteSpace = "", t.style.willChange = "", t.style.transform = "";
      });
      let r = 0, o = window.scrollY, l = 0;
      const u = at.add((d) => {
        const c = window.scrollY, h = (c - o) / Math.max(d, 1e-3);
        o = c, l += (h - l) * Math.min(d * 4, 1);
        const p = i + Math.min(Math.abs(l) * 0.9, 1400), f = t.scrollWidth / 2;
        f > 0 && (r = (r - p * d) % f);
        const y = { x: r };
        s && (y.skewX = Math.max(-18, Math.min(18, l * 0.02))), he(t, y);
      });
      this.tickers.push(u);
    });
  }
  /* ---------- preset: marquee (editor, focus-gated) ----------
   * Same drift as _buildMarquees, but registered with the FocusGate so the
   * strip is editable while it animates.
   *
   * Why marquee needs the gate: play form does `innerHTML = original + original`
   * (the content is DUPLICATED so the strip can loop seamlessly). Editing that
   * means typing into one of two copies, and a save taken while doubled would
   * persist BOTH — doubling the content again on every save. The gate keeps the
   * element as a single, clean copy for exactly as long as the caret is in it.
   *
   * Contract with the gate:
   *   • toSource(el) — stop the ticker FIRST (it writes transform every frame
   *                    and would keep sliding the element you're editing), then
   *                    restore the single copy and clear the inline styles.
   *   • toPlay(el)   — re-read the element's CURRENT html (so edits are kept),
   *                    duplicate it, and start the ticker again.
   *
   * Unlike split, no { replay } flag is needed: the drift is a continuous loop,
   * not a one-shot entrance, so re-entering play form just starts it again.
   * Also note this does NOT push to this.reverts/this.tickers — the gate owns
   * the lifecycle here (pushing as well would double-revert).
   */
  _buildMarqueesGated(e) {
    this.gate && e.querySelectorAll("[data-fx-marquee]").forEach((t) => {
      if (!this._eligible(t, "marquee")) return;
      const i = ie(t.getAttribute("data-fx-marquee-speed"), 90), s = t.hasAttribute("data-fx-marquee-lean"), n = { stop: null, html: "" }, r = (l) => {
        if (n.stop || (n.html = l.innerHTML, !n.html)) return;
        l.innerHTML = n.html + n.html, l.style.display = "inline-block", l.style.whiteSpace = "nowrap", l.style.willChange = "transform";
        let u = 0, d = window.scrollY, c = 0;
        n.stop = at.add((h) => {
          const p = window.scrollY, f = (p - d) / Math.max(h, 1e-3);
          d = p, c += (f - c) * Math.min(h * 4, 1);
          const y = i + Math.min(Math.abs(c) * 0.9, 1400), _ = l.scrollWidth / 2;
          _ > 0 && (u = (u - y * h) % _);
          const g = { x: u };
          s && (g.skewX = Math.max(-18, Math.min(18, c * 0.02))), he(l, g);
        });
      }, o = (l) => {
        n.stop && (n.stop(), n.stop = null), n.html && (l.innerHTML = n.html), l.style.display = "", l.style.whiteSpace = "", l.style.willChange = "", l.style.transform = "";
      };
      this.gate.register(t, { toPlay: r, toSource: o });
    });
  }
  /* ---------- presets: pointer micro-interactions ---------- */
  _buildPointerPresets(e) {
    e.querySelectorAll("[data-fx-tilt]").forEach((t) => {
      if (!this._eligible(t, "tilt")) return;
      const i = ie(t.getAttribute("data-fx-tilt-max"), 14);
      t.parentElement && !t.parentElement.style.perspective && (t.parentElement.style.perspective = "900px");
      let s = 0, n = 0, r = 0, o = 0;
      const l = (c) => {
        const h = t.getBoundingClientRect();
        n = ((c.clientX - h.left) / h.width - 0.5) * (i + 2), s = -((c.clientY - h.top) / h.height - 0.5) * i;
      }, u = () => {
        s = 0, n = 0;
      };
      t.addEventListener("mousemove", l), t.addEventListener("mouseleave", u);
      const d = at.add((c) => {
        const h = 1 - Math.exp(-c / 0.1);
        r += (s - r) * h, o += (n - o) * h, he(t, { rotateX: r, rotateY: o });
      });
      this.tickers.push(() => {
        d(), t.removeEventListener("mousemove", l), t.removeEventListener("mouseleave", u), t.style.transform = "";
      });
    }), e.querySelectorAll("[data-fx-magnetic]").forEach((t) => {
      if (!this._eligible(t, "magnetic")) return;
      const i = ie(t.getAttribute("data-fx-magnetic-strength"), 0.35);
      let s = 0, n = 0, r = 0, o = 0;
      const l = (c) => {
        const h = t.getBoundingClientRect();
        s = (c.clientX - h.left - h.width / 2) * i, n = (c.clientY - h.top - h.height / 2) * i;
      }, u = () => {
        s = 0, n = 0;
      };
      t.addEventListener("mousemove", l), t.addEventListener("mouseleave", u);
      const d = at.add((c) => {
        const h = 1 - Math.exp(-c / 0.08);
        r += (s - r) * h, o += (n - o) * h, he(t, { x: r, y: o });
      });
      this.tickers.push(() => {
        d(), t.removeEventListener("mousemove", l), t.removeEventListener("mouseleave", u), t.style.transform = "";
      });
    });
  }
  /* ---------- plugin hook: progress events ---------- */
  _buildEmit(e, t) {
    e.hasAttribute("data-fx-emit") && this._scene(t, {
      onProgress: (i) => {
        e.dispatchEvent(new CustomEvent("fx:progress", {
          bubbles: !0,
          detail: { progress: i, section: e, pinned: t.pinned }
        }));
      },
      onEnter: () => e.dispatchEvent(new CustomEvent("fx:enter", { bubbles: !0 })),
      onEnterBack: () => e.dispatchEvent(new CustomEvent("fx:enterback", { bubbles: !0 })),
      onLeave: () => e.dispatchEvent(new CustomEvent("fx:leave", { bubbles: !0 })),
      onLeaveBack: () => e.dispatchEvent(new CustomEvent("fx:leaveback", { bubbles: !0 }))
    });
  }
}
const zi = Date.now();
function ve() {
  let a = {}, e = !0, t = 0, i = arguments.length;
  Object.prototype.toString.call(arguments[0]) === "[object Boolean]" && (e = arguments[0], t++);
  let s = (n) => {
    for (let r in n)
      Object.prototype.hasOwnProperty.call(n, r) && (e && Object.prototype.toString.call(n[r]) === "[object Object]" ? a[r] = ve(!0, a[r], n[r]) : a[r] = n[r]);
  };
  for (; t < i; t++) {
    let n = arguments[t];
    s(n);
  }
  return a;
}
function J(a, e) {
  if ((we(a) || a === window || a === document) && (a = [a]), !ji(a) && !ze(a) && (a = [a]), xs(a) != 0) {
    if (ji(a) && !ze(a)) {
      let t = a.length, i = 0;
      for (; i < t && e.call(a[i], a[i], i, a) !== !1; i++)
        ;
    } else if (ze(a)) {
      for (let t in a)
        if (Z(a, t) && e.call(a[t], a[t], t, a) === !1)
          break;
    }
  }
}
function Bi(a, e = null, t = null) {
  const i = a[zi] = a[zi] || [], s = { all: i, evt: null, found: null };
  return e && t && xs(i) > 0 && J(i, (n, r) => {
    if (n.eventName == e && n.fn.toString() == t.toString())
      return s.found = !0, s.evt = r, !1;
  }), s;
}
function le(a, { onElement: e, withCallback: t, avoidDuplicate: i = !0, once: s = !1, useCapture: n = !1 } = {}, r) {
  let o = e || [];
  Ze(o) && (o = document.querySelectorAll(o));
  function l(u) {
    W(t) && t.call(r, u, this), s && l.destroy();
  }
  return l.destroy = function() {
    J(o, (u) => {
      const d = Bi(u, a, l);
      d.found && d.all.splice(d.evt, 1), u.removeEventListener && u.removeEventListener(a, l, n);
    });
  }, J(o, (u) => {
    const d = Bi(u, a, l);
    (u.addEventListener && i && !d.found || !i) && (u.addEventListener(a, l, n), d.all.push({ eventName: a, fn: l }));
  }), l;
}
function z(a, e) {
  J(e.split(" "), (t) => a.classList.add(t));
}
function K(a, e) {
  J(e.split(" "), (t) => a.classList.remove(t));
}
function se(a, e) {
  return a.classList.contains(e);
}
function pe(a, e) {
  for (; a !== document.body; ) {
    if (a = a.parentElement, !a)
      return !1;
    if (typeof a.matches == "function" ? a.matches(e) : a.msMatchesSelector(e))
      return a;
  }
}
function Ie(a, e = "", t = !1) {
  if (!a || e === "")
    return !1;
  if (e === "none")
    return W(t) && t(), !1;
  const i = Mn(), s = e.split(" ");
  J(s, (n) => {
    z(a, "g" + n);
  }), le(i, {
    onElement: a,
    avoidDuplicate: !1,
    once: !0,
    withCallback: (n, r) => {
      J(s, (o) => {
        K(r, "g" + o);
      }), W(t) && t();
    }
  });
}
function gt(a, e = "") {
  if (e === "")
    return a.style.webkitTransform = "", a.style.MozTransform = "", a.style.msTransform = "", a.style.OTransform = "", a.style.transform = "", !1;
  a.style.webkitTransform = e, a.style.MozTransform = e, a.style.msTransform = e, a.style.OTransform = e, a.style.transform = e;
}
function Fi(a) {
  a.style.display = "block";
}
function Ut(a) {
  a.style.display = "none";
}
function Re(a) {
  let e = document.createDocumentFragment(), t = document.createElement("div");
  for (t.innerHTML = a; t.firstChild; )
    e.appendChild(t.firstChild);
  return e;
}
function ws() {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  };
}
function Mn() {
  let a, e = document.createElement("fakeelement"), t = {
    animation: "animationend",
    OAnimation: "oAnimationEnd",
    MozAnimation: "animationend",
    WebkitAnimation: "webkitAnimationEnd"
  };
  for (a in t)
    if (e.style[a] !== void 0)
      return t[a];
}
function Rn() {
  let a, e = document.createElement("fakeelement");
  const t = {
    transition: "transitionend",
    OTransition: "oTransitionEnd",
    MozTransition: "transitionend",
    WebkitTransition: "webkitTransitionEnd"
  };
  for (a in t)
    if (e.style[a] !== void 0)
      return t[a];
}
function qn(a) {
  let { url: e, allow: t, callback: i, appendTo: s } = a, n = document.createElement("iframe");
  return n.className = "vimeo-video gvideo", n.src = e, n.style.width = "100%", n.style.height = "100%", t && n.setAttribute("allow", t), n.onload = function() {
    n.onload = null, z(n, "node-ready"), W(i) && i();
  }, s && s.appendChild(n), n;
}
function Gt(a, e, t, i) {
  if (a()) {
    e();
    return;
  }
  t || (t = 100);
  let s = setInterval(() => {
    a() && (clearInterval(s), e());
  }, t);
}
function Ui(a, e, t) {
  if (ae(a)) {
    console.error("Inject assets error");
    return;
  }
  if (W(e) && (t = e, e = !1), Ze(e) && e in window) {
    W(t) && t();
    return;
  }
  let i;
  if (a.indexOf(".css") !== -1) {
    if (i = document.querySelectorAll('link[href="' + a + '"]'), i && i.length > 0) {
      W(t) && t();
      return;
    }
    const n = document.getElementsByTagName("head")[0], r = n.querySelectorAll('link[rel="stylesheet"]'), o = document.createElement("link");
    o.rel = "stylesheet", o.type = "text/css", o.href = a, o.media = "all", r ? n.insertBefore(o, r[0]) : n.appendChild(o), W(t) && t();
    return;
  }
  if (i = document.querySelectorAll('script[src="' + a + '"]'), i && i.length > 0) {
    if (W(t)) {
      if (Ze(e))
        return Gt(
          () => typeof window[e] < "u",
          () => {
            t();
          }
        ), !1;
      t();
    }
    return;
  }
  let s = document.createElement("script");
  s.type = "text/javascript", s.src = a, s.onload = () => {
    if (W(t)) {
      if (Ze(e))
        return Gt(
          () => typeof window[e] < "u",
          () => {
            t();
          }
        ), !1;
      t();
    }
  }, document.body.appendChild(s);
}
function ci() {
  return typeof window > "u" ? !1 : "navigator" in window && window.navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i);
}
function Pn() {
  return typeof document > "u" ? !1 : ci() !== null || document.createTouch !== void 0 || "ontouchstart" in window || "onmsgesturechange" in window || navigator.msMaxTouchPoints;
}
function W(a) {
  return typeof a == "function";
}
function Ze(a) {
  return typeof a == "string";
}
function we(a) {
  return !!(a && a.nodeType && a.nodeType == 1);
}
function _s(a) {
  return Array.isArray(a);
}
function ji(a) {
  return a && a.length && isFinite(a.length);
}
function ze(a) {
  return typeof a === "object" && a != null && !W(a) && !_s(a);
}
function ae(a) {
  return a == null;
}
function Z(a, e) {
  return a !== null && hasOwnProperty.call(a, e);
}
function xs(a) {
  if (ze(a)) {
    if (a.keys)
      return a.keys().length;
    let e = 0;
    for (let t in a)
      Z(a, t) && e++;
    return e;
  } else
    return a.length;
}
function mt(a) {
  return !isNaN(parseFloat(a)) && isFinite(a);
}
function Yi(a = -1) {
  const e = document.querySelectorAll(".gbtn[data-taborder]:not(.disabled)");
  if (!e.length)
    return !1;
  if (e.length == 1)
    return e[0];
  typeof a == "string" && (a = parseInt(a));
  const t = [];
  J(e, (o) => {
    t.push(o.getAttribute("data-taborder"));
  });
  const i = Math.max.apply(Math, t.map((o) => parseInt(o)));
  let s = a < 0 ? 1 : a + 1;
  s > i && (s = "1");
  const r = t.filter((o) => o >= parseInt(s)).sort()[0];
  return document.querySelector(`.gbtn[data-taborder="${r}"]`);
}
function On(a) {
  if (a.events.hasOwnProperty("keyboard"))
    return !1;
  a.events.keyboard = le("keydown", {
    onElement: window,
    withCallback: (e, t) => {
      e = e || window.event;
      const i = e.keyCode;
      if (i == 9) {
        const s = document.querySelector(".gbtn.focused");
        if (!s) {
          const l = document.activeElement && document.activeElement.nodeName ? document.activeElement.nodeName.toLocaleLowerCase() : !1;
          if (l == "input" || l == "textarea" || l == "button")
            return;
        }
        e.preventDefault();
        const n = document.querySelectorAll(".gbtn[data-taborder]");
        if (!n || n.length <= 0)
          return;
        if (!s) {
          const l = Yi();
          l && (l.focus(), z(l, "focused"));
          return;
        }
        let r = s.getAttribute("data-taborder"), o = Yi(r);
        K(s, "focused"), o && (o.focus(), z(o, "focused"));
      }
      i == 39 && a.nextSlide(), i == 37 && a.prevSlide(), i == 27 && a.close();
    }
  });
}
function Tt(a) {
  return Math.sqrt(a.x * a.x + a.y * a.y);
}
function Nn(a, e) {
  return a.x * e.x + a.y * e.y;
}
function In(a, e) {
  var t = Tt(a) * Tt(e);
  if (t === 0)
    return 0;
  var i = Nn(a, e) / t;
  return i > 1 && (i = 1), Math.acos(i);
}
function Dn(a, e) {
  return a.x * e.y - e.x * a.y;
}
function $n(a, e) {
  var t = In(a, e);
  return Dn(a, e) > 0 && (t *= -1), t * 180 / Math.PI;
}
class Hn {
  constructor(e) {
    this.handlers = [], this.el = e;
  }
  add(e) {
    this.handlers.push(e);
  }
  del(e) {
    e || (this.handlers = []);
    for (var t = this.handlers.length; t >= 0; t--)
      this.handlers[t] === e && this.handlers.splice(t, 1);
  }
  dispatch() {
    for (var e = 0, t = this.handlers.length; e < t; e++) {
      var i = this.handlers[e];
      typeof i == "function" && i.apply(this.el, arguments);
    }
  }
}
function te(a, e) {
  var t = new Hn(a);
  return t.add(e), t;
}
class zn {
  constructor(e, t) {
    this.element = typeof e == "string" ? document.querySelector(e) : e, this.start = this.start.bind(this), this.move = this.move.bind(this), this.end = this.end.bind(this), this.cancel = this.cancel.bind(this), this.element.addEventListener("touchstart", this.start, !1), this.element.addEventListener("touchmove", this.move, !1), this.element.addEventListener("touchend", this.end, !1), this.element.addEventListener("touchcancel", this.cancel, !1), this.preV = { x: null, y: null }, this.pinchStartLen = null, this.zoom = 1, this.isDoubleTap = !1;
    var i = function() {
    };
    this.rotate = te(this.element, t.rotate || i), this.touchStart = te(this.element, t.touchStart || i), this.multipointStart = te(this.element, t.multipointStart || i), this.multipointEnd = te(this.element, t.multipointEnd || i), this.pinch = te(this.element, t.pinch || i), this.swipe = te(this.element, t.swipe || i), this.tap = te(this.element, t.tap || i), this.doubleTap = te(this.element, t.doubleTap || i), this.longTap = te(this.element, t.longTap || i), this.singleTap = te(this.element, t.singleTap || i), this.pressMove = te(this.element, t.pressMove || i), this.twoFingerPressMove = te(this.element, t.twoFingerPressMove || i), this.touchMove = te(this.element, t.touchMove || i), this.touchEnd = te(this.element, t.touchEnd || i), this.touchCancel = te(this.element, t.touchCancel || i), this.translateContainer = this.element, this._cancelAllHandler = this.cancelAll.bind(this), window.addEventListener("scroll", this._cancelAllHandler), this.delta = null, this.last = null, this.now = null, this.tapTimeout = null, this.singleTapTimeout = null, this.longTapTimeout = null, this.swipeTimeout = null, this.x1 = this.x2 = this.y1 = this.y2 = null, this.preTapPosition = { x: null, y: null };
  }
  start(e) {
    if (!e.touches)
      return;
    const t = ["a", "button", "input"];
    if (e.target && e.target.nodeName && t.indexOf(e.target.nodeName.toLowerCase()) >= 0) {
      console.log("ignore drag for this touched element", e.target.nodeName.toLowerCase());
      return;
    }
    this.now = Date.now(), this.x1 = e.touches[0].pageX, this.y1 = e.touches[0].pageY, this.delta = this.now - (this.last || this.now), this.touchStart.dispatch(e, this.element), this.preTapPosition.x !== null && (this.isDoubleTap = this.delta > 0 && this.delta <= 250 && Math.abs(this.preTapPosition.x - this.x1) < 30 && Math.abs(this.preTapPosition.y - this.y1) < 30, this.isDoubleTap && clearTimeout(this.singleTapTimeout)), this.preTapPosition.x = this.x1, this.preTapPosition.y = this.y1, this.last = this.now;
    var i = this.preV, s = e.touches.length;
    if (s > 1) {
      this._cancelLongTap(), this._cancelSingleTap();
      var n = { x: e.touches[1].pageX - this.x1, y: e.touches[1].pageY - this.y1 };
      i.x = n.x, i.y = n.y, this.pinchStartLen = Tt(i), this.multipointStart.dispatch(e, this.element);
    }
    this._preventTap = !1, this.longTapTimeout = setTimeout(
      (function() {
        this.longTap.dispatch(e, this.element), this._preventTap = !0;
      }).bind(this),
      750
    );
  }
  move(e) {
    if (e.touches) {
      var t = this.preV, i = e.touches.length, s = e.touches[0].pageX, n = e.touches[0].pageY;
      if (this.isDoubleTap = !1, i > 1) {
        var r = e.touches[1].pageX, o = e.touches[1].pageY, l = { x: e.touches[1].pageX - s, y: e.touches[1].pageY - n };
        t.x !== null && (this.pinchStartLen > 0 && (e.zoom = Tt(l) / this.pinchStartLen, this.pinch.dispatch(e, this.element)), e.angle = $n(l, t), this.rotate.dispatch(e, this.element)), t.x = l.x, t.y = l.y, this.x2 !== null && this.sx2 !== null ? (e.deltaX = (s - this.x2 + r - this.sx2) / 2, e.deltaY = (n - this.y2 + o - this.sy2) / 2) : (e.deltaX = 0, e.deltaY = 0), this.twoFingerPressMove.dispatch(e, this.element), this.sx2 = r, this.sy2 = o;
      } else {
        if (this.x2 !== null) {
          e.deltaX = s - this.x2, e.deltaY = n - this.y2;
          var u = Math.abs(this.x1 - this.x2), d = Math.abs(this.y1 - this.y2);
          (u > 10 || d > 10) && (this._preventTap = !0);
        } else
          e.deltaX = 0, e.deltaY = 0;
        this.pressMove.dispatch(e, this.element);
      }
      this.touchMove.dispatch(e, this.element), this._cancelLongTap(), this.x2 = s, this.y2 = n, i > 1 && e.preventDefault();
    }
  }
  end(e) {
    if (e.changedTouches) {
      this._cancelLongTap();
      var t = this;
      e.touches.length < 2 && (this.multipointEnd.dispatch(e, this.element), this.sx2 = this.sy2 = null), this.x2 && Math.abs(this.x1 - this.x2) > 30 || this.y2 && Math.abs(this.y1 - this.y2) > 30 ? (e.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2), this.swipeTimeout = setTimeout(function() {
        t.swipe.dispatch(e, t.element);
      }, 0)) : (this.tapTimeout = setTimeout(function() {
        t._preventTap || t.tap.dispatch(e, t.element), t.isDoubleTap && (t.doubleTap.dispatch(e, t.element), t.isDoubleTap = !1);
      }, 0), t.isDoubleTap || (t.singleTapTimeout = setTimeout(function() {
        t.singleTap.dispatch(e, t.element);
      }, 250))), this.touchEnd.dispatch(e, this.element), this.preV.x = 0, this.preV.y = 0, this.zoom = 1, this.pinchStartLen = null, this.x1 = this.x2 = this.y1 = this.y2 = null;
    }
  }
  cancelAll() {
    this._preventTap = !0, clearTimeout(this.singleTapTimeout), clearTimeout(this.tapTimeout), clearTimeout(this.longTapTimeout), clearTimeout(this.swipeTimeout);
  }
  cancel(e) {
    this.cancelAll(), this.touchCancel.dispatch(e, this.element);
  }
  _cancelLongTap() {
    clearTimeout(this.longTapTimeout);
  }
  _cancelSingleTap() {
    clearTimeout(this.singleTapTimeout);
  }
  _swipeDirection(e, t, i, s) {
    return Math.abs(e - t) >= Math.abs(i - s) ? e - t > 0 ? "Left" : "Right" : i - s > 0 ? "Up" : "Down";
  }
  on(e, t) {
    this[e] && this[e].add(t);
  }
  off(e, t) {
    this[e] && this[e].del(t);
  }
  destroy() {
    return this.singleTapTimeout && clearTimeout(this.singleTapTimeout), this.tapTimeout && clearTimeout(this.tapTimeout), this.longTapTimeout && clearTimeout(this.longTapTimeout), this.swipeTimeout && clearTimeout(this.swipeTimeout), this.element.removeEventListener("touchstart", this.start), this.element.removeEventListener("touchmove", this.move), this.element.removeEventListener("touchend", this.end), this.element.removeEventListener("touchcancel", this.cancel), this.rotate.del(), this.touchStart.del(), this.multipointStart.del(), this.multipointEnd.del(), this.pinch.del(), this.swipe.del(), this.tap.del(), this.doubleTap.del(), this.longTap.del(), this.singleTap.del(), this.pressMove.del(), this.twoFingerPressMove.del(), this.touchMove.del(), this.touchEnd.del(), this.touchCancel.del(), this.preV = this.pinchStartLen = this.zoom = this.isDoubleTap = this.delta = this.last = this.now = this.tapTimeout = this.singleTapTimeout = this.longTapTimeout = this.swipeTimeout = this.x1 = this.x2 = this.y1 = this.y2 = this.preTapPosition = this.rotate = this.touchStart = this.multipointStart = this.multipointEnd = this.pinch = this.swipe = this.tap = this.doubleTap = this.longTap = this.singleTap = this.pressMove = this.touchMove = this.touchEnd = this.touchCancel = this.twoFingerPressMove = null, window.removeEventListener("scroll", this._cancelAllHandler), null;
  }
}
function jt(a) {
  const e = Rn(), t = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  let i = se(a, "gslide-media") ? a : a.querySelector(".gslide-media"), s = pe(i, ".ginner-container"), n = a.querySelector(".gslide-description");
  t > 769 && (i = s), z(i, "greset"), gt(i, "translate3d(0, 0, 0)"), le(e, {
    onElement: i,
    once: !0,
    withCallback: (r, o) => {
      K(i, "greset");
    }
  }), i.style.opacity = "", n && (n.style.opacity = "");
}
function Bn(a) {
  if (a.events.hasOwnProperty("touch"))
    return !1;
  let e = ws(), t = e.width, i = e.height, s = !1, n = null, r = null, o = null, l = !1, u = 1, d = 4.5, c = 1, h = !1, p = !1, f = null, y = null, _ = null, g = null, v, m, b = 0, w = 0, x = !1, k = !1, S = {}, T = {}, C = 0, R = 0, L;
  const $ = document.getElementById("glightbox-slider"), O = document.querySelector(".goverlay"), N = new zn($, {
    touchStart: (A) => {
      if (s = !0, (se(A.targetTouches[0].target, "ginner-container") || pe(A.targetTouches[0].target, ".gslide-desc") || A.targetTouches[0].target.nodeName.toLowerCase() == "a") && (s = !1), pe(A.targetTouches[0].target, ".gslide-inline") && !se(A.targetTouches[0].target.parentNode, "gslide-inline") && (s = !1), s) {
        if (T = A.targetTouches[0], S.pageX = A.targetTouches[0].pageX, S.pageY = A.targetTouches[0].pageY, C = A.targetTouches[0].clientX, R = A.targetTouches[0].clientY, n = a.activeSlide, r = n.querySelector(".gslide-media"), L = n.querySelector(".gslide-inline"), o = null, se(r, "gslide-image") && (o = r.querySelector("img")), (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) > 769 && (r = n.querySelector(".ginner-container")), K(O, "greset"), A.pageX > 20 && A.pageX < window.innerWidth - 20)
          return;
        A.preventDefault();
      }
    },
    touchMove: (A) => {
      if (!s || (T = A.targetTouches[0], h || p))
        return;
      if (L && L.offsetHeight > i) {
        const F = S.pageX - T.pageX;
        if (Math.abs(F) <= 13)
          return !1;
      }
      l = !0;
      let q = A.targetTouches[0].clientX, M = A.targetTouches[0].clientY, E = C - q, I = R - M;
      Math.abs(E) > Math.abs(I) ? (x = !1, k = !0) : (k = !1, x = !0), v = T.pageX - S.pageX, b = v * 100 / t, m = T.pageY - S.pageY, w = m * 100 / i;
      let D;
      if (x && o && (D = 1 - Math.abs(m) / i, O.style.opacity = D, a.settings.touchFollowAxis && (b = 0)), k && (D = 1 - Math.abs(v) / t, r.style.opacity = D, a.settings.touchFollowAxis && (w = 0)), !o)
        return gt(r, `translate3d(${b}%, 0, 0)`);
      gt(r, `translate3d(${b}%, ${w}%, 0)`);
    },
    touchEnd: () => {
      if (!s)
        return;
      if (l = !1, p || h) {
        _ = f, g = y;
        return;
      }
      const A = Math.abs(parseInt(w)), q = Math.abs(parseInt(b));
      if (A > 29 && o) {
        a.close();
        return;
      }
      if (A < 29 && q < 25)
        return z(O, "greset"), O.style.opacity = 1, jt(r);
    },
    multipointEnd: () => {
      setTimeout(() => {
        h = !1;
      }, 50);
    },
    multipointStart: () => {
      h = !0, u = c || 1;
    },
    pinch: (A) => {
      if (!o || l)
        return !1;
      h = !0, o.scaleX = o.scaleY = u * A.zoom;
      let q = u * A.zoom;
      if (p = !0, q <= 1) {
        p = !1, q = 1, g = null, _ = null, f = null, y = null, o.setAttribute("style", "");
        return;
      }
      q > d && (q = d), o.style.transform = `scale3d(${q}, ${q}, 1)`, c = q;
    },
    pressMove: (A) => {
      if (p && !h) {
        var q = T.pageX - S.pageX, M = T.pageY - S.pageY;
        _ && (q = q + _), g && (M = M + g), f = q, y = M;
        let E = `translate3d(${q}px, ${M}px, 0)`;
        c && (E += ` scale3d(${c}, ${c}, 1)`), gt(o, E);
      }
    },
    swipe: (A) => {
      if (!p) {
        if (h) {
          h = !1;
          return;
        }
        if (A.direction == "Left") {
          if (a.index == a.elements.length - 1)
            return jt(r);
          a.nextSlide();
        }
        if (A.direction == "Right") {
          if (a.index == 0)
            return jt(r);
          a.prevSlide();
        }
      }
    }
  });
  a.events.touch = N;
}
class Fn {
  constructor(e, t, i = null) {
    if (this.img = e, this.slide = t, this.onclose = i, this.img.setZoomEvents)
      return !1;
    this.active = !1, this.zoomedIn = !1, this.dragging = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.img.addEventListener("mousedown", (s) => this.dragStart(s), !1), this.img.addEventListener("mouseup", (s) => this.dragEnd(s), !1), this.img.addEventListener("mousemove", (s) => this.drag(s), !1), this.img.addEventListener(
      "click",
      (s) => {
        if (this.slide.classList.contains("dragging-nav"))
          return this.zoomOut(), !1;
        if (!this.zoomedIn)
          return this.zoomIn();
        this.zoomedIn && !this.dragging && this.zoomOut();
      },
      !1
    ), this.img.setZoomEvents = !0;
  }
  zoomIn() {
    let e = this.widowWidth();
    if (this.zoomedIn || e <= 768)
      return;
    const t = this.img;
    if (t.setAttribute("data-style", t.getAttribute("style")), t.style.maxWidth = t.naturalWidth + "px", t.style.maxHeight = t.naturalHeight + "px", t.naturalWidth > e) {
      let i = e / 2 - t.naturalWidth / 2;
      this.setTranslate(this.img.parentNode, i, 0);
    }
    this.slide.classList.add("zoomed"), this.zoomedIn = !0;
  }
  zoomOut() {
    this.img.parentNode.setAttribute("style", ""), this.img.setAttribute("style", this.img.getAttribute("data-style")), this.slide.classList.remove("zoomed"), this.zoomedIn = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.onclose && typeof this.onclose == "function" && this.onclose();
  }
  dragStart(e) {
    if (e.preventDefault(), !this.zoomedIn) {
      this.active = !1;
      return;
    }
    e.type === "touchstart" ? (this.initialX = e.touches[0].clientX - this.xOffset, this.initialY = e.touches[0].clientY - this.yOffset) : (this.initialX = e.clientX - this.xOffset, this.initialY = e.clientY - this.yOffset), e.target === this.img && (this.active = !0, this.img.classList.add("dragging"));
  }
  dragEnd(e) {
    e.preventDefault(), this.initialX = this.currentX, this.initialY = this.currentY, this.active = !1, setTimeout(() => {
      this.dragging = !1, this.img.isDragging = !1, this.img.classList.remove("dragging");
    }, 100);
  }
  drag(e) {
    this.active && (e.preventDefault(), e.type === "touchmove" ? (this.currentX = e.touches[0].clientX - this.initialX, this.currentY = e.touches[0].clientY - this.initialY) : (this.currentX = e.clientX - this.initialX, this.currentY = e.clientY - this.initialY), this.xOffset = this.currentX, this.yOffset = this.currentY, this.img.isDragging = !0, this.dragging = !0, this.setTranslate(this.img, this.currentX, this.currentY));
  }
  onMove(e) {
    if (!this.zoomedIn)
      return;
    let t = e.clientX - this.img.naturalWidth / 2, i = e.clientY - this.img.naturalHeight / 2;
    this.setTranslate(this.img, t, i);
  }
  setTranslate(e, t, i) {
    e.style.transform = "translate3d(" + t + "px, " + i + "px, 0)";
  }
  widowWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }
}
class Wi {
  constructor(e = {}) {
    let { dragEl: t, toleranceX: i = 40, toleranceY: s = 65, slide: n = null, instance: r = null } = e;
    this.el = t, this.active = !1, this.dragging = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.direction = null, this.lastDirection = null, this.toleranceX = i, this.toleranceY = s, this.toleranceReached = !1, this.dragContainer = this.el, this.slide = n, this.instance = r, this.el.addEventListener("mousedown", (o) => this.dragStart(o), !1), this.el.addEventListener("mouseup", (o) => this.dragEnd(o), !1), this.el.addEventListener("mousemove", (o) => this.drag(o), !1);
  }
  dragStart(e) {
    if (this.slide.classList.contains("zoomed")) {
      this.active = !1;
      return;
    }
    e.type === "touchstart" ? (this.initialX = e.touches[0].clientX - this.xOffset, this.initialY = e.touches[0].clientY - this.yOffset) : (this.initialX = e.clientX - this.xOffset, this.initialY = e.clientY - this.yOffset);
    let t = e.target.nodeName.toLowerCase(), i = ["input", "select", "textarea", "button", "a"];
    if (e.target.classList.contains("nodrag") || pe(e.target, ".nodrag") || i.indexOf(t) !== -1) {
      this.active = !1;
      return;
    }
    e.preventDefault(), (e.target === this.el || t !== "img" && pe(e.target, ".gslide-inline")) && (this.active = !0, this.el.classList.add("dragging"), this.dragContainer = pe(e.target, ".ginner-container"));
  }
  dragEnd(e) {
    e && e.preventDefault(), this.initialX = 0, this.initialY = 0, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.active = !1, this.doSlideChange && (this.instance.preventOutsideClick = !0, this.doSlideChange == "right" && this.instance.prevSlide(), this.doSlideChange == "left" && this.instance.nextSlide()), this.doSlideClose && this.instance.close(), this.toleranceReached || this.setTranslate(this.dragContainer, 0, 0, !0), setTimeout(() => {
      this.instance.preventOutsideClick = !1, this.toleranceReached = !1, this.lastDirection = null, this.dragging = !1, this.el.isDragging = !1, this.el.classList.remove("dragging"), this.slide.classList.remove("dragging-nav"), this.dragContainer.style.transform = "", this.dragContainer.style.transition = "";
    }, 100);
  }
  drag(e) {
    if (this.active) {
      e.preventDefault(), this.slide.classList.add("dragging-nav"), e.type === "touchmove" ? (this.currentX = e.touches[0].clientX - this.initialX, this.currentY = e.touches[0].clientY - this.initialY) : (this.currentX = e.clientX - this.initialX, this.currentY = e.clientY - this.initialY), this.xOffset = this.currentX, this.yOffset = this.currentY, this.el.isDragging = !0, this.dragging = !0, this.doSlideChange = !1, this.doSlideClose = !1;
      let t = Math.abs(this.currentX), i = Math.abs(this.currentY);
      if (t > 0 && t >= Math.abs(this.currentY) && (!this.lastDirection || this.lastDirection == "x")) {
        this.yOffset = 0, this.lastDirection = "x", this.setTranslate(this.dragContainer, this.currentX, 0);
        let s = this.shouldChange();
        if (!this.instance.settings.dragAutoSnap && s && (this.doSlideChange = s), this.instance.settings.dragAutoSnap && s) {
          this.instance.preventOutsideClick = !0, this.toleranceReached = !0, this.active = !1, this.instance.preventOutsideClick = !0, this.dragEnd(null), s == "right" && this.instance.prevSlide(), s == "left" && this.instance.nextSlide();
          return;
        }
      }
      if (this.toleranceY > 0 && i > 0 && i >= t && (!this.lastDirection || this.lastDirection == "y")) {
        this.xOffset = 0, this.lastDirection = "y", this.setTranslate(this.dragContainer, 0, this.currentY);
        let s = this.shouldClose();
        !this.instance.settings.dragAutoSnap && s && (this.doSlideClose = !0), this.instance.settings.dragAutoSnap && s && this.instance.close();
        return;
      }
    }
  }
  shouldChange() {
    let e = !1;
    if (Math.abs(this.currentX) >= this.toleranceX) {
      let i = this.currentX > 0 ? "right" : "left";
      (i == "left" && this.slide !== this.slide.parentNode.lastChild || i == "right" && this.slide !== this.slide.parentNode.firstChild) && (e = i);
    }
    return e;
  }
  shouldClose() {
    let e = !1;
    return Math.abs(this.currentY) >= this.toleranceY && (e = !0), e;
  }
  setTranslate(e, t, i, s = !1) {
    s ? e.style.transition = "all .2s ease" : e.style.transition = "", e.style.transform = `translate3d(${t}px, ${i}px, 0)`;
  }
}
function Un(a, e, t, i) {
  const s = a.querySelector(".gslide-media");
  let n = new Image(), r = "gSlideTitle_" + t, o = "gSlideDesc_" + t;
  n.addEventListener("load", () => {
    W(i) && i();
  }, !1), n.src = e.href, e.sizes != "" && e.srcset != "" && (n.sizes = e.sizes, n.srcset = e.srcset), n.alt = "", !ae(e.alt) && e.alt !== "" && (n.alt = e.alt), e.title !== "" && n.setAttribute("aria-labelledby", r), e.description !== "" && n.setAttribute("aria-describedby", o), e.hasOwnProperty("_hasCustomWidth") && e._hasCustomWidth && (n.style.width = e.width), e.hasOwnProperty("_hasCustomHeight") && e._hasCustomHeight && (n.style.height = e.height), s.insertBefore(n, s.firstChild);
}
function jn(a, e, t, i) {
  const s = a.querySelector(".ginner-container"), n = "gvideo" + t, r = a.querySelector(".gslide-media"), o = this.getAllPlayers();
  z(s, "gvideo-container"), r.insertBefore(Re('<div class="gvideo-wrapper"></div>'), r.firstChild);
  const l = a.querySelector(".gvideo-wrapper");
  Ui(this.settings.plyr.css, "Plyr");
  let u = e.href, d = e?.videoProvider, c = !1;
  r.style.maxWidth = e.width, Ui(this.settings.plyr.js, "Plyr", () => {
    if (!d && u.match(/vimeo\.com\/([0-9]*)/) && (d = "vimeo"), !d && (u.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || u.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || u.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/)) && (d = "youtube"), d === "local" || !d) {
      d = "local";
      let y = '<video id="' + n + '" ';
      y += `style="background:#000; max-width: ${e.width};" `, y += 'preload="metadata" ', y += 'x-webkit-airplay="allow" ', y += "playsinline ", y += "controls ", y += 'class="gvideo-local">', y += `<source src="${u}">`, y += "</video>", c = Re(y);
    }
    const h = c || Re(`<div id="${n}" data-plyr-provider="${d}" data-plyr-embed-id="${u}"></div>`);
    z(l, `${d}-video gvideo`), l.appendChild(h), l.setAttribute("data-id", n), l.setAttribute("data-index", t);
    const p = Z(this.settings.plyr, "config") ? this.settings.plyr.config : {}, f = new Plyr("#" + n, p);
    f.on("ready", (y) => {
      o[n] = y.detail.plyr, W(i) && i();
    }), Gt(
      () => a.querySelector("iframe") && a.querySelector("iframe").dataset.ready == "true",
      () => {
        this.resize(a);
      }
    ), f.on("enterfullscreen", Gi), f.on("exitfullscreen", Gi);
  });
}
function Gi(a) {
  const e = pe(a.target, ".gslide-media");
  a.type === "enterfullscreen" && z(e, "fullscreen"), a.type === "exitfullscreen" && K(e, "fullscreen");
}
function Yn(a, e, t, i) {
  const s = a.querySelector(".gslide-media"), n = Z(e, "href") && e.href ? e.href.split("#").pop().trim() : !1, r = Z(e, "content") && e.content ? e.content : !1;
  let o;
  if (r && (Ze(r) && (o = Re(`<div class="ginlined-content">${r}</div>`)), we(r))) {
    r.style.display == "none" && (r.style.display = "block");
    const l = document.createElement("div");
    l.className = "ginlined-content", l.appendChild(r), o = l;
  }
  if (n) {
    let l = document.getElementById(n);
    if (!l)
      return !1;
    const u = l.cloneNode(!0);
    u.style.height = e.height, u.style.maxWidth = e.width, z(u, "ginlined-content"), o = u;
  }
  if (!o)
    return console.error("Unable to append inline slide content", e), !1;
  s.style.height = e.height, s.style.width = e.width, s.appendChild(o), this.events["inlineclose" + n] = le("click", {
    onElement: s.querySelectorAll(".gtrigger-close"),
    withCallback: (l) => {
      l.preventDefault(), this.close();
    }
  }), W(i) && i();
}
function Wn(a, e, t, i) {
  const s = a.querySelector(".gslide-media"), n = qn({
    url: e.href,
    callback: i
  });
  s.parentNode.style.maxWidth = e.width, s.parentNode.style.height = e.height, s.appendChild(n);
}
class Gn {
  constructor(e = {}) {
    this.defaults = {
      href: "",
      sizes: "",
      srcset: "",
      title: "",
      type: "",
      videoProvider: "",
      description: "",
      alt: "",
      descPosition: "bottom",
      effect: "",
      width: "",
      height: "",
      content: !1,
      zoomable: !0,
      draggable: !0
    }, ze(e) && (this.defaults = ve(this.defaults, e));
  }
  /**
   * Get source type
   * gte the source type of a url
   *
   * @param {string} url
   */
  sourceType(e) {
    let t = e;
    return e = e.toLowerCase(), e.match(/\.(jpeg|jpg|jpe|gif|png|apn|webp|avif|svg)/) !== null ? "image" : e.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || e.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || e.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/) || e.match(/vimeo\.com\/([0-9]*)/) || e.match(/\.(mp4|ogg|webm|mov)/) !== null ? "video" : e.match(/\.(mp3|wav|wma|aac|ogg)/) !== null ? "audio" : e.indexOf("#") > -1 && t.split("#").pop().trim() !== "" ? "inline" : e.indexOf("goajax=true") > -1 ? "ajax" : "external";
  }
  parseConfig(e, t) {
    let i = ve({ descPosition: t.descPosition }, this.defaults);
    if (ze(e) && !we(e)) {
      Z(e, "type") || (Z(e, "content") && e.content ? e.type = "inline" : Z(e, "href") && (e.type = this.sourceType(e.href)));
      let o = ve(i, e);
      return this.setSize(o, t), o;
    }
    let s = "", n = e.getAttribute("data-glightbox"), r = e.nodeName.toLowerCase();
    if (r === "a" && (s = e.href), r === "img" && (s = e.src, i.alt = e.alt), i.href = s, J(i, (o, l) => {
      Z(t, l) && l !== "width" && (i[l] = t[l]);
      const u = e.dataset[l];
      ae(u) || (i[l] = this.sanitizeValue(u));
    }), i.content && (i.type = "inline"), !i.type && s && (i.type = this.sourceType(s)), ae(n)) {
      if (!i.title && r == "a") {
        let o = e.title;
        !ae(o) && o !== "" && (i.title = o);
      }
      if (!i.title && r == "img") {
        let o = e.alt;
        !ae(o) && o !== "" && (i.title = o);
      }
    } else {
      let o = [];
      J(i, (l, u) => {
        o.push(";\\s?" + u);
      }), o = o.join("\\s?:|"), n.trim() !== "" && J(i, (l, u) => {
        const d = n, c = "s?" + u + "s?:s?(.*?)(" + o + "s?:|$)", h = new RegExp(c), p = d.match(h);
        if (p && p.length && p[1]) {
          const f = p[1].trim().replace(/;\s*$/, "");
          i[u] = this.sanitizeValue(f);
        }
      });
    }
    if (i.description && i.description.substring(0, 1) === ".") {
      let o;
      try {
        o = document.querySelector(i.description).innerHTML;
      } catch (l) {
        if (!(l instanceof DOMException))
          throw l;
      }
      o && (i.description = o);
    }
    if (!i.description) {
      let o = e.querySelector(".glightbox-desc");
      o && (i.description = o.innerHTML);
    }
    return this.setSize(i, t, e), this.slideConfig = i, i;
  }
  /**
   * Set slide data size
   * set the correct size dependin
   * on the slide type
   *
   * @param { object } data
   * @param { object } settings
   * @return { object }
   */
  setSize(e, t, i = null) {
    const s = e.type == "video" ? this.checkSize(t.videosWidth) : this.checkSize(t.width), n = this.checkSize(t.height);
    return e.width = Z(e, "width") && e.width !== "" ? this.checkSize(e.width) : s, e.height = Z(e, "height") && e.height !== "" ? this.checkSize(e.height) : n, i && e.type == "image" && (e._hasCustomWidth = !!i.dataset.width, e._hasCustomHeight = !!i.dataset.height), e;
  }
  /**
   * [checkSize size
   * check if the passed size has a correct unit
   *
   * @param {string} size
   * @return {string}
   */
  checkSize(e) {
    return mt(e) ? `${e}px` : e;
  }
  /**
   * Sanitize data attributes value
   *
   * @param string val
   * @return mixed
   */
  sanitizeValue(e) {
    return e !== "true" && e !== "false" ? e : e === "true";
  }
}
class lt {
  constructor(e, t, i) {
    this.element = e, this.instance = t, this.index = i;
  }
  /**
   * Set slide content
   *
   * @param {node} slide
   * @param {object} data
   * @param {function} callback
   */
  setContent(e = null, t = !1) {
    if (se(e, "loaded"))
      return !1;
    const i = this.instance.settings, s = this.slideConfig, n = ci();
    W(i.beforeSlideLoad) && i.beforeSlideLoad({
      index: this.index,
      slide: e,
      player: !1
    });
    let r = s.type, o = s.descPosition, l = e.querySelector(".gslide-media"), u = e.querySelector(".gslide-title"), d = e.querySelector(".gslide-desc"), c = e.querySelector(".gdesc-inner"), h = t, p = "gSlideTitle_" + this.index, f = "gSlideDesc_" + this.index;
    if (W(i.afterSlideLoad) && (h = () => {
      W(t) && t(), i.afterSlideLoad({
        index: this.index,
        slide: e,
        player: this.instance.getSlidePlayerInstance(this.index)
      });
    }), s.title == "" && s.description == "" ? c && c.parentNode.parentNode.removeChild(c.parentNode) : (u && s.title !== "" ? (u.id = p, u.innerHTML = s.title) : u.parentNode.removeChild(u), d && s.description !== "" ? (d.id = f, n && i.moreLength > 0 ? (s.smallDescription = this.slideShortDesc(s.description, i.moreLength, i.moreText), d.innerHTML = s.smallDescription, this.descriptionEvents(d, s)) : d.innerHTML = s.description) : d.parentNode.removeChild(d), z(l.parentNode, `desc-${o}`), z(c.parentNode, `description-${o}`)), z(l, `gslide-${r}`), z(e, "loaded"), r === "video") {
      jn.apply(this.instance, [e, s, this.index, h]);
      return;
    }
    if (r === "external") {
      Wn.apply(this, [e, s, this.index, h]);
      return;
    }
    if (r === "inline") {
      Yn.apply(this.instance, [e, s, this.index, h]), s.draggable && new Wi({
        dragEl: e.querySelector(".gslide-inline"),
        toleranceX: i.dragToleranceX,
        toleranceY: i.dragToleranceY,
        slide: e,
        instance: this.instance
      });
      return;
    }
    if (r === "image") {
      Un(e, s, this.index, () => {
        const y = e.querySelector("img");
        s.draggable && new Wi({
          dragEl: y,
          toleranceX: i.dragToleranceX,
          toleranceY: i.dragToleranceY,
          slide: e,
          instance: this.instance
        }), s.zoomable && y.naturalWidth > y.offsetWidth && (z(y, "zoomable"), new Fn(y, e, () => {
          this.instance.resize();
        })), W(h) && h();
      });
      return;
    }
    W(h) && h();
  }
  slideShortDesc(e, t = 50, i = !1) {
    let s = document.createElement("div");
    s.innerHTML = e;
    let n = s.innerText, r = i;
    if (e = n.trim(), e.length <= t)
      return e;
    let o = e.substr(0, t - 1);
    return r ? (s = null, o + '... <a href="#" class="desc-more">' + i + "</a>") : o;
  }
  descriptionEvents(e, t) {
    let i = e.querySelector(".desc-more");
    if (!i)
      return !1;
    le("click", {
      onElement: i,
      withCallback: (s, n) => {
        s.preventDefault();
        const r = document.body;
        let o = pe(n, ".gslide-desc");
        if (!o)
          return !1;
        o.innerHTML = t.description, z(r, "gdesc-open");
        let l = le("click", {
          onElement: [r, pe(o, ".gslide-description")],
          withCallback: (u, d) => {
            u.target.nodeName.toLowerCase() !== "a" && (K(r, "gdesc-open"), z(r, "gdesc-closed"), o.innerHTML = t.smallDescription, this.descriptionEvents(o, t), setTimeout(() => {
              K(r, "gdesc-closed");
            }, 400), l.destroy());
          }
        });
      }
    });
  }
  /**
   * Create Slide Node
   *
   * @return { node }
   */
  create() {
    return Re(this.instance.settings.slideHTML);
  }
  /**
   * Get slide config
   * returns each individual slide config
   * it uses SlideConfigParser
   * each slide can overwrite a global setting
   * read more in the SlideConfigParser class
   *
   * @return { object }
   */
  getConfig() {
    !we(this.element) && !this.element.hasOwnProperty("draggable") && (this.element.draggable = this.instance.settings.draggable);
    const e = new Gn(this.instance.settings.slideExtraAttributes);
    return this.slideConfig = e.parseConfig(this.element, this.instance.settings), this.slideConfig;
  }
}
const Vn = "3.2.0", Vi = ci(), Xi = Pn();
let Vt;
typeof document > "u" || (Vt = document.getElementsByTagName("html")[0]);
const ui = {
  selector: ".glightbox",
  elements: null,
  skin: "clean",
  theme: "clean",
  closeButton: !0,
  startAt: null,
  autoplayVideos: !0,
  autofocusVideos: !0,
  descPosition: "bottom",
  width: "900px",
  height: "506px",
  videosWidth: "960px",
  beforeSlideChange: null,
  afterSlideChange: null,
  beforeSlideLoad: null,
  afterSlideLoad: null,
  slideInserted: null,
  slideRemoved: null,
  slideExtraAttributes: null,
  onOpen: null,
  onClose: null,
  loop: !1,
  zoomable: !0,
  draggable: !0,
  dragAutoSnap: !1,
  dragToleranceX: 40,
  dragToleranceY: 65,
  preload: !0,
  oneSlidePerOpen: !1,
  touchNavigation: !0,
  touchFollowAxis: !0,
  keyboardNavigation: !0,
  closeOnOutsideClick: !0,
  plugins: !1,
  plyr: {
    css: "https://cdn.plyr.io/3.6.12/plyr.css",
    js: "https://cdn.plyr.io/3.6.12/plyr.js",
    config: {
      ratio: "16:9",
      // or '4:3'
      fullscreen: { enabled: !0, iosNative: !0 },
      youtube: {
        noCookie: !0,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3
        // eslint-disable-line camelcase
      },
      vimeo: {
        byline: !1,
        portrait: !1,
        title: !1,
        transparent: !1
      }
    }
  },
  openEffect: "zoom",
  // fade, zoom, none
  closeEffect: "zoom",
  // fade, zoom, none
  slideEffect: "slide",
  // fade, slide, zoom, none
  moreText: "See more",
  moreLength: 60,
  cssEfects: {
    fade: { in: "fadeIn", out: "fadeOut" },
    zoom: { in: "zoomIn", out: "zoomOut" },
    slide: { in: "slideInRight", out: "slideOutLeft" },
    slideBack: { in: "slideInLeft", out: "slideOutRight" },
    none: { in: "none", out: "none" }
  },
  svg: {
    close: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><g><g><path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306C514.019,27.23,514.019,14.135,505.943,6.058z"/></g></g><g><g><path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z"/></g></g></svg>',
    next: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"> <g><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"/></g></svg>',
    prev: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"><g><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/></g></svg>'
  }
};
ui.slideHTML = `<div class="gslide">
    <div class="gslide-inner-content">
        <div class="ginner-container">
            <div class="gslide-media">
            </div>
            <div class="gslide-description">
                <div class="gdesc-inner">
                    <h4 class="gslide-title"></h4>
                    <div class="gslide-desc"></div>
                </div>
            </div>
        </div>
    </div>
</div>`;
ui.lightboxHTML = `<div id="glightbox-body" class="glightbox-container" tabindex="-1" role="dialog" aria-hidden="false">
    <div class="gloader visible"></div>
    <div class="goverlay"></div>
    <div class="gcontainer">
    <div id="glightbox-slider" class="gslider"></div>
    <button class="gclose gbtn" aria-label="Close" data-taborder="3">{closeSVG}</button>
    <button class="gprev gbtn" aria-label="Previous" data-taborder="2">{prevSVG}</button>
    <button class="gnext gbtn" aria-label="Next" data-taborder="1">{nextSVG}</button>
</div>
</div>`;
class Ji {
  constructor(e = {}) {
    this.customOptions = e, this.settings = ve(ui, e), this.effectsClasses = this.getAnimationClasses(), this.videoPlayers = {}, this.apiEvents = [], this.fullElementsList = !1;
  }
  init() {
    const e = this.getSelector();
    e && (this.baseEvents = le("click", {
      onElement: e,
      withCallback: (t, i) => {
        t.preventDefault(), this.open(i);
      }
    })), this.elements = this.getElements();
  }
  open(e = null, t = null) {
    if (this.elements.length === 0)
      return !1;
    this.activeSlide = null, this.prevActiveSlideIndex = null, this.prevActiveSlide = null;
    let i = mt(t) ? t : this.settings.startAt;
    if (we(e)) {
      const o = e.getAttribute("data-gallery");
      o && (this.fullElementsList = this.elements, this.elements = this.getGalleryElements(this.elements, o)), ae(i) && (i = this.getElementIndex(e), i < 0 && (i = 0));
    }
    mt(i) || (i = 0), this.build(), Ie(this.overlay, this.settings.openEffect === "none" ? "none" : this.settings.cssEfects.fade.in);
    const s = document.body, n = window.innerWidth - document.documentElement.clientWidth;
    if (n > 0) {
      var r = document.createElement("style");
      r.type = "text/css", r.className = "gcss-styles", r.innerText = `.gscrollbar-fixer {margin-right: ${n}px}`, document.head.appendChild(r), z(s, "gscrollbar-fixer");
    }
    z(s, "glightbox-open"), z(Vt, "glightbox-open"), Vi && (z(document.body, "glightbox-mobile"), this.settings.slideEffect = "slide"), this.showSlide(i, !0), this.elements.length === 1 ? (z(this.prevButton, "glightbox-button-hidden"), z(this.nextButton, "glightbox-button-hidden")) : (K(this.prevButton, "glightbox-button-hidden"), K(this.nextButton, "glightbox-button-hidden")), this.lightboxOpen = !0, this.trigger("open"), W(this.settings.onOpen) && this.settings.onOpen(), Xi && this.settings.touchNavigation && Bn(this), this.settings.keyboardNavigation && On(this);
  }
  /**
   * Open at specific index
   * @param {int} index
   */
  openAt(e = 0) {
    this.open(null, e);
  }
  /**
   * Set Slide
   */
  showSlide(e = 0, t = !1) {
    Fi(this.loader), this.index = parseInt(e);
    let i = this.slidesContainer.querySelector(".current");
    i && K(i, "current"), this.slideAnimateOut();
    let s = this.slidesContainer.querySelectorAll(".gslide")[e];
    if (se(s, "loaded"))
      this.slideAnimateIn(s, t), Ut(this.loader);
    else {
      Fi(this.loader);
      const n = this.elements[e], r = {
        index: this.index,
        slide: s,
        //this will be removed in the future
        slideNode: s,
        slideConfig: n.slideConfig,
        slideIndex: this.index,
        trigger: n.node,
        player: null
      };
      this.trigger("slide_before_load", r), n.instance.setContent(s, () => {
        Ut(this.loader), this.resize(), this.slideAnimateIn(s, t), this.trigger("slide_after_load", r);
      });
    }
    this.slideDescription = s.querySelector(".gslide-description"), this.slideDescriptionContained = this.slideDescription && se(this.slideDescription.parentNode, "gslide-media"), this.settings.preload && (this.preloadSlide(e + 1), this.preloadSlide(e - 1)), this.updateNavigationClasses(), this.activeSlide = s;
  }
  /**
   * Preload slides
   * @param  {Int}  index slide index
   * @return {null}
   */
  preloadSlide(e) {
    if (e < 0 || e > this.elements.length - 1 || ae(this.elements[e]))
      return !1;
    let t = this.slidesContainer.querySelectorAll(".gslide")[e];
    if (se(t, "loaded"))
      return !1;
    const i = this.elements[e], s = i.type, n = {
      index: e,
      slide: t,
      //this will be removed in the future
      slideNode: t,
      slideConfig: i.slideConfig,
      slideIndex: e,
      trigger: i.node,
      player: null
    };
    this.trigger("slide_before_load", n), s === "video" || s === "external" ? setTimeout(() => {
      i.instance.setContent(t, () => {
        this.trigger("slide_after_load", n);
      });
    }, 200) : i.instance.setContent(t, () => {
      this.trigger("slide_after_load", n);
    });
  }
  /**
   * Load previous slide
   * calls goToslide
   */
  prevSlide() {
    this.goToSlide(this.index - 1);
  }
  /**
   * Load next slide
   * calls goToslide
   */
  nextSlide() {
    this.goToSlide(this.index + 1);
  }
  /**
   * Go to sldei
   * calls set slide
   * @param {Int} - index
   */
  goToSlide(e = !1) {
    if (this.prevActiveSlide = this.activeSlide, this.prevActiveSlideIndex = this.index, !this.loop() && (e < 0 || e > this.elements.length - 1))
      return !1;
    e < 0 ? e = this.elements.length - 1 : e >= this.elements.length && (e = 0), this.showSlide(e);
  }
  /**
   * Insert slide
   *
   * @param { object } data
   * @param { numeric } position
   */
  insertSlide(e = {}, t = -1) {
    t < 0 && (t = this.elements.length);
    const i = new lt(e, this, t), s = i.getConfig(), n = ve({}, s), r = i.create(), o = this.elements.length - 1;
    n.index = t, n.node = !1, n.instance = i, n.slideConfig = s, this.elements.splice(t, 0, n);
    let l = null, u = null;
    if (this.slidesContainer) {
      if (t > o)
        this.slidesContainer.appendChild(r);
      else {
        let d = this.slidesContainer.querySelectorAll(".gslide")[t];
        this.slidesContainer.insertBefore(r, d);
      }
      (this.settings.preload && this.index == 0 && t == 0 || this.index - 1 == t || this.index + 1 == t) && this.preloadSlide(t), this.index === 0 && t === 0 && (this.index = 1), this.updateNavigationClasses(), l = this.slidesContainer.querySelectorAll(".gslide")[t], u = this.getSlidePlayerInstance(t), n.slideNode = l;
    }
    this.trigger("slide_inserted", {
      index: t,
      slide: l,
      slideNode: l,
      slideConfig: s,
      slideIndex: t,
      trigger: null,
      player: u
    }), W(this.settings.slideInserted) && this.settings.slideInserted({
      index: t,
      slide: l,
      player: u
    });
  }
  /**
   * Remove slide
   *
   * @param { numeric } position
   */
  removeSlide(e = -1) {
    if (e < 0 || e > this.elements.length - 1)
      return !1;
    const t = this.slidesContainer && this.slidesContainer.querySelectorAll(".gslide")[e];
    t && (this.getActiveSlideIndex() == e && (e == this.elements.length - 1 ? this.prevSlide() : this.nextSlide()), t.parentNode.removeChild(t)), this.elements.splice(e, 1), this.trigger("slide_removed", e), W(this.settings.slideRemoved) && this.settings.slideRemoved(e);
  }
  /**
   * Slide In
   * @return {null}
   */
  slideAnimateIn(e, t) {
    let i = e.querySelector(".gslide-media"), s = e.querySelector(".gslide-description"), n = {
      index: this.prevActiveSlideIndex,
      slide: this.prevActiveSlide,
      //this will be removed in the future
      slideNode: this.prevActiveSlide,
      slideIndex: this.prevActiveSlide,
      slideConfig: ae(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].slideConfig,
      trigger: ae(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].node,
      player: this.getSlidePlayerInstance(this.prevActiveSlideIndex)
    }, r = {
      index: this.index,
      slide: this.activeSlide,
      //this will be removed in the future
      slideNode: this.activeSlide,
      slideConfig: this.elements[this.index].slideConfig,
      slideIndex: this.index,
      trigger: this.elements[this.index].node,
      player: this.getSlidePlayerInstance(this.index)
    };
    if (i.offsetWidth > 0 && s && (Ut(s), s.style.display = ""), K(e, this.effectsClasses), t)
      Ie(e, this.settings.cssEfects[this.settings.openEffect].in, () => {
        this.settings.autoplayVideos && this.slidePlayerPlay(e), this.trigger("slide_changed", {
          prev: n,
          current: r
        }), W(this.settings.afterSlideChange) && this.settings.afterSlideChange.apply(this, [n, r]);
      });
    else {
      let o = this.settings.slideEffect, l = o !== "none" ? this.settings.cssEfects[o].in : o;
      this.prevActiveSlideIndex > this.index && this.settings.slideEffect == "slide" && (l = this.settings.cssEfects.slideBack.in), Ie(e, l, () => {
        this.settings.autoplayVideos && this.slidePlayerPlay(e), this.trigger("slide_changed", {
          prev: n,
          current: r
        }), W(this.settings.afterSlideChange) && this.settings.afterSlideChange.apply(this, [n, r]);
      });
    }
    setTimeout(() => {
      this.resize(e);
    }, 100), z(e, "current");
  }
  /**
   * Slide out
   */
  slideAnimateOut() {
    if (!this.prevActiveSlide)
      return !1;
    let e = this.prevActiveSlide;
    K(e, this.effectsClasses), z(e, "prev");
    let t = this.settings.slideEffect, i = t !== "none" ? this.settings.cssEfects[t].out : t;
    this.slidePlayerPause(e), this.trigger("slide_before_change", {
      prev: {
        index: this.prevActiveSlideIndex,
        //this will be removed in the future
        slide: this.prevActiveSlide,
        //this will be removed in the future
        slideNode: this.prevActiveSlide,
        slideIndex: this.prevActiveSlideIndex,
        slideConfig: ae(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].slideConfig,
        trigger: ae(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].node,
        player: this.getSlidePlayerInstance(this.prevActiveSlideIndex)
      },
      current: {
        index: this.index,
        //this will be removed in the future
        slide: this.activeSlide,
        //this will be removed in the future
        slideNode: this.activeSlide,
        slideIndex: this.index,
        slideConfig: this.elements[this.index].slideConfig,
        trigger: this.elements[this.index].node,
        player: this.getSlidePlayerInstance(this.index)
      }
    }), W(this.settings.beforeSlideChange) && this.settings.beforeSlideChange.apply(this, [
      {
        index: this.prevActiveSlideIndex,
        slide: this.prevActiveSlide,
        player: this.getSlidePlayerInstance(this.prevActiveSlideIndex)
      },
      {
        index: this.index,
        slide: this.activeSlide,
        player: this.getSlidePlayerInstance(this.index)
      }
    ]), this.prevActiveSlideIndex > this.index && this.settings.slideEffect == "slide" && (i = this.settings.cssEfects.slideBack.out), Ie(e, i, () => {
      let s = e.querySelector(".ginner-container"), n = e.querySelector(".gslide-media"), r = e.querySelector(".gslide-description");
      s.style.transform = "", n.style.transform = "", K(n, "greset"), n.style.opacity = "", r && (r.style.opacity = ""), K(e, "prev");
    });
  }
  /**
   * Get all defined players
   */
  getAllPlayers() {
    return this.videoPlayers;
  }
  /**
   * Get player at index
   *
   * @param index
   * @return bool|object
   */
  getSlidePlayerInstance(e) {
    const t = "gvideo" + e, i = this.getAllPlayers();
    return Z(i, t) && i[t] ? i[t] : !1;
  }
  /**
   * Stop video at specified
   * node or index
   *
   * @param slide node or index
   * @return void
   */
  stopSlideVideo(e) {
    if (we(e)) {
      let i = e.querySelector(".gvideo-wrapper");
      i && (e = i.getAttribute("data-index"));
    }
    console.log("stopSlideVideo is deprecated, use slidePlayerPause");
    const t = this.getSlidePlayerInstance(e);
    t && t.playing && t.pause();
  }
  /**
   * Stop player at specified index
   *
   * @param slide node or index
   * @return void
   */
  slidePlayerPause(e) {
    if (we(e)) {
      let i = e.querySelector(".gvideo-wrapper");
      i && (e = i.getAttribute("data-index"));
    }
    const t = this.getSlidePlayerInstance(e);
    t && t.playing && t.pause();
  }
  /**
   * Play video at specified
   * node or index
   *
   * @param slide node or index
   * @return void
   */
  playSlideVideo(e) {
    if (we(e)) {
      let i = e.querySelector(".gvideo-wrapper");
      i && (e = i.getAttribute("data-index"));
    }
    console.log("playSlideVideo is deprecated, use slidePlayerPlay");
    const t = this.getSlidePlayerInstance(e);
    t && !t.playing && t.play();
  }
  /**
   * Play media player at specified
   * node or index
   *
   * @param slide node or index
   * @return void
   */
  slidePlayerPlay(e) {
    if (Vi && !this.settings.plyr.config?.muted)
      return;
    if (we(e)) {
      let i = e.querySelector(".gvideo-wrapper");
      i && (e = i.getAttribute("data-index"));
    }
    const t = this.getSlidePlayerInstance(e);
    t && !t.playing && (t.play(), this.settings.autofocusVideos && t.elements.container.focus());
  }
  /**
   * Set the entire elements
   * in the gallery, it replaces all
   * the existing elements
   * with the specified list
   *
   * @param {array}  elements
   */
  setElements(e) {
    this.settings.elements = !1;
    const t = [];
    e && e.length && J(e, (i, s) => {
      const n = new lt(i, this, s), r = n.getConfig(), o = ve({}, r);
      o.slideConfig = r, o.instance = n, o.index = s, t.push(o);
    }), this.elements = t, this.lightboxOpen && (this.slidesContainer.innerHTML = "", this.elements.length && (J(this.elements, () => {
      let i = Re(this.settings.slideHTML);
      this.slidesContainer.appendChild(i);
    }), this.showSlide(0, !0)));
  }
  /**
   * Return the index
   * of the specified node,
   * this node is for example an image, link, etc.
   * that when clicked it opens the lightbox
   * its position in the elements array can change
   * when using insertSlide or removeSlide so we
   * need to find it in the elements list
   *
   * @param {node} node
   * @return bool|int
   */
  getElementIndex(e) {
    let t = !1;
    return J(this.elements, (i, s) => {
      if (Z(i, "node") && i.node == e)
        return t = s, !0;
    }), t;
  }
  /**
   * Get elements
   * returns an array containing all
   * the elements that must be displayed in the
   * lightbox
   *
   * @return { array }
   */
  getElements() {
    let e = [];
    this.elements = this.elements ? this.elements : [], !ae(this.settings.elements) && _s(this.settings.elements) && this.settings.elements.length && J(this.settings.elements, (s, n) => {
      const r = new lt(s, this, n), o = r.getConfig(), l = ve({}, o);
      l.node = !1, l.index = n, l.instance = r, l.slideConfig = o, e.push(l);
    });
    let t = !1;
    return this.getSelector() && (t = document.querySelectorAll(this.getSelector())), t && J(t, (s, n) => {
      const r = new lt(s, this, n), o = r.getConfig(), l = ve({}, o);
      l.node = s, l.index = n, l.instance = r, l.slideConfig = o, l.gallery = s.getAttribute("data-gallery"), e.push(l);
    }), e;
  }
  /**
   * Return only the elements
   * from a specific gallery
   *
   * @return array
   */
  getGalleryElements(e, t) {
    return e.filter((i) => i.gallery == t);
  }
  /**
   * Get selector
   */
  getSelector() {
    return this.settings.elements ? !1 : this.settings.selector && this.settings.selector.substring(0, 5) == "data-" ? `*[${this.settings.selector}]` : this.settings.selector;
  }
  /**
   * Get the active slide
   */
  getActiveSlide() {
    return this.slidesContainer.querySelectorAll(".gslide")[this.index];
  }
  /**
   * Get the active index
   */
  getActiveSlideIndex() {
    return this.index;
  }
  /**
   * Get the defined
   * effects as string
   */
  getAnimationClasses() {
    let e = [];
    for (let t in this.settings.cssEfects)
      if (this.settings.cssEfects.hasOwnProperty(t)) {
        let i = this.settings.cssEfects[t];
        e.push(`g${i.in}`), e.push(`g${i.out}`);
      }
    return e.join(" ");
  }
  /**
   * Build the structure
   * @return {null}
   */
  build() {
    if (this.built)
      return !1;
    const e = document.body.childNodes, t = [];
    J(e, (u) => {
      u.parentNode == document.body && u.nodeName.charAt(0) !== "#" && u.hasAttribute && !u.hasAttribute("aria-hidden") && (t.push(u), u.setAttribute("aria-hidden", "true"));
    });
    const i = Z(this.settings.svg, "next") ? this.settings.svg.next : "", s = Z(this.settings.svg, "prev") ? this.settings.svg.prev : "", n = Z(this.settings.svg, "close") ? this.settings.svg.close : "";
    let r = this.settings.lightboxHTML;
    r = r.replace(/{nextSVG}/g, i), r = r.replace(/{prevSVG}/g, s), r = r.replace(/{closeSVG}/g, n), r = Re(r), document.body.appendChild(r);
    const o = document.getElementById("glightbox-body");
    this.modal = o;
    let l = o.querySelector(".gclose");
    this.prevButton = o.querySelector(".gprev"), this.nextButton = o.querySelector(".gnext"), this.overlay = o.querySelector(".goverlay"), this.loader = o.querySelector(".gloader"), this.slidesContainer = document.getElementById("glightbox-slider"), this.bodyHiddenChildElms = t, this.events = {}, z(this.modal, "glightbox-" + this.settings.skin), this.settings.closeButton && l && (this.events.close = le("click", {
      onElement: l,
      withCallback: (u, d) => {
        u.preventDefault(), this.close();
      }
    })), l && !this.settings.closeButton && l.parentNode.removeChild(l), this.nextButton && (this.events.next = le("click", {
      onElement: this.nextButton,
      withCallback: (u, d) => {
        u.preventDefault(), this.nextSlide();
      }
    })), this.prevButton && (this.events.prev = le("click", {
      onElement: this.prevButton,
      withCallback: (u, d) => {
        u.preventDefault(), this.prevSlide();
      }
    })), this.settings.closeOnOutsideClick && (this.events.outClose = le("click", {
      onElement: o,
      withCallback: (u, d) => {
        !this.preventOutsideClick && !se(document.body, "glightbox-mobile") && !pe(u.target, ".ginner-container") && !pe(u.target, ".gbtn") && !se(u.target, "gnext") && !se(u.target, "gprev") && this.close();
      }
    })), J(this.elements, (u, d) => {
      this.slidesContainer.appendChild(u.instance.create()), u.slideNode = this.slidesContainer.querySelectorAll(".gslide")[d];
    }), Xi && z(document.body, "glightbox-touch"), this.events.resize = le("resize", {
      onElement: window,
      withCallback: () => {
        this.resize();
      }
    }), this.built = !0;
  }
  /**
   * Handle resize
   * Create only to handle
   * when the height of the screen
   * is lower than the slide content
   * this helps to resize videos vertically
   * and images with description
   */
  resize(e = null) {
    if (e = e || this.activeSlide, !e || se(e, "zoomed"))
      return;
    const t = ws(), i = e.querySelector(".gvideo-wrapper"), s = e.querySelector(".gslide-image"), n = this.slideDescription;
    let r = t.width, o = t.height;
    if (r <= 768 ? z(document.body, "glightbox-mobile") : K(document.body, "glightbox-mobile"), !i && !s)
      return;
    let l = !1;
    if (n && (se(n, "description-bottom") || se(n, "description-top")) && !se(n, "gabsolute") && (l = !0), s) {
      if (r <= 768)
        s.querySelector("img");
      else if (l) {
        let u = n.offsetHeight, d = s.querySelector("img");
        const h = this.elements[this.index].node.getAttribute("data-height") ?? "100vh";
        d.setAttribute("style", `max-height: calc(${h} - ${u}px)`), n.setAttribute("style", `max-width: ${d.offsetWidth}px;`);
      }
    }
    if (i) {
      let u = Z(this.settings.plyr.config, "ratio") ? this.settings.plyr.config.ratio : "";
      if (!u) {
        const f = i.clientWidth, y = i.clientHeight, _ = f / y;
        u = `${f / _}:${y / _}`;
      }
      let d = u.split(":"), c = this.settings.videosWidth, h = this.settings.videosWidth;
      mt(c) || c.indexOf("px") !== -1 ? h = parseInt(c) : c.indexOf("vw") !== -1 ? h = r * parseInt(c) / 100 : c.indexOf("vh") !== -1 ? h = o * parseInt(c) / 100 : c.indexOf("%") !== -1 ? h = r * parseInt(c) / 100 : h = parseInt(i.clientWidth);
      let p = h / (parseInt(d[0]) / parseInt(d[1]));
      if (p = Math.floor(p), l && (o = o - n.offsetHeight), h > r || p > o || o < p && r > h) {
        let f = i.offsetWidth, y = i.offsetHeight, _ = o / y, g = { width: f * _ };
        i.parentNode.setAttribute("style", `max-width: ${g.width}px`), l && n.setAttribute("style", `max-width: ${g.width}px;`);
      } else
        i.parentNode.style.maxWidth = `${c}`, l && n.setAttribute("style", `max-width: ${c};`);
    }
  }
  /**
   * Reload Lightbox
   * reload and apply events to nodes
   */
  reload() {
    this.init();
  }
  /**
   * Update navigation classes on slide change
   */
  updateNavigationClasses() {
    const e = this.loop();
    K(this.nextButton, "disabled"), K(this.prevButton, "disabled"), this.index == 0 && this.elements.length - 1 == 0 ? (z(this.prevButton, "disabled"), z(this.nextButton, "disabled")) : this.index === 0 && !e ? z(this.prevButton, "disabled") : this.index === this.elements.length - 1 && !e && z(this.nextButton, "disabled");
  }
  /**
   * Handle loop config
   */
  loop() {
    let e = Z(this.settings, "loopAtEnd") ? this.settings.loopAtEnd : null;
    return e = Z(this.settings, "loop") ? this.settings.loop : e, e;
  }
  /**
   * Close Lightbox
   * closes the lightbox and removes the slides
   * and some classes
   */
  close() {
    if (!this.lightboxOpen) {
      if (this.events) {
        for (let e in this.events)
          this.events.hasOwnProperty(e) && this.events[e].destroy();
        this.events = null;
      }
      return !1;
    }
    if (this.closing)
      return !1;
    this.closing = !0, this.slidePlayerPause(this.activeSlide), this.fullElementsList && (this.elements = this.fullElementsList), this.bodyHiddenChildElms.length && J(this.bodyHiddenChildElms, (e) => {
      e.removeAttribute("aria-hidden");
    }), z(this.modal, "glightbox-closing"), Ie(this.overlay, this.settings.openEffect == "none" ? "none" : this.settings.cssEfects.fade.out), Ie(this.activeSlide, this.settings.cssEfects[this.settings.closeEffect].out, () => {
      if (this.activeSlide = null, this.prevActiveSlideIndex = null, this.prevActiveSlide = null, this.built = !1, this.events) {
        for (let i in this.events)
          this.events.hasOwnProperty(i) && this.events[i].destroy();
        this.events = null;
      }
      const e = document.body;
      K(Vt, "glightbox-open"), K(e, "glightbox-open touching gdesc-open glightbox-touch glightbox-mobile gscrollbar-fixer"), this.modal.parentNode.removeChild(this.modal), this.trigger("close"), W(this.settings.onClose) && this.settings.onClose();
      const t = document.querySelector(".gcss-styles");
      t && t.parentNode.removeChild(t), this.lightboxOpen = !1, this.closing = null;
    });
  }
  /**
   * Destroy lightbox
   * and all events
   */
  destroy() {
    this.close(), this.clearAllEvents(), this.baseEvents && this.baseEvents.destroy();
  }
  /**
   * Set event
   */
  on(e, t, i = !1) {
    if (!e || !W(t))
      throw new TypeError("Event name and callback must be defined");
    this.apiEvents.push({ evt: e, once: i, callback: t });
  }
  /**
   * Set event
   */
  once(e, t) {
    this.on(e, t, !0);
  }
  /**
   * Triggers an specific event
   * with data
   *
   * @param string eventName
   */
  trigger(e, t = null) {
    const i = [];
    J(this.apiEvents, (s, n) => {
      const { evt: r, once: o, callback: l } = s;
      r == e && (l(t), o && i.push(n));
    }), i.length && J(i, (s) => this.apiEvents.splice(s, 1));
  }
  /**
   * Removes all events
   * set using the API
   */
  clearAllEvents() {
    this.apiEvents.splice(0, this.apiEvents.length);
  }
  /**
   * Get Version
   */
  version() {
    return Vn;
  }
}
class Xn {
  constructor(e = {}) {
    this.animationTime = e.animationTime ?? 800, this.frameRate = e.frameRate ?? 150, this.stepSize = e.stepSize ?? 120, this.accelerationDelta = e.accelerationDelta ?? 300, this.accelerationMax = e.accelerationMax ?? 2, this.pulseScale = e.pulseScale ?? 4, this.pulseNormalize = 1, this.keyboardSupport = e.keyboardSupport ?? !0, this.arrowScroll = e.arrowScroll ?? 50, this.fixedBackground = e.fixedBackground ?? !1, this.queue = [], this.pending = !1, this.lastScrollTime = Date.now(), this.direction = { x: 0, y: 0 }, this.activeElement = null, this.deltaBuffer = [], this.deltaBufferTimer = null, this.isMac = /^Mac/.test(navigator.platform), this.scrollBehaviorCache = /* @__PURE__ */ new WeakMap(), this.ancestorCache = /* @__PURE__ */ new WeakMap(), this.ancestorCacheTTL = 300, this.ancestorCacheGen = 0, this._lastWheelTime = 0, this.pulseNormalize = 1 / this._pulseRaw(1), this._init();
  }
  _init() {
    const e = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";
    window.addEventListener(e, this._onWheel.bind(this), { passive: !1 }), this.keyboardSupport && window.addEventListener("keydown", this._onKeydown.bind(this), !1), window.addEventListener("mousedown", this._onMousedown.bind(this), !1), window.addEventListener("resize", () => {
      this.ancestorCache = /* @__PURE__ */ new WeakMap();
    }), this.fixedBackground || (document.body.style.backgroundAttachment = "scroll", document.documentElement.style.backgroundAttachment = "scroll");
  }
  destroy() {
    const e = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";
    window.removeEventListener(e, this._onWheel.bind(this)), window.removeEventListener("keydown", this._onKeydown.bind(this)), window.removeEventListener("mousedown", this._onMousedown.bind(this)), this.queue = [], this.pending = !1;
  }
  _onMousedown(e) {
    this.activeElement = e.target, this.ancestorCache = /* @__PURE__ */ new WeakMap();
  }
  _onKeydown(e) {
    const t = e.target, i = e.ctrlKey || e.altKey || e.metaKey || e.shiftKey && e.code !== "Space", s = /^(textarea|select|embed|object)$/i, n = /^(button|submit|radio|checkbox|file|color|image)$/i;
    if (e.defaultPrevented || s.test(t.nodeName) || t.nodeName === "INPUT" && !n.test(t.type) || t.isContentEditable || i)
      return !0;
    let r = 0, o = 0;
    const l = this._findScrollableAncestor(this.activeElement || document.activeElement);
    if (!l) return;
    const u = l === document.body ? window.innerHeight : l.clientHeight;
    switch (e.code) {
      case "ArrowUp":
        o = -this.arrowScroll;
        break;
      case "ArrowDown":
        o = this.arrowScroll;
        break;
      case "Space":
        o = -(e.shiftKey ? 1 : -1) * u * 0.9;
        break;
      case "PageUp":
        o = -u * 0.9;
        break;
      case "PageDown":
        o = u * 0.9;
        break;
      case "Home":
        o = -l.scrollTop;
        break;
      case "End":
        const c = l.scrollHeight - l.scrollTop - u;
        o = c > 0 ? c + 10 : 0;
        break;
      case "ArrowLeft":
        r = -this.arrowScroll;
        break;
      case "ArrowRight":
        r = this.arrowScroll;
        break;
      default:
        return !0;
    }
    this._enqueueScroll(l, r, o), e.preventDefault();
  }
  _onWheel(e) {
    if (e.ctrlKey || e.defaultPrevented) return;
    let t = -e.wheelDeltaX || e.deltaX || 0, i = -e.wheelDeltaY || e.deltaY || 0;
    if (this.isMac && (e.wheelDeltaX && this._isDivisible(e.wheelDeltaX, 120) && (t = -120 * (e.wheelDeltaX / Math.abs(e.wheelDeltaX))), e.wheelDeltaY && this._isDivisible(e.wheelDeltaY, 120) && (i = -120 * (e.wheelDeltaY / Math.abs(e.wheelDeltaY)))), !t && !i && (i = -e.wheelDelta || 0), e.deltaMode === 1 && (t *= 40, i *= 40), this._isTouchpad(i))
      return !0;
    Math.abs(t) > 1.2 && (t *= this.stepSize / 120), Math.abs(i) > 1.2 && (i *= this.stepSize / 120);
    const s = Date.now();
    s - this._lastWheelTime > this.ancestorCacheTTL && this.ancestorCacheGen++, this._lastWheelTime = s;
    const n = e.target, r = this._findScrollableAncestor(n);
    if (!r) return;
    const o = Math.sign(t), l = Math.sign(i);
    (o !== this.direction.x || l !== this.direction.y) && (this.direction = { x: o, y: l }, this.queue = [], this.lastScrollTime = 0);
    const u = Date.now(), d = u - this.lastScrollTime;
    if (d < this.accelerationDelta) {
      const c = (1 + 50 / d) / 2;
      if (c > 1) {
        const h = Math.min(c, this.accelerationMax);
        t *= h, i *= h;
      }
    }
    this.lastScrollTime = u, this._enqueueScroll(r, t, i), e.preventDefault();
  }
  _isDivisible(e, t) {
    return Math.floor(e / t) === e / t;
  }
  _isTouchpad(e) {
    if (!e) return !1;
    this.deltaBuffer.length || (this.deltaBuffer = [e, e, e]);
    const t = Math.abs(e);
    this.deltaBuffer.push(t), this.deltaBuffer.shift(), clearTimeout(this.deltaBufferTimer), this.deltaBufferTimer = setTimeout(() => {
      this.deltaBuffer = [];
    }, 1e3);
    const i = this.deltaBuffer.every((o) => this._isDivisible(o, 120)), s = this.deltaBuffer.every((o) => this._isDivisible(o, 100)), n = t > 120 && this.deltaBuffer.every((o) => this._isDivisible(o, t)), r = !i && !s && !n;
    return t < 50 ? !0 : r;
  }
  /* Does this element still qualify as the scroll container? Same test the
   * walk uses, applied to a single element. Cheap-check first, as there. */
  _stillScrollable(e) {
    if (!e || !e.isConnected) return !1;
    const t = e.scrollHeight > e.clientHeight, i = e.scrollWidth > e.clientWidth;
    if (!t && !i) return !1;
    const s = window.getComputedStyle(e);
    return ["auto", "scroll"].includes(s.overflowY) && t || ["auto", "scroll"].includes(s.overflowX) && i;
  }
  _findScrollableAncestor(e) {
    const t = document.scrollingElement || document.documentElement;
    if (!e) return t;
    const i = this.ancestorCache.get(e);
    if (i) {
      if (i.gen === this.ancestorCacheGen) return i.result;
      if (i.result === t || this._stillScrollable(i.result))
        return i.gen = this.ancestorCacheGen, i.result;
    }
    let s = e, n = t;
    for (; s && s !== document.body; ) {
      const r = s.scrollHeight > s.clientHeight, o = s.scrollWidth > s.clientWidth;
      if (r || o) {
        const l = window.getComputedStyle(s), u = ["auto", "scroll"].includes(l.overflowY), d = ["auto", "scroll"].includes(l.overflowX);
        if (u && r || d && o) {
          n = s;
          break;
        }
      }
      if (s === t) {
        n = t;
        break;
      }
      s = s.parentElement;
    }
    return this.ancestorCache.set(e, { result: n, gen: this.ancestorCacheGen }), n;
  }
  _enqueueScroll(e, t, i) {
    if (!this.scrollBehaviorCache.has(e)) {
      const s = window.getComputedStyle(e).scrollBehavior;
      s === "smooth" && (this.scrollBehaviorCache.set(e, s), e.style.scrollBehavior = "auto");
    }
    this.queue.push({
      element: e,
      x: t,
      y: i,
      lastX: t < 0 ? 0.99 : -0.99,
      lastY: i < 0 ? 0.99 : -0.99,
      start: Date.now()
    }), this.pending || (this._animate(e), this.pending = !0);
  }
  _animate(e) {
    const t = () => {
      const i = Date.now();
      let s = 0, n = 0;
      for (let o = this.queue.length - 1; o >= 0; o--) {
        const l = this.queue[o], u = i - l.start, d = u >= this.animationTime, c = d ? 1 : u / this.animationTime, h = this._pulse(c), p = l.x * h - l.lastX >> 0, f = l.y * h - l.lastY >> 0;
        s += p, n += f, l.lastX += p, l.lastY += f, d && this.queue.splice(o, 1);
      }
      if (e === document.scrollingElement || e === document.documentElement || e === document.body ? window.scrollBy(s, n) : (s && (e.scrollLeft += s), n && (e.scrollTop += n)), this.queue.length > 0)
        requestAnimationFrame(t);
      else if (this.pending = !1, this.scrollBehaviorCache.has(e)) {
        const o = this.scrollBehaviorCache.get(e);
        e.style.scrollBehavior = o, this.scrollBehaviorCache.delete(e);
      }
    };
    requestAnimationFrame(t);
  }
  _pulseRaw(e) {
    if (e *= this.pulseScale, e < 1)
      return e - (1 - Math.exp(-e));
    {
      const t = Math.exp(-1);
      e -= 1;
      const i = 1 - Math.exp(-e);
      return t + i * (1 - t);
    }
  }
  _pulse(e) {
    return e >= 1 ? 1 : e <= 0 ? 0 : this._pulseRaw(e) * this.pulseNormalize;
  }
}
/*!
 * Glide.js v3.7.1
 * (c) 2013-2024 Jędrzej Chałubek (https://github.com/jedrzejchalubek/)
 * Released under the MIT License.
 */
function Ki(a, e) {
  var t = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(a);
    e && (i = i.filter(function(s) {
      return Object.getOwnPropertyDescriptor(a, s).enumerable;
    })), t.push.apply(t, i);
  }
  return t;
}
function Zi(a) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Ki(Object(t), !0).forEach(function(i) {
      Kn(a, i, t[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(t)) : Ki(Object(t)).forEach(function(i) {
      Object.defineProperty(a, i, Object.getOwnPropertyDescriptor(t, i));
    });
  }
  return a;
}
function yt(a) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? yt = function(e) {
    return typeof e;
  } : yt = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, yt(a);
}
function qt(a, e) {
  if (!(a instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function Jn(a, e) {
  for (var t = 0; t < e.length; t++) {
    var i = e[t];
    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(a, i.key, i);
  }
}
function Pt(a, e, t) {
  return e && Jn(a.prototype, e), a;
}
function Kn(a, e, t) {
  return e in a ? Object.defineProperty(a, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : a[e] = t, a;
}
function Zn(a, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Super expression must either be null or a function");
  a.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: a,
      writable: !0,
      configurable: !0
    }
  }), e && Xt(a, e);
}
function Be(a) {
  return Be = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, Be(a);
}
function Xt(a, e) {
  return Xt = Object.setPrototypeOf || function(i, s) {
    return i.__proto__ = s, i;
  }, Xt(a, e);
}
function Qn() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
  if (typeof Proxy == "function") return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function er(a) {
  if (a === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return a;
}
function tr(a, e) {
  if (e && (typeof e == "object" || typeof e == "function"))
    return e;
  if (e !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return er(a);
}
function ir(a) {
  var e = Qn();
  return function() {
    var i = Be(a), s;
    if (e) {
      var n = Be(this).constructor;
      s = Reflect.construct(i, arguments, n);
    } else
      s = i.apply(this, arguments);
    return tr(this, s);
  };
}
function sr(a, e) {
  for (; !Object.prototype.hasOwnProperty.call(a, e) && (a = Be(a), a !== null); )
    ;
  return a;
}
function bt() {
  return typeof Reflect < "u" && Reflect.get ? bt = Reflect.get : bt = function(e, t, i) {
    var s = sr(e, t);
    if (s) {
      var n = Object.getOwnPropertyDescriptor(s, t);
      return n.get ? n.get.call(arguments.length < 3 ? e : i) : n.value;
    }
  }, bt.apply(this, arguments);
}
var nr = {
  /**
   * Type of the movement.
   *
   * Available types:
   * `slider` - Rewinds slider to the start/end when it reaches the first or last slide.
   * `carousel` - Changes slides without starting over when it reaches the first or last slide.
   *
   * @type {String}
   */
  type: "slider",
  /**
   * Start at specific slide number defined with zero-based index.
   *
   * @type {Number}
   */
  startAt: 0,
  /**
   * A number of slides visible on the single viewport.
   *
   * @type {Number}
   */
  perView: 1,
  /**
   * Focus currently active slide at a specified position in the track.
   *
   * Available inputs:
   * `center` - Current slide will be always focused at the center of a track.
   * `0,1,2,3...` - Current slide will be focused on the specified zero-based index.
   *
   * @type {String|Number}
   */
  focusAt: 0,
  /**
   * A size of the gap added between slides.
   *
   * @type {Number}
   */
  gap: 10,
  /**
   * Change slides after a specified interval. Use `false` for turning off autoplay.
   *
   * @type {Number|Boolean}
   */
  autoplay: !1,
  /**
   * Stop autoplay on mouseover event.
   *
   * @type {Boolean}
   */
  hoverpause: !0,
  /**
   * Allow for changing slides with left and right keyboard arrows.
   *
   * @type {Boolean}
   */
  keyboard: !0,
  /**
   * Stop running `perView` number of slides from the end. Use this
   * option if you don't want to have an empty space after
   * a slider. Works only with `slider` type and a
   * non-centered `focusAt` setting.
   *
   * @type {Boolean}
   */
  bound: !1,
  /**
   * Minimal swipe distance needed to change the slide. Use `false` for turning off a swiping.
   *
   * @type {Number|Boolean}
   */
  swipeThreshold: 80,
  /**
   * Minimal mouse drag distance needed to change the slide. Use `false` for turning off a dragging.
   *
   * @type {Number|Boolean}
   */
  dragThreshold: 120,
  /**
   * A number of slides moved on single swipe.
   *
   * Available types:
   * `` - Moves slider by one slide per swipe
   * `|` - Moves slider between views per swipe (number of slides defined in `perView` options)
   *
   * @type {String}
   */
  perSwipe: "",
  /**
   * Moving distance ratio of the slides on a swiping and dragging.
   *
   * @type {Number}
   */
  touchRatio: 0.5,
  /**
   * Angle required to activate slides moving on swiping or dragging.
   *
   * @type {Number}
   */
  touchAngle: 45,
  /**
   * Duration of the animation in milliseconds.
   *
   * @type {Number}
   */
  animationDuration: 400,
  /**
   * Allows looping the `slider` type. Slider will rewind to the first/last slide when it's at the start/end.
   *
   * @type {Boolean}
   */
  rewind: !0,
  /**
   * Duration of the rewinding animation of the `slider` type in milliseconds.
   *
   * @type {Number}
   */
  rewindDuration: 800,
  /**
   * Easing function for the animation.
   *
   * @type {String}
   */
  animationTimingFunc: "cubic-bezier(.165, .840, .440, 1)",
  /**
   * Wait for the animation to finish until the next user input can be processed
   *
   * @type {boolean}
   */
  waitForTransition: !0,
  /**
   * Throttle costly events at most once per every wait milliseconds.
   *
   * @type {Number}
   */
  throttle: 10,
  /**
   * Moving direction mode.
   *
   * Available inputs:
   * - 'ltr' - left to right movement,
   * - 'rtl' - right to left movement.
   *
   * @type {String}
   */
  direction: "ltr",
  /**
   * The distance value of the next and previous viewports which
   * have to peek in the current view. Accepts number and
   * pixels as a string. Left and right peeking can be
   * set up separately with a directions object.
   *
   * For example:
   * `100` - Peek 100px on the both sides.
   * { before: 100, after: 50 }` - Peek 100px on the left side and 50px on the right side.
   *
   * @type {Number|String|Object}
   */
  peek: 0,
  /**
   * Defines how many clones of current viewport will be generated.
   *
   * @type {Number}
   */
  cloningRatio: 1,
  /**
   * Collection of options applied at specified media breakpoints.
   * For example: display two slides per view under 800px.
   * `{
   *   '800px': {
   *     perView: 2
   *   }
   * }`
   */
  breakpoints: {},
  /**
   * Collection of internally used HTML classes.
   *
   * @todo Refactor `slider` and `carousel` properties to single `type: { slider: '', carousel: '' }` object
   * @type {Object}
   */
  classes: {
    swipeable: "glide--swipeable",
    dragging: "glide--dragging",
    direction: {
      ltr: "glide--ltr",
      rtl: "glide--rtl"
    },
    type: {
      slider: "glide--slider",
      carousel: "glide--carousel"
    },
    slide: {
      clone: "glide__slide--clone",
      active: "glide__slide--active"
    },
    arrow: {
      disabled: "glide__arrow--disabled"
    },
    nav: {
      active: "glide__bullet--active"
    }
  }
};
function _e(a) {
  console.error("[Glide warn]: ".concat(a));
}
function Q(a) {
  return parseInt(a);
}
function rr(a) {
  return parseFloat(a);
}
function Jt(a) {
  return typeof a == "string";
}
function Fe(a) {
  var e = yt(a);
  return e === "function" || e === "object" && !!a;
}
function Ct(a) {
  return typeof a == "function";
}
function ks(a) {
  return typeof a > "u";
}
function Kt(a) {
  return a.constructor === Array;
}
function or(a, e, t) {
  var i = {};
  for (var s in e)
    Ct(e[s]) ? i[s] = e[s](a, i, t) : _e("Extension must be a function");
  for (var n in i)
    Ct(i[n].mount) && i[n].mount();
  return i;
}
function G(a, e, t) {
  Object.defineProperty(a, e, t);
}
function ar(a) {
  return Object.keys(a).sort().reduce(function(e, t) {
    return e[t] = a[t], e[t], e;
  }, {});
}
function Zt(a, e) {
  var t = Object.assign({}, a, e);
  if (e.hasOwnProperty("classes")) {
    t.classes = Object.assign({}, a.classes, e.classes);
    var i = ["direction", "type", "slide", "arrow", "nav"];
    i.forEach(function(s) {
      e.classes.hasOwnProperty(s) && (t.classes[s] = Zi(Zi({}, a.classes[s]), e.classes[s]));
    });
  }
  return e.hasOwnProperty("breakpoints") && (t.breakpoints = Object.assign({}, a.breakpoints, e.breakpoints)), t;
}
var lr = /* @__PURE__ */ (function() {
  function a() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    qt(this, a), this.events = e, this.hop = e.hasOwnProperty;
  }
  return Pt(a, [{
    key: "on",
    value: function(t, i) {
      if (Kt(t)) {
        for (var s = 0; s < t.length; s++)
          this.on(t[s], i);
        return;
      }
      this.hop.call(this.events, t) || (this.events[t] = []);
      var n = this.events[t].push(i) - 1;
      return {
        remove: function() {
          delete this.events[t][n];
        }
      };
    }
    /**
     * Runs registered handlers for specified event.
     *
     * @param {String|Array} event
     * @param {Object=} context
     */
  }, {
    key: "emit",
    value: function(t, i) {
      if (Kt(t)) {
        for (var s = 0; s < t.length; s++)
          this.emit(t[s], i);
        return;
      }
      this.hop.call(this.events, t) && this.events[t].forEach(function(n) {
        n(i || {});
      });
    }
  }]), a;
})(), cr = /* @__PURE__ */ (function() {
  function a(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    qt(this, a), this._c = {}, this._t = [], this._e = new lr(), this.disabled = !1, this.selector = e, this.settings = Zt(nr, t), this.index = this.settings.startAt;
  }
  return Pt(a, [{
    key: "mount",
    value: function() {
      var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      return this._e.emit("mount.before"), Fe(t) ? this._c = or(this, t, this._e) : _e("You need to provide a object on `mount()`"), this._e.emit("mount.after"), this;
    }
    /**
     * Collects an instance `translate` transformers.
     *
     * @param  {Array} transformers Collection of transformers.
     * @return {Void}
     */
  }, {
    key: "mutate",
    value: function() {
      var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
      return Kt(t) ? this._t = t : _e("You need to provide a array on `mutate()`"), this;
    }
    /**
     * Updates glide with specified settings.
     *
     * @param {Object} settings
     * @return {Glide}
     */
  }, {
    key: "update",
    value: function() {
      var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      return this.settings = Zt(this.settings, t), t.hasOwnProperty("startAt") && (this.index = t.startAt), this._e.emit("update"), this;
    }
    /**
     * Change slide with specified pattern. A pattern must be in the special format:
     * `>` - Move one forward
     * `<` - Move one backward
     * `={i}` - Go to {i} zero-based slide (eq. '=1', will go to second slide)
     * `>>` - Rewinds to end (last slide)
     * `<<` - Rewinds to start (first slide)
     * `|>` - Move one viewport forward
     * `|<` - Move one viewport backward
     *
     * @param {String} pattern
     * @return {Glide}
     */
  }, {
    key: "go",
    value: function(t) {
      return this._c.Run.make(t), this;
    }
    /**
     * Move track by specified distance.
     *
     * @param {String} distance
     * @return {Glide}
     */
  }, {
    key: "move",
    value: function(t) {
      return this._c.Transition.disable(), this._c.Move.make(t), this;
    }
    /**
     * Destroy instance and revert all changes done by this._c.
     *
     * @return {Glide}
     */
  }, {
    key: "destroy",
    value: function() {
      return this._e.emit("destroy"), this;
    }
    /**
     * Start instance autoplaying.
     *
     * @param {Boolean|Number} interval Run autoplaying with passed interval regardless of `autoplay` settings
     * @return {Glide}
     */
  }, {
    key: "play",
    value: function() {
      var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
      return t && (this.settings.autoplay = t), this._e.emit("play"), this;
    }
    /**
     * Stop instance autoplaying.
     *
     * @return {Glide}
     */
  }, {
    key: "pause",
    value: function() {
      return this._e.emit("pause"), this;
    }
    /**
     * Sets glide into a idle status.
     *
     * @return {Glide}
     */
  }, {
    key: "disable",
    value: function() {
      return this.disabled = !0, this;
    }
    /**
     * Sets glide into a active status.
     *
     * @return {Glide}
     */
  }, {
    key: "enable",
    value: function() {
      return this.disabled = !1, this;
    }
    /**
     * Adds cuutom event listener with handler.
     *
     * @param  {String|Array} event
     * @param  {Function} handler
     * @return {Glide}
     */
  }, {
    key: "on",
    value: function(t, i) {
      return this._e.on(t, i), this;
    }
    /**
     * Checks if glide is a precised type.
     *
     * @param  {String} name
     * @return {Boolean}
     */
  }, {
    key: "isType",
    value: function(t) {
      return this.settings.type === t;
    }
    /**
     * Gets value of the core options.
     *
     * @return {Object}
     */
  }, {
    key: "settings",
    get: function() {
      return this._o;
    },
    set: function(t) {
      Fe(t) ? this._o = t : _e("Options must be an `object` instance.");
    }
    /**
     * Gets current index of the slider.
     *
     * @return {Object}
     */
  }, {
    key: "index",
    get: function() {
      return this._i;
    },
    set: function(t) {
      this._i = Q(t);
    }
    /**
     * Gets type name of the slider.
     *
     * @return {String}
     */
  }, {
    key: "type",
    get: function() {
      return this.settings.type;
    }
    /**
     * Gets value of the idle status.
     *
     * @return {Boolean}
     */
  }, {
    key: "disabled",
    get: function() {
      return this._d;
    },
    set: function(t) {
      this._d = !!t;
    }
  }]), a;
})();
function ur(a, e, t) {
  var i = {
    /**
     * Initializes autorunning of the glide.
     *
     * @return {Void}
     */
    mount: function() {
      this._o = !1;
    },
    /**
     * Makes glides running based on the passed moving schema.
     *
     * @param {String} move
     */
    make: function(u) {
      var d = this;
      a.disabled || (!a.settings.waitForTransition || a.disable(), this.move = u, t.emit("run.before", this.move), this.calculate(), t.emit("run", this.move), e.Transition.after(function() {
        d.isStart() && t.emit("run.start", d.move), d.isEnd() && t.emit("run.end", d.move), d.isOffset() && (d._o = !1, t.emit("run.offset", d.move)), t.emit("run.after", d.move), a.enable();
      }));
    },
    /**
     * Calculates current index based on defined move.
     *
     * @return {Number|Undefined}
     */
    calculate: function() {
      var u = this.move, d = this.length, c = u.steps, h = u.direction, p = 1;
      if (h === "=") {
        if (a.settings.bound && Q(c) > d) {
          a.index = d;
          return;
        }
        a.index = c;
        return;
      }
      if (h === ">" && c === ">") {
        a.index = d;
        return;
      }
      if (h === "<" && c === "<") {
        a.index = 0;
        return;
      }
      if (h === "|" && (p = a.settings.perView || 1), h === ">" || h === "|" && c === ">") {
        var f = s(p);
        f > d && (this._o = !0), a.index = n(f, p);
        return;
      }
      if (h === "<" || h === "|" && c === "<") {
        var y = r(p);
        y < 0 && (this._o = !0), a.index = o(y, p);
        return;
      }
      _e("Invalid direction pattern [".concat(h).concat(c, "] has been used"));
    },
    /**
     * Checks if we are on the first slide.
     *
     * @return {Boolean}
     */
    isStart: function() {
      return a.index <= 0;
    },
    /**
     * Checks if we are on the last slide.
     *
     * @return {Boolean}
     */
    isEnd: function() {
      return a.index >= this.length;
    },
    /**
     * Checks if we are making a offset run.
     *
     * @param {String} direction
     * @return {Boolean}
     */
    isOffset: function() {
      var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : void 0;
      return u ? this._o ? u === "|>" ? this.move.direction === "|" && this.move.steps === ">" : u === "|<" ? this.move.direction === "|" && this.move.steps === "<" : this.move.direction === u : !1 : this._o;
    },
    /**
     * Checks if bound mode is active
     *
     * @return {Boolean}
     */
    isBound: function() {
      return a.isType("slider") && a.settings.focusAt !== "center" && a.settings.bound;
    }
  };
  function s(l) {
    var u = a.index;
    return a.isType("carousel") ? u + l : u + (l - u % l);
  }
  function n(l, u) {
    var d = i.length;
    return l <= d ? l : a.isType("carousel") ? l - (d + 1) : a.settings.rewind ? i.isBound() && !i.isEnd() ? d : 0 : i.isBound() ? d : Math.floor(d / u) * u;
  }
  function r(l) {
    var u = a.index;
    if (a.isType("carousel"))
      return u - l;
    var d = Math.ceil(u / l);
    return (d - 1) * l;
  }
  function o(l, u) {
    var d = i.length;
    return l >= 0 ? l : a.isType("carousel") ? l + (d + 1) : a.settings.rewind ? i.isBound() && i.isStart() ? d : Math.floor(d / u) * u : 0;
  }
  return G(i, "move", {
    /**
     * Gets value of the move schema.
     *
     * @returns {Object}
     */
    get: function() {
      return this._m;
    },
    /**
     * Sets value of the move schema.
     *
     * @returns {Object}
     */
    set: function(u) {
      var d = u.substr(1);
      this._m = {
        direction: u.substr(0, 1),
        steps: d ? Q(d) ? Q(d) : d : 0
      };
    }
  }), G(i, "length", {
    /**
     * Gets value of the running distance based
     * on zero-indexing number of slides.
     *
     * @return {Number}
     */
    get: function() {
      var u = a.settings, d = e.Html.slides.length;
      return this.isBound() ? d - 1 - (Q(u.perView) - 1) + Q(u.focusAt) : d - 1;
    }
  }), G(i, "offset", {
    /**
     * Gets status of the offsetting flag.
     *
     * @return {Boolean}
     */
    get: function() {
      return this._o;
    }
  }), i;
}
function Qi() {
  return (/* @__PURE__ */ new Date()).getTime();
}
function Ot(a, e) {
  var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i, s, n, r, o = 0, l = function() {
    o = t.leading === !1 ? 0 : Qi(), i = null, r = a.apply(s, n), i || (s = n = null);
  }, u = function() {
    var c = Qi();
    !o && t.leading === !1 && (o = c);
    var h = e - (c - o);
    return s = this, n = arguments, h <= 0 || h > e ? (i && (clearTimeout(i), i = null), o = c, r = a.apply(s, n), i || (s = n = null)) : !i && t.trailing !== !1 && (i = setTimeout(l, h)), r;
  };
  return u.cancel = function() {
    clearTimeout(i), o = 0, i = s = n = null;
  }, u;
}
var ct = {
  ltr: ["marginLeft", "marginRight"],
  rtl: ["marginRight", "marginLeft"]
};
function dr(a, e, t) {
  var i = {
    /**
     * Applies gaps between slides. First and last
     * slides do not receive it's edge margins.
     *
     * @param {HTMLCollection} slides
     * @return {Void}
     */
    apply: function(n) {
      for (var r = 0, o = n.length; r < o; r++) {
        var l = n[r].style, u = e.Direction.value;
        r !== 0 ? l[ct[u][0]] = "".concat(this.value / 2, "px") : l[ct[u][0]] = "", r !== n.length - 1 ? l[ct[u][1]] = "".concat(this.value / 2, "px") : l[ct[u][1]] = "";
      }
    },
    /**
     * Removes gaps from the slides.
     *
     * @param {HTMLCollection} slides
     * @returns {Void}
    */
    remove: function(n) {
      for (var r = 0, o = n.length; r < o; r++) {
        var l = n[r].style;
        l.marginLeft = "", l.marginRight = "";
      }
    }
  };
  return G(i, "value", {
    /**
     * Gets value of the gap.
     *
     * @returns {Number}
     */
    get: function() {
      return Q(a.settings.gap);
    }
  }), G(i, "grow", {
    /**
     * Gets additional dimensions value caused by gaps.
     * Used to increase width of the slides wrapper.
     *
     * @returns {Number}
     */
    get: function() {
      return i.value * e.Sizes.length;
    }
  }), G(i, "reductor", {
    /**
     * Gets reduction value caused by gaps.
     * Used to subtract width of the slides.
     *
     * @returns {Number}
     */
    get: function() {
      var n = a.settings.perView;
      return i.value * (n - 1) / n;
    }
  }), t.on(["build.after", "update"], Ot(function() {
    i.apply(e.Html.wrapper.children);
  }, 30)), t.on("destroy", function() {
    i.remove(e.Html.wrapper.children);
  }), i;
}
function Ss(a) {
  if (a && a.parentNode) {
    for (var e = a.parentNode.firstChild, t = []; e; e = e.nextSibling)
      e.nodeType === 1 && e !== a && t.push(e);
    return t;
  }
  return [];
}
function Qt(a) {
  return Array.prototype.slice.call(a);
}
var hr = '[data-glide-el="track"]';
function pr(a, e, t) {
  var i = {
    /**
     * Setup slider HTML nodes.
     *
     * @param {Glide} glide
     */
    mount: function() {
      this.root = a.selector, this.track = this.root.querySelector(hr), this.collectSlides();
    },
    /**
     * Collect slides
     */
    collectSlides: function() {
      this.slides = Qt(this.wrapper.children).filter(function(n) {
        return !n.classList.contains(a.settings.classes.slide.clone);
      });
    }
  };
  return G(i, "root", {
    /**
     * Gets node of the glide main element.
     *
     * @return {Object}
     */
    get: function() {
      return i._r;
    },
    /**
     * Sets node of the glide main element.
     *
     * @return {Object}
     */
    set: function(n) {
      Jt(n) && (n = document.querySelector(n)), n !== null ? i._r = n : _e("Root element must be a existing Html node");
    }
  }), G(i, "track", {
    /**
     * Gets node of the glide track with slides.
     *
     * @return {Object}
     */
    get: function() {
      return i._t;
    },
    /**
     * Sets node of the glide track with slides.
     *
     * @return {Object}
     */
    set: function(n) {
      i._t = n;
    }
  }), G(i, "wrapper", {
    /**
     * Gets node of the slides wrapper.
     *
     * @return {Object}
     */
    get: function() {
      return i.track.children[0];
    }
  }), t.on("update", function() {
    i.collectSlides();
  }), i;
}
function fr(a, e, t) {
  var i = {
    /**
     * Setups how much to peek based on settings.
     *
     * @return {Void}
     */
    mount: function() {
      this.value = a.settings.peek;
    }
  };
  return G(i, "value", {
    /**
     * Gets value of the peek.
     *
     * @returns {Number|Object}
     */
    get: function() {
      return i._v;
    },
    /**
     * Sets value of the peek.
     *
     * @param {Number|Object} value
     * @return {Void}
     */
    set: function(n) {
      Fe(n) ? (n.before = Q(n.before), n.after = Q(n.after)) : n = Q(n), i._v = n;
    }
  }), G(i, "reductor", {
    /**
     * Gets reduction value caused by peek.
     *
     * @returns {Number}
     */
    get: function() {
      var n = i.value, r = a.settings.perView;
      return Fe(n) ? n.before / r + n.after / r : n * 2 / r;
    }
  }), t.on(["resize", "update"], function() {
    i.mount();
  }), i;
}
function gr(a, e, t) {
  var i = {
    /**
     * Constructs move component.
     *
     * @returns {Void}
     */
    mount: function() {
      this._o = 0;
    },
    /**
     * Calculates a movement value based on passed offset and currently active index.
     *
     * @param  {Number} offset
     * @return {Void}
     */
    make: function() {
      var n = this, r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
      this.offset = r, t.emit("move", {
        movement: this.value
      }), e.Transition.after(function() {
        t.emit("move.after", {
          movement: n.value
        });
      });
    }
  };
  return G(i, "offset", {
    /**
     * Gets an offset value used to modify current translate.
     *
     * @return {Object}
     */
    get: function() {
      return i._o;
    },
    /**
     * Sets an offset value used to modify current translate.
     *
     * @return {Object}
     */
    set: function(n) {
      i._o = ks(n) ? 0 : Q(n);
    }
  }), G(i, "translate", {
    /**
     * Gets a raw movement value.
     *
     * @return {Number}
     */
    get: function() {
      return e.Sizes.slideWidth * a.index;
    }
  }), G(i, "value", {
    /**
     * Gets an actual movement value corrected by offset.
     *
     * @return {Number}
     */
    get: function() {
      var n = this.offset, r = this.translate;
      return e.Direction.is("rtl") ? r + n : r - n;
    }
  }), t.on(["build.before", "run"], function() {
    i.make();
  }), i;
}
function mr(a, e, t) {
  var i = {
    /**
     * Setups dimensions of slides.
     *
     * @return {Void}
     */
    setupSlides: function() {
      for (var n = "".concat(this.slideWidth, "px"), r = e.Html.slides, o = 0; o < r.length; o++)
        r[o].style.width = n;
    },
    /**
     * Setups dimensions of slides wrapper.
     *
     * @return {Void}
     */
    setupWrapper: function() {
      e.Html.wrapper.style.width = "".concat(this.wrapperSize, "px");
    },
    /**
     * Removes applied styles from HTML elements.
     *
     * @returns {Void}
     */
    remove: function() {
      for (var n = e.Html.slides, r = 0; r < n.length; r++)
        n[r].style.width = "";
      e.Html.wrapper.style.width = "";
    }
  };
  return G(i, "length", {
    /**
     * Gets count number of the slides.
     *
     * @return {Number}
     */
    get: function() {
      return e.Html.slides.length;
    }
  }), G(i, "width", {
    /**
     * Gets width value of the slider (visible area).
     *
     * @return {Number}
     */
    get: function() {
      return e.Html.track.offsetWidth;
    }
  }), G(i, "wrapperSize", {
    /**
     * Gets size of the slides wrapper.
     *
     * @return {Number}
     */
    get: function() {
      return i.slideWidth * i.length + e.Gaps.grow + e.Clones.grow;
    }
  }), G(i, "slideWidth", {
    /**
     * Gets width value of a single slide.
     *
     * @return {Number}
     */
    get: function() {
      return i.width / a.settings.perView - e.Peek.reductor - e.Gaps.reductor;
    }
  }), t.on(["build.before", "resize", "update"], function() {
    i.setupSlides(), i.setupWrapper();
  }), t.on("destroy", function() {
    i.remove();
  }), i;
}
function yr(a, e, t) {
  var i = {
    /**
     * Init glide building. Adds classes, sets
     * dimensions and setups initial state.
     *
     * @return {Void}
     */
    mount: function() {
      t.emit("build.before"), this.typeClass(), this.activeClass(), t.emit("build.after");
    },
    /**
     * Adds `type` class to the glide element.
     *
     * @return {Void}
     */
    typeClass: function() {
      e.Html.root.classList.add(a.settings.classes.type[a.settings.type]);
    },
    /**
     * Sets active class to current slide.
     *
     * @return {Void}
     */
    activeClass: function() {
      var n = a.settings.classes, r = e.Html.slides[a.index];
      r && (r.classList.add(n.slide.active), Ss(r).forEach(function(o) {
        o.classList.remove(n.slide.active);
      }));
    },
    /**
     * Removes HTML classes applied at building.
     *
     * @return {Void}
     */
    removeClasses: function() {
      var n = a.settings.classes, r = n.type, o = n.slide;
      e.Html.root.classList.remove(r[a.settings.type]), e.Html.slides.forEach(function(l) {
        l.classList.remove(o.active);
      });
    }
  };
  return t.on(["destroy", "update"], function() {
    i.removeClasses();
  }), t.on(["resize", "update"], function() {
    i.mount();
  }), t.on("move.after", function() {
    i.activeClass();
  }), i;
}
function br(a, e, t) {
  var i = {
    /**
     * Create pattern map and collect slides to be cloned.
     */
    mount: function() {
      this.items = [], a.isType("carousel") && (this.items = this.collect());
    },
    /**
     * Collect clones with pattern.
     *
     * @return {[]}
     */
    collect: function() {
      var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], r = e.Html.slides, o = a.settings, l = o.perView, u = o.classes, d = o.cloningRatio;
      if (r.length > 0)
        for (var c = +!!a.settings.peek, h = l + c + Math.round(l / 2), p = r.slice(0, h).reverse(), f = r.slice(h * -1), y = 0; y < Math.max(d, Math.floor(l / r.length)); y++) {
          for (var _ = 0; _ < p.length; _++) {
            var g = p[_].cloneNode(!0);
            g.classList.add(u.slide.clone), n.push(g);
          }
          for (var v = 0; v < f.length; v++) {
            var m = f[v].cloneNode(!0);
            m.classList.add(u.slide.clone), n.unshift(m);
          }
        }
      return n;
    },
    /**
     * Append cloned slides with generated pattern.
     *
     * @return {Void}
     */
    append: function() {
      for (var n = this.items, r = e.Html, o = r.wrapper, l = r.slides, u = Math.floor(n.length / 2), d = n.slice(0, u).reverse(), c = n.slice(u * -1).reverse(), h = "".concat(e.Sizes.slideWidth, "px"), p = 0; p < c.length; p++)
        o.appendChild(c[p]);
      for (var f = 0; f < d.length; f++)
        o.insertBefore(d[f], l[0]);
      for (var y = 0; y < n.length; y++)
        n[y].style.width = h;
    },
    /**
     * Remove all cloned slides.
     *
     * @return {Void}
     */
    remove: function() {
      for (var n = this.items, r = 0; r < n.length; r++)
        e.Html.wrapper.removeChild(n[r]);
    }
  };
  return G(i, "grow", {
    /**
     * Gets additional dimensions value caused by clones.
     *
     * @return {Number}
     */
    get: function() {
      return (e.Sizes.slideWidth + e.Gaps.value) * i.items.length;
    }
  }), t.on("update", function() {
    i.remove(), i.mount(), i.append();
  }), t.on("build.before", function() {
    a.isType("carousel") && i.append();
  }), t.on("destroy", function() {
    i.remove();
  }), i;
}
var Ce = /* @__PURE__ */ (function() {
  function a() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    qt(this, a), this.listeners = e;
  }
  return Pt(a, [{
    key: "on",
    value: function(t, i, s) {
      var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
      Jt(t) && (t = [t]);
      for (var r = 0; r < t.length; r++)
        this.listeners[t[r]] = s, i.addEventListener(t[r], this.listeners[t[r]], n);
    }
    /**
     * Removes event listeners from arrows HTML elements.
     *
     * @param  {String|Array} events
     * @param  {Element|Window|Document} el
     * @param  {Boolean|Object} capture
     * @return {Void}
     */
  }, {
    key: "off",
    value: function(t, i) {
      var s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
      Jt(t) && (t = [t]);
      for (var n = 0; n < t.length; n++)
        i.removeEventListener(t[n], this.listeners[t[n]], s);
    }
    /**
     * Destroy collected listeners.
     *
     * @returns {Void}
     */
  }, {
    key: "destroy",
    value: function() {
      delete this.listeners;
    }
  }]), a;
})();
function vr(a, e, t) {
  var i = new Ce(), s = {
    /**
     * Initializes window bindings.
     */
    mount: function() {
      this.bind();
    },
    /**
     * Binds `rezsize` listener to the window.
     * It's a costly event, so we are debouncing it.
     *
     * @return {Void}
     */
    bind: function() {
      i.on("resize", window, Ot(function() {
        t.emit("resize");
      }, a.settings.throttle));
    },
    /**
     * Unbinds listeners from the window.
     *
     * @return {Void}
     */
    unbind: function() {
      i.off("resize", window);
    }
  };
  return t.on("destroy", function() {
    s.unbind(), i.destroy();
  }), s;
}
var wr = ["ltr", "rtl"], _r = {
  ">": "<",
  "<": ">",
  "=": "="
};
function xr(a, e, t) {
  var i = {
    /**
     * Setups gap value based on settings.
     *
     * @return {Void}
     */
    mount: function() {
      this.value = a.settings.direction;
    },
    /**
     * Resolves pattern based on direction value
     *
     * @param {String} pattern
     * @returns {String}
     */
    resolve: function(n) {
      var r = n.slice(0, 1);
      return this.is("rtl") ? n.split(r).join(_r[r]) : n;
    },
    /**
     * Checks value of direction mode.
     *
     * @param {String} direction
     * @returns {Boolean}
     */
    is: function(n) {
      return this.value === n;
    },
    /**
     * Applies direction class to the root HTML element.
     *
     * @return {Void}
     */
    addClass: function() {
      e.Html.root.classList.add(a.settings.classes.direction[this.value]);
    },
    /**
     * Removes direction class from the root HTML element.
     *
     * @return {Void}
     */
    removeClass: function() {
      e.Html.root.classList.remove(a.settings.classes.direction[this.value]);
    }
  };
  return G(i, "value", {
    /**
     * Gets value of the direction.
     *
     * @returns {Number}
     */
    get: function() {
      return i._v;
    },
    /**
     * Sets value of the direction.
     *
     * @param {String} value
     * @return {Void}
     */
    set: function(n) {
      wr.indexOf(n) > -1 ? i._v = n : _e("Direction value must be `ltr` or `rtl`");
    }
  }), t.on(["destroy", "update"], function() {
    i.removeClass();
  }), t.on("update", function() {
    i.mount();
  }), t.on(["build.before", "update"], function() {
    i.addClass();
  }), i;
}
function kr(a, e) {
  return {
    /**
     * Negates the passed translate if glide is in RTL option.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function(i) {
      return e.Direction.is("rtl") ? -i : i;
    }
  };
}
function Sr(a, e) {
  return {
    /**
     * Modifies passed translate value with number in the `gap` settings.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function(i) {
      var s = Math.floor(i / e.Sizes.slideWidth);
      return i + e.Gaps.value * s;
    }
  };
}
function Er(a, e) {
  return {
    /**
     * Adds to the passed translate width of the half of clones.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function(i) {
      return i + e.Clones.grow / 2;
    }
  };
}
function Tr(a, e) {
  return {
    /**
     * Modifies passed translate value with a `peek` setting.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function(i) {
      if (a.settings.focusAt >= 0) {
        var s = e.Peek.value;
        return Fe(s) ? i - s.before : i - s;
      }
      return i;
    }
  };
}
function Cr(a, e) {
  return {
    /**
     * Modifies passed translate value with index in the `focusAt` setting.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function(i) {
      var s = e.Gaps.value, n = e.Sizes.width, r = a.settings.focusAt, o = e.Sizes.slideWidth;
      return r === "center" ? i - (n / 2 - o / 2) : i - o * r - s * r;
    }
  };
}
function Lr(a, e, t) {
  var i = [Sr, Er, Tr, Cr].concat(a._t, [kr]);
  return {
    /**
     * Piplines translate value with registered transformers.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    mutate: function(n) {
      for (var r = 0; r < i.length; r++) {
        var o = i[r];
        Ct(o) && Ct(o().modify) ? n = o(a, e, t).modify(n) : _e("Transformer should be a function that returns an object with `modify()` method");
      }
      return n;
    }
  };
}
function Ar(a, e, t) {
  var i = {
    /**
     * Sets value of translate on HTML element.
     *
     * @param {Number} value
     * @return {Void}
     */
    set: function(n) {
      var r = Lr(a, e).mutate(n), o = "translate3d(".concat(-1 * r, "px, 0px, 0px)");
      e.Html.wrapper.style.mozTransform = o, e.Html.wrapper.style.webkitTransform = o, e.Html.wrapper.style.transform = o;
    },
    /**
     * Removes value of translate from HTML element.
     *
     * @return {Void}
     */
    remove: function() {
      e.Html.wrapper.style.transform = "";
    },
    /**
     * @return {number}
     */
    getStartIndex: function() {
      var n = e.Sizes.length, r = a.index, o = a.settings.perView;
      return e.Run.isOffset(">") || e.Run.isOffset("|>") ? n + (r - o) : (r + o) % n;
    },
    /**
     * @return {number}
     */
    getTravelDistance: function() {
      var n = e.Sizes.slideWidth * a.settings.perView;
      return e.Run.isOffset(">") || e.Run.isOffset("|>") ? n * -1 : n;
    }
  };
  return t.on("move", function(s) {
    if (!a.isType("carousel") || !e.Run.isOffset())
      return i.set(s.movement);
    e.Transition.after(function() {
      t.emit("translate.jump"), i.set(e.Sizes.slideWidth * a.index);
    });
    var n = e.Sizes.slideWidth * e.Translate.getStartIndex();
    return i.set(n - e.Translate.getTravelDistance());
  }), t.on("destroy", function() {
    i.remove();
  }), i;
}
function Mr(a, e, t) {
  var i = !1, s = {
    /**
     * Composes string of the CSS transition.
     *
     * @param {String} property
     * @return {String}
     */
    compose: function(r) {
      var o = a.settings;
      return i ? "".concat(r, " 0ms ").concat(o.animationTimingFunc) : "".concat(r, " ").concat(this.duration, "ms ").concat(o.animationTimingFunc);
    },
    /**
     * Sets value of transition on HTML element.
     *
     * @param {String=} property
     * @return {Void}
     */
    set: function() {
      var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "transform";
      e.Html.wrapper.style.transition = this.compose(r);
    },
    /**
     * Removes value of transition from HTML element.
     *
     * @return {Void}
     */
    remove: function() {
      e.Html.wrapper.style.transition = "";
    },
    /**
     * Runs callback after animation.
     *
     * @param  {Function} callback
     * @return {Void}
     */
    after: function(r) {
      setTimeout(function() {
        r();
      }, this.duration);
    },
    /**
     * Enable transition.
     *
     * @return {Void}
     */
    enable: function() {
      i = !1, this.set();
    },
    /**
     * Disable transition.
     *
     * @return {Void}
     */
    disable: function() {
      i = !0, this.set();
    }
  };
  return G(s, "duration", {
    /**
     * Gets duration of the transition based
     * on currently running animation type.
     *
     * @return {Number}
     */
    get: function() {
      var r = a.settings;
      return a.isType("slider") && e.Run.offset ? r.rewindDuration : r.animationDuration;
    }
  }), t.on("move", function() {
    s.set();
  }), t.on(["build.before", "resize", "translate.jump"], function() {
    s.disable();
  }), t.on("run", function() {
    s.enable();
  }), t.on("destroy", function() {
    s.remove();
  }), s;
}
var Es = !1;
try {
  var es = Object.defineProperty({}, "passive", {
    get: function() {
      Es = !0;
    }
  });
  window.addEventListener("testPassive", null, es), window.removeEventListener("testPassive", null, es);
} catch {
}
var ei = Es, ut = ["touchstart", "mousedown"], ts = ["touchmove", "mousemove"], is = ["touchend", "touchcancel", "mouseup", "mouseleave"], ss = ["mousedown", "mousemove", "mouseup", "mouseleave"];
function Rr(a, e, t) {
  var i = new Ce(), s = 0, n = 0, r = 0, o = !1, l = ei ? {
    passive: !0
  } : !1, u = {
    /**
     * Initializes swipe bindings.
     *
     * @return {Void}
     */
    mount: function() {
      this.bindSwipeStart();
    },
    /**
     * Handler for `swipestart` event. Calculates entry points of the user's tap.
     *
     * @param {Object} event
     * @return {Void}
     */
    start: function(c) {
      if (!o && !a.disabled) {
        this.disable();
        var h = this.touches(c);
        s = null, n = Q(h.pageX), r = Q(h.pageY), this.bindSwipeMove(), this.bindSwipeEnd(), t.emit("swipe.start");
      }
    },
    /**
     * Handler for `swipemove` event. Calculates user's tap angle and distance.
     *
     * @param {Object} event
     */
    move: function(c) {
      if (!a.disabled) {
        var h = a.settings, p = h.touchAngle, f = h.touchRatio, y = h.classes, _ = this.touches(c), g = Q(_.pageX) - n, v = Q(_.pageY) - r, m = Math.abs(g << 2), b = Math.abs(v << 2), w = Math.sqrt(m + b), x = Math.sqrt(b);
        if (s = Math.asin(x / w), s * 180 / Math.PI < p)
          c.stopPropagation(), e.Move.make(g * rr(f)), e.Html.root.classList.add(y.dragging), t.emit("swipe.move");
        else
          return !1;
      }
    },
    /**
     * Handler for `swipeend` event. Finitializes user's tap and decides about glide move.
     *
     * @param {Object} event
     * @return {Void}
     */
    end: function(c) {
      if (!a.disabled) {
        var h = a.settings, p = h.perSwipe, f = h.touchAngle, y = h.classes, _ = this.touches(c), g = this.threshold(c), v = _.pageX - n, m = s * 180 / Math.PI;
        this.enable(), v > g && m < f ? e.Run.make(e.Direction.resolve("".concat(p, "<"))) : v < -g && m < f ? e.Run.make(e.Direction.resolve("".concat(p, ">"))) : e.Move.make(), e.Html.root.classList.remove(y.dragging), this.unbindSwipeMove(), this.unbindSwipeEnd(), t.emit("swipe.end");
      }
    },
    /**
     * Binds swipe's starting event.
     *
     * @return {Void}
     */
    bindSwipeStart: function() {
      var c = this, h = a.settings, p = h.swipeThreshold, f = h.dragThreshold;
      p && i.on(ut[0], e.Html.wrapper, function(y) {
        c.start(y);
      }, l), f && i.on(ut[1], e.Html.wrapper, function(y) {
        c.start(y);
      }, l);
    },
    /**
     * Unbinds swipe's starting event.
     *
     * @return {Void}
     */
    unbindSwipeStart: function() {
      i.off(ut[0], e.Html.wrapper, l), i.off(ut[1], e.Html.wrapper, l);
    },
    /**
     * Binds swipe's moving event.
     *
     * @return {Void}
     */
    bindSwipeMove: function() {
      var c = this;
      i.on(ts, e.Html.wrapper, Ot(function(h) {
        c.move(h);
      }, a.settings.throttle), l);
    },
    /**
     * Unbinds swipe's moving event.
     *
     * @return {Void}
     */
    unbindSwipeMove: function() {
      i.off(ts, e.Html.wrapper, l);
    },
    /**
     * Binds swipe's ending event.
     *
     * @return {Void}
     */
    bindSwipeEnd: function() {
      var c = this;
      i.on(is, e.Html.wrapper, function(h) {
        c.end(h);
      });
    },
    /**
     * Unbinds swipe's ending event.
     *
     * @return {Void}
     */
    unbindSwipeEnd: function() {
      i.off(is, e.Html.wrapper);
    },
    /**
     * Normalizes event touches points accorting to different types.
     *
     * @param {Object} event
     */
    touches: function(c) {
      return ss.indexOf(c.type) > -1 ? c : c.touches[0] || c.changedTouches[0];
    },
    /**
     * Gets value of minimum swipe distance settings based on event type.
     *
     * @return {Number}
     */
    threshold: function(c) {
      var h = a.settings;
      return ss.indexOf(c.type) > -1 ? h.dragThreshold : h.swipeThreshold;
    },
    /**
     * Enables swipe event.
     *
     * @return {self}
     */
    enable: function() {
      return o = !1, e.Transition.enable(), this;
    },
    /**
     * Disables swipe event.
     *
     * @return {self}
     */
    disable: function() {
      return o = !0, e.Transition.disable(), this;
    }
  };
  return t.on("build.after", function() {
    e.Html.root.classList.add(a.settings.classes.swipeable);
  }), t.on("destroy", function() {
    u.unbindSwipeStart(), u.unbindSwipeMove(), u.unbindSwipeEnd(), i.destroy();
  }), u;
}
function qr(a, e, t) {
  var i = new Ce(), s = {
    /**
     * Binds listener to glide wrapper.
     *
     * @return {Void}
     */
    mount: function() {
      this.bind();
    },
    /**
     * Binds `dragstart` event on wrapper to prevent dragging images.
     *
     * @return {Void}
     */
    bind: function() {
      i.on("dragstart", e.Html.wrapper, this.dragstart);
    },
    /**
     * Unbinds `dragstart` event on wrapper.
     *
     * @return {Void}
     */
    unbind: function() {
      i.off("dragstart", e.Html.wrapper);
    },
    /**
     * Event handler. Prevents dragging.
     *
     * @return {Void}
     */
    dragstart: function(r) {
      r.preventDefault();
    }
  };
  return t.on("destroy", function() {
    s.unbind(), i.destroy();
  }), s;
}
function Pr(a, e, t) {
  var i = new Ce(), s = !1, n = !1, r = {
    /**
     * Setups a initial state of anchors component.
     *
     * @returns {Void}
     */
    mount: function() {
      this._a = e.Html.wrapper.querySelectorAll("a"), this.bind();
    },
    /**
     * Binds events to anchors inside a track.
     *
     * @return {Void}
     */
    bind: function() {
      i.on("click", e.Html.wrapper, this.click);
    },
    /**
     * Unbinds events attached to anchors inside a track.
     *
     * @return {Void}
     */
    unbind: function() {
      i.off("click", e.Html.wrapper);
    },
    /**
     * Handler for click event. Prevents clicks when glide is in `prevent` status.
     *
     * @param  {Object} event
     * @return {Void}
     */
    click: function(l) {
      n && (l.stopPropagation(), l.preventDefault());
    },
    /**
     * Detaches anchors click event inside glide.
     *
     * @return {self}
     */
    detach: function() {
      if (n = !0, !s) {
        for (var l = 0; l < this.items.length; l++)
          this.items[l].draggable = !1;
        s = !0;
      }
      return this;
    },
    /**
     * Attaches anchors click events inside glide.
     *
     * @return {self}
     */
    attach: function() {
      if (n = !1, s) {
        for (var l = 0; l < this.items.length; l++)
          this.items[l].draggable = !0;
        s = !1;
      }
      return this;
    }
  };
  return G(r, "items", {
    /**
     * Gets collection of the arrows HTML elements.
     *
     * @return {HTMLElement[]}
     */
    get: function() {
      return r._a;
    }
  }), t.on("swipe.move", function() {
    r.detach();
  }), t.on("swipe.end", function() {
    e.Transition.after(function() {
      r.attach();
    });
  }), t.on("destroy", function() {
    r.attach(), r.unbind(), i.destroy();
  }), r;
}
var Or = '[data-glide-el="controls[nav]"]', di = '[data-glide-el^="controls"]', Nr = "".concat(di, ' [data-glide-dir*="<"]'), Ir = "".concat(di, ' [data-glide-dir*=">"]');
function Dr(a, e, t) {
  var i = new Ce(), s = ei ? {
    passive: !0
  } : !1, n = {
    /**
     * Inits arrows. Binds events listeners
     * to the arrows HTML elements.
     *
     * @return {Void}
     */
    mount: function() {
      this._n = e.Html.root.querySelectorAll(Or), this._c = e.Html.root.querySelectorAll(di), this._arrowControls = {
        previous: e.Html.root.querySelectorAll(Nr),
        next: e.Html.root.querySelectorAll(Ir)
      }, this.addBindings();
    },
    /**
     * Sets active class to current slide.
     *
     * @return {Void}
     */
    setActive: function() {
      for (var o = 0; o < this._n.length; o++)
        this.addClass(this._n[o].children);
    },
    /**
     * Removes active class to current slide.
     *
     * @return {Void}
     */
    removeActive: function() {
      for (var o = 0; o < this._n.length; o++)
        this.removeClass(this._n[o].children);
    },
    /**
     * Toggles active class on items inside navigation.
     *
     * @param  {HTMLElement} controls
     * @return {Void}
     */
    addClass: function(o) {
      var l = a.settings, u = o[a.index];
      u && (u.classList.add(l.classes.nav.active), Ss(u).forEach(function(d) {
        d.classList.remove(l.classes.nav.active);
      }));
    },
    /**
     * Removes active class from active control.
     *
     * @param  {HTMLElement} controls
     * @return {Void}
     */
    removeClass: function(o) {
      var l = o[a.index];
      l?.classList.remove(a.settings.classes.nav.active);
    },
    /**
     * Calculates, removes or adds `Glide.settings.classes.disabledArrow` class on the control arrows
     */
    setArrowState: function() {
      if (!a.settings.rewind) {
        var o = n._arrowControls.next, l = n._arrowControls.previous;
        this.resetArrowState(o, l), a.index === 0 && this.disableArrow(l), a.index === e.Run.length && this.disableArrow(o);
      }
    },
    /**
     * Removes `Glide.settings.classes.disabledArrow` from given NodeList elements
     *
     * @param {NodeList[]} lists
     */
    resetArrowState: function() {
      for (var o = a.settings, l = arguments.length, u = new Array(l), d = 0; d < l; d++)
        u[d] = arguments[d];
      u.forEach(function(c) {
        Qt(c).forEach(function(h) {
          h.classList.remove(o.classes.arrow.disabled);
        });
      });
    },
    /**
     * Adds `Glide.settings.classes.disabledArrow` to given NodeList elements
     *
     * @param {NodeList[]} lists
     */
    disableArrow: function() {
      for (var o = a.settings, l = arguments.length, u = new Array(l), d = 0; d < l; d++)
        u[d] = arguments[d];
      u.forEach(function(c) {
        Qt(c).forEach(function(h) {
          h.classList.add(o.classes.arrow.disabled);
        });
      });
    },
    /**
     * Adds handles to the each group of controls.
     *
     * @return {Void}
     */
    addBindings: function() {
      for (var o = 0; o < this._c.length; o++)
        this.bind(this._c[o].children);
    },
    /**
     * Removes handles from the each group of controls.
     *
     * @return {Void}
     */
    removeBindings: function() {
      for (var o = 0; o < this._c.length; o++)
        this.unbind(this._c[o].children);
    },
    /**
     * Binds events to arrows HTML elements.
     *
     * @param {HTMLCollection} elements
     * @return {Void}
     */
    bind: function(o) {
      for (var l = 0; l < o.length; l++)
        i.on("click", o[l], this.click), i.on("touchstart", o[l], this.click, s);
    },
    /**
     * Unbinds events binded to the arrows HTML elements.
     *
     * @param {HTMLCollection} elements
     * @return {Void}
     */
    unbind: function(o) {
      for (var l = 0; l < o.length; l++)
        i.off(["click", "touchstart"], o[l]);
    },
    /**
     * Handles `click` event on the arrows HTML elements.
     * Moves slider in direction given via the
     * `data-glide-dir` attribute.
     *
     * @param {Object} event
     * @return {void}
     */
    click: function(o) {
      !ei && o.type === "touchstart" && o.preventDefault();
      var l = o.currentTarget.getAttribute("data-glide-dir");
      e.Run.make(e.Direction.resolve(l));
    }
  };
  return G(n, "items", {
    /**
     * Gets collection of the controls HTML elements.
     *
     * @return {HTMLElement[]}
     */
    get: function() {
      return n._c;
    }
  }), t.on(["mount.after", "move.after"], function() {
    n.setActive();
  }), t.on(["mount.after", "run"], function() {
    n.setArrowState();
  }), t.on("destroy", function() {
    n.removeBindings(), n.removeActive(), i.destroy();
  }), n;
}
function $r(a, e, t) {
  var i = new Ce(), s = {
    /**
     * Binds keyboard events on component mount.
     *
     * @return {Void}
     */
    mount: function() {
      a.settings.keyboard && this.bind();
    },
    /**
     * Adds keyboard press events.
     *
     * @return {Void}
     */
    bind: function() {
      i.on("keyup", document, this.press);
    },
    /**
     * Removes keyboard press events.
     *
     * @return {Void}
     */
    unbind: function() {
      i.off("keyup", document);
    },
    /**
     * Handles keyboard's arrows press and moving glide foward and backward.
     *
     * @param  {Object} event
     * @return {Void}
     */
    press: function(r) {
      var o = a.settings.perSwipe, l = {
        ArrowRight: ">",
        ArrowLeft: "<"
      };
      ["ArrowRight", "ArrowLeft"].includes(r.code) && e.Run.make(e.Direction.resolve("".concat(o).concat(l[r.code])));
    }
  };
  return t.on(["destroy", "update"], function() {
    s.unbind();
  }), t.on("update", function() {
    s.mount();
  }), t.on("destroy", function() {
    i.destroy();
  }), s;
}
function Hr(a, e, t) {
  var i = new Ce(), s = {
    /**
     * Initializes autoplaying and events.
     *
     * @return {Void}
     */
    mount: function() {
      this.enable(), this.start(), a.settings.hoverpause && this.bind();
    },
    /**
     * Enables autoplaying
     *
     * @returns {Void}
     */
    enable: function() {
      this._e = !0;
    },
    /**
     * Disables autoplaying.
     *
     * @returns {Void}
     */
    disable: function() {
      this._e = !1;
    },
    /**
     * Starts autoplaying in configured interval.
     *
     * @param {Boolean|Number} force Run autoplaying with passed interval regardless of `autoplay` settings
     * @return {Void}
     */
    start: function() {
      var r = this;
      this._e && (this.enable(), a.settings.autoplay && ks(this._i) && (this._i = setInterval(function() {
        r.stop(), e.Run.make(">"), r.start(), t.emit("autoplay");
      }, this.time)));
    },
    /**
     * Stops autorunning of the glide.
     *
     * @return {Void}
     */
    stop: function() {
      this._i = clearInterval(this._i);
    },
    /**
     * Stops autoplaying while mouse is over glide's area.
     *
     * @return {Void}
     */
    bind: function() {
      var r = this;
      i.on("mouseover", e.Html.root, function() {
        r._e && r.stop();
      }), i.on("mouseout", e.Html.root, function() {
        r._e && r.start();
      });
    },
    /**
     * Unbind mouseover events.
     *
     * @returns {Void}
     */
    unbind: function() {
      i.off(["mouseover", "mouseout"], e.Html.root);
    }
  };
  return G(s, "time", {
    /**
     * Gets time period value for the autoplay interval. Prioritizes
     * times in `data-glide-autoplay` attrubutes over options.
     *
     * @return {Number}
     */
    get: function() {
      var r = e.Html.slides[a.index].getAttribute("data-glide-autoplay");
      return Q(r || a.settings.autoplay);
    }
  }), t.on(["destroy", "update"], function() {
    s.unbind();
  }), t.on(["run.before", "swipe.start", "update"], function() {
    s.stop();
  }), t.on(["pause", "destroy"], function() {
    s.disable(), s.stop();
  }), t.on(["run.after", "swipe.end"], function() {
    s.start();
  }), t.on(["play"], function() {
    s.enable(), s.start();
  }), t.on("update", function() {
    s.mount();
  }), t.on("destroy", function() {
    i.destroy();
  }), s;
}
function ns(a) {
  return Fe(a) ? ar(a) : (_e("Breakpoints option must be an object"), {});
}
function zr(a, e, t) {
  var i = new Ce(), s = a.settings, n = ns(s.breakpoints), r = Object.assign({}, s), o = {
    /**
     * Matches settings for currectly matching media breakpoint.
     *
     * @param {Object} points
     * @returns {Object}
     */
    match: function(u) {
      if (typeof window.matchMedia < "u") {
        for (var d in u)
          if (u.hasOwnProperty(d) && window.matchMedia("(max-width: ".concat(d, "px)")).matches)
            return u[d];
      }
      return r;
    }
  };
  return Object.assign(s, o.match(n)), i.on("resize", window, Ot(function() {
    a.settings = Zt(s, o.match(n));
  }, a.settings.throttle)), t.on("update", function() {
    n = ns(n), r = Object.assign({}, s);
  }), t.on("destroy", function() {
    i.off("resize", window);
  }), o;
}
var Br = {
  // Required
  Html: pr,
  Translate: Ar,
  Transition: Mr,
  Direction: xr,
  Peek: fr,
  Sizes: mr,
  Gaps: dr,
  Move: gr,
  Clones: br,
  Resize: vr,
  Build: yr,
  Run: ur,
  // Optional
  Swipe: Rr,
  Images: qr,
  Anchors: Pr,
  Controls: Dr,
  Keyboard: $r,
  Autoplay: Hr,
  Breakpoints: zr
}, Fr = /* @__PURE__ */ (function(a) {
  Zn(t, a);
  var e = ir(t);
  function t() {
    return qt(this, t), e.apply(this, arguments);
  }
  return Pt(t, [{
    key: "mount",
    value: function() {
      var s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      return bt(Be(t.prototype), "mount", this).call(this, Object.assign({}, Br, s));
    }
  }]), t;
})(cr);
class Ur {
  addClass(e, t) {
    e && (this.hasClass(e, t) || (e.classList.length === 0 ? e.className = t : e.className = e.className + " " + t, e.className = e.className.replace(/  +/g, " ")));
  }
  removeClass(e, t) {
    if (e && e.classList.length > 0) {
      let i, s, n, r, o = t.split(" ");
      for (i = 0, n = o.length; i < n; ++i) {
        if (!o[i]) continue;
        let l = o[i], u = "", d = e.className.split(" ");
        for (s = 0, r = d.length; s < r; ++s)
          d[s] && d[s] !== l && (u += d[s] + " ");
        e.className = u.trim();
      }
      e.className === "" && e.removeAttribute("class");
    }
  }
  hasClass(e, t) {
    if (!e) return !1;
    try {
      let i = e.getAttribute("class");
      return new RegExp("\\b" + t + "\\b").test(i);
    } catch {
    }
  }
}
const H = new Ur();
class jr {
  constructor(e = {}) {
    const t = {
      // onSearch: (keywords)=>{
      //     alert(keywords)
      // }
    };
    this.settings = Object.assign(this, t, e);
  }
  init() {
    const e = (h) => {
      const p = h.parentNode, f = h.nextElementSibling;
      if (H.hasClass(f, "is-menu-links")) {
        let _ = f.querySelectorAll("li");
        _.forEach((g) => {
          if (g !== p) {
            const v = g.querySelector("ul");
            H.removeClass(v, "active");
          }
        }), _ = document.querySelectorAll(".is-menu > ul > li ul"), _.forEach((g) => {
          const v = g.querySelector("ul");
          H.removeClass(v, "active");
        });
      }
      H.hasClass(f, "active") && !H.hasClass(f, "is-menu-links") && f.querySelectorAll("li").forEach((g) => {
        if (g !== p) {
          const v = g.querySelector("ul");
          H.removeClass(v, "active");
        }
      });
      const y = p.querySelector("ul");
      y && H.addClass(y, "active");
    }, t = (h) => {
      if (h.nextElementSibling) {
        const p = h.nextElementSibling;
        if (p)
          if (H.hasClass(p, "active"))
            H.removeClass(p, "active"), h.focus();
          else {
            const y = h.parentNode.parentNode;
            H.removeClass(y, "active"), y.previousElementSibling.focus();
          }
        else {
          const y = h.parentNode.parentNode;
          H.removeClass(y, "active"), y.previousElementSibling.focus();
        }
      } else {
        const f = h.parentNode.parentNode;
        H.removeClass(f, "active"), f.previousElementSibling.focus();
      }
    }, i = (h) => {
      const p = h.target;
      if (h.keyCode === 27)
        t(h.target);
      else if (h.keyCode === 13)
        h.target.nextElementSibling && (h.target.getAttribute("href") === "" || h.target.getAttribute("href") === "javascript:") && (e(h.target), h.preventDefault());
      else if (h.keyCode === 32)
        h.target.nextElementSibling && (e(h.target), h.preventDefault());
      else if (h.keyCode === 40)
        if (p.nextElementSibling)
          if (p.nextElementSibling.classList.contains("active"))
            p.nextElementSibling.querySelector("a").focus(), h.preventDefault();
          else if (p.parentNode.nextElementSibling)
            p.parentNode.nextElementSibling.querySelector("a").focus(), h.preventDefault();
          else {
            const y = p.parentNode.parentNode;
            y.classList.contains("active") && (y.classList.remove("active"), y.previousElementSibling.focus(), h.preventDefault());
          }
        else if (p.parentNode.nextElementSibling)
          p.parentNode.nextElementSibling.querySelector("a").focus(), h.preventDefault();
        else {
          const y = p.parentNode.parentNode;
          y.classList.contains("active") && (y.classList.remove("active"), y.previousElementSibling.focus(), h.preventDefault());
        }
      else if (h.keyCode === 38)
        if (p.nextElementSibling)
          if (p.nextElementSibling.classList.contains("active"))
            p.nextElementSibling.classList.remove("active");
          else {
            const f = p.parentNode.previousElementSibling;
            f && f.querySelector("a").focus();
          }
        else if (p.parentNode.previousElementSibling)
          p.parentNode.previousElementSibling.querySelector("a").focus();
        else {
          const y = p.parentNode.parentNode;
          y.classList.contains("active") && y.classList.remove("active"), y.previousElementSibling.focus();
        }
      else if (h.which === 9 && !h.shiftKey)
        if (p.nextElementSibling)
          if (p.nextElementSibling.classList.contains("active"))
            p.nextElementSibling.querySelector("a").focus(), h.preventDefault();
          else if (p.parentNode.nextElementSibling)
            p.parentNode.nextElementSibling.querySelector("a").focus(), h.preventDefault();
          else {
            const y = p.parentNode.parentNode;
            y.classList.contains("active") && (y.classList.remove("active"), y.previousElementSibling.focus(), h.preventDefault());
          }
        else if (p.parentNode.nextElementSibling)
          p.parentNode.nextElementSibling.querySelector("a").focus(), h.preventDefault();
        else {
          const y = p.parentNode.parentNode;
          y.classList.contains("active") && (y.classList.remove("active"), y.previousElementSibling.focus(), h.preventDefault());
        }
      else if (h.which === 9 && h.shiftKey) {
        if (p.nextElementSibling)
          p.nextElementSibling.classList.contains("active") && p.nextElementSibling.classList.remove("active");
        else if (!p.parentNode.previousElementSibling) {
          const y = p.parentNode.parentNode;
          y.classList.contains("active") && y.classList.remove("active");
        }
      }
    };
    document.querySelectorAll(".is-menu li a").forEach((h) => {
      h.addEventListener("keydown", i);
    }), document.querySelectorAll(".is-menu li").forEach((h) => {
      const p = h.querySelector("span");
      p && p.addEventListener("click", (f) => {
        if (window.innerWidth >= 1024) return;
        const g = f.target.closest("li").querySelector("ul");
        g && (H.hasClass(g, "active") ? (H.removeClass(g, "active"), g.style.display = "") : H.addClass(g, "active")), f.preventDefault(), f.stopImmediatePropagation();
      }), h.addEventListener("click", (f) => {
        const y = h.querySelector("ul"), _ = window.innerWidth;
        let g = f.target.tagName.toLowerCase();
        if (_ > 1024) {
          if ((g === "a" || g === "i") && !f.target.getAttribute("href")) {
            f.preventDefault(), f.stopImmediatePropagation();
            return;
          }
        } else {
          let v = !0;
          if ((g === "a" || g === "i") && (f.target.getAttribute("href") || (f.preventDefault(), v = !1)), v) {
            const m = document.querySelector(".is-menu");
            if (m.style.right === "0px") {
              H.removeClass(r, "active"), m.style.right = "-1000px";
              const b = document.querySelector(".is-menu-overlay");
              H.removeClass(b, "active"), document.querySelector(".is-topbar-menu").style.paddingRight = "0px", document.body.style.overflowY = "auto";
            }
          }
        }
        y && (H.hasClass(y, "active") ? (H.removeClass(y, "active"), y.style.display = "") : (H.addClass(y, "active"), setTimeout(() => {
        }, 0)));
      }), h.addEventListener("mouseleave", (f) => {
        window.innerWidth <= 1024 || (this.timer = setTimeout(() => {
          const _ = h.querySelector("ul");
          _ && H.removeClass(_, "active");
        }, 200), f.preventDefault(), f.stopImmediatePropagation());
      }), h.addEventListener("mouseenter", (f) => {
        const y = window.innerWidth;
        if (y <= 1024 || this.staticClose) return;
        const _ = document.querySelector(".is-menu-search-input");
        if (H.hasClass(_, "active")) return;
        clearTimeout(this.timer);
        const g = h.closest("ul");
        if (!h.querySelector("ul"))
          return g.querySelectorAll("li").forEach((b) => {
            const w = b.querySelector("ul");
            H.removeClass(w, "active");
          }), !0;
        if (H.hasClass(g, "is-menu-links")) {
          let m = g.querySelectorAll("li");
          m.forEach((b) => {
            if (b !== h) {
              const w = b.querySelector("ul");
              H.removeClass(w, "active");
            }
          }), m = document.querySelectorAll(".is-menu > ul > li ul"), m.forEach((b) => {
            const w = b.querySelector("ul");
            H.removeClass(w, "active");
          });
        }
        H.hasClass(g, "active") && !H.hasClass(g, "is-menu-links") && g.querySelectorAll("li").forEach((b) => {
          if (b !== h) {
            const w = b.querySelector("ul");
            H.removeClass(w, "active");
          }
        });
        const v = h.querySelector("ul");
        if (v && H.addClass(v, "active"), v.style.right = "", v.classList.contains("active")) {
          const m = v.getBoundingClientRect();
          m.left + m.width > y && (v.style.right = 0);
        }
        f.preventDefault(), f.stopImmediatePropagation();
      });
    });
    const r = document.querySelector("#is-menu-toggle");
    r.addEventListener("click", (h) => {
      const p = document.querySelector(".is-menu");
      if (p.style.right === "0px") {
        H.removeClass(r, "active"), p.style.right = "-1000px";
        const f = document.querySelector(".is-menu-overlay");
        H.removeClass(f, "active"), document.querySelector(".is-topbar-menu").style.paddingRight = "0px", document.body.style.overflowY = "auto";
      } else {
        H.addClass(r, "active"), document.querySelector(".is-menu-links .is-menu-search") ? (document.querySelector(".is-menu-search-input").style.display = "", document.querySelector(".is-menu-links").style.marginTop = "") : (document.querySelector(".is-menu-search-input").style.display = "none", document.querySelector(".is-menu-links").style.marginTop = "70px"), p.style.right = "0px";
        const y = document.querySelector(".is-menu-overlay");
        H.addClass(y, "active"), document.querySelector(".is-topbar-menu").style.paddingRight = this.getScrollbarWidth() + "px", document.body.style.overflowY = "hidden";
      }
      h.stopImmediatePropagation(), h.preventDefault();
    }), document.querySelector(".is-menu-overlay").addEventListener("click", (h) => {
      document.querySelector("#is-menu-toggle").click(), h.stopImmediatePropagation(), h.preventDefault();
    }), window.addEventListener("resize", () => {
      document.body.style.overflowY = "auto", document.querySelector(".is-topbar-menu").style.paddingRight = "0px";
      const h = document.querySelector("#is-menu-toggle");
      H.removeClass(h, "active"), document.querySelectorAll(".is-menu li ul").forEach((_) => {
        H.removeClass(_, "active");
      });
      const f = document.querySelector(".is-menu");
      if (f.style.transition = "none", window.innerWidth > 1024) {
        f.style.right = "0px", document.querySelectorAll(".is-menu li ul").forEach((v) => {
          v.style.display = "";
        });
        const g = document.querySelector(".is-menu-overlay");
        H.removeClass(g, "active"), document.querySelector(".is-menu-search-input").style.display = "", document.querySelector(".is-menu-links").style.marginTop = "";
      } else
        f.style.right = "-1000px";
      setTimeout(() => {
        f.style.transition = "";
      }, 30);
    }), window.addEventListener("scroll", () => {
      var h = 100, p = this.getCurrentScroll();
      p >= h ? H.addClass(document.querySelector(".is-topbar"), "shrink") : H.removeClass(document.querySelector(".is-topbar"), "shrink"), window.innerWidth >= 1024 && document.querySelector(".is-topbar.static") && (p > 30 ? this.staticClose || (document.querySelectorAll(".is-menu li ul").forEach((_) => {
        H.removeClass(_, "active");
      }), this.staticClose = !0) : this.staticClose = !1);
    });
    const l = (h) => {
      const p = document.querySelector(".is-menu-search-input");
      H.addClass(p, "active"), p.querySelector("input").focus(), document.querySelectorAll(".is-menu li ul").forEach((_) => {
        H.removeClass(_, "active");
      }), h.preventDefault(), h.stopImmediatePropagation();
    }, u = document.querySelector(".is-menu-search");
    u && (u.addEventListener("click", (h) => {
      l(h);
    }), u.addEventListener("keydown", (h) => {
      (h.keyCode === 13 || h.keyCode === 32) && l(h);
    })), document.addEventListener("click", (h) => {
      const p = h.target;
      if (!H.hasClass(p, "is-menu-search") && p.getAttribute("id") !== "is_btnSearch" && p.getAttribute("id") !== "is_txtSearch") {
        const f = document.querySelector(".is-menu-search-input");
        H.removeClass(f, "active");
      }
    });
    const d = document.querySelector("#is_txtSearch");
    d.addEventListener("keydown", (h) => {
      if (h.which == 13 && this.settings.onSearch(d.value), h.which == 27) {
        const p = document.querySelector(".is-menu-search-input");
        H.removeClass(p, "active"), document.querySelector(".is-menu-search").focus();
      }
    }), document.querySelector("#is_btnSearch").addEventListener("click", () => {
      this.settings.onSearch(d.value);
    });
  }
  getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }
  getCurrentScroll() {
    return window.pageYOffset || document.documentElement.scrollTop;
  }
}
class Yr {
  constructor(e = {}) {
    this.config = {
      plugins: {},
      // Plugin registry
      autoLoad: !0,
      pluginBaseUrl: "",
      allowExternalPlugins: !0,
      // Simple on/off for external plugins
      trustedDomains: [],
      // Optional: whitelist specific domains
      onReInit: () => {
      },
      ...e
    }, this.plugins = /* @__PURE__ */ new Map(), this.loadedStyles = /* @__PURE__ */ new Set(), this.components = /* @__PURE__ */ new Map(), this.externalPlugins = /* @__PURE__ */ new Map();
  }
  /**
   * Auto-detect and load plugins based on DOM elements
   */
  async autoLoadPlugins() {
    const t = this.detectComponentTypes().filter(
      (i) => this.config.plugins[i] && !this.plugins.has(i)
    );
    return t.length > 0 && await Promise.all(
      t.map((i) => this.loadPlugin(i))
    ), t;
  }
  /**
   * Detect all component types used in the page
   */
  detectComponentTypes() {
    const e = /* @__PURE__ */ new Set();
    return document.querySelectorAll("[data-cb-type]").forEach((t) => {
      e.add(t.dataset.cbType);
    }), document.querySelectorAll('[class*="cb-"]').forEach((t) => {
      t.classList.forEach((i) => {
        if (i.startsWith("cb-")) {
          const s = i.replace("cb-", "");
          e.add(s);
        }
      });
    }), Array.from(e);
  }
  /**
   * Load a plugin dynamically
   */
  async loadPlugin(e) {
    if (this.plugins.has(e))
      return this.plugins.get(e);
    const t = this.config.plugins[e];
    if (!t)
      return console.warn(`[PluginManager] Plugin "${e}" not found in registry`), null;
    if (e === "code") {
      const i = {
        name: "code",
        version: "1.0.0",
        mount: function(s, n) {
          return {};
        }
      };
      return this.plugins.set(e, i), this.emit("plugin-loaded", { name: e, plugin: i }), i;
    }
    try {
      t.css && this.loadCSS(this.resolveUrl(t.css));
      const i = this.resolveUrl(t.url), s = await this.importModule(i), n = s.default || s;
      return this.plugins.set(e, n), typeof n.init == "function" && await n.init(this), this.emit("plugin-loaded", { name: e, plugin: n }), n;
    } catch (i) {
      return console.error(`[PluginManager] Failed to load plugin "${e}":`, i), null;
    }
  }
  /**
   * Dynamically import ES module
   */
  async importModule(e) {
    return import(
      /* webpackIgnore: true */
      /* @vite-ignore */
      e
    );
  }
  /**
   * Load CSS file
   */
  loadCSS(e) {
    if (this.loadedStyles.has(e)) return;
    const t = document.createElement("link");
    t.rel = "stylesheet", t.href = e, t.onload = () => {
      this.emit("css-loaded", { url: e });
    }, t.onerror = () => {
      console.error(`[PluginManager] Failed to load CSS: ${e}`);
    }, document.head.appendChild(t), this.loadedStyles.add(e);
  }
  /**
   * Resolve URL (handle relative paths)
   */
  resolveUrl(e) {
    return e.startsWith("http://") || e.startsWith("https://") || e.startsWith("//") ? e : this.config.pluginBaseUrl + e;
  }
  /**
   * Initialize all components in the page
   */
  initializeComponents() {
    return document.querySelectorAll("[data-cb-type]").forEach((t, i) => {
      const s = t.dataset.cbType, n = this.plugins.get(s);
      if (n && typeof n.mount == "function")
        try {
          const r = this.parseOptions(t);
          let o = t.querySelector(".grid-sortable");
          o || t.classList.contains("grid-sortable") && (o = t), o && Array.from(o.children).forEach((d, c) => {
            d.nodeType === 1 && d.tagName !== "STYLE" && d.tagName !== "SCRIPT" && d.setAttribute("data-index", c);
          }), t.querySelectorAll(".edit").forEach((d, c) => {
            const h = `content-${Date.now()}-${i}-${c}`;
            d.setAttribute("data-edit-id", h);
          }), t.hasAttribute("data-cb-original-content") || t.setAttribute("data-cb-original-content", t.innerHTML);
          const u = n.mount(t, r);
          this.components.set(t, u), this.setupInlineEditing(t, r), t.setAttribute("data-cb-loaded", "true"), typeof t.mount == "function" && t.mount();
        } catch (r) {
          console.error(`[PluginManager] Failed to mount component "${s}":`, r);
        }
    }), this.components.size;
  }
  /**
   * Parse component options from data attributes
   */
  parseOptions(e) {
    const t = {};
    return Array.from(e.attributes).forEach((i) => {
      if (i.name.startsWith("data-cb-")) {
        const s = i.name.replace("data-cb-", "").replace(/-([a-z])/g, (n, r) => r.toUpperCase());
        t[s] = this.parseValue(i.value);
      }
    }), t;
  }
  /**
   * Parse string value to appropriate type
   */
  parseValue(e) {
    if (e === "true") return !0;
    if (e === "false") return !1;
    if (!isNaN(e) && e !== "") return Number(e);
    try {
      return JSON.parse(e);
    } catch {
      return e;
    }
  }
  /**
   * Setup inline editing for elements with .edit[data-edit-id]
   * Automatically enables contenteditable and syncs changes to data-cb-original-content
   * @param {HTMLElement} element - Plugin element
   * @param {Object} options - Plugin options
   */
  setupInlineEditing(e, t) {
    if (!e.closest(".data-editor")) return;
    const i = e.querySelectorAll(".edit[data-edit-id]");
    if (i.length === 0)
      return;
    e.querySelectorAll('.edit[contenteditable="true"]').forEach((r) => {
      r.removeAttribute("contenteditable"), r._cbObserver && (r._cbObserver.disconnect(), delete r._cbObserver), r._cbKeydownHandler && (r.removeEventListener("keydown", r._cbKeydownHandler), delete r._cbKeydownHandler);
    });
    const n = (r, o) => {
      const l = e.getAttribute("data-cb-original-content");
      if (!l) return;
      const u = document.createElement("template");
      u.innerHTML = l.trim();
      const c = u.content.querySelector(`[data-edit-id="${r}"]`);
      if (c) {
        c.innerHTML = o;
        const h = u.innerHTML;
        e.setAttribute("data-cb-original-content", h);
      }
    };
    i.forEach((r) => {
      r.setAttribute("contenteditable", "true");
      const o = (d) => {
        var c = document.createRange();
        c.selectNodeContents(d);
        var h = window.getSelection();
        h.removeAllRanges(), h.addRange(c);
      }, l = (d) => {
        if ((d.ctrlKey || d.metaKey) && d.which === 65) {
          let c;
          try {
            window.getSelection ? c = window.getSelection().getRangeAt(0).commonAncestorContainer.parentNode : document.selection && (c = document.selection.createRange().parentElement()), o(c), d.preventDefault(), d.stopImmediatePropagation();
          } catch {
          }
        }
      };
      r.addEventListener("keydown", l), r._cbKeydownHandler = l;
      const u = new MutationObserver(() => {
        const d = r.getAttribute("data-edit-id"), c = r.innerHTML;
        n(d, c);
      });
      u.observe(r, {
        childList: !0,
        // Child elements added/removed
        characterData: !0,
        // Text content changes
        subtree: !0,
        // Watch all descendants
        attributes: !0
        // Attribute changes
        // attributeFilter: ['style'] // Specifically watch style (color picker)
      }), r._cbObserver = u;
    });
  }
  /**
   * Manually load a plugin (if not auto-loaded)
   */
  async use(e) {
    return await this.loadPlugin(e);
  }
  /**
   * Get a loaded plugin by name
   */
  getPlugin(e) {
    return this.plugins.get(e);
  }
  /**
   * Get all loaded plugins
   */
  getAllPlugins() {
    return Array.from(this.plugins.entries());
  }
  /**
   * Check if a plugin is loaded
   */
  hasPlugin(e) {
    return this.plugins.has(e);
  }
  /**
   * Get component instance for an element
   */
  getComponent(e) {
    return this.components.get(e);
  }
  /**
   * Unmount a single component and remove it from the map
   * Runs the plugin's unmount (cleanup, e.g. removing a popover). Call this before
   * removing the element from the DOM — reinitialize() only unmounts elements still
   * inside the container.
   * @param {HTMLElement} element - The element to unmount
   * @returns {boolean} True if a component was unmounted
   */
  unmountComponent(e) {
    if (!e || !this.components.has(e)) return !1;
    const t = this.components.get(e), i = e.dataset.cbType, s = this.plugins.get(i);
    if (s && typeof s.unmount == "function")
      try {
        s.unmount(e, t);
      } catch {
      }
    return this.components.delete(e), !0;
  }
  /**
   * Reinitialize components in a specific container
   * Useful when content is dynamically updated
   * @param {HTMLElement} container - Container element (defaults to document)
   */
  async reinitialize(e = document) {
    if (this.reinitializeInProgress)
      return clearTimeout(this.pendingReinitialize), new Promise((t) => {
        this.pendingReinitialize = setTimeout(async () => {
          this.pendingReinitialize = null;
          const i = await this.reinitialize(e);
          t(i);
        }, 100);
      });
    this.reinitializeInProgress = !0;
    try {
      const t = [];
      this.components.forEach((o, l) => {
        (e === document || e.contains(l)) && t.push({ element: l, instance: o });
      }), t.forEach(({ element: o, instance: l }) => {
        const u = o.dataset.cbType, d = this.plugins.get(u);
        d && typeof d.unmount == "function" && d.unmount(o, l), this.components.delete(o);
      });
      const s = this.detectComponentTypesInContainer(e).filter(
        (o) => this.config.plugins[o] && !this.plugins.has(o)
      );
      s.length > 0 && await Promise.all(
        s.map((o) => this.loadPlugin(o))
      );
      const n = e.querySelectorAll("[data-cb-type]");
      let r = 0;
      for (const o of n) {
        const l = o.dataset.cbType, u = this.plugins.get(l);
        if (u && typeof u.mount == "function")
          try {
            const d = this.parseOptions(o);
            let c = o.querySelector(".grid-sortable");
            if (c || o.classList.contains("grid-sortable") && (c = o), c && Array.from(c.children).forEach((f, y) => {
              f.nodeType === 1 && f.tagName !== "STYLE" && f.tagName !== "SCRIPT" && f.setAttribute("data-index", y);
            }), o.querySelectorAll(".edit").forEach((f, y) => {
              const _ = `content-${Date.now()}-${r}-${y}`;
              f.setAttribute("data-edit-id", _);
            }), !o.hasAttribute("data-cb-original-content"))
              o.setAttribute("data-cb-original-content", o.innerHTML);
            else {
              let f = document.createRange();
              o.innerHTML = "", o.appendChild(f.createContextualFragment(o.getAttribute("data-cb-original-content")));
              let y = !1;
              o.querySelectorAll(".edit:not([data-edit-id])").forEach((_, g) => {
                _.setAttribute("data-edit-id", `content-${Date.now()}-${r}-new-${g}`), y = !0;
              }), y && o.setAttribute("data-cb-original-content", o.innerHTML);
            }
            const p = await u.mount(o, d);
            this.components.set(o, p), this.setupInlineEditing(o, d), o.setAttribute("data-cb-loaded", "true"), typeof o.mount == "function" && o.mount(), r++;
          } catch (d) {
            console.error(`[PluginManager] Failed to mount component "${l}":`, d);
          }
      }
      return typeof this.config.onReInit == "function" && this.config.onReInit(), this.emit("reinitialized", { container: e, count: r }), r;
    } finally {
      this.reinitializeInProgress = !1;
    }
  }
  /**
   * Detect component types within a specific container
   * @param {HTMLElement} container
   */
  detectComponentTypesInContainer(e) {
    const t = /* @__PURE__ */ new Set();
    return e.querySelectorAll("[data-cb-type]").forEach((s) => {
      t.add(s.dataset.cbType);
    }), Array.from(t);
  }
  /**
   * Register and load plugin from external URL
   * @param {string} pluginId - Unique identifier for the plugin
   * @param {object} config - Plugin configuration
   * @param {string} config.url - JavaScript module URL
   * @param {string} config.css - CSS file URL (optional)
   */
  async loadExternalPlugin(e, t) {
    if (!e || typeof e != "string")
      throw new Error("Plugin ID is required and must be a string");
    if (!t.url)
      throw new Error("Plugin URL is required");
    if (this.plugins.has(e))
      return console.warn(`[PluginManager] Plugin "${e}" is already loaded`), this.plugins.get(e);
    const i = this.validatePluginSource(t.url);
    if (!i.allowed)
      throw new Error(`Security: ${i.reason}`);
    i.warning && (console.warn(`[PluginManager] ${i.warning}`), this.emit("plugin-security-warning", {
      pluginId: e,
      url: t.url,
      warning: i.warning
    }));
    try {
      this.config.plugins[e] = {
        url: t.url,
        css: t.css || null,
        source: "external",
        loadedAt: (/* @__PURE__ */ new Date()).toISOString()
      }, this.externalPlugins.set(e, this.config.plugins[e]);
      const s = await this.loadPlugin(e);
      return this.emit("external-plugin-loaded", {
        pluginId: e,
        url: t.url
      }), s;
    } catch (s) {
      throw delete this.config.plugins[e], this.externalPlugins.delete(e), console.error(`[PluginManager] Failed to load external plugin "${e}":`, s), s;
    }
  }
  /**
   * Validate plugin source URL
   * @param {string} url - Plugin URL to validate
   * @returns {object} Validation result
   */
  validatePluginSource(e) {
    const t = e.includes("localhost") || e.includes("127.0.0.1");
    if (!e.startsWith("https://") && !t)
      return {
        allowed: !1,
        reason: "Only HTTPS URLs are allowed (except localhost for development)"
      };
    if (!this.config.allowExternalPlugins)
      return {
        allowed: !1,
        reason: "External plugins are disabled. Enable allowExternalPlugins in configuration."
      };
    if (this.config.trustedDomains.length > 0) {
      const s = new URL(e).hostname;
      if (!this.config.trustedDomains.some((r) => {
        if (r.startsWith("*.")) {
          const o = r.slice(2);
          return s === o || s.endsWith("." + o);
        }
        return s === r;
      }))
        return {
          allowed: !0,
          warning: `Loading plugin from external domain: ${s}. Only add plugins from sources you trust.`
        };
    } else
      return {
        allowed: !0,
        warning: `Loading external plugin from: ${new URL(e).hostname}. This plugin will have full access to your page.`
      };
    return { allowed: !0 };
  }
  /**
   * Batch load external plugins
   * Useful for loading user's saved plugins on page init
   * @param {object} pluginsConfig - Object with pluginId as key and config as value
   */
  async loadExternalPlugins(e) {
    const t = [];
    for (const [i, s] of Object.entries(e))
      try {
        const n = await this.loadExternalPlugin(i, s);
        t.push({ pluginId: i, success: !0, plugin: n });
      } catch (n) {
        t.push({ pluginId: i, success: !1, error: n.message }), console.error(`[PluginManager] Failed to load external plugin "${i}":`, n);
      }
    return t;
  }
  /**
   * Remove/unregister an external plugin
   * @param {string} pluginId - Plugin to remove
   */
  unregisterPlugin(e) {
    if (!this.externalPlugins.has(e))
      return console.warn(`[PluginManager] Plugin "${e}" is not an external plugin`), !1;
    const t = this.plugins.get(e), i = [];
    return this.components.forEach((s, n) => {
      n.dataset.cbType === e && i.push({ element: n, instance: s });
    }), i.forEach(({ element: s, instance: n }) => {
      t && typeof t.unmount == "function" && t.unmount(s, n), this.components.delete(s);
    }), t && typeof t.destroy == "function" && t.destroy(this), this.plugins.delete(e), this.externalPlugins.delete(e), delete this.config.plugins[e], this.emit("plugin-unregistered", { pluginId: e }), !0;
  }
  /**
   * Get list of all external (user-added) plugins
   */
  getExternalPlugins() {
    return Array.from(this.externalPlugins.entries()).map(([e, t]) => ({
      id: e,
      ...t
    }));
  }
  /**
   * Check if a plugin is external (user-added)
   */
  isExternalPlugin(e) {
    return this.externalPlugins.has(e);
  }
  /**
   * Destroy all components and plugins
   */
  destroy() {
    this.components.forEach((e, t) => {
      const i = t.dataset.cbType, s = this.plugins.get(i);
      s && typeof s.unmount == "function" && s.unmount(t, e);
    }), this.components.forEach((e, t) => {
      t.querySelectorAll('.edit[contenteditable="true"]').forEach((s) => {
        s.removeAttribute("contenteditable"), s._cbObserver && (s._cbObserver.disconnect(), delete s._cbObserver), s._cbKeydownHandler && (s.removeEventListener("keydown", s._cbKeydownHandler), delete s._cbKeydownHandler);
      });
    }), this.plugins.forEach((e, t) => {
      typeof e.destroy == "function" && e.destroy(this);
    }), this.components.clear(), this.plugins.clear();
  }
  /**
   * Event emitter (delegate to runtime if available)
   */
  emit(e, t) {
    if (this.runtime && typeof this.runtime.emit == "function")
      this.runtime.emit(e, t);
    else {
      const i = new CustomEvent(`contentbox:${e}`, { detail: t });
      document.dispatchEvent(i);
    }
  }
  /**
   * Set runtime reference (for event delegation)
   */
  setRuntime(e) {
    this.runtime = e;
  }
}
class $o {
  constructor(e = {}) {
    const t = {
      skin: "light",
      smoothScroll: !0,
      animationTransition: !0,
      // reproduce legacy's smoothing by
      // letting the browser ease each element with a CSS
      // transition, exactly as the old engine did.
      // false = use the animationSmoothing scrub instead
      // (Kinetra's pre-1.1 behaviour).
      animationSmoothing: 0.1,
      // scrub catch-up in seconds.
      // Only applies when animationTransition is false —
      // the transition IS the smoothing, and the two
      // must not stack. 0 = hard-locked to the scrollbar.
      effects: !0,
      editorPreview: "full",
      // 'safe'| 'full'
      plugins: {},
      // Plugin registry: { 'plugin-name': { url: '...', css: '...' } }
      autoLoadPlugins: !0,
      // Auto-load plugins based on detected components
      pluginBaseUrl: "",
      // Base URL for plugins if using relative paths
      allowExternalPlugins: !0,
      // Simple on/off for external plugins
      trustedDomains: []
      // Optional: whitelist specific domains
    };
    this.settings = { ...t, ...e }, this.initialized = !1, this.pluginManager = new Yr({
      plugins: this.settings.plugins,
      autoLoad: this.settings.autoLoadPlugins,
      pluginBaseUrl: this.settings.pluginBaseUrl,
      allowExternalPlugins: this.settings.allowExternalPlugins,
      trustedDomains: this.settings.trustedDomains,
      onReInit: () => {
        this.functionLightboxInit();
      }
    }), this.pluginManager.setRuntime(this), window.Glide = Fr, Bs(this.settings), window.NavBar = jr, window.pageReRender = () => {
      this.pageReRender();
    };
  }
  /**
   * Plugin management delegation methods
   */
  /**
   * Manually load a plugin
   */
  async use(e) {
    return await this.pluginManager.use(e);
  }
  /**
   * Get a loaded plugin
   */
  getPlugin(e) {
    return this.pluginManager.getPlugin(e);
  }
  /**
   * Get all loaded plugins
   */
  getPlugins() {
    return this.pluginManager.getAllPlugins();
  }
  /**
   * Check if plugin is loaded
   */
  hasPlugin(e) {
    return this.pluginManager.hasPlugin(e);
  }
  /**
   * Get component instance for an element
   */
  getComponent(e) {
    return this.pluginManager.getComponent(e);
  }
  /**
   * Get all component instances
   */
  getComponents() {
    return this.pluginManager.components;
  }
  /**
   * Unmount a single component (runs its plugin's cleanup)
   * Call this before removing the element from the DOM.
   * @param {HTMLElement} element - The element to unmount
   * @returns {boolean} True if a component was unmounted
   */
  unmountComponent(e) {
    return this.pluginManager.unmountComponent(e);
  }
  /**
   * Reinitialize components (after content update)
   * @param {HTMLElement} container - Container to reinitialize (optional, defaults to document)
   */
  async reinitialize(e) {
    return await this.pluginManager.reinitialize(e);
  }
  /**
   * Register and load plugin from external URL
   */
  async loadExternalPlugin(e, t) {
    return await this.pluginManager.loadExternalPlugin(e, t);
  }
  /**
   * Batch load external plugins
   */
  async loadExternalPlugins(e) {
    return await this.pluginManager.loadExternalPlugins(e);
  }
  /**
   * Remove/unregister an external plugin
   */
  unregisterPlugin(e) {
    return this.pluginManager.unregisterPlugin(e);
  }
  /**
   * Simple event emitter
   */
  emit(e, t) {
    const i = new CustomEvent(`contentbox:${e}`, { detail: t });
    document.dispatchEvent(i);
  }
  /**
   * Listen to events
   */
  on(e, t) {
    document.addEventListener(`contentbox:${e}`, t);
  }
  /**
   * Remove event listener
   */
  off(e, t) {
    document.removeEventListener(`contentbox:${e}`, t);
  }
  async init() {
    this.initialized || (this.initCore(), this.initPlugins(), this.initialized = !0, this.emit("init"));
  }
  async initPlugins() {
    this.settings.autoLoadPlugins && await this.pluginManager.autoLoadPlugins(), this.pluginManager.initializeComponents();
  }
  initCore() {
    this.prepareContent(), this.updateOnResize(), this.blockInit(), this.initeSkrollrr(), this.settings.effects && (this.effects = new An({
      editorPreview: this.settings.editorPreview
      // added
    }), this.effects.init(), window.fx = this.effects), this.contentBoxOnRenderUpdate(), this.functionLightboxInit(), this.inViewSetup(), Ti(this.settings), this.settings.smoothScroll && new Xn();
  }
  prepareContent() {
    const e = document.querySelector(".is-wrapper");
    e.classList.add("box-v2");
    const t = function(r) {
      let o = r.nextElementSibling;
      return o ? o.classList.contains("is-section") ? o : t(o) : !1;
    };
    document.querySelectorAll(".is-arrow-down a").forEach((r) => {
      r.addEventListener("click", (o) => {
        let l = o.target.closest(".is-section");
        if (l) {
          let u = t(l);
          u && this.scrollIt(u, 1e3, "easeInQuad");
        }
        o.preventDefault(), o.stopImmediatePropagation();
      });
    }), e && (e.classList.contains("is-edit") || e.querySelectorAll("a").forEach((o) => {
      o.addEventListener("click", (l) => {
        let u = o.getAttribute("href");
        if (u && u.indexOf("#") === 0)
          if (u.indexOf("#section") === 0) {
            let d = u.replace("#section", "");
            if (!isNaN(parseInt(d))) {
              let c = document.querySelectorAll(".is-section"), h, p = 0;
              c.forEach(function(f) {
                f.classList.contains("is-section-navbar") || (p === d - 1 && (h = f), p++);
              }), h && this.scrollIt(h, 1e3, "easeInQuad"), l.preventDefault();
            }
          } else
            try {
              let d = document.querySelector(u);
              d && (this.scrollIt(d, 1e3, "easeInQuad"), l.preventDefault());
            } catch {
            }
      });
    })), document.querySelectorAll(".section-inview").forEach(function(r) {
      r.classList.remove("section-inview");
    });
    let n = document.querySelectorAll(".is-animated,.is-scale-animated");
    n.forEach(function(r) {
      r.classList.contains("once") ? (r.removeAttribute("data-scroll", ""), r.setAttribute("data-scroll-once", "")) : (r.removeAttribute("data-scroll-once", ""), r.setAttribute("data-scroll", ""));
    }), n = document.querySelectorAll(".is-container > div"), n.forEach(function(r) {
      let o = r.querySelectorAll(".is-animated[data-scroll],.is-animated[data-scroll-once]"), l = 0;
      o.length > 1 && o.forEach(function(u) {
        u.className.indexOf("delay-") === -1 && (l > 0 && (u.style.transitionDelay = l + "s", u.style.animationDelay = l + "s"), l = l + 0.2);
      });
    }), this.skrollrSetup(), this.adjustBgPos();
  }
  updateOnResize() {
    function e(i) {
      var s;
      return function(n) {
        s && clearTimeout(s), s = setTimeout(i, 100, n);
      };
    }
    const t = document.querySelector(".is-wrapper");
    window.addEventListener("resize", e((i) => {
      document.body.classList.contains("data-editor") && (t.querySelector(".pin-wrap") && !window.noRender ? this.pageReRender() : window.skrollrr && window.skrollrr.refresh(), window.noRender = !1, this.adjustBgPos());
    })), t.classList.contains("is-edit") && (window.onbeforeunload = function(i) {
      localStorage.setItem("_lastscrollpos", document.documentElement.scrollTop), window.scrollTo(0, 0);
    }, setTimeout(() => {
      localStorage.getItem("_lastscrollpos") && window.scrollTo(0, localStorage.getItem("_lastscrollpos"));
    }, 300));
  }
  // Must be used after the Kinetra scroll-animation engine is loaded
  initeSkrollrr() {
    var e = document.querySelectorAll(".is-overlay-bg");
    e.forEach((i) => {
      i.style && i.style.filter && i.style.filter.indexOf("grayscale") !== -1 && (i.parentNode.style.filter = "grayscale(1)");
    });
    const t = new li({
      smoothing: this.settings.animationSmoothing,
      legacyTransition: this.settings.animationTransition
    });
    t.init(), window.skrollrr = t;
  }
  _scrollTo(e, t = 0) {
    const i = e.getBoundingClientRect().top + window.pageYOffset + t;
    window.scrollTo({ top: i, behavior: "smooth" });
  }
  scrollIt(e, t = 200, i = "linear", s) {
    this._scrollTo(e);
  }
  skrollrSetup() {
    document.querySelectorAll(".pin-wrap").forEach((o) => {
      const l = o.firstElementChild;
      o.after(l), o.parentNode.removeChild(o);
    }), document.querySelectorAll(".is-section").forEach((o) => {
      o.hasAttribute("data-section-clone") && o.parentNode.removeChild(o), o.hasAttribute("data-section-original") && (o.style.display = "", o.removeAttribute("data-section-original"));
    });
    let i = window.innerWidth;
    i <= 760 && document.querySelectorAll(".section-wrap").forEach((l) => {
      l.outerHTML = l.innerHTML;
    });
    const s = window.self !== window.top;
    let n;
    s ? n = document.querySelectorAll(".is-wrapper .section-pin") : n = document.querySelectorAll(".is-wrapper:not(.is-edit) .section-pin"), n.forEach(function(o) {
      i <= 970 && o.querySelector(".is-box") && (o.querySelectorAll(".is-box").forEach((u) => {
        const d = o.cloneNode(!1);
        u.getAttributeNames().map((c) => {
          c.indexOf("data-") !== -1 && d.setAttribute(c, u.getAttribute(c));
        }), d.classList.add("is-box"), u.classList.forEach((c) => {
          (c.indexOf("is-box-") !== -1 || c.indexOf("is-content-") !== -1 || c.indexOf("box-autofit") !== -1 || c.indexOf("is-light-text") !== -1 || c.indexOf("is-dark-text") !== -1 || c.indexOf("is-align-") !== -1 || c.indexOf("type-") !== -1 || c.indexOf("block-click") !== -1 || c.indexOf("hover-zoom") !== -1) && d.classList.add(c);
        }), d.setAttribute("data-section-clone", ""), d.innerHTML = u.innerHTML, o.parentNode.insertBefore(d, o);
      }), o.setAttribute("data-section-original", ""), o.style.display = "none");
    }), s ? n = document.querySelectorAll(".is-wrapper .section-pin") : n = document.querySelectorAll(".is-wrapper:not(.is-edit) .section-pin"), n.forEach(function(o) {
      if (o.parentNode.closest(".section-wrap") || i <= 970 && o.hasAttribute("data-section-original")) return;
      const l = document.createElement("div");
      l.classList.add("pin-wrap"), o.classList.contains("m-skrollrr-off") && l.classList.add("m-skrollrr-off"), o.classList.contains("pin-space-lg") && l.classList.add("pin-space-lg"), o.classList.contains("pin-space-xl") && l.classList.add("pin-space-xl"), o.classList.contains("xs-hidden") && l.classList.add("xs-hidden"), o.classList.contains("sm-hidden") && l.classList.add("sm-hidden"), o.classList.contains("desktop-hidden") && l.classList.add("desktop-hidden"), o.after(l), l.appendChild(o);
    });
    const r = (o) => {
      document.querySelectorAll(".is-section").forEach((u) => {
        const d = u.getBoundingClientRect().top;
        let c, h;
        u.parentNode.classList.contains("pin-wrap") ? (c = u.parentNode.nextElementSibling, h = u.parentNode.previousElementSibling) : (c = u.nextElementSibling, h = u.previousElementSibling), c && c.classList.contains("pin-wrap") && (c = c.querySelector(".is-section")), h && h.classList.contains("pin-wrap") && (h = h.querySelector(".is-section")), d <= 0 && ((u.classList.contains("no-spacing") || u.classList.contains("pin-overlap")) && u.classList.add("section-inview"), document.querySelectorAll(".is-section").forEach((f) => {
          f !== u && f.classList.remove("section-inview");
        }));
      });
    };
    setTimeout(() => {
      (!document.querySelector(".is-wrapper").classList.contains("is-edit") || s) && !window.funcScroll && (window.addEventListener("scroll", r), window.funcScroll = !0);
    }, 300);
  }
  adjustBgPos() {
    const e = (n) => {
      const r = document.createElement("div");
      r.style.backgroundPositionX = n.style.backgroundPositionX, r.style.backgroundPositionY = n.style.backgroundPositionY, r.style.backgroundSize = n.style.backgroundSize, n.hasAttribute("data-bg-ori") || n.setAttribute("data-bg-ori", r.style.cssText);
    }, t = (n) => {
      if (n.hasAttribute("data-bg-ori")) {
        const r = document.createElement("div");
        r.style.cssText = n.getAttribute("data-bg-ori"), n.style.backgroundPositionX = r.style.backgroundPositionX, n.style.backgroundPositionY = r.style.backgroundPositionY, n.style.backgroundSize = r.style.backgroundSize, n.removeAttribute("data-bg-ori");
      }
    };
    let i = window.innerWidth;
    document.querySelectorAll("[data-bg-xs],[data-bg-sm],[data-bg-md],[data-bg-lg]").forEach((n) => {
      e(n), i <= 760 && (n.hasAttribute("data-bg-xs") ? n.style.cssText = n.style.cssText + ";" + n.getAttribute("data-bg-xs") : t(n)), i > 760 && i <= 970 && (n.hasAttribute("data-bg-sm") ? n.style.cssText = n.style.cssText + ";" + n.getAttribute("data-bg-sm") : t(n)), i > 970 && i <= 1280 && (n.hasAttribute("data-bg-md") ? n.style.cssText = n.style.cssText + ";" + n.getAttribute("data-bg-md") : t(n)), i > 1280 && (n.hasAttribute("data-bg-lg") ? n.style.cssText = n.style.cssText + ";" + n.getAttribute("data-bg-lg") : t(n));
    });
  }
  inViewSetup() {
    document.querySelectorAll(".is-overlay-content").forEach((n) => {
      (n.querySelector("video.is-video-bg") || n.querySelector('[data-cb-type="video-background"]')) && n.setAttribute("data-scroll", "");
    }), document.querySelectorAll(".is-container video").forEach((n) => {
      n.parentNode.setAttribute("data-scroll", "");
    });
    const i = (n) => {
      const r = n.play();
      r && r.catch(() => {
        n.muted || (n.muted = !0, n.play().catch(() => {
        }));
      });
    }, s = new Xs({
      trigger: {
        once: !0,
        offset: {
          element: {
            x: 0,
            y: (n, r, o) => 0.1
          },
          viewport: {
            x: 0,
            y: (n, r, o) => n.visible ? 0 : 0.1
          }
        },
        toggle: {
          class: {
            in: "is-inview",
            out: [""]
          },
          callback: {
            in: (n) => {
              n.element.querySelectorAll("video").forEach((o) => {
                if (o.innerHTML.trim() === "") return;
                let l = o.parentNode.querySelector(".video-bg-play");
                o.autoplay ? l ? l.innerHTML.indexOf("play") === -1 && i(o) : i(o) : l && l.innerHTML.indexOf("play") === -1 && i(o);
              });
            },
            out: (n) => {
              n.element.querySelectorAll("video").forEach((o) => {
                o.paused || o.pause();
              });
            }
          }
        }
      }
    });
    s.add("[data-scroll-once]"), s.add("[data-scroll]", { once: !1 }), window.trigger = s;
  }
  contentBoxOnRenderUpdate() {
    try {
      if (window.contentbox || parent.contentbox) {
        let e;
        window.contentbox ? e = window.contentbox.onRender : parent.contentbox && (e = parent.contentbox.onRender);
        const t = () => {
          e.call(this);
          try {
            window.trigger && window.trigger.kill();
          } catch {
          }
          let i = document.querySelectorAll(".is-animated,.is-scale-animated");
          i.forEach(function(s) {
            s.classList.contains("once") ? (s.removeAttribute("data-scroll", ""), s.setAttribute("data-scroll-once", "")) : (s.removeAttribute("data-scroll-once", ""), s.setAttribute("data-scroll", ""));
          }), i = document.querySelectorAll(".is-container > div"), i.forEach(function(s) {
            let n = s.querySelectorAll(".is-animated[data-scroll],.is-animated[data-scroll-once]"), r = 0;
            n.length > 1 && n.forEach(function(o) {
              o.className.indexOf("delay-") === -1 && (r > 0 && (o.style.transitionDelay = r + "s", o.style.animationDelay = r + "s"), r = r + 0.2);
            });
          }), setTimeout(() => {
            this.inViewSetup();
          }, 100);
        };
        window.contentbox ? window.contentbox.onRender = t : parent.contentbox && (parent.contentbox.onRender = t);
      }
    } catch {
    }
  }
  // Lightbox
  functionLightboxInit() {
    const e = {
      touchNavigation: !0,
      selector: ".glightbox",
      // do not use .is-lightbox if used for programmatically open
      loop: !0,
      autoplayVideos: !0,
      zoomable: !0,
      slideEffect: "slide",
      descPosition: "bottom",
      skin: this.settings.skin
      // videosWidth: '70vw',
    };
    this.refreshLightbox(e), document.querySelectorAll(".is-lightbox,.block-click").forEach((i) => {
      const s = (n) => {
        if (i.closest('[contenteditable="true"]'))
          return n.preventDefault(), !1;
        {
          let r = i.getAttribute("href") || i.getAttribute("data-modal-url");
          this.openLightbox(r, i, e), n.preventDefault(), n.stopImmediatePropagation();
        }
      };
      i.addEventListener("click", s), i._lightboxHandler = s;
    });
  }
  refreshLightbox(e) {
    this.glightbox && this.glightbox.destroy(), this.glightbox = new Ji(e), window.GLightbox = Ji.default;
  }
  openLightbox(e, t, i) {
    let s = [], n = 0;
    if (t) {
      const o = t.closest("[data-gallery]");
      let l = [];
      o ? l = o.querySelectorAll(".is-lightbox") : document.querySelectorAll(".is-lightbox,.block-click").forEach((d) => {
        d.closest("[data-gallery]") || l.push(d);
      }), l.forEach((u, d) => {
        let c = u.getAttribute("href");
        c || (c = u.getAttribute("data-modal-url")), s.push({
          href: c
        }), e === c && (n = d);
      });
    }
    const r = document.activeElement;
    r?.blur(), s.length > 0 ? (this.glightbox.setElements(s), this.glightbox.openAt(n)) : (this.glightbox.setElements([
      {
        href: e
      }
    ]), this.glightbox.open()), this.glightbox.on("close", () => {
      this.refreshLightbox(i), r?.focus();
    });
  }
  // box-canvas
  blockInit() {
    const e = {
      start: () => {
        document.querySelectorAll(".is-block").forEach((s) => {
          s.hasAttribute("data--t") || s.setAttribute("data--t", s.style.top), s.hasAttribute("data--l") || s.setAttribute("data--l", s.style.left), s.hasAttribute("data--b") || s.setAttribute("data--b", s.style.bottom), s.hasAttribute("data--r") || s.setAttribute("data--r", s.style.right), s.hasAttribute("data--w") || s.setAttribute("data--w", s.style.width), s.hasAttribute("data--h") || s.setAttribute("data--h", s.style.height), s.removeAttribute("data-prev"), s.removeAttribute("data-fluid"), s.removeAttribute("data-fluid-val"), s.classList.remove("fluid"), s.style.transition = "";
        });
      },
      apply: (s, n, r) => {
        if (n && s.getAttribute("data-prev") !== n + "") {
          if (r || (s.style.transition = "all 0.35s ease"), n !== 1e4) {
            if (s.setAttribute("data-breakpoint", n), s.hasAttribute("data--t-" + n)) {
              let o = s.getAttribute("data--t-" + n);
              s.style.top = o;
            }
            if (s.hasAttribute("data--l-" + n)) {
              let o = s.getAttribute("data--l-" + n);
              s.style.left = o;
            }
            if (s.hasAttribute("data--b-" + n)) {
              let o = s.getAttribute("data--b-" + n);
              s.style.bottom = o;
            }
            if (s.hasAttribute("data--r-" + n)) {
              let o = s.getAttribute("data--r-" + n);
              s.style.right = o;
            }
            if (s.hasAttribute("data--w-" + n)) {
              let o = s.getAttribute("data--w-" + n);
              s.style.width = o;
            }
            if (s.hasAttribute("data--h-" + n)) {
              let o = s.getAttribute("data--h-" + n);
              s.style.height = o;
            }
            if (s.hasAttribute("data--transform-" + n)) {
              let o = s.getAttribute("data--transform-" + n);
              s.style.transform = o, s.setAttribute("data--transform-val", n);
            }
          } else {
            if (s.removeAttribute("data-breakpoint"), s.hasAttribute("data--t")) {
              let o = s.getAttribute("data--t");
              s.style.top = o;
            }
            if (s.hasAttribute("data--l")) {
              let o = s.getAttribute("data--l");
              s.style.left = o;
            }
            if (s.hasAttribute("data--b")) {
              let o = s.getAttribute("data--b");
              s.style.bottom = o;
            }
            if (s.hasAttribute("data--r")) {
              let o = s.getAttribute("data--r");
              s.style.right = o;
            }
            if (s.hasAttribute("data--w")) {
              let o = s.getAttribute("data--w");
              s.style.width = o;
            }
            if (s.hasAttribute("data--h")) {
              let o = s.getAttribute("data--h");
              s.style.height = o;
            }
            if (s.hasAttribute("data--transform")) {
              let o = s.getAttribute("data--transform");
              s.style.transform = o, s.setAttribute("data--transform-val", "");
            }
          }
          s.setAttribute("data-prev", n), setTimeout(() => {
            r || (s.style.transition = "");
          }, 400);
        }
      },
      applyFluid: (s, n) => {
        s.classList.toggle("fluid", n === "yes"), s.setAttribute("data-fluid", n);
      },
      resize: (s) => {
        const n = window.innerWidth;
        document.querySelectorAll(".is-box").forEach((r) => {
          let o = [];
          const l = r.attributes;
          for (let u = 0; u < l.length; u++) {
            let c = l[u].name.match(/^data--h-(\d+)$/);
            if (c) {
              const h = parseInt(c[1], 10);
              o.push(h);
            }
          }
          o = [...new Set(o)], o.sort((u, d) => d - u);
          for (let u = 0; u < o.length; u++) {
            const d = o[u];
            if (u === 0) {
              if (n > d) {
                let c = r.getAttribute("data--h");
                c ? r.style.height = c : r.style.height = "";
              }
            } else {
              const c = o[u - 1];
              if (c >= n && n > d) {
                let h = r.getAttribute("data--h-" + c);
                h && (r.style.height = h);
              }
            }
          }
          if (o.length > 0 && o[o.length - 1] >= n) {
            const d = o[o.length - 1];
            let c = r.getAttribute("data--h-" + d);
            c && (r.style.height = c);
          }
        }), document.querySelectorAll(".is-block").forEach((r) => {
          if (!r.classList.contains("locked")) {
            r.offsetWidth + 0 > n && !r.classList.contains("fluid") && (r.setAttribute("data-fluid-val", r.offsetWidth), e.applyFluid(r, "yes"));
            let u = r.getAttribute("data-fluid-val");
            u && parseInt(u) + 0 <= n && r.classList.contains("fluid") && e.applyFluid(r, "no");
          }
          let o = [];
          const l = r.attributes;
          for (let u = 0; u < l.length; u++) {
            const d = l[u].name;
            let c = d.match(/^data--t-(\d+)$/);
            if (c) {
              const h = parseInt(c[1], 10);
              o.push(h);
            }
            if (c = d.match(/^data--w-(\d+)$/), c) {
              const h = parseInt(c[1], 10);
              o.push(h);
            }
            if (c = d.match(/^data--transform-(\d+)$/), c) {
              const h = parseInt(c[1], 10);
              o.push(h);
            }
          }
          o = [...new Set(o)], o.sort((u, d) => d - u);
          for (let u = 0; u < o.length; u++) {
            const d = o[u];
            if (u === 0)
              n > d && e.apply(r, 1e4, s);
            else {
              const c = o[u - 1];
              c >= n && n > d && e.apply(r, c, s);
            }
          }
          if (o.length > 0) {
            const u = o[o.length - 1];
            u >= n && e.apply(r, u, s);
          }
        });
      },
      render: () => {
        e.start(), e.resize(!0);
      }
    }, i = ((s, n) => {
      let r;
      return (...o) => {
        clearTimeout(r), r = setTimeout(() => s(...o), n);
      };
    })(() => {
      e.resize();
    }, 0);
    window.addEventListener("resize", i), e.start(), e.resize(!0), this.Block = e;
  }
  pageReRender() {
    Ti(this.settings), this.prepareContent(), this.contentBoxOnRenderUpdate(), window.skrollrr ? (window.skrollrr.refresh(), this.effects && this.effects.refresh()) : this.initeSkrollrr(), this.functionLightboxInit(), this.inViewSetup(), this.Block.start(), this.Block.resize();
  }
  destroy() {
    this.glightbox && (this.glightbox.destroy(), this.glightbox = null), document.querySelectorAll(".is-lightbox,.block-click").forEach((t) => {
      t._lightboxHandler && (t.removeEventListener("click", t._lightboxHandler), delete t._lightboxHandler);
    }), this.pluginManager.destroy(), this.initialized = !1, this.emit("destroy");
  }
}
function hi() {
  return {
    async: !1,
    breaks: !1,
    extensions: null,
    gfm: !0,
    hooks: null,
    pedantic: !1,
    renderer: null,
    silent: !1,
    tokenizer: null,
    walkTokens: null
  };
}
let Pe = hi();
function Ts(a) {
  Pe = a;
}
const Qe = { exec: () => null };
function j(a, e = "") {
  let t = typeof a == "string" ? a : a.source;
  const i = {
    replace: (s, n) => {
      let r = typeof n == "string" ? n : n.source;
      return r = r.replace(ne.caret, "$1"), t = t.replace(s, r), i;
    },
    getRegex: () => new RegExp(t, e)
  };
  return i;
}
const ne = {
  codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm,
  outputLinkReplace: /\\([\[\]])/g,
  indentCodeCompensation: /^(\s+)(?:```)/,
  beginningSpace: /^\s+/,
  endingHash: /#$/,
  startingSpaceChar: /^ /,
  endingSpaceChar: / $/,
  nonSpaceChar: /[^ ]/,
  newLineCharGlobal: /\n/g,
  tabCharGlobal: /\t/g,
  multipleSpaceGlobal: /\s+/g,
  blankLine: /^[ \t]*$/,
  doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
  blockquoteStart: /^ {0,3}>/,
  blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
  blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
  listReplaceTabs: /^\t+/,
  listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
  listIsTask: /^\[[ xX]\] /,
  listReplaceTask: /^\[[ xX]\] +/,
  anyLine: /\n.*\n/,
  hrefBrackets: /^<(.*)>$/,
  tableDelimiter: /[:|]/,
  tableAlignChars: /^\||\| *$/g,
  tableRowBlankLine: /\n[ \t]*$/,
  tableAlignRight: /^ *-+: *$/,
  tableAlignCenter: /^ *:-+: *$/,
  tableAlignLeft: /^ *:-+ *$/,
  startATag: /^<a /i,
  endATag: /^<\/a>/i,
  startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
  endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
  startAngleBracket: /^</,
  endAngleBracket: />$/,
  pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
  unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
  escapeTest: /[&<>"']/,
  escapeReplace: /[&<>"']/g,
  escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
  escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
  unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,
  caret: /(^|[^\[])\^/g,
  percentDecode: /%25/g,
  findPipe: /\|/g,
  splitPipe: / \|/,
  slashPipe: /\\\|/g,
  carriageReturn: /\r\n|\r/g,
  spaceLine: /^ +$/gm,
  notSpaceStart: /^\S*/,
  endingNewline: /\n$/,
  listItemRegex: (a) => new RegExp(`^( {0,3}${a})((?:[	 ][^\\n]*)?(?:\\n|$))`),
  nextBulletRegex: (a) => new RegExp(`^ {0,${Math.min(3, a - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),
  hrRegex: (a) => new RegExp(`^ {0,${Math.min(3, a - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),
  fencesBeginRegex: (a) => new RegExp(`^ {0,${Math.min(3, a - 1)}}(?:\`\`\`|~~~)`),
  headingBeginRegex: (a) => new RegExp(`^ {0,${Math.min(3, a - 1)}}#`),
  htmlBeginRegex: (a) => new RegExp(`^ {0,${Math.min(3, a - 1)}}<(?:[a-z].*>|!--)`, "i")
}, Wr = /^(?:[ \t]*(?:\n|$))+/, Gr = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, Vr = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, it = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, Xr = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, pi = /(?:[*+-]|\d{1,9}[.)])/, Cs = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, Ls = j(Cs).replace(/bull/g, pi).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), Jr = j(Cs).replace(/bull/g, pi).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), fi = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, Kr = /^[^\n]+/, gi = /(?!\s*\])(?:\\.|[^\[\]\\])+/, Zr = j(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", gi).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), Qr = j(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, pi).getRegex(), Nt = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", mi = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, eo = j("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", mi).replace("tag", Nt).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), As = j(fi).replace("hr", it).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Nt).getRegex(), to = j(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", As).getRegex(), yi = {
  blockquote: to,
  code: Gr,
  def: Zr,
  fences: Vr,
  heading: Xr,
  hr: it,
  html: eo,
  lheading: Ls,
  list: Qr,
  newline: Wr,
  paragraph: As,
  table: Qe,
  text: Kr
}, rs = j("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", it).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Nt).getRegex(), io = {
  ...yi,
  lheading: Jr,
  table: rs,
  paragraph: j(fi).replace("hr", it).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", rs).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Nt).getRegex()
}, so = {
  ...yi,
  html: j(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", mi).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: Qe,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: j(fi).replace("hr", it).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", Ls).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, no = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, ro = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, Ms = /^( {2,}|\\)\n(?!\s*$)/, oo = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, It = /[\p{P}\p{S}]/u, bi = /[\s\p{P}\p{S}]/u, Rs = /[^\s\p{P}\p{S}]/u, ao = j(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, bi).getRegex(), qs = /(?!~)[\p{P}\p{S}]/u, lo = /(?!~)[\s\p{P}\p{S}]/u, co = /(?:[^\s\p{P}\p{S}]|~)/u, uo = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g, Ps = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, ho = j(Ps, "u").replace(/punct/g, It).getRegex(), po = j(Ps, "u").replace(/punct/g, qs).getRegex(), Os = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", fo = j(Os, "gu").replace(/notPunctSpace/g, Rs).replace(/punctSpace/g, bi).replace(/punct/g, It).getRegex(), go = j(Os, "gu").replace(/notPunctSpace/g, co).replace(/punctSpace/g, lo).replace(/punct/g, qs).getRegex(), mo = j("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, Rs).replace(/punctSpace/g, bi).replace(/punct/g, It).getRegex(), yo = j(/\\(punct)/, "gu").replace(/punct/g, It).getRegex(), bo = j(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), vo = j(mi).replace("(?:-->|$)", "-->").getRegex(), wo = j("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", vo).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Lt = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, _o = j(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", Lt).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), Ns = j(/^!?\[(label)\]\[(ref)\]/).replace("label", Lt).replace("ref", gi).getRegex(), Is = j(/^!?\[(ref)\](?:\[\])?/).replace("ref", gi).getRegex(), xo = j("reflink|nolink(?!\\()", "g").replace("reflink", Ns).replace("nolink", Is).getRegex(), vi = {
  _backpedal: Qe,
  // only used for GFM url
  anyPunctuation: yo,
  autolink: bo,
  blockSkip: uo,
  br: Ms,
  code: ro,
  del: Qe,
  emStrongLDelim: ho,
  emStrongRDelimAst: fo,
  emStrongRDelimUnd: mo,
  escape: no,
  link: _o,
  nolink: Is,
  punctuation: ao,
  reflink: Ns,
  reflinkSearch: xo,
  tag: wo,
  text: oo,
  url: Qe
}, ko = {
  ...vi,
  link: j(/^!?\[(label)\]\((.*?)\)/).replace("label", Lt).getRegex(),
  reflink: j(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Lt).getRegex()
}, ti = {
  ...vi,
  emStrongRDelimAst: go,
  emStrongLDelim: po,
  url: j(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
}, So = {
  ...ti,
  br: j(Ms).replace("{2,}", "*").getRegex(),
  text: j(ti.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, dt = {
  normal: yi,
  gfm: io,
  pedantic: so
}, Je = {
  normal: vi,
  gfm: ti,
  breaks: So,
  pedantic: ko
}, Eo = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}, os = (a) => Eo[a];
function ye(a, e) {
  if (e) {
    if (ne.escapeTest.test(a))
      return a.replace(ne.escapeReplace, os);
  } else if (ne.escapeTestNoEncode.test(a))
    return a.replace(ne.escapeReplaceNoEncode, os);
  return a;
}
function as(a) {
  try {
    a = encodeURI(a).replace(ne.percentDecode, "%");
  } catch {
    return null;
  }
  return a;
}
function ls(a, e) {
  const t = a.replace(ne.findPipe, (n, r, o) => {
    let l = !1, u = r;
    for (; --u >= 0 && o[u] === "\\"; )
      l = !l;
    return l ? "|" : " |";
  }), i = t.split(ne.splitPipe);
  let s = 0;
  if (i[0].trim() || i.shift(), i.length > 0 && !i.at(-1)?.trim() && i.pop(), e)
    if (i.length > e)
      i.splice(e);
    else
      for (; i.length < e; )
        i.push("");
  for (; s < i.length; s++)
    i[s] = i[s].trim().replace(ne.slashPipe, "|");
  return i;
}
function Ke(a, e, t) {
  const i = a.length;
  if (i === 0)
    return "";
  let s = 0;
  for (; s < i && a.charAt(i - s - 1) === e; )
    s++;
  return a.slice(0, i - s);
}
function To(a, e) {
  if (a.indexOf(e[1]) === -1)
    return -1;
  let t = 0;
  for (let i = 0; i < a.length; i++)
    if (a[i] === "\\")
      i++;
    else if (a[i] === e[0])
      t++;
    else if (a[i] === e[1] && (t--, t < 0))
      return i;
  return t > 0 ? -2 : -1;
}
function cs(a, e, t, i, s) {
  const n = e.href, r = e.title || null, o = a[1].replace(s.other.outputLinkReplace, "$1");
  i.state.inLink = !0;
  const l = {
    type: a[0].charAt(0) === "!" ? "image" : "link",
    raw: t,
    href: n,
    title: r,
    text: o,
    tokens: i.inlineTokens(o)
  };
  return i.state.inLink = !1, l;
}
function Co(a, e, t) {
  const i = a.match(t.other.indentCodeCompensation);
  if (i === null)
    return e;
  const s = i[1];
  return e.split(`
`).map((n) => {
    const r = n.match(t.other.beginningSpace);
    if (r === null)
      return n;
    const [o] = r;
    return o.length >= s.length ? n.slice(s.length) : n;
  }).join(`
`);
}
class At {
  options;
  rules;
  // set by the lexer
  lexer;
  // set by the lexer
  constructor(e) {
    this.options = e || Pe;
  }
  space(e) {
    const t = this.rules.block.newline.exec(e);
    if (t && t[0].length > 0)
      return {
        type: "space",
        raw: t[0]
      };
  }
  code(e) {
    const t = this.rules.block.code.exec(e);
    if (t) {
      const i = t[0].replace(this.rules.other.codeRemoveIndent, "");
      return {
        type: "code",
        raw: t[0],
        codeBlockStyle: "indented",
        text: this.options.pedantic ? i : Ke(i, `
`)
      };
    }
  }
  fences(e) {
    const t = this.rules.block.fences.exec(e);
    if (t) {
      const i = t[0], s = Co(i, t[3] || "", this.rules);
      return {
        type: "code",
        raw: i,
        lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2],
        text: s
      };
    }
  }
  heading(e) {
    const t = this.rules.block.heading.exec(e);
    if (t) {
      let i = t[2].trim();
      if (this.rules.other.endingHash.test(i)) {
        const s = Ke(i, "#");
        (this.options.pedantic || !s || this.rules.other.endingSpaceChar.test(s)) && (i = s.trim());
      }
      return {
        type: "heading",
        raw: t[0],
        depth: t[1].length,
        text: i,
        tokens: this.lexer.inline(i)
      };
    }
  }
  hr(e) {
    const t = this.rules.block.hr.exec(e);
    if (t)
      return {
        type: "hr",
        raw: Ke(t[0], `
`)
      };
  }
  blockquote(e) {
    const t = this.rules.block.blockquote.exec(e);
    if (t) {
      let i = Ke(t[0], `
`).split(`
`), s = "", n = "";
      const r = [];
      for (; i.length > 0; ) {
        let o = !1;
        const l = [];
        let u;
        for (u = 0; u < i.length; u++)
          if (this.rules.other.blockquoteStart.test(i[u]))
            l.push(i[u]), o = !0;
          else if (!o)
            l.push(i[u]);
          else
            break;
        i = i.slice(u);
        const d = l.join(`
`), c = d.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        s = s ? `${s}
${d}` : d, n = n ? `${n}
${c}` : c;
        const h = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(c, r, !0), this.lexer.state.top = h, i.length === 0)
          break;
        const p = r.at(-1);
        if (p?.type === "code")
          break;
        if (p?.type === "blockquote") {
          const f = p, y = f.raw + `
` + i.join(`
`), _ = this.blockquote(y);
          r[r.length - 1] = _, s = s.substring(0, s.length - f.raw.length) + _.raw, n = n.substring(0, n.length - f.text.length) + _.text;
          break;
        } else if (p?.type === "list") {
          const f = p, y = f.raw + `
` + i.join(`
`), _ = this.list(y);
          r[r.length - 1] = _, s = s.substring(0, s.length - p.raw.length) + _.raw, n = n.substring(0, n.length - f.raw.length) + _.raw, i = y.substring(r.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return {
        type: "blockquote",
        raw: s,
        tokens: r,
        text: n
      };
    }
  }
  list(e) {
    let t = this.rules.block.list.exec(e);
    if (t) {
      let i = t[1].trim();
      const s = i.length > 1, n = {
        type: "list",
        raw: "",
        ordered: s,
        start: s ? +i.slice(0, -1) : "",
        loose: !1,
        items: []
      };
      i = s ? `\\d{1,9}\\${i.slice(-1)}` : `\\${i}`, this.options.pedantic && (i = s ? i : "[*+-]");
      const r = this.rules.other.listItemRegex(i);
      let o = !1;
      for (; e; ) {
        let u = !1, d = "", c = "";
        if (!(t = r.exec(e)) || this.rules.block.hr.test(e))
          break;
        d = t[0], e = e.substring(d.length);
        let h = t[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (v) => " ".repeat(3 * v.length)), p = e.split(`
`, 1)[0], f = !h.trim(), y = 0;
        if (this.options.pedantic ? (y = 2, c = h.trimStart()) : f ? y = t[1].length + 1 : (y = t[2].search(this.rules.other.nonSpaceChar), y = y > 4 ? 1 : y, c = h.slice(y), y += t[1].length), f && this.rules.other.blankLine.test(p) && (d += p + `
`, e = e.substring(p.length + 1), u = !0), !u) {
          const v = this.rules.other.nextBulletRegex(y), m = this.rules.other.hrRegex(y), b = this.rules.other.fencesBeginRegex(y), w = this.rules.other.headingBeginRegex(y), x = this.rules.other.htmlBeginRegex(y);
          for (; e; ) {
            const k = e.split(`
`, 1)[0];
            let S;
            if (p = k, this.options.pedantic ? (p = p.replace(this.rules.other.listReplaceNesting, "  "), S = p) : S = p.replace(this.rules.other.tabCharGlobal, "    "), b.test(p) || w.test(p) || x.test(p) || v.test(p) || m.test(p))
              break;
            if (S.search(this.rules.other.nonSpaceChar) >= y || !p.trim())
              c += `
` + S.slice(y);
            else {
              if (f || h.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || b.test(h) || w.test(h) || m.test(h))
                break;
              c += `
` + p;
            }
            !f && !p.trim() && (f = !0), d += k + `
`, e = e.substring(k.length + 1), h = S.slice(y);
          }
        }
        n.loose || (o ? n.loose = !0 : this.rules.other.doubleBlankLine.test(d) && (o = !0));
        let _ = null, g;
        this.options.gfm && (_ = this.rules.other.listIsTask.exec(c), _ && (g = _[0] !== "[ ] ", c = c.replace(this.rules.other.listReplaceTask, ""))), n.items.push({
          type: "list_item",
          raw: d,
          task: !!_,
          checked: g,
          loose: !1,
          text: c,
          tokens: []
        }), n.raw += d;
      }
      const l = n.items.at(-1);
      if (l)
        l.raw = l.raw.trimEnd(), l.text = l.text.trimEnd();
      else
        return;
      n.raw = n.raw.trimEnd();
      for (let u = 0; u < n.items.length; u++)
        if (this.lexer.state.top = !1, n.items[u].tokens = this.lexer.blockTokens(n.items[u].text, []), !n.loose) {
          const d = n.items[u].tokens.filter((h) => h.type === "space"), c = d.length > 0 && d.some((h) => this.rules.other.anyLine.test(h.raw));
          n.loose = c;
        }
      if (n.loose)
        for (let u = 0; u < n.items.length; u++)
          n.items[u].loose = !0;
      return n;
    }
  }
  html(e) {
    const t = this.rules.block.html.exec(e);
    if (t)
      return {
        type: "html",
        block: !0,
        raw: t[0],
        pre: t[1] === "pre" || t[1] === "script" || t[1] === "style",
        text: t[0]
      };
  }
  def(e) {
    const t = this.rules.block.def.exec(e);
    if (t) {
      const i = t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), s = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", n = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
      return {
        type: "def",
        tag: i,
        raw: t[0],
        href: s,
        title: n
      };
    }
  }
  table(e) {
    const t = this.rules.block.table.exec(e);
    if (!t || !this.rules.other.tableDelimiter.test(t[2]))
      return;
    const i = ls(t[1]), s = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), n = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], r = {
      type: "table",
      raw: t[0],
      header: [],
      align: [],
      rows: []
    };
    if (i.length === s.length) {
      for (const o of s)
        this.rules.other.tableAlignRight.test(o) ? r.align.push("right") : this.rules.other.tableAlignCenter.test(o) ? r.align.push("center") : this.rules.other.tableAlignLeft.test(o) ? r.align.push("left") : r.align.push(null);
      for (let o = 0; o < i.length; o++)
        r.header.push({
          text: i[o],
          tokens: this.lexer.inline(i[o]),
          header: !0,
          align: r.align[o]
        });
      for (const o of n)
        r.rows.push(ls(o, r.header.length).map((l, u) => ({
          text: l,
          tokens: this.lexer.inline(l),
          header: !1,
          align: r.align[u]
        })));
      return r;
    }
  }
  lheading(e) {
    const t = this.rules.block.lheading.exec(e);
    if (t)
      return {
        type: "heading",
        raw: t[0],
        depth: t[2].charAt(0) === "=" ? 1 : 2,
        text: t[1],
        tokens: this.lexer.inline(t[1])
      };
  }
  paragraph(e) {
    const t = this.rules.block.paragraph.exec(e);
    if (t) {
      const i = t[1].charAt(t[1].length - 1) === `
` ? t[1].slice(0, -1) : t[1];
      return {
        type: "paragraph",
        raw: t[0],
        text: i,
        tokens: this.lexer.inline(i)
      };
    }
  }
  text(e) {
    const t = this.rules.block.text.exec(e);
    if (t)
      return {
        type: "text",
        raw: t[0],
        text: t[0],
        tokens: this.lexer.inline(t[0])
      };
  }
  escape(e) {
    const t = this.rules.inline.escape.exec(e);
    if (t)
      return {
        type: "escape",
        raw: t[0],
        text: t[1]
      };
  }
  tag(e) {
    const t = this.rules.inline.tag.exec(e);
    if (t)
      return !this.lexer.state.inLink && this.rules.other.startATag.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t[0]) && (this.lexer.state.inRawBlock = !1), {
        type: "html",
        raw: t[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        block: !1,
        text: t[0]
      };
  }
  link(e) {
    const t = this.rules.inline.link.exec(e);
    if (t) {
      const i = t[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(i)) {
        if (!this.rules.other.endAngleBracket.test(i))
          return;
        const r = Ke(i.slice(0, -1), "\\");
        if ((i.length - r.length) % 2 === 0)
          return;
      } else {
        const r = To(t[2], "()");
        if (r === -2)
          return;
        if (r > -1) {
          const l = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + r;
          t[2] = t[2].substring(0, r), t[0] = t[0].substring(0, l).trim(), t[3] = "";
        }
      }
      let s = t[2], n = "";
      if (this.options.pedantic) {
        const r = this.rules.other.pedanticHrefTitle.exec(s);
        r && (s = r[1], n = r[3]);
      } else
        n = t[3] ? t[3].slice(1, -1) : "";
      return s = s.trim(), this.rules.other.startAngleBracket.test(s) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(i) ? s = s.slice(1) : s = s.slice(1, -1)), cs(t, {
        href: s && s.replace(this.rules.inline.anyPunctuation, "$1"),
        title: n && n.replace(this.rules.inline.anyPunctuation, "$1")
      }, t[0], this.lexer, this.rules);
    }
  }
  reflink(e, t) {
    let i;
    if ((i = this.rules.inline.reflink.exec(e)) || (i = this.rules.inline.nolink.exec(e))) {
      const s = (i[2] || i[1]).replace(this.rules.other.multipleSpaceGlobal, " "), n = t[s.toLowerCase()];
      if (!n) {
        const r = i[0].charAt(0);
        return {
          type: "text",
          raw: r,
          text: r
        };
      }
      return cs(i, n, i[0], this.lexer, this.rules);
    }
  }
  emStrong(e, t, i = "") {
    let s = this.rules.inline.emStrongLDelim.exec(e);
    if (!s || s[3] && i.match(this.rules.other.unicodeAlphaNumeric))
      return;
    if (!(s[1] || s[2] || "") || !i || this.rules.inline.punctuation.exec(i)) {
      const r = [...s[0]].length - 1;
      let o, l, u = r, d = 0;
      const c = s[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (c.lastIndex = 0, t = t.slice(-1 * e.length + r); (s = c.exec(t)) != null; ) {
        if (o = s[1] || s[2] || s[3] || s[4] || s[5] || s[6], !o)
          continue;
        if (l = [...o].length, s[3] || s[4]) {
          u += l;
          continue;
        } else if ((s[5] || s[6]) && r % 3 && !((r + l) % 3)) {
          d += l;
          continue;
        }
        if (u -= l, u > 0)
          continue;
        l = Math.min(l, l + u + d);
        const h = [...s[0]][0].length, p = e.slice(0, r + s.index + h + l);
        if (Math.min(r, l) % 2) {
          const y = p.slice(1, -1);
          return {
            type: "em",
            raw: p,
            text: y,
            tokens: this.lexer.inlineTokens(y)
          };
        }
        const f = p.slice(2, -2);
        return {
          type: "strong",
          raw: p,
          text: f,
          tokens: this.lexer.inlineTokens(f)
        };
      }
    }
  }
  codespan(e) {
    const t = this.rules.inline.code.exec(e);
    if (t) {
      let i = t[2].replace(this.rules.other.newLineCharGlobal, " ");
      const s = this.rules.other.nonSpaceChar.test(i), n = this.rules.other.startingSpaceChar.test(i) && this.rules.other.endingSpaceChar.test(i);
      return s && n && (i = i.substring(1, i.length - 1)), {
        type: "codespan",
        raw: t[0],
        text: i
      };
    }
  }
  br(e) {
    const t = this.rules.inline.br.exec(e);
    if (t)
      return {
        type: "br",
        raw: t[0]
      };
  }
  del(e) {
    const t = this.rules.inline.del.exec(e);
    if (t)
      return {
        type: "del",
        raw: t[0],
        text: t[2],
        tokens: this.lexer.inlineTokens(t[2])
      };
  }
  autolink(e) {
    const t = this.rules.inline.autolink.exec(e);
    if (t) {
      let i, s;
      return t[2] === "@" ? (i = t[1], s = "mailto:" + i) : (i = t[1], s = i), {
        type: "link",
        raw: t[0],
        text: i,
        href: s,
        tokens: [
          {
            type: "text",
            raw: i,
            text: i
          }
        ]
      };
    }
  }
  url(e) {
    let t;
    if (t = this.rules.inline.url.exec(e)) {
      let i, s;
      if (t[2] === "@")
        i = t[0], s = "mailto:" + i;
      else {
        let n;
        do
          n = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? "";
        while (n !== t[0]);
        i = t[0], t[1] === "www." ? s = "http://" + t[0] : s = t[0];
      }
      return {
        type: "link",
        raw: t[0],
        text: i,
        href: s,
        tokens: [
          {
            type: "text",
            raw: i,
            text: i
          }
        ]
      };
    }
  }
  inlineText(e) {
    const t = this.rules.inline.text.exec(e);
    if (t) {
      const i = this.lexer.state.inRawBlock;
      return {
        type: "text",
        raw: t[0],
        text: t[0],
        escaped: i
      };
    }
  }
}
class ce {
  tokens;
  options;
  state;
  tokenizer;
  inlineQueue;
  constructor(e) {
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || Pe, this.options.tokenizer = this.options.tokenizer || new At(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
      inLink: !1,
      inRawBlock: !1,
      top: !0
    };
    const t = {
      other: ne,
      block: dt.normal,
      inline: Je.normal
    };
    this.options.pedantic ? (t.block = dt.pedantic, t.inline = Je.pedantic) : this.options.gfm && (t.block = dt.gfm, this.options.breaks ? t.inline = Je.breaks : t.inline = Je.gfm), this.tokenizer.rules = t;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block: dt,
      inline: Je
    };
  }
  /**
   * Static Lex Method
   */
  static lex(e, t) {
    return new ce(t).lex(e);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(e, t) {
    return new ce(t).inlineTokens(e);
  }
  /**
   * Preprocessing
   */
  lex(e) {
    e = e.replace(ne.carriageReturn, `
`), this.blockTokens(e, this.tokens);
    for (let t = 0; t < this.inlineQueue.length; t++) {
      const i = this.inlineQueue[t];
      this.inlineTokens(i.src, i.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, t = [], i = !1) {
    for (this.options.pedantic && (e = e.replace(ne.tabCharGlobal, "    ").replace(ne.spaceLine, "")); e; ) {
      let s;
      if (this.options.extensions?.block?.some((r) => (s = r.call({ lexer: this }, e, t)) ? (e = e.substring(s.raw.length), t.push(s), !0) : !1))
        continue;
      if (s = this.tokenizer.space(e)) {
        e = e.substring(s.raw.length);
        const r = t.at(-1);
        s.raw.length === 1 && r !== void 0 ? r.raw += `
` : t.push(s);
        continue;
      }
      if (s = this.tokenizer.code(e)) {
        e = e.substring(s.raw.length);
        const r = t.at(-1);
        r?.type === "paragraph" || r?.type === "text" ? (r.raw += `
` + s.raw, r.text += `
` + s.text, this.inlineQueue.at(-1).src = r.text) : t.push(s);
        continue;
      }
      if (s = this.tokenizer.fences(e)) {
        e = e.substring(s.raw.length), t.push(s);
        continue;
      }
      if (s = this.tokenizer.heading(e)) {
        e = e.substring(s.raw.length), t.push(s);
        continue;
      }
      if (s = this.tokenizer.hr(e)) {
        e = e.substring(s.raw.length), t.push(s);
        continue;
      }
      if (s = this.tokenizer.blockquote(e)) {
        e = e.substring(s.raw.length), t.push(s);
        continue;
      }
      if (s = this.tokenizer.list(e)) {
        e = e.substring(s.raw.length), t.push(s);
        continue;
      }
      if (s = this.tokenizer.html(e)) {
        e = e.substring(s.raw.length), t.push(s);
        continue;
      }
      if (s = this.tokenizer.def(e)) {
        e = e.substring(s.raw.length);
        const r = t.at(-1);
        r?.type === "paragraph" || r?.type === "text" ? (r.raw += `
` + s.raw, r.text += `
` + s.raw, this.inlineQueue.at(-1).src = r.text) : this.tokens.links[s.tag] || (this.tokens.links[s.tag] = {
          href: s.href,
          title: s.title
        });
        continue;
      }
      if (s = this.tokenizer.table(e)) {
        e = e.substring(s.raw.length), t.push(s);
        continue;
      }
      if (s = this.tokenizer.lheading(e)) {
        e = e.substring(s.raw.length), t.push(s);
        continue;
      }
      let n = e;
      if (this.options.extensions?.startBlock) {
        let r = 1 / 0;
        const o = e.slice(1);
        let l;
        this.options.extensions.startBlock.forEach((u) => {
          l = u.call({ lexer: this }, o), typeof l == "number" && l >= 0 && (r = Math.min(r, l));
        }), r < 1 / 0 && r >= 0 && (n = e.substring(0, r + 1));
      }
      if (this.state.top && (s = this.tokenizer.paragraph(n))) {
        const r = t.at(-1);
        i && r?.type === "paragraph" ? (r.raw += `
` + s.raw, r.text += `
` + s.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = r.text) : t.push(s), i = n.length !== e.length, e = e.substring(s.raw.length);
        continue;
      }
      if (s = this.tokenizer.text(e)) {
        e = e.substring(s.raw.length);
        const r = t.at(-1);
        r?.type === "text" ? (r.raw += `
` + s.raw, r.text += `
` + s.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = r.text) : t.push(s);
        continue;
      }
      if (e) {
        const r = "Infinite loop on byte: " + e.charCodeAt(0);
        if (this.options.silent) {
          console.error(r);
          break;
        } else
          throw new Error(r);
      }
    }
    return this.state.top = !0, t;
  }
  inline(e, t = []) {
    return this.inlineQueue.push({ src: e, tokens: t }), t;
  }
  /**
   * Lexing/Compiling
   */
  inlineTokens(e, t = []) {
    let i = e, s = null;
    if (this.tokens.links) {
      const o = Object.keys(this.tokens.links);
      if (o.length > 0)
        for (; (s = this.tokenizer.rules.inline.reflinkSearch.exec(i)) != null; )
          o.includes(s[0].slice(s[0].lastIndexOf("[") + 1, -1)) && (i = i.slice(0, s.index) + "[" + "a".repeat(s[0].length - 2) + "]" + i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (s = this.tokenizer.rules.inline.anyPunctuation.exec(i)) != null; )
      i = i.slice(0, s.index) + "++" + i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    for (; (s = this.tokenizer.rules.inline.blockSkip.exec(i)) != null; )
      i = i.slice(0, s.index) + "[" + "a".repeat(s[0].length - 2) + "]" + i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    let n = !1, r = "";
    for (; e; ) {
      n || (r = ""), n = !1;
      let o;
      if (this.options.extensions?.inline?.some((u) => (o = u.call({ lexer: this }, e, t)) ? (e = e.substring(o.raw.length), t.push(o), !0) : !1))
        continue;
      if (o = this.tokenizer.escape(e)) {
        e = e.substring(o.raw.length), t.push(o);
        continue;
      }
      if (o = this.tokenizer.tag(e)) {
        e = e.substring(o.raw.length), t.push(o);
        continue;
      }
      if (o = this.tokenizer.link(e)) {
        e = e.substring(o.raw.length), t.push(o);
        continue;
      }
      if (o = this.tokenizer.reflink(e, this.tokens.links)) {
        e = e.substring(o.raw.length);
        const u = t.at(-1);
        o.type === "text" && u?.type === "text" ? (u.raw += o.raw, u.text += o.text) : t.push(o);
        continue;
      }
      if (o = this.tokenizer.emStrong(e, i, r)) {
        e = e.substring(o.raw.length), t.push(o);
        continue;
      }
      if (o = this.tokenizer.codespan(e)) {
        e = e.substring(o.raw.length), t.push(o);
        continue;
      }
      if (o = this.tokenizer.br(e)) {
        e = e.substring(o.raw.length), t.push(o);
        continue;
      }
      if (o = this.tokenizer.del(e)) {
        e = e.substring(o.raw.length), t.push(o);
        continue;
      }
      if (o = this.tokenizer.autolink(e)) {
        e = e.substring(o.raw.length), t.push(o);
        continue;
      }
      if (!this.state.inLink && (o = this.tokenizer.url(e))) {
        e = e.substring(o.raw.length), t.push(o);
        continue;
      }
      let l = e;
      if (this.options.extensions?.startInline) {
        let u = 1 / 0;
        const d = e.slice(1);
        let c;
        this.options.extensions.startInline.forEach((h) => {
          c = h.call({ lexer: this }, d), typeof c == "number" && c >= 0 && (u = Math.min(u, c));
        }), u < 1 / 0 && u >= 0 && (l = e.substring(0, u + 1));
      }
      if (o = this.tokenizer.inlineText(l)) {
        e = e.substring(o.raw.length), o.raw.slice(-1) !== "_" && (r = o.raw.slice(-1)), n = !0;
        const u = t.at(-1);
        u?.type === "text" ? (u.raw += o.raw, u.text += o.text) : t.push(o);
        continue;
      }
      if (e) {
        const u = "Infinite loop on byte: " + e.charCodeAt(0);
        if (this.options.silent) {
          console.error(u);
          break;
        } else
          throw new Error(u);
      }
    }
    return t;
  }
}
class Mt {
  options;
  parser;
  // set by the parser
  constructor(e) {
    this.options = e || Pe;
  }
  space(e) {
    return "";
  }
  code({ text: e, lang: t, escaped: i }) {
    const s = (t || "").match(ne.notSpaceStart)?.[0], n = e.replace(ne.endingNewline, "") + `
`;
    return s ? '<pre><code class="language-' + ye(s) + '">' + (i ? n : ye(n, !0)) + `</code></pre>
` : "<pre><code>" + (i ? n : ye(n, !0)) + `</code></pre>
`;
  }
  blockquote({ tokens: e }) {
    return `<blockquote>
${this.parser.parse(e)}</blockquote>
`;
  }
  html({ text: e }) {
    return e;
  }
  heading({ tokens: e, depth: t }) {
    return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`;
  }
  hr(e) {
    return `<hr>
`;
  }
  list(e) {
    const t = e.ordered, i = e.start;
    let s = "";
    for (let o = 0; o < e.items.length; o++) {
      const l = e.items[o];
      s += this.listitem(l);
    }
    const n = t ? "ol" : "ul", r = t && i !== 1 ? ' start="' + i + '"' : "";
    return "<" + n + r + `>
` + s + "</" + n + `>
`;
  }
  listitem(e) {
    let t = "";
    if (e.task) {
      const i = this.checkbox({ checked: !!e.checked });
      e.loose ? e.tokens[0]?.type === "paragraph" ? (e.tokens[0].text = i + " " + e.tokens[0].text, e.tokens[0].tokens && e.tokens[0].tokens.length > 0 && e.tokens[0].tokens[0].type === "text" && (e.tokens[0].tokens[0].text = i + " " + ye(e.tokens[0].tokens[0].text), e.tokens[0].tokens[0].escaped = !0)) : e.tokens.unshift({
        type: "text",
        raw: i + " ",
        text: i + " ",
        escaped: !0
      }) : t += i + " ";
    }
    return t += this.parser.parse(e.tokens, !!e.loose), `<li>${t}</li>
`;
  }
  checkbox({ checked: e }) {
    return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph({ tokens: e }) {
    return `<p>${this.parser.parseInline(e)}</p>
`;
  }
  table(e) {
    let t = "", i = "";
    for (let n = 0; n < e.header.length; n++)
      i += this.tablecell(e.header[n]);
    t += this.tablerow({ text: i });
    let s = "";
    for (let n = 0; n < e.rows.length; n++) {
      const r = e.rows[n];
      i = "";
      for (let o = 0; o < r.length; o++)
        i += this.tablecell(r[o]);
      s += this.tablerow({ text: i });
    }
    return s && (s = `<tbody>${s}</tbody>`), `<table>
<thead>
` + t + `</thead>
` + s + `</table>
`;
  }
  tablerow({ text: e }) {
    return `<tr>
${e}</tr>
`;
  }
  tablecell(e) {
    const t = this.parser.parseInline(e.tokens), i = e.header ? "th" : "td";
    return (e.align ? `<${i} align="${e.align}">` : `<${i}>`) + t + `</${i}>
`;
  }
  /**
   * span level renderer
   */
  strong({ tokens: e }) {
    return `<strong>${this.parser.parseInline(e)}</strong>`;
  }
  em({ tokens: e }) {
    return `<em>${this.parser.parseInline(e)}</em>`;
  }
  codespan({ text: e }) {
    return `<code>${ye(e, !0)}</code>`;
  }
  br(e) {
    return "<br>";
  }
  del({ tokens: e }) {
    return `<del>${this.parser.parseInline(e)}</del>`;
  }
  link({ href: e, title: t, tokens: i }) {
    const s = this.parser.parseInline(i), n = as(e);
    if (n === null)
      return s;
    e = n;
    let r = '<a href="' + e + '"';
    return t && (r += ' title="' + ye(t) + '"'), r += ">" + s + "</a>", r;
  }
  image({ href: e, title: t, text: i, tokens: s }) {
    s && (i = this.parser.parseInline(s, this.parser.textRenderer));
    const n = as(e);
    if (n === null)
      return ye(i);
    e = n;
    let r = `<img src="${e}" alt="${i}"`;
    return t && (r += ` title="${ye(t)}"`), r += ">", r;
  }
  text(e) {
    return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : ye(e.text);
  }
}
class wi {
  // no need for block level renderers
  strong({ text: e }) {
    return e;
  }
  em({ text: e }) {
    return e;
  }
  codespan({ text: e }) {
    return e;
  }
  del({ text: e }) {
    return e;
  }
  html({ text: e }) {
    return e;
  }
  text({ text: e }) {
    return e;
  }
  link({ text: e }) {
    return "" + e;
  }
  image({ text: e }) {
    return "" + e;
  }
  br() {
    return "";
  }
}
class ue {
  options;
  renderer;
  textRenderer;
  constructor(e) {
    this.options = e || Pe, this.options.renderer = this.options.renderer || new Mt(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new wi();
  }
  /**
   * Static Parse Method
   */
  static parse(e, t) {
    return new ue(t).parse(e);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(e, t) {
    return new ue(t).parseInline(e);
  }
  /**
   * Parse Loop
   */
  parse(e, t = !0) {
    let i = "";
    for (let s = 0; s < e.length; s++) {
      const n = e[s];
      if (this.options.extensions?.renderers?.[n.type]) {
        const o = n, l = this.options.extensions.renderers[o.type].call({ parser: this }, o);
        if (l !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(o.type)) {
          i += l || "";
          continue;
        }
      }
      const r = n;
      switch (r.type) {
        case "space": {
          i += this.renderer.space(r);
          continue;
        }
        case "hr": {
          i += this.renderer.hr(r);
          continue;
        }
        case "heading": {
          i += this.renderer.heading(r);
          continue;
        }
        case "code": {
          i += this.renderer.code(r);
          continue;
        }
        case "table": {
          i += this.renderer.table(r);
          continue;
        }
        case "blockquote": {
          i += this.renderer.blockquote(r);
          continue;
        }
        case "list": {
          i += this.renderer.list(r);
          continue;
        }
        case "html": {
          i += this.renderer.html(r);
          continue;
        }
        case "paragraph": {
          i += this.renderer.paragraph(r);
          continue;
        }
        case "text": {
          let o = r, l = this.renderer.text(o);
          for (; s + 1 < e.length && e[s + 1].type === "text"; )
            o = e[++s], l += `
` + this.renderer.text(o);
          t ? i += this.renderer.paragraph({
            type: "paragraph",
            raw: l,
            text: l,
            tokens: [{ type: "text", raw: l, text: l, escaped: !0 }]
          }) : i += l;
          continue;
        }
        default: {
          const o = 'Token with "' + r.type + '" type was not found.';
          if (this.options.silent)
            return console.error(o), "";
          throw new Error(o);
        }
      }
    }
    return i;
  }
  /**
   * Parse Inline Tokens
   */
  parseInline(e, t = this.renderer) {
    let i = "";
    for (let s = 0; s < e.length; s++) {
      const n = e[s];
      if (this.options.extensions?.renderers?.[n.type]) {
        const o = this.options.extensions.renderers[n.type].call({ parser: this }, n);
        if (o !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(n.type)) {
          i += o || "";
          continue;
        }
      }
      const r = n;
      switch (r.type) {
        case "escape": {
          i += t.text(r);
          break;
        }
        case "html": {
          i += t.html(r);
          break;
        }
        case "link": {
          i += t.link(r);
          break;
        }
        case "image": {
          i += t.image(r);
          break;
        }
        case "strong": {
          i += t.strong(r);
          break;
        }
        case "em": {
          i += t.em(r);
          break;
        }
        case "codespan": {
          i += t.codespan(r);
          break;
        }
        case "br": {
          i += t.br(r);
          break;
        }
        case "del": {
          i += t.del(r);
          break;
        }
        case "text": {
          i += t.text(r);
          break;
        }
        default: {
          const o = 'Token with "' + r.type + '" type was not found.';
          if (this.options.silent)
            return console.error(o), "";
          throw new Error(o);
        }
      }
    }
    return i;
  }
}
class vt {
  options;
  block;
  constructor(e) {
    this.options = e || Pe;
  }
  static passThroughHooks = /* @__PURE__ */ new Set([
    "preprocess",
    "postprocess",
    "processAllTokens"
  ]);
  /**
   * Process markdown before marked
   */
  preprocess(e) {
    return e;
  }
  /**
   * Process HTML after marked is finished
   */
  postprocess(e) {
    return e;
  }
  /**
   * Process all tokens before walk tokens
   */
  processAllTokens(e) {
    return e;
  }
  /**
   * Provide function to tokenize markdown
   */
  provideLexer() {
    return this.block ? ce.lex : ce.lexInline;
  }
  /**
   * Provide function to parse tokens
   */
  provideParser() {
    return this.block ? ue.parse : ue.parseInline;
  }
}
class Lo {
  defaults = hi();
  options = this.setOptions;
  parse = this.parseMarkdown(!0);
  parseInline = this.parseMarkdown(!1);
  Parser = ue;
  Renderer = Mt;
  TextRenderer = wi;
  Lexer = ce;
  Tokenizer = At;
  Hooks = vt;
  constructor(...e) {
    this.use(...e);
  }
  /**
   * Run callback for every token
   */
  walkTokens(e, t) {
    let i = [];
    for (const s of e)
      switch (i = i.concat(t.call(this, s)), s.type) {
        case "table": {
          const n = s;
          for (const r of n.header)
            i = i.concat(this.walkTokens(r.tokens, t));
          for (const r of n.rows)
            for (const o of r)
              i = i.concat(this.walkTokens(o.tokens, t));
          break;
        }
        case "list": {
          const n = s;
          i = i.concat(this.walkTokens(n.items, t));
          break;
        }
        default: {
          const n = s;
          this.defaults.extensions?.childTokens?.[n.type] ? this.defaults.extensions.childTokens[n.type].forEach((r) => {
            const o = n[r].flat(1 / 0);
            i = i.concat(this.walkTokens(o, t));
          }) : n.tokens && (i = i.concat(this.walkTokens(n.tokens, t)));
        }
      }
    return i;
  }
  use(...e) {
    const t = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return e.forEach((i) => {
      const s = { ...i };
      if (s.async = this.defaults.async || s.async || !1, i.extensions && (i.extensions.forEach((n) => {
        if (!n.name)
          throw new Error("extension name required");
        if ("renderer" in n) {
          const r = t.renderers[n.name];
          r ? t.renderers[n.name] = function(...o) {
            let l = n.renderer.apply(this, o);
            return l === !1 && (l = r.apply(this, o)), l;
          } : t.renderers[n.name] = n.renderer;
        }
        if ("tokenizer" in n) {
          if (!n.level || n.level !== "block" && n.level !== "inline")
            throw new Error("extension level must be 'block' or 'inline'");
          const r = t[n.level];
          r ? r.unshift(n.tokenizer) : t[n.level] = [n.tokenizer], n.start && (n.level === "block" ? t.startBlock ? t.startBlock.push(n.start) : t.startBlock = [n.start] : n.level === "inline" && (t.startInline ? t.startInline.push(n.start) : t.startInline = [n.start]));
        }
        "childTokens" in n && n.childTokens && (t.childTokens[n.name] = n.childTokens);
      }), s.extensions = t), i.renderer) {
        const n = this.defaults.renderer || new Mt(this.defaults);
        for (const r in i.renderer) {
          if (!(r in n))
            throw new Error(`renderer '${r}' does not exist`);
          if (["options", "parser"].includes(r))
            continue;
          const o = r, l = i.renderer[o], u = n[o];
          n[o] = (...d) => {
            let c = l.apply(n, d);
            return c === !1 && (c = u.apply(n, d)), c || "";
          };
        }
        s.renderer = n;
      }
      if (i.tokenizer) {
        const n = this.defaults.tokenizer || new At(this.defaults);
        for (const r in i.tokenizer) {
          if (!(r in n))
            throw new Error(`tokenizer '${r}' does not exist`);
          if (["options", "rules", "lexer"].includes(r))
            continue;
          const o = r, l = i.tokenizer[o], u = n[o];
          n[o] = (...d) => {
            let c = l.apply(n, d);
            return c === !1 && (c = u.apply(n, d)), c;
          };
        }
        s.tokenizer = n;
      }
      if (i.hooks) {
        const n = this.defaults.hooks || new vt();
        for (const r in i.hooks) {
          if (!(r in n))
            throw new Error(`hook '${r}' does not exist`);
          if (["options", "block"].includes(r))
            continue;
          const o = r, l = i.hooks[o], u = n[o];
          vt.passThroughHooks.has(r) ? n[o] = (d) => {
            if (this.defaults.async)
              return Promise.resolve(l.call(n, d)).then((h) => u.call(n, h));
            const c = l.call(n, d);
            return u.call(n, c);
          } : n[o] = (...d) => {
            let c = l.apply(n, d);
            return c === !1 && (c = u.apply(n, d)), c;
          };
        }
        s.hooks = n;
      }
      if (i.walkTokens) {
        const n = this.defaults.walkTokens, r = i.walkTokens;
        s.walkTokens = function(o) {
          let l = [];
          return l.push(r.call(this, o)), n && (l = l.concat(n.call(this, o))), l;
        };
      }
      this.defaults = { ...this.defaults, ...s };
    }), this;
  }
  setOptions(e) {
    return this.defaults = { ...this.defaults, ...e }, this;
  }
  lexer(e, t) {
    return ce.lex(e, t ?? this.defaults);
  }
  parser(e, t) {
    return ue.parse(e, t ?? this.defaults);
  }
  parseMarkdown(e) {
    return (i, s) => {
      const n = { ...s }, r = { ...this.defaults, ...n }, o = this.onError(!!r.silent, !!r.async);
      if (this.defaults.async === !0 && n.async === !1)
        return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof i > "u" || i === null)
        return o(new Error("marked(): input parameter is undefined or null"));
      if (typeof i != "string")
        return o(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(i) + ", string expected"));
      r.hooks && (r.hooks.options = r, r.hooks.block = e);
      const l = r.hooks ? r.hooks.provideLexer() : e ? ce.lex : ce.lexInline, u = r.hooks ? r.hooks.provideParser() : e ? ue.parse : ue.parseInline;
      if (r.async)
        return Promise.resolve(r.hooks ? r.hooks.preprocess(i) : i).then((d) => l(d, r)).then((d) => r.hooks ? r.hooks.processAllTokens(d) : d).then((d) => r.walkTokens ? Promise.all(this.walkTokens(d, r.walkTokens)).then(() => d) : d).then((d) => u(d, r)).then((d) => r.hooks ? r.hooks.postprocess(d) : d).catch(o);
      try {
        r.hooks && (i = r.hooks.preprocess(i));
        let d = l(i, r);
        r.hooks && (d = r.hooks.processAllTokens(d)), r.walkTokens && this.walkTokens(d, r.walkTokens);
        let c = u(d, r);
        return r.hooks && (c = r.hooks.postprocess(c)), c;
      } catch (d) {
        return o(d);
      }
    };
  }
  onError(e, t) {
    return (i) => {
      if (i.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
        const s = "<p>An error occurred:</p><pre>" + ye(i.message + "", !0) + "</pre>";
        return t ? Promise.resolve(s) : s;
      }
      if (t)
        return Promise.reject(i);
      throw i;
    };
  }
}
const qe = new Lo();
function B(a, e) {
  return qe.parse(a, e);
}
B.options = B.setOptions = function(a) {
  return qe.setOptions(a), B.defaults = qe.defaults, Ts(B.defaults), B;
};
B.getDefaults = hi;
B.defaults = Pe;
B.use = function(...a) {
  return qe.use(...a), B.defaults = qe.defaults, Ts(B.defaults), B;
};
B.walkTokens = function(a, e) {
  return qe.walkTokens(a, e);
};
B.parseInline = qe.parseInline;
B.Parser = ue;
B.parser = ue.parse;
B.Renderer = Mt;
B.TextRenderer = wi;
B.Lexer = ce;
B.lexer = ce.lex;
B.Tokenizer = At;
B.Hooks = vt;
B.parse = B;
B.options;
B.setOptions;
B.use;
B.walkTokens;
B.parseInline;
ue.parse;
ce.lex;
class Ao {
  constructor(e = {}, t) {
    const i = {
      lang: []
    };
    this.builder = t, this.opts = Object.assign({}, i, e);
  }
  async checkIntent(e, t, i) {
    let s = "You are an assistant", n = "", r = `This is the user's request:

${e}`, o, l, u;
    if (i.image && t === "openai")
      return r += `
Extract some information.
`, o = [{
        name: "check_request",
        description: "Check request and extract information.",
        parameters: {
          type: "object",
          properties: {
            prompt: {
              type: "string",
              description: "Return user's instruction/prompt for generating the image."
            },
            num_images: {
              type: "number",
              description: "The number of images to generate, only if specified."
            },
            // width:{
            //     type: 'number', 
            //     description: 'Return image width to generate, only if specified.',
            // },
            // height:{
            //     type: 'number', 
            //     description: 'Return image height to generate, only if specified.',
            // },
            size: {
              type: "string",
              description: "Choose specified size: auto, 1024x1024, 1536x1024, 1024x1536"
            },
            quality: {
              type: "string",
              description: "Choose: auto, low, medium, high"
            },
            background: {
              type: "string",
              description: "Choose: auto, transparent, opaque"
            },
            output_format: {
              type: "string",
              description: "Choose: png, jpeg, webp"
            }
          },
          required: []
        }
      }], l = await this.builder.send(r, n, s, "", o), l ? (u = JSON.parse(l), u) : !1;
    if (i.image) {
      if (r += `

Check the type of the request:
- Text/Prompt to Image Generation
- Text/Prompt to 2D Illustration Generation
- Text/Prompt to Digital Illustration Generation
- Text/Prompt to Book Cover Generation
- Upscale Image
- Upscale Video
- Minimize Image
- Remove Background of an Image
- Change/Replace Background of an Image
- Erase/Remove Unwanted Objects from Image
- Edit Area in Image
- Generate Variation of an Image
- Describe an image or ask questions about the image
`, o = [{
        name: "check_request",
        description: "Check request.",
        parameters: {
          type: "object",
          properties: {
            text_to_image_generation: {
              type: "boolean",
              description: "Check if the request asks to create or generate an image based on the prompt."
            },
            text_to_2d_illustration_generation: {
              type: "boolean",
              description: "Check if the request asks to create or generate a 2D illustration based on the prompt."
            },
            text_to_digital_illustration_generation: {
              type: "boolean",
              description: "Check if the request asks to create or generate a digital illustration based on the prompt."
            },
            text_to_book_cover_generation: {
              type: "boolean",
              description: "Check if the request asks to create or generate a book cover based on the prompt."
            },
            upscale_image: {
              type: "boolean",
              description: "Check if the request asks to upscale or enlarge an image."
            },
            minimize_image: {
              type: "boolean",
              description: "Check if the request asks to minimize (compress) the size of an image."
            },
            edit_area_in_image: {
              type: "boolean",
              // description: 'Check if the request asks to edit an area in an image.',
              description: "Check if the request asks to edit an image."
            },
            describe_image: {
              type: "boolean",
              description: "Check if the request is asking to describe an image or asking questions about the image."
            }
          },
          required: []
        }
      }], l = await this.builder.send(r, n, s, "", o), !l)
        return !1;
      u = JSON.parse(l);
    } else if (i.video) {
      if (r += `

Check the type of the request:
- Image to Video Generation (generate a video based on image)
- Prompt/text to Video Generation (generate a video based on prompt)
- Upscale video
- Add sound to video
`, o = [{
        name: "check_request",
        description: "Check request.",
        parameters: {
          type: "object",
          properties: {
            image_to_video_generation: {
              type: "boolean",
              description: "Check if the request asked to create or generate a video based on image, not prompt."
            },
            text_to_video_generation: {
              type: "boolean",
              description: "Check if the request asked to create or generate a video based on prompt, not image."
            }
          },
          required: []
        }
      }], l = await this.builder.send(r, n, s, "", o), !l)
        return !1;
      u = JSON.parse(l);
    } else if (i.audio) {
      if (r += `

Check the type of the request:
- Prompt/text to Audio Generation (generate sound or audio based on prompt)
- Text to Speech (generate speech from text)
`, o = [{
        name: "check_request",
        description: "Check request.",
        parameters: {
          type: "object",
          properties: {
            text_to_speech: {
              type: "boolean",
              description: "heck if the request is asking to generate speech from text."
            }
          },
          required: []
        }
      }], l = await this.builder.send(r, n, s, "", o), !l)
        return !1;
      u = JSON.parse(l);
    }
    return this.builder.settings.consoleLog && console.log(u), this.extractInfo(u, t, e);
  }
  async extractInfo(e, t, i) {
    const s = this.builder.settings.defaultModels;
    if (e.text_to_image_generation) {
      const n = "You are an assistant", o = `
Thie is the list of models:
- ${s.text_to_image_generation[t].join(`
- `)}
`, l = `This is user's request:

${i}

Check the request and return the details.
    `;
      let u = [{
        name: "check_request",
        description: "Check user request.",
        parameters: {
          type: "object",
          properties: {
            model: {
              type: "string",
              description: "Return the chosen model name from the model list."
            },
            prompt: {
              type: "string",
              description: "Return user's instruction/prompt for generating the image."
            },
            num_images: {
              type: "number",
              description: "The number of images to generate, only if specified."
            },
            width: {
              type: "number",
              description: "Return image width to generate, only if specified."
            },
            height: {
              type: "number",
              description: "Return image height to generate, only if specified."
            },
            aspect_ratio: {
              type: "string",
              description: "Return the aspect ration, only if specified. Example: 3:4, 16:9, etc"
            },
            color1_red: {
              type: "string",
              description: "Return red part from color1 rgb."
            },
            color1_green: {
              type: "string",
              description: "Return green part from color1 rgb."
            },
            color1_blue: {
              type: "string",
              description: "Return blue part from color1 rgb."
            },
            color2_red: {
              type: "string",
              description: "Return red part from color2 rgb."
            },
            color2_green: {
              type: "string",
              description: "Return green part from color2 rgb."
            },
            color2_blue: {
              type: "string",
              description: "Return blue part from color2 rgb."
            },
            color3_red: {
              type: "string",
              description: "Return red part from color3 rgb."
            },
            color3_green: {
              type: "string",
              description: "Return green part from color3 rgb."
            },
            color3_blue: {
              type: "string",
              description: "Return blue part from color3 rgb."
            },
            color4_red: {
              type: "string",
              description: "Return red part from color4 rgb."
            },
            color4_green: {
              type: "string",
              description: "Return green part from color4 rgb."
            },
            color4_blue: {
              type: "string",
              description: "Return blue part from color4 rgb."
            },
            color5_red: {
              type: "string",
              description: "Return red part from color5 rgb."
            },
            color5_green: {
              type: "string",
              description: "Return green part from color5 rgb."
            },
            color5_blue: {
              type: "string",
              description: "Return blue part from color5 rgb."
            }
          },
          required: [
            // 'prompt'
          ]
        }
      }], d = await this.builder.send(l, o, n, "", u);
      if (!d)
        return !1;
      let c = JSON.parse(d);
      return {
        ...e,
        ...c
      };
    } else if (e.image_to_video_generation) {
      const n = "You are an assistant", o = `
Thie is the list of models:
- ${s.image_to_video_generation[t].join(`
- `)}
`, l = `This is user's request:

${i}

Check the request and return the details.
    `;
      let u = [{
        name: "check_request",
        description: "Check user request.",
        parameters: {
          type: "object",
          properties: {
            model: {
              type: "string",
              description: "Return the chosen model name from the model list."
            },
            prompt: {
              type: "string",
              description: "Return user's instruction/prompt for generating the video."
            },
            image_url: {
              type: "string",
              description: "Return user's image reference URL (if JPG or PNG image URL is specified)."
            },
            duration: {
              type: "number",
              description: "Return duration of the video to generate."
            }
          },
          required: [
            // 'image_url'
          ]
        }
      }], d = await this.builder.send(l, o, n, "", u);
      if (!d)
        return !1;
      let c = JSON.parse(d);
      return {
        ...e,
        ...c
      };
    } else if (e.text_to_video_generation) {
      const n = "You are an assistant", o = `
Thie is the list of models:
- ${s.text_to_video_generation[t].join(`
- `)}
`;
      let l = `This is user's request:

${i}

Check the request and return the details.
    `, u = [{
        name: "check_request",
        description: "Check user request.",
        parameters: {
          type: "object",
          properties: {
            model: {
              type: "string",
              description: "Return the chosen model name from the model list."
            },
            prompt: {
              type: "string",
              description: "Return user's instruction/prompt for generating the video."
            },
            duration: {
              type: "number",
              description: "Return duration of the video to generate. If not explicitely specified, return 5"
            }
          },
          required: [
            // 'prompt'
          ]
        }
      }], d = await this.builder.send(l, o, n, "", u);
      if (!d)
        return !1;
      let c = JSON.parse(d);
      return {
        ...e,
        ...c
      };
    } else if (e.minimize_image) {
      let n = "You are an assistant", r = "", o = `This is user's request:

${i}

Check the request and return the details.
    `, l = [{
        name: "check_request",
        description: "Check user request.",
        parameters: {
          type: "object",
          properties: {
            image_url: {
              type: "string",
              description: "Return user's image reference URL (if JPG or PNG image URL is specified)."
            }
          },
          required: ["image_url"]
        }
      }], u = await this.builder.send(o, r, n, "", l);
      if (!u)
        return !1;
      let d = JSON.parse(u);
      return {
        ...e,
        ...d
      };
    } else if (e.upscale_image) {
      const n = "You are an assistant", o = `
Thie is the list of models:
- ${s.upscale_image[t].join(`
- `)}
`;
      let l = `This is user's request:

${i}

Check the request and return the details.
    `, u = [{
        name: "check_request",
        description: "Check user request.",
        parameters: {
          type: "object",
          properties: {
            model: {
              type: "string",
              description: "Return the chosen model name from the model list."
            },
            image_url: {
              type: "string",
              description: "Return user's image reference URL (if JPG or PNG image URL is specified)."
            }
          },
          required: [
            // 'image_url'
          ]
        }
      }], d = await this.builder.send(l, o, n, "", u);
      if (!d)
        return !1;
      let c = JSON.parse(d);
      return {
        ...e,
        ...c
      };
    } else if (e.describe_image) {
      const n = "You are an assistant", o = `
Thie is the list of models:
- ${s.describe_image[t].join(`
- `)}
`;
      let l = `This is user's request:

${i}

Check the request and return the details.
    `, u = [{
        name: "check_request",
        description: "Check user request.",
        parameters: {
          type: "object",
          properties: {
            model: {
              type: "string",
              description: "Return the chosen model name from the model list."
            },
            image_url: {
              type: "string",
              description: "Return user's image reference URL (if JPG or PNG image URL is specified)."
            },
            prompt: {
              type: "string",
              description: "Return user's instruction/prompt for generating the video."
            }
          },
          required: ["image_url", "prompt"]
        }
      }], d = await this.builder.send(l, o, n, "", u);
      if (!d)
        return !1;
      let c = JSON.parse(d);
      return {
        ...e,
        ...c
      };
    } else if (e.edit_area_in_image) {
      const n = "You are an assistant", r = s.edit_area_in_image[t];
      let o = "";
      r && (o = `
Thie is the list of models:
- ${r.join(`
- `)}
`);
      let l = `This is user's request:

${i}

Check the request and return the details.
    `, u = [{
        name: "check_request",
        description: "Check user request.",
        parameters: {
          type: "object",
          properties: {
            model: {
              type: "string",
              description: "Return the chosen model name from the model list."
            },
            image_url: {
              type: "string",
              description: "Return user's image reference URL (if JPG or PNG image URL is specified)."
            },
            prompt: {
              type: "string",
              description: "Return user's instruction/prompt for generating the video."
            },
            num_images: {
              type: "number",
              description: "The number of images to generate."
            }
          },
          required: [
            // 'image_url'
          ]
        }
      }], d = await this.builder.send(l, o, n, "", u);
      if (!d)
        return !1;
      let c = JSON.parse(d);
      return {
        ...e,
        ...c
      };
    } else if (e.text_to_2d_illustration_generation) {
      const n = "You are an assistant", o = `
Thie is the list of models:
- ${s.text_to_2d_illustration_generation[t].join(`
- `)}
`;
      let l = `This is user's request:

${i}

Check the request and return the details.
    `, u = [{
        name: "check_request",
        description: "Check user request.",
        parameters: {
          type: "object",
          properties: {
            model: {
              type: "string",
              description: "Return the chosen model name from the model list."
            },
            prompt: {
              type: "string",
              description: "Return user's instruction/prompt for generating the image."
            },
            style: {
              type: "string",
              description: 'Return "digital_illustration"'
            },
            style_id: {
              type: "string",
              description: "Return specified style_id for generating the image."
            },
            num_images: {
              type: "number",
              description: "The number of images to generate."
            },
            width: {
              type: "number",
              description: "Return image width to generate."
            },
            height: {
              type: "number",
              description: "Return image height to generate."
            },
            aspect_ratio: {
              type: "string",
              description: "Example: 3:4, 16:9, etc"
            },
            color1_red: {
              type: "string",
              description: "Return red part from color1 rgb."
            },
            color1_green: {
              type: "string",
              description: "Return green part from color1 rgb."
            },
            color1_blue: {
              type: "string",
              description: "Return blue part from color1 rgb."
            },
            color2_red: {
              type: "string",
              description: "Return red part from color2 rgb."
            },
            color2_green: {
              type: "string",
              description: "Return green part from color2 rgb."
            },
            color2_blue: {
              type: "string",
              description: "Return blue part from color2 rgb."
            },
            color3_red: {
              type: "string",
              description: "Return red part from color3 rgb."
            },
            color3_green: {
              type: "string",
              description: "Return green part from color3 rgb."
            },
            color3_blue: {
              type: "string",
              description: "Return blue part from color3 rgb."
            },
            color4_red: {
              type: "string",
              description: "Return red part from color4 rgb."
            },
            color4_green: {
              type: "string",
              description: "Return green part from color4 rgb."
            },
            color4_blue: {
              type: "string",
              description: "Return blue part from color4 rgb."
            },
            color5_red: {
              type: "string",
              description: "Return red part from color5 rgb."
            },
            color5_green: {
              type: "string",
              description: "Return green part from color5 rgb."
            },
            color5_blue: {
              type: "string",
              description: "Return blue part from color5 rgb."
            }
          },
          required: [
            // 'prompt'
          ]
        }
      }], d = await this.builder.send(l, o, n, "", u);
      if (!d)
        return !1;
      let c = JSON.parse(d);
      return {
        ...e,
        ...c
      };
    } else if (e.text_to_digital_illustration_generation) {
      const n = "You are an assistant", o = `
Thie is the list of models:
- ${s.text_to_digital_illustration_generation[t].join(`
- `)}
`;
      let l = `This is user's request:

${i}

Check the request and return the details.
    `, u = [{
        name: "check_request",
        description: "Check user request.",
        parameters: {
          type: "object",
          properties: {
            model: {
              type: "string",
              description: "Return the chosen model name from the model list."
            },
            prompt: {
              type: "string",
              description: "Return user's instruction/prompt for generating the image."
            },
            style: {
              type: "string",
              description: 'Return "digital_illustration"'
            },
            style_id: {
              type: "string",
              description: "Return specified style_id for generating the image."
            },
            num_images: {
              type: "number",
              description: "The number of images to generate."
            },
            width: {
              type: "number",
              description: "Return image width to generate."
            },
            height: {
              type: "number",
              description: "Return image height to generate."
            },
            aspect_ratio: {
              type: "string",
              description: "Example: 3:4, 16:9, etc"
            },
            color1_red: {
              type: "string",
              description: "Return red part from color1 rgb."
            },
            color1_green: {
              type: "string",
              description: "Return green part from color1 rgb."
            },
            color1_blue: {
              type: "string",
              description: "Return blue part from color1 rgb."
            },
            color2_red: {
              type: "string",
              description: "Return red part from color2 rgb."
            },
            color2_green: {
              type: "string",
              description: "Return green part from color2 rgb."
            },
            color2_blue: {
              type: "string",
              description: "Return blue part from color2 rgb."
            },
            color3_red: {
              type: "string",
              description: "Return red part from color3 rgb."
            },
            color3_green: {
              type: "string",
              description: "Return green part from color3 rgb."
            },
            color3_blue: {
              type: "string",
              description: "Return blue part from color3 rgb."
            },
            color4_red: {
              type: "string",
              description: "Return red part from color4 rgb."
            },
            color4_green: {
              type: "string",
              description: "Return green part from color4 rgb."
            },
            color4_blue: {
              type: "string",
              description: "Return blue part from color4 rgb."
            },
            color5_red: {
              type: "string",
              description: "Return red part from color5 rgb."
            },
            color5_green: {
              type: "string",
              description: "Return green part from color5 rgb."
            },
            color5_blue: {
              type: "string",
              description: "Return blue part from color5 rgb."
            }
          },
          required: [
            // 'prompt'
          ]
        }
      }], d = await this.builder.send(l, o, n, "", u);
      if (!d)
        return !1;
      let c = JSON.parse(d);
      return {
        ...e,
        ...c
      };
    } else if (e.text_to_book_cover_generation) {
      const n = "You are an assistant", o = `
Thie is the list of models:
- ${s.text_to_book_cover_generation[t].join(`
- `)}
`;
      let l = `This is user's request:

${i}

Check the request and return the details.
    `, u = [{
        name: "check_request",
        description: "Check user request.",
        parameters: {
          type: "object",
          properties: {
            model: {
              type: "string",
              description: "Return the chosen model name from the model list."
            },
            prompt: {
              type: "string",
              description: "Return user's instruction/prompt for generating the image."
            },
            style: {
              type: "string",
              description: 'Return "digital_illustration/cover"'
            },
            num_images: {
              type: "number",
              description: "The number of images to generate."
            },
            width: {
              type: "number",
              description: "Return image width to generate."
            },
            height: {
              type: "number",
              description: "Return image height to generate."
            },
            aspect_ratio: {
              type: "string",
              description: "Example: 3:4, 16:9, etc"
            },
            color1_red: {
              type: "string",
              description: "Return red part from color1 rgb."
            },
            color1_green: {
              type: "string",
              description: "Return green part from color1 rgb."
            },
            color1_blue: {
              type: "string",
              description: "Return blue part from color1 rgb."
            },
            color2_red: {
              type: "string",
              description: "Return red part from color2 rgb."
            },
            color2_green: {
              type: "string",
              description: "Return green part from color2 rgb."
            },
            color2_blue: {
              type: "string",
              description: "Return blue part from color2 rgb."
            },
            color3_red: {
              type: "string",
              description: "Return red part from color3 rgb."
            },
            color3_green: {
              type: "string",
              description: "Return green part from color3 rgb."
            },
            color3_blue: {
              type: "string",
              description: "Return blue part from color3 rgb."
            },
            color4_red: {
              type: "string",
              description: "Return red part from color4 rgb."
            },
            color4_green: {
              type: "string",
              description: "Return green part from color4 rgb."
            },
            color4_blue: {
              type: "string",
              description: "Return blue part from color4 rgb."
            },
            color5_red: {
              type: "string",
              description: "Return red part from color5 rgb."
            },
            color5_green: {
              type: "string",
              description: "Return green part from color5 rgb."
            },
            color5_blue: {
              type: "string",
              description: "Return blue part from color5 rgb."
            }
          },
          required: [
            // 'prompt'
          ]
        }
      }], d = await this.builder.send(l, o, n, "", u);
      if (!d)
        return !1;
      let c = JSON.parse(d);
      return {
        ...e,
        ...c
      };
    } else if (e.text_to_speech) {
      const n = "You are an assistant", o = `
Thie is the list of models:
- ${s.text_to_speech[t].join(`
- `)}
`;
      let l = `This is user's request:

${i}

Check the request and return the details.
    `, u = [{
        name: "check_request",
        description: "Check user request.",
        parameters: {
          type: "object",
          properties: {
            model: {
              type: "string",
              description: "Return the chosen model name from the model list."
            },
            text: {
              type: "string",
              description: "Return text or prompt to convert to speech."
            },
            voice: {
              type: "string",
              description: "Return the voice reference to use."
            },
            speed: {
              type: "string",
              description: "Return the speed."
            }
          },
          required: ["text"]
        }
      }], d = await this.builder.send(l, o, n, "", u);
      if (!d)
        return !1;
      let c = JSON.parse(d);
      return {
        ...e,
        ...c
      };
    }
    return !1;
  }
  async checkModel(e) {
    let t = "You are an assistant", i = "", s = `This is the information:

${e}

Check the information and return the details.
`, n = [{
      name: "check_request",
      description: "Check information.",
      parameters: {
        type: "object",
        properties: {
          model: {
            type: "string",
            description: "Return the model name."
          }
        },
        required: ["model"]
      }
    }], r = await this.builder.send(s, i, t, "", n);
    return r ? JSON.parse(r) : !1;
  }
  getDimension(e) {
    let t, i;
    return e ? e === "1:1" ? (t = 1024, i = 1024) : e === "3:2" ? (t = 1216, i = 832) : e === "4:3" ? (t = 1152, i = 896) : e === "5:4" ? (t = 1088, i = 896) : e === "16:9" ? (t = 1344, i = 768) : e === "21:9" ? (t = 1536, i = 640) : e === "2:3" ? (t = 832, i = 1216) : e === "3:4" ? (t = 896, i = 1152) : e === "4:5" ? (t = 896, i = 1088) : e === "9:16" ? (t = 768, i = 1344) : e === "9:21" ? (t = 640, i = 1536) : (t = 1344, i = 768) : (t = 1344, i = 768), {
      w: t,
      h: i
    };
  }
  /*
  // Example: const endpoint = this.getEndpoint(model, requestId, this.builder.settings.falStatusEndpointList);
  getEndpoint(model, requestId, endpointList) {
      
       // Try to find a matching config (ignoring the default marker '*')
      let config = endpointList.find(item => item.model !== '*' && model && model.includes(item.model));
      
      // If no specific config is found, use the default entry
      if (!config) {
          config = endpointList.find(item => item.model === '*');
      }
       let endpoint = config.endpoint;
       // Replace {REQUEST_ID} with actual requestId
      endpoint = endpoint.replace('{REQUEST_ID}', requestId);
       // Replace {model} with the actual model if needed
       let firstTwoParts = model.split('/').slice(0, 2).join('/');
      console.log(firstTwoParts);
       if (endpoint.includes('{MODEL}')) {
          endpoint = endpoint.replace('{MODEL}', firstTwoParts);
      }
       return endpoint;
  }
  */
  getEndpoint(e, t, i) {
    i = i.replace("{REQUEST_ID}", t);
    let s = e.split("/").slice(0, 2).join("/");
    return i = i.replace("{MODEL}", s), i;
  }
  async waitingResultFal(e, t, i, s) {
    let n, r;
    e.request_id = t;
    const o = this.getEndpoint(e.model, t, this.builder.settings.falResultEndpoint);
    e.endpoint = o;
    let l = {
      "Content-Type": "application/json",
      ...this.builder.settings.headers
    };
    n = await fetch(this.builder.settings.getResultUrl_Fal, {
      signal: this.builder.mediaSignal,
      method: "POST",
      headers: l,
      body: JSON.stringify(e)
    });
    let u = await n.text();
    try {
      r = JSON.parse(u);
    } catch {
      return {
        mediaGenerated: !1,
        status: "error",
        message: u
      };
    }
    if (this.builder.output.push(r), r.error)
      return this.builder.settings.consoleLog && console.log(r.error), {
        mediaGenerated: !1,
        status: "error",
        message: r.error
        //this.out('Request failed.')
      };
    {
      const d = r.data;
      let c = "", h = "", p, f = !1, y = [], _ = [];
      return d.entries && d.entries.forEach((g) => {
        p = g.url.split(".").pop().toLowerCase(), p === "mp4" ? (c += `
                        <p class="responsive-video">
                            <video controls>
                                <source src="${g.url}" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                        </p>
                    `, h += `![](${g.url})`) : p === "wav" || p === "mp3" ? (c += `
                    <p class="responsive-audio">
                        <audio controls>
                            <source src="${g.url}" type="audio/mpeg">
                            Your browser does not support the audio tag.
                        </audio>
                    </p>
                    `, h += `![](${g.url})`) : (c += `
                        <div>
                            <img src="${g.url}" />
                            <div>
                                <a class="link-view" href="${g.url}" target="_blank" rel="noopener noreferrer">${this.out("View")}</a>
                                <a class="link-download" href="${g.url}" download>${this.out("Download")}</a>
                            </div>
                        </div>
                    `, h += `![](${g.url})`, f = !0), y.push(g.url), _.push(g.file_url);
      }), f && (c = `<div class="image-container">${c}</div>`), typeof d == "string" && (c = d, h = d), s ? (i.innerHTML = "", i.remove()) : (i.innerHTML = c, this.builder.outputHtml += `<div class="result-container">${c}</div>`), {
        mediaGenerated: !0,
        status: "success",
        markdown: h,
        output: y,
        output2: _
      };
    }
  }
  async waitingResultReplicate(e, t, i, s) {
    let n, r;
    e.request_id = t;
    let o = this.builder.settings.replicateStatusEndpoint;
    o = o.replace("{REQUEST_ID}", t), e.endpoint = o;
    let l = {
      "Content-Type": "application/json",
      ...this.builder.settings.headers
    };
    n = await fetch(this.builder.settings.getResultUrl_Replicate, {
      signal: this.builder.mediaSignal,
      method: "POST",
      headers: l,
      body: JSON.stringify(e)
    });
    let u = await n.text();
    try {
      r = JSON.parse(u);
    } catch {
      return {
        mediaGenerated: !1,
        status: "error",
        message: u
      };
    }
    if (this.builder.output.push(r), r.error)
      return this.builder.settings.consoleLog && console.log(r.error), {
        mediaGenerated: !1,
        status: "error",
        message: r.error
        //this.out('Request failed.')
      };
    {
      const d = r.data;
      let c = this.renderResult(d, i, s);
      return {
        mediaGenerated: !0,
        status: "success",
        markdown: c.markdown,
        output: c.output,
        output2: c.output2
      };
    }
  }
  async waitingReplicate(e, t, i, s) {
    let n, r, o, l = e.model, u = this.builder.settings.replicateStatusEndpoint;
    u = u.replace("{REQUEST_ID}", t);
    let d = {
      "Content-Type": "application/json",
      ...this.builder.settings.headers
    }, c = {
      model: l,
      endpoint: u,
      request_id: t
      // customData: this.builder.settings.customData
    };
    do {
      if (r = await fetch(this.builder.settings.checkRequestStatusUrl_Replicate, {
        signal: this.builder.mediaSignal,
        method: "POST",
        headers: d,
        body: JSON.stringify(c)
      }), o = await r.json(), o.ok && (n = o.data.status), !n)
        return {
          mediaGenerated: !1,
          status: "error",
          result: o,
          // for future debugging
          message: o.error || o.data && JSON.stringify(o.data) || this.out("Request failed.")
        };
      n === "succeeded" || n === "failed" || n === "canceled" || (this.builder.settings.consoleLog && console.log(n), await new Promise((h) => setTimeout(h, 5e3)));
    } while (!(n === "succeeded" || n === "failed" || n === "canceled"));
    return n === "succeeded" ? await this.waitingResultReplicate(e, t, i, s) : {
      mediaGenerated: !1,
      status: "error",
      result: o,
      // for future debugging
      message: o.data && o.data.error || this.out("Request failed.")
    };
  }
  async waitingFal(e, t, i, s) {
    let n, r, o, l = e.model;
    const u = this.getEndpoint(l, t, this.builder.settings.falStatusEndpoint);
    let d = {
      "Content-Type": "application/json",
      ...this.builder.settings.headers
    }, c = {
      model: l,
      endpoint: u,
      request_id: t
      // customData: this.builder.settings.customData
    };
    do {
      if (r = await fetch(this.builder.settings.checkRequestStatusUrl_Fal, {
        signal: this.builder.mediaSignal,
        method: "POST",
        headers: d,
        body: JSON.stringify(c)
      }), o = await r.json(), o.ok && o.status)
        n = o.status;
      else if (o.data) {
        let h = o.data;
        h.image || h.audio || h.audio_file || h.video ? n = "COMPLETED" : h.detail && typeof h.detail == "string" && h.detail.startsWith("Request is still in progress") ? n = "IN_PROGRESS" : h.status && !h.error && (n = h.status);
      }
      if (!n)
        return {
          mediaGenerated: !1,
          status: "error",
          result: o,
          // for future debugging
          message: o.error || o.data && JSON.stringify(o.data) || this.out("Request failed.")
        };
      n !== "COMPLETED" && (this.builder.settings.consoleLog && console.log(n), this.builder.settings.consoleLog && console.log(o), await new Promise((h) => setTimeout(h, 5e3)));
    } while (n !== "COMPLETED");
    if (n === "COMPLETED")
      return await this.waitingResultFal(e, t, i, s);
  }
  renderResult(e, t, i) {
    let s = "", n = "", r = [], o = [];
    if (e.entries) {
      let l, u = !1;
      e.entries.forEach((d) => {
        l = d.url.split(".").pop().toLowerCase(), l === "mp4" ? (s += `
                        <p class="responsive-video">
                            <video controls>
                                <source src="${d.url}" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                        </p>
                    `, n += `![](${d.url})`, r.push(d.url), o.push(d.file_url)) : l === "wav" || l === "mp3" ? (s += `
                    <p class="responsive-audio">
                        <audio controls>
                            <source src="${d.url}" type="audio/mpeg">
                            Your browser does not support the audio tag.
                        </audio>
                    </p>
                    `, n += `![](${d.url})`, r.push(d.url), o.push(d.file_url)) : (s += `
                        <div>
                            <img src="${d.url}" />
                            <div>
                                <a class="link-view" href="${d.url}" target="_blank" rel="noopener noreferrer">${this.out("View")}</a>
                                <a class="link-download" href="${d.url}" download>${this.out("Download")}</a>
                            </div>
                        </div>
                    `, n += `![](${d.url})`, r.push(d.url), o.push(d.file_url), u = !0);
      }), u && (s = `<div class="image-container">${s}</div>`);
    } else typeof e == "string" && (s = `
            <p>
            ${e}
            </p>`, n = e);
    return i ? (t.innerHTML = "", t.remove()) : (t.innerHTML = s, this.builder.outputHtml += `<div class="result-container">${s}</div>`), {
      markdown: n,
      output: r,
      output2: o
    };
  }
  async generateReplicate(e, t, i) {
    let s, n = {};
    const r = "replicate";
    if (e.text_to_image_generation) {
      let l = this.validateModel(e.model, r, "text_to_image_generation");
      if (!l)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Model not found.")
        };
      let u = e.prompt;
      if (!u)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Please input a prompt.")
        };
      let d = e.aspect_ratio || "16:9", c = e.num_images || 1;
      c > 4 && (c = 4), s = {
        prompt: u,
        aspect_ratio: d,
        num_outputs: c
      }, n.model = l, n.customData = this.builder.settings.customData;
    } else if (e.edit_area_in_image) {
      let l = this.validateModel(e.model, c, "edit_area_in_image");
      if (!l)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Model not found.")
        };
      let u = e.prompt;
      if (!u)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Please input a prompt.")
        };
      if (!e.image_url)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Image reference not found.")
        };
      let c = "replicate";
      const h = await this.builder.upload.getInputURLs(c, !0);
      if (h.error)
        return {
          mediaGenerated: !1,
          status: "error",
          message: h.error
        };
      let p = h[e.image_url], f = h[e.image_url + "_mask"];
      if (!f)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Image mask not found.")
        };
      s = {
        prompt: u,
        image: p,
        mask: f
        // num_images,
      }, n.model = l, n.customData = this.builder.settings.customData;
    } else if (e.text_to_digital_illustration_generation) {
      let l = this.validateModel(e.model, r, "text_to_digital_illustration_generation");
      if (!l)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Model not found.")
        };
      let u = e.prompt;
      if (!u)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Please input a prompt.")
        };
      let d = e.width || 1280, c = e.height || 768;
      e.num_images, s = {
        prompt: u,
        size: `${d}x${c}`,
        // num_images,
        style: "digital_illustration"
        // style_id,
        // colors,
      }, n.model = l, n.customData = this.builder.settings.customData;
    } else if (e.upscale_image) {
      let l = this.validateModel(e.model, d, "upscale_image");
      if (!l)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Model not found.")
        };
      if (!e.image_url)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Image reference not found.")
        };
      let d = "replicate";
      const c = await this.builder.upload.getInputURLs(d);
      if (c.error)
        return {
          mediaGenerated: !1,
          status: "error",
          message: c.error
        };
      let h = c[e.image_url];
      if (!h)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Image not provided.")
        };
      s = {
        image: h
        // scale_factor: 2,
      }, n.model = l, n.customData = this.builder.settings.customData;
    } else if (e.describe_image) {
      let l = this.validateModel(e.model, c, "describe_image");
      if (!l)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Model not found.")
        };
      let u = e.prompt;
      if (!u)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Please input a prompt.")
        };
      if (!e.image_url)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Image reference not found.")
        };
      let c = "replicate";
      const h = await this.builder.upload.getInputURLs(c);
      if (h.error)
        return {
          mediaGenerated: !1,
          status: "error",
          message: h.error
        };
      let p = h[e.image_url];
      if (!p)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Image not provided.")
        };
      s = {
        image: p,
        prompt: `${u}. No talk. Answer only.`
      }, n.model = l, n.customData = this.builder.settings.customData;
    } else if (e.image_to_video_generation) {
      let l = this.validateModel(e.model, c, "image_to_video_generation");
      if (!l)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Model not found.")
        };
      let u = e.prompt || "stunning video", d = e.duration || 5;
      d > 10 && (d = 5);
      let c = "replicate";
      const h = await this.builder.upload.getInputURLs(c);
      if (h.error)
        return {
          mediaGenerated: !1,
          status: "error",
          message: h.error
        };
      let p = h[e.image_url];
      if (!p)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Image reference not found.")
        };
      l === "kwaivgi/kling-v1.6-pro" && (s = {
        start_image: p,
        prompt: u,
        duration: d
      }), l === "kwaivgi/kling-v1.6-standard" && (s = {
        start_image: p,
        prompt: u,
        duration: d
      }), l === "minimax/video-01-live" && (s = {
        first_frame_image: p,
        prompt: u
      }), l === "luma/ray" && (s = {
        start_image_url: p,
        prompt: u
      }), n.model = l, n.customData = this.builder.settings.customData;
    } else if (e.text_to_video_generation) {
      let l = this.validateModel(e.model, r, "text_to_video_generation");
      if (!l)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Model not found.")
        };
      let u = e.prompt;
      if (!u)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Please input a prompt.")
        };
      let d = e.duration || 5;
      d > 10 && (d = 5), l === "kwaivgi/kling-v1.6-standard" && (s = {
        prompt: u,
        duration: d
      }), l === "minimax/video-01" && (s = {
        prompt: u
      }), l === "luma/ray" && (s = {
        prompt: u
      }), n.model = l, n.customData = this.builder.settings.customData;
    } else if (e.text_to_speech) {
      let l = this.validateModel(e.model, r, "text_to_speech");
      if (!l)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Model not found.")
        };
      if (e.text.length > this.builder.settings.ttsMaxCharacters)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("The text exceeds the allowed limit.")
        };
      s = {
        text: e.text,
        voice: e.voice || "af_nicole",
        speed: parseFloat(e.speed) || 1
      }, n.model = l, n.customData = this.builder.settings.customData;
    }
    if (n.model.indexOf(":") !== -1) {
      const u = n.model.split(":")[1];
      n.version = u;
      let d = this.builder.settings.replicateEndpoint1;
      n.endpoint = d, n.payload = s, this.builder.settings.consoleLog && console.log("PAYLOAD 1");
    } else {
      let l = this.builder.settings.replicateEndpoint2;
      l = l.replace("{MODEL}", n.model), n.endpoint = l, n.payload = s, this.builder.settings.consoleLog && console.log("PAYLOAD 2");
    }
    this.builder.payloads.push(n), this.builder.settings.consoleLog && console.log(n);
    let o = !1;
    if (this.builder.settings.generateMediaUrl_Replicate && (o = !0), o) {
      let l = this.builder.settings.generateMediaUrl_Replicate;
      if (!l)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Endpoint not configured.")
        };
      let u, d = {
        "Content-Type": "application/json",
        ...this.builder.settings.headers
      }, h = await (await fetch(l, {
        signal: this.builder.mediaSignal,
        method: "POST",
        headers: d,
        body: JSON.stringify(n)
      })).json();
      if (h.ok) {
        if (u = h.data.id, !u)
          return {
            mediaGenerated: !1,
            status: "error",
            message: h.data && h.data.detail
          };
      } else
        return {
          mediaGenerated: !1,
          status: "error",
          message: h.error
        };
      const p = this.waitingReplicate(n, u, t, i);
      return this.builder.isMediaGenerating = !1, p;
    } else {
      let l = this.builder.settings.generateMediaUrl;
      if (!l)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Endpoint not configured: generateMediaUrl.")
        };
      let u = {
        "Content-Type": "application/json",
        ...this.builder.settings.headers
      };
      const c = await (await fetch(l, {
        signal: this.builder.mediaSignal,
        method: "POST",
        headers: u,
        body: JSON.stringify(n)
      })).json();
      if (this.builder.isMediaGenerating = !1, c.error)
        return this.builder.settings.consoleLog && console.log(c.error), {
          mediaGenerated: !1,
          status: "error",
          message: c.error
          //this.out('Request failed.')
        };
      {
        const h = c.data;
        let p = this.renderResult(h, t, i);
        return {
          mediaGenerated: !0,
          status: "success",
          markdown: p.markdown,
          output: p.output,
          output2: p.output2
        };
      }
    }
  }
  async generateOpenAI(e, t, i) {
    let s, n = {}, o = this.validateModel(e.model, "openai", "image_generation"), l = e.prompt;
    if (!l)
      return {
        mediaGenerated: !1,
        status: "error",
        message: this.out("Please input a prompt.")
      };
    const u = new FormData();
    u.append("customData", JSON.stringify(this.builder.settings.customData)), u.append("model", o), u.append("prompt", l);
    let d = !1, c = this.builder.getFormValues();
    for (const m of c) {
      if (m.value instanceof FileList && m.type === "multifile") {
        const b = m.value;
        if (b.length > 0)
          for (const w of b)
            u.append("file[]", w), d = !0;
      }
      if (m.value instanceof FileList && m.type === "file") {
        const b = m.value;
        if (b.length > 0) {
          const w = b[0];
          u.append("file[]", w), d = !0;
        }
      }
      if (typeof m.value == "string" && m.value.indexOf("base64") !== -1) {
        let b = m.value.replace(/^data:image\/(png|svg\+xml|jpeg|gif|webp);base64,/, "");
        u.append("mask", b);
      }
    }
    if (this.builder.selectedFiles && this.builder.selectedFiles.length > 0)
      for (let m = 0; m < this.builder.selectedFiles.length; m++) {
        const b = this.builder.selectedFiles[m];
        u.append("file[]", b), d = !0;
      }
    let h, p = e.size || "auto", f = e.quality || "auto", y = e.num_images || 1;
    if (d) {
      u.append("size", p), u.append("n", y), u.append("quality", f), s = {
        prompt: l,
        size: p,
        quality: f,
        n: y
      }, n.model = o, n.customData = this.builder.settings.customData, n.payload = s, this.builder.payloads.push(n);
      let m = this.builder.settings.generateMediaUrl_OpenAI_CreateImageEdit;
      h = await fetch(m, {
        method: "POST",
        body: u
      });
    } else {
      let m = e.background || "auto", b = e.output_format || "png";
      s = {
        prompt: l,
        background: m,
        output_format: b,
        size: p,
        quality: f,
        n: y
      }, n.model = o, n.customData = this.builder.settings.customData, n.payload = s, this.builder.payloads.push(n), this.builder.settings.consoleLog && console.log(n);
      const w = this.builder.settings.generateMediaUrl_OpenAI_CreateImage;
      let x = {
        "Content-Type": "application/json",
        ...this.builder.settings.headers
      };
      h = await fetch(w, {
        signal: this.builder.mediaSignal,
        method: "POST",
        headers: x,
        body: JSON.stringify(n)
      });
    }
    const _ = await h.json();
    this.builder.settings.consoleLog && console.log(_), this.builder.isMediaGenerating = !1;
    const g = _.data;
    this.builder.output.push(_);
    let v = this.renderResult(g, t, i);
    return {
      mediaGenerated: !0,
      status: "success",
      markdown: v.markdown,
      output: v.output,
      output2: v.output2
    };
  }
  async generateGoogle(e, t, i) {
    let s, n = {}, o = this.validateModel(e.model, "google", "edit_area_in_image");
    if (!o)
      return {
        mediaGenerated: !1,
        status: "error",
        message: this.out("Model not found.")
      };
    let l = e.prompt;
    if (!l)
      return {
        mediaGenerated: !1,
        status: "error",
        message: this.out("Please input a prompt.")
      };
    let u = [];
    u.push({
      text: l
    });
    let d = this.builder.getFormValues();
    if (!(d && Object.keys(d).length === 0)) {
      for (const g of d)
        if (g.value instanceof FileList && g.type === "multifile") {
          const v = g.value;
          if (v.length > 0)
            for (const m of v) {
              const b = await new Promise((w, x) => {
                const k = new FileReader();
                k.onload = (S) => {
                  const T = S.target.result.split(",")[1];
                  w(T);
                }, k.onerror = x, k.readAsDataURL(m);
              });
              u.push({
                inlineData: {
                  mimeType: "image/png",
                  data: b
                }
              });
            }
        }
    }
    s = {
      contents: u
    }, n.model = o, n.customData = this.builder.settings.customData, n.payload = s, this.builder.payloads.push(n), this.builder.settings.consoleLog && console.log(n);
    const c = this.builder.settings.generateMediaUrl_Google;
    let h = {
      "Content-Type": "application/json",
      ...this.builder.settings.headers
    };
    const f = await (await fetch(c, {
      signal: this.builder.mediaSignal,
      method: "POST",
      headers: h,
      body: JSON.stringify(n)
    })).json();
    this.builder.settings.consoleLog && console.log(f), this.builder.isMediaGenerating = !1;
    const y = f.data;
    let _ = this.renderResult(y, t, i);
    return {
      mediaGenerated: !0,
      status: "success",
      markdown: _.markdown,
      output: _.output,
      output2: _.output2
    };
  }
  async generateFal(e, t, i) {
    let s = "fal", n, r = {};
    if (e.text_to_image_generation) {
      let f = this.validateModel(e.model, s, "text_to_image_generation");
      if (!f)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Model not found.")
        };
      let y = e.prompt;
      if (!y)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Please input a prompt.")
        };
      let _ = e.width || 1280, g = e.height || 768, v = e.aspect_ratio, m = e.num_images || 1;
      if (m > 4 && (m = 4), v) {
        let {
          w: F,
          h: Y
        } = this.getDimension(v);
        _ = F, g = Y;
      }
      let b = e.color1_red, w = e.color1_green, x = e.color1_blue, k = e.color2_red, S = e.color2_green, T = e.color2_blue, C = e.color3_red, R = e.color3_green, L = e.color3_blue, $ = e.color4_red, O = e.color4_green, N = e.color4_blue, A = e.color5_red, q = e.color5_green, M = e.color5_blue, E = [];
      b && w && x && !(b === "0" && w === "0" && x === "0") && E.push({
        r: b,
        g: w,
        b: x
      }), k && S && T && !(k === "0" && S === "0" && T === "0") && E.push({
        r: k,
        g: S,
        b: T
      }), C && R && L && !(C === "0" && R === "0" && L === "0") && E.push({
        r: C,
        g: R,
        b: L
      }), $ && O && N && !($ === "0" && O === "0" && N === "0") && E.push({
        r: $,
        g: O,
        b: N
      }), A && q && M && !(A === "0" && q === "0" && M === "0") && E.push({
        r: A,
        g: q,
        b: M
      });
      let D = await (async () => {
        let F = [], Y = this.builder.getFormValues();
        for (const V of Y)
          if (V.value instanceof FileList && V.type === "multifile") {
            const fe = V.value;
            if (fe.length > 0) {
              let oe = 0;
              for (const xe of fe) {
                oe++;
                const Oe = new FormData();
                Oe.append("file", xe), Oe.append("customData", this.builder.settings.customData);
                let je = this.builder.settings.uploadMediaUrl_Fal;
                const Ye = await (await fetch(je, {
                  method: "POST",
                  body: Oe
                })).json();
                if (Ye.ok) {
                  const We = Ye.url;
                  F.push(We), this.builder.filesUploaded["file_" + oe] = We;
                }
              }
            }
          }
        return F;
      })();
      n = {
        prompt: y,
        image_size: {
          width: _,
          height: g
        },
        num_images: m
      }, f.indexOf("gemini") !== -1 && (n = {
        prompt: y,
        input_image_urls: D
      }), f === "fal-ai/ideogram/v2a" && (v = this.getClosestAspectRatio(_, g), n = {
        prompt: y,
        aspect_ratio: v,
        num_images: m
      }), f.indexOf("recraft") !== -1 && (n = {
        prompt: y,
        image_size: {
          width: _,
          height: g
        },
        num_images: m,
        // style,
        colors: E
      }), r.model = f, r.customData = this.builder.settings.customData;
    } else if (e.edit_area_in_image) {
      let f = this.validateModel(e.model, s, "edit_area_in_image");
      if (!f)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Model not found.")
        };
      let y = e.prompt;
      if (!y)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Please input a prompt.")
        };
      if (!e.image_url)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Image reference not found.")
        };
      const g = await this.builder.upload.getInputURLs(s);
      if (g.error)
        return {
          mediaGenerated: !1,
          status: "error",
          message: g.error
        };
      let v = g[e.image_url], m = g[e.image_url + "_mask"];
      if (n = {
        image_url: v,
        mask_url: m,
        prompt: y
        // num_images,
      }, r.model = f, !m) {
        n = {
          image_url: v,
          prompt: y
        };
        let b = this.validateModel(e.model, s, "edit_image");
        r.model = b;
      }
      r.customData = this.builder.settings.customData;
    } else if (e.text_to_2d_illustration_generation) {
      let f = this.validateModel(e.model, s, "text_to_2d_illustration_generation");
      if (!f)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Model not found.")
        };
      let y = e.prompt;
      if (!y)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Please input a prompt.")
        };
      let _ = e.width || 1280, g = e.height || 768, v = e.num_images || 1;
      v > 4 && (v = 4);
      let m = e.style || "any", b = e.style_id || this.builder.settings._2dIllustrationStyleId, w = e.color1_red, x = e.color1_green, k = e.color1_blue, S = e.color2_red, T = e.color2_green, C = e.color2_blue, R = e.color3_red, L = e.color3_green, $ = e.color3_blue, O = e.color4_red, N = e.color4_green, A = e.color4_blue, q = e.color5_red, M = e.color5_green, E = e.color5_blue, I = [];
      w && x && k && !(w === "0" && x === "0" && k === "0") && I.push({
        r: w,
        g: x,
        b: k
      }), S && T && C && !(S === "0" && T === "0" && C === "0") && I.push({
        r: S,
        g: T,
        b: C
      }), R && L && $ && !(R === "0" && L === "0" && $ === "0") && I.push({
        r: R,
        g: L,
        b: $
      }), O && N && A && !(O === "0" && N === "0" && A === "0") && I.push({
        r: O,
        g: N,
        b: A
      }), q && M && E && !(q === "0" && M === "0" && E === "0") && I.push({
        r: q,
        g: M,
        b: E
      }), n = {
        prompt: y,
        image_size: {
          width: _,
          height: g
        },
        num_images: v,
        style: m,
        style_id: b,
        colors: I
      }, r.model = f, r.customData = this.builder.settings.customData;
    } else if (e.text_to_digital_illustration_generation) {
      let f = this.validateModel(e.model, s, "text_to_digital_illustration_generation");
      if (!f)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Model not found.")
        };
      let y = e.prompt;
      if (!y)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Please input a prompt.")
        };
      let _ = e.width || 1280, g = e.height || 768, v = e.num_images || 1;
      v > 4 && (v = 4);
      let m = e.style || "digital_illustration", b = e.color1_red, w = e.color1_green, x = e.color1_blue, k = e.color2_red, S = e.color2_green, T = e.color2_blue, C = e.color3_red, R = e.color3_green, L = e.color3_blue, $ = e.color4_red, O = e.color4_green, N = e.color4_blue, A = e.color5_red, q = e.color5_green, M = e.color5_blue, E = [];
      b && w && x && !(b === "0" && w === "0" && x === "0") && E.push({
        r: b,
        g: w,
        b: x
      }), k && S && T && !(k === "0" && S === "0" && T === "0") && E.push({
        r: k,
        g: S,
        b: T
      }), C && R && L && !(C === "0" && R === "0" && L === "0") && E.push({
        r: C,
        g: R,
        b: L
      }), $ && O && N && !($ === "0" && O === "0" && N === "0") && E.push({
        r: $,
        g: O,
        b: N
      }), A && q && M && !(A === "0" && q === "0" && M === "0") && E.push({
        r: A,
        g: q,
        b: M
      }), n = {
        prompt: y,
        image_size: {
          width: _,
          height: g
        },
        num_images: v,
        style: m,
        // style_id,
        colors: E
      }, r.model = f, r.customData = this.builder.settings.customData;
    } else if (e.text_to_book_cover_generation) {
      let f = this.validateModel(e.model, s, "text_to_book_cover_generation");
      if (!f)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Model not found.")
        };
      let y = e.prompt;
      if (!y)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Please input a prompt.")
        };
      let _ = e.width || 1024, g = e.height || 1365, v = e.num_images || 1;
      v > 4 && (v = 1);
      let m = "digital_illustration/cover", b = e.color1_red, w = e.color1_green, x = e.color1_blue, k = e.color2_red, S = e.color2_green, T = e.color2_blue, C = e.color3_red, R = e.color3_green, L = e.color3_blue, $ = e.color4_red, O = e.color4_green, N = e.color4_blue, A = e.color5_red, q = e.color5_green, M = e.color5_blue, E = [];
      b && w && x && !(b === "0" && w === "0" && x === "0") && E.push({
        r: b,
        g: w,
        b: x
      }), k && S && T && !(k === "0" && S === "0" && T === "0") && E.push({
        r: k,
        g: S,
        b: T
      }), C && R && L && !(C === "0" && R === "0" && L === "0") && E.push({
        r: C,
        g: R,
        b: L
      }), $ && O && N && !($ === "0" && O === "0" && N === "0") && E.push({
        r: $,
        g: O,
        b: N
      }), A && q && M && !(A === "0" && q === "0" && M === "0") && E.push({
        r: A,
        g: q,
        b: M
      }), n = {
        prompt: y,
        image_size: {
          width: _,
          height: g
        },
        num_images: v,
        style: m,
        // style_id,
        colors: E
      }, r.model = f, r.customData = this.builder.settings.customData;
    } else if (e.upscale_image) {
      let f = this.validateModel(e.model, s, "upscale_image");
      if (!f)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Model not found.")
        };
      if (!e.image_url)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Image reference not found.")
        };
      const _ = await this.builder.upload.getInputURLs(s);
      if (_.error)
        return {
          mediaGenerated: !1,
          status: "error",
          message: _.error
        };
      let g = _[e.image_url];
      if (!g)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Image not provided.")
        };
      n = {
        image_url: g,
        upscale_factor: 2
      }, r.model = f, r.customData = this.builder.settings.customData;
    } else if (e.describe_image) {
      let f = this.validateModel(e.model, s, "describe_image");
      if (!f)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Model not found.")
        };
      let y = e.prompt;
      if (!y)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Please input a prompt.")
        };
      if (!e.image_url)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Image reference not found.")
        };
      const g = await this.builder.upload.getInputURLs(s);
      if (g.error)
        return {
          mediaGenerated: !1,
          status: "error",
          message: g.error
        };
      let v = g[e.image_url];
      if (!v)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Image not provided.")
        };
      n = {
        image_url: v,
        prompt: `${y}. No talk. Answer only.`
      }, r.model = f, r.customData = this.builder.settings.customData;
    } else if (e.image_to_video_generation) {
      let f = this.validateModel(e.model, s, "image_to_video_generation");
      if (!f)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Model not found.")
        };
      let y = e.prompt;
      y = e.prompt || "stunning video";
      let _ = e.duration || 5;
      _ > 10 && (_ = 5);
      const g = await this.builder.upload.getInputURLs(s);
      if (g.error)
        return {
          mediaGenerated: !1,
          status: "error",
          message: g.error
        };
      let v = g[e.image_url];
      if (!v)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Image reference not found.")
        };
      n = {
        prompt: y,
        image_url: v,
        duration: _,
        aspect_ratio: "16:9"
        // 9:16, 1:1
      }, f.indexOf("fal-ai/luma-dream-machine") !== -1 && delete n.duration, r.model = f, r.customData = this.builder.settings.customData;
    } else if (e.text_to_video_generation) {
      let f = this.validateModel(e.model, s, "text_to_video_generation");
      if (!f)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Model not found.")
        };
      let y = e.prompt;
      if (!y)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Please input a prompt.")
        };
      let _ = e.duration || 5;
      _ > 10 && (_ = 5), n = {
        prompt: y,
        duration: _,
        aspect_ratio: "16:9"
        // 9:16, 1:1
      }, f.indexOf("fal-ai/luma-dream-machine") !== -1 && delete n.duration, r.model = f, r.customData = this.builder.settings.customData;
    } else if (e.text_to_speech) {
      let f = this.validateModel(e.model, s, "text_to_speech");
      if (!f)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Model not found.")
        };
      if (e.text.length > this.builder.settings.ttsMaxCharacters)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("The text exceeds the allowed limit.")
        };
      n = {
        text: e.text,
        voice: e.voice || "Matilda"
        // River
      }, r.model = f, r.customData = this.builder.settings.customData;
    }
    let o = `https://queue.fal.run/${r.model}`;
    r.endpoint = o, r.payload = n, this.builder.payloads.push(r), this.builder.settings.consoleLog && console.log(r);
    let l = this.builder.settings.generateMediaUrl_Fal;
    if (!l)
      return {
        mediaGenerated: !1,
        status: "error",
        message: this.out("Endpoint not configured: generateMediaUrl_Fal.")
      };
    let u, d = {
      "Content-Type": "application/json",
      ...this.builder.settings.headers
    }, h = await (await fetch(l, {
      signal: this.builder.mediaSignal,
      method: "POST",
      headers: d,
      body: JSON.stringify(r)
    })).json();
    if (h.ok)
      u = h.request_id;
    else
      return {
        mediaGenerated: !1,
        status: "error",
        message: h.error
        //this.out('Generating video request failed.')
      };
    const p = this.waitingFal(r, u, t, i);
    return this.builder.isMediaGenerating = !1, p;
  }
  validateModel(e, t, i) {
    const n = this.builder.settings.defaultModels[i][t];
    return this.builder.settings.modelFallback ? n.length === 1 ? (this.builder.settings.consoleLog && console.log("Fixed model: " + n[0]), n[0]) : e && n && n.includes(e) ? (this.builder.settings.consoleLog && console.log("Model is valid: " + e), e) : n.length >= 1 ? (this.builder.settings.consoleLog && console.log("Use default: " + n[0]), n[0]) : !1 : e ? e && n && n.includes(e) ? (this.builder.settings.consoleLog && console.log("Model is valid: " + e), e) : !1 : (this.builder.settings.consoleLog && console.log("Fixed model: " + n[0]), n[0]);
  }
  async generate_GoogleMediaByJSON(e, t, i, s) {
    this.builder.isMediaGenerating = !0, this.mediaController = new AbortController(), this.builder.mediaSignal = this.mediaController.signal;
    let n;
    if (e.trim().startsWith("{"))
      try {
        n = JSON.parse(e);
      } catch {
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Incorrect JSON format.")
        };
      }
    let r = t.trim();
    if (!r)
      return {
        mediaGenerated: !1,
        status: "error",
        message: this.out("Please provide model information in the context.")
      };
    let o = {};
    o.model = r, o.customData = this.builder.settings.customData, o.payload = n, this.builder.payloads.push(o), this.builder.settings.consoleLog && console.log(o);
    const l = this.builder.settings.generateMediaUrl_Google;
    let u = {
      "Content-Type": "application/json",
      ...this.builder.settings.headers
    };
    const c = await (await fetch(l, {
      signal: this.builder.mediaSignal,
      method: "POST",
      headers: u,
      body: JSON.stringify(o)
    })).json();
    this.builder.settings.consoleLog && console.log(c);
    const h = c.data;
    let p = this.renderResult(h, i, s);
    return {
      mediaGenerated: !0,
      status: "success",
      markdown: p.markdown,
      output: p.output,
      output2: p.output2
    };
  }
  async uploadMultiple() {
    let e = [], t = this.builder.getFormValues();
    for (const i of t)
      if (i.value instanceof FileList && i.type === "multifile") {
        const s = {};
        if (s.name = i.name, s.files = [], this.builder.selectedFiles && this.builder.selectedFiles.length > 0) {
          const r = [];
          for (let o = 0; o < this.builder.selectedFiles.length; o++) {
            const l = this.builder.selectedFiles[o], u = new FormData();
            u.append("file", l), u.append("customData", this.builder.settings.customData);
            let d = this.builder.settings.uploadMediaUrl_Fal;
            const h = await (await fetch(d, {
              method: "POST",
              body: u
            })).json();
            if (h.ok) {
              const p = h.url;
              s.files.push(p), this.builder.filesUploaded["file_" + o] = p;
            }
            r.push(s);
          }
          return r;
        }
        const n = i.value;
        if (n.length > 0) {
          let r = 0;
          for (const o of n) {
            r++;
            const l = new FormData();
            l.append("file", o), l.append("customData", this.builder.settings.customData);
            let u = this.builder.settings.uploadMediaUrl_Fal;
            const c = await (await fetch(u, {
              method: "POST",
              body: l
            })).json();
            if (c.ok) {
              const h = c.url;
              s.files.push(h), this.builder.filesUploaded["file_" + r] = h;
            }
          }
        }
        e.push(s);
      }
    return e;
  }
  async generate(e, t, i, s, n, r, o) {
    if (i = i || this.builder.settings.defaultMediaGenerationProvider, i === "google" && e.trim().startsWith("{"))
      return this.generate_GoogleMediaByJSON(e, t, r, o);
    this.builder.isMediaGenerating = !0, this.mediaController = new AbortController(), this.builder.mediaSignal = this.mediaController.signal;
    let l, u = !1, d;
    if (e.trim().startsWith("{"))
      try {
        d = JSON.parse(e), d && typeof d == "object" && (u = !0);
      } catch {
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Incorrect JSON format.")
        };
      }
    if (u) {
      let c = t.trim();
      if (!c)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Please provide model information in the context.")
        };
      let h = await this.uploadMultiple();
      ((g, v) => {
        const m = (b) => {
          if (Array.isArray(b)) {
            const w = b[0], x = v.find((k) => k.name === w);
            if (x && b.every((k) => k === w))
              return x.files;
            for (let k = 0; k < b.length; k++)
              b[k] = m(b[k]);
          } else if (typeof b == "object" && b !== null)
            for (let w in b)
              b[w] = m(b[w]);
          return b;
        };
        return m(g);
      })(d, h), i || (c.startsWith("fal") ? i = "fal" : i = "replicate");
      const f = (g) => typeof g == "object" && g !== null && !Array.isArray(g), y = await this.builder.upload.getInputURLs(i);
      if (y.error)
        return {
          mediaGenerated: !1,
          status: "error",
          message: y.error
        };
      Object.keys(d).forEach((g) => {
        Object.keys(y).forEach((v) => {
          if (d[g] === v) {
            let m = y[v];
            d[g] = m;
          }
          if (Array.isArray(d[g])) {
            for (let m = 0; m < d[g].length; m++)
              if (d[g][m] === v) {
                let b = y[v];
                d[g][m] = b;
              }
          }
        });
      }), Object.keys(d).forEach((g) => {
        let v = d[g];
        if (f(v))
          for (const m in v)
            Object.prototype.hasOwnProperty.call(v, m) && Object.keys(y).forEach((b) => {
              if (v[m] === b) {
                let w = y[b];
                v[m] = w, b === w && !w.startsWith("http") && (v[m] = "");
              }
            });
        if (Array.isArray(v)) {
          for (let m = 0; m < v.length; m++)
            if (f(v[m]))
              for (const b in v[m])
                Object.prototype.hasOwnProperty.call(v[m], b) && Object.keys(y).forEach((w) => {
                  if (v[m][b] === w) {
                    let x = y[w];
                    v[m][b] = x, w === x && !x.startsWith("http") && (v[m][b] = "");
                  }
                });
          d[g] = [...v.filter((m) => m !== "")];
        }
      });
      let _ = {};
      if (_.model = c, _.customData = this.builder.settings.customData, i === "replicate" && c.indexOf(":") !== -1) {
        const g = c.split(":");
        _.version = g[1];
      }
      if (i === "replicate")
        if (c.indexOf(":") !== -1) {
          let g = this.builder.settings.replicateEndpoint1;
          _.endpoint = g, _.payload = d, this.builder.settings.consoleLog && console.log("JSON PAYLOAD 1");
        } else {
          let g = this.builder.settings.replicateEndpoint2;
          g = g.replace("{MODEL}", _.model), _.endpoint = g, _.payload = d, this.builder.settings.consoleLog && console.log("JSON PAYLOAD 2");
        }
      else if (i === "fal") {
        let g = `https://queue.fal.run/${_.model}`;
        _.endpoint = g, _.payload = d, this.builder.settings.consoleLog && console.log("JSON PAYLOAD");
      }
      return this.builder.payloads.push(_), this.builder.settings.consoleLog && console.log(_), this.generateMediaByJSON(_, i, r, o);
    }
    try {
      if (l = await this.checkIntent(e, i, n), this.builder.settings.consoleLog && console.log(l), !l)
        return {
          mediaGenerated: !1,
          status: "aborted",
          message: this.out("Request aborted.")
        };
      if (l.minimize_image) {
        if (!l.image_url)
          return {
            mediaGenerated: !1,
            status: "error",
            message: this.out("Image reference not found.")
          };
        const h = await this.builder.upload.getInputURLs();
        if (h.error)
          return {
            mediaGenerated: !1,
            status: "error",
            message: h.error
          };
        let f = {
          image_url: h[l.image_url] || l.image_url,
          // cleanup,
          customData: this.builder.settings.customData
        };
        this.builder.payloads.push(f), this.builder.settings.consoleLog && console.log(f);
        let y = {
          "Content-Type": "application/json",
          ...this.builder.settings.headers
        };
        const g = await (await fetch(this.builder.settings.minimizeImageUrl, {
          signal: this.builder.mediaSignal,
          method: "POST",
          headers: y,
          body: JSON.stringify(f)
        })).json();
        if (this.builder.output.push(g), g.error)
          return this.builder.settings.consoleLog && console.log(g.error), this.builder.isMediaGenerating = !1, {
            mediaGenerated: !1,
            status: "error",
            message: g.error
            //this.out('Request failed.')
          };
        {
          const v = g.url, m = `
                    <div class="image-container">
                        <div>
                            <img src="${v}" />
                            <div>
                                <a class="link-view" href="${v}" target="_blank" rel="noopener noreferrer">${this.out("View")}</a>
                                <a class="link-download" href="${v}" download>${this.out("Download")}</a>
                            </div>
                        </div>
                    </div>`;
          let b = `![](${v})`;
          return o ? (r.innerHTML = "", r.remove()) : (r.innerHTML = m, this.builder.outputHtml += `<div class="result-container">${m}</div>`), this.builder.isMediaGenerating = !1, {
            mediaGenerated: !0,
            status: "success",
            markdown: b,
            output: [v]
          };
        }
      } else {
        if (i === "fal")
          return this.generateFal(l, r, o);
        if (i === "replicate")
          return this.generateReplicate(l, r, o);
        if (i === "google")
          return this.generateGoogle(l, r, o);
        if (i === "openai")
          return this.generateOpenAI(l, r, o);
      }
    } catch (c) {
      return this.builder.settings.consoleLog && console.log(c), this.builder.isMediaGenerating = !1, c.name === "AbortError" ? {
        mediaGenerated: !1,
        status: "aborted",
        message: this.out("Request aborted.")
      } : {
        mediaGenerated: !1,
        status: "error",
        message: this.out("Request failed.")
      };
    }
    return this.builder.isMediaGenerating = !1, {
      mediaGenerated: !1,
      status: "error",
      message: this.out("Request failed.")
    };
  }
  async generateMediaByJSON(e, t, i, s) {
    let n, r = !1;
    if (t === "replicate" && this.builder.settings.generateMediaUrl) {
      if (n = this.builder.settings.generateMediaUrl, !n)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Endpoint not configured: generateMediaUrl.")
        };
    } else if (t === "replicate" && this.builder.settings.generateMediaUrl_Replicate) {
      if (n = this.builder.settings.generateMediaUrl_Replicate, !n)
        return {
          mediaGenerated: !1,
          status: "error",
          message: this.out("Endpoint not configured: generateMediaUrl_Replicate.")
        };
      r = !0;
    } else if (t === "fal" && (n = this.builder.settings.generateMediaUrl_Fal, !n))
      return {
        mediaGenerated: !1,
        status: "error",
        message: this.out("Endpoint not configured: generateMediaUrl_Fal.")
      };
    let o = {
      "Content-Type": "application/json",
      ...this.builder.settings.headers
    };
    const u = await (await fetch(n, {
      signal: this.builder.mediaSignal,
      method: "POST",
      headers: o,
      body: JSON.stringify(e)
    })).json();
    if (this.builder.isMediaGenerating = !1, t === "fal") {
      let d = u.request_id;
      return this.waitingFal(e, d, i, s);
    }
    if (u.error)
      return this.builder.settings.consoleLog && console.log(u.error), {
        mediaGenerated: !1,
        status: "error",
        message: u.error
        //this.out('Request failed.') 
      };
    if (r) {
      let d;
      if (u.ok) {
        if (d = u.data.id, !d)
          return {
            mediaGenerated: !1,
            status: "error",
            message: u.data && u.data.detail
          };
      } else
        return {
          mediaGenerated: !1,
          status: "error",
          message: u.error
          //this.out('Generating video request failed.')
        };
      return this.waitingReplicate(e, d, i, s);
    } else {
      const d = u.data;
      let c = this.renderResult(d, i, s);
      return {
        mediaGenerated: !0,
        status: "success",
        markdown: c.markdown,
        output: c.output,
        output2: c.output2
      };
    }
  }
  getClosestAspectRatio(e, t) {
    if (t === 0)
      return "3:2";
    const i = e / t, s = [{
      aspect: "10:16",
      ratio: 10 / 16
    }, {
      aspect: "16:10",
      ratio: 16 / 10
    }, {
      aspect: "9:16",
      ratio: 9 / 16
    }, {
      aspect: "16:9",
      ratio: 16 / 9
    }, {
      aspect: "4:3",
      ratio: 4 / 3
    }, {
      aspect: "3:4",
      ratio: 3 / 4
    }, {
      aspect: "1:1",
      ratio: 1
    }, {
      aspect: "1:3",
      ratio: 1 / 3
    }, {
      aspect: "3:1",
      ratio: 3
    }, {
      aspect: "3:2",
      ratio: 3 / 2
    }, {
      aspect: "2:3",
      ratio: 2 / 3
    }];
    let n = s[0], r = Math.abs(i - s[0].ratio);
    for (let o = 1; o < s.length; o++) {
      const l = Math.abs(i - s[o].ratio);
      l < r && (r = l, n = s[o]);
    }
    return n.aspect;
  }
  out(e) {
    if (this.opts.lang) {
      let t = this.opts.lang[e];
      return t || e;
    } else
      return e;
  }
}
class Mo {
  constructor(e = {}, t) {
    const i = {
      lang: []
    };
    this.builder = t, this.opts = Object.assign({}, i, e);
  }
  async getInputURLs(e) {
    let t = this.builder.getFormValues();
    const i = this.builder.filesUploaded;
    if (Object.keys(i).length !== 0) return i;
    for (const s of t)
      if (s.value instanceof FileList) {
        let n = await this.processMediaInput(s.name, e), r = n.url;
        s.name === n.url && (r = ""), i[s.name] = r;
      } else {
        if (s.name.indexOf("_mask") !== -1) {
          let n = await this.processMaskInput(s.name, e);
          if (n.error)
            return {
              error: n.error
            };
          {
            let r = n.url;
            i[s.name] = r;
          }
        }
        if (s.name.indexOf("__url") !== -1) {
          let n;
          this.builder.settings.isBuilder ? n = document.querySelector(this.builder.settings.previewSelector) : n = this.builder.element;
          const r = n.querySelector(`input[name="${s.name}"]`);
          if (r) {
            const o = r.value;
            i[s.name] = o;
          }
        }
      }
    return Object.keys(i).forEach((s) => {
      if (s.endsWith("__url")) {
        const n = s.replace("__url", "");
        Object.prototype.hasOwnProperty.call(i, n) && (i[n] = i[s]), delete i[s];
      }
    }), i;
  }
  async processMaskInput(e, t) {
    let i;
    if (this.builder.settings.isBuilder) {
      if (!this.builder.settings.previewSelector)
        return {
          error: this.out("previewSelector not set.")
        };
      i = document.querySelector(this.builder.settings.previewSelector);
    } else
      i = this.builder.element;
    const s = i.querySelector(`input[type="hidden"][name="${e}"]`);
    if (!s) return {
      error: this.out("Unable to perform the request.")
      // must be image_to_image_generation, not edit_area_in_image
    };
    if (s.value === "")
      return {
        error: this.out("Please brush the area you want to edit.")
      };
    let n = s.value.replace(/^data:image\/(png|svg\+xml|jpeg|gif|webp);base64,/, "");
    if (n === "")
      return {
        error: this.out("Please brush over the areas to remove objects before continuing.")
      };
    let r, o = this.builder.getId(), l = {
      image: n,
      filename: `${e}_${o}.png`,
      // inputName + '.png',
      customData: this.builder.settings.customData
    }, u;
    t === "replicate" ? u = this.builder.settings.uploadBase64Url : t === "fal" ? u = this.builder.settings.uploadBase64Url_Fal : u = this.builder.settings.uploadBase64Url_Fal || this.builder.settings.uploadBase64Url;
    let d = {
      "Content-Type": "application/json",
      ...this.builder.settings.headers
    }, h = await (await fetch(u, {
      signal: this.builder.mediaSignal,
      method: "POST",
      headers: d,
      body: JSON.stringify(l)
    })).json();
    return h.ok && (r = h.url), r ? {
      url: r
    } : {
      error: this.out("Upload mask failed.")
    };
  }
  async processMediaInput(e, t) {
    if (!e)
      return !1;
    let i;
    if (!this.isFullUrl(e)) {
      let r = e;
      i = this.getFileInput(r) || this.getFileInput();
    }
    let s = "", n;
    if (this.builder.photoBlob[e]) {
      let r = this.builder.getId();
      const o = new FormData();
      o.append("file", this.builder.photoBlob[e], `photo_${r}.jpg`), o.append("customData", this.builder.settings.customData);
      let l;
      t === "replicate" ? l = this.builder.settings.uploadMediaUrl : t === "fal" ? l = this.builder.settings.uploadMediaUrl_Fal : l = this.builder.settings.uploadMediaUrl_Fal || this.builder.settings.uploadMediaUrl;
      const d = await (await fetch(l, {
        method: "POST",
        body: o
      })).json();
      return d.ok ? (n = d.url, s = d.filename, {
        filename: s,
        url: n
      }) : {
        error: this.out("Upload file failed.")
      };
    }
    if (this.builder.selectedFiles && this.builder.selectedFiles.length > 0) {
      const r = new FormData();
      r.append("file", this.builder.selectedFiles[0]), r.append("customData", this.builder.settings.customData);
      let o;
      t === "replicate" ? o = this.builder.settings.uploadMediaUrl : t === "fal" ? o = this.builder.settings.uploadMediaUrl_Fal : o = this.builder.settings.uploadMediaUrl_Fal || this.builder.settings.uploadMediaUrl;
      const u = await (await fetch(o, {
        method: "POST",
        body: r
      })).json();
      return u.ok ? (n = u.url, s = u.filename, {
        filename: s,
        url: n
      }) : {
        error: this.out("Upload file failed.")
      };
    }
    if (i) {
      const r = i.files[0];
      if (r) {
        s = r.name;
        const o = new FormData();
        o.append("file", r), o.append("customData", this.builder.settings.customData);
        let l;
        t === "replicate" ? l = this.builder.settings.uploadMediaUrl : t === "fal" ? l = this.builder.settings.uploadMediaUrl_Fal : l = this.builder.settings.uploadMediaUrl_Fal || this.builder.settings.uploadMediaUrl;
        const d = await (await fetch(l, {
          method: "POST",
          body: o
        })).json();
        if (d.ok)
          n = d.url, s = d.filename;
        else
          return {
            error: this.out("Upload file failed.")
          };
      } else
        n = e;
    } else
      n = e;
    return {
      filename: s,
      url: n
    };
  }
  getFileInput(e) {
    let t;
    if (this.builder.settings.isBuilder) {
      if (!this.builder.settings.previewSelector)
        return console.log("previewSelector not set."), null;
      t = document.querySelector(this.builder.settings.previewSelector);
    } else
      t = this.builder.element;
    return t ? e ? t.querySelector(`input[type="file"][name="${e}"]`) : t.querySelector('input[type="file"]') : null;
  }
  isFullUrl(e) {
    return e.indexOf("/") !== -1;
  }
  out(e) {
    if (this.opts.lang) {
      let t = this.opts.lang[e];
      return t || e;
    } else
      return e;
  }
}
class Ro {
  constructor(e, t = {}) {
    const i = {
      lang: []
      // name: ''
    };
    this.settings = Object.assign({}, i, t), this.empty = !0, this.element = e, this.init();
  }
  loadUrl(e) {
    const t = this.element.querySelector("img");
    t.src = e, this.loaded();
  }
  loadImage(e) {
    if (e) {
      const t = new FileReader();
      t.onload = (i) => {
        this.element.querySelector("img").setAttribute("src", i.target.result);
      }, t.readAsDataURL(e);
    }
  }
  setImage(e) {
    if (e) {
      const t = this.element.querySelector("img");
      t.src = e;
    }
  }
  clearImage() {
    this.element.style.display = "";
  }
  out(e) {
    let t = this.settings.lang[e];
    return t || e;
  }
  init() {
    const e = this.element;
    e.className = "imagemask-wrapper";
    const t = document.createElement("div");
    t.className = "imagemask-overlay", e.appendChild(t);
    const i = document.createElement("button");
    i.className = "btn-close-imagemask", i.title = this.out("Close"), i.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"  
        stroke-linejoin="round" class="icon-close">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M18 6l-12 12" /><path d="M6 6l12 12" />
        </svg>`, e.appendChild(i);
    const s = document.createElement("div");
    s.className = "imagemask-body", e.appendChild(s);
    const n = document.createElement("div");
    n.className = "imagemask-container", s.appendChild(n);
    const r = document.createElement("div");
    r.className = "imagemask-controls", s.appendChild(r);
    const o = document.createElement("label");
    r.appendChild(o), o.innerHTML = `${this.out("Brush Size")}: 
            <input type="range" class="brush-size" min="5" max="100" value="30">`;
    const l = o.querySelector(".brush-size"), u = document.createElement("button");
    u.className = "btn-undobrush", u.title = this.out("Undo"), u.innerHTML = `
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  
        class="icon-undo">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M9 14l-4 -4l4 -4"></path>
                <path d="M5 10h11a4 4 0 1 1 0 8h-1"></path>
        </svg>`, r.appendChild(u);
    const d = document.createElement("button");
    d.className = "btn-redobrush", d.title = this.out("Redo"), d.innerHTML = `
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  
        class="icon-redo">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M15 14l4 -4l-4 -4"></path>
            <path d="M19 10h-11a4 4 0 1 0 0 8h1"></path>
        </svg>`, r.appendChild(d);
    const c = document.createElement("button");
    c.className = "btn-clearbrush", c.title = this.out("Clear"), c.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
        stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" 
        class="icon-eraser">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3" />
            <path d="M18 13.3l-6.3 -6.3" /><
        /svg>`, r.appendChild(c);
    const h = document.createElement("button");
    h.className = "btn-enlargemask", c.title = this.out("Enlarge"), h.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"  
        fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" 
        class="icon-maximize">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M16 4l4 0l0 4" /><path d="M14 10l6 -6" />
            <path d="M8 20l-4 0l0 -4" /><path d="M4 20l6 -6" />
            <path d="M16 20l4 0l0 -4" /><path d="M14 14l6 6" />
            <path d="M8 4l-4 0l0 4" /><path d="M4 4l6 6" />
        </svg>`, r.appendChild(h);
    const p = document.createElement("input");
    p.type = "hidden", p.name = this.settings.name, p.className = "inp-imagemask", p.value = "", s.appendChild(p);
    const f = document.createElement("canvas");
    f.className = "imagemask";
    const y = f.getContext("2d", {
      willReadFrequently: !0
    }), _ = document.createElement("canvas"), g = _.getContext("2d", {
      willReadFrequently: !0
    }), v = this.element.querySelector(".inp-imagemask"), m = (E) => {
      const I = document.createElement("canvas"), D = I.getContext("2d", {
        willReadFrequently: !0
      });
      I.width = E.width, I.height = E.height, D.clearRect(0, 0, E.width, E.height), D.fillStyle = "black", D.fillRect(0, 0, E.width, E.height), D.drawImage(E, 0, 0);
      const F = I.toDataURL("image/png");
      let Y = document.querySelector(".imagemask-output");
      Y || (Y = document.createElement("img"), Y.className = "imagemask-output", document.body.appendChild(Y)), Y.src = F, this.empty || (v.value = F);
    };
    let b = [], w = [];
    const x = () => {
      b.push(_.toDataURL()), b.length > 10 && b.shift(), w = [];
    }, k = (E) => {
      const I = new Image();
      I.src = E, I.onload = () => {
        y.clearRect(0, 0, f.width, f.height), y.drawImage(I, 0, 0, f.width, f.height), g.clearRect(0, 0, _.width, _.height), g.drawImage(I, 0, 0, _.width, _.height), m(_);
      };
    };
    f.addEventListener("mousedown", () => {
      x();
    }), u.addEventListener("click", (E) => {
      E.preventDefault(), b.length > 0 && (w.push(f.toDataURL()), k(b.pop()));
    }), d.addEventListener("click", (E) => {
      E.preventDefault(), w.length > 0 && (b.push(f.toDataURL()), k(w.pop()));
    });
    const S = document.createElement("img");
    n.appendChild(S), n.appendChild(f), this.loaded = () => {
      n.style.display = "flex";
      const E = document.querySelector(".imagemask-controls");
      E.style.display = "flex", e.style.display = "flex", R(), b = [], w = [], y.clearRect(0, 0, f.width, f.height), g.clearRect(0, 0, _.width, _.height), this.empty = !0, v.value = "";
      try {
        m(_);
      } catch {
      }
    }, S.onload = () => {
      this.loaded();
    };
    let T = null, C = null;
    const R = () => {
      f.width > 0 && f.height > 0 && (T = y.getImageData(0, 0, f.width, f.height), C = g.getImageData(0, 0, _.width, _.height));
      const E = S.offsetWidth, I = S.offsetHeight, D = window.devicePixelRatio || 1;
      f.width = E * D, f.height = I * D, y.scale(D, D), f.style.width = `${E}px`, f.style.height = `${I}px`;
      const F = S.naturalWidth, Y = S.naturalHeight;
      if (_.width = F * D, _.height = Y * D, g.scale(D, D), _.style.width = `${F}px`, _.style.height = `${Y}px`, T) {
        const V = document.createElement("canvas");
        V.width = T.width, V.height = T.height, V.getContext("2d").putImageData(T, 0, 0);
        const oe = document.createElement("canvas");
        oe.width = C.width, oe.height = C.height, oe.getContext("2d").putImageData(C, 0, 0), y.drawImage(V, 0, 0, T.width, T.height, 0, 0, f.width, f.height), g.drawImage(oe, 0, 0, C.width, C.height, 0, 0, _.width, _.height);
      }
    };
    let L = !1, $ = parseInt(l.value, 10);
    l.addEventListener("input", (E) => {
      $ = parseInt(E.target.value, 10);
    });
    const O = (E) => {
      const I = f.getBoundingClientRect();
      if (E.touches) {
        const D = E.touches[0];
        return {
          x: D.clientX - I.left,
          y: D.clientY - I.top
        };
      }
      return {
        x: E.clientX - I.left,
        y: E.clientY - I.top
      };
    }, N = (E) => {
      L = !0, q(E);
    }, A = () => {
      L = !1, y.beginPath(), this.empty = !1, m(_);
    }, q = (E) => {
      if (!L) return;
      const {
        x: I,
        y: D
      } = O(E), F = _.width / f.width, Y = _.height / f.height, V = I * F, fe = D * Y;
      y.fillStyle = "rgb(255, 255, 255)", y.beginPath(), y.arc(I, D, $ / 2, 0, Math.PI * 2), y.fill(), g.fillStyle = "rgb(255, 255, 255)", g.beginPath(), g.arc(V, fe, $ / 2 * F, 0, Math.PI * 2), g.fill();
    };
    f.addEventListener("mousedown", N), f.addEventListener("mouseup", A), f.addEventListener("mousemove", q), f.addEventListener("touchstart", (E) => {
      N(E), E.preventDefault();
    }, {
      passive: !1
    }), f.addEventListener("touchend", (E) => {
      A(), E.preventDefault();
    }), f.addEventListener("touchmove", (E) => {
      q(E), E.preventDefault();
    }, {
      passive: !1
    }), c.addEventListener("click", (E) => {
      E.preventDefault(), x(), y.clearRect(0, 0, f.width, f.height), g.clearRect(0, 0, _.width, _.height), this.empty = !0, v.value = "", m(_);
    }), window.addEventListener("resize", R);
    const M = (E) => {
      E ? (e.setAttribute("aria-modal", "true"), e.setAttribute("role", "dialog"), e.classList.add("fullscreen"), t.style.display = "block", i.style.display = "flex", h.style.display = "none") : (e.removeAttribute("aria-modal"), e.removeAttribute("role"), e.classList.remove("fullscreen"), t.style.display = "none", i.style.display = "none", h.style.display = ""), R();
    };
    h.addEventListener("click", (E) => {
      E.preventDefault(), M(!0);
    }), i.addEventListener("click", (E) => {
      E.preventDefault(), M(!1);
    }), document.addEventListener("keydown", (E) => {
      E.key === "Escape" && M(!1);
    });
  }
}
class qo {
  constructor(e, t = {}) {
    const i = {
      lang: [],
      headers: {},
      fileUploadText: "Drag and drop your file here.",
      multiFileUploadText: "Drag and drop your files here.",
      model: "gpt-4o-mini",
      model2: "gpt-4o-mini",
      // onChange: (json)=>{},
      // onSubmit: (e) => { },
      // onUsage: (cost => { },
      sendCommandUrl: "/sendcommand",
      sendCommandStreamUrl: "/getstream",
      // searchCommandUrl: '',
      // scrapeCommandUrl: '',
      consoleLog: !1,
      saveResults: !1,
      disableMediaGeneration: !1,
      disableMediaGenerationTitle: "Demo Info",
      disableMediaGenerationMessage: "This is an online demo and media generation is currently disabled. Get the full version for complete functionality.",
      //'AI media generation is currently disabled, so your request cannot be processed.',
      submitText: "Submit",
      resetText: "Reset",
      scrapeProvider: "firecrawl",
      scrapeLimit: 6,
      scrapeExclude: ["youtube.com", "reddit.com", "microsoft.com", "mozilla.org"],
      // Domains to exclude
      inputCost: 0.15,
      // gpt-4o-mini (per million token)
      outputCost: 0.6,
      _2dIllustrationStyleId: "bcaa0104-98ef-4cb8-a012-124dad015756",
      // templatesUrl: '/templates.json',
      templateFilters: ["all", "image", "video", "audio", "text"],
      // 'web', 
      templatesConfig: {
        fal: !0,
        replicate: !1,
        web: !1
      },
      // templateButtons: {
      //     viewButton: {
      //         text: 'View'
      //     },
      //     useButton:  {
      //         text: 'Clone'
      //     },
      // },
      defaultMediaGenerationProvider: "fal",
      replicateEndpoint1: "https://api.replicate.com/v1/predictions",
      // use with version
      replicateEndpoint2: "https://api.replicate.com/v1/models/{MODEL}/predictions",
      // These configuration only used if the server is using API request (without SDK)
      // A validation to check if endpoint config starts with 'https://queue.fal.run' is needed on the server side.
      falStatusEndpoint: "https://queue.fal.run/{MODEL}/requests/{REQUEST_ID}/status",
      falResultEndpoint: "https://queue.fal.run/{MODEL}/requests/{REQUEST_ID}",
      replicateStatusEndpoint: "https://api.replicate.com/v1/predictions/{REQUEST_ID}",
      modelFallback: !1,
      defaultModels: {
        image_generation: {
          openai: ["gpt-image-1"]
        },
        image_variation_generation: {
          openai: ["gpt-image-1"]
        },
        text_to_image_generation: {
          fal: ["fal-ai/flux-1/schnell", "fal-ai/flux-1/dev", "fal-ai/flux-pro/v1.1", "fal-ai/flux-pro/v1.1-ultra", "fal-ai/recraft-v3", "fal-ai/recraft-20b", "fal-ai/ideogram/v2a", "fal-ai/hidream-i1-fast", "fal-ai/hidream-i1-dev", "fal-ai/hidream-i1-full", "fal-ai/gemini-flash-edit/multi"],
          replicate: ["black-forest-labs/flux-schnell", "black-forest-labs/flux-dev", "black-forest-labs/flux-1.1-pro", "black-forest-labs/flux-1.1-pro-ultra", "recraft-ai/recraft-v3", "ideogram-ai/ideogram-v2a"],
          google: ["gemini-2.0-flash-exp-image-generation"],
          openai: ["gpt-image-1"]
        },
        image_to_video_generation: {
          fal: ["fal-ai/kling-video/v1.6/standard/image-to-video", "fal-ai/kling-video/v1.6/pro/image-to-video", "fal-ai/kling-video/v2.1/standard/image-to-video", "fal-ai/kling-video/v2.1/pro/image-to-video", "fal-ai/kling-video/v2.1/master/image-to-video", "fal-ai/minimax/video-01-live/image-to-video", "fal-ai/luma-dream-machine/ray-2/image-to-video"],
          replicate: ["kwaivgi/kling-v1.6-standard", "kwaivgi/kling-v1.6-pro", "minimax/video-01-live", "luma/ray"]
        },
        text_to_video_generation: {
          fal: ["fal-ai/kling-video/v1.6/standard/text-to-video", "fal-ai/kling-video/v2.1/master/text-to-video", "fal-ai/minimax/video-01-live ", "fal-ai/luma-dream-machine/ray-2"],
          replicate: ["kwaivgi/kling-v1.6-standard", "minimax/video-01", "luma/ray"]
        },
        upscale_image: {
          fal: ["fal-ai/clarity-upscaler"],
          replicate: ["recraft-ai/recraft-crisp-upscale"]
        },
        describe_image: {
          fal: ["fal-ai/any-llm/vision"],
          replicate: [
            // 'daanelson/minigpt-4:e447a8583cffd86ce3b93f9c2cd24f2eae603d99ace6afa94b33a08e94a3cd06'
            // 'lucataco/moondream2:72ccb656353c348c1385df54b237eeb7bfa874bf11486cf0b9473e691b662d31'
            // 'yorickvp/llava-v1.6-vicuna-13b:0603dec596080fa084e26f0ae6d605fc5788ed2b1a0358cd25010619487eae63'
            // 'yorickvp/llava-13b:80537f9eead1a5bfa72d5ac6ea6414379be41d4d4f6679fd776e9535d1eb58bb' // note
          ]
        },
        edit_area_in_image: {
          fal: [
            "fal-ai/flux-pro/v1/fill"
            // 'fal-ai/flux-lora-fill',
            // 'fal-ai/ideogram/v2/edit',
          ],
          replicate: [
            "black-forest-labs/flux-fill-pro"
            // 'black-forest-labs/flux-fill-dev',
          ],
          google: ["gemini-2.0-flash-exp-image-generation"],
          openai: ["gpt-image-1"]
        },
        edit_image: {
          // will be used if no selection mask (see media.js)
          fal: ["fal-ai/gemini-flash-edit"],
          replicate: [
            // not available
          ],
          openai: ["gpt-image-1"]
        },
        text_to_2d_illustration_generation: {
          fal: ["fal-ai/recraft-v3"],
          replicate: [
            // not available
          ]
        },
        text_to_digital_illustration_generation: {
          fal: ["fal-ai/recraft-v3"],
          replicate: ["recraft-ai/recraft-v3"]
        },
        text_to_book_cover_generation: {
          fal: ["fal-ai/recraft-v3"],
          replicate: [
            // not available
          ]
        },
        text_to_speech: {
          fal: [
            "fal-ai/elevenlabs/tts/multilingual-v2"
            // 'fal-ai/kokoro/american-english'
          ],
          replicate: ["jaaari/kokoro-82m:f559560eb822dc509045f3921a1921234918b91739db4bf3daab2169b71c7a13"]
        }
      },
      ttsMaxCharacters: 3e3,
      // characters
      alwaysVisibleSubmit: !1
    };
    this.settings = Object.assign({}, i, t), this.listeners = {}, window._txt && (this.settings.lang = window._txt), this.steps = [];
    let s = this.settings.onChange;
    if (this.settings.onChange = (n) => {
      s && s.call(this, n);
    }, !e)
      throw new Error("A valid DOM element is required.");
    e.classList.add("formview-container"), e.classList.add("fb-ui"), this.element = e, this.media = new Ao({
      lang: this.settings.lang
    }, this), this.upload = new Mo({
      lang: this.settings.lang
    }, this);
  }
  //constructor
  on(e, t) {
    return this.listeners[e] || (this.listeners[e] = /* @__PURE__ */ new Set()), this.listeners[e].add(t), this;
  }
  off(e, t) {
    this.listeners[e] && this.listeners[e].delete(t);
  }
  trigger(e, t) {
    this.listeners[e] && this.listeners[e].forEach((i) => i(t));
  }
  async loadTemplates() {
    if (!this.settings.templatesUrl) {
      console.log(this.out("Template URL is not set."));
      return;
    }
    let e = document.querySelector(this.settings.templatesSelector);
    if (e) {
      e.classList.remove("hidden"), e.classList.add("formtemplates-container"), e.classList.add("fb-ui");
      let s = (await (await fetch(this.settings.templatesUrl, {
        method: "GET"
      })).json()).data;
      e.innerHTML = "", s = s.filter((c) => {
        const h = c.supports || [];
        if (h.length === 0) return !0;
        const {
          fal: p,
          replicate: f,
          web: y,
          openai: _,
          google: g
        } = this.settings.templatesConfig;
        return !y && h.includes("web") || !g && h.includes("google") || !_ && h.includes("openai") ? !1 : !p && !f ? !(h.includes("fal") || h.includes("replicate")) : !p && h.includes("fal") ? h.includes("replicate") : !f && h.includes("replicate") ? h.includes("fal") : !0;
      });
      const r = this.settings.templateFilters, o = {
        all: {
          desc: this.out("All")
        },
        image: {
          desc: this.out("Image")
        },
        video: {
          desc: this.out("Video")
        },
        audio: {
          desc: this.out("Audio")
        },
        web: {
          desc: this.out("Web")
        },
        text: {
          desc: this.out("Text")
        }
      }, l = document.createElement("div");
      l.className = "app-filters", e.appendChild(l);
      const u = document.createElement("ul");
      u.className = "app-list", e.appendChild(u);
      const d = (c) => {
        let h = s.filter((f) => c === "all" || f.categories.includes(c));
        const p = this.settings.templateOutput || ["image", "video", "audio", "text"];
        h = h.filter((f) => f.categories.every((y) => p.includes(y))), this.renderList(h, u);
      };
      r.forEach((c) => {
        const h = document.createElement("button");
        h.textContent = o[c].desc, h.setAttribute("data-value", c), c === "all" && h.classList.add("active"), h.addEventListener("click", () => {
          l.querySelectorAll("button").forEach((f) => f.classList.remove("active")), h.classList.add("active"), d(c);
        }), l.appendChild(h);
      }), d("all");
    }
  }
  //NEW
  //------ Select Image Support -------
  async selectFile(e) {
    const t = this.element.querySelector(".file-input-wrapper");
    if (!t) return;
    const i = t.querySelector('input[type="file"]');
    if (!i || !this.acceptsImagesOnly(i))
      return;
    let s;
    e.startsWith("http") ? s = this.settings.viewFileUrl + "?url=" + e : s = e;
    const r = await (await fetch(s)).blob(), o = new File([r], e.split("/").pop(), {
      type: r.type
    });
    this.element.querySelector(".div-selected-preview") || (this.selectedFiles = []), i && i.hasAttribute("multiple") ? this.selectedFiles.some((d) => d.name === o.name) || this.selectedFiles.push(o) : this.selectedFiles = [o], this.setSelectedFiles(this.selectedFiles), this.renderSelectedFiles(), t.closest(".image-mask") && this.objImageMask && this.objImageMask.loadImage(o);
  }
  setSelectedFiles(e) {
    this.selectedFiles = e;
    const t = this.element.querySelector('input[type="file"]');
    t && t.removeAttribute("required");
  }
  renderSelectedFiles() {
    const e = this.element.querySelector(".file-input-wrapper");
    if (!e) return;
    let t = this.element.querySelector(".div-selected-preview");
    t ? t.innerHTML = "" : (t = document.createElement("div"), t.classList.add("div-selected-preview"), e.appendChild(t)), this.clearFileInput(), this.selectedFiles && this.selectedFiles.forEach((i, s) => {
      const n = document.createElement("div"), r = document.createElement("img");
      r.src = URL.createObjectURL(i);
      const o = document.createElement("button");
      o.innerHTML = `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.4"  stroke-linecap="round"  stroke-linejoin="round"  class="">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>`, o.addEventListener("click", () => {
        this.selectedFiles.splice(s, 1), this.setSelectedFiles(this.selectedFiles), this.renderSelectedFiles(), e.closest(".image-mask") && this.objImageMask && this.objImageMask.clearImage();
      }), n.appendChild(r), n.appendChild(o), t.appendChild(n);
    });
  }
  clearSelectedFiles() {
    this.selectedFiles = [], this.setSelectedFiles(this.selectedFiles);
    let e = this.element.querySelector(".div-selected-preview");
    e && (e.innerHTML = "");
  }
  clearFileInput() {
    const e = this.element.querySelector(".file-input-wrapper");
    if (!e) return;
    const t = e.querySelector('input[type="file"]');
    if (!t) return;
    try {
      if (t.value = "", t.files && t.files.length > 0) {
        const l = new DataTransfer();
        t.files = l.files;
      }
    } catch {
    }
    const i = e.querySelector(".file-drop-info-highlight");
    i && (i.innerHTML = "");
    const s = e.querySelector(".img-preview");
    s && s.remove();
    const n = e.querySelector(".file-preview-container");
    n && (n.innerHTML = "");
    const r = e.querySelector(".btn-clearphoto");
    r && r.click();
    const o = this.element.querySelector('input[type="file"]');
    o && o.removeAttribute("required");
  }
  acceptsImagesOnly(e) {
    const t = (e.getAttribute("accept") || "").split(",").map((i) => i.trim());
    return t.length === 0 ? !1 : t.every((i) => i.startsWith("image/") || i === "image/*");
  }
  //------
  // Render templates
  renderList(e, t) {
    t.innerHTML = "", e.forEach((i) => {
      if (i.name) {
        const s = document.createElement("li");
        t.appendChild(s);
        const n = document.createElement("a");
        n.setAttribute("href", "#");
        let r = this.settings.assetsFolder, o = i.form.thumbnail, l = "";
        if (r && o) {
          let h = r + o;
          l = `<img class="thumbnail" src="${h}" alt="${i.name}" />`, i.form.thumbnailFit && (l = `<img class="thumbnail" style="object-fit:${i.form.thumbnailFit}" src="${h}" alt="${i.name}" />`);
        }
        const u = document.createElement("div");
        u.className = "div-template-buttons";
        let d = !1, c = !1;
        if (this.settings.templateButtons && this.settings.templateButtons.viewButton && this.settings.templateButtons.viewButton.text) {
          const h = document.createElement("button");
          h.className = "btn-template-view", h.innerText = this.out(this.settings.templateButtons.viewButton.text), u.appendChild(h), h.addEventListener("click", (p) => {
            if (p.preventDefault(), this.isGenerating) {
              alert(this.out("Please wait until generation is complete."));
              return;
            }
            this.settings.onSelectTemplate && this.settings.onSelectTemplate(i), this.trigger("templateView", i);
          }), d = !0;
        }
        if (this.settings.templateButtons && this.settings.templateButtons.useButton && this.settings.templateButtons.useButton.text) {
          const h = document.createElement("button");
          h.className = "btn-template-use", h.innerText = this.out(this.settings.templateButtons.useButton.text), u.appendChild(h), h.addEventListener("click", (p) => {
            p.preventDefault(), this.settings.onSelectTemplate && this.settings.onSelectTemplate(i), this.trigger("templateUse", i);
          }), c = !0;
        }
        n.innerHTML = `
                    ${l}
                    <div class="card-text">
                        <div class="title">${i.name}</div>
                        <div class="description">${i.form.description}</div>
                        ${i.info ? ` <div class="info mt-1">${i.info}</div>` : ""}
                    </div>
                `, d || c ? (n.querySelector(".card-text").appendChild(u), n.classList.remove("cursor-pointer"), n.classList.add("cursor-default")) : (n.classList.add("cursor-pointer"), n.classList.remove("cursor-default")), s.appendChild(n), d || c || n.addEventListener("click", (h) => {
          if (h.preventDefault(), this.isGenerating) {
            alert(this.out("Please wait until generation is complete."));
            return;
          }
          this.settings.onSelectTemplate && this.settings.onSelectTemplate(i), this.trigger("templateSelect", i);
        });
      }
    });
  }
  addResultTool() {
    const e = document.querySelector(this.settings.resultSelector);
    if (!e) return;
    let t = e.innerHTML;
    const s = new DOMParser().parseFromString(t, "text/html"), n = s.querySelector(".result-tool");
    n && n.remove(), s.querySelectorAll(".link-view, .link-download, video, audio").forEach((h) => {
      h.remove();
    });
    let o = !1;
    s.body.innerText.trim() === "" && (o = !0);
    const u = document.createElement("div");
    u.className = "result-tool", e.appendChild(u);
    const d = document.createElement("button");
    d.className = "btn-result-tool", d.innerHTML = `
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.2"  stroke-linecap="round"  stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" /><path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
        </svg>
        <span>${this.out("Copy")}</span>
        `, o || u.appendChild(d);
    const c = document.createElement("button");
    c.className = "btn-result-tool", c.innerHTML = `
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.2"  stroke-linecap="round"  stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
        </svg>
        <span>${this.out("Clear")}</span>
        `, u.appendChild(c), d && d.addEventListener("click", (h) => {
      h.preventDefault();
      const p = e.cloneNode(!0), f = p.querySelector(".result-tool");
      f && f.remove(), p.querySelectorAll(".link-view, .link-download").forEach((g) => {
        g.remove();
      }), p.style.position = "fixed", p.style.left = "-9999px", document.body.appendChild(p);
      const _ = p.innerText.trim();
      document.body.removeChild(p), navigator.clipboard.writeText(_), d.innerHTML = `
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.2"  stroke-linecap="round"  stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path stroke="none" d="M0 0h24v24H0z" /><path d="M7 9.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" /><path d="M4.012 16.737a2 2 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" /><path d="M11 14l2 2l4 -4" />
            </svg>
            <span>${this.out("Copied")}</span>
            `, setTimeout(() => {
        d.innerHTML = `
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.2"  stroke-linecap="round"  stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" /><path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
                </svg>
                <span>${this.out("Copy")}</span>
                `;
      }, 600);
    }), c.addEventListener("click", (h) => {
      h.preventDefault(), localStorage.removeItem("_results"), localStorage.removeItem("_results_html"), e.innerHTML = "";
    });
  }
  getScrollableParent(e) {
    for (; e.parentElement; ) {
      const i = window.getComputedStyle(e.parentElement).overflowY;
      if ((i === "auto" || i === "scroll") && e.parentElement.scrollHeight > e.parentElement.clientHeight)
        return e.parentElement;
      e = e.parentElement;
    }
    return null;
  }
  stickyElement(e) {
    if (!this.settings.alwaysVisibleSubmit) return;
    const t = this.getScrollableParent(e);
    this._scrollListener && (t ? t.removeEventListener("scroll", this._scrollListener) : window.removeEventListener("scroll", this._scrollListener), window.removeEventListener("resize", this._resizeListener));
    let i;
    const s = () => {
      e.style.position = "", t ? i = e.offsetTop + e.offsetHeight - t.offsetTop : i = e.offsetTop + e.offsetHeight;
    }, n = () => {
      if (t)
        if (t.offsetHeight + t.scrollTop > i)
          e.style.position = "", e.style.top = "";
        else {
          const l = window.innerHeight - e.offsetHeight;
          e.style.position = "fixed", e.style.top = `${l}px`;
        }
      else if (window.innerHeight + window.scrollY > i)
        e.style.position = "", e.style.top = "";
      else {
        const l = window.innerHeight - e.offsetHeight;
        e.style.position = "fixed", e.style.top = `${l}px`;
      }
      e.parentNode.offsetWidth !== 0 && (e.style.width = `${e.parentNode.offsetWidth}px`);
    };
    this._scrollListener = n;
    let r;
    this._resizeListener = () => {
      r && clearTimeout(r), r = setTimeout(() => {
        let o = null;
        const l = () => {
          const u = e.offsetTop;
          u === o ? (s(), n()) : (o = u, requestAnimationFrame(l));
        };
        l();
      }, 200);
    }, s(), n(), t ? t.addEventListener("scroll", n) : window.addEventListener("scroll", n), window.addEventListener("resize", this._resizeListener);
  }
  view(e) {
    if (!e) return;
    let t;
    try {
      t = JSON.parse(e);
    } catch {
      console.log("Invalid JSON Form.");
      return;
    }
    this.json = t, this.inputListener = () => {
      clearTimeout(this.debounceTimeout), this.debounceTimeout = setTimeout(() => {
        const n = this.getFormValues();
        this.settings.onInputChange && this.settings.onInputChange(n);
      }, 300);
    }, this.changeListener = () => {
      const n = this.getFormValues();
      this.settings.onInputChange && this.settings.onInputChange(n);
    };
    let i;
    if (this.settings.isBuilder) {
      if (!this.settings.previewSelector) {
        this.settings.consoleLog && console.log("previewSelector not set.");
        return;
      }
      i = document.querySelector(this.settings.previewSelector);
    } else
      i = this.element;
    if (i) {
      if (i.classList.remove("hidden"), i.classList.add("formview-container"), i.classList.add("fb-ui"), i.innerHTML = "", !(t.hideHeader || !1)) {
        const c = document.createElement("div");
        c.className = "form-header", i.appendChild(c);
        const h = document.createElement("h1");
        h.className = "form-title", h.innerText = t.title || this.out("Your Form Title Here"), c.appendChild(h);
        const p = document.createElement("p");
        p.className = "form-desc", p.innerText = t.description || this.out("Your Description Here"), c.appendChild(p);
      }
      let r;
      this.settings.isBuilder ? r = document.createElement("form") : r = document.createElement("div"), r.className = "form-wrapper", r.style.flexFlow = "wrap", i.appendChild(r);
      let o = 1;
      t.elements && t.elements.forEach((c) => {
        if (c.type === "spacer") {
          const g = document.createElement("div");
          g.className = "form-spacer", c.spacerHeight && !isNaN(parseFloat(c.spacerHeight)) && (g.style.height = c.spacerHeight + "px"), c.displayInOutput || r.appendChild(g);
          return;
        }
        if (c.type === "separator") {
          const g = document.createElement("hr");
          g.style.borderTopColor = c.color, c.displayInOutput || r.appendChild(g);
          return;
        }
        if (c.type === "html") {
          if (c.html) {
            const g = document.createElement("div");
            g.innerHTML = c.html, c.displayInOutput || r.appendChild(g);
          }
          return;
        }
        if (c.type === "heading") {
          const g = document.createElement(c.heading || "h2");
          g.innerHTML = c.headingText || this.out("Your Heading Here!"), c.displayInOutput || r.appendChild(g);
          return;
        }
        if (c.type === "paragraph") {
          const g = document.createElement("p");
          g.innerHTML = c.paragraphText || this.out("Your paragraph content here!"), c.displayInOutput || r.appendChild(g);
          return;
        }
        if (c.type === "media") {
          if (c.tag === "video") {
            const g = document.createElement("video");
            g.style.width = "100%", g.style.height = "auto", g.controls = !0;
            var h = document.createElement("source");
            h.src = c.url, h.type = "video/mp4", g.appendChild(h), c.displayInOutput || r.appendChild(g);
          } else if (c.tag === "audio") {
            const g = document.createElement("audio");
            g.controls = !0;
            let v = document.createElement("source");
            v.src = c.url, v.type = "audio/mp3", g.appendChild(v), c.displayInOutput || r.appendChild(g);
          } else if (c.tag === "img") {
            const g = document.createElement("img");
            g.src = c.url, g.setAttribute("alt", this.out("Output Image")), c.displayInOutput || r.appendChild(g);
          }
          return;
        }
        if (c.type === "image") {
          const g = document.createElement("img");
          g.src = c.url, g.setAttribute("alt", this.out("Output Image")), c.displayInOutput || r.appendChild(g);
          return;
        }
        if (c.type === "video") {
          const g = document.createElement("video");
          g.style.width = "100%", g.style.height = "auto", g.controls = !0;
          let v = document.createElement("source");
          v.src = c.url, v.type = "video/mp4", g.appendChild(v), c.displayInOutput || r.appendChild(g);
          return;
        }
        if (c.type === "audio") {
          const g = document.createElement("audio");
          g.controls = !0;
          let v = document.createElement("source");
          v.src = c.url, v.type = "audio/mp3", g.appendChild(v), c.displayInOutput || r.appendChild(g);
          return;
        }
        const p = document.createElement("div");
        p.className = "form-field", c.type === "hidden" && (p.className = "hidden"), c.displayInOutput || r.appendChild(p), c.type === "color" && p.classList.add("field-color");
        const f = c.type;
        let y = c.name;
        if (r.querySelector(`[name="${y}"]`) && (o++, y = y + "_" + o), f === "short-text") {
          let g = this.getId();
          const v = document.createElement("label");
          if (v.setAttribute("for", `short_text_label_${g}`), v.className = "field-label", v.innerHTML = c.title + (c.isRequired ? ' <span class="text-red-500">*</span>' : ""), p.appendChild(v), c.fieldNote) {
            const b = document.createElement("div");
            b.className = "field-note", b.innerHTML = c.fieldNote, p.appendChild(b);
          }
          const m = document.createElement("input");
          m.id = `short_text_label_${g}`, m.type = "text", m.name = y, m.value = c.value || "", m.className = "inp-base", m.placeholder = c.placeholder, c.isRequired && m.setAttribute("required", "required"), p.appendChild(m), m.addEventListener("input", this.inputListener);
        }
        if (f === "long-text") {
          let g = this.getId();
          const v = document.createElement("label");
          if (v.setAttribute("for", `long_text_label_${g}`), v.className = "field-label", v.innerHTML = c.title + (c.isRequired ? ' <span class="text-red-500">*</span>' : ""), p.appendChild(v), c.fieldNote) {
            const b = document.createElement("div");
            b.className = "field-note", b.innerHTML = c.fieldNote, p.appendChild(b);
          }
          const m = document.createElement("textarea");
          m.id = `long_text_label_${g}`, m.name = y, m.value = c.value || "", m.className = "inp-base", m.style.height = c.height + "px", m.placeholder = c.placeholder, c.isRequired && m.setAttribute("required", "required"), p.appendChild(m), m.addEventListener("input", this.inputListener);
        }
        if (f === "number") {
          let g = this.getId();
          const v = document.createElement("label");
          if (v.setAttribute("for", `number_label_${g}`), v.className = "field-label", v.innerHTML = c.title + (c.isRequired ? ' <span class="text-red-500">*</span>' : ""), p.appendChild(v), c.fieldNote) {
            const b = document.createElement("div");
            b.className = "field-note", b.innerHTML = c.fieldNote, p.appendChild(b);
          }
          const m = document.createElement("input");
          m.id = `number_label_${g}`, m.type = "number", m.name = y, m.value = c.value || "", m.className = "inp-base", m.placeholder = c.placeholder, c.isRequired && m.setAttribute("required", "required"), p.appendChild(m), m.addEventListener("input", this.inputListener);
        }
        if (f === "slider") {
          p.classList.add("input-slider");
          let g = this.getId();
          const v = document.createElement("label");
          if (v.setAttribute("for", `number_label_${g}`), v.className = "field-label", v.innerHTML = c.title + (c.isRequired ? ' <span class="text-red-500">*</span>' : ""), p.appendChild(v), c.fieldNote) {
            const T = document.createElement("div");
            T.className = "field-note", T.innerHTML = c.fieldNote, p.appendChild(T);
          }
          const m = document.createElement("div");
          m.className = "slider-container", p.appendChild(m);
          const b = document.createElement("div");
          b.className = "slider-values", m.appendChild(b);
          const w = document.createElement("span");
          b.appendChild(w), w.innerText = c.minValue;
          const x = document.createElement("span");
          b.appendChild(x), x.innerText = c.maxValue;
          const k = document.createElement("input");
          k.id = `number_label_${g}`, k.type = "range", k.name = y, k.setAttribute("min", c.minValue), k.setAttribute("max", c.maxValue), k.setAttribute("step", c.step), k.setAttribute("value", c.value || 0), m.appendChild(k);
          const S = document.createElement("div");
          S.className = "current-value", m.appendChild(S), m.querySelector(".current-value").textContent = c.value || 0, k.addEventListener("input", () => {
            m.querySelector(".current-value").textContent = k.value;
          });
        }
        if (f === "select") {
          let g = this.getId();
          const v = document.createElement("div");
          if (v.id = `radio_group_label_${g}`, v.className = "field-label-normal", v.innerHTML = c.title + (c.isRequired ? ' <span class="text-red-500">*</span>' : ""), p.appendChild(v), c.fieldNote) {
            const b = document.createElement("div");
            b.className = "field-note", b.innerHTML = c.fieldNote, p.appendChild(b);
          }
          const m = document.createElement("div");
          if (m.setAttribute("aria-labelledby", `radio_group_label_${g}`), m.setAttribute("role", "group"), m.className = "div-options", p.appendChild(m), c.choices && c.choices.forEach((b, w) => {
            let x = b;
            c.choicesText && (x = c.choicesText[w] || b);
            const k = document.createElement("label");
            k.setAttribute("for", `${g}_${w}`), k.className = "option-label", m.appendChild(k);
            const S = document.createElement("input");
            S.type = "radio", S.className = "peer", S.id = `${g}_${w}`, S.name = y, S.value = b, k.appendChild(S), w === c.selected && (S.checked = !0);
            const T = document.createElement("span");
            T.className = "peer-span-rounded", k.appendChild(T);
            const C = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z"></path></svg>';
            T.innerHTML = C, w === 0 && c.isRequired && S.setAttribute("required", "required");
            const R = document.createElement("span");
            R.innerText = x, k.appendChild(R), S.addEventListener("change", this.changeListener);
          }), c.showOtherItem) {
            const b = document.createElement("label");
            b.setAttribute("for", g + "_other"), b.className = "option-label", m.appendChild(b);
            const w = document.createElement("input");
            w.type = "radio", w.className = "peer", w.id = g + "_other", w.name = y, w.value = "other", b.appendChild(w);
            const x = document.createElement("span");
            x.className = "peer-span-rounded", b.appendChild(x);
            const k = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z"></path></svg>';
            x.innerHTML = k;
            const S = document.createElement("span");
            S.innerText = c.otherText, b.appendChild(S);
            const T = document.createElement("div");
            p.appendChild(T);
            const C = document.createElement("input");
            C.type = "text", C.name = y + "_other", C.className = "inp-base", T.appendChild(C), w.addEventListener("change", this.changeListener), C.addEventListener("input", this.inputListener);
          }
        }
        if (f === "multi-select") {
          let g = this.getId();
          const v = document.createElement("div");
          if (v.id = `checkbox_group_label_${g}`, v.className = "field-label-normal", v.innerHTML = c.title + (c.isRequired ? ' <span class="text-red-500">*</span>' : ""), p.appendChild(v), c.fieldNote) {
            const b = document.createElement("div");
            b.className = "field-note", b.innerHTML = c.fieldNote, p.appendChild(b);
          }
          const m = document.createElement("div");
          if (m.setAttribute("aria-labelledby", `checkbox_group_label_${g}`), m.setAttribute("role", "group"), m.className = "div-options", p.appendChild(m), c.choices && c.choices.forEach((b, w) => {
            let x = b;
            c.choicesText && (x = c.choicesText[w] || b);
            const k = document.createElement("label");
            k.setAttribute("for", `${g}_${w}`), k.className = "option-label", m.appendChild(k);
            const S = document.createElement("input");
            S.type = "checkbox", S.className = "peer", S.id = `${g}_${w}`, S.name = y + "[]", S.value = b, k.appendChild(S);
            const T = document.createElement("span");
            T.className = "peer-span-square", k.appendChild(T);
            const C = `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="4"  stroke-linecap="round"  stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" />
                            </svg>`;
            T.innerHTML = C;
            const R = document.createElement("span");
            R.innerText = x, k.appendChild(R), S.addEventListener("change", this.changeListener);
          }), c.showOtherItem) {
            const b = document.createElement("label");
            b.setAttribute("for", g + "_other"), b.className = "option-label", m.appendChild(b);
            const w = document.createElement("input");
            w.type = "checkbox", w.className = "peer", w.id = g + "_other", w.name = y, w.value = "other", b.appendChild(w);
            const x = document.createElement("span");
            x.className = "peer-span-square", b.appendChild(x);
            const k = `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="4"  stroke-linecap="round"  stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" />
                        </svg>`;
            x.innerHTML = k;
            const S = document.createElement("span");
            S.innerText = c.otherText, b.appendChild(S);
            const T = document.createElement("div");
            p.appendChild(T);
            const C = document.createElement("input");
            C.type = "text", C.name = y + "_other", C.className = "inp-base", T.appendChild(C), w.addEventListener("change", this.changeListener), C.addEventListener("input", this.inputListener);
          }
        }
        if (f === "switch") {
          let g = this.getId();
          const v = document.createElement("label");
          if (v.className = "field-label", v.innerHTML = c.title + (c.isRequired ? ' <span class="text-red-500">*</span>' : ""), v.id = `switch_${g}`, p.appendChild(v), c.fieldNote) {
            const k = document.createElement("div");
            k.className = "field-note", k.innerHTML = c.fieldNote, p.appendChild(k);
          }
          const m = document.createElement("div");
          m.className = "switch", m.tabIndex = 0, m.role = "switch", m.setAttribute("aria-labelledby", `switch_${g}`), m.setAttribute("aria-checked", "false"), m.setAttribute("data-checked", "false"), p.appendChild(m);
          const b = document.createElement("div");
          b.className = "switch-thumb", m.appendChild(b);
          const w = document.createElement("input");
          w.id = `switch_${g}`, w.type = "text", w.name = y, w.style.cssText = "opacity:0.01;width:1px;height:1px;position:absolute;bottom:0px;left:25px;", w.setAttribute("tabindex", "-1"), c.isRequired && (w.setAttribute("required", "required"), w.setCustomValidity(this.out("Please toggle this switch to proceed."))), m.appendChild(w), c.value === "true" ? (m.setAttribute("aria-checked", "true"), m.setAttribute("data-checked", "true"), w.value = "true", c.isRequired && w.setCustomValidity("")) : (m.setAttribute("aria-checked", "false"), m.setAttribute("data-checked", "false"), w.value = "false", c.isRequired && w.setCustomValidity(this.out("Please toggle this switch to proceed."))), v.addEventListener("click", () => {
            m.focus();
          });
          const x = () => {
            const k = m.getAttribute("aria-checked") === "true";
            m.setAttribute("aria-checked", !k), m.setAttribute("data-checked", !k), k ? (w.value = "false", c.isRequired && w.setCustomValidity(this.out("Please toggle this switch to proceed."))) : (w.value = "true", c.isRequired && w.setCustomValidity(""));
            const S = this.getFormValues();
            this.settings.onInputChange && this.settings.onInputChange(S);
          };
          m.addEventListener("keydown", (k) => {
            (k.key === " " || k.key === "Enter") && (k.preventDefault(), x());
          }), m.addEventListener("click", () => {
            x();
          });
        }
        if (f === "dropdown") {
          let g = this.getId();
          const v = document.createElement("label");
          if (v.setAttribute("for", `dropdown_${g}`), v.className = "field-label", v.innerHTML = c.title + (c.isRequired ? ' <span class="text-red-500">*</span>' : ""), p.appendChild(v), c.fieldNote) {
            const R = document.createElement("div");
            R.className = "field-note", R.innerHTML = c.fieldNote, p.appendChild(R);
          }
          const m = document.createElement("div");
          m.className = "relative", p.appendChild(m);
          const b = document.createElement("div");
          b.className = "relative inline-block", m.appendChild(b);
          const w = document.createElement("select");
          w.id = `dropdown_${g}`, w.name = y, c.isRequired && w.setAttribute("required", "required"), b.appendChild(w);
          const x = document.createElement("option");
          if (x.setAttribute("selected", "selected"), x.setAttribute("disabled", "disabled"), x.value = "", x.innerText = c.placeholder, w.appendChild(x), c.choices && c.choices.forEach((R, L) => {
            let $ = R;
            c.choicesText && ($ = c.choicesText[L] || R);
            const O = document.createElement("option");
            O.value = R, O.innerText = $, w.appendChild(O), L === c.selected && (x.remove(), O.setAttribute("selected", "selected"));
          }), c.showOtherItem) {
            const R = document.createElement("option");
            R.value = "other", R.innerText = c.otherText, w.appendChild(R);
          }
          const k = document.createElement("div");
          k.className = "select-arrow", b.appendChild(k), this.appendHtml(k, `
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                        `);
          const S = document.createElement("input");
          S.type = "text", S.id = `input_other_${g}`, S.name = y + "_other", S.className = "input-other hidden inp-base", p.appendChild(S);
          const T = p.querySelector(`#dropdown_${g}`), C = p.querySelector(`#input_other_${g}`);
          T.addEventListener("change", () => {
            T.value === "other" ? (C.classList.remove("hidden"), C.focus()) : C.classList.add("hidden");
            const R = this.getFormValues();
            this.settings.onInputChange && this.settings.onInputChange(R);
          }), S.addEventListener("input", this.inputListener);
        }
        if (f === "date") {
          let g = this.getId();
          const v = document.createElement("label");
          if (v.setAttribute("for", `date_${g}`), v.className = "field-label", v.innerHTML = c.title + (c.isRequired ? ' <span class="text-red-500">*</span>' : ""), p.appendChild(v), c.fieldNote) {
            const b = document.createElement("div");
            b.className = "field-note", b.innerHTML = c.fieldNote, p.appendChild(b);
          }
          const m = document.createElement("input");
          m.id = `date_${g}`, m.type = "date", m.name = y, m.className = "inp-base", m.placeholder = c.placeholder, c.isRequired && m.setAttribute("required", "required"), p.appendChild(m), m.addEventListener("change", this.changeListener);
        }
        if (f === "time") {
          let g = this.getId();
          const v = document.createElement("label");
          if (v.setAttribute("for", `time_${g}`), v.className = "field-label", v.innerHTML = c.title + (c.isRequired ? ' <span class="text-red-500">*</span>' : ""), p.appendChild(v), c.fieldNote) {
            const b = document.createElement("div");
            b.className = "field-note", b.innerHTML = c.fieldNote, p.appendChild(b);
          }
          const m = document.createElement("input");
          m.id = `time_${g}`, m.type = "time", m.name = y, m.className = "inp-base", m.placeholder = c.placeholder, c.isRequired && m.setAttribute("required", "required"), p.appendChild(m), m.addEventListener("change", this.changeListener);
        }
        if (f === "datetime") {
          let g = this.getId();
          const v = document.createElement("label");
          if (v.setAttribute("for", `datetime_${g}`), v.className = "field-label", v.innerHTML = c.title + (c.isRequired ? ' <span class="text-red-500">*</span>' : ""), p.appendChild(v), c.fieldNote) {
            const b = document.createElement("div");
            b.className = "field-note", b.innerHTML = c.fieldNote, p.appendChild(b);
          }
          const m = document.createElement("input");
          m.id = `datetime_${g}`, m.type = "datetime-local", m.name = y, m.className = "inp-base", m.placeholder = c.placeholder, c.isRequired && m.setAttribute("required", "required"), p.appendChild(m), m.addEventListener("change", this.changeListener);
        }
        if (f === "color") {
          let g = this.getId();
          const v = document.createElement("label");
          if (v.setAttribute("for", `color_${g}`), v.className = "field-label", v.innerHTML = c.title + (c.isRequired ? ' <span class="text-red-500">*</span>' : ""), p.appendChild(v), c.fieldNote) {
            const b = document.createElement("div");
            b.className = "field-note", b.innerHTML = c.fieldNote, p.appendChild(b);
          }
          const m = document.createElement("input");
          m.id = `color_${g}`, m.type = "color", m.name = y, m.value = c.value || "", m.className = "input-color", m.placeholder = c.placeholder, c.isRequired && m.setAttribute("required", "required"), p.appendChild(m), m.addEventListener("input", this.inputListener);
        }
        if (f === "file" || f === "multifile") {
          let g = this.getId();
          const v = document.createElement("label");
          if (v.setAttribute("for", `file_${g}`), v.className = "field-label", v.innerHTML = c.title + (c.isRequired ? ' <span class="text-red-500">*</span>' : ""), p.appendChild(v), c.fieldNote) {
            const P = document.createElement("div");
            P.className = "field-note", P.innerHTML = c.fieldNote, p.appendChild(P);
          }
          const m = document.createElement("div");
          m.className = "file-input-wrapper", f === "file" && m.setAttribute("aria-label", this.out(this.settings.fileUploadText)), f === "multifile" && m.setAttribute("aria-label", this.out(this.settings.multiFileUploadText)), p.appendChild(m);
          const b = document.createElement("input");
          b.id = `input_url_label_${g}`, b.type = "text", b.name = y + "__url", b.value = c.value || "", b.className = "inp-base input-file-url", b.placeholder = c.placeholder || this.out("Enter URL."), p.appendChild(b), b.addEventListener("input", () => {
            const P = p.querySelector(".btn-clearfile");
            P && P.click(), this.inputListener(), b.value !== "" ? c.isRequired && w.removeAttribute("required") : c.isRequired && w.setAttribute("required", "required"), Dt(b.value), this.clearSelectedFiles();
          }), c.useURL ? b.style.display = "" : b.style.display = "none";
          const w = document.createElement("input");
          w.id = `file_${g}`, w.type = "file", f === "multifile" && (w.multiple = !0), w.name = y, c.isRequired && w.setAttribute("required", "required"), w.className = "peer", m.appendChild(w);
          const x = document.createElement("div");
          x.className = "file-drop-area", m.appendChild(x);
          const k = document.createElement("div");
          k.className = "file-controls", k.id = `drag_message_${g}`, m.appendChild(k);
          let S;
          (!c.source || c.source && c.source === "local" || c.source && c.source === "local_and_camera") && (S = document.createElement("div"), S.className = "file-drop-info", f === "file" && (S.innerHTML = this.out(this.settings.fileUploadText)), f === "multifile" && (S.innerHTML = this.out(this.settings.multiFileUploadText)), k.appendChild(S));
          let T;
          (!c.source || c.source && c.source === "local" || c.source && c.source === "local_and_camera") && (T = document.createElement("button"), T.className = "btn-selectfile", T.innerHTML = `
                        <svg style="fill:none"xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon-folder-open"><path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M5 19l2.757 -7.351a1 1 0 0 1 .936 -.649h12.307a1 1 0 0 1 .986 1.164l-.996 5.211a2 2 0 0 1 -1.964 1.625h-14.026a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v2" />
                        </svg>
                        ${this.out("Select File")}
                        `, k.appendChild(T));
          let C;
          (c.source && c.source === "camera" || c.source && c.source === "local_and_camera") && (C = document.createElement("button"), C.className = "btn-takephoto", C.innerHTML = `
                        <svg style="fill:none"xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon-camera">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" /><path d="M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                        </svg>
                        ${this.out("Take Photo")}
                        `, k.appendChild(C));
          const R = document.createElement("div");
          R.className = "file-preview-container", m.appendChild(R);
          const L = document.createElement("div");
          L.className = "file-drop-info-highlight", L.id = `file_name_${g}`, m.appendChild(L), T && T.addEventListener("click", (P) => {
            P.preventDefault(), w.click();
          }), m.classList.add("disabledrop"), (!c.source || c.source && c.source === "local" || c.source && c.source === "local_and_camera") && (m.classList.remove("disabledrop"), m.addEventListener("dragover", (P) => {
            P.preventDefault(), Array.from(P.dataTransfer.items).some((re) => re.kind === "file") && m.classList.add("drag-over");
          }), m.addEventListener("dragleave", () => {
            m.classList.remove("drag-over");
          }), f === "file" ? m.addEventListener("drop", (P) => {
            if (P.preventDefault(), P.dataTransfer.files && P.dataTransfer.files.length > 0) {
              m.classList.remove("drag-over");
              const X = P.dataTransfer.files[0];
              X && (w.files = P.dataTransfer.files, Ye(X), this.clearSelectedFiles());
            }
          }) : f === "multifile" && m.addEventListener("drop", (P) => {
            if (P.preventDefault(), P.dataTransfer.files && P.dataTransfer.files.length > 0) {
              m.classList.remove("drag-over"), R.innerHTML = "";
              const X = P.dataTransfer.files;
              X.length > 0 && (w.files = X, Array.from(X).forEach((re) => {
                We(re);
              }), this.clearSelectedFiles());
            }
          })), f === "file" ? w.addEventListener("change", () => {
            const P = w.files[0];
            P && (Ye(P), this.clearSelectedFiles());
          }) : f === "multifile" && w.addEventListener("change", () => {
            R.innerHTML = "";
            const P = w.files;
            Array.from(P).forEach((X) => {
              X && (We(X), this.clearSelectedFiles());
            });
          });
          const $ = {
            images: [{
              type: "image/jpeg",
              extensions: ".jpg, .jpeg"
            }, {
              type: "image/png",
              extensions: ".png"
            }, {
              type: "image/gif",
              extensions: ".gif"
            }, {
              type: "image/webp",
              extensions: ".webp"
            }],
            videos: [{
              type: "video/mp4",
              extensions: ".mp4"
            }, {
              type: "video/webm",
              extensions: ".webm"
            }, {
              type: "video/ogg",
              extensions: ".ogg"
            }, {
              type: "video/quicktime",
              extensions: ".mov"
            }],
            audio: [{
              type: "audio/mpeg",
              extensions: ".mp3"
            }, {
              type: "audio/wav",
              extensions: ".wav"
            }],
            documents: [{
              type: "application/pdf",
              extensions: ".pdf"
            }, {
              type: "application/json",
              extensions: ".json"
            }, {
              type: "text/plain",
              extensions: ".txt"
            }, {
              type: "text/csv",
              extensions: ".csv"
            }, {
              type: "application/msword",
              extensions: ".doc"
            }, {
              type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              extensions: ".docx"
            }, {
              type: "application/vnd.ms-excel",
              extensions: ".xls"
            }, {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              extensions: ".xlsx"
            }],
            others: [{
              type: "application/zip",
              extensions: ".zip"
            }, {
              type: "application/x-rar-compressed",
              extensions: ".rar"
            }]
          };
          let O = [];
          (c.allowedFileTypes || ["images", "videos", "audio", "documents", "others"]).forEach((P) => {
            switch (P) {
              case "images":
                O = O.concat($.images);
                break;
              case "videos":
                O = O.concat($.videos);
                break;
              case "audio":
                O = O.concat($.audio);
                break;
              case "documents":
                O = O.concat($.documents);
                break;
              case "others":
                O = O.concat($.others);
                break;
            }
          });
          const A = O.map((P) => P.type).join(",");
          w.setAttribute("accept", A);
          let q;
          if (c.useImageMask) {
            p.classList.add("image-mask");
            const P = document.createElement("div");
            p.appendChild(P), q = new Ro(P, {
              lang: this.settings.lang,
              name: y + "_mask"
            }), this.objImageMask = q;
          }
          c.largePreview && p.classList.add("large-preview");
          const M = () => {
            const P = m.querySelector(".img-preview");
            P && (P.remove(), c.useImageMask && q.clearImage());
          };
          let E = `
                        <div class="div-livevideo">
                            <video class="livevideo" autoplay playsinline style="display:none"></video>
                            <canvas class="photo-captured" style="display:none"></canvas>
                            ${!c.source || c.source && c.source === "local" || c.source && c.source === "local_and_camera" ? `<button class="btn-selectfile2" title="${this.out("Select File")}" style="display:none">
                                    <svg style="fill:none" xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon-folder-open"><path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M5 19l2.757 -7.351a1 1 0 0 1 .936 -.649h12.307a1 1 0 0 1 .986 1.164l-.996 5.211a2 2 0 0 1 -1.964 1.625h-14.026a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v2" />
                                    </svg>
                                </button>
                            ` : ""}
                            <button class="btn-takephoto2" title="${this.out("Take Photo")}" style="display:none">
                                <svg style="fill:none" xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon-camera">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" /><path d="M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                                </svg>
                            </button>

                            <button class="btn-capturephoto" title="${this.out("Capture")}" style="display:none">
                                <svg style="fill:none" xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon-camera">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" /><path d="M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                                </svg>
                            </button>
                            <button type="button" class="btn-clearphoto" title="${this.out("Clear")}" style="display: none;">
                                <svg style="fill:none" xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon-eraser">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3" /><path d="M18 13.3l-6.3 -6.3" />
                                </svg>
                            </button>
                            <button type="button" class="btn-stopcamera" title="${this.out("Close")}" style="display: none;">
                                <svg style="fill:none" xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon-close">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    `;
          this.appendHtml(m, E);
          const I = p.querySelector(".livevideo"), D = p.querySelector(".photo-captured"), F = p.querySelector(".btn-selectfile2"), Y = p.querySelector(".btn-takephoto2"), V = p.querySelector(".btn-capturephoto"), fe = p.querySelector(".btn-clearphoto"), oe = p.querySelector(".btn-stopcamera");
          this.photoBlob = {};
          let xe;
          F && F.addEventListener("click", (P) => {
            P.preventDefault(), T.click();
          });
          const Oe = async () => {
            const P = p.querySelector(".btn-clearfile");
            P && P.click();
            try {
              xe = await navigator.mediaDevices.getUserMedia({
                video: !0
              }), I.srcObject = xe;
            } catch {
              alert("Unable to access the camera."), I.style.display = "none", V.style.display = "none", oe.style.display = "none", k.style.display = "none", L.style.display = "none";
            }
            setTimeout(() => {
              Y.style.display = "none", D.style.display = "none", I.style.display = "", V.style.display = "", fe.style.display = "none", F && (F.style.display = "none"), Y.style.display = "none", oe.style.display = "", k.style.display = "none", L.style.display = "none";
            }, 100);
          };
          C && C.addEventListener("click", async (P) => {
            P.preventDefault(), Oe();
          }), Y.addEventListener("click", async (P) => {
            P.preventDefault(), Oe();
          }), oe.addEventListener("click", () => {
            xe && xe.getTracks().forEach((P) => P.stop()), I.style.display = "none", V.style.display = "none", oe.style.display = "none", Y.style.display = "none", k.style.display = "", L.style.display = "";
          }), V.addEventListener("click", (P) => {
            if (P.preventDefault(), D.style.display = "", D.width = I.videoWidth, D.height = I.videoHeight, D.getContext("2d").drawImage(I, 0, 0, D.width, D.height), xe.getTracks().forEach((X) => X.stop()), I.style.display = "none", V.style.display = "none", fe.style.display = "", F && (F.style.display = ""), Y.style.display = "", oe.style.display = "none", D.toBlob((X) => {
              this.photoBlob[y] = X, w.removeAttribute("required");
            }, "image/jpeg"), Y.style.display = "", c.useImageMask) {
              const X = D.toDataURL("image/jpeg");
              q.setImage(X);
            }
            this.clearSelectedFiles();
          });
          const je = () => {
            this.photoBlob[y] = null, D.style.display = "none", D.getContext("2d").clearRect(0, 0, D.width, D.height), b.value !== "" ? c.isRequired && w.removeAttribute("required") : c.isRequired && w.setAttribute("required", "required"), fe.style.display = "none", F && (F.style.display = "none"), Y.style.display = "none", k.style.display = "", L.style.display = "";
          };
          fe.addEventListener("click", () => {
            je();
          });
          const Dt = (P, X) => {
            const re = `.${P.split(".").pop().toLowerCase()}`;
            if (!O.some((U) => U.extensions.split(", ").includes(re)))
              return;
            let Le = $.images.some((U) => U.extensions.split(", ").includes(re));
            if (c.useImageMask) {
              if (!Le)
                return;
              q.loadUrl(P);
            }
            je(), L.innerHTML = "";
            const ge = document.createElement("div");
            L.appendChild(ge);
            const ee = document.createElement("button");
            if (ee.className = "btn-clearfile", ee.innerHTML = `
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.4"  stroke-linecap="round"  stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3" /><path d="M18 13.3l-6.3 -6.3" />
                            </svg>
                        `, L.appendChild(ee), ee.addEventListener("click", (U) => {
              let Ae = ee.closest(".form-field").querySelector(".img-preview");
              Ae && Ae.remove(), b.value = "", w.value = "", L.innerHTML = "", S.innerText = this.out(this.settings.fileUploadText), c.useImageMask && q.clearImage();
              const Ge = document.querySelector(".formview-container .submit-container");
              Ge && setTimeout(() => {
                this.stickyElement(Ge);
              }, 1e3), U.preventDefault(), U.stopImmediatePropagation();
            }), Le) {
              let U = m.querySelector(".formview-container .img-preview");
              U || (U = document.createElement("img"), U.className = "img-preview", m.appendChild(U)), U.src = P;
            } else
              M();
            if (!X) {
              const U = this.getFormValues();
              this.settings.onInputChange && this.settings.onInputChange(U);
            }
            const ke = document.querySelector(".formview-container .submit-container");
            ke && setTimeout(() => {
              this.stickyElement(ke);
            }, 1e3);
          };
          c.value && Dt(c.value, !0);
          const Ye = (P) => {
            if (P) {
              if (!O.some((ee) => ee.type === P.type)) {
                alert(this.out("Invalid file type."));
                return;
              }
              if (c.useImageMask) {
                if (!["image/jpeg", "image/png", "image/webp"].includes(P.type)) {
                  alert(this.out("Invalid file type."));
                  return;
                }
                q.loadImage(P);
              }
              je(), b.value = "", L.innerHTML = "";
              const re = document.createElement("div");
              re.innerText = P.name, L.appendChild(re);
              const de = document.createElement("button");
              if (de.className = "btn-clearfile", de.innerHTML = `
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            `, L.appendChild(de), de.addEventListener("click", (ee) => {
                let U = de.closest(".form-field").querySelector(".img-preview");
                U && U.remove(), w.value = "", L.innerHTML = "", S.innerText = this.out(this.settings.fileUploadText), c.useImageMask && q.clearImage();
                const Se = document.querySelector(".formview-container .submit-container");
                Se && setTimeout(() => {
                  this.stickyElement(Se);
                }, 1e3), ee.preventDefault(), ee.stopImmediatePropagation();
              }), P.type.startsWith("image/")) {
                const ee = new FileReader();
                ee.onload = function(ke) {
                  let U = m.querySelector(".formview-container .img-preview");
                  U || (U = document.createElement("img"), U.className = "img-preview", m.appendChild(U)), U.src = ke.target.result;
                }, ee.readAsDataURL(P);
              } else
                M();
              const Le = this.getFormValues();
              this.settings.onInputChange && this.settings.onInputChange(Le);
              const ge = document.querySelector(".formview-container .submit-container");
              ge && setTimeout(() => {
                this.stickyElement(ge);
              }, 1e3);
            }
          }, We = (P) => {
            if (P) {
              if (O = O.concat($.images), !O.some((U) => U.type === P.type)) {
                alert(this.out("Invalid file type."));
                return;
              }
              const re = document.createElement("div");
              re.className = "image-item", R.appendChild(re);
              const de = document.createElement("div");
              de.className = "file-drop-info-highlight", re.appendChild(de);
              const Le = document.createElement("div");
              Le.innerText = P.name, de.appendChild(Le);
              const ge = document.createElement("button");
              if (ge.className = "btn-clearfile", ge.innerHTML = `
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            `, de.appendChild(ge), ge.addEventListener("click", (U) => {
                const Se = ge.closest(".image-item");
                Se && Se.remove(), ((Ds) => {
                  const _i = new DataTransfer(), $s = w.files;
                  Array.from($s).forEach((xi) => {
                    xi !== Ds && _i.items.add(xi);
                  }), w.files = _i.files;
                })(P);
                const Ge = document.querySelector(".formview-container .submit-container");
                Ge && setTimeout(() => {
                  this.stickyElement(Ge);
                }, 1e3), U.preventDefault(), U.stopImmediatePropagation();
              }), P.type.startsWith("image/")) {
                const U = new FileReader();
                U.onload = function(Se) {
                  let Ae = document.createElement("img");
                  Ae.className = "img-preview", re.appendChild(Ae), Ae.src = Se.target.result;
                }, U.readAsDataURL(P);
              }
              const ee = this.getFormValues();
              this.settings.onInputChange && this.settings.onInputChange(ee);
              const ke = document.querySelector(".formview-container .submit-container");
              ke && setTimeout(() => {
                this.stickyElement(ke);
              }, 1e3);
            }
          };
        }
        if (f === "email") {
          let g = this.getId();
          const v = document.createElement("label");
          if (v.setAttribute("for", `email_label_${g}`), v.className = "field-label", v.innerHTML = c.title + (c.isRequired ? ' <span class="text-red-500">*</span>' : ""), p.appendChild(v), c.fieldNote) {
            const b = document.createElement("div");
            b.className = "field-note", b.innerHTML = c.fieldNote, p.appendChild(b);
          }
          const m = document.createElement("input");
          m.id = `email_label_${g}`, m.type = "email", m.name = y, m.className = "inp-base", m.placeholder = c.placeholder, c.isRequired && m.setAttribute("required", "required"), p.appendChild(m), m.addEventListener("input", this.inputListener);
        }
        if (f === "phone") {
          let g = this.getId();
          const v = document.createElement("label");
          if (v.setAttribute("for", `phone_label_${g}`), v.className = "field-label", v.innerHTML = c.title + (c.isRequired ? ' <span class="text-red-500">*</span>' : ""), p.appendChild(v), c.fieldNote) {
            const b = document.createElement("div");
            b.className = "field-note", b.innerHTML = c.fieldNote, p.appendChild(b);
          }
          const m = document.createElement("input");
          m.id = `phone_label_${g}`, m.type = "tel", m.name = y, m.className = "inp-base", m.placeholder = c.placeholder, c.isRequired && m.setAttribute("required", "required"), p.appendChild(m), m.addEventListener("input", this.inputListener);
        }
        if (f === "url") {
          let g = this.getId();
          const v = document.createElement("label");
          if (v.setAttribute("for", `url_label_${g}`), v.className = "field-label", v.innerHTML = c.title + (c.isRequired ? ' <span class="text-red-500">*</span>' : ""), p.appendChild(v), c.fieldNote) {
            const b = document.createElement("div");
            b.className = "field-note", b.innerHTML = c.fieldNote, p.appendChild(b);
          }
          const m = document.createElement("input");
          m.id = `url_label_${g}`, m.type = "url", m.name = y, m.value = c.value || "", m.className = "inp-base", m.placeholder = c.placeholder, c.isRequired && m.setAttribute("required", "required"), p.appendChild(m), m.addEventListener("input", this.inputListener);
        }
        if (f === "hidden") {
          let g = this.getId();
          const v = document.createElement("label");
          v.setAttribute("for", `hidden_label_${g}`), v.className = "field-label hidden", v.innerText = c.title, p.appendChild(v);
          const m = document.createElement("input");
          m.id = `hidden_label_${g}`, m.type = "hidden", m.name = y, m.value = c.value, p.appendChild(m);
        }
      });
      const l = r.closest("[data-site-token]");
      if (l) {
        const c = l.getAttribute("data-site-token"), h = document.createElement("input");
        h.type = "hidden", h.name = "form_token", h.value = c, r.appendChild(h);
      }
      if (this.settings.isBuilder) {
        const c = document.createElement("div");
        c.className = "submit-container", r.appendChild(c);
        let h = !0;
        if ("hideReset" in t && (h = t.hideReset), !h) {
          const _ = document.createElement("button");
          _.className = "btn-resetform";
          const g = t.resetText || this.settings.resetText;
          _.innerText = g, c.appendChild(_), _.addEventListener("click", (m) => {
            m.preventDefault();
            const b = _.closest("form");
            b && (b.reset(), b.querySelectorAll(".btn-clearfile").forEach((k) => {
              k.click();
            }), b.querySelectorAll(".slider-container").forEach((k) => {
              const S = k.querySelector("input");
              k.querySelector(".current-value").textContent = S.value;
            }));
          }), (t.fullWidthButton || !1) && _.classList.add("w-full");
        }
        const p = document.createElement("button");
        p.className = "btn-submitform";
        const f = t.submitText || this.settings.submitText;
        p.innerText = f, c.appendChild(p), (t.fullWidthButton || !1) && p.classList.add("w-full"), this.settings.alwaysVisibleSubmit && c.classList.add("always-visible"), this.stickyElement(c), r.addEventListener("submit", async (_) => {
          _.preventDefault(), this.steps && this.steps.length > 0 && this.process();
        });
      } else {
        let c = "Reference Code:", h = "reference_code", p = "reference_code";
        const f = document.createElement("div");
        f.className = "form-field ", f.classList.add(p), r.appendChild(f);
        let y = this.getId();
        const _ = document.createElement("label");
        _.setAttribute("for", `short_text_label_${y}`), _.className = "field-label", _.innerHTML = c, f.appendChild(_);
        const g = document.createElement("input");
        if (g.id = `short_text_label_${y}`, g.type = "text", g.name = h, g.autocomplete = "off", g.setAttribute("aria-hidden", "true"), g.setAttribute("tabindex", "-1"), g.className = "inp-base", f.appendChild(g), this.settings.captchaContainer) {
          const v = this.settings.captchaContainerClassName, m = document.createElement("div");
          m.className = "captcha-container", v && m.classList.add(v), r.appendChild(m);
        }
        if (t.useSubmitButton) {
          const v = document.createElement("div");
          v.className = "submit-container", r.appendChild(v);
          let m = !0;
          if ("hideReset" in t && (m = t.hideReset), !m) {
            const S = document.createElement("button");
            S.className = "btn-resetform";
            const T = t.resetText || this.settings.resetText;
            S.innerText = T, v.appendChild(S), S.addEventListener("click", (R) => {
              R.preventDefault();
              const L = S.closest("form");
              L && (L.reset(), L.querySelectorAll(".btn-clearfile").forEach((N) => {
                N.click();
              }), L.querySelectorAll(".slider-container").forEach((N) => {
                const A = N.querySelector("input");
                N.querySelector(".current-value").textContent = A.value;
              }));
            }), (t.fullWidthButton || !1) && S.classList.add("w-full");
          }
          const b = document.createElement("button");
          b.className = "btn-submitform";
          const w = t.submitText;
          b.innerText = w, v.appendChild(b), (t.fullWidthButton || !1) && b.classList.add("w-full"), this.settings.alwaysVisibleSubmit && v.classList.add("always-visible"), this.stickyElement(v), b.addEventListener("click", async (S) => {
            this.trigger("submit", S);
          });
          const k = r.closest("form");
          k ? k.addEventListener("submit", async (S) => {
            this.steps && this.steps.length > 0 && (S.preventDefault(), S.stopImmediatePropagation(), this.process());
          }) : b.addEventListener("click", async (S) => {
            this.steps && this.steps.length > 0 && (S.preventDefault(), this.process());
          });
        }
      }
      let u, d;
      this.settings.resultSelector && (u = document.querySelector(this.settings.resultSelector), u.classList.add("result-wrapper"), u.innerHTML = "", d = document.createElement("div"), d.classList.add("result-container"), u.appendChild(d)), t.elements && u && t.elements.forEach((c) => {
        if (c.displayInOutput) {
          if (c.type === "spacer") {
            const p = document.createElement("div");
            p.className = "form-spacer", c.spacerHeight && !isNaN(parseFloat(c.spacerHeight)) && (p.style.height = c.spacerHeight + "px"), d.appendChild(p);
            return;
          }
          if (c.type === "separator") {
            const p = document.createElement("hr");
            p.style.borderTopColor = c.color, d.appendChild(p);
            return;
          }
          if (c.type === "html") {
            if (c.html) {
              const p = document.createElement("div");
              p.innerHTML = c.html, d.appendChild(p);
            }
            return;
          }
          if (c.type === "heading") {
            const p = document.createElement(c.heading || "h2");
            p.innerHTML = c.headingText || this.out("Your Heading Here!"), d.appendChild(p);
            return;
          }
          if (c.type === "paragraph") {
            const p = document.createElement("p");
            p.innerHTML = c.paragraphText || this.out("Your paragraph content here!"), d.appendChild(p);
            return;
          }
          if (c.type === "media") {
            if (c.tag === "video") {
              const p = document.createElement("video");
              p.style.width = "100%", p.style.height = "auto", p.controls = !0;
              var h = document.createElement("source");
              h.src = c.url, h.type = "video/mp4", p.appendChild(h), d.appendChild(p);
            } else if (c.tag === "audio") {
              const p = document.createElement("audio");
              p.controls = !0;
              let f = document.createElement("source");
              f.src = c.url, f.type = "audio/mp3", p.appendChild(f), d.appendChild(p);
            } else if (c.tag === "img") {
              const p = document.createElement("img");
              p.src = c.url, p.setAttribute("alt", this.out("Output Image")), d.appendChild(p);
            }
            return;
          }
          if (c.type === "image") {
            const p = document.createElement("img");
            p.src = c.url, p.setAttribute("alt", this.out("Output Image")), d.appendChild(p);
            return;
          }
          if (c.type === "video") {
            const p = document.createElement("video");
            p.style.width = "100%", p.style.height = "auto", p.controls = !0;
            let f = document.createElement("source");
            f.src = c.url, f.type = "video/mp4", p.appendChild(f), d.appendChild(p);
            return;
          }
          if (c.type === "audio") {
            const p = document.createElement("audio");
            p.controls = !0;
            let f = document.createElement("source");
            f.src = c.url, f.type = "audio/mp3", p.appendChild(f), d.appendChild(p);
            return;
          }
        }
      });
    }
    if (this.settings.resultSelector && document.querySelector(this.settings.resultSelector).classList.add("result-wrapper"), this.settings.saveResults && this.settings.resultSelector && localStorage.getItem("_results"))
      try {
        this.previousResults = JSON.parse(localStorage.getItem("_results"));
        let n = localStorage.getItem("_results_html");
        const r = document.querySelector(this.settings.resultSelector);
        r.innerHTML = n, this.addResultTool(), r.querySelectorAll(".link-download").forEach((l) => {
          l.addEventListener("click", async (u) => {
            u.preventDefault();
            const d = u.target.href;
            try {
              const c = await fetch(d, {
                mode: "cors"
              });
              if (!c.ok) throw new Error("Failed to fetch the image.");
              const h = await c.blob(), p = d.substring(d.lastIndexOf("/") + 1), f = document.createElement("a");
              f.href = URL.createObjectURL(h), f.download = p, f.click(), URL.revokeObjectURL(f.href);
            } catch (c) {
              console.error("Error downloading the image:", c);
            }
          });
        });
      } catch {
      }
    const s = document.querySelector(".formview-container .submit-container");
    s && setTimeout(() => {
      this.stickyElement(s);
    }, 1e3);
  }
  abort() {
    this.controller && this.controller.abort();
  }
  async search(e) {
    let t = {
      "Content-Type": "application/json",
      ...this.settings.headers
    };
    try {
      const i = await fetch(this.settings.searchUrl, {
        method: "POST",
        headers: t,
        body: JSON.stringify({
          query: e,
          customData: this.settings.customData
        })
      });
      if (!i.ok)
        throw new Error("Failed to fetch data");
      const s = await i.json(), n = s.organic_results ? "organic_results" : "organic";
      return (s[n] || []).map((r) => ({
        title: r.title,
        link: r.link,
        snippet: r.snippet || r.description
      }));
    } catch (i) {
      return console.error("Error in search:", i.message || i), [];
    }
  }
  async scrapeUrls(e) {
    if (e.length === 0) return {
      data: "",
      urls: [],
      failed: []
    };
    this.settings.consoleLog && console.log(e);
    let t = {
      "Content-Type": "application/json",
      ...this.settings.headers
    };
    const i = await fetch(this.settings.scrapeUrl, {
      method: "POST",
      headers: t,
      body: JSON.stringify({
        urls: e,
        customData: this.settings.customData
      })
    });
    if (!i.ok)
      throw new Error(`Error: ${i.statusText}`);
    let s = "";
    const n = await i.json();
    if (this.settings.consoleLog && console.log(n), n.error)
      return this.settings.consoleLog && console.log(n.error), {
        data: "",
        urls: [],
        failed: []
      };
    let r = [], o = [];
    if (this.settings.scrapeProvider === "firecrawl" && n.forEach((l) => {
      if (l.success) {
        const u = l.metadata.title, d = l.markdown, c = l.metadata.url;
        r.push(c), s += `


    ## ${u}

    Source: ${c}
                    
    ${d}


    ----------------


    `;
      } else {
        let u = l.url;
        if (u) {
          const d = l.url;
          o.push(d);
        } else
          u = l.url.link, o.push(u);
      }
    }), this.settings.scrapeProvider === "scrapingbee")
      for (let l = 0; l < n.length; l++) {
        let u = e[l];
        r.push(u);
        let d = n[l];
        s += `
    
    
## ${u}
                
${d}


----------------


`;
      }
    return s = `These are the information from the URLs:

${s}
`, {
      data: s,
      urls: r,
      failed: o
    };
  }
  async checkPrompt(e) {
    let t = "You are an assistant", i = `This is user's request:

${e}        
        `, s = `
Check if the request requires checking certain URLs. If so, returns the URLs.  
Also check if the request requires search to find answers by searching on the web to get the current relevant information.      
`, n = [{
      name: "check_request",
      description: "Check user request.",
      parameters: {
        type: "object",
        properties: {
          needscrape: {
            type: "boolean",
            description: "Check the if request requires search on the web or not."
          },
          url: {
            type: "string",
            description: "If request need to check certail URL, return the URL."
          },
          url2: {
            type: "string",
            description: "If the request needs to check a certail URL, return the URL."
          },
          url3: {
            type: "string",
            description: "If the request needs to check a certail URL, return the URL."
          },
          url4: {
            type: "string",
            description: "If the request needs to check a certail URL, return the URL."
          },
          url5: {
            type: "string",
            description: "If the request needs to check a certail URL, return the URL."
          },
          url6: {
            type: "string",
            description: "If the request needs to check a certail URL, return the URL."
          },
          url7: {
            type: "string",
            description: "If the request needs to check a certail URL, return the URL."
          },
          url8: {
            type: "string",
            description: "If the request needs to check a certail URL, return the URL."
          },
          needsearch: {
            type: "boolean",
            description: "Check the if request requires search on the web or not."
          }
        },
        required: ["needsearch", "needscrape"]
      }
    }], r = await this.send(s, i, t, n);
    return r ? JSON.parse(r) : !1;
  }
  async getRelevantInfo(e, t, i) {
    if (!this.settings.searchUrl && !this.settings.scrapeUrl) return {
      data: "",
      urls: [],
      failed: []
    };
    const s = document.createElement("div");
    s.classList.add("status"), i.appendChild(s);
    let n = "", r = await this.checkPrompt(`${t}

${e}`);
    this.settings.consoleLog && console.log(r);
    let o = [], l = [];
    if (r.url && r.needscrape && this.settings.scrapeUrl) {
      let u = document.createElement("p");
      u.innerHTML = this.out("Fetching data from the web..."), s.appendChild(u);
      let d = [];
      r.url && d.push(r.url), r.url2 && d.push(r.url2), r.url3 && d.push(r.url3), r.url4 && d.push(r.url4), r.url5 && d.push(r.url5), r.url6 && d.push(r.url6), r.url7 && d.push(r.url7), r.url8 && d.push(r.url8);
      let c = await this.scrapeUrls(d);
      n += c.data, o = c.urls, l = c.failed;
    } else if (this.settings.searchUrl && this.settings.scrapeUrl) {
      let u = document.createElement("p");
      u.innerHTML = this.out("Searching the web.."), s.appendChild(u);
      let d = await this.search(e);
      const c = this.settings.scrapeExclude;
      let h = d.filter((g) => {
        let v = new URL(g.link).hostname;
        return !c.some((m) => v.includes(m));
      });
      const p = this.settings.scrapeLimit, f = h.slice(0, p);
      s.innerHTML = "", u = document.createElement("p"), u.innerHTML = this.out("Getting more information..."), s.appendChild(u);
      let y = [];
      for (let g = 0; g < f.length; g++)
        y.push(d[g].link);
      let _ = await this.scrapeUrls(y);
      n += _.data, o = _.urls, l = _.failed;
    }
    return {
      data: n,
      urls: o,
      failed: l
    };
  }
  showDemoInfo(e) {
    if (!this.settings.resultSelector) {
      this.settings.consoleLog && console.log("resultSelector not set.");
      return;
    }
    const t = document.querySelector(this.settings.resultSelector);
    t.innerHTML = "";
    const i = document.createElement("div");
    i.classList.add("result-container"), t.appendChild(i), i.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 20" width="27" height="20" fill="currentColor">
            <circle cx="15" cy="15" r="10">
                <animate attributeName="cy" dur="0.6s" values="15;5;15" repeatCount="indefinite"></animate>
            </circle>
            <circle cx="60" cy="15" r="10">
                <animate attributeName="cy" begin="0.2s" dur="0.6s" values="15;5;15" repeatCount="indefinite"></animate>
            </circle>
            <circle cx="105" cy="15" r="10">
                <animate attributeName="cy" begin="0.4s" dur="0.6s" values="15;5;15" repeatCount="indefinite"></animate>
            </circle>
        </svg>
        `;
    let s;
    if (this.settings.isBuilder) {
      if (!this.settings.previewSelector) {
        this.settings.consoleLog && console.log("previewSelector not set.");
        return;
      }
      s = document.querySelector(this.settings.previewSelector);
    } else
      s = this.element;
    let n = s.querySelector(".btn-submitform"), r = n.innerHTML;
    n.innerHTML = `&nbsp;
            <span class="loading-icon" style="width:60px;display:flex;align-items:center;justify-content:center">
                <svg class="animate-spin" style="margin: 0;width: 1.25rem;height: 1.25rem;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle style="opacity: 0.25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path style="opacity: 0.75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </span>
            &nbsp;
        `, setTimeout(() => {
      i.innerHTML = e, n.innerHTML = r;
    }, 400);
  }
  async process(e) {
    if (this.trigger("generate"), this.payloads = [], this.output = [], this.mediaGenerated = [], this.needCleanup = !1, this.outputHtml = "", !this.settings.resultSelector) {
      this.settings.consoleLog && console.log("resultSelector not set.");
      return;
    }
    const t = document.querySelector(this.settings.resultSelector);
    if (!t) {
      console.log("resultElement not found.");
      return;
    }
    let i = !1, s = !1;
    this.steps.forEach((b) => {
      b.prompt.trim().startsWith("{") && (i = !0), b.tools && (b.tools.image || b.tools.video || b.tools.audio) && (i = !0), b.tools && b.tools.search && (s = !0);
    });
    let n;
    if (i && this.settings.disableMediaGeneration) {
      n = `
                <div class="form-info">
                    <h3>${this.out(this.settings.disableMediaGenerationTitle)}</h3> 
                    <p>
                        <b>${this.out(this.settings.disableMediaGenerationMessage)}</b>
                    </p>
                </div>`, this.showDemoInfo(n);
      return;
    }
    if (!this.settings.scrapeUrl && s) {
      this.settings.demo ? n = `
                <div class="form-info">
                    <h3>Demo Info</h3> 
                    <p>
                    <b>This is an online demo, so web searching and scraping features are currently disabled. In the full version, you’ll have access to all these features!</b>
                    </p>
                </div>` : n = `
                    <div class="form-info">
                        <p>
                            <b>Web searching and scraping are currently disabled, so your request cannot be processed.</b>
                        </p>
                    </div>`, this.showDemoInfo(n);
      return;
    }
    let r;
    if (this.settings.isBuilder) {
      if (!this.settings.previewSelector) {
        this.settings.consoleLog && console.log("previewSelector not set.");
        return;
      }
      r = document.querySelector(this.settings.previewSelector);
    } else
      r = this.element;
    let o = r.querySelector(".btn-submitform"), l = o.innerHTML;
    this.tokenInput = 0, this.tokenOutput = 0;
    let u = !1;
    if (e != null && (u = !0), this.singleStep = u, u || (this.filesUploaded = {}), this.isNormal && !u) {
      if (this.isMediaGenerating) {
        alert(this.out("The media generation process cannot be aborted."));
        return;
      }
      this.abort(), o.innerHTML = l, o.removeAttribute("disabled"), this.isGenerating = !1;
      return;
    }
    if (this.isNormal && u || this.isSingle && !u || this.isSingle && u)
      return;
    this.isNormal = !1, this.isSingle = !1, u ? (o.innerHTML = `
                <span class="loading-icon">
                    <svg class="animate-spin" style="margin: 0;margin-right: 0.6rem;width: 1rem;height: 1rem;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle style="opacity: 0.25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path style="opacity: 0.75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </span>
            `, this.isSingle = !0) : (o.innerHTML = `
                <span class="loading-icon">
                    <svg class="animate-spin" style="margin: 0;margin-right: 0.6rem;width: 1.25rem;height: 1.25rem;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle style="opacity: 0.25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path style="opacity: 0.75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </span>
                ${this.out("Abort")}
            `, this.isNormal = !0), this.isGenerating = !0;
    let d = (b, w) => {
      if (b === void 0) return "";
      if (!isNaN(b)) return b;
      let x = b;
      return w && w.trim().startsWith("{") && (x = JSON.stringify(b).slice(1, -1)), x;
    };
    t.innerHTML = "";
    let c = JSON.parse(JSON.stringify(this.steps)), h = this.getFormValues();
    if (!h) return;
    if (!(h && Object.keys(h).length === 0)) {
      for (const b of c) {
        let w = b.prompt;
        if (b.provider === "google") {
          for (const k of h)
            if (k.value instanceof FileList && k.value.length > 0) {
              const T = k.value[0];
              if (!T) continue;
              const C = await new Promise((R, L) => {
                const $ = new FileReader();
                $.onload = (O) => {
                  const N = O.target.result.split(",")[1];
                  R(N);
                }, $.onerror = L, $.readAsDataURL(T);
              });
              w = w.replaceAll(`{{${k.name}}}`, C), w = w.replaceAll(`{{${k.name.toUpperCase()}}}`, C);
            }
        }
        b.prompt = w;
      }
      c.forEach((b) => {
        let w = b.prompt;
        h.forEach((x) => {
          if (x.value === void 0 && (x.value = ""), typeof x.value == "object" && Array.isArray(x.value)) {
            const k = x.value.join(", ");
            w = w.replaceAll(`{{${x.name}}}`, k), w = w.replaceAll(`{{${x.name.toUpperCase()}}}`, k);
          } else x.value instanceof FileList || typeof x.value == "string" && x.value.indexOf("base64") !== -1 ? (w = w.replaceAll(`{{${x.name}}}`, x.name), w = w.replaceAll(`{{${x.name.toUpperCase()}}}`, x.name)) : (w = w.replaceAll(`{{${x.name}}}`, d(x.value, b.prompt)), w = w.replaceAll(`{{${x.name.toUpperCase()}}}`, d(x.value, b.prompt)));
        }), b.prompt = w;
      }), c.forEach((b) => {
        let w = b.context;
        h.forEach((x) => {
          if (x.value || (x.value = ""), typeof x.value == "object" && Array.isArray(x.value)) {
            const k = x.value.join(", ");
            w = w.replaceAll(`{{${x.name}}}`, k), w = w.replaceAll(`{{${x.name.toUpperCase()}}}`, k);
          } else x.value instanceof FileList || typeof x.value == "string" && x.value.indexOf("base64") !== -1 ? (w = w.replaceAll(`{{${x.name}}}`, x.name), w = w.replaceAll(`{{${x.name.toUpperCase()}}}`, x.name)) : (w = w.replaceAll(`{{${x.name}}}`, d(x.value, b.prompt)), w = w.replaceAll(`{{${x.name.toUpperCase()}}}`, d(x.value, b.prompt)));
        }), b.context = w;
      });
    }
    const p = async (b, w, x, k, S, T, C, R) => {
      const L = document.createElement("div");
      L.classList.add("result-container"), t.appendChild(L), L.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 20" width="27" height="20" fill="currentColor">
                <circle cx="15" cy="15" r="10">
                    <animate attributeName="cy" dur="0.6s" values="15;5;15" repeatCount="indefinite"></animate>
                </circle>
                <circle cx="60" cy="15" r="10">
                    <animate attributeName="cy" begin="0.2s" dur="0.6s" values="15;5;15" repeatCount="indefinite"></animate>
                </circle>
                <circle cx="105" cy="15" r="10">
                    <animate attributeName="cy" begin="0.4s" dur="0.6s" values="15;5;15" repeatCount="indefinite"></animate>
                </circle>
            </svg>
            `;
      let $ = !1, O;
      if (b.trim().startsWith("{"))
        try {
          O = JSON.parse(b), O && typeof O == "object" && ($ = !0);
        } catch {
          return L.innerHTML = `<p>${this.out("Incorrect JSON format.")}</p>`, !1;
        }
      (C && (C.image || C.video || C.audio) || $) && (u || (o.innerHTML = `&nbsp;
                        <span class="loading-icon" style="width:60px;display:flex;align-items:center;justify-content:center">
                            <svg class="animate-spin" style="margin: 0;width: 1.25rem;height: 1.25rem;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle style="opacity: 0.25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path style="opacity: 0.75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </span>
                        &nbsp;
                    `, o.setAttribute("disabled", "")));
      let N = "", A = "", q;
      if (C && C.search && (q = await this.getRelevantInfo(b, w, L), q.data !== "" && (w += `
Use the following information to answer the request:

${q.data}
`)), C && (C.image || C.video || C.audio) || $) {
        const M = await this.media.generate(b, w, x, k, C, L, R);
        return this.needCleanup = !0, this.settings.consoleLog && console.log(M), M.mediaGenerated ? {
          media: M.output,
          media2: M.output2,
          markdown: M.markdown
        } : (L.innerHTML = `<p>${M.message}</p>`, !1);
      }
      if (this.settings.assistantId) {
        if (this.settings.assistantStreamUrl)
          await this.assistantStream(b, w, S, T, async (M) => {
            if (!(M && typeof M == "object")) {
              if (N += M, !R) {
                const E = B.parse(N);
                L.innerHTML = E, A += E;
              }
              await new Promise((E) => setTimeout(E, 50));
            }
          }), await new Promise((M) => {
            const E = setInterval(() => {
              L.innerHTML === B.parse(N) && (clearInterval(E), M());
            }, 10);
          }), R && (L.innerHTML = "", L.remove()), this.outputHtml += `<div class="result-container">${A}</div>`;
        else if (this.settings.assistantUrl) {
          let M = await this.assistant(b, w, S, T);
          if (!M)
            return !1;
          if (N = M, R)
            L.innerHTML = "", L.remove();
          else {
            const E = B.parse(M);
            L.innerHTML = E, this.outputHtml += `<div class="result-container">${E}</div>`;
          }
        }
      } else if (this.settings.sendCommandStreamUrl) {
        let M = "", E = "", I = "";
        const D = async (F) => {
          let Y = 0;
          for (; Y < F.length; ) {
            if (I = M.slice(0, I.length + 1), Y++, !R) {
              const V = B.parse(I);
              L.innerHTML = V, E = V;
            }
            await new Promise((V) => setTimeout(V, 50));
          }
        };
        await this.sendStream(b, w, S, k, T, async (F) => {
          N += F, M += F, await D(F);
        }), await new Promise((F) => {
          const Y = setInterval(() => {
            I.length === M.length && (clearInterval(Y), F());
          }, 10);
        }), R && (L.innerHTML = "", L.remove()), this.outputHtml += `<div class="result-container">${E}</div>`;
      } else {
        let M = await this.send(b, w, S, k, T);
        if (!M)
          return !1;
        if (N = M, R)
          L.innerHTML = "", L.remove();
        else {
          const E = B.parse(M);
          L.innerHTML = E, this.outputHtml += `<div class="result-container">${E}</div>`;
        }
      }
      if (!R) {
        let M = "";
        if (q && q.urls.forEach((I) => {
          let D = I;
          D.length > 75 && (D = D.slice(0, 75) + "..."), M += `<div><a class="source_url" href="${I}">${D}</url></div>`;
        }), q && q.failed.forEach((I) => {
          let D = I;
          D.length > 75 && (D = D.slice(0, 75) + "..."), M += `<div><a class="source_url" style="opacity:0.5" href="${I}">${D}</url></div>`;
        }), M !== "") {
          const I = document.createElement("div");
          I.classList.add("result-container"), t.appendChild(I), I.innerHTML = M;
        }
      }
      return this.payloads.push({
        prompt: b,
        context: w
      }), this.output.push(N), {
        media: [],
        markdown: N
      };
    };
    u || await (async (b) => {
      this.previousResults = [], this.outputHtml = "";
      for (let w = 0; w < b.length; w++) {
        if (!this.isGenerating)
          return;
        let {
          prompt: x,
          context: k,
          provider: S,
          model: T,
          system: C,
          functs: R,
          tools: L,
          hideOutput: $
        } = b[w];
        S = S || "", k = k || "", C = C || "You are an assistant", R = R || [];
        let O = x;
        this.previousResults.forEach((A, q) => {
          const M = `{{output_step_${q + 1}}}`;
          O = O.replace(new RegExp(M, "g"), d(A, x)), O = O.replace(new RegExp(M.toUpperCase(), "g"), d(A, x));
        }), x = O, x = x.replace(/[\u00A0\u2000-\u200B\u202F\u205F\u3000\uFEFF]/g, " ").trim(), this.settings.consoleLog && console.log(x), O = k, this.previousResults.forEach((A, q) => {
          const M = `{{output_step_${q + 1}}}`;
          O = O.replace(new RegExp(M, "g"), d(A, x)), O = O.replace(new RegExp(M.toUpperCase(), "g"), d(A, x));
        }), k = O, k = k.replace(/[\u00A0\u2000-\u200B\u202F\u205F\u3000\uFEFF]/g, " ").trim();
        let N = await p(x, k, S, T, C, R, L, $);
        if (!N)
          break;
        if (this.mediaGenerated.push(...N.media), N.media && N.media.length === 1) {
          let A = N.media[0], q = N.media2 && N.media2.length === 1 && N.media2[0];
          this.previousResults.push(q || A), $ && (this.filesUploaded[`output_step_${w}`] = A);
        } else
          this.previousResults.push(N.markdown);
      }
    })(c), u && (e === 0 && (this.previousResults = []), await (async (w, x) => {
      if (!this.isGenerating)
        return;
      let {
        prompt: k,
        context: S,
        provider: T,
        model: C,
        system: R,
        functs: L,
        tools: $,
        hideOutput: O
      } = w[x];
      S = S || "", R = R || "You are an assistant", L = L || [];
      let N = k;
      this.previousResults && this.previousResults.forEach((q, M) => {
        const E = `{{output_step_${M + 1}}}`;
        N = N.replace(new RegExp(E, "g"), q), N = N.replace(new RegExp(E.toUpperCase(), "g"), q);
      }), k = N, k = k.replace(/[\u00A0\u2000-\u200B\u202F\u205F\u3000\uFEFF]/g, " ").trim(), this.settings.consoleLog && console.log(k), N = S, this.previousResults && this.previousResults.forEach((q, M) => {
        const E = `{{output_step_${M + 1}}}`;
        N = N.replace(new RegExp(E, "g"), q), N = N.replace(new RegExp(E.toUpperCase(), "g"), q);
      }), S = N, S = S.replace(/[\u00A0\u2000-\u200B\u202F\u205F\u3000\uFEFF]/g, " ").trim(), this.settings.consoleLog && console.log(S);
      let A = await p(k, S, T, C, R, L, $, O);
      if (A && (this.mediaGenerated.push(...A.media), !!this.previousResults))
        if (A.media && A.media.length === 1) {
          let q = A.media[0], M = A.media2 && A.media2.length === 1 && A.media2[0];
          this.previousResults[x] = M || q, O && (this.filesUploaded[`output_step_${x}`] = q);
        } else
          this.previousResults[x] = A.markdown;
    })(c, e)), o.innerHTML = l, o.removeAttribute("disabled"), this.isGenerating = !1;
    const y = this.calculateCost();
    this.settings.onUsage && this.settings.onUsage(y), this.trigger("usage", y), this.isNormal = !1, this.isSingle = !1;
    const _ = (b, w = 100) => {
      const x = document.createElement("div");
      if (x.innerHTML = b, x.querySelector("video"))
        return "Video";
      if (x.querySelector("img"))
        return "Image";
      if (x.querySelector("audio"))
        return "Audio";
      const k = x.textContent.trim();
      return k.length > w ? k.substring(0, w) + "..." : k;
    }, g = Object.keys(this.filesUploaded).length === 0 && this.filesUploaded.constructor === Object;
    if (this.needCleanup && !g) {
      this.settings.consoleLog && (console.log("Cleanup"), console.log(this.filesUploaded));
      let b = {
        "Content-Type": "application/json",
        ...this.settings.headers
      };
      await fetch(this.settings.cleanup, {
        method: "POST",
        headers: b,
        body: JSON.stringify(this.filesUploaded)
      });
    }
    let v = this.outputHtml;
    this.mediaGenerated = this.mediaGenerated.filter((b) => v.indexOf(b) !== -1), this.trigger("resultReady", {
      previewText: _(v),
      markdown: this.previousResults,
      html: v,
      media: this.mediaGenerated,
      // return the collected generated media from all steps
      input: this.payloads,
      output: this.output
    }), this.settings.saveResults && (localStorage.setItem("_results", JSON.stringify(this.previousResults)), localStorage.setItem("_results_html", v)), this.addResultTool(), t.querySelectorAll(".link-download").forEach((b) => {
      b.addEventListener("click", async (w) => {
        w.preventDefault();
        const x = w.target.href;
        try {
          const k = await fetch(x, {
            mode: "cors"
          });
          if (!k.ok) throw new Error("Failed to fetch the image.");
          const S = await k.blob(), T = x.substring(x.lastIndexOf("/") + 1), C = document.createElement("a");
          C.href = URL.createObjectURL(S), C.download = T, C.click(), URL.revokeObjectURL(C.href);
        } catch (k) {
          console.error("Error downloading the image:", k);
        }
      });
    });
  }
  calculateCost() {
    const e = this.settings.inputCost / 1e6, t = this.settings.outputCost / 1e6, i = this.tokenInput * e, s = this.tokenOutput * t;
    return i + s;
  }
  loadWorkflow(e) {
    if (!e) return;
    const i = JSON.parse(e).steps;
    i.forEach((s) => {
      Object.prototype.hasOwnProperty.call(s, "context") || (s.context = "");
    }), this.steps = i;
  }
  getFileInput(e) {
    let t;
    if (this.settings.isBuilder) {
      if (!this.settings.previewSelector) {
        this.settings.consoleLog && console.log("previewSelector not set.");
        return;
      }
      t = document.querySelector(this.settings.previewSelector);
    } else
      t = this.element;
    return t ? e ? t.querySelector(`input[type="file"][name="${e}"]`) : t.querySelector('input[type="file"]') : null;
  }
  // getFormValues is only used in process
  getFormValues() {
    const e = this.element;
    if (!e) return [];
    const t = e.querySelectorAll("[name]");
    if (t.length === 0)
      return {};
    const i = {};
    t.forEach((r) => {
      let {
        name: o,
        type: l,
        value: u,
        checked: d,
        files: c
      } = r;
      if (l === "checkbox")
        o = o.replace("[]", ""), d && (i[o] = i[o] || [], u === "other" && (u = e.querySelector(`[name="${o + "_other"}"]`).value), i[o].push(u));
      else if (l === "radio")
        d && (u === "other" && (u = e.querySelector(`[name="${o + "_other"}"]`).value), i[o] = u);
      else if (l === "select-one")
        u === "other" && (u = e.querySelector(`[name="${o + "_other"}"]`).value), i[o] = u;
      else if (l === "file")
        i[o] = c;
      else if (l === "select-multiple") {
        const h = Array.from(r.selectedOptions);
        i[o] = h.map((p) => p.value);
      } else if (l === "color") {
        i[o] = u;
        const h = this.hexToRgb(u);
        i[o + "_red"] = h.red, i[o + "_green"] = h.green, i[o + "_blue"] = h.blue;
      } else
        i[o] = u;
    });
    let s = [];
    return this.json.elements.forEach((r) => {
      let o = r.title, l = r.name, u = r.type;
      if (l === "") return;
      let d = i[l], c = {
        questions: o,
        name: l,
        value: d,
        type: u
      };
      s.push(c);
      let h = l + "__url";
      d = i[h], d && (c = {
        questions: o,
        name: h,
        value: d
      }, s.push(c)), r.useImageMask && (l = l + "_mask", d = i[l], c = {
        questions: o,
        name: l,
        value: d
      }, s.push(c));
      let p = l + "_red";
      d = i[p], d !== void 0 && (c = {
        questions: o,
        name: p,
        value: d
      }, s.push(c));
      let f = l + "_green";
      d = i[f], d !== void 0 && (c = {
        questions: o,
        name: f,
        value: d
      }, s.push(c));
      let y = l + "_blue";
      d = i[y], d !== void 0 && (c = {
        questions: o,
        name: y,
        value: d
      }, s.push(c));
    }), this.settings.consoleLog && console.log(s), s;
  }
  setTheme(e, t) {
    let i;
    if (!e) i = {};
    else
      try {
        i = JSON.parse(e);
      } catch {
        i = {};
      }
    this.themeData = e;
    const s = i.cssVariables;
    let n, r = document.documentElement;
    t && (r = t), n = s && s["--form-text-color"] || "", r.style.setProperty("--form-text-color", n), n = s && s["--form-primary-color"] || "#3b82f6", r.style.setProperty("--form-primary-color", n), n = s && s["--form-title-color"] || "", r.style.setProperty("--form-title-color", n), n = s && s["--form-desc-color"] || "", r.style.setProperty("--form-desc-color", n), n = s && s["--form-label-color"] || "", r.style.setProperty("--form-label-color", n), n = s && s["--form-label-font-size"] || "", r.style.setProperty("--form-label-font-size", n), n = s && s["--form-input-font-size"] || "", r.style.setProperty("--form-input-font-size", n), n = s && s["--form-input-border-color"] || "", r.style.setProperty("--form-input-border-color", n), n = s && s["--form-primary-border-width"] || "1px", r.style.setProperty("--form-primary-border-width", n), n = s && s["--form-secondary-border-width"] || "2px", r.style.setProperty("--form-secondary-border-width", n), n = s && s["--form-input-background-color"] || "", r.style.setProperty("--form-input-background-color", n), n = s && s["--form-input-text-color"] || "", r.style.setProperty("--form-input-text-color", n), n = s && s["--form-input-placeholder-color"] || "", r.style.setProperty("--form-input-placeholder-color", n), n = s && s["--form-choice-border-color"] || "", r.style.setProperty("--form-choice-border-color", n), n = s && s["--form-switch-background-color"] || "", r.style.setProperty("--form-switch-background-color", n), n = s && s["--form-switch-knob-color"] || "", r.style.setProperty("--form-switch-knob-color", n), n = s && s["--form-switch-focus-offset-color"] || "", r.style.setProperty("--form-switch-focus-offset-color", n), n = s && s["--form-dropfile-border-color"] || "rgb(194 194 194)", r.style.setProperty("--form-dropfile-border-color", n), n = s && s["--form-dropfile-hover-color"] || "", r.style.setProperty("--form-dropfile-hover-color", n), n = s && s["--form-button-background-color"] || "", r.style.setProperty("--form-button-background-color", n), n = s && s["--form-button-hover-background-color"] || "", r.style.setProperty("--form-button-hover-background-color", n), n = s && s["--form-button-text-color"] || "", r.style.setProperty("--form-button-text-color", n), n = s && s["--form-button-hover-text-color"] || "", r.style.setProperty("--form-button-hover-text-color", n), n = s && s["--form-button-border-width"] || "1px", r.style.setProperty("--form-button-border-width", n), n = s && s["--form-button-border-color"] || "", r.style.setProperty("--form-button-border-color", n), n = s && s["--form-button-hover-border-color"] || "", r.style.setProperty("--form-button-hover-border-color", n), n = s && s["--form-reset-background-color"] || "", r.style.setProperty("--form-reset-background-color", n), n = s && s["--form-reset-hover-background-color"] || "", r.style.setProperty("--form-reset-hover-background-color", n), n = s && s["--form-reset-text-color"] || "", r.style.setProperty("--form-reset-text-color", n), n = s && s["--form-reset-hover-text-color"] || "", r.style.setProperty("--form-reset-hover-text-color", n), n = s && s["--form-reset-border-width"] || "1px", r.style.setProperty("--form-reset-border-width", n), n = s && s["--form-reset-border-color"] || "", r.style.setProperty("--form-reset-border-color", n), n = s && s["--form-reset-hover-border-color"] || "", r.style.setProperty("--form-reset-hover-border-color", n);
  }
  async send(e, t, i, s, n) {
    this.controller = new AbortController(), this.signal = this.controller.signal;
    let r = 0.6, o = 0.9, l = 1;
    n || (n = []), s = s || this.settings.model, n.length > 0 && (s = this.settings.model2);
    const u = {
      question: e,
      context: t,
      system: i,
      functs: n,
      temperature: r,
      topP: o,
      num: l,
      model: s,
      customData: this.settings.customData
    };
    try {
      let d = {
        "Content-Type": "application/json",
        ...this.settings.headers
      }, h = await (await fetch(this.settings.sendCommandUrl, {
        signal: this.signal,
        // Abort
        method: "POST",
        headers: d,
        body: JSON.stringify(u)
      })).json();
      if (h.error)
        return console.log(`Error:
` + h.error), !1;
      if (h.answer.usage && (this.tokenInput += h.answer.usage.prompt_tokens, this.tokenOutput += h.answer.usage.completion_tokens), n.length === 0) {
        let p;
        return h.answer.choices.forEach((f) => {
          p = f.message.content;
        }), p;
      } else
        return h.answer;
    } catch (d) {
      return d.name === "AbortError" ? this.settings.consoleLog && console.log("Request aborted by user.") : console.error("Error:", d), !1;
    }
  }
  async sendStream(e, t, i, s, n, r) {
    this.controller = new AbortController(), this.signal = this.controller.signal;
    let o = 0.6, l = 0.9, u = 1;
    n || (n = []), s = s || this.settings.model;
    const d = {
      question: e,
      context: t,
      system: i,
      functs: n,
      temperature: o,
      topP: l,
      num: u,
      model: s,
      customData: this.settings.customData
    };
    try {
      let c = {
        "Content-Type": "application/json",
        ...this.settings.headers
      };
      const h = await fetch(this.settings.sendCommandStreamUrl, {
        signal: this.signal,
        // Abort
        method: "POST",
        headers: c,
        body: JSON.stringify(d)
      });
      if (!h.ok)
        return console.error("Error:", h.statusText), !1;
      const p = h.body.getReader(), f = new TextDecoder();
      let y = "", _ = !1;
      for (; !_; ) {
        const {
          done: g,
          value: v
        } = await p.read();
        if (_ = g, _) break;
        const m = f.decode(v, {
          stream: !0
        });
        y += m;
        const b = y.split(`
`);
        y = "";
        let w = 0, x = 0;
        for (const k of b)
          if (k.trim() !== "" && k.startsWith("data:")) {
            const S = k.slice(5).trim();
            if (S === "[DONE]") {
              this.settings.consoleLog && console.log("Stream completed.");
              break;
            }
            try {
              const T = JSON.parse(S);
              if (T.usage && (w = T.usage.prompt_tokens, x = T.usage.completion_tokens), T.choices && T.choices[0].delta && T.choices[0].delta.content) {
                const C = T.choices[0].delta.content;
                r && r(C);
              }
            } catch {
              y += k + `
`;
            }
          }
        this.tokenInput += w, this.tokenOutput += x;
      }
      return !0;
    } catch (c) {
      return c.name === "AbortError" ? this.settings.consoleLog && console.log("Request aborted by user.") : console.error("Error:", c), !1;
    }
  }
  async assistant(e, t, i, s) {
    this.controller = new AbortController(), this.signal = this.controller.signal;
    let n = 0.6, r = 0.9, o = 1;
    s || (s = []);
    let l = this.settings.model;
    s.length > 0 && (l = this.settings.model2);
    const u = {
      assistantId: this.settings.assistantId,
      question: e,
      context: t,
      system: i,
      functs: s,
      temperature: n,
      topP: r,
      num: o,
      model: l,
      customData: this.settings.customData
    };
    try {
      let d = {
        "Content-Type": "application/json",
        ...this.settings.headers
      }, h = await (await fetch(this.settings.assistantUrl, {
        signal: this.signal,
        // Abort
        method: "POST",
        headers: d,
        body: JSON.stringify(u)
      })).json();
      return h.error ? (console.log(`Error:
` + h.error), !1) : (h.usage && (this.tokenInput += h.usage.prompt_tokens, this.tokenOutput += h.usage.completion_tokens), h.answer.content[0].text.value);
    } catch (d) {
      return d.name === "AbortError" ? this.settings.consoleLog && console.log("Request aborted by user.") : console.error("Error:", d), !1;
    }
  }
  async assistantStream(e, t, i, s, n) {
    this.controller = new AbortController(), this.signal = this.controller.signal;
    let r = 0.6, o = 0.9, l = 1;
    s || (s = []);
    const u = {
      assistantId: this.settings.assistantId,
      question: e,
      context: t,
      system: i,
      functs: s,
      temperature: r,
      topP: o,
      num: l,
      model: this.settings.model,
      customData: this.settings.customData
    };
    try {
      let d = {
        "Content-Type": "application/json",
        ...this.settings.headers
      };
      const c = await fetch(this.settings.assistantStreamUrl, {
        signal: this.signal,
        // Abort
        method: "POST",
        headers: d,
        body: JSON.stringify(u)
      });
      if (!c.ok)
        return console.error("Error:", c.statusText), !1;
      const h = c.body.getReader(), p = new TextDecoder();
      let f = "", y = !1;
      for (; !y; ) {
        const {
          done: _,
          value: g
        } = await h.read();
        if (y = _, y) break;
        const v = p.decode(g, {
          stream: !0
        });
        f += v;
        const m = f.split(`
`);
        f = "";
        for (const b of m)
          if (b.trim() !== "")
            if (b.startsWith("data:")) {
              const w = b.slice(5).trim();
              w === "[DONE]" && this.settings.consoleLog && console.log("Stream completed.");
              try {
                const x = JSON.parse(w);
                if (x.choices && x.choices[0].delta && x.choices[0].delta.content) {
                  const k = x.choices[0].delta.content;
                  n && n(k);
                }
              } catch {
                f += b + `
`;
              }
            } else {
              const w = JSON.parse(b);
              this.tokenInput += w.prompt_tokens, this.tokenOutput += w.completion_tokens;
              break;
            }
      }
      return !0;
    } catch (d) {
      return d.name === "AbortError" ? this.settings.consoleLog && console.log("Request aborted by user.") : console.error("Error:", d), !1;
    }
  }
  hexToRgb(e) {
    const t = e.replace("#", ""), i = parseInt(t, 16), s = i >> 16 & 255, n = i >> 8 & 255, r = i & 255;
    return {
      red: s,
      green: n,
      blue: r
    };
  }
  getId(e = "id") {
    return `${e}-${Math.random().toString(36).substr(2, 9)}`;
  }
  appendHtml(e, t) {
    e && t && e.insertAdjacentHTML("beforeend", t);
  }
  cleanup() {
    if (this.element) {
      let e = this.element.querySelectorAll('input[type="text"], input[type="number"], input[type="email"], input[type="tel"], input[type="url"], textarea');
      e.forEach((t) => {
        t.removeEventListener("input", this.inputListener);
      }), e = this.element.querySelectorAll('input[type="date"], input[type="radio"], input[type="checkbox"]'), e.forEach((t) => {
        t.removeEventListener("change", this.changeListener);
      }), this.debounceTimeout && (clearTimeout(this.debounceTimeout), this.debounceTimeout = null);
    }
  }
  destroy() {
    try {
      if (this._scrollListener) {
        let e;
        this.settings.isBuilder ? e = document.querySelector(this.settings.previewSelector) : e = this.element;
        const t = e.querySelector(".submit-container"), i = this.getScrollableParent(t);
        i ? i.removeEventListener("scroll", this._scrollListener) : window.removeEventListener("scroll", this._scrollListener), window.removeEventListener("resize", this._scrollListener);
      }
    } catch {
    }
    this.element && (this.cleanup(), this.element.innerHTML = "", this.element = null);
    for (const e in this.listeners)
      this.listeners[e].clear();
    this.listeners = {};
  }
  out(e) {
    let t = this.settings.lang[e];
    return t || e;
  }
}
const Po = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: qo
}, Symbol.toStringTag, { value: "Module" }));
export {
  $o as default
};
