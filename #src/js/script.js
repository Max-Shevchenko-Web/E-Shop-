//Убираем мерцание изменяемого элемента
document.querySelector('html').style.display = 'block';

//разный код под мобилки и пс
if (isMobile.any()) {
  const menuParents = document.querySelectorAll('.menu-page__parent>a');
  for (let index = 0; index < menuParents.length; index++) {
    const menuParent = menuParents[index];
    menuParent.addEventListener('click', (e) => {
      e.preventDefault();
      menuParent.parentElement.classList.toggle('_active');
    })
  }
} else {
  //sidebar
  const menuParents = document.querySelectorAll('.menu-page__parent');

  for (let index = 0; index < menuParents.length; index++) {
    const menuParent = menuParents[index];
    menuParent.addEventListener('mouseenter', function (e) {
      menuParent.classList.add('_active');
    });
    menuParent.addEventListener('mouseleave', function (e) {
      menuParent.classList.remove('_active');
    });
  }
}

//выбираем пункты в меню поиска
const watchCheked = () => {
  const checkboxCategories = document.querySelectorAll('.categories-search__checkbox');
  const searchQuantity = document.querySelector('.search-page__quantity');
  for (let index = 0; index < checkboxCategories.length; index++) {
    const checkboxCategory = checkboxCategories[index];
    checkboxCategory.addEventListener('change', () => {
      checkboxCategory.classList.toggle('_active');
      const checkboxActiveCategories = document.querySelectorAll('.categories-search__checkbox._active');
      if (checkboxActiveCategories.length > 0) {
        searchSelect.classList.add('_categories');
        searchQuantity.innerHTML = `${searchQuantity.dataset.text} ${checkboxActiveCategories.length}`
      } else {
        searchSelect.classList.remove('_categories');
      }
    })
  }
}

//Открываем выбор поиска
const searchSelect = document.querySelector('.search-page__title');
const categoriesSearch = document.querySelector('.categories-search');

searchSelect.addEventListener('click', () => {
  searchSelect.classList.toggle('_active');
  _slideToggle(categoriesSearch);
  watchCheked();
})

//<NOUISlider>==============================================================================================
//для настройки фильтра товара в catalog.html
if (document.querySelector('.price-filter')) {
  const priceSlider = document.querySelector('.price-filter__slider');

  noUiSlider.create(priceSlider, {
    start: [0, 100000],
    // step: 500,
    connect: true,
    tooltips: [wNumb({
      decimals: 0
    }), wNumb({
      decimals: 0
    })],
    range: {
      'min': [0],
      'max': [100000]
    },
    // pips: {
    //   mode: 'steps',
    //   density: 3,
    // }
  });

  const priceStart = document.querySelector('#price-start');
  const priceEnd = document.querySelector('#price-end');
  priceStart.addEventListener('change', function () {
    priceSlider.noUiSlider.set([priceStart.value, null]);
  });

  priceEnd.addEventListener('change', function () {
    priceSlider.noUiSlider.set([null, priceEnd.value]);
  });

  priceSlider.noUiSlider.on('update', function (values, handle) {
    priceStart.value = Math.trunc(values[handle, 0]);
    priceEnd.value = Math.trunc(values[handle, 1]);
  });
}

//делаем прослушу на клик по спойлеру фильтра
const spollers = document.querySelector('._spollers');

if (spollers) {
  const spollersArray = spollers.querySelectorAll('._spoller');
  spollersArray.forEach(item => {
    const spollersToggle = () => {
      item.classList.toggle('_active');
      _slideToggle(item.parentNode.children[1]);
    };
    item.addEventListener('click', throttle(spollersToggle, 500));
    item.parentNode.children[1].style.display = 'none';
  })
}