/**
 * 对话框组件
 */

// 模态框抽象类
var Modal = function () {
    // 组件根元素
    this.element = null;
}

// 对话框组件
var Dialog = function (title) {
    Modal.call(this);
    this.title = title;
    this.form = null;
    this.content = null;
    this.container = null;
    this.init();
}
Dialog.prototype = {
    // 初始化
    init: function () {
        this.element = document.createElement('div');
        this.element.className = 'dialog';
        this.content = document.createElement('div');
        this.content.className = 'col-md-6 col-md-offset-3';
        var header = document.createElement('h3');
        header.innerHTML = this.title;
        this.content.appendChild(header);
    },
    // 构建对话框
    build: function () {
        this.container = document.createElement('div');
        this.container.className = 'container-fluid dialog-content';
        this.container.appendChild(this.content);
        var dialogBack = document.createElement('div');
        dialogBack.className = 'dialog-bg';
        var that = this;
        dialogBack.onclick = function () {
            that.hide();
        }
        this.element.appendChild(dialogBack);
        this.element.appendChild(this.container);
        this.hide();
        document.getElementsByClassName('dialog-field')[0].appendChild(this.element);
        return this;
    },
    // 添加组件
    add: function (child) {
        this.form = this.content.appendChild(child.getElement());
        return this;
    },
    // 隐藏对话框
    hide: function () {
        this.element.style.display = 'none';
    },
    // 显示对话框
    show: function () {
        this.element.style.display = 'block';
        console.log(this.container.clientHeight);
        this.container.style.top = (Utils.getClientHeight() - this.container.clientHeight)/2 + 'px';     
    }
}

// 对话框表单组件
var DialogForm = function (id, action, type, hasFile) {
    Modal.call(this);
    this.id = id;
    this.action = action;
    this.type = type;
    this.hasFile = hasFile;
    this.init();
}
DialogForm.prototype = {
    init: function () {
        this.element = document.createElement('form');
        this.id && (this.element.id = this.id);
        this.element.action = this.action;
        this.element.type = this.type;
        this.hasFile && (this.element.enctype = 'multipart/form-data');

        this.inputContainer = document.createElement('div');
        this.inputContainer.className = 'col-md-6';
        this.buttonGroup = document.createElement('div');
        this.buttonGroup.className = 'dialog-btn-group';
    },
    // 添加input组件
    addInput: function (child) {
        this.inputContainer.appendChild(child.getElement());
        return this;
    },
    // 添加按钮
    addButton: function (child) {
        this.buttonGroup.appendChild(child.getElement());
        return this;
    },
    // 构建并获取当前组件
    getElement: function () {
        var buttonContainer = document.createElement('div');
        buttonContainer.className = 'col-md-12';
        var formInfo = document.createElement('p');
        formInfo.className = 'dialog-form-info';
        var clearFix = document.createElement('div');
        clearFix.className = 'clearfix';

        this.element.appendChild(this.inputContainer);
        this.element.appendChild(clearFix);
        buttonContainer.appendChild(formInfo);
        buttonContainer.appendChild(this.buttonGroup);
        this.element.appendChild(buttonContainer);
        return this.element;
    }
}

// 对话框文本输入框组件
var DialogTextInput = function (id, className, name, type, label, placeholder, value) {
    Modal.call(this);
    this.id = id;
    this.className = className;
    this.name = name;
    this.type = type;
    this.label = label;
    this.placeholder = placeholder;
    this.value = value;
    this.init();
}
DialogTextInput.prototype = {
    init: function () {
        this.element = document.createElement('div');
        this.element.className = 'dialog-input-group';
        var label = document.createElement('p');
        label.innerHTML = this.label;
        var input = document.createElement('input');
        this.id && (input.id = this.id);
        this.className && (input.className = this.className);
        this.name && (input.name = this.name);
        this.type && (input.type = this.type);
        this.placeholder && (input.placeholder = this.placeholder);
        this.value && (input.value = this.value);
        this.element.appendChild(label);
        this.element.appendChild(input);
    },
    // 获取当前组件
    getElement: function () {
        return this.element;
    }
}

// 对话框按钮组件
var DialogButton = function (id, className, type, value) {
    Modal.call(this);
    this.id = id;
    this.className = className;
    this.type = type;
    this.value = value;
    this.init();
}
DialogButton.prototype = {
    init: function () {
        this.element = document.createElement('button');
        this.id && (this.element.id = this.id);
        this.className && (this.element.className = this.className);
        this.element.type = this.type ? this.type : 'button';
        this.value && (this.element.innerHTML = this.value);
    },
    // 获取当前组件
    getElement: function () {
        return this.element;
    },
    // 为按钮注册事件监听器
    bindEvent: function (type, fn) {
        Utils.addEvent(this.element, type, fn);
        return this;
    }
}

// 对话框工厂类（使用单例模式、惰性模式、缓存机制）
var DialogFactory = (function () {
    // 缓存已创建对话框
    var cache = {};
    // 对话框生成库
    var component = {
        'login': (function () {
            var dialog = new Dialog('登录');
            dialog.add(
                new DialogForm('login-form', 'login.action', 'post', false).
                    addInput(new DialogTextInput('', '', '', 'text', '用户名', '', '')).
                    addInput(new DialogTextInput('', '', '', 'password', '密码', '', '')).
                    addButton(new DialogButton('', '', '', '取消').bindEvent('click', function () {
                        dialog.hide();
                    })).
                    addButton(new DialogButton('', '', 'submit', '登录'))
            );
            return dialog;
        })(),
        'register': (function () {
            var dialog = new Dialog('注册');
            dialog.add(
                new DialogForm('register-form', 'register.action', 'post', false).
                    addInput(new DialogTextInput('', '', '', 'text', '用户名', '', '')).
                    addInput(new DialogTextInput('', '', '', 'password', '密码', '', '')).
                    addInput(new DialogTextInput('', '', '', 'password', '再次输入密码', '', '')).
                    addButton(new DialogButton('', '', '', '取消').bindEvent('click', function () {
                        dialog.hide();
                    })).
                    addButton(new DialogButton('', '', 'submit', '注册'))
            );
            return dialog;
        })()
    }
    return {
        // 获取缓存对话框或新建对话框
        get: function (name) {
            cache[name] || (cache[name] = component[name].build());
            return cache[name];
        }
    }
})();