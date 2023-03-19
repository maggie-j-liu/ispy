// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"bwssI":[function(require,module,exports) {
var m = typeof globalThis.process < "u" ? globalThis.process.argv : [];
var y = ()=>typeof globalThis.process < "u" ? globalThis.process.env : {};
var A = new Set(m), _ = (e)=>A.has(e), W = m.filter((e)=>e.startsWith("--") && e.includes("=")).map((e)=>e.split("=")).reduce((e, [t, s])=>(e[t] = s, e), {});
var U = _("--dry-run"), g = ()=>_("--verbose") || y().VERBOSE === "true", I = g();
var f = (e = "", ...t)=>console.log(e.padEnd(9), "|", ...t);
var v = (...e)=>console.error("\uD83D\uDD34 ERROR".padEnd(9), "|", ...e), b = (...e)=>f("\uD83D\uDD35 INFO", ...e), h = (...e)=>f("\uD83D\uDFE0 WARN", ...e), M = 0, c = (...e)=>g() && f(`\u{1F7E1} ${M++}`, ...e);
var o = {
    "isContentScript": false,
    "isBackground": true,
    "isReact": false,
    "runtimes": [
        "background-service-runtime"
    ],
    "host": "localhost",
    "port": 32979,
    "entryFilePath": "/home/ryanc/ispy/.plasmo/static/background/index.ts",
    "bundleId": "4e6d4344b377503d",
    "envHash": "210281caf8d4160d",
    "verbose": "false",
    "secure": false,
    "serverPort": 45877
};
module.bundle.HMR_BUNDLE_ID = o.bundleId;
globalThis.process = {
    argv: [],
    env: {
        VERBOSE: o.verbose
    }
};
var T = module.bundle.Module;
function D(e) {
    T.call(this, e), this.hot = {
        data: module.bundle.hotData[e],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(t) {
            this._acceptCallbacks.push(t || function() {});
        },
        dispose: function(t) {
            this._disposeCallbacks.push(t);
        }
    }, module.bundle.hotData[e] = void 0;
}
module.bundle.Module = D;
module.bundle.hotData = {};
var l = globalThis.chrome || globalThis.browser || null;
function u() {
    return !o.host || o.host === "0.0.0.0" ? location.protocol.indexOf("http") === 0 ? location.hostname : "localhost" : o.host;
}
function p() {
    return o.port || location.port;
}
var B = `${o.secure ? "https" : "http"}://${u()}:${p()}/`;
async function x(e = 1470) {
    for(;;)try {
        await fetch(B);
        break;
    } catch  {
        await new Promise((s)=>setTimeout(s, e));
    }
}
if (l.runtime.getManifest().manifest_version === 3) {
    let e = l.runtime.getURL("/__plasmo_hmr_proxy__?url=");
    globalThis.addEventListener("fetch", function(t) {
        let s = t.request.url;
        if (s.startsWith(e)) {
            let n = new URL(decodeURIComponent(s.slice(e.length)));
            n.hostname === o.host && n.port === `${o.port}` ? (n.searchParams.set("t", Date.now().toString()), t.respondWith(fetch(n).then((r)=>new Response(r.body, {
                    headers: {
                        "Content-Type": r.headers.get("Content-Type") ?? "text/javascript"
                    }
                })))) : t.respondWith(new Response("Plasmo HMR", {
                status: 200,
                statusText: "Testing"
            }));
        }
    });
}
function R(e, t) {
    let { modules: s  } = e;
    return s ? !!s[t] : !1;
}
function k(e = p()) {
    let t = u();
    return `${o.secure || location.protocol === "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(t) ? "wss" : "ws"}://${t}:${e}/`;
}
function S(e) {
    typeof e.message == "string" && v("[plasmo/parcel-runtime]: " + e.message);
}
function L(e) {
    if (typeof globalThis.WebSocket > "u") return;
    let t = new WebSocket(k(Number(p()) + 1));
    return t.addEventListener("message", async function(s) {
        if (JSON.parse(s.data).type === "build_ready") {
            await e();
            return;
        }
    }), t.addEventListener("error", S), t;
}
function E(e) {
    if (typeof globalThis.WebSocket > "u") return;
    let t = new WebSocket(k());
    return t.addEventListener("message", async function(s) {
        let n = JSON.parse(s.data);
        if (n.type === "update" && await e(n.assets), n.type === "error") for (let r of n.diagnostics.ansi){
            let i = r.codeframe || r.stack;
            h("[plasmo/parcel-runtime]: " + r.message + `
` + i + `

` + r.hints.join(`
`));
        }
    }), t.addEventListener("error", S), t.addEventListener("open", ()=>{
        b(`[plasmo/parcel-runtime]: Connected to HMR server for ${o.entryFilePath}`);
    }), t.addEventListener("close", ()=>{
        h(`[plasmo/parcel-runtime]: Connection to the HMR server is closed for ${o.entryFilePath}`);
    }), t;
}
var w = module.bundle.parent, a = {
    buildReady: !1,
    hmrUpdated: !1,
    csCodeChanged: !1,
    ports: new Set
};
async function d(e = !1) {
    if (e || a.buildReady && (a.hmrUpdated || a.csCodeChanged)) {
        c("BGSW Runtime - reloading");
        let t = await chrome.tabs.query({
            active: !0
        });
        for (let s of a.ports){
            let n = t.some((r)=>r.id === s.sender.tab.id);
            s.postMessage({
                __plasmo_cs_active_tab__: n
            });
        }
        l.runtime.reload();
    }
}
if (!w || !w.isParcelRequire) {
    let e = E(async (t)=>{
        c("BGSW Runtime - On HMR Update"), a.hmrUpdated ||= t.filter((n)=>n.envHash === o.envHash).some((n)=>R(module.bundle, n.id));
        let s = t.find((n)=>n.type === "json");
        if (s) {
            let n = new Set(t.map((i)=>i.id)), r = Object.values(s.depsByBundle).map((i)=>Object.values(i)).flat();
            a.hmrUpdated ||= r.every((i)=>n.has(i));
        }
        d();
    });
    e.addEventListener("open", ()=>{
        let t = setInterval(()=>e.send("ping"), 24e3);
        e.addEventListener("close", ()=>clearInterval(t));
    }), e.addEventListener("close", async ()=>{
        await x(), d(!0);
    });
}
L(async ()=>{
    c("BGSW Runtime - On Build Repackaged"), a.buildReady ||= !0, d();
});
l.runtime.onConnect.addListener(function(e) {
    e.name.startsWith("__plasmo_runtime_script_") && (a.ports.add(e), e.onDisconnect.addListener(()=>{
        a.ports.delete(e);
    }), e.onMessage.addListener(function(t) {
        t.__plasmo_cs_changed__ && (c("BGSW Runtime - On CS code changed"), a.csCodeChanged ||= !0, d());
    }));
});
l.runtime.onMessage.addListener(function(t) {
    return t.__plasmo_full_reload__ && (c("BGSW Runtime - On top-level code changed"), d()), !0;
});

},{}],"bBuLU":[function(require,module,exports) {
var _index = require("../../../background/index");

},{"../../../background/index":"lE0eK"}],"lE0eK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
let activeTabId, lastTabUrl, websocket;
const getCurrentTab = async ()=>{
    console.log("getcurrentTab");
    const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    });
    lastTabUrl = tab.url;
    console.log(tab.id);
    chrome.tabs.sendMessage(tab.id, tab.url);
    return {
        tab,
        change: true
    };
};
chrome.tabs.onActivated.addListener((activeInfo)=>{
    activeTabId = activeInfo.tabId;
    getCurrentTab();
});
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)=>{
    if (activeTabId === tabId) getCurrentTab();
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    console.log("message received", message, sender.tab.id);
    if (message === "getCurrentUrl") getCurrentTab();
});

},{"@parcel/transformer-js/src/esmodule-helpers.js":"cfP7b"}],"cfP7b":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["bwssI","bBuLU"], "bBuLU", "parcelRequire8f45")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDRjtBQUVBLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLFlBQVksTUFBUTtJQUM1RCxJQUFJLGdCQUFnQixPQUNsQjtBQUVKO0FBRUEsT0FBTyxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFNBQVMsUUFBUSxlQUFpQjtJQUN0RSxRQUFRLEdBQUcsQ0FBQyxvQkFBb0IsU0FBUyxPQUFPLEdBQUcsQ0FBQyxFQUFFO0lBQ3RELElBQUksWUFBWSxpQkFDZDtBQUVKOzs7QUNoQ0EsUUFBUSxjQUFjLEdBQUcsU0FBVSxDQUFDLEVBQUU7SUFDcEMsT0FBTyxLQUFLLEVBQUUsVUFBVSxHQUFHLElBQUk7UUFBQyxTQUFTO0lBQUMsQ0FBQztBQUM3QztBQUVBLFFBQVEsaUJBQWlCLEdBQUcsU0FBVSxDQUFDLEVBQUU7SUFDdkMsT0FBTyxjQUFjLENBQUMsR0FBRyxjQUFjO1FBQUMsT0FBTyxJQUFJO0lBQUE7QUFDckQ7QUFFQSxRQUFRLFNBQVMsR0FBRyxTQUFVLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDMUMsT0FBTyxJQUFJLENBQUMsUUFBUSxPQUFPLENBQUMsU0FBVSxHQUFHLEVBQUU7UUFDekMsSUFBSSxRQUFRLGFBQWEsUUFBUSxnQkFBZ0IsS0FBSyxjQUFjLENBQUMsTUFDbkU7UUFHRixPQUFPLGNBQWMsQ0FBQyxNQUFNLEtBQUs7WUFDL0IsWUFBWSxJQUFJO1lBQ2hCLEtBQUssV0FBWTtnQkFDZixPQUFPLE1BQU0sQ0FBQyxJQUFJO1lBQ3BCO1FBQ0Y7SUFDRjtJQUVBLE9BQU87QUFDVDtBQUVBLFFBQVEsTUFBTSxHQUFHLFNBQVUsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUU7SUFDOUMsT0FBTyxjQUFjLENBQUMsTUFBTSxVQUFVO1FBQ3BDLFlBQVksSUFBSTtRQUNoQixLQUFLO0lBQ1A7QUFDRiIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzLy5wbnBtL0BwbGFzbW9ocStwYXJjZWwtcnVudGltZUAwLjE4LjAvbm9kZV9tb2R1bGVzL0BwbGFzbW9ocS9wYXJjZWwtcnVudGltZS9kaXN0L3J1bnRpbWUtZjBiNDYxZmE2YjMwYmRiMS5qcyIsIi5wbGFzbW8vc3RhdGljL2JhY2tncm91bmQvaW5kZXgudHMiLCJiYWNrZ3JvdW5kL2luZGV4LnRzIiwibm9kZV9tb2R1bGVzLy5wbnBtL0BwYXJjZWwrdHJhbnNmb3JtZXItanNAMi44LjNfQHBhcmNlbCtjb3JlQDIuOC4zL25vZGVfbW9kdWxlcy9AcGFyY2VsL3RyYW5zZm9ybWVyLWpzL3NyYy9lc21vZHVsZS1oZWxwZXJzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBtPXR5cGVvZiBnbG9iYWxUaGlzLnByb2Nlc3M8XCJ1XCI/Z2xvYmFsVGhpcy5wcm9jZXNzLmFyZ3Y6W107dmFyIHk9KCk9PnR5cGVvZiBnbG9iYWxUaGlzLnByb2Nlc3M8XCJ1XCI/Z2xvYmFsVGhpcy5wcm9jZXNzLmVudjp7fTt2YXIgQT1uZXcgU2V0KG0pLF89ZT0+QS5oYXMoZSksVz1tLmZpbHRlcihlPT5lLnN0YXJ0c1dpdGgoXCItLVwiKSYmZS5pbmNsdWRlcyhcIj1cIikpLm1hcChlPT5lLnNwbGl0KFwiPVwiKSkucmVkdWNlKChlLFt0LHNdKT0+KGVbdF09cyxlKSx7fSk7dmFyIFU9XyhcIi0tZHJ5LXJ1blwiKSxnPSgpPT5fKFwiLS12ZXJib3NlXCIpfHx5KCkuVkVSQk9TRT09PVwidHJ1ZVwiLEk9ZygpO3ZhciBmPShlPVwiXCIsLi4udCk9PmNvbnNvbGUubG9nKGUucGFkRW5kKDkpLFwifFwiLC4uLnQpO3ZhciB2PSguLi5lKT0+Y29uc29sZS5lcnJvcihcIlxcdXsxRjUzNH0gRVJST1JcIi5wYWRFbmQoOSksXCJ8XCIsLi4uZSksYj0oLi4uZSk9PmYoXCJcXHV7MUY1MzV9IElORk9cIiwuLi5lKSxoPSguLi5lKT0+ZihcIlxcdXsxRjdFMH0gV0FSTlwiLC4uLmUpLE09MCxjPSguLi5lKT0+ZygpJiZmKGBcXHV7MUY3RTF9ICR7TSsrfWAsLi4uZSk7dmFyIG89e1wiaXNDb250ZW50U2NyaXB0XCI6ZmFsc2UsXCJpc0JhY2tncm91bmRcIjp0cnVlLFwiaXNSZWFjdFwiOmZhbHNlLFwicnVudGltZXNcIjpbXCJiYWNrZ3JvdW5kLXNlcnZpY2UtcnVudGltZVwiXSxcImhvc3RcIjpcImxvY2FsaG9zdFwiLFwicG9ydFwiOjMyOTc5LFwiZW50cnlGaWxlUGF0aFwiOlwiL2hvbWUvcnlhbmMvaXNweS8ucGxhc21vL3N0YXRpYy9iYWNrZ3JvdW5kL2luZGV4LnRzXCIsXCJidW5kbGVJZFwiOlwiNGU2ZDQzNDRiMzc3NTAzZFwiLFwiZW52SGFzaFwiOlwiMjEwMjgxY2FmOGQ0MTYwZFwiLFwidmVyYm9zZVwiOlwiZmFsc2VcIixcInNlY3VyZVwiOmZhbHNlLFwic2VydmVyUG9ydFwiOjQ1ODc3fTttb2R1bGUuYnVuZGxlLkhNUl9CVU5ETEVfSUQ9by5idW5kbGVJZDtnbG9iYWxUaGlzLnByb2Nlc3M9e2FyZ3Y6W10sZW52OntWRVJCT1NFOm8udmVyYm9zZX19O3ZhciBUPW1vZHVsZS5idW5kbGUuTW9kdWxlO2Z1bmN0aW9uIEQoZSl7VC5jYWxsKHRoaXMsZSksdGhpcy5ob3Q9e2RhdGE6bW9kdWxlLmJ1bmRsZS5ob3REYXRhW2VdLF9hY2NlcHRDYWxsYmFja3M6W10sX2Rpc3Bvc2VDYWxsYmFja3M6W10sYWNjZXB0OmZ1bmN0aW9uKHQpe3RoaXMuX2FjY2VwdENhbGxiYWNrcy5wdXNoKHR8fGZ1bmN0aW9uKCl7fSl9LGRpc3Bvc2U6ZnVuY3Rpb24odCl7dGhpcy5fZGlzcG9zZUNhbGxiYWNrcy5wdXNoKHQpfX0sbW9kdWxlLmJ1bmRsZS5ob3REYXRhW2VdPXZvaWQgMH1tb2R1bGUuYnVuZGxlLk1vZHVsZT1EO21vZHVsZS5idW5kbGUuaG90RGF0YT17fTt2YXIgbD1nbG9iYWxUaGlzLmNocm9tZXx8Z2xvYmFsVGhpcy5icm93c2VyfHxudWxsO2Z1bmN0aW9uIHUoKXtyZXR1cm4hby5ob3N0fHxvLmhvc3Q9PT1cIjAuMC4wLjBcIj9sb2NhdGlvbi5wcm90b2NvbC5pbmRleE9mKFwiaHR0cFwiKT09PTA/bG9jYXRpb24uaG9zdG5hbWU6XCJsb2NhbGhvc3RcIjpvLmhvc3R9ZnVuY3Rpb24gcCgpe3JldHVybiBvLnBvcnR8fGxvY2F0aW9uLnBvcnR9dmFyIEI9YCR7by5zZWN1cmU/XCJodHRwc1wiOlwiaHR0cFwifTovLyR7dSgpfToke3AoKX0vYDthc3luYyBmdW5jdGlvbiB4KGU9MTQ3MCl7Zm9yKDs7KXRyeXthd2FpdCBmZXRjaChCKTticmVha31jYXRjaHthd2FpdCBuZXcgUHJvbWlzZShzPT5zZXRUaW1lb3V0KHMsZSkpfX1pZihsLnJ1bnRpbWUuZ2V0TWFuaWZlc3QoKS5tYW5pZmVzdF92ZXJzaW9uPT09Myl7bGV0IGU9bC5ydW50aW1lLmdldFVSTChcIi9fX3BsYXNtb19obXJfcHJveHlfXz91cmw9XCIpO2dsb2JhbFRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcImZldGNoXCIsZnVuY3Rpb24odCl7bGV0IHM9dC5yZXF1ZXN0LnVybDtpZihzLnN0YXJ0c1dpdGgoZSkpe2xldCBuPW5ldyBVUkwoZGVjb2RlVVJJQ29tcG9uZW50KHMuc2xpY2UoZS5sZW5ndGgpKSk7bi5ob3N0bmFtZT09PW8uaG9zdCYmbi5wb3J0PT09YCR7by5wb3J0fWA/KG4uc2VhcmNoUGFyYW1zLnNldChcInRcIixEYXRlLm5vdygpLnRvU3RyaW5nKCkpLHQucmVzcG9uZFdpdGgoZmV0Y2gobikudGhlbihyPT5uZXcgUmVzcG9uc2Uoci5ib2R5LHtoZWFkZXJzOntcIkNvbnRlbnQtVHlwZVwiOnIuaGVhZGVycy5nZXQoXCJDb250ZW50LVR5cGVcIik/P1widGV4dC9qYXZhc2NyaXB0XCJ9fSkpKSk6dC5yZXNwb25kV2l0aChuZXcgUmVzcG9uc2UoXCJQbGFzbW8gSE1SXCIse3N0YXR1czoyMDAsc3RhdHVzVGV4dDpcIlRlc3RpbmdcIn0pKX19KX1mdW5jdGlvbiBSKGUsdCl7bGV0e21vZHVsZXM6c309ZTtyZXR1cm4gcz8hIXNbdF06ITF9ZnVuY3Rpb24gayhlPXAoKSl7bGV0IHQ9dSgpO3JldHVybmAke28uc2VjdXJlfHxsb2NhdGlvbi5wcm90b2NvbD09PVwiaHR0cHM6XCImJiEvbG9jYWxob3N0fDEyNy4wLjAuMXwwLjAuMC4wLy50ZXN0KHQpP1wid3NzXCI6XCJ3c1wifTovLyR7dH06JHtlfS9gfWZ1bmN0aW9uIFMoZSl7dHlwZW9mIGUubWVzc2FnZT09XCJzdHJpbmdcIiYmdihcIltwbGFzbW8vcGFyY2VsLXJ1bnRpbWVdOiBcIitlLm1lc3NhZ2UpfWZ1bmN0aW9uIEwoZSl7aWYodHlwZW9mIGdsb2JhbFRoaXMuV2ViU29ja2V0PlwidVwiKXJldHVybjtsZXQgdD1uZXcgV2ViU29ja2V0KGsoTnVtYmVyKHAoKSkrMSkpO3JldHVybiB0LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsYXN5bmMgZnVuY3Rpb24ocyl7aWYoSlNPTi5wYXJzZShzLmRhdGEpLnR5cGU9PT1cImJ1aWxkX3JlYWR5XCIpe2F3YWl0IGUoKTtyZXR1cm59fSksdC5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIixTKSx0fWZ1bmN0aW9uIEUoZSl7aWYodHlwZW9mIGdsb2JhbFRoaXMuV2ViU29ja2V0PlwidVwiKXJldHVybjtsZXQgdD1uZXcgV2ViU29ja2V0KGsoKSk7cmV0dXJuIHQuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIixhc3luYyBmdW5jdGlvbihzKXtsZXQgbj1KU09OLnBhcnNlKHMuZGF0YSk7aWYobi50eXBlPT09XCJ1cGRhdGVcIiYmYXdhaXQgZShuLmFzc2V0cyksbi50eXBlPT09XCJlcnJvclwiKWZvcihsZXQgciBvZiBuLmRpYWdub3N0aWNzLmFuc2kpe2xldCBpPXIuY29kZWZyYW1lfHxyLnN0YWNrO2goXCJbcGxhc21vL3BhcmNlbC1ydW50aW1lXTogXCIrci5tZXNzYWdlK2BcbmAraStgXG5cbmArci5oaW50cy5qb2luKGBcbmApKX19KSx0LmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLFMpLHQuYWRkRXZlbnRMaXN0ZW5lcihcIm9wZW5cIiwoKT0+e2IoYFtwbGFzbW8vcGFyY2VsLXJ1bnRpbWVdOiBDb25uZWN0ZWQgdG8gSE1SIHNlcnZlciBmb3IgJHtvLmVudHJ5RmlsZVBhdGh9YCl9KSx0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbG9zZVwiLCgpPT57aChgW3BsYXNtby9wYXJjZWwtcnVudGltZV06IENvbm5lY3Rpb24gdG8gdGhlIEhNUiBzZXJ2ZXIgaXMgY2xvc2VkIGZvciAke28uZW50cnlGaWxlUGF0aH1gKX0pLHR9dmFyIHc9bW9kdWxlLmJ1bmRsZS5wYXJlbnQsYT17YnVpbGRSZWFkeTohMSxobXJVcGRhdGVkOiExLGNzQ29kZUNoYW5nZWQ6ITEscG9ydHM6bmV3IFNldH07YXN5bmMgZnVuY3Rpb24gZChlPSExKXtpZihlfHxhLmJ1aWxkUmVhZHkmJihhLmhtclVwZGF0ZWR8fGEuY3NDb2RlQ2hhbmdlZCkpe2MoXCJCR1NXIFJ1bnRpbWUgLSByZWxvYWRpbmdcIik7bGV0IHQ9YXdhaXQgY2hyb21lLnRhYnMucXVlcnkoe2FjdGl2ZTohMH0pO2ZvcihsZXQgcyBvZiBhLnBvcnRzKXtsZXQgbj10LnNvbWUocj0+ci5pZD09PXMuc2VuZGVyLnRhYi5pZCk7cy5wb3N0TWVzc2FnZSh7X19wbGFzbW9fY3NfYWN0aXZlX3RhYl9fOm59KX1sLnJ1bnRpbWUucmVsb2FkKCl9fWlmKCF3fHwhdy5pc1BhcmNlbFJlcXVpcmUpe2xldCBlPUUoYXN5bmMgdD0+e2MoXCJCR1NXIFJ1bnRpbWUgLSBPbiBITVIgVXBkYXRlXCIpLGEuaG1yVXBkYXRlZHx8PXQuZmlsdGVyKG49Pm4uZW52SGFzaD09PW8uZW52SGFzaCkuc29tZShuPT5SKG1vZHVsZS5idW5kbGUsbi5pZCkpO2xldCBzPXQuZmluZChuPT5uLnR5cGU9PT1cImpzb25cIik7aWYocyl7bGV0IG49bmV3IFNldCh0Lm1hcChpPT5pLmlkKSkscj1PYmplY3QudmFsdWVzKHMuZGVwc0J5QnVuZGxlKS5tYXAoaT0+T2JqZWN0LnZhbHVlcyhpKSkuZmxhdCgpO2EuaG1yVXBkYXRlZHx8PXIuZXZlcnkoaT0+bi5oYXMoaSkpfWQoKX0pO2UuYWRkRXZlbnRMaXN0ZW5lcihcIm9wZW5cIiwoKT0+e2xldCB0PXNldEludGVydmFsKCgpPT5lLnNlbmQoXCJwaW5nXCIpLDI0ZTMpO2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsb3NlXCIsKCk9PmNsZWFySW50ZXJ2YWwodCkpfSksZS5hZGRFdmVudExpc3RlbmVyKFwiY2xvc2VcIixhc3luYygpPT57YXdhaXQgeCgpLGQoITApfSl9TChhc3luYygpPT57YyhcIkJHU1cgUnVudGltZSAtIE9uIEJ1aWxkIFJlcGFja2FnZWRcIiksYS5idWlsZFJlYWR5fHw9ITAsZCgpfSk7bC5ydW50aW1lLm9uQ29ubmVjdC5hZGRMaXN0ZW5lcihmdW5jdGlvbihlKXtlLm5hbWUuc3RhcnRzV2l0aChcIl9fcGxhc21vX3J1bnRpbWVfc2NyaXB0X1wiKSYmKGEucG9ydHMuYWRkKGUpLGUub25EaXNjb25uZWN0LmFkZExpc3RlbmVyKCgpPT57YS5wb3J0cy5kZWxldGUoZSl9KSxlLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbih0KXt0Ll9fcGxhc21vX2NzX2NoYW5nZWRfXyYmKGMoXCJCR1NXIFJ1bnRpbWUgLSBPbiBDUyBjb2RlIGNoYW5nZWRcIiksYS5jc0NvZGVDaGFuZ2VkfHw9ITAsZCgpKX0pKX0pO2wucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24odCl7cmV0dXJuIHQuX19wbGFzbW9fZnVsbF9yZWxvYWRfXyYmKGMoXCJCR1NXIFJ1bnRpbWUgLSBPbiB0b3AtbGV2ZWwgY29kZSBjaGFuZ2VkXCIpLGQoKSksITB9KTtcbiIsImltcG9ydCBcIi4uLy4uLy4uL2JhY2tncm91bmQvaW5kZXhcIiIsImV4cG9ydCB7fVxuXG5sZXQgYWN0aXZlVGFiSWQsIGxhc3RUYWJVcmwsIHdlYnNvY2tldFxuXG5jb25zdCBnZXRDdXJyZW50VGFiID0gYXN5bmMgKCkgPT4ge1xuICBjb25zb2xlLmxvZyhcImdldGN1cnJlbnRUYWJcIilcbiAgY29uc3QgW3RhYl0gPSBhd2FpdCBjaHJvbWUudGFicy5xdWVyeSh7XG4gICAgYWN0aXZlOiB0cnVlLFxuICAgIGxhc3RGb2N1c2VkV2luZG93OiB0cnVlXG4gIH0pXG4gIGxhc3RUYWJVcmwgPSB0YWIudXJsXG4gIGNvbnNvbGUubG9nKHRhYi5pZClcbiAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGFiLmlkLCB0YWIudXJsKVxuICByZXR1cm4geyB0YWIsIGNoYW5nZTogdHJ1ZSB9XG59XG5cbmNocm9tZS50YWJzLm9uQWN0aXZhdGVkLmFkZExpc3RlbmVyKChhY3RpdmVJbmZvKSA9PiB7XG4gIGFjdGl2ZVRhYklkID0gYWN0aXZlSW5mby50YWJJZFxuICBnZXRDdXJyZW50VGFiKClcbn0pXG5cbmNocm9tZS50YWJzLm9uVXBkYXRlZC5hZGRMaXN0ZW5lcigodGFiSWQsIGNoYW5nZUluZm8sIHRhYikgPT4ge1xuICBpZiAoYWN0aXZlVGFiSWQgPT09IHRhYklkKSB7XG4gICAgZ2V0Q3VycmVudFRhYigpXG4gIH1cbn0pXG5cbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigobWVzc2FnZSwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcbiAgY29uc29sZS5sb2coXCJtZXNzYWdlIHJlY2VpdmVkXCIsIG1lc3NhZ2UsIHNlbmRlci50YWIuaWQpXG4gIGlmIChtZXNzYWdlID09PSBcImdldEN1cnJlbnRVcmxcIikge1xuICAgIGdldEN1cnJlbnRUYWIoKVxuICB9XG59KVxuIiwiZXhwb3J0cy5pbnRlcm9wRGVmYXVsdCA9IGZ1bmN0aW9uIChhKSB7XG4gIHJldHVybiBhICYmIGEuX19lc01vZHVsZSA/IGEgOiB7ZGVmYXVsdDogYX07XG59O1xuXG5leHBvcnRzLmRlZmluZUludGVyb3BGbGFnID0gZnVuY3Rpb24gKGEpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGEsICdfX2VzTW9kdWxlJywge3ZhbHVlOiB0cnVlfSk7XG59O1xuXG5leHBvcnRzLmV4cG9ydEFsbCA9IGZ1bmN0aW9uIChzb3VyY2UsIGRlc3QpIHtcbiAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoa2V5ID09PSAnZGVmYXVsdCcgfHwga2V5ID09PSAnX19lc01vZHVsZScgfHwgZGVzdC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRlc3QsIGtleSwge1xuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gc291cmNlW2tleV07XG4gICAgICB9LFxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gZGVzdDtcbn07XG5cbmV4cG9ydHMuZXhwb3J0ID0gZnVuY3Rpb24gKGRlc3QsIGRlc3ROYW1lLCBnZXQpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRlc3QsIGRlc3ROYW1lLCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGdldCxcbiAgfSk7XG59O1xuIl0sIm5hbWVzIjpbXSwidmVyc2lvbiI6MywiZmlsZSI6ImJhY2tncm91bmQuYjM3NzUwM2QuanMubWFwIn0=
