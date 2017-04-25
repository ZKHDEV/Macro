$(function(){
    $('.setting').on('mouseenter',function(e){
        $('.setting-menu').removeClass('hidden');
    }).on('mouseleave',function(e){
        $('.setting-menu').addClass('hidden');
    });

    $('.dialog-bg,.hide-dialog-btn').on('click',function(){
        $('.dialog').hide();
    });

    $(document).on('scroll',function(){
        scrollTop = Utils.getScrollTop();
        scrollBottom = document.body.scrollHeight - scrollTop;
        if (scrollTop >= 5) {
            $('.header').css('box-shadow', '0 0 16px #E0E0E0');
            $('.scroll-top').removeClass('hidden');
        } else {
            $('.header').css('box-shadow', 'none');
            $('.scroll-top').addClass('hidden');
        }
    });

    $('#login-btn,#head-btn').on('click',function(){
        var loginDialog = DialogFactory.get('login');
        loginDialog.show();
    });

    $('#register-btn').on('click',function(){
        var registerDialog = DialogFactory.get('register');
        registerDialog.show();
    });
})