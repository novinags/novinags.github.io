
// audio toggle
var audio = document.getElementById("myAudio");

function toggleAudio() {
    if (audio.paused && audio.currentTime >= 0) {
        audio.currentTime = 0;
        audio.play();
    } else {
        audio.pause();
    }
}

// moving title
var start = 1000;
var speed = 250;

function getParams(startAttr, speedAttr) {
    var params = window.document.getElementsByTagName('script');

    for (var i = 0; i < params.length; i++) {
        if (params[i].src.indexOf('title-scroll.js') !== -1) {
            if (params[i].getAttribute(startAttr) !== null && params[i].getAttribute(startAttr) !== "") {
                start = params[i].getAttribute(startAttr);
            }

            if (params[i].getAttribute(speedAttr) !== null && params[i].getAttribute(speedAttr) !== "") {
                speed = params[i].getAttribute(speedAttr);
            }

            return;
        }
    }
}

window.onload = function (e) {
    getParams('data-start', 'data-speed');
    var title_ref = window.document.getElementsByTagName('title')[0];
    var title = birthdaywishee;
    var i = 0;

    setTimeout(function () {
        setInterval(function () {
            title_ref.text = title.substr(i, title.length) + " " + title.substr(0, i);
            i++;

            if (i === title.length) {
                i = 0;
            }
        }, speed);
    }, start);
}

// configuration

var $slider = $('.slideshow .slider'),
  maxItems = $('.item', $slider).length,
  dragging = false,
  tracking,
  rightTracking;

$sliderRight = $('.slideshow').clone().addClass('slideshow-right').appendTo($('.split-slideshow'));

rightItems = $('.item', $sliderRight).toArray();
reverseItems = rightItems.reverse();
$('.slider', $sliderRight).html('');
for (i = 0; i < maxItems; i++) {
  $(reverseItems[i]).appendTo($('.slider', $sliderRight));
}

$slider.addClass('slideshow-left');
$('.slideshow-left').slick({
  vertical: true,
  verticalSwiping: true,
  arrows: false,
  infinite: true,
  dots: true,
  speed: 1000,
  cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)'
}).on('beforeChange', function(event, slick, currentSlide, nextSlide) {

  if (currentSlide > nextSlide && nextSlide == 0 && currentSlide == maxItems - 1) {
    $('.slideshow-right .slider').slick('slickGoTo', -1);
    $('.slideshow-text').slick('slickGoTo', maxItems);
  } else if (currentSlide < nextSlide && currentSlide == 0 && nextSlide == maxItems - 1) {
    $('.slideshow-right .slider').slick('slickGoTo', maxItems);
    $('.slideshow-text').slick('slickGoTo', -1);
  } else {
    $('.slideshow-right .slider').slick('slickGoTo', maxItems - 1 - nextSlide);
    $('.slideshow-text').slick('slickGoTo', nextSlide);
  }
}).on("mousewheel", function(event) {
  event.preventDefault();
  if (event.deltaX > 0 || event.deltaY < 0) {
    $(this).slick('slickNext');
  } else if (event.deltaX < 0 || event.deltaY > 0) {
    $(this).slick('slickPrev');
  };
}).on('mousedown touchstart', function(){
  dragging = true;
  tracking = $('.slick-track', $slider).css('transform');
  tracking = parseInt(tracking.split(',')[5]);
  rightTracking = $('.slideshow-right .slick-track').css('transform');
  rightTracking = parseInt(rightTracking.split(',')[5]);
}).on('mousemove touchmove', function(){
  if (dragging) {
    newTracking = $('.slideshow-left .slick-track').css('transform');
    newTracking = parseInt(newTracking.split(',')[5]);
    diffTracking = newTracking - tracking;
    $('.slideshow-right .slick-track').css({'transform': 'matrix(1, 0, 0, 1, 0, ' + (rightTracking - diffTracking) + ')'});
  }
}).on('mouseleave touchend mouseup', function(){
  dragging = false;
});

$('.slideshow-right .slider').slick({
  swipe: false,
  vertical: true,
  arrows: false,
  infinite: true,
  speed: 950,
  cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
  initialSlide: maxItems - 1
});
$('.slideshow-text').slick({
  swipe: false,
  vertical: true,
  arrows: false,
  infinite: true,
  speed: 900,
  cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)'
});

