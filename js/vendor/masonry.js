/*!
 * Isotope PACKAGED v2.2.0
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * http://isotope.metafizzy.co
 * Copyright 2015 Metafizzy
 */
(function (t) {
  function e() {}
  function i(t) {
    function i(e) {
      e.prototype.option ||
        (e.prototype.option = function (e) {
          t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e));
        });
    }
    function n(e, i) {
      t.fn[e] = function (n) {
        if ("string" == typeof n) {
          for (
            var s = o.call(arguments, 1), a = 0, u = this.length;
            u > a;
            a++
          ) {
            var p = this[a],
              h = t.data(p, e);
            if (h)
              if (t.isFunction(h[n]) && "_" !== n.charAt(0)) {
                var f = h[n].apply(h, s);
                if (void 0 !== f) return f;
              } else r("no such method '" + n + "' for " + e + " instance");
            else
              r(
                "cannot call methods on " +
                  e +
                  " prior to initialization; " +
                  "attempted to call '" +
                  n +
                  "'"
              );
          }
          return this;
        }
        return this.each(function () {
          var o = t.data(this, e);
          o
            ? (o.option(n), o._init())
            : ((o = new i(this, n)), t.data(this, e, o));
        });
      };
    }
    if (t) {
      var r =
        "undefined" == typeof console
          ? e
          : function (t) {
              console.error(t);
            };
      return (
        (t.bridget = function (t, e) {
          i(e), n(t, e);
        }),
        t.bridget
      );
    }
  }
  var o = Array.prototype.slice;
  "function" == typeof define && define.amd
    ? define("jquery-bridget/jquery.bridget", ["jquery"], i)
    : "object" == typeof exports
    ? i(require("jquery"))
    : i(t.jQuery);
})(window),
  (function (t) {
    function e(e) {
      var i = t.event;
      return (i.target = i.target || i.srcElement || e), i;
    }
    var i = document.documentElement,
      o = function () {};
    i.addEventListener
      ? (o = function (t, e, i) {
          t.addEventListener(e, i, !1);
        })
      : i.attachEvent &&
        (o = function (t, i, o) {
          (t[i + o] = o.handleEvent
            ? function () {
                var i = e(t);
                o.handleEvent.call(o, i);
              }
            : function () {
                var i = e(t);
                o.call(t, i);
              }),
            t.attachEvent("on" + i, t[i + o]);
        });
    var n = function () {};
    i.removeEventListener
      ? (n = function (t, e, i) {
          t.removeEventListener(e, i, !1);
        })
      : i.detachEvent &&
        (n = function (t, e, i) {
          t.detachEvent("on" + e, t[e + i]);
          try {
            delete t[e + i];
          } catch (o) {
            t[e + i] = void 0;
          }
        });
    var r = { bind: o, unbind: n };
    "function" == typeof define && define.amd
      ? define("eventie/eventie", r)
      : "object" == typeof exports
      ? (module.exports = r)
      : (t.eventie = r);
  })(window),
  function () {
    function t() {}
    function e(t, e) {
      for (var i = t.length; i--; ) if (t[i].listener === e) return i;
      return -1;
    }
    function i(t) {
      return function () {
        return this[t].apply(this, arguments);
      };
    }
    var o = t.prototype,
      n = this,
      r = n.EventEmitter;
    (o.getListeners = function (t) {
      var e,
        i,
        o = this._getEvents();
      if (t instanceof RegExp) {
        e = {};
        for (i in o) o.hasOwnProperty(i) && t.test(i) && (e[i] = o[i]);
      } else e = o[t] || (o[t] = []);
      return e;
    }),
      (o.flattenListeners = function (t) {
        var e,
          i = [];
        for (e = 0; t.length > e; e += 1) i.push(t[e].listener);
        return i;
      }),
      (o.getListenersAsObject = function (t) {
        var e,
          i = this.getListeners(t);
        return i instanceof Array && ((e = {}), (e[t] = i)), e || i;
      }),
      (o.addListener = function (t, i) {
        var o,
          n = this.getListenersAsObject(t),
          r = "object" == typeof i;
        for (o in n)
          n.hasOwnProperty(o) &&
            -1 === e(n[o], i) &&
            n[o].push(r ? i : { listener: i, once: !1 });
        return this;
      }),
      (o.on = i("addListener")),
      (o.addOnceListener = function (t, e) {
        return this.addListener(t, { listener: e, once: !0 });
      }),
      (o.once = i("addOnceListener")),
      (o.defineEvent = function (t) {
        return this.getListeners(t), this;
      }),
      (o.defineEvents = function (t) {
        for (var e = 0; t.length > e; e += 1) this.defineEvent(t[e]);
        return this;
      }),
      (o.removeListener = function (t, i) {
        var o,
          n,
          r = this.getListenersAsObject(t);
        for (n in r)
          r.hasOwnProperty(n) &&
            ((o = e(r[n], i)), -1 !== o && r[n].splice(o, 1));
        return this;
      }),
      (o.off = i("removeListener")),
      (o.addListeners = function (t, e) {
        return this.manipulateListeners(!1, t, e);
      }),
      (o.removeListeners = function (t, e) {
        return this.manipulateListeners(!0, t, e);
      }),
      (o.manipulateListeners = function (t, e, i) {
        var o,
          n,
          r = t ? this.removeListener : this.addListener,
          s = t ? this.removeListeners : this.addListeners;
        if ("object" != typeof e || e instanceof RegExp)
          for (o = i.length; o--; ) r.call(this, e, i[o]);
        else
          for (o in e)
            e.hasOwnProperty(o) &&
              (n = e[o]) &&
              ("function" == typeof n
                ? r.call(this, o, n)
                : s.call(this, o, n));
        return this;
      }),
      (o.removeEvent = function (t) {
        var e,
          i = typeof t,
          o = this._getEvents();
        if ("string" === i) delete o[t];
        else if (t instanceof RegExp)
          for (e in o) o.hasOwnProperty(e) && t.test(e) && delete o[e];
        else delete this._events;
        return this;
      }),
      (o.removeAllListeners = i("removeEvent")),
      (o.emitEvent = function (t, e) {
        var i,
          o,
          n,
          r,
          s = this.getListenersAsObject(t);
        for (n in s)
          if (s.hasOwnProperty(n))
            for (o = s[n].length; o--; )
              (i = s[n][o]),
                i.once === !0 && this.removeListener(t, i.listener),
                (r = i.listener.apply(this, e || [])),
                r === this._getOnceReturnValue() &&
                  this.removeListener(t, i.listener);
        return this;
      }),
      (o.trigger = i("emitEvent")),
      (o.emit = function (t) {
        var e = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(t, e);
      }),
      (o.setOnceReturnValue = function (t) {
        return (this._onceReturnValue = t), this;
      }),
      (o._getOnceReturnValue = function () {
        return this.hasOwnProperty("_onceReturnValue")
          ? this._onceReturnValue
          : !0;
      }),
      (o._getEvents = function () {
        return this._events || (this._events = {});
      }),
      (t.noConflict = function () {
        return (n.EventEmitter = r), t;
      }),
      "function" == typeof define && define.amd
        ? define("eventEmitter/EventEmitter", [], function () {
            return t;
          })
        : "object" == typeof module && module.exports
        ? (module.exports = t)
        : (n.EventEmitter = t);
  }.call(this),
  (function (t) {
    function e(t) {
      if (t) {
        if ("string" == typeof o[t]) return t;
        t = t.charAt(0).toUpperCase() + t.slice(1);
        for (var e, n = 0, r = i.length; r > n; n++)
          if (((e = i[n] + t), "string" == typeof o[e])) return e;
      }
    }
    var i = "Webkit Moz ms Ms O".split(" "),
      o = document.documentElement.style;
    "function" == typeof define && define.amd
      ? define("get-style-property/get-style-property", [], function () {
          return e;
        })
      : "object" == typeof exports
      ? (module.exports = e)
      : (t.getStyleProperty = e);
  })(window),
  (function (t) {
    function e(t) {
      var e = parseFloat(t),
        i = -1 === t.indexOf("%") && !isNaN(e);
      return i && e;
    }
    function i() {}
    function o() {
      for (
        var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0,
          },
          e = 0,
          i = s.length;
        i > e;
        e++
      ) {
        var o = s[e];
        t[o] = 0;
      }
      return t;
    }
    function n(i) {
      function n() {
        if (!d) {
          d = !0;
          var o = t.getComputedStyle;
          if (
            ((p = (function () {
              var t = o
                ? function (t) {
                    return o(t, null);
                  }
                : function (t) {
                    return t.currentStyle;
                  };
              return function (e) {
                var i = t(e);
                return (
                  i ||
                    r(
                      "Style returned " +
                        i +
                        ". Are you running this code in a hidden iframe on Firefox? " +
                        "See http://bit.ly/getsizebug1"
                    ),
                  i
                );
              };
            })()),
            (h = i("boxSizing")))
          ) {
            var n = document.createElement("div");
            (n.style.width = "200px"),
              (n.style.padding = "1px 2px 3px 4px"),
              (n.style.borderStyle = "solid"),
              (n.style.borderWidth = "1px 2px 3px 4px"),
              (n.style[h] = "border-box");
            var s = document.body || document.documentElement;
            s.appendChild(n);
            var a = p(n);
            (f = 200 === e(a.width)), s.removeChild(n);
          }
        }
      }
      function a(t) {
        if (
          (n(),
          "string" == typeof t && (t = document.querySelector(t)),
          t && "object" == typeof t && t.nodeType)
        ) {
          var i = p(t);
          if ("none" === i.display) return o();
          var r = {};
          (r.width = t.offsetWidth), (r.height = t.offsetHeight);
          for (
            var a = (r.isBorderBox = !(!h || !i[h] || "border-box" !== i[h])),
              d = 0,
              l = s.length;
            l > d;
            d++
          ) {
            var c = s[d],
              m = i[c];
            m = u(t, m);
            var y = parseFloat(m);
            r[c] = isNaN(y) ? 0 : y;
          }
          var g = r.paddingLeft + r.paddingRight,
            v = r.paddingTop + r.paddingBottom,
            _ = r.marginLeft + r.marginRight,
            I = r.marginTop + r.marginBottom,
            z = r.borderLeftWidth + r.borderRightWidth,
            L = r.borderTopWidth + r.borderBottomWidth,
            x = a && f,
            E = e(i.width);
          E !== !1 && (r.width = E + (x ? 0 : g + z));
          var b = e(i.height);
          return (
            b !== !1 && (r.height = b + (x ? 0 : v + L)),
            (r.innerWidth = r.width - (g + z)),
            (r.innerHeight = r.height - (v + L)),
            (r.outerWidth = r.width + _),
            (r.outerHeight = r.height + I),
            r
          );
        }
      }
      function u(e, i) {
        if (t.getComputedStyle || -1 === i.indexOf("%")) return i;
        var o = e.style,
          n = o.left,
          r = e.runtimeStyle,
          s = r && r.left;
        return (
          s && (r.left = e.currentStyle.left),
          (o.left = i),
          (i = o.pixelLeft),
          (o.left = n),
          s && (r.left = s),
          i
        );
      }
      var p,
        h,
        f,
        d = !1;
      return a;
    }
    var r =
        "undefined" == typeof console
          ? i
          : function (t) {
              console.error(t);
            },
      s = [
        "paddingLeft",
        "paddingRight",
        "paddingTop",
        "paddingBottom",
        "marginLeft",
        "marginRight",
        "marginTop",
        "marginBottom",
        "borderLeftWidth",
        "borderRightWidth",
        "borderTopWidth",
        "borderBottomWidth",
      ];
    "function" == typeof define && define.amd
      ? define(
          "get-size/get-size",
          ["get-style-property/get-style-property"],
          n
        )
      : "object" == typeof exports
      ? (module.exports = n(require("desandro-get-style-property")))
      : (t.getSize = n(t.getStyleProperty));
  })(window),
  (function (t) {
    function e(t) {
      "function" == typeof t && (e.isReady ? t() : s.push(t));
    }
    function i(t) {
      var i = "readystatechange" === t.type && "complete" !== r.readyState;
      e.isReady || i || o();
    }
    function o() {
      e.isReady = !0;
      for (var t = 0, i = s.length; i > t; t++) {
        var o = s[t];
        o();
      }
    }
    function n(n) {
      return (
        "complete" === r.readyState
          ? o()
          : (n.bind(r, "DOMContentLoaded", i),
            n.bind(r, "readystatechange", i),
            n.bind(t, "load", i)),
        e
      );
    }
    var r = t.document,
      s = [];
    (e.isReady = !1),
      "function" == typeof define && define.amd
        ? define("doc-ready/doc-ready", ["eventie/eventie"], n)
        : "object" == typeof exports
        ? (module.exports = n(require("eventie")))
        : (t.docReady = n(t.eventie));
  })(window),
  (function (t) {
    function e(t, e) {
      return t[s](e);
    }
    function i(t) {
      if (!t.parentNode) {
        var e = document.createDocumentFragment();
        e.appendChild(t);
      }
    }
    function o(t, e) {
      i(t);
      for (
        var o = t.parentNode.querySelectorAll(e), n = 0, r = o.length;
        r > n;
        n++
      )
        if (o[n] === t) return !0;
      return !1;
    }
    function n(t, o) {
      return i(t), e(t, o);
    }
    var r,
      s = (function () {
        if (t.matches) return "matches";
        if (t.matchesSelector) return "matchesSelector";
        for (
          var e = ["webkit", "moz", "ms", "o"], i = 0, o = e.length;
          o > i;
          i++
        ) {
          var n = e[i],
            r = n + "MatchesSelector";
          if (t[r]) return r;
        }
      })();
    if (s) {
      var a = document.createElement("div"),
        u = e(a, "div");
      r = u ? e : n;
    } else r = o;
    "function" == typeof define && define.amd
      ? define("matches-selector/matches-selector", [], function () {
          return r;
        })
      : "object" == typeof exports
      ? (module.exports = r)
      : (window.matchesSelector = r);
  })(Element.prototype),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "fizzy-ui-utils/utils",
          ["doc-ready/doc-ready", "matches-selector/matches-selector"],
          function (i, o) {
            return e(t, i, o);
          }
        )
      : "object" == typeof exports
      ? (module.exports = e(
          t,
          require("doc-ready"),
          require("desandro-matches-selector")
        ))
      : (t.fizzyUIUtils = e(t, t.docReady, t.matchesSelector));
  })(window, function (t, e, i) {
    var o = {};
    (o.extend = function (t, e) {
      for (var i in e) t[i] = e[i];
      return t;
    }),
      (o.modulo = function (t, e) {
        return ((t % e) + e) % e;
      });
    var n = Object.prototype.toString;
    (o.isArray = function (t) {
      return "[object Array]" == n.call(t);
    }),
      (o.makeArray = function (t) {
        var e = [];
        if (o.isArray(t)) e = t;
        else if (t && "number" == typeof t.length)
          for (var i = 0, n = t.length; n > i; i++) e.push(t[i]);
        else e.push(t);
        return e;
      }),
      (o.indexOf = Array.prototype.indexOf
        ? function (t, e) {
            return t.indexOf(e);
          }
        : function (t, e) {
            for (var i = 0, o = t.length; o > i; i++) if (t[i] === e) return i;
            return -1;
          }),
      (o.removeFrom = function (t, e) {
        var i = o.indexOf(t, e);
        -1 != i && t.splice(i, 1);
      }),
      (o.isElement =
        "function" == typeof HTMLElement || "object" == typeof HTMLElement
          ? function (t) {
              return t instanceof HTMLElement;
            }
          : function (t) {
              return (
                t &&
                "object" == typeof t &&
                1 == t.nodeType &&
                "string" == typeof t.nodeName
              );
            }),
      (o.setText = (function () {
        function t(t, i) {
          (e =
            e ||
            (void 0 !== document.documentElement.textContent
              ? "textContent"
              : "innerText")),
            (t[e] = i);
        }
        var e;
        return t;
      })()),
      (o.getParent = function (t, e) {
        for (; t != document.body; )
          if (((t = t.parentNode), i(t, e))) return t;
      }),
      (o.getQueryElement = function (t) {
        return "string" == typeof t ? document.querySelector(t) : t;
      }),
      (o.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (o.filterFindElements = function (t, e) {
        t = o.makeArray(t);
        for (var n = [], r = 0, s = t.length; s > r; r++) {
          var a = t[r];
          if (o.isElement(a))
            if (e) {
              i(a, e) && n.push(a);
              for (
                var u = a.querySelectorAll(e), p = 0, h = u.length;
                h > p;
                p++
              )
                n.push(u[p]);
            } else n.push(a);
        }
        return n;
      }),
      (o.debounceMethod = function (t, e, i) {
        var o = t.prototype[e],
          n = e + "Timeout";
        t.prototype[e] = function () {
          var t = this[n];
          t && clearTimeout(t);
          var e = arguments,
            r = this;
          this[n] = setTimeout(function () {
            o.apply(r, e), delete r[n];
          }, i || 100);
        };
      }),
      (o.toDashed = function (t) {
        return t
          .replace(/(.)([A-Z])/g, function (t, e, i) {
            return e + "-" + i;
          })
          .toLowerCase();
      });
    var r = t.console;
    return (
      (o.htmlInit = function (i, n) {
        e(function () {
          for (
            var e = o.toDashed(n),
              s = document.querySelectorAll(".js-" + e),
              a = "data-" + e + "-options",
              u = 0,
              p = s.length;
            p > u;
            u++
          ) {
            var h,
              f = s[u],
              d = f.getAttribute(a);
            try {
              h = d && JSON.parse(d);
            } catch (l) {
              r &&
                r.error(
                  "Error parsing " +
                    a +
                    " on " +
                    f.nodeName.toLowerCase() +
                    (f.id ? "#" + f.id : "") +
                    ": " +
                    l
                );
              continue;
            }
            var c = new i(f, h),
              m = t.jQuery;
            m && m.data(f, n, c);
          }
        });
      }),
      o
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "outlayer/item",
          [
            "eventEmitter/EventEmitter",
            "get-size/get-size",
            "get-style-property/get-style-property",
            "fizzy-ui-utils/utils",
          ],
          function (i, o, n, r) {
            return e(t, i, o, n, r);
          }
        )
      : "object" == typeof exports
      ? (module.exports = e(
          t,
          require("wolfy87-eventemitter"),
          require("get-size"),
          require("desandro-get-style-property"),
          require("fizzy-ui-utils")
        ))
      : ((t.Outlayer = {}),
        (t.Outlayer.Item = e(
          t,
          t.EventEmitter,
          t.getSize,
          t.getStyleProperty,
          t.fizzyUIUtils
        )));
  })(window, function (t, e, i, o, n) {
    function r(t) {
      for (var e in t) return !1;
      return (e = null), !0;
    }
    function s(t, e) {
      t &&
        ((this.element = t),
        (this.layout = e),
        (this.position = { x: 0, y: 0 }),
        this._create());
    }
    var a = t.getComputedStyle,
      u = a
        ? function (t) {
            return a(t, null);
          }
        : function (t) {
            return t.currentStyle;
          },
      p = o("transition"),
      h = o("transform"),
      f = p && h,
      d = !!o("perspective"),
      l = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "otransitionend",
        transition: "transitionend",
      }[p],
      c = [
        "transform",
        "transition",
        "transitionDuration",
        "transitionProperty",
      ],
      m = (function () {
        for (var t = {}, e = 0, i = c.length; i > e; e++) {
          var n = c[e],
            r = o(n);
          r && r !== n && (t[n] = r);
        }
        return t;
      })();
    n.extend(s.prototype, e.prototype),
      (s.prototype._create = function () {
        (this._transn = { ingProperties: {}, clean: {}, onEnd: {} }),
          this.css({ position: "absolute" });
      }),
      (s.prototype.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (s.prototype.getSize = function () {
        this.size = i(this.element);
      }),
      (s.prototype.css = function (t) {
        var e = this.element.style;
        for (var i in t) {
          var o = m[i] || i;
          e[o] = t[i];
        }
      }),
      (s.prototype.getPosition = function () {
        var t = u(this.element),
          e = this.layout.options,
          i = e.isOriginLeft,
          o = e.isOriginTop,
          n = parseInt(t[i ? "left" : "right"], 10),
          r = parseInt(t[o ? "top" : "bottom"], 10);
        (n = isNaN(n) ? 0 : n), (r = isNaN(r) ? 0 : r);
        var s = this.layout.size;
        (n -= i ? s.paddingLeft : s.paddingRight),
          (r -= o ? s.paddingTop : s.paddingBottom),
          (this.position.x = n),
          (this.position.y = r);
      }),
      (s.prototype.layoutPosition = function () {
        var t = this.layout.size,
          e = this.layout.options,
          i = {},
          o = e.isOriginLeft ? "paddingLeft" : "paddingRight",
          n = e.isOriginLeft ? "left" : "right",
          r = e.isOriginLeft ? "right" : "left",
          s = this.position.x + t[o];
        (s =
          e.percentPosition && !e.isHorizontal
            ? 100 * (s / t.width) + "%"
            : s + "px"),
          (i[n] = s),
          (i[r] = "");
        var a = e.isOriginTop ? "paddingTop" : "paddingBottom",
          u = e.isOriginTop ? "top" : "bottom",
          p = e.isOriginTop ? "bottom" : "top",
          h = this.position.y + t[a];
        (h =
          e.percentPosition && e.isHorizontal
            ? 100 * (h / t.height) + "%"
            : h + "px"),
          (i[u] = h),
          (i[p] = ""),
          this.css(i),
          this.emitEvent("layout", [this]);
      });
    var y = d
      ? function (t, e) {
          return "translate3d(" + t + "px, " + e + "px, 0)";
        }
      : function (t, e) {
          return "translate(" + t + "px, " + e + "px)";
        };
    (s.prototype._transitionTo = function (t, e) {
      this.getPosition();
      var i = this.position.x,
        o = this.position.y,
        n = parseInt(t, 10),
        r = parseInt(e, 10),
        s = n === this.position.x && r === this.position.y;
      if ((this.setPosition(t, e), s && !this.isTransitioning))
        return this.layoutPosition(), void 0;
      var a = t - i,
        u = e - o,
        p = {},
        h = this.layout.options;
      (a = h.isOriginLeft ? a : -a),
        (u = h.isOriginTop ? u : -u),
        (p.transform = y(a, u)),
        this.transition({
          to: p,
          onTransitionEnd: { transform: this.layoutPosition },
          isCleaning: !0,
        });
    }),
      (s.prototype.goTo = function (t, e) {
        this.setPosition(t, e), this.layoutPosition();
      }),
      (s.prototype.moveTo = f ? s.prototype._transitionTo : s.prototype.goTo),
      (s.prototype.setPosition = function (t, e) {
        (this.position.x = parseInt(t, 10)),
          (this.position.y = parseInt(e, 10));
      }),
      (s.prototype._nonTransition = function (t) {
        this.css(t.to), t.isCleaning && this._removeStyles(t.to);
        for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this);
      }),
      (s.prototype._transition = function (t) {
        if (!parseFloat(this.layout.options.transitionDuration))
          return this._nonTransition(t), void 0;
        var e = this._transn;
        for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
        for (i in t.to)
          (e.ingProperties[i] = !0), t.isCleaning && (e.clean[i] = !0);
        if (t.from) {
          this.css(t.from);
          var o = this.element.offsetHeight;
          o = null;
        }
        this.enableTransition(t.to),
          this.css(t.to),
          (this.isTransitioning = !0);
      });
    var g = h && n.toDashed(h) + ",opacity";
    (s.prototype.enableTransition = function () {
      this.isTransitioning ||
        (this.css({
          transitionProperty: g,
          transitionDuration: this.layout.options.transitionDuration,
        }),
        this.element.addEventListener(l, this, !1));
    }),
      (s.prototype.transition =
        s.prototype[p ? "_transition" : "_nonTransition"]),
      (s.prototype.onwebkitTransitionEnd = function (t) {
        this.ontransitionend(t);
      }),
      (s.prototype.onotransitionend = function (t) {
        this.ontransitionend(t);
      });
    var v = {
      "-webkit-transform": "transform",
      "-moz-transform": "transform",
      "-o-transform": "transform",
    };
    (s.prototype.ontransitionend = function (t) {
      if (t.target === this.element) {
        var e = this._transn,
          i = v[t.propertyName] || t.propertyName;
        if (
          (delete e.ingProperties[i],
          r(e.ingProperties) && this.disableTransition(),
          i in e.clean &&
            ((this.element.style[t.propertyName] = ""), delete e.clean[i]),
          i in e.onEnd)
        ) {
          var o = e.onEnd[i];
          o.call(this), delete e.onEnd[i];
        }
        this.emitEvent("transitionEnd", [this]);
      }
    }),
      (s.prototype.disableTransition = function () {
        this.removeTransitionStyles(),
          this.element.removeEventListener(l, this, !1),
          (this.isTransitioning = !1);
      }),
      (s.prototype._removeStyles = function (t) {
        var e = {};
        for (var i in t) e[i] = "";
        this.css(e);
      });
    var _ = { transitionProperty: "", transitionDuration: "" };
    return (
      (s.prototype.removeTransitionStyles = function () {
        this.css(_);
      }),
      (s.prototype.removeElem = function () {
        this.element.parentNode.removeChild(this.element),
          this.css({ display: "" }),
          this.emitEvent("remove", [this]);
      }),
      (s.prototype.remove = function () {
        if (!p || !parseFloat(this.layout.options.transitionDuration))
          return this.removeElem(), void 0;
        var t = this;
        this.once("transitionEnd", function () {
          t.removeElem();
        }),
          this.hide();
      }),
      (s.prototype.reveal = function () {
        delete this.isHidden, this.css({ display: "" });
        var t = this.layout.options,
          e = {},
          i = this.getHideRevealTransitionEndProperty("visibleStyle");
        (e[i] = this.onRevealTransitionEnd),
          this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          });
      }),
      (s.prototype.onRevealTransitionEnd = function () {
        this.isHidden || this.emitEvent("reveal");
      }),
      (s.prototype.getHideRevealTransitionEndProperty = function (t) {
        var e = this.layout.options[t];
        if (e.opacity) return "opacity";
        for (var i in e) return i;
      }),
      (s.prototype.hide = function () {
        (this.isHidden = !0), this.css({ display: "" });
        var t = this.layout.options,
          e = {},
          i = this.getHideRevealTransitionEndProperty("hiddenStyle");
        (e[i] = this.onHideTransitionEnd),
          this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          });
      }),
      (s.prototype.onHideTransitionEnd = function () {
        this.isHidden &&
          (this.css({ display: "none" }), this.emitEvent("hide"));
      }),
      (s.prototype.destroy = function () {
        this.css({
          position: "",
          left: "",
          right: "",
          top: "",
          bottom: "",
          transition: "",
          transform: "",
        });
      }),
      s
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "outlayer/outlayer",
          [
            "eventie/eventie",
            "eventEmitter/EventEmitter",
            "get-size/get-size",
            "fizzy-ui-utils/utils",
            "./item",
          ],
          function (i, o, n, r, s) {
            return e(t, i, o, n, r, s);
          }
        )
      : "object" == typeof exports
      ? (module.exports = e(
          t,
          require("eventie"),
          require("wolfy87-eventemitter"),
          require("get-size"),
          require("fizzy-ui-utils"),
          require("./item")
        ))
      : (t.Outlayer = e(
          t,
          t.eventie,
          t.EventEmitter,
          t.getSize,
          t.fizzyUIUtils,
          t.Outlayer.Item
        ));
  })(window, function (t, e, i, o, n, r) {
    function s(t, e) {
      var i = n.getQueryElement(t);
      if (!i)
        return (
          a &&
            a.error(
              "Bad element for " + this.constructor.namespace + ": " + (i || t)
            ),
          void 0
        );
      (this.element = i),
        u && (this.$element = u(this.element)),
        (this.options = n.extend({}, this.constructor.defaults)),
        this.option(e);
      var o = ++h;
      (this.element.outlayerGUID = o),
        (f[o] = this),
        this._create(),
        this.options.isInitLayout && this.layout();
    }
    var a = t.console,
      u = t.jQuery,
      p = function () {},
      h = 0,
      f = {};
    return (
      (s.namespace = "outlayer"),
      (s.Item = r),
      (s.defaults = {
        containerStyle: { position: "relative" },
        isInitLayout: !0,
        isOriginLeft: !0,
        isOriginTop: !0,
        isResizeBound: !0,
        isResizingContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: { opacity: 0, transform: "scale(0.001)" },
        visibleStyle: { opacity: 1, transform: "scale(1)" },
      }),
      n.extend(s.prototype, i.prototype),
      (s.prototype.option = function (t) {
        n.extend(this.options, t);
      }),
      (s.prototype._create = function () {
        this.reloadItems(),
          (this.stamps = []),
          this.stamp(this.options.stamp),
          n.extend(this.element.style, this.options.containerStyle),
          this.options.isResizeBound && this.bindResize();
      }),
      (s.prototype.reloadItems = function () {
        this.items = this._itemize(this.element.children);
      }),
      (s.prototype._itemize = function (t) {
        for (
          var e = this._filterFindItemElements(t),
            i = this.constructor.Item,
            o = [],
            n = 0,
            r = e.length;
          r > n;
          n++
        ) {
          var s = e[n],
            a = new i(s, this);
          o.push(a);
        }
        return o;
      }),
      (s.prototype._filterFindItemElements = function (t) {
        return n.filterFindElements(t, this.options.itemSelector);
      }),
      (s.prototype.getItemElements = function () {
        for (var t = [], e = 0, i = this.items.length; i > e; e++)
          t.push(this.items[e].element);
        return t;
      }),
      (s.prototype.layout = function () {
        this._resetLayout(), this._manageStamps();
        var t =
          void 0 !== this.options.isLayoutInstant
            ? this.options.isLayoutInstant
            : !this._isLayoutInited;
        this.layoutItems(this.items, t), (this._isLayoutInited = !0);
      }),
      (s.prototype._init = s.prototype.layout),
      (s.prototype._resetLayout = function () {
        this.getSize();
      }),
      (s.prototype.getSize = function () {
        this.size = o(this.element);
      }),
      (s.prototype._getMeasurement = function (t, e) {
        var i,
          r = this.options[t];
        r
          ? ("string" == typeof r
              ? (i = this.element.querySelector(r))
              : n.isElement(r) && (i = r),
            (this[t] = i ? o(i)[e] : r))
          : (this[t] = 0);
      }),
      (s.prototype.layoutItems = function (t, e) {
        (t = this._getItemsForLayout(t)),
          this._layoutItems(t, e),
          this._postLayout();
      }),
      (s.prototype._getItemsForLayout = function (t) {
        for (var e = [], i = 0, o = t.length; o > i; i++) {
          var n = t[i];
          n.isIgnored || e.push(n);
        }
        return e;
      }),
      (s.prototype._layoutItems = function (t, e) {
        if ((this._emitCompleteOnItems("layout", t), t && t.length)) {
          for (var i = [], o = 0, n = t.length; n > o; o++) {
            var r = t[o],
              s = this._getItemLayoutPosition(r);
            (s.item = r), (s.isInstant = e || r.isLayoutInstant), i.push(s);
          }
          this._processLayoutQueue(i);
        }
      }),
      (s.prototype._getItemLayoutPosition = function () {
        return { x: 0, y: 0 };
      }),
      (s.prototype._processLayoutQueue = function (t) {
        for (var e = 0, i = t.length; i > e; e++) {
          var o = t[e];
          this._positionItem(o.item, o.x, o.y, o.isInstant);
        }
      }),
      (s.prototype._positionItem = function (t, e, i, o) {
        o ? t.goTo(e, i) : t.moveTo(e, i);
      }),
      (s.prototype._postLayout = function () {
        this.resizeContainer();
      }),
      (s.prototype.resizeContainer = function () {
        if (this.options.isResizingContainer) {
          var t = this._getContainerSize();
          t &&
            (this._setContainerMeasure(t.width, !0),
            this._setContainerMeasure(t.height, !1));
        }
      }),
      (s.prototype._getContainerSize = p),
      (s.prototype._setContainerMeasure = function (t, e) {
        if (void 0 !== t) {
          var i = this.size;
          i.isBorderBox &&
            (t += e
              ? i.paddingLeft +
                i.paddingRight +
                i.borderLeftWidth +
                i.borderRightWidth
              : i.paddingBottom +
                i.paddingTop +
                i.borderTopWidth +
                i.borderBottomWidth),
            (t = Math.max(t, 0)),
            (this.element.style[e ? "width" : "height"] = t + "px");
        }
      }),
      (s.prototype._emitCompleteOnItems = function (t, e) {
        function i() {
          n.emitEvent(t + "Complete", [e]);
        }
        function o() {
          s++, s === r && i();
        }
        var n = this,
          r = e.length;
        if (!e || !r) return i(), void 0;
        for (var s = 0, a = 0, u = e.length; u > a; a++) {
          var p = e[a];
          p.once(t, o);
        }
      }),
      (s.prototype.ignore = function (t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0);
      }),
      (s.prototype.unignore = function (t) {
        var e = this.getItem(t);
        e && delete e.isIgnored;
      }),
      (s.prototype.stamp = function (t) {
        if ((t = this._find(t))) {
          this.stamps = this.stamps.concat(t);
          for (var e = 0, i = t.length; i > e; e++) {
            var o = t[e];
            this.ignore(o);
          }
        }
      }),
      (s.prototype.unstamp = function (t) {
        if ((t = this._find(t)))
          for (var e = 0, i = t.length; i > e; e++) {
            var o = t[e];
            n.removeFrom(this.stamps, o), this.unignore(o);
          }
      }),
      (s.prototype._find = function (t) {
        return t
          ? ("string" == typeof t && (t = this.element.querySelectorAll(t)),
            (t = n.makeArray(t)))
          : void 0;
      }),
      (s.prototype._manageStamps = function () {
        if (this.stamps && this.stamps.length) {
          this._getBoundingRect();
          for (var t = 0, e = this.stamps.length; e > t; t++) {
            var i = this.stamps[t];
            this._manageStamp(i);
          }
        }
      }),
      (s.prototype._getBoundingRect = function () {
        var t = this.element.getBoundingClientRect(),
          e = this.size;
        this._boundingRect = {
          left: t.left + e.paddingLeft + e.borderLeftWidth,
          top: t.top + e.paddingTop + e.borderTopWidth,
          right: t.right - (e.paddingRight + e.borderRightWidth),
          bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth),
        };
      }),
      (s.prototype._manageStamp = p),
      (s.prototype._getElementOffset = function (t) {
        var e = t.getBoundingClientRect(),
          i = this._boundingRect,
          n = o(t),
          r = {
            left: e.left - i.left - n.marginLeft,
            top: e.top - i.top - n.marginTop,
            right: i.right - e.right - n.marginRight,
            bottom: i.bottom - e.bottom - n.marginBottom,
          };
        return r;
      }),
      (s.prototype.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (s.prototype.bindResize = function () {
        this.isResizeBound ||
          (e.bind(t, "resize", this), (this.isResizeBound = !0));
      }),
      (s.prototype.unbindResize = function () {
        this.isResizeBound && e.unbind(t, "resize", this),
          (this.isResizeBound = !1);
      }),
      (s.prototype.onresize = function () {
        function t() {
          e.resize(), delete e.resizeTimeout;
        }
        this.resizeTimeout && clearTimeout(this.resizeTimeout);
        var e = this;
        this.resizeTimeout = setTimeout(t, 100);
      }),
      (s.prototype.resize = function () {
        this.isResizeBound && this.needsResizeLayout() && this.layout();
      }),
      (s.prototype.needsResizeLayout = function () {
        var t = o(this.element),
          e = this.size && t;
        return e && t.innerWidth !== this.size.innerWidth;
      }),
      (s.prototype.addItems = function (t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e;
      }),
      (s.prototype.appended = function (t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e));
      }),
      (s.prototype.prepended = function (t) {
        var e = this._itemize(t);
        if (e.length) {
          var i = this.items.slice(0);
          (this.items = e.concat(i)),
            this._resetLayout(),
            this._manageStamps(),
            this.layoutItems(e, !0),
            this.reveal(e),
            this.layoutItems(i);
        }
      }),
      (s.prototype.reveal = function (t) {
        this._emitCompleteOnItems("reveal", t);
        for (var e = t && t.length, i = 0; e && e > i; i++) {
          var o = t[i];
          o.reveal();
        }
      }),
      (s.prototype.hide = function (t) {
        this._emitCompleteOnItems("hide", t);
        for (var e = t && t.length, i = 0; e && e > i; i++) {
          var o = t[i];
          o.hide();
        }
      }),
      (s.prototype.revealItemElements = function (t) {
        var e = this.getItems(t);
        this.reveal(e);
      }),
      (s.prototype.hideItemElements = function (t) {
        var e = this.getItems(t);
        this.hide(e);
      }),
      (s.prototype.getItem = function (t) {
        for (var e = 0, i = this.items.length; i > e; e++) {
          var o = this.items[e];
          if (o.element === t) return o;
        }
      }),
      (s.prototype.getItems = function (t) {
        t = n.makeArray(t);
        for (var e = [], i = 0, o = t.length; o > i; i++) {
          var r = t[i],
            s = this.getItem(r);
          s && e.push(s);
        }
        return e;
      }),
      (s.prototype.remove = function (t) {
        var e = this.getItems(t);
        if ((this._emitCompleteOnItems("remove", e), e && e.length))
          for (var i = 0, o = e.length; o > i; i++) {
            var r = e[i];
            r.remove(), n.removeFrom(this.items, r);
          }
      }),
      (s.prototype.destroy = function () {
        var t = this.element.style;
        (t.height = ""), (t.position = ""), (t.width = "");
        for (var e = 0, i = this.items.length; i > e; e++) {
          var o = this.items[e];
          o.destroy();
        }
        this.unbindResize();
        var n = this.element.outlayerGUID;
        delete f[n],
          delete this.element.outlayerGUID,
          u && u.removeData(this.element, this.constructor.namespace);
      }),
      (s.data = function (t) {
        t = n.getQueryElement(t);
        var e = t && t.outlayerGUID;
        return e && f[e];
      }),
      (s.create = function (t, e) {
        function i() {
          s.apply(this, arguments);
        }
        return (
          Object.create
            ? (i.prototype = Object.create(s.prototype))
            : n.extend(i.prototype, s.prototype),
          (i.prototype.constructor = i),
          (i.defaults = n.extend({}, s.defaults)),
          n.extend(i.defaults, e),
          (i.prototype.settings = {}),
          (i.namespace = t),
          (i.data = s.data),
          (i.Item = function () {
            r.apply(this, arguments);
          }),
          (i.Item.prototype = new r()),
          n.htmlInit(i, t),
          u && u.bridget && u.bridget(t, i),
          i
        );
      }),
      (s.Item = r),
      s
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("isotope/js/item", ["outlayer/outlayer"], e)
      : "object" == typeof exports
      ? (module.exports = e(require("outlayer")))
      : ((t.Isotope = t.Isotope || {}), (t.Isotope.Item = e(t.Outlayer)));
  })(window, function (t) {
    function e() {
      t.Item.apply(this, arguments);
    }
    (e.prototype = new t.Item()),
      (e.prototype._create = function () {
        (this.id = this.layout.itemGUID++),
          t.Item.prototype._create.call(this),
          (this.sortData = {});
      }),
      (e.prototype.updateSortData = function () {
        if (!this.isIgnored) {
          (this.sortData.id = this.id),
            (this.sortData["original-order"] = this.id),
            (this.sortData.random = Math.random());
          var t = this.layout.options.getSortData,
            e = this.layout._sorters;
          for (var i in t) {
            var o = e[i];
            this.sortData[i] = o(this.element, this);
          }
        }
      });
    var i = e.prototype.destroy;
    return (
      (e.prototype.destroy = function () {
        i.apply(this, arguments), this.css({ display: "" });
      }),
      e
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "isotope/js/layout-mode",
          ["get-size/get-size", "outlayer/outlayer"],
          e
        )
      : "object" == typeof exports
      ? (module.exports = e(require("get-size"), require("outlayer")))
      : ((t.Isotope = t.Isotope || {}),
        (t.Isotope.LayoutMode = e(t.getSize, t.Outlayer)));
  })(window, function (t, e) {
    function i(t) {
      (this.isotope = t),
        t &&
          ((this.options = t.options[this.namespace]),
          (this.element = t.element),
          (this.items = t.filteredItems),
          (this.size = t.size));
    }
    return (
      (function () {
        function t(t) {
          return function () {
            return e.prototype[t].apply(this.isotope, arguments);
          };
        }
        for (
          var o = [
              "_resetLayout",
              "_getItemLayoutPosition",
              "_manageStamp",
              "_getContainerSize",
              "_getElementOffset",
              "needsResizeLayout",
            ],
            n = 0,
            r = o.length;
          r > n;
          n++
        ) {
          var s = o[n];
          i.prototype[s] = t(s);
        }
      })(),
      (i.prototype.needsVerticalResizeLayout = function () {
        var e = t(this.isotope.element),
          i = this.isotope.size && e;
        return i && e.innerHeight != this.isotope.size.innerHeight;
      }),
      (i.prototype._getMeasurement = function () {
        this.isotope._getMeasurement.apply(this, arguments);
      }),
      (i.prototype.getColumnWidth = function () {
        this.getSegmentSize("column", "Width");
      }),
      (i.prototype.getRowHeight = function () {
        this.getSegmentSize("row", "Height");
      }),
      (i.prototype.getSegmentSize = function (t, e) {
        var i = t + e,
          o = "outer" + e;
        if ((this._getMeasurement(i, o), !this[i])) {
          var n = this.getFirstItemSize();
          this[i] = (n && n[o]) || this.isotope.size["inner" + e];
        }
      }),
      (i.prototype.getFirstItemSize = function () {
        var e = this.isotope.filteredItems[0];
        return e && e.element && t(e.element);
      }),
      (i.prototype.layout = function () {
        this.isotope.layout.apply(this.isotope, arguments);
      }),
      (i.prototype.getSize = function () {
        this.isotope.getSize(), (this.size = this.isotope.size);
      }),
      (i.modes = {}),
      (i.create = function (t, e) {
        function o() {
          i.apply(this, arguments);
        }
        return (
          (o.prototype = new i()),
          e && (o.options = e),
          (o.prototype.namespace = t),
          (i.modes[t] = o),
          o
        );
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "masonry/masonry",
          ["outlayer/outlayer", "get-size/get-size", "fizzy-ui-utils/utils"],
          e
        )
      : "object" == typeof exports
      ? (module.exports = e(
          require("outlayer"),
          require("get-size"),
          require("fizzy-ui-utils")
        ))
      : (t.Masonry = e(t.Outlayer, t.getSize, t.fizzyUIUtils));
  })(window, function (t, e, i) {
    var o = t.create("masonry");
    return (
      (o.prototype._resetLayout = function () {
        this.getSize(),
          this._getMeasurement("columnWidth", "outerWidth"),
          this._getMeasurement("gutter", "outerWidth"),
          this.measureColumns();
        var t = this.cols;
        for (this.colYs = []; t--; ) this.colYs.push(0);
        this.maxY = 0;
      }),
      (o.prototype.measureColumns = function () {
        if ((this.getContainerWidth(), !this.columnWidth)) {
          var t = this.items[0],
            i = t && t.element;
          this.columnWidth = (i && e(i).outerWidth) || this.containerWidth;
        }
        var o = (this.columnWidth += this.gutter),
          n = this.containerWidth + this.gutter,
          r = n / o,
          s = o - (n % o),
          a = s && 1 > s ? "round" : "floor";
        (r = Math[a](r)), (this.cols = Math.max(r, 1));
      }),
      (o.prototype.getContainerWidth = function () {
        var t = this.options.isFitWidth
            ? this.element.parentNode
            : this.element,
          i = e(t);
        this.containerWidth = i && i.innerWidth;
      }),
      (o.prototype._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth,
          o = e && 1 > e ? "round" : "ceil",
          n = Math[o](t.size.outerWidth / this.columnWidth);
        n = Math.min(n, this.cols);
        for (
          var r = this._getColGroup(n),
            s = Math.min.apply(Math, r),
            a = i.indexOf(r, s),
            u = { x: this.columnWidth * a, y: s },
            p = s + t.size.outerHeight,
            h = this.cols + 1 - r.length,
            f = 0;
          h > f;
          f++
        )
          this.colYs[a + f] = p;
        return u;
      }),
      (o.prototype._getColGroup = function (t) {
        if (2 > t) return this.colYs;
        for (var e = [], i = this.cols + 1 - t, o = 0; i > o; o++) {
          var n = this.colYs.slice(o, o + t);
          e[o] = Math.max.apply(Math, n);
        }
        return e;
      }),
      (o.prototype._manageStamp = function (t) {
        var i = e(t),
          o = this._getElementOffset(t),
          n = this.options.isOriginLeft ? o.left : o.right,
          r = n + i.outerWidth,
          s = Math.floor(n / this.columnWidth);
        s = Math.max(0, s);
        var a = Math.floor(r / this.columnWidth);
        (a -= r % this.columnWidth ? 0 : 1), (a = Math.min(this.cols - 1, a));
        for (
          var u = (this.options.isOriginTop ? o.top : o.bottom) + i.outerHeight,
            p = s;
          a >= p;
          p++
        )
          this.colYs[p] = Math.max(u, this.colYs[p]);
      }),
      (o.prototype._getContainerSize = function () {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = { height: this.maxY };
        return (
          this.options.isFitWidth && (t.width = this._getContainerFitWidth()), t
        );
      }),
      (o.prototype._getContainerFitWidth = function () {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e]; ) t++;
        return (this.cols - t) * this.columnWidth - this.gutter;
      }),
      (o.prototype.needsResizeLayout = function () {
        var t = this.containerWidth;
        return this.getContainerWidth(), t !== this.containerWidth;
      }),
      o
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "isotope/js/layout-modes/masonry",
          ["../layout-mode", "masonry/masonry"],
          e
        )
      : "object" == typeof exports
      ? (module.exports = e(
          require("../layout-mode"),
          require("masonry-layout")
        ))
      : e(t.Isotope.LayoutMode, t.Masonry);
  })(window, function (t, e) {
    function i(t, e) {
      for (var i in e) t[i] = e[i];
      return t;
    }
    var o = t.create("masonry"),
      n = o.prototype._getElementOffset,
      r = o.prototype.layout,
      s = o.prototype._getMeasurement;
    i(o.prototype, e.prototype),
      (o.prototype._getElementOffset = n),
      (o.prototype.layout = r),
      (o.prototype._getMeasurement = s);
    var a = o.prototype.measureColumns;
    o.prototype.measureColumns = function () {
      (this.items = this.isotope.filteredItems), a.call(this);
    };
    var u = o.prototype._manageStamp;
    return (
      (o.prototype._manageStamp = function () {
        (this.options.isOriginLeft = this.isotope.options.isOriginLeft),
          (this.options.isOriginTop = this.isotope.options.isOriginTop),
          u.apply(this, arguments);
      }),
      o
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], e)
      : "object" == typeof exports
      ? (module.exports = e(require("../layout-mode")))
      : e(t.Isotope.LayoutMode);
  })(window, function (t) {
    var e = t.create("fitRows");
    return (
      (e.prototype._resetLayout = function () {
        (this.x = 0),
          (this.y = 0),
          (this.maxY = 0),
          this._getMeasurement("gutter", "outerWidth");
      }),
      (e.prototype._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = t.size.outerWidth + this.gutter,
          i = this.isotope.size.innerWidth + this.gutter;
        0 !== this.x && e + this.x > i && ((this.x = 0), (this.y = this.maxY));
        var o = { x: this.x, y: this.y };
        return (
          (this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight)),
          (this.x += e),
          o
        );
      }),
      (e.prototype._getContainerSize = function () {
        return { height: this.maxY };
      }),
      e
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], e)
      : "object" == typeof exports
      ? (module.exports = e(require("../layout-mode")))
      : e(t.Isotope.LayoutMode);
  })(window, function (t) {
    var e = t.create("vertical", { horizontalAlignment: 0 });
    return (
      (e.prototype._resetLayout = function () {
        this.y = 0;
      }),
      (e.prototype._getItemLayoutPosition = function (t) {
        t.getSize();
        var e =
            (this.isotope.size.innerWidth - t.size.outerWidth) *
            this.options.horizontalAlignment,
          i = this.y;
        return (this.y += t.size.outerHeight), { x: e, y: i };
      }),
      (e.prototype._getContainerSize = function () {
        return { height: this.y };
      }),
      e
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          [
            "outlayer/outlayer",
            "get-size/get-size",
            "matches-selector/matches-selector",
            "fizzy-ui-utils/utils",
            "isotope/js/item",
            "isotope/js/layout-mode",
            "isotope/js/layout-modes/masonry",
            "isotope/js/layout-modes/fit-rows",
            "isotope/js/layout-modes/vertical",
          ],
          function (i, o, n, r, s, a) {
            return e(t, i, o, n, r, s, a);
          }
        )
      : "object" == typeof exports
      ? (module.exports = e(
          t,
          require("outlayer"),
          require("get-size"),
          require("desandro-matches-selector"),
          require("fizzy-ui-utils"),
          require("./item"),
          require("./layout-mode"),
          require("./layout-modes/masonry"),
          require("./layout-modes/fit-rows"),
          require("./layout-modes/vertical")
        ))
      : (t.Isotope = e(
          t,
          t.Outlayer,
          t.getSize,
          t.matchesSelector,
          t.fizzyUIUtils,
          t.Isotope.Item,
          t.Isotope.LayoutMode
        ));
  })(window, function (t, e, i, o, n, r, s) {
    function a(t, e) {
      return function (i, o) {
        for (var n = 0, r = t.length; r > n; n++) {
          var s = t[n],
            a = i.sortData[s],
            u = o.sortData[s];
          if (a > u || u > a) {
            var p = void 0 !== e[s] ? e[s] : e,
              h = p ? 1 : -1;
            return (a > u ? 1 : -1) * h;
          }
        }
        return 0;
      };
    }
    var u = t.jQuery,
      p = String.prototype.trim
        ? function (t) {
            return t.trim();
          }
        : function (t) {
            return t.replace(/^\s+|\s+$/g, "");
          },
      h = document.documentElement,
      f = h.textContent
        ? function (t) {
            return t.textContent;
          }
        : function (t) {
            return t.innerText;
          },
      d = e.create("isotope", {
        layoutMode: "masonry",
        isJQueryFiltering: !0,
        sortAscending: !0,
      });
    (d.Item = r),
      (d.LayoutMode = s),
      (d.prototype._create = function () {
        (this.itemGUID = 0),
          (this._sorters = {}),
          this._getSorters(),
          e.prototype._create.call(this),
          (this.modes = {}),
          (this.filteredItems = this.items),
          (this.sortHistory = ["original-order"]);
        for (var t in s.modes) this._initLayoutMode(t);
      }),
      (d.prototype.reloadItems = function () {
        (this.itemGUID = 0), e.prototype.reloadItems.call(this);
      }),
      (d.prototype._itemize = function () {
        for (
          var t = e.prototype._itemize.apply(this, arguments),
            i = 0,
            o = t.length;
          o > i;
          i++
        ) {
          var n = t[i];
          n.id = this.itemGUID++;
        }
        return this._updateItemsSortData(t), t;
      }),
      (d.prototype._initLayoutMode = function (t) {
        var e = s.modes[t],
          i = this.options[t] || {};
        (this.options[t] = e.options ? n.extend(e.options, i) : i),
          (this.modes[t] = new e(this));
      }),
      (d.prototype.layout = function () {
        return !this._isLayoutInited && this.options.isInitLayout
          ? (this.arrange(), void 0)
          : (this._layout(), void 0);
      }),
      (d.prototype._layout = function () {
        var t = this._getIsInstant();
        this._resetLayout(),
          this._manageStamps(),
          this.layoutItems(this.filteredItems, t),
          (this._isLayoutInited = !0);
      }),
      (d.prototype.arrange = function (t) {
        function e() {
          o.reveal(i.needReveal), o.hide(i.needHide);
        }
        this.option(t), this._getIsInstant();
        var i = this._filter(this.items);
        this.filteredItems = i.matches;
        var o = this;
        this._bindArrangeComplete(),
          this._isInstant ? this._noTransition(e) : e(),
          this._sort(),
          this._layout();
      }),
      (d.prototype._init = d.prototype.arrange),
      (d.prototype._getIsInstant = function () {
        var t =
          void 0 !== this.options.isLayoutInstant
            ? this.options.isLayoutInstant
            : !this._isLayoutInited;
        return (this._isInstant = t), t;
      }),
      (d.prototype._bindArrangeComplete = function () {
        function t() {
          e && i && o && n.emitEvent("arrangeComplete", [n.filteredItems]);
        }
        var e,
          i,
          o,
          n = this;
        this.once("layoutComplete", function () {
          (e = !0), t();
        }),
          this.once("hideComplete", function () {
            (i = !0), t();
          }),
          this.once("revealComplete", function () {
            (o = !0), t();
          });
      }),
      (d.prototype._filter = function (t) {
        var e = this.options.filter;
        e = e || "*";
        for (
          var i = [],
            o = [],
            n = [],
            r = this._getFilterTest(e),
            s = 0,
            a = t.length;
          a > s;
          s++
        ) {
          var u = t[s];
          if (!u.isIgnored) {
            var p = r(u);
            p && i.push(u),
              p && u.isHidden ? o.push(u) : p || u.isHidden || n.push(u);
          }
        }
        return { matches: i, needReveal: o, needHide: n };
      }),
      (d.prototype._getFilterTest = function (t) {
        return u && this.options.isJQueryFiltering
          ? function (e) {
              return u(e.element).is(t);
            }
          : "function" == typeof t
          ? function (e) {
              return t(e.element);
            }
          : function (e) {
              return o(e.element, t);
            };
      }),
      (d.prototype.updateSortData = function (t) {
        var e;
        t ? ((t = n.makeArray(t)), (e = this.getItems(t))) : (e = this.items),
          this._getSorters(),
          this._updateItemsSortData(e);
      }),
      (d.prototype._getSorters = function () {
        var t = this.options.getSortData;
        for (var e in t) {
          var i = t[e];
          this._sorters[e] = l(i);
        }
      }),
      (d.prototype._updateItemsSortData = function (t) {
        for (var e = t && t.length, i = 0; e && e > i; i++) {
          var o = t[i];
          o.updateSortData();
        }
      });
    var l = (function () {
      function t(t) {
        if ("string" != typeof t) return t;
        var i = p(t).split(" "),
          o = i[0],
          n = o.match(/^\[(.+)\]$/),
          r = n && n[1],
          s = e(r, o),
          a = d.sortDataParsers[i[1]];
        return (t = a
          ? function (t) {
              return t && a(s(t));
            }
          : function (t) {
              return t && s(t);
            });
      }
      function e(t, e) {
        var i;
        return (i = t
          ? function (e) {
              return e.getAttribute(t);
            }
          : function (t) {
              var i = t.querySelector(e);
              return i && f(i);
            });
      }
      return t;
    })();
    (d.sortDataParsers = {
      parseInt: function (t) {
        return parseInt(t, 10);
      },
      parseFloat: function (t) {
        return parseFloat(t);
      },
    }),
      (d.prototype._sort = function () {
        var t = this.options.sortBy;
        if (t) {
          var e = [].concat.apply(t, this.sortHistory),
            i = a(e, this.options.sortAscending);
          this.filteredItems.sort(i),
            t != this.sortHistory[0] && this.sortHistory.unshift(t);
        }
      }),
      (d.prototype._mode = function () {
        var t = this.options.layoutMode,
          e = this.modes[t];
        if (!e) throw Error("No layout mode: " + t);
        return (e.options = this.options[t]), e;
      }),
      (d.prototype._resetLayout = function () {
        e.prototype._resetLayout.call(this), this._mode()._resetLayout();
      }),
      (d.prototype._getItemLayoutPosition = function (t) {
        return this._mode()._getItemLayoutPosition(t);
      }),
      (d.prototype._manageStamp = function (t) {
        this._mode()._manageStamp(t);
      }),
      (d.prototype._getContainerSize = function () {
        return this._mode()._getContainerSize();
      }),
      (d.prototype.needsResizeLayout = function () {
        return this._mode().needsResizeLayout();
      }),
      (d.prototype.appended = function (t) {
        var e = this.addItems(t);
        if (e.length) {
          var i = this._filterRevealAdded(e);
          this.filteredItems = this.filteredItems.concat(i);
        }
      }),
      (d.prototype.prepended = function (t) {
        var e = this._itemize(t);
        if (e.length) {
          this._resetLayout(), this._manageStamps();
          var i = this._filterRevealAdded(e);
          this.layoutItems(this.filteredItems),
            (this.filteredItems = i.concat(this.filteredItems)),
            (this.items = e.concat(this.items));
        }
      }),
      (d.prototype._filterRevealAdded = function (t) {
        var e = this._filter(t);
        return (
          this.hide(e.needHide),
          this.reveal(e.matches),
          this.layoutItems(e.matches, !0),
          e.matches
        );
      }),
      (d.prototype.insert = function (t) {
        var e = this.addItems(t);
        if (e.length) {
          var i,
            o,
            n = e.length;
          for (i = 0; n > i; i++)
            (o = e[i]), this.element.appendChild(o.element);
          var r = this._filter(e).matches;
          for (i = 0; n > i; i++) e[i].isLayoutInstant = !0;
          for (this.arrange(), i = 0; n > i; i++) delete e[i].isLayoutInstant;
          this.reveal(r);
        }
      });
    var c = d.prototype.remove;
    return (
      (d.prototype.remove = function (t) {
        t = n.makeArray(t);
        var e = this.getItems(t);
        c.call(this, t);
        var i = e && e.length;
        if (i)
          for (var o = 0; i > o; o++) {
            var r = e[o];
            n.removeFrom(this.filteredItems, r);
          }
      }),
      (d.prototype.shuffle = function () {
        for (var t = 0, e = this.items.length; e > t; t++) {
          var i = this.items[t];
          i.sortData.random = Math.random();
        }
        (this.options.sortBy = "random"), this._sort(), this._layout();
      }),
      (d.prototype._noTransition = function (t) {
        var e = this.options.transitionDuration;
        this.options.transitionDuration = 0;
        var i = t.call(this);
        return (this.options.transitionDuration = e), i;
      }),
      (d.prototype.getFilteredItemElements = function () {
        for (var t = [], e = 0, i = this.filteredItems.length; i > e; e++)
          t.push(this.filteredItems[e].element);
        return t;
      }),
      d
    );
  });
