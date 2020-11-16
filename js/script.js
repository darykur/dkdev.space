//скринридер для popup-menu и popup-callback
const body = document.querySelector('.page');
const callback = document.querySelector('.popup-callback');
const menu = document.querySelector('.popup-container');
const header = document.querySelector('.header');
const phone = document.querySelector('.header__phone');
const button = document.querySelector('.header__button');
menu.inert = true;
callback.inert = true;

function inertOnMenu (){
  Array.from(body.children).forEach((child) => {
    if (child !== header) {
      child.inert = true;
    }
  });
  phone.inert = true;
  button.inert = true;
  menu.inert = false;
};

function inertOffMenu (){
  Array.from(body.children).forEach((child) => {
    if (child !== menu) {
      child.inert = false;
    }
  });
  phone.inert = false;
  button.inert = false;
  menu.inert = true;
};

function inertOnCallback (){
  Array.from(body.children).forEach((child) => {
    if (child !== callback) {
      child.inert = true;
    }
  });
  callback.inert = false;
};

function inertOffCallback (){
  Array.from(body.children).forEach((child) => {
    if (child !== callback) {
      child.inert = false;
    }
  });
  callback.inert = true;
};


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

$(document).ready(function(){
  $('.social-list__vk,.social-list__fb,.social-list__inst,.social-list__twit').on('click', function(e){
    e.preventDefault();
  });


//popup-callback 
  $('.footer__button,.header__button').on('click', function(e){
    e.preventDefault();
    let offset = $(this).offset().top;
    $('.popup-callback__sucsess-window').css('display','none');
    $('.to-top').css('display','none');
    $('.popup-callback__form-window').css('display','flex');
    $('.page').scrollTop(offset);
    $('.page').addClass('scroll-forbidden');
    $('.popup-callback').fadeIn(300);
    $('.popup-callback').css({'display':'flex','z-index':'10'});
    inertOnCallback();
  });
  $('.intro__button,.skills__button,.examples__button').on('click', function(e){
    e.preventDefault();
    let offset = $(this).offset().top;
    $('.popup-callback__sucsess-window').css('display','none');
    $('.to-top').css('display','none');
    $('.popup-callback__form-window').css('display','flex');
    $('.page').scrollTop(offset);
    $('.page').addClass('scroll-forbidden');
    $('.popup-callback').fadeIn(300);
    $('.popup-callback').css({'display':'flex','z-index':'10'});
    $('.popup-callback__email').css('display','flex');
    inertOnCallback();
  });
  $('.popup-callback__close').on('click', function(e){
    e.preventDefault();
    $('.page').removeClass('scroll-forbidden');
    $('.popup-callback').fadeOut(300);
    $('.popup-callback__email').fadeOut(300);
    if ($(window).scrollTop() != 0) {
      $('.to-top').css('display','block');
    }
    inertOffCallback();
  });
  $(document).mouseup(function(e){
    var div = $('.popup-callback__window');
    if (!div.is(e.target)
      && div.has(e.target).length === 0){
        e.preventDefault();
        $('.page').removeClass('scroll-forbidden');
        $('.popup-callback').fadeOut(300);
        $('.popup-callback__email').fadeOut(300);
        if ($(window).scrollTop() != 0) {
          $('.to-top').css('display','block');
        }
        inertOffCallback();
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
      $(this).css('z-index','5');
      inertOnMenu();
    }
    else {
      $('.page').removeClass('scroll-forbidden');
      $('.popup-menu,.popup-cap').fadeOut(300);
      $(this).css('z-index','auto');
      inertOffMenu();
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
      $('.burger').css('z-index','auto');
      $('.burger').removeClass('burger__active');
      $('.page').removeClass('scroll-forbidden');
      $('.popup-callback').fadeOut(300);
      $('.popup-callback__email').fadeOut(300);
      inertOffMenu();
      inertOffCallback();
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
    $('.page').removeClass('scroll-forbidden');
    $('.popup-menu,.popup-cap').fadeOut(300);
    $('.burger').css('z-index','auto');
    $('.burger').removeClass('burger__active');
    inertOffMenu();
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
  var swiper = new Swiper('.swiper-container', {
      loop: true,
      updateOnWindowResize: true,
      pagination: {
          el: '.swiper-pagination',
          clickable: true,
      },

      breakpoints: {
        992: {
          loop: true,
          updateOnWindowResize: true,
          slidesPerView: 2,
          spaceBetween: 35,
          pagination: {
              el: '.swiper-pagination',
              clickable: true,
          },
        },
        1200: {
          loop: true,
          updateOnWindowResize: true,
          slidesPerView: 3,
          spaceBetween: 30,
          pagination: false,
          navigation: {
              nextEl: '.swiper-button_right',
              prevEl: '.swiper-button_left',
          },
        }
      }
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
          $('.popup-callback__form-window').css('display','none');
          $('.popup-callback__sucsess-window').css('display','flex');
					th.trigger('reset');
				});

				return false;
			}
		});
  });

  
//wow-эффект
  new WOW().init();
});



