(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [185], {
        1903: function(e, n, r) {
            Promise.resolve().then(r.t.bind(r, 9168, 23)), Promise.resolve().then(r.t.bind(r, 1906, 23)), Promise.resolve().then(r.bind(r, 1934)), Promise.resolve().then(r.bind(r, 7433)), Promise.resolve().then(r.bind(r, 530)), Promise.resolve().then(r.bind(r, 7693)), Promise.resolve().then(r.t.bind(r, 4627, 23)), Promise.resolve().then(r.bind(r, 4016)), Promise.resolve().then(r.t.bind(r, 6572, 23)), Promise.resolve().then(r.t.bind(r, 9677, 23)), Promise.resolve().then(r.t.bind(r, 1407, 23)), Promise.resolve().then(r.bind(r, 1900)), Promise.resolve().then(r.bind(r, 500)), Promise.resolve().then(r.t.bind(r, 8815, 23))
        },
        1934: function(e, n, r) {
            "use strict";
            r.r(n), r.d(n, {
                Session: function() {
                    return s
                }
            });
            var t = r(1621),
                i = r(8453);

            function s(e) {
                var n = e.children;
                return (0, t.jsx)(i.SessionProvider, {
                    refetchInterval: 300,
                    refetchOnWindowFocus: !1,
                    children: n
                })
            }
        },
        4016: function(e, n, r) {
            "use strict";
            r.r(n), r.d(n, {
                LoginClient: function() {
                    return o
                }
            });
            var t = r(1621),
                i = r(8453),
                s = r(3127);

            function o() {
                return (0, t.jsx)(s.K, {
                    href: "/auth/login",
                    onClick: function() {
                        return (0, i.signIn)("discord")
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
        3127: function(e, n, r) {
            "use strict";
            r.d(n, {
                K: function() {
                    return d
                }
            });
            var t = r(2316),
                i = r(5209),
                s = r(4050),
                o = r(1621),
                a = r(1993),
                c = r(4075),
                l = r.n(c);

            function d(e) {
                var n = e.children,
                    r = (0, s._)(e, ["children"]);
                return r && r.href ? (0, o.jsx)(l(), (0, i._)((0, t._)({}, r), {
                    className: (0, a.Z)(r.className, "flex cursor-pointer items-center rounded bg-button-primary disabled:bg-button-primary/50 disabled:hover:bg-button-primary-hover/50 disabled:cursor-not-allowed px-4 py-2 leading-6 text-white duration-200 hover:bg-button-primary-hover motion-reduce:transition-none"),
                    children: n
                })) : (0, o.jsx)("button", (0, i._)((0, t._)({}, r), {
                    className: (0, a.Z)(r.className, "flex cursor-pointer items-center rounded bg-button-primary disabled:bg-button-primary/50 disabled:hover:bg-button-primary-hover/50 disabled:cursor-not-allowed px-4 py-2 leading-6 text-white duration-200 hover:bg-button-primary-hover motion-reduce:transition-none"),
                    children: n
                }))
            }
        },
        530: function(e, n, r) {
            "use strict";
            r.r(n), r.d(n, {
                ServerDropdown: function() {
                    return x
                }
            });
            var t = r(8470),
                i = r(1621),
                s = r(858),
                o = r(5429),
                a = r(4034),
                c = r(3517),
                l = r.n(c),
                d = r(4075),
                u = r.n(d),
                m = r(5065),
                h = r(4132),
                v = r(4155);

            function x() {
                var e, n = (0, m.useParams)(),
                    r = (0, t._)((0, h.useState)(!1), 2),
                    c = r[0],
                    d = r[1],
                    x = function(e) {
                        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3e4;
                        return (0, v.ZP)(e, function(e) {
                            return fetch(e, {
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            }).then(function(e) {
                                return e.json()
                            })
                        }, {
                            refreshInterval: n
                        })
                    }("/api/servers/fetch"),
                    f = x.data,
                    p = x.isLoading;
                if (!n.server) return null;
                var g = null == f ? void 0 : null === (e = f.servers) || void 0 === e ? void 0 : e.find(function(e) {
                    return e.id === n.server
                });
                return (0, i.jsxs)("div", {
                    className: "hidden items-center relative gap-2 lg:flex",
                    children: [(0, i.jsx)("svg", {
                        className: "h-8 w-8 stroke-neutral-700",
                        fill: "none",
                        height: "24",
                        shapeRendering: "geometricPrecision",
                        stroke: "currentColor",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "1",
                        viewBox: "0 0 24 24",
                        width: "24",
                        children: (0, i.jsx)("path", {
                            d: "M16.88 3.549L7.12 20.451"
                        })
                    }), (0, i.jsx)(s.v, {
                        className: "relative",
                        children: function(e) {
                            var r, t, m, v = e.open;
                            return (0, i.jsxs)(i.Fragment, {
                                children: [(0, i.jsx)(s.v.Button, {
                                    className: "flex cursor-pointer items-center gap-3 duration-200 motion-reduce:transition-none",
                                    onClick: function() {
                                        return d(!c)
                                    },
                                    children: (0, i.jsxs)("div", {
                                        className: "flex h-10 select-none items-center py-2 duration-200  motion-reduce:transition-none",
                                        children: [(null == g ? void 0 : g.icon) ? (0, i.jsx)(l(), {
                                            width: "32",
                                            height: "32",
                                            quality: 100,
                                            className: "!h-8 !w-8 rounded-full",
                                            src: "https://cdn.discordapp.com/icons/".concat(g.id, "/").concat(g.icon, ".png"),
                                            loading: "lazy",
                                            alt: "".concat(g.name, " Icon")
                                        }) : p ? (0, i.jsx)("div", {
                                            className: "h-8 w-8 rounded-full bg-neutral-700 animate-pulse"
                                        }) : (0, i.jsx)("div", {
                                            className: "h-8 w-8 rounded-full bg-neutral-700"
                                        }), (0, i.jsx)("span", {
                                            className: "!ml-2 ",
                                            children: p ? "Loading..." : (null === (r = null == f ? void 0 : null === (t = f.servers) || void 0 === t ? void 0 : t.find(function(e) {
                                                return e.id === n.server
                                            })) || void 0 === r ? void 0 : r.name) || "Unknown Server"
                                        }), (0, i.jsx)(a.Z, {
                                            className: "ml-2 h-4 w-4 duration-200 motion-reduce:transition-none"
                                        })]
                                    })
                                }), (0, i.jsx)(o.u, {
                                    show: v,
                                    as: h.Fragment,
                                    enter: "transition ease-out duration-200",
                                    enterFrom: "opacity-0 translate-y-1",
                                    enterTo: "opacity-100 translate-y-0",
                                    leave: "transition ease-in duration-150",
                                    leaveFrom: "opacity-100 translate-y-0",
                                    leaveTo: "opacity-0 translate-y-1",
                                    children: (0, i.jsxs)(s.v.Items, {
                                        className: "fixed top-16 left-0 origin-top-left z-10 w-screen max-w-sm px-5 bg-background-menu mt-3 py-6 transform translate-x-1/2  border border-neutral-800 rounded",
                                        children: [(0, i.jsx)("p", {
                                            className: "text-neutral-400 mb-4 pl-4",
                                            children: "Select a server: "
                                        }), p ? (0, i.jsx)(i.Fragment, {
                                            children: Array.from([, , , , , ].keys()).map(function(e) {
                                                return (0, i.jsxs)("div", {
                                                    className: "animate-pulse fle gap-2 items-center space-x-4",
                                                    children: [(0, i.jsx)("div", {
                                                        className: "rounded-full bg-neutral-700 h-12 w-12"
                                                    }), (0, i.jsx)("div", {
                                                        className: "flex-1 space-y-4 py-1",
                                                        children: (0, i.jsx)("div", {
                                                            className: "h-4 bg-neutral-700 rounded w-3/4"
                                                        })
                                                    })]
                                                }, e)
                                            })
                                        }) : (0, i.jsx)("div", {
                                            className: "flex flex-col items-start gap-2 w-full",
                                            children: null == f ? void 0 : null === (m = f.servers) || void 0 === m ? void 0 : m.filter(function(e) {
                                                return e.bot
                                            }).map(function(e) {
                                                return (0, i.jsx)(s.v.Item, {
                                                    children: (0, i.jsxs)(u(), {
                                                        className: "flex items-center gap-2 px-2 border border-transparent py-1 hover:border-neutral-800 rounded hover:bg-neutral-800/50 w-full",
                                                        href: "/dashboard/".concat(e.id),
                                                        onClick: function() {
                                                            return d(!c)
                                                        },
                                                        children: [e.icon ? (0, i.jsx)(l(), {
                                                            src: "https://cdn.discordapp.com/icons/".concat(e.id, "/").concat(e.icon, ".").concat(e.icon.startsWith("a_") ? "gif" : "png"),
                                                            alt: e.name,
                                                            quality: 95,
                                                            width: 48,
                                                            height: 48,
                                                            className: "w-12 h-12 rounded-full"
                                                        }) : (0, i.jsx)("div", {
                                                            className: "w-12 h-12 rounded-full bg-button-secondary"
                                                        }), (0, i.jsx)("span", {
                                                            className: "!ml-2 ",
                                                            children: e.name
                                                        })]
                                                    })
                                                }, e.id)
                                            })
                                        })]
                                    })
                                })]
                            })
                        }
                    })]
                })
            }
        },
        7693: function(e, n, r) {
            "use strict";
            r.r(n), r.d(n, {
                SideMenuControl: function() {
                    return l
                }
            });
            var t = r(1621),
                i = r(3287),
                s = r(1415),
                o = r(5065),
                a = r(4132),
                c = r(1900);

            function l() {
                var e = (0, a.useContext)(c.VisibilityContext),
                    n = e.toggleSideNav,
                    r = e.sideNavVisible,
                    l = (0, o.useParams)();
                return (0, t.jsx)(t.Fragment, {
                    children: l.server && (0, t.jsx)("button", {
                        className: "ml-4 flex flex-row items-center gap-2 rounded-lg bg-elements p-2 text-text lg:hidden",
                        onClick: n,
                        children: r ? (0, t.jsx)(i.Z, {
                            className: "w-6 h-6"
                        }) : (0, t.jsx)(s.Z, {
                            className: "w-6 h-6"
                        })
                    })
                })
            }
        },
        7433: function(e, n, r) {
            "use strict";
            r.r(n), r.d(n, {
                UserMenuDropdown: function() {
                    return b
                }
            });
            var t = r(1621),
                i = r(858),
                s = r(5429),
                o = r(9876),
                a = r(7113),
                c = r(4159),
                l = r(9642),
                d = r(4284),
                u = r(3562),
                m = r(1993),
                h = r(3517),
                v = r.n(h),
                x = r(4075),
                f = r.n(x),
                p = r(8453),
                g = r(4132);

            function b(e) {
                var n = e.user;
                return (0, t.jsx)(t.Fragment, {
                    children: (0, t.jsxs)(i.v, {
                        as: "div",
                        className: "relative inline-block text-left",
                        children: [(0, t.jsx)("div", {
                            children: (0, t.jsx)(i.v.Button, {
                                className: "ml-4 flex cursor-pointer items-center gap-3 duration-200 motion-reduce:transition-none",
                                children: function(e) {
                                    var r = e.open;
                                    return (0, t.jsxs)("div", {
                                        className: (0, m.Z)({
                                            "opacity-80 bg-background-menu-button": r,
                                            "hover:opacity-80": !r
                                        }, "flex h-10 select-none items-center rounded border border-neutral-700 bg-background-menu-button px-4 py-2 duration-200  motion-reduce:transition-none"),
                                        children: [(0, t.jsx)(v(), {
                                            width: "32",
                                            height: "32",
                                            quality: 100,
                                            className: "!h-8 !w-8 rounded-full",
                                            src: n.image,
                                            loading: "lazy",
                                            alt: "".concat(n.name, " Avatar")
                                        }), (0, t.jsx)("span", {
                                            className: "!ml-2 ",
                                            children: n.name
                                        }), (0, t.jsx)(o.Z, {
                                            className: (0, m.Z)({
                                                "rotate-180": r
                                            }, "ml-2 h-4 w-4 duration-200 motion-reduce:transition-none")
                                        })]
                                    })
                                }
                            })
                        }), (0, t.jsx)(s.u, {
                            as: g.Fragment,
                            enter: "transition ease-out duration-100",
                            enterFrom: "transform opacity-0 scale-95",
                            enterTo: "transform opacity-100 scale-100",
                            leave: "transition ease-in duration-75",
                            leaveFrom: "transform opacity-100 scale-100",
                            leaveTo: "transform opacity-0 scale-95",
                            children: (0, t.jsxs)(i.v.Items, {
                                className: "border border-neutral-800 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-neutral-800 rounded-md bg-background-menu p-1 shadow-2xl",
                                children: [(0, t.jsxs)("div", {
                                    className: "px-1 py-1 ",
                                    children: [(0, t.jsx)(i.v.Item, {
                                        children: function(e) {
                                            var n = e.active;
                                            return (0, t.jsxs)(f(), {
                                                href: "/dashboard",
                                                className: (0, m.Z)({
                                                    "bg-button-primary text-white": n,
                                                    "text-gray-400": !n
                                                }, "group my-1 flex w-full items-center rounded-md px-2 py-2 text-sm duration-200 motion-reduce:transition-none"),
                                                children: [(0, t.jsx)(a.Z, {
                                                    className: "mr-2 h-5 w-5 ",
                                                    "aria-hidden": "true",
                                                    role: "img"
                                                }), " Dashboard"]
                                            })
                                        }
                                    }), (0, t.jsx)(i.v.Item, {
                                        children: function(e) {
                                            var n = e.active;
                                            return (0, t.jsxs)(f(), {
                                                href: "/user/profile",
                                                className: (0, m.Z)({
                                                    "bg-button-primary text-white": n,
                                                    "text-gray-400": !n
                                                }, "group my-1 flex w-full items-center rounded-md px-2 py-2 text-sm duration-200 motion-reduce:transition-none"),
                                                children: [(0, t.jsx)(c.Z, {
                                                    className: "mr-2 h-5 w-5 ",
                                                    "aria-hidden": "true",
                                                    role: "img"
                                                }), " Profile"]
                                            })
                                        }
                                    }), (0, t.jsx)(i.v.Item, {
                                        children: function(e) {
                                            var n = e.active;
                                            return (0, t.jsxs)(f(), {
                                                href: "/user/settings",
                                                className: (0, m.Z)({
                                                    "bg-button-primary text-white": n,
                                                    "text-gray-400": !n
                                                }, "group my-1 flex w-full items-center rounded-md px-2 py-2 text-sm duration-200 motion-reduce:transition-none"),
                                                children: [(0, t.jsx)(l.Z, {
                                                    className: "mr-2 h-5 w-5 ",
                                                    "aria-hidden": "true",
                                                    role: "img"
                                                }), " Settings"]
                                            })
                                        }
                                    })]
                                }), (0, t.jsxs)("div", {
                                    className: "px-1 py-1",
                                    children: [(0, t.jsx)(i.v.Item, {
                                        children: function(e) {
                                            var n = e.active;
                                            return (0, t.jsxs)(f(), {
                                                href: "/discord",
                                                className: (0, m.Z)({
                                                    "bg-button-primary text-white": n,
                                                    "text-gray-400": !n
                                                }, "group my-1 flex w-full items-center rounded-md px-2 py-2 text-sm duration-200 motion-reduce:transition-none"),
                                                children: [(0, t.jsx)(d.Z, {
                                                    className: "mr-2 h-5 w-5 ",
                                                    "aria-hidden": "true",
                                                    role: "img"
                                                }), " Support"]
                                            })
                                        }
                                    }), (0, t.jsx)(i.v.Item, {
                                        children: function(e) {
                                            var n = e.active;
                                            return (0, t.jsxs)("button", {
                                                onClick: function() {
                                                    return (0, p.signOut)()
                                                },
                                                className: (0, m.Z)({
                                                    "bg-button-action-primary text-white": n,
                                                    "text-gray-400": !n
                                                }, "group my-1 flex w-full items-center rounded-md px-2 py-2 text-sm duration-200 motion-reduce:transition-none"),
                                                children: [(0, t.jsx)(u.Z, {
                                                    className: "mr-2 h-5 w-5",
                                                    "aria-hidden": "true",
                                                    role: "img"
                                                }), " Logout"]
                                            })
                                        }
                                    })]
                                })]
                            })
                        })]
                    })
                })
            }
        },
        1900: function(e, n, r) {
            "use strict";
            r.r(n), r.d(n, {
                VisibilityContext: function() {
                    return o
                },
                VisibilityProvider: function() {
                    return a
                }
            });
            var t = r(8470),
                i = r(1621),
                s = r(4132),
                o = (0, s.createContext)();

            function a(e) {
                var n = e.children,
                    r = (0, t._)((0, s.useState)(!1), 2),
                    a = r[0],
                    c = r[1];
                return (0, i.jsx)(o.Provider, {
                    value: {
                        sideNavVisible: a,
                        toggleSideNav: function() {
                            c(!a)
                        }
                    },
                    children: n
                })
            }
        },
        6572: function() {},
        9677: function() {},
        1407: function() {}
    },
    function(e) {
        e.O(0, [168, 627, 453, 84, 972, 638, 744], function() {
            return e(e.s = 1903)
        }), _N_E = e.O()
    }
]);