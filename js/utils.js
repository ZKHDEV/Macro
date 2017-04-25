/**
 * 工具集
 */
var Utils = {
    // 注册事件监听器（惰性模式）
    addEvent: function (dom, type, fn) {
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
    // 获取可视区域高度
    getClientHeight: function () {
        var clientHeight = 0;
        if (document.body.clientHeight && document.documentElement.clientHeight) {
            clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        } else {
            clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        }
        return clientHeight;
    },
    // 获取页面高度
    getScrollTop: function () {
        var scrollTop = 0;
        scrollTop = (document.body.scrollTop > document.documentElement.scrollTop) ? document.body.scrollTop : document.documentElement.scrollTop;
        return scrollTop;
    },
    // 检测当前浏览器
    browserSupport: function() {
		var browser = this.getBrowser(),
			temp = browser.split(' '),
			appname = temp[0],
			version = temp[1];
		if (['msie', 'firefox', 'opera', 'safari', 'chrome'].contains(appname)) {
			if (appname == 'msie' && version < 10) {
				alert('请使用IE10及以上浏览器访问此页面！');
			}
		} else {
			// Do Nothing
		}
	},
	// 获取浏览器信息
	getBrowser: function() {
		var browser = {
			msie: false,
			firefox: false,
			opera: false,
			safari: false,
			chrome: false,
			netscape: false,
			appname: 'unknown',
			version: 0
		}, ua = window.navigator.userAgent.toLowerCase();
		if (/(msie|firefox|opera|chrome|netscape)\D+(\d[\d.]*)/.test(ua)) {
			browser[RegExp.$1] = true;
			browser.appname = RegExp.$1;
			browser.version = RegExp.$2;
		} else if (/version\D+(\d[\d.]*).*safari/.test(ua)){ // safari
			browser.safari = true;
			browser.appname = 'safari';
			browser.version = RegExp.$2;
		}
		return browser.appname + ' ' + browser.version;
	}
}