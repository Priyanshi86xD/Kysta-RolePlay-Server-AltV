(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [931], {
        1993: function(r, e, n) {
            "use strict";
            e.Z = function() {
                for (var r, e, n = 0, t = ""; n < arguments.length;)(r = arguments[n++]) && (e = function r(e) {
                    var n, t, c = "";
                    if ("string" == typeof e || "number" == typeof e) c += e;
                    else if ("object" == typeof e) {
                        if (Array.isArray(e))
                            for (n = 0; n < e.length; n++) e[n] && (t = r(e[n])) && (c && (c += " "), c += t);
                        else
                            for (n in e) e[n] && (c && (c += " "), c += n)
                    }
                    return c
                }(r)) && (t && (t += " "), t += e);
                return t
            }
        },
        7077: function(r, e, n) {
            Promise.resolve().then(n.t.bind(n, 9168, 23)), Promise.resolve().then(n.bind(n, 4016))
        },
        4016: function(r, e, n) {
            "use strict";
            n.r(e), n.d(e, {
                LoginClient: function() {
                    return o
                }
            });
            var t = n(1621),
                c = n(8453),
                i = n(3127);

            function o() {
                return (0, t.jsx)(i.K, {
                    href: "/auth/login",
                    onClick: function() {
                        return (0, c.signIn)("discord")
                    },
                    children: (0, t.jsxs)(t.Fragment, {
                        children: [(0, t.jsx)("svg", {
                            className: "mr-2 h-5 w-5",
                            "aria-hidden": "true",
                            role: "img",
                            viewBox: "0 0 24 24",
                            children: (0, t.jsx)("path", {
                                fill: "currentColor",
                                d: "M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"
                            })
                        }), " ", "Login to Beta"]
                    })
                })
            }
        },
        3127: function(r, e, n) {
            "use strict";
            n.d(e, {
                K: function() {
                    return l
                }
            });
            var t = n(2316),
                c = n(5209),
                i = n(4050),
                o = n(1621),
                s = n(1993),
                u = n(4075),
                a = n.n(u);

            function l(r) {
                var e = r.children,
                    n = (0, i._)(r, ["children"]);
                return n && n.href ? (0, o.jsx)(a(), (0, c._)((0, t._)({}, n), {
                    className: (0, s.Z)(n.className, "flex cursor-pointer items-center rounded bg-button-primary disabled:bg-button-primary/50 disabled:hover:bg-button-primary-hover/50 disabled:cursor-not-allowed px-4 py-2 leading-6 text-white duration-200 hover:bg-button-primary-hover motion-reduce:transition-none"),
                    children: e
                })) : (0, o.jsx)("button", (0, c._)((0, t._)({}, n), {
                    className: (0, s.Z)(n.className, "flex cursor-pointer items-center rounded bg-button-primary disabled:bg-button-primary/50 disabled:hover:bg-button-primary-hover/50 disabled:cursor-not-allowed px-4 py-2 leading-6 text-white duration-200 hover:bg-button-primary-hover motion-reduce:transition-none"),
                    children: e
                }))
            }
        },
        4075: function(r, e, n) {
            r.exports = n(9168)
        }
    },
    function(r) {
        r.O(0, [168, 453, 972, 638, 744], function() {
            return r(r.s = 7077)
        }), _N_E = r.O()
    }
]);