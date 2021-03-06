document.addEventListener('DOMContentLoaded', () => {

  /* header */
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
  // -- header
  //Кейсы глвная
  const caseItem = document.querySelectorAll('.case-item'),
        lazyImg = document.querySelectorAll('.lazy-img');

  if (caseItem.length > 0) {
    caseItem.forEach((elem) => {
        elem.addEventListener('click', () => {
          window.location.href = elem.dataset.src;
        });
    });
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      if (lazyImg.length > 0) {
        lazyImg.forEach((elem) => {
          if (elem.src.length < 1) {
            elem.src = elem.dataset.src;
          }
        });
      }
      
      caseItem.forEach((elem) => {
          if (!elem.classList.contains('loaded-case')) {
              elem.style = `background-image: url(${elem.dataset.img})`;
              elem.classList.add('loaded-case'); 
          } 
      });

    }
  }, {once: true});
  // -- Кейсы главная
  //Отзывы
  const iframeFeed = document.querySelectorAll('.feed-wrap-item');

  if (iframeFeed.length > 0) {
    iframeFeed.forEach((elem) => {
      elem.addEventListener('click', () => {
        elem.classList.add('feed-wrap-item-active');
        console.log(elem.children[0])
        elem.children[0].src = elem.children[0].dataset.src;

      }, {once: true});
    })
  }

  // -- отзывы

  // Наши работы (page)
  const ourWorksItem = document.querySelectorAll('.our-works-wrap-item'),
        ourWorksMoarBtn = document.querySelector('.our-works-moar'),
        ourWorksMoarItems = document.querySelector('.our-works-moar-items');

  if (ourWorksItem.length > 0) {

    if (ourWorksItem.length <= 3) {

      ourWorksMoarBtn.style.display = 'none';

    } else {

      let workCount = 5;

      ourWorksMoarItems.children[0].textContent = workCount - 2;
      ourWorksMoarItems.children[2].textContent = ourWorksItem.length;

     
      ourWorksMoarBtn.addEventListener('click', () => {

        ourWorksItem.forEach((elem, i) => {

          if (i <= workCount) {
            elem.style.display = 'block';
            if (i >= ourWorksItem.length - 1) {
               ourWorksMoarBtn.style.display = 'none';
               console.log('enddd')
             } 
          }
         
        });

        workCount += 3;

        ourWorksMoarItems.children[0].textContent = workCount - 2;
      });
      
    }

  }
  // ---Наши работы (page)


  //popup

  const popup = document.querySelectorAll('.popup'),
        overlay = document.querySelector('.overlay'),
        callConsultation = document.querySelectorAll('.call-consultation'),
        callLanding = document.querySelectorAll('.call-landing'),
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
  if (callLanding.length > 0) {
    callLanding.forEach((elem) => {
      elem.addEventListener('click', () => {
        const popupLanding = document.querySelector('.popup-landing');
        myFadeInFlex(popupLanding);
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
  // -- popup

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
  // -- select

  




});