"use strict";
! function() {
    let t = t => t,
        e = document.currentScript,
        n = (null == e ? void 0 : e.dataset.endpoint) || (null != e && e.src.includes("/va/") ? "/va" : "/_vercel/insights");
    async function i({
        type: i,
        data: a,
        options: r
    }) {
        var o, d;
        let l = location.href,
            s = document.referrer,
            u = t({
                type: i,
                url: l
            });
        if (!1 === u || null === u) return;
        u && (l = u.url);
        let c = s.includes(location.host),
            v = {
                o: l,
                sv: "0.1.1",
                sdkn: null != (o = null == e ? void 0 : e.getAttribute("data-sdkn")) ? o : void 0,
                sdkv: null != (d = null == e ? void 0 : e.getAttribute("data-sdkv")) ? d : void 0,
                ts: Date.now(),
                ...null != r && r.withReferrer && !c ? {
                    r: s
                } : {},
                ..."event" === i && a && {
                    en: a.name,
                    ed: a.data
                }
            };
        try {
            await fetch(`${n}/${"pageview"===i?"view":"event"}`, {
                method: "POST",
                keepalive: !0,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(v)
            })
        } catch (f) {}
    }
    async function a(t = {}) {
        return i({
            type: "pageview",
            options: {
                withReferrer: t.withReferrer
            }
        })
    }
    async function r(t, e) {
        return i({
            type: "event",
            data: {
                name: t,
                data: e
            },
            options: {
                withReferrer: !0
            }
        })
    }
    let o = () => {
        var e;
        window.va = function(e, n) {
            "beforeSend" === e ? t = n : "event" === e && n && r(n.name, n.data)
        }, null == (e = window.vaq) || e.forEach(([t, e]) => {
            window.va(t, e)
        })
    };
    (() => {
        if (window.vai) return;
        window.vai = !0, o(), a({
            withReferrer: !0
        });
        let t = history.pushState.bind(history);
        history.pushState = function(...e) {
            let n = e[2],
                i = "string" == typeof n ? location.pathname !== n.split("?")[0] : n && location.href !== n.href;
            t(...e), i && a()
        }, window.addEventListener("popstate", function() {
            a()
        })
    })()
}();