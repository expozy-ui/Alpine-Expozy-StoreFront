function Bt() {
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
function Ne(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
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
var Mt, Zt;
function ze() {
  return Zt || (Zt = 1, Mt = function n(t, e) {
    return t == null || e == null || Object.keys(e).forEach(function(i) {
      Object.prototype.toString.call(e[i]) == "[object Object]" ? Object.prototype.toString.call(t[i]) != "[object Object]" ? t[i] = e[i] : t[i] = n(t[i], e[i]) : t[i] = e[i];
    }), t;
  }), Mt;
}
var Xe = ze();
const vt = /* @__PURE__ */ Ne(Xe);
Array.prototype.each = function(n) {
  const t = this.length;
  for (let e = 0; e < t; e++) {
    const i = this[e];
    i && n(i, e);
  }
};
typeof window < "u" && typeof NodeList < "u" && (NodeList.prototype.each = Array.prototype.each, NodeList.prototype.filter = Array.prototype.filter);
function ct(n) {
  return Number(n) === n && n % 1 === 0;
}
function ht(n) {
  return Number(n) === n && n % 1 !== 0;
}
let gt = class {
  /**
   * Creates a new Trigger from the given element and options
   *
   * @param {Element|HTMLElement} element
   * @param {DefaultOptions.trigger} [options=DefaultOptions.trigger] options
   */
  constructor(t, e) {
    this.element = t, e = vt(new Bt().trigger, e), this.offset = e.offset, this.toggle = e.toggle, this.once = e.once, this.visible = null, this.active = !0;
  }
  /**
   * Checks if the Trigger is in the viewport, calls the callbacks and toggles the classes
   * @param {HTMLElement|HTMLDocument|Window} parent
   * @param {string} direction top, bottom, left, right
   * @returns {boolean} If the element is visible
   */
  checkVisibility(t, e) {
    if (!this.active)
      return this.visible;
    const i = t.offsetWidth || t.innerWidth || 0, s = t.offsetHeight || t.innerHeight || 0, r = { w: i, h: s }, a = this.getBounds(), o = this._checkVisibility(a, r, e);
    if (o !== this.visible) {
      this.visible = o;
      const l = this._toggleCallback();
      l instanceof Promise ? l.then(this._toggleClass.bind(this)).catch((c) => {
        console.error("Trigger promise failed"), console.error(c);
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
  _getElementOffset(t, e) {
    let i = { x: 0, y: 0 };
    return typeof this.offset.element.x == "function" ? i.x = t.width * this.offset.element.x(this, t, e) : ht(this.offset.element.x) ? i.x = t.width * this.offset.element.x : ct(this.offset.element.x) && (i.x = this.offset.element.x), typeof this.offset.element.y == "function" ? i.y = t.height * this.offset.element.y(this, t, e) : ht(this.offset.element.y) ? i.y = t.height * this.offset.element.y : ct(this.offset.element.y) && (i.y = this.offset.element.y), i;
  }
  /**
   * Get the calculated offset to place on the viewport
   * @param {{w: number, h: number}} parent
   * @param {string} direction top, bottom, left, right
   * @returns {{x: number, y: number}}
   * @private
   */
  _getViewportOffset(t, e) {
    let i = { x: 0, y: 0 };
    return typeof this.offset.viewport.x == "function" ? i.x = t.w * this.offset.viewport.x(this, t, e) : ht(this.offset.viewport.x) ? i.x = t.w * this.offset.viewport.x : ct(this.offset.viewport.x) && (i.x = this.offset.viewport.x), typeof this.offset.viewport.y == "function" ? i.y = t.h * this.offset.viewport.y(this, t, e) : ht(this.offset.viewport.y) ? i.y = t.h * this.offset.viewport.y : ct(this.offset.viewport.y) && (i.y = this.offset.viewport.y), i;
  }
  /**
   * Check the visibility of the trigger in the viewport, with offsets applied
   * @param {ClientRect} rect
   * @param {{w: number, h: number}} parent
   * @param {string} direction top, bottom, left, right
   * @returns {boolean}
   * @private
   */
  _checkVisibility(t, e, i) {
    const s = this._getElementOffset(t, i), r = this._getViewportOffset(e, i);
    let a = !0;
    return t.left - r.x < -(t.width - s.x) && (a = !1), t.left + r.x > e.w - s.x && (a = !1), t.top - r.y < -(t.height - s.y) && (a = !1), t.top + r.y > e.h - s.y && (a = !1), a;
  }
  /**
   * Toggles the classes
   * @private
   */
  _toggleClass() {
    if (this.visible) {
      Array.isArray(this.toggle.class.in) ? this.toggle.class.in.each((t) => {
        this.element.classList.add(t);
      }) : this.element.classList.add(this.toggle.class.in), Array.isArray(this.toggle.class.out) ? this.toggle.class.out.each((t) => {
        this.element.classList.remove(t);
      }) : this.element.classList.remove(this.toggle.class.out);
      return;
    }
    Array.isArray(this.toggle.class.in) ? this.toggle.class.in.each((t) => {
      this.element.classList.remove(t);
    }) : this.element.classList.remove(this.toggle.class.in), Array.isArray(this.toggle.class.out) ? this.toggle.class.out.each((t) => {
      this.element.classList.add(t);
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
}, Be = class {
  /**
   * Initializes the collection
   * @param {Trigger[]} [triggers=[]] triggers A set of triggers to init with, optional
   */
  constructor(t) {
    this.triggers = t instanceof Array ? t : [];
  }
  /**
   * Adds one or multiple Trigger objects
   * @param {Trigger|Trigger[]} objects
   */
  add(t) {
    if (t instanceof gt)
      return this.triggers.push(t);
    t.each((e) => {
      e instanceof gt ? this.triggers.push(e) : console.error("Object added to TriggerCollection is not a Trigger. Object: ", e);
    });
  }
  /**
   * Removes one or multiple Trigger objects
   * @param {Trigger|Trigger[]} objects
   */
  remove(t) {
    t instanceof gt && (t = [t]), this.triggers = this.triggers.filter((e) => {
      let i = !1;
      return t.each((s) => {
        s == e && (i = !0);
      }), !i;
    });
  }
  /**
   * Lookup one or multiple triggers by a query string
   * @param {string} selector
   * @returns {Trigger[]}
   */
  query(t) {
    return this.triggers.filter((e) => {
      const i = e.element, s = i.parentNode;
      return [].slice.call(s.querySelectorAll(t)).indexOf(i) > -1;
    });
  }
  /**
   * Lookup one or multiple triggers by a certain HTMLElement or NodeList
   * @param {HTMLElement|HTMLElement[]|NodeList} element
   * @returns {Trigger|Trigger[]|null}
   */
  search(t) {
    const e = this.triggers.filter((i) => {
      if (t instanceof NodeList || Array.isArray(t)) {
        let s = !1;
        return t.each((r) => {
          i.element == r && (s = !0);
        }), s;
      }
      return i.element == t;
    });
    return e.length == 0 ? null : e.length > 1 ? e : e[0];
  }
  /**
   * Calls a function on all triggers
   * @param {(function())} callback
   */
  call(t) {
    this.triggers.each(t);
  }
}, Re = class {
  /**
   * ScrollAnimationLoop constructor.
   * Starts a requestAnimationFrame loop as long as the user has scrolled the scrollElement. Stops after a certain time.
   *
   * @param {DefaultOptions.scroll} [options=DefaultOptions.scroll] options The options for the loop
   * @param {ScrollCallback} callback [loop=null] The loop callback
   */
  constructor(t, e) {
    this._parseOptions(t), typeof e == "function" && (this.callback = e), this.direction = "none", this.position = this.getPosition(), this.lastAction = this._getTimestamp(), this._startRun(), this._boundListener = this._didScroll.bind(this), this.element.addEventListener("scroll", this._boundListener);
  }
  /**
   * Parses the options
   *
   * @param {DefaultOptions.scroll} [options=DefaultOptions.scroll] options The options for the loop
   * @private
   */
  _parseOptions(t) {
    let e = new Bt().scroll;
    typeof t != "function" ? (e.callback = () => {
    }, e = vt(e, t)) : e.callback = t, this.element = e.element, this.sustain = e.sustain, this.callback = e.callback, this.startCallback = e.start, this.stopCallback = e.stop, this.directionChange = e.directionChange;
  }
  /**
   * Callback when the user scrolled the element
   * @private
   */
  _didScroll() {
    const t = this.getPosition();
    if (this.position !== t) {
      let e = this.direction;
      t.x !== this.position.x ? e = t.x > this.position.x ? "right" : "left" : t.y !== this.position.y ? e = t.y > this.position.y ? "bottom" : "top" : e = "none", e !== this.direction && (this.direction = e, typeof this.directionChange == "function" && this.directionChange(this.direction)), this.position = t, this.lastAction = this._getTimestamp();
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
    const t = this.element.pageXOffset || this.element.scrollLeft || document.documentElement.scrollLeft || 0, e = this.element.pageYOffset || this.element.scrollTop || document.documentElement.scrollTop || 0;
    return { x: t, y: e };
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
    (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || ((e) => {
      setTimeout(e, 16.666666666666668);
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
const K = gt, He = Be, Fe = Re;
class $e {
  /**
   * Constructor for the scroll trigger
   * @param {DefaultOptions} [options=DefaultOptions] options
   */
  constructor(t) {
    this._parseOptions(t), this._initCollection(), this._initLoop();
  }
  /**
   * Parses the options
   * @param {DefaultOptions} [options=DefaultOptions] options
   * @private
   */
  _parseOptions(t) {
    t = vt(new Bt(), t), this.defaultTrigger = t.trigger, this.scrollOptions = t.scroll;
  }
  /**
   * Initializes the collection, picks all [data-scroll] elements as initial elements
   * @private
   */
  _initCollection() {
    const t = document.querySelectorAll("[data-scroll]");
    let e = [];
    t.length > 0 && (e = this.createTriggers(t)), this.collection = new He(e);
  }
  /**
   * Initializes the scroll loop
   * @private
   */
  _initLoop() {
    this.loop = new Fe({
      sustain: this.scrollOptions.sustain,
      element: this.scrollOptions.element,
      callback: (t, e) => {
        this._scrollCallback(t, e);
      },
      start: () => {
        this._scrollStart();
      },
      stop: () => {
        this._scrollStop();
      },
      directionChange: (t) => {
        this._scrollDirectionChange(t);
      }
    });
  }
  /**
   * Callback for checking triggers
   * @param {{x: number, y: number}} position
   * @param {string} direction
   * @private
   */
  _scrollCallback(t, e) {
    this.collection.call((i) => {
      i.checkVisibility(this.scrollOptions.element, e);
    }), this.scrollOptions.callback(t, e);
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
  _scrollDirectionChange(t) {
    this.scrollOptions.directionChange(t);
  }
  /**
   * Creates a Trigger object from a given element and optional option set
   * @param {HTMLElement} element
   * @param {DefaultOptions.trigger} [options=DefaultOptions.trigger] options
   * @returns Trigger
   */
  createTrigger(t, e) {
    return new K(t, vt(this.defaultTrigger, e));
  }
  /**
   * Creates an array of triggers
   * @param {HTMLElement[]|NodeList} elements
   * @param {Object} [options=null] options
   * @returns {Trigger[]} Array of triggers
   */
  createTriggers(t, e) {
    let i = [];
    return t.each((s) => {
      i.push(this.createTrigger(s, e));
    }), i;
  }
  /**
   * Adds triggers
   * @param {string|HTMLElement|NodeList|Trigger|Trigger[]} objects A list of objects or a query
   * @param {Object} [options=null] options
   * @returns {ScrollTrigger}
   */
  add(t, e) {
    return t instanceof HTMLElement ? (this.collection.add(this.createTrigger(t, e)), this) : t instanceof K ? (this.collection.add(t), this) : t instanceof NodeList ? (this.collection.add(this.createTriggers(t, e)), this) : Array.isArray(t) && t.length && t[0] instanceof K ? (this.collection.add(t), this) : Array.isArray(t) && t.length && t[0] instanceof HTMLElement ? (this.collection.add(this.createTriggers(t, e)), this) : (this.collection.add(this.createTriggers(document.querySelectorAll(t), e)), this);
  }
  /**
   * Removes triggers
   * @param {string|HTMLElement|NodeList|Trigger|Trigger[]} objects A list of objects or a query
   * @returns {ScrollTrigger}
   */
  remove(t) {
    return t instanceof K ? (this.collection.remove(t), this) : Array.isArray(t) && t.length && t[0] instanceof K ? (this.collection.remove(t), this) : t instanceof HTMLElement ? (this.collection.remove(this.search(t)), this) : Array.isArray(t) && t.length && t[0] instanceof HTMLElement ? (this.collection.remove(this.search(t)), this) : t instanceof NodeList ? (this.collection.remove(this.search(t)), this) : Array.isArray(t) && t.length && t[0] instanceof K ? (this.collection.remove(t), this) : (this.collection.remove(this.query(t.toString())), this);
  }
  /**
   * Lookup one or multiple triggers by a query string
   * @param {string} selector
   * @returns {Trigger[]}
   */
  query(t) {
    return this.collection.query(t);
  }
  /**
   * Lookup one or multiple triggers by a certain HTMLElement or NodeList
   * @param {HTMLElement|HTMLElement[]|NodeList} element
   * @returns {Trigger|Trigger[]|null}
   */
  search(t) {
    return this.collection.search(t);
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
const xt = {
  linear: (n) => n,
  smooth: (n) => n * n * (3 - 2 * n),
  // smoothstep
  easeIn: (n) => n * n * n,
  easeOut: (n) => 1 - Math.pow(1 - n, 3),
  easeInOut: (n) => n < 0.5 ? 4 * n * n * n : 1 - Math.pow(-2 * n + 2, 3) / 2,
  quadIn: (n) => n * n,
  quadOut: (n) => 1 - (1 - n) * (1 - n),
  quartOut: (n) => 1 - Math.pow(1 - n, 4),
  expoOut: (n) => n === 1 ? 1 : 1 - Math.pow(2, -10 * n),
  backOut: (n) => 1 + 2.70158 * Math.pow(n - 1, 3) + 1.70158 * Math.pow(n - 1, 2),
  backIn: (n) => 2.70158 * n * n * n - 1.70158 * n * n,
  bounceOut: (n) => n < 1 / 2.75 ? 7.5625 * n * n : n < 2 / 2.75 ? 7.5625 * (n -= 1.5 / 2.75) * n + 0.75 : n < 2.5 / 2.75 ? 7.5625 * (n -= 2.25 / 2.75) * n + 0.9375 : 7.5625 * (n -= 2.625 / 2.75) * n + 0.984375,
  elasticOut: (n) => {
    const t = 2 * Math.PI / 3;
    return n === 0 ? 0 : n === 1 ? 1 : Math.pow(2, -10 * n) * Math.sin((n * 10 - 0.75) * t) + 1;
  }
};
function We(n) {
  return typeof n == "function" ? n : xt[n] || xt.easeOut;
}
class Ve {
  constructor() {
    this._subs = /* @__PURE__ */ new Set(), this._running = !1, this._frame = this._frame.bind(this), this._last = 0;
  }
  add(t) {
    return this._subs.add(t), this._running || (this._running = !0, this._last = null, requestAnimationFrame(this._frame)), () => this.remove(t);
  }
  remove(t) {
    this._subs.delete(t);
  }
  _frame(t) {
    if (!this._subs.size) {
      this._running = !1;
      return;
    }
    this._last == null && (this._last = t);
    const e = Math.min(Math.max((t - this._last) / 1e3, 0), 0.1);
    this._last = t;
    for (const i of [...this._subs]) i(e, t);
    requestAnimationFrame(this._frame);
  }
}
const tt = new Ve(), Ct = (n) => !!n && n.nodeType === 1, Ue = (n) => !!n && typeof n.length == "number" && typeof n.item == "function";
function Rt(n) {
  return n == null ? [] : typeof n == "string" ? Array.from(document.querySelectorAll(n)) : Ct(n) ? [n] : Array.isArray(n) || Ue(n) ? Array.from(n).flatMap((t) => Rt(t)) : [n];
}
const Ht = [
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
], Ke = {
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
}, Ge = /* @__PURE__ */ new Set([
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
function nt(n) {
  let t = Yt.get(n);
  return t || (t = { transform: { ...Ke } }, Yt.set(n, t)), t;
}
function je(n) {
  const t = nt(n).transform, e = (a) => Math.round(a * 1e3) / 1e3;
  let i = "";
  t.perspective && (i += `perspective(${e(t.perspective)}px) `), (t.x || t.y || t.z) && (i += `translate3d(${e(t.x)}px, ${e(t.y)}px, ${e(t.z)}px) `), t.rotate && (i += `rotate(${e(t.rotate)}deg) `), t.rotateX && (i += `rotateX(${e(t.rotateX)}deg) `), t.rotateY && (i += `rotateY(${e(t.rotateY)}deg) `), (t.skewX || t.skewY) && (i += `skew(${e(t.skewX)}deg, ${e(t.skewY)}deg) `);
  const s = t.scaleX !== 1 ? t.scaleX : t.scale, r = t.scaleY !== 1 ? t.scaleY : t.scale;
  (s !== 1 || r !== 1) && (i += `scale(${e(s)}, ${e(r)}) `), n.style.transform = i.trim();
}
function Nt(n) {
  if (typeof n != "string") return null;
  if (n = n.trim(), n[0] === "#") {
    let e = n.slice(1);
    if (e.length === 3 && (e = e.split("").map((s) => s + s).join("")), e.length === 6 && (e += "ff"), e.length !== 8) return null;
    const i = parseInt(e, 16);
    return [i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, (i & 255) / 255];
  }
  const t = n.match(/^rgba?\(([^)]+)\)$/i);
  if (t) {
    const e = t[1].split(",").map((i) => parseFloat(i));
    return [e[0], e[1], e[2], e.length > 3 ? e[3] : 1];
  }
  return null;
}
function xe(n, t, e) {
  const i = n.map((s, r) => s + (t[r] - s) * e);
  return `rgba(${Math.round(i[0])}, ${Math.round(i[1])}, ${Math.round(i[2])}, ${+i[3].toFixed(3)})`;
}
function mt(n) {
  if (typeof n == "number") return { num: n, unit: null };
  const t = String(n).trim().match(/^(-?\d*\.?\d+)([a-z%]*)$/i);
  return t ? { num: parseFloat(t[1]), unit: t[2] || null } : null;
}
function yt(n, t) {
  const e = Ct(n);
  if (e && Ht.includes(t))
    return nt(n).transform[t];
  if (e) {
    const i = getComputedStyle(n);
    return t in n.style || i[t] !== void 0 ? i[t] : n[t];
  }
  return n[t];
}
function Qt(n, t, e) {
  const i = mt(e);
  if (!i) return 0;
  if (i.unit === "%" && (t === "x" || t === "y")) {
    const s = t === "x" ? n.offsetWidth : n.offsetHeight;
    return i.num / 100 * s;
  }
  return i.num;
}
function Ze(n, t, e, i) {
  const s = Ct(n);
  if (s && Ht.includes(t)) {
    const o = e != null ? Qt(n, t, e) : nt(n).transform[t], l = Qt(n, t, i);
    return (c) => {
      nt(n).transform[t] = o + (l - o) * c, je(n);
    };
  }
  const r = Nt(i);
  if (r) {
    const o = e ?? yt(n, t), l = Nt(o) || [0, 0, 0, 1];
    return (c) => {
      const h = xe(l, r, c);
      s ? n.style[t] = h : n[t] = h;
    };
  }
  const a = mt(i);
  if (a) {
    let o = e != null ? mt(e) : mt(yt(n, t));
    o || (o = { num: 0, unit: a.unit });
    const l = a.unit ?? o.unit ?? "", c = o.num, h = a.num;
    return (d) => {
      const u = c + (h - c) * d;
      s ? n.style[t] = l ? u + l : String(u) : n[t] = u;
    };
  }
  if (typeof i == "string") {
    const o = e != null ? String(e) : String(yt(n, t) ?? "");
    let l = ee(o, i);
    if (!l && s && (l = ee(
      _t(t, o),
      _t(t, i)
    )), l)
      return (c) => {
        const h = l(c);
        s ? n.style[t] = h : n[t] = h;
      };
  }
  return (o) => {
    o >= 1 && (s ? n.style[t] = i : n[t] = i);
  };
}
function _t(n, t) {
  if (!t || typeof document > "u") return t;
  const e = _t._el || (_t._el = document.createElement("div"));
  try {
    return e.style[n] = "", e.style[n] = t, e.style[n] || t;
  } catch {
    return t;
  }
}
function Jt(n) {
  const t = /(#[0-9a-f]{3,8}\b|rgba?\([^)]*\))|(-?\d*\.?\d+(?:e[-+]?\d+)?)/gi, e = [];
  let i = 0, s;
  for (; (s = t.exec(n)) !== null; ) {
    if (s.index > i && e.push(n.slice(i, s.index)), s[1] !== void 0) {
      const r = Nt(s[1]);
      r ? e.push({ c: r }) : e.push(s[1]);
    } else
      e.push({ n: parseFloat(s[2]) });
    i = t.lastIndex;
  }
  return i < n.length && e.push(n.slice(i)), e;
}
function te(n) {
  return n.replace(/\s+/g, " ").toLowerCase();
}
function ee(n, t) {
  const e = Jt(n), i = Jt(t);
  if (e.length !== i.length) return null;
  let s = 0;
  for (let a = 0; a < e.length; a++) {
    const o = e[a], l = i[a], c = typeof o == "string";
    if (c !== (typeof l == "string")) return null;
    if (c) {
      if (te(o) !== te(l)) return null;
    } else {
      if ("n" in o != "n" in l)
        return null;
      s++;
    }
  }
  if (!s) return null;
  const r = (a) => Math.round(a * 1e3) / 1e3;
  return (a) => {
    let o = "";
    for (let l = 0; l < i.length; l++) {
      const c = i[l];
      if (typeof c == "string") {
        o += c;
        continue;
      }
      const h = e[l];
      "n" in c ? o += r(h.n + (c.n - h.n) * a) : o += xe(h.c, c.c, a);
    }
    return o;
  };
}
class F {
  /**
   * @param {*} targets selector | Element | NodeList | array | plain object
   * @param {object} vars animatable props + config (duration, delay, ease,
   *                      repeat, yoyo, stagger, paused, onStart/Update/Complete)
   * @param {object|null} fromVars explicit starting values (fromTo)
   * @param {boolean} runBackwards true = "fromState" mode
   */
  constructor(t, e, i = null, s = !1) {
    this.targets = Rt(t), this.vars = e, this.duration = e.duration ?? 0.8, this.delay = e.delay ?? 0, this.ease = We(e.ease), this.repeat = e.repeat ?? 0, this.yoyo = !!e.yoyo, this.stagger = e.stagger ?? 0, this._props = null, this._fromVars = i, this._runBackwards = s, this._elapsed = 0, this._playing = !1, this._done = !1, this._started = !1, this._unsub = null, this.paused = !!e.paused, this.paused ? (this._fromVars || this._runBackwards) && e.renderStart !== !1 && this._render(0) : this.duration <= 0 && this.delay <= 0 && this.stagger <= 0 ? (this.progress(1), this._done = !0, e.onComplete && e.onComplete(this)) : this.play();
  }
  /* total length incl. delay, stagger and repeats (seconds) */
  totalDuration() {
    const t = this.stagger * Math.max(this.targets.length - 1, 0);
    return this.delay + (this.duration + t) * (this.repeat + 1);
  }
  _build() {
    if (this._props) return;
    this._props = [];
    const t = Object.keys(this.vars).filter((i) => !Ge.has(i)), e = (i, s) => typeof i == "function" ? i(s) : i;
    for (const i of this.targets)
      for (const s of t) {
        let r = this._fromVars ? e(this._fromVars[s], i) : null, a = e(this.vars[s], i);
        this._runBackwards && (r = this.vars[s], a = yt(i, s), Ct(i) && Ht.includes(s) && (a = nt(i).transform[s])), this._props.push({ target: i, apply: Ze(i, s, r, a) });
      }
    (this._runBackwards || this._fromVars) && this._render(0);
  }
  _render(t) {
    this._build();
    const e = this.targets.length, i = Math.max(this.duration, 1e-9), s = this.stagger * Math.max(e - 1, 0), r = Math.max(i + s, 1e-9);
    for (const a of this._props) {
      const o = this.targets.indexOf(a.target), l = this.stagger * o;
      let c = (t * r - l) / i;
      c = Math.min(Math.max(c, 0), 1), a.apply(this.ease(c));
    }
  }
  /** Set progress manually, 0..1 (used by scrub + sequences). */
  progress(t) {
    t = Math.min(Math.max(t, 0), 1);
    let e = t;
    if (this.repeat > 0) {
      const i = 1 / (this.repeat + 1), s = Math.min(Math.floor(t / i), this.repeat);
      e = (t - s * i) / i, this.yoyo && s % 2 === 1 && (e = 1 - e);
    }
    return this._render(e), this;
  }
  play() {
    return this._playing ? this : (this._done && (this._elapsed = 0, this._done = !1), this._playing = !0, this.paused = !1, this._unsub = tt.add((t) => this._tick(t)), this);
  }
  pause() {
    return this._playing = !1, this.paused = !0, this._unsub && (this._unsub(), this._unsub = null), this;
  }
  restart() {
    return this._elapsed = 0, this._done = !1, this._started = !1, this.play();
  }
  reverse() {
    const t = this.totalDuration();
    return this._elapsed = Math.max(t - this._elapsed, 0), this._reversed = !this._reversed, this._playing || this.play(), this;
  }
  /** Drop built interpolators; the next render re-reads current values
   *  and re-evaluates any function values (e.g. after a resize). */
  invalidate() {
    return this._props = null, this;
  }
  kill() {
    return this.pause(), this._props = null, this;
  }
  _tick(t) {
    this._elapsed += t;
    const e = this.totalDuration();
    let i = this._elapsed - this.delay;
    if (i < 0) return;
    this._started || (this._started = !0, this.vars.onStart && this.vars.onStart(this));
    const s = e - this.delay;
    let r = s <= 0 ? 1 : Math.min(i / s, 1);
    this._reversed && (r = 1 - r), this.progress(r), this.vars.onUpdate && this.vars.onUpdate(this), i >= s && (this._done = !0, this.pause(), this.vars.onComplete && this.vars.onComplete(this));
  }
}
function St(n, t) {
  return new F(n, t);
}
function _e(n, t) {
  return new F(n, t, null, !0);
}
function At(n, t, e) {
  return new F(n, e, t);
}
function Se(n, t) {
  return new F(n, { ...t, duration: 0, delay: 0, stagger: 0 });
}
class Ft {
  constructor(t = {}) {
    this.options = t, this.steps = [], this._cursor = 0, this._elapsed = 0, this._playing = !1, this._unsub = null, this.paused = !!t.paused;
  }
  /**
   * Add a step.
   * @param {*} targets
   * @param {object} vars
   * @param {number|string} position seconds | '<' (with previous) | '+=0.2' | '-=0.1'
   */
  step(t, e, i) {
    return this._place(new F(t, { ...e, paused: !0 }), i);
  }
  /**
   * Add a step with explicit starting values — essential when several steps
   * animate the SAME property of the SAME target (e.g. a color journey).
   * The from state is NOT rendered at creation (renderStart: false),
   * so later steps don't stomp earlier ones before their turn.
   */
  fromTo(t, e, i, s) {
    return this._place(
      new F(t, { ...i, paused: !0, renderStart: !1 }, e),
      s
    );
  }
  _place(t, e) {
    let i = this._cursor;
    if (typeof e == "number") i = e;
    else if (e === "<") i = this._lastStart ?? 0;
    else if (typeof e == "string") {
      const s = e.match(/^([+-])=(\d*\.?\d+)$/);
      s && (i = this._cursor + (s[1] === "-" ? -1 : 1) * parseFloat(s[2]));
    }
    return this.steps.push({ tween: t, start: i }), this._lastStart = i, this._cursor = Math.max(this._cursor, i + t.totalDuration()), this;
  }
  /** Add a callback at a point in time. */
  call(t, e) {
    return this.step({}, {
      duration: 1e-3,
      onComplete: t
    }, e);
  }
  //   totalDuration() {
  //     return this.steps.reduce(
  //       (max, s) => Math.max(max, s.start + s.tween.totalDuration()), 0
  //     );
  //   }
  totalDuration() {
    return this.options.duration != null ? this.options.duration : this.steps.reduce(
      (t, e) => Math.max(t, e.start + e.tween.totalDuration()),
      0
    );
  }
  progress(t) {
    t = Math.min(Math.max(t, 0), 1);
    const e = this.totalDuration(), i = t * e, s = this._lastNow !== void 0 && i < this._lastNow;
    this._lastNow = i;
    const r = s ? [...this.steps].reverse() : this.steps;
    for (const a of r) {
      const o = a.tween.totalDuration();
      let l = o <= 0 ? 1 : (i - a.start) / o;
      l = Math.min(Math.max(l, 0), 1), l !== a._last && (l <= 0 && a._last === void 0 || (a.tween.progress(l), a._last = l));
    }
    return this;
  }
  play() {
    return this._playing ? this : (this._playing = !0, this.paused = !1, this._unsub = tt.add((t) => {
      this._elapsed += t;
      const e = this.totalDuration(), i = e <= 0 ? 1 : Math.min(this._elapsed / e, 1);
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
    for (const t of this.steps)
      t.tween.invalidate(), t._last = void 0;
    return this._lastNow = void 0, this;
  }
  kill() {
    return this.pause(), this.steps.forEach((t) => t.tween.kill()), this;
  }
}
function $t(n = {}) {
  const t = new Ft(n);
  return n.paused || (t._autoplay = !0, queueMicrotask(() => {
    t._autoplay && !t._playing && t.play();
  })), t;
}
const B = [];
let ie = !1, W = null;
function Ae(n) {
  W = n || null, B.length && rt.refreshAll();
}
function se() {
  return W ? W.scrollY() : window.scrollY || window.pageYOffset;
}
function Qe() {
  if (ie || typeof window > "u") return;
  ie = !0;
  let n = null;
  const t = () => {
    n || (n = requestAnimationFrame(() => {
      n = null;
      for (const e of B) e._update();
    }));
  };
  window.addEventListener("scroll", t, { passive: !0 }), window.addEventListener("resize", () => rt.refreshAll());
}
function dt(n, t) {
  return n === "top" || n === "left" || n === "start" ? 0 : n === "center" || n === "middle" ? t * 0.5 : n === "bottom" || n === "right" || n === "end" ? t : n.endsWith("%") ? parseFloat(n) / 100 * t : parseFloat(n) || 0;
}
let rt = class {
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
  constructor(t) {
    if (this.opts = t, this.trigger = typeof t.trigger == "string" ? document.querySelector(t.trigger) : t.trigger, !this.trigger) throw new Error("ScrollScene: trigger not found");
    this.animation = t.animation || null, this.animation && this.animation.pause(), this.scrub = t.scrub ?? !1, this.pin = t.pin === !0 ? this.trigger : typeof t.pin == "string" ? document.querySelector(t.pin) : t.pin || null, this.reserveSpace = t.reserveSpace !== !1, this.once = !!t.once, this._active = !1, this._entered = !1, this._progress = 0, this._smoothed = 0, this._scrubPrimed = !1, this._pinned = !1, this._spacer = null, this._killed = !1, B.push(this), Qe(), this.refresh(), this._update(!0);
  }
  /* ------------ measurement ------------ */
  refresh() {
    if (this._killed) return;
    this.opts.remeasure && this.animation && this.animation.invalidate && this.animation.invalidate(), this._unpin(!0);
    const t = window.innerHeight, e = this.trigger.getBoundingClientRect(), i = se(), s = e.top + i, r = e.height, a = this.opts.start || "top bottom", o = this.opts.end || "bottom top", [l, c] = a.split(/\s+/);
    if (this.startY = s + dt(l, r) - dt(c || "bottom", t), /^\+=/.test(o)) {
      const h = o.slice(2);
      this.endY = this.startY + (h.endsWith("%") ? parseFloat(h) / 100 * t : parseFloat(h));
    } else {
      const [h, d] = o.split(/\s+/);
      this.endY = s + dt(h, r) - dt(d || "top", t);
    }
    if (this.endY <= this.startY && (this.endY = this.startY + 1), this.pin) {
      const h = this.pin.getBoundingClientRect();
      this._pinGeom = {
        left: h.left,
        width: h.width,
        height: h.height,
        viewportTop: h.top + i - this.startY,
        // where it sits when pinning begins
        distance: this.endY - this.startY
      }, this._ensureSpacer();
    }
    this.opts.markers && this._drawMarkers();
  }
  static refreshAll() {
    for (const t of B) t.refresh();
    for (const t of B) t._update(!0);
  }
  /** Update every scene against the current scroll value.
   *  Called by smooth-scroll plugins on each animation frame. */
  static updateAll() {
    for (const t of B) t._update();
  }
  /* ------------ per-scroll update ------------ */
  _update(t = !1) {
    if (this._killed || this._preview) return;
    const e = se(), i = (e - this.startY) / (this.endY - this.startY), s = Math.min(Math.max(i, 0), 1), r = this._active;
    if (this._active = i >= 0 && i <= 1, this._progress = s, this._active && !r ? (i >= 0 && (this._lastRaw ?? -1) < 0 || t ? this.opts.onEnter && this.opts.onEnter(this) : this.opts.onEnterBack && this.opts.onEnterBack(this), this._entered = !0) : !this._active && r && (i > 1 ? this.opts.onLeave && this.opts.onLeave(this) : this.opts.onLeaveBack && this.opts.onLeaveBack(this)), this._lastRaw = i, this.pin) {
      let a = e;
      const o = W && W.pinAbsolute ? 0 : this.opts.pinLookahead;
      if (o) {
        const l = typeof performance < "u" ? performance.now() : Date.now();
        if (this._velTime !== void 0) {
          const c = Math.max(l - this._velTime, 1) / 1e3;
          this._vel = (e - this._velY) / c;
        }
        if (this._velTime = l, this._velY = e, this._vel) {
          const c = Math.min(window.innerHeight, (this.endY - this.startY) * 0.9), h = Math.max(-c, Math.min(c, this._vel * (o / 60)));
          a = e + h;
        }
      }
      this._applyPin(a);
    }
    if (this.animation)
      if (this.scrub) {
        if (this.scrub === !0)
          (s !== this._lastP || t) && (this.animation.progress(s), this._lastP = s);
        else if (this._targetP = s, !this._scrubPrimed)
          this._scrubPrimed = !0, this._smoothed = s, this.animation.progress(s);
        else if (!this._scrubTicking && (t || Math.abs(this._targetP - this._smoothed) > 1e-4)) {
          this._scrubTicking = !0;
          const a = 1 / Math.max(Number(this.scrub), 0.01), o = tt.add((l) => {
            this._smoothed += (this._targetP - this._smoothed) * Math.min(l * a, 1), this.animation.progress(this._smoothed), Math.abs(this._targetP - this._smoothed) < 5e-4 && (this.animation.progress(this._targetP), o(), this._scrubTicking = !1);
          });
        }
      } else
        this._active && !r && i >= 0 ? this.once && this._playedOnce || (this.animation.restart(), this._playedOnce = !0) : !this._active && r && i < 0 && !this.once && (this.animation.pause(), this.animation.progress(0));
    this.opts.onProgress && this.opts.onProgress(s, this);
  }
  /* ------------ pin mechanics ------------ */
  _applyPin(t) {
    const e = this._pinGeom, i = this.pin;
    if (t < this.startY) {
      this._unpin();
      return;
    }
    this._ensureSpacer(), t >= this.startY && t < this.endY ? W && W.pinAbsolute ? (this._pinPhase = "active-abs", Object.assign(i.style, {
      position: "absolute",
      top: t - this.startY + "px",
      left: "0",
      width: e.width + "px",
      margin: "0"
    })) : this._pinPhase !== "fixed" && (this._pinPhase = "fixed", Object.assign(i.style, {
      position: "fixed",
      top: e.viewportTop + "px",
      left: e.left + "px",
      width: e.width + "px",
      margin: "0"
    })) : this._pinPhase !== "after" && (this._pinPhase = "after", Object.assign(i.style, {
      position: "absolute",
      top: e.distance + "px",
      left: "0",
      width: e.width + "px",
      margin: "0"
    })), this._pinned = !0;
  }
  _ensureSpacer() {
    if (this._spacer) return;
    const t = this._pinGeom, e = document.createElement("div");
    if (e.className = "kinetra-pin-spacer", e.style.position = "relative", e.style.width = "100%", e.style.height = (this.reserveSpace ? t.height + t.distance : t.height) + "px", e.style.overflowAnchor = "none", this.opts.pinBackground) {
      const i = this.opts.pinBackground === !0 ? getComputedStyle(this.pin).backgroundColor : this.opts.pinBackground;
      i && i !== "transparent" && i !== "rgba(0, 0, 0, 0)" && (e.style.backgroundColor = i);
    }
    this.pin.parentNode.insertBefore(e, this.pin), e.appendChild(this.pin), this._spacer = e;
  }
  _unpin(t = !1) {
    if (this._pinned) {
      const e = this.pin;
      e.style.position = "", e.style.top = "", e.style.left = "", e.style.width = "", e.style.margin = "", this._pinned = !1, this._pinPhase = null;
    }
    t && this._spacer && (this._spacer.parentNode.insertBefore(this.pin, this._spacer), this._spacer.remove(), this._spacer = null);
  }
  /* ------------ debug markers ------------ */
  _drawMarkers() {
    this._markers?.forEach((e) => e.remove());
    const t = (e, i, s) => {
      const r = document.createElement("div");
      return r.textContent = i, Object.assign(r.style, {
        position: "absolute",
        top: e + "px",
        right: "0",
        borderTop: `2px dashed ${s}`,
        color: s,
        fontSize: "11px",
        fontFamily: "monospace",
        padding: "2px 6px",
        zIndex: 99999,
        pointerEvents: "none"
      }), document.body.appendChild(r), r;
    };
    this._markers = [
      t(this.startY + window.innerHeight * 0, "scene start", "#0a8a4a"),
      t(this.endY, "scene end", "#c0392b")
    ];
  }
  /* ------------ teardown ------------ */
  kill() {
    this._killed = !0, this._unpin(!0), this._markers?.forEach((e) => e.remove());
    const t = B.indexOf(this);
    t > -1 && B.splice(t, 1), this.animation && this.animation.kill();
  }
};
function Ee(n) {
  return new rt(n);
}
function Te() {
  [...B].forEach((n) => n.kill());
}
function Wt(n) {
  Rt(n).forEach((t) => Yt.delete(t));
}
function Ce(n, t = {}) {
  const e = typeof n == "string" ? document.querySelector(n) : n;
  if (!e) throw new Error("splitText: target not found");
  const i = t.by || "words", s = !!t.mask, r = e.innerHTML, a = e.textContent, o = [], l = [], c = document.createDocumentFragment();
  for (const p of a.split(/(\s+)/)) {
    if (!p) continue;
    if (/^\s+$/.test(p)) {
      c.appendChild(document.createTextNode(p));
      continue;
    }
    const f = document.createElement("span");
    if (f.className = "kinetra-word", f.style.display = "inline-block", i === "chars")
      for (const m of p) {
        const y = document.createElement("span");
        y.className = "kinetra-char", y.style.display = "inline-block", y.textContent = m, f.appendChild(y), l.push(y);
      }
    else
      f.textContent = p;
    o.push(f), c.appendChild(f);
  }
  e.innerHTML = "", e.appendChild(c);
  const h = [];
  if (i === "lines") {
    const p = [];
    let f = [], m = null;
    for (const y of o) {
      const b = y.offsetTop;
      m === null || Math.abs(b - m) <= 2 ? (f.push(y), m === null && (m = b)) : (p.push(f), f = [y], m = b);
    }
    f.length && p.push(f), e.innerHTML = "";
    for (const y of p) {
      const b = document.createElement("span");
      b.className = "kinetra-line", b.style.display = "block", y.forEach((_, T) => {
        T > 0 && b.appendChild(document.createTextNode(" ")), b.appendChild(_);
      }), e.appendChild(b), h.push(b);
    }
  }
  const d = i === "chars" ? l : i === "lines" ? h : o;
  if (s)
    for (const p of d) {
      const f = document.createElement("span");
      f.className = "kinetra-mask", f.style.display = p.style.display === "block" ? "block" : "inline-block", f.style.overflow = "hidden", f.style.verticalAlign = "top", p.parentNode.insertBefore(f, p), f.appendChild(p);
    }
  const u = e.hasAttribute("aria-label"), g = e.getAttribute("aria-label");
  e.setAttribute("aria-label", a);
  for (const p of e.children) p.setAttribute("aria-hidden", "true");
  return {
    element: e,
    words: o,
    chars: l,
    lines: h,
    targets: d,
    revert() {
      e.innerHTML = r, u ? e.setAttribute("aria-label", g) : e.removeAttribute("aria-label");
    }
  };
}
const Je = {
  animate: St,
  fromState: _e,
  fromTo: At,
  setNow: Se,
  sequence: $t,
  Sequence: Ft,
  Tween: F,
  ScrollScene: rt,
  scrollScene: Ee,
  killAllScenes: Te,
  registerScrollSource: Ae,
  splitText: Ce,
  easings: xt,
  ticker: tt,
  clearState: Wt
}, Le = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ScrollScene: rt,
  Sequence: Ft,
  Tween: F,
  animate: St,
  clearState: Wt,
  default: Je,
  easings: xt,
  fromState: _e,
  fromTo: At,
  killAllScenes: Te,
  registerScrollSource: Ae,
  scrollScene: Ee,
  sequence: $t,
  setNow: Se,
  splitText: Ce,
  ticker: tt
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
const ti = "[data-bottom-top],[data-center],[data-center-bottom],[data-100-top],[data-50-top],[data-top],[data-top-bottom],[data-center-top],[data--300-bottom],[data--150-bottom],[data--50-bottom],[data-bottom],[data-100-bottom],[data-150-bottom],[data-400-bottom],[data--400-bottom],[data--200-bottom],[data--100-bottom],[data-50-bottom],[data-200-bottom],[data-300-bottom],[data-in],[data-in-150],[data-in-300],[data-cen--150],[data-cen],[data-cen-150],[data-out--300],[data-out--150],[data-out][data-t],[data-t-100],[data-t-200],[data-t-300],[data-t-400],[data-t-500],[data-t-600],[data-t-700],[data-t-800],[data-t-900],[data-t-1000],[data-t-1100],[data-t-1200],[data-t-1300],[data-t-1400],[data-t-1500],[data-t-1600],[data-t-1700],[data-t-1800],[data-t-1900],[data-t-2000],[data-t-2100],[data-t-2200],[data-t-2300],[data-t-2400],[data-t-2500],[data-t-2600],[data-t-2700],[data-t-2800]", ei = [
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
], Z = [0];
for (let n = 100; n <= 2800; n += 100) Z.push(n);
function ii(n) {
  return n < 730 ? -200 : n >= 730 && n < 790 ? -100 : n >= 790 && n < 840 ? 0 : n >= 840 && n < 1125 ? 100 : 200;
}
function si(n) {
  const t = /(\w+)\((.+?)\)/g, e = {};
  let i;
  for (; i = t.exec(n); )
    e[i[1]] = e[i[1]] ? e[i[1]].concat([i[2]]) : [i[2]];
  return e;
}
function Q(n, t) {
  let e = {};
  const i = n.getAttribute(t);
  return i && i.split(";").forEach((r) => {
    if (r.indexOf("transform") !== -1 && (e = si(r)), r.indexOf("opacity") !== -1) {
      const a = r.replace("opacity:", "").replace(";", "");
      e.opacity = [parseFloat(a)];
    }
  }), e;
}
function ne(n, t, e, i) {
  if (t) {
    if (t.translateY) {
      let s;
      t.translateY[0].indexOf("%") !== -1 ? s = parseFloat(t.translateY[0]) / 100 * window.innerHeight : s = parseFloat(t.translateY[0]), (n.translateY || (n.translateY = [])).push({ anchor: e, offset: i, val: s });
    }
    if (t.translateX) {
      let s;
      t.translateX[0].indexOf("%") !== -1 ? s = parseFloat(t.translateX[0]) / 100 * window.innerWidth : s = parseFloat(t.translateX[0]), (n.translateX || (n.translateX = [])).push({ anchor: e, offset: i, val: s });
    }
    t.scale && (n.scale || (n.scale = [])).push({ anchor: e, offset: i, val: parseFloat(t.scale[0]) }), t.rotate && (n.rotate || (n.rotate = [])).push({ anchor: e, offset: i, val: parseFloat(t.rotate[0]) }), t.opacity && (n.opacity || (n.opacity = [])).push({ anchor: e, offset: i, val: parseFloat(t.opacity[0]) });
  }
}
function ni(n, t) {
  const e = n.hasAttribute("data-xs"), i = n.hasAttribute("data-sm"), s = n.hasAttribute("data-md"), r = /* @__PURE__ */ new Map(), a = (l, c) => c === 0 ? l : l + "-" + c;
  if (t > 1280 || t > 970 && t <= 1280 && !s || t > 760 && t <= 970 && !i || t <= 760 && !e)
    for (const l of Z)
      r.set(l, Q(n, a("data-t", l)));
  if (t > 970 && t <= 1280 && s)
    for (const l of Z) {
      const c = a("data-md-t", l);
      n.hasAttribute(c) && r.set(l, Q(n, c));
    }
  if (t > 760 && t <= 970 && i || t <= 760 && !e && i)
    for (const l of Z) {
      const c = a("data-sm-t", l);
      n.hasAttribute(c) && r.set(l, Q(n, c));
    }
  if (t <= 414 && e)
    for (const l of Z) {
      const c = a("data-xs-t", l);
      n.hasAttribute(c) && r.set(l, Q(n, c));
    }
  return r;
}
function ri(n, t) {
  const e = {};
  for (const [r, a, o] of ei) {
    let l;
    r === "data-out" && t <= 970 && n.hasAttribute("m-data-out") ? l = Q(n, "m-data-out") : l = Q(n, r), Object.keys(l).length !== 0 && ne(e, l, a, o);
  }
  const i = ni(n, t), s = ii(window.innerHeight);
  for (const r of Z) {
    const a = i.get(r);
    a && Object.keys(a).length !== 0 && ne(e, a, "in", r + s);
  }
  return e;
}
function j() {
  return window.scrollY || window.pageYOffset || 0;
}
function oi(n) {
  const t = j(), e = n.getBoundingClientRect(), i = n.closest(".pin-wrap");
  let s;
  if (i && i.firstElementChild) {
    const o = i.getBoundingClientRect(), l = i.firstElementChild.getBoundingClientRect();
    s = o.top + t + (e.top - l.top);
  } else
    s = e.top + t;
  const r = e.height, a = window.innerHeight;
  return {
    in: s - a,
    center: s + r / 2 - a / 2,
    out: s + r
  };
}
function et(n, t) {
  const e = n.length;
  if (e === 0) return null;
  if (t <= n[0].pos) return n[0].val;
  if (t >= n[e - 1].pos) return n[e - 1].val;
  for (let i = 1; i < e; i++)
    if (t <= n[i].pos) {
      const s = n[i - 1], r = n[i], a = r.pos - s.pos;
      return a <= 0 ? r.val : s.val + (r.val - s.val) * ((t - s.pos) / a);
    }
  return n[e - 1].val;
}
const kt = (n) => Math.round(n * 100) / 100, re = (n) => Math.round(n * 1e4) / 1e4;
class Vt {
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
  constructor(t = {}) {
    const e = {
      smoothing: void 0,
      transition: void 0,
      legacyTransition: !0
      // false = pre-1.1 scrub behaviour
    };
    this.settings = Object.assign({}, e, t), this.legacyTransition = this.settings.legacyTransition === !1 ? "" : Vt.LEGACY_TRANSITION, typeof this.settings.smoothing != "number" && (this.settings.smoothing = this.settings.transition ? 0.1 : 0), this.legacyTransition && (this.settings.smoothing = 0), this.elements = [], this.records = [], this.engine = "kinetra", this._stopTicker = null, this._onResize = null, this._onLoad = null, this._soft = 0;
  }
  init() {
    if (this._stopTicker) return;
    this._soft = j(), this.refresh(), this._stopTicker = tt.add((e) => this._tick(e));
    let t = null;
    this._onResize = () => {
      t && clearTimeout(t), t = setTimeout(() => this._remeasure(), 100);
    }, window.addEventListener("resize", this._onResize), document.readyState !== "complete" && (this._onLoad = () => this._remeasure(), window.addEventListener("load", this._onLoad, { once: !0 }));
  }
  /* Re-parse all attributes and rebuild every record.
   * Same contract as the old Skrollrr.refresh(). */
  refresh() {
    this.records.forEach((s) => {
      s.dead = !0;
      const r = s.elm;
      r.style && (r.style.transition && (r.style.transition = ""), r.style.transform && (r.style.transform = ""));
    }), this.records = [], this.elements = [];
    const t = document.body.hasAttribute("data-skrollrr-off"), e = window.innerWidth, i = document.querySelectorAll(ti);
    i.forEach((s) => {
      s.style.transform = "";
    }), i.forEach((s) => {
      let r = !1;
      if (e <= 760 && s.closest(".m-skrollrr-off") && (r = !0), t || r) {
        s.style.transform = "", s.style.transition = "", s.style.opacity = "";
        return;
      }
      s.style.transition = "";
      const a = {
        elm: s,
        frames: ri(s, e),
        // prop -> [{anchor, offset, val}]
        resolved: null,
        // prop -> [{pos, val}] (sorted)
        hardLock: s.getAttribute("data-smooth-scrolling") === "off",
        lastTransform: null,
        lastOpacity: null,
        dead: !1
      };
      this._measure(a), this.records.push(a), this.elements.push(s), this._render(a, j()), setTimeout(() => {
        a.dead || (s.style.opacity = 1, a.lastOpacity = null, a.lastTransform = null, this.legacyTransition && !a.hardLock && (s.style.transition = this.legacyTransition));
      }, 100);
    }), this._soft = j();
  }
  destroy() {
    this._stopTicker && (this._stopTicker(), this._stopTicker = null), this._onResize && (window.removeEventListener("resize", this._onResize), this._onResize = null), this._onLoad && (window.removeEventListener("load", this._onLoad), this._onLoad = null), this.records.forEach((t) => {
      t.dead = !0, t.elm.style.transform = "", t.elm.style.transition = "";
    }), this.records = [], this.elements = [];
  }
  /* ---------- internals ---------- */
  _measure(t) {
    const e = oi(t.elm), i = {};
    for (const s in t.frames) {
      const r = t.frames[s].map((a) => ({
        pos: e[a.anchor] + a.offset,
        val: a.val
      }));
      r.sort((a, o) => a.pos - o.pos), i[s] = r;
    }
    t.resolved = i;
  }
  _remeasure() {
    const t = !!this.legacyTransition;
    for (const i of this.records)
      t && (i.elm.style.transition = ""), i.elm.style.transform = "", i.lastTransform = null;
    for (const i of this.records) this._measure(i);
    const e = j();
    this._soft = e;
    for (const i of this.records) this._render(i, e);
    t && setTimeout(() => {
      for (const i of this.records)
        i.dead || i.hardLock || (i.elm.style.transition = this.legacyTransition);
    }, 100);
  }
  _tick(t) {
    const e = j(), i = this.settings.smoothing;
    if (i > 0) {
      const s = 1 - Math.exp(-t / i);
      this._soft += (e - this._soft) * s, Math.abs(e - this._soft) < 0.05 && (this._soft = e);
    } else
      this._soft = e;
    for (const s of this.records)
      this._render(s, s.hardLock ? e : this._soft);
  }
  _render(t, e) {
    const i = t.resolved;
    if (!i) return;
    let s = "";
    if (i.translateX && (s += "translateX(" + kt(et(i.translateX, e)) + "px) "), i.translateY && (s += "translateY(" + kt(et(i.translateY, e)) + "px) "), i.rotate && (s += "rotate(" + kt(et(i.rotate, e)) + "deg) "), i.scale && (s += "scale(" + re(et(i.scale, e)) + ")"), s = s.trim(), s !== t.lastTransform && (t.elm.style.transform = s, t.lastTransform = s), i.opacity) {
      const r = String(re(et(i.opacity, e)));
      r !== t.lastOpacity && (t.elm.style.opacity = r, t.lastOpacity = r);
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
class ai {
  /**
   * @param {object}   cfg
   * @param {Element}  cfg.root              content root (e.g. .is-wrapper).
   * @param {Document} [cfg.doc=document]    document to listen on (iframe doc).
   * @param {string}   [cfg.editableSelector='[contenteditable="true"]']
   * @param {boolean}  [cfg.debug=false]
   */
  constructor(t = {}) {
    if (!t.root) throw new Error("FocusGate: `root` is required");
    this.root = t.root, this.doc = t.doc || document, this.win = this.doc.defaultView || window, this.editableSelector = t.editableSelector || '[contenteditable="true"]', this.keepSelectionSelector = t.keepSelectionSelector || ".keep-selection", this.debug = !!t.debug, this.effects = [], this._activeEditable = null, this._suspended = !1, this._raf = 0, this._activateAt = null, this._nativeClick = !1, this._onPointerDown = this._onPointerDown.bind(this), this._onFocusIn = this._onFocusIn.bind(this), this._onSelectionChange = this._onSelectionChange.bind(this), this._onPointerUp = this._onPointerUp.bind(this), this._onClickCapture = () => {
      this._nativeClick = !0;
    }, this.doc.addEventListener("pointerdown", this._onPointerDown, !0), this.doc.addEventListener("pointerup", this._onPointerUp, !0), this.doc.addEventListener("click", this._onClickCapture, !0), this.doc.addEventListener("focusin", this._onFocusIn, !0), this.doc.addEventListener("selectionchange", this._onSelectionChange);
  }
  /* ============================================================
   * Public API
   * ============================================================ */
  register(t, e) {
    if (!t || !e || typeof e.toPlay != "function" || typeof e.toSource != "function")
      throw new Error("FocusGate.register: need (el, { toPlay, toSource })");
    const i = { el: t, def: e, state: "source" };
    return this.effects.push(i), this._apply(i, this._desired(i)), i;
  }
  unregister(t) {
    const e = this.effects.findIndex((i) => i.el === t);
    e < 0 || (this._apply(this.effects[e], "source"), this.effects.splice(e, 1));
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
      for (const t of this.effects) this._apply(t, "source");
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
    for (const t of this.effects) this._apply(t, "source");
    this.effects = [], this._activeEditable = null;
  }
  /* ============================================================
   * Edit-region resolution
   * ============================================================ */
  _editableOf(t) {
    return t ? (t.nodeType !== 1 && (t = t.parentElement), t ? t.closest(this.editableSelector) : null) : null;
  }
  /** [issue 3] Is this node part of the editor's formatting panel
   *  (.keep-selection)? Clicks/focus there must NOT end the edit session, or the
   *  text re-splits and re-animates while you're applying Bold/underline/etc. */
  _isKeepSelection(t) {
    return !this.keepSelectionSelector || !t ? !1 : (t.nodeType !== 1 && (t = t.parentElement), !!(t && t.closest(this.keepSelectionSelector)));
  }
  /** If a node sits inside a registered effect that has no editable ancestor
   *  yet (ContentBox may attach contentEditable on click), use that element. */
  _registeredElOf(t) {
    for (const e of this.effects)
      if (e.el === t || e.el.contains(t)) return e.el;
    return null;
  }
  _overlaps(t, e) {
    return t === e || t.contains(e) || e.contains(t);
  }
  _isEdited(t) {
    const e = this._activeEditable;
    return !e || !this.doc.contains(e) ? !1 : this._overlaps(e, t);
  }
  _desired(t) {
    return this._suspended ? "source" : this.root.contains(t.el) ? this._isEdited(t.el) ? "source" : "play" : "dead";
  }
  /* ============================================================
   * State application
   * ============================================================ */
  _apply(t, e) {
    if (e === "dead") {
      this._apply(t, "source"), t._dead = !0;
      return;
    }
    if (t.state !== e)
      try {
        e === "source" ? (t.def.toSource(t.el), t.state = "source", t._leftForEdit = this._isEdited(t.el)) : (t.def.toPlay(t.el, { replay: !!t._leftForEdit }), t.state = "play", t._leftForEdit = !1);
      } catch (i) {
        this.debug && console.warn("[focus-gate] effect threw during", e, i);
      }
  }
  _reconcile() {
    for (let t = this.effects.length - 1; t >= 0; t--) {
      const e = this.effects[t];
      if (!this.root.contains(e.el)) {
        this._apply(e, "source"), this.effects.splice(t, 1);
        continue;
      }
      this._apply(e, this._desired(e));
    }
  }
  _scheduleReconcile() {
    this._raf || (this._raf = requestAnimationFrame(() => {
      this._raf = 0, this._reconcile();
    }));
  }
  _setActiveEditable(t) {
    this._activeEditable !== t && (this._activeEditable = t, this._log("active editable →", t && t.tagName), this._reconcile());
  }
  /* ============================================================
   * Caret placement — [issue 1] the single-click fix
   * ------------------------------------------------------------
   * Because we replace innerHTML on pointerdown, the browser's own caret
   * placement is thrown away (its target node is gone). So we compute and set
   * the caret ourselves from the click coordinates, on the freshly-reverted DOM.
   * ============================================================ */
  /** Place a collapsed caret at viewport point (x, y) on the CURRENT DOM. */
  _placeCaretAtPoint(t, e, i) {
    const s = this.doc;
    let r = null;
    if (s.caretRangeFromPoint)
      r = s.caretRangeFromPoint(e, i);
    else if (s.caretPositionFromPoint) {
      const c = s.caretPositionFromPoint(e, i);
      c && c.offsetNode && (r = s.createRange(), r.setStart(c.offsetNode, c.offset), r.collapse(!0));
    }
    if (!r || t && t.nodeType === 1 && t !== r.startContainer && !t.contains(r.startContainer))
      return !1;
    const a = r.startContainer.nodeType === 1 ? r.startContainer : r.startContainer.parentElement, o = t && t.isContentEditable ? t : a && a.closest ? a.closest(this.editableSelector) : null;
    if (o && this.doc.activeElement !== o)
      try {
        o.focus({ preventScroll: !0 });
      } catch {
        o.focus();
      }
    const l = s.getSelection ? s.getSelection() : this.win.getSelection();
    return l ? (l.removeAllRanges(), l.addRange(r), !0) : !1;
  }
  /** Try now; if it fails (host not editable yet), retry once next frame. */
  _ensureCaret(t, e, i) {
    this._placeCaretAtPoint(t, e, i) || requestAnimationFrame(() => {
      const s = t && this.doc.contains(t) ? t : this._activeEditable;
      s && this._placeCaretAtPoint(s, e, i);
    });
  }
  /* ============================================================
   * Event handlers
   * ============================================================ */
  _onPointerDown(t) {
    if (this._suspended || t.button != null && t.button !== 0) return;
    const e = t.target;
    if (!e || this._isKeepSelection(e) || !this.root.contains(e)) return;
    const i = this._editableOf(e) || this._registeredElOf(e);
    if (!i) {
      this._setActiveEditable(null);
      return;
    }
    this._activeEditable = i;
    const s = [];
    for (const r of this.effects)
      r.state === "play" && this._overlaps(i, r.el) && s.push(r);
    if (s.length) {
      const r = t.clientX, a = t.clientY;
      for (const o of s) this._apply(o, "source");
      this._ensureCaret(i, r, a), this._activateAt = { x: r, y: a }, this._nativeClick = !1;
    }
    this._scheduleReconcile();
  }
  // [issue 2] Controls-activation recovery. Runs a frame after pointerup: if a
  // real click reached ContentBuilder (_nativeClick set by our capture listener)
  // we do nothing; if the native click was cancelled by the mid-gesture DOM
  // change, we fire a synthetic one so the cell activates and its icons show.
  _onPointerUp(t) {
    const e = this._activateAt;
    if (this._activateAt = null, !e) return;
    const i = t.clientX - e.x, s = t.clientY - e.y;
    i * i + s * s > 36 || requestAnimationFrame(() => {
      this._nativeClick || this._synthClick(e.x, e.y);
    });
  }
  /** [issue 2] Re-fire a click ContentBuilder can act on, at point (x, y).
   *  Safe because ContentBuilder does not check event.isTrusted. */
  _synthClick(t, e) {
    const i = this.doc.elementFromPoint(t, e);
    if (!i || !this.root.contains(i)) return;
    const s = this.win.MouseEvent || MouseEvent;
    i.dispatchEvent(new s("click", {
      bubbles: !0,
      cancelable: !0,
      view: this.win,
      clientX: t,
      clientY: e,
      button: 0
    }));
  }
  _onFocusIn(t) {
    if (this._suspended || this._isKeepSelection(t.target) || !this.root.contains(t.target)) return;
    const e = this._editableOf(t.target);
    e && this._setActiveEditable(e);
  }
  _onSelectionChange() {
    if (this._suspended) return;
    const t = this.doc.getSelection && this.doc.getSelection();
    if (!t || t.rangeCount === 0 || this._isKeepSelection(t.anchorNode)) return;
    const e = this._editableOf(t.anchorNode);
    e && e !== this._activeEditable && this._setActiveEditable(e);
  }
  _log(...t) {
    this.debug && console.log("[focus-gate]", ...t);
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
const N = "data-fx-path", oe = /* @__PURE__ */ new WeakMap();
function Pt(n, t, ...e) {
  let i = oe.get(n);
  i || (i = /* @__PURE__ */ new Set(), oe.set(n, i)), !i.has(t) && (i.add(t), console.warn(...e));
}
const ut = (n, t) => {
  const e = parseFloat(n);
  return Number.isFinite(e) ? e : t;
};
function li(n) {
  const t = n.trim().match(
    /^(-?\d*\.?\d+)\s*,\s*(-?\d*\.?\d+)(?:\s*@\s*(-?\d*\.?\d+)\s*,\s*(-?\d*\.?\d+))?$/
  );
  return t ? {
    p: [parseFloat(t[1]), parseFloat(t[2])],
    t: t[3] !== void 0 ? [parseFloat(t[3]), parseFloat(t[4])] : null
  } : null;
}
function ci(n, t) {
  if (n == null)
    return Array.from({ length: t }, (i, s) => 100 * s / (t - 1));
  const e = String(n).split(",").map((i) => parseFloat(i));
  if (e.length !== t || e.some((i) => !Number.isFinite(i)) || e[0] !== 0 || e[t - 1] !== 100) return null;
  for (let i = 1; i < t; i++) if (e[i] <= e[i - 1]) return null;
  return e;
}
function hi(n, t) {
  const e = n.length, i = n.map((a) => a.p), s = (a) => a === 0 ? [2 * i[0][0] - i[1][0], 2 * i[0][1] - i[1][1]] : i[a - 1], r = (a) => a === e - 1 ? [2 * i[e - 1][0] - i[e - 2][0], 2 * i[e - 1][1] - i[e - 2][1]] : i[a + 1];
  return n.map((a, o) => a.t || [
    t * (r(o)[0] - s(o)[0]) / 2,
    t * (r(o)[1] - s(o)[1]) / 2
  ]);
}
function di(n, t, e, i, s) {
  const r = s * s, a = r * s, o = 2 * a - 3 * r + 1, l = a - 2 * r + s, c = -2 * a + 3 * r, h = a - r;
  return [
    o * n[0] + l * t[0] + c * e[0] + h * i[0],
    o * n[1] + l * t[1] + c * e[1] + h * i[1]
  ];
}
function ui(n, t, e, i, s) {
  const r = s * s, a = 6 * r - 6 * s, o = 3 * r - 4 * s + 1, l = -6 * r + 6 * s, c = 3 * r - 2 * s;
  return [
    a * n[0] + o * t[0] + l * e[0] + c * i[0],
    a * n[1] + o * t[1] + l * e[1] + c * i[1]
  ];
}
function fi(n, t) {
  const e = 6 * n ** 5 - 15 * n ** 4 + 10 * n ** 3;
  return t * e + (1 - t) * n;
}
function pi(n) {
  if (!n.hasAttribute || !n.hasAttribute(N)) return null;
  try {
    const t = n.getAttribute(N) || "", e = t.split(";").map(li);
    if (e.length < 2 || e.some((f) => f === null))
      return Pt(
        n,
        "points:" + t,
        "[fx-path] ignoring invalid " + N + ' (need >= 2 "x,y" points, optionally "@tx,ty" each): "' + t + '"',
        n
      ), null;
    const i = ci(n.getAttribute(N + "-times"), e.length);
    if (!i)
      return Pt(
        n,
        "times:" + String(n.getAttribute(N + "-times")),
        "[fx-path] ignoring invalid " + N + "-times (must match the waypoint count, be strictly increasing, start at 0 and end at 100)",
        n
      ), null;
    const s = Math.max(ut(n.getAttribute(N + "-curve"), 1), 0), r = Math.min(Math.max(ut(n.getAttribute(N + "-dwell"), 0.78), 0), 1), a = Math.min(Math.max(Math.round(ut(n.getAttribute(N + "-step"), 1)), 1), 10), o = n.getAttribute(N + "-rotate"), l = o !== null, c = l ? ut(o, 0) : 0, h = hi(e, s), d = e.map((f) => f.p), u = [];
    let g = null;
    for (let f = 0; f <= 100; f += a) {
      let m = 0;
      for (; m < i.length - 2 && f > i[m + 1]; ) m++;
      const y = i[m + 1] - i[m], b = Math.min(Math.max((f - i[m]) / y, 0), 1), _ = fi(b, r), [T, D] = di(d[m], h[m], d[m + 1], h[m + 1], _), z = {
        x: Math.round(T * 100) / 100 + "px",
        y: Math.round(D * 100) / 100 + "px"
      };
      if (l) {
        const [$, X] = ui(d[m], h[m], d[m + 1], h[m + 1], _);
        let P = Math.atan2(X, $) * (180 / Math.PI) + c;
        if (g !== null) {
          for (; P - g > 180; ) P -= 360;
          for (; P - g < -180; ) P += 360;
        }
        g = P, z.rotate = Math.round(P * 100) / 100 + "deg";
      }
      u.push({ pct: f, vars: z });
    }
    if (u[u.length - 1].pct !== 100) {
      const f = d[d.length - 1], m = {
        x: Math.round(f[0] * 100) / 100 + "px",
        y: Math.round(f[1] * 100) / 100 + "px"
      };
      l && g !== null && (m.rotate = Math.round(g * 100) / 100 + "deg"), u.push({ pct: 100, vars: m });
    }
    const p = new Set(l ? ["x", "y", "rotate"] : ["x", "y"]);
    return { frames: u, owned: p };
  } catch (t) {
    return Pt(n, "fail", "[fx-path] failed to build path, ignoring attribute", n, t), null;
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
  setNow: I,
  sequence: Ot,
  scrollScene: it,
  ScrollScene: qt,
  ticker: ft
} = Le, Me = /^data-fx-(\d{1,3})$/, ae = /* @__PURE__ */ new WeakSet(), gi = [
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
], le = {
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
]), mi = {
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
}, yi = (n) => n.trim().replace(/-([a-z])/g, (t, e) => e.toUpperCase()), M = (n, t) => {
  const e = parseFloat(n);
  return Number.isFinite(e) ? e : t;
};
function bi() {
  return document.body.classList.contains("data-editor") || !!document.querySelector(".is-wrapper.is-edit");
}
function wi(n) {
  return gi.some((t) => n.hasAttribute(t));
}
function vi(n) {
  const t = {};
  let e = !1;
  for (const i of String(n).split(";")) {
    const s = i.trim();
    if (!s) continue;
    const r = s.indexOf(":");
    if (r === -1) continue;
    const a = yi(s.slice(0, r)), o = s.slice(r + 1).trim();
    if (o)
      if (a === "transform") {
        if (o === "none") {
          e = !0;
          continue;
        }
        const l = /([a-zA-Z0-9]+)\(([^)]*)\)/g;
        let c;
        for (; c = l.exec(o); ) {
          const h = c[1].toLowerCase(), d = c[2].split(",").map((u) => u.trim());
          h === "scale" ? d.length > 1 ? (t.scaleX = d[0], t.scaleY = d[1]) : t.scale = d[0] : h === "translate" ? (d[0] !== void 0 && (t.x = d[0]), d[1] !== void 0 && (t.y = d[1])) : le[h] && (t[le[h]] = d[0]);
        }
      } else Et.has(a), t[a] = o;
  }
  return e && (t.__transformNone = !0), t;
}
function xi(n) {
  const t = [];
  for (const s of n.attributes) {
    const r = Me.exec(s.name);
    if (!r) continue;
    const a = parseInt(r[1], 10);
    a < 0 || a > 100 || t.push({ pct: a, vars: vi(s.value) });
  }
  const e = pi(n);
  if (e) {
    let s = !1;
    for (const r of t)
      for (const a of e.owned)
        a in r.vars && (delete r.vars[a], s = !0);
    s && !ae.has(n) && (ae.add(n), console.warn("[fx-path] data-fx-path owns " + [...e.owned].join("/") + " on this element; conflicting literal data-fx-N values for those keys were ignored", n)), t.push(...e.frames);
  }
  if (!t.length) return null;
  t.sort((s, r) => s.pct - r.pct);
  const i = /* @__PURE__ */ new Set();
  for (const s of t)
    for (const r of Object.keys(s.vars)) Et.has(r) && i.add(r);
  for (const s of t)
    if (s.vars.__transformNone) {
      delete s.vars.__transformNone;
      for (const r of i)
        r in s.vars || (s.vars[r] = mi[r]), e && e.owned.has(r) && delete s.vars[r];
    }
  return t;
}
function _i(n) {
  const t = n.parentElement && n.parentElement.classList.contains("pin-wrap") ? n.parentElement : null;
  let e = 0.25;
  const i = n.getAttribute("data-fx-scrub");
  if (i !== null) {
    const a = i.trim().toLowerCase();
    a === "off" || a === "none" || a === "false" ? e = !1 : a === "" || a === "true" || a === "0" ? e = !0 : e = Math.max(M(i, 0.25), 0.01);
  }
  const s = n.hasAttribute("data-fx-once"), r = Math.max(M(n.getAttribute("data-fx-duration"), 1), 0.05);
  if (t) {
    const a = n.getAttribute("data-fx-length"), o = M(a, 0);
    return a && o > 0 ? t.style.setProperty("height", o + "vh", "important") : t.style.removeProperty("height"), {
      pinned: !0,
      wrap: t,
      trigger: t,
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
      scrub: e,
      once: s,
      duration: r
    };
  }
  return {
    pinned: !1,
    wrap: null,
    trigger: n,
    start: n.getAttribute("data-fx-start") || "top bottom",
    // end: section.getAttribute('data-fx-end') || 'bottom top',
    end: n.getAttribute("data-fx-end") || "bottom bottom",
    scrub: e,
    once: s,
    duration: r
  };
}
function ce(n, t = {}) {
  const e = t.by === "chars" ? "chars" : "words", i = !!t.mask, s = n.innerHTML, r = n.textContent, a = [], o = [];
  function l(g, p) {
    for (const f of Array.from(g.childNodes))
      if (f.nodeType === 3)
        for (const m of f.nodeValue.split(/(\s+)/)) {
          if (!m) continue;
          if (/^\s+$/.test(m)) {
            p.appendChild(document.createTextNode(m));
            continue;
          }
          const y = document.createElement("span");
          if (y.className = "kinetra-word", y.style.display = "inline-block", y.style.textDecoration = "inherit", e === "chars")
            for (const b of m) {
              const _ = document.createElement("span");
              _.className = "kinetra-char", _.style.display = "inline-block", _.style.textDecoration = "inherit", _.textContent = b, y.appendChild(_), o.push(_);
            }
          else
            y.textContent = m;
          a.push(y), p.appendChild(y);
        }
      else if (f.nodeType === 1) {
        const m = f.cloneNode(!1);
        p.appendChild(m), l(f, m);
      }
  }
  const c = document.createDocumentFragment();
  l(n, c), n.innerHTML = "", n.appendChild(c);
  const h = e === "chars" ? o : a;
  if (i)
    for (const g of h) {
      const p = document.createElement("span");
      p.className = "kinetra-mask", p.style.display = "inline-block", p.style.overflow = "hidden", p.style.verticalAlign = "top", p.style.textDecoration = "inherit", p.style.paddingBottom = "0.15em", p.style.marginBottom = "-0.15em", g.parentNode.insertBefore(p, g), p.appendChild(g);
    }
  const d = n.hasAttribute("aria-label"), u = n.getAttribute("aria-label");
  n.setAttribute("aria-label", r);
  for (const g of n.children) g.setAttribute("aria-hidden", "true");
  return {
    element: n,
    words: a,
    chars: o,
    targets: h,
    revert() {
      n.innerHTML = s, d ? n.setAttribute("aria-label", u) : n.removeAttribute("aria-label");
    }
  };
}
class Si {
  constructor(t = {}) {
    this.settings = Object.assign({
      root: ".is-wrapper",
      // where content lives
      defaultEase: "linear",
      editorPreview: "safe"
      // 'off' | 'safe' | 'full' — see header
    }, t);
    const e = this.settings.editorPreview;
    this.settings.editorPreview = e === !1 || e === "off" ? "off" : e === "full" ? "full" : "safe", this.scenes = [], this.reverts = [], this.tickers = [], this.active = !1, this.editor = !1, this._previewStyle = null, this._mirrorHost = null, this.gate = null, this.textFx = [], typeof window < "u" && !window.kinetra && (window.kinetra = Le);
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
    this.teardown(), this.editor = bi();
    const t = this.settings.editorPreview;
    if (this.fullPreview = this.editor && t === "full", this.editor && t === "off") return;
    const e = document.querySelector(this.settings.root) || document.body;
    this.editor && !this.gate && (this.gate = new ai({ root: e, doc: document })), e.querySelectorAll(".is-section").forEach((s) => this._buildSection(s)), this._buildPointerPresets(e), this.active = !0, qt.refreshAll();
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
  scenesFor(t) {
    return this.scenes = this.scenes.filter((e) => !e._killed), this.scenes.filter((e) => e._section === t);
  }
  isPreviewing(t) {
    return this.scenesFor(t).some((e) => e._preview);
  }
  /**
   * Seek one section's scenes to `p` (0..1). Freezes scroll driving
   * (ScrollScene._update early-returns on _preview) and stamps values
   * directly. Fires each scene's onProgress too — that is what keeps the
   * editor's mirror/CSSOM preview (clip-path, colours, …) in sync.
   */
  previewScene(t, e) {
    const i = Math.min(Math.max(Number(e) || 0, 0), 1);
    for (const s of this.scenesFor(t)) {
      s._preview = !0;
      const r = s.animation || s.previewAnimation;
      r && (r.pause && r.pause(), r.progress(i)), s._progress = i, s._smoothed = i, s._targetP = i, s._lastP = i, s.opts && s.opts.onProgress && s.opts.onProgress(i, s);
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
  playTextEffects(t) {
    for (const e of this.textFx)
      e.section === t && typeof e.handle.replay == "function" && e.handle.replay();
  }
  /**
   * Hand the section back to the scrollbar. A full refresh() is the honest
   * way home: it restores every element's resting state (first keyframe),
   * rebuilds the scenes, and re-syncs them to the real scroll position.
   */
  releaseScene(t) {
    let e = !1;
    for (const i of this.scenesFor(t))
      i._preview && (i._preview = !1, e = !0);
    e && this.refresh();
  }
  releaseAll() {
    let t = !1;
    for (const e of this.scenes)
      e._preview && (e._preview = !1, t = !0);
    t && this.refresh();
  }
  teardown() {
    for (const t of this.scenes) t.kill();
    this.scenes = [];
    for (const t of this.tickers) t();
    this.tickers = [];
    for (const t of this.reverts.reverse())
      try {
        t();
      } catch {
      }
    this.reverts = [], this.textFx = [], this._previewStyle && (this._previewStyle.remove(), this._previewStyle = null), this._mirrorHost && (this._mirrorHost.remove(), this._mirrorHost = null), this.gate && (this.gate.destroy(), this.gate = null), this.active = !1;
  }
  /* (see also: _makeMirror/_previewRuleFor/_syncPreview — editor live preview) */
  /* Unique structural selector for an element — nth-child chain from body.
   * Rebuilt on every refresh, so edits that shift siblings self-correct on
   * the editor's next refresh cycle. */
  _cssPath(t) {
    const e = [];
    let i = t;
    for (; i && i.nodeType === 1 && i !== document.body && i.parentElement; ) {
      const s = Array.prototype.indexOf.call(i.parentElement.children, i) + 1;
      e.unshift(i.tagName.toLowerCase() + ":nth-child(" + s + ")"), i = i.parentElement;
    }
    return "body > " + e.join(" > ");
  }
  /* ---------- section pipeline ---------- */
  _buildSection(t) {
    if (t.hasAttribute("data-section-clone") || t.hasAttribute("data-fx-off")) return;
    this._currentSection = t;
    const e = _i(t);
    this._buildKeyframes(t, e), this._buildHorizontal(t, e), this._buildParallax(t), this._buildEmit(t, e), this.editor ? (this._buildSplitsGated(t, e), this._buildTypewritersGated(t, e), this._buildMarqueesGated(t)) : (this._buildSplits(t, e), this._buildTypewriters(t, e), this._buildMarquees(t)), (!this.editor || this.fullPreview) && this._buildDraws(t, e);
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
  _scene(t, e) {
    const i = it(Object.assign({
      trigger: t.trigger,
      start: t.start,
      end: t.end,
      scrub: t.scrub,
      once: t.once
    }, e));
    return this._track(i);
  }
  /* Tag a scene with its owning section and register it. */
  _track(t, e) {
    return t._section = e || this._currentSection || null, this.scenes.push(t), t;
  }
  _eligible(t, e) {
    return t.hasAttribute("data-fx-off") || t.closest(".is-tool, .is-rowadd-tool, .is-section-tool, .is-box-tool, .is-section-info") ? !1 : wi(t) ? (console.warn("[contentbox-effects] skipping " + e + ": element mixes legacy animation attributes with data-fx-* (use one system per element)", t), !1) : !0;
  }
  /* ---------- percent keyframes ---------- */
  _buildKeyframes(t, e) {
    const i = [];
    if (this._hasKf(t) && i.push(t), t.querySelectorAll("*").forEach((o) => {
      this._hasKf(o) && i.push(o);
    }), !i.length) return;
    const s = $t({ paused: !0, duration: e.duration || 1 });
    let r = !1;
    const a = [];
    for (const o of i) {
      if (!this._eligible(o, "keyframes")) continue;
      const l = xi(o);
      if (!l) continue;
      const c = o.getAttribute("data-fx-ease") || this.settings.defaultEase;
      let h = {};
      for (const d of l)
        for (const [u, g] of Object.entries(d.vars))
          (h[u] || (h[u] = [])).push({ pct: d.pct, v: g });
      if (this.editor && !this.fullPreview) {
        const d = {}, u = {};
        for (const [p, f] of Object.entries(h))
          Et.has(p) || p === "opacity" ? d[p] = f : u[p] = f;
        const g = Object.keys(u);
        if (g.length) {
          const p = this._makeMirror(), f = this._previewRuleFor(o), m = { mirror: p, rule: f, props: g, last: {} };
          for (const y of g) {
            const b = u[y][0].v;
            I(p, { [y]: b }), f.style.setProperty(this._kebab(y), String(p.style[y] || b)), m.last[y] = String(p.style[y] || b);
          }
          for (const [y, b] of Object.entries(u))
            for (let _ = 1; _ < b.length; _++) {
              const T = b[_ - 1], D = b[_], z = e.duration || 1, $ = Math.max((D.pct - T.pct) / 100 * z, 1e-4);
              s.fromTo(
                p,
                { [y]: T.v },
                { [y]: D.v, duration: $, ease: c },
                T.pct / 100 * z
              ), r = !0;
            }
          a.push(m);
        }
        if (h = d, !Object.keys(h).length && !g.length) continue;
      }
      if (Object.keys(h).length) {
        o.style.transform = "";
        const d = {};
        for (const [u, g] of Object.entries(h)) d[u] = g[0].v;
        I(o, d), this.reverts.push(() => this._clearInline(o, Object.keys(h)));
        for (const [u, g] of Object.entries(h))
          for (let p = 1; p < g.length; p++) {
            const f = g[p - 1], m = g[p], y = e.duration || 1, b = Math.max((m.pct - f.pct) / 100 * y, 1e-4);
            s.fromTo(
              o,
              { [u]: f.v },
              { [u]: m.v, duration: b, ease: c },
              f.pct / 100 * y
            ), r = !0;
          }
      }
    }
    if (r) {
      const o = {};
      if (a.length && (o.onProgress = () => this._syncPreview(a)), e.scrub === !1) {
        const l = this._scene(e, o);
        l.previewAnimation = s;
        let c = !1;
        const h = new IntersectionObserver((d) => {
          if (!l._preview)
            for (const u of d)
              if (u.isIntersecting) {
                if (e.once && c) continue;
                s.restart(), c = !0;
              } else e.once || (s.pause(), s.progress(0));
        }, { threshold: 0, rootMargin: "-10% 0px -10% 0px" });
        h.observe(t), this.reverts.push(() => h.disconnect());
      } else
        o.animation = s, this._scene(e, o);
    }
  }
  /* ---------- editor live-preview plumbing (mirrors + CSSOM) ---------- */
  _kebab(t) {
    return t.replace(/[A-Z]/g, (e) => "-" + e.toLowerCase());
  }
  /* Hidden container for mirror elements. Lives directly under <body> but
   * OUTSIDE .is-wrapper — builder.html() serializes wrapper content only,
   * so mirrors can never leak into saved pages. */
  _makeMirror() {
    this._mirrorHost || (this._mirrorHost = document.createElement("div"), this._mirrorHost.setAttribute("data-fx-mirrors", ""), this._mirrorHost.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;visibility:hidden;pointer-events:none;", document.body.appendChild(this._mirrorHost));
    const t = document.createElement("div");
    return this._mirrorHost.appendChild(t), t;
  }
  /* One CSSOM rule per element, in the runtime-owned head stylesheet. */
  _previewRuleFor(t) {
    this._previewStyle || (this._previewStyle = document.createElement("style"), this._previewStyle.setAttribute("data-fx-editor-preview", ""), document.head.appendChild(this._previewStyle));
    const e = this._previewStyle.sheet, i = e.insertRule(this._cssPath(t) + " {}", e.cssRules.length);
    return e.cssRules[i];
  }
  _syncPreview(t) {
    for (const e of t)
      for (const i of e.props) {
        const s = String(e.mirror.style[i] || "");
        s && s !== e.last[i] && (e.rule.style.setProperty(this._kebab(i), s), e.last[i] = s);
      }
  }
  _hasKf(t) {
    if (t.hasAttribute("data-fx-path")) return !0;
    for (const e of t.attributes) if (Me.test(e.name)) return !0;
    return !1;
  }
  _clearInline(t, e) {
    t.style.transform = "", Wt(t);
    for (const i of e)
      if (!Et.has(i))
        try {
          t.style[i] = "";
        } catch {
        }
  }
  /* ---------- preset: horizontal gallery ---------- */
  _buildHorizontal(t, e) {
    t.querySelectorAll("[data-fx-horizontal]").forEach((i) => {
      if (this._eligible(i, "horizontal")) {
        if (!e.pinned) {
          console.warn("[contentbox-effects] data-fx-horizontal works inside a pinned (.section-pin) section; skipping", i);
          return;
        }
        this._scene(e, {
          remeasure: !0,
          animation: At(
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
  _buildSplits(t, e) {
    t.querySelectorAll("[data-fx-split]").forEach((i) => {
      if (!this._eligible(i, "split")) return;
      const s = i.getAttribute("data-fx-split") === "chars" ? "chars" : "words", r = i.hasAttribute("data-fx-split-mask"), a = ce(i, { by: s, mask: r });
      this.reverts.push(() => a.revert());
      const o = s === "chars" ? a.chars : a.words;
      if (o.length)
        if (i.hasAttribute("data-fx-split-scrub")) {
          const l = M(i.getAttribute("data-fx-split-from"), 0.12), c = M(i.getAttribute("data-fx-split-stagger"), 0.09);
          I(o, { opacity: l });
          const h = Ot({ paused: !0 });
          h.fromTo(
            o,
            { opacity: l },
            { opacity: 1, duration: 0.6, stagger: c, ease: "linear" }
          ).step({}, { duration: 0.45 }), this._scene(e, { animation: h });
        } else {
          const l = M(
            i.getAttribute("data-fx-split-stagger"),
            s === "chars" ? 0.018 : 0.08
          ), c = i.getAttribute("data-fx-split-y") || (r ? "115%" : "18px");
          I(o, r ? { y: c } : { opacity: 0, y: c });
          const h = () => St(o, Object.assign(
            { y: 0, duration: 0.9, stagger: l, ease: "expoOut" },
            r ? {} : { opacity: 1 }
          )), d = it({
            trigger: i,
            start: "top 85%",
            end: "bottom top",
            onEnter: h,
            onEnterBack: h
          });
          this.scenes.push(d);
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
  _buildSplitsGated(t, e) {
    this.gate && t.querySelectorAll("[data-fx-split]").forEach((i) => {
      if (!this._eligible(i, "split")) return;
      const s = i.getAttribute("data-fx-split") === "chars" ? "chars" : "words", r = i.hasAttribute("data-fx-split-mask"), a = i.hasAttribute("data-fx-split-scrub"), o = M(i.getAttribute("data-fx-split-from"), 0.12), l = M(
        i.getAttribute("data-fx-split-stagger"),
        a ? 0.09 : s === "chars" ? 0.018 : 0.08
      ), c = i.getAttribute("data-fx-split-y") || (r ? "115%" : "18px"), h = { split: null, scene: null, io: null, revealed: !1 }, d = (g, p = {}) => {
        if (h.split) return;
        const f = ce(g, { by: s, mask: r });
        h.split = f;
        const m = s === "chars" ? f.chars : f.words;
        if (m.length)
          if (a) {
            I(m, { opacity: o });
            const y = Ot({ paused: !0 });
            y.fromTo(
              m,
              { opacity: o },
              { opacity: 1, duration: 0.6, stagger: l, ease: "linear" }
            ).step({}, { duration: 0.45 }), h.scene = this._track(it({
              trigger: e.trigger,
              start: e.start,
              end: e.end,
              scrub: e.scrub,
              animation: y
            }), t), qt.refreshAll();
          } else {
            const y = () => St(m, Object.assign(
              { y: 0, duration: 0.9, stagger: l, ease: "expoOut" },
              r ? {} : { opacity: 1 }
            )), b = () => I(
              m,
              r ? { y: c } : { opacity: 0, y: c }
            ), _ = () => {
              const T = g.getBoundingClientRect();
              return T.top < window.innerHeight * 0.85 && T.bottom > 0;
            };
            h.replay = () => {
              h.revealed = !0, b(), y();
            }, p.replay ? (b(), _() ? (h.revealed = !0, y()) : h.revealed = !1) : h.revealed ? I(m, r ? { y: 0 } : { opacity: 1, y: 0 }) : b(), h.io = new IntersectionObserver((T) => {
              for (const D of T)
                D.isIntersecting ? h.revealed || (h.revealed = !0, y()) : (h.revealed = !1, b());
            }, { threshold: 0.15 }), h.io.observe(g);
          }
      }, u = (g) => {
        h.replay = null, h.io && (h.io.disconnect(), h.io = null), h.scene && (h.scene.kill(), h.scene = null), h.split && (h.split.revert(), h.split = null), g.style.transform = "", g.style.opacity = "";
      };
      this.gate.register(i, { toPlay: d, toSource: u }), this.textFx.push({ section: t, handle: h });
    });
  }
  /* ---------- preset: typewriter ---------- */
  _buildTypewriters(t, e) {
    t.querySelectorAll("[data-fx-typewriter]").forEach((i) => {
      if (!this._eligible(i, "typewriter")) return;
      const s = i.textContent, r = Math.min(Math.max(
        M(i.getAttribute("data-fx-typewriter-until"), 0.85),
        0.05
      ), 1);
      i.textContent = "", this.reverts.push(() => {
        i.textContent = s;
      }), this._scene(e, {
        onProgress: (a) => {
          const o = Math.min(a / r, 1);
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
  _buildTypewritersGated(t, e) {
    this.gate && t.querySelectorAll("[data-fx-typewriter]").forEach((i) => {
      if (!this._eligible(i, "typewriter")) return;
      const s = Math.min(Math.max(
        M(i.getAttribute("data-fx-typewriter-until"), 0.85),
        0.05
      ), 1), r = { scene: null, script: "" }, a = (l) => {
        if (r.scene || (r.script = l.textContent, !r.script)) return;
        const c = (h) => {
          const d = Math.min(h / s, 1);
          l.textContent = r.script.slice(0, Math.round(d * r.script.length));
        };
        l.textContent = "", r.scene = this._track(it({
          trigger: e.trigger,
          start: e.start,
          end: e.end,
          scrub: e.scrub,
          onProgress: c
        }), t), qt.refreshAll();
      }, o = (l) => {
        r.scene && (r.scene.kill(), r.scene = null), r.script && (l.textContent = r.script);
      };
      this.gate.register(i, { toPlay: a, toSource: o });
    });
  }
  /* ---------- preset: SVG draw ---------- */
  _buildDraws(t, e) {
    t.querySelectorAll("[data-fx-draw]").forEach((i) => {
      if (!this._eligible(i, "draw")) return;
      const s = i.tagName.toLowerCase() === "path" ? [i] : Array.from(i.querySelectorAll("path"));
      if (!s.length) return;
      const r = Ot({ paused: !0 });
      for (const o of s) {
        let l = 0;
        try {
          l = o.getTotalLength();
        } catch {
          continue;
        }
        if (!l) continue;
        const c = o.style.strokeDasharray, h = o.style.strokeDashoffset;
        o.style.strokeDasharray = l, this.reverts.push(() => {
          o.style.strokeDasharray = c, o.style.strokeDashoffset = h;
        }), r.fromTo(
          o,
          { strokeDashoffset: l },
          { strokeDashoffset: 0, duration: 1, ease: "linear" },
          0
        );
      }
      const a = e.pinned ? e : {
        trigger: i,
        start: "top 80%",
        end: "bottom 55%",
        scrub: e.scrub
      };
      this._scene(a, { animation: r });
    });
  }
  /* ---------- preset: parallax ---------- */
  _buildParallax(t) {
    t.querySelectorAll("[data-fx-parallax]").forEach((e) => {
      if (!this._eligible(e, "parallax")) return;
      const i = e.getAttribute("data-fx-parallax"), s = M(i, 100), r = /%$/.test(i || "") ? "%" : "px";
      this._track(it({
        trigger: e,
        start: "top bottom",
        end: "bottom top",
        scrub: !0,
        animation: At(
          e,
          { y: -s + r },
          { y: s + r, duration: 1, ease: "linear", paused: !0 }
        )
      }), t), this.reverts.push(() => {
        e.style.transform = "";
      });
    });
  }
  /* ---------- preset: marquee ---------- */
  _buildMarquees(t) {
    t.querySelectorAll("[data-fx-marquee]").forEach((e) => {
      if (!this._eligible(e, "marquee")) return;
      const i = M(e.getAttribute("data-fx-marquee-speed"), 90), s = e.hasAttribute("data-fx-marquee-lean"), r = e.innerHTML;
      e.innerHTML = r + r, e.style.display = "inline-block", e.style.whiteSpace = "nowrap", e.style.willChange = "transform", this.reverts.push(() => {
        e.innerHTML = r, e.style.display = "", e.style.whiteSpace = "", e.style.willChange = "", e.style.transform = "";
      });
      let a = 0, o = window.scrollY, l = 0;
      const c = ft.add((h) => {
        const d = window.scrollY, u = (d - o) / Math.max(h, 1e-3);
        o = d, l += (u - l) * Math.min(h * 4, 1);
        const g = i + Math.min(Math.abs(l) * 0.9, 1400), p = e.scrollWidth / 2;
        p > 0 && (a = (a - g * h) % p);
        const f = { x: a };
        s && (f.skewX = Math.max(-18, Math.min(18, l * 0.02))), I(e, f);
      });
      this.tickers.push(c);
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
  _buildMarqueesGated(t) {
    this.gate && t.querySelectorAll("[data-fx-marquee]").forEach((e) => {
      if (!this._eligible(e, "marquee")) return;
      const i = M(e.getAttribute("data-fx-marquee-speed"), 90), s = e.hasAttribute("data-fx-marquee-lean"), r = { stop: null, html: "" }, a = (l) => {
        if (r.stop || (r.html = l.innerHTML, !r.html)) return;
        l.innerHTML = r.html + r.html, l.style.display = "inline-block", l.style.whiteSpace = "nowrap", l.style.willChange = "transform";
        let c = 0, h = window.scrollY, d = 0;
        r.stop = ft.add((u) => {
          const g = window.scrollY, p = (g - h) / Math.max(u, 1e-3);
          h = g, d += (p - d) * Math.min(u * 4, 1);
          const f = i + Math.min(Math.abs(d) * 0.9, 1400), m = l.scrollWidth / 2;
          m > 0 && (c = (c - f * u) % m);
          const y = { x: c };
          s && (y.skewX = Math.max(-18, Math.min(18, d * 0.02))), I(l, y);
        });
      }, o = (l) => {
        r.stop && (r.stop(), r.stop = null), r.html && (l.innerHTML = r.html), l.style.display = "", l.style.whiteSpace = "", l.style.willChange = "", l.style.transform = "";
      };
      this.gate.register(e, { toPlay: a, toSource: o });
    });
  }
  /* ---------- presets: pointer micro-interactions ---------- */
  _buildPointerPresets(t) {
    t.querySelectorAll("[data-fx-tilt]").forEach((e) => {
      if (!this._eligible(e, "tilt")) return;
      const i = M(e.getAttribute("data-fx-tilt-max"), 14);
      e.parentElement && !e.parentElement.style.perspective && (e.parentElement.style.perspective = "900px");
      let s = 0, r = 0, a = 0, o = 0;
      const l = (d) => {
        const u = e.getBoundingClientRect();
        r = ((d.clientX - u.left) / u.width - 0.5) * (i + 2), s = -((d.clientY - u.top) / u.height - 0.5) * i;
      }, c = () => {
        s = 0, r = 0;
      };
      e.addEventListener("mousemove", l), e.addEventListener("mouseleave", c);
      const h = ft.add((d) => {
        const u = 1 - Math.exp(-d / 0.1);
        a += (s - a) * u, o += (r - o) * u, I(e, { rotateX: a, rotateY: o });
      });
      this.tickers.push(() => {
        h(), e.removeEventListener("mousemove", l), e.removeEventListener("mouseleave", c), e.style.transform = "";
      });
    }), t.querySelectorAll("[data-fx-magnetic]").forEach((e) => {
      if (!this._eligible(e, "magnetic")) return;
      const i = M(e.getAttribute("data-fx-magnetic-strength"), 0.35);
      let s = 0, r = 0, a = 0, o = 0;
      const l = (d) => {
        const u = e.getBoundingClientRect();
        s = (d.clientX - u.left - u.width / 2) * i, r = (d.clientY - u.top - u.height / 2) * i;
      }, c = () => {
        s = 0, r = 0;
      };
      e.addEventListener("mousemove", l), e.addEventListener("mouseleave", c);
      const h = ft.add((d) => {
        const u = 1 - Math.exp(-d / 0.08);
        a += (s - a) * u, o += (r - o) * u, I(e, { x: a, y: o });
      });
      this.tickers.push(() => {
        h(), e.removeEventListener("mousemove", l), e.removeEventListener("mouseleave", c), e.style.transform = "";
      });
    });
  }
  /* ---------- plugin hook: progress events ---------- */
  _buildEmit(t, e) {
    t.hasAttribute("data-fx-emit") && this._scene(e, {
      onProgress: (i) => {
        t.dispatchEvent(new CustomEvent("fx:progress", {
          bubbles: !0,
          detail: { progress: i, section: t, pinned: e.pinned }
        }));
      },
      onEnter: () => t.dispatchEvent(new CustomEvent("fx:enter", { bubbles: !0 })),
      onEnterBack: () => t.dispatchEvent(new CustomEvent("fx:enterback", { bubbles: !0 })),
      onLeave: () => t.dispatchEvent(new CustomEvent("fx:leave", { bubbles: !0 })),
      onLeaveBack: () => t.dispatchEvent(new CustomEvent("fx:leaveback", { bubbles: !0 }))
    });
  }
}
const he = Date.now();
function R() {
  let n = {}, t = !0, e = 0, i = arguments.length;
  Object.prototype.toString.call(arguments[0]) === "[object Boolean]" && (t = arguments[0], e++);
  let s = (r) => {
    for (let a in r)
      Object.prototype.hasOwnProperty.call(r, a) && (t && Object.prototype.toString.call(r[a]) === "[object Object]" ? n[a] = R(!0, n[a], r[a]) : n[a] = r[a]);
  };
  for (; e < i; e++) {
    let r = arguments[e];
    s(r);
  }
  return n;
}
function S(n, t) {
  if ((H(n) || n === window || n === document) && (n = [n]), !pe(n) && !J(n) && (n = [n]), Oe(n) != 0) {
    if (pe(n) && !J(n)) {
      let e = n.length, i = 0;
      for (; i < e && t.call(n[i], n[i], i, n) !== !1; i++)
        ;
    } else if (J(n)) {
      for (let e in n)
        if (E(n, e) && t.call(n[e], n[e], e, n) === !1)
          break;
    }
  }
}
function de(n, t = null, e = null) {
  const i = n[he] = n[he] || [], s = { all: i, evt: null, found: null };
  return t && e && Oe(i) > 0 && S(i, (r, a) => {
    if (r.eventName == t && r.fn.toString() == e.toString())
      return s.found = !0, s.evt = a, !1;
  }), s;
}
function q(n, { onElement: t, withCallback: e, avoidDuplicate: i = !0, once: s = !1, useCapture: r = !1 } = {}, a) {
  let o = t || [];
  st(o) && (o = document.querySelectorAll(o));
  function l(c) {
    x(e) && e.call(a, c, this), s && l.destroy();
  }
  return l.destroy = function() {
    S(o, (c) => {
      const h = de(c, n, l);
      h.found && h.all.splice(h.evt, 1), c.removeEventListener && c.removeEventListener(n, l, r);
    });
  }, S(o, (c) => {
    const h = de(c, n, l);
    (c.addEventListener && i && !h.found || !i) && (c.addEventListener(n, l, r), h.all.push({ eventName: n, fn: l }));
  }), l;
}
function w(n, t) {
  S(t.split(" "), (e) => n.classList.add(e));
}
function A(n, t) {
  S(t.split(" "), (e) => n.classList.remove(e));
}
function k(n, t) {
  return n.classList.contains(t);
}
function Y(n, t) {
  for (; n !== document.body; ) {
    if (n = n.parentElement, !n)
      return !1;
    if (typeof n.matches == "function" ? n.matches(t) : n.msMatchesSelector(t))
      return n;
  }
}
function G(n, t = "", e = !1) {
  if (!n || t === "")
    return !1;
  if (t === "none")
    return x(e) && e(), !1;
  const i = Ai(), s = t.split(" ");
  S(s, (r) => {
    w(n, "g" + r);
  }), q(i, {
    onElement: n,
    avoidDuplicate: !1,
    once: !0,
    withCallback: (r, a) => {
      S(s, (o) => {
        A(a, "g" + o);
      }), x(e) && e();
    }
  });
}
function bt(n, t = "") {
  if (t === "")
    return n.style.webkitTransform = "", n.style.MozTransform = "", n.style.msTransform = "", n.style.OTransform = "", n.style.transform = "", !1;
  n.style.webkitTransform = t, n.style.MozTransform = t, n.style.msTransform = t, n.style.OTransform = t, n.style.transform = t;
}
function ue(n) {
  n.style.display = "block";
}
function Dt(n) {
  n.style.display = "none";
}
function V(n) {
  let t = document.createDocumentFragment(), e = document.createElement("div");
  for (e.innerHTML = n; e.firstChild; )
    t.appendChild(e.firstChild);
  return t;
}
function ke() {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  };
}
function Ai() {
  let n, t = document.createElement("fakeelement"), e = {
    animation: "animationend",
    OAnimation: "oAnimationEnd",
    MozAnimation: "animationend",
    WebkitAnimation: "webkitAnimationEnd"
  };
  for (n in e)
    if (t.style[n] !== void 0)
      return e[n];
}
function Ei() {
  let n, t = document.createElement("fakeelement");
  const e = {
    transition: "transitionend",
    OTransition: "oTransitionEnd",
    MozTransition: "transitionend",
    WebkitTransition: "webkitTransitionEnd"
  };
  for (n in e)
    if (t.style[n] !== void 0)
      return e[n];
}
function Ti(n) {
  let { url: t, allow: e, callback: i, appendTo: s } = n, r = document.createElement("iframe");
  return r.className = "vimeo-video gvideo", r.src = t, r.style.width = "100%", r.style.height = "100%", e && r.setAttribute("allow", e), r.onload = function() {
    r.onload = null, w(r, "node-ready"), x(i) && i();
  }, s && s.appendChild(r), r;
}
function zt(n, t, e, i) {
  if (n()) {
    t();
    return;
  }
  e || (e = 100);
  let s = setInterval(() => {
    n() && (clearInterval(s), t());
  }, e);
}
function fe(n, t, e) {
  if (O(n)) {
    console.error("Inject assets error");
    return;
  }
  if (x(t) && (e = t, t = !1), st(t) && t in window) {
    x(e) && e();
    return;
  }
  let i;
  if (n.indexOf(".css") !== -1) {
    if (i = document.querySelectorAll('link[href="' + n + '"]'), i && i.length > 0) {
      x(e) && e();
      return;
    }
    const r = document.getElementsByTagName("head")[0], a = r.querySelectorAll('link[rel="stylesheet"]'), o = document.createElement("link");
    o.rel = "stylesheet", o.type = "text/css", o.href = n, o.media = "all", a ? r.insertBefore(o, a[0]) : r.appendChild(o), x(e) && e();
    return;
  }
  if (i = document.querySelectorAll('script[src="' + n + '"]'), i && i.length > 0) {
    if (x(e)) {
      if (st(t))
        return zt(
          () => typeof window[t] < "u",
          () => {
            e();
          }
        ), !1;
      e();
    }
    return;
  }
  let s = document.createElement("script");
  s.type = "text/javascript", s.src = n, s.onload = () => {
    if (x(e)) {
      if (st(t))
        return zt(
          () => typeof window[t] < "u",
          () => {
            e();
          }
        ), !1;
      e();
    }
  }, document.body.appendChild(s);
}
function Ut() {
  return typeof window > "u" ? !1 : "navigator" in window && window.navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i);
}
function Ci() {
  return typeof document > "u" ? !1 : Ut() !== null || document.createTouch !== void 0 || "ontouchstart" in window || "onmsgesturechange" in window || navigator.msMaxTouchPoints;
}
function x(n) {
  return typeof n == "function";
}
function st(n) {
  return typeof n == "string";
}
function H(n) {
  return !!(n && n.nodeType && n.nodeType == 1);
}
function Pe(n) {
  return Array.isArray(n);
}
function pe(n) {
  return n && n.length && isFinite(n.length);
}
function J(n) {
  return typeof n === "object" && n != null && !x(n) && !Pe(n);
}
function O(n) {
  return n == null;
}
function E(n, t) {
  return n !== null && hasOwnProperty.call(n, t);
}
function Oe(n) {
  if (J(n)) {
    if (n.keys)
      return n.keys().length;
    let t = 0;
    for (let e in n)
      E(n, e) && t++;
    return t;
  } else
    return n.length;
}
function wt(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function ge(n = -1) {
  const t = document.querySelectorAll(".gbtn[data-taborder]:not(.disabled)");
  if (!t.length)
    return !1;
  if (t.length == 1)
    return t[0];
  typeof n == "string" && (n = parseInt(n));
  const e = [];
  S(t, (o) => {
    e.push(o.getAttribute("data-taborder"));
  });
  const i = Math.max.apply(Math, e.map((o) => parseInt(o)));
  let s = n < 0 ? 1 : n + 1;
  s > i && (s = "1");
  const a = e.filter((o) => o >= parseInt(s)).sort()[0];
  return document.querySelector(`.gbtn[data-taborder="${a}"]`);
}
function Li(n) {
  if (n.events.hasOwnProperty("keyboard"))
    return !1;
  n.events.keyboard = q("keydown", {
    onElement: window,
    withCallback: (t, e) => {
      t = t || window.event;
      const i = t.keyCode;
      if (i == 9) {
        const s = document.querySelector(".gbtn.focused");
        if (!s) {
          const l = document.activeElement && document.activeElement.nodeName ? document.activeElement.nodeName.toLocaleLowerCase() : !1;
          if (l == "input" || l == "textarea" || l == "button")
            return;
        }
        t.preventDefault();
        const r = document.querySelectorAll(".gbtn[data-taborder]");
        if (!r || r.length <= 0)
          return;
        if (!s) {
          const l = ge();
          l && (l.focus(), w(l, "focused"));
          return;
        }
        let a = s.getAttribute("data-taborder"), o = ge(a);
        A(s, "focused"), o && (o.focus(), w(o, "focused"));
      }
      i == 39 && n.nextSlide(), i == 37 && n.prevSlide(), i == 27 && n.close();
    }
  });
}
function Tt(n) {
  return Math.sqrt(n.x * n.x + n.y * n.y);
}
function Mi(n, t) {
  return n.x * t.x + n.y * t.y;
}
function ki(n, t) {
  var e = Tt(n) * Tt(t);
  if (e === 0)
    return 0;
  var i = Mi(n, t) / e;
  return i > 1 && (i = 1), Math.acos(i);
}
function Pi(n, t) {
  return n.x * t.y - t.x * n.y;
}
function Oi(n, t) {
  var e = ki(n, t);
  return Pi(n, t) > 0 && (e *= -1), e * 180 / Math.PI;
}
class qi {
  constructor(t) {
    this.handlers = [], this.el = t;
  }
  add(t) {
    this.handlers.push(t);
  }
  del(t) {
    t || (this.handlers = []);
    for (var e = this.handlers.length; e >= 0; e--)
      this.handlers[e] === t && this.handlers.splice(e, 1);
  }
  dispatch() {
    for (var t = 0, e = this.handlers.length; t < e; t++) {
      var i = this.handlers[t];
      typeof i == "function" && i.apply(this.el, arguments);
    }
  }
}
function L(n, t) {
  var e = new qi(n);
  return e.add(t), e;
}
class Di {
  constructor(t, e) {
    this.element = typeof t == "string" ? document.querySelector(t) : t, this.start = this.start.bind(this), this.move = this.move.bind(this), this.end = this.end.bind(this), this.cancel = this.cancel.bind(this), this.element.addEventListener("touchstart", this.start, !1), this.element.addEventListener("touchmove", this.move, !1), this.element.addEventListener("touchend", this.end, !1), this.element.addEventListener("touchcancel", this.cancel, !1), this.preV = { x: null, y: null }, this.pinchStartLen = null, this.zoom = 1, this.isDoubleTap = !1;
    var i = function() {
    };
    this.rotate = L(this.element, e.rotate || i), this.touchStart = L(this.element, e.touchStart || i), this.multipointStart = L(this.element, e.multipointStart || i), this.multipointEnd = L(this.element, e.multipointEnd || i), this.pinch = L(this.element, e.pinch || i), this.swipe = L(this.element, e.swipe || i), this.tap = L(this.element, e.tap || i), this.doubleTap = L(this.element, e.doubleTap || i), this.longTap = L(this.element, e.longTap || i), this.singleTap = L(this.element, e.singleTap || i), this.pressMove = L(this.element, e.pressMove || i), this.twoFingerPressMove = L(this.element, e.twoFingerPressMove || i), this.touchMove = L(this.element, e.touchMove || i), this.touchEnd = L(this.element, e.touchEnd || i), this.touchCancel = L(this.element, e.touchCancel || i), this.translateContainer = this.element, this._cancelAllHandler = this.cancelAll.bind(this), window.addEventListener("scroll", this._cancelAllHandler), this.delta = null, this.last = null, this.now = null, this.tapTimeout = null, this.singleTapTimeout = null, this.longTapTimeout = null, this.swipeTimeout = null, this.x1 = this.x2 = this.y1 = this.y2 = null, this.preTapPosition = { x: null, y: null };
  }
  start(t) {
    if (!t.touches)
      return;
    const e = ["a", "button", "input"];
    if (t.target && t.target.nodeName && e.indexOf(t.target.nodeName.toLowerCase()) >= 0) {
      console.log("ignore drag for this touched element", t.target.nodeName.toLowerCase());
      return;
    }
    this.now = Date.now(), this.x1 = t.touches[0].pageX, this.y1 = t.touches[0].pageY, this.delta = this.now - (this.last || this.now), this.touchStart.dispatch(t, this.element), this.preTapPosition.x !== null && (this.isDoubleTap = this.delta > 0 && this.delta <= 250 && Math.abs(this.preTapPosition.x - this.x1) < 30 && Math.abs(this.preTapPosition.y - this.y1) < 30, this.isDoubleTap && clearTimeout(this.singleTapTimeout)), this.preTapPosition.x = this.x1, this.preTapPosition.y = this.y1, this.last = this.now;
    var i = this.preV, s = t.touches.length;
    if (s > 1) {
      this._cancelLongTap(), this._cancelSingleTap();
      var r = { x: t.touches[1].pageX - this.x1, y: t.touches[1].pageY - this.y1 };
      i.x = r.x, i.y = r.y, this.pinchStartLen = Tt(i), this.multipointStart.dispatch(t, this.element);
    }
    this._preventTap = !1, this.longTapTimeout = setTimeout(
      (function() {
        this.longTap.dispatch(t, this.element), this._preventTap = !0;
      }).bind(this),
      750
    );
  }
  move(t) {
    if (t.touches) {
      var e = this.preV, i = t.touches.length, s = t.touches[0].pageX, r = t.touches[0].pageY;
      if (this.isDoubleTap = !1, i > 1) {
        var a = t.touches[1].pageX, o = t.touches[1].pageY, l = { x: t.touches[1].pageX - s, y: t.touches[1].pageY - r };
        e.x !== null && (this.pinchStartLen > 0 && (t.zoom = Tt(l) / this.pinchStartLen, this.pinch.dispatch(t, this.element)), t.angle = Oi(l, e), this.rotate.dispatch(t, this.element)), e.x = l.x, e.y = l.y, this.x2 !== null && this.sx2 !== null ? (t.deltaX = (s - this.x2 + a - this.sx2) / 2, t.deltaY = (r - this.y2 + o - this.sy2) / 2) : (t.deltaX = 0, t.deltaY = 0), this.twoFingerPressMove.dispatch(t, this.element), this.sx2 = a, this.sy2 = o;
      } else {
        if (this.x2 !== null) {
          t.deltaX = s - this.x2, t.deltaY = r - this.y2;
          var c = Math.abs(this.x1 - this.x2), h = Math.abs(this.y1 - this.y2);
          (c > 10 || h > 10) && (this._preventTap = !0);
        } else
          t.deltaX = 0, t.deltaY = 0;
        this.pressMove.dispatch(t, this.element);
      }
      this.touchMove.dispatch(t, this.element), this._cancelLongTap(), this.x2 = s, this.y2 = r, i > 1 && t.preventDefault();
    }
  }
  end(t) {
    if (t.changedTouches) {
      this._cancelLongTap();
      var e = this;
      t.touches.length < 2 && (this.multipointEnd.dispatch(t, this.element), this.sx2 = this.sy2 = null), this.x2 && Math.abs(this.x1 - this.x2) > 30 || this.y2 && Math.abs(this.y1 - this.y2) > 30 ? (t.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2), this.swipeTimeout = setTimeout(function() {
        e.swipe.dispatch(t, e.element);
      }, 0)) : (this.tapTimeout = setTimeout(function() {
        e._preventTap || e.tap.dispatch(t, e.element), e.isDoubleTap && (e.doubleTap.dispatch(t, e.element), e.isDoubleTap = !1);
      }, 0), e.isDoubleTap || (e.singleTapTimeout = setTimeout(function() {
        e.singleTap.dispatch(t, e.element);
      }, 250))), this.touchEnd.dispatch(t, this.element), this.preV.x = 0, this.preV.y = 0, this.zoom = 1, this.pinchStartLen = null, this.x1 = this.x2 = this.y1 = this.y2 = null;
    }
  }
  cancelAll() {
    this._preventTap = !0, clearTimeout(this.singleTapTimeout), clearTimeout(this.tapTimeout), clearTimeout(this.longTapTimeout), clearTimeout(this.swipeTimeout);
  }
  cancel(t) {
    this.cancelAll(), this.touchCancel.dispatch(t, this.element);
  }
  _cancelLongTap() {
    clearTimeout(this.longTapTimeout);
  }
  _cancelSingleTap() {
    clearTimeout(this.singleTapTimeout);
  }
  _swipeDirection(t, e, i, s) {
    return Math.abs(t - e) >= Math.abs(i - s) ? t - e > 0 ? "Left" : "Right" : i - s > 0 ? "Up" : "Down";
  }
  on(t, e) {
    this[t] && this[t].add(e);
  }
  off(t, e) {
    this[t] && this[t].del(e);
  }
  destroy() {
    return this.singleTapTimeout && clearTimeout(this.singleTapTimeout), this.tapTimeout && clearTimeout(this.tapTimeout), this.longTapTimeout && clearTimeout(this.longTapTimeout), this.swipeTimeout && clearTimeout(this.swipeTimeout), this.element.removeEventListener("touchstart", this.start), this.element.removeEventListener("touchmove", this.move), this.element.removeEventListener("touchend", this.end), this.element.removeEventListener("touchcancel", this.cancel), this.rotate.del(), this.touchStart.del(), this.multipointStart.del(), this.multipointEnd.del(), this.pinch.del(), this.swipe.del(), this.tap.del(), this.doubleTap.del(), this.longTap.del(), this.singleTap.del(), this.pressMove.del(), this.twoFingerPressMove.del(), this.touchMove.del(), this.touchEnd.del(), this.touchCancel.del(), this.preV = this.pinchStartLen = this.zoom = this.isDoubleTap = this.delta = this.last = this.now = this.tapTimeout = this.singleTapTimeout = this.longTapTimeout = this.swipeTimeout = this.x1 = this.x2 = this.y1 = this.y2 = this.preTapPosition = this.rotate = this.touchStart = this.multipointStart = this.multipointEnd = this.pinch = this.swipe = this.tap = this.doubleTap = this.longTap = this.singleTap = this.pressMove = this.touchMove = this.touchEnd = this.touchCancel = this.twoFingerPressMove = null, window.removeEventListener("scroll", this._cancelAllHandler), null;
  }
}
function It(n) {
  const t = Ei(), e = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  let i = k(n, "gslide-media") ? n : n.querySelector(".gslide-media"), s = Y(i, ".ginner-container"), r = n.querySelector(".gslide-description");
  e > 769 && (i = s), w(i, "greset"), bt(i, "translate3d(0, 0, 0)"), q(t, {
    onElement: i,
    once: !0,
    withCallback: (a, o) => {
      A(i, "greset");
    }
  }), i.style.opacity = "", r && (r.style.opacity = "");
}
function Ii(n) {
  if (n.events.hasOwnProperty("touch"))
    return !1;
  let t = ke(), e = t.width, i = t.height, s = !1, r = null, a = null, o = null, l = !1, c = 1, h = 4.5, d = 1, u = !1, g = !1, p = null, f = null, m = null, y = null, b, _, T = 0, D = 0, z = !1, $ = !1, X = {}, P = {}, Gt = 0, jt = 0, Lt;
  const qe = document.getElementById("glightbox-slider"), ot = document.querySelector(".goverlay"), De = new Di(qe, {
    touchStart: (v) => {
      if (s = !0, (k(v.targetTouches[0].target, "ginner-container") || Y(v.targetTouches[0].target, ".gslide-desc") || v.targetTouches[0].target.nodeName.toLowerCase() == "a") && (s = !1), Y(v.targetTouches[0].target, ".gslide-inline") && !k(v.targetTouches[0].target.parentNode, "gslide-inline") && (s = !1), s) {
        if (P = v.targetTouches[0], X.pageX = v.targetTouches[0].pageX, X.pageY = v.targetTouches[0].pageY, Gt = v.targetTouches[0].clientX, jt = v.targetTouches[0].clientY, r = n.activeSlide, a = r.querySelector(".gslide-media"), Lt = r.querySelector(".gslide-inline"), o = null, k(a, "gslide-image") && (o = a.querySelector("img")), (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) > 769 && (a = r.querySelector(".ginner-container")), A(ot, "greset"), v.pageX > 20 && v.pageX < window.innerWidth - 20)
          return;
        v.preventDefault();
      }
    },
    touchMove: (v) => {
      if (!s || (P = v.targetTouches[0], u || g))
        return;
      if (Lt && Lt.offsetHeight > i) {
        const Ye = X.pageX - P.pageX;
        if (Math.abs(Ye) <= 13)
          return !1;
      }
      l = !0;
      let C = v.targetTouches[0].clientX, U = v.targetTouches[0].clientY, at = Gt - C, Ie = jt - U;
      Math.abs(at) > Math.abs(Ie) ? (z = !1, $ = !0) : ($ = !1, z = !0), b = P.pageX - X.pageX, T = b * 100 / e, _ = P.pageY - X.pageY, D = _ * 100 / i;
      let lt;
      if (z && o && (lt = 1 - Math.abs(_) / i, ot.style.opacity = lt, n.settings.touchFollowAxis && (T = 0)), $ && (lt = 1 - Math.abs(b) / e, a.style.opacity = lt, n.settings.touchFollowAxis && (D = 0)), !o)
        return bt(a, `translate3d(${T}%, 0, 0)`);
      bt(a, `translate3d(${T}%, ${D}%, 0)`);
    },
    touchEnd: () => {
      if (!s)
        return;
      if (l = !1, g || u) {
        m = p, y = f;
        return;
      }
      const v = Math.abs(parseInt(D)), C = Math.abs(parseInt(T));
      if (v > 29 && o) {
        n.close();
        return;
      }
      if (v < 29 && C < 25)
        return w(ot, "greset"), ot.style.opacity = 1, It(a);
    },
    multipointEnd: () => {
      setTimeout(() => {
        u = !1;
      }, 50);
    },
    multipointStart: () => {
      u = !0, c = d || 1;
    },
    pinch: (v) => {
      if (!o || l)
        return !1;
      u = !0, o.scaleX = o.scaleY = c * v.zoom;
      let C = c * v.zoom;
      if (g = !0, C <= 1) {
        g = !1, C = 1, y = null, m = null, p = null, f = null, o.setAttribute("style", "");
        return;
      }
      C > h && (C = h), o.style.transform = `scale3d(${C}, ${C}, 1)`, d = C;
    },
    pressMove: (v) => {
      if (g && !u) {
        var C = P.pageX - X.pageX, U = P.pageY - X.pageY;
        m && (C = C + m), y && (U = U + y), p = C, f = U;
        let at = `translate3d(${C}px, ${U}px, 0)`;
        d && (at += ` scale3d(${d}, ${d}, 1)`), bt(o, at);
      }
    },
    swipe: (v) => {
      if (!g) {
        if (u) {
          u = !1;
          return;
        }
        if (v.direction == "Left") {
          if (n.index == n.elements.length - 1)
            return It(a);
          n.nextSlide();
        }
        if (v.direction == "Right") {
          if (n.index == 0)
            return It(a);
          n.prevSlide();
        }
      }
    }
  });
  n.events.touch = De;
}
class Yi {
  constructor(t, e, i = null) {
    if (this.img = t, this.slide = e, this.onclose = i, this.img.setZoomEvents)
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
    let t = this.widowWidth();
    if (this.zoomedIn || t <= 768)
      return;
    const e = this.img;
    if (e.setAttribute("data-style", e.getAttribute("style")), e.style.maxWidth = e.naturalWidth + "px", e.style.maxHeight = e.naturalHeight + "px", e.naturalWidth > t) {
      let i = t / 2 - e.naturalWidth / 2;
      this.setTranslate(this.img.parentNode, i, 0);
    }
    this.slide.classList.add("zoomed"), this.zoomedIn = !0;
  }
  zoomOut() {
    this.img.parentNode.setAttribute("style", ""), this.img.setAttribute("style", this.img.getAttribute("data-style")), this.slide.classList.remove("zoomed"), this.zoomedIn = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.onclose && typeof this.onclose == "function" && this.onclose();
  }
  dragStart(t) {
    if (t.preventDefault(), !this.zoomedIn) {
      this.active = !1;
      return;
    }
    t.type === "touchstart" ? (this.initialX = t.touches[0].clientX - this.xOffset, this.initialY = t.touches[0].clientY - this.yOffset) : (this.initialX = t.clientX - this.xOffset, this.initialY = t.clientY - this.yOffset), t.target === this.img && (this.active = !0, this.img.classList.add("dragging"));
  }
  dragEnd(t) {
    t.preventDefault(), this.initialX = this.currentX, this.initialY = this.currentY, this.active = !1, setTimeout(() => {
      this.dragging = !1, this.img.isDragging = !1, this.img.classList.remove("dragging");
    }, 100);
  }
  drag(t) {
    this.active && (t.preventDefault(), t.type === "touchmove" ? (this.currentX = t.touches[0].clientX - this.initialX, this.currentY = t.touches[0].clientY - this.initialY) : (this.currentX = t.clientX - this.initialX, this.currentY = t.clientY - this.initialY), this.xOffset = this.currentX, this.yOffset = this.currentY, this.img.isDragging = !0, this.dragging = !0, this.setTranslate(this.img, this.currentX, this.currentY));
  }
  onMove(t) {
    if (!this.zoomedIn)
      return;
    let e = t.clientX - this.img.naturalWidth / 2, i = t.clientY - this.img.naturalHeight / 2;
    this.setTranslate(this.img, e, i);
  }
  setTranslate(t, e, i) {
    t.style.transform = "translate3d(" + e + "px, " + i + "px, 0)";
  }
  widowWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }
}
class me {
  constructor(t = {}) {
    let { dragEl: e, toleranceX: i = 40, toleranceY: s = 65, slide: r = null, instance: a = null } = t;
    this.el = e, this.active = !1, this.dragging = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.direction = null, this.lastDirection = null, this.toleranceX = i, this.toleranceY = s, this.toleranceReached = !1, this.dragContainer = this.el, this.slide = r, this.instance = a, this.el.addEventListener("mousedown", (o) => this.dragStart(o), !1), this.el.addEventListener("mouseup", (o) => this.dragEnd(o), !1), this.el.addEventListener("mousemove", (o) => this.drag(o), !1);
  }
  dragStart(t) {
    if (this.slide.classList.contains("zoomed")) {
      this.active = !1;
      return;
    }
    t.type === "touchstart" ? (this.initialX = t.touches[0].clientX - this.xOffset, this.initialY = t.touches[0].clientY - this.yOffset) : (this.initialX = t.clientX - this.xOffset, this.initialY = t.clientY - this.yOffset);
    let e = t.target.nodeName.toLowerCase(), i = ["input", "select", "textarea", "button", "a"];
    if (t.target.classList.contains("nodrag") || Y(t.target, ".nodrag") || i.indexOf(e) !== -1) {
      this.active = !1;
      return;
    }
    t.preventDefault(), (t.target === this.el || e !== "img" && Y(t.target, ".gslide-inline")) && (this.active = !0, this.el.classList.add("dragging"), this.dragContainer = Y(t.target, ".ginner-container"));
  }
  dragEnd(t) {
    t && t.preventDefault(), this.initialX = 0, this.initialY = 0, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.active = !1, this.doSlideChange && (this.instance.preventOutsideClick = !0, this.doSlideChange == "right" && this.instance.prevSlide(), this.doSlideChange == "left" && this.instance.nextSlide()), this.doSlideClose && this.instance.close(), this.toleranceReached || this.setTranslate(this.dragContainer, 0, 0, !0), setTimeout(() => {
      this.instance.preventOutsideClick = !1, this.toleranceReached = !1, this.lastDirection = null, this.dragging = !1, this.el.isDragging = !1, this.el.classList.remove("dragging"), this.slide.classList.remove("dragging-nav"), this.dragContainer.style.transform = "", this.dragContainer.style.transition = "";
    }, 100);
  }
  drag(t) {
    if (this.active) {
      t.preventDefault(), this.slide.classList.add("dragging-nav"), t.type === "touchmove" ? (this.currentX = t.touches[0].clientX - this.initialX, this.currentY = t.touches[0].clientY - this.initialY) : (this.currentX = t.clientX - this.initialX, this.currentY = t.clientY - this.initialY), this.xOffset = this.currentX, this.yOffset = this.currentY, this.el.isDragging = !0, this.dragging = !0, this.doSlideChange = !1, this.doSlideClose = !1;
      let e = Math.abs(this.currentX), i = Math.abs(this.currentY);
      if (e > 0 && e >= Math.abs(this.currentY) && (!this.lastDirection || this.lastDirection == "x")) {
        this.yOffset = 0, this.lastDirection = "x", this.setTranslate(this.dragContainer, this.currentX, 0);
        let s = this.shouldChange();
        if (!this.instance.settings.dragAutoSnap && s && (this.doSlideChange = s), this.instance.settings.dragAutoSnap && s) {
          this.instance.preventOutsideClick = !0, this.toleranceReached = !0, this.active = !1, this.instance.preventOutsideClick = !0, this.dragEnd(null), s == "right" && this.instance.prevSlide(), s == "left" && this.instance.nextSlide();
          return;
        }
      }
      if (this.toleranceY > 0 && i > 0 && i >= e && (!this.lastDirection || this.lastDirection == "y")) {
        this.xOffset = 0, this.lastDirection = "y", this.setTranslate(this.dragContainer, 0, this.currentY);
        let s = this.shouldClose();
        !this.instance.settings.dragAutoSnap && s && (this.doSlideClose = !0), this.instance.settings.dragAutoSnap && s && this.instance.close();
        return;
      }
    }
  }
  shouldChange() {
    let t = !1;
    if (Math.abs(this.currentX) >= this.toleranceX) {
      let i = this.currentX > 0 ? "right" : "left";
      (i == "left" && this.slide !== this.slide.parentNode.lastChild || i == "right" && this.slide !== this.slide.parentNode.firstChild) && (t = i);
    }
    return t;
  }
  shouldClose() {
    let t = !1;
    return Math.abs(this.currentY) >= this.toleranceY && (t = !0), t;
  }
  setTranslate(t, e, i, s = !1) {
    s ? t.style.transition = "all .2s ease" : t.style.transition = "", t.style.transform = `translate3d(${e}px, ${i}px, 0)`;
  }
}
function Ni(n, t, e, i) {
  const s = n.querySelector(".gslide-media");
  let r = new Image(), a = "gSlideTitle_" + e, o = "gSlideDesc_" + e;
  r.addEventListener("load", () => {
    x(i) && i();
  }, !1), r.src = t.href, t.sizes != "" && t.srcset != "" && (r.sizes = t.sizes, r.srcset = t.srcset), r.alt = "", !O(t.alt) && t.alt !== "" && (r.alt = t.alt), t.title !== "" && r.setAttribute("aria-labelledby", a), t.description !== "" && r.setAttribute("aria-describedby", o), t.hasOwnProperty("_hasCustomWidth") && t._hasCustomWidth && (r.style.width = t.width), t.hasOwnProperty("_hasCustomHeight") && t._hasCustomHeight && (r.style.height = t.height), s.insertBefore(r, s.firstChild);
}
function zi(n, t, e, i) {
  const s = n.querySelector(".ginner-container"), r = "gvideo" + e, a = n.querySelector(".gslide-media"), o = this.getAllPlayers();
  w(s, "gvideo-container"), a.insertBefore(V('<div class="gvideo-wrapper"></div>'), a.firstChild);
  const l = n.querySelector(".gvideo-wrapper");
  fe(this.settings.plyr.css, "Plyr");
  let c = t.href, h = t?.videoProvider, d = !1;
  a.style.maxWidth = t.width, fe(this.settings.plyr.js, "Plyr", () => {
    if (!h && c.match(/vimeo\.com\/([0-9]*)/) && (h = "vimeo"), !h && (c.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || c.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || c.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/)) && (h = "youtube"), h === "local" || !h) {
      h = "local";
      let f = '<video id="' + r + '" ';
      f += `style="background:#000; max-width: ${t.width};" `, f += 'preload="metadata" ', f += 'x-webkit-airplay="allow" ', f += "playsinline ", f += "controls ", f += 'class="gvideo-local">', f += `<source src="${c}">`, f += "</video>", d = V(f);
    }
    const u = d || V(`<div id="${r}" data-plyr-provider="${h}" data-plyr-embed-id="${c}"></div>`);
    w(l, `${h}-video gvideo`), l.appendChild(u), l.setAttribute("data-id", r), l.setAttribute("data-index", e);
    const g = E(this.settings.plyr, "config") ? this.settings.plyr.config : {}, p = new Plyr("#" + r, g);
    p.on("ready", (f) => {
      o[r] = f.detail.plyr, x(i) && i();
    }), zt(
      () => n.querySelector("iframe") && n.querySelector("iframe").dataset.ready == "true",
      () => {
        this.resize(n);
      }
    ), p.on("enterfullscreen", ye), p.on("exitfullscreen", ye);
  });
}
function ye(n) {
  const t = Y(n.target, ".gslide-media");
  n.type === "enterfullscreen" && w(t, "fullscreen"), n.type === "exitfullscreen" && A(t, "fullscreen");
}
function Xi(n, t, e, i) {
  const s = n.querySelector(".gslide-media"), r = E(t, "href") && t.href ? t.href.split("#").pop().trim() : !1, a = E(t, "content") && t.content ? t.content : !1;
  let o;
  if (a && (st(a) && (o = V(`<div class="ginlined-content">${a}</div>`)), H(a))) {
    a.style.display == "none" && (a.style.display = "block");
    const l = document.createElement("div");
    l.className = "ginlined-content", l.appendChild(a), o = l;
  }
  if (r) {
    let l = document.getElementById(r);
    if (!l)
      return !1;
    const c = l.cloneNode(!0);
    c.style.height = t.height, c.style.maxWidth = t.width, w(c, "ginlined-content"), o = c;
  }
  if (!o)
    return console.error("Unable to append inline slide content", t), !1;
  s.style.height = t.height, s.style.width = t.width, s.appendChild(o), this.events["inlineclose" + r] = q("click", {
    onElement: s.querySelectorAll(".gtrigger-close"),
    withCallback: (l) => {
      l.preventDefault(), this.close();
    }
  }), x(i) && i();
}
function Bi(n, t, e, i) {
  const s = n.querySelector(".gslide-media"), r = Ti({
    url: t.href,
    callback: i
  });
  s.parentNode.style.maxWidth = t.width, s.parentNode.style.height = t.height, s.appendChild(r);
}
class Ri {
  constructor(t = {}) {
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
    }, J(t) && (this.defaults = R(this.defaults, t));
  }
  /**
   * Get source type
   * gte the source type of a url
   *
   * @param {string} url
   */
  sourceType(t) {
    let e = t;
    return t = t.toLowerCase(), t.match(/\.(jpeg|jpg|jpe|gif|png|apn|webp|avif|svg)/) !== null ? "image" : t.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || t.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || t.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/) || t.match(/vimeo\.com\/([0-9]*)/) || t.match(/\.(mp4|ogg|webm|mov)/) !== null ? "video" : t.match(/\.(mp3|wav|wma|aac|ogg)/) !== null ? "audio" : t.indexOf("#") > -1 && e.split("#").pop().trim() !== "" ? "inline" : t.indexOf("goajax=true") > -1 ? "ajax" : "external";
  }
  parseConfig(t, e) {
    let i = R({ descPosition: e.descPosition }, this.defaults);
    if (J(t) && !H(t)) {
      E(t, "type") || (E(t, "content") && t.content ? t.type = "inline" : E(t, "href") && (t.type = this.sourceType(t.href)));
      let o = R(i, t);
      return this.setSize(o, e), o;
    }
    let s = "", r = t.getAttribute("data-glightbox"), a = t.nodeName.toLowerCase();
    if (a === "a" && (s = t.href), a === "img" && (s = t.src, i.alt = t.alt), i.href = s, S(i, (o, l) => {
      E(e, l) && l !== "width" && (i[l] = e[l]);
      const c = t.dataset[l];
      O(c) || (i[l] = this.sanitizeValue(c));
    }), i.content && (i.type = "inline"), !i.type && s && (i.type = this.sourceType(s)), O(r)) {
      if (!i.title && a == "a") {
        let o = t.title;
        !O(o) && o !== "" && (i.title = o);
      }
      if (!i.title && a == "img") {
        let o = t.alt;
        !O(o) && o !== "" && (i.title = o);
      }
    } else {
      let o = [];
      S(i, (l, c) => {
        o.push(";\\s?" + c);
      }), o = o.join("\\s?:|"), r.trim() !== "" && S(i, (l, c) => {
        const h = r, d = "s?" + c + "s?:s?(.*?)(" + o + "s?:|$)", u = new RegExp(d), g = h.match(u);
        if (g && g.length && g[1]) {
          const p = g[1].trim().replace(/;\s*$/, "");
          i[c] = this.sanitizeValue(p);
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
      let o = t.querySelector(".glightbox-desc");
      o && (i.description = o.innerHTML);
    }
    return this.setSize(i, e, t), this.slideConfig = i, i;
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
  setSize(t, e, i = null) {
    const s = t.type == "video" ? this.checkSize(e.videosWidth) : this.checkSize(e.width), r = this.checkSize(e.height);
    return t.width = E(t, "width") && t.width !== "" ? this.checkSize(t.width) : s, t.height = E(t, "height") && t.height !== "" ? this.checkSize(t.height) : r, i && t.type == "image" && (t._hasCustomWidth = !!i.dataset.width, t._hasCustomHeight = !!i.dataset.height), t;
  }
  /**
   * [checkSize size
   * check if the passed size has a correct unit
   *
   * @param {string} size
   * @return {string}
   */
  checkSize(t) {
    return wt(t) ? `${t}px` : t;
  }
  /**
   * Sanitize data attributes value
   *
   * @param string val
   * @return mixed
   */
  sanitizeValue(t) {
    return t !== "true" && t !== "false" ? t : t === "true";
  }
}
class pt {
  constructor(t, e, i) {
    this.element = t, this.instance = e, this.index = i;
  }
  /**
   * Set slide content
   *
   * @param {node} slide
   * @param {object} data
   * @param {function} callback
   */
  setContent(t = null, e = !1) {
    if (k(t, "loaded"))
      return !1;
    const i = this.instance.settings, s = this.slideConfig, r = Ut();
    x(i.beforeSlideLoad) && i.beforeSlideLoad({
      index: this.index,
      slide: t,
      player: !1
    });
    let a = s.type, o = s.descPosition, l = t.querySelector(".gslide-media"), c = t.querySelector(".gslide-title"), h = t.querySelector(".gslide-desc"), d = t.querySelector(".gdesc-inner"), u = e, g = "gSlideTitle_" + this.index, p = "gSlideDesc_" + this.index;
    if (x(i.afterSlideLoad) && (u = () => {
      x(e) && e(), i.afterSlideLoad({
        index: this.index,
        slide: t,
        player: this.instance.getSlidePlayerInstance(this.index)
      });
    }), s.title == "" && s.description == "" ? d && d.parentNode.parentNode.removeChild(d.parentNode) : (c && s.title !== "" ? (c.id = g, c.innerHTML = s.title) : c.parentNode.removeChild(c), h && s.description !== "" ? (h.id = p, r && i.moreLength > 0 ? (s.smallDescription = this.slideShortDesc(s.description, i.moreLength, i.moreText), h.innerHTML = s.smallDescription, this.descriptionEvents(h, s)) : h.innerHTML = s.description) : h.parentNode.removeChild(h), w(l.parentNode, `desc-${o}`), w(d.parentNode, `description-${o}`)), w(l, `gslide-${a}`), w(t, "loaded"), a === "video") {
      zi.apply(this.instance, [t, s, this.index, u]);
      return;
    }
    if (a === "external") {
      Bi.apply(this, [t, s, this.index, u]);
      return;
    }
    if (a === "inline") {
      Xi.apply(this.instance, [t, s, this.index, u]), s.draggable && new me({
        dragEl: t.querySelector(".gslide-inline"),
        toleranceX: i.dragToleranceX,
        toleranceY: i.dragToleranceY,
        slide: t,
        instance: this.instance
      });
      return;
    }
    if (a === "image") {
      Ni(t, s, this.index, () => {
        const f = t.querySelector("img");
        s.draggable && new me({
          dragEl: f,
          toleranceX: i.dragToleranceX,
          toleranceY: i.dragToleranceY,
          slide: t,
          instance: this.instance
        }), s.zoomable && f.naturalWidth > f.offsetWidth && (w(f, "zoomable"), new Yi(f, t, () => {
          this.instance.resize();
        })), x(u) && u();
      });
      return;
    }
    x(u) && u();
  }
  slideShortDesc(t, e = 50, i = !1) {
    let s = document.createElement("div");
    s.innerHTML = t;
    let r = s.innerText, a = i;
    if (t = r.trim(), t.length <= e)
      return t;
    let o = t.substr(0, e - 1);
    return a ? (s = null, o + '... <a href="#" class="desc-more">' + i + "</a>") : o;
  }
  descriptionEvents(t, e) {
    let i = t.querySelector(".desc-more");
    if (!i)
      return !1;
    q("click", {
      onElement: i,
      withCallback: (s, r) => {
        s.preventDefault();
        const a = document.body;
        let o = Y(r, ".gslide-desc");
        if (!o)
          return !1;
        o.innerHTML = e.description, w(a, "gdesc-open");
        let l = q("click", {
          onElement: [a, Y(o, ".gslide-description")],
          withCallback: (c, h) => {
            c.target.nodeName.toLowerCase() !== "a" && (A(a, "gdesc-open"), w(a, "gdesc-closed"), o.innerHTML = e.smallDescription, this.descriptionEvents(o, e), setTimeout(() => {
              A(a, "gdesc-closed");
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
    return V(this.instance.settings.slideHTML);
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
    !H(this.element) && !this.element.hasOwnProperty("draggable") && (this.element.draggable = this.instance.settings.draggable);
    const t = new Ri(this.instance.settings.slideExtraAttributes);
    return this.slideConfig = t.parseConfig(this.element, this.instance.settings), this.slideConfig;
  }
}
const Hi = "3.2.0", be = Ut(), we = Ci();
let Xt;
typeof document > "u" || (Xt = document.getElementsByTagName("html")[0]);
const Kt = {
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
Kt.slideHTML = `<div class="gslide">
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
Kt.lightboxHTML = `<div id="glightbox-body" class="glightbox-container" tabindex="-1" role="dialog" aria-hidden="false">
    <div class="gloader visible"></div>
    <div class="goverlay"></div>
    <div class="gcontainer">
    <div id="glightbox-slider" class="gslider"></div>
    <button class="gclose gbtn" aria-label="Close" data-taborder="3">{closeSVG}</button>
    <button class="gprev gbtn" aria-label="Previous" data-taborder="2">{prevSVG}</button>
    <button class="gnext gbtn" aria-label="Next" data-taborder="1">{nextSVG}</button>
</div>
</div>`;
class ve {
  constructor(t = {}) {
    this.customOptions = t, this.settings = R(Kt, t), this.effectsClasses = this.getAnimationClasses(), this.videoPlayers = {}, this.apiEvents = [], this.fullElementsList = !1;
  }
  init() {
    const t = this.getSelector();
    t && (this.baseEvents = q("click", {
      onElement: t,
      withCallback: (e, i) => {
        e.preventDefault(), this.open(i);
      }
    })), this.elements = this.getElements();
  }
  open(t = null, e = null) {
    if (this.elements.length === 0)
      return !1;
    this.activeSlide = null, this.prevActiveSlideIndex = null, this.prevActiveSlide = null;
    let i = wt(e) ? e : this.settings.startAt;
    if (H(t)) {
      const o = t.getAttribute("data-gallery");
      o && (this.fullElementsList = this.elements, this.elements = this.getGalleryElements(this.elements, o)), O(i) && (i = this.getElementIndex(t), i < 0 && (i = 0));
    }
    wt(i) || (i = 0), this.build(), G(this.overlay, this.settings.openEffect === "none" ? "none" : this.settings.cssEfects.fade.in);
    const s = document.body, r = window.innerWidth - document.documentElement.clientWidth;
    if (r > 0) {
      var a = document.createElement("style");
      a.type = "text/css", a.className = "gcss-styles", a.innerText = `.gscrollbar-fixer {margin-right: ${r}px}`, document.head.appendChild(a), w(s, "gscrollbar-fixer");
    }
    w(s, "glightbox-open"), w(Xt, "glightbox-open"), be && (w(document.body, "glightbox-mobile"), this.settings.slideEffect = "slide"), this.showSlide(i, !0), this.elements.length === 1 ? (w(this.prevButton, "glightbox-button-hidden"), w(this.nextButton, "glightbox-button-hidden")) : (A(this.prevButton, "glightbox-button-hidden"), A(this.nextButton, "glightbox-button-hidden")), this.lightboxOpen = !0, this.trigger("open"), x(this.settings.onOpen) && this.settings.onOpen(), we && this.settings.touchNavigation && Ii(this), this.settings.keyboardNavigation && Li(this);
  }
  /**
   * Open at specific index
   * @param {int} index
   */
  openAt(t = 0) {
    this.open(null, t);
  }
  /**
   * Set Slide
   */
  showSlide(t = 0, e = !1) {
    ue(this.loader), this.index = parseInt(t);
    let i = this.slidesContainer.querySelector(".current");
    i && A(i, "current"), this.slideAnimateOut();
    let s = this.slidesContainer.querySelectorAll(".gslide")[t];
    if (k(s, "loaded"))
      this.slideAnimateIn(s, e), Dt(this.loader);
    else {
      ue(this.loader);
      const r = this.elements[t], a = {
        index: this.index,
        slide: s,
        //this will be removed in the future
        slideNode: s,
        slideConfig: r.slideConfig,
        slideIndex: this.index,
        trigger: r.node,
        player: null
      };
      this.trigger("slide_before_load", a), r.instance.setContent(s, () => {
        Dt(this.loader), this.resize(), this.slideAnimateIn(s, e), this.trigger("slide_after_load", a);
      });
    }
    this.slideDescription = s.querySelector(".gslide-description"), this.slideDescriptionContained = this.slideDescription && k(this.slideDescription.parentNode, "gslide-media"), this.settings.preload && (this.preloadSlide(t + 1), this.preloadSlide(t - 1)), this.updateNavigationClasses(), this.activeSlide = s;
  }
  /**
   * Preload slides
   * @param  {Int}  index slide index
   * @return {null}
   */
  preloadSlide(t) {
    if (t < 0 || t > this.elements.length - 1 || O(this.elements[t]))
      return !1;
    let e = this.slidesContainer.querySelectorAll(".gslide")[t];
    if (k(e, "loaded"))
      return !1;
    const i = this.elements[t], s = i.type, r = {
      index: t,
      slide: e,
      //this will be removed in the future
      slideNode: e,
      slideConfig: i.slideConfig,
      slideIndex: t,
      trigger: i.node,
      player: null
    };
    this.trigger("slide_before_load", r), s === "video" || s === "external" ? setTimeout(() => {
      i.instance.setContent(e, () => {
        this.trigger("slide_after_load", r);
      });
    }, 200) : i.instance.setContent(e, () => {
      this.trigger("slide_after_load", r);
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
  goToSlide(t = !1) {
    if (this.prevActiveSlide = this.activeSlide, this.prevActiveSlideIndex = this.index, !this.loop() && (t < 0 || t > this.elements.length - 1))
      return !1;
    t < 0 ? t = this.elements.length - 1 : t >= this.elements.length && (t = 0), this.showSlide(t);
  }
  /**
   * Insert slide
   *
   * @param { object } data
   * @param { numeric } position
   */
  insertSlide(t = {}, e = -1) {
    e < 0 && (e = this.elements.length);
    const i = new pt(t, this, e), s = i.getConfig(), r = R({}, s), a = i.create(), o = this.elements.length - 1;
    r.index = e, r.node = !1, r.instance = i, r.slideConfig = s, this.elements.splice(e, 0, r);
    let l = null, c = null;
    if (this.slidesContainer) {
      if (e > o)
        this.slidesContainer.appendChild(a);
      else {
        let h = this.slidesContainer.querySelectorAll(".gslide")[e];
        this.slidesContainer.insertBefore(a, h);
      }
      (this.settings.preload && this.index == 0 && e == 0 || this.index - 1 == e || this.index + 1 == e) && this.preloadSlide(e), this.index === 0 && e === 0 && (this.index = 1), this.updateNavigationClasses(), l = this.slidesContainer.querySelectorAll(".gslide")[e], c = this.getSlidePlayerInstance(e), r.slideNode = l;
    }
    this.trigger("slide_inserted", {
      index: e,
      slide: l,
      slideNode: l,
      slideConfig: s,
      slideIndex: e,
      trigger: null,
      player: c
    }), x(this.settings.slideInserted) && this.settings.slideInserted({
      index: e,
      slide: l,
      player: c
    });
  }
  /**
   * Remove slide
   *
   * @param { numeric } position
   */
  removeSlide(t = -1) {
    if (t < 0 || t > this.elements.length - 1)
      return !1;
    const e = this.slidesContainer && this.slidesContainer.querySelectorAll(".gslide")[t];
    e && (this.getActiveSlideIndex() == t && (t == this.elements.length - 1 ? this.prevSlide() : this.nextSlide()), e.parentNode.removeChild(e)), this.elements.splice(t, 1), this.trigger("slide_removed", t), x(this.settings.slideRemoved) && this.settings.slideRemoved(t);
  }
  /**
   * Slide In
   * @return {null}
   */
  slideAnimateIn(t, e) {
    let i = t.querySelector(".gslide-media"), s = t.querySelector(".gslide-description"), r = {
      index: this.prevActiveSlideIndex,
      slide: this.prevActiveSlide,
      //this will be removed in the future
      slideNode: this.prevActiveSlide,
      slideIndex: this.prevActiveSlide,
      slideConfig: O(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].slideConfig,
      trigger: O(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].node,
      player: this.getSlidePlayerInstance(this.prevActiveSlideIndex)
    }, a = {
      index: this.index,
      slide: this.activeSlide,
      //this will be removed in the future
      slideNode: this.activeSlide,
      slideConfig: this.elements[this.index].slideConfig,
      slideIndex: this.index,
      trigger: this.elements[this.index].node,
      player: this.getSlidePlayerInstance(this.index)
    };
    if (i.offsetWidth > 0 && s && (Dt(s), s.style.display = ""), A(t, this.effectsClasses), e)
      G(t, this.settings.cssEfects[this.settings.openEffect].in, () => {
        this.settings.autoplayVideos && this.slidePlayerPlay(t), this.trigger("slide_changed", {
          prev: r,
          current: a
        }), x(this.settings.afterSlideChange) && this.settings.afterSlideChange.apply(this, [r, a]);
      });
    else {
      let o = this.settings.slideEffect, l = o !== "none" ? this.settings.cssEfects[o].in : o;
      this.prevActiveSlideIndex > this.index && this.settings.slideEffect == "slide" && (l = this.settings.cssEfects.slideBack.in), G(t, l, () => {
        this.settings.autoplayVideos && this.slidePlayerPlay(t), this.trigger("slide_changed", {
          prev: r,
          current: a
        }), x(this.settings.afterSlideChange) && this.settings.afterSlideChange.apply(this, [r, a]);
      });
    }
    setTimeout(() => {
      this.resize(t);
    }, 100), w(t, "current");
  }
  /**
   * Slide out
   */
  slideAnimateOut() {
    if (!this.prevActiveSlide)
      return !1;
    let t = this.prevActiveSlide;
    A(t, this.effectsClasses), w(t, "prev");
    let e = this.settings.slideEffect, i = e !== "none" ? this.settings.cssEfects[e].out : e;
    this.slidePlayerPause(t), this.trigger("slide_before_change", {
      prev: {
        index: this.prevActiveSlideIndex,
        //this will be removed in the future
        slide: this.prevActiveSlide,
        //this will be removed in the future
        slideNode: this.prevActiveSlide,
        slideIndex: this.prevActiveSlideIndex,
        slideConfig: O(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].slideConfig,
        trigger: O(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].node,
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
    }), x(this.settings.beforeSlideChange) && this.settings.beforeSlideChange.apply(this, [
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
    ]), this.prevActiveSlideIndex > this.index && this.settings.slideEffect == "slide" && (i = this.settings.cssEfects.slideBack.out), G(t, i, () => {
      let s = t.querySelector(".ginner-container"), r = t.querySelector(".gslide-media"), a = t.querySelector(".gslide-description");
      s.style.transform = "", r.style.transform = "", A(r, "greset"), r.style.opacity = "", a && (a.style.opacity = ""), A(t, "prev");
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
  getSlidePlayerInstance(t) {
    const e = "gvideo" + t, i = this.getAllPlayers();
    return E(i, e) && i[e] ? i[e] : !1;
  }
  /**
   * Stop video at specified
   * node or index
   *
   * @param slide node or index
   * @return void
   */
  stopSlideVideo(t) {
    if (H(t)) {
      let i = t.querySelector(".gvideo-wrapper");
      i && (t = i.getAttribute("data-index"));
    }
    console.log("stopSlideVideo is deprecated, use slidePlayerPause");
    const e = this.getSlidePlayerInstance(t);
    e && e.playing && e.pause();
  }
  /**
   * Stop player at specified index
   *
   * @param slide node or index
   * @return void
   */
  slidePlayerPause(t) {
    if (H(t)) {
      let i = t.querySelector(".gvideo-wrapper");
      i && (t = i.getAttribute("data-index"));
    }
    const e = this.getSlidePlayerInstance(t);
    e && e.playing && e.pause();
  }
  /**
   * Play video at specified
   * node or index
   *
   * @param slide node or index
   * @return void
   */
  playSlideVideo(t) {
    if (H(t)) {
      let i = t.querySelector(".gvideo-wrapper");
      i && (t = i.getAttribute("data-index"));
    }
    console.log("playSlideVideo is deprecated, use slidePlayerPlay");
    const e = this.getSlidePlayerInstance(t);
    e && !e.playing && e.play();
  }
  /**
   * Play media player at specified
   * node or index
   *
   * @param slide node or index
   * @return void
   */
  slidePlayerPlay(t) {
    if (be && !this.settings.plyr.config?.muted)
      return;
    if (H(t)) {
      let i = t.querySelector(".gvideo-wrapper");
      i && (t = i.getAttribute("data-index"));
    }
    const e = this.getSlidePlayerInstance(t);
    e && !e.playing && (e.play(), this.settings.autofocusVideos && e.elements.container.focus());
  }
  /**
   * Set the entire elements
   * in the gallery, it replaces all
   * the existing elements
   * with the specified list
   *
   * @param {array}  elements
   */
  setElements(t) {
    this.settings.elements = !1;
    const e = [];
    t && t.length && S(t, (i, s) => {
      const r = new pt(i, this, s), a = r.getConfig(), o = R({}, a);
      o.slideConfig = a, o.instance = r, o.index = s, e.push(o);
    }), this.elements = e, this.lightboxOpen && (this.slidesContainer.innerHTML = "", this.elements.length && (S(this.elements, () => {
      let i = V(this.settings.slideHTML);
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
  getElementIndex(t) {
    let e = !1;
    return S(this.elements, (i, s) => {
      if (E(i, "node") && i.node == t)
        return e = s, !0;
    }), e;
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
    let t = [];
    this.elements = this.elements ? this.elements : [], !O(this.settings.elements) && Pe(this.settings.elements) && this.settings.elements.length && S(this.settings.elements, (s, r) => {
      const a = new pt(s, this, r), o = a.getConfig(), l = R({}, o);
      l.node = !1, l.index = r, l.instance = a, l.slideConfig = o, t.push(l);
    });
    let e = !1;
    return this.getSelector() && (e = document.querySelectorAll(this.getSelector())), e && S(e, (s, r) => {
      const a = new pt(s, this, r), o = a.getConfig(), l = R({}, o);
      l.node = s, l.index = r, l.instance = a, l.slideConfig = o, l.gallery = s.getAttribute("data-gallery"), t.push(l);
    }), t;
  }
  /**
   * Return only the elements
   * from a specific gallery
   *
   * @return array
   */
  getGalleryElements(t, e) {
    return t.filter((i) => i.gallery == e);
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
    let t = [];
    for (let e in this.settings.cssEfects)
      if (this.settings.cssEfects.hasOwnProperty(e)) {
        let i = this.settings.cssEfects[e];
        t.push(`g${i.in}`), t.push(`g${i.out}`);
      }
    return t.join(" ");
  }
  /**
   * Build the structure
   * @return {null}
   */
  build() {
    if (this.built)
      return !1;
    const t = document.body.childNodes, e = [];
    S(t, (c) => {
      c.parentNode == document.body && c.nodeName.charAt(0) !== "#" && c.hasAttribute && !c.hasAttribute("aria-hidden") && (e.push(c), c.setAttribute("aria-hidden", "true"));
    });
    const i = E(this.settings.svg, "next") ? this.settings.svg.next : "", s = E(this.settings.svg, "prev") ? this.settings.svg.prev : "", r = E(this.settings.svg, "close") ? this.settings.svg.close : "";
    let a = this.settings.lightboxHTML;
    a = a.replace(/{nextSVG}/g, i), a = a.replace(/{prevSVG}/g, s), a = a.replace(/{closeSVG}/g, r), a = V(a), document.body.appendChild(a);
    const o = document.getElementById("glightbox-body");
    this.modal = o;
    let l = o.querySelector(".gclose");
    this.prevButton = o.querySelector(".gprev"), this.nextButton = o.querySelector(".gnext"), this.overlay = o.querySelector(".goverlay"), this.loader = o.querySelector(".gloader"), this.slidesContainer = document.getElementById("glightbox-slider"), this.bodyHiddenChildElms = e, this.events = {}, w(this.modal, "glightbox-" + this.settings.skin), this.settings.closeButton && l && (this.events.close = q("click", {
      onElement: l,
      withCallback: (c, h) => {
        c.preventDefault(), this.close();
      }
    })), l && !this.settings.closeButton && l.parentNode.removeChild(l), this.nextButton && (this.events.next = q("click", {
      onElement: this.nextButton,
      withCallback: (c, h) => {
        c.preventDefault(), this.nextSlide();
      }
    })), this.prevButton && (this.events.prev = q("click", {
      onElement: this.prevButton,
      withCallback: (c, h) => {
        c.preventDefault(), this.prevSlide();
      }
    })), this.settings.closeOnOutsideClick && (this.events.outClose = q("click", {
      onElement: o,
      withCallback: (c, h) => {
        !this.preventOutsideClick && !k(document.body, "glightbox-mobile") && !Y(c.target, ".ginner-container") && !Y(c.target, ".gbtn") && !k(c.target, "gnext") && !k(c.target, "gprev") && this.close();
      }
    })), S(this.elements, (c, h) => {
      this.slidesContainer.appendChild(c.instance.create()), c.slideNode = this.slidesContainer.querySelectorAll(".gslide")[h];
    }), we && w(document.body, "glightbox-touch"), this.events.resize = q("resize", {
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
  resize(t = null) {
    if (t = t || this.activeSlide, !t || k(t, "zoomed"))
      return;
    const e = ke(), i = t.querySelector(".gvideo-wrapper"), s = t.querySelector(".gslide-image"), r = this.slideDescription;
    let a = e.width, o = e.height;
    if (a <= 768 ? w(document.body, "glightbox-mobile") : A(document.body, "glightbox-mobile"), !i && !s)
      return;
    let l = !1;
    if (r && (k(r, "description-bottom") || k(r, "description-top")) && !k(r, "gabsolute") && (l = !0), s) {
      if (a <= 768)
        s.querySelector("img");
      else if (l) {
        let c = r.offsetHeight, h = s.querySelector("img");
        const u = this.elements[this.index].node.getAttribute("data-height") ?? "100vh";
        h.setAttribute("style", `max-height: calc(${u} - ${c}px)`), r.setAttribute("style", `max-width: ${h.offsetWidth}px;`);
      }
    }
    if (i) {
      let c = E(this.settings.plyr.config, "ratio") ? this.settings.plyr.config.ratio : "";
      if (!c) {
        const p = i.clientWidth, f = i.clientHeight, m = p / f;
        c = `${p / m}:${f / m}`;
      }
      let h = c.split(":"), d = this.settings.videosWidth, u = this.settings.videosWidth;
      wt(d) || d.indexOf("px") !== -1 ? u = parseInt(d) : d.indexOf("vw") !== -1 ? u = a * parseInt(d) / 100 : d.indexOf("vh") !== -1 ? u = o * parseInt(d) / 100 : d.indexOf("%") !== -1 ? u = a * parseInt(d) / 100 : u = parseInt(i.clientWidth);
      let g = u / (parseInt(h[0]) / parseInt(h[1]));
      if (g = Math.floor(g), l && (o = o - r.offsetHeight), u > a || g > o || o < g && a > u) {
        let p = i.offsetWidth, f = i.offsetHeight, m = o / f, y = { width: p * m };
        i.parentNode.setAttribute("style", `max-width: ${y.width}px`), l && r.setAttribute("style", `max-width: ${y.width}px;`);
      } else
        i.parentNode.style.maxWidth = `${d}`, l && r.setAttribute("style", `max-width: ${d};`);
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
    const t = this.loop();
    A(this.nextButton, "disabled"), A(this.prevButton, "disabled"), this.index == 0 && this.elements.length - 1 == 0 ? (w(this.prevButton, "disabled"), w(this.nextButton, "disabled")) : this.index === 0 && !t ? w(this.prevButton, "disabled") : this.index === this.elements.length - 1 && !t && w(this.nextButton, "disabled");
  }
  /**
   * Handle loop config
   */
  loop() {
    let t = E(this.settings, "loopAtEnd") ? this.settings.loopAtEnd : null;
    return t = E(this.settings, "loop") ? this.settings.loop : t, t;
  }
  /**
   * Close Lightbox
   * closes the lightbox and removes the slides
   * and some classes
   */
  close() {
    if (!this.lightboxOpen) {
      if (this.events) {
        for (let t in this.events)
          this.events.hasOwnProperty(t) && this.events[t].destroy();
        this.events = null;
      }
      return !1;
    }
    if (this.closing)
      return !1;
    this.closing = !0, this.slidePlayerPause(this.activeSlide), this.fullElementsList && (this.elements = this.fullElementsList), this.bodyHiddenChildElms.length && S(this.bodyHiddenChildElms, (t) => {
      t.removeAttribute("aria-hidden");
    }), w(this.modal, "glightbox-closing"), G(this.overlay, this.settings.openEffect == "none" ? "none" : this.settings.cssEfects.fade.out), G(this.activeSlide, this.settings.cssEfects[this.settings.closeEffect].out, () => {
      if (this.activeSlide = null, this.prevActiveSlideIndex = null, this.prevActiveSlide = null, this.built = !1, this.events) {
        for (let i in this.events)
          this.events.hasOwnProperty(i) && this.events[i].destroy();
        this.events = null;
      }
      const t = document.body;
      A(Xt, "glightbox-open"), A(t, "glightbox-open touching gdesc-open glightbox-touch glightbox-mobile gscrollbar-fixer"), this.modal.parentNode.removeChild(this.modal), this.trigger("close"), x(this.settings.onClose) && this.settings.onClose();
      const e = document.querySelector(".gcss-styles");
      e && e.parentNode.removeChild(e), this.lightboxOpen = !1, this.closing = null;
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
  on(t, e, i = !1) {
    if (!t || !x(e))
      throw new TypeError("Event name and callback must be defined");
    this.apiEvents.push({ evt: t, once: i, callback: e });
  }
  /**
   * Set event
   */
  once(t, e) {
    this.on(t, e, !0);
  }
  /**
   * Triggers an specific event
   * with data
   *
   * @param string eventName
   */
  trigger(t, e = null) {
    const i = [];
    S(this.apiEvents, (s, r) => {
      const { evt: a, once: o, callback: l } = s;
      a == t && (l(e), o && i.push(r));
    }), i.length && S(i, (s) => this.apiEvents.splice(s, 1));
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
    return Hi;
  }
}
class Fi {
  constructor(t = {}) {
    this.animationTime = t.animationTime ?? 800, this.frameRate = t.frameRate ?? 150, this.stepSize = t.stepSize ?? 120, this.accelerationDelta = t.accelerationDelta ?? 300, this.accelerationMax = t.accelerationMax ?? 2, this.pulseScale = t.pulseScale ?? 4, this.pulseNormalize = 1, this.keyboardSupport = t.keyboardSupport ?? !0, this.arrowScroll = t.arrowScroll ?? 50, this.fixedBackground = t.fixedBackground ?? !1, this.queue = [], this.pending = !1, this.lastScrollTime = Date.now(), this.direction = { x: 0, y: 0 }, this.activeElement = null, this.deltaBuffer = [], this.deltaBufferTimer = null, this.isMac = /^Mac/.test(navigator.platform), this.scrollBehaviorCache = /* @__PURE__ */ new WeakMap(), this.ancestorCache = /* @__PURE__ */ new WeakMap(), this.ancestorCacheTTL = 300, this.ancestorCacheGen = 0, this._lastWheelTime = 0, this.pulseNormalize = 1 / this._pulseRaw(1), this._init();
  }
  _init() {
    const t = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";
    window.addEventListener(t, this._onWheel.bind(this), { passive: !1 }), this.keyboardSupport && window.addEventListener("keydown", this._onKeydown.bind(this), !1), window.addEventListener("mousedown", this._onMousedown.bind(this), !1), window.addEventListener("resize", () => {
      this.ancestorCache = /* @__PURE__ */ new WeakMap();
    }), this.fixedBackground || (document.body.style.backgroundAttachment = "scroll", document.documentElement.style.backgroundAttachment = "scroll");
  }
  destroy() {
    const t = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";
    window.removeEventListener(t, this._onWheel.bind(this)), window.removeEventListener("keydown", this._onKeydown.bind(this)), window.removeEventListener("mousedown", this._onMousedown.bind(this)), this.queue = [], this.pending = !1;
  }
  _onMousedown(t) {
    this.activeElement = t.target, this.ancestorCache = /* @__PURE__ */ new WeakMap();
  }
  _onKeydown(t) {
    const e = t.target, i = t.ctrlKey || t.altKey || t.metaKey || t.shiftKey && t.code !== "Space", s = /^(textarea|select|embed|object)$/i, r = /^(button|submit|radio|checkbox|file|color|image)$/i;
    if (t.defaultPrevented || s.test(e.nodeName) || e.nodeName === "INPUT" && !r.test(e.type) || e.isContentEditable || i)
      return !0;
    let a = 0, o = 0;
    const l = this._findScrollableAncestor(this.activeElement || document.activeElement);
    if (!l) return;
    const c = l === document.body ? window.innerHeight : l.clientHeight;
    switch (t.code) {
      case "ArrowUp":
        o = -this.arrowScroll;
        break;
      case "ArrowDown":
        o = this.arrowScroll;
        break;
      case "Space":
        o = -(t.shiftKey ? 1 : -1) * c * 0.9;
        break;
      case "PageUp":
        o = -c * 0.9;
        break;
      case "PageDown":
        o = c * 0.9;
        break;
      case "Home":
        o = -l.scrollTop;
        break;
      case "End":
        const d = l.scrollHeight - l.scrollTop - c;
        o = d > 0 ? d + 10 : 0;
        break;
      case "ArrowLeft":
        a = -this.arrowScroll;
        break;
      case "ArrowRight":
        a = this.arrowScroll;
        break;
      default:
        return !0;
    }
    this._enqueueScroll(l, a, o), t.preventDefault();
  }
  _onWheel(t) {
    if (t.ctrlKey || t.defaultPrevented) return;
    let e = -t.wheelDeltaX || t.deltaX || 0, i = -t.wheelDeltaY || t.deltaY || 0;
    if (this.isMac && (t.wheelDeltaX && this._isDivisible(t.wheelDeltaX, 120) && (e = -120 * (t.wheelDeltaX / Math.abs(t.wheelDeltaX))), t.wheelDeltaY && this._isDivisible(t.wheelDeltaY, 120) && (i = -120 * (t.wheelDeltaY / Math.abs(t.wheelDeltaY)))), !e && !i && (i = -t.wheelDelta || 0), t.deltaMode === 1 && (e *= 40, i *= 40), this._isTouchpad(i))
      return !0;
    Math.abs(e) > 1.2 && (e *= this.stepSize / 120), Math.abs(i) > 1.2 && (i *= this.stepSize / 120);
    const s = Date.now();
    s - this._lastWheelTime > this.ancestorCacheTTL && this.ancestorCacheGen++, this._lastWheelTime = s;
    const r = t.target, a = this._findScrollableAncestor(r);
    if (!a) return;
    const o = Math.sign(e), l = Math.sign(i);
    (o !== this.direction.x || l !== this.direction.y) && (this.direction = { x: o, y: l }, this.queue = [], this.lastScrollTime = 0);
    const c = Date.now(), h = c - this.lastScrollTime;
    if (h < this.accelerationDelta) {
      const d = (1 + 50 / h) / 2;
      if (d > 1) {
        const u = Math.min(d, this.accelerationMax);
        e *= u, i *= u;
      }
    }
    this.lastScrollTime = c, this._enqueueScroll(a, e, i), t.preventDefault();
  }
  _isDivisible(t, e) {
    return Math.floor(t / e) === t / e;
  }
  _isTouchpad(t) {
    if (!t) return !1;
    this.deltaBuffer.length || (this.deltaBuffer = [t, t, t]);
    const e = Math.abs(t);
    this.deltaBuffer.push(e), this.deltaBuffer.shift(), clearTimeout(this.deltaBufferTimer), this.deltaBufferTimer = setTimeout(() => {
      this.deltaBuffer = [];
    }, 1e3);
    const i = this.deltaBuffer.every((o) => this._isDivisible(o, 120)), s = this.deltaBuffer.every((o) => this._isDivisible(o, 100)), r = e > 120 && this.deltaBuffer.every((o) => this._isDivisible(o, e)), a = !i && !s && !r;
    return e < 50 ? !0 : a;
  }
  /* Does this element still qualify as the scroll container? Same test the
   * walk uses, applied to a single element. Cheap-check first, as there. */
  _stillScrollable(t) {
    if (!t || !t.isConnected) return !1;
    const e = t.scrollHeight > t.clientHeight, i = t.scrollWidth > t.clientWidth;
    if (!e && !i) return !1;
    const s = window.getComputedStyle(t);
    return ["auto", "scroll"].includes(s.overflowY) && e || ["auto", "scroll"].includes(s.overflowX) && i;
  }
  _findScrollableAncestor(t) {
    const e = document.scrollingElement || document.documentElement;
    if (!t) return e;
    const i = this.ancestorCache.get(t);
    if (i) {
      if (i.gen === this.ancestorCacheGen) return i.result;
      if (i.result === e || this._stillScrollable(i.result))
        return i.gen = this.ancestorCacheGen, i.result;
    }
    let s = t, r = e;
    for (; s && s !== document.body; ) {
      const a = s.scrollHeight > s.clientHeight, o = s.scrollWidth > s.clientWidth;
      if (a || o) {
        const l = window.getComputedStyle(s), c = ["auto", "scroll"].includes(l.overflowY), h = ["auto", "scroll"].includes(l.overflowX);
        if (c && a || h && o) {
          r = s;
          break;
        }
      }
      if (s === e) {
        r = e;
        break;
      }
      s = s.parentElement;
    }
    return this.ancestorCache.set(t, { result: r, gen: this.ancestorCacheGen }), r;
  }
  _enqueueScroll(t, e, i) {
    if (!this.scrollBehaviorCache.has(t)) {
      const s = window.getComputedStyle(t).scrollBehavior;
      s === "smooth" && (this.scrollBehaviorCache.set(t, s), t.style.scrollBehavior = "auto");
    }
    this.queue.push({
      element: t,
      x: e,
      y: i,
      lastX: e < 0 ? 0.99 : -0.99,
      lastY: i < 0 ? 0.99 : -0.99,
      start: Date.now()
    }), this.pending || (this._animate(t), this.pending = !0);
  }
  _animate(t) {
    const e = () => {
      const i = Date.now();
      let s = 0, r = 0;
      for (let o = this.queue.length - 1; o >= 0; o--) {
        const l = this.queue[o], c = i - l.start, h = c >= this.animationTime, d = h ? 1 : c / this.animationTime, u = this._pulse(d), g = l.x * u - l.lastX >> 0, p = l.y * u - l.lastY >> 0;
        s += g, r += p, l.lastX += g, l.lastY += p, h && this.queue.splice(o, 1);
      }
      if (t === document.scrollingElement || t === document.documentElement || t === document.body ? window.scrollBy(s, r) : (s && (t.scrollLeft += s), r && (t.scrollTop += r)), this.queue.length > 0)
        requestAnimationFrame(e);
      else if (this.pending = !1, this.scrollBehaviorCache.has(t)) {
        const o = this.scrollBehaviorCache.get(t);
        t.style.scrollBehavior = o, this.scrollBehaviorCache.delete(t);
      }
    };
    requestAnimationFrame(e);
  }
  _pulseRaw(t) {
    if (t *= this.pulseScale, t < 1)
      return t - (1 - Math.exp(-t));
    {
      const e = Math.exp(-1);
      t -= 1;
      const i = 1 - Math.exp(-t);
      return e + i * (1 - e);
    }
  }
  _pulse(t) {
    return t >= 1 ? 1 : t <= 0 ? 0 : this._pulseRaw(t) * this.pulseNormalize;
  }
}
class $i {
  constructor(t = {}) {
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
      ...t
    }, this.plugins = /* @__PURE__ */ new Map(), this.loadedStyles = /* @__PURE__ */ new Set(), this.components = /* @__PURE__ */ new Map(), this.externalPlugins = /* @__PURE__ */ new Map();
  }
  /**
   * Auto-detect and load plugins based on DOM elements
   */
  async autoLoadPlugins() {
    const e = this.detectComponentTypes().filter(
      (i) => this.config.plugins[i] && !this.plugins.has(i)
    );
    return e.length > 0 && await Promise.all(
      e.map((i) => this.loadPlugin(i))
    ), e;
  }
  /**
   * Detect all component types used in the page
   */
  detectComponentTypes() {
    const t = /* @__PURE__ */ new Set();
    return document.querySelectorAll("[data-cb-type]").forEach((e) => {
      t.add(e.dataset.cbType);
    }), document.querySelectorAll('[class*="cb-"]').forEach((e) => {
      e.classList.forEach((i) => {
        if (i.startsWith("cb-")) {
          const s = i.replace("cb-", "");
          t.add(s);
        }
      });
    }), Array.from(t);
  }
  /**
   * Load a plugin dynamically
   */
  async loadPlugin(t) {
    if (this.plugins.has(t))
      return this.plugins.get(t);
    const e = this.config.plugins[t];
    if (!e)
      return console.warn(`[PluginManager] Plugin "${t}" not found in registry`), null;
    if (t === "code") {
      const i = {
        name: "code",
        version: "1.0.0",
        mount: function(s, r) {
          return {};
        }
      };
      return this.plugins.set(t, i), this.emit("plugin-loaded", { name: t, plugin: i }), i;
    }
    try {
      e.css && this.loadCSS(this.resolveUrl(e.css));
      const i = this.resolveUrl(e.url), s = await this.importModule(i), r = s.default || s;
      return this.plugins.set(t, r), typeof r.init == "function" && await r.init(this), this.emit("plugin-loaded", { name: t, plugin: r }), r;
    } catch (i) {
      return console.error(`[PluginManager] Failed to load plugin "${t}":`, i), null;
    }
  }
  /**
   * Dynamically import ES module
   */
  async importModule(t) {
    return import(
      /* webpackIgnore: true */
      /* @vite-ignore */
      t
    );
  }
  /**
   * Load CSS file
   */
  loadCSS(t) {
    if (this.loadedStyles.has(t)) return;
    const e = document.createElement("link");
    e.rel = "stylesheet", e.href = t, e.onload = () => {
      this.emit("css-loaded", { url: t });
    }, e.onerror = () => {
      console.error(`[PluginManager] Failed to load CSS: ${t}`);
    }, document.head.appendChild(e), this.loadedStyles.add(t);
  }
  /**
   * Resolve URL (handle relative paths)
   */
  resolveUrl(t) {
    return t.startsWith("http://") || t.startsWith("https://") || t.startsWith("//") ? t : this.config.pluginBaseUrl + t;
  }
  /**
   * Initialize all components in the page
   */
  initializeComponents() {
    return document.querySelectorAll("[data-cb-type]").forEach((e, i) => {
      const s = e.dataset.cbType, r = this.plugins.get(s);
      if (r && typeof r.mount == "function")
        try {
          const a = this.parseOptions(e);
          let o = e.querySelector(".grid-sortable");
          o || e.classList.contains("grid-sortable") && (o = e), o && Array.from(o.children).forEach((h, d) => {
            h.nodeType === 1 && h.tagName !== "STYLE" && h.tagName !== "SCRIPT" && h.setAttribute("data-index", d);
          }), e.querySelectorAll(".edit").forEach((h, d) => {
            const u = `content-${Date.now()}-${i}-${d}`;
            h.setAttribute("data-edit-id", u);
          }), e.hasAttribute("data-cb-original-content") || e.setAttribute("data-cb-original-content", e.innerHTML);
          const c = r.mount(e, a);
          this.components.set(e, c), this.setupInlineEditing(e, a), e.setAttribute("data-cb-loaded", "true"), typeof e.mount == "function" && e.mount();
        } catch (a) {
          console.error(`[PluginManager] Failed to mount component "${s}":`, a);
        }
    }), this.components.size;
  }
  /**
   * Parse component options from data attributes
   */
  parseOptions(t) {
    const e = {};
    return Array.from(t.attributes).forEach((i) => {
      if (i.name.startsWith("data-cb-")) {
        const s = i.name.replace("data-cb-", "").replace(/-([a-z])/g, (r, a) => a.toUpperCase());
        e[s] = this.parseValue(i.value);
      }
    }), e;
  }
  /**
   * Parse string value to appropriate type
   */
  parseValue(t) {
    if (t === "true") return !0;
    if (t === "false") return !1;
    if (!isNaN(t) && t !== "") return Number(t);
    try {
      return JSON.parse(t);
    } catch {
      return t;
    }
  }
  /**
   * Setup inline editing for elements with .edit[data-edit-id]
   * Automatically enables contenteditable and syncs changes to data-cb-original-content
   * @param {HTMLElement} element - Plugin element
   * @param {Object} options - Plugin options
   */
  setupInlineEditing(t, e) {
    if (!t.closest(".data-editor")) return;
    const i = t.querySelectorAll(".edit[data-edit-id]");
    if (i.length === 0)
      return;
    t.querySelectorAll('.edit[contenteditable="true"]').forEach((a) => {
      a.removeAttribute("contenteditable"), a._cbObserver && (a._cbObserver.disconnect(), delete a._cbObserver), a._cbKeydownHandler && (a.removeEventListener("keydown", a._cbKeydownHandler), delete a._cbKeydownHandler);
    });
    const r = (a, o) => {
      const l = t.getAttribute("data-cb-original-content");
      if (!l) return;
      const c = document.createElement("template");
      c.innerHTML = l.trim();
      const d = c.content.querySelector(`[data-edit-id="${a}"]`);
      if (d) {
        d.innerHTML = o;
        const u = c.innerHTML;
        t.setAttribute("data-cb-original-content", u);
      }
    };
    i.forEach((a) => {
      a.setAttribute("contenteditable", "true");
      const o = (h) => {
        var d = document.createRange();
        d.selectNodeContents(h);
        var u = window.getSelection();
        u.removeAllRanges(), u.addRange(d);
      }, l = (h) => {
        if ((h.ctrlKey || h.metaKey) && h.which === 65) {
          let d;
          try {
            window.getSelection ? d = window.getSelection().getRangeAt(0).commonAncestorContainer.parentNode : document.selection && (d = document.selection.createRange().parentElement()), o(d), h.preventDefault(), h.stopImmediatePropagation();
          } catch {
          }
        }
      };
      a.addEventListener("keydown", l), a._cbKeydownHandler = l;
      const c = new MutationObserver(() => {
        const h = a.getAttribute("data-edit-id"), d = a.innerHTML;
        r(h, d);
      });
      c.observe(a, {
        childList: !0,
        // Child elements added/removed
        characterData: !0,
        // Text content changes
        subtree: !0,
        // Watch all descendants
        attributes: !0
        // Attribute changes
        // attributeFilter: ['style'] // Specifically watch style (color picker)
      }), a._cbObserver = c;
    });
  }
  /**
   * Manually load a plugin (if not auto-loaded)
   */
  async use(t) {
    return await this.loadPlugin(t);
  }
  /**
   * Get a loaded plugin by name
   */
  getPlugin(t) {
    return this.plugins.get(t);
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
  hasPlugin(t) {
    return this.plugins.has(t);
  }
  /**
   * Get component instance for an element
   */
  getComponent(t) {
    return this.components.get(t);
  }
  /**
   * Unmount a single component and remove it from the map
   * Runs the plugin's unmount (cleanup, e.g. removing a popover). Call this before
   * removing the element from the DOM — reinitialize() only unmounts elements still
   * inside the container.
   * @param {HTMLElement} element - The element to unmount
   * @returns {boolean} True if a component was unmounted
   */
  unmountComponent(t) {
    if (!t || !this.components.has(t)) return !1;
    const e = this.components.get(t), i = t.dataset.cbType, s = this.plugins.get(i);
    if (s && typeof s.unmount == "function")
      try {
        s.unmount(t, e);
      } catch {
      }
    return this.components.delete(t), !0;
  }
  /**
   * Reinitialize components in a specific container
   * Useful when content is dynamically updated
   * @param {HTMLElement} container - Container element (defaults to document)
   */
  async reinitialize(t = document) {
    if (this.reinitializeInProgress)
      return clearTimeout(this.pendingReinitialize), new Promise((e) => {
        this.pendingReinitialize = setTimeout(async () => {
          this.pendingReinitialize = null;
          const i = await this.reinitialize(t);
          e(i);
        }, 100);
      });
    this.reinitializeInProgress = !0;
    try {
      const e = [];
      this.components.forEach((o, l) => {
        (t === document || t.contains(l)) && e.push({ element: l, instance: o });
      }), e.forEach(({ element: o, instance: l }) => {
        const c = o.dataset.cbType, h = this.plugins.get(c);
        h && typeof h.unmount == "function" && h.unmount(o, l), this.components.delete(o);
      });
      const s = this.detectComponentTypesInContainer(t).filter(
        (o) => this.config.plugins[o] && !this.plugins.has(o)
      );
      s.length > 0 && await Promise.all(
        s.map((o) => this.loadPlugin(o))
      );
      const r = t.querySelectorAll("[data-cb-type]");
      let a = 0;
      for (const o of r) {
        const l = o.dataset.cbType, c = this.plugins.get(l);
        if (c && typeof c.mount == "function")
          try {
            const h = this.parseOptions(o);
            let d = o.querySelector(".grid-sortable");
            if (d || o.classList.contains("grid-sortable") && (d = o), d && Array.from(d.children).forEach((p, f) => {
              p.nodeType === 1 && p.tagName !== "STYLE" && p.tagName !== "SCRIPT" && p.setAttribute("data-index", f);
            }), o.querySelectorAll(".edit").forEach((p, f) => {
              const m = `content-${Date.now()}-${a}-${f}`;
              p.setAttribute("data-edit-id", m);
            }), !o.hasAttribute("data-cb-original-content"))
              o.setAttribute("data-cb-original-content", o.innerHTML);
            else {
              let p = document.createRange();
              o.innerHTML = "", o.appendChild(p.createContextualFragment(o.getAttribute("data-cb-original-content")));
              let f = !1;
              o.querySelectorAll(".edit:not([data-edit-id])").forEach((m, y) => {
                m.setAttribute("data-edit-id", `content-${Date.now()}-${a}-new-${y}`), f = !0;
              }), f && o.setAttribute("data-cb-original-content", o.innerHTML);
            }
            const g = await c.mount(o, h);
            this.components.set(o, g), this.setupInlineEditing(o, h), o.setAttribute("data-cb-loaded", "true"), typeof o.mount == "function" && o.mount(), a++;
          } catch (h) {
            console.error(`[PluginManager] Failed to mount component "${l}":`, h);
          }
      }
      return typeof this.config.onReInit == "function" && this.config.onReInit(), this.emit("reinitialized", { container: t, count: a }), a;
    } finally {
      this.reinitializeInProgress = !1;
    }
  }
  /**
   * Detect component types within a specific container
   * @param {HTMLElement} container
   */
  detectComponentTypesInContainer(t) {
    const e = /* @__PURE__ */ new Set();
    return t.querySelectorAll("[data-cb-type]").forEach((s) => {
      e.add(s.dataset.cbType);
    }), Array.from(e);
  }
  /**
   * Register and load plugin from external URL
   * @param {string} pluginId - Unique identifier for the plugin
   * @param {object} config - Plugin configuration
   * @param {string} config.url - JavaScript module URL
   * @param {string} config.css - CSS file URL (optional)
   */
  async loadExternalPlugin(t, e) {
    if (!t || typeof t != "string")
      throw new Error("Plugin ID is required and must be a string");
    if (!e.url)
      throw new Error("Plugin URL is required");
    if (this.plugins.has(t))
      return console.warn(`[PluginManager] Plugin "${t}" is already loaded`), this.plugins.get(t);
    const i = this.validatePluginSource(e.url);
    if (!i.allowed)
      throw new Error(`Security: ${i.reason}`);
    i.warning && (console.warn(`[PluginManager] ${i.warning}`), this.emit("plugin-security-warning", {
      pluginId: t,
      url: e.url,
      warning: i.warning
    }));
    try {
      this.config.plugins[t] = {
        url: e.url,
        css: e.css || null,
        source: "external",
        loadedAt: (/* @__PURE__ */ new Date()).toISOString()
      }, this.externalPlugins.set(t, this.config.plugins[t]);
      const s = await this.loadPlugin(t);
      return this.emit("external-plugin-loaded", {
        pluginId: t,
        url: e.url
      }), s;
    } catch (s) {
      throw delete this.config.plugins[t], this.externalPlugins.delete(t), console.error(`[PluginManager] Failed to load external plugin "${t}":`, s), s;
    }
  }
  /**
   * Validate plugin source URL
   * @param {string} url - Plugin URL to validate
   * @returns {object} Validation result
   */
  validatePluginSource(t) {
    const e = t.includes("localhost") || t.includes("127.0.0.1");
    if (!t.startsWith("https://") && !e)
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
      const s = new URL(t).hostname;
      if (!this.config.trustedDomains.some((a) => {
        if (a.startsWith("*.")) {
          const o = a.slice(2);
          return s === o || s.endsWith("." + o);
        }
        return s === a;
      }))
        return {
          allowed: !0,
          warning: `Loading plugin from external domain: ${s}. Only add plugins from sources you trust.`
        };
    } else
      return {
        allowed: !0,
        warning: `Loading external plugin from: ${new URL(t).hostname}. This plugin will have full access to your page.`
      };
    return { allowed: !0 };
  }
  /**
   * Batch load external plugins
   * Useful for loading user's saved plugins on page init
   * @param {object} pluginsConfig - Object with pluginId as key and config as value
   */
  async loadExternalPlugins(t) {
    const e = [];
    for (const [i, s] of Object.entries(t))
      try {
        const r = await this.loadExternalPlugin(i, s);
        e.push({ pluginId: i, success: !0, plugin: r });
      } catch (r) {
        e.push({ pluginId: i, success: !1, error: r.message }), console.error(`[PluginManager] Failed to load external plugin "${i}":`, r);
      }
    return e;
  }
  /**
   * Remove/unregister an external plugin
   * @param {string} pluginId - Plugin to remove
   */
  unregisterPlugin(t) {
    if (!this.externalPlugins.has(t))
      return console.warn(`[PluginManager] Plugin "${t}" is not an external plugin`), !1;
    const e = this.plugins.get(t), i = [];
    return this.components.forEach((s, r) => {
      r.dataset.cbType === t && i.push({ element: r, instance: s });
    }), i.forEach(({ element: s, instance: r }) => {
      e && typeof e.unmount == "function" && e.unmount(s, r), this.components.delete(s);
    }), e && typeof e.destroy == "function" && e.destroy(this), this.plugins.delete(t), this.externalPlugins.delete(t), delete this.config.plugins[t], this.emit("plugin-unregistered", { pluginId: t }), !0;
  }
  /**
   * Get list of all external (user-added) plugins
   */
  getExternalPlugins() {
    return Array.from(this.externalPlugins.entries()).map(([t, e]) => ({
      id: t,
      ...e
    }));
  }
  /**
   * Check if a plugin is external (user-added)
   */
  isExternalPlugin(t) {
    return this.externalPlugins.has(t);
  }
  /**
   * Destroy all components and plugins
   */
  destroy() {
    this.components.forEach((t, e) => {
      const i = e.dataset.cbType, s = this.plugins.get(i);
      s && typeof s.unmount == "function" && s.unmount(e, t);
    }), this.components.forEach((t, e) => {
      e.querySelectorAll('.edit[contenteditable="true"]').forEach((s) => {
        s.removeAttribute("contenteditable"), s._cbObserver && (s._cbObserver.disconnect(), delete s._cbObserver), s._cbKeydownHandler && (s.removeEventListener("keydown", s._cbKeydownHandler), delete s._cbKeydownHandler);
      });
    }), this.plugins.forEach((t, e) => {
      typeof t.destroy == "function" && t.destroy(this);
    }), this.components.clear(), this.plugins.clear();
  }
  /**
   * Event emitter (delegate to runtime if available)
   */
  emit(t, e) {
    if (this.runtime && typeof this.runtime.emit == "function")
      this.runtime.emit(t, e);
    else {
      const i = new CustomEvent(`contentbox:${t}`, { detail: e });
      document.dispatchEvent(i);
    }
  }
  /**
   * Set runtime reference (for event delegation)
   */
  setRuntime(t) {
    this.runtime = t;
  }
}
class Gi {
  constructor(t = {}) {
    const e = {
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
    this.settings = { ...e, ...t }, this.initialized = !1, this.pluginManager = new $i({
      plugins: this.settings.plugins,
      autoLoad: this.settings.autoLoadPlugins,
      pluginBaseUrl: this.settings.pluginBaseUrl,
      allowExternalPlugins: this.settings.allowExternalPlugins,
      trustedDomains: this.settings.trustedDomains,
      onReInit: () => {
        this.functionLightboxInit();
      }
    }), this.pluginManager.setRuntime(this), window.pageReRender = () => {
      this.pageReRender();
    };
  }
  /**
   * Plugin management delegation methods
   */
  /**
   * Manually load a plugin
   */
  async use(t) {
    return await this.pluginManager.use(t);
  }
  /**
   * Get a loaded plugin
   */
  getPlugin(t) {
    return this.pluginManager.getPlugin(t);
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
  hasPlugin(t) {
    return this.pluginManager.hasPlugin(t);
  }
  /**
   * Get component instance for an element
   */
  getComponent(t) {
    return this.pluginManager.getComponent(t);
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
  unmountComponent(t) {
    return this.pluginManager.unmountComponent(t);
  }
  /**
   * Reinitialize components (after content update)
   * @param {HTMLElement} container - Container to reinitialize (optional, defaults to document)
   */
  async reinitialize(t) {
    return await this.pluginManager.reinitialize(t);
  }
  /**
   * Register and load plugin from external URL
   */
  async loadExternalPlugin(t, e) {
    return await this.pluginManager.loadExternalPlugin(t, e);
  }
  /**
   * Batch load external plugins
   */
  async loadExternalPlugins(t) {
    return await this.pluginManager.loadExternalPlugins(t);
  }
  /**
   * Remove/unregister an external plugin
   */
  unregisterPlugin(t) {
    return this.pluginManager.unregisterPlugin(t);
  }
  /**
   * Simple event emitter
   */
  emit(t, e) {
    const i = new CustomEvent(`contentbox:${t}`, { detail: e });
    document.dispatchEvent(i);
  }
  /**
   * Listen to events
   */
  on(t, e) {
    document.addEventListener(`contentbox:${t}`, e);
  }
  /**
   * Remove event listener
   */
  off(t, e) {
    document.removeEventListener(`contentbox:${t}`, e);
  }
  async init() {
    this.initialized || (this.initCore(), this.initPlugins(), this.initialized = !0, this.emit("init"));
  }
  async initPlugins() {
    this.settings.autoLoadPlugins && await this.pluginManager.autoLoadPlugins(), this.pluginManager.initializeComponents();
  }
  initCore() {
    this.prepareContent(), this.updateOnResize(), this.blockInit(), this.initeSkrollrr(), this.settings.effects && (this.effects = new Si({
      editorPreview: this.settings.editorPreview
      // added
    }), this.effects.init(), window.fx = this.effects), this.contentBoxOnRenderUpdate(), this.functionLightboxInit(), this.inViewSetup(), this.settings.smoothScroll && new Fi();
  }
  prepareContent() {
    const t = document.querySelector(".is-wrapper");
    t.classList.add("box-v2");
    const e = function(a) {
      let o = a.nextElementSibling;
      return o ? o.classList.contains("is-section") ? o : e(o) : !1;
    };
    document.querySelectorAll(".is-arrow-down a").forEach((a) => {
      a.addEventListener("click", (o) => {
        let l = o.target.closest(".is-section");
        if (l) {
          let c = e(l);
          c && this.scrollIt(c, 1e3, "easeInQuad");
        }
        o.preventDefault(), o.stopImmediatePropagation();
      });
    }), t && (t.classList.contains("is-edit") || t.querySelectorAll("a").forEach((o) => {
      o.addEventListener("click", (l) => {
        let c = o.getAttribute("href");
        if (c && c.indexOf("#") === 0)
          if (c.indexOf("#section") === 0) {
            let h = c.replace("#section", "");
            if (!isNaN(parseInt(h))) {
              let d = document.querySelectorAll(".is-section"), u, g = 0;
              d.forEach(function(p) {
                p.classList.contains("is-section-navbar") || (g === h - 1 && (u = p), g++);
              }), u && this.scrollIt(u, 1e3, "easeInQuad"), l.preventDefault();
            }
          } else
            try {
              let h = document.querySelector(c);
              h && (this.scrollIt(h, 1e3, "easeInQuad"), l.preventDefault());
            } catch {
            }
      });
    })), document.querySelectorAll(".section-inview").forEach(function(a) {
      a.classList.remove("section-inview");
    });
    let r = document.querySelectorAll(".is-animated,.is-scale-animated");
    r.forEach(function(a) {
      a.classList.contains("once") ? (a.removeAttribute("data-scroll", ""), a.setAttribute("data-scroll-once", "")) : (a.removeAttribute("data-scroll-once", ""), a.setAttribute("data-scroll", ""));
    }), r = document.querySelectorAll(".is-container > div"), r.forEach(function(a) {
      let o = a.querySelectorAll(".is-animated[data-scroll],.is-animated[data-scroll-once]"), l = 0;
      o.length > 1 && o.forEach(function(c) {
        c.className.indexOf("delay-") === -1 && (l > 0 && (c.style.transitionDelay = l + "s", c.style.animationDelay = l + "s"), l = l + 0.2);
      });
    }), this.skrollrSetup(), this.adjustBgPos();
  }
  updateOnResize() {
    function t(i) {
      var s;
      return function(r) {
        s && clearTimeout(s), s = setTimeout(i, 100, r);
      };
    }
    const e = document.querySelector(".is-wrapper");
    window.addEventListener("resize", t((i) => {
      document.body.classList.contains("data-editor") && (e.querySelector(".pin-wrap") && !window.noRender ? this.pageReRender() : window.skrollrr && window.skrollrr.refresh(), window.noRender = !1, this.adjustBgPos());
    })), e.classList.contains("is-edit") && (window.onbeforeunload = function(i) {
      localStorage.setItem("_lastscrollpos", document.documentElement.scrollTop), window.scrollTo(0, 0);
    }, setTimeout(() => {
      localStorage.getItem("_lastscrollpos") && window.scrollTo(0, localStorage.getItem("_lastscrollpos"));
    }, 300));
  }
  // Must be used after the Kinetra scroll-animation engine is loaded
  initeSkrollrr() {
    var t = document.querySelectorAll(".is-overlay-bg");
    t.forEach((i) => {
      i.style && i.style.filter && i.style.filter.indexOf("grayscale") !== -1 && (i.parentNode.style.filter = "grayscale(1)");
    });
    const e = new Vt({
      smoothing: this.settings.animationSmoothing,
      legacyTransition: this.settings.animationTransition
    });
    e.init(), window.skrollrr = e;
  }
  _scrollTo(t, e = 0) {
    const i = t.getBoundingClientRect().top + window.pageYOffset + e;
    window.scrollTo({ top: i, behavior: "smooth" });
  }
  scrollIt(t, e = 200, i = "linear", s) {
    this._scrollTo(t);
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
    let r;
    s ? r = document.querySelectorAll(".is-wrapper .section-pin") : r = document.querySelectorAll(".is-wrapper:not(.is-edit) .section-pin"), r.forEach(function(o) {
      i <= 970 && o.querySelector(".is-box") && (o.querySelectorAll(".is-box").forEach((c) => {
        const h = o.cloneNode(!1);
        c.getAttributeNames().map((d) => {
          d.indexOf("data-") !== -1 && h.setAttribute(d, c.getAttribute(d));
        }), h.classList.add("is-box"), c.classList.forEach((d) => {
          (d.indexOf("is-box-") !== -1 || d.indexOf("is-content-") !== -1 || d.indexOf("box-autofit") !== -1 || d.indexOf("is-light-text") !== -1 || d.indexOf("is-dark-text") !== -1 || d.indexOf("is-align-") !== -1 || d.indexOf("type-") !== -1 || d.indexOf("block-click") !== -1 || d.indexOf("hover-zoom") !== -1) && h.classList.add(d);
        }), h.setAttribute("data-section-clone", ""), h.innerHTML = c.innerHTML, o.parentNode.insertBefore(h, o);
      }), o.setAttribute("data-section-original", ""), o.style.display = "none");
    }), s ? r = document.querySelectorAll(".is-wrapper .section-pin") : r = document.querySelectorAll(".is-wrapper:not(.is-edit) .section-pin"), r.forEach(function(o) {
      if (o.parentNode.closest(".section-wrap") || i <= 970 && o.hasAttribute("data-section-original")) return;
      const l = document.createElement("div");
      l.classList.add("pin-wrap"), o.classList.contains("m-skrollrr-off") && l.classList.add("m-skrollrr-off"), o.classList.contains("pin-space-lg") && l.classList.add("pin-space-lg"), o.classList.contains("pin-space-xl") && l.classList.add("pin-space-xl"), o.classList.contains("xs-hidden") && l.classList.add("xs-hidden"), o.classList.contains("sm-hidden") && l.classList.add("sm-hidden"), o.classList.contains("desktop-hidden") && l.classList.add("desktop-hidden"), o.after(l), l.appendChild(o);
    });
    const a = (o) => {
      document.querySelectorAll(".is-section").forEach((c) => {
        const h = c.getBoundingClientRect().top;
        let d, u;
        c.parentNode.classList.contains("pin-wrap") ? (d = c.parentNode.nextElementSibling, u = c.parentNode.previousElementSibling) : (d = c.nextElementSibling, u = c.previousElementSibling), d && d.classList.contains("pin-wrap") && (d = d.querySelector(".is-section")), u && u.classList.contains("pin-wrap") && (u = u.querySelector(".is-section")), h <= 0 && ((c.classList.contains("no-spacing") || c.classList.contains("pin-overlap")) && c.classList.add("section-inview"), document.querySelectorAll(".is-section").forEach((p) => {
          p !== c && p.classList.remove("section-inview");
        }));
      });
    };
    setTimeout(() => {
      (!document.querySelector(".is-wrapper").classList.contains("is-edit") || s) && !window.funcScroll && (window.addEventListener("scroll", a), window.funcScroll = !0);
    }, 300);
  }
  adjustBgPos() {
    const t = (r) => {
      const a = document.createElement("div");
      a.style.backgroundPositionX = r.style.backgroundPositionX, a.style.backgroundPositionY = r.style.backgroundPositionY, a.style.backgroundSize = r.style.backgroundSize, r.hasAttribute("data-bg-ori") || r.setAttribute("data-bg-ori", a.style.cssText);
    }, e = (r) => {
      if (r.hasAttribute("data-bg-ori")) {
        const a = document.createElement("div");
        a.style.cssText = r.getAttribute("data-bg-ori"), r.style.backgroundPositionX = a.style.backgroundPositionX, r.style.backgroundPositionY = a.style.backgroundPositionY, r.style.backgroundSize = a.style.backgroundSize, r.removeAttribute("data-bg-ori");
      }
    };
    let i = window.innerWidth;
    document.querySelectorAll("[data-bg-xs],[data-bg-sm],[data-bg-md],[data-bg-lg]").forEach((r) => {
      t(r), i <= 760 && (r.hasAttribute("data-bg-xs") ? r.style.cssText = r.style.cssText + ";" + r.getAttribute("data-bg-xs") : e(r)), i > 760 && i <= 970 && (r.hasAttribute("data-bg-sm") ? r.style.cssText = r.style.cssText + ";" + r.getAttribute("data-bg-sm") : e(r)), i > 970 && i <= 1280 && (r.hasAttribute("data-bg-md") ? r.style.cssText = r.style.cssText + ";" + r.getAttribute("data-bg-md") : e(r)), i > 1280 && (r.hasAttribute("data-bg-lg") ? r.style.cssText = r.style.cssText + ";" + r.getAttribute("data-bg-lg") : e(r));
    });
  }
  inViewSetup() {
    document.querySelectorAll(".is-overlay-content").forEach((r) => {
      (r.querySelector("video.is-video-bg") || r.querySelector('[data-cb-type="video-background"]')) && r.setAttribute("data-scroll", "");
    }), document.querySelectorAll(".is-container video").forEach((r) => {
      r.parentNode.setAttribute("data-scroll", "");
    });
    const i = (r) => {
      const a = r.play();
      a && a.catch(() => {
        r.muted || (r.muted = !0, r.play().catch(() => {
        }));
      });
    }, s = new $e({
      trigger: {
        once: !0,
        offset: {
          element: {
            x: 0,
            y: (r, a, o) => 0.1
          },
          viewport: {
            x: 0,
            y: (r, a, o) => r.visible ? 0 : 0.1
          }
        },
        toggle: {
          class: {
            in: "is-inview",
            out: [""]
          },
          callback: {
            in: (r) => {
              r.element.querySelectorAll("video").forEach((o) => {
                if (o.innerHTML.trim() === "") return;
                let l = o.parentNode.querySelector(".video-bg-play");
                o.autoplay ? l ? l.innerHTML.indexOf("play") === -1 && i(o) : i(o) : l && l.innerHTML.indexOf("play") === -1 && i(o);
              });
            },
            out: (r) => {
              r.element.querySelectorAll("video").forEach((o) => {
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
        let t;
        window.contentbox ? t = window.contentbox.onRender : parent.contentbox && (t = parent.contentbox.onRender);
        const e = () => {
          t.call(this);
          try {
            window.trigger && window.trigger.kill();
          } catch {
          }
          let i = document.querySelectorAll(".is-animated,.is-scale-animated");
          i.forEach(function(s) {
            s.classList.contains("once") ? (s.removeAttribute("data-scroll", ""), s.setAttribute("data-scroll-once", "")) : (s.removeAttribute("data-scroll-once", ""), s.setAttribute("data-scroll", ""));
          }), i = document.querySelectorAll(".is-container > div"), i.forEach(function(s) {
            let r = s.querySelectorAll(".is-animated[data-scroll],.is-animated[data-scroll-once]"), a = 0;
            r.length > 1 && r.forEach(function(o) {
              o.className.indexOf("delay-") === -1 && (a > 0 && (o.style.transitionDelay = a + "s", o.style.animationDelay = a + "s"), a = a + 0.2);
            });
          }), setTimeout(() => {
            this.inViewSetup();
          }, 100);
        };
        window.contentbox ? window.contentbox.onRender = e : parent.contentbox && (parent.contentbox.onRender = e);
      }
    } catch {
    }
  }
  // Lightbox
  functionLightboxInit() {
    const t = {
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
    this.refreshLightbox(t), document.querySelectorAll(".is-lightbox,.block-click").forEach((i) => {
      const s = (r) => {
        if (i.closest('[contenteditable="true"]'))
          return r.preventDefault(), !1;
        {
          let a = i.getAttribute("href") || i.getAttribute("data-modal-url");
          this.openLightbox(a, i, t), r.preventDefault(), r.stopImmediatePropagation();
        }
      };
      i.addEventListener("click", s), i._lightboxHandler = s;
    });
  }
  refreshLightbox(t) {
    this.glightbox && this.glightbox.destroy(), this.glightbox = new ve(t), window.GLightbox = ve.default;
  }
  openLightbox(t, e, i) {
    let s = [], r = 0;
    if (e) {
      const o = e.closest("[data-gallery]");
      let l = [];
      o ? l = o.querySelectorAll(".is-lightbox") : document.querySelectorAll(".is-lightbox,.block-click").forEach((h) => {
        h.closest("[data-gallery]") || l.push(h);
      }), l.forEach((c, h) => {
        let d = c.getAttribute("href");
        d || (d = c.getAttribute("data-modal-url")), s.push({
          href: d
        }), t === d && (r = h);
      });
    }
    const a = document.activeElement;
    a?.blur(), s.length > 0 ? (this.glightbox.setElements(s), this.glightbox.openAt(r)) : (this.glightbox.setElements([
      {
        href: t
      }
    ]), this.glightbox.open()), this.glightbox.on("close", () => {
      this.refreshLightbox(i), a?.focus();
    });
  }
  // box-canvas
  blockInit() {
    const t = {
      start: () => {
        document.querySelectorAll(".is-block").forEach((s) => {
          s.hasAttribute("data--t") || s.setAttribute("data--t", s.style.top), s.hasAttribute("data--l") || s.setAttribute("data--l", s.style.left), s.hasAttribute("data--b") || s.setAttribute("data--b", s.style.bottom), s.hasAttribute("data--r") || s.setAttribute("data--r", s.style.right), s.hasAttribute("data--w") || s.setAttribute("data--w", s.style.width), s.hasAttribute("data--h") || s.setAttribute("data--h", s.style.height), s.removeAttribute("data-prev"), s.removeAttribute("data-fluid"), s.removeAttribute("data-fluid-val"), s.classList.remove("fluid"), s.style.transition = "";
        });
      },
      apply: (s, r, a) => {
        if (r && s.getAttribute("data-prev") !== r + "") {
          if (a || (s.style.transition = "all 0.35s ease"), r !== 1e4) {
            if (s.setAttribute("data-breakpoint", r), s.hasAttribute("data--t-" + r)) {
              let o = s.getAttribute("data--t-" + r);
              s.style.top = o;
            }
            if (s.hasAttribute("data--l-" + r)) {
              let o = s.getAttribute("data--l-" + r);
              s.style.left = o;
            }
            if (s.hasAttribute("data--b-" + r)) {
              let o = s.getAttribute("data--b-" + r);
              s.style.bottom = o;
            }
            if (s.hasAttribute("data--r-" + r)) {
              let o = s.getAttribute("data--r-" + r);
              s.style.right = o;
            }
            if (s.hasAttribute("data--w-" + r)) {
              let o = s.getAttribute("data--w-" + r);
              s.style.width = o;
            }
            if (s.hasAttribute("data--h-" + r)) {
              let o = s.getAttribute("data--h-" + r);
              s.style.height = o;
            }
            if (s.hasAttribute("data--transform-" + r)) {
              let o = s.getAttribute("data--transform-" + r);
              s.style.transform = o, s.setAttribute("data--transform-val", r);
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
          s.setAttribute("data-prev", r), setTimeout(() => {
            a || (s.style.transition = "");
          }, 400);
        }
      },
      applyFluid: (s, r) => {
        s.classList.toggle("fluid", r === "yes"), s.setAttribute("data-fluid", r);
      },
      resize: (s) => {
        const r = window.innerWidth;
        document.querySelectorAll(".is-box").forEach((a) => {
          let o = [];
          const l = a.attributes;
          for (let c = 0; c < l.length; c++) {
            let d = l[c].name.match(/^data--h-(\d+)$/);
            if (d) {
              const u = parseInt(d[1], 10);
              o.push(u);
            }
          }
          o = [...new Set(o)], o.sort((c, h) => h - c);
          for (let c = 0; c < o.length; c++) {
            const h = o[c];
            if (c === 0) {
              if (r > h) {
                let d = a.getAttribute("data--h");
                d ? a.style.height = d : a.style.height = "";
              }
            } else {
              const d = o[c - 1];
              if (d >= r && r > h) {
                let u = a.getAttribute("data--h-" + d);
                u && (a.style.height = u);
              }
            }
          }
          if (o.length > 0 && o[o.length - 1] >= r) {
            const h = o[o.length - 1];
            let d = a.getAttribute("data--h-" + h);
            d && (a.style.height = d);
          }
        }), document.querySelectorAll(".is-block").forEach((a) => {
          if (!a.classList.contains("locked")) {
            a.offsetWidth + 0 > r && !a.classList.contains("fluid") && (a.setAttribute("data-fluid-val", a.offsetWidth), t.applyFluid(a, "yes"));
            let c = a.getAttribute("data-fluid-val");
            c && parseInt(c) + 0 <= r && a.classList.contains("fluid") && t.applyFluid(a, "no");
          }
          let o = [];
          const l = a.attributes;
          for (let c = 0; c < l.length; c++) {
            const h = l[c].name;
            let d = h.match(/^data--t-(\d+)$/);
            if (d) {
              const u = parseInt(d[1], 10);
              o.push(u);
            }
            if (d = h.match(/^data--w-(\d+)$/), d) {
              const u = parseInt(d[1], 10);
              o.push(u);
            }
            if (d = h.match(/^data--transform-(\d+)$/), d) {
              const u = parseInt(d[1], 10);
              o.push(u);
            }
          }
          o = [...new Set(o)], o.sort((c, h) => h - c);
          for (let c = 0; c < o.length; c++) {
            const h = o[c];
            if (c === 0)
              r > h && t.apply(a, 1e4, s);
            else {
              const d = o[c - 1];
              d >= r && r > h && t.apply(a, d, s);
            }
          }
          if (o.length > 0) {
            const c = o[o.length - 1];
            c >= r && t.apply(a, c, s);
          }
        });
      },
      render: () => {
        t.start(), t.resize(!0);
      }
    }, i = ((s, r) => {
      let a;
      return (...o) => {
        clearTimeout(a), a = setTimeout(() => s(...o), r);
      };
    })(() => {
      t.resize();
    }, 0);
    window.addEventListener("resize", i), t.start(), t.resize(!0), this.Block = t;
  }
  pageReRender() {
    this.prepareContent(), this.contentBoxOnRenderUpdate(), window.skrollrr ? (window.skrollrr.refresh(), this.effects && this.effects.refresh()) : this.initeSkrollrr(), this.functionLightboxInit(), this.inViewSetup(), this.Block.start(), this.Block.resize();
  }
  destroy() {
    this.glightbox && (this.glightbox.destroy(), this.glightbox = null), document.querySelectorAll(".is-lightbox,.block-click").forEach((e) => {
      e._lightboxHandler && (e.removeEventListener("click", e._lightboxHandler), delete e._lightboxHandler);
    }), this.pluginManager.destroy(), this.initialized = !1, this.emit("destroy");
  }
}
export {
  Gi as default
};
