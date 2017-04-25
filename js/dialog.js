// 模态框抽象类
var Modal = function () {
    this.element = null;
}

// 对话框
var Dialog = function (title) {
    Modal.call(this);
    this.title = title;
    this.form = null;
    this.init();
}

Dialog.prototype = {
    init: function () {
        this.element = document.createElement('div');
        this.element.className = 'dialog';
        this.content = document.createElement('div');
        this.content.className = 'col-md-6 col-md-offset-3';
        var header = document.createElement('h3');
        header.innerHTML = this.title;
        this.content.appendChild(header);
    },
    build: function () {
        var container = document.createElement('div');
        container.className = 'container-fluid dialog-content';
        container.appendChild(this.content);
        var dialogBack = document.createElement('div');
        dialogBack.className = 'dialog-bg';
        var that = this;
        dialogBack.onclick = function () {
            that.hide();
        }
        this.element.appendChild(dialogBack);
        this.element.appendChild(container);
        this.hide();
        document.getElementsByClassName('dialog-field')[0].appendChild(this.element);
        return this;
    },
    add: function (child) {
        this.form = this.content.appendChild(child.getElement());
        return this;
    },
    hide: function () {
        this.element.style.display = 'none';
    },
    show: function () {
        this.element.style.display = 'block';
    }
}

var Form = function (id, action, type, hasFile) {
    Modal.call(this);
    this.id = id;
    this.action = action;
    this.type = type;
    this.hasFile = hasFile;
    this.init();
}

Form.prototype = {
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
    addInput: function (child) {
        this.inputContainer.appendChild(child.getElement());
        return this;
    },
    addButton: function (child) {
        this.buttonGroup.appendChild(child.getElement());
        return this;
    },
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

var TextInput = function (id, className, name, type, label, placeholder, value) {
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
TextInput.prototype = {
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
    getElement: function () {
        return this.element;
    }
}

var Button = function (id, className, type, value) {
    Modal.call(this);
    this.id = id;
    this.className = className;
    this.type = type;
    this.value = value;
    this.init();
}
Button.prototype = {
    init: function () {
        this.element = document.createElement('button');
        this.id && (this.element.id = this.id);
        this.className && (this.element.className = this.className);
        this.element.type = this.type ? this.type : 'button';
        this.value && (this.element.innerHTML = this.value);
    },
    getElement: function () {
        return this.element;
    },
    bindEvent: function (type, fn) {
        Utils.addEvent(this.element, type, fn);
        return this;
    }
}

// 单例模式、懒加载、缓存机制
var DialogFactory = (function () {
    var cache = {};
    var component = {
        'login': (function () {
            var dialog = new Dialog('登录');
            dialog.add(
                new Form('login-form', 'login.action', 'post', false).
                    addInput(new TextInput('', '', '', 'text', '用户名', '', '')).
                    addInput(new TextInput('', '', '', 'password', '密码', '', '')).
                    addButton(new Button('', '', '', '取消').bindEvent('click', function () {
                        dialog.hide();
                    })).
                    addButton(new Button('', '', 'submit', '登录'))
            );
            return dialog;
        })(),
        'register': (function () {
            var dialog = new Dialog('注册');
            dialog.add(
                new Form('register-form', 'register.action', 'post', false).
                    addInput(new TextInput('', '', '', 'text', '用户名', '', '')).
                    addInput(new TextInput('', '', '', 'password', '密码', '', '')).
                    addInput(new TextInput('', '', '', 'password', '再次输入密码', '', '')).
                    addButton(new Button('', '', '', '取消').bindEvent('click', function () {
                        dialog.hide();
                    })).
                    addButton(new Button('', '', 'submit', '注册'))
            );
            return dialog;
        })()
    }
    return {
        get: function (name) {
            cache[name] || (cache[name] = component[name].build());
            return cache[name];
        }
    }
})();