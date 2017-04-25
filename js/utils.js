var Utils = {
    addEvent: function (dom, type, fn) {
        // 惰性模式
        if (dom.addEventListener) {
            Utils.addEvent = function (dom, type, fn) {
                dom.addEventListener(type, fn, false);
            }
        } else if (dom.attachEvent) {
            Utils.addEvent = function (dom, type, fn) {
                dom.attachEvent('on' + type, fn);
            }
        } else {
            Utils.addEvent = function (dom, type, fn) {
                dom['on' + type] = fn;
            }
        }

        Utils.addEvent(dom, type, fn);
    },
    getClientHeight: function () {
        var clientHeight = 0;
        if (document.body.clientHeight && document.documentElement.clientHeight) {
            clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        } else {
            clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        }
        return clientHeight;
    },
    getScrollTop: function () {
        var scrollTop = 0;
        scrollTop = (document.body.scrollTop > document.documentElement.scrollTop) ? document.body.scrollTop : document.documentElement.scrollTop;
        return scrollTop;
    }
}