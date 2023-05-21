free_Web.Function.Read = {
    Config: {
        tools: [
            {
                id: "Br_Read",
                fun: "javascript:free_Web.Function.Read.Start();",
                title: "开启指读",
                minTitle: "指读",
                entitle: "关闭指读",
                img: "Br_Read.png",
                key: "Shift+L",
                dir: "voice",
                keycode: 76
            },
            {
                id: "Br_ReadCon",
                fun: "javascript:free_Web.Function.ReadCon.Start();",
                title: "开启连续指读",
                minTitle: "连读",
                entitle: "关闭连续指读",
                img: "Br_ReadCon.png",
                key: "Shift+K",
                dir: "",
                keycode: 75
            },
            {
                id: "Br_Voice",
                fun: "javascript:free_Web.Function.Voice.Start();",
                title: "关闭声音",
                minTitle: "声音",
                entitle: "开启声音",
                img: "Br_Voice.png",
                key: "Shift+V",
                dir: "",
                keycode: 86
            },
            {
                id: "Br_Voice_setting",
                fun: "javascript:free_Web.Function.VoiceSet.Start();",
                title: "指读音量语速设置",
                entitle: "指读音量语速设置",
                img: "Br_Selectcolor.png",
                key: "Shift+M",
                dir: "Br_Voice_setting",
                keycode: 77
            }
        ]
    },
    toolhtml: function () {
        s = "<ul class='Br_UlEven'>";
        for (var i = 0; i < 2; i++) {
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
                "'></a><p class='Br_CName'>" +
                this.Config.tools[i].minTitle +
                "</p></li>";
        }
        s += "</ul><ul class='Br_UlEven Br_UlEven0'>";
        for (var i = 2; i < 4; i++) {
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
        s += "<li class='Br_CName'>声音</li></ul>";
        return $(s);
    },
    show: function () {
        var Br_Read = $("#Br_Read");
        if (this.status) {
            Br_Read.attr("title", "关闭指读(" + this.Config.tools[0].key + ")");
            Br_Read.addClass("active");
        } else {
            Br_Read.attr("title", "开启指读(" + this.Config.tools[0].key + ")");
            Br_Read.removeClass("active");
        }
    },
    clear: function () {
        soundManager.stopAll();
        this.status = false;
        $("voice").removeClass("voice-active");
        this.show();
    },
    status: false,
    isBoundEvent: false,
    Start: function () {
        if (free_Web.Function.show.status) {
            if (!this.status) {
                if (!free_Web.IsInsideLabel) {
                    free_Web.Function.InsideLabel.init();
                }
                free_Web.Function.audioplay.beforeNewPlayer();
                this.status = true;
                free_Web.Function.ReadCon.clear();
                free_Web.Function.audioplay.audio("您已开启指读功能");
                if (!this.isBoundEvent) {
                    this.isBoundEvent = true;
                    $("voice.Shimen-Pointer-Label").each(function (i, ele) {

                        $(ele).mouseenter(function () {
                            if (free_Web.Function.Read.status) {
                                setTimeout(function () {
                                        $("voice").removeClass("voice-active");
                                        $(ele).addClass("voice-active");
                                        var str = $(ele).html().toString().replace(/ /g, '').replace(/&nbsp;/g, '')
                                            .replace(/\s/gi, "");
                                        free_Web.Function.audioplay.audio(str);
                                    },
                                    100);
                            }
                        });

                    });
                }
            } else {
                free_Web.Function.audioplay.audio("您已关闭指读功能");
                this.clear();
            }
            this.show();
        }
    }
};
free_Web.Function.ReadCon = {
    show: function () {
        var Br_Read = $("#Br_ReadCon");
        if (this.status) {
            Br_Read.attr("title", "关闭连续指读(" + free_Web.Function.Read.Config.tools[1].key + ")");
            Br_Read.addClass("active");
        } else {
            Br_Read.attr("title", "开启连续指读(" + free_Web.Function.Read.Config.tools[1].key + ")");
            Br_Read.removeClass("active");
        }
    },
    status: false,
    StartIndex: 0,
    Toolvoice: 0,
    isBoundEvent: false,
    clear: function () {
        this.status = false;
        soundManager.stopAll();
        $("voice").removeClass("voice-active");
        this.show();
    },
    Start: function () {
        if (free_Web.Function.show.status) {
            if (!this.status) {
                if (!free_Web.IsInsideLabel) {
                    free_Web.Function.InsideLabel.init();
                }
                free_Web.Function.audioplay.beforeNewPlayer();
                this.status = true;
                free_Web.Function.Read.clear();
                free_Web.Function.audioplay.audio("您已开启连续指读功能,请您先选择起始指读位置");
                this.Toolvoice = $("voice.Shimen-Pointer-Label").length;
                if (!this.isBoundEvent) {
                    this.isBoundEvent = true;
                    $("voice.Shimen-Pointer-Label").each(function (i, ele) {
                        $(ele).mouseenter(function () {
                            free_Web.Function.ReadCon.StartIndex = i;
                            free_Web.Function.ReadCon.ReadFrist();
                        });
                    });
                }
            } else {
                free_Web.Function.audioplay.audio("您已关闭连续指读功能");
                this.clear();
            }
            this.show();
        }
    },
    ReadNext: function () {
        if (free_Web.Function.ReadCon.status) {
            this.StartIndex++;
            if (this.StartIndex < this.Toolvoice) {
                setTimeout(function () {
                        $("voice").removeClass("voice-active");
                        var obj = $("voice.Shimen-Pointer-Label").eq(free_Web.Function.ReadCon.StartIndex);
                        obj.addClass("voice-active");
                        var str = obj.html().toString().replace(/ /g, '').replace(/&nbsp;/g, '').replace(/\s/gi, "");
                        free_Web.Function.audioplay.audioCon(str);
                    },
                    200);
            } else {
                free_Web.Function.audioplay.audio("您已关闭连续指读功能");
                this.StartIndex = 0;
            }
        }
    },
    ReadFrist: function () {
        if (free_Web.Function.ReadCon.status) {
            setTimeout(function () {
                    $("voice").removeClass("voice-active");
                    var obj = $("voice.Shimen-Pointer-Label").eq(free_Web.Function.ReadCon.StartIndex);
                    obj.addClass("voice-active");
                    var str = obj.html().toString().replace(/ /g, '').replace(/&nbsp;/g, '').replace(/\s/gi, "");
                    free_Web.Function.audioplay.audioCon(str);
                },
                0);
        }
    }
};
free_Web.Function.Voice = {
    show: function () {
        var Br_Read = $("#Br_Voice");
        if (!this.status) {
            Br_Read.find("img").attr("src", "/free_Web/images/Br_Voice_en.png");
            Br_Read.attr("title", "打开声音(" + free_Web.Function.Read.Config.tools[2].key + ")");

        } else {
            Br_Read.find("img").attr("src", "/free_Web/images/Br_Voice.png");
            Br_Read.attr("title", "关闭声音(" + free_Web.Function.Read.Config.tools[2].key + ")");
        }
    },
    status: true,
    Start: function () {
        if (free_Web.Function.show.status) {
            if (!this.status) {
                this.status = true;
                free_Web.Function.audioplay.UnMute();

            } else {
                this.status = false;
                free_Web.Function.audioplay.Mute();
            }
            this.show();
        }
    }
};
free_Web.Function.VoiceSet = {
    Config: {
        tools: [
            {
                info: { title: "音量", id: "player_volume_info" },
                down: {
                    id: "player_volume_down",
                    title: "减少音量",
                    fun: "javascript:free_Web.Function.VoiceSet.Volume(-1)",
                    key: "Shift+‘－’",
                    keycode: 189
                },
                up: {
                    id: "player_volume_up",
                    title: "增加音量",
                    fun: "javascript:free_Web.Function.VoiceSet.Volume(1)",
                    key: "Shift+‘+’",
                    keycode: 187
                }
            }, {
                info: { title: "语速", id: "player_speed_info" },
                down: {
                    id: "player_speed_down",
                    title: "增加语速",
                    fun: "javascript:free_Web.Function.VoiceSet.SpeedStart(-1)",
                    key: "Shift+9",
                    keycode: 57
                },
                up: {
                    id: "player_speed_up",
                    title: "减少语速",
                    fun: "javascript:free_Web.Function.VoiceSet.SpeedStart(1)",
                    key: "Shift+0",
                    keycode: 48
                }
            }
        ]
    },
    toolhtml: function () {
        var s = "<div id='Br_Voice_setting_box'  dir='" + free_Web.Function.Read.Config.tools[3].dir + "'>";
        for (var i = 0; i < this.Config.tools.length; i++) {
            s += "<div dir='" +
                free_Web.Function.Read.Config.tools[3].dir +
                "'><h3  dir='" +
                free_Web.Function.Read.Config.tools[3].dir +
                "'>" +
                this.Config.tools[i].info.title +
                "：</h3><ul>";
            s += "<li  dir='" +
                free_Web.Function.Read.Config.tools[3].dir +
                "'><a id='" +
                this.Config.tools[i].down.id +
                "' href='" +
                this.Config.tools[i].down.fun +
                "' title='" +
                this.Config.tools[i].down.title +
                "（" +
                this.Config.tools[i].down.key +
                "）' dir='" +
                free_Web.Function.Read.Config.tools[3].dir +
                "'> - </a></li>";
            s += "<li class='Br_Voice_setting_info'  dir='" +
                free_Web.Function.Read.Config.tools[3].dir +
                "' id='" +
                this.Config.tools[i].info.id +
                "'></li>";
            s += "<li  dir='" +
                free_Web.Function.Read.Config.tools[3].dir +
                "'><a id='" +
                this.Config.tools[i].up.id +
                "' href='" +
                this.Config.tools[i].up.fun +
                "' title='" +
                this.Config.tools[i].up.title +
                "（" +
                this.Config.tools[i].up.key +
                "）' dir='" +
                free_Web.Function.Read.Config.tools[3].dir +
                "'> + </a></li>";
            s += "</ul></div>";
        }
        s += "</div>";
        return $(s);
    },
    show: function () {
        var player_volume_down = $("#player_volume_down");
        var player_volume_up = $("#player_volume_up");
        var VolumeNum = free_Web.Function.audioplay.VolumeNum;
        if (VolumeNum >= 100) {
            player_volume_up.addClass("en");
        } else {
            player_volume_up.removeClass("en");
        };

        if (VolumeNum <= 0) {
            player_volume_down.addClass("en");
        } else {
            player_volume_down.removeClass("en");
        }

        var player_speed_down = $("#player_speed_down");
        var player_speed_up = $("#player_speed_up");
        var speedNum = free_Web.Function.audioplay.speed;
        if (speedNum >= 10) {
            player_speed_up.addClass("en");
        } else {
            player_speed_up.removeClass("en");
        };

        if (speedNum <= 1) {
            player_speed_down.addClass("en");
        } else {
            player_speed_down.removeClass("en");
        }

    },
    ISItemsShow: false,
    ISMenuAdd: false,
    up: function () {
        $("#Br_Voice_setting_box").slideUp(300);
        this.ISItemsShow = false;

    },
    Start: function () {
        if (free_Web.Function.show.status) {
            if (!this.ISItemsShow) {
                if (!this.ISMenuAdd) {
                    this.toolhtml().appendTo(free_Web.tool_Box);
                    this.ISMenuAdd = true;
                }
                $("#Br_Voice_setting_box").css("left", ($("#Br_Read").offset().left - 2) + "px")
                    .css("top",
                        ($("#Br_Read").offset().top - $(document).scrollTop() + $("#Br_Read").height() + 3) + "px")
                    .slideDown(300);
                this.ISItemsShow = true;
                $("#" + this.Config.tools[0].info.id).html(free_Web.Function.audioplay.VolumeNum);
                $("#" + this.Config.tools[1].info.id).html(free_Web.Function.audioplay.speed);
                //free_Web.Function.audioplay.audio("您已打开指读音量语速设置");
            } else {
                //free_Web.Function.audioplay.audio("您已关闭指读音量语速设置");
                this.up();

            }
            this.show();
            //free_Web.Function.audioplay.Volume(20);
        }
    },
    Volume: function (num) {
        var VolumeNum = free_Web.Function.audioplay.VolumeNum;
        if (num > 0 && VolumeNum < 100) {
            VolumeNum = VolumeNum + 10;
            free_Web.Function.audioplay.Volume(VolumeNum);
            $("#" + this.Config.tools[0].info.id).html(free_Web.Function.audioplay.VolumeNum);
        }
        if (num < 0 && VolumeNum > 0) {
            VolumeNum = VolumeNum - 10;
            free_Web.Function.audioplay.Volume(VolumeNum);
            $("#" + this.Config.tools[0].info.id).html(free_Web.Function.audioplay.VolumeNum);
        }
        this.show();
    },
    SpeedStart: function (num) {
        var speedNum = free_Web.Function.audioplay.speed;
        if (num > 0 && speedNum < 10) {
            speedNum = speedNum + 1;
            free_Web.Function.audioplay.speed = speedNum;
            $("#" + this.Config.tools[1].info.id).html(free_Web.Function.audioplay.speed);
        }
        if (num < 0 && speedNum > 1) {
            speedNum = speedNum - 1;
            free_Web.Function.audioplay.speed = speedNum;
            $("#" + this.Config.tools[1].info.id).html(free_Web.Function.audioplay.speed);
        }
        this.show();
    }
};