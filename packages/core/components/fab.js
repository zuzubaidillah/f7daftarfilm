(function framework7ComponentLoader(t, e) {
    void 0 === e && (e = !0);
    document, window;
    var s = t.$,
        a = (t.Template7, t.utils),
        o = (t.device, t.support, t.Class, t.Modal, t.ConstructorMethods, t.ModalMethods, {
            morphOpen: function (t, e) {
                var o = this,
                    n = s(t),
                    i = s(e);
                if (0 !== i.length) {
                    i.transition(0).addClass("fab-morph-target-visible");
                    var f = {
                            width: i[0].offsetWidth,
                            height: i[0].offsetHeight,
                            offset: i.offset(),
                            borderRadius: i.css("border-radius"),
                            zIndex: i.css("z-index")
                        },
                        r = {
                            width: n[0].offsetWidth,
                            height: n[0].offsetHeight,
                            offset: n.offset(),
                            translateX: a.getTranslate(n[0], "x"),
                            translateY: a.getTranslate(n[0], "y")
                        };
                    n[0].f7FabMorphData = {
                        $targetEl: i,
                        target: f,
                        fab: r
                    };
                    var h = r.offset.left + r.width / 2 - (f.offset.left + f.width / 2) - r.translateX,
                        l = r.offset.top + r.height / 2 - (f.offset.top + f.height / 2) - r.translateY,
                        d = f.width / r.width,
                        p = f.height / r.height,
                        b = Math.ceil(parseInt(f.borderRadius, 10) / Math.max(d, p));
                    b > 0 && (b += 2), n[0].f7FabMorphResizeHandler = function () {
                        n.transition(0).transform(""), i.transition(0), f.width = i[0].offsetWidth, f.height = i[0].offsetHeight, f.offset = i.offset(), r.offset = n.offset();
                        var t = r.offset.left + r.width / 2 - (f.offset.left + f.width / 2) - r.translateX,
                            e = r.offset.top + r.height / 2 - (f.offset.top + f.height / 2) - r.translateY,
                            s = f.width / r.width,
                            a = f.height / r.height;
                        n.transform("translate3d(" + -t + "px, " + -e + "px, 0) scale(" + s + ", " + a + ")")
                    }, i.css("opacity", 0).transform("scale(" + 1 / d + ", " + 1 / p + ")"), n.addClass("fab-opened").css("z-index", f.zIndex - 1).transform("translate3d(" + -h + "px, " + -l + "px, 0)"), n.transitionEnd((function () {
                        i.transition(""), a.nextFrame((function () {
                            i.css("opacity", 1).transform("scale(1,1)"), n.transform("translate3d(" + -h + "px, " + -l + "px, 0) scale(" + d + ", " + p + ")").css("border-radius", b + "px").css("box-shadow", "none").css("opacity", "0")
                        })), o.on("resize", n[0].f7FabMorphResizeHandler), i.parents(".page-content").length > 0 && i.parents(".page-content").on("scroll", n[0].f7FabMorphResizeHandler)
                    }))
                }
            },
            morphClose: function (t) {
                var e = s(t),
                    o = e[0].f7FabMorphData;
                if (o) {
                    var n = o.$targetEl,
                        i = o.target,
                        f = o.fab;
                    if (0 !== n.length) {
                        var r = f.offset.left + f.width / 2 - (i.offset.left + i.width / 2) - f.translateX,
                            h = f.offset.top + f.height / 2 - (i.offset.top + i.height / 2) - f.translateY,
                            l = i.width / f.width,
                            d = i.height / f.height;
                        this.off("resize", e[0].f7FabMorphResizeHandler), n.parents(".page-content").length > 0 && n.parents(".page-content").off("scroll", e[0].f7FabMorphResizeHandler), n.css("opacity", 0).transform("scale(" + 1 / l + ", " + 1 / d + ")"), e.transition("").css("box-shadow", "").css("border-radius", "").css("opacity", "1").transform("translate3d(" + -r + "px, " + -h + "px, 0)"), e.transitionEnd((function () {
                            e.css("z-index", "").removeClass("fab-opened").transform(""), a.nextFrame((function () {
                                e.transitionEnd((function () {
                                    n.removeClass("fab-morph-target-visible").css("opacity", "").transform("").transition("")
                                }))
                            }))
                        }))
                    }
                }
            },
            open: function (t, e) {
                var a = s(t).eq(0),
                    o = a.find(".fab-buttons");
                if (a.length && !a.hasClass("fab-opened") && (o.length || a.hasClass("fab-morph"))) {
                    if (this.fab.openedEl) {
                        if (this.fab.openedEl === a[0]) return;
                        this.fab.close(this.fab.openedEl)
                    }
                    this.fab.openedEl = a[0], a.hasClass("fab-morph") ? this.fab.morphOpen(a, e || a.attr("data-morph-to")) : a.addClass("fab-opened"), a.siblings(".fab-backdrop").addClass("backdrop-in"), a.trigger("fab:open")
                }
            },
            close: function (t) {
                void 0 === t && (t = ".fab-opened");
                var e = s(t).eq(0),
                    a = e.find(".fab-buttons");
                e.length && e.hasClass("fab-opened") && (a.length || e.hasClass("fab-morph")) && (this.fab.openedEl = null, e.hasClass("fab-morph") ? this.fab.morphClose(e) : e.removeClass("fab-opened"), e.siblings(".fab-backdrop").removeClass("backdrop-in"), e.trigger("fab:close"))
            },
            toggle: function (t) {
                s(t).hasClass("fab-opened") ? this.fab.close(t) : this.fab.open(t)
            }
        }),
        n = {
            name: "fab",
            create: function () {
                a.extend(this, {
                    fab: {
                        openedEl: null,
                        morphOpen: o.morphOpen.bind(this),
                        morphClose: o.morphClose.bind(this),
                        open: o.open.bind(this),
                        close: o.close.bind(this),
                        toggle: o.toggle.bind(this)
                    }
                })
            },
            clicks: {
                ".fab > a": function (t) {
                    this.fab.toggle(t.parents(".fab"))
                },
                ".fab-open": function (t, e) {
                    void 0 === e && (e = {});
                    this.fab.open(e.fab)
                },
                ".fab-close": function (t, e) {
                    void 0 === e && (e = {});
                    this.fab.close(e.fab)
                },
                ".fab-backdrop": function () {
                    this.fab.close()
                }
            }
        };
    if (e) {
        if (t.prototype.modules && t.prototype.modules[n.name]) return;
        t.use(n), t.instance && (t.instance.useModuleParams(n, t.instance.params), t.instance.useModule(n))
    }
    return n
}(Framework7, typeof Framework7AutoInstallComponent === 'undefined' ? undefined : Framework7AutoInstallComponent))