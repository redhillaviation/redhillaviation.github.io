/* 
 Pausing Scroller from Dynamic Web Coding at dyn-web.com
 Copyright 2001-2013 by Sharon Paine
 For demos, documentation and updates, visit http://www.dyn-web.com/code/scrollers/

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program. If not, see http://www.gnu.org/licenses
 */

// DYN_WEB is namespace used for code from dyn-web.com
// replacing previous use of dw_ prefix for object names
var DYN_WEB = DYN_WEB || {};

/*
 dw_event.js - basic event handling file from dyn-web.com
 version date May 2013 (added .domReady)
 .domReady uses whenReady fn from JavaScript the Definitive Guide
 6th edition by David Flanagan, example 17.01
 */

DYN_WEB.Event = (function (Ev) {
  Ev.add = document.addEventListener ? function (obj, etype, fp, cap) {
    cap = cap || false;
    obj.addEventListener(etype, fp, cap);
  } : function (obj, etype, fp) {
    obj.attachEvent('on' + etype, fp);
  };
  Ev.remove = document.removeEventListener ? function (obj, etype, fp, cap) {
    cap = cap || false;
    obj.removeEventListener(etype, fp, cap);
  } : function (obj, etype, fp) {
    obj.detachEvent('on' + etype, fp);
  };
  Ev.DOMit = function (e) {
    e = e ? e : window.event;
    if (!e.target) {
      e.target = e.srcElement;
    }
    if (!e.preventDefault) {
      e.preventDefault = function () {
        e.returnValue = false;
        return false;
      };
    }
    if (!e.stopPropagation) {
      e.stopPropagation = function () {
        e.cancelBubble = true;
      };
    }
    return e;
  };
  Ev.getTarget = function (e) {
    e = Ev.DOMit(e);
    var tgt = e.target;
    if (tgt.nodeType !== 1) {
      tgt = tgt.parentNode;
    }
    return tgt;
  };
  Ev.domReady = (function () {
    var funcs = [];
    var ready = false;

    function handler(e) {
      if (ready) {
        return;
      }
      if (e.type === "readystatechange" && document.readyState !== "complete") {
        return;
      }
      for (var i = 0, len = funcs.length; i < len; i++) {
        funcs[i].call(document);
      }
      ready = true;
      funcs = [];
    }

    if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", handler, false);
      document.addEventListener("readystatechange", handler, false);
      window.addEventListener("load", handler, false);
    } else if (document.attachEvent) {
      document.attachEvent("onreadystatechange", handler);
      window.attachEvent("onload", handler);
    }
    return function whenReady(f) {
      if (ready) {
        f.call(document);
      } else {
        funcs.push(f);
      }
    };
  })();
  return Ev;
})(DYN_WEB.Event || {});

DYN_WEB.Util = (function (Ut) {
  var Ev = DYN_WEB.Event;
  Ut.$ = function (id) {
    return document.getElementById(id);
  };
  Ut.augment = function (Obj1, Obj2) {
    var prop;
    for (prop in Obj2) {
      if (Obj2.hasOwnProperty(prop) && !Obj1[prop]) {
        Obj1[prop] = Obj2[prop];
      }
    }
  };
  Ut.contained = function (oNode, oCont) {
    if (!oNode) {
      return false;
    }
    while ((oNode = oNode.parentNode)) {
      if (oNode === oCont) {
        return true;
      }
    }
    return false;
  };
  Ut.mouseleave = function (e, oNode) {
    e = Ev.DOMit(e);
    var toEl = e.relatedTarget ? e.relatedTarget : e.toElement ? e.toElement : null;
    if (oNode !== toEl && !Ut.contained(toEl, oNode)) {
      return true;
    }
    return false;
  };
  Ut.getLayerOffsets = function (el, oCont) {
    var left = 0, top = 0;
    if (Ut.contained(el, oCont)) {
      do {
        left += el.offsetLeft;
        top += el.offsetTop;
      } while (((el = el.offsetParent) !== oCont));
    }
    return {x: left, y: top};
  };
  return Ut;
})(DYN_WEB.Util || {});

DYN_WEB.Scroll_Div = (function () {
  var Ut = DYN_WEB.Util;

  function SDiv(wnId, lyrId) {
    this.id = wnId;
    SDiv.col[this.id] = this;
    SDiv.ids[SDiv.ids.length] = this.id;
    this.load(lyrId);
  }

  SDiv.col = {};
  SDiv.ids = [];
  SDiv.isSupported = function () {
    return !!(document.getElementById && (document.addEventListener || document.attachEvent));
  };
  SDiv.prototype = {
    load: function (lyrId) {
      var lyr;
      if (this.lyrId) {
        lyr = Ut.$(this.lyrId);
        lyr.style.visibility = "hidden";
      }
      this.lyr = lyr = Ut.$(lyrId);
      this.lyr.style.position = 'absolute';
      this.lyrId = lyrId;
      this.y = 0;
      this.x = 0;
      this.shiftTo(0, 0);
      this.getDims();
      lyr.style.visibility = "visible";
      this.ready = true;
      this.on_load();
    }, shiftTo: function (x, y) {
      if (this.lyr && !isNaN(x) && !isNaN(y)) {
        this.x = x;
        this.y = y;
        this.lyr.style.left = Math.round(x) + "px";
        this.lyr.style.top = Math.round(y) + "px";
      }
    }, getDims: function () {
      var wndo = Ut.$(this.id);
      var lyr = Ut.$(this.lyrId);
      this.lyrWd = lyr.offsetWidth;
      this.lyrHt = lyr.offsetHeight;
      this.wnWd = wndo.offsetWidth;
      this.wnHt = wndo.offsetHeight;
      var w = this.lyrWd - this.wnWd;
      var h = this.lyrHt - this.wnHt;
      this.maxX = (w > 0) ? w : 0;
      this.maxY = (h > 0) ? h : 0;
    }, on_load: function () {
    }, on_scroll: function () {
    }, on_scroll_start: function () {
    }, on_scroll_stop: function () {
    }, on_scroll_end: function () {
    }, clearTimer: function () {
      clearInterval(this.timerId);
      this.timerId = 0;
    }
  };
  return SDiv;
})();

(function () {
  var Ut = DYN_WEB.Util, SDiv = DYN_WEB.Scroll_Div;
  SDiv.defaultSlideDur = 500;
  var Glide_Scroll = {
    initScrollByVals: function (dx, dy, dur) {
      if (!this.ready || this.sliding) {
        return;
      }
      this.startX = this.x;
      this.startY = this.y;
      this.destX = this.destY = this.distX = this.distY = 0;
      if (dy < 0) {
        this.distY = (this.startY + dy >= -this.maxY) ? dy : -(this.startY + this.maxY);
      } else if (dy > 0) {
        this.distY = (this.startY + dy <= 0) ? dy : -this.startY;
      }
      if (dx < 0) {
        this.distX = (this.startX + dx >= -this.maxX) ? dx : -(this.startX + this.maxX);
      } else if (dx > 0) {
        this.distX = (this.startX + dx <= 0) ? dx : -this.startX;
      }
      this.destX = this.startX + this.distX;
      this.destY = this.startY + this.distY;
      this.glideScrollPrep(this.destX, this.destY, dur);
    }, initScrollToVals: function (destX, destY, dur) {
      if (!this.ready || this.sliding) {
        return;
      }
      this.startX = this.x;
      this.startY = this.y;
      this.destX = -Math.max(Math.min(destX, this.maxX), 0);
      this.destY = -Math.max(Math.min(destY, this.maxY), 0);
      this.distY = this.destY - this.startY;
      this.distX = this.destX - this.startX;
      if (dur === 0) {
        this.on_scroll_start(this.startX, this.startY);
        this._jumpTo(this.destX, this.destY);
      } else {
        this.glideScrollPrep(this.destX, this.destY, dur);
      }
    }, _jumpTo: function (x, y) {
      this.shiftTo(x, y);
      this.on_scroll(x, y);
    }, glideScrollPrep: function (destX, destY, dur) {
      this.slideDur = (typeof dur === 'number') ? dur : SDiv.defaultSlideDur;
      this.per = Math.PI / (2 * this.slideDur);
      this.sliding = true;
      this.lyr = Ut.$(this.lyrId);
      this.startTime = new Date().getTime();
      var self = this;
      self.timerId = setInterval(function () {
        self.doGlideScroll();
      }, 10);
      this.on_scroll_start(this.startX, this.startY);
    }, doGlideScroll: function () {
      var elapsed = new Date().getTime() - this.startTime;
      if (elapsed < this.slideDur) {
        var x = this.startX + (this.distX * Math.sin(this.per * elapsed));
        var y = this.startY + (this.distY * Math.sin(this.per * elapsed));
        this.shiftTo(x, y);
        this.on_scroll(x, y);
      } else {
        this.clearTimer();
        this.sliding = false;
        this.shiftTo(this.destX, this.destY);
        this.on_scroll(this.destX, this.destY);
        this.on_scroll_stop(this.destX, this.destY);
        if (this.distX && (this.destX === 0 || this.destX === -this.maxX) || this.distY && (this.destY === 0 || this.destY === -this.maxY)) {
          this.on_scroll_end(this.destX, this.destY);
        }
      }
    }
  };
  Ut.augment(SDiv.prototype, Glide_Scroll);
})();

(function () {
  var Ev = DYN_WEB.Event, Ut = DYN_WEB.Util, SDiv = DYN_WEB.Scroll_Div;
  var Pause_Auto_Scroll = {
    makePauseAuto: function (opts) {
      var axis = opts.axis || 'h', wn = Ut.$(this.id), self = this;
      if (axis === 'v') {
        this.dy = opts.distance;
        this.dx = 0;
      } else {
        this.dx = opts.distance;
        this.dy = 0;
      }
      this.dur = opts.dur || SDiv.defaultSlideDur;
      this.startDelay = opts.startDelay || 500;
      this.pauseDelay = opts.pauseDelay || 3000;
      this.resumeDelay = opts.resumeDelay || 300;
      if (opts.bRepeat && opts.repeatId) {
        var pos = Ut.getLayerOffsets(Ut.$(opts.repeatId), Ut.$(this.id));
        if (pos.x || pos.y) {
          this.on_scroll = function () {
            var backToStart;
            if (axis === 'v' && Math.round(this.y) <= -pos.y) {
              backToStart = true;
            } else if (axis === 'h' && Math.round(this.x) <= -pos.x) {
              backToStart = true;
            }
            if (backToStart) {
              this.shiftTo(0, 0);
            }
          };
        }
      }
      if (opts.bPauseResume) {
        Ev.add(wn, 'mouseover', function () {
          self.pauseAutoScroll();
        });
        Ev.add(wn, 'mouseout', function (e) {
          self.checkMouseout(e, self.id);
        });
      }
      self.pTimer = setTimeout(function () {
        self.doAutoScroll();
      }, self.startDelay);
    }, doAutoScroll: function () {
      var self = this;
      this.clearPauseTimer();
      this.initScrollByVals(-this.dx, -this.dy, this.dur);
      self.pTimer = setTimeout(function () {
        self.doAutoScroll();
      }, self.pauseDelay);
    }, pauseAutoScroll: function () {
      this.clearPauseTimer();
    }, clearPauseTimer: function () {
      clearTimeout(this.pTimer);
      this.pTimer = null;
    }, checkMouseout: function (e, wnId) {
      var self = SDiv.col[wnId];
      if (Ut.mouseleave(e, Ut.$(wnId))) {
        self.pTimer = setTimeout(function () {
          self.doAutoScroll();
        }, self.resumeDelay);
      }
    }
  };
  Ut.augment(SDiv.prototype, Pause_Auto_Scroll);
})();
