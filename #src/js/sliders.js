// BildSlider
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
  for (let index = 0; index < sliders.length; index++) {
    let slider = sliders[index];
    if (!slider.classList.contains('swiper-bild')) {
      let slider_items = slider.children;
      if (slider_items) {
        for (let index = 0; index < slider_items.length; index++) {
          let el = slider_items[index];
          el.classList.add('swiper-slide');
        }
      }
      let slider_content = slider.innerHTML;
      let slider_wrapper = document.createElement('div');
      slider_wrapper.classList.add('swiper-wrapper');
      slider_wrapper.innerHTML = slider_content;
      slider.innerHTML = '';
      slider.appendChild(slider_wrapper);
      slider.classList.add('swiper-bild');
    }
    if (slider.classList.contains('_gallery')) {
      //  slider.data('lightGallery').destroy(true);
    }
  }
  sliders_bild_callback();
}

function sliders_bild_callback(params) {}


//слайдер верхний с картинками и кружками
if (document.querySelector('.mainslider')) {
  let mainslider = new Swiper('.mainslider__body', {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 0,
    autoHeight: true,
    speed: 800,
    //  loop: true,
    pagination: {
      el: '.mainslider__dotts',
      clickable: true,
    },
    on: {
      lazyImageReady: function () {
        ibg();
      },
    }
  });

  //пробежимся по всем слайдам возьмем у них картинку и добавим точкам
  let mainsliderImages = document.querySelectorAll('.mainslider__image');
  setTimeout(() => {
    let mainsliderDotts = document.querySelector('.mainslider__dotts').children;
    for (let index = 0; index < mainsliderImages.length; index++) {
      const mailsliderImage = mainsliderImages[index].querySelector('img').src;
      mainsliderDotts[index].style.backgroundImage = "url('" + mailsliderImage + "')";
    }

  }, 50);
}

//продуктиовый слайдер с карточками товара
if (document.querySelector('.products-slider')) {
  let productsSlider = new Swiper('.products-slider__item', {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 0,
    autoHeight: true,
    speed: 800,
    //Arrows
    "arrowParens": true,
    navigation: {
      nextEl: '.products-slider__arrow_next',
      prevEl: '.products-slider__arrow_prev',
    },

    //  loop: true,
    pagination: {
      el: '.products-slider__info',
      type: 'fraction',
    },
    on: {
      lazyImageReady: function () {
        ibg();
      },
    }
  });
}

//brands slider
if (document.querySelector('.brands-slider')) {
  let brandsSlider = new Swiper('.brands-slider__body', {
    observer: true,
    observeParents: true,
    slidesPerView: 5,
    spaceBetween: 0,
    // autoHeight: true,
    speed: 800,
    //Arrows
    "arrowParens": true,
    navigation: {
      nextEl: '.brands-slider__arrow_next',
      prevEl: '.brands-slider__arrow_prev',
    },
    loop: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
        autoHeight: true,
      },
      480: {
        slidesPerView: 2,
      },
      600: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
      },
      992: {
        slidesPerView: 5,
      },
    }
  });
}


// let mainslider = new Swiper('.mainslider__body ', {
//     /*
//     effect: 'fade',
//     autoplay: {
//       delay: 3000,
//       disableOnInteraction: false,
//     },
//     */
//    observer: true,
//    observeParents: true,
//    slidesPerView: 1,
//    spaceBetween: 0,
//    autoHeight: true,
//    speed: 800,
//   //  loop: true,
//     //  touchRatio: 0,
//   /*
//     simulateTouch: false,

//     preloadeImages: false,
//     lazy: true,
//   */
//   // Dotts
//     pagination: {
//       el: '.mainslider__dotts',
//       clickable: true,
//       // renderBullet: function (index, className) {
//       //   return '<span class="' + className + '">' + (index + 1) + '</span>';
//       // },
//     },

//   //Arrows
//     // navigation: {
//     //   nextEl: '.about__more .more__item_next',
//     //   prevEl: '.about__more .more__item_prev',
//     // },
//   //Много закоментированых настроек
//     on: {
//       lazyImageReady: function () {
//         ibg();
//       },
//     }
//     // //And if we need scrollbar
//     // //scrollbar: {
//     //   el: './swiper-scrollbar',
//     // },
//   });