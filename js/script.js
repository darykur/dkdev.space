const body = document.querySelector('.page');
const burger = document.querySelector('.nav__burger');
const menu = document.querySelector('.popup-menu');
menu.inert = true;
function inertUse (){
  Array.from(body.children).forEach((child) => {
    if (child !== menu) {
      child.inert = true;
    }
  });
  burger.inert = false;
  menu.inert = false;
  burger.focus();
}



//шеринг на соц.кнопки
Share = {
	vkontakte: function(purl, ptitle, pimg, text) {
		url  = 'http://vkontakte.ru/share.php?';
		url += 'url='          + encodeURIComponent(purl);
		url += '&title='       + encodeURIComponent(ptitle);
		url += '&description=' + encodeURIComponent(text);
		url += '&image='       + encodeURIComponent(pimg);
		url += '&noparse=true';
		Share.socialPopup(url);
  },
  facebook: function(purl, ptitle, pimg, text) {
		url  = 'http://www.facebook.com/sharer.php?s=100';
		url += '&p[title]='     + encodeURIComponent(ptitle);
		url += '&p[summary]='   + encodeURIComponent(text);
		url += '&p[url]='       + encodeURIComponent(purl);
		url += '&p[images][0]=' + encodeURIComponent(pimg);
		Share.socialPopup(url);
	},
	twitter: function(purl, ptitle) {
		url  = 'http://twitter.com/share?';
		url += 'text='      + encodeURIComponent(ptitle);
		url += '&url='      + encodeURIComponent(purl);
		url += '&counturl=' + encodeURIComponent(purl);
		Share.socialPopup(url);
	},
	socialPopup: function(url) {
		window.open(url,'','toolbar=0,status=0,width=626,height=436');
	}
};


//popup-callback 
$(document).ready(function(){
  $('.footer__button,.header__button').on('click', function(e){
    e.preventDefault();
    let offset = $(this).offset().top;
    $('.popup-callback__window_green').css('display','none');
    $('.popup-callback__window_grey').css('display','flex');
    $('.page').scrollTop(offset);
    $('.page').addClass('scroll-forbidden');
    $('.popup-callback').fadeIn(300);
    $('.popup-callback').css({'display':'flex','z-index':'10'});
  });
  $('.intro__button,.skills__button,.examples__button').on('click', function(e){
    e.preventDefault();
    let offset = $(this).offset().top;
    $('.popup-callback__window_green').css('display','none');
    $('.popup-callback__window_grey').css('display','flex');
    $('.page').scrollTop(offset);
    $('.page').addClass('scroll-forbidden');
    $('.popup-callback').fadeIn(300);
    $('.popup-callback').css({'display':'flex','z-index':'10'});
    $('.popup-callback__email').css('display','flex');
  });
  $('.popup-callback__close').on('click', function(e){
    e.preventDefault();
    $('.page').removeClass('scroll-forbidden');
    $('.popup-callback').fadeOut(300);
    $('.popup-callback__email').fadeOut(300);
  });
  $(document).mouseup(function(e){
    var div = $('.popup-callback__window');
    if (!div.is(e.target)
      && div.has(e.target).length === 0){
        e.preventDefault();
        $('.page').removeClass('scroll-forbidden');
        $('.popup-callback').fadeOut(300);
        $('.popup-callback__email').fadeOut(300);
      }
  });


//popup-menu 
  $('.burger').on('click', function(e){
    e.preventDefault();
    $(this).toggleClass('burger__active');
    if ($(this).css('z-index') == 'auto') {
      let offset = $(this).offset().top;
      $('.page').scrollTop(offset);
      $('.page').addClass('scroll-forbidden');
      $('.popup-menu,.popup-cap').fadeIn(300);
      $('.popup-menu,.popup-cap').css({'display':'flex','z-index':'10'});
      $('.header__block:first').addClass('popup-menu__width');
      $(this).css('z-index','5');
      $(this).focus();  
      inertUse();
    }
    else {
      $('.page').removeClass('scroll-forbidden');
      $('.popup-menu,.popup-cap').fadeOut(300);
      $('.header__block:first').removeClass('popup-menu__width');
      $(this).css('z-index','auto');
    }
  });


  //обработчик на клавишу ESC 
  let keys = {
    ESC: 27,
  };
  $('.page').on('keydown', function(e){
    if (e.keyCode == keys.ESC) {
      $('.page').removeClass('scroll-forbidden');
      $('.popup-menu,.popup-cap').fadeOut(300);
      $('.header__block:first').removeClass('popup-menu__width');
      $('.burger').css('z-index','auto');
      $('.burger').removeClass('burger__active');
      $('.page').removeClass('scroll-forbidden');
      $('.popup-callback').fadeOut(300);
      $('.popup-callback__email').fadeOut(300);
    }
  });


//плавный переход по разделам
  $('.header__nav-link,.footer__nav-link').on('click',function(e){
    e.preventDefault();
    let href = $(this).attr('href');
    let offset = $(href).offset().top;
    $('body,html').animate({
      scrollTop: offset
    }, 700);
  });
  $('.popup-menu__nav-link_services,.popup-menu__nav-link_portfolio,.popup-menu__nav-link_cost').on('click', function(){
    $('.page').removeClass('scroll-forbidden');
    $('.popup-menu,.popup-cap').fadeOut(300);
    $('.header__block:first').removeClass('popup-menu__width');
    $('.burger').css('z-index','auto');
    $('.burger').removeClass('burger__active');
  });


//кнопка Наверх
  $('.to-top').on('click',function(e){
    e.preventDefault();
    $('body,html').animate({
      scrollTop: 0
    }, 700);
  });
  $('.to-top').on('mouseover', function(){
    $(this).addClass('animate__pulse');
  });
  $('.to-top').on('mouseout', function(){
    $(this).removeClass('animate__pulse');
  });
  $(window).scroll(function () {
    $('.to-top').css('display','block');
    if ($(this).scrollTop() == 0) {
      $('.to-top').css('display','none');
    }
  });


//маска на номер телефона
  $('#tel').inputmask({'mask': '+7 (999) 999-9999'});


//слайдер примеры моих работ
  function swiper() {
    if($(window).width() > 991 && $(window).width() < 1200){   
        var mySwiper = new Swiper ('.swiper-container', {
            loop: true,
            slidesPerView: 2,
            spaceBetween: 35,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
             },
        });
    }
    else if($(window).width() > 1199){   
        var mySwiper = new Swiper ('.swiper-container', {
            loop: true,
            slidesPerView: 3,
            spaceBetween: 30,
            navigation: {
                nextEl: '.swiper-button_right',
                prevEl: '.swiper-button_left',
            },
        });
    } 
    else {
        var mySwiper = new Swiper ('.swiper-container', {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
             },
        });
    }
  };   
  swiper();
  $(window).resize(function() {
    swiper();
  });


  //валидация и отправка формы
  $('form').each(function(){
    $(this).validate({
      focusInvalid: true,
			rules: {
				телефон: {
					required: true,
				},
				имя: {
					required: true,
					maxlength: 20,
        },
        почта: {
          required: true,
        }
			},
			messages: {
				телефон: 'Введите номер Вашего телефона',
				имя: {
					required: 'Здесь должно быть Ваше имя',
					maxlength: 'Hе более 30 символов'
        },
        почта: {
          required: 'Введите адрес электронной почты',
          email: 'Пожалуйста, введите корректный адрес электронной почты'
        }
			},
			submitHandler(form) {
				let th = $(form);

				$.ajax({
				  type: 'POST',
					url: '../mail.php',
					data: th.serialize(),
			
				}).done(() => {
          $('.popup-callback__window_grey').css('display','none');
          $('.popup-callback__window_green').css('display','flex');
					th.trigger('reset');
				});

				return false;
			}
		});
  });

  
  //wow-эффект
  new WOW().init();


  //ховер на бургер
  $('.burger').on('mouseover', function(){
    $(this).addClass('animate__pulse');
  });
  $('.burger').on('mouseout', function(){
    $(this).removeClass('animate__pulse');
  });


  //ховер на телефонную трубку
  $('.header__button_img').on('mouseover',function(){
    $(this).addClass('animate__tada');
  });
  $('.header__button_img').on('mouseout',function(){
    $(this).removeClass('animate__tada');
  });


  //ховер на элементы меню
  var addRunning = function(){
    $(this).next().addClass('running');
  };
  var removeRunning = function(){
    $(this).next().removeClass('running');
  };
  $('.popup-menu__nav-link_services,.popup-menu__nav-link_portfolio,.popup-menu__nav-link_cost,.header__nav-link_services,.header__nav-link_portfolio,.header__nav-link_cost,.footer__nav-link_services,.footer__nav-link_portfolio,.footer__nav-link_cost').on('mouseover', addRunning);
  $('.header__nav-link_portfolio,.popup-menu__nav-link_portfolio').on('mouseover',function(){
    $(this).next().removeClass('running-back');
  });
  $('.header__nav-link_portfolio,.popup-menu__nav-link_portfolio').on('mouseout',function(){
    $(this).next().addClass('running-back');
  });
  $('.popup-menu__nav-link_services,.popup-menu__nav-link_portfolio,.popup-menu__nav-link_cost,.header__nav-link_services,.header__nav-link_portfolio,.header__nav-link_cost,.footer__nav-link_services,.footer__nav-link_portfolio,.footer__nav-link_cost').on('mouseout', removeRunning);
})



