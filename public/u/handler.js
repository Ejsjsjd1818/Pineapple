"use strict";
(() => {
  var h = self.Ultraviolet,
    A = self.UVClient,
    R = self.__uv$config,
    U = self.__uv$cookies;
  if (typeof U != "string")
    throw new TypeError("Unable to load global UV data");
  self.__uv || p(self);
  self.__uvHook = p;
  function p(o) {
    o.window
      ? k(o, new h.BareClient())
      : (o.__uv$promise = new Promise((d) => {
          o.onmessage = (c) => {
            if (c.data.__data instanceof MessagePort)
              k(o, new h.BareClient(c.data.__data)), delete o.onmessage, d();
            else throw new Error("unreachable: e.data !== MessagePort");
          };
        }));
  }
  function k(o, d) {
    if ("__uv" in o && o.__uv instanceof h) return !1;
    o.document &&
      o.window &&
      o.document
        .querySelectorAll("script[__uv-script]")
        .forEach((t) => t.remove());
    let c = !o.window,
      b = "__uv",
      i = "__uv$",
      e = new h(R),
      a = new A(o, d, c),
      {
        HTMLMediaElement: g,
        HTMLScriptElement: _,
        HTMLAudioElement: v,
        HTMLVideoElement: M,
        HTMLInputElement: j,
        HTMLEmbedElement: H,
        HTMLTrackElement: x,
        HTMLAnchorElement: O,
        HTMLIFrameElement: u,
        HTMLAreaElement: $,
        HTMLLinkElement: L,
        HTMLBaseElement: T,
        HTMLFormElement: E,
        HTMLImageElement: y,
        HTMLSourceElement: C,
      } = o;
    a.nativeMethods.defineProperty(o, "__uv", { value: e, enumerable: !1 }),
      (e.meta.origin = location.origin),
      (e.location = a.location.emulate(
        (t) =>
          t === "about:srcdoc"
            ? new URL(t)
            : (t.startsWith("blob:") && (t = t.slice(5)),
              new URL(e.sourceUrl(t))),
        (t) => e.rewriteUrl(t),
      ));
    let n = U;
    if (
      ((e.meta.url = e.location),
      (e.domain = e.meta.url.host),
      (e.blobUrls = new o.Map()),
      (e.referrer = ""),
      (e.cookies = []),
      (e.localStorageObj = {}),
      (e.sessionStorageObj = {}),
      e.location.href === "about:srcdoc" && (e.meta = o.parent.__uv.meta),
      o.EventTarget &&
        ((e.addEventListener = o.EventTarget.prototype.addEventListener),
        (e.removeListener = o.EventTarget.prototype.removeListener),
        (e.dispatchEvent = o.EventTarget.prototype.dispatchEvent)),
      a.nativeMethods.defineProperty(a.storage.storeProto, "__uv$storageObj", {
        get() {
          if (this === a.storage.sessionStorage) return e.sessionStorageObj;
          if (this === a.storage.localStorage) return e.localStorageObj;
        },
        enumerable: !1,
      }),
      o.localStorage)
    ) {
      for (let t in o.localStorage)
        t.startsWith(i + e.location.origin + "@") &&
          (e.localStorageObj[t.slice((i + e.location.origin + "@").length)] =
            o.localStorage.getItem(t));
      e.lsWrap = a.storage.emulate(a.storage.localStorage, e.localStorageObj);
    }
    if (o.sessionStorage) {
      for (let t in o.sessionStorage)
        t.startsWith(i + e.location.origin + "@") &&
          (e.sessionStorageObj[t.slice((i + e.location.origin + "@").length)] =
            o.sessionStorage.getItem(t));
      e.ssWrap = a.storage.emulate(
        a.storage.sessionStorage,
        e.sessionStorageObj,
      );
    }
    let m = o.document ? a.node.baseURI.get.call(o.document) : o.location.href,
      S = e.sourceUrl(m);
    a.nativeMethods.defineProperty(e.meta, "base", {
      get() {
        return o.document
          ? (a.node.baseURI.get.call(o.document) !== m &&
              ((m = a.node.baseURI.get.call(o.document)), (S = e.sourceUrl(m))),
            S)
          : e.meta.url.href;
      },
    }),
      (e.methods = {
        setSource: i + "setSource",
        source: i + "source",
        location: i + "location",
        function: i + "function",
        string: i + "string",
        eval: i + "eval",
        parent: i + "parent",
        top: i + "top",
      }),
      (e.filterKeys = [
        b,
        e.methods.setSource,
        e.methods.source,
        e.methods.location,
        e.methods.function,
        e.methods.string,
        e.methods.eval,
        e.methods.parent,
        e.methods.top,
        i + "protocol",
        i + "storageObj",
        i + "url",
        i + "modifiedStyle",
        i + "config",
        i + "dispatched",
        "Ultraviolet",
        "__uvHook",
      ]),
      a.on("wrap", (t, r) => {
        a.nativeMethods.defineProperty(
          r,
          "name",
          a.nativeMethods.getOwnPropertyDescriptor(t, "name"),
        ),
          a.nativeMethods.defineProperty(
            r,
            "length",
            a.nativeMethods.getOwnPropertyDescriptor(t, "length"),
          ),
          a.nativeMethods.defineProperty(r, e.methods.string, {
            enumerable: !1,
            value: a.nativeMethods.fnToString.call(t),
          }),
          a.nativeMethods.defineProperty(r, e.methods.function, {
            enumerable: !1,
            value: t,
          });
      }),
      a.fetch.on("request", (t) => {
        t.data.input = e.rewriteUrl(t.data.input);
      }),
      a.fetch.on("requestUrl", (t) => {
        t.data.value = e.sourceUrl(t.data.value);
      }),
      a.fetch.on("responseUrl", (t) => {
        t.data.value = e.sourceUrl(t.data.value);
      }),
      a.xhr.on("open", (t) => {
        t.data.input = e.rewriteUrl(t.data.input);
      }),
      a.xhr.on("responseUrl", (t) => {
        t.data.value = e.sourceUrl(t.data.value);
      }),
      a.workers.on("worker", (t) => {
        t.data.url = e.rewriteUrl(t.data.url);
      }),
      a.workers.on("addModule", (t) => {
        t.data.url = e.rewriteUrl(t.data.url);
      }),
      a.workers.on("importScripts", (t) => {
        for (let r in t.data.scripts)
          t.data.scripts[r] = e.rewriteUrl(t.data.scripts[r]);
      }),
      a.workers.on("postMessage", (t) => {
        let r = t.data.origin;
        (t.data.origin = "*"),
          (t.data.message = {
            __data: t.data.message,
            __origin: e.meta.url.origin,
            __to: r,
          });
      }),
      a.navigator.on("sendBeacon", (t) => {
        t.data.url = e.rewriteUrl(t.data.url);
      }),
      a.document.on("getCookie", (t) => {
        t.data.value = n;
      }),
      a.document.on("setCookie", (t) => {
        e.cookie.db().then((l) => {
          e.cookie.setCookies(t.data.value, l, e.meta),
            e.cookie.getCookies(l).then((s) => {
              n = e.cookie.serialize(s, e.meta, !0);
            });
        });
        let r = e.cookie.setCookie(t.data.value)[0];
        r.path || (r.path = "/"),
          r.domain || (r.domain = e.meta.url.hostname),
          e.cookie.validateCookie(r, e.meta, !0) &&
            (n.length && (n += "; "), (n += `${r.name}=${r.value}`)),
          t.respondWith(t.data.value);
      }),
      a.element.on("setInnerHTML", (t) => {
        switch (t.that.tagName) {
          case "SCRIPT":
            t.data.value = e.js.rewrite(t.data.value);
            break;
          case "STYLE":
            t.data.value = e.rewriteCSS(t.data.value);
            break;
          default:
            t.data.value = e.rewriteHtml(t.data.value);
        }
      }),
      a.element.on("getInnerHTML", (t) => {
        switch (t.that.tagName) {
          case "SCRIPT":
            t.data.value = e.js.source(t.data.value);
            break;
          default:
            t.data.value = e.sourceHtml(t.data.value);
        }
      }),
      a.element.on("setOuterHTML", (t) => {
        t.data.value = e.rewriteHtml(t.data.value, {
          document: t.that.tagName === "HTML",
        });
      }),
      a.element.on("getOuterHTML", (t) => {
        switch (t.that.tagName) {
          case "HEAD":
            t.data.value = e
              .sourceHtml(
                t.data.value.replace(
                  /<head(.*)>(.*)<\/head>/s,
                  "<op-head$1>$2</op-head>",
                ),
              )
              .replace(/<op-head(.*)>(.*)<\/op-head>/s, "<head$1>$2</head>");
            break;
          case "BODY":
            t.data.value = e
              .sourceHtml(
                t.data.value.replace(
                  /<body(.*)>(.*)<\/body>/s,
                  "<op-body$1>$2</op-body>",
                ),
              )
              .replace(/<op-body(.*)>(.*)<\/op-body>/s, "<body$1>$2</body>");
            break;
          default:
            t.data.value = e.sourceHtml(t.data.value, {
              document: t.that.tagName === "HTML",
            });
            break;
        }
      }),
      a.document.on("write", (t) => {
        if (!t.data.html.length) return !1;
        t.data.html = [e.rewriteHtml(t.data.html.join(""))];
      }),
      a.document.on("writeln", (t) => {
        if (!t.data.html.length) return !1;
        t.data.html = [e.rewriteHtml(t.data.html.join(""))];
      }),
      a.element.on("insertAdjacentHTML", (t) => {
        t.data.html = e.rewriteHtml(t.data.html);
      }),
      a.eventSource.on("construct", (t) => {
        t.data.url = e.rewriteUrl(t.data.url);
      }),
      a.eventSource.on("url", (t) => {
        t.data.url = e.rewriteUrl(t.data.url);
      }),
      a.idb.on("idbFactoryOpen", (t) => {
        t.data.name !== "__op" &&
          (t.data.name = `${e.meta.url.origin}@${t.data.name}`);
      }),
      a.idb.on("idbFactoryName", (t) => {
        t.data.value = t.data.value.slice(e.meta.url.origin.length + 1);
      }),
      a.history.on("replaceState", (t) => {
        t.data.url &&
          (t.data.url = e.rewriteUrl(
            t.data.url,
            "__uv" in t.that ? t.that.__uv.meta : e.meta,
          ));
      }),
      a.history.on("pushState", (t) => {
        t.data.url &&
          (t.data.url = e.rewriteUrl(
            t.data.url,
            "__uv" in t.that ? t.that.__uv.meta : e.meta,
          ));
      }),
      a.element.on("getAttribute", (t) => {
        a.element.hasAttribute.call(
          t.that,
          e.attributePrefix + "-attr-" + t.data.name,
        ) &&
          t.respondWith(
            t.target.call(t.that, e.attributePrefix + "-attr-" + t.data.name),
          );
      }),
      a.message.on("postMessage", (t) => {
        let r = t.data.origin,
          l = e.call;
        t.that && (l = t.that.__uv$source.call),
          (t.data.origin = "*"),
          (t.data.message = {
            __data: t.data.message,
            __origin: (t.that || t.target).__uv$source.location.origin,
            __to: r,
          }),
          t.respondWith(
            c
              ? l(t.target, [t.data.message, t.data.transfer], t.that)
              : l(
                  t.target,
                  [t.data.message, t.data.origin, t.data.transfer],
                  t.that,
                ),
          );
      }),
      a.message.on("data", (t) => {
        let { value: r } = t.data;
        typeof r == "object" &&
          "__data" in r &&
          "__origin" in r &&
          t.respondWith(r.__data);
      }),
      a.message.on("origin", (t) => {
        let r = a.message.messageData.get.call(t.that);
        typeof r == "object" &&
          r.__data &&
          r.__origin &&
          t.respondWith(r.__origin);
      }),
      a.overrideDescriptor(o, "origin", { get: () => e.location.origin }),
      a.node.on("baseURI", (t) => {
        t.data.value.startsWith(o.location.origin) &&
          (t.data.value = e.sourceUrl(t.data.value));
      }),
      a.element.on("setAttribute", (t) => {
        if (
          t.that instanceof g &&
          t.data.name === "src" &&
          t.data.value.startsWith("blob:")
        ) {
          t.target.call(
            t.that,
            e.attributePrefix + "-attr-" + t.data.name,
            t.data.value,
          ),
            (t.data.value = e.blobUrls.get(t.data.value));
          return;
        }
        e.attrs.isUrl(t.data.name) &&
          (t.target.call(
            t.that,
            e.attributePrefix + "-attr-" + t.data.name,
            t.data.value,
          ),
          (t.data.value = e.rewriteUrl(t.data.value))),
          e.attrs.isStyle(t.data.name) &&
            (t.target.call(
              t.that,
              e.attributePrefix + "-attr-" + t.data.name,
              t.data.value,
            ),
            (t.data.value = e.rewriteCSS(t.data.value, {
              context: "declarationList",
            }))),
          e.attrs.isHtml(t.data.name) &&
            (t.target.call(
              t.that,
              e.attributePrefix + "-attr-" + t.data.name,
              t.data.value,
            ),
            (t.data.value = e.rewriteHtml(t.data.value, {
              ...e.meta,
              document: !0,
              injectHead: e.createHtmlInject(
                e.handlerScript,
                e.bundleScript,
                e.clientScript,
                e.configScript,
                n,
                o.location.href,
              ),
            }))),
          e.attrs.isSrcset(t.data.name) &&
            (t.target.call(
              t.that,
              e.attributePrefix + "-attr-" + t.data.name,
              t.data.value,
            ),
            (t.data.value = e.html.wrapSrcset(t.data.value.toString()))),
          e.attrs.isForbidden(t.data.name) &&
            (t.data.name = e.attributePrefix + "-attr-" + t.data.name);
      }),
      a.element.on("audio", (t) => {
        t.data.url = e.rewriteUrl(t.data.url);
      }),
      a.element.hookProperty([O, $, L, T], "href", {
        get: (t, r) => e.sourceUrl(t.call(r)),
        set: (t, r, [l]) => {
          a.element.setAttribute.call(r, e.attributePrefix + "-attr-href", l),
            t.call(r, e.rewriteUrl(l));
        },
      }),
      a.element.hookProperty([_, v, M, g, y, j, H, u, x, C], "src", {
        get: (t, r) => e.sourceUrl(t.call(r)),
        set: (t, r, [l]) => {
          if (
            new String(l).toString().trim().startsWith("blob:") &&
            r instanceof g
          )
            return (
              a.element.setAttribute.call(
                r,
                e.attributePrefix + "-attr-src",
                l,
              ),
              t.call(r, e.blobUrls.get(l) || l)
            );
          a.element.setAttribute.call(r, e.attributePrefix + "-attr-src", l),
            t.call(r, e.rewriteUrl(l));
        },
      }),
      a.element.hookProperty([E], "action", {
        get: (t, r) => e.sourceUrl(t.call(r)),
        set: (t, r, [l]) => {
          a.element.setAttribute.call(r, e.attributePrefix + "-attr-action", l),
            t.call(r, e.rewriteUrl(l));
        },
      }),
      a.element.hookProperty([y], "srcset", {
        get: (t, r) =>
          a.element.getAttribute.call(r, e.attributePrefix + "-attr-srcset") ||
          t.call(r),
        set: (t, r, [l]) => {
          a.element.setAttribute.call(r, e.attributePrefix + "-attr-srcset", l),
            t.call(r, e.html.wrapSrcset(l.toString()));
        },
      }),
      a.element.hookProperty(_, "integrity", {
        get: (t, r) =>
          a.element.getAttribute.call(r, e.attributePrefix + "-attr-integrity"),
        set: (t, r, [l]) => {
          a.element.setAttribute.call(
            r,
            e.attributePrefix + "-attr-integrity",
            l,
          );
        },
      }),
      a.element.hookProperty(u, "sandbox", {
        get: (t, r) =>
          a.element.getAttribute.call(r, e.attributePrefix + "-attr-sandbox") ||
          t.call(r),
        set: (t, r, [l]) => {
          a.element.setAttribute.call(
            r,
            e.attributePrefix + "-attr-sandbox",
            l,
          );
        },
      });
    let W =
      u && Object.getOwnPropertyDescriptor(u.prototype, "contentWindow").get;
    function P(t) {
      let r = W.call(t);
      if (!r.__uv)
        try {
          p(r);
        } catch (l) {
          console.error("catastrophic failure"), console.error(l);
        }
    }
    if (
      (a.element.hookProperty(u, "contentWindow", {
        get: (t, r) => (P(r), t.call(r)),
      }),
      a.element.hookProperty(u, "contentDocument", {
        get: (t, r) => (P(r), t.call(r)),
      }),
      a.element.hookProperty(u, "srcdoc", {
        get: (t, r) =>
          a.element.getAttribute.call(r, e.attributePrefix + "-attr-srcdoc") ||
          t.call(r),
        set: (t, r, [l]) => {
          t.call(
            r,
            e.rewriteHtml(l, {
              document: !0,
              injectHead: e.createHtmlInject(
                e.handlerScript,
                e.bundleScript,
                e.clientScript,
                e.configScript,
                n,
                o.location.href,
              ),
            }),
          );
        },
      }),
      a.node.on("getTextContent", (t) => {
        t.that.tagName === "SCRIPT" &&
          (t.data.value = e.js.source(t.data.value));
      }),
      a.node.on("setTextContent", (t) => {
        t.that.tagName === "SCRIPT" &&
          (t.data.value = e.js.rewrite(t.data.value));
      }),
      "serviceWorker" in o.navigator &&
        delete o.Navigator.prototype.serviceWorker,
      a.document.on("getDomain", (t) => {
        t.data.value = e.domain;
      }),
      a.document.on("setDomain", (t) => {
        if (
          !t.data.value
            .toString()
            .endsWith(e.meta.url.hostname.split(".").slice(-2).join("."))
        )
          return t.respondWith("");
        t.respondWith((e.domain = t.data.value));
      }),
      a.document.on("url", (t) => {
        t.data.value = e.location.href;
      }),
      a.document.on("documentURI", (t) => {
        t.data.value = e.location.href;
      }),
      a.document.on("referrer", (t) => {
        t.data.value = e.referrer || e.sourceUrl(t.data.value);
      }),
      a.document.on("parseFromString", (t) => {
        if (t.data.type !== "text/html") return !1;
        t.data.string = e.rewriteHtml(t.data.string, {
          ...e.meta,
          document: !0,
        });
      }),
      a.attribute.on("getValue", (t) => {
        a.element.hasAttribute.call(
          t.that.ownerElement,
          e.attributePrefix + "-attr-" + t.data.name,
        ) &&
          (t.data.value = a.element.getAttribute.call(
            t.that.ownerElement,
            e.attributePrefix + "-attr-" + t.data.name,
          ));
      }),
      a.attribute.on("setValue", (t) => {
        e.attrs.isUrl(t.data.name) &&
          (a.element.setAttribute.call(
            t.that.ownerElement,
            e.attributePrefix + "-attr-" + t.data.name,
            t.data.value,
          ),
          (t.data.value = e.rewriteUrl(t.data.value))),
          e.attrs.isStyle(t.data.name) &&
            (a.element.setAttribute.call(
              t.that.ownerElement,
              e.attributePrefix + "-attr-" + t.data.name,
              t.data.value,
            ),
            (t.data.value = e.rewriteCSS(t.data.value, {
              context: "declarationList",
            }))),
          e.attrs.isHtml(t.data.name) &&
            (a.element.setAttribute.call(
              t.that.ownerElement,
              e.attributePrefix + "-attr-" + t.data.name,
              t.data.value,
            ),
            (t.data.value = e.rewriteHtml(t.data.value, {
              ...e.meta,
              document: !0,
              injectHead: e.createHtmlInject(
                e.handlerScript,
                e.bundleScript,
                e.clientScript,
                e.configScript,
                n,
                o.location.href,
              ),
            }))),
          e.attrs.isSrcset(t.data.name) &&
            (a.element.setAttribute.call(
              t.that.ownerElement,
              e.attributePrefix + "-attr-" + t.data.name,
              t.data.value,
            ),
            (t.data.value = e.html.wrapSrcset(t.data.value.toString())));
      }),
      a.url.on("createObjectURL", (t) => {
        let r = t.target.call(t.that, t.data.object);
        if (r.startsWith("blob:" + location.origin)) {
          let l =
            "blob:" +
            (e.meta.url.href !== "about:blank"
              ? e.meta.url.origin
              : o.parent.__uv.meta.url.origin) +
            r.slice(5 + location.origin.length);
          e.blobUrls.set(l, r), t.respondWith(l);
        } else t.respondWith(r);
      }),
      a.url.on("revokeObjectURL", (t) => {
        if (e.blobUrls.has(t.data.url)) {
          let r = t.data.url;
          (t.data.url = e.blobUrls.get(t.data.url)), e.blobUrls.delete(r);
        }
      }),
      a.storage.on("get", (t) => {
        t.data.name = i + e.meta.url.origin + "@" + t.data.name;
      }),
      a.storage.on("set", (t) => {
        t.that.__uv$storageObj &&
          (t.that.__uv$storageObj[t.data.name] = t.data.value),
          (t.data.name = i + e.meta.url.origin + "@" + t.data.name);
      }),
      a.storage.on("delete", (t) => {
        t.that.__uv$storageObj && delete t.that.__uv$storageObj[t.data.name],
          (t.data.name = i + e.meta.url.origin + "@" + t.data.name);
      }),
      a.storage.on("getItem", (t) => {
        t.data.name = i + e.meta.url.origin + "@" + t.data.name;
      }),
      a.storage.on("setItem", (t) => {
        t.that.__uv$storageObj &&
          (t.that.__uv$storageObj[t.data.name] = t.data.value),
          (t.data.name = i + e.meta.url.origin + "@" + t.data.name);
      }),
      a.storage.on("removeItem", (t) => {
        t.that.__uv$storageObj && delete t.that.__uv$storageObj[t.data.name],
          (t.data.name = i + e.meta.url.origin + "@" + t.data.name);
      }),
      a.storage.on("clear", (t) => {
        if (t.that.__uv$storageObj)
          for (let r of a.nativeMethods.keys.call(null, t.that.__uv$storageObj))
            delete t.that.__uv$storageObj[r],
              a.storage.removeItem.call(
                t.that,
                i + e.meta.url.origin + "@" + r,
              ),
              t.respondWith();
      }),
      a.storage.on("length", (t) => {
        t.that.__uv$storageObj &&
          t.respondWith(
            a.nativeMethods.keys.call(null, t.that.__uv$storageObj).length,
          );
      }),
      a.storage.on("key", (t) => {
        t.that.__uv$storageObj &&
          t.respondWith(
            a.nativeMethods.keys.call(null, t.that.__uv$storageObj)[
              t.data.index
            ] || null,
          );
      }),
      a.websocket.on("websocket", async (t) => {
        let r = Object.create(null);
        (r.Origin = e.meta.url.origin),
          (r["User-Agent"] = navigator.userAgent),
          n !== "" && (r.Cookie = n.toString()),
          t.respondWith(
            d.createWebSocket(t.data.args[0], t.data.args[1], t.target, r),
          );
      }),
      a.websocket.on("readyState", (t) => {
        "__uv$getReadyState" in t.that &&
          (t.data.value = t.that.__uv$getReadyState());
      }),
      a.websocket.on("send", (t) => {
        if ("__uv$getSendError" in t.that) {
          let r = t.that.__uv$getSendError();
          if (r) throw r;
        }
      }),
      a.websocket.on("url", (t) => {
        "__uv$socketUrl" in t.that &&
          (t.data.value = t.that.__uv$socketUrl.toString());
      }),
      a.websocket.on("protocol", (t) => {
        "__uv$getProtocol" in t.that &&
          (t.data.value = t.that.__uv$getProtocol());
      }),
      a.function.on("function", (t) => {
        t.data.script = e.rewriteJS(t.data.script);
      }),
      a.function.on("toString", (t) => {
        e.methods.string in t.that && t.respondWith(t.that[e.methods.string]);
      }),
      a.object.on("getOwnPropertyNames", (t) => {
        t.data.names = t.data.names.filter((r) => !e.filterKeys.includes(r));
      }),
      a.object.on("getOwnPropertyDescriptors", (t) => {
        for (let r of e.filterKeys) delete t.data.descriptors[r];
      }),
      a.style.on("setProperty", (t) => {
        a.style.dashedUrlProps.includes(t.data.property) &&
          (t.data.value = e.rewriteCSS(t.data.value, {
            context: "value",
            ...e.meta,
          }));
      }),
      a.style.on("getPropertyValue", (t) => {
        a.style.dashedUrlProps.includes(t.data.property) &&
          t.respondWith(
            e.sourceCSS(t.target.call(t.that, t.data.property), {
              context: "value",
              ...e.meta,
            }),
          );
      }),
      "CSS2Properties" in o)
    )
      for (let t of a.style.urlProps)
        a.overrideDescriptor(o.CSS2Properties.prototype, t, {
          get: (r, l) =>
            e.sourceCSS(r.call(l), { context: "value", ...e.meta }),
          set: (r, l, s) => {
            r.call(l, e.rewriteCSS(s, { context: "value", ...e.meta }));
          },
        });
    else
      "HTMLElement" in o &&
        a.overrideDescriptor(o.HTMLElement.prototype, "style", {
          get: (t, r) => {
            let l = t.call(r);
            if (!l[i + "modifiedStyle"])
              for (let s of a.style.urlProps)
                a.nativeMethods.defineProperty(l, s, {
                  enumerable: !0,
                  configurable: !0,
                  get() {
                    let f = a.style.getPropertyValue.call(this, s) || "";
                    return e.sourceCSS(f, { context: "value", ...e.meta });
                  },
                  set(f) {
                    a.style.setProperty.call(
                      this,
                      a.style.propToDashed[s] || s,
                      e.rewriteCSS(f, { context: "value", ...e.meta }),
                    );
                  },
                }),
                  a.nativeMethods.defineProperty(l, i + "modifiedStyle", {
                    enumerable: !1,
                    value: !0,
                  });
            return l;
          },
        });
    a.style.on("setCssText", (t) => {
      t.data.value = e.rewriteCSS(t.data.value, {
        context: "declarationList",
        ...e.meta,
      });
    }),
      a.style.on("getCssText", (t) => {
        t.data.value = e.sourceCSS(t.data.value, {
          context: "declarationList",
          ...e.meta,
        });
      }),
      e.addEventListener.call(o, "hashchange", (t) => {
        if (t.__uv$dispatched) return !1;
        t.stopImmediatePropagation();
        let r = o.location.hash;
        a.history.replaceState.call(o.history, "", "", t.oldURL),
          (e.location.hash = r);
      }),
      a.location.on("hashchange", (t, r, l) => {
        if (l.HashChangeEvent && a.history.replaceState) {
          a.history.replaceState.call(o.history, "", "", e.rewriteUrl(r));
          let s = new l.HashChangeEvent("hashchange", { newURL: r, oldURL: t });
          a.nativeMethods.defineProperty(s, i + "dispatched", {
            value: !0,
            enumerable: !1,
          }),
            e.dispatchEvent.call(o, s);
        }
      }),
      a.fetch.overrideRequest(),
      a.fetch.overrideUrl(),
      a.xhr.overrideOpen(),
      a.xhr.overrideResponseUrl(),
      a.element.overrideHtml(),
      a.element.overrideAttribute(),
      a.element.overrideInsertAdjacentHTML(),
      a.element.overrideAudio(),
      a.node.overrideBaseURI(),
      a.node.overrideTextContent(),
      a.attribute.overrideNameValue(),
      a.document.overrideDomain(),
      a.document.overrideURL(),
      a.document.overrideDocumentURI(),
      a.document.overrideWrite(),
      a.document.overrideReferrer(),
      a.document.overrideParseFromString(),
      a.storage.overrideMethods(),
      a.storage.overrideLength(),
      a.object.overrideGetPropertyNames(),
      a.object.overrideGetOwnPropertyDescriptors(),
      a.idb.overrideName(),
      a.idb.overrideOpen(),
      a.history.overridePushState(),
      a.history.overrideReplaceState(),
      a.eventSource.overrideConstruct(),
      a.eventSource.overrideUrl(),
      a.websocket.overrideWebSocket(),
      a.websocket.overrideProtocol(),
      a.websocket.overrideURL(),
      a.websocket.overrideReadyState(),
      a.websocket.overrideProtocol(),
      a.websocket.overrideSend(),
      a.url.overrideObjectURL(),
      a.document.overrideCookie(),
      a.message.overridePostMessage(),
      a.message.overrideMessageOrigin(),
      a.message.overrideMessageData(),
      a.workers.overrideWorker(),
      a.workers.overrideAddModule(),
      a.workers.overrideImportScripts(),
      a.workers.overridePostMessage(),
      a.style.overrideSetGetProperty(),
      a.style.overrideCssText(),
      a.navigator.overrideSendBeacon(),
      a.function.overrideFunction(),
      a.function.overrideToString(),
      a.location.overrideWorkerLocation((t) => new URL(e.sourceUrl(t))),
      a.overrideDescriptor(o, "localStorage", {
        get: (t, r) => (r || o).__uv.lsWrap,
      }),
      a.overrideDescriptor(o, "sessionStorage", {
        get: (t, r) => (r || o).__uv.ssWrap,
      }),
      a.override(o, "open", (t, r, l) => {
        if (!l.length) return t.apply(r, l);
        let [s] = l;
        return (s = e.rewriteUrl(s)), t.call(r, s);
      }),
      (e.$wrap = function (t) {
        return t === "location"
          ? e.methods.location
          : t === "eval"
            ? e.methods.eval
            : t;
      }),
      (e.$get = function (t) {
        return t === o.location
          ? e.location
          : t === o.eval
            ? e.eval
            : t === o.parent
              ? o.__uv$parent
              : t === o.top
                ? o.__uv$top
                : t;
      }),
      (e.eval = a.wrap(o, "eval", (t, r, l) => {
        if (!l.length || typeof l[0] != "string") return t.apply(r, l);
        let [s] = l;
        return (s = e.rewriteJS(s)), t.call(r, s);
      })),
      (e.call = function (t, r, l) {
        return l ? t.apply(l, r) : t(...r);
      }),
      (e.call$ = function (t, r, l = []) {
        return t[r].apply(t, l);
      }),
      a.nativeMethods.defineProperty(o.Object.prototype, b, {
        get: () => e,
        enumerable: !1,
      }),
      a.nativeMethods.defineProperty(o.Object.prototype, e.methods.setSource, {
        value: function (t) {
          return a.nativeMethods.isExtensible(this)
            ? (a.nativeMethods.defineProperty(this, e.methods.source, {
                value: t,
                writable: !0,
                enumerable: !1,
              }),
              this)
            : this;
        },
        enumerable: !1,
      }),
      a.nativeMethods.defineProperty(o.Object.prototype, e.methods.source, {
        value: e,
        writable: !0,
        enumerable: !1,
      }),
      a.nativeMethods.defineProperty(o.Object.prototype, e.methods.location, {
        configurable: !0,
        get() {
          return this === o.document || this === o ? e.location : this.location;
        },
        set(t) {
          this === o.document || this === o
            ? (e.location.href = t)
            : (this.location = t);
        },
      }),
      a.nativeMethods.defineProperty(o.Object.prototype, e.methods.parent, {
        configurable: !0,
        get() {
          let t = this.parent;
          if (this === o)
            try {
              return "__uv" in t ? t : this;
            } catch {
              return this;
            }
          return t;
        },
        set(t) {
          this.parent = t;
        },
      }),
      a.nativeMethods.defineProperty(o.Object.prototype, e.methods.top, {
        configurable: !0,
        get() {
          let t = this.top;
          if (this === o) {
            if (t === this.parent) return this[e.methods.parent];
            try {
              if ("__uv" in t) return t;
              {
                let r = this;
                for (; r.parent !== t; ) r = r.parent;
                return "__uv" in r ? r : this;
              }
            } catch {
              return this;
            }
          }
          return t;
        },
        set(t) {
          this.top = t;
        },
      }),
      a.nativeMethods.defineProperty(o.Object.prototype, e.methods.eval, {
        configurable: !0,
        get() {
          return this === o ? e.eval : this.eval;
        },
        set(t) {
          this.eval = t;
        },
      });
  }
})();
//# sourceMappingURL=uv.handler.js.map
