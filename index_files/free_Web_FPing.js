free_Web.Function.Fping = {
    Config: {
        tools: [
            {
                id: "Br_Fping",
                fun: "javascript:free_Web.Function.Fping.Start();",
                title: "开启显示屏",
                minTitle: "显示屏",
                entitle: "关闭显示屏",
                img: "Br_Fping.png",
                key: "Shift+P",
                dir: "",
                keycode: 80
            },
            {
                id: "Br_Fping_opensetting",
                fun: "javascript:free_Web.Function.Fping.down();",
                title: "开启显示屏设置",
                entitle: "关闭显示屏设置",
                img: "Br_Selectcolor.png",
                dir: "Br_Fping_opensetting",
                key: "Shift+O",
                keycode: 79
            }
        ],
        setting: [
            {
                id: "Fpbar_jt",
                fun: "javascript:free_Web.Function.Fping.FontYs(0);",
                title: "简体",
                key: "Shift+I",
                keycode: 73
            },
            {
                id: "Fpbar_ht",
                fun: "javascript:free_Web.Function.Fping.FontYs(1);",
                title: "繁體",
                key: "Shift+U",
                keycode: 85
            },
            {
                id: "Fpbar_py",
                fun: "javascript:free_Web.Function.Fping.FontYs(2);",
                title: "拼音",
                key: "Shift+Y",
                keycode: 89
            }
        ],
        menuBoxid: "Br_Fping_setting",
        Fpbar: function () {
            var s = "<div class='browserObj_Fpbar'>";
            s += "<div  class='Fpbar_r'><ul>";
            s += "<li><a href='javascript:free_Web.Function.Fping.Start();' title='关闭辅屏浏览'>关闭</a></li>";
            //s += "<li><a id='Fpbar_En' href='javascript:free_Web.Function.Fping.transEn();' title='在线翻译成英文'>英文<br>翻译</a></li>";
            s += "</ul></div>";
            s += "<div  id='Fpbar_l'>";
            s += '<table width="100%" cellspacing="0" cellpadding="0">';
            s += '<tbody><tr>';
            s +=
                '<td align="center" id="tooltips_show" valign="middle" style="line-height: 130%; font-size: 32px;"></td>';
            s += '</tr></tbody></table>';
            s += "</div></div>";
            return $(s);
        }

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
        s += "<li class='Br_CName'>显示屏</li></ul>";
        return $(s);
    },
    menutoolhtml: function () {
        s = "<div id='" + this.Config.menuBoxid + "' ><ul>";
        for (var i = 0; i < this.Config.setting.length; i++) {
            if (this.ItemNum == i) {
                s += "<li class='active'><a id='" +
                    this.Config.setting[i].id +
                    "' href='" +
                    this.Config.setting[i].fun +
                    "' title='" +
                    this.Config.setting[i].title +
                    "（" +
                    this.Config.setting[i].key +
                    "）'>" +
                    this.Config.setting[i].title +
                    "</a></li>";
            } else {
                s += "<li><a id='" +
                    this.Config.setting[i].id +
                    "' href='" +
                    this.Config.setting[i].fun +
                    "' title='" +
                    this.Config.setting[i].title +
                    "（" +
                    this.Config.setting[i].key +
                    "）'>" +
                    this.Config.setting[i].title +
                    "</a></li>";
            }
        }
        s += "</ul></div>";
        return $(s);
    },
    show: function () {
        var But = $("#Br_Fping");
        var Fpbar_En = $("#Fpbar_En");
        if (this.status) {
            But.attr("title", "关闭显示屏(" + this.Config.tools[0].key + ")");
            But.addClass("active");
        } else {
            But.attr("title", "开启显示屏(" + this.Config.tools[0].key + ")");
            But.removeClass("active");
        };

        if (!this.IStransEn) {
            Fpbar_En.addClass("en");
        } else {
            Fpbar_En.removeClass("en");
        }

        $("#" + this.Config.menuBoxid).find("li").removeClass("active");
        $("#" + this.Config.menuBoxid).find("li").eq(this.ItemNum).addClass("active");

    },
    ISItemsShow: false,
    ISMenuAdd: false,
    ISBoxAdd: false,
    status: false,
    ItemNum: 0,
    IStransEn: false,
    up: function () {
        $("#" + this.Config.menuBoxid).slideUp(300);
        this.ISItemsShow = false;

    },
    clear: function () {
        this.status = false;
        $("#browserObj_Fpbar_mian").remove();
        $("#browserObj_Fpbar_mianShow").remove();
        $("#Br_Fping_setting").slideUp(300);
        this.ISItemsShow = false;
        this.show();
    },
    down: function () {

        if (!this.ISItemsShow) {
            if (!this.ISMenuAdd) {
                this.menutoolhtml().appendTo(free_Web.tool_Box);
                this.ISMenuAdd = true;

            }
            $("#" + this.Config.menuBoxid).css("left", ($("#Br_Fping").offset().left - 2) + "px")
                .css("top",
                    ($("#Br_Fping").offset().top - $(document).scrollTop() + $("#Br_Fping").height() + 3) + "px")
                .slideDown(300);
            this.ISItemsShow = true;
            free_Web.Function.audioplay.audio("您已打开显示屏设置开关");

        } else {
            free_Web.Function.audioplay.audio("您已关闭显示屏设置开关");
            this.up();
        }
        this.show();
    },
    FontYs: function (num) {
        if (this.ItemNum != num) {
            switch (num) {
                case 0:
                    free_Web.Function.audioplay.audio("您显示屏已选择简体模式");
                    break;
                case 1:
                    free_Web.Function.audioplay.audio("您显示屏已选择繁体模式");
                    break;
                case 2:
                    this.IStransEn = false;
                    free_Web.Function.audioplay.audio("您显示屏已选择拼音模式");
                    break;
            }
            this.ItemNum = num;
        }
        $("#Br_Fping_setting").slideUp(300);
        this.ISItemsShow = false;
        this.show();
    },
    Start: function () {
        if (free_Web.Function.show.status) {
            if (!this.status) {
                if (!free_Web.IsInsideLabel) {
                    free_Web.Function.InsideLabel.init();
                }
                this.status = true;
                $('<div id="browserObj_Fpbar_mianShow"></div>').css("height", "120px").appendTo(document.body);
                var box = $('<div id="browserObj_Fpbar_mian"></div>').appendTo(document.body);
                this.Config.Fpbar().appendTo(box);
                $("#Fpbar_l").css("width", ($(document.body).width() - 80) + "px");
                $("voice.Shimen-Pointer-Label").each(function (index) {
                    $(this).mouseenter(function () {
                        if (free_Web.Function.Fping.status) {
                            var str = $(this).html();
                            free_Web.Function.Fping.set(str);
                        }
                    });
                });
                free_Web.Function.audioplay.audio("您已开启显示屏功能");
                this.show();
            } else {
                this.clear();;
                free_Web.Function.audioplay.audio("您已关闭显示屏功能");
            }
        }
    },
    set: function (strhtml) {
        if (strhtml.length > 0) {
            if (strhtml.length < 16) {
                $("#tooltips_show").css("font-size", "80px");
            } else if (strhtml.length < 23) {
                $("#tooltips_show").css("font-size", "60px");
            } else if (strhtml.length < 35) {
                $("#tooltips_show").css("font-size", "45px");
            } else if (strhtml.length < 45) {
                $("#tooltips_show").css("font-size", "36px");
            } else {
                $("#tooltips_show").css("font-size", "30px");
            }
            switch (this.ItemNum) {
                case 0:
                    this.IStransEn = true;
                    $("#tooltips_show").html(strhtml);
                    break;
                case 1:
                    this.IStransEn = true;
                    $("#tooltips_show").html($.simplified2traditional(strhtml));
                    break;
                case 2:
                    $("#tooltips_show").css("font-size", "40px");
                    $("#tooltips_show").html(this.trans(strhtml));
                    break;
            }
        }
        this.show();
    },
    trans: function (cc) {
        var str = '<div><ul>';
        var s;
        for (var i = 0; i < cc.length; i++) {
            str += '<li>';
            if (free_Web.pydic.indexOf(cc.charAt(i)) != -1 && cc.charCodeAt(i) > 200) {
                s = 1;
                var py = "";
                while (free_Web.pydic.charAt(free_Web.pydic.indexOf(cc.charAt(i)) + s) != ",") {
                    py += free_Web.pydic.charAt(free_Web.pydic.indexOf(cc.charAt(i)) + s);
                    s++;
                }
                str += '<span>' + py + '</span>';
                str += '<span>' + cc.charAt(i) + '</span>';
            } else {
                str += '<span></span>';
                str += '<span>' + cc.charAt(i) + '</span>';
            }
            str += '</li>';
        }
        str += '</ul></div>';

        return str;
    },
    transEn: function () {
        if (this.ItemNum != 2 && this.IStransEn) {
            $("#tooltips_show").css("font-size", "36px");
            var str = $("#tooltips_show").html();
            if (str.length > 0) {

                $.ajax({
                    url: '/free_Web/trans.aspx',
                    type: 'get',
                    data: { q: encodeURI(str) },
                    dataType: 'json',
                    success: function (data) {
                        if (data.trans_result) {
                            str = data.trans_result[0].dst;
                            $("#tooltips_show").html(str);

                        }
                    }
                });
            }
            this.IStransEn = false;
            this.show();
        }
    }

};