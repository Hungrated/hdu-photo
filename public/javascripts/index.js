/**
 * Created by Zihang Zhang on 2017/6/27.
 */

$(document).ready(function () {
    var wrap = (function() {
        var target;
        var nowActive;
        var nextActive;
        var nextnextActive;
        var init = function(dom) {
            target = $(dom);
            listen();
        };
        var listen = function() {
            var start = function(resolve) {
                nowActive = target.find('.active');
                nextActive = $('.item' + nowActive.attr('data-next'));
                nextnextActive = $('.item' + nextActive.attr('data-next'));
                nowActive.addClass('left');
                nextActive.addClass('right');
                setTimeout(function() {
                    nowActive.removeClass('active').removeClass('left');
                    nextActive.removeClass('next').removeClass('right').addClass('active');
                    nextnextActive.addClass('next');
                }, 1000);
            };
            setInterval(start, 4000);
        };
        return {
            init: init
        }
    })();
    wrap.init(".m-wrap");

    document.addEventListener('scroll', function () {
        var scrollLength = document.getElementById('imgContainer').getBoundingClientRect().top;
        if(scrollLength !== 0) {
            document.getElementById('index-header').style.background='rgba(0,0,0,1)';
        }
        else {
            document.getElementById('index-header').style.background='rgba(0,0,0,0)';
        }

    });


});