var myresume = window.myresume || {};

myresume.main = (function(){

    function init(){
        setTimeout(function(){
            $('.spinner-backdrop').removeClass('active');

            $('.progress-bar-line-progress').each(function(){
                var width = $(this).data('current-progress');
                $(this).css('width', width + "%");
            });
        }, 2000)
    }

    return {
        init: init
    }
})();


