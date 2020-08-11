window.onload = function () {
  const burger = document.querySelector('.icon-menu');
  const menu = document.querySelector('.menu__body');
  const body = document.querySelector('body');

  burger.addEventListener('click', e => {
    const handlerList = e => {
      burger.classList.remove('_active');
      menu.classList.remove('_active');
      body.classList.remove('lock');
      menu.removeEventListener('click', handlerList);
    }
    //создаем кастомное событие
    const event = new MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': true
    });
    if (!burger.classList.contains('_active')) {
      burger.classList.add('_active');
      menu.classList.add('_active');
      //когда открываем меню нужно выключить скрол
      body.classList.add('lock');
      menu.addEventListener('click', handlerList)
    } else {
      //симулируем клик
      menu.dispatchEvent(event);
    }
  });

  //бургер сайдбара
  const menuPageBurger = document.querySelector('.menu-page__burger');
  const menuPageBody = document.querySelector('.menu-page__body');

  menuPageBurger.addEventListener('click', () => {
    //обычный вариант
    // menuPageBurger.classList.toggle('_active');
    // menuPageBody.classList.toggle('_active');
    // используя заготовку с функций.джс
    menuPageBurger.classList.toggle('_active');
    _slideToggle(menuPageBody);
  })
};