/**
 * admin 后台通用JS 封装
 */
var admin = {
    layer: window.top.layer,
    init: function () {
        admin.ajaxFilter();
        admin.onError();
        jQuery(function () { });
    },
    ajaxFilter: function () {
        jQuery(document).ajaxStart(function () {
            //admin.loading.start();
        });
        jQuery(document).ajaxSend(function () {
            //admin.loading.end();
        });
        jQuery(document).ajaxSuccess(function () { });
        jQuery(document).ajaxComplete(function (event, xhr, options) { });
        jQuery(document).ajaxError(function (event, xhr, options, exc) {
            //event - 包含 event 对象
            //xhr - 包含 XMLHttpRequest 对象
            //options - 包含 AJAX 请求中使用的选项
            //exc - 包含 JavaScript exception
            admin.loading.end();
            //var text = xhr.responseText;
            //var json = JSON.parse(text);
            //if (json.status !== 10 && json.status !== 20 && json.status !== 30 && json.status !== 50) {
            //    throw new Error("ajax请求错误!");
            //}
        });
        jQuery(document).ajaxStop(function () { });
    },
    //异常捕获
    onError: function () {
        window.onerror = function (msg, url, line, col, error) {
            //alert(msg);
        }
    },

    /**
     * 信心提示框
     * @param content 显示内容
     * @param type 警告/成功/错误/提醒
     * @param time 多少秒之后自动关闭，0不关闭
     * @param end 关闭之后的回调执行函数
     */
    msg: function (content, type, time, end) {
        if (type == "警告")
            return admin.layer.msg(content, { icon: 0, offset: "t", time: time || 2 * 1000, end: end });
        else if (type == "成功")
            return admin.layer.msg(content, { icon: 1, offset: "t", time: time || 2 * 1000, end: end });
        else if (type == "错误")
            return admin.layer.msg(content, { icon: 2, offset: "t", time: time || 2 * 1000, end: end });
        else
            return admin.layer.msg(content, { offset: "auto", time: time || 2 * 1000, end: end });
    },

    /**
     * 系统会话消息弹出框
     * @param content 显示内容
     * @param type 警告/成功/错误/提醒
     * @param title 窗口标题
     */
    alerts: function (content, type, title) {
        if (type == "警告")
            return admin.layer.alert(content, { icon: 0, offset: "c", title: title || "警告" });
        else if (type == "成功")
            return admin.layer.alert(content, { icon: 1, offset: "c", title: title || "成功" });
        else if (type == "错误")
            return admin.layer.alert(content, { icon: 2, offset: "c", title: title || "错误" });
        else
            return admin.layer.alert(content, { offset: "c", title: title || "提醒" });
    },
    /**
     * 系统会话消息弹出框并刷新
     * @param content 显示内容
     * @param type 警告/成功/错误/提醒
     * @param title 窗口标题
     */
    alert_close: function (content, type, title) {
        if (type == "警告")
            return admin.layer.alert(content, { icon: 0, offset: "c", title: title || "警告" });
        else if (type == "成功")
            return admin.layer.alert(content, { icon: 1, offset: "c", title: title || "成功", end: function () { window.location.reload(true); } });
        else if (type == "错误")
            return admin.layer.alert(content, { icon: 2, offset: "c", title: title || "错误" });
        else
            return admin.layer.alert(content, { offset: "c", title: title || "提醒" });
    },
    /**
    * 询问框
    * @param content 显示内容
    * @param yes 点击确定 执行回调函数
    * @param cancel 点击取消 执行回调函数
    * @param title 窗口标题
    **/
    confirm: function (content, yes, cancel, title) {
        admin.layer.confirm(content, { icon: 3, offset: "auto", title: title || "提醒" }, yes, cancel);
    },

    /**
     * 加载
     **/
    loading: {
        index: 0,
        start: function (content, time) {
            this.index = admin.layer.load(0, { shade: [0.1, "#fff"], time: time || 600 * 60 * 1000 });
        },
        end: function () {
            var _this = this;
            admin.layer.close(_this.index);
        }
    },

    /**
     * 弹出窗口
     * @param url 打开页面地址
     * @param title 窗口标题
     * @param width 窗口宽度
     * @param height 窗口高度
     * @param close 窗口关闭之后的回调函数
     **/
    popup: function (url, title, width, height, close) {
        layer.open({
            type: 2,
            title: title,
            area: [width, height],
            anim: 2,
            maxmin: true,
            content: url,
            end: close
        });
    },
    /**
     * 弹出窗口
     * @param title 窗口标题
     * @param width 窗口宽度
     * @param height 窗口高度
     * @param close 窗口关闭之后的回调函数
     **/
    popup_div: function (title, close) {
        layer.prompt({ title: title, formType: 2 }, close);
    },
    /**
     * ajax post请求
     * @param url 请求URL地址
     * @param data 请求参数
     * @param success 请求成功执行函数
     * @param complete 请求完成执行函数
     **/
    ajaxPost: function (url, data, success, complete) {
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            dataType: "JSON",
            success: success,
            error: function (xhr, status, error) {
                console.log("请求失败！请检查网络连接...");
            },
            complete: complete
        });
    },

    /**
    * ajax get请求
    * @param url 请求URL地址
    * @param data 请求参数
    * @param success 请求成功执行函数
    * @param complete 请求完成执行函数
    **/
    ajaxGet: function (url, data, success, complete) {
        $.ajax({
            type: "GET",
            url: url,
            data: data,
            dataType: "JSON",
            success: success,
            error: function (xhr, status, error) {
                console.log("请求失败！请检查网络连接...");
            },
            complete: complete
        });
    },

    /**
     * ajax get 定时执行请求
     * 每3秒执行，无限次，并命名计时器名称为C
     * 若时间间隔抵到，但函式程序仍未完成则需等待执行函式完成后再继续计时
     * 需要插件支持（jquery.timers-1.2.js）
     * @param time 定时执行间隔 2das：每20秒,3s:每3秒,1s:每1秒
     * @param url 请求URL地址
     * @param data 请求参数
     * @param success 请求成功执行函数
     * @param complete 请求完成执行函数
     **/
    ajaxGetTimer: function (time, url, data, success, complete) {
        time = time || '3s';
        $('body').everyTime(time, 'Tget', function () {
            $.ajax({
                url: url,
                async: true,
                data: data,
                dataType: "JSON",
                success: success,
                complete: complete
            });
        }, 0, true);
    },

    /**
     * 格式化HTML模板
     * @param _data 数据
     * @param _tmpl 模板
     */
    formatTemplate: function (_data, _tmpl) {
        var format = {
            name: function (x) {
                return x
            }
        };
        return _tmpl.replace(/{{(\w+)}}/g, function (m1, m2) {
            if (!m2)
                return "";
            return (format && format[m2]) ? format[m2](_data[m2]) : _data[m2];
        }).replace(/{(\w+)}/g, function (m1, m2) {
            if (!m2)
                return "";
            return (format && format[m2]) ? format[m2](_data[m2]) : _data[m2];
        });
    },

    /**
     * 对Date的扩展，将 Date 转化为指定格式的String
     * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
     * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
     * 例子： 
     * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
     * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
     * @param {Date} fmt 日期
     **/
    formatDate: function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
};

$(function () {
    //框架初始化
    admin.init();
});

/**
 * Jquery拓展序列化数据为JSON对象
 * */
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};  　
