!function (e, t) {
  "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.emedia = t() : e.emedia = t();
}(window, function () {
  return function (e) {
    var t = {};

    function i(n) {
      if (t[n]) return t[n].exports;
      var o = t[n] = {
        i: n,
        l: !1,
        exports: {}
      };
      return e[n].call(o.exports, o, o.exports, i), o.l = !0, o.exports;
    }

    return i.m = e, i.c = t, i.d = function (e, t, n) {
      i.o(e, t) || Object.defineProperty(e, t, {
        enumerable: !0,
        get: n
      });
    }, i.r = function (e) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(e, "__esModule", {
        value: !0
      });
    }, i.t = function (e, t) {
      if (1 & t && (e = i(e)), 8 & t) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (i.r(n), Object.defineProperty(n, "default", {
        enumerable: !0,
        value: e
      }), 2 & t && "string" != typeof e) for (var o in e) i.d(n, o, function (t) {
        return e[t];
      }.bind(null, o));
      return n;
    }, i.n = function (e) {
      var t = e && e.__esModule ? function () {
        return e.default;
      } : function () {
        return e;
      };
      return i.d(t, "a", t), t;
    }, i.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, i.p = "", i(i.s = 5);
  }([function (module, exports) {
    var CHARS;

    function Util() {}

    CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""), Math.uuid = function (e, t) {
      var i,
          n,
          o = CHARS,
          r = [];
      if (t = t || o.length, e) for (i = 0; i < e; i++) r[i] = o[0 | Math.random() * t];else for (r[8] = r[13] = r[18] = r[23] = "-", r[14] = "4", i = 0; i < 36; i++) r[i] || (n = 0 | 16 * Math.random(), r[i] = o[19 == i ? 3 & n | 8 : n]);
      return r.join("");
    }, Math.uuidFast = function () {
      for (var e, t = CHARS, i = new Array(36), n = 0, o = 0; o < 36; o++) 8 == o || 13 == o || 18 == o || 23 == o ? i[o] = "-" : 14 == o ? i[o] = "4" : (n <= 2 && (n = 33554432 + 16777216 * Math.random() | 0), e = 15 & n, n >>= 4, i[o] = t[19 == o ? 3 & e | 8 : e]);

      return i.join("");
    }, Math.uuidCompact = function () {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) {
        var t = 16 * Math.random() | 0;
        return ("x" == e ? t : 3 & t | 8).toString(16);
      });
    }, String.prototype.startsWith || (String.prototype.startsWith = function (e, t) {
      return t = t || 0, this.indexOf(e, t) === t;
    });

    var Logger = function (e) {
      var t = this,
          i = 0,
          n = 1,
          o = 2,
          r = 3,
          s = 4,
          a = 5,
          c = ["TRACE", "DEBUG", "INFO", "WARN", "ERROR", "FATAL"];

      function d(i, n) {
        try {
          !function (i, n) {
            if (wx.emedia && wx.emedia.LOG_LEVEL && i < wx.emedia.LOG_LEVEL) return;
            var o = [];
            o.push(i), e && o.push(e);

            for (var r = 0; r < n.length; r++) o.push(n[r] && n[r]._toString ? n[r]._toString.call(n[r]) : n[r]);

            t._log.apply(t, o);
          }(i, n);
        } catch (e) {
          if (console) {
            if (console.error) return void console.error(e);
            if (console.log) return void console.log(e);
          }

          throw e;
        }
      }

      function u() {
        if (!(wx.emedia._logContextIndex < 0) && wx.emedia._logContext && wx.emedia._logContext instanceof Array) {
          var e = wx.emedia._logContextIndex % wx.emedia._logContext.length,
              t = wx.emedia._logContext[e];
          t && t instanceof Array || (t = wx.emedia._logContext[e] = []);
          var i = [];
          i.push(wx.emedia._logContextIndex);
          var n,
              o = new Date();
          "function" == typeof o.toLocaleString ? i.push(o.toLocaleString()) : o.toJSON ? i.push(o.toJSON()) : o.toISOString ? i.push(o.toISOString()) : i.push(o + "");

          for (var r = 0; r < arguments.length; r++) {
            var s = arguments[r];
            "string" != typeof s ? s ? "string" != typeof s.message ? "function" != typeof s.message ? "string" != typeof s.stack ? s.event && "function" == typeof s.event.toString ? i.push(s.event.toString()) : s.event && "function" == typeof s.event.toString ? i.push(s.event.toString()) : "string" != typeof s.candidate ? "string" != typeof s.sdp ? isPlainObject(s) ? i.push(JSON.stringify(s)) : i.push(String(s)) : i.push(s.sdp) : i.push(s.candidate) : i.push(s.stack) : i.push(s.message()) : i.push(s.message) : i.push(s) : i.push(s);
          }

          if (wx.emedia.config.loglastStoreArray && t.push(n = i.join(" ")), "function" == typeof wx.emedia.config.onSdkLog) try {
            n || (n = i.join(" ")), wx.emedia.config.onSdkLog(n);
          } catch (e) {
            console.error(e);
          }
        }
      }

      function l() {
        try {
          u.apply(null, arguments);
        } catch (e) {
          console.warn(e);
        }
      }

      this._log = function () {
        var e = arguments[0];
        e = arguments[0] = c[e], wx.emedia._logContext && l.apply(null, arguments), !0 === wx.emedia.config.consoleLogger && (wx.emedia && wx.emedia.isElectron ? console.log.apply(console, arguments) : console && e && (console[e.toLowerCase()] || console.warn).apply(console, arguments));
      }, this.log = function () {
        this._log && d(o, arguments);
      }, this.trace = function () {
        this._log && d(i, arguments);
      }, this.debug = function () {
        this._log && d(n, arguments);
      }, this.info = function () {
        this._log && d(o, arguments);
      }, this.warn = function () {
        this._log && d(r, arguments);
      }, this.error = function () {
        this._log && d(s, arguments);
      }, this.fatal = function () {
        this._log && d(a, arguments);
      };
    };

    Logger.prototype.count = function () {
      if (wx.emedia._logContext) {
        wx.emedia._logContextIndex++;
        var e = wx.emedia._logContextIndex % wx.emedia._logContext.length;
        0 === e && 0 !== wx.emedia._logContextIndex && (wx.emedia._logContext.loadlogs = wx.emedia._logContext[e]), wx.emedia._logContext[e] = [];
      }
    }, Util.prototype.logger = new Logger(), Util.prototype.tagLogger = function (e) {
      return new Logger(e);
    }, Util.prototype.parseJSON = function (e) {
      return JSON.parse(e);
    };

    var stringifyJSON = Util.prototype.stringifyJSON = function (e) {
      return JSON.stringify(e);
    },
        class2type = {},
        toString = class2type.toString,
        hasOwn = class2type.hasOwnProperty,
        fnToString = hasOwn.toString,
        ObjectFunctionString = fnToString.call(Object),
        isPlainObject = Util.prototype.isPlainObject = function (e) {
      var t, i;
      return !(!e || "[object Object]" !== toString.call(e) || "<JSAPI-Auto Javascript Object>" === e.toString() || "[object IFBComJavascriptObject]" === e.toString()) && (!(t = Object.getPrototypeOf(e)) || "function" == typeof (i = hasOwn.call(t, "constructor") && t.constructor) && fnToString.call(i) === ObjectFunctionString);
    };

    Util.prototype.isArray = Array.isArray, Util.prototype.isEmptyObject = function (e) {
      var t;

      for (t in e) return !1;

      return !0;
    }, Util.prototype.type = function (e) {
      return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? class2type[toString.call(e)] || "object" : typeof e;
    }, Util.prototype.extend = function () {
      var e,
          t,
          i,
          n,
          o,
          r,
          s = this,
          a = arguments[0] || {},
          c = 1,
          d = arguments.length,
          u = !1;

      for ("boolean" == typeof a && (u = a, a = arguments[c] || {}, c++), "object" == typeof a || s.isFunction(a) || (a = {}), c === d && (a = this, c--); c < d; c++) if (null != (e = arguments[c])) for (t in e) i = a[t], a !== (n = e[t]) && (u && n && (s.isPlainObject(n) || (o = s.isArray(n))) ? (o ? (o = !1, r = i && s.isArray(i) ? i : []) : r = i && s.isPlainObject(i) ? i : {}, a[t] = s.extend(u, r, n)) : void 0 !== n && (a[t] = n));

      return a;
    }, Util.prototype.removeAttribute = function (e, t) {
      if (null != e) {
        var i = e[t];
        return delete e[t], i;
      }
    }, Util.prototype.prototypeExtend_000 = Util.prototype.classExtend = function () {
      var e,
          t = this;

      function i() {
        for (var e = 0; e < arguments.length; e++) {
          var i = arguments[e] || {};
          t.extend(!0, this, i);
        }

        this.__init__ && this.__init__.apply(this, arguments);
      }

      for (var n = 0; n < arguments.length; n++) {
        var o = arguments[n] || {};
        "function" == typeof o ? e ? (o.constructor = e, o.__proto__ = e.prototype) : e = o : t.extend(!0, i.prototype, o);
      }

      return e && (i.prototype.__proto__ = e.prototype), e && (i.prototype.constructor = e), i.extend || (i.extend = function (e) {
        return t.prototypeExtend(i, e);
      }), i;
    }, Util.prototype.prototypeExtend = Util.prototype.classExtend = function () {
      var e = this;

      function t() {
        for (var t = 0; t < arguments.length; t++) {
          var i = arguments[t] || {};
          e.extend(!0, this, i);
        }

        this.__init__ && this.__init__.apply(this, arguments);
      }

      for (var i = 0; i < arguments.length; i++) {
        var n = arguments[i] || {};
        "function" == typeof n && (n = n.prototype), e.extend(!0, t.prototype, n);
      }

      return t.extend || (t.extend = function (i) {
        return e.prototypeExtend(t, i);
      }), t;
    }, Util.prototype.hasLocalStorage = function (e) {
      return null != localStorage.getItem(e) && "{}" != localStorage.getItem(e);
    }, Util.prototype.toggleClass = function (e, t) {
      e.hasClass(t) ? e.removeClass(t) : e.addClass(t);
    }, Util.prototype.setCookie = function (e, t, i) {
      var n = new Date();
      n.setTime(n.getTime() + 60 * i * 60 * 1e3), document.cookie = e + "=" + escape(t) + ";expires=" + n.toGMTString();
    }, Util.prototype.getCookie = function (e) {
      var t = document.cookie.match(new RegExp("(^| )" + e + "=([^;]*)(;|$)"));
      return null != t ? unescape(t[2]) : null;
    }, Util.prototype.forEach = function (e, t) {
      if (e && !(this.isArray(e) && 0 === e.length || void 0 !== e.length && 0 === e.length)) if (e.length) for (var i = 0; i < e.length; i++) t(i, e[i]);else if (e && !this.isEmptyObject(e)) {
        e = e || {};
        var n = this.extend(!1, {}, e);

        for (var o in n) t(o, e[o]);
      }
    }, Util.prototype.isInt = function (e) {
      return Number(e) === e && e % 1 == 0;
    }, Util.prototype.isFloat = function (e) {
      return Number(e) === e && e % 1 != 0;
    }, Util.prototype.list = function () {
      var e = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments);
      return e;
    }, Util.prototype.addEvent = function (e, t, i) {
      if (e.attachEvent) return e.attachEvent("on" + t, i);
      if (e.addEventListener) return e.addEventListener(t, i, !1);
      throw "Handler could not be attached";
    }, Util.prototype.removeEvent = function (e, t, i) {
      if (e.detachEvent) return e.detachEvent("on" + t, i);
      if (e.removeEventListener) return e.removeEventListener(t, i, !1);
      throw "Handler could not be removed";
    }, Util.prototype.stopEvent = function (e) {
      e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0, e.preventDefault ? e.preventDefault() : e.returnValue = !1;
    }, Util.prototype.getDomPageRect = function (e) {
      var t = e.getBoundingClientRect();
      return {
        x: t.left + (wx.pageXOffset || wx.document.documentElement.scrollLeft),
        y: t.top + (wx.pageYOffset || wx.document.documentElement.scrollTop),
        width: t.width || e.offsetWidth,
        height: t.height || e.offsetHeight
      };
    }, Util.prototype.getEventElementXY = function (e, t, i) {
      var n,
          o,
          r = (e = e || wx.event).changedTouches ? e.changedTouches[0] : e.touches ? e.touches[0] : e;
      null != r.pageX && null != r.pageY ? (n = r.pageX, o = r.pageY) : null != r.clientX && null != r.clientY && (n = r.clientX + document.body.scrollLeft + document.documentElement.scrollLeft, o = r.clientY + document.body.scrollTop + document.documentElement.scrollTop);
      var s = this.getDomPageRect(t),
          a = n - s.x,
          c = o - s.y;
      return (0 === i || null == i) && (i = 1), {
        x: Math.round(Math.max(Math.min(a, s.width - 1), 0) / i),
        y: Math.round(Math.max(Math.min(c, s.height - 1), 0) / i),
        width: Math.round(s.width / i),
        height: Math.round(s.height / i),
        realX: a,
        realY: c
      };
    }, Util.prototype.targetDOM = "object" == typeof HTMLElement ? function (e) {
      return e instanceof HTMLElement;
    } : function (e) {
      return e && "object" == typeof e && 1 === e.nodeType && "string" == typeof e.nodeName;
    }, Util.prototype.cloneCSS = function (e, t) {
      var i = wx.getComputedStyle && wx.getComputedStyle(e, null) || e.currentStyle;

      for (var n in i) {
        var o = i[n];
        /^[a-z]/i.test(n) && [null, "", void 0].indexOf(o) < 0 && (t.style[n] = o);
      }
    }, Util.prototype.canYield = function () {
      try {
        return eval("!!Function('yield true;')().next()");
      } catch (e) {
        return !1;
      }
    }(), Util.prototype.getRtcId = function () {
      var e = "abcdefghijklmnopqrstuvwxyz".split(""),
          t = [];
      this.num || (this.num = 0), this.num++;

      for (var i = 0; i < 3; i++) t[i] = e[parseInt(Math.random() * e.length)];

      return "wx-" + this.num.toString() + "-" + t.join("");
    }, Util.prototype.fetch = function (e, t) {
      return new Promise(function (i, n) {
        wx.request({
          url: e || "",
          method: t.method || "GET",
          data: t.data || {},
          header: {
            "content-type": "application/json"
          },

          success(e) {
            i(e);
          },

          fail(e) {
            n(e);
          }

        });
      });
    }, module.exports = new Util();
  }, function (e, t, i) {
    var n = i(0),
        o = (n.logger, n.prototypeExtend({
      msg: "",
      __init__: function () {
        this.day = new Date();
      },
      execTime: function () {
        var e = this.day.getHours();
        e < 10 && (e = "0" + e);
        var t = this.day.getMinutes();
        t < 10 && (t = "0" + t);
        var i = this.day.getSeconds();
        return i < 10 && (i = "0" + i), e + ":" + t + ":" + i;
      }
    })),
        r = o.extend({
      _webrtcDesc: function () {
        this.webrtc;
        return this.webrtc.getRtcId();
      }
    });
    e.exports = {
      Exception: o.extend(),
      NetworkChanaged: o.extend({
        message: function () {
          return this.execTime() + " : Network chanage (" + this.preIp + " -> " + this.nowIp + ").";
        }
      }),
      WSClose: o.extend({
        message: function () {
          var e = this.execTime() + " WSClose: Websocket close (" + (this.retry || 0) + ").";
          return this.online || (e += " offline."), this.event && (e += " wscode: " + this.event.code), this.cause && (e += " cause: " + this.cause.message), this.url && (e += " url: " + this.url), e += " retry: " + (this.retry || 0), this.session && this.session.getSessionId() && (e = e + ", sess = " + this.session.getSessionId()), e;
        }
      }),
      WSError: o.extend({
        message: function () {
          var e = this.execTime() + " WSError: Websocket error. ready state:" + (this.event.srcElement && this.event.srcElement.readyState || this.event.currentTarget.readyState) + ". online = " + this.online;
          return this.session && this.session.getSessionId() && (e = e + ", sess = " + this.session.getSessionId()), this.url && (e += " url: " + this.url), e;
        }
      }),
      WSConnected: o.extend({
        message: function () {
          var e = this.execTime() + " WSConnected: Websocket success. ready state:" + (this.event.srcElement && this.event.srcElement.readyState || this.event.currentTarget.readyState);
          return this.session && this.session.getSessionId() && (e = e + ", sess = " + this.session.getSessionId()), e;
        }
      }),
      ICEChanage: r.extend({
        message: function () {
          return this.execTime() + " ICEChanage: " + this._webrtcDesc() + " state: " + this.state;
        }
      }),
      AddIceCandError: r.extend({
        message: function () {
          return this.execTime() + " AddIceCandError: " + this._webrtcDesc() + ", add cand error";
        }
      }),
      ICEConnectFail: r.extend({
        message: function () {
          return this.execTime() + " ICEConnectFail: " + this._webrtcDesc() + " failed";
        }
      }),
      ICEConnected: r.extend({
        message: function () {
          return this.execTime() + " ICEConnected: " + this._webrtcDesc() + " connected";
        }
      }),
      ICEDisconnected: r.extend({
        message: function () {
          return this.execTime() + " ICEDisconnected: " + this._webrtcDesc() + " disconnected";
        }
      }),
      ICEClosed: r.extend({
        message: function () {
          return this.execTime() + " ICEClosed: " + this._webrtcDesc() + " closed";
        }
      }),
      ICERemoteMediaStream: r.extend({
        message: function () {
          return this.execTime() + " ICERemoteMediaStream: " + this._webrtcDesc() + " got remote stream";
        }
      }),
      StreamState: o.extend({
        message: function () {
          return this.execTime() + " StreamState:  stream " + this.stream.id + " state: " + this.state + " " + this.msg;
        },
        iceFail: function () {
          this.state = 1, this.msg = "network anomaly. media lost";
        }
      }),
      OpenMediaError: o.extend({
        message: function () {
          return this.execTime() + " OpenMediaError:  open media error. caused by " + (this.event.name ? this.event.name : this.event.message ? this.event.message : this.event.toString());
        }
      }),
      Hangup: o.extend({
        message: function () {
          return this.self ? "hangup id = " + (this.self.id || "--") + " reason：" + (this.reason || 0) : this.execTime() + " Hangup: " + (this.parnter && (this.parnter.name || this.parnter.id || " ") || "") + " hangup, reason：" + (this.reason || 0);
        }
      }),
      ServerRefuseEnter: o.extend({
        message: function () {
          return this.execTime() + " ServerRefuseEnter: server refuse, cause：" + this.failed + ", msg:" + (this.msg || "");
        }
      }),
      RspFail: o.extend({
        __init__: function () {
          this.day = new Date(), this.failed = this.response.result, this.msg = this.response.msg || this.response.message || "--";
        },
        message: function () {
          return this.execTime() + " RspFail: " + this.request.tsxId + ", " + (this.response.sessId || "--") + " op: " + this.request.op + ", cause: " + this.failed + " " + this.msg;
        }
      }),
      RecvResponse: o.extend({
        __init__: function () {
          this.day = new Date(), this.failed = this.response.result, this.msg = this.response.msg;
        },
        message: function () {
          return this.request ? this.execTime() + " RecvResponse: " + (this.request && this.request.tsxId) + ", " + (this.response.sessId || "--") + " op: " + (this.request && this.request.op) + ", cause: " + this.failed + " " + this.msg : this.execTime() + " RecvMessage: " + (this.response && this.response.tsxId) + ", " + (this.response.sessId || "--") + " op: " + (this.response && this.response.op) + " " + this.msg;
        }
      }),
      EnterFail: o.extend({
        message: function () {
          return this.execTime() + " EnterFail: enter fail：" + (this.cause ? this.cause.message() : "unkown");
        }
      }),
      EnterSuccess: o.extend({
        message: function () {
          return this.execTime() + " EnterSuccess: enter success " + (this.ip ? ", ip = " + this.ip : "");
        }
      }),
      PushSuccess: o.extend({
        message: function () {
          return this.execTime() + " PushSuccess: push success, streamId = " + this.stream.id + ", " + this.stream.optimalVideoCodecs + ", webrtc = " + this.stream.rtcId;
        }
      }),
      PushFail: o.extend({
        message: function () {
          return this.execTime() + " PushFail: push fail, streamId = " + this.stream.id + ", " + this.stream.optimalVideoCodecs + ", webrtc = " + this.stream.rtcId + " cause：" + (this.cause ? this.cause.message ? this.cause.message() : this.cause : "unkown");
        }
      }),
      RemoteControlFail: o.extend({
        message: function () {
          return this.execTime() + " RemoteControlFail: " + (this.type || "remote control") + " fail, " + (this.stream ? this.stream.id : "") + " failed = " + this.failed + " cause：" + (this.cause ? this.cause.message ? this.cause.message() : this.cause : "unkown");
        }
      }),
      SubSuccess: o.extend({
        message: function () {
          return this.execTime() + " SubSuccess: sub success, streamId = " + this.stream.id + ", " + this.stream.vcodes + ", webrtc = " + this.stream.rtcId;
        }
      }),
      SubFail: o.extend({
        message: function () {
          return this.execTime() + " SubFail: sub fail, streamId = " + this.stream.id + ", " + this.stream.vcodes + ", webrtc = " + this.stream.rtcId + " cause：" + (this.cause ? this.cause.message ? this.cause.message() : this.cause : "unkown");
        }
      }),
      SubFailNotSupportVCodes: o.extend({
        message: function () {
          return this.execTime() + " SubFailNotSupportVCodes: sub fail, streamId = " + this.stream.id + " cause：" + (this.cause ? this.cause.message ? this.cause.message() : this.cause : "unkown");
        }
      }),
      SubFailSafariNotAllowSubBeforePub: o.extend({
        message: function () {
          return this.execTime() + " SubFailSafariNotAllowSubBeforePub: sub fail, streamId = " + this.stream.id + " cause：Safari without access to capture devices, WebKit only exposes Server Reflexive and TURN ICE candidates, which expose IPs that could already be gathered by websites.";
        }
      }),
      SwitchVCodes: o.extend({
        message: function () {
          return this.execTime() + " SwitchVCodes: pub streamId = " + this.stream.id;
        }
      }),
      CurrentCalling: o.extend({
        message: function () {
          return this.execTime() + " CurrentCalling: warn! current calling...";
        }
      }),
      OpenDesktopMedia: o.extend({
        message: function () {
          return this.execTime() + " OpenDesktopMedia: shared desktop, desktopStreamId = " + desktopStreamId;
        }
      }),
      OpenDesktopMediaAccessDenied: o.extend({
        message: function () {
          return this.execTime() + " OpenDesktopMediaAccessDenied: shared desktop not allow";
        }
      }),
      ShareDesktopExtensionNotFound: o.extend({
        message: function () {
          return this.execTime() + " ShareDesktopExtensionNotFound: shared desktop plugin required";
        }
      }),
      OtherDeviceAnswer: o.extend({
        message: function () {
          return this.execTime() + " other device answer, webrtc = " + this.rtcId;
        }
      }),
      AudioMixerStreamNotAllowSub: o.extend({
        message: function () {
          return this.execTime() + " audio mixer stream not allow sub, webrtc = " + this.rtcId + ", streamId = " + this.stream.id;
        }
      }),
      AudioMixerStreamNotAllowOnlySubVideo: o.extend({
        message: function () {
          return this.execTime() + " audio mixer stream not allow only sub video, webrtc = " + this.rtcId + ", streamId = " + this.stream.id;
        }
      }),
      AudioMixerStreamRepeatPublish: o.extend({
        message: function () {
          return this.execTime() + " audio mixer stream repeat publish";
        }
      })
    };
  }, function (e, t, i) {
    var n = i(0),
        o = n.tagLogger("mgr");
    wx.emedia = wx.emedia || {};

    var r = wx.emedia.config.apiURL || "https://a1-hsb.easemob.com",
        s = "/easemob/rtc/req/ticket",
        a = "/easemob/rtc/req/ticket",
        c = "/easemob/rtc/chanage/roles",
        d = "/easemob/rtc/disband/conference",
        u = "/easemob/rtc/kick/member",
        l = "/easemob/rtc/select/confr",
        f = function () {};

    function m() {
      this._confrs = {}, this._services = {}, this._events = {}, this._videos = {}, this.exitConference = function (e) {
        var t = this._services[e] || this._services[this._confrs.currentConf];
        t ? t.exit() : o.warn("when exit. not found service.", e);
      }, this.joinConferenceWithTicket = function (e, t, i) {
        var n = this;
        return new Promise(function (o, r) {
          var s = n._services[e] = new wx.emedia.XService();
          s.setup(t, i), s.join(function (e) {
            o(e);
          }, function (e) {
            r(e);
          });
        });
      }, this.joinConference = function (e, t, i) {
        var n = this;
        return this.getConferenceTkt(e, t).then(function (t) {
          let o = t.data.ticket || "";
          return n.joinConferenceWithTicket(e, o, i);
        });
      }, this.onMemberJoined = f, this.onMemberExited = f, this.onStreamAdded = f, this.onStreamRemoved = f, this.onRoleChanged = f, this.onConferenceExit = f;
    }

    m.prototype.ConfrType = {
      COMMUNICATION: 10,
      COMMUNICATION_MIX: 11,
      LIVE: 12,
      P2P: 13,
      INTERCOMM: 14
    }, m.prototype.Role = {
      ADMIN: 7,
      TALKER: 3,
      AUDIENCE: 1,
      HIDING: 9
    }, m.prototype._terminalInfo = {
      browser: wx.emedia.browser,
      browserVersion: wx.emedia.browserVersion,
      version: wx._emediaVersion || wx.emedia.config.version,
      userAgent: wx.emedia.config.userAgent
    }, m.prototype.createUrl = function (e, t) {
      return e;
    }, m.prototype.createConference = function (e, t, i, o) {
      var a = r + s,
          c = this,
          d = wx.WebIM.conn.context.accessToken || "",
          u = wx.WebIM.conn.context.jid.split("/")[0] || "";
      let l = {
        method: "POST",
        data: {
          supportWechatMiniProgram: !0,
          role: c.Role.HIDING,
          uid: u,
          token: d,
          confrType: e || "",
          password: t || "",
          terminal: c._terminalInfo,
          rec: i || "",
          recMerge: o || ""
        }
      };
      return n.fetch(a, l).then(function (e) {
        return e.data.mixed = 11 === e.data.type || 12 === e.data.type, e.data.id = e.data.serverConfrId = e.data.confrId, c._confrs[e.data.confrId] = e.data, c._confrs.currentConf = e.data.confrId, n.removeAttribute(e.data, "rtcCfg"), e;
      });
    }, m.prototype.getConferenceTkt = function (e, t) {
      var i = r + a,
          o = wx.WebIM.conn.context.accessToken || "",
          s = {
        method: "POST",
        data: {
          uid: wx.WebIM.conn.context.jid.split("/")[0] || "",
          token: o,
          confrId: e,
          password: t || "",
          role: this.Role.HIDING
        }
      };
      return n.fetch(i, s);
    }, m.prototype.subStream = function (e) {
      var t = this._videos.useUrl,
          i = {
        method: "POST",
        data: {
          op: "subS",
          streamId: e || ""
        }
      };
      return n.fetch(t, i);
    }, m.prototype.pubStream = function (e) {
      var t = this._videos.useUrl,
          i = {
        method: "POST",
        data: {
          op: "pubS",
          rtcId: e || ""
        }
      };
      return n.fetch(t, i);
    }, m.prototype.grantRole = function (e, t, i) {
      e = this._confr(e) || {};
      var o = r + c,
          s = {
        method: "POST",
        data: {
          uids: t,
          role: i,
          roleToken: e.roleToken
        }
      };
      return n.fetch(o, s);
    }, m.prototype.destroyConference = function (e) {
      var t = this._confr(e),
          i = r + d,
          o = {
        method: "POST",
        data: {
          roleToken: t && t.roleToken || roleToken
        }
      };

      return n.fetch(i, o);
    }, m.prototype.kickMembersById = function (e, t) {
      var i = this._confr(e),
          o = r + u,
          s = {
        method: "POST",
        data: {
          uids: t,
          roleToken: i.roleToken
        }
      };

      return n.fetch(o, s);
    }, m.prototype.getConferenceInfo = function (e, t) {
      var i = wx.WebIM.conn.context.accessToken || "",
          o = wx.WebIM.conn.context.jid.split("/")[0] || "",
          s = r + l,
          a = {
        method: "POST",
        data: {
          uid: o,
          token: i,
          confrId: e,
          password: t
        }
      };
      return n.fetch(s, a);
    }, e.exports = new m();
  }, function (e, t, i) {
    var n = i(0),
        o = n.tagLogger("Webrtc"),
        r = {},
        s = {
      headerSection: null,
      audioSection: null,
      videoSection: null,
      _parseHeaderSection: function (e, t, i) {
        var n = t;
        return -1 === i || (n = -1 === t ? i : Math.min(t, i)), n >= 0 ? e.slice(0, n) : e;
      },
      _parseAudioSection: function (e, t, i) {
        var n = t;
        if (n >= 0) return e.slice(n, i < n ? e.length : i);
      },
      _parseVideoSection: function (e, t, i) {
        var n = i;
        if (n >= 0) return e.slice(n, t < n ? e.length : t);
      },
      spiltSection: function (e) {
        this._preSDP = e;
        var t = this._preAudioIndex = e.indexOf("m=audio"),
            i = this._preVideoIndex = e.indexOf("m=video");
        this.headerSection = this._parseHeaderSection(e, t, i), this.audioSection = this._parseAudioSection(e, t, i), this.videoSection = this._parseVideoSection(e, t, i);
      },
      setVideoBitrate: function (e) {
        e && this.videoSection && (this.videoSection = this.setBitrate(this.videoSection, e));
      },
      setVideoMinBitrate: function (e) {
        this.setAllFmtpBitrate({
          "x-google-min-bitrate": e
        });
      },
      setVideoMaxBitrate: function (e) {
        this.setAllFmtpBitrate({
          "x-google-max-bitrate": e
        });
      },
      setVideoStartBitrate: function (e) {
        this.setAllFmtpBitrate({
          "x-google-start-bitrate": e
        });
      },
      setAllFmtpBitrate: function (e) {
        if (this.videoSection) {
          var t = {};
          Object.keys(e).forEach(function (i) {
            var n = i + "=" + e[i],
                o = new RegExp("(a=fmtp\\:\\d+\\s\\S*;?)(" + i + "=\\d+)(;?\\S*)", "g");
            t[i] = {
              field: n,
              regex: o
            };
          }), this.videoSection = this.videoSection.replace(/(a=fmtp\:\d+[^\r\n]+)([\r\n]+)/g, function (e, i, n) {
            return i.indexOf("apt=") >= 0 ? e : (Object.keys(t).forEach(function (e) {
              var n = t[e],
                  o = n.regex,
                  r = n.field,
                  s = i.replace(o, function (e, t, i, n) {
                return t + r + n;
              });
              s.indexOf(e) < 0 ? (s.endsWith(";") || (s += ";"), i = s + r) : i = s;
            }), i + n);
          });
        }
      },
      setFmtpBitrate: function (e, t) {
        if (t && this.videoSection) {
          var i = e + "=" + t,
              n = new RegExp("(a=fmtp\\:\\d+\\s\\S*;?)(" + e + "=\\d+)(;?\\S*)", "g");
          this.videoSection = this.videoSection.replace(/(a=fmtp\:\d+[^\r\n]+)([\r\n]+)/g, function (t, o, r) {
            var s = o.replace(n, function (e, t, n, o) {
              return t + i + o;
            });
            return s.indexOf(e) < 0 && (s.endsWith(";") || (s += ";"), s += i), s + r;
          });
        }
      },
      setAudioBitrate: function (e) {
        e && this.audioSection && (this.audioSection = this.setBitrate(this.audioSection, e));
      },
      setBitrate0: function (e, t) {
        return (e = e.replace(/(b=)(?:AS|TIAS)(\:)\d+/g, "$1AS$2" + t)).indexOf("b=AS") < 0 && (e = e.replace(/(m=(?:audio|video)[^\r\n]+)([\r\n]+)/g, "$1$2b=AS:" + t + "$2")), e;
      },
      setBitrate: function (e, t) {
        let i = "AS";
        return wx.emedia.isFirefox && (t = 1e3 * (t >>> 0), i = "TIAS"), (e = e.replace(/(b=)(?:AS|TIAS)(\:)\d+/g, "$1" + i + "$2" + t)).indexOf("b=" + i + ":") < 0 && (e = e.indexOf("c=IN ") < 0 ? e.replace(/(m=(?:audio|video)[^\r\n]+)([\r\n]+)/g, "$1$2b=" + i + ":" + t + "$2") : e.replace(/c=IN ([^\r\n]+)([\r\n]+)/, "c=IN $1$2b=" + i + ":" + t + "$2")), e;
      },
      updateVideoSection: function (e, t) {
        this.videoSection && (this.videoSection = this.videoSection.replace(e, t));
      },
      updateAudioSection: function (e, t) {
        this.audioSection && (this.audioSection = this.audioSection.replace(e, t));
      },
      updateVideoSendonly: function () {
        this.videoSection && (this.videoSection = this.videoSection.replace(/sendrecv/g, "sendonly"));
      },
      updateVideoRecvonly: function () {
        this.videoSection && (this.videoSection = this.videoSection.replace(/sendrecv/g, "recvonly"));
      },
      updateAudioSendonly: function () {
        this.audioSection && (this.audioSection = this.audioSection.replace(/sendrecv/g, "sendonly"));
      },
      updateAudioRecvonly: function () {
        this.audioSection && (this.audioSection = this.audioSection.replace(/sendrecv/g, "recvonly"));
      },
      updateACodes: function (e) {
        if (e && this.audioSection) {
          if ("string" == typeof e) (i = []).push(e), e = i;

          for (var t = {}, i = this._parseLine(this.audioSection, /a=rtpmap:(\d+) ([A-Za-z0-9]+)\/.*/gi), r = 0; r < i.length; r++) {
            var s = i[++r];
            t[i[++r]] = s;
          }

          var a = [];

          for (r = 0; r < e.length; r++) {
            var c = t[e[r]];
            c && a.push(c);
          }

          0 == a.length && (this._webrtc ? o.warn("Not found acodes map", e, this._webrtc._rtcId, this._webrtc.__id) : o.warn("Not found acodes map", e));
          var d = this.audioSection.indexOf("\r"),
              u = this.audioSection.substring(0, d),
              l = u.split(" ");
          Array.prototype.push.apply(a, l.slice(3));
          var f = [],
              m = {};
          n.forEach(a, function (e, t) {
            0 == f.length ? (f.push(t), m[t] = !0) : m[t] || (f.push(t), m[t] = !0);
          }), l.splice(3, l.length - 3, f.join(" ")), u = l.join(" "), this._webrtc && o.warn(u, this._webrtc._rtcId, this._webrtc.__id), this.audioSection = u + this.audioSection.substring(d);
        }
      },
      updateVCodes: function (e) {
        if (e && this.videoSection) {
          if ("string" == typeof e) (i = []).push(e), e = i;

          for (var t = {}, i = this._parseLine(this.videoSection, /a=rtpmap:(\d+) ([A-Za-z0-9]+)\/.*/gi), r = 0; r < i.length; r++) {
            var s = i[++r];
            t[i[++r]] = s;
          }

          var a = this._parseLine(this.videoSection, /a=fmtp:(\d+) .*profile-level-id=42e01f;?.*/gi);

          a && a.length >= 2 && (t.H264 = a[1]);
          var c = [];

          for (r = 0; r < e.length; r++) {
            var d = t[e[r]];
            d && c.push(d);
          }

          0 == c.length && (this._webrtc ? o.warn("Not found vcodes map", e, this._webrtc._rtcId, this._webrtc.__id) : o.warn("Not found vcodes map", e));
          var u = this.videoSection.indexOf("\r"),
              l = this.videoSection.substring(0, u),
              f = l.split(" ");
          Array.prototype.push.apply(c, f.slice(3));
          var m = [],
              h = {};
          n.forEach(c, function (e, t) {
            0 == m.length ? (m.push(t), h[t] = !0) : h[t] || (m.push(t), h[t] = !0);
          }), f.splice(3, f.length - 3, m.join(" ")), l = f.join(" "), this._webrtc && o.warn(l, this._webrtc._rtcId, this._webrtc.__id), this.videoSection = l + this.videoSection.substring(u);
        }
      },
      removeSSRC: function (e) {
        for (var t = [], i = e.split(/a=ssrc:[^\n]+/g), n = 0; n < i.length; n++) "\n" != i[n] && t.push(i[n]);

        return t.join("\n");
      },
      removeField_msid: function (e) {
        for (var t = [], i = e.split(/a=msid:[^\n]+/g), n = 0; n < i.length; n++) "\n" != i[n] && t.push(i[n]);

        e = t.join("\n"), t = [], i = e.split(/[\n]+/g);

        for (n = 0; n < i.length; n++) "\n" != i[n] && t.push(i[n]);

        return t.join("\n");
      },
      updateHeaderMsidSemantic: function (e) {
        var t = "a=msid-semantic: WMS " + e,
            i = this.headerSection.split(/a=msid\-semantic: WMS.*/g),
            n = [];

        switch (i.length) {
          case 1:
            n.push(i[0]);
            break;

          case 2:
            n.push(i[0]), n.push(t), n.push("\n");
            break;

          case 3:
            n.push(i[0]), n.push(t), n.push("\n"), n.push(i[2]), n.push("\n");
        }

        return this.headerSection = n.join("");
      },
      updateAudioSSRCSection: function (e, t, i, n) {
        this.audioSection && (this.audioSection = this.removeSSRC(this.audioSection)), this.audioSection && (this.audioSection = this.removeField_msid(this.audioSection)), this.audioSection && (this.audioSection = this.audioSection + this.ssrcSection(e, t, i, n));
      },
      updateVideoSSRCSection: function (e, t, i, n) {
        this.videoSection && (this.videoSection = this.removeSSRC(this.videoSection)), this.videoSection && (this.videoSection = this.removeField_msid(this.videoSection)), this.videoSection && (this.videoSection = this.videoSection + this.ssrcSection(e, t, i, n));
      },
      getUpdatedSDP: function (e) {
        var t, i, n;

        if (void 0 !== e && null != e || (e = this._preAudioIndex < this._preVideoIndex), this.videoSection && this.videoSection.replace(/a=mid:([^\r\n]+)/, function (e, i) {
          return t = i, e;
        }), this.audioSection && this.audioSection.replace(/a=mid:([^\r\n]+)/, function (e, t) {
          return i = t, e;
        }), e) {
          var o = ["a=group:BUNDLE"];
          this.audioSection && o.push(i), this.videoSection && o.push(t), n = this.headerSection.replace(/a=group:BUNDLE [^\r\n]+/, o.join(" ")), this.audioSection && (n += this.audioSection), this.videoSection && (n += this.videoSection);
        } else {
          o = ["a=group:BUNDLE"];
          this.videoSection && o.push(t), this.audioSection && o.push(i), n = this.headerSection.replace(/a=group:BUNDLE [^\r\n]+/, o.join(" ")), this.videoSection && (n += this.videoSection), this.audioSection && (n += this.audioSection);
        }

        return n;
      },
      parseMsidSemantic: function (e) {
        var t = this._parseLine(e, /a=msid\-semantic:\s*WMS (\S+)/gi);

        return t && 2 == t.length && (this.msidSemantic = {
          line: t[0],
          WMS: t[1]
        }), this.msidSemantic;
      },
      ssrcSection: function (e, t, i, n) {
        return ["a=ssrc:" + e + " cname:" + t, "a=ssrc:" + e + " msid:" + i + " " + n, "a=ssrc:" + e + " mslabel:" + i, "a=ssrc:" + e + " label:" + n, ""].join("\n");
      },
      parseSSRC: function (e) {
        var t = new RegExp("a=(ssrc):(\\d+) (\\S+):(\\S+)", "ig"),
            i = this._parseLine(e, t);

        if (i) {
          for (var n = {
            lines: [],
            updateSSRCSection: this.ssrcSection
          }, o = 0; o < i.length; o++) {
            var r = i[o];
            if (r.indexOf("a=ssrc") >= 0) n.lines.push(r);else switch (r) {
              case "ssrc":
              case "cname":
              case "msid":
              case "mslabel":
              case "label":
                n[r] = i[++o];
            }
          }

          return n;
        }
      },
      _parseLine: function (e, t) {
        for (var i, n = []; null != (i = t.exec(e));) for (var o = 0; o < i.length; o++) n.push(i[o]);

        if (n.length > 0) return n;
      }
    },
        a = function (e, t) {
      n.extend(this, s), this._webrtc = t, this.spiltSection(e);
    };

    a.isAudioVideo = function (e) {
      return e.indexOf("m=audio") < e.indexOf("m=video");
    }, a.isVideoPreAudio = function (e) {
      var t = e.indexOf("m=audio"),
          i = e.indexOf("m=video");
      return t >= 0 && i >= 0 && i < t;
    };
    var c = wx.emedia.__rtc_globalCount = 0,
        d = n.prototypeExtend({
      closed: !1,
      sdpConstraints: {
        mandatory: {
          OfferToReceiveAudio: !0,
          OfferToReceiveVideo: !0
        }
      },
      offerOptions: {
        offerToReceiveAudio: !0,
        offerToReceiveVideo: !0
      },
      optimalVideoCodecs: null,
      optimalAudioCodecs: null,
      __init__: function () {
        this._rtcId || (this._rtcId = "RTC" + c++), this.__id = "_i_" + c++, this.__setRemoteSDP = !1, this.__tmpRemoteCands = [], this.__tmpLocalCands = [], this._rtcPeerConnection = null, this.cctx = this.__id, wx.emedia && wx.emedia.config && wx.emedia.config.forceUseVideoCodecs && wx.emedia.config.forceUseVideoCodecs.length > 0 && (this.optimalVideoCodecs = wx.emedia.config.forceUseVideoCodecs), wx.emedia && wx.emedia.config && wx.emedia.config.forceUseAudioCodecs && wx.emedia.config.forceUseAudioCodecs.length > 0 && (this.optimalAudioCodecs = wx.emedia.config.forceUseAudioCodecs), wx.emedia && wx.emedia.config && "number" == typeof wx.emedia.config.forceVideoBitrate && (this.vbitrate = wx.emedia.config.forceVideoBitrate), wx.emedia && wx.emedia.config && "number" == typeof wx.emedia.config.forceMinVideoBitrate && (this.vminBitrate = wx.emedia.config.forceMinVideoBitrate), wx.emedia && wx.emedia.config && "number" == typeof wx.emedia.config.forceAudioBitrate && (this.abitrate = wx.emedia.config.forceAudioBitrate), o.info("Webrtc created. optimal video codecs:", this.optimalVideoCodecs, "audio codecs:", this.optimalAudioCodecs, "vbitrate:", this.vbitrate, "vminBitrate:", this.vminBitrate, "abitrate:", this.abitrate, this._rtcId, this.__id);
      },
      getRtcId: function () {
        return this._rtcId;
      },
      iceState: function () {
        return this._rtcPeerConnection.iceConnectionState;
      },
      setSubArgs: function (e) {
        this.subArgs = e;
      },
      getReceiversOfPeerConnection: function () {
        if (this._rtcPeerConnection && "closed" != this._rtcPeerConnection.iceConnectionState) return this._rtcPeerConnection.getReceivers();
      },
      updateRemoteBySubArgs: function () {
        this.subArgs && this._remoteStream && (wx.emedia.enableVideoTracks(this._remoteStream, !(this.subArgs && !1 === this.subArgs.subSVideo)), wx.emedia.enableAudioTracks(this._remoteStream, !(this.subArgs && !1 === this.subArgs.subSAudio)), o.info("enable tracks remote stream", this._remoteStream, this.subArgs, this._rtcId, this.__id, this.closed));
      },
      createRtcPeerConnection: function (e) {
        var t = this;
        o.debug("begin create peer connection ......", t._rtcId, t.__id, t.closed), e || (e = t.iceServerConfig), e || wx.emedia.isEdge ? (e || (e = {}), !e.iceServers && (e.iceServers = []), e.rtcpMuxPolicy = "require", e.bundlePolicy = "max-bundle", e.relayOnly && (e.iceTransportPolicy = "relay")) : e = null, wx.emedia && wx.emedia.config && "function" == typeof wx.emedia.config.reconfigRTCConfiguration && (e = wx.emedia.config.reconfigRTCConfiguration(e)), o.info("create pc, set config:", e, t._rtcId, t.__id, t.closed);
        var i = t._rtcPeerConnection = new RTCPeerConnection(e);

        function n(e) {
          o.info("states: connectionState", i.connectionState, ", iceConnectionState", i.iceConnectionState, "@", t._rtcId, t.__id, t.closed);

          try {
            var n = i.iceConnectionState || i.connectionState;
            "failed" != i.connectionState && "failed" != i.iceConnectionState || (n = "failed"), t.lastIceConnectionState !== n && (t.lastIceConnectionState = n, t.onIceStateChange(n));
          } finally {}
        }

        i.__peerId = t._rtcId, o.debug("created local peer connection object", i, t._rtcId), i.onicecandidate = function (e) {
          var i = e.candidate;

          if ("icecandidate" != e.type || i && ("string" != typeof i.protocol || "tcp" !== i.protocol.toLowerCase()) && !/ TCP /.test(i.candidate)) {
            if (!i.candidate) throw o.error("Not found candidate. candidate is error"), "Not found candidate. candidate is error,";
            if (i.cctx = t.cctx, !t.__setRemoteSDP) return (t.__tmpLocalCands || (t.__tmpLocalCands = {})).push(i), void o.debug("On ICE candidate ok: but tmp buffer caused by not set remote sdp: ", i, t._rtcId, t.__id, t.closed);
            o.debug("On ICE candidate ok: ", i, t._rtcId, t.__id, t.closed), t._onIceCandidate(i);
          } else o.debug("On ICE candidate: drop", i, t._rtcId, t.__id, t.closed);
        }, t.lastIceConnectionState = "", i.onconnectionstatechange = n.bind(t), i.onicestatechange = n.bind(t), i.oniceconnectionstatechange = n.bind(t), i.onsignalingstatechange = function (e) {
          o.info("states: signaling", i.signalingState, "@", t._rtcId, t.__id, t.closed);
        }, null === i.ontrack && t._onTrack && (i.ontrack = function (e) {
          t._onTrack(e);
        }), i.onaddstream = function (e) {
          console.log("zhui 5"), t._onGotRemoteStream(e);
        };
      },
      addTrack: function (e, t) {
        var i = this;
        e.forEach(function (e) {
          i._rtcPeerConnection.addTrack(e, t), o.debug("Added track(", e.id, e.kind, e.label, ") of stream(", t.id, ") to RtcPeerConnection", i._rtcId, i.__id, i.closed);
        });
      },
      setLocalStream: function (e) {
        var t = this;
        if (t._localStream = e, t._rtcPeerConnection.addTrack) e.getTracks().forEach(function (i) {
          t._rtcPeerConnection.addTrack(i, e), o.debug("Added track(", i.enabled, i.id, i.kind, i.label, ") of localStream(", e.id, ") to RtcPeerConnection", t._rtcId, t.__id, t.closed);
        });else {
          t._rtcPeerConnection.addStream(e);

          var i = e.getVideoTracks(),
              n = e.getAudioTracks();
          i && i.length > 0 && o.debug("RtcPeerConnection video: ", i[0].enabled, i[0].id, i[0].kind, i[0].label, t._rtcId, t.__id, t.closed), n && n.length > 0 && o.debug("RtcPeerConnection audio: ", n[0].enabled, n[0].id, n[0].kind, n[0].label, t._rtcId, t.__id, t.closed);
        }
        o.debug("Added local stream to RtcPeerConnection", e.id, e.active, t._rtcId, t.__id, this.closed);
      },
      removeStream: function (e) {
        this._rtcPeerConnection.removeStream(e), o.debug("Remove stream from RtcPeerConnection", e, self._rtcId, self.__id, this.closed);
      },
      getLocalStream: function () {
        return this._localStream;
      },
      getRemoteStream: function () {
        return this._remoteStream;
      },
      createOffer: function (e, t) {
        var i = this;
        o.debug("createOffer start...", i.offerOptions, i._rtcId, i.__id);
        var r = n.extend({}, i.offerOptions);
        return i.subArgs && (r = {
          offerToReceiveAudio: !0,
          offerToReceiveVideo: !0
        }), i._rtcPeerConnection.createOffer(r).then(function (t) {
          if (i.offerDescription = t, wx.emedia.isEdge && (t.sdp = t.sdp.replace(/profile-level-id=[^;]+/, "profile-level-id=42e01f")), wx.emedia.isFirefox ? i.fireFoxOfferVideoPreAudio = i.__offerVideoPreAudio = a.isVideoPreAudio(t.sdp) : i.__offerVideoPreAudio = a.isVideoPreAudio(t.sdp), t.sdp = t.sdp.replace(/m=video 0/g, "m=video 9"), o.warn("setLocalDescription. modify offer. if 'm=video 0' -> 'm=video 9'; if H264, 'profile-level-id=42e01f'", i._rtcId, i.__id), i.optimalVideoCodecs && i.optimalVideoCodecs.length > 0 || i.optimalAudioCodecs && i.optimalAudioCodecs.length > 0 || i.offerOptions && (!1 === i.offerOptions.offerToReceiveVideo || !1 === i.offerOptions.offerToReceiveAudio)) {
            var n = new a(t.sdp, i);
            i.optimalVideoCodecs && n.updateVCodes(i.optimalVideoCodecs), i.optimalAudioCodecs && n.updateACodes(i.optimalAudioCodecs), i.offerOptions && !1 === i.offerOptions.offerToReceiveVideo && n.updateVideoSection(/a=sendrecv|a=recvonly/g, "a=sendonly"), i.offerOptions && !1 === i.offerOptions.offerToReceiveAudio && n.updateAudioSection(/a=sendrecv|a=recvonly/g, "a=sendonly"), t.sdp = n.getUpdatedSDP();
          }

          o.debug("setLocalDescription start", i._rtcId, i.__id, i.closed, i.optimalVideoCodecs, i.optimalAudioCodecs), i._rtcPeerConnection.setLocalDescription(t).then(i._onSetLocalSessionDescriptionSuccess.bind(i), i._onSetSessionDescriptionError.bind(i, t)).then(function () {
            t.cctx = i.cctx, (e || i.onCreateOfferSuccess.bind(i))(t);
          });
        }, t || i._onCreateSessionDescriptionError.bind(i, r));
      },
      createPRAnswer: function (e, t) {
        var i = this;
        return o.info(" createPRAnswer start", i.closed, i.sdpConstraints), i._rtcPeerConnection.createAnswer(i.sdpConstraints).then(function (t) {
          o.debug("_____________PRAnswer ", t.sdp, i._rtcId, i.__id, i.closed), t.type = "pranswer", t.sdp = t.sdp.replace(/a=recvonly/g, "a=inactive");
          var n = new a(t.sdp, i);
          i.optimalVideoCodecs && n.updateVCodes(i.optimalVideoCodecs), i.optimalAudioCodecs && n.updateACodes(i.optimalAudioCodecs), t.sdp = n.getUpdatedSDP(), i.__prAnswerDescription = t, o.debug("inactive PRAnswer ", t.sdp, i._rtcId, i.__id, i.closed), o.debug("setLocalDescription start", t, i._rtcId, i.__id, i.closed), i._rtcPeerConnection.setLocalDescription(t).then(i._onSetLocalSessionDescriptionSuccess.bind(i), i._onSetSessionDescriptionError.bind(i, t)).then(function () {
            n.updateHeaderMsidSemantic("MS_0000"), n.updateAudioSSRCSection(1e3, "CHROME0000", "MS_0000", "LABEL_AUDIO_1000"), n.updateVideoSSRCSection(2e3, "CHROME0000", "MS_0000", "LABEL_VIDEO_2000"), t.sdp = n.getUpdatedSDP(), o.debug("Send PRAnswer ", t.sdp, i._rtcId, i.__id, i.closed), i.cctx && (t.cctx = i.cctx), (e || i.onCreatePRAnswerSuccess.bind(i))(t);
          });
        }, t || i._onCreateSessionDescriptionError.bind(i, i.sdpConstraints));
      },
      createAnswer: function (e, t) {
        var i = this;
        return o.info("createAnswer start", i.closed, i.sdpConstraints), i._rtcPeerConnection.createAnswer(i.sdpConstraints).then(function (t) {
          o.debug("_____________________Answer ", i._rtcId, i.__id, i.closed), t.type = "answer";
          var n = new a(t.sdp, i);
          i.optimalVideoCodecs && n.updateVCodes(i.optimalVideoCodecs), i.optimalAudioCodecs && n.updateACodes(i.optimalAudioCodecs), wx.emedia.supportPRAnswer ? function (e) {
            var i = e.parseMsidSemantic(e.headerSection);

            if (i) {
              "*" == i.WMS && e.updateHeaderMsidSemantic(i.WMS = "MS_0000");
              var n = e.parseSSRC(e.audioSection),
                  o = e.parseSSRC(e.videoSection);
              n && e.updateAudioSSRCSection(1e3, "CHROME0000", i.WMS, n.label || "LABEL_AUDIO_1000"), o && e.updateVideoSSRCSection(2e3, "CHROME0000", i.WMS, o.label || "LABEL_VIDEO_2000"), t.sdp = e.getUpdatedSDP();
            }
          }(n) : t.sdp = n.getUpdatedSDP(), i.__answerDescription = t, o.debug("Answer ", i._rtcId, i.__id, i.closed), o.debug("setLocalDescription start", t, i._rtcId, i.__id, i.closed), i._rtcPeerConnection.setLocalDescription(t).then(i._onSetLocalSessionDescriptionSuccess.bind(i), i._onSetSessionDescriptionError.bind(i, t)).then(function () {
            wx.emedia.supportPRAnswer && (n.updateHeaderMsidSemantic("MS_0000"), n.updateAudioSSRCSection(1e3, "CHROME0000", "MS_0000", "LABEL_AUDIO_1000"), n.updateVideoSSRCSection(2e3, "CHROME0000", "MS_0000", "LABEL_VIDEO_2000"), t.sdp = n.getUpdatedSDP()), o.debug("Send Answer ", i._rtcId, i.__id, i.closed), i.cctx && (t.cctx = i.cctx), (e || i.onCreateAnswerSuccess.bind(i))(t);
          });
        }, t || i._onCreateSessionDescriptionError.bind(i, i.sdpConstraints));
      },
      _printStats: function (e) {
        var t = this;
        t.confrAttendee && wx.emedia.config.remainLastStatsCount && e && e.getTracks().forEach(function (e) {
          t._printTrackStats(e);
        });
      },
      _printTrackStats: function (e) {
        if (this.confrAttendee && wx.emedia.config.remainLastStatsCount) {
          var t = this.confrAttendee._trackStats && this.confrAttendee._trackStats[e.id];

          if (t) {
            for (var i in t) {
              var r = t[i];

              for (var s in r) {
                var a = r[s];
                if (a) for (var c = a.curIndex, d = 0; d < wx.emedia.config.remainLastStatsCount; d++) {
                  var u = a[c = (c - 1) % wx.emedia.config.remainLastStatsCount];
                  if (!u || void 0 === u.data) break;
                  o.info("[track]", this._rtcId, this.__id, e.kind, e.id, i, s, u.data, u.timestamp.toLocaleString());
                }
              }
            }

            n.removeAttribute(this.confrAttendee._trackStats, e.id);
          }
        }
      },
      close: function (e, t, i) {
        var n = this;

        if (o.warn("webrtc closing", n._rtcId, n.__id, n.closed), n.__iceWaitIntervalId && clearTimeout(n.__iceWaitIntervalId), !n.closed) {
          t = !0 === t, n.closed = !0;

          try {
            var r = n._localStream,
                s = n._remoteStream;

            function a() {
              if (n._rtcPeerConnection && n._rtcPeerConnection.close(), o.info("peer connection close. it is", n._rtcPeerConnection && n._rtcPeerConnection.__peerId), !i && wx.emedia.isSafari) {
                n._rtcPeerConnection.iceConnectionState || n._rtcPeerConnection.connectionState;
                setTimeout(function () {
                  n._rtcPeerConnection.iceConnectionState || n._rtcPeerConnection.connectionState;
                  n.onIceStateChange && n.onIceStateChange("closed");
                }, 200);
              }
            }

            wx.emedia.config.printStatsWhenPCClose ? n.getStats(() => {
              a(), r && n._printStats(r), s && n._printStats(s);
            }) : a();
          } catch (e) {
            o.warn(e);
          } finally {
            n._localStream && !1 === e && wx.emedia.stopTracks(n._localStream), n._remoteStream && wx.emedia.stopTracks(n._remoteStream), n._remoteStream = null, t || n.onClose && n.onClose(), !0 === i && (o.info("Webrtc close. but retry build. will onIceStateChange(failed). eg. wx.emedia.config iceWaitBuildMillis", n._rtcId, n.__id), n.onIceStateChange && n.onIceStateChange("failed")), o.warn("webrtc closed. closed:", n._rtcId, n.__id, n.closed);
          }
        }
      },
      addIceCandidate: function (e) {
        var t = n.isArray(e) ? e : [e];

        if (emedia && wx.emedia.config && "function" == typeof wx.emedia.config.reChanageCandidate) {
          for (var i = [], r = 0; r < t.length; r++) {
            e = t[r];
            var s = wx.emedia.config.reChanageCandidate(e);
            s && (o.info("Candidate rechanage. addons. it =", e, "->", s), n.isArray(s) ? Array.prototype.push.apply(i, s) : i.push(s));
          }

          t = i;
        }

        this._addIceCandidate(t);
      },
      _addIceCandidate: function (e) {
        if (this._rtcPeerConnection) {
          o.debug("Add ICE candidate: ", e, this._rtcId, this.__id, this.closed);
          var t = n.isArray(e) ? e : [e]; //!_util.isArray(candidate) && _cands.push(candidate);

          if (!this.__setRemoteSDP) return Array.prototype.push.apply(this.__tmpRemoteCands || (this.__tmpRemoteCands = {}), t), void o.debug("Add ICE candidate but tmp buffer caused by not set remote sdp: ", e, this._rtcId, this.__id, this.closed);

          for (var i = 0; i < t.length; i++) if ((e = t[i]).cctx && e.cctx != this.cctx) o.warn("addIceCandidate fail drop. cctx not equal. ", e, this._rtcId, this.__id, this.closed);else {
            if (!0 === this.fireFoxOfferVideoPreAudio) {
              var r = e.sdpMLineIndex;
              e.sdpMLineIndex = parseInt(e.sdpMid.replace(/[^0-9]*/, "")), o.warn("Firefox sdp section video pre audio, sdp mline index update ", r, "->", e.sdpMLineIndex);
            }

            e.candidate && "" !== e.candidate ? this._rtcPeerConnection.addIceCandidate(new RTCIceCandidate(e)).then(this.onAddIceCandidateSuccess.bind(this), this._onAddIceCandidateError.bind(this, e)) : o.warn("Add ICE candidate fail. drop it ", e, this._rtcId, this.__id, this.closed);
          }
        }
      },
      setRemoteDescription: function (e) {
        return this._setRemoteDescription(e);
      },
      _setRemoteDescription: function (e) {
        var t = this;

        if (t.__iceWaitIntervalId && (clearTimeout(t.__iceWaitIntervalId), t.__iceWaitIntervalId = null, o.info("wx.emedia.config iceWaitBuildMillis, clear ice wait interval id", t._rtcId, t.__id)), o.debug("setRemoteDescription start. ", t._rtcId, t.__id, t.closed), t.offerDescription) {
          if (e.cctx && e.cctx != t.cctx) return void o.warn("setRemoteDescription fail drop. cctx not equal. ", e, t._rtcId, t.__id, t.closed);

          if (!0 === t.fireFoxOfferVideoPreAudio || !0 === t.__offerVideoPreAudio) {
            var i = new a(e.sdp, t);
            e.sdp = i.getUpdatedSDP(!1), o.info("Remote sdp.2. switch audio video", e.sdp);
          }
        } else e.cctx && (t.cctx = e.cctx);

        if (e.sdp = e.sdp.replace(/UDP\/TLS\/RTP\/SAVPF/g, "RTP/SAVPF"), o.warn("setRemoteDescription. UDP/TLS/RTP/SAVPF -> RTP/SAVPF; if firefox: switch audio video;", t._rtcId, t.__id), t.vbitrate || t.abitrate || t.vminBitrate) {
          i = new a(e.sdp, t);
          t.vbitrate && i.setVideoBitrate(t.vbitrate), t.vminBitrate && i.setVideoMinBitrate(t.vminBitrate), t.abitrate && i.setAudioBitrate(t.abitrate), o.warn("vbitrate = ", t.vbitrate, "vminBitrate = ", this.vminBitrate, ", abitrate = ", t.abitrate, t._rtcId, t.__id), e.sdp = i.getUpdatedSDP(void 0 === t.__offerVideoPreAudio || null === t.__offerVideoPreAudio ? void 0 : !t.__offerVideoPreAudio);
        }

        return o.debug("final remote sdp =", e.sdp, t._rtcId, t.__id), e = t.__remoteDescription = new RTCSessionDescription(e), t._rtcPeerConnection.setRemoteDescription(e).then(function () {
          t.__setRemoteSDP = !0, t._onSetRemoteSuccess.apply(t, arguments), t.__tmpLocalCands && t.__tmpLocalCands.length > 0 && (o.debug("After setRemoteDescription. send cands", t._rtcId, t.__id, t.closed), t._onIceCandidate(t.__tmpLocalCands), t.__tmpLocalCands = []), t.__tmpRemoteCands && t.__tmpRemoteCands.length > 0 && (o.debug("After setRemoteDescription. add tmp cands", t._rtcId, t.__id, t.closed), t._addIceCandidate(t.__tmpRemoteCands), t.__tmpRemoteCands = []);
        }, t._onSetSessionDescriptionError.bind(t, e));
      },
      iceConnectionState: function () {
        return this._rtcPeerConnection.iceConnectionState;
      },
      isConnected: function () {
        var e = this.lastIceConnectionState;
        return "connected" === e || "completed" === e;
      },
      _onGotRemoteStream: function (e) {
        var t = this;
        t._remoteStream = e.stream || e.streams[0], t._remoteStream._rtcId = t._rtcId, t._remoteStream.__rtc_c_id = t.__id, o.debug("On got remote stream", t._remoteStream ? t._remoteStream.id + "_" + t._remoteStream.active : "null", t._rtcId, t.__id), t._remoteStream && t._remoteStream.getTracks().forEach(function (e) {
          o.debug("remote stream", t._remoteStream.id, " track =", e.enabled, e.id, e.kind, e.label, t._rtcId, t.__id);
        }), t.updateRemoteBySubArgs(), this.onGotRemoteStream(this._remoteStream, e), o.debug("received remote stream, you will see the other.", t._rtcId, t.__id, this.closed);
      },
      _onSetRemoteSuccess: function () {
        o.info("onSetRemoteSuccess success", this._rtcId, this.__id), this.onSetRemoteSuccess.apply(this, arguments), this.offerDescription && this.__remoteDescription && this.__remoteDescription.sdp && this._onAnswerCodes(this.__remoteDescription.sdp);
      },
      _onAnswerCodes: function (e) {
        var t = new a(e, this);

        if (t.videoSection) {
          var i = r.parseRtpParameters(t.videoSection);
          if (!i.codecs || 0 === i.codecs.length) return void o.info("not found any video codes. @ ", this._rtcId, this.__id);
          var s = [];
          n.forEach(i.codecs, function (e, t) {
            s.push(t.name);
          }), this.finalVCodeChoices = s, this.onVCodeChoices && this.onVCodeChoices(s);
        }
      },
      onSetRemoteSuccess: function () {},
      onAddIceCandidateSuccess: function () {
        o.debug("addIceCandidate success", this._rtcId, this.__id);
      },
      _onAddIceCandidateError: function (e, t) {
        o.error("failed to add ICE Candidate: " + t.toString(), ", error candidate:", e, this._rtcId, this.__id), this.onAddIceCandidateError(t);
      },
      onAddIceCandidateError: function (e) {},
      _onIceCandidate: function (e) {
        o.debug("onIceCandidate:", e, this._rtcId, this.__id), this.onIceCandidate(e);
      },
      onIceCandidate: function (e) {},
      onIceStateChange: function (e) {
        o.debug("onIceStateChange : ICE state ", e);
      },
      _onCreateSessionDescriptionError: function (e, t) {
        o.error("Failed to create session description: " + t.toString(), " offerOptionsOrSDPConstraints:", e, this._rtcId, this.__id), this.onCreateSessionDescriptionError(t);
      },
      onCreateSessionDescriptionError: function (e) {},
      onCreateOfferSuccess: function (e) {
        o.debug("create offer success", this._rtcId, this.__id);
      },
      onCreatePRAnswerSuccess: function (e) {
        o.debug("create answer success", this._rtcId, this.__id);
      },
      onCreateAnswerSuccess: function (e) {
        o.debug("create answer success", this._rtcId, this.__id);
      },
      _onSetSessionDescriptionError: function (e, t) {
        o.error("onSetSessionDescriptionError : Failed to set session description: ", t.toString(), this._rtcId, this.__id), e && e.type && e.sdp && o.error("error sdp: type=", e.type, "sdp=", e.sdp, this._rtcId, this.__id), this.onSetSessionDescriptionError(t);
      },
      onSetSessionDescriptionError: function (e) {},
      _onSetLocalSessionDescriptionSuccess: function () {
        var e = this;
        o.debug("onSetLocalSessionDescriptionSuccess : setLocalDescription complete", this._rtcId, this.__id), wx.emedia.config.iceWaitBuildMillis && (this.__iceWaitIntervalId && clearTimeout(this.__iceWaitIntervalId), this.__iceWaitIntervalId = setTimeout(function () {
          o.info("wx.emedia.config iceWaitBuildMillis, timeout, will close webrtc, will retry build by onIceStateChange(failed)", e._rtcId, e.__id), e.onIceStateChange && e.onIceStateChange("failed");
        }, wx.emedia.config.iceWaitBuildMillis), o.info("wx.emedia.config iceWaitBuildMillis, start timeout", e._rtcId, e.__id)), this.onSetLocalSessionDescriptionSuccess(), this.__answerDescription && this.__answerDescription.sdp && this._onAnswerCodes(this.__answerDescription.sdp);
      },
      onSetLocalSessionDescriptionSuccess: function () {},
      onGotRemoteStream: function (e) {
        console.log("zhui 7"), o.debug("Got remote stream. ", e, this._rtcId, this.__id);
      },
      getStats: function (e) {
        var t = this;
        return t._rtcPeerConnection ? "function" != typeof wx.emedia.config.rtcStatsTypeMath ? (o.warn("Get stats, but config rtcStatsTypeMather, ", this._rtcId, this.__id), void (e && e())) : void t._rtcPeerConnection.getStats(null).then(function (i) {
          i.forEach(function (e, i) {
            wx.emedia.config.rtcStatsTypeMath(e, i) && o.info("Rtc stats", e, t._rtcId, t.__id);
          }), e && e(i);
        }) : (o.warn("Get stats, but peer connection not exsits, ", this._rtcId, this.__id), void (e && e()));
      }
    });
    e.exports = d;
  }, function (e, t, i) {
    var n = i(0);

    wx.emedia.subscribed = function (e) {
      return !!e._located || (2 === e.type ? !(e._located || !e._webrtc) : void 0 !== e._webrtc);
    };

    var o = n.prototypeExtend({
      voff: 0,
      aoff: 0,
      __init__: function () {
        var e = this;
        if (!e._mediaStream) throw _logger.error("_mediaStream empty"), "_mediaStream empty";

        if (e.hasEnabledTracks(e._mediaStream)) {
          if (!e.__audioContext) throw _logger.error("require audioContext"), "require audioContext";
          e.__soundMeter = new SoundMeter(e.__audioContext), e.__soundMeter.connectToSource(e._mediaStream, function (t) {
            if (t) throw t;
            e.__worked = e.__soundMeter.__worked = !0;
          });
        }
      },
      hasEnabledTracks: function (e) {
        return wx.emedia.hasEnabledTracks(e);
      },
      getSoundMeters: function () {
        if (this.__soundMeter && this.__worked) if (this._mediaStream.active) {
          if (this.hasEnabledTracks(this._mediaStream)) return {
            instant: this.__soundMeter.instant,
            slow: this.__soundMeter.slow,
            clip: this.__soundMeter.clip
          };
        } else this.__worked && this._finally();
      },
      _finally: function () {
        this.__soundMeter && (this.__soundMeter.stop(), this.__worked = this.__soundMeter.__worked = !1);
      }
    });
    e.exports = n.prototypeExtend({
      __undefinedEQDelete: !0,
      Update: n.prototypeExtend({
        ifAoff: function (e) {
          this.if("aoff", e);
        },
        ifVoff: function (e) {
          this.if("voff", e);
        },
        ifMediaStream: function (e) {
          this.if("mediaStream", e);
        },
        if: function (e, t) {
          void 0 !== this[e] && t(this[e]);
        }
      }),
      located: function () {
        return this._located || !1;
      },
      webrtc: function (e) {
        return e && (this._webrtc = e), this;
      },
      getMediaStream: function () {
        return void 0 !== this.mediaStream ? this.mediaStream : this._located ? this._localMediaStream : this._webrtc && (this._webrtc.getRemoteStream() || this._webrtc.getLocalStream());
      },
      requestFrame: function () {
        this._localMediaStream && this._localMediaStream.getVideoTracks().forEach(function (e) {
          "function" == typeof e.requestFrame && e.requestFrame();
        });
      },
      getLocalMediaStream: function () {
        return this._localMediaStream;
      },
      getRemoteMediaStream: function () {
        if (this._webrtc && void 0 !== this._webrtc.getRemoteStream()) return this._webrtc.getRemoteStream();
      },
      mutedNeed: function () {
        return this.mutedMuted || !1;
      },
      ifMediaStream: function (e) {
        void 0 === this.mediaStream ? this._located && void 0 !== this._localMediaStream ? e(this._localMediaStream) : this._located || !this._webrtc || void 0 === this._webrtc.getRemoteStream() || e(this._webrtc.getRemoteStream()) : e(this.mediaStream);
      },
      subscribed: function () {
        return wx.emedia.subscribed(this);
      },
      updateAttributes: function () {
        for (var e = this, t = 0; t < arguments.length; t++) {
          var i = arguments[t];
          if (n.isPlainObject(i)) for (var o in i) {
            var r = i[o];
            e[o] = r;
          }
        }
      },
      getHtmlDOMID: function () {
        return "_m_" + this.owner.id + "_s_" + this.id;
      },
      MediaSoundMeter: o,
      StreamSoundMeter: n.prototypeExtend({
        __init__: function () {
          if (!this._stream || "function" != typeof this._stream.getMediaStream) throw _logger.error("_stream empty or not found method getMediaStream"), "_stream empty or not found method getMediaStream";
          if (this._streamId = this._stream.id, this._streamCreateId = this._stream.__create_id, this._mediaStream = this._mediaStream, 2 === this._stream.type && !this._stream.located() && !this._webrtc) throw _logger.error("require webrtc. when type = 2 and not located"), "require webrtc. when type = 2 and not located";
          this.__mediaSoundMeter = this.__mediaSoundMeter || new o({
            __audioContext: this.__audioContext,
            _mediaStream: this._mediaStream
          }), this.__mediaSoundMeter.useCount = (this.__mediaSoundMeter.useCount || 0) + 1;
        },
        onSoundMeters: function (e) {
          var t = {
            instant: 0,
            slow: 0,
            clip: 0
          };
          if (this._stream.aoff) return this._finally(), e(t), t;
          if (2 !== this._stream.type && this._stream.subArgs && void 0 !== this._stream.subArgs.subSAudio && !this._stream.subArgs.subSAudio) return this._finally(), e(t), t;

          if (0 == this._stream.id || 2 === this._stream.type && !this._stream.located() && (!this._stream.subArgs || !this._stream.subArgs.subSAudio)) {
            var i,
                o = this._webrtc.getReceiversOfPeerConnection();

            if (!o || 0 === o.length) return e(t), t;

            for (var r in o) "audio" === o[r].track.kind && (i = o[r]);

            if (!i) return e(t), t;

            if ("function" == typeof i.getContributingSources) {
              var s,
                  a = i.getContributingSources();
              if (wx.emedia.config._printSoundData && n.logger.debug(this._stream.id, this._stream.csrc, "rtpContributingSources ", a), !a || 0 === a.length) return e(t), t;

              for (var r in a) a[r].source == this._stream.csrc && (s = this._stream.csrc);

              if (wx.emedia.config._printSoundData && n.logger.debug(this._stream.id, this._stream.csrc, "source ", s), void 0 === s) return e(t), t;
            }
          }

          var c = this.__mediaSoundMeter.getSoundMeters() || t,
              d = 2 === this._stream.type ? this._webrtc : this._stream._webrtc;
          (wx.emedia.meterWithTrackAudioLevel || 0 === c.instant) && d && !d.closed && d._rtcPeerConnection && d._rtcPeerConnection.getStats().then(function (t) {
            t.size > 0 && t.forEach(function (t) {
              "track" !== t.type || "audio" !== t.kind && "audio" !== t.trackIdentifier || (c.trackAudioLevel = t.audioLevel, c.trackTotalAudioEnergy = t.totalAudioEnergy, e(c));
            });
          }), e(c);
        },
        _finally: function () {
          2 === this._stream.type && this._stream.located() && this._remoteMediaSoundMeters && this._remoteMediaSoundMeters._finally(), this.__mediaSoundMeter.useCount--, 0 === this.__mediaSoundMeter.useCount && this.__mediaSoundMeter._finally();
        }
      })
    });
  }, function (e, t, i) {
    var n = wx.emedia = {},
        o = wx.emedia.util = i(0);

    if (wx.emedia.config = function (e) {
      for (var t in e = o.extend({}, e)) wx.emedia.config[t] = e[t], "logLevel" === t && (wx.emedia.LOG_LEVEL = e[t]);

      wx.emedia.config.loglastConfrCount && !wx.emedia._logContext && (wx.emedia._logContext = new Array(wx.emedia.config.loglastConfrCount), wx.emedia._logContextIndex = -1);
    }, wx.emedia.config({
      autoSub: !0,
      onlyEnter: !1,
      reconnect: 13,
      reconnectDelay: 3e3,
      getCopyIntervalMillis: 3e4,
      checkConnectIntervalMillis: 1e3,
      iceRebuildCount: 3,
      iceRebuildIntervalMillis: 500,
      enterTimeout: 2e4,
      useRTCCfgIfServerReturn: !1,
      forceUseRTCCfgIfServerReturnWhenP2P: !0,
      allowRepeatAudioMixerPublish: !1,
      logVolumeWhenInstantGE: .5,
      getMediaMeterIntervalMillis: 400,
      _useRequestAnimationFrame: !1,
      meterWithTrackAudioLevel: !1,
      judgeTalkingByInstantGE: .05,
      _printSoundData: !1,
      trackBufferSize: 20,
      allowSendWhenLessThan: 4,
      disableTrack: !1,
      ctrlCheckIntervalMillis: 1e4,
      ctrlTimeoutMillis: 3e4,
      _printDebugStats: !1,
      statsSeconds: 10,
      remainLastStatsCount: 120,
      loglastConfrCount: 2,
      loglastStoreArray: !0,
      consoleLogger: !0,
      printStatsWhenPCClose: !0,
      rebuildPeerConnectionWhenNetworkChanaged: !0,
      rtcStatsTypeMath: function (e, t) {
        switch (e.type) {
          case "remote-candidate":
          case "local-candidate":
          case "track":
          case "stream":
          case "inbound-rtp":
          case "outbound-rtp":
          case "transport":
            return !0;
        }

        return !1;
      }
    }), o.logger.count(), wx.emedia.AudioContext = wx.AudioContext || wx.webkitAudioContext, wx.emedia.config.getMediaMeterIntervalMillis) {
      try {
        "function" == typeof wx.emedia.AudioContext ? (wx.emedia.__audioContext = new wx.emedia.AudioContext(), wx.emedia.__usingWebAudio = !0) : wx.emedia.__usingWebAudio = !1;
      } catch (e) {
        wx.emedia.__usingWebAudio = !1;
      }

      wx.emedia.__usingWebAudio || console.warn("'new AudioContext()' failed. can not know who talking."), wx.emedia.__audioContext && "suspended" === wx.emedia.__audioContext.state && console.warn("audioContext.state is suspended. can not know who talking. You can resume() wx.emedia.__audioContext, but only in response to a tap.");
    }

    wx.requestAnimationFrame && wx.emedia.config._useRequestAnimationFrame ? wx.emedia.requestAnimationFrame = function (e) {
      wx.requestAnimationFrame(e);
    } : wx.emedia.requestAnimationFrame = function (e, t) {
      return setTimeout(e, t || wx.emedia.config.getMediaMeterIntervalMillis);
    }, wx.cancelAnimationFrame && wx.emedia.config._useRequestAnimationFrame ? wx.emedia.cancelAnimationFrame = function (e) {
      wx.cancelAnimationFrame(e);
    } : wx.emedia.cancelAnimationFrame = function (e) {
      clearTimeout(e);
    }, wx.emedia.stopAudioTracks = function (e) {
      e && e.getAudioTracks().forEach(function (t) {
        t.stop(), o.logger.info("Media stream stop audio track. stream =", e.id, "track =", t.id, t.kind);
      });
    }, wx.emedia.stopAndRemoveAudioTracks = function (e) {
      var t = [];
      e && e.getAudioTracks().forEach(function (i) {
        i.stop(), t.push(i), o.logger.info("Media stream stop and remove audio tracks. stream =", e.id, "track =", i.id, i.kind);
      }), o.forEach(t, function (t, i) {
        e.removeTrack(i);
      });
    }, wx.emedia.stopTracks = function (e) {
      try {
        if (!e || !1 === e.active) return void o.logger.debug("stream tracks had been stoped. it ", e && e.id);
        e.getTracks().forEach(function (t) {
          t.stop(), o.logger.info("Media stream stop track. stream =", e.id, " track =", t.id, t.kind);
        }), e._bindAttendee && (o.removeAttribute(e._bindAttendee._openedRtcMediaStreams, e.id), e._bindAttendee = null), o.logger.info("stream tracks stoped. it ", e.id);
      } catch (e) {
        o.logger.error(e);
      }
    }, wx.emedia.enableVideoTracks = function (e, t) {
      e && e.getVideoTracks().forEach(function (i) {
        if ("function" == typeof i.enable) return i.enable(), o.logger.info("Media stream enable video track. stream =", e.id, "track =", i.kind, i.enabled, i.id), void (i.enabled === t || i.enable(t));
        i.enabled === t || (i.enabled = t);
      });
    }, wx.emedia.enableAudioTracks = function (e, t) {
      e && e.getAudioTracks().forEach(function (i) {
        if ("function" == typeof i.enable) return i.enable(), o.logger.info("Media stream enable audio track. stream =", e.id, "track =", i.kind, i.enabled, i.id), void (i.enabled === t || i.enable(t));
        i.enabled === t || (i.enabled = t);
      });
    }, wx.emedia.hasEnabledTracks = function (e) {
      if (!e || "function" != typeof e.getAudioTracks) return !1;
      if (!e.active) return !1;
      var t = e.getAudioTracks();
      if (0 === t.length) return !1;

      for (var i in t) if ("function" == typeof t[i].enable && t[i].enable(), t[i].enabled) return !0;

      return !1;
    }, wx.emedia.genReportName = function () {
      var e = wx.emedia._lastSetupDate || new Date();
      return (wx.emedia._lastSetupTktId || wx.emedia._lastSetupConfr) + "_" + wx.emedia._lastSetupMemName + "_" + e.getTime() + ".docx";
    }, wx.emedia.getReportUploadUrl = function (e, t, i) {
      var n = new XMLHttpRequest();
      n.open(e, t, !0), n.addEventListener("load", function (e) {
        i && i(e);
      }, !1), n.send(null);
    }, wx.emedia.uploadReport = function (e, t, i, n, r, s) {
      var a = wx.emedia.genReport();

      if (a) {
        "function" == typeof i && (s = r, r = n, n = i, i = void 0);
        var c = new Blob([a], {
          type: "text/plain"
        }),
            d = new FormData();
        d.append(e, c, e), i && "function" == typeof d.set && o.forEach(i, function (e, t) {
          d.set(e, t);
        });
        var u = new XMLHttpRequest();
        u.open("POST", t, !0), u.setRequestHeader("X-File-Name", e), s && s(u), u.addEventListener("load", function (i) {
          console.info("log begin upload. result = ", i.currentTarget.status, e, " > ", t), 200 === i.currentTarget.status ? n && n(i) : r && r(i);
        }, !1), u.send(d), console.info("log begin upload. ", e, " > ", t);
      } else r && r("not logs");
    }, wx.emedia.genReport = function () {
      if (wx.emedia._logContext && wx.emedia._logContext instanceof Array && !(void 0 === wx.emedia._logContextIndex || wx.emedia._logContextIndex < 0)) {
        var e = 0,
            t = wx.emedia._logContextIndex;
        wx.emedia._logContextIndex >= wx.emedia._logContext.length && (e = wx.emedia._logContextIndex - wx.emedia._logContext.length + 1);

        for (var i = "", n = e; n <= t; n++) {
          var o = n % wx.emedia._logContext.length;
          i += wx.emedia._logContext[o].join("\r\n") + "\r\n";
        }

        return wx.emedia._logContext.loadlogs && wx.emedia._logContext.loadlogs instanceof Array && (i += "-------------------------------------------------------------\r\n", i += wx.emedia._logContext.loadlogs.join("\r\n") + "\r\n"), i;
      }
    }, wx.emedia.fileReport = function () {
      var e = wx.emedia.genReport();

      if (e) {
        var t = wx.getFileSystemManager(),
            i = wx.env.USER_DATA_PATH + "/" + wx.emedia.genReportName();
        console.log("report:", e), t.writeFile({
          filePath: i,
          data: e,
          success: function (e) {
            console.log("success", e), console.log(i), wx.openDocument({
              filePath: i,
              success: function (e) {
                console.log("打开文档成功", e);
              },
              fail: function (e) {
                console.log("打开失败", e);
              }
            });
          },
          fail: function (e) {
            console.log("fail", e);
          },
          complete: function (e) {
            wx.downloadFile({
              url: i,
              success: function (e) {
                const t = e.tempFilePath;
                wx.openDocument({
                  filePath: t,
                  fileType: "docx",
                  success: function (e) {
                    console.log("打开文档成功", e);
                  },
                  fail: function (e) {
                    console.log("打开失败", e);
                  }
                });
              }
            });
          }
        });
      }
    }, wx.emedia.config({
      globalConstraints: {}
    });
    var r = i(6),
        s = i(1);
    wx.emedia.Webrtc = i(3), wx.emedia.Service = r, wx.emedia.XService = r, wx.emedia.mgr = i(2), wx.emedia.event = s, wx.emedia.LOG_LEVEL = 0, wx.emedia.isFirefox = "firefox" === wx.emedia.browser, wx.emedia.isChrome = "chrome" === wx.emedia.browser, wx.emedia.isSafari = "safari" === wx.emedia.browser, wx.emedia.isEdge = "edge" === wx.emedia.browser, wx.emedia.youInSomeBrowsers = function () {
      return !1;
    }, wx.emedia.requireTrustBeforeJoin = function () {
      return !1;
    }, wx.emedia.isWebRTC = wx.RTCPeerConnection && /^https\:$/.test(wx.location.protocol), (wx.emedia.isChrome || wx.emedia.isSafari) && (wx.emedia.supportPRAnswer = !0), wx.emedia.supportPRAnswer = !1, wx.emedia.config({
      baseAcptOps: [102, 104, 105, 106, 107, 300, 302, 303, 304, 301, 204, 206, 400, 401, 1001, 100201, 100202, 100203]
    }), wx.emedia.config({
      clientType: "MINI_PROGRAM",
      version: "v1.0.0",
      userAgent: "",
      acptOps: [1003]
    }), e.exports = n;
  }, function (e, t, i) {
    var n = i(0),
        o = n.tagLogger("Service"),
        r = i(7),
        s = i(8),
        a = i(1),
        c = i(10),
        d = i(4);
    e.exports = n.prototypeExtend({
      __init__: function () {
        var e = this;
        if (o.warn("emedia version: ", wx._emediaVersion || "unkown"), e.namespace = Math.uuidFast(), wx.emedia.useCurrentXService = e, void 0 === e.useRTCCfg && (e.useRTCCfg = wx.emedia.config.useRTCCfgIfServerReturn), "string" == typeof e.useRTCCfg && (e.useRTCCfg = JSON.parse(e.useRTCCfg)), e.listeners) for (var t in e.listeners) {
          var i = t,
              n = e.listeners[i];
          void 0 !== n && "onRecvRemoteMessage" !== i && "onSoundChanage" !== i && "onTalking" !== i && (e.listeners["__user_" + i] = n, e.listeners[i] = function (t, i) {
            return function () {
              o.info("sdk call user impl func. func=", t, e.current && e.current.getMemberId()), i.apply(this, arguments);
            };
          }(i, n));
        }
      },
      AVPubstream: d.extend({
        __init__: function () {
          this.type = 0, this._located = !0, this.mutedMuted = !0, this.constaints && (this.constaints.video || (this.voff = 1), this.constaints.audio || (this.aoff = 1)), this.constaints || (this.constaints = {
            audio: !0,
            video: !0
          }), wx.emedia.config.maxVideoBitrate && (this.vbitrate = wx.emedia.config.maxVideoBitrate), wx.emedia.config.maxAudioBitrate && (this.abitrate = wx.emedia.config.maxAudioBitrate);
        }
      }),
      AudioMixerPubstream: new d.extend({
        __init__: function () {
          if (this.type = 2, this._located = !0, this.mutedMuted = !0, this.constaints || (this.constaints = {
            audio: !0,
            video: !1
          }), this.constaints) {
            var e = !!this.constaints.audio;
            this.constaints.video || (this.constaints.video = !1), this.constaints.video || (this.voff = 1), this.constaints.audio || (this.aoff = 1), !1 === e && (this.aoff = 1);
          }

          wx.emedia.config.maxVideoBitrate && (this.vbitrate = wx.emedia.config.maxVideoBitrate), wx.emedia.config.maxAudioBitrate && (this.abitrate = wx.emedia.config.maxAudioBitrate);
        },
        onGotRemoteMediaStream: function (e) {
          if (!this.remotePlayAudioObject) {
            var t = "__o_remote_play_audio_" + this.id,
                i = document.querySelector("#" + t);
            i || ((i = document.createElement("audio")).style.display = "none", i.id = "__o_remote_play_audio_" + this.id, i.autoplay = !0, i.playsinline = !0, document.body.appendChild(i)), this.remotePlayAudioObject = i;
          }

          this.remotePlayAudioObject.srcObject = e;
        }
      }),
      ShareDesktopPubstream: d.extend({
        voff: 0,
        __init__: function () {
          this.type = 1, this._located = !0, this.mutedMuted = !0, this.constaints = {
            audio: !this.aoff,
            video: !0
          }, wx.emedia.config.maxVideoBitrate && (this.vbitrate = wx.emedia.config.maxVideoBitrate), wx.emedia.config.maxAudioBitrate && (this.abitrate = wx.emedia.config.maxAudioBitrate);
        }
      }),
      __assertCurrent: function () {
        if (!this.current) throw o.error("Please call wx.emedia.service.setup(ticket)"), "Please call wx.emedia.service.setup(ticket)";
        if (this.current.closed) throw o.error("current closed"), "current closed";
      },
      hasAudioMixers: function () {
        for (var e in this.__assertCurrent(), this.current.audioMixers) {
          var t = this.current.audioMixers[e];
          if (t && t.located()) return !0;
        }
      },
      getMediaDevices: function (e, t, i) {
        "function" == typeof e && (i = t, t = e, e = void 0), navigator.mediaDevices.enumerateDevices().then(function (i) {
          for (var n = [], r = 0; r !== i.length; ++r) {
            var s = i[r];
            e ? e === s.kind ? n.push(s) : "audioinput" === s.kind || "audiooutput" === s.kind || "videoinput" === s.kind || o.info("Some other kind of source/device: ", s) : n.push(s);
          }

          t && t(n);
        }).catch(function (e) {
          o.warn("navigator.getUserMedia error: ", e), i && i(e);
        });
      },
      attachSinkId: function (e, t) {
        void 0 !== e.sinkId ? e.setSinkId(t).then(function () {
          o.info("Success, audio output device attached: " + t);
        }).catch(function (e) {
          var t = e;
          "SecurityError" === e.name && (t = "You need to use HTTPS for selecting audio output device: " + e), o.warn(t);
        }) : o.warn("Browser does not support output device selection.");
      },
      _stopTracks: function (e) {
        wx.emedia.stopTracks(e), e && o.warn("Stream tracks stop. it = ", e);
      },
      _enableVideoTracks: function (e, t) {
        wx.emedia.enableVideoTracks(e, t);
      },
      _enableAudioTracks: function (e, t) {
        wx.emedia.enableAudioTracks(e, t);
      },
      openUserMedia: function (e) {
        o.debug("begin open user media", e);
        var t = this;
        if (!e) throw o.error("require pubS"), "require pubS";
        return {
          then: function (i, n) {
            function r() {
              i.apply(null, arguments);
              var n = e.localStream;
              n && (n.oninactive = t._onStreamInactive.bind(t, e, n), n.onactive = t._onStreamActive.bind(t, e, n));
            }

            if (e instanceof t.AVPubstream) t._openCamera(e, r, n);else if (e instanceof t.ShareDesktopPubstream) t._openSharedDesktop(e, r, n);else {
              if (!(e instanceof t.AudioMixerPubstream)) throw o.error("Unspported pubS"), "Unspported pubS";

              t._openCamera(e, r, n);
            }
          }
        };
      },
      _openSharedDesktop: function (e, t, i) {
        var r,
            s = this;

        function c(e) {
          var n = {
            audio: !0
          };
          e.constaints && ("object" == typeof e.constaints.audio && e.constaints.audio || e.constaints.audio || (n.audio = !1)), s.__getUserMedia(n, function (i, n) {
            var o = new MediaStream();
            o._located = !0, n && n.getAudioTracks().forEach(function (e) {
              o.addTrack(e);
            }), e.localStream && e.localStream.getVideoTracks().forEach(function (e) {
              o.addTrack(e);
            }), e.localStream = o, t && t(s.current, o);
          }, i);
        }

        if (e._localMediaStream && (r = e._localMediaStream.getVideoTracks()) && r.length > 0) return e.localStream = e._localMediaStream, void (e.constaints.audio ? c(e) : t && t(s.current, stream));

        __desktop.openDesktopMedia(e.screenOptions || ["screen", "window", "tab"], function (r) {
          if (r instanceof a.OpenDesktopMedia) {
            var d = r.desktopStreamId;
            o.warn("desktop streamId", d);
            var u = {
              audio: !1,
              video: {
                mandatory: n.extend(e.mandatory || {}, {
                  chromeMediaSource: "desktop",
                  chromeMediaSourceId: d
                }),
                optional: []
              }
            };

            s.__getUserMedia(u, function (i, n) {
              e.localStream = n, e.constaints.audio ? c(e) : t && t(s.current, n);
            }, i);
          } else s.current && s.current.onEvent(new a.ShareDesktopExtensionNotFound({
            member: s.current
          })), i && i(r);
        });
      },
      _openCamera: function (e, t, i) {
        var n = this,
            o = e.constaints || {
          audio: !0,
          video: !0
        };

        n.__getUserMedia(o, function (i, o) {
          n.__controlStream(e, o), e.localStream = o, t && t(n.current, o);
        }.bind(o), i);
      },
      __controlStream: function (e, t) {
        wx.emedia.enableVideoTracks(t, !e.voff), wx.emedia.enableAudioTracks(t, !e.aoff);
      },
      __getUserMedia: function (e, t, i) {
        o.debug("get user media. using constaints", e);
        var r,
            s = this;

        function c(e) {
          o.debug("[WebRTC-API] getUserMedia() error: ", e), wx.emedia.stopTracks(r), s.current && s.current.onEvent(new a.OpenMediaError({
            member: s.current,
            event: e
          })), i && i(new a.OpenMediaError({
            member: s.current,
            event: e
          }));
        }

        e = n.extend({}, e), s.__sysGetUserMedia(e, function (i) {
          s.current && !s.current.closed && (s.current._openedRtcMediaStreams[i.id] = i, i._bindAttendee = s.current, i._bindAttendeeId = s.current.getMemberId(), o.info("stream bind attendee.", i.id, s.current.ticket && s.current.ticket.id, s.current.getMemberId(), s.current.memName)), wx.emedia._yetGetUserMedia = !0, r = i;
          var n = i.getVideoTracks(),
              a = i.getAudioTracks();

          if (n.length > 0) {
            var d = n[0];
            o.debug(i.id, "using video device: ", d.id, d.label, d.kind, d.enabled);
          }

          if (a.length > 0) {
            var u = a[0];
            o.debug(i.id, "using audio device: ", u.id, u.label, u.kind, u.enabled);
          }

          if (i._located = !0, "boolean" == typeof i.active && !i.active) return o.error("media stream not active. it is", i.id), void c({
            constraint: e,
            name: "NotAllowedStreamNonactive",
            message: "stream non-active"
          });
          t && t(s.current, i);
        }, c);
      },
      _onStreamInactive: function (e, t, i) {
        var r = this;
        o.warn("media stream inactive. it =", t.id), e.onMediaInactive && r.current && n.forEach(r.current._cacheStreams, function (n, o) {
          o.located() && o.localStream && o.localStream.id === t.id && (o._webrtc && o._webrtc.closed || e.onMediaInactive.call(o, t, i, r));
        });
      },
      _onStreamActive: function (e, t, i) {
        var r = this;
        o.warn("media stream active. it =", t.id), e.onMediaActive && r.current && n.forEach(r.current._cacheStreams, function (n, o) {
          o.located() && o.localStream && o.localStream.id === t.id && e.onMediaActive.call(o, t, i, r);
        });
      },
      setup: function (e, t) {
        var i = this;
        o.count(), o.debug("recv ticket", e, t), o.debug("use sdk version", wx._emediaVersion);
        var r,
            a,
            d = t = t || {};
        if (n.isPlainObject(t)) t = JSON.stringify(t);else try {
          d = JSON.parse(t);
        } catch (e) {}
        "string" == typeof e && (e = JSON.parse(e)), r = a = e.memName, wx.emedia._lastSetupConfr = e.confrId, wx.emedia._lastSetupMemName = a, wx.emedia._lastSetupDate = new Date(), wx.emedia._lastSetupTktId = e.tktId;
        var u = (i.Attendee || s).extend(c);
        return i.current = new u({
          _service: i,
          service: i,
          autoSub: wx.emedia.config.autoSub,
          getCopyIntervalMillis: wx.emedia.config.getCopyIntervalMillis,
          sysUserId: r,
          memName: a,
          resource: i.resource,
          nickName: i.nickName,
          ticket: e,
          ext: t,
          extObj: d,
          sessionFactory: function () {
            return i.newSession(this, e);
          }
        }, i.listeners || {});
      },
      getStreamById: function (e) {
        var t = this.current && this.current._cacheStreams[e];
        return t && n.extend(!1, {}, t);
      },
      getStreamsByRtcId: function (e) {
        if (this.current && this.current._cacheStreams) {
          var t = [];
          return n.forEach(this.current._cacheStreams, function (i, n) {
            n.rtcId === e && t.push(n);
          }), t;
        }
      },
      getMemberById: function (e) {
        var t = this.current && this.current._cacheMembers[e];
        return t && n.extend(!1, {}, t);
      },
      exit: function (e) {
        o.warn("User click exit ", e), this.current && this.current.exit(e);
      },
      join: function (e, t) {
        o.debug("begin join ...");
        if (this.__assertCurrent(), this.current._memberId) return o.warn("Had joined. igrone it"), void (e && e(this.memId));
        this.current._session._sessionId = void 0, this.current.join(e, t);
      },
      withpublish: function (e) {
        if (!e || !e.localStream) throw o.error("pubS null or stream not open"), "pubS null or stream not open";
        return this.__assertCurrent(), this.current._memberId ? o.warn("Had joined. igrone it") : this.current._session._sessionId = void 0, this.current.withpublish(e);
      },
      push: function (e, t, i) {
        o.debug("begin push ...");
        var n = this;
        if (2 === arguments.length && (i = t, t = void 0), !e || !e.localStream) throw o.error("pubS or stream open"), "pubS or stream open";
        n.__assertCurrent(), n.current.push(e, t, i, !1);
      },
      subscribe: function (e, t, i, r) {
        var s = this;

        if (o.info("begin subscribe ", e, r), t && n.isPlainObject(t) && (r = t, t = i = void 0), i && n.isPlainObject(i) && (r = i, i = t, t = void 0), wx.emedia.isSafari) {
          var a = {
            streamId: e,
            onSub: t,
            subfail: i,
            subArgs: r
          },
              c = s.__safari_subs || (s.__safari_subs = []);

          function d() {
            try {
              var e = c.shift();
              e && e.onSub && e.onSub.apply(e, arguments);
            } finally {
              l();
            }
          }

          function u() {
            try {
              var e = c.shift();
              e && e.subfail && e.subfail.apply(e, arguments);
            } finally {
              l();
            }
          }

          function l() {
            c.length > 0 && s.__subscribe(c[0].streamId, d, u, c[0].subArgs);
          }

          c.push(a), 1 === c.length && l();
        } else s.__subscribe(e, t, i, r);
      },
      __subscribe: function (e, t, i, r) {
        var s = this;
        s.__assertCurrent(), 2 == arguments.length && (i = t, t = void 0), t && n.isPlainObject(t) && (r = t, t = void 0), i && n.isPlainObject(i) && (r = i, i = void 0), r || (r = {
          subSVideo: !0,
          subSAudio: !0
        });
        s.current._cacheStreams[e];

        var a = s.current._getWebrtc(e),
            c = a && a.isConnected(),
            d = c && a.getRemoteStream();

        if (d && (c = d.active)) {
          var u = d.getAudioTracks().length,
              l = d.getVideoTracks().length;
          (u || !0 !== r.subSAudio) && (l || !0 !== r.subSVideo) || (c = !1);
        }

        if (o.info("sub stream", e, ", use prertcpeer =", c), c) return s.current.subscribeStream(a._rtcId, e, i, r, t), void (t && t());
        a && !a.closed && s.current.closeWebrtc(a.getRtcId(), !0, !1), s.current.createWebrtcAndSubscribeStream(e, {
          onGotRemote: function (e) {
            t && t(e);
          },
          onEvent: function (e) {
            i && i(e);
          }
        }, void 0, r);
      },
      closePubstream: function (e) {
        e.located() && (wx.emedia.stopTracks(e._localMediaStream), wx.emedia.stopTracks(e.localStream));
      },
      hungup: function (e) {
        var t = this.getStreamById(e);

        try {
          this._hungup(e);
        } finally {
          this.onHungup && t && this.onHungup(t);
        }
      },
      _hungup: function (e) {
        this.__assertCurrent();

        var t = this.current,
            i = t._cacheStreams[e];
        i && !i.closeReason && i.updateAttributes({
          closeReason: "UserHangup"
        });
        var r = i && i.rtcId;

        if (r && (t.closeWebrtc(r), i.located() && (1 !== i.type && i._localMediaStream && wx.emedia.stopTracks(i._localMediaStream), i.remotePlayAudioObject && document.body.removeChild(i.remotePlayAudioObject), t._cacheStreams[e] && t.onRemoveStream(i), n.removeAttribute(t._cacheStreams, e), this._streamAutomators && n.removeAttribute(this._streamAutomators, e))), i && !i.located()) {
          if (t._linkedStreams[i.id] && n.removeAttribute(t._linkedStreams, i.id), o.warn("Hangeup remove from _linkedStreams. stream = ", i.id), !(i = t._cacheStreams[e])) return;
          i.updateAttributes({
            rtcId: void 0,
            _webrtc: void 0,
            mediaStream: void 0
          });
          var s = new d(i);
          t.onUpdateStream(s, new s.Update(s));
        }
      },
      postMessage: function (e, t, i, n) {
        var o = t;
        "string" != typeof t && (t = JSON.stringify(t)), this.__assertCurrent();
        var r,
            s = this.current,
            c = s._linkedStreams[e];
        r = c && c.owner ? c.owner.id : e;
        t = s.newMessage({
          op: 1003,
          memId: r,
          arg: t
        });
        s.postMessage(t, (i || n) && function (e) {
          if (n && n(e, o), 0 != e.result) {
            var c = new a.RemoteControlFail({
              memId: r,
              failed: e.result,
              cause: e.msg,
              type: "postMessage",
              postMessage: t
            });
            return s.onEvent(c), void (i && i(c, o));
          }
        });
      },
      torchRemote: function (e, t, i, n) {
        "function" == typeof t && (n = i, i = t, t = void 0), void 0 !== t && (t = t ? 1 : 0), this.__assertCurrent();
        var r = this.current,
            s = r._linkedStreams[e];
        if (!s || s.located()) throw o.error("not exsits or locate, not connect", e), e + " not exsits or locate, not connect";
        var c = s.torch,
            d = {
          op2: 20,
          streamId: e,
          tor: t = void 0 === t ? s.torch ? 0 : 1 : t
        },
            u = r.newMessage({
          op: 1002,
          memId: s.owner.id,
          arg: JSON.stringify(d),
          _reqOps: [100206]
        });
        s.updateAttributes({
          torch: t
        }), r.postMessage(u, function (e) {
          if (0 != e.result) {
            var t = new a.RemoteControlFail({
              stream: s,
              failed: e.result,
              cause: e.msg,
              type: "torch_control"
            });
            return r.onEvent(t), s.updateAttributes({
              torch: c
            }), void (n && n(t, s.torch));
          }

          i && i(s.torch);
        });
      },
      freezeFrameRemote: function (e, t, i) {
        this.__assertCurrent();

        var n = this.current,
            r = n._linkedStreams[e];
        if (!r || r.located()) throw o.error("not exsits or locate, not connect", e), e + " not exsits or locate, not connect";
        var s = !r.freezeFrame,
            c = {
          op2: 20,
          streamId: e,
          frz: s ? 1 : 0
        },
            d = n.newMessage({
          op: 1002,
          memId: r.owner.id,
          arg: JSON.stringify(c),
          _reqOps: [100204]
        });
        r.updateAttributes({
          freezeFrame: s
        }), n.postMessage(d, function (e) {
          if (0 != e.result) {
            var o = new a.RemoteControlFail({
              stream: r,
              failed: e.result,
              cause: e.msg,
              type: "freeze_control"
            });
            return n.onEvent(o), r.updateAttributes({
              freezeFrame: !r.freezeFrame
            }), void (i && i(o, r.freezeFrame));
          }

          t && t(r.freezeFrame);
        });
      },
      base64Img2Blob: function (e) {
        for (var t = e.split(";base64,"), i = t[0].split(":")[1], n = wx.atob(t[1]), o = n.length, r = new Uint8Array(o), s = 0; s < o; ++s) r[s] = n.charCodeAt(s);

        return new Blob([r], {
          type: i
        });
      },
      blob2URL: function (e) {
        return URL.createObjectURL(e);
      },
      imagesPngContext2URL: function (e) {
        return this.blob2URL(this.blob2URL(e));
      },
      downloadFile: function (e, t, i) {
        var n = document.createElement("a");
        n.style.display = "none";
        var o,
            r = t ? this.base64Img2Blob(t) : i;
        n.download = e, n.href = o = this.blob2URL(r), n.rel = "noopener";
        var s = document.createEvent("HTMLEvents");
        s.initEvent("click", !1, !1), n.dispatchEvent(s), document.body.appendChild(n), n.click(), n.parentNode.removeChild(n), setTimeout(function () {
          URL.revokeObjectURL && URL.revokeObjectURL(o);
        }, 4e4);
      },
      videoCaptureBase64Context2URL: function (e) {
        return this.imagesPngContext2URL(this.getCaptureBase64Context(e));
      },
      getCaptureBase64Context: function (e) {
        var t = document.createElement("canvas");
        t.id = "__capture_video_" + new Date().getTime();
        return t.width = e.videoWidth, t.height = e.videoHeight, t.getContext("2d").drawImage(e, 0, 0, t.width, t.height), t.toDataURL("images/png");
      },
      captureVideo: function (e, t, i) {
        var n = this.getCaptureBase64Context(e);
        return t && (i = i || "capture_" + new Date().getTime(), this.downloadFile(i, n)), n;
      },
      capturePictureRemote: function (e, t, i, n) {
        this.__assertCurrent();

        var r = this.current,
            s = r._linkedStreams[e];
        if (!s || s.located()) throw o.error("not exsits or locate, not connect", e), e + " not exsits or locate, not connect";
        var c = {
          op2: 20,
          streamId: e,
          pic: 1,
          rspBase64Pic: !0 === t
        },
            d = r.newMessage({
          op: 1002,
          memId: s.owner.id,
          arg: JSON.stringify(c),
          _reqOps: [100205]
        });
        r.postMessage(d, function (e) {
          if (0 != e.result) {
            var o = new a.RemoteControlFail({
              stream: s,
              failed: e.result,
              cause: e.msg,
              type: "capture_control"
            });
            return r.onEvent(o), void (n && n(o));
          }

          if (t) {
            if (e.arg) {
              var c = JSON.parse(e.arg);
              i && i(c.pic);
            } else n && n(new a.RemoteControlFail({
              stream: s,
              failed: e.result,
              cause: "Not found base64 pic"
            }));
          } else i && i();
        });
      },
      zoomRemote: function (e, t, i, n) {
        this.__assertCurrent();

        var r = this.current,
            s = r._linkedStreams[e];
        if (!s || s.located()) throw o.error("not exsits or locate, not connect", e), e + " not exsits or locate, not connect";
        s._zoom || s.updateAttributes({
          _zoom: 1
        });
        var c = s._zoom * t;

        if (!(c < 1)) {
          s.updateAttributes({
            _zoom: c
          });
          var d = {
            op2: 20,
            streamId: e,
            zoom: Math.round(1e4 * c)
          },
              u = r.newMessage({
            op: 1002,
            memId: s.owner.id,
            arg: JSON.stringify(d),
            _reqOps: [100201]
          });
          r.postMessage(u, function (e) {
            if (0 != e.result) {
              var t = new a.RemoteControlFail({
                stream: s,
                failed: e.result,
                cause: e.msg,
                type: "zoom_control"
              });
              return r.onEvent(t), void (i && i(t));
            }

            n && n();
          });
        }
      },
      _getPosition: function (e) {
        for (var t = 0, i = 0; e;) i += e.offsetLeft, t += e.offsetTop, e = e.offsetParent;

        return {
          clientX: i,
          clientY: t
        };
      },
      eventXYAtMedia: function (e, t) {
        var i = n.getDomPageRect(t),
            o = i.width,
            r = i.height,
            s = t.videoWidth,
            a = t.videoHeight;

        if (a / s > r / o) {
          var c = s / a;
          s = (a = r) * c;
        } else {
          c = a / s;
          a = (s = o) * c;
        }

        var d,
            u,
            l = e;
        if ((d = n.isFloat(l.x)) && (l.x = l.x * o), (u = n.isFloat(l.y)) && (l.y = l.y * r), !(Math.abs(l.x) < (o - s) / 2 || o - Math.abs(l.x) < (o - s) / 2 || Math.abs(l.y) < (r - a) / 2 || r - Math.abs(l.y) < (r - a) / 2)) return l.x = l.x < 0 ? Math.floor(l.x + (o - s) / 2) : Math.floor(l.x - (o - s) / 2), l.y = l.y < 0 ? Math.floor(l.y + (r - a) / 2) : Math.floor(l.y - (r - a) / 2), d && (l.x = l.x / s), u && (l.y = l.y / a), {
          x: l.x,
          y: l.y,
          width: s,
          height: a
        };
      },
      eventXYAtVideo: function (e, t) {
        var i,
            o,
            r = n.getDomPageRect(t),
            s = r.width,
            a = r.height,
            c = t.videoWidth,
            d = t.videoHeight;

        if (d / c > a / s) {
          var u = c / d;
          c = (d = a) * u;
        } else {
          u = d / c;
          d = (c = s) * u;
        }

        return (i = n.isFloat(e.x)) && (e.x = e.x * c), (o = n.isFloat(e.y)) && (e.y = e.y * d), e.x = e.x < 0 ? Math.floor(e.x - (s - c) / 2) : Math.floor(e.x + (s - c) / 2), e.y = e.y < 0 ? Math.floor(e.y - (a - d) / 2) : Math.floor(e.y + (a - d) / 2), i && (e.x = e.x / s), o && (e.y = e.y / a), e;
      },
      getClickXY: function (e, t) {
        var i = t || wx.event,
            n = document.documentElement.scrollLeft || document.body.scrollLeft,
            r = document.documentElement.scrollTop || document.body.scrollTop,
            s = i.pageX || i.clientX + n,
            a = i.pageY || i.clientY + r,
            c = this._getPosition(e);

        o.info("Video tag position ", c.clientX, ":", c.clientY);
        var d = e.videoWidth,
            u = e.videoHeight;

        if (u / d > e.offsetHeight / e.offsetWidth) {
          var l = d / u;
          d = (u = e.offsetHeight) * l, c.clientX += (e.offsetWidth - d) / 2;
        } else {
          l = u / d;
          u = (d = e.offsetWidth) * l, c.clientY += (e.offsetHeight - u) / 2;
        }

        return o.info("Media position ", c.clientX, ":", c.clientY), o.info("Media xy ", d, ":", u), o.info("Click position ", s, ":", a), {
          mediaWidth: d,
          mediaHeight: u,
          x: s - c.clientX,
          y: a - c.clientY
        };
      },
      focusExpoRemote: function (e, t, i, n, r) {
        var s = i || wx.event,
            a = document.documentElement.scrollLeft || document.body.scrollLeft,
            c = document.documentElement.scrollTop || document.body.scrollTop,
            d = s.pageX || s.clientX + a,
            u = s.pageY || s.clientY + c,
            l = this._getPosition(t);

        o.info("Video tag position ", l.clientX, ":", l.clientY);
        var f = t.videoWidth,
            m = t.videoHeight;

        if (m / f > t.offsetHeight / t.offsetWidth) {
          var h = f / m;
          f = (m = t.offsetHeight) * h, l.clientX += (t.offsetWidth - f) / 2;
        } else {
          h = m / f;
          m = (f = t.offsetWidth) * h, l.clientY += (t.offsetHeight - m) / 2;
        }

        o.info("Media position ", l.clientX, ":", l.clientY), o.info("Media xy ", f, ":", m), o.info("Click position ", d, ":", u), this._focusExpo(e, f, m, d - l.clientX, u - l.clientY, n, r);
      },
      _focusExpo: function (e, t, i, n, r, s, c) {
        if (!(n <= 0 || n > t || r <= 0 || r > i)) {
          this.__assertCurrent();

          var d = this.current,
              u = d._linkedStreams[e];
          if (!u || u.located()) throw o.error("not exsits or locate, not connect", e), e + " not exsits or locate, not connect";
          var l = {
            op2: 20,
            streamId: e,
            focus: 1,
            expo: 1,
            x: 0 === t ? 0 : Math.round(1e4 * n / t),
            y: 0 === i ? 0 : Math.round(1e4 * r / i)
          },
              f = d.newMessage({
            op: 1002,
            memId: u.owner.id,
            arg: JSON.stringify(l),
            _reqOps: [100202, 100203]
          });
          d.postMessage(f, function (e) {
            if (0 != e.result) {
              var t = new a.RemoteControlFail({
                stream: u,
                failed: e.result,
                cause: e.msg,
                type: "focus_expo_control"
              });
              return d.onEvent(t), void (s && s(t));
            }

            c && c();
          });
        }
      },
      _republish: function (e, t, i) {
        o.info("Republish stream. it = ", e.id);
        var n,
            r,
            s = this;

        if (e.id) {
          var a = s.current.__getWebrtcFor(e.id);

          a && s.current.closeWebrtc(a, !0), n = s.current._getWebrtc(e.id);
        }

        switch (e.type) {
          case 0:
            wx.emedia.stopTracks(e._localMediaStream), r = new s.AVPubstream(e);
            break;

          case 1:
            wx.emedia.stopAndRemoveAudioTracks(e._localMediaStream), r = new s.ShareDesktopPubstream(e);
            break;

          case 2:
            wx.emedia.stopTracks(e._localMediaStream), r = new s.AudioMixerPubstream(e);
        }

        setTimeout(function () {
          s.openUserMedia(r).then(function () {
            e.localStream = r.localStream, e.isRepublished = !0, e.optimalVideoCodecs = e.optimalVideoCodecs || n && n.optimalVideoCodecs, s.push(e, t, i);
          }, i);
        }, 100);
      },
      chanageCamera: function (e, t, i) {
        var r = this;
        "string" == typeof e ? e = r.current._cacheStreams[e] : e.id && (e = r.current._cacheStreams[e.id]), e.voff ? o.warn("Stream id = ", e.id, " voff, do not chanage camera.") : r.getMediaDevices("videoinput", function (s) {
          if (s.length <= 1) o.warn("Only video input. not chanage");else {
            var a = e._cameraIndex;

            if (null === e._cameraIndex || void 0 === e._cameraIndex) {
              var c = e.getLocalMediaStream(),
                  d = (m = c && c.getVideoTracks()) && m.length && m[0];

              if (d && d.getCapabilities && "function" == typeof d.getCapabilities) {
                var u = d.getCapabilities(),
                    l = u && u.deviceId;

                for (var f in s) {
                  if ((p = s[f]).deviceId === l || p.label == d.label) {
                    a = parseInt(f);
                    break;
                  }
                }
              } else for (var f in s) {
                if ((p = s[f]).label == d.label) {
                  a = parseInt(f);
                  break;
                }
              }
            }

            for (; a < s.length;) {
              var m,
                  h = s[a],
                  p = s[a = (a + 1) % s.length];
              if (!(m = e.getLocalMediaStream().getVideoTracks()) || 0 === m.length || p.label != m[0].label) break;
            }

            var _ = (p = s[a]).label;
            o.warn("Stream ", e.id, h.label, ">>", _), e._cameraIndex = a, e.constaints || (e.constaints = {});
            var g = n.extend({}, e.constaints);
            e._lastConstaints = g, e.constaints.video = "object" == typeof e.constaints.video ? e.constaints.video : {}, e.constaints.video.deviceId = {
              exact: p.deviceId
            }, r._republish(e, function (e) {
              i && i(e);
            }, function (i) {
              i instanceof wx.emedia.event.OpenMediaError && (e.constaints = g), t && t(i);
            });
          }
        }, t);
      },
      voff: function (e, t, i, n) {
        var r = this;
        "string" == typeof e && (e = r.current._cacheStreams[e]);
        var s = e.voff;

        function a() {
          t != s ? (wx.emedia.enableVideoTracks(e.getMediaStream(), !t), r.current && r.current.voff(e, t)) : o.info("pubstream voff not chanage.");
        }

        if (t = t ? 1 : 0, e.voff = t, !t && e.constaints && !e.constaints.video) {
          var c = e.constaints.video;
          return e.constaints.video = !0, void r._republish(e, function (e) {
            a(), n && n(e);
          }, function (t) {
            t instanceof wx.emedia.event.OpenMediaError && (e.constaints.video = c, e.voff = s), i && i(t);
          });
        }

        a(), n && n(e.getMediaStream());
      },
      aoff: function (e, t, i, n) {
        var r = this;
        "string" == typeof e && (e = r.current._cacheStreams[e]);
        var s = e.aoff;

        function a() {
          t != s ? (wx.emedia.enableAudioTracks(e.getMediaStream(), !t), r.current && r.current.aoff(e, t)) : o.info("pubstream aoff not chanage.");
        }

        if (t = t ? 1 : 0, e.aoff = t, !t && e.constaints && !e.constaints.audio) {
          var c = e.constaints.audio;
          return e.constaints.audio = !0, void r._republish(e, function (e) {
            a(), n && n(e);
          }, function (t) {
            t instanceof wx.emedia.event.OpenMediaError && (e.constaints.audio = c, e.aoff = s), i && i(t);
          });
        }

        a(), n && n(e.getMediaStream());
      },
      iceing: function (e) {
        return n.isPlainObject(this.current._linkedStreams[e]);
      },
      recording: function (e) {
        return n.isPlainObject(this.current._records[e]);
      },
      startRecord: function (e, t) {
        var i = this.current._linkedStreams[e];
        if (!i) throw o.error("not at linked streams", e), e + " not at linked streams";
        i._webrtc || t && t(!1), this.current.startRecord(i, t);
      },
      stopRecord: function (e, t) {
        var i = this.current._records[e];
        if (!i) throw o.error("not at recording streams", e), e + " not at recording streams";
        this.current.stopRecord(i, t);
      },
      getCurrentMembers: function () {
        return this.current.getCurrentMembers();
      },
      _onCapturePicture: function (e) {
        var t,
            i = e.arg.rspBase64Pic,
            n = e.arg.streamId,
            r = this.current._cacheStreams[n];

        if (i) {
          var s;
          if ("function" != typeof this.getHTMLVideo || !(s = this.getHTMLVideo(n))) return void o.warn("Not support capture picture. caused by htmlVideo not found");
          t = this.getCaptureBase64Context(s);
        } else {
          if ("function" != typeof this.onCapturePicture) return void o.warn("Not support capture picture. caused by onCapturePicture not found");
          this.onCapturePicture(r);
        }

        var a = this.current.newMessage({
          op: 1001,
          tsxId: e.tsxId,
          memId: e.memId,
          arg: JSON.stringify(t ? {
            pic: t
          } : {}),
          result: 0
        });
        return this.current.postMessage(a, function (e) {
          o.warn("Send remote control onCapturePicture response. the result = ", e.result, e.msg || "");
        }), !0;
      },
      newSession: function (e, t) {
        var i = this;
        return new (i.Session || r)({
          ticket: t,
          owner: e,
          onTcklC: function (t) {
            e.onTcklC(t.rtcId, t.cands);
          },
          onAcptC: function (t) {
            e.onAcptC(t.rtcId, t.sdp, t.cands);
          },
          onAnsC: function (t) {
            e.onAnsC(t.rtcId, t.sdp, t.cands);
          },
          onTermC: function (t) {
            o.info("Server termc rtc: ", t.rtcId, t.message || t.msg), 21 === t.endReason || 22 === t.endReason ? n.forEach(e._cacheStreams, function (i, n) {
              var o;
              n.rtcId === t.rtcId && (o = 21 === t.endReason ? new wx.emedia.event.SwitchVCodes({
                stream: n,
                useVCodes: t.useVCodes
              }) : new wx.emedia.event.SubFailNotSupportVCodes({
                stream: n
              }), e.onEvent(o));
            }) : e.closeWebrtc(t.rtcId, !1, !0);
          },
          onEnter: function (t) {
            e.onEnter(t.cver, t.mem);
          },
          onExit: function (t) {
            e.onExit(t.cver, t.memId, t.reason || 0);
          },
          onPub: function (t) {
            e.onPub(t.cver, t.memId, t.pubS);
          },
          onUnpub: function (t) {
            e.onUnpub(t.cver, t.memId, t.pubSId);
          },
          onMems: function (e) {},
          onClose: function (t) {
            e.onClose(t.cver, t.confrId);
          },
          onEvent: function (t) {
            e.onEvent(t);
          },
          onStreamControl: function (t) {
            e.onStreamControl(t.cver, t.streamId, t.voff, t.aoff, t.sver);
          },
          onRoleUpdate: function (t) {
            e._onRoleUpdate(t.role, t.roleToken);
          },
          onRemoteControl: function (t) {
            if ("string" == typeof t.arg && (t.arg = JSON.parse(t.arg)), 20 !== t.arg.op2 || !t.arg.pic || !i._onCapturePicture.call(i, t)) {
              if (30 === t.arg.op2 && i._onRemotePannelControl) try {
                return void i._onRemotePannelControl.call(i, t);
              } catch (e) {
                o.warn(e);
              }
              o.warn("Not support remote control");
              var n = e.newMessage({
                op: 1001,
                tsxId: t.tsxId,
                memId: t.memId,
                arg: JSON.stringify(t.arg),
                result: t && t.arg && 30 === t.arg.op2 ? -405 : -507,
                msg: "Not support the remote control."
              });
              e.postMessage(n, function (e) {
                o.warn("Send remote control response. the result = ", e.result, e.msg || "");
              });
            }
          },
          onRecvRemoteMessage: function (t) {
            e._onRecvRemoteMessage && e._onRecvRemoteMessage(t.memId, t.arg, t);
          }
        });
      },
      _judgeTalking: function (e) {
        return !!e && e.instant >= wx.emedia.config.judgeTalkingByInstantGE;
      },
      graffitiVideo: function (e, t, i) {
        var n = this.getStreamById(e),
            o = new MediaStream();
        o._located = !0, n._localMediaStream.getAudioTracks().forEach(function (e) {
          o.addTrack(e);
        }), i.captureStream(25).getVideoTracks().forEach(function (e) {
          o.addTrack(e);
        }), t.srcObject = o, n.updateAttributes({
          localStream: o,
          isRepublished: !0,
          optimalVideoCodecs: n.optimalVideoCodecs
        }), this.push(n);
      },
      resetCanvas: function (e) {
        var t;
        if (arguments.length > 1) for (var i = 0; i < arguments.length; i++) "function" == typeof (t = arguments[i]) && t(e), "function" != typeof t && n.isPlainObject(t) && n.forEach(t, function (t, i) {
          o.debug("Canvas set ", t, " = ", i), e.setAttribute(t, i);
        });
      },
      _random: function (e) {
        return Math.floor(Math.random() * e);
      },
      requestFrame: function (e, t) {
        var i,
            n = this;
        if ("string" == typeof e) i = this.current._cacheStreams[e];else {
          if (!e.id) return;
          i = this.current._cacheStreams[e.id];
        }

        function o() {
          i.requestFrame();
        }

        i && (t ? setTimeout(function () {
          o(), n.requestFrame(i, t);
        }, t) : o());
      },
      graffitiCanvas: function (e, t) {
        n.targetDOM(e) && (t = e, e = !1);
        var i = this,
            o = new i.ShareDesktopPubstream({
          voff: 0,
          aoff: e ? 0 : 1
        });
        t || (t = document.createElement("canvas")), t.getContext("2d"), o.canvas = t;

        var r = function () {};

        return r.prototype.setCanvas = function (e) {
          return this.canvasTag = t, i.resetCanvas(t, e), this;
        }, r.prototype.push = function (e, t) {
          this._push(e, t);
        }, r.prototype._push = function (n, r) {
          "function" == typeof n && (r = n, n = void 0), t.captureStream && (t.captureStream.enabled = !0);
          var s = t.captureStream(n || 25);

          function a(i) {
            i.canvas = t, r && r(i, t, s), e && i.requestFrame();
          }

          function c(e, t) {
            var n = new MediaStream();
            n._located = !0, e._localMediaStream && e._localMediaStream.getAudioTracks().forEach(function (e) {
              n.addTrack(e);
            }), s.getVideoTracks().forEach(function (e) {
              n.addTrack(e);
            }), e._localMediaStream = n, e.localStream = n, i.push(e, t);
          }

          return e ? i.__getUserMedia({
            audio: !0
          }, function (e, t) {
            o._localMediaStream = t, c(o, a);
          }) : c(o, a), this;
        }, new r();
      },
      blobRecorder: function (e, t, i, r) {
        var s = this;
        n.targetDOM(e) && (e = e.srcObject), t || (t = {
          mimeType: "video/webm;codecs=vp9"
        }), MediaRecorder.isTypeSupported(t.mimeType) || (o.info(t.mimeType, " is not Supported"), t = {
          mimeType: "video/webm;codecs=vp8"
        }, MediaRecorder.isTypeSupported(t.mimeType) || (o.info(t.mimeType, " is not Supported"), t = {
          mimeType: "video/webm"
        }, MediaRecorder.isTypeSupported(t.mimeType) || (o.info(t.mimeType, " is not Supported"), t = {
          mimeType: ""
        })));

        try {
          var a = new MediaRecorder(e, t);
        } catch (e) {
          return void o.error("Exception while creating MediaRecorder: ", e);
        }

        var c = [];

        function d() {
          this.blobs = c;
        }

        return a.onstop = r || function (e) {
          o.info("Recorder stopped: ", e);
        }, a.ondataavailable = i || function (e) {
          e.data && e.data.size > 0 && c.push(e.data);
        }, d.prototype.start = function (e) {
          a.start(e);
        }, d.prototype.stop = function () {
          a.stop();
        }, d.prototype.playurl = function (e) {
          var t = new Blob(this.blobs, e || {
            type: "video/webm"
          });
          return wx.URL.createObjectURL(t);
        }, d.prototype.download = function (e, t) {
          var i = new Blob(this.blobs, t || {
            type: "video/webm"
          });
          s.downloadFile(e, void 0, i);
        }, new d();
      }
    });
  }, function (e, t, i) {
    var n = i(0),
        o = n.tagLogger("Sess"),
        r = i(1),
        s = i(2),
        a = 0,
        c = n.prototypeExtend({
      setSessId: function (e) {
        return e && (this.sessId = e), this;
      },
      setOp: function (e) {
        return e && (this.op = e), 200 === e && (this.res = {
          type: "MINI_PROGRAM",
          ver: wx._emediaVersion || wx.emedia.config.version,
          platVersion: wx._emediaVersion || wx.emedia.config.version,
          agent: "v2.7.0",
          ops: wx.emedia.config.acptOps
        }), this;
      },
      setTsxId: function (e) {
        return e && (this.tsxId = e), this;
      },
      setTicket: function (e) {
        return e && (this.tkt = e), this;
      },
      setSdp: function (e) {
        return e && (this.sdp = e), this;
      },
      setCands: function (e) {
        return e && (this.cands = e), this;
      },
      setSubSId: function (e) {
        return e && (this.subSId = e), this;
      },
      setMemId: function (e) {
        return e && (this.memId = e), this;
      },
      setPubS: function (e) {
        e && (this.pubS = n.extend(!1, {}, e));
        var t = this.pubS;
        return t.ext && n.isPlainObject(t.ext) && (t.ext = JSON.stringify(t.ext)), t && n.forEach(t, function (e, i) {
          (n.isPlainObject(i) || "function" == typeof i) && n.removeAttribute(t, e);
        }), t && n.removeAttribute(t, "localStream"), t && n.removeAttribute(t, "_localMediaStream"), t && n.removeAttribute(t, "_webrtc"), this;
      },
      setRtcId: function (e) {
        return e && (this.rtcId = e), this;
      },
      setCver: function (e) {
        return e && (this.cver = e), this;
      },
      setEndReason: function (e) {
        return e && (this.endReason = e), this;
      },
      setNickName: function (e) {
        return e && (this.nickName = e), this;
      },
      setResource: function (e) {
        return e && (this.resource = e), this;
      },
      setReason: function (e) {
        return e && (this.reason = e), this;
      },
      setConfrId: function (e) {
        return e && (this.confrId = e), this;
      },
      setVoff: function (e) {
        return void 0 === e || (this.voff = e ? 1 : 0), this;
      },
      setAoff: function (e) {
        return void 0 === e || (this.aoff = e ? 1 : 0), this;
      },
      setFlag: function (e) {
        return 0 === e && (this.flag = 0), 1 === e && (this.flag = 1), this;
      },
      setExt: function (e) {
        return e && n.isPlainObject(e) && (e = JSON.stringify(e)), e && (this.ext = e), this;
      }
    }),
        d = wx.emedia.__session_globalCount = 0;

    function u(e, t, i) {
      var s = this;

      function a(e, n) {
        try {
          s.onWebsocketEvent(new r.WSClose({
            url: s.thisWsUri,
            retry: i,
            online: s.online,
            cause: e,
            event: n,
            session: s
          }));
        } finally {
          t && t(new r.WSClose({
            url: s.thisWsUri,
            retry: i,
            online: s.online,
            cause: e,
            event: n,
            session: s
          }));
        }
      }

      function d(e) {
        if (s.connected(s.thisWsUri)) {
          if (n.isPlainObject(e) && !(e instanceof c)) throw o.error("message not a Messages"), "message not a Messages";
          if (s.sessId && e.sessId != s.sessId) o.warn("self.sessId && message.sessId != self.sessId", e);else {
            var t = JSON.stringify(e);
            console.log("msg => ", t), s._websocket.send({
              data: t
            });
          }
        } else o.debug("current dont connect. the message = ", e);
      }

      if (s.connected(s.thisWsUri)) return e && e(s), o.info("Session connected. dont continue connect"), void (s.notifyNewMessage && s.notifyNewMessage());
      s.notifyNewMessage = function () {
        if (s.connected(s.thisWsUri)) {
          if (0 === s._bufferedMessages.length) return;

          for (var e, t = []; e = s._bufferedMessages.shift();) if (e.sessId || s.sessId || 200 == e.op) {
            if (200 === e.op) {
              d(e);
              break;
            }

            s.sessId && !e.sessId && (e.sessId = s.sessId);
            var r = d(e);
            r && t.push(r);
          } else t.push(e), o.warn("tmp store message, util enter success!", e);

          t.length > 0 && Array.prototype.push.apply(s._bufferedMessages, t);
        } else if (0 !== i && s.online) s.connected();else {
          var a = n.extend(!1, {}, s._callbacks),
              c = [];

          for (var u in a) {
            var l = a[u];
            i > 0 && !s.online ? c.push(l) : s.onMessage({
              op: 1001,
              tsxId: u,
              result: -9527,
              msg: "sdk rsp fail. retry fail or online = " + s.online
            });
          }

          s._bufferedMessages = s._bufferedMessages || [], c.length > 0 && Array.prototype.push.apply(s._bufferedMessages, c);
        }
      }, o.info("Session begin connect.");
      var u = s._websocket;
      u && (o.warn("will close. websocket state", u.readyState, u.url, s.thisWsUri), u.close(1e3));

      try {
        o.info("Connecting", s.thisWsUri, i), console.log("self.thisWsUri", s.thisWsUri), u = s._websocket = wx.connectSocket({
          url: s.thisWsUri
        });
      } catch (e) {
        return o.warn(e), void a(e);
      }

      u.onOpen=function (i) {
        var n = this.url;

        try {
          o.info("websocket connected:", n), t && (t = null), e && e(s);
        } finally {}
      }, u.onMessage=function (e) {
        o.debug("recv data", e.data);
        var t = JSON.parse(e.data);
        t && 1001 == t.op && o.debug("recv message: rsp:", t), t && 1001 != t.op && o.debug("recv message: evt:", t), console.log("收到的消息", t), s.onMessage(t);
      }, u.onClose=function (e) {
        console.log("closed");
        var t = this.url;
        o.info("Disconnected:", t, s.thisWsUri, e), t === s.thisWsUri ? (s.notifyNewMessage(), 1e3 !== e.code && a(void 0, e)) : o.warn("ignore onclose. caused by websocket url not ", s.thisWsUri, t);
      }, u.onError=function (e) {
        o.info("On error:", e), s.onWebsocketEvent(new r.WSError({
          event: e,
          online: s.online,
          session: s,
          url: this.url
        }));
      };
    }

    e.exports = n.prototypeExtend({
      _events: {
        0: "onReqP2P",
        1: "onNewCfr",
        2: "onDelCfr",
        3: "onReqTkt",
        100: "onPing",
        101: "onPong",
        102: "onInitC",
        103: "onReqC",
        104: "onAcptC",
        105: "onTcklC",
        106: "onAnsC",
        107: "onTermC",
        300: "onEnter",
        301: "onExit",
        302: "onPub",
        303: "onUnpub",
        304: "onMems",
        204: "onClose",
        400: "onStreamControl",
        401: "onJoin",
        412: "onRoleUpdate",
        1002: "onRemoteControl",
        1003: "onRecvRemoteMessage"
      },
      __init__: function () {
        var e = this;
        e._bufferedMessages = [], e._callbacks = {}, e.online = !0, o.info("online status = ", e.online);
      },
      _nextWsUri: function () {
        var e = this.ticket.url || "";

        if ("function" == typeof wx.emedia.convertWebsocketURLOfTicket) {
          var t = e;
          e = wx.emedia.convertWebsocketURLOfTicket(e), o.warn(t, "--\x3e", e);
        }

        return e.indexOf("?") >= 0 ? e += "&" + a++ : e += "?" + a++, this.ticket.confrId && (e += "&" + encodeURIComponent(this.ticket.confrId)), e;
      },
      _reconnect: function (e) {
        var t = this;

        function i() {
          o.warn("Reconnected. at ", e, t._websocket.url), t.__retryConnectIntervalId && clearTimeout(t.__retryConnectIntervalId), t.__retryConnectIntervalId && delete t.__retryConnectIntervalId;
          var i = t.newMessage().setOp(200).setSessId(t._sessionId).setTicket(t.ticket).setNickName(t.nickName || t.ticket.memName).setResource(t.resource).setExt(t.owner.ext);
          t.postMessage(i, function (e) {
            if (console.log("rep =>", e), 0 == e.result) t.onEvent(new r.EnterSuccess({
              ip: t.owner.ip
            })), t.owner.onMembers(e.cver, e.mems), t.owner.onStreams(e.cver, e.streams), t.notifyNewMessage();else try {
              t.onEvent(new r.EnterFail({
                me: t.owner,
                cause: new r.RspFail({
                  request: i,
                  response: e
                })
              }));
            } finally {
              -9527 !== e.result && t.onEvent(new r.ServerRefuseEnter({
                failed: e.result,
                msg: e.msg
              }));
            }
          });
        }

        t.connect(i, function n(r) {
          if (e <= 0) return o.warn("Reconnect end. but fail.", r.url, e), void (t.__retryConnectIntervalId && delete t.__retryConnectIntervalId);
          e && (t.__retryConnectIntervalId = setTimeout(function () {
            t.connect(i, n, --e);
          }, wx.emedia.config.reconnectDelay));
        }, --e);
      },
      __checkConnect: function () {
        var e = this;
        e.__checkConnectIntervalId && clearTimeout(e.__checkConnectIntervalId), wx.emedia.config.checkConnectIntervalMillis && (e.__checkConnectIntervalId = setTimeout(function () {
          try {
            e.online && !e.connected() && (e.__retryConnectIntervalId && o.debug("online, reconnecting..."), e.__retryConnectIntervalId || o.debug("online, but disconnect. will reconnect"), e.__retryConnectIntervalId || e._reconnect(wx.emedia.config.reconnect));
          } finally {
            e.__checkConnect();
          }
        }, wx.emedia.config.checkConnectIntervalMillis));
      },
      connect: function (e, t, i) {
        var n = this,
            s = n.thisWsUri = n._nextWsUri();

        void 0 !== i && o.warn("begin connect... at retry = ", i, s), u.call(n, function () {
          try {
            e.apply(n, arguments);
          } finally {
            n.__checkConnect();
          }
        }, function (e) {
          try {
            t.apply(n, arguments);
          } finally {
            i || e.url !== s || n.onEvent(new r.ServerRefuseEnter({
              failed: -95270,
              msg: "sdk reconnect fail. " + s + "|" + e.url
            }));
          }
        }, i);
      },
      connected: function (e) {
        return this.online && this._websocket;
      },
      onWebsocketEvent: function (e) {
        this.onEvent(e);
      },
      register: function (e) {
        if ("object" == typeof e) for (var t in e) this.bind(t, e[t]);
      },
      bind: function (e, t) {
        var i;
        if (!(i = this._events[e])) throw o.error("Not supported event = ", e), "Not supported event = " + e;
        this[i] = t;
      },
      getSessionId: function () {
        return this._sessionId;
      },
      newMessage: function (e) {
        return new c(e);
      },
      __modifyMessage: function (e) {
        if (e && e.sdp && ("string" == typeof e.sdp && (e.sdp = n.parseJSON(e.sdp)), e.sdp.type && (e.sdp.type = e.sdp.type.toLowerCase()), e.cctx && (e.sdp.cctx = e.cctx)), e && e.cands) {
          "string" == typeof e.cands && (e.cands = n.parseJSON(e.cands));

          for (var t = 0; t < e.cands.length; t++) "string" == typeof e.cands[t] && (e.cands[t] = n.parseJSON(e.cands[t])), e.cands[t].sdpMLineIndex = e.cands[t].mlineindex, e.cands[t].sdpMid = e.cands[t].mid, delete e.cands[t].mlineindex, delete e.cands[t].mid, e.cctx && (e.cands[t].cctx = e.cctx);
        }

        if (e && e.mems) {
          if (!n.isArray(e.mems)) return;
          var i = e.mems;
          e.mems = {}, n.forEach(i, function (t, i) {
            i.name && (i.memName = i.name), e.mems[i.id] = i;
            var r = i.acptOps = {};
            if (n.forEach(wx.emedia.config.baseAcptOps, function (e, t) {
              r[t] = !0;
            }), i.res && n.forEach(i.res.ops, function (e, t) {
              r[t] = !0;
            }), i && i.ext) try {
              e.mems[i.id].ext = JSON.parse(i.ext);
            } catch (e) {
              o.debug(e);
            }
          });
        }

        if (e && e.mem) {
          e.mem.name && (e.mem.memName = e.mem.name);
          var r = e.mem.acptOps = {};
          if (n.forEach(wx.emedia.config.baseAcptOps, function (e, t) {
            r[t] = !0;
          }), e.mem.res && n.forEach(e.mem.res.ops, function (e, t) {
            r[t] = !0;
          }), e.mem && e.mem.ext) try {
            e.mem.ext = JSON.parse(e.mem.ext);
          } catch (e) {
            o.debug(e);
          }
        }

        if (e && e.streams) {
          if (!n.isArray(e.streams)) return;
          var s = e.streams;
          e.streams = {}, n.forEach(s, function (t, i) {
            if (e.streams[i.id] = i, i && i.ext) try {
              e.streams[i.id].ext = JSON.parse(i.ext);
            } catch (e) {
              o.debug(e);
            }
          });
        }

        if (e && e.pubS && e.pubS && e.pubS.ext) try {
          e.pubS.ext = JSON.parse(e.pubS.ext);
        } catch (e) {
          o.debug(e);
        }
        if (e && e.ext) try {
          e.ext = JSON.parse(e.ext);
        } catch (e) {
          o.debug(e);
        }
        return e;
      },
      onMessage: function (e) {
        var t = this;

        function i(e) {
          var i,
              n = e.op;
          (i = t._events[n]) && (i = t[i]) ? i.call(t, e) : o.warn("Not supported event = ", e);
        }

        if (1001 === e.op && e.useUrl) {
          this.useUrl = e.useUrl;
          var a = t.ticket.memName;
          s._videos.useUrl = e.useUrl;
          var c = {
            role: e.role,
            memName: a,
            name: a,
            nickName: a,
            vcodes: e.vcodes,
            rtcCfg: e.rtcCfg,
            id: e.memId,
            isSelf: !0
          };
          t.onEnter.call(t, {
            mem: c
          });
        }

        if (1001 != e.op && !e.sessId) throw o.error("message sessId error. server evt data error"), "message sessId error. server evt data error";
        if (1001 != e.op && t._sessionId && t._sessionId != e.sessId) throw o.error("message sessId error. server and local not equal"), "message sessId error. server and local not equal";

        if (1004 !== e.op) {
          var d;
          e = t.__modifyMessage(e);
          var u = n.removeAttribute(t._callbacks, e.tsxId);

          if (u && 200 === u.op) {
            t._sessionId = e.sessId;
            var l = "string" == typeof e.yourIp ? e.yourIp : void 0;

            if ("string" == typeof t._session_ip && l != t._session_ip && (d = t._session_ip), o.info(t._sessionId, "ip is", l, d), t._session_ip = l, t.owner.ip = l, 0 === e.result) {
              for (var f in t._bufferedMessages) {
                var m = t._bufferedMessages[f];
                m.sessId || 200 === m.op || (m.sessId = e.sessId);
              }

              setTimeout(function () {
                t.notifyNewMessage();
              }, 100);
            } else for (var h; h = t._bufferedMessages.shift();) 200 !== h.op && t.onMessage({
              op: 1001,
              tsxId: h.tsxId,
              result: -9527,
              msg: "sdk enter fail. sdk callback. enter result = " + e.result
            });
          }

          if (t.owner && t.owner.closed) o.warn("self closed. me is " + t.owner.getMemberId() + ", session_id = " + t.getSessionId() + ". drop message", e);else {
            if (t.onEvent(new r.RecvResponse({
              request: u,
              response: e
            })), u && u.__callback__ && 1004 !== e.op) return u.__callback__(e), void (d && t.onWebsocketEvent(new r.NetworkChanaged({
              preIp: d,
              nowIp: t._session_ip
            })));
            e.op && 1001 != e.op ? (i(e), d && t.onWebsocketEvent(new r.NetworkChanaged({
              preIp: d,
              nowIp: t._session_ip
            }))) : o.debug("Igron message. caused by op not found.", e);
          }
        } else i(e);
      },
      __modifyMessageForPost: function (e) {
        if (e.cands) {
          for (var t = [], i = e.cands, o = 0; o < i.length; o++) {
            var r;
            0 == o && i[o].cctx && (e.cctx = i[o].cctx), r = "string" == typeof i[o] ? {
              type: "candidate",
              candidate: i[o],
              mlineindex: 0,
              mid: "audio"
            } : {
              type: "candidate",
              candidate: i[o].candidate,
              mlineindex: i[o].sdpMLineIndex,
              mid: i[o].sdpMid
            }, t.push(JSON.stringify(r));
          }

          e.cands = t;
        }

        if (e.sdp && "string" != typeof e.sdp) {
          var s = {
            type: e.sdp.type,
            sdp: e.sdp.sdp
          };
          e.sdp.cctx && (e.cctx = e.sdp.cctx), e.sdp = s, e.sdp.type = e.sdp.type.toUpperCase(), e.sdp = n.stringifyJSON(e.sdp);
        }

        return e.pubS && n.removeAttribute(e.pubS, "_located"), e.pubS && n.removeAttribute(e.pubS, "mutedMuted"), e.pubS && n.removeAttribute(e.pubS, "mediaStream"), e.pubS && n.removeAttribute(e.pubS, "isRepublished"), e.pubS && n.removeAttribute(e.pubS, "optimalVideoCodecs"), "function" == typeof e.post && n.removeAttribute(e, "post"), e;
      },
      postMessage: function (e, t, i) {
        console.log(e);
        var r = this;

        if (e.tsxId || (e.tsxId = "MSG" + Date.now() + "-" + d++), e.memId) {
          var s = r.owner._cacheMembers[e.memId];
          if (!s) return o.warn("Member not found at local. memberId = " + e.memId, e), void (t && t({
            op: 1001,
            tsxId: e.tsxId,
            result: -507,
            msg: " member not found at local. memberId = " + e.memId
          }));
          var a = e._reqOps;

          for (var c in a || (a = []).push(e.op), a) {
            var u = a[c];
            if (!s.acptOps[u]) return o.warn("Member not accept op " + u + ", " + e.memId, e), void (t && t({
              op: 1001,
              tsxId: e.tsxId,
              result: -507,
              msg: " member not accept op " + u + ", " + e.memId
            }));
          }
        }

        if (n.removeAttribute(e, "_reqOps"), r._sessionId && r._sessionId != e.sessId) return o.warn("sessionId not excepted. self._sessionId = " + r._sessionId, e), void (t && t({
          op: 1001,
          tsxId: e.tsxId,
          result: -9527,
          msg: "sessionId not excepted."
        }));
        if (r.closed) return o.warn("session closed.", e), void (t && t({
          op: 1001,
          tsxId: e.tsxId,
          result: -9527,
          msg: "session closed"
        }));
        var l = n.extend({}, e);
        if (!(e = r.__modifyMessageForPost(e))) return o.warn("Message drop. callback success.", e), void (t && t({
          op: 1001,
          tsxId: l.tsxId,
          result: 0,
          msg: "Message drop. callback success."
        }));
        200 === e.op ? (r._bufferedMessages.unshift(e), t && setTimeout(function () {
          r._callbacks[e.tsxId] && (o.error("Enter timeout. fail."), r.onMessage({
            op: 1001,
            tsxId: e.tsxId,
            result: -9527,
            msg: "enter timeout. millis = " + wx.emedia.config.enterTimeout
          }));
        }, wx.emedia.config.enterTimeout || 2e3)) : r._bufferedMessages.push(e), t && (r._callbacks[e.tsxId] = n.extend(e, {
          __callback__: t.bind(r.owner)
        })), r.notifyNewMessage && r.notifyNewMessage(), i && t && setTimeout(function () {
          var e = r._callbacks[e.tsxId];
          e && e.__callback__ && e.__callback__({
            op: 1001,
            tsxId: l.tsxId,
            result: -408,
            msg: "Message request timeout."
          }), n.removeAttribute(r._callbacks, e.tsxId);
        }, i);
      },
      close: function (e) {
        o.warn("sessiong closing, reason = ", e);
        this.notifyNewMessage && this.notifyNewMessage(), this.closed = !0, this.seqno = 0, this._websocket && (0 == e || 100 == e ? this._websocket.close(1e3) : this._websocket.close()), this.__retryConnectIntervalId && clearTimeout(this.__retryConnectIntervalId), this.__retryConnectIntervalId && delete this.__retryConnectIntervalId, this.__checkConnectIntervalId && clearTimeout(this.__checkConnectIntervalId), this.__checkConnectIntervalId && delete this.__checkConnectIntervalId, this.owner = null, this._bufferedMessages = [], this._callbacks = {}, o.warn("session closed");
      }
    });
  }, function (e, t, i) {
    var n = i(0),
        o = n.tagLogger("Me"),
        r = i(9),
        s = i(1),
        a = i(4),
        c = i(2),
        d = r.extend({
      __init__: function () {
        if (this._session || this.sessionFactory && (this._session = this.sessionFactory()), !this._session) throw o.error("Require session"), "Require session";
        this._cver = 0, this._cacheMembers = {}, this._cacheStreams = {}, this._streamAutomators = {}, this._mediaMeters = {}, this._openedRtcMediaStreams = {}, this._linkedStreams = {}, this._maybeNotExistStreams = {}, this._records = {}, this._ices = {}, this.audioMixers = {}, this.closed = !1, this._nextStreamSeqno = 0, this.getMediaMeterIntervalMillis = this.getMediaMeterIntervalMillis || wx.emedia.config.getMediaMeterIntervalMillis;
      },
      getCurrentMembers: function () {
        var e = [];
        return n.forEach(this._cacheMembers, function (t, i) {
          var o = n.extend(!0, {}, i);
          e.push(o);
        }), e;
      },
      newStream: function (e) {
        var t = this;
        return new a(e, {
          __init__: function () {
            if (this.rtcId || this._webrtc && (this.rtcId = this._webrtc.getRtcId()), this._webrtc || this.rtcId && (this._webrtc = t._ices[this.rtcId]), this.__create_id = t._nextStreamSeqno++, this.memId && !this.owner && (this.owner = n.extend({}, t._cacheMembers[this.memId]), !this.owner && !this.located())) throw o.error("Remote stream, not owner. it = ", this.id), "Remote stream, not owner. it = " + this.id;
          }
        });
      },
      getConfrId: function () {
        return this.ticket.confrId;
      },
      isCaller: function () {
        return this.isP2P() && this.ticket.caller == this.ticket.memName;
      },
      isCallee: function () {
        return this.isP2P() && this.ticket.callee == this.ticket.memName;
      },
      isP2P: function () {
        return this.ticket && ("P2P" == this.ticket.type || "p2p" == this.ticket.type);
      },
      isConfr: function () {
        return this.ticket && ("CONFR" == this.ticket.type || "confr" == this.ticket.type);
      },
      onEvent: function (e) {},
      join: function (e, t) {
        var i = this;
        wx.emedia.requireTrustBeforeJoin() ? i.someBrowsersRequireGetUserMedia(function () {
          i._join(e, t);
        }, t) : i._join(e, t);
      },
      _join: function (e, t) {
        o.debug("begin join ...");
        var i,
            n = this;
        if (n._memberId) return o.warn("Had joined. igrone it"), void (e && e(n.memId));

        function r(e) {
          try {
            if (e instanceof s.WSClose && e.retry) return;
            e instanceof s.EnterFail || (e = new s.EnterFail({
              attendee: n,
              cause: e
            })), n.onEvent(e), t && t(e);
          } finally {}
        }

        function a(t) {
          if (console.log("enter rps", t), 0 == t.result) {
            n.reflushSupportVCodes(t.vcodes), n.setMemberId(t.memId), n.role = t.role, n.onEvent(new s.EnterSuccess({
              ip: n.ip
            })), e && e(t.memId);

            try {
              n.__rtc_cfg = t.rtcCfg, "string" == typeof t.rtcCfg && (n.__rtc_cfg = JSON.parse(t.rtcCfg));
            } finally {
              n.onMembers(t.cver, t.mems), n.onStreams(t.cver, t.streams);
            }
          } else try {
            r(new s.RspFail({
              request: i,
              response: t
            }));
          } finally {
            -9527 !== t.result && n.onEvent(new s.ServerRefuseEnter({
              failed: t.result,
              msg: t.msg
            }));
          }
        }

        n.connect(function () {
          i = n.newMessage().setOp(200).setTicket(n.ticket).setNickName(n.nickName || n.ticket.memName).setResource(n.resource).setExt(n.ext), n.postMessage(i, a);
        }, r), o.debug("join", n.ticket.url);
      },
      withpublish: function (e) {
        var t,
            i = this;
        if (!e || !e.localStream) throw o.error("pubS null or stream not open"), "pubS null or stream not open";
        var n,
            r = e && e.localStream;
        return {
          join: function (a, c) {
            if (1 === arguments.length && (c = a, a = void 0), i._memberId) return o.warn("Had joined. igrone it"), void (a && a(i.memId));

            function d(e) {
              try {
                if (e instanceof s.WSClose && e.retry) return;
                e instanceof s.EnterFail || (e = new s.EnterFail({
                  attendee: i,
                  cause: e
                })), i.onEvent(e), c && c(e);
              } finally {
                wx.emedia.stopTracks(r), n && i.closeWebrtc(n.getRtcId());
              }
            }

            var u = i.getOptimalVideoCodecs();

            function l(r) {
              if (console.log("enter rps2", r), 0 == r.result) {
                i.reflushSupportVCodes(r.vcodes), i.setMemberId(r.memId), i.role = r.role, i.onEvent(new s.EnterSuccess({
                  ip: i.ip
                }));
                var c = i.newStream(e);
                c.updateAttributes({
                  _localMediaStream: e.localStream,
                  rtcId: n.getRtcId(),
                  _webrtc: n,
                  id: r.streamId,
                  csrc: r.csrc,
                  owner: {
                    id: r.memId,
                    nickName: i.nickName,
                    name: i.sysUserId,
                    ext: i.extObj
                  },
                  optimalVideoCodecs: u
                }), a && a(r.memId, c), n.useIp = i.ip, i.onEvent(new s.PushSuccess({
                  stream: c,
                  hidden: !0
                })), r.sdp && i.ansC(n.getRtcId(), r.sdp), r.cands && i.tcklC(n.getRtcId(), r.cands);

                try {
                  i.__rtc_cfg = r.rtcCfg, "string" == typeof r.rtcCfg && (i.__rtc_cfg = JSON.parse(r.rtcCfg)), i.__rtc_cfg && i.__rtc_cfg.iceServers && i.__rtc_cfg.iceServers.length > 0 && (o.warn("Server rsp one rtc cfg. publish will republish"), i._service && setTimeout(function () {
                    i._service._republish(c);
                  }, 200));
                } finally {
                  i.onMembers(r.cver, r.mems), i.onStreams(r.cver, r.streams);
                }
              } else try {
                d(new s.RspFail({
                  request: t,
                  response: r
                }));
              } finally {
                -9527 !== r.result && i.onEvent(new s.ServerRefuseEnter({
                  failed: r.result,
                  msg: r.msg
                }));
              }
            }

            i.connect(function () {
              o.debug("enter and pubs");
              var r,
                  s,
                  a = e.localStream;
              2 === e.type && (r = {
                offerToReceiveAudio: !0,
                offerToReceiveVideo: !1
              }, s = {
                subSVideo: !1,
                subSAudio: !0
              }), n = i.createWebrtc({
                _rtcId: e.rtcId,
                optimalVideoCodecs: u,
                offerOptions: r,
                subArgs: s,
                vbitrate: e.vbitrate || e.constaints && e.constaints.video && e.constaints.video.bitrate,
                abitrate: e.abitrate || e.constaints && e.constaints.audio && e.constaints.audio.bitrate
              }, e.iceRebuildCount), i.setLocalStream(a, n.getRtcId()), i.doOffer(n.getRtcId(), function (o) {
                t = i.newMessage().setOp(200).setTicket(i.ticket).setNickName(i.nickName || i.ticket.memName).setResource(i.resource).setSdp(o).setRtcId(n.getRtcId()).setPubS(e).setExt(i.ext), i.postMessage(t, l);
              });
            }, d), o.debug("join", i.ticket.url);
          }
        };
      },
      push: function (e, t, i, n) {
        o.debug("begin push ...");
        var r,
            a = this;
        if (2 === arguments.length && (i = t, t = void 0), !e || !e.localStream) throw o.error("pubS or stream open"), "pubS or stream open";
        var c,
            d = e.localStream;

        function u(t) {
          try {
            var o = a.newStream(e);
            o.updateAttributes({
              _localMediaStream: e.localStream,
              _webrtc: c,
              rtcId: c && c.getRtcId(),
              owner: {
                id: a.getMemberId(),
                nickName: a.nickName,
                name: a.sysUserId,
                ext: a.extObj
              }
            });
            t = new s.PushFail({
              stream: o,
              cause: t,
              hidden: n && !0 === t.hidden
            });
            a.onEvent(t), t.hidden || i && i(t);
          } finally {
            d && !0 !== t.hidden && wx.emedia.stopTracks(d), c && a.closeWebrtc(c.getRtcId(), !0 === t.hidden);
          }
        }

        if (e.rtcId || 2 !== e.type || wx.emedia.config.allowRepeatAudioMixerPublish || !a._service.hasAudioMixers()) {
          var l = e.optimalVideoCodecs || a.getOptimalVideoCodecs();
          m(e), o.debug("push", a.ticket.url);
        } else u(new s.AudioMixerStreamRepeatPublish());

        function f(i, n) {
          if (0 == n.result) {
            var o = a.newStream(e);
            o.updateAttributes({
              _localMediaStream: e.localStream,
              _webrtc: i,
              rtcId: i.getRtcId(),
              id: n.streamId,
              csrc: n.csrc,
              owner: {
                id: a.getMemberId(),
                nickName: a.nickName,
                name: a.sysUserId,
                ext: a.extObj
              },
              optimalVideoCodecs: l
            }), o.id && 2 === o.type && (a.audioMixers[o.id] = o);

            try {
              a.onEvent(new s.PushSuccess({
                stream: o,
                hidden: !0
              }));
            } finally {
              n.sdp && a.ansC(i.getRtcId(), n.sdp), n.cands && a.tcklC(i.getRtcId(), n.cands), t && t(o);
            }
          } else u(new s.RspFail({
            request: r,
            response: n,
            hidden: !0 === n.retrying
          }));
        }

        function m(e) {
          o.debug("pubs");
          var t,
              i,
              n = e.localStream;
          2 === e.type && (t = {
            offerToReceiveAudio: !0,
            offerToReceiveVideo: !1
          }, i = {
            subSVideo: !1,
            subSAudio: !0
          }), c = a.createWebrtc({
            _rtcId: e.rtcId,
            optimalVideoCodecs: l,
            offerOptions: t,
            subArgs: i,
            vbitrate: e.vbitrate || e.constaints && e.constaints.video && e.constaints.video.bitrate,
            abitrate: e.abitrate || e.constaints && e.constaints.audio && e.constaints.audio.bitrate
          }, e.iceRebuildCount), a.setLocalStream(n, c.getRtcId()), a.doOffer(c.getRtcId(), function (t) {
            r = a.newMessage().setOp(102).setRtcId(c.getRtcId()).setSdp(t).setPubS(e), a.postMessage(r, function (e) {
              f(c, e);
            });
          });
        }
      },
      isSafari: function () {
        return wx.emedia.isSafari;
      },
      someBrowsersRequireGetUserMedia: function (e, t) {
        var i = this;

        if (wx.emedia.youInSomeBrowsers() && !wx.emedia._yetGetUserMedia) {
          if (!0 === i.__tryingOpenMedia) i.__tryingOpenMediaWaitSuceess = i.__tryingOpenMediaWaitSuceess || [], i.__tryingOpenMediaWaitFail = i.__tryingOpenMediaWaitFail || [], "function" == typeof e && i.__tryingOpenMediaWaitSuceess.push(e), "function" == typeof t && i.__tryingOpenMediaWaitFail.push(t);else {
            function r(t, o) {
              wx.emedia._yetGetUserMedia = !0, wx.emedia.stopTracks(o), setTimeout(function () {
                i.__tryingOpenMedia = !1, e && e.apply(i), i.__tryingOpenMediaWaitSuceess && n.forEach(i.__tryingOpenMediaWaitSuceess, function (e, t) {
                  t.apply(i);
                }), i.__tryingOpenMediaWaitSuceess = [], i.__tryingOpenMediaWaitFail = [];
              }, 300);
            }

            function s(e) {
              i.__tryingOpenMedia = !1, o.error("Some browsers must getUserMedia, gather cands. now try get audio. fail. subfail"), t && t.call(i, e), i.__tryingOpenMediaWaitFail && n.forEach(i.__tryingOpenMediaWaitFail, function (t, n) {
                n.call(i, e);
              }), i.__tryingOpenMediaWaitSuceess = [], i.__tryingOpenMediaWaitFail = [];
            }

            i.__tryingOpenMedia = !0, i._service.__getUserMedia({
              audio: !0
            }, r, function (e) {
              i._service.__getUserMedia({
                video: !0
              }, r, s);
            });
          }
          return !0;
        }

        return !1;
      },
      createWebrtcAndSubscribeStream: function (e, t, i, r) {
        var a = this;
        t || (t = {});
        var c = a._cacheStreams[e],
            d = a._cacheMembers[c.memId],
            u = c;

        function l(i) {
          o.warn("sub stream error", e, i), g && u._webrtc && u._webrtc.setSubArgs(g), g && u.updateAttributes({
            subArgs: g
          }), i = new s.SubFail({
            stream: u,
            hidden: !0 === i.hidden,
            cause: i
          }), t && t.onEvent && t.onEvent(i), a.onEvent && a.onEvent(i);
        }

        function f() {
          u.updateAttributes(u.subArgs);
        }

        r = r || u.subArgs || {
          subSVideo: !0,
          subSAudio: 2 !== c.type
        };

        var m = c.vcodes || [],
            h = d && d.vcodes || [],
            p = a.supportVCodes,
            _ = a._getOptimalVideoCodecsSubset(m, h, p);

        r = r || u.subArgs;
        var g = u.subArgs,
            v = !(u.vcodes && u.vcodes.length > 0);
        wx.emedia.isSafari && (v = v || !!u.voff);
        var b = {
          offerToReceiveAudio: !0,
          offerToReceiveVideo: r.subSVideo && !v
        };

        function S() {
          var s = a.createWebrtc({
            iceServerConfig: i,
            optimalVideoCodecs: _,
            offerOptions: b,
            onGotMediaStream: function (e) {
              t.onGotRemote && t.onGotRemote(u);
            }
          }, u.iceRebuildCount),
              c = s.getRtcId();
          o.warn(c, " sub stream ", e, _), u.updateAttributes({
            _webrtc: s,
            rtcId: c,
            owner: n.extend({}, d)
          }), r && u._webrtc && u._webrtc.setSubArgs(r), r && u.updateAttributes({
            subArgs: r
          });
        }

        b.offerToReceiveAudio || b.offerToReceiveVideo || o.warn("offerToReceiveAudio == false and offerToReceiveVideo == false"), a.someBrowsersRequireGetUserMedia(function () {
          S(), a.offerCall(u.rtcId, null, e, l, f);
        }, function (t) {
          o.error("Some browsers must getUserMedia, gather cands. now try get audio. fail. subfail", e), l(t);
        }) || (S(), a.offerCall(u.rtcId, null, e, l, f));
      },
      _getOptimalVideoCodecsSubset: function (e, t, i) {
        var o = this,
            r = [];
        if (e && e.length > 0 && i[e[0]] && r.push(e[0]), 0 == r.length) for (var s = 0; s < o._orderVCodes.length; s++) n.forEach(t, function (e, t) {
          t == o._orderVCodes[s] && r.push(t);
        });
        return r;
      },
      subscribeStream: function (e, t, i, o, r) {
        var a = this,
            c = a._ices[e],
            d = a._cacheStreams[t],
            u = a._cacheMembers[d.memId],
            l = d;
        l.updateAttributes({
          _webrtc: c,
          rtcId: e,
          owner: n.extend({}, u)
        });
        var f = l.subArgs;

        if (o = o || {
          subSVideo: !0,
          subSAudio: !0
        }, l.updateAttributes({
          subArgs: l.subArgs || {
            subSVideo: !0,
            subSAudio: !0
          }
        }), l._webrtc && l._webrtc.setSubArgs(l._webrtc.subArgs || {
          subSVideo: !0,
          subSAudio: !0
        }), !l.subArgs.subSVideo && o.subSVideo && !l.voff) {
          var m = d.vcodes,
              h = u.vcodes,
              p = a.supportVCodes;

          a._getOptimalVideoCodecsSubset(m, h, p);
        }

        o && l._webrtc && l._webrtc.setSubArgs(o), o && l.updateAttributes({
          subArgs: o
        });

        var _ = a.newMessage().setOp(205).setRtcId(e).setSubSId(t);

        o && n.extend(_, o), a.postMessage(_, function (e) {
          if (0 != e.result) {
            f && l._webrtc && l._webrtc.setSubArgs(f), f && l.updateAttributes({
              subArgs: f
            });
            var t = new s.SubFail({
              stream: l,
              cause: new s.RspFail({
                request: _,
                response: e
              })
            });
            return i && i(t), void a.onEvent(t);
          }

          l.updateAttributes(l.subArgs);
          t = new s.SubSuccess({
            stream: l,
            hidden: !0
          });
          a._updateRemoteStream(l, l._webrtc.getRemoteStream()), a.onEvent(t), "function" == typeof r && r();
        });
      },
      unsubscribeStream: function (e) {
        var t = this._cacheStreams[e],
            i = t._webrtc && t._webrtc.getRtcId();

        if (i) {
          try {
            var n = this.newMessage().setOp(206).setRtcId(i).setSubSId(e);
            this.postMessage(n);
          } finally {
            this.closeWebrtc(i);
          }

          return i;
        }
      },
      onEnter: function (e, t) {
        var i = this;

        if (e && (i._cver = e), t && !i._cacheMembers[t.id]) {
          i._cacheMembers[t.id] = t;
          var o = {};
          t.res && t.res.vcodes && t.res.vcodes.length > 0 && n.forEach(t.res.vcodes, function (e, t) {
            o[t] || (o[t] = !0, i.supportVCodes[t] && i.supportVCodes[t]++);
          }), i.onAddMember(n.extend({}, t));
        }
      },
      _onFinally: function () {
        this._cacheMembers = {}, this._cacheStreams = {}, this._linkedStreams = {}, this._ices = {}, this._maybeNotExistStreams = {};
        var e = [];
        if (n.forEach(this._openedRtcMediaStreams, function (t, i) {
          !1 !== i.active && e.push(i);
        }), e.length > 0) for (var t = 0; t < e.length; t++) try {
          var i = e[t];
          o.info("exit, close stream = ", i.id), wx.emedia.stopTracks(i);
        } catch (e) {
          o.error(e);
        }
        o.warn("finally. all clean.");
      },
      _onRoleUpdate: function (e, t) {
        o.info("Role ", e, " <-", this.role), o.info(t), this.role = e, this.roleToken = t, this.onRoleUpdate && this.onRoleUpdate(e, t);
      },
      onExit: function (e, t, i) {
        var r = this;

        if (e && (r._cver = e), t != r.getMemberId()) {
          var a = r._cacheMembers[t];
          a && (a.res && a.res.vcodes && a.res.vcodes.length > 0 && n.forEach(a.res.vcodes, function (e, t) {
            r.supportVCodes[t]--;
          }), r._onRemoveMember(a, i), r.onEvent(new s.Hangup({
            reason: i,
            parnter: a
          })));
        } else {
          o.warn("Me exit. ", i, t);

          try {
            r.closed || r.close(i);
          } catch (e) {
            r.onEvent(new s.Hangup({
              reason: i,
              self: {
                id: r._memberId
              }
            })), r.onMeExit && r.onMeExit(i), o.warn(e);
          }
        }
      },
      onPub: function (e, t, i) {
        console.log("onPub 1 >>>>>>", t), console.log(t), console.log(i), this._cacheMembers[t] || o.error("No found member. when pub");
        var r = this.newStream(i),
            s = this._cacheStreams[i.id];
        if (e && (this._cver = e), s && r.sver !== s.sver) return o.info("Onpub. the steam ", s.id, " republish. sver ", s.sver, r.sver), !r || r.aoff === s.aoff && r.voff == s.voff || this.onStreamControl(void 0, i.id, r.voff, r.aoff), n.extend(s, r), void this._onRepublishStream(s);
        var a = r;
        a.updateAttributes({
          owner: this._cacheMembers[t]
        }), this._cacheStreams[i.id] = a, this._onAddStream(this.newStream(a));
        this.newStream(a).id;
        return a;
      },
      onUnpub: function (e, t, i) {
        var n = this._cacheStreams[i];
        this._onRemovePubstream(this._cacheMembers[t], n), e && (this._cver = e);
      },
      onClose: function (e, t, i) {
        try {
          this.close(i || 0);
        } finally {
          this.onConfrClose && this.onConfrClose(t, i);
        }
      },
      __getWebrtcFor: function (e) {
        var t = this._cacheStreams[e] && this._cacheStreams[e]._webrtc;
        return t && t.getRtcId();
      },
      _getWebrtc: function (e) {
        return this._cacheStreams[e] && this._cacheStreams[e]._webrtc;
      },
      _updateRemoteStream: function (e, t) {
        e.located() && 2 === e.type ? wx.emedia.enableAudioTracks(t, !0) : wx.emedia.enableAudioTracks(t, !(e.aoff || e.subArgs && !1 === e.subArgs.subSAudio)), wx.emedia.enableVideoTracks(t, !(e.voff || e.subArgs && !1 === e.subArgs.subSVideo));
      },
      onStreamControl: function (e, t, i, n, o) {},
      aoff: function (e, t, i) {
        var n = this.__getWebrtcFor(e.id);

        if (!n) throw o.error("pubS not publish", e.id), "pubS not publish" + e.id;
        this._linkedStreams[e.id].updateAttributes({
          aoff: t
        }), e.updateAttributes({
          aoff: t
        });
        var r = this.newMessage().setOp(400).setRtcId(n).setVoff(e.voff).setAoff(t);
        this.postMessage(r, i), this.onUpdateStream && this.onUpdateStream(e, new e.Update({
          aoff: t
        }));
      },
      voff: function (e, t, i) {
        var n = this.__getWebrtcFor(e.id);

        if (!n) throw o.error("pubS not publish", e.id), "pubS not publish" + e.id;
        this._linkedStreams[e.id].updateAttributes({
          voff: t
        }), e.updateAttributes({
          voff: t
        });
        var r = this.newMessage().setOp(400).setRtcId(n).setVoff(t).setAoff(e.aoff);
        this.postMessage(r, i), this.onUpdateStream && this.onUpdateStream(e, new e.Update({
          voff: t
        }));
      },
      startRecord: function (e, t) {
        var i = this,
            r = e.rtcId,
            s = i.newMessage().setOp(500).setRtcId(r).setFlag(1);
        i.postMessage(s, function (s) {
          o.warn("record ", r, s.result, s.msg), t && t(0 === s.result), 0 === s.result && (i._records[e.id] = n.extend(!1, {}, e));
        });
      },
      stopRecord: function (e, t) {
        var i = e.rtcId,
            r = this.newMessage().setOp(500).setRtcId(i).setFlag(0);
        this.postMessage(r, function (e) {
          o.warn("stop record ", i, e.result, e.msg), t && t(0 === e.result);
        }), this._records[e.id] && n.removeAttribute(this._records, e.id);
      },
      onMembers: function (e, t) {
        var i = this,
            o = [];
        n.forEach(i._cacheMembers, function (e, i) {
          t[e] || o.push(i);
        });
        var r = [];
        n.forEach(t, function (e, t) {
          (t.name && t.name != i.memName || !t.name && e != i.getMemberId()) && (i._cacheMembers[e] || r.push(t), i._cacheMembers[e] && n.extend(i._cacheMembers[e], t));
        }), n.forEach(r, function (e, t) {
          i.onEnter(void 0, t);
        }), e && (i._cver = e);
      },
      onStreams: function (e, t) {
        var i = this,
            o = [];
        n.forEach(i._cacheStreams, function (e, i) {
          i.located() || t[e] || o.push(i);
        }), n.forEach(o, function (e, t) {
          i.onUnpub(void 0, t.memId, t.id);
        });
        var r = [];
        n.forEach(t, function (e, t) {
          (t.memName && t.memName != i.memName || !t.memName && t.memId != i.getMemberId()) && (i._cacheStreams[e] || r.push(t), i._cacheStreams[e] && n.extend(i._cacheStreams[e], t));
        }), n.forEach(r, function (e, t) {
          i.onPub(void 0, t.memId, t);
        }), n.forEach(i._cacheStreams, function (e, o) {
          var r;
          o.located() || (r = t[e]), !r || r.aoff === o.aoff && r.voff == o.voff || i.onStreamControl(void 0, e, r.voff, r.aoff), r && r.sver !== o.sver && (n.extend(o, r), i._onRepublishStream(o));
        }), e && (i._cver = e);
      },
      _onRemoveMember: function (e, t) {
        var i = this;
        o.info("remove", e, t);
        var r = [];
        n.forEach(i._cacheStreams, function (t, i) {
          (i.memId || i.owner && i.owner.id) === e.id && r.push(i);
        }), n.forEach(r, function (e, n) {
          i._onRemovePubstream(n.owner, n, t);
        }), n.removeAttribute(i._cacheMembers, e.id), i.onRemoveMember && i.onRemoveMember(e, t);
      },
      _onAddStream: function (e) {
        o.info("add stream ", e.id), o.debug("add stream ", e);
        this.onAddStream(e);
      },
      _onRemovePubstream: function (e, t, i) {
        var o = this;
        if (t && 0 != t.id) try {
          var r = n.removeAttribute(o._mediaMeters, t.id);
          r && r._finally();
        } finally {
          !function (e) {
            if (2 === e.type && (n.removeAttribute(o.audioMixers, e.id), e.remotePlayAudioObject && document.body.removeChild(e.remotePlayAudioObject)), i || (i = "Unpub"), e && !e.closeReason && e.updateAttributes({
              closeReason: i
            }), o.unsubscribeStream(e.id), n.removeAttribute(o._cacheStreams, e.id), o._streamAutomators && n.removeAttribute(o._streamAutomators, e.id), o._monitSoundChanagedStreams && n.removeAttribute(o._monitSoundChanagedStreams, e.id), o.onRemoveStream) {
              e = o.newStream(e);
              o.onRemoveStream(e);
            }
          }(t);
        }
      },
      _onRepublishStream: function (e) {
        if (!this._ices[e.rtcId] && !wx.emedia.subscribed(e) || this._maybeNotExistStreams[e.id]) this.onUpdateStream(e);else {
          this.unsubscribeStream(e.id);
          this.createWebrtcAndSubscribeStream(e.id, {
            onGotRemote: function (e) {}
          });
        }
      },
      _onRecvRemoteMessage: function (e, t, i) {
        o.debug("Recv remote message", e, t);
        var n,
            r = this._cacheMembers[e];

        try {
          n = JSON.parse(t);
        } catch (e) {}

        this.onRecvRemoteMessage && this.onRecvRemoteMessage(r || e, n || t, i);
      },
      _onSoundChanage: function (e, t, i) {
        wx.emedia.config._printSoundData && o.info("Stream id " + t.id + ", meter " + (i && i.instant.toFixed(2) + " " + i.slow.toFixed(2) + " " + i.clip.toFixed(2) + " " + (i.trackAudioLevel || "--") + " " + (i.trackTotalAudioEnergy || "--"))), i || (i = {
          instant: 0,
          slow: 0,
          clip: 0
        }), wx.emedia.config.logVolumeWhenInstantGE && wx.emedia.config.logVolumeWhenInstantGE > 0 && i.instant >= wx.emedia.config.logVolumeWhenInstantGE && i.instant < 3 * wx.emedia.config.logVolumeWhenInstantGE && o.info("Stream id " + t.id + ", webrtc = " + (t._webrtc ? t._webrtc.getRtcId() : "null") + ", media streamId = " + (t.getMediaStream() ? t.getMediaStream().id : "null") + ", instant >= " + wx.emedia.config.logVolumeWhenInstantGE + ", meter instant=" + i.instant + ", slow=" + i.slow + ", clip=" + i.clip);
        0 === i.instant && (i.instant = i.trackAudioLevel || i.trackTotalAudioEnergy || 0), this.onSoundChanage(e, t, i), this._service._judgeTalking(i) && this.onTalking(e, t, i);
      },
      onAddMember: function (e) {
        c.onMemberJoined(e);
      },
      onRemoveMember: function (e, t) {
        c.onMemberExited(e, t);
      },
      onAddStream: function (e) {
        c.onStreamAdded(e);
      },
      onRemoveStream: function (e) {
        c.onStreamRemoved(e);
      },
      onUpdateStream: function (e, t) {},
      onRecvRemoteMessage: function (e, t) {},
      onSoundChanage: function (e, t, i) {},
      onTalking: function (e, t, i) {},
      onRoleUpdate: function (e, t) {
        c.onRoleChanged(e, t);
      },
      onMeExit: function (e) {
        c.onConferenceExit(e);
      }
    });
    e.exports = d;
  }, function (e, t, i) {
    var n = i(0),
        o = n.tagLogger("Member"),
        r = i(1),
        s = i(3);
    e.exports = n.prototypeExtend({
      __init__: function () {
        if (!this._session) throw o.error("Require session"), "Require session";
        this.closed = !1, this._ices = {}, this.supportVCodes = {}, this.audioMixers = {};
      },
      reflushSupportVCodes: function (e) {
        var t = this;
        t.supportVCodes = {}, t._orderVCodes = e, e && 0 != e.length ? n.forEach(e, function (e, i) {
          t.supportVCodes[i] = 1;
        }) : o.warn("Not config support vcodes");
      },
      getOptimalVideoCodecs: function () {
        var e = 0;
        n.forEach(this._cacheMembers, function () {
          e++;
        });

        for (var t, i = 0, o = 0; o < this._orderVCodes.length; o++) {
          var r = this._orderVCodes[o];
          if (0 == i && (i = this.supportVCodes[r]), this.supportVCodes[r] > e) return r;
          this.supportVCodes[r] > i && (i = this.supportVCodes[r], t = r);
        }

        return t;
      },
      setMemberId: function (e) {
        this._memberId = e;
      },
      getMemberId: function () {
        return this._memberId || this.id;
      },
      createWebrtc: function (e, t) {
        var i = this;
        e || (e = {}), n.extend(e, {
          _rebuildCount: t || 0
        }), !0 === i._service.useRTCCfg && i.__rtc_cfg ? e.iceServerConfig = n.extend(!0, {}, i.__rtc_cfg) : n.isPlainObject(i._service.useRTCCfg) && (e.iceServerConfig = n.extend(!0, {}, i._service.useRTCCfg));
        var a = new s({
          confrAttendee: i,
          useIp: i.ip,
          onIceStateChange: function (e) {
            var t = e;
            o.debug("evt.target ice state", t);

            try {
              if ("failed" == t) return i.onEvent(new r.ICEConnectFail({
                webrtc: a
              })), void (a.onEvent && a.onEvent(new r.ICEConnectFail({
                webrtc: a
              })));
              if ("connected" == t) return i.onEvent(new r.ICEConnected({
                webrtc: a
              })), void (a.onEvent = null);
              if ("closed" == t) return i.onEvent(new r.ICEClosed({
                webrtc: a
              })), void (a.onEvent && a.onEvent(new r.ICEClosed({
                webrtc: a
              })));
              if ("disconnected" == t) return i.onEvent(new r.ICEDisconnected({
                webrtc: a
              })), void (a.onEvent && a.onEvent(new r.ICEDisconnected({
                webrtc: a
              })));
            } finally {
              i._onIceStateChange && i._onIceStateChange(a, e);
            }
          },
          onIceCandidate: function (e) {
            i._onIceCandidate && e && i._onIceCandidate(a, e);
          },
          onGotRemoteStream: function (e) {
            o.info("got stream.", a._rtcId, a.__id, e), a.onGotMediaStream && a.onGotMediaStream(e), i.onEvent(new r.ICERemoteMediaStream({
              webrtc: a
            }));
          },
          onAddIceCandidateError: function (e) {
            i.onEvent(new r.AddIceCandError({
              webrtc: a,
              event: e
            }));
          },
          onSetSessionDescriptionError: function (e) {
            o.warn("onSetSessionDescriptionError : Failed to set session description: " + e.toString()), i.onEvent && i.onEvent(new r.ICEConnectFail({
              webrtc: a,
              event: e
            }));
          },
          onCreateSessionDescriptionError: function (e) {
            o.warn("Failed to create session description: " + e.toString()), i.onEvent && i.onEvent(new r.ICEConnectFail({
              webrtc: a,
              event: e
            }));
          }
        }, e);
        return i._ices || (i._ices = {}), i._ices[a.getRtcId()] && i._howDoWebrtcWhenCrtExsitsWebrtc(a), i._ices[a.getRtcId()] = a, i._ices[a.__id] = a, i._iceCreateRtcPeerConnection(a.getRtcId()), o.debug("create rtc ", a), a;
      },
      _howDoWebrtcWhenCrtExsitsWebrtc: function (e) {
        this.closeWebrtc(e.getRtcId(), !0, !1);
      },
      connect: function (e, t) {
        this._session.connect(e, t);
      },
      connected: function () {
        return this._session.connected();
      },
      newMessage: function (e) {
        var t = this,
            i = t._session.newMessage(e);

        return i.post = function (e, i) {
          t.postMessage(this, e, i);
        }, i;
      },
      message: function (e) {
        var t = this,
            i = t._session.newMessage(e);

        return i.post = function (e, i) {
          t.postMessage(this, e, i);
        }, i;
      },
      postMessage: function (e, t, i) {
        try {
          e.sessId || (e.sessId = this._session._sessionId), this._session.postMessage(e, t, i);
        } catch (i) {
          t && t({
            op: 1001,
            tsxId: e.tsxId,
            result: -9527,
            msg: "post message. exception"
          }), o.warn(i);
        }
      },
      onEvent: function (e) {},
      _onIceStateChange: function (e, t) {
        o.info(e.getRtcId(), t), this.onEvent(new r.ICEChanage({
          webrtc: e,
          state: t
        }));
      },
      _onIceCandidate: function (e, t) {
        var i,
            o = this;
        n.isArray(t) ? i = t : (i = []).push(t);
        var s = o.newMessage().setOp(105).setRtcId(e.getRtcId()).setCands(i);
        o.postMessage(s, function (e) {
          0 == e.result || o.onEvent(new r.RspFail({
            request: s,
            response: e
          }));
        });
      },
      _initC: function (e, t, i, s, a, c) {
        var d = this;
        if (t && t.rtcId !== e.getRtcId()) throw o.error("stream and webrtc rtcId not equal."), "stream and webrtc rtcId not equal.";
        var u = d.newMessage().setOp(102).setRtcId(e.getRtcId()).setSdp(i).setSubSId(s);
        e.subArgs && n.extend(u, e.subArgs), t && t.located() && u.setPubS(t), d.postMessage(u, function (i) {
          if (0 != i.result) return d.onEvent(new r.RspFail({
            request: u,
            response: i
          })), void (a && a(new r.RspFail({
            request: u,
            response: i,
            hidden: !0 === i.retrying
          })));
          t && !t.id && i.streamId && t.updateAttributes({
            id: i.streamId
          });

          try {
            c && c();
          } catch (e) {
            o.warn(e);
          }

          i.sdp && d.ansC(e.getRtcId(), i.sdp, i.cands), i.mems && d.onMembers && d.onMembers(i.cver, i.mems), i.streams && d.onStreams && d.onStreams(i.cver, i.streams);
        });
      },
      _acptC: function (e, t, i) {
        var n = this,
            o = n.newMessage().setOp(104).setRtcId(e.getRtcId()).setSdp(t);
        n.postMessage(o, function (e) {
          if (0 != e.result) return n.onEvent(new r.RspFail({
            request: o,
            response: e
          })), void (i && i(new r.RspFail({
            request: o,
            response: e
          })));
        });
      },
      _ansCAndPubstream: function (e, t, i, s, a) {
        var c = this,
            d = c.newMessage().setOp(106).setRtcId(e.getRtcId()).setSdp(i);
        e.subArgs && n.extend(d, e.subArgs), t && t.located() && (t = n.extend({}, t), n.removeAttribute(t, "mutedMuted"), n.removeAttribute(t, "_located"), d.setPubS(t)), c.postMessage(d, function (e) {
          if (0 != e.result) return c.onEvent(new r.RspFail({
            request: d,
            response: e
          })), void (s && s(new r.RspFail({
            request: d,
            response: e,
            hidden: !0 === e.retrying
          })));
          t && !t.id && e.streamId && t.updateAttributes({
            id: e.streamId
          });

          try {
            a && a();
          } catch (e) {
            o.warn(e);
          }
        });
      },
      _ansC: function (e, t, i) {
        var n = this,
            o = n.newMessage().setOp(106).setRtcId(e.getRtcId()).setSdp(t);
        n.postMessage(o, function (e) {
          if (0 != e.result) return n.onEvent(new r.RspFail({
            request: o,
            response: e
          })), void (i && i(new r.RspFail({
            request: o,
            response: e
          })));
        });
      },
      _termC: function (e, t, i) {
        var n = this,
            o = "string" == typeof e ? e : e.getRtcId(),
            s = n.newMessage().setOp(107).setRtcId(o).setEndReason(t);
        n.postMessage(s, function (e) {
          if (0 != e.result) return n.onEvent(new r.RspFail({
            request: s,
            response: e
          })), void (i && i(new r.RspFail({
            request: s,
            response: e
          })));
        });
      },
      _iceCreateRtcPeerConnection: function (e) {
        this._ices[e].createRtcPeerConnection(), o.debug("create rtc peer connection", e);
      },
      doOffer: function (e, t, i) {
        this._ices[e].createOffer(function (e) {
          t(e);
        });
      },
      offerCall: function (e, t, i, n, o) {
        var r = this,
            s = r._ices[e];
        s.createOffer(function (e) {
          r._initC && r._initC(s, t, e, i, n, o);
        });
      },
      accept: function (e, t) {
        var i = this,
            n = i._ices[e];
        n.createPRAnswer(function (e) {
          i._acptC && i._acptC(n, e, t);
        });
      },
      answerCall: function (e, t, i, n) {
        var o = this,
            r = o._ices[e];
        r.createAnswer(function (e) {
          o._ansCAndPubstream && o._ansCAndPubstream(r, t, e, i, n);
        });
      },
      answer: function (e, t) {
        var i = this,
            n = i._ices[e];
        n.createAnswer(function (e) {
          i._ansC && i._ansC(n, e, t);
        });
      },
      onTcklC: function (e, t) {
        this._addIceCandidate(t, e);
      },
      onAcptC: function (e, t, i) {
        this._iceSetRemoteSDP(t, e), i && this._addIceCandidate(i, e);
      },
      onAnsC: function (e, t, i) {
        this._iceSetRemoteSDP(t, e), i && this._addIceCandidate(i, e);
      },
      _addIceCandidate: function (e, t) {
        if (e && 0 != e.length) {
          var i = this._ices[t];
          i && i.addIceCandidate(e);
        } else o.warn("drop cands", e);
      },
      closeWebrtc: function (e, t, i) {
        var r = this,
            s = r._ices[e];
        if (n.forEach(r._cacheStreams, function (t, i) {
          if (i.rtcId === e && !i.located()) try {
            var s = n.removeAttribute(r._mediaMeters, t);
            s && s._finally();
          } catch (e) {
            o.warn(e);
          }
          i.rtcId === e && 2 === i.type && n.removeAttribute(r.audioMixers, i.id);
        }), !s || s.closed) return o.warn("Webrtc not exsits or closed", s && s.closed), i && s && n.forEach(r._cacheStreams, function (t, i) {
          i.rtcId === e && (n.removeAttribute(r._linkedStreams, t), o.warn("Webrtc close, remvoe from _linkedStreams", t));
        }), void (i || r._termC(e, 0));

        if (r._records) {
          n.forEach(r._records, function (t, i) {
            i.rtcId === e && function (e) {
              try {
                r.stopRecord(e);
              } catch (e) {
                o.warn(e);
              } finally {
                n.removeAttribute(r._records, e.id);
              }
            }(i);
          });
        }

        try {
          i || s && r._termC(s, t && s._localStream ? -10 : 0);
        } finally {
          s && s.close(t), s && r.onWebrtcTermC && r.onWebrtcTermC(s), t || s && n.forEach(r._cacheStreams, function (t, s) {
            s.rtcId === e && (s.located() && (wx.emedia.stopTracks(s._localMediaStream), s && !s.closeReason && s.updateAttributes({
              closeReason: "WebrtcClose"
            }), r._cacheStreams[t] && r._linkedStreams[t] && r.onRemoveStream(s), n.removeAttribute(r._cacheStreams, t), r._streamAutomators && n.removeAttribute(r._streamAutomators, t), r._monitSoundChanagedStreams && n.removeAttribute(r._monitSoundChanagedStreams, t), o.info("Webrtc close. Remove stream", t, ". from cache")), i && (n.removeAttribute(r._linkedStreams, t), o.info("Webrtc close. Remove stream", t, ". from _linkedStreams")));
          });
        }

        return s;
      },
      __close: function (e) {
        o.warn("closing, reason = ", e);

        if (!this.closed) {
          if (this.closed = !0, this.__getCopyInterval && (clearInterval(this.__getCopyInterval), o.warn("Stop interval get copy")), this._ices) for (var t in this._ices) this.closeWebrtc(t, !1);
          var i = this.newMessage().setOp(201).setReason(e || 0);
          this.postMessage(i);
        }
      },
      exit: function (e) {
        var t = this;
        e ? (e && t._closeMyConfr(11), setTimeout(function () {
          t.close(0);
        }, 100)) : t.close(0);
      },
      _closeMyConfr: function (e) {
        var t = this.newMessage().setOp(204).setReason(e || 0);
        this.postMessage(t, function (e) {
          o.warn("Close confr ", e.result, e.msg);
        });
      },
      close: function (e, t) {
        var i = this;
        if (!i.closed) try {
          n.forEach(i._cacheStreams || {}, function (e, t) {
            t.located() && t._localMediaStream && wx.emedia.stopTracks(t._localMediaStream);
          }), i.__close(e), n.forEach(i._cacheStreams, function (e, t) {
            i.onRemoveStream(t);
          }), n.forEach(i._cacheMembers, function (e, t) {
            i.onRemoveMember(t);
          });
        } finally {
          try {
            setTimeout(function () {
              i._session && i._session.close(e);
            }, 500), i.onEvent(new r.Hangup({
              reason: e,
              failed: t,
              self: {
                id: i._memberId
              }
            })), i.onMeExit && i.onMeExit(e, t);
          } catch (e) {
            o.error(e);
          } finally {
            i._onFinally && i._onFinally();
          }
        }
      },
      webrtcState: function (e) {
        return this._ices[e].iceConnectionState();
      },
      _iceSetRemoteSDP: function (e, t) {
        this._ices[t].setRemoteDescription(e);
      },
      setLocalStream: function (e, t) {
        this._ices[t].setLocalStream(e);
      },
      onWebrtcTermC: function (e) {}
    });
  }, function (e, t, i) {
    var n = i(0),
        o = n.tagLogger("Handler"),
        r = i(1),
        s = n.prototypeExtend({
      onEvent: function (e) {
        var t = this;

        function i() {
          try {
            t.handleEvent(e);
          } catch (e) {
            o.warn(e);
          }
        }

        if (e && o.info("[EVT]", e.message(), e.hidden || ""), e instanceof r.ServerRefuseEnter && e.failed && -95270 === e.failed && (e.failed = -9527), e instanceof wx.emedia.event.StreamState && e.stream && e.stream.located()) i();else try {
          e.hidden || t.onNotifyEvent && t.onNotifyEvent(e);
        } finally {
          i();
        }
      },
      handleEvent: function (e) {
        console.log("evt", e), console.log("__event", r);
        var t = this;
        if (e instanceof r.RecvResponse) t._onRecvResponse(e);else if (e instanceof r.ServerRefuseEnter) o.warn("Server refuse, ", e.failed, e.msg), t.onServerRefuseEnter(e);else if (e instanceof r.NetworkChanaged) o.warn("Network chanaged, ", e.preIp, e.nowIp), t.onNetworkChanaged(e);else if (e instanceof r.EnterFail) o.warn("Enter fail, result = ", e.failed), t.onEnterFail();else if (e instanceof r.WSClose) t.onWSClose();else if (e instanceof r.WSConnected) o.warn("Websocket connected");else if (e instanceof r.ICEConnected) {
          var i = e.webrtc;
          t.onICEConnected(i);
        } else if (e instanceof r.ICEConnectFail) {
          i = e.webrtc;
          t.onICEConnectFail(i);
        } else if (e instanceof r.ICEDisconnected) {
          i = e.webrtc;
          t.onICEDisconnected(i);
        } else if (e instanceof r.ICEClosed) {
          i = e.webrtc;
          t.onICEClosed(i);
        } else if (e instanceof r.ICERemoteMediaStream) t.onICERemoteMediaStream(e.webrtc);else if (e instanceof r.PushSuccess) {
          t._cacheStreams[e.stream.id] = t._linkedStreams[e.stream.id] = e.stream;
          var s = t.newStream(e.stream);
          if (e.hidden && !t._maybeNotExistStreams[e.stream.id] && !s.isRepublished) return t._onAddStream(s), void console.loh("zhui 1");
          wx.emedia._yetGetUserMedia = !0;

          try {
            !0 !== e.hidden && s && t.onUpdateStream(s, new s.Update({
              voff: s.voff,
              aoff: s.aoff,
              mediaStream: s.getMediaStream()
            }));
          } finally {
            wx.emedia.isSafari && n.forEach(t._cacheStreams, function (e, i) {
              !0 === i._autoSubWhenPushStream && (n.removeAttribute(i, "_autoSubWhenPushStream"), t.createWebrtcAndSubscribeStream(i.id));
            });
          }
        } else if (e instanceof r.SubSuccess) t._linkedStreams[e.stream.id] = e.stream, e.stream.updateAttributes({
          _zoom: 1
        });else if (e instanceof r.PushFail) {
          if (!0 !== e.hidden) {
            var a = n.removeAttribute(t._linkedStreams, e.stream.id);

            if (o.warn("PushFail remove from _linkedStreams", e.stream.id, a), a) {
              s = t.newStream(e.stream);
              t.onRemoveStream(s);
            }
          }
        } else if (e instanceof r.SubFail) {
          if (!0 !== e.hidden) n.removeAttribute(t._linkedStreams, e.stream.id), o.warn("SubFail remove from _linkedStreams", e.stream.id), (s = t.newStream(e.stream)).updateAttributes({
            rtcId: void 0,
            _webrtc: void 0,
            mediaStream: void 0
          }), t.onUpdateStream(s, new s.Update(s));
        } else if (e instanceof r.SubFailNotSupportVCodes) {
          var c = e.stream;
          o.warn("Rtc donot support pub VCodes. close. sub fail.", c.rtcId, " -> ", c.id);

          try {
            t.onNotSupportPublishVideoCodecs && t.onNotSupportPublishVideoCodecs(c);
          } catch (e) {
            o.warn(e);
          }
        } else if (e instanceof r.EnterSuccess) t.onEnterSuccess();else if (e instanceof r.SwitchVCodes) {
          c = e.stream;
          var d = e.useVCodes;
          i = c._webrtc;

          if (o.warn("Rtc switch VCodes. ", c.id, d), d && 0 != d.length || o.warn("Rtc switch VCodes. error! useVCodes is empty ", c.id, d), i && i.optimalVideoCodecs) {
            if ("string" == typeof i.optimalVideoCodecs && i.optimalVideoCodecs == d[0]) return void o.warn("Rtc switch VCodes. igrone . useVCodes == optimalVideoCodecs ", c.id, i._rtcId, d);
            if (n.isArray(i.optimalVideoCodecs) && i.optimalVideoCodecs.length > 0 && i.optimalVideoCodecs[0] == d[0]) return void o.warn("Rtc switch VCodes. igrone ddd . useVCodes == optimalVideoCodecs ", c.id, i._rtcId, d);
          }

          c.updateAttributes({
            optimalVideoCodecs: d
          }), i && t.closeWebrtc(i.getRtcId(), !0), setTimeout(function () {
            c.updateAttributes({
              iceRebuildCount: 1
            }), t.iceRebuild(c), o.warn("Rtc switch VCodes. iceRebuild end.", c.id, d);
          }, 300);
        }
      },
      _onRecvResponse: function (e) {
        var t = e.request,
            i = e.response;

        if (t && i && 200 !== t.op && 1002 !== t.op && 0 !== i.result) {
          o.warn("Server refuse. when request = ", t);
          var n = e.failed;

          switch (n) {
            case -9527:
            case -95270:
              break;

            case -500:
            case -502:
            case -504:
            case -508:
            case -510:
              this.close(4, n);
              break;

            case -506:
              this.close(11, n);
              break;

            case -501:
              this.close(11, n);
          }
        }
      },
      onServerRefuseEnter: function (e) {
        var t = e.failed;

        switch (t) {
          case -9527:
          case -95270:
            this.close(4, -9527);
            break;

          case -500:
          case -502:
          case -504:
          case -508:
          case -510:
            this.close(4, t);
            break;

          case -506:
            this.close(11, t);
            break;

          default:
            this.close(2);
        }
      },
      onEnterFail: function () {
        this.__getCopyInterval && clearInterval(this.__getCopyInterval);
      },
      onNetworkChanaged: function (e) {
        var t = this,
            i = e.nowIp;
        wx.emedia.config.rebuildPeerConnectionWhenNetworkChanaged && setTimeout(function () {
          var e = {};
          n.forEach(t._cacheStreams, function (n, r) {
            if (!t._maybeNotExistStreams[n] && r._webrtc) {
              var s = r._webrtc;
              e[r.rtcId] || (s.closed || "string" != typeof s.useIp || s.useIp === i || (o.warn("network chanage. webrtc will rebuild.", s._rtcId, s.__id), t.onICEClosed(s)), e[r.rtcId] = !0);
            }
          });
        }, 100);
      },
      onEnterSuccess: function () {
        var e = this;
        setTimeout(function () {
          e._failIcesRebuild();
        }, 50), e.getCopyIntervalMillis && e.getCopyIntervalMillis > 0 && (o.warn("Run interval get copy. interval = ", e.getCopyIntervalMillis), e.__getCopyInterval && clearInterval(e.__getCopyInterval), e.__getCopyInterval = setInterval(function () {
          e._session.connected() ? e._sysCopy.apply(e) : (o.warn("Warn! cannot get copy. cause offline."), e.__getCopyInterval && clearInterval(e.__getCopyInterval));
        }, e.getCopyIntervalMillis)), e.getMediaMeterIntervalMillis && e.getMediaMeterIntervalMillis > 0 && e._intervalGetMediaMeters();
      },
      _intervalGetMediaMeters: function () {
        var e = this;
        !function t() {
          e.__getMediaMetersIntervalFlag && wx.emedia.cancelAnimationFrame(e.__getMediaMetersIntervalFlag), e.getMediaMeterIntervalMillis ? e.__getMediaMetersIntervalFlag = wx.emedia.requestAnimationFrame(function (i) {
            "function" == typeof wx.emedia.AudioContext && e._flushMediaMetersByAudioContext.apply(e), !1 === e.closed && t();
          }, e.getMediaMeterIntervalMillis) : o.warn("Ontalking closed. please use getMediaMeterIntervalMillis");
        }();
      },
      _flushMediaMetersByAudioContext: function () {
        var e = this;
        n.forEach(e._cacheStreams, function (t, i) {
          e._monitSoundChanagedStreams && !e._monitSoundChanagedStreams[t] || "0" != i.id && e._updateMetersOrNewOne.call(e, t, i);
        });
        var t = [];
        n.forEach(e._mediaMeters, function (i, n) {
          var o = e._cacheStreams[i];
          o && e._updateMetersOrNewOne.call(e, i, o), o || t.push(i);
        }), n.forEach(t, function (t, i) {
          n.removeAttribute(e._mediaMeters, i);
        });
      },
      _updateMetersOrNewOne: function (e, t) {
        var i = this,
            o = i._mediaMeters[e];

        if (!(2 !== t.type || t.located() || t.subArgs && t.subArgs.subSAudio)) {
          var r = i._oneAudioMixers();

          if (!r || o && o._webrtc && r._webrtc.__id != o._webrtc.__id) return o && o._finally(), n.removeAttribute(i._mediaMeters, e), void i._onSoundChanage.call(i, t.owner, t);
        }

        return o && o._streamCreateId === t.__create_id && o.__mediaSoundMeter.__worked ? (o.onSoundMeters(function (e) {
          i._onSoundChanage.call(i, t.owner, t, e);
        }), o) : (o && (o._streamCreateId !== t.__create_id || o.__mediaSoundMeter.__worked) && (o && o._finally(), n.removeAttribute(i._mediaMeters, e), i._onSoundChanage.call(i, t.owner, t)), t.aoff ? void 0 : ((o = i._newMediaMeters(t)) && (i._mediaMeters[e] && i._mediaMeters[e]._finally(), i._mediaMeters[e] = o), o));
      },
      _newAudioContext: function () {
        if (wx.emedia.__usingWebAudio) return wx.emedia.__audioContext;
      },
      _newMediaMeters: function (e) {
        var t;
        if (2 === e.type && e.subArgs && e.subArgs.subSAudio && e._webrtc && e._webrtc.getRemoteStream()) return new e.StreamSoundMeter({
          _stream: e,
          _mediaStream: e._webrtc.getRemoteStream(),
          _webrtc: e._webrtc,
          __audioContext: this._newAudioContext()
        });
        if (2 === e.type && e.located()) return new e.StreamSoundMeter({
          _stream: e,
          _mediaStream: e._localMediaStream,
          __audioContext: this._newAudioContext()
        });

        if (2 === e.type && !e.located()) {
          var i = this._oneAudioMixers();

          if (!i || !i._webrtc || i._webrtc.closed) return;
          if (i && (void 0 === i._remoteMediaSoundMeters || !i._remoteMediaSoundMeters.__worked) && i._webrtc && i._webrtc.getRemoteStream() && (i._remoteMediaSoundMeters = new i.MediaSoundMeter({
            _mediaStream: i._webrtc.getRemoteStream(),
            __audioContext: this._newAudioContext()
          })), !i._remoteMediaSoundMeters) return;
          return new e.StreamSoundMeter({
            _stream: e,
            _webrtc: i._webrtc,
            __mediaSoundMeter: i._remoteMediaSoundMeters
          });
        }

        return !e.aoff && (t = e.getMediaStream()) ? new e.StreamSoundMeter({
          _stream: e,
          _mediaStream: t,
          __audioContext: this._newAudioContext()
        }) : void 0;
      },
      _oneAudioMixers: function () {
        var e = this._cacheStreams[0];
        if (e && e._webrtc && !e._webrtc.closed) return e;

        for (var t in this.audioMixers) {
          var i = this.audioMixers[t];
          if (i.located()) return i;
        }
      },
      onWSClose: function () {
        this.__getCopyInterval && clearInterval(this.__getCopyInterval), o.info("Websocket closed.");
      },
      onICEDisconnected: function (e) {
        var t = this;
        t.__networkWeakInterval && clearTimeout(t.__networkWeakInterval), t.__networkWeakInterval = setTimeout(function () {
          t.onNetworkWeak && t.onNetworkWeak();
        }, 1e3), n.forEach(t._linkedStreams, function (i, r) {
          r.rtcId == e.getRtcId() && (t._maybeNotExistStreams[i] || (t._maybeNotExistStreams[i] = n.extend({}, r)).updateAttributes({
            iceRebuildCount: 1
          }), o.info("Stream maybe not exist. caused by disconnected", r.id));
        });
      },
      onICEConnectFail: function (e) {
        var t = this;

        for (var i in t._linkedStreams) {
          var s = t._linkedStreams[i];

          if (s.rtcId == e.getRtcId()) {
            if (s._webrtc && s._webrtc.__id !== e.__id) {
              o.warn("Stream use other webrtc rtcId = ", s.rtcId, ", id: ", s._webrtc.__id, e.__id);
              continue;
            }

            var a;

            if ((a = t._maybeNotExistStreams[i]) || (a = t._maybeNotExistStreams[i] = n.extend({}, s)).updateAttributes({
              iceRebuildCount: 1
            }), a) {
              var c = new r.StreamState({
                stream: a
              });
              c.iceFail(), t.onEvent(c);
            }

            if (o.info("ice fail. webrtc = ", e.getRtcId(), " problem stream is ", a.iceRebuildCount, a.id), a.iceRebuildCount > wx.emedia.config.iceRebuildCount) o.info("ice fail. webrtc = ", e.getRtcId(), " rebuild fail. problem stream is ", a.id), a.located() ? t.onEvent(new r.PushFail({
              stream: s,
              cause: "pub ice rebuild failed."
            })) : t.onEvent(new r.SubFail({
              stream: s,
              cause: "sub ice rebuild failed."
            })), t.closeWebrtc(e.getRtcId(), !1);else {
              var d = t._records[a.id];
              a._localMediaStream ? o.info("ice fail. webrtc = ", e.getRtcId(), " will rebuild. remain local stream. ", a.id) : o.info("ice fail. webrtc = ", e.getRtcId(), " will rebuild.", a.id), t.closeWebrtc(e.getRtcId(), !0), d && (t._records[a.id] = d), function (e) {
                setTimeout(function () {
                  t.iceRebuild(e);
                }, wx.emedia.config.iceRebuildIntervalMillis);
              }(a), o.info("ice fail. webrtc = ", e.getRtcId(), " will rebuilding. problem stream is ", a.id);
            }
            2 === s.type && n.removeAttribute(t.audioMixers, s.id);
          }
        }
      },
      onICEClosed: function (e) {
        if (e.closed) {
          o.warn("Webrtc will be removed. by __id = ", e.__id, ", rtcId = ", e.getRtcId());
          var t = n.removeAttribute(this._ices, e.__id);
          t ? o.warn("Webrtc removed. by id = ", t.__id, ", rtcId = ", t.getRtcId()) : o.warn("Webrtc removed. by id = ", e.__id, ", rtcId = ", e.getRtcId());

          var i = this._ices[e.getRtcId()];

          i && i.__id === t.__id && (t = n.removeAttribute(this._ices, e.getRtcId()), o.warn("Webrtc removed. by rtcId = ", t.getRtcId(), ", __id = ", t.__id));
        } else o.info("ICE self closed. not allow. will rebuild", e.getRtcId()), this.onICEConnectFail(e);
      },
      onICEConnected: function (e) {
        var t = this;
        n.forEach(t._cacheStreams, function (i, s) {
          if (s.rtcId == e.getRtcId()) {
            if (s.updateAttributes({
              finalVCodeChoices: e.finalVCodeChoices
            }), t._maybeNotExistStreams[i]) {
              n.removeAttribute(t._maybeNotExistStreams, s.id), t._linkedStreams[i] = s, o.info("ice reconnected. webrtc = ", e.getRtcId(), "will update stream = ", s.id);
              var a = t._records[s.id];
              a && a.rtcId !== s.rtcId && (t.startRecord(s), o.warn("Re record. for ", s.id, ", after rebuild ice.", a.rtcId, "->", s.rtcId));
            } else o.info("ice connected. webrtc = ", e.getRtcId(), s.id), s.located() && t.onEvent(new r.PushSuccess({
              stream: s
            })), s.located() || t.onEvent(new r.SubSuccess({
              stream: s
            }));

            2 === s.type && (t.audioMixers[s.id] = s);
          }
        });
      },
      onICERemoteMediaStream: function (e) {
        var t = this;
        n.forEach(t._cacheStreams, function (i, n) {
          if (n.rtcId == e.getRtcId() && (!n.located() || 2 === n.type)) {
            var o = e.getRemoteStream();
            if (t._updateRemoteStream(n, o), n.onGotRemoteMediaStream) n.onGotRemoteMediaStream.call(n, o);else (n = t.newStream(n)).updateAttributes({
              mediaStream: e.getRemoteStream()
            }), t.onUpdateStream(n, new n.Update({
              mediaStream: n.mediaStream
            }));
          }
        });
      },
      _failIcesRebuild: function () {
        var e = this;
        n.forEach(e._maybeNotExistStreams, function (t, i) {
          setTimeout(function () {
            e.iceRebuild(i);
          }, 100);
        });
      },
      iceRebuild: function (e) {
        return this.connected() ? this._linkedStreams[e.id] && this._cacheStreams[e.id] ? void (e.iceRebuildCount > wx.emedia.config.iceRebuildCount ? (o.info("ice rebuild fail. count too many. stream is ", e.id), e.located() ? this.onEvent(new r.PushFail({
          stream: e,
          cause: "pub ice rebuild failed."
        })) : this.onEvent(new r.SubFail({
          stream: e,
          cause: "sub ice rebuild failed."
        }))) : this.connected() ? (o.info("ice try rebuild. count", e.iceRebuildCount, ". stream is ", e.id), this.rebuildIce(e), e.iceRebuildCount++) : o.warn("ice rebuild. stop. cause by not websocket disconnect", e.id)) : (o.info("ice rebuild fail. it yet closed. stream is ", e.id, e.rtcId), n.removeAttribute(this._maybeNotExistStreams, e.id), n.removeAttribute(this._linkedStreams, e.id), void o.warn("iceRebuild, remvoe from _linkedStreams", e.id)) : (e.updateAttributes({
          iceRebuildCount: 1
        }), void o.warn("Websocket disconnect. waiting. rebuild count reset", e.iceRebuildCount, e.id));
      },
      rebuildIce: function (e) {
        this._cacheStreams[e.id] ? (o.warn("Begin rebuild ice ", e.iceRebuildCount, e.id), e.located() ? (e.updateAttributes({
          isRepublished: !0
        }), this.push(e, void 0, void 0, !0)) : this.createWebrtcAndSubscribeStream(e.id), o.warn("Finish rebuild ice ", e.iceRebuildCount, e.id, this._cacheStreams[e.id].rtcId)) : o.warn("Begin rebuild ice. not found stream at local", e.iceRebuildCount, e.id);
      },
      _sysCopy: function () {
        var e = this,
            t = e.newMessage().setOp(1e3).setCver(e._cver || 0);
        e.postMessage(t, function (t) {
          0 == t.result ? (e._cver || 0) < t.cver && (e._cver = t.cver, e.onMembers(t.cver, t.mems || {}), e.onStreams(t.cver, t.streams || {}), o.info("Got copy success.")) : o.warn("Get copy fail. result = ", t.result);
        });
      }
    });
    e.exports = s;
  }]);
});