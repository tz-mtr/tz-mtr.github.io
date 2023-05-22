var browserKeys = new Object();
//键盘事件监听--------------------------------------
document.addEventListener('keydown',
    function keyListener(e) {
        var currkey = 0,
            e = e || event;
        currkey = e.keyCode || e.which || e.charCode;
        if (e.ctrlKey && e.altKey && currkey == 66) {
            free_Web.Function.show.Start();
        } else {
            if (free_Web.Function.show.status) {
                browserKeys.keyboardListener(e.ctrlKey, e.altKey, e.shiftKey, currkey);
            }
        }
    });

//工具条键盘监听------------------------------------
browserKeys.keyboardListener = function (ctrlKey, altKey, shiftKey, otherKey) {
    if (free_Web.Function.show.status) {
        //页面放大
        if (shiftKey && otherKey == free_Web.Function.pageZoom.Config.tools[0].keycode) //页面放大
        {
            free_Web.Function.pageZoom.Start(1);
        }
        if (shiftKey && otherKey == free_Web.Function.pageZoom.Config.tools[2].keycode) //页面缩小
        {
            free_Web.Function.pageZoom.Start(-1);
        }
        if (shiftKey && otherKey == free_Web.Function.pageZoom.Config.tools[1].keycode) //页面还原
        {
            free_Web.Function.pageZoom.Start(0);
        }
        //字体放大
        if (shiftKey && otherKey == free_Web.Function.FontZoom.Config.tools[0].keycode) //字体放大
        {
            free_Web.Function.FontZoom.Start(1);
        }
        if (shiftKey && otherKey == free_Web.Function.FontZoom.Config.tools[2].keycode) //字体缩小
        {
            free_Web.Function.FontZoom.Start(-1);
        }
        if (shiftKey && otherKey == free_Web.Function.FontZoom.Config.tools[1].keycode) //字体还原
        {
            free_Web.Function.FontZoom.Start(0);
        }
        //纯文本模式
        if (shiftKey && otherKey == free_Web.Function.textMode.Config.keycode) {
            free_Web.Function.textMode.Start();
        }
        //页面换色选择
        if (shiftKey && otherKey == free_Web.Function.Br_ChangBg.Config.keycode) {
            free_Web.Function.Br_ChangBg.Down();
        }
        //页面换色
        for (var i = 0; i <= 4; i++) {
            if (shiftKey && otherKey == free_Web.Function.Br_ChangBg.Config.items[i].keycode) //原始
            {
                free_Web.Function.Br_ChangBg.Start(i);
            }
        }

        //开启辅助线
        if (shiftKey && otherKey == free_Web.Function.guides.Config.tools[0].keycode) {
            free_Web.Function.guides.Start();
        }
        //开启辅助线颜色选择
        if (shiftKey && otherKey == free_Web.Function.guides.Config.tools[1].keycode) {
            free_Web.Function.guides.Down();
        }

        //开启显示屏
        if (shiftKey && otherKey == free_Web.Function.Fping.Config.tools[0].keycode) {
            free_Web.Function.Fping.Start();
        }
        //开启显示屏设置
        if (shiftKey && otherKey == free_Web.Function.Fping.Config.tools[1].keycode) {
            free_Web.Function.Fping.down();
        }
        //显示屏模式设置
        for (var i = 0; i < free_Web.Function.Fping.Config.setting.length; i++) {
            if (shiftKey && otherKey == free_Web.Function.Fping.Config.setting[i].keycode) //原始
            {
                free_Web.Function.Fping.FontYs(i);
            }
        }
        //指读
        if (shiftKey && otherKey == free_Web.Function.Read.Config.tools[0].keycode) {
            free_Web.Function.Read.Start();
        }
        //连续指读
        if (shiftKey && otherKey == free_Web.Function.Read.Config.tools[1].keycode) {
            free_Web.Function.ReadCon.Start();
        }
        //静音切换
        if (shiftKey && otherKey == free_Web.Function.Read.Config.tools[2].keycode) {
            free_Web.Function.Voice.Start();
        }
        //静音切换
        if (shiftKey && otherKey == free_Web.Function.Read.Config.tools[3].keycode) {
            free_Web.Function.VoiceSet.Start();
        }
        //增加音量
        if (shiftKey && otherKey == free_Web.Function.VoiceSet.Config.tools[0].up.keycode) {
            free_Web.Function.VoiceSet.Volume(1);
        }
        //减少音量
        if (shiftKey && otherKey == free_Web.Function.VoiceSet.Config.tools[0].down.keycode) {
            free_Web.Function.VoiceSet.Volume(-1);
        }
        if (shiftKey && otherKey == free_Web.Function.VoiceSet.Config.tools[1].up.keycode) {
            free_Web.Function.VoiceSet.SpeedStart(1);
        }
        if (shiftKey && otherKey == free_Web.Function.VoiceSet.Config.tools[1].down.keycode) {
            free_Web.Function.VoiceSet.SpeedStart(-1);
        }

    }
};