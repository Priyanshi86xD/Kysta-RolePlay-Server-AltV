(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [102], {
        1993: function(e, r, t) {
            "use strict";
            r.Z = function() {
                for (var e, r, t = 0, n = ""; t < arguments.length;)(e = arguments[t++]) && (r = function e(r) {
                    var t, n, o = "";
                    if ("string" == typeof r || "number" == typeof r) o += r;
                    else if ("object" == typeof r) {
                        if (Array.isArray(r))
                            for (t = 0; t < r.length; t++) r[t] && (n = e(r[t])) && (o && (o += " "), o += n);
                        else
                            for (t in r) r[t] && (o && (o += " "), o += t)
                    }
                    return o
                }(e)) && (n && (n += " "), n += r);
                return n
            }
        },
        2170: function(e, r, t) {
            Promise.resolve().then(t.bind(t, 7990))
        },
        3127: function(e, r, t) {
            "use strict";
            t.d(r, {
                K: function() {
                    return d
                }
            });
            var n = t(2316),
                o = t(5209),
                i = t(4050),
                a = t(1621),
                l = t(1993),
                s = t(4075),
                c = t.n(s);

            function d(e) {
                var r = e.children,
                    t = (0, i._)(e, ["children"]);
                return t && t.href ? (0, a.jsx)(c(), (0, o._)((0, n._)({}, t), {
                    className: (0, l.Z)(t.className, "flex cursor-pointer items-center rounded bg-button-primary disabled:bg-button-primary/50 disabled:hover:bg-button-primary-hover/50 disabled:cursor-not-allowed px-4 py-2 leading-6 text-white duration-200 hover:bg-button-primary-hover motion-reduce:transition-none"),
                    children: r
                })) : (0, a.jsx)("button", (0, o._)((0, n._)({}, t), {
                    className: (0, l.Z)(t.className, "flex cursor-pointer items-center rounded bg-button-primary disabled:bg-button-primary/50 disabled:hover:bg-button-primary-hover/50 disabled:cursor-not-allowed px-4 py-2 leading-6 text-white duration-200 hover:bg-button-primary-hover motion-reduce:transition-none"),
                    children: r
                }))
            }
        },
        7990: function(e, r, t) {
            "use strict";
            t.r(r), t.d(r, {
                SideNav: function() {
                    return w
                },
                SideNavLink: function() {
                    return p
                }
            });
            var n = t(1621),
                o = t(4132);
            let i = o.forwardRef(function({
                title: e,
                titleId: r,
                ...t
            }, n) {
                return o.createElement("svg", Object.assign({
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    strokeWidth: 1.5,
                    stroke: "currentColor",
                    "aria-hidden": "true",
                    ref: n,
                    "aria-labelledby": r
                }, t), e ? o.createElement("title", {
                    id: r
                }, e) : null, o.createElement("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                }))
            });
            var a = t(7113);
            let l = o.forwardRef(function({
                    title: e,
                    titleId: r,
                    ...t
                }, n) {
                    return o.createElement("svg", Object.assign({
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        strokeWidth: 1.5,
                        stroke: "currentColor",
                        "aria-hidden": "true",
                        ref: n,
                        "aria-labelledby": r
                    }, t), e ? o.createElement("title", {
                        id: r
                    }, e) : null, o.createElement("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
                    }), o.createElement("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
                    }))
                }),
                s = o.forwardRef(function({
                    title: e,
                    titleId: r,
                    ...t
                }, n) {
                    return o.createElement("svg", Object.assign({
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        strokeWidth: 1.5,
                        stroke: "currentColor",
                        "aria-hidden": "true",
                        ref: n,
                        "aria-labelledby": r
                    }, t), e ? o.createElement("title", {
                        id: r
                    }, e) : null, o.createElement("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                    }))
                }),
                c = o.forwardRef(function({
                    title: e,
                    titleId: r,
                    ...t
                }, n) {
                    return o.createElement("svg", Object.assign({
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        strokeWidth: 1.5,
                        stroke: "currentColor",
                        "aria-hidden": "true",
                        ref: n,
                        "aria-labelledby": r
                    }, t), e ? o.createElement("title", {
                        id: r
                    }, e) : null, o.createElement("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    }))
                });
            var d = t(9642),
                u = t(1993),
                f = t(4075),
                h = t.n(f),
                b = t(5065),
                m = t(1900),
                v = t(3127);

            function p(e) {
                var r = e.href,
                    t = e.children,
                    o = (0, b.usePathname)();
                return (0, n.jsx)(h(), {
                    href: r,
                    className: "".concat(o === r ? "before:!h-[29px] bg-button-primary/20" : "hover:bg-button-primary/20", " h-[45px] flex items-center gap-2 duration-200 w-full pr-4 py-2 hover:bg-button-primary/20 rounded before:rounded-r-md before:border-l-4 before:border-button-primary before:h-0 before:duration-200 hover:before:h-[29px]"),
                    children: t
                })
            }

            function w(e) {
                var r = e.server,
                    t = (0, o.useContext)(m.VisibilityContext).sideNavVisible;
                return (0, n.jsx)(n.Fragment, {
                    children: (0, n.jsxs)("aside", {
                        className: (0, u.Z)({
                            hidden: !t,
                            flex: t
                        }, "fixed flex-col lg:!flex menu w-64 h-full px-4 py-8 z-[9998] left-0 items-center bg-background-navbar/70 border-r border-r-neutral-800 backdrop-blur"),
                        children: [(0, n.jsxs)(v.K, {
                            href: "/dashboard",
                            className: "w-full mb-4",
                            children: [(0, n.jsx)(i, {
                                className: "w-5 h-5 mr-2 text-white cursor-pointer"
                            }), " Go back"]
                        }), (0, n.jsxs)("div", {
                            className: "flex flex-col items-center justify-center w-full gap-2 pt-4 border-t border-t-neutral-800",
                            children: [(0, n.jsxs)(p, {
                                href: "/dashboard/".concat(r),
                                children: [(0, n.jsx)(a.Z, {
                                    className: "w-6 h-6"
                                }), "Overview"]
                            }), (0, n.jsxs)(p, {
                                href: "/dashboard/".concat(r, "/statistics"),
                                children: [(0, n.jsx)(l, {
                                    className: "w-6 h-6"
                                }), "Statistics"]
                            }), (0, n.jsxs)(p, {
                                href: "/dashboard/".concat(r, "/leaderboard"),
                                children: [(0, n.jsx)(s, {
                                    className: "w-6 h-6"
                                }), "Leaderboard"]
                            }), (0, n.jsxs)(p, {
                                href: "/dashboard/".concat(r, "/logs"),
                                children: [(0, n.jsx)(c, {
                                    className: "w-6 h-6"
                                }), "Logs"]
                            }), (0, n.jsxs)(p, {
                                href: "/dashboard/".concat(r, "/settings"),
                                children: [(0, n.jsx)(d.Z, {
                                    className: "w-6 h-6"
                                }), "Settings"]
                            })]
                        })]
                    })
                })
            }
        },
        1900: function(e, r, t) {
            "use strict";
            t.r(r), t.d(r, {
                VisibilityContext: function() {
                    return a
                },
                VisibilityProvider: function() {
                    return l
                }
            });
            var n = t(8470),
                o = t(1621),
                i = t(4132),
                a = (0, i.createContext)();

            function l(e) {
                var r = e.children,
                    t = (0, n._)((0, i.useState)(!1), 2),
                    l = t[0],
                    s = t[1];
                return (0, o.jsx)(a.Provider, {
                    value: {
                        sideNavVisible: l,
                        toggleSideNav: function() {
                            s(!l)
                        }
                    },
                    children: r
                })
            }
        },
        1379: function(e, r, t) {
            "use strict";
            var n = t(4132),
                o = Symbol.for("react.element"),
                i = Symbol.for("react.fragment"),
                a = Object.prototype.hasOwnProperty,
                l = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
                s = {
                    key: !0,
                    ref: !0,
                    __self: !0,
                    __source: !0
                };

            function c(e, r, t) {
                var n, i = {},
                    c = null,
                    d = null;
                for (n in void 0 !== t && (c = "" + t), void 0 !== r.key && (c = "" + r.key), void 0 !== r.ref && (d = r.ref), r) a.call(r, n) && !s.hasOwnProperty(n) && (i[n] = r[n]);
                if (e && e.defaultProps)
                    for (n in r = e.defaultProps) void 0 === i[n] && (i[n] = r[n]);
                return {
                    $$typeof: o,
                    type: e,
                    key: c,
                    ref: d,
                    props: i,
                    _owner: l.current
                }
            }
            r.Fragment = i, r.jsx = c, r.jsxs = c
        },
        1621: function(e, r, t) {
            "use strict";
            e.exports = t(1379)
        },
        4075: function(e, r, t) {
            e.exports = t(9168)
        },
        5065: function(e, r, t) {
            e.exports = t(2168)
        },
        9642: function(e, r, t) {
            "use strict";
            var n = t(4132);
            let o = n.forwardRef(function({
                title: e,
                titleId: r,
                ...t
            }, o) {
                return n.createElement("svg", Object.assign({
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    strokeWidth: 1.5,
                    stroke: "currentColor",
                    "aria-hidden": "true",
                    ref: o,
                    "aria-labelledby": r
                }, t), e ? n.createElement("title", {
                    id: r
                }, e) : null, n.createElement("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                }), n.createElement("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                }))
            });
            r.Z = o
        },
        7113: function(e, r, t) {
            "use strict";
            var n = t(4132);
            let o = n.forwardRef(function({
                title: e,
                titleId: r,
                ...t
            }, o) {
                return n.createElement("svg", Object.assign({
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    strokeWidth: 1.5,
                    stroke: "currentColor",
                    "aria-hidden": "true",
                    ref: o,
                    "aria-labelledby": r
                }, t), e ? n.createElement("title", {
                    id: r
                }, e) : null, n.createElement("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                }))
            });
            r.Z = o
        }
    },
    function(e) {
        e.O(0, [168, 972, 638, 744], function() {
            return e(e.s = 2170)
        }), _N_E = e.O()
    }
]);