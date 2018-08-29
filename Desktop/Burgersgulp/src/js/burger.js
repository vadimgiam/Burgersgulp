'use strict';

//Попап навигационное меню

var navPopup = document.querySelector(".nav-popup");
var navButtonClose = document.querySelector(".nav-popup__btn");
var navLink = document.querySelector(".header__nav--hamburger");
var navItemLink = document.querySelectorAll(".nav-popup--link");

var op = 0.1;

navLink.addEventListener("click", function(evt){
    evt.preventDefault();
    navPopup.style.opacity = 0;
    navPopup.classList.add("nav-popup--open");
setTimeout(function foo(){
if (op < 1) {
    op += 0.1;
    navPopup.style.opacity = op;
    setTimeout(foo, 100);
}
}, 100);
});

navButtonClose.addEventListener("click", function(evt){
    evt.preventDefault();

    setTimeout(function fooClose(){
        if (op >= 0) {
            op -= 0.1;
            navPopup.style.opacity = op;
            setTimeout(fooClose, 100);
        }else {
            navPopup.classList.remove("nav-popup--open");
        }
        }, 100);
});
document.addEventListener("keydown", function(evt){
    if(evt.keyCode === 27){
        if (navPopup.classList.contains("nav-popup--open")) {

            setTimeout(function fooClose(){
                if (op >= 0) {
                    op -= 0.1;
                    navPopup.style.opacity = op;
                    setTimeout(fooClose, 100);
                }else {
                    navPopup.classList.remove("nav-popup--open");
                }
                }, 100);
        }
    }
});

for (var i = 0; i < navItemLink.length; i++){
    navItemLink[i].addEventListener("click", function(evt){

        setTimeout(function fooClose(){
            if (op >= 0) {
                op -= 0.1;
                navPopup.style.opacity = op;
                setTimeout(fooClose, 100);
            }else {
                navPopup.classList.remove("nav-popup--open");
            }
            }, 100);
    });

}


//Аккордеон Команда

/*
var openCloseBtn = document.querySelectorAll(".team__member");
var teamMemberAkk = document.querySelectorAll(".team__block");

for (var b = 0; b < openCloseBtn.length; b++){
    openCloseBtn[b].addEventListener("click", function(evt){
        evt.preventDefault();
        teamMemberAkk.classList.add("team__block--open");
        teamMemberAkk.classList.remove("team__block--close");
    });
}
*/

var openCloseBtn = document.querySelectorAll('.team__member');

var a;
for (a = 0; a < openCloseBtn.length; a++) {
    openCloseBtn[a].addEventListener('click', function() {

        if(!(this).classList.contains('team__member--active')) {
            for(var b = 0; b < openCloseBtn.length; b++) {
                openCloseBtn[b].classList.remove('team__member--yellow');
                openCloseBtn[b].classList.remove('team__member--active');
            }
            this.classList.add('team__member--active');
            this.classList.add('team__member--yellow');
        } else if (this.classList.contains('team__member--active')) {
            this.classList.remove('team__member--active');
            this.classList.remove('team__member--yellow');
        }
    })
}


//Аккордеон Меню
var sectionMenu = document.querySelector(".menu");
var menuOpenClose = document.querySelectorAll(".menu__item");
var menuTextBtnColor = document.querySelectorAll(".menu__item--title");

sectionMenu.addEventListener('click', function(e) {
    for (let m = 0; m < menuOpenClose.length; m++) {
        menuOpenClose[m].classList.remove('menu__item--active');
        for (let y = 0; y < menuTextBtnColor.length; y++){
            menuTextBtnColor[y].classList.remove('menu__item--yellow');
        }
    }
  })
  for (let m = 0; m < menuOpenClose.length; m++) {
    menuOpenClose[m].addEventListener('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      if (menuOpenClose[m].classList.contains('menu__item--active')) {
        menuOpenClose[m].classList.remove('menu__item--active');

        for (let y = 0; y < menuTextBtnColor.length; y++){
            menuTextBtnColor[y].classList.remove('menu__item--yellow');
        }
      } else {
        for (let m = 0; m < menuOpenClose.length; m++) {
            menuOpenClose[m].classList.remove('menu__item--active');
            for (let y = 0; y < menuTextBtnColor.length; y++){
                menuTextBtnColor[y].classList.remove('menu__item--yellow');
            }
          }
          for (let y = 0; y < menuTextBtnColor.length; y++){
            menuTextBtnColor[y].classList.add('menu__item--yellow');
        }
        menuOpenClose[m].classList.add('menu__item--active');

    }
  })
}

// Форма

var myForm = document.querySelector(".form");
var sendButton = document.querySelector(".form__submit");
var closeOrderPopup = document.querySelector(".order__cont--btn");
var orderPopup = document.querySelector(".order__popup");
var orderPopupText = document.querySelector(".order__cont--title");





myForm.addEventListener("submit", function(event){
event.preventDefault();
if(validateForm(myForm)){

const data = {
   name: myForm.elements.name.value,
   phone:myForm.elements.phone.value,
   comment: myForm.elements.comment.value
};

const xhr = new XMLHttpRequest();
//xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
xhr.responseType = "json";
xhr.open("POST","https://webdev-api.loftschool.com/sendmail");
xhr.send(JSON.stringify(data));
xhr.onreadystatechange = function(){
if(xhr.status <= 400){
        orderPopup.classList.add("order__popup--open");
        orderPopupText.innerHTML = "Сообщение отправлено";
}else{
  orderPopup.classList.add("order__popup--open");
  orderPopupText.innerHTML = "Ошибка";
}
};
}

});

closeOrderPopup.addEventListener("click", function(evt){
  evt.preventDefault();
  orderPopup.classList.remove("order__popup--open");

});
document.addEventListener("keydown", function(evt){
  if(evt.keyCode === 27){
      if (orderPopup.classList.contains("order__popup--open")) {

          orderPopup.classList.remove("order__popup--open");

      }
  }
});

function validateForm(form) {
    let valid = true;

    if(!validateField(form.elements.name)){
        valid = false;
    }
    if(!validateField(form.elements.phone)){
        valid = false;
    }
    if(!validateField(form.elements.comment)){
        valid = false;
    }
    return valid;
}
function validateField(field) {
    field.nextElementSibling.textContent = field.validationMessage;
    return field.checkValidity();
 }

 function validationFormInput (){
const yourName = document.querySelector('#name');
const yourPhone = document.querySelector('#phone');
const yourStreet = document.querySelector('#street');

yourPhone.addEventListener('keydown', function (event) {
    let isDigit = false;
    let isControl = false;
    let isDash = false;

    if (event.key >= 0 || event.key >= 9) {
        isDigit = true;
    }

    if (event.key == "-") {
        isDash = true;
    }

    if (event.key == 'Backspace' || event.key == 'Delete' || event.key == 'ArrowRight' || event.key == 'ArrowLeft' ) {
        isControl = true;
    }

    if (isDigit == false && isDash == false && isControl == false){
        event.preventDefault();
    }
});

yourName.addEventListener("keydown", letters);
yourStreet.addEventListener("keydown", letters);

function letters(event){
    let isDigit = false;
    let isControl = false;
    let isDash = false;
    if (event.key == 'Backspace' || event.key == 'Delete' || event.key == 'ArrowRight' || event.key == 'ArrowLeft') {
        isControl = true;
    }
    if (event.key == "-" || event.key == "." || event.key == ",") {
        isDash = true;
    }
    if (event.key == 'й' || event.key == 'ц' || event.key == 'у' || event.key == 'й' || event.key == 'к' || event.key == 'е' || event.key == 'н' || event.key == 'й' || event.key == 'г' || event.key == 'ш' || event.key == 'щ' || event.key == 'й' || event.key == 'з' || event.key == 'х' || event.key == 'ъ' || event.key == 'й' || event.key == 'ф' || event.key == 'ы' || event.key == 'в' || event.key == 'й' || event.key == 'а' || event.key == 'п' || event.key == 'р' || event.key == 'й' || event.key == 'о' || event.key == 'л' || event.key == 'д' || event.key == 'й' || event.key == 'ж' || event.key == 'э' || event.key == 'я' || event.key == 'й' || event.key == 'ч' || event.key == 'с' || event.key == 'м' || event.key == 'й' || event.key == 'и' || event.key == 'т' || event.key == 'ь' || event.key == 'й' || event.key == 'б' || event.key == 'ю' || event.key == 'q' || event.key == 'й' || event.key == 'w' || event.key == 'e' || event.key == 'r' || event.key == 'й' || event.key == 't' || event.key == 'y' || event.key == 'u' || event.key == 'й' || event.key == 'i' || event.key == 'o' || event.key == 'p' || event.key == 'a' || event.key == 's' || event.key == 'd' || event.key == 'f' || event.key == 'g' || event.key == 'h' || event.key == 'j' || event.key == 'k' || event.key == 'l' || event.key == 'z' || event.key == 'x' || event.key == 'c' || event.key == 'v' || event.key == 'b' || event.key == 'n' || event.key == 'm') {
        isDigit = true;
    }
    if (isDigit == false && isDash == false && isControl == false){
        event.preventDefault();
    }

};

 }
 validationFormInput();
/*function validateField(field){
    if(!field.checkValidity()){
        field.form.nextElementSibling.textContent = field.validationMessage;
        return false;
    } else{
        field.form.nextElementSibling.textContent = "";
        return true;
    }
}*/


//Popup отзывы

/*var reviewBtnOpen = document.querySelectorAll(".reviews__hover--btn");
var successOverlay = document.querySelector(".reviews__popup");
var reviewsBtnClose = document.querySelector(".cont__btn");


for(let r = 0; r < reviewBtnOpen.length; r++){
    reviewBtnOpen[r].addEventListener("click", function(e){

        e.preventDefault();
        successOverlay.classList.add("reviews__popup--open");

    });
}


    reviewsBtnClose.addEventListener("click", function(e){
        e.preventDefault();
        successOverlay.classList.remove("reviews__popup--open");

    });


document.addEventListener("keydown", function(e){
    if(e.keyCode === 27){
        if (successOverlay.classList.contains("reviews__popup--open")) {


            successOverlay.classList.remove("reviews__popup--open");

        }
    }
});
*/

function commentsPopup () {
    var reviewBtnOpen = document.querySelectorAll(".reviews__hover--btn");
    var successOverlay = document.querySelector(".reviews__popup");
    var reviewsBtnClose = document.querySelector(".cont__btn");

    var reviewPopupName = document.querySelector(".cont__title");
    var reviewPopupComment = document.querySelector(".cont__text");

for (let r=0; r < reviewBtnOpen.length; r++){
    reviewBtnOpen[r].addEventListener("click", function(e){
        e.preventDefault();
        var z = this;

        var thisParent = z.parentNode;

const name = thisParent.querySelector(".reviews__hover--title");
const comment =thisParent.querySelector(".reviews__hover--text");

reviewPopupName.textContent = name.innerHTML;
reviewPopupComment.textContent = comment.innerHTML;
        successOverlay.style.display = "block";
    });
}
reviewsBtnClose.addEventListener("click", function(e){
    e.preventDefault();
    successOverlay.style.display = "none";
});
document.addEventListener("keydown", function(e){
    if(e.keyCode === 27){
        if (successOverlay.style.display = "block") {
            successOverlay.style.display = "none";
        }
    }
});



}

commentsPopup ();


//слайдер

const left = document.querySelector(".slider__link--left");
const right = document.querySelector(".slider__link--right");
const items = document.querySelector(".slider__list");
const computed = getComputedStyle(items);
const itemSl = document.getElementsByClassName("slider__content");
var a = 0;
let result = 0;
for(var i=1; i<itemSl.length; i++){
 a++;
}
console.log(result);
right.addEventListener("click", function(event) {
    event.preventDefault();
    let currentRight = parseInt(computed.right);

    if (!currentRight) {
      currentRight = 0;
    }

    if (currentRight >= result) {
      items.style.right = currentRight + items.clientWidth + "px";
    }else{
       items.style.right = 0;
    }
  });

  left.addEventListener("click", function(event) {
    event.preventDefault();
    let currentRight = parseInt(computed.right);

    if (!currentRight) {
      currentRight = 0;
    }

    if (currentRight > 0) {
      items.style.right = currentRight - items.clientWidth + "px";
    }
  });

// MAP
ymaps.ready(init);

var placemarks = [
    {
        latitude: 59.97,
        longitude: 30.31,
        hintContent: 'ул. Литераторов, д. 19',
        balloonContent:
            'Самые вкусные бургеры у нас! Заходите по адресу: ул. Литераторов, д. 19'
    },
    {
        latitude: 59.91,
        longitude: 30.51,
        hintContent: 'Ленинградская ул., д. 9',
        balloonContent:
            'Самые вкусные бургеры у нас! Заходите по адресу: Ленинградская ул., д. 9'
    },
    {
        latitude: 59.94,
        longitude: 30.37,
        hintContent: 'ул. Таврическая, д. 1',
        balloonContent:

            'Самые вкусные бургеры у нас! Заходите по адресу: ул. Таврическая, д. 1'

    },
    {
      latitude: 59.89,
      longitude: 30.31,
      hintContent: 'Московский пр., д. 99',
      balloonContent:

          'Самые вкусные бургеры у нас! Заходите по адресу: Московский пр., д. 99'

  },
],
    geoObjects= [];

function init() {
    var map = new ymaps.Map('map', {
        center: [59.94, 30.32],
        zoom: 12,
        controls: ['zoomControl'],
        behaviors: ['drag']
    });

    for (var i = 0; i < placemarks.length; i++) {
            geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude],
            {
                hintContent: placemarks[i].hintContent,
                balloonContent: placemarks[i].balloonContent
            },
            {
                iconLayout: 'default#image',
                iconImageHref: './img/map-marker.svg',
                iconImageSize: [46, 57],
                iconImageOffset: [-23, -57],
                iconImageClipRect: [[415, 0], [461, 57]]
            });
    }

    var clusterer = new ymaps.Clusterer({
        clusterIcons: [
            {
                href: './img/burgerfirst.png',
                size: [100, 100],
                offset: [-50, -50]
            }
        ],
        clusterIconContentLayout: null
    });

    map.geoObjects.add(clusterer);
    clusterer.add(geoObjects);
}


//video player


let player;
  function onYouTubePlayerAPIReady() {
    player = new YT.Player('yt-player', {
     // height: '405',
     // width: '660',
      videoId: '85CfHN0uJz0',
      playerVars: {
        controls: 0,
        disablekb: 0,
        showinfo: 0,
        rel: 0,
        autoplay: 0,
        modestbranding: 0
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      }
    });
  }
  function onPlayerReady(event) {
    var duration = player.getDuration();
    var interval = void 0;

    $(".player").removeClass("hidden");

    clearInterval(interval);

    interval = setInterval(function () {
      var completed = player.getCurrentTime();
      var percents = completed / duration * 100;

      changeButtonPosition(percents);
    }, 1000);
  }

  function onPlayerStateChange(event) {
    var playerButton = $(".player__start");
    var playerButtonPause = $(".paused");

    switch (event.data) {
      case 1:
        $(".player__wrapper").addClass("active");
        //playerButton.addClass("paused");
        //playerButton.removeClass("player__start");
        playerButton.toggleClass("player__start paused");
        break;
      case 2:
        //playerButton.removeClass("paused");
       // playerButtonPause.addClass("player__start");
       playerButtonPause.toggleClass("paused player__start ");

        break;
    }
  }

  $(".player__start").on("click", function (e) {
    var playerStatus = player.getPlayerState(); // 0 - ended, 1 - played, 2 - paused ...
    var playerSplashButton = $(".player__splash");


    if (playerStatus !== 1) {
      player.playVideo();
      playerSplashButton.addClass("splash-active");

    } else {
      player.pauseVideo();
      playerSplashButton.removeClass("splash-active");

    }
  });
  $(".player__playback").on("click", function (e) {
    e.preventDefault();
    var bar = $(e.currentTarget);
    var newButtonPosition = e.pageX - bar.offset().left;
    var clickedPercents = newButtonPosition / bar.width() * 100;
    var newPlayerTime = player.getDuration() / 100 * clickedPercents;

    changeButtonPosition(clickedPercents);
    player.seekTo(newPlayerTime);
  });

  changeVolumeButtonPosition(100);

  $(".player__volume-bar").on("click", function (e) {
    e.preventDefault();
    var bar = $(e.currentTarget);
    var newButtonPosition = e.pageX - bar.offset().left;
    var clickedPercents = newButtonPosition / bar.width() * 100;

    changeVolumeButtonPosition(clickedPercents);
    player.setVolume(clickedPercents);
  });

  $(".player__splash").on("click", function (e) {
    var playerStatus = player.getPlayerState(); // 0 - ended, 1 - played, 2 - paused ...
    var playerSplashButton = $(".player__splash");
    if (playerStatus !== 1) {
      player.playVideo();
      playerSplashButton.addClass("splash-active");
    } else {
      player.pauseVideo();
      playerSplashButton.removeClass("splash-active");
    }
  });

  function changeButtonPosition(percents) {
    $(".player__playback-button").css({
      left: percents + '%'
    });
  }

  function changeVolumeButtonPosition(percents) {
    $(".player__volume-button").css({
      left: percents + '%'
    });
  }
  $(".player__volume-icon").on("click", function (e) {
   // var playerStatus = true; // 0 - ended, 1 - played, 2 - paused ...
    var playerMuteButton = $(".player__volume-icon");


    if (!player.isMuted())  {
      player.mute();
      //playerSplashButton.addClass("splash-active");

    } else {
      player.unMute();
      //playerSplashButton.removeClass("splash-active");

    }
  });

 /* $(window).on('resize', () => {

		if ($(window).width() < '768' && ($(window).width() > '480' )) {
      $('.player').css('width', '720px');
      $('.player').css('height', '450px');
		} else if ($(window).width() < '480' && ($(window).width() > '320' )) {
      $('.player').css('width', '460px');
      $('.player').css('height', '285px');
		};
  });*/

//OPS

const sections = $(".section");
const display = $(".maincontent");
let inScroll = false;

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

const setActiveMenuItem = itemEq => {
  $('.breadcrumbs__item').eq(itemEq).addClass('active')
    .siblings().removeClass('active')
}

const performTransition = sectionEq => {
  const position = `${sectionEq * -100}%`;

  if (inScroll) return;

  inScroll = true;

  sections
    .eq(sectionEq)
    .addClass("active")
    .siblings()
    .removeClass("active");

  display.css({
    transform: `translate(0, ${position})`,
    "-webkit-transform": `translate(0, ${position})`
  });

  setTimeout(() => {
    inScroll = false;
    setActiveMenuItem(sectionEq);
  }, 1300); // продолжительность анимации + 300ms - потому что закончится инерция
};

const scrollToSection = direction => {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  if (direction === "up" && prevSection.length) {
    performTransition(prevSection.index());
  }

  if (direction === "down" && nextSection.length) {
    performTransition(nextSection.index());
  }
};

$(document).on({
  wheel: e => {
    const deltaY = e.originalEvent.deltaY;
    const direction = deltaY > 0 ? "down" : "up";

    scrollToSection(direction);
  },
  keydown: e => {
    switch (e.keyCode) {
      case 40:
        scrollToSection("down");
        break;

      case 38:
        scrollToSection("up");
        break;
    }
  },
  touchmove: e => e.preventDefault()

  // touchstart touchend touchmove
});


$('[data-scroll-to]').on('click', e => {
  e.preventDefault();

  const target = parseInt($(e.currentTarget).attr('data-scroll-to'));


  performTransition(target);

})
if (isMobile) {
  $(document).swipe({
    swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
      /**
       * плагин возвращает фактическое...
       * ...
       */

      const scrollDirection = direction === 'down' ? 'up' : 'down';

      scrollToSection(scrollDirection);
    }
  });
}

