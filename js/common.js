document.addEventListener('DOMContentLoaded', () => {

  //header
  const burger = document.querySelector('.burger'),
        navMenu = document.querySelector('.header-nav');
    
  burger.addEventListener('click', () => {
    if (burger.classList.contains('burger-active')) {
      burger.classList.remove('burger-active');
      navMenu.classList.remove('header-nav-active');
    } else {
      burger.classList.add('burger-active');
      navMenu.classList.add('header-nav-active');
    }
  });

  const screenWidth = window.screen.width;

  if (screenWidth <= 992) {
    const navLinks = document.querySelectorAll('li.menu-item-has-children > div');

    navLinks.forEach((elem) => {
        elem.addEventListener('click', () => {
            if (elem.parentElement.classList.contains('link-active')) {
                elem.parentElement.classList.remove('link-active');
            } else {
                elem.parentElement.classList.add('link-active');
            }
        });
    });
  } 
  //

  //Кейсы глвная
  const caseItem = document.querySelectorAll('.case-item'),
        iframeFeed = document.querySelectorAll('.feed-wrap-item iframe');

  if (caseItem.length > 0) {
    caseItem.forEach((elem) => {
        elem.addEventListener('click', () => {
          window.location.href = elem.dataset.src;
        });
    });
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      
      caseItem.forEach((elem) => {
          if (!elem.classList.contains('loaded-case')) {
              elem.style = `background-image: url(${elem.dataset.img})`;
              elem.classList.add('loaded-case'); 
          } 
      });

      if (iframeFeed.length > 0) {
        iframeFeed.forEach((elem) => {
          elem.src = elem.dataset.src;
        });
      }

    }
  }, {once: true});
  //
  //popup

  const popup = document.querySelectorAll('.popup'),
        overlay = document.querySelector('.overlay'),
        callConsultation = document.querySelectorAll('.call-consultation'),
        close = document.querySelectorAll('.popup .close');

  if (callConsultation.length > 0) {
    callConsultation.forEach((elem) => {
      elem.addEventListener('click', () => {
        const popupConsultation = document.querySelector('.popup-consultation');
        myFadeInFlex(popupConsultation);
        myFadeInFlex(overlay);
      });
    })
  }

  

  overlay.addEventListener('click', () => {
    popup.forEach((elem) => {
      popup.forEach((elem) => {
        myFadeOut(elem);
      });
      myFadeOut(overlay);
    });
  });
  
  close.forEach((elem) => {
    elem.addEventListener('click', () => {
      popup.forEach((elem) => {
        myFadeOut(elem);
      });
      myFadeOut(overlay);
    });
  });

  //FADE JS
  function myFadeOut(el) {
    var opacity = 1;
    var timer = setInterval(function() {
      if(opacity <= 0.1) {
        clearInterval(timer);
        el.style.display = "none";
      }
      el.style.opacity = opacity;
      opacity -= opacity * 0.1;
    }, 10);
  }

  function myFadeInFlex(el) {
    var opacity = 0.01;
    el.style.display = "block";
    var timer = setInterval(function() {
      if(opacity >= 1) {
        clearInterval(timer);
      }
      el.style.opacity = opacity;
      opacity += opacity * 0.1;
    }, 0.1);
  }


  //select
  $('select').addClass('select');

  $('.select').each(function() {
    const _this = $(this),
        selectOption = _this.find('option'),
        selectOptionLength = selectOption.length,
        selectedOption = selectOption.filter(':selected'),
        duration = 150; // длительность анимации 

    _this.hide();
    _this.wrap('<div class="select"></div>');
    $('<div>', {
        class: 'new-select',
        text: _this.children('option:disabled').text()
    }).insertAfter(_this);

    const selectHead = _this.next('.new-select');
    $('<div>', {
        class: 'new-select__list'
    }).insertAfter(selectHead);

    const selectList = selectHead.next('.new-select__list');
    
    for (let i = 1; i < selectOptionLength; i++) {
        $('<div>', {
            class: 'new-select__item',
            html: $('<span>', {
                text: selectOption.eq(i).text()
            })
        })
        .attr('data-value', selectOption.eq(i).val())
        .appendTo(selectList);
    }

    const selectItem = selectList.find('.new-select__item');
    selectList.slideUp(0);
    selectHead.on('click', function() {
        if ( !$(this).hasClass('on') ) {
            $(this).addClass('on');
            selectList.slideDown(duration);

            selectItem.on('click', function() {
                let chooseItem = $(this).data('value');

                $('select').val(chooseItem).attr('selected', 'selected');
                selectHead.text( $(this).find('span').text() );

                selectList.slideUp(duration);
                selectHead.removeClass('on');
            });

        } else {
            $(this).removeClass('on');
            selectList.slideUp(duration);
        }
    });
  });
  //select

  




});