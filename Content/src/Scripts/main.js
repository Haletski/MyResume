var myresume = window.myresume || {};

myresume.main = (() => {
    const WIDTH = 'width';

    function init(){
        setTimeout(() => {
            $('.spinner-backdrop').removeClass('active');
            $('title').text('Pavel Haletski CV');
            $('body').removeClass('active');
            $('.progress-bar-line-progress').each((index, element) => {
                let width = $(element).data('current-progress');

                $(element).css(WIDTH, width + "%");
            });
        }, 2300)
    }

    return {
        init: init
    }
})();