(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [467], {
        8516: function(e, n, t) {
            Promise.resolve().then(t.t.bind(t, 9721, 23)), Promise.resolve().then(t.t.bind(t, 4968, 23)), Promise.resolve().then(t.t.bind(t, 171, 23)), Promise.resolve().then(t.t.bind(t, 9624, 23)), Promise.resolve().then(t.bind(t, 69))
        },
        69: function(e, n, t) {
            "use strict";
            t.r(n), t.d(n, {
                ChangeEmbedColor: function() {
                    return y
                }
            });
            var s = t(4909),
                r = t(8470),
                o = t(3283),
                i = t(1621),
                a = t(9841),
                l = {
                    title: "Majo.exe",
                    author: "Igor Kowalczyk",
                    description: "Majo.exe - Discord bot for Fun, Memes, Images, Giveaway, Economy, Anime and NSFW! Majo.exe serve over 117 commands!",
                    image: "/assets/og.png",
                    url: a.env.NEXTAUTH_URL,
                    theme_color: "#5865F2",
                    locale: "en_US",
                    type: "website"
                };
            a.env.CLIENT_ID, a.env.CLIENT_SECRET, a.env.SECRET;
            var c = {
                    logo: "https://media.discordapp.net/attachments/905722570286960650/997068981187919962/logo-modified.png",
                    image: "/assets/banner.png"
                },
                d = t(3502),
                u = t(9525),
                m = t(3425),
                h = t(6052),
                b = t(3517),
                x = t.n(b),
                p = t(4132),
                g = t(8818),
                f = t(3127),
                v = t(2233);

            function y(e) {
                var n, t, a = e.serverId,
                    b = e.serverColor,
                    y = (0, r._)((0, p.useState)(null != b ? b : "#5865F2"), 2),
                    j = y[0],
                    N = y[1],
                    w = (0, r._)((0, p.useState)("Save"), 2),
                    _ = w[0],
                    S = w[1],
                    T = (0, r._)((0, p.useState)("Reset"), 2),
                    k = T[0],
                    C = T[1],
                    E = (0, r._)((0, p.useState)(""), 2),
                    Z = E[0],
                    R = E[1],
                    P = (0, r._)((0, p.useState)(""), 2),
                    I = P[0],
                    O = P[1],
                    F = (n = (0, s._)(function() {
                        var e, n;
                        return (0, o.Jh)(this, function(t) {
                            switch (t.label) {
                                case 0:
                                    return S("Saving..."), R(""), O(""), [4, fetch("/api/settings/embed-color", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({
                                            color: j,
                                            id: a
                                        })
                                    })];
                                case 1:
                                    if (!(e = t.sent()).ok) return R("Something went wrong"), [2, S("Save")];
                                    return [4, e.json()];
                                case 2:
                                    if (200 === (n = t.sent()).code) return O(n.message), setTimeout(function() {
                                        O("")
                                    }, 3e3), [2, S("Save")];
                                    return R(n.error), setTimeout(function() {
                                        R("")
                                    }, 3e3), [2, S("Save")]
                            }
                        })
                    }), function() {
                        return n.apply(this, arguments)
                    }),
                    M = (t = (0, s._)(function() {
                        var e, n;
                        return (0, o.Jh)(this, function(t) {
                            switch (t.label) {
                                case 0:
                                    return C("Resetting..."), R(""), O(""), [4, fetch("/api/settings/embed-color", {
                                        method: "PUT",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({
                                            id: a
                                        })
                                    })];
                                case 1:
                                    if (!(e = t.sent()).ok) return R("Something went wrong"), [2, C("Reset")];
                                    return [4, e.json()];
                                case 2:
                                    if (200 === (n = t.sent()).code) return O(n.message), setTimeout(function() {
                                        O("")
                                    }, 3e3), N("#5865F2"), [2, C("Reset")];
                                    return R(n.error), setTimeout(function() {
                                        R("")
                                    }, 3e3), [2, C("Reset")]
                            }
                        })
                    }), function() {
                        return t.apply(this, arguments)
                    });
                return (0, i.jsxs)("div", {
                    className: "flex flex-row items-center gap-4 divide-x divide-neutral-800",
                    children: [(0, i.jsx)(g.gW, {
                        color: j,
                        onChange: N
                    }), (0, i.jsx)("div", {
                        children: (0, i.jsxs)("div", {
                            className: "flex items-center gap-1 mt-4 ml-4",
                            children: [(0, i.jsx)(x(), {
                                src: c.logo,
                                alt: a,
                                quality: 95,
                                width: 64,
                                height: 64,
                                className: "w-10 h-10 rounded-full self-baseline"
                            }), (0, i.jsxs)("div", {
                                className: "flex flex-col",
                                children: [(0, i.jsxs)("div", {
                                    className: "h-10 flex-row flex items-center ml-1",
                                    children: [(0, i.jsx)("span", {
                                        className: "font-bold",
                                        children: l.title
                                    }), " ", (0, i.jsx)("span", {
                                        className: "bg-[#5c65f3] rounded px-1 py-[0.12rem] ml-1 text-white text-xs",
                                        children: "BOT"
                                    }), (0, i.jsx)("span", {
                                        className: "text-sm ml-2 text-gray-400",
                                        children: "Today at 12:00 AM"
                                    })]
                                }), (0, i.jsxs)("div", {
                                    children: [(0, i.jsxs)("div", {
                                        className: "bg-[#2b2d31] rounded shadow-lg p-4 mt-2 ml-1",
                                        style: {
                                            "border-left": "4px solid ".concat(j)
                                        },
                                        children: [(0, i.jsxs)("p", {
                                            className: "font-bold mb-2",
                                            children: ["Embed color changed to ", j]
                                        }), (0, i.jsx)("p", {
                                            children: "This is an example of how your embed color will look like."
                                        }), (0, i.jsx)("p", {
                                            children: "You can change this color by clicking on the color picker above."
                                        })]
                                    }), (0, i.jsxs)("div", {
                                        className: "flex flex-row gap-2 my-2 ml-1",
                                        children: [(0, i.jsxs)(f.K, {
                                            onClick: F,
                                            children: ["Saving..." === _ ? (0, i.jsx)(d.Z, {
                                                className: "animate-spin h-5 w-5 mr-1 -ml-1"
                                            }) : (0, i.jsx)(u.Z, {
                                                className: "h-5 w-5 mr-1 -ml-1"
                                            }), _]
                                        }), (0, i.jsxs)(v.k, {
                                            onClick: M,
                                            children: ["Resetting..." === k ? (0, i.jsx)(d.Z, {
                                                className: "animate-spin h-5 w-5 mr-1 -ml-1"
                                            }) : (0, i.jsx)(m.Z, {
                                                className: "h-5 w-5 mr-1 -ml-1"
                                            }), k]
                                        })]
                                    }), Z && (0, i.jsxs)("p", {
                                        className: "text-red-500 flex items-center gap-1",
                                        children: [(0, i.jsx)(h.Z, {
                                            className: "h-5 w-5 inline"
                                        }), " ", Z]
                                    }), I && (0, i.jsxs)("p", {
                                        className: "text-green-500 flex items-center gap-1",
                                        children: [(0, i.jsx)(u.Z, {
                                            className: "h-5 w-5 inline"
                                        }), " ", I]
                                    })]
                                })]
                            })]
                        })
                    })]
                })
            }
        },
        3127: function(e, n, t) {
            "use strict";
            t.d(n, {
                K: function() {
                    return d
                }
            });
            var s = t(2316),
                r = t(5209),
                o = t(4050),
                i = t(1621),
                a = t(1993),
                l = t(4075),
                c = t.n(l);

            function d(e) {
                var n = e.children,
                    t = (0, o._)(e, ["children"]);
                return t && t.href ? (0, i.jsx)(c(), (0, r._)((0, s._)({}, t), {
                    className: (0, a.Z)(t.className, "flex cursor-pointer items-center rounded bg-button-primary disabled:bg-button-primary/50 disabled:hover:bg-button-primary-hover/50 disabled:cursor-not-allowed px-4 py-2 leading-6 text-white duration-200 hover:bg-button-primary-hover motion-reduce:transition-none"),
                    children: n
                })) : (0, i.jsx)("button", (0, r._)((0, s._)({}, t), {
                    className: (0, a.Z)(t.className, "flex cursor-pointer items-center rounded bg-button-primary disabled:bg-button-primary/50 disabled:hover:bg-button-primary-hover/50 disabled:cursor-not-allowed px-4 py-2 leading-6 text-white duration-200 hover:bg-button-primary-hover motion-reduce:transition-none"),
                    children: n
                }))
            }
        },
        2233: function(e, n, t) {
            "use strict";
            t.d(n, {
                k: function() {
                    return d
                }
            });
            var s = t(2316),
                r = t(5209),
                o = t(4050),
                i = t(1621),
                a = t(1993),
                l = t(4075),
                c = t.n(l);

            function d(e) {
                var n = e.children,
                    t = (0, o._)(e, ["children"]);
                return t && t.href ? (0, i.jsx)(c(), (0, r._)((0, s._)({}, t), {
                    className: (0, a.Z)(t.className, "flex cursor-pointer items-center rounded disabled:cursor-not-allowed bg-button-secondary disabled:bg-button-secondary/50 hover:disabled:bg-button-secondary-hover/50 px-4 py-2 leading-6 text-white duration-200 hover:bg-button-secondary-hover motion-reduce:transition-none"),
                    children: n
                })) : (0, i.jsx)("button", (0, r._)((0, s._)({}, t), {
                    className: (0, a.Z)(t.className, "flex cursor-pointer items-center rounded disabled:cursor-not-allowed bg-button-secondary disabled:bg-button-secondary/50 hover:disabled:bg-button-secondary-hover/50 px-4 py-2 leading-6 text-white duration-200 hover:bg-button-secondary-hover motion-reduce:transition-none"),
                    children: n
                }))
            }
        }
    },
    function(e) {
        e.O(0, [168, 627, 903, 972, 638, 744], function() {
            return e(e.s = 8516)
        }), _N_E = e.O()
    }
]);