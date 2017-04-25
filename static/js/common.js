$(function(){
    // 导航栏设置按钮下拉菜单显示与隐藏
    $('.setting').on('mouseenter',function(){
        $('.setting-menu').removeClass('hidden');
    }).on('mouseleave',function(){
        $('.setting-menu').addClass('hidden');
    });
    // 页面滚动事件
    $(document).on('scroll',function(){
        scrollTop = Utils.getScrollTop();
        scrollBottom = document.body.scrollHeight - scrollTop;
        if (scrollTop >= 5) {
            $('.header').css('box-shadow', '0 0 16px #E0E0E0');
            $('.scroll-top').removeClass('hidden');
        } else {    // 位于页面顶部
            $('.header').css('box-shadow', 'none');
            $('.scroll-top').addClass('hidden');
        }
    });
})