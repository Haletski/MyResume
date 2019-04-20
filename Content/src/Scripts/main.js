var myresume = window.myresume || {};

myresume.main = (() => {

    function init(){
        setTimeout(() => {
            $('.spinner-backdrop').removeClass('active');

            $('.progress-bar-line-progress').each((index, element) => {
                var width = $(element).data('current-progress');

                $(element).css('width', width + "%");
            });
        }, 2300)
    }

    return {
        init: init
    }
})();