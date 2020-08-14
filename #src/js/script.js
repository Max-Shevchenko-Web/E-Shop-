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
//=============================================

//делаем прослушки на клик по спойлерам фильтра
const spollers = document.querySelector('._spollers');
const createSpoilers = () => {
  if (spollers) {
    const fillterItem = document.querySelector('.filter__title');
    const spollersToggle = (e) => {
      const target = e.target;
      throttle(() => {
        target.classList.toggle('_active');
        _slideToggle(target.nextElementSibling);
      }, 500)();
    };

    const spollersArray = spollers.querySelectorAll('._spoller');
    spollersArray.forEach(item => {
      item.addEventListener('click', spollersToggle);
      item.nextElementSibling.style.display = 'none';
    });

    const toggleFillterItemClass = () => {
      if (isMobile.any()) {
        fillterItem.classList.remove('_active');
        fillterItem.classList.add('_spol');
        fillterItem.nextElementSibling.style.display = 'none';
        fillterItem.addEventListener('click', spollersToggle);
      } else {
        fillterItem.removeEventListener('click', spollersToggle);
        fillterItem.classList.remove('_spol');
      }
    }
    toggleFillterItemClass();

    //Resize
    window.onresize = toggleFillterItemClass;
  }
}

createSpoilers();

//переключение на каталог или список
const viewCatalog = document.querySelector('.actions-catalog__view');

if (viewCatalog) {
  const optionItems = [...document.querySelectorAll('.view-catalog__item')];
  const catalogViewArray = [document.querySelector('.catalog__products_grid.items-products'),document.querySelector('.catalog__products-list.products-list')];
  const switchViewMode = (e) => {
    const target = e.target;
    optionItems.forEach((item, index) => {
      item.classList.remove('_active');
      catalogViewArray[index].classList.toggle('_active');
    });
    target.classList.add('_active');
  }
  
  optionItems.forEach(item => {
    item.addEventListener('click', switchViewMode);
  });
}
//переключение между списком и сеткой товаров

//вешаем класс на кнопку сравнить compare
const buttonsCompares = [...document.querySelectorAll('.tog-compare')];
if(buttonsCompares.length > 0) {
  buttonsCompares.forEach(item => {
    item.addEventListener('click', (e)=> {
      const target = e.target;
      target.closest('.tog-compare').classList.toggle('_active');
    });
  })
}

//добавляем скидки
const catalogProductsList = document.querySelector('.catalog__products-list');
if (catalogProductsList) {
  const salaryLabel = [...document.querySelectorAll('.item-list__label')];
  const salaryOldPrice = [...document.querySelectorAll('.item-list__old-price')];
  const isSalary = [0,1,0,0,1,1,0,0,1];

  for(i=0; i<=catalogProductsList.children.length; i++) {
    if (isSalary[i]) {
      salaryLabel[i].classList.toggle('_active');
      salaryOldPrice[i].classList.toggle('_active');
    }
  }
}














