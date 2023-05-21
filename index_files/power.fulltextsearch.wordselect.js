﻿var associativeWordTimeout = null;
$(function () {
    /**
    * 设置智能标签跳转点击事件。
    */
    $(".smart-tags a").on("click", setSearchUrl);
    /**
    * 设置搜索排行跳转点击事件。
    */
    $(".s-top-ranking a").on("click", setSearchUrl);
    /**
    * 设置热门搜索跳转点击事件。
    */
    $(".s-hot-search a").on("click", setSearchUrl);

    function setSearchUrl() {
        var url = $(this).data("searchurl");
        validateCode(function () {
            var captchaTicketId = $("input[name=CaptchaTicketId]").val();
            var captchaTicket = $("input[name=CaptchaTicket]").val();
            window.location.href = url += '&cti=' + captchaTicketId + '&ct=' + captchaTicket;
        }, false);
    }

    $("input[name=wd]").on('click',
        function (e) {
            GetAssociativeWord();
            e.stopPropagation();
        });

    $("input[name=wd]").on('input',
        function (e) {
            e = window.event || e;
            // 忽略上下方向键。
            if (e.keyCode == 38 || e.keyCode == 40) {
                return;
            }
            clearTimeout(associativeWordTimeout);
            associativeWordTimeout = setTimeout(GetAssociativeWord, 300);
            e.stopPropagation();
        });

    $(document).on('click',
        '.dropdown-word ul li',
        function () {
            $("input[name=wd]").val($(this).html());
            $(".dropdown-word").hide();
            $(".search").trigger("click");
            var event = jQuery.Event("keydown"); //模拟一个键盘回车事件
            event.keyCode = 13;
            $("input[name=wd]").trigger(event);
        });

    $(document).on('click',
        function () {
            $(".dropdown-word").hide();
        });

    $(".dropdown-word").registerKeyControll({
        callback: function (data) {
            $("input[name=wd]").val(data);
        }
    });
});

function GetAssociativeWord() {
    var keyword = $("input[name=wd]").val();
    if (keyword != "") {
        $.ajax({
            url: $("input[name=wd]").attr("data-url"),
            data: { keyword: keyword },
            type: "get",
            cache: false,
            success: function (data) {
                $(".dropdown-word ul li").remove();
                if (typeof(data) != "object") {
                    alert(data);
                    return;
                }

                if (data.length > 0) {
                    $(".dropdown-word").show();
                    var associativeWordHtml = "";
                    for (var i = 0; i < data.length; i++) {
                        associativeWordHtml += "<li>" + data[i].SearchKeyword + "</li>";
                    }

                    $(".dropdown-word ul").append(associativeWordHtml);
                } else {
                    $(".dropdown-word").hide();
                }
            }
        });
    } else {
        $(".dropdown-word").hide();
    }
}

(function ($) {
    $.fn.registerKeyControll = function (opt) {
        if ($(this).length == 0) {
            return false;
        }
        var opts = $.extend({
                defaultIndex: -1, //默认选中项
                callback: function () {} //选择完毕后触发回调
            },
            opt);

        var list = $(this);
        var index = opts.defaultIndex;
        $(document).on('keydown',
            function (e) {
                e = window.event || e;
                if ($(list).find('ul li').length <= 0) {
                    return;
                }

                if (e.keyCode == 38) {
                    resetIndex();
                    sPrevIndex();
                    for (var i = 0,
                        len = $(list).find('ul li').length;
                        i < len;
                        i++) {
                        $(list).find('ul li')[i].className = i == index ? "current-selectword" : "";
                    }
                    opts.callback($(list).find('ul li')[index].innerHTML);
                }

                if (e.keyCode == 40) {
                    resetIndex();
                    sNextIndex();
                    for (var i = 0,
                        len = $(list).find('ul li').length;
                        i < len;
                        i++) {
                        $(list).find('ul li')[i].className = i == index ? "current-selectword" : "";
                    }
                    opts.callback($(list).find('ul li')[index].innerHTML);
                }

            });

        $(list).on('mouseover',
            function () {
                for (var i = 0,
                    len = $(list).find('ul li').length;
                    i < len;
                    i++) {
                    $(list).find('ul li')[i].className = "";
                }
            });

        function sNextIndex() {
            index = index >= $(list).find('ul li').length - 1 ? 0 : index + 1;
            return index;
        }

        function sPrevIndex() {
            index = index <= 0 ? $(list).find('ul li').length - 1 : index - 1;
            return index;
        }

        function resetIndex() {
            var hasSelect = false;
            for (var i = 0,
                len = $(list).find('ul li').length;
                i < len;
                i++) {
                if ($(list).find('ul li')[i].className == "current-selectword") {
                    hasSelect = true;
                    break;
                }
            }

            if (!hasSelect) {
                index = -1;
            }
        }
    };
})(jQuery);