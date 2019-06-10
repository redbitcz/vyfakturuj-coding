var vyfakturuj = vyfakturuj || {};
var viewportWidth;

vyfakturuj.viewportWidth = function () { // šířka viewportu
    viewportWidth = Math.max($(window).width(), window.innerWidth);
};

vyfakturuj.slider = function () {

    $('.slider-main-hp').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        infinite: true,
        fade: false,
        adaptiveHeight: true
    });

    $('.slider-clients').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        infinite: true,
        fade: true,
        adaptiveHeight: true
    });

    $('.slider-main-hp').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $('.slider-main-hp-tabs-nav li').removeClass('active');
        $('.slider-main-hp-tabs-nav li[data-slide="'+nextSlide+'"]').addClass('active');
    });

    $(".slider-main-hp-tabs-nav li a").click(function(e){
        e.preventDefault();
        var slideIndex = $(this).parent().attr('data-slide');
        $('.slider-main-hp').slick('slickGoTo', parseInt(slideIndex));
        $('.greedy-main-nav-hidden-links').slideUp(100);
        $('.greedy-more').removeClass('active');
    });

    $('.slider-clients').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $('.slider-clients-tabs-nav li').removeClass('active');
        $('.slider-clients-tabs-nav li[data-slide="'+nextSlide+'"]').addClass('active');
    });

    $(".slider-clients-tabs li a").click(function(e){
        e.preventDefault();
        var slideIndex = $(this).parent().attr('data-slide');
        $('.slider-clients').slick('slickGoTo', parseInt(slideIndex));
        $('.greedy-main-nav-hidden-links').slideUp(100);
        $('.greedy-more').removeClass('active');
    });

    $('.testimonials-slider').each(function(){
        $(this).owlCarousel({
            loop: true,
            items: 1,
            nav: true,
            autoHeight: true,
            margin: 60,
            onChanged: sliderCounter
        });
    });

    function sliderCounter(event) {
        var element = event.target;
        var page = event.page.index + 1;
        var count = event.item.count;

        if(page <= 0) {
            page = 1;
        }

        $(element).parent().find('.counter .current').text(page);
        $(element).parent().find('.counter .count').text(count);
    }

    $('.photo-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        infinite: true,
        fade: false,
        adaptiveHeight: false
    });

};

vyfakturuj.openNav = function () {

    $('.btn-mobile-menu-open-container').click(function () {
        $('.header-nav').slideToggle(200);
        $(this).find('.btn-mobile-menu-open').toggleClass('active');
        $(this).find('.item-text').text(function (i, text) {
            return text === "Menu" ? "Zavřít" : "Menu";
        })
    });

};

vyfakturuj.tooltip = function () {

    $('.tooltip').tooltipster({
        side: 'top',
        maxWidth: '290',
        contentAsHTML: true,
        trigger: 'custom',
        triggerOpen: {
            mouseenter: true,
            touchstart: true
        },
        triggerClose: {
            click: true,
            scroll: true,
            tap: true,
            mouseleave: true
        }
    });

    $('.tooltip-pricelist').tooltipster({
        side: 'bottom',
        maxWidth: '280',
        contentAsHTML: true,
        trigger: 'custom',
        theme: ['', 'tooltipster-pricelist'],
        triggerOpen: {
            mouseenter: true,
            touchstart: true
        },
        triggerClose: {
            click: true,
            scroll: true,
            tap: true,
            mouseleave: true
        }
    });

};

vyfakturuj.greedyMenu = function () {

    $('.greedy-nav').each(function () {

        var $nav = $(this);
        var $btn = $(this).find('.greedy-more');
        var $vlinks = $(this).find('.greedy-nav-links');
        var $hlinks = $(this).find('.greedy-hidden-links');

        var numOfItems = 0;
        var totalSpace = 0;
        var breakWidths = [];

        // Get initial state

        $vlinks.children().each(function() {
            $(this).find('.greedy-content').outerWidth(function (i, w) {
                totalSpace += w;
                numOfItems += 1;
                breakWidths.push(totalSpace);
            });
        });

        var availableSpace, numOfVisibleItems, requiredSpace;

        function check() {

            // Get instant state
            availableSpace = $vlinks.width() - 1;
            numOfVisibleItems = $vlinks.children().length;
            requiredSpace = breakWidths[numOfVisibleItems - 1];

            // There is not enought space
            if (requiredSpace > availableSpace) {
                $vlinks.children().last().prependTo($hlinks);
                numOfVisibleItems -= 1;
                check();
                // There is more than enough space
            } else if (availableSpace > breakWidths[numOfVisibleItems]) {
                $hlinks.children().first().appendTo($vlinks);
                numOfVisibleItems += 1;
            }
            // Update the button accordingly
            $btn.attr("count", numOfItems - numOfVisibleItems);
            if (numOfVisibleItems === numOfItems) {
                $btn.removeClass('visible');
            } else $btn.addClass('visible');
        }

        // Window listeners
        $(document).ready(function () {
            check();
        });
        $(window).resize(function () {
            check();
        });

        $btn.on('click', function () {
            $(this).toggleClass('active');
            $hlinks.slideToggle(100);
        });

        check();

    });


};

vyfakturuj.stickyNav = function() {

    if(viewportWidth > 992) {
        var scrollpos = $(window).scrollTop();
        var header_height = $('.header').outerHeight();
        var main_nav = $('.nav-sticky');

        if(main_nav.length) {
            var main_nav_offset = main_nav.parent().offset().top;

            if ((scrollpos >= (main_nav_offset - header_height)) && (!main_nav.hasClass('sticky'))) {
                main_nav.addClass('sticky');
            } else
            if ((scrollpos < (main_nav_offset - header_height)) && (main_nav.hasClass('sticky'))) {
                main_nav.removeClass('sticky');
            }
        }

        if(scrollpos >= 100 && !$('.header').hasClass('sticky')){
            $('.header').addClass('sticky')
        } else
        if (scrollpos < 100 && $('.header').hasClass('sticky')){
            $('.header').removeClass('sticky')
        }

    }

};

vyfakturuj.scrollNav = function() {

    var scrollPos_correction = 150;
    var pos_correction = 130;


    if(viewportWidth < 993) {
        scrollPos_correction = 0;
        pos_correction = 0;
    } else {
        scrollPos_correction = 150;
        pos_correction = 130;
    }

    $('.scrollto-nav a').click(function(e) {
        var id = $(this).attr('href');

        var $id = $(id);
        if ($id.length === 0) {
            return;
        }

        e.preventDefault();

        var pos = $id.offset().top - pos_correction;

        $('body, html').animate({scrollTop: pos}, 500);
    });

    $(document).on("scroll", onScroll);

    function onScroll(event){
        var scrollPos = $(document).scrollTop() + scrollPos_correction;

        $('.scrollto-nav a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));

            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.outerHeight() > scrollPos) {
                $('.scrollto-nav a').removeClass("active");
                currLink.parent().addClass("active");
            }
            else{
                currLink.parent().removeClass("active");
            }
        });
    }
};

vyfakturuj.pricelist = function() {

    function refreshPrices(year) {
        var tax = 20;

        $('.price').each(function() {

            var basic_price = parseInt($(this).attr('data-price-month'));

            if(year == 1) {
                basic_price = parseInt($(this).attr('data-price-year'));
            }

            var price_tax = Math.round(((basic_price/100)*tax)+basic_price);
            var price_year = basic_price * 12;
            var price_year_tax = price_tax * 12;

            $(this).parent().parent().find('.price').text(basic_price);
            $(this).parent().parent().find('.price-tax').text(price_tax);
            $(this).parent().parent().find('.price-year').text(price_year);
            $(this).parent().parent().find('.price-year-tax').text(price_year_tax);

        })

    }

    $('.switch-free-tarif').click(function(e) {
        e.preventDefault();

        $(this).text(function(i, text){
            return text === "Zobrazit tarif zdarma" ? "Skrýt tarif zdarma" : "Zobrazit tarif zdarma";
        });

        if($('.pricelist-wrapper').hasClass('show-free')) {
            $('.pricelist-wrapper').removeClass('show-free');
        } else {
            $('.pricelist-wrapper').addClass('show-free');
        }

    });

    $('#payment-frequency').on('change', function() {
        if ($(this).prop('checked')) { // roční platba
            $(this).parent().parent().find('.text').removeClass('active');
            $(this).parent().parent().find('.text-year').addClass('active');
            refreshPrices(1);
        }
        else { // měsíční platba
            $(this).parent().parent().find('.text').removeClass('active');
            $(this).parent().parent().find('.text-month').addClass('active');
            refreshPrices(0);
        }
    });

    $('.functions-list li').hover(
        function() {
            var hover = $(this).attr('data-hover');
            $('li[data-hover="'+hover+'"]').addClass('hovered');
        }, function() {
            var hover = $(this).attr('data-hover');
            $('li[data-hover="'+hover+'"]').removeClass('hovered');
        }
    );

    $('.pricelist-show-more').click(function(e) {
        e.preventDefault();

        if(viewportWidth <= 992) {
            $(this).parent().parent().find('.pricelist-functions').slideToggle(200);
            $(this).text(function(i, text){
                return text === "zobrazit všechny funkce" ? "skrýt funkce" : "zobrazit všechny funkce";
            });
        } else {
            var pos = $(this).parent().parent().find('.pricelist-heading-divider').offset().top - 190;
            $('body, html').animate({scrollTop: pos}, 500);
        }

    });

    function stickyHeaders() {
        if(viewportWidth > 992) {
            var scrollpos = $(window).scrollTop();
            var header_height = $('.header').outerHeight();
            var header_1 = $('.pricelist-options');
            var header_2 = $('.pricelist-header');

            if(header_1.length) {
                var main_nav_offset = header_1.parent().offset().top;
                var second_nav_offset = header_2.parent().offset().top;
                var wrapper_end_offset =  $('.pricelist-end').offset().top - 320;

                if ((scrollpos >= (main_nav_offset - 60)) && (!header_1.hasClass('sticky'))) {
                    if((scrollpos <= wrapper_end_offset)) {
                        header_1.addClass('sticky');
                    }
                } else
                if (header_1.hasClass('sticky')) {
                    if((scrollpos >= wrapper_end_offset) || (scrollpos < (main_nav_offset - 60))) {
                        header_1.removeClass('sticky');
                    }
                }

                if ((scrollpos >= (second_nav_offset)) && (!header_2.hasClass('sticky'))) {
                    if((scrollpos <= wrapper_end_offset)) {
                        header_2.addClass('sticky');
                    }
                } else
                if (header_2.hasClass('sticky')) {
                    if((scrollpos >= wrapper_end_offset) || (scrollpos < (second_nav_offset - 60))) {
                        header_2.removeClass('sticky');
                    }
                }

            }
        }
    }

    stickyHeaders();

    $(window).scroll(function () {
        stickyHeaders();
    });

};

vyfakturuj.lightbox = function () {
    $('.photo-line').each(function() {
        $(this).magnificPopup({
            delegate: 'a',
            type: 'image'
        });
    });
};

vyfakturuj.photoSlider = function () {
    $('.photo-line').liMarquee({
        direction: 'left',
        loop: -1,
        scrolldelay: 0,
        scrollamount: 50,
        circular: true,
        drag: false,
        runshort: true,
        hoverstop: true,
        inverthover: false
    })
};


vyfakturuj.init = function () {
    vyfakturuj.viewportWidth();
    vyfakturuj.greedyMenu();
    vyfakturuj.slider();
    vyfakturuj.stickyNav();
    vyfakturuj.openNav();
    vyfakturuj.tooltip();
    vyfakturuj.scrollNav();
    vyfakturuj.pricelist();
    vyfakturuj.lightbox();
    vyfakturuj.photoSlider();
};

$(document).ready(function () {
    vyfakturuj.init();
    $("body").removeClass("preload");
});

$(window).on("orientationchange", function () {
    vyfakturuj.viewportWidth();
});

$(window).on("resize", function () {
    vyfakturuj.viewportWidth();
});

$(window).scroll(function () {
    vyfakturuj.stickyNav();
});