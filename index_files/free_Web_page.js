free_Web.Function.guides = {
    Config: {
        tools: [
            {
                id: "Br_Guides",
                fun: "javascript:free_Web.Function.guides.Start();",
                title: "开启辅助线",
                entitle: "关闭辅助线",
                img: "Br_Guides.png",
                key: "Shift+X",
                dir: "",
                keycode: 88
            },
            {
                id: "Selectcolor",
                fun: "javascript:free_Web.Function.guides.Down();",
                title: "打开辅助线颜色选择",
                entitle: "关闭辅助线颜色选择",
                img: "Br_Selectcolor.png",
                key: "Shift+Z",
                dir: "free_Web_menu",
                keycode: 90
            }
        ],
        Selectcolorfun: "javascript:free_Web.Function.guides.Selectcolor",
        menuBoxid: "Br_Selectcolor",
        Selectcolors: ["红色:#FF0000", "绿色:#00FF00", "蓝色:#0000FF ", "黄色:#FFFF00", "橙色:#FF7F00"]
    },
    toolhtml: function () {
        s = "<ul>";
        for (var i = 0; i < this.Config.tools.length; i++) {
            s += "<li><a id='" +
                this.Config.tools[i].id +
                "' href='" +
                this.Config.tools[i].fun +
                "' title='" +
                this.Config.tools[i].title +
                "（" +
                this.Config.tools[i].key +
                "）'><img src='/free_Web/images/" +
                this.Config.tools[i].img +
                "' dir='" +
                this.Config.tools[i].dir +
                "'></a></li>";
        }
        s += "<li class='Br_CName'>辅助线</li></ul>";
        return $(s);
    },
    menutoolhtml: function () {
        s = "<div id='" + this.Config.menuBoxid + "' dir='" + this.Config.tools[1].dir + "'><ul>";
        for (var i = 0; i < this.Config.Selectcolors.length; i++) {
            var cols = this.Config.Selectcolors[i].split(":");
            if (this.ColorNum == i) {
                s += "<li class='active'><a style='background:" +
                    cols[1] +
                    ";' href='" +
                    free_Web.Function.guides.Config.Selectcolorfun +
                    "(" +
                    i +
                    ");' title='" +
                    cols[0] +
                    "'></a></li>";
            } else {
                s += "<li><a style='background:" +
                    cols[1] +
                    ";' href='" +
                    free_Web.Function.guides.Config.Selectcolorfun +
                    "(" +
                    i +
                    ");' title='" +
                    cols[0] +
                    "'></a></li>";
            }
        }
        s += "</ul></div>";
        return $(s);
    },
    show: function () {
        var But = $("#Br_Guides");
        if (this.status) {
            But.attr("title", "关闭辅助线(" + this.Config.tools[0].key + ")");
            But.addClass("active");
        } else {
            But.attr("title", "开启辅助线(" + this.Config.tools[0].key + ")");
            But.removeClass("active");
        }
        $("#" + this.Config.menuBoxid).find("li").removeClass("active");
        $("#" + this.Config.menuBoxid).find("li").eq(this.ColorNum).addClass("active");
    },
    ISItemsShow: false,
    ISMenuAdd: false,
    ColorNum: 0,
    status: false,
    LineColor: function () {
        var cols = this.Config.Selectcolors[this.ColorNum].split(":");
        return cols[1];
    },
    clear: function () {
        this.status = false;
        $("#guidesbox").remove();
        $("#" + this.Config.menuBoxid).slideUp(300);
        this.ISItemsShow = false;
        ColorNum = 0;
    },
    up: function () {
        $("#" + this.Config.menuBoxid).slideUp(300);
        this.ISItemsShow = false;
    },
    Down: function () {
        if (!this.ISItemsShow) {
            if (!this.ISMenuAdd) {
                this.menutoolhtml().appendTo(free_Web.tool_Box);
                this.ISMenuAdd = true;
            }
            $("#" + this.Config.menuBoxid).css("left", ($("#Br_Guides").offset().left - 2) + "px")
                .css("top",
                    ($("#Br_Guides").offset().top - $(document).scrollTop() + $("#Br_ChangBg").height() + 3) + "px")
                .slideDown(300);
            this.ISItemsShow = true;
            free_Web.Function.audioplay.audio("您已打开辅助线颜色选择");
        } else {
            free_Web.Function.audioplay.audio("您已关闭辅助线颜色选择");
            this.up();
        }
    },
    Selectcolor: function (c) {
        $("#Br_Selectcolor").slideUp(300);
        this.ISItemsShow = false;
        if (this.ColorNum != c) {
            this.ColorNum = c;
            if (this.status) {
                $("#guidesYLine").css("background", this.LineColor());
                $("#guidesXLine").css("background", this.LineColor());
            }

            free_Web.Function.audioplay.audio("您已设置辅助线颜色为" + this.Config.Selectcolors[this.ColorNum].split(":")[0]);
            this.show();
        }
    },
    Start: function () {
        if (free_Web.Function.show.status) {
            if (!this.status) {
                this.set();
                this.status = true;
                free_Web.Function.audioplay.audio("您已开启辅助线");
            } else {
                this.State = false;
                free_Web.Function.audioplay.audio("您已关闭辅助线");
                this.clear();
            }
            this.show();
        }
    },
    set: function () {
        var GuidesBox = $("<div id='guidesbox'></div>").appendTo(document.body);;
        var Line = $("<div id=\"guidesXLine\"></div><div id=\"guidesYLine\"></div>").appendTo(GuidesBox);
        $("#guidesXLine").css("background", this.LineColor());
        $("#guidesYLine").css("background", this.LineColor()).css("height", $(document).height() + "px");
        $(document).mousemove(function (e) {
            var guidesX,
                guidesY;
            guidesY = document.body.scrollTop + e.pageY;
            $("#guidesYLine").css("left", e.pageX + "px");
            $("#guidesXLine").css("top", guidesY + "px");
        });
    }
};
free_Web.Function.Br_ChangBg = {
    Config: {
        id: "Br_ChangBg",
        fun: "javascript:free_Web.Function.Br_ChangBg.Down();",
        title: "页面换色",
        minTitle: "换色",
        img: "Br_ChangBg.png",
        key: "Shift+A",
        keycode: 65,
        menuBoxid: "Br_ChangBg_items",
        items: [
            {
                id: "Br_Bg_default",
                bgcolor: "#f3f3f3",
                fontcolor: "#333",
                fun: "javascript:free_Web.Function.Br_ChangBg.Start(0);",
                title: "恢复默认配色",
                linktitle: "",
                linkcolor: "",
                key: "Shift+R",
                keycode: 82
            },
            {
                id: "Br_Bg_b_w",
                bgcolor: "#000",
                fontcolor: "#fff",
                fun: "javascript:free_Web.Function.Br_ChangBg.Start(1);",
                title: "黑底白字",
                linktitle: "黄链接",
                linkcolor: "#ffff33",
                key: "Shift+S",
                keycode: 83
            },
            {
                id: "Br_Bg_w_b",
                bgcolor: "#fff",
                fontcolor: "#000",
                fun: "javascript:free_Web.Function.Br_ChangBg.Start(2);",
                title: "白底黑字",
                linktitle: "蓝链接",
                linkcolor: "#0033ff",
                key: "Shift+D",
                keycode: 68
            },
            {
                id: "Br_Bg_bl_y",
                bgcolor: "#3366ff",
                fontcolor: "#ffff33",
                fun: "javascript:free_Web.Function.Br_ChangBg.Start(3);",
                title: "蓝底黄字",
                linktitle: "白链接",
                linkcolor: "#fff",
                key: "Shift+F",
                keycode: 70
            },
            {
                id: "Br_Bg_bl_y",
                bgcolor: "#ffff33",
                fontcolor: "#000",
                fun: "javascript:free_Web.Function.Br_ChangBg.Start(4);",
                title: "黄底黑字",
                linktitle: "蓝链接",
                linkcolor: "#0033ff",
                key: "Shift+G",
                keycode: 71
            }
        ]
    },
    toolhtml: function () {
        s = "<ul>";
        s += "<li><a id='" +
            this.Config.id +
            "' href='" +
            this.Config.fun +
            "' title='" +
            this.Config.title +
            "（" +
            this.Config.key +
            "）'><img src='/free_Web/images/" +
            this.Config.img +
            "' dir='" +
            this.Config.menuBoxid +
            "'></a><p>" +
            this.Config.minTitle +
            "</p></li>";
        s += "</ul>";
        return $(s);
    },
    show: function () {
        $("#" + this.Config.menuBoxid).find("li").removeClass("active");
        $("#" + this.Config.menuBoxid).find("li").eq(this.ColorNum).addClass("active");
    },
    menutoolhtml: function () {
        s = "<div id='" + this.Config.menuBoxid + "' dir='free_Web_menu'><ul  dir='free_Web_menu'>";
        for (var i = 0; i < this.Config.items.length; i++) {
            if (this.ColorNum == i) {
                s += "<li class='active' dir='" +
                    this.Config.menuBoxid +
                    "'><a  dir='" +
                    this.Config.menuBoxid +
                    "' id='" +
                    this.Config.items[i].id +
                    "' style='background:" +
                    this.Config.items[i].bgcolor +
                    ";color:" +
                    this.Config.items[i].fontcolor +
                    ";' href='" +
                    this.Config.items[i].fun +
                    "' title='" +
                    this.Config.items[i].title +
                    "（" +
                    this.Config.items[i].key +
                    "）'>" +
                    this.Config.items[i].title +
                    "<span style='color:" +
                    this.Config.items[i].linkcolor +
                    ";'>" +
                    this.Config.items[i].linktitle +
                    "</span>（" +
                    this.Config.items[i].key +
                    "）</a></li>";
            } else {
                s += "<li  dir='" +
                    this.Config.menuBoxid +
                    "'><a  dir='" +
                    this.Config.menuBoxid +
                    "' id='" +
                    this.Config.items[i].id +
                    "' style='background:" +
                    this.Config.items[i].bgcolor +
                    ";color:" +
                    this.Config.items[i].fontcolor +
                    ";' href='" +
                    this.Config.items[i].fun +
                    "' title='" +
                    this.Config.items[i].title +
                    "（" +
                    this.Config.items[i].key +
                    "）'>" +
                    this.Config.items[i].title +
                    "<span style='color:" +
                    this.Config.items[i].linkcolor +
                    ";'>" +
                    this.Config.items[i].linktitle +
                    "</span>（" +
                    this.Config.items[i].key +
                    "）</a></li>";
            }
        }
        s += "</ul></div>";
        return $(s);
    },
    ISItemsShow: false,
    ISMenuAdd: false,
    status: false,
    ColorNum: 0,
    up: function () {
        if (this.ISItemsShow) {
            $("#" + this.Config.menuBoxid).slideUp(300);
            this.ISItemsShow = false;
        }
    },
    clear: function () {
        $("#" + this.Config.menuBoxid).slideUp(300);
        this.ISItemsShow = false;
        if (this.status && this.ColorNum > 0) {
            $(document.body).removeCss("background-color");
            $(document.body).removeCss("background-image");
            $(document.body).removeCss("border-color");
            $(document.body).removeCss("color");
            for (var i = 0; i < $(document.body).children().length; i++) {
                this.clearAll($(document.body).children().eq(i));
            }
            this.status = false;
            this.ColorNum = 0;
            this.show();
        }
    },
    clearAll: function (obj) {
        if (obj.attr("id") == "free_Web_box") {
            return;
        }
        obj.find("*").each(function (index) {
            $(this).removeCss("background-color");
            $(this).removeCss("background-image");
            $(this).removeCss("color");
            $(this).removeCss("border-color");
        });
    },
    Down: function () {
        if (!this.ISItemsShow) {
            if (!this.ISMenuAdd) {
                this.menutoolhtml().appendTo(free_Web.tool_Box);
                this.ISMenuAdd = true;
            }
            $("#" + this.Config.menuBoxid).css("left", ($("#" + this.Config.id).offset().left - 2) + "px")
                .css("top",
                    ($("#" + this.Config.id).offset().top -
                        $(document).scrollTop() +
                        $("#" + this.Config.id).height() +
                        3) +
                    "px").slideDown(300);
            this.ISItemsShow = true;
            free_Web.Function.audioplay.audio("您已打开页面换色菜单");
        } else {
            this.up();
            free_Web.Function.audioplay.audio("您已关闭页面换色菜单");
        }
    },

    Start: function (num) {
        if (free_Web.Function.show.status) {

            if (num > 0) {
                this.ColorNum = num;
                this.status = true;
                $("#Br_ChangBg_items").slideUp(300);
                this.ISItemsShow = false;
                free_Web.Function.audioplay.audio("您已选择" +
                    this.Config.items[num].title +
                    this.Config.items[num].linktitle);

                $(document.body).css("background-color", free_Web.Function.Br_ChangBg.Config.items[num].bgcolor);
                $(document.body).css("background-image", "none");
                $(document.body).css("color", free_Web.Function.Br_ChangBg.Config.items[num].fontcolor);
                $(document.body).css("border-color", free_Web.Function.Br_ChangBg.Config.items[num].fontcolor);
                for (var i = 0; i < $(document.body).children().length; i++) {
                    this.set(num, $(document.body).children().eq(i));
                }
                this.show();
            } else {
                if (this.ColorNum > 0) {
                    free_Web.Function.audioplay.audio("您已" + this.Config.items[num].title);
                }
                this.clear();
            }
        }
    },
    set: function (num, obj) {
        if (obj.attr("id") == "free_Web_box") {
            return;
        }
        obj.find("*").each(function (index) {
            $(this).css("background-color", free_Web.Function.Br_ChangBg.Config.items[num].bgcolor);
            $(this).css("background-image", "none");
            $(this).css("color", free_Web.Function.Br_ChangBg.Config.items[num].fontcolor);
            $(this).css("border-color", free_Web.Function.Br_ChangBg.Config.items[num].fontcolor);
        });
        obj.find("a").each(function (index) {
            $(this).css("color", free_Web.Function.Br_ChangBg.Config.items[num].linkcolor);
        });

    }

};
free_Web.Function.textMode = {
    Config: {
        id: "Br_textMode",
        fun: "javascript:free_Web.Function.textMode.Start();",
        title: "纯文本模式浏览",
        minTitle: "纯文本",
        entitle: "切换回默认模式",
        img: "Br_textMode.png",
        key: "Shift+T",
        keycode: 84
    },
    toolhtml: function () {
        s = "<ul>";
        s += "<li><a id='" +
            this.Config.id +
            "' href='" +
            this.Config.fun +
            "' title='" +
            this.Config.title +
            "（" +
            this.Config.key +
            "）'><img src='/free_Web/images/" +
            this.Config.img +
            "'></a><p>" +
            this.Config.minTitle +
            "</p></li>";
        s += "</ul>";
        return $(s);
    },
    show: function () {
        var But = $("#Br_textMode");
        if (this.status) {
            But.attr("title", "切换回默认模式");
            But.addClass("active");
        } else {
            But.attr("title", "纯文本模式浏览");
            But.removeClass("active");
        }
    },
    status: false,
    claer: function () {
        this.status = false;
    },
    Start: function () {
        if (free_Web.Function.show.status) {
            if (!this.status) {
                this.status = true;
                free_Web.Function.audioplay.audio("您已进入纯文本模式浏览");

                $(document.body).children().each(function (oi) {
                    if ($(this).attr("id") != "free_Web_box" && $(this).attr("id") != "free_Web_box_sub") {
                        $(this).find("img").remove();
                        $(this).find("iframe").remove();
                    }
                });
                $(document).find("head link").remove();

            } else {
                this.status = false;
                window.location.reload();
            }
            this.show();
        }
    }
};
free_Web.Function.pageZoom = {
    Config: {
        tools: [
            {
                id: "Br_PageFd",
                fun: "javascript:free_Web.Function.pageZoom.Start(1);",
                title: "页面放大",
                minTitle: "放大",
                entitle: "页面已放大到最大",
                img: "Br_PageFd.png",
                key: "Shift+1",
                keycode: 49

            },
            {
                id: "Br_PageFy",
                fun: "javascript:free_Web.Function.pageZoom.Start(0);",
                title: "页面还原",
                minTitle: "还原",
                entitle: "页面已还原到百分之百",
                img: "Br_PageFy_en.png",
                key: "Shift+3",
                keycode: 51
            },
            {
                id: "Br_PageSx",
                fun: "javascript:free_Web.Function.pageZoom.Start(-1);",
                title: "页面缩小",
                minTitle: "缩小",
                entitle: "已缩小到最小",
                img: "Br_PageSx.png",
                key: "Shift+2",
                keycode: 50
            }
        ]
    },
    toolhtml: function () {
        s = "<ul>";
        for (var i = 0; i < this.Config.tools.length; i++) {
            s += "<li><a id='" +
                this.Config.tools[i].id +
                "' href='" +
                this.Config.tools[i].fun +
                "' title='" +
                this.Config.tools[i].title +
                "（" +
                this.Config.tools[i].key +
                "）'><img src='/free_Web/images/" +
                this.Config.tools[i].img +
                "'></a><p>" +
                this.Config.tools[i].minTitle +
                "</p></li>";
        }
        s += "</ul>";
        return $(s);
    },
    show: function () {
        var Br_PageFd = $("#Br_PageFd");
        var Br_PageSx = $("#Br_PageSx");
        var Br_PageFy = $("#Br_PageFy");
        if (this.pageZoom >= 150) {
            Br_PageFd.attr("title", "已放大到最大");
            Br_PageFd.find("img").attr("src", "/free_Web/images/Br_PageFd_en.png");
        } else {
            Br_PageFd.find("img").attr("src", "/free_Web/images/Br_PageFd.png");
            Br_PageFd.attr("title", "页面放大(" + this.Config.tools[0].key + ")");
        }
        if (this.pageZoom <= 60) {
            Br_PageSx.attr("title", "已缩小到最小");
            Br_PageSx.find("img").attr("src", "/free_Web/images/Br_PageSx_en.png");
        } else {
            Br_PageSx.find("img").attr("src", "/free_Web/images/Br_PageSx.png");
            Br_PageSx.attr("title", "页面缩小(" + this.Config.tools[2].key + ")");
        }
        if (this.pageZoom == 100) {
            Br_PageFy.find("img").attr("src", "/free_Web/images/Br_PageFy_en.png");
        } else {
            Br_PageFy.find("img").attr("src", "/free_Web/images/Br_PageFy.png");
        }
    },
    pageZoom: 100,
    clear: function () {
        this.pageZoom = 100;
        this.set();
        this.show();
    },
    Start: function (zoom) {
        if (free_Web.Function.show.status) {
            if (zoom == 1) {
                if (this.pageZoom < 150) {
                    this.pageZoom += 10;
                    free_Web.Function.audioplay.audio("页面已放大到" + this.pageZoom + "%");
                } else {
                    free_Web.Function.audioplay.audio("页面已放大到最大");
                }
            }
            if (zoom == -1) {
                if (this.pageZoom > 60) {
                    this.pageZoom -= 10;
                    free_Web.Function.audioplay.audio("页面已缩小到" + this.pageZoom + "%");
                } else {
                    free_Web.Function.audioplay.audio("页面已缩小到最小");
                }
            }
            if (zoom == 0) {
                if (this.pageZoom != 100) {
                    this.pageZoom = 100;
                    free_Web.Function.audioplay.audio("页面已还原到100%");
                }
            }
            this.set();
            this.show();
        }
    },
    set: function () {
        var size = this.pageZoom / 100;
        $(document.body).children().each(function (oi) {
            if ($(this).attr("id") != "free_Web_box" && $(this).attr("id") != "free_Web_box_sub") {
                $(this).css("zoom", size);
                $(this).css("-moz-transform", "scale(" + size + ")");
                $(this).css("-moz-transform-origin", "top center");

            }
        });
    }
};
free_Web.Function.FontZoom = {
    Config: {
        tools: [
            {
                id: "Br_FontFd",
                fun: "javascript:free_Web.Function.FontZoom.Start(1);",
                title: "字体放大",
                minTitle: "大字",
                entitle: "字体已放大到最大",
                img: "Br_FontFd.png",
                key: "Shift+Q",
                keycode: 81
            }, {
                id: "Br_FontFy",
                fun: "javascript:free_Web.Function.FontZoom.Start(0);",
                title: "字体还原",
                minTitle: "还原",
                entitle: "字体已还原到百分之百",
                img: "Br_FontFy_en.png",
                key: "Shift+E",
                keycode: 69
            }, {
                id: "Br_FontSx",
                fun: "javascript:free_Web.Function.FontZoom.Start(-1);",
                title: "字体缩小",
                minTitle: "小字",
                entitle: "字体已缩小到最小",
                img: "Br_FontSx.png",
                key: "Shift+W",
                keycode: 87
            }
        ]
    },
    toolhtml: function () {
        s = "<ul class='Br_UlEven'>";
        for (var i = 0; i < this.Config.tools.length; i++) {
            s += "<li><a id='" +
                this.Config.tools[i].id +
                "' href='" +
                this.Config.tools[i].fun +
                "' title='" +
                this.Config.tools[i].title +
                "（" +
                this.Config.tools[i].key +
                "）'><img src='/free_Web/images/" +
                this.Config.tools[i].img +
                "'></a><p>" +
                this.Config.tools[i].minTitle +
                "</p></li>";
        }
        s += "</ul>";
        return $(s);
    },
    show: function () {
        var Br_FontFd = $("#Br_FontFd");
        var Br_FontFy = $("#Br_FontFy");
        var Br_FontSx = $("#Br_FontSx");

        if (this.FontNum >= 10) {
            Br_FontFd.attr("title", "字体已放大到最大");
            Br_FontFd.find("img").attr("src", "/free_Web/images/Br_FontFd_en.png");
        } else {
            Br_FontFd.find("img").attr("src", "/free_Web/images/Br_FontFd.png");
            Br_FontFd.attr("title", "字体放大(" + this.Config.tools[0].key + ")");
        }
        if (this.FontNum < -5) {
            Br_FontSx.attr("title", "字体已缩小到最小");
            Br_FontSx.find("img").attr("src", "/free_Web/images/Br_FontSx_en.png");
        } else {
            Br_FontSx.find("img").attr("src", "/free_Web/images/Br_FontSx.png");
            Br_FontSx.attr("title", "字体缩小(" + this.Config.tools[2].key + ")");
        }
        if (this.FontNum != 0) {
            Br_FontFy.find("img").attr("src", "/free_Web/images/Br_FontFy.png");
        } else {
            Br_FontFy.find("img").attr("src", "/free_Web/images/Br_FontFy_en.png");
        }
    },
    FontNum: 0,
    clear: function () {
        this.FontNum = 0;
        $("voice.Shimen-Pointer-Label").each(function (index) {
            $(this).removeAttr("style");
        });
        this.show();
    },
    Start: function (zoom) {
        if (free_Web.Function.show.status) {
            if (zoom == 1) {
                if (!free_Web.IsInsideLabel) {
                    free_Web.Function.InsideLabel.init();
                }
                if (this.FontNum < 10) {
                    this.FontNum += 1;
                    free_Web.Function.audioplay.audio("字体已放大");
                    this.set(1);
                } else {
                    free_Web.Function.audioplay.audio("字体已放大到最大");
                }
                this.show();
            } else if (zoom == -1) {
                if (!free_Web.IsInsideLabel) {
                    free_Web.Function.InsideLabel.init();
                }
                if (this.FontNum >= -5) {
                    this.FontNum -= 1;
                    free_Web.Function.audioplay.audio("字体已缩小");
                    this.set(-1);
                } else {
                    free_Web.Function.audioplay.audio("字体已缩小到最小");
                }
                this.show();
            } else if (zoom == 0) {
                if (this.FontNum != 0) {
                    free_Web.Function.audioplay.audio("字体已还原到默认值");
                    this.clear();
                }
            }
        }
    },
    set: function (zoom) {
        $("voice.Shimen-Pointer-Label").each(function (index) {
            var cssFontSize = $(this).css("font-size");
            var fontSize = parseFloat(cssFontSize); //获取字体大小的值  
            var unit = cssFontSize.slice(-2); //获取字体大小的单位 
            if (zoom == 1) {
                fontSize = fontSize + 1;
            }
            if (zoom == -1) {
                fontSize = fontSize - 1;
            }
            $(this).css("font-size", fontSize + unit);
        });
    }

};