(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [84], {
        1993: function(e, t, n) {
            "use strict";
            t.Z = function() {
                for (var e, t, n = 0, r = ""; n < arguments.length;)(e = arguments[n++]) && (t = function e(t) {
                    var n, r, i = "";
                    if ("string" == typeof t || "number" == typeof t) i += t;
                    else if ("object" == typeof t) {
                        if (Array.isArray(t))
                            for (n = 0; n < t.length; n++) t[n] && (r = e(t[n])) && (i && (i += " "), i += r);
                        else
                            for (n in t) t[n] && (i && (i += " "), i += n)
                    }
                    return i
                }(e)) && (r && (r += " "), r += t);
                return r
            }
        },
        5376: function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                function(e, t) {
                    for (var n in t) Object.defineProperty(e, n, {
                        enumerable: !0,
                        get: t[n]
                    })
                }(t, {
                    DOMAttributeNames: function() {
                        return r
                    },
                    isEqualNode: function() {
                        return o
                    },
                    default: function() {
                        return u
                    }
                });
            var n, r = {
                acceptCharset: "accept-charset",
                className: "class",
                htmlFor: "for",
                httpEquiv: "http-equiv",
                noModule: "noModule"
            };

            function i(e) {
                var t = e.type,
                    n = e.props,
                    i = document.createElement(t);
                for (var o in n)
                    if (n.hasOwnProperty(o) && "children" !== o && "dangerouslySetInnerHTML" !== o && void 0 !== n[o]) {
                        var u = r[o] || o.toLowerCase();
                        "script" === t && ("async" === u || "defer" === u || "noModule" === u) ? i[u] = !!n[o] : i.setAttribute(u, n[o])
                    }
                var a = n.children,
                    l = n.dangerouslySetInnerHTML;
                return l ? i.innerHTML = l.__html || "" : a && (i.textContent = "string" == typeof a ? a : Array.isArray(a) ? a.join("") : ""), i
            }

            function o(e, t) {
                if (e instanceof HTMLElement && t instanceof HTMLElement) {
                    var n = t.getAttribute("nonce");
                    if (n && !e.getAttribute("nonce")) {
                        var r = t.cloneNode(!0);
                        return r.setAttribute("nonce", ""), r.nonce = n, n === e.nonce && e.isEqualNode(r)
                    }
                }
                return e.isEqualNode(t)
            }

            function u() {
                return {
                    mountedInstances: new Set,
                    updateHead: function(e) {
                        var t = {};
                        e.forEach(function(e) {
                            if ("link" === e.type && e.props["data-optimized-fonts"]) {
                                if (document.querySelector('style[data-href="' + e.props["data-href"] + '"]')) return;
                                e.props.href = e.props["data-href"], e.props["data-href"] = void 0
                            }
                            var n = t[e.type] || [];
                            n.push(e), t[e.type] = n
                        });
                        var r = t.title ? t.title[0] : null,
                            i = "";
                        if (r) {
                            var o = r.props.children;
                            i = "string" == typeof o ? o : Array.isArray(o) ? o.join("") : ""
                        }
                        i !== document.title && (document.title = i), ["meta", "base", "link", "style", "script"].forEach(function(e) {
                            n(e, t[e] || [])
                        })
                    }
                }
            }
            n = function(e, t) {
                for (var n, r = document.getElementsByTagName("head")[0], u = r.querySelector("meta[name=next-head-count]"), a = Number(u.content), l = [], s = 0, c = u.previousElementSibling; s < a; s++, c = (null == c ? void 0 : c.previousElementSibling) || null)(null == c ? void 0 : null == (n = c.tagName) ? void 0 : n.toLowerCase()) === e && l.push(c);
                var d = t.map(i).filter(function(e) {
                    for (var t = 0, n = l.length; t < n; t++)
                        if (o(l[t], e)) return l.splice(t, 1), !1;
                    return !0
                });
                l.forEach(function(e) {
                    var t;
                    return null == (t = e.parentNode) ? void 0 : t.removeChild(e)
                }), d.forEach(function(e) {
                    return r.insertBefore(e, u)
                }), u.content = (a - l.length + d.length).toString()
            }, ("function" == typeof t.default || "object" == typeof t.default && null !== t.default) && void 0 === t.default.__esModule && (Object.defineProperty(t.default, "__esModule", {
                value: !0
            }), Object.assign(t.default, t), e.exports = t.default)
        },
        1906: function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = n(2316),
                i = n(4050),
                o = n(8470),
                u = n(4862);
            Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                function(e, t) {
                    for (var n in t) Object.defineProperty(e, n, {
                        enumerable: !0,
                        get: t[n]
                    })
                }(t, {
                    handleClientScriptLoad: function() {
                        return y
                    },
                    initScriptLoader: function() {
                        return E
                    },
                    default: function() {
                        return w
                    }
                });
            var a = n(670),
                l = n(5294),
                s = a._(n(7941)),
                c = l._(n(4132)),
                d = n(6225),
                f = n(5376),
                v = n(8082),
                p = new Map,
                m = new Set,
                h = ["onLoad", "onReady", "dangerouslySetInnerHTML", "children", "onError", "strategy"],
                g = function(e) {
                    var t = e.src,
                        n = e.id,
                        r = e.onLoad,
                        i = void 0 === r ? function() {} : r,
                        u = e.onReady,
                        a = void 0 === u ? null : u,
                        l = e.dangerouslySetInnerHTML,
                        s = e.children,
                        c = void 0 === s ? "" : s,
                        d = e.strategy,
                        v = void 0 === d ? "afterInteractive" : d,
                        g = e.onError,
                        y = n || t;
                    if (!(y && m.has(y))) {
                        if (p.has(t)) {
                            m.add(y), p.get(t).then(i, g);
                            return
                        }
                        var E = function() {
                                a && a(), m.add(y)
                            },
                            b = document.createElement("script"),
                            w = new Promise(function(e, t) {
                                b.addEventListener("load", function(t) {
                                    e(), i && i.call(this, t), E()
                                }), b.addEventListener("error", function(e) {
                                    t(e)
                                })
                            }).catch(function(e) {
                                g && g(e)
                            });
                        l ? (b.innerHTML = l.__html || "", E()) : c ? (b.textContent = "string" == typeof c ? c : Array.isArray(c) ? c.join("") : "", E()) : t && (b.src = t, p.set(t, w));
                        var S = !0,
                            R = !1,
                            x = void 0;
                        try {
                            for (var T, L = Object.entries(e)[Symbol.iterator](); !(S = (T = L.next()).done); S = !0) {
                                var I = o._(T.value, 2),
                                    O = I[0],
                                    _ = I[1];
                                if (!(void 0 === _ || h.includes(O))) {
                                    var M = f.DOMAttributeNames[O] || O.toLowerCase();
                                    b.setAttribute(M, _)
                                }
                            }
                        } catch (e) {
                            R = !0, x = e
                        } finally {
                            try {
                                S || null == L.return || L.return()
                            } finally {
                                if (R) throw x
                            }
                        }
                        "worker" === v && b.setAttribute("type", "text/partytown"), b.setAttribute("data-nscript", v), document.body.appendChild(b)
                    }
                };

            function y(e) {
                var t = e.strategy;
                "lazyOnload" === (void 0 === t ? "afterInteractive" : t) ? window.addEventListener("load", function() {
                    (0, v.requestIdleCallback)(function() {
                        return g(e)
                    })
                }): g(e)
            }

            function E(e) {
                e.forEach(y), u._(document.querySelectorAll('[data-nscript="beforeInteractive"]')).concat(u._(document.querySelectorAll('[data-nscript="beforePageRender"]'))).forEach(function(e) {
                    var t = e.id || e.getAttribute("src");
                    m.add(t)
                })
            }

            function b(e) {
                var t = e.id,
                    n = e.src,
                    o = void 0 === n ? "" : n,
                    u = e.onLoad,
                    a = e.onReady,
                    l = void 0 === a ? null : a,
                    f = e.strategy,
                    p = void 0 === f ? "afterInteractive" : f,
                    h = e.onError,
                    y = i._(e, ["id", "src", "onLoad", "onReady", "strategy", "onError"]),
                    E = (0, c.useContext)(d.HeadManagerContext),
                    b = E.updateScripts,
                    w = E.scripts,
                    S = E.getIsSsr,
                    R = E.appDir,
                    x = E.nonce,
                    T = (0, c.useRef)(!1);
                (0, c.useEffect)(function() {
                    var e = t || o;
                    T.current || (l && e && m.has(e) && l(), T.current = !0)
                }, [l, t, o]);
                var L = (0, c.useRef)(!1);
                if ((0, c.useEffect)(function() {
                        !L.current && ("afterInteractive" === p ? g(e) : "lazyOnload" === p && ("complete" === document.readyState ? (0, v.requestIdleCallback)(function() {
                            return g(e)
                        }) : window.addEventListener("load", function() {
                            (0, v.requestIdleCallback)(function() {
                                return g(e)
                            })
                        })), L.current = !0)
                    }, [e, p]), ("beforeInteractive" === p || "worker" === p) && (b ? (w[p] = (w[p] || []).concat([r._({
                        id: t,
                        src: o,
                        onLoad: void 0 === u ? function() {} : u,
                        onReady: l,
                        onError: h
                    }, y)]), b(w)) : S && S() ? m.add(t || o) : S && !S() && g(e)), R) {
                    if ("beforeInteractive" === p) return o ? (s.default.preload(o, y.integrity ? {
                        as: "script",
                        integrity: y.integrity
                    } : {
                        as: "script"
                    }), c.default.createElement("script", {
                        nonce: x,
                        dangerouslySetInnerHTML: {
                            __html: "(self.__next_s=self.__next_s||[]).push(" + JSON.stringify([o]) + ")"
                        }
                    })) : (y.dangerouslySetInnerHTML && (y.children = y.dangerouslySetInnerHTML.__html, delete y.dangerouslySetInnerHTML), c.default.createElement("script", {
                        nonce: x,
                        dangerouslySetInnerHTML: {
                            __html: "(self.__next_s=self.__next_s||[]).push(" + JSON.stringify([0, r._({}, y)]) + ")"
                        }
                    }));
                    "afterInteractive" === p && o && s.default.preload(o, y.integrity ? {
                        as: "script",
                        integrity: y.integrity
                    } : {
                        as: "script"
                    })
                }
                return null
            }
            Object.defineProperty(b, "__nextScript", {
                value: !0
            });
            var w = b;
            ("function" == typeof t.default || "object" == typeof t.default && null !== t.default) && void 0 === t.default.__esModule && (Object.defineProperty(t.default, "__esModule", {
                value: !0
            }), Object.assign(t.default, t), e.exports = t.default)
        },
        8815: function(e) {
            e.exports = {
                style: {
                    fontFamily: "'__Inter_0ec1f4', '__Inter_Fallback_0ec1f4'",
                    fontStyle: "normal"
                },
                className: "__className_0ec1f4"
            }
        },
        3517: function(e, t, n) {
            e.exports = n(4627)
        },
        4075: function(e, t, n) {
            e.exports = n(9168)
        },
        5065: function(e, t, n) {
            e.exports = n(2168)
        },
        2080: function(e, t, n) {
            "use strict";
            var r = n(4132),
                i = "function" == typeof Object.is ? Object.is : function(e, t) {
                    return e === t && (0 !== e || 1 / e == 1 / t) || e != e && t != t
                },
                o = r.useState,
                u = r.useEffect,
                a = r.useLayoutEffect,
                l = r.useDebugValue;

            function s(e) {
                var t = e.getSnapshot;
                e = e.value;
                try {
                    var n = t();
                    return !i(e, n)
                } catch (e) {
                    return !0
                }
            }
            var c = "undefined" == typeof window || void 0 === window.document || void 0 === window.document.createElement ? function(e, t) {
                return t()
            } : function(e, t) {
                var n = t(),
                    r = o({
                        inst: {
                            value: n,
                            getSnapshot: t
                        }
                    }),
                    i = r[0].inst,
                    c = r[1];
                return a(function() {
                    i.value = n, i.getSnapshot = t, s(i) && c({
                        inst: i
                    })
                }, [e, n, t]), u(function() {
                    return s(i) && c({
                        inst: i
                    }), e(function() {
                        s(i) && c({
                            inst: i
                        })
                    })
                }, [e]), l(n), n
            };
            t.useSyncExternalStore = void 0 !== r.useSyncExternalStore ? r.useSyncExternalStore : c
        },
        4076: function(e, t, n) {
            "use strict";
            e.exports = n(2080)
        },
        2820: function(e, t, n) {
            "use strict";
            n.d(t, {
                R: function() {
                    return i
                }
            });
            var r, i = ((r = i || {}).Space = " ", r.Enter = "Enter", r.Escape = "Escape", r.Backspace = "Backspace", r.Delete = "Delete", r.ArrowLeft = "ArrowLeft", r.ArrowUp = "ArrowUp", r.ArrowRight = "ArrowRight", r.ArrowDown = "ArrowDown", r.Home = "Home", r.End = "End", r.PageUp = "PageUp", r.PageDown = "PageDown", r.Tab = "Tab", r)
        },
        858: function(e, t, n) {
            "use strict";
            n.d(t, {
                v: function() {
                    return X
                }
            });
            var r, i, o, u, a, l, s, c, d, f = n(4132),
                v = n(7467),
                p = n(6542),
                m = n(2132),
                h = n(4245),
                g = n(6488),
                y = n(6394),
                E = n(5849),
                b = n(2820),
                w = ((r = w || {})[r.First = 0] = "First", r[r.Previous = 1] = "Previous", r[r.Next = 2] = "Next", r[r.Last = 3] = "Last", r[r.Specific = 4] = "Specific", r[r.Nothing = 5] = "Nothing", r),
                S = n(6698),
                R = n(4001);
            let x = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map(e => `${e}:not([tabindex='-1'])`).join(",");
            var T = ((i = T || {})[i.First = 1] = "First", i[i.Previous = 2] = "Previous", i[i.Next = 4] = "Next", i[i.Last = 8] = "Last", i[i.WrapAround = 16] = "WrapAround", i[i.NoScroll = 32] = "NoScroll", i),
                L = ((o = L || {})[o.Error = 0] = "Error", o[o.Overflow = 1] = "Overflow", o[o.Success = 2] = "Success", o[o.Underflow = 3] = "Underflow", o),
                I = ((u = I || {})[u.Previous = -1] = "Previous", u[u.Next = 1] = "Next", u);

            function O(e = document.body) {
                return null == e ? [] : Array.from(e.querySelectorAll(x)).sort((e, t) => Math.sign((e.tabIndex || Number.MAX_SAFE_INTEGER) - (t.tabIndex || Number.MAX_SAFE_INTEGER)))
            }
            var _ = ((a = _ || {})[a.Strict = 0] = "Strict", a[a.Loose = 1] = "Loose", a);

            function M(e, t = 0) {
                var n;
                return e !== (null == (n = (0, R.r)(e)) ? void 0 : n.body) && (0, v.E)(t, {
                    0: () => e.matches(x),
                    1() {
                        let t = e;
                        for (; null !== t;) {
                            if (t.matches(x)) return !0;
                            t = t.parentElement
                        }
                        return !1
                    }
                })
            }

            function k(e) {
                let t = (0, R.r)(e);
                (0, m.k)().nextFrame(() => {
                    t && !M(t.activeElement, 0) && (null == e || e.focus({
                        preventScroll: !0
                    }))
                })
            }
            var A = ((l = A || {})[l.Keyboard = 0] = "Keyboard", l[l.Mouse = 1] = "Mouse", l);

            function C(e, t = e => e) {
                return e.slice().sort((e, n) => {
                    let r = t(e),
                        i = t(n);
                    if (null === r || null === i) return 0;
                    let o = r.compareDocumentPosition(i);
                    return o & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : o & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0
                })
            }
            "undefined" != typeof window && "undefined" != typeof document && (document.addEventListener("keydown", e => {
                e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "")
            }, !0), document.addEventListener("click", e => {
                1 === e.detail ? delete document.documentElement.dataset.headlessuiFocusVisible : 0 === e.detail && (document.documentElement.dataset.headlessuiFocusVisible = "")
            }, !0));
            var F = n(4523);

            function N(e, t, n) {
                let r = (0, F.E)(t);
                (0, f.useEffect)(() => {
                    function t(e) {
                        r.current(e)
                    }
                    return document.addEventListener(e, t, n), () => document.removeEventListener(e, t, n)
                }, [e, n])
            }
            var P = n(3561),
                D = n(1501),
                j = n(664);

            function V(e) {
                return [e.screenX, e.screenY]
            }
            let H = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;

            function z(e) {
                var t, n;
                let r = null != (t = e.innerText) ? t : "",
                    i = e.cloneNode(!0);
                if (!(i instanceof HTMLElement)) return r;
                let o = !1;
                for (let e of i.querySelectorAll('[hidden],[aria-hidden],[role="img"]')) e.remove(), o = !0;
                let u = o ? null != (n = i.innerText) ? n : "" : r;
                return H.test(u) && (u = u.replace(H, "")), u
            }
            var q = ((s = q || {})[s.Open = 0] = "Open", s[s.Closed = 1] = "Closed", s),
                U = ((c = U || {})[c.Pointer = 0] = "Pointer", c[c.Other = 1] = "Other", c),
                Z = ((d = Z || {})[d.OpenMenu = 0] = "OpenMenu", d[d.CloseMenu = 1] = "CloseMenu", d[d.GoToItem = 2] = "GoToItem", d[d.Search = 3] = "Search", d[d.ClearSearch = 4] = "ClearSearch", d[d.RegisterItem = 5] = "RegisterItem", d[d.UnregisterItem = 6] = "UnregisterItem", d);

            function B(e, t = e => e) {
                let n = null !== e.activeItemIndex ? e.items[e.activeItemIndex] : null,
                    r = C(t(e.items.slice()), e => e.dataRef.current.domRef.current),
                    i = n ? r.indexOf(n) : null;
                return -1 === i && (i = null), {
                    items: r,
                    activeItemIndex: i
                }
            }
            let W = {
                    1: e => 1 === e.menuState ? e : { ...e,
                        activeItemIndex: null,
                        menuState: 1
                    },
                    0: e => 0 === e.menuState ? e : { ...e,
                        __demoMode: !1,
                        menuState: 0
                    },
                    2: (e, t) => {
                        var n;
                        let r = B(e),
                            i = function(e, t) {
                                let n = t.resolveItems();
                                if (n.length <= 0) return null;
                                let r = t.resolveActiveIndex(),
                                    i = null != r ? r : -1,
                                    o = (() => {
                                        switch (e.focus) {
                                            case 0:
                                                return n.findIndex(e => !t.resolveDisabled(e));
                                            case 1:
                                                {
                                                    let e = n.slice().reverse().findIndex((e, n, r) => (-1 === i || !(r.length - n - 1 >= i)) && !t.resolveDisabled(e));
                                                    return -1 === e ? e : n.length - 1 - e
                                                }
                                            case 2:
                                                return n.findIndex((e, n) => !(n <= i) && !t.resolveDisabled(e));
                                            case 3:
                                                {
                                                    let e = n.slice().reverse().findIndex(e => !t.resolveDisabled(e));
                                                    return -1 === e ? e : n.length - 1 - e
                                                }
                                            case 4:
                                                return n.findIndex(n => t.resolveId(n) === e.id);
                                            case 5:
                                                return null;
                                            default:
                                                ! function(e) {
                                                    throw Error("Unexpected object: " + e)
                                                }(e)
                                        }
                                    })();
                                return -1 === o ? r : o
                            }(t, {
                                resolveItems: () => r.items,
                                resolveActiveIndex: () => r.activeItemIndex,
                                resolveId: e => e.id,
                                resolveDisabled: e => e.dataRef.current.disabled
                            });
                        return { ...e,
                            ...r,
                            searchQuery: "",
                            activeItemIndex: i,
                            activationTrigger: null != (n = t.trigger) ? n : 1
                        }
                    },
                    3: (e, t) => {
                        let n = "" !== e.searchQuery ? 0 : 1,
                            r = e.searchQuery + t.value.toLowerCase(),
                            i = (null !== e.activeItemIndex ? e.items.slice(e.activeItemIndex + n).concat(e.items.slice(0, e.activeItemIndex + n)) : e.items).find(e => {
                                var t;
                                return (null == (t = e.dataRef.current.textValue) ? void 0 : t.startsWith(r)) && !e.dataRef.current.disabled
                            }),
                            o = i ? e.items.indexOf(i) : -1;
                        return -1 === o || o === e.activeItemIndex ? { ...e,
                            searchQuery: r
                        } : { ...e,
                            searchQuery: r,
                            activeItemIndex: o,
                            activationTrigger: 1
                        }
                    },
                    4: e => "" === e.searchQuery ? e : { ...e,
                        searchQuery: "",
                        searchActiveItemIndex: null
                    },
                    5: (e, t) => {
                        let n = B(e, e => [...e, {
                            id: t.id,
                            dataRef: t.dataRef
                        }]);
                        return { ...e,
                            ...n
                        }
                    },
                    6: (e, t) => {
                        let n = B(e, e => {
                            let n = e.findIndex(e => e.id === t.id);
                            return -1 !== n && e.splice(n, 1), e
                        });
                        return { ...e,
                            ...n,
                            activationTrigger: 1
                        }
                    }
                },
                $ = (0, f.createContext)(null);

            function G(e) {
                let t = (0, f.useContext)($);
                if (null === t) {
                    let t = Error(`<${e} /> is missing a parent <Menu /> component.`);
                    throw Error.captureStackTrace && Error.captureStackTrace(t, G), t
                }
                return t
            }

            function K(e, t) {
                return (0, v.E)(t.type, W, e, t)
            }
            $.displayName = "MenuContext";
            let J = f.Fragment,
                Q = p.AN.RenderStrategy | p.AN.Static,
                Y = f.Fragment,
                X = Object.assign((0, p.yV)(function(e, t) {
                    let {
                        __demoMode: n = !1,
                        ...r
                    } = e, i = (0, f.useReducer)(K, {
                        __demoMode: n,
                        menuState: n ? 0 : 1,
                        buttonRef: (0, f.createRef)(),
                        itemsRef: (0, f.createRef)(),
                        items: [],
                        searchQuery: "",
                        activeItemIndex: null,
                        activationTrigger: 1
                    }), [{
                        menuState: o,
                        itemsRef: u,
                        buttonRef: a
                    }, l] = i, s = (0, y.T)(t);
                    ! function(e, t, n = !0) {
                        var r, i;
                        let o, u = (0, f.useRef)(!1);

                        function a(n, r) {
                            if (!u.current || n.defaultPrevented) return;
                            let i = r(n);
                            if (null !== i && i.getRootNode().contains(i)) {
                                for (let t of function e(t) {
                                        return "function" == typeof t ? e(t()) : Array.isArray(t) || t instanceof Set ? t : [t]
                                    }(e)) {
                                    if (null === t) continue;
                                    let e = t instanceof HTMLElement ? t : t.current;
                                    if (null != e && e.contains(i) || n.composed && n.composedPath().includes(e)) return
                                }
                                return M(i, _.Loose) || -1 === i.tabIndex || n.preventDefault(), t(n, i)
                            }
                        }(0, f.useEffect)(() => {
                            requestAnimationFrame(() => {
                                u.current = n
                            })
                        }, [n]);
                        let l = (0, f.useRef)(null);
                        N("mousedown", e => {
                            var t, n;
                            u.current && (l.current = (null == (n = null == (t = e.composedPath) ? void 0 : t.call(e)) ? void 0 : n[0]) || e.target)
                        }, !0), N("click", e => {
                            l.current && (a(e, () => l.current), l.current = null)
                        }, !0), r = "blur", i = e => a(e, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), o = (0, F.E)(i), (0, f.useEffect)(() => {
                            function e(e) {
                                o.current(e)
                            }
                            return window.addEventListener(r, e, !0), () => window.removeEventListener(r, e, !0)
                        }, [r, !0])
                    }([a, u], (e, t) => {
                        var n;
                        l({
                            type: 1
                        }), M(t, _.Loose) || (e.preventDefault(), null == (n = a.current) || n.focus())
                    }, 0 === o);
                    let c = (0, j.z)(() => {
                            l({
                                type: 1
                            })
                        }),
                        d = (0, f.useMemo)(() => ({
                            open: 0 === o,
                            close: c
                        }), [o, c]);
                    return f.createElement($.Provider, {
                        value: i
                    }, f.createElement(P.up, {
                        value: (0, v.E)(o, {
                            0: P.ZM.Open,
                            1: P.ZM.Closed
                        })
                    }, (0, p.sY)({
                        ourProps: {
                            ref: s
                        },
                        theirProps: r,
                        slot: d,
                        defaultTag: J,
                        name: "Menu"
                    })))
                }), {
                    Button: (0, p.yV)(function(e, t) {
                        var n;
                        let r = (0, E.M)(),
                            {
                                id: i = `headlessui-menu-button-${r}`,
                                ...o
                            } = e,
                            [u, a] = G("Menu.Button"),
                            l = (0, y.T)(u.buttonRef, t),
                            s = (0, h.G)(),
                            c = (0, j.z)(e => {
                                switch (e.key) {
                                    case b.R.Space:
                                    case b.R.Enter:
                                    case b.R.ArrowDown:
                                        e.preventDefault(), e.stopPropagation(), a({
                                            type: 0
                                        }), s.nextFrame(() => a({
                                            type: 2,
                                            focus: w.First
                                        }));
                                        break;
                                    case b.R.ArrowUp:
                                        e.preventDefault(), e.stopPropagation(), a({
                                            type: 0
                                        }), s.nextFrame(() => a({
                                            type: 2,
                                            focus: w.Last
                                        }))
                                }
                            }),
                            d = (0, j.z)(e => {
                                e.key === b.R.Space && e.preventDefault()
                            }),
                            v = (0, j.z)(t => {
                                if ((0, S.P)(t.currentTarget)) return t.preventDefault();
                                e.disabled || (0 === u.menuState ? (a({
                                    type: 1
                                }), s.nextFrame(() => {
                                    var e;
                                    return null == (e = u.buttonRef.current) ? void 0 : e.focus({
                                        preventScroll: !0
                                    })
                                })) : (t.preventDefault(), a({
                                    type: 0
                                })))
                            }),
                            m = (0, f.useMemo)(() => ({
                                open: 0 === u.menuState
                            }), [u]),
                            g = {
                                ref: l,
                                id: i,
                                type: (0, D.f)(e, u.buttonRef),
                                "aria-haspopup": "menu",
                                "aria-controls": null == (n = u.itemsRef.current) ? void 0 : n.id,
                                "aria-expanded": e.disabled ? void 0 : 0 === u.menuState,
                                onKeyDown: c,
                                onKeyUp: d,
                                onClick: v
                            };
                        return (0, p.sY)({
                            ourProps: g,
                            theirProps: o,
                            slot: m,
                            defaultTag: "button",
                            name: "Menu.Button"
                        })
                    }),
                    Items: (0, p.yV)(function(e, t) {
                        var n, r;
                        let i = (0, E.M)(),
                            {
                                id: o = `headlessui-menu-items-${i}`,
                                ...u
                            } = e,
                            [a, l] = G("Menu.Items"),
                            s = (0, y.T)(a.itemsRef, t),
                            c = function(...e) {
                                return (0, f.useMemo)(() => (0, R.r)(...e), [...e])
                            }(a.itemsRef),
                            d = (0, h.G)(),
                            v = (0, P.oJ)(),
                            S = null !== v ? (v & P.ZM.Open) === P.ZM.Open : 0 === a.menuState;
                        (0, f.useEffect)(() => {
                            let e = a.itemsRef.current;
                            e && 0 === a.menuState && e !== (null == c ? void 0 : c.activeElement) && e.focus({
                                preventScroll: !0
                            })
                        }, [a.menuState, a.itemsRef, c]),
                        function({
                            container: e,
                            accept: t,
                            walk: n,
                            enabled: r = !0
                        }) {
                            let i = (0, f.useRef)(t),
                                o = (0, f.useRef)(n);
                            (0, f.useEffect)(() => {
                                i.current = t, o.current = n
                            }, [t, n]), (0, g.e)(() => {
                                if (!e || !r) return;
                                let t = (0, R.r)(e);
                                if (!t) return;
                                let n = i.current,
                                    u = o.current,
                                    a = Object.assign(e => n(e), {
                                        acceptNode: n
                                    }),
                                    l = t.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, a, !1);
                                for (; l.nextNode();) u(l.currentNode)
                            }, [e, r, i, o])
                        }({
                            container: a.itemsRef.current,
                            enabled: 0 === a.menuState,
                            accept: e => "menuitem" === e.getAttribute("role") ? NodeFilter.FILTER_REJECT : e.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT,
                            walk(e) {
                                e.setAttribute("role", "none")
                            }
                        });
                        let x = (0, j.z)(e => {
                                var t, n;
                                switch (d.dispose(), e.key) {
                                    case b.R.Space:
                                        if ("" !== a.searchQuery) return e.preventDefault(), e.stopPropagation(), l({
                                            type: 3,
                                            value: e.key
                                        });
                                    case b.R.Enter:
                                        if (e.preventDefault(), e.stopPropagation(), l({
                                                type: 1
                                            }), null !== a.activeItemIndex) {
                                            let {
                                                dataRef: e
                                            } = a.items[a.activeItemIndex];
                                            null == (n = null == (t = e.current) ? void 0 : t.domRef.current) || n.click()
                                        }
                                        k(a.buttonRef.current);
                                        break;
                                    case b.R.ArrowDown:
                                        return e.preventDefault(), e.stopPropagation(), l({
                                            type: 2,
                                            focus: w.Next
                                        });
                                    case b.R.ArrowUp:
                                        return e.preventDefault(), e.stopPropagation(), l({
                                            type: 2,
                                            focus: w.Previous
                                        });
                                    case b.R.Home:
                                    case b.R.PageUp:
                                        return e.preventDefault(), e.stopPropagation(), l({
                                            type: 2,
                                            focus: w.First
                                        });
                                    case b.R.End:
                                    case b.R.PageDown:
                                        return e.preventDefault(), e.stopPropagation(), l({
                                            type: 2,
                                            focus: w.Last
                                        });
                                    case b.R.Escape:
                                        e.preventDefault(), e.stopPropagation(), l({
                                            type: 1
                                        }), (0, m.k)().nextFrame(() => {
                                            var e;
                                            return null == (e = a.buttonRef.current) ? void 0 : e.focus({
                                                preventScroll: !0
                                            })
                                        });
                                        break;
                                    case b.R.Tab:
                                        e.preventDefault(), e.stopPropagation(), l({
                                            type: 1
                                        }), (0, m.k)().nextFrame(() => {
                                            var t, n;
                                            t = a.buttonRef.current, n = e.shiftKey ? T.Previous : T.Next,
                                                function(e, t, {
                                                    sorted: n = !0,
                                                    relativeTo: r = null,
                                                    skipElements: i = []
                                                } = {}) {
                                                    var o, u, a;
                                                    let l = Array.isArray(e) ? e.length > 0 ? e[0].ownerDocument : document : e.ownerDocument,
                                                        s = Array.isArray(e) ? n ? C(e) : e : O(e);
                                                    i.length > 0 && s.length > 1 && (s = s.filter(e => !i.includes(e))), r = null != r ? r : l.activeElement;
                                                    let c = (() => {
                                                            if (5 & t) return 1;
                                                            if (10 & t) return -1;
                                                            throw Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")
                                                        })(),
                                                        d = (() => {
                                                            if (1 & t) return 0;
                                                            if (2 & t) return Math.max(0, s.indexOf(r)) - 1;
                                                            if (4 & t) return Math.max(0, s.indexOf(r)) + 1;
                                                            if (8 & t) return s.length - 1;
                                                            throw Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")
                                                        })(),
                                                        f = 32 & t ? {
                                                            preventScroll: !0
                                                        } : {},
                                                        v = 0,
                                                        p = s.length,
                                                        m;
                                                    do {
                                                        if (v >= p || v + p <= 0) return 0;
                                                        let e = d + v;
                                                        if (16 & t) e = (e + p) % p;
                                                        else {
                                                            if (e < 0) return 3;
                                                            if (e >= p) return 1
                                                        }
                                                        null == (m = s[e]) || m.focus(f), v += c
                                                    } while (m !== l.activeElement);
                                                    6 & t && null != (a = null == (u = null == (o = m) ? void 0 : o.matches) ? void 0 : u.call(o, "textarea,input")) && a && m.select()
                                                }(O(), n, {
                                                    relativeTo: t
                                                })
                                        });
                                        break;
                                    default:
                                        1 === e.key.length && (l({
                                            type: 3,
                                            value: e.key
                                        }), d.setTimeout(() => l({
                                            type: 4
                                        }), 350))
                                }
                            }),
                            L = (0, j.z)(e => {
                                e.key === b.R.Space && e.preventDefault()
                            }),
                            I = (0, f.useMemo)(() => ({
                                open: 0 === a.menuState
                            }), [a]),
                            _ = {
                                "aria-activedescendant": null === a.activeItemIndex || null == (n = a.items[a.activeItemIndex]) ? void 0 : n.id,
                                "aria-labelledby": null == (r = a.buttonRef.current) ? void 0 : r.id,
                                id: o,
                                onKeyDown: x,
                                onKeyUp: L,
                                role: "menu",
                                tabIndex: 0,
                                ref: s
                            };
                        return (0, p.sY)({
                            ourProps: _,
                            theirProps: u,
                            slot: I,
                            defaultTag: "div",
                            features: Q,
                            visible: S,
                            name: "Menu.Items"
                        })
                    }),
                    Item: (0, p.yV)(function(e, t) {
                        let n, r, i, o = (0, E.M)(),
                            {
                                id: u = `headlessui-menu-item-${o}`,
                                disabled: a = !1,
                                ...l
                            } = e,
                            [s, c] = G("Menu.Item"),
                            d = null !== s.activeItemIndex && s.items[s.activeItemIndex].id === u,
                            v = (0, f.useRef)(null),
                            h = (0, y.T)(t, v);
                        (0, g.e)(() => {
                            if (s.__demoMode || 0 !== s.menuState || !d || 0 === s.activationTrigger) return;
                            let e = (0, m.k)();
                            return e.requestAnimationFrame(() => {
                                var e, t;
                                null == (t = null == (e = v.current) ? void 0 : e.scrollIntoView) || t.call(e, {
                                    block: "nearest"
                                })
                            }), e.dispose
                        }, [s.__demoMode, v, d, s.menuState, s.activationTrigger, s.activeItemIndex]);
                        let b = (n = (0, f.useRef)(""), r = (0, f.useRef)(""), (0, j.z)(() => {
                                let e = v.current;
                                if (!e) return "";
                                let t = e.innerText;
                                if (n.current === t) return r.current;
                                let i = (function(e) {
                                    let t = e.getAttribute("aria-label");
                                    if ("string" == typeof t) return t.trim();
                                    let n = e.getAttribute("aria-labelledby");
                                    if (n) {
                                        let e = n.split(" ").map(e => {
                                            let t = document.getElementById(e);
                                            if (t) {
                                                let e = t.getAttribute("aria-label");
                                                return "string" == typeof e ? e.trim() : z(t).trim()
                                            }
                                            return null
                                        }).filter(Boolean);
                                        if (e.length > 0) return e.join(", ")
                                    }
                                    return z(e).trim()
                                })(e).trim().toLowerCase();
                                return n.current = t, r.current = i, i
                            })),
                            S = (0, f.useRef)({
                                disabled: a,
                                domRef: v,
                                get textValue() {
                                    return b()
                                }
                            });
                        (0, g.e)(() => {
                            S.current.disabled = a
                        }, [S, a]), (0, g.e)(() => (c({
                            type: 5,
                            id: u,
                            dataRef: S
                        }), () => c({
                            type: 6,
                            id: u
                        })), [S, u]);
                        let R = (0, j.z)(() => {
                                c({
                                    type: 1
                                })
                            }),
                            x = (0, j.z)(e => {
                                if (a) return e.preventDefault();
                                c({
                                    type: 1
                                }), k(s.buttonRef.current)
                            }),
                            T = (0, j.z)(() => {
                                if (a) return c({
                                    type: 2,
                                    focus: w.Nothing
                                });
                                c({
                                    type: 2,
                                    focus: w.Specific,
                                    id: u
                                })
                            }),
                            L = (i = (0, f.useRef)([-1, -1]), {
                                wasMoved(e) {
                                    let t = V(e);
                                    return (i.current[0] !== t[0] || i.current[1] !== t[1]) && (i.current = t, !0)
                                },
                                update(e) {
                                    i.current = V(e)
                                }
                            }),
                            I = (0, j.z)(e => L.update(e)),
                            O = (0, j.z)(e => {
                                L.wasMoved(e) && (a || d || c({
                                    type: 2,
                                    focus: w.Specific,
                                    id: u,
                                    trigger: 0
                                }))
                            }),
                            _ = (0, j.z)(e => {
                                L.wasMoved(e) && (a || d && c({
                                    type: 2,
                                    focus: w.Nothing
                                }))
                            }),
                            M = (0, f.useMemo)(() => ({
                                active: d,
                                disabled: a,
                                close: R
                            }), [d, a, R]);
                        return (0, p.sY)({
                            ourProps: {
                                id: u,
                                ref: h,
                                role: "menuitem",
                                tabIndex: !0 === a ? void 0 : -1,
                                "aria-disabled": !0 === a || void 0,
                                disabled: void 0,
                                onClick: x,
                                onFocus: T,
                                onPointerEnter: I,
                                onMouseEnter: I,
                                onPointerMove: O,
                                onMouseMove: O,
                                onPointerLeave: _,
                                onMouseLeave: _
                            },
                            theirProps: l,
                            slot: M,
                            defaultTag: Y,
                            name: "Menu.Item"
                        })
                    })
                })
        },
        5429: function(e, t, n) {
            "use strict";
            n.d(t, {
                u: function() {
                    return A
                }
            });
            var r, i = n(4132),
                o = n(6542),
                u = n(3561),
                a = n(7467),
                l = n(6488);

            function s() {
                let e = (0, i.useRef)(!1);
                return (0, l.e)(() => (e.current = !0, () => {
                    e.current = !1
                }), []), e
            }
            var c = n(4523),
                d = n(480),
                f = n(6394),
                v = n(2132);

            function p(e, ...t) {
                e && t.length > 0 && e.classList.add(...t)
            }

            function m(e, ...t) {
                e && t.length > 0 && e.classList.remove(...t)
            }
            var h = n(4245),
                g = n(664),
                y = n(5828);

            function E(e = "") {
                return e.split(" ").filter(e => e.trim().length > 1)
            }
            let b = (0, i.createContext)(null);
            b.displayName = "TransitionContext";
            var w = ((r = w || {}).Visible = "visible", r.Hidden = "hidden", r);
            let S = (0, i.createContext)(null);

            function R(e) {
                return "children" in e ? R(e.children) : e.current.filter(({
                    el: e
                }) => null !== e.current).filter(({
                    state: e
                }) => "visible" === e).length > 0
            }

            function x(e, t) {
                let n = (0, c.E)(e),
                    r = (0, i.useRef)([]),
                    u = s(),
                    l = (0, h.G)(),
                    d = (0, g.z)((e, t = o.l4.Hidden) => {
                        let i = r.current.findIndex(({
                            el: t
                        }) => t === e); - 1 !== i && ((0, a.E)(t, {
                            [o.l4.Unmount]() {
                                r.current.splice(i, 1)
                            },
                            [o.l4.Hidden]() {
                                r.current[i].state = "hidden"
                            }
                        }), l.microTask(() => {
                            var e;
                            !R(r) && u.current && (null == (e = n.current) || e.call(n))
                        }))
                    }),
                    f = (0, g.z)(e => {
                        let t = r.current.find(({
                            el: t
                        }) => t === e);
                        return t ? "visible" !== t.state && (t.state = "visible") : r.current.push({
                            el: e,
                            state: "visible"
                        }), () => d(e, o.l4.Unmount)
                    }),
                    v = (0, i.useRef)([]),
                    p = (0, i.useRef)(Promise.resolve()),
                    m = (0, i.useRef)({
                        enter: [],
                        leave: [],
                        idle: []
                    }),
                    y = (0, g.z)((e, n, r) => {
                        v.current.splice(0), t && (t.chains.current[n] = t.chains.current[n].filter(([t]) => t !== e)), null == t || t.chains.current[n].push([e, new Promise(e => {
                            v.current.push(e)
                        })]), null == t || t.chains.current[n].push([e, new Promise(e => {
                            Promise.all(m.current[n].map(([e, t]) => t)).then(() => e())
                        })]), "enter" === n ? p.current = p.current.then(() => null == t ? void 0 : t.wait.current).then(() => r(n)) : r(n)
                    }),
                    E = (0, g.z)((e, t, n) => {
                        Promise.all(m.current[t].splice(0).map(([e, t]) => t)).then(() => {
                            var e;
                            null == (e = v.current.shift()) || e()
                        }).then(() => n(t))
                    });
                return (0, i.useMemo)(() => ({
                    children: r,
                    register: f,
                    unregister: d,
                    onStart: y,
                    onStop: E,
                    wait: p,
                    chains: m
                }), [f, d, r, y, E, m, p])
            }

            function T() {}
            S.displayName = "NestingContext";
            let L = ["beforeEnter", "afterEnter", "beforeLeave", "afterLeave"];

            function I(e) {
                var t;
                let n = {};
                for (let r of L) n[r] = null != (t = e[r]) ? t : T;
                return n
            }
            let O = o.AN.RenderStrategy,
                _ = (0, o.yV)(function(e, t) {
                    let {
                        show: n,
                        appear: r = !1,
                        unmount: a,
                        ...s
                    } = e, c = (0, i.useRef)(null), v = (0, f.T)(c, t);
                    (0, d.H)();
                    let p = (0, u.oJ)();
                    if (void 0 === n && null !== p && (n = (p & u.ZM.Open) === u.ZM.Open), ![!0, !1].includes(n)) throw Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
                    let [m, h] = (0, i.useState)(n ? "visible" : "hidden"), y = x(() => {
                        h("hidden")
                    }), [E, w] = (0, i.useState)(!0), T = (0, i.useRef)([n]);
                    (0, l.e)(() => {
                        !1 !== E && T.current[T.current.length - 1] !== n && (T.current.push(n), w(!1))
                    }, [T, n]);
                    let L = (0, i.useMemo)(() => ({
                        show: n,
                        appear: r,
                        initial: E
                    }), [n, r, E]);
                    (0, i.useEffect)(() => {
                        if (n) h("visible");
                        else if (R(y)) {
                            let e = c.current;
                            if (!e) return;
                            let t = e.getBoundingClientRect();
                            0 === t.x && 0 === t.y && 0 === t.width && 0 === t.height && h("hidden")
                        } else h("hidden")
                    }, [n, y]);
                    let I = {
                            unmount: a
                        },
                        _ = (0, g.z)(() => {
                            var t;
                            E && w(!1), null == (t = e.beforeEnter) || t.call(e)
                        }),
                        k = (0, g.z)(() => {
                            var t;
                            E && w(!1), null == (t = e.beforeLeave) || t.call(e)
                        });
                    return i.createElement(S.Provider, {
                        value: y
                    }, i.createElement(b.Provider, {
                        value: L
                    }, (0, o.sY)({
                        ourProps: { ...I,
                            as: i.Fragment,
                            children: i.createElement(M, {
                                ref: v,
                                ...I,
                                ...s,
                                beforeEnter: _,
                                beforeLeave: k
                            })
                        },
                        theirProps: {},
                        defaultTag: i.Fragment,
                        features: O,
                        visible: "visible" === m,
                        name: "Transition"
                    })))
                }),
                M = (0, o.yV)(function(e, t) {
                    var n;
                    let r, {
                            beforeEnter: w,
                            afterEnter: T,
                            beforeLeave: L,
                            afterLeave: _,
                            enter: M,
                            enterFrom: k,
                            enterTo: A,
                            entered: C,
                            leave: F,
                            leaveFrom: N,
                            leaveTo: P,
                            ...D
                        } = e,
                        j = (0, i.useRef)(null),
                        V = (0, f.T)(j, t),
                        H = D.unmount ? o.l4.Unmount : o.l4.Hidden,
                        {
                            show: z,
                            appear: q,
                            initial: U
                        } = function() {
                            let e = (0, i.useContext)(b);
                            if (null === e) throw Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
                            return e
                        }(),
                        [Z, B] = (0, i.useState)(z ? "visible" : "hidden"),
                        W = function() {
                            let e = (0, i.useContext)(S);
                            if (null === e) throw Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
                            return e
                        }(),
                        {
                            register: $,
                            unregister: G
                        } = W,
                        K = (0, i.useRef)(null);
                    (0, i.useEffect)(() => $(j), [$, j]), (0, i.useEffect)(() => {
                        if (H === o.l4.Hidden && j.current) {
                            if (z && "visible" !== Z) {
                                B("visible");
                                return
                            }
                            return (0, a.E)(Z, {
                                hidden: () => G(j),
                                visible: () => $(j)
                            })
                        }
                    }, [Z, j, $, G, z, H]);
                    let J = (0, c.E)({
                            enter: E(M),
                            enterFrom: E(k),
                            enterTo: E(A),
                            entered: E(C),
                            leave: E(F),
                            leaveFrom: E(N),
                            leaveTo: E(P)
                        }),
                        Q = (n = {
                            beforeEnter: w,
                            afterEnter: T,
                            beforeLeave: L,
                            afterLeave: _
                        }, r = (0, i.useRef)(I(n)), (0, i.useEffect)(() => {
                            r.current = I(n)
                        }, [n]), r),
                        Y = (0, d.H)();
                    (0, i.useEffect)(() => {
                        if (Y && "visible" === Z && null === j.current) throw Error("Did you forget to passthrough the `ref` to the actual DOM node?")
                    }, [j, Z, Y]);
                    let X = U && !q,
                        ee = !Y || X || K.current === z ? "idle" : z ? "enter" : "leave",
                        et = function(e = 0) {
                            let [t, n] = (0, i.useState)(e), r = s(), o = (0, i.useCallback)(e => {
                                r.current && n(t => t | e)
                            }, [t, r]), u = (0, i.useCallback)(e => !!(t & e), [t]);
                            return {
                                flags: t,
                                addFlag: o,
                                hasFlag: u,
                                removeFlag: (0, i.useCallback)(e => {
                                    r.current && n(t => t & ~e)
                                }, [n, r]),
                                toggleFlag: (0, i.useCallback)(e => {
                                    r.current && n(t => t ^ e)
                                }, [n])
                            }
                        }(0),
                        en = (0, g.z)(e => (0, a.E)(e, {
                            enter: () => {
                                et.addFlag(u.ZM.Opening), Q.current.beforeEnter()
                            },
                            leave: () => {
                                et.addFlag(u.ZM.Closing), Q.current.beforeLeave()
                            },
                            idle: () => {}
                        })),
                        er = (0, g.z)(e => (0, a.E)(e, {
                            enter: () => {
                                et.removeFlag(u.ZM.Opening), Q.current.afterEnter()
                            },
                            leave: () => {
                                et.removeFlag(u.ZM.Closing), Q.current.afterLeave()
                            },
                            idle: () => {}
                        })),
                        ei = x(() => {
                            B("hidden"), G(j)
                        }, W);
                    (function({
                        container: e,
                        direction: t,
                        classes: n,
                        onStart: r,
                        onStop: i
                    }) {
                        let o = s(),
                            u = (0, h.G)(),
                            d = (0, c.E)(t);
                        (0, l.e)(() => {
                            let t = (0, v.k)();
                            u.add(t.dispose);
                            let l = e.current;
                            if (l && "idle" !== d.current && o.current) {
                                var s, c, f, h;
                                let e, o, u, g, y, E, b;
                                return t.dispose(), r.current(d.current), t.add((s = l, c = n.current, f = "enter" === d.current, h = () => {
                                    t.dispose(), i.current(d.current)
                                }, o = f ? "enter" : "leave", u = (0, v.k)(), g = void 0 !== h ? (e = {
                                    called: !1
                                }, (...t) => {
                                    if (!e.called) return e.called = !0, h(...t)
                                }) : () => {}, "enter" === o && (s.removeAttribute("hidden"), s.style.display = ""), y = (0, a.E)(o, {
                                    enter: () => c.enter,
                                    leave: () => c.leave
                                }), E = (0, a.E)(o, {
                                    enter: () => c.enterTo,
                                    leave: () => c.leaveTo
                                }), b = (0, a.E)(o, {
                                    enter: () => c.enterFrom,
                                    leave: () => c.leaveFrom
                                }), m(s, ...c.enter, ...c.enterTo, ...c.enterFrom, ...c.leave, ...c.leaveFrom, ...c.leaveTo, ...c.entered), p(s, ...y, ...b), u.nextFrame(() => {
                                    m(s, ...b), p(s, ...E),
                                        function(e, t) {
                                            let n = (0, v.k)();
                                            if (!e) return n.dispose;
                                            let {
                                                transitionDuration: r,
                                                transitionDelay: i
                                            } = getComputedStyle(e), [o, u] = [r, i].map(e => {
                                                let [t = 0] = e.split(",").filter(Boolean).map(e => e.includes("ms") ? parseFloat(e) : 1e3 * parseFloat(e)).sort((e, t) => t - e);
                                                return t
                                            }), a = o + u;
                                            if (0 !== a) {
                                                n.group(n => {
                                                    n.setTimeout(() => {
                                                        t(), n.dispose()
                                                    }, a), n.addEventListener(e, "transitionrun", e => {
                                                        e.target === e.currentTarget && n.dispose()
                                                    })
                                                });
                                                let r = n.addEventListener(e, "transitionend", e => {
                                                    e.target === e.currentTarget && (t(), r())
                                                })
                                            } else t();
                                            n.add(() => t()), n.dispose
                                        }(s, () => (m(s, ...y), p(s, ...c.entered), g()))
                                }), u.dispose)), t.dispose
                            }
                        }, [t])
                    })({
                        container: j,
                        classes: J,
                        direction: ee,
                        onStart: (0, c.E)(e => {
                            ei.onStart(j, e, en)
                        }),
                        onStop: (0, c.E)(e => {
                            ei.onStop(j, e, er), "leave" !== e || R(ei) || (B("hidden"), G(j))
                        })
                    }), (0, i.useEffect)(() => {
                        X && (H === o.l4.Hidden ? K.current = null : K.current = z)
                    }, [z, X, Z]);
                    let eo = D;
                    return q && z && U && (eo = { ...eo,
                        className: (0, y.A)(D.className, ...J.current.enter, ...J.current.enterFrom)
                    }), i.createElement(S.Provider, {
                        value: ei
                    }, i.createElement(u.up, {
                        value: (0, a.E)(Z, {
                            visible: u.ZM.Open,
                            hidden: u.ZM.Closed
                        }) | et.flags
                    }, (0, o.sY)({
                        ourProps: {
                            ref: V
                        },
                        theirProps: eo,
                        defaultTag: "div",
                        features: O,
                        visible: "visible" === Z,
                        name: "Transition.Child"
                    })))
                }),
                k = (0, o.yV)(function(e, t) {
                    let n = null !== (0, i.useContext)(b),
                        r = null !== (0, u.oJ)();
                    return i.createElement(i.Fragment, null, !n && r ? i.createElement(_, {
                        ref: t,
                        ...e
                    }) : i.createElement(M, {
                        ref: t,
                        ...e
                    }))
                }),
                A = Object.assign(_, {
                    Child: k,
                    Root: _
                })
        },
        4245: function(e, t, n) {
            "use strict";
            n.d(t, {
                G: function() {
                    return o
                }
            });
            var r = n(4132),
                i = n(2132);

            function o() {
                let [e] = (0, r.useState)(i.k);
                return (0, r.useEffect)(() => () => e.dispose(), [e]), e
            }
        },
        664: function(e, t, n) {
            "use strict";
            n.d(t, {
                z: function() {
                    return o
                }
            });
            var r = n(4132),
                i = n(4523);
            let o = function(e) {
                let t = (0, i.E)(e);
                return r.useCallback((...e) => t.current(...e), [t])
            }
        },
        5849: function(e, t, n) {
            "use strict";
            n.d(t, {
                M: function() {
                    return l
                }
            });
            var r, i = n(4132),
                o = n(6488),
                u = n(480),
                a = n(6715);
            let l = null != (r = i.useId) ? r : function() {
                let e = (0, u.H)(),
                    [t, n] = i.useState(e ? () => a.O.nextId() : null);
                return (0, o.e)(() => {
                    null === t && n(a.O.nextId())
                }, [t]), null != t ? "" + t : void 0
            }
        },
        6488: function(e, t, n) {
            "use strict";
            n.d(t, {
                e: function() {
                    return o
                }
            });
            var r = n(4132),
                i = n(6715);
            let o = (e, t) => {
                i.O.isServer ? (0, r.useEffect)(e, t) : (0, r.useLayoutEffect)(e, t)
            }
        },
        4523: function(e, t, n) {
            "use strict";
            n.d(t, {
                E: function() {
                    return o
                }
            });
            var r = n(4132),
                i = n(6488);

            function o(e) {
                let t = (0, r.useRef)(e);
                return (0, i.e)(() => {
                    t.current = e
                }, [e]), t
            }
        },
        1501: function(e, t, n) {
            "use strict";
            n.d(t, {
                f: function() {
                    return u
                }
            });
            var r = n(4132),
                i = n(6488);

            function o(e) {
                var t;
                if (e.type) return e.type;
                let n = null != (t = e.as) ? t : "button";
                if ("string" == typeof n && "button" === n.toLowerCase()) return "button"
            }

            function u(e, t) {
                let [n, u] = (0, r.useState)(() => o(e));
                return (0, i.e)(() => {
                    u(o(e))
                }, [e.type, e.as]), (0, i.e)(() => {
                    n || t.current && t.current instanceof HTMLButtonElement && !t.current.hasAttribute("type") && u("button")
                }, [n, t]), n
            }
        },
        480: function(e, t, n) {
            "use strict";
            n.d(t, {
                H: function() {
                    return o
                }
            });
            var r = n(4132),
                i = n(6715);

            function o() {
                let [e, t] = (0, r.useState)(i.O.isHandoffComplete);
                return e && !1 === i.O.isHandoffComplete && t(!1), (0, r.useEffect)(() => {
                    !0 !== e && t(!0)
                }, [e]), (0, r.useEffect)(() => i.O.handoff(), []), e
            }
        },
        6394: function(e, t, n) {
            "use strict";
            n.d(t, {
                T: function() {
                    return a
                },
                h: function() {
                    return u
                }
            });
            var r = n(4132),
                i = n(664);
            let o = Symbol();

            function u(e, t = !0) {
                return Object.assign(e, {
                    [o]: t
                })
            }

            function a(...e) {
                let t = (0, r.useRef)(e);
                (0, r.useEffect)(() => {
                    t.current = e
                }, [e]);
                let n = (0, i.z)(e => {
                    for (let n of t.current) null != n && ("function" == typeof n ? n(e) : n.current = e)
                });
                return e.every(e => null == e || (null == e ? void 0 : e[o])) ? void 0 : n
            }
        },
        3561: function(e, t, n) {
            "use strict";
            n.d(t, {
                ZM: function() {
                    return u
                },
                oJ: function() {
                    return a
                },
                up: function() {
                    return l
                }
            });
            var r, i = n(4132);
            let o = (0, i.createContext)(null);
            o.displayName = "OpenClosedContext";
            var u = ((r = u || {})[r.Open = 1] = "Open", r[r.Closed = 2] = "Closed", r[r.Closing = 4] = "Closing", r[r.Opening = 8] = "Opening", r);

            function a() {
                return (0, i.useContext)(o)
            }

            function l({
                value: e,
                children: t
            }) {
                return i.createElement(o.Provider, {
                    value: e
                }, t)
            }
        },
        6698: function(e, t, n) {
            "use strict";

            function r(e) {
                let t = e.parentElement,
                    n = null;
                for (; t && !(t instanceof HTMLFieldSetElement);) t instanceof HTMLLegendElement && (n = t), t = t.parentElement;
                let r = (null == t ? void 0 : t.getAttribute("disabled")) === "";
                return !(r && function(e) {
                    if (!e) return !1;
                    let t = e.previousElementSibling;
                    for (; null !== t;) {
                        if (t instanceof HTMLLegendElement) return !1;
                        t = t.previousElementSibling
                    }
                    return !0
                }(n)) && r
            }
            n.d(t, {
                P: function() {
                    return r
                }
            })
        },
        5828: function(e, t, n) {
            "use strict";

            function r(...e) {
                return e.filter(Boolean).join(" ")
            }
            n.d(t, {
                A: function() {
                    return r
                }
            })
        },
        2132: function(e, t, n) {
            "use strict";
            n.d(t, {
                k: function() {
                    return function e() {
                        let t = [],
                            n = {
                                addEventListener: (e, t, r, i) => (e.addEventListener(t, r, i), n.add(() => e.removeEventListener(t, r, i))),
                                requestAnimationFrame(...e) {
                                    let t = requestAnimationFrame(...e);
                                    return n.add(() => cancelAnimationFrame(t))
                                },
                                nextFrame: (...e) => n.requestAnimationFrame(() => n.requestAnimationFrame(...e)),
                                setTimeout(...e) {
                                    let t = setTimeout(...e);
                                    return n.add(() => clearTimeout(t))
                                },
                                microTask(...e) {
                                    var t;
                                    let r = {
                                        current: !0
                                    };
                                    return t = () => {
                                        r.current && e[0]()
                                    }, "function" == typeof queueMicrotask ? queueMicrotask(t) : Promise.resolve().then(t).catch(e => setTimeout(() => {
                                        throw e
                                    })), n.add(() => {
                                        r.current = !1
                                    })
                                },
                                style(e, t, n) {
                                    let r = e.style.getPropertyValue(t);
                                    return Object.assign(e.style, {
                                        [t]: n
                                    }), this.add(() => {
                                        Object.assign(e.style, {
                                            [t]: r
                                        })
                                    })
                                },
                                group(t) {
                                    let n = e();
                                    return t(n), this.add(() => n.dispose())
                                },
                                add: e => (t.push(e), () => {
                                    let n = t.indexOf(e);
                                    if (n >= 0)
                                        for (let e of t.splice(n, 1)) e()
                                }),
                                dispose() {
                                    for (let e of t.splice(0)) e()
                                }
                            };
                        return n
                    }
                }
            })
        },
        6715: function(e, t, n) {
            "use strict";
            n.d(t, {
                O: function() {
                    return u
                }
            });
            var r = Object.defineProperty,
                i = (e, t, n) => t in e ? r(e, t, {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: n
                }) : e[t] = n,
                o = (e, t, n) => (i(e, "symbol" != typeof t ? t + "" : t, n), n);
            let u = new class {
                constructor() {
                    o(this, "current", this.detect()), o(this, "handoffState", "pending"), o(this, "currentId", 0)
                }
                set(e) {
                    this.current !== e && (this.handoffState = "pending", this.currentId = 0, this.current = e)
                }
                reset() {
                    this.set(this.detect())
                }
                nextId() {
                    return ++this.currentId
                }
                get isServer() {
                    return "server" === this.current
                }
                get isClient() {
                    return "client" === this.current
                }
                detect() {
                    return "undefined" == typeof window || "undefined" == typeof document ? "server" : "client"
                }
                handoff() {
                    "pending" === this.handoffState && (this.handoffState = "complete")
                }
                get isHandoffComplete() {
                    return "complete" === this.handoffState
                }
            }
        },
        7467: function(e, t, n) {
            "use strict";

            function r(e, t, ...n) {
                if (e in t) {
                    let r = t[e];
                    return "function" == typeof r ? r(...n) : r
                }
                let i = Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map(e=>`"${e}"`).join(", ")}.`);
                throw Error.captureStackTrace && Error.captureStackTrace(i, r), i
            }
            n.d(t, {
                E: function() {
                    return r
                }
            })
        },
        4001: function(e, t, n) {
            "use strict";
            n.d(t, {
                r: function() {
                    return i
                }
            });
            var r = n(6715);

            function i(e) {
                return r.O.isServer ? null : e instanceof Node ? e.ownerDocument : null != e && e.hasOwnProperty("current") && e.current instanceof Node ? e.current.ownerDocument : document
            }
        },
        6542: function(e, t, n) {
            "use strict";
            n.d(t, {
                AN: function() {
                    return l
                },
                l4: function() {
                    return s
                },
                sY: function() {
                    return c
                },
                yV: function() {
                    return v
                }
            });
            var r, i, o = n(4132),
                u = n(5828),
                a = n(7467),
                l = ((r = l || {})[r.None = 0] = "None", r[r.RenderStrategy = 1] = "RenderStrategy", r[r.Static = 2] = "Static", r),
                s = ((i = s || {})[i.Unmount = 0] = "Unmount", i[i.Hidden = 1] = "Hidden", i);

            function c({
                ourProps: e,
                theirProps: t,
                slot: n,
                defaultTag: r,
                features: i,
                visible: o = !0,
                name: u
            }) {
                let l = f(t, e);
                if (o) return d(l, n, r, u);
                let s = null != i ? i : 0;
                if (2 & s) {
                    let {
                        static: e = !1,
                        ...t
                    } = l;
                    if (e) return d(t, n, r, u)
                }
                if (1 & s) {
                    let {
                        unmount: e = !0,
                        ...t
                    } = l;
                    return (0, a.E)(e ? 0 : 1, {
                        0: () => null,
                        1: () => d({ ...t,
                            hidden: !0,
                            style: {
                                display: "none"
                            }
                        }, n, r, u)
                    })
                }
                return d(l, n, r, u)
            }

            function d(e, t = {}, n, r) {
                let {
                    as: i = n,
                    children: a,
                    refName: l = "ref",
                    ...s
                } = m(e, ["unmount", "static"]), c = void 0 !== e.ref ? {
                    [l]: e.ref
                } : {}, d = "function" == typeof a ? a(t) : a;
                "className" in s && s.className && "function" == typeof s.className && (s.className = s.className(t));
                let v = {};
                if (t) {
                    let e = !1,
                        n = [];
                    for (let [r, i] of Object.entries(t)) "boolean" == typeof i && (e = !0), !0 === i && n.push(r);
                    e && (v["data-headlessui-state"] = n.join(" "))
                }
                if (i === o.Fragment && Object.keys(p(s)).length > 0) {
                    if (!(0, o.isValidElement)(d) || Array.isArray(d) && d.length > 1) throw Error(['Passing props on "Fragment"!', "", `The current component <${r} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(s).map(e => `  - ${e}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map(e => `  - ${e}`).join(`
`)].join(`
`));
                    let e = d.props,
                        t = "function" == typeof(null == e ? void 0 : e.className) ? (...t) => (0, u.A)(null == e ? void 0 : e.className(...t), s.className) : (0, u.A)(null == e ? void 0 : e.className, s.className);
                    return (0, o.cloneElement)(d, Object.assign({}, f(d.props, p(m(s, ["ref"]))), v, c, function(...e) {
                        return {
                            ref: e.every(e => null == e) ? void 0 : t => {
                                for (let n of e) null != n && ("function" == typeof n ? n(t) : n.current = t)
                            }
                        }
                    }(d.ref, c.ref), t ? {
                        className: t
                    } : {}))
                }
                return (0, o.createElement)(i, Object.assign({}, m(s, ["ref"]), i !== o.Fragment && c, i !== o.Fragment && v), d)
            }

            function f(...e) {
                if (0 === e.length) return {};
                if (1 === e.length) return e[0];
                let t = {},
                    n = {};
                for (let r of e)
                    for (let e in r) e.startsWith("on") && "function" == typeof r[e] ? (null != n[e] || (n[e] = []), n[e].push(r[e])) : t[e] = r[e];
                if (t.disabled || t["aria-disabled"]) return Object.assign(t, Object.fromEntries(Object.keys(n).map(e => [e, void 0])));
                for (let e in n) Object.assign(t, {
                    [e](t, ...r) {
                        for (let i of n[e]) {
                            if ((t instanceof Event || (null == t ? void 0 : t.nativeEvent) instanceof Event) && t.defaultPrevented) return;
                            i(t, ...r)
                        }
                    }
                });
                return t
            }

            function v(e) {
                var t;
                return Object.assign((0, o.forwardRef)(e), {
                    displayName: null != (t = e.displayName) ? t : e.name
                })
            }

            function p(e) {
                let t = Object.assign({}, e);
                for (let e in t) void 0 === t[e] && delete t[e];
                return t
            }

            function m(e, t = []) {
                let n = Object.assign({}, e);
                for (let e of t) e in n && delete n[e];
                return n
            }
        },
        4034: function(e, t, n) {
            "use strict";
            var r = n(4132);
            let i = r.forwardRef(function({
                title: e,
                titleId: t,
                ...n
            }, i) {
                return r.createElement("svg", Object.assign({
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    ref: i,
                    "aria-labelledby": t
                }, n), e ? r.createElement("title", {
                    id: t
                }, e) : null, r.createElement("path", {
                    fillRule: "evenodd",
                    d: "M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z",
                    clipRule: "evenodd"
                }))
            });
            t.Z = i
        },
        3562: function(e, t, n) {
            "use strict";
            var r = n(4132);
            let i = r.forwardRef(function({
                title: e,
                titleId: t,
                ...n
            }, i) {
                return r.createElement("svg", Object.assign({
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    strokeWidth: 1.5,
                    stroke: "currentColor",
                    "aria-hidden": "true",
                    ref: i,
                    "aria-labelledby": t
                }, n), e ? r.createElement("title", {
                    id: t
                }, e) : null, r.createElement("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                }))
            });
            t.Z = i
        },
        1415: function(e, t, n) {
            "use strict";
            var r = n(4132);
            let i = r.forwardRef(function({
                title: e,
                titleId: t,
                ...n
            }, i) {
                return r.createElement("svg", Object.assign({
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    strokeWidth: 1.5,
                    stroke: "currentColor",
                    "aria-hidden": "true",
                    ref: i,
                    "aria-labelledby": t
                }, n), e ? r.createElement("title", {
                    id: t
                }, e) : null, r.createElement("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                }))
            });
            t.Z = i
        },
        9876: function(e, t, n) {
            "use strict";
            var r = n(4132);
            let i = r.forwardRef(function({
                title: e,
                titleId: t,
                ...n
            }, i) {
                return r.createElement("svg", Object.assign({
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    strokeWidth: 1.5,
                    stroke: "currentColor",
                    "aria-hidden": "true",
                    ref: i,
                    "aria-labelledby": t
                }, n), e ? r.createElement("title", {
                    id: t
                }, e) : null, r.createElement("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M19.5 8.25l-7.5 7.5-7.5-7.5"
                }))
            });
            t.Z = i
        },
        9642: function(e, t, n) {
            "use strict";
            var r = n(4132);
            let i = r.forwardRef(function({
                title: e,
                titleId: t,
                ...n
            }, i) {
                return r.createElement("svg", Object.assign({
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    strokeWidth: 1.5,
                    stroke: "currentColor",
                    "aria-hidden": "true",
                    ref: i,
                    "aria-labelledby": t
                }, n), e ? r.createElement("title", {
                    id: t
                }, e) : null, r.createElement("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                }), r.createElement("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                }))
            });
            t.Z = i
        },
        4284: function(e, t, n) {
            "use strict";
            var r = n(4132);
            let i = r.forwardRef(function({
                title: e,
                titleId: t,
                ...n
            }, i) {
                return r.createElement("svg", Object.assign({
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    strokeWidth: 1.5,
                    stroke: "currentColor",
                    "aria-hidden": "true",
                    ref: i,
                    "aria-labelledby": t
                }, n), e ? r.createElement("title", {
                    id: t
                }, e) : null, r.createElement("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                }))
            });
            t.Z = i
        },
        7113: function(e, t, n) {
            "use strict";
            var r = n(4132);
            let i = r.forwardRef(function({
                title: e,
                titleId: t,
                ...n
            }, i) {
                return r.createElement("svg", Object.assign({
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    strokeWidth: 1.5,
                    stroke: "currentColor",
                    "aria-hidden": "true",
                    ref: i,
                    "aria-labelledby": t
                }, n), e ? r.createElement("title", {
                    id: t
                }, e) : null, r.createElement("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                }))
            });
            t.Z = i
        },
        4159: function(e, t, n) {
            "use strict";
            var r = n(4132);
            let i = r.forwardRef(function({
                title: e,
                titleId: t,
                ...n
            }, i) {
                return r.createElement("svg", Object.assign({
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    strokeWidth: 1.5,
                    stroke: "currentColor",
                    "aria-hidden": "true",
                    ref: i,
                    "aria-labelledby": t
                }, n), e ? r.createElement("title", {
                    id: t
                }, e) : null, r.createElement("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                }))
            });
            t.Z = i
        },
        3287: function(e, t, n) {
            "use strict";
            var r = n(4132);
            let i = r.forwardRef(function({
                title: e,
                titleId: t,
                ...n
            }, i) {
                return r.createElement("svg", Object.assign({
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    strokeWidth: 1.5,
                    stroke: "currentColor",
                    "aria-hidden": "true",
                    ref: i,
                    "aria-labelledby": t
                }, n), e ? r.createElement("title", {
                    id: t
                }, e) : null, r.createElement("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M6 18L18 6M6 6l12 12"
                }))
            });
            t.Z = i
        },
        500: function(e, t, n) {
            "use strict";
            n.r(t), n.d(t, {
                Analytics: function() {
                    return s
                },
                default: function() {
                    return c
                },
                track: function() {
                    return l
                }
            });
            var r = n(4132),
                i = () => {
                    window.va || (window.va = function(...e) {
                        (window.vaq = window.vaq || []).push(e)
                    })
                };

            function o() {
                return "undefined" != typeof window
            }

            function u() {
                return window.vam || "production"
            }

            function a() {
                return "development" === u()
            }

            function l(e, t) {
                var n, r;
                if (!o()) {
                    console.warn("[Vercel Web Analytics] Server-side execution of `track()` is currently not supported.");
                    return
                }
                if (!t) {
                    null == (n = window.va) || n.call(window, "event", {
                        name: e
                    });
                    return
                }
                try {
                    let n = function(e, t) {
                        let n = e,
                            r = [];
                        for (let [i, o] of Object.entries(e)) "object" == typeof o && null !== o && (t.strip ? n = function(e, {
                            [e]: t,
                            ...n
                        }) {
                            return n
                        }(i, n) : r.push(i));
                        if (r.length > 0 && !t.strip) throw Error(`The following properties are not valid: ${r.join(", ")}. Only strings, numbers, booleans, and null are allowed.`);
                        return n
                    }(t, {
                        strip: "production" === u()
                    });
                    null == (r = window.va) || r.call(window, "event", {
                        name: e,
                        data: n
                    })
                } catch (e) {
                    e instanceof Error && a() && console.error(e)
                }
            }

            function s({
                beforeSend: e,
                debug: t = !0,
                mode: n = "auto"
            }) {
                return (0, r.useEffect)(() => {
                    ! function(e = {
                        debug: !0
                    }) {
                        var t;
                        if (!o()) return;
                        (function(e = "auto") {
                            if ("auto" === e) {
                                window.vam = "production";
                                return
                            }
                            window.vam = e
                        })(e.mode), i(), e.beforeSend && (null == (t = window.va) || t.call(window, "beforeSend", e.beforeSend));
                        let n = a() ? "https://va.vercel-scripts.com/v1/script.debug.js" : "/_vercel/insights/script.js";
                        if (document.head.querySelector(`script[src*="${n}"]`)) return;
                        let r = document.createElement("script");
                        r.src = n, r.defer = !0, r.setAttribute("data-sdkn", "@vercel/analytics"), r.setAttribute("data-sdkv", "1.0.1"), a() && !1 === e.debug && r.setAttribute("data-debug", "false"), document.head.appendChild(r)
                    }({
                        beforeSend: e,
                        debug: t,
                        mode: n
                    })
                }, [e, t, n]), null
            }
            var c = {
                Analytics: s,
                track: l
            }
        },
        4155: function(e, t, n) {
            "use strict";
            n.d(t, {
                ZP: function() {
                    return eo
                }
            });
            var r = n(4132),
                i = n(4076);
            let o = new WeakMap,
                u = {},
                a = {},
                l = () => {},
                s = l(),
                c = Object,
                d = e => e === s,
                f = e => "function" == typeof e,
                v = (e, t) => ({ ...e,
                    ...t
                }),
                p = "undefined",
                m = typeof window != p,
                h = typeof document != p,
                g = () => m && typeof window.requestAnimationFrame != p,
                y = (e, t) => {
                    let n = o.get(e);
                    return [() => !d(t) && e.get(t) || u, r => {
                        if (!d(t)) {
                            let i = e.get(t);
                            t in a || (a[t] = i), n[5](t, v(i, r), i || u)
                        }
                    }, n[6], () => !d(t) && t in a ? a[t] : !d(t) && e.get(t) || u]
                },
                E = new WeakMap,
                b = 0,
                w = e => {
                    let t, n;
                    let r = typeof e,
                        i = e && e.constructor,
                        o = i == Date;
                    if (c(e) !== e || o || i == RegExp) t = o ? e.toJSON() : "symbol" == r ? e.toString() : "string" == r ? JSON.stringify(e) : "" + e;
                    else {
                        if (t = E.get(e)) return t;
                        if (t = ++b + "~", E.set(e, t), i == Array) {
                            for (n = 0, t = "@"; n < e.length; n++) t += w(e[n]) + ",";
                            E.set(e, t)
                        }
                        if (i == c) {
                            t = "#";
                            let r = c.keys(e).sort();
                            for (; !d(n = r.pop());) d(e[n]) || (t += n + ":" + w(e[n]) + ",");
                            E.set(e, t)
                        }
                    }
                    return t
                },
                S = !0,
                [R, x] = m && window.addEventListener ? [window.addEventListener.bind(window), window.removeEventListener.bind(window)] : [l, l],
                T = () => {
                    let e = h && document.visibilityState;
                    return d(e) || "hidden" !== e
                },
                L = e => (h && document.addEventListener("visibilitychange", e), R("focus", e), () => {
                    h && document.removeEventListener("visibilitychange", e), x("focus", e)
                }),
                I = e => {
                    let t = () => {
                            S = !0, e()
                        },
                        n = () => {
                            S = !1
                        };
                    return R("online", t), R("offline", n), () => {
                        x("online", t), x("offline", n)
                    }
                },
                O = {
                    initFocus: L,
                    initReconnect: I
                },
                _ = !r.useId,
                M = !m || "Deno" in window,
                k = e => g() ? window.requestAnimationFrame(e) : setTimeout(e, 1),
                A = M ? r.useEffect : r.useLayoutEffect,
                C = "undefined" != typeof navigator && navigator.connection,
                F = !M && C && (["slow-2g", "2g"].includes(C.effectiveType) || C.saveData),
                N = e => {
                    if (f(e)) try {
                        e = e()
                    } catch (t) {
                        e = ""
                    }
                    let t = e;
                    return [e = "string" == typeof e ? e : (Array.isArray(e) ? e.length : e) ? w(e) : "", t]
                },
                P = 0,
                D = () => ++P;
            var j = {
                __proto__: null,
                ERROR_REVALIDATE_EVENT: 3,
                FOCUS_EVENT: 0,
                MUTATE_EVENT: 2,
                RECONNECT_EVENT: 1
            };
            async function V(...e) {
                let [t, n, r, i] = e, u = v({
                    populateCache: !0,
                    throwOnError: !0
                }, "boolean" == typeof i ? {
                    revalidate: i
                } : i || {}), a = u.populateCache, l = u.rollbackOnError, c = u.optimisticData, p = !1 !== u.revalidate, m = e => "function" == typeof l ? l(e) : !1 !== l, h = u.throwOnError;
                if (f(n)) {
                    let e = [],
                        r = t.keys();
                    for (let i = r.next(); !i.done; i = r.next()) {
                        let r = i.value;
                        !/^\$(inf|sub)\$/.test(r) && n(t.get(r)._k) && e.push(r)
                    }
                    return Promise.all(e.map(g))
                }
                return g(n);
                async function g(n) {
                    let i;
                    let [u] = N(n);
                    if (!u) return;
                    let [l, v] = y(t, u), [g, E, b] = o.get(t), w = g[u], S = () => p && (delete b[u], w && w[0]) ? w[0](2).then(() => l().data) : l().data;
                    if (e.length < 3) return S();
                    let R = r,
                        x = D();
                    E[u] = [x, 0];
                    let T = !d(c),
                        L = l(),
                        I = L.data,
                        O = L._c,
                        _ = d(O) ? I : O;
                    if (T && v({
                            data: c = f(c) ? c(_) : c,
                            _c: _
                        }), f(R)) try {
                        R = R(_)
                    } catch (e) {
                        i = e
                    }
                    if (R && f(R.then)) {
                        if (R = await R.catch(e => {
                                i = e
                            }), x !== E[u][0]) {
                            if (i) throw i;
                            return R
                        }
                        i && T && m(i) && (a = !0, v({
                            data: R = _,
                            _c: s
                        }))
                    }
                    a && !i && (f(a) && (R = a(R, _)), v({
                        data: R,
                        _c: s
                    })), E[u][1] = D();
                    let M = await S();
                    if (v({
                            _c: s
                        }), i) {
                        if (h) throw i;
                        return
                    }
                    return a ? M : R
                }
            }
            let H = (e, t) => {
                    for (let n in e) e[n][0] && e[n][0](t)
                },
                z = (e, t) => {
                    if (!o.has(e)) {
                        let n = v(O, t),
                            r = {},
                            i = V.bind(s, e),
                            u = l,
                            a = {},
                            c = (e, t) => {
                                let n = a[e] || [];
                                return a[e] = n, n.push(t), () => n.splice(n.indexOf(t), 1)
                            },
                            d = (t, n, r) => {
                                e.set(t, n);
                                let i = a[t];
                                if (i)
                                    for (let e of i) e(n, r)
                            },
                            f = () => {
                                if (!o.has(e) && (o.set(e, [r, {}, {}, {}, i, d, c]), !M)) {
                                    let t = n.initFocus(setTimeout.bind(s, H.bind(s, r, 0))),
                                        i = n.initReconnect(setTimeout.bind(s, H.bind(s, r, 1)));
                                    u = () => {
                                        t && t(), i && i(), o.delete(e)
                                    }
                                }
                            };
                        return f(), [e, i, f, u]
                    }
                    return [e, o.get(e)[4]]
                },
                q = (e, t, n, r, i) => {
                    let o = n.errorRetryCount,
                        u = i.retryCount,
                        a = ~~((Math.random() + .5) * (1 << (u < 8 ? u : 8))) * n.errorRetryInterval;
                    (d(o) || !(u > o)) && setTimeout(r, a, i)
                },
                U = (e, t) => w(e) == w(t),
                [Z, B] = z(new Map),
                W = v({
                    onLoadingSlow: l,
                    onSuccess: l,
                    onError: l,
                    onErrorRetry: q,
                    onDiscarded: l,
                    revalidateOnFocus: !0,
                    revalidateOnReconnect: !0,
                    revalidateIfStale: !0,
                    shouldRetryOnError: !0,
                    errorRetryInterval: F ? 1e4 : 5e3,
                    focusThrottleInterval: 5e3,
                    dedupingInterval: 2e3,
                    loadingTimeout: F ? 5e3 : 3e3,
                    compare: U,
                    isPaused: () => !1,
                    cache: Z,
                    mutate: B,
                    fallback: {}
                }, {
                    isOnline: () => S,
                    isVisible: T
                }),
                $ = (e, t) => {
                    let n = v(e, t);
                    if (t) {
                        let {
                            use: r,
                            fallback: i
                        } = e, {
                            use: o,
                            fallback: u
                        } = t;
                        r && o && (n.use = r.concat(o)), i && u && (n.fallback = v(i, u))
                    }
                    return n
                },
                G = (0, r.createContext)({}),
                K = e => {
                    let {
                        value: t
                    } = e, n = (0, r.useContext)(G), i = f(t), o = (0, r.useMemo)(() => i ? t(n) : t, [i, n, t]), u = (0, r.useMemo)(() => i ? o : $(n, o), [i, n, o]), a = o && o.provider, l = (0, r.useRef)(s);
                    a && !l.current && (l.current = z(a(u.cache || Z), o));
                    let c = l.current;
                    return c && (u.cache = c[0], u.mutate = c[1]), A(() => {
                        if (c) return c[2] && c[2](), c[3]
                    }, []), (0, r.createElement)(G.Provider, v(e, {
                        value: u
                    }))
                },
                J = m && window.__SWR_DEVTOOLS_USE__,
                Q = J ? window.__SWR_DEVTOOLS_USE__ : [],
                Y = e => f(e[1]) ? [e[0], e[1], e[2] || {}] : [e[0], null, (null === e[1] ? e[2] : e[1]) || {}],
                X = () => v(W, (0, r.useContext)(G)),
                ee = e => (t, n, r) => {
                    let i = n && ((...e) => {
                        let [r] = N(t), [, , , i] = o.get(Z), u = i[r];
                        return u ? (delete i[r], u) : n(...e)
                    });
                    return e(t, i, r)
                },
                et = Q.concat(ee),
                en = (e, t, n) => {
                    let r = t[e] || (t[e] = []);
                    return r.push(n), () => {
                        let e = r.indexOf(n);
                        e >= 0 && (r[e] = r[r.length - 1], r.pop())
                    }
                };
            J && (window.__SWR_DEVTOOLS_REACT__ = r);
            let er = {
                    dedupe: !0
                },
                ei = (e, t, n) => {
                    let {
                        cache: u,
                        compare: a,
                        suspense: l,
                        fallbackData: c,
                        revalidateOnMount: p,
                        revalidateIfStale: m,
                        refreshInterval: h,
                        refreshWhenHidden: g,
                        refreshWhenOffline: E,
                        keepPreviousData: b
                    } = n, [w, S, R] = o.get(u), [x, T] = N(e), L = (0, r.useRef)(!1), I = (0, r.useRef)(!1), O = (0, r.useRef)(x), C = (0, r.useRef)(t), F = (0, r.useRef)(n), P = () => F.current, H = () => P().isVisible() && P().isOnline(), [z, q, U, Z] = y(u, x), B = (0, r.useRef)({}).current, W = d(c) ? n.fallback[x] : c, $ = (e, t) => {
                        for (let n in B) {
                            let r = n;
                            if ("data" === r) {
                                if (!a(e[r], t[r]) && (!d(e[r]) || !a(ei, t[r]))) return !1
                            } else if (t[r] !== e[r]) return !1
                        }
                        return !0
                    }, G = (0, r.useMemo)(() => {
                        let e = !!x && !!t && (d(p) ? !P().isPaused() && !l && (!!d(m) || m) : p),
                            n = t => {
                                let n = v(t);
                                return (delete n._k, e) ? {
                                    isValidating: !0,
                                    isLoading: !0,
                                    ...n
                                } : n
                            },
                            r = z(),
                            i = Z(),
                            o = n(r),
                            u = r === i ? o : n(i),
                            a = o;
                        return [() => {
                            let e = n(z()),
                                t = $(e, a);
                            return t ? (a.data = e.data, a.isLoading = e.isLoading, a.isValidating = e.isValidating, a.error = e.error, a) : (a = e, e)
                        }, () => u]
                    }, [u, x]), K = (0, i.useSyncExternalStore)((0, r.useCallback)(e => U(x, (t, n) => {
                        $(n, t) || e()
                    }), [u, x]), G[0], G[1]), J = !L.current, Q = w[x] && w[x].length > 0, Y = K.data, X = d(Y) ? W : Y, ee = K.error, et = (0, r.useRef)(X), ei = b ? d(Y) ? et.current : Y : X, eo = (!Q || !!d(ee)) && (J && !d(p) ? p : !P().isPaused() && (l ? !d(X) && m : d(X) || m)), eu = !!(x && t && J && eo), ea = d(K.isValidating) ? eu : K.isValidating, el = d(K.isLoading) ? eu : K.isLoading, es = (0, r.useCallback)(async e => {
                        let t, r;
                        let i = C.current;
                        if (!x || !i || I.current || P().isPaused()) return !1;
                        let o = !0,
                            u = e || {},
                            l = !R[x] || !u.dedupe,
                            c = () => _ ? !I.current && x === O.current && L.current : x === O.current,
                            v = {
                                isValidating: !1,
                                isLoading: !1
                            },
                            p = () => {
                                q(v)
                            },
                            m = () => {
                                let e = R[x];
                                e && e[1] === r && delete R[x]
                            },
                            h = {
                                isValidating: !0
                            };
                        d(z().data) && (h.isLoading = !0);
                        try {
                            if (l && (q(h), n.loadingTimeout && d(z().data) && setTimeout(() => {
                                    o && c() && P().onLoadingSlow(x, n)
                                }, n.loadingTimeout), R[x] = [i(T), D()]), [t, r] = R[x], t = await t, l && setTimeout(m, n.dedupingInterval), !R[x] || R[x][1] !== r) return l && c() && P().onDiscarded(x), !1;
                            v.error = s;
                            let e = S[x];
                            if (!d(e) && (r <= e[0] || r <= e[1] || 0 === e[1])) return p(), l && c() && P().onDiscarded(x), !1;
                            let u = z().data;
                            v.data = a(u, t) ? u : t, l && c() && P().onSuccess(t, x, n)
                        } catch (n) {
                            m();
                            let e = P(),
                                {
                                    shouldRetryOnError: t
                                } = e;
                            !e.isPaused() && (v.error = n, l && c() && (e.onError(n, x, e), (!0 === t || f(t) && t(n)) && H() && e.onErrorRetry(n, x, e, e => {
                                let t = w[x];
                                t && t[0] && t[0](j.ERROR_REVALIDATE_EVENT, e)
                            }, {
                                retryCount: (u.retryCount || 0) + 1,
                                dedupe: !0
                            })))
                        }
                        return o = !1, p(), !0
                    }, [x, u]), ec = (0, r.useCallback)((...e) => V(u, O.current, ...e), []);
                    if (A(() => {
                            C.current = t, F.current = n, d(Y) || (et.current = Y)
                        }), A(() => {
                            if (!x) return;
                            let e = es.bind(s, er),
                                t = 0,
                                n = (n, r = {}) => {
                                    if (n == j.FOCUS_EVENT) {
                                        let n = Date.now();
                                        P().revalidateOnFocus && n > t && H() && (t = n + P().focusThrottleInterval, e())
                                    } else if (n == j.RECONNECT_EVENT) P().revalidateOnReconnect && H() && e();
                                    else if (n == j.MUTATE_EVENT) return es();
                                    else if (n == j.ERROR_REVALIDATE_EVENT) return es(r)
                                },
                                r = en(x, w, n);
                            return I.current = !1, O.current = x, L.current = !0, q({
                                _k: T
                            }), eo && (d(X) || M ? e() : k(e)), () => {
                                I.current = !0, r()
                            }
                        }, [x]), A(() => {
                            let e;

                            function t() {
                                let t = f(h) ? h(z().data) : h;
                                t && -1 !== e && (e = setTimeout(n, t))
                            }

                            function n() {
                                !z().error && (g || P().isVisible()) && (E || P().isOnline()) ? es(er).then(t) : t()
                            }
                            return t(), () => {
                                e && (clearTimeout(e), e = -1)
                            }
                        }, [h, g, E, x]), (0, r.useDebugValue)(ei), l && d(X) && x) {
                        if (!_ && M) throw Error("Fallback data is required when using suspense in SSR.");
                        throw C.current = t, F.current = n, I.current = !1, d(ee) ? es(er) : ee
                    }
                    return {
                        mutate: ec,
                        get data() {
                            return B.data = !0, ei
                        },
                        get error() {
                            return B.error = !0, ee
                        },
                        get isValidating() {
                            return B.isValidating = !0, ea
                        },
                        get isLoading() {
                            return B.isLoading = !0, el
                        }
                    }
                };
            c.defineProperty(K, "defaultValue", {
                value: W
            });
            let eo = function(...e) {
                let t = X(),
                    [n, r, i] = Y(e),
                    o = $(t, i),
                    u = ei,
                    {
                        use: a
                    } = o,
                    l = (a || []).concat(et);
                for (let e = l.length; e--;) u = l[e](u);
                return u(n, r || o.fetcher || null, o)
            }
        }
    }
]);