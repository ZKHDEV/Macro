$(function(){
    // 头像、登录链接点击事件
    $('#login-btn,#head-btn').on('click',function(){
        var loginDialog = DialogFactory.get('login');
        loginDialog.show();
    });
    //注册按钮点击事件
    $('#register-btn').on('click',function(){
        var registerDialog = DialogFactory.get('register');
        registerDialog.show();
    });
})