$(() => {
  let isMobile;
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    isMobile = true;

    // Mobile height fix
    $('.height-fix').each(() => {
      let h = $(this).height();
      $(this).height(h);
    });
  }

  // RESIZE RESETS
  $(window).resize(function () {
    posFilterBar($('.filter').first());
  });

  // Sticky Nav on Mobile
  if (isMobile) {
    $('nav').addClass('fixed');
  } else {
    $('nav').addClass('desk');
  }

  // NAV POSITION
  const navPos = $('nav').position().top;
  let lastPos = 0;
  let lockTimer;

  $(window).on('scroll', () => {
    const pos = $(window).scrollTop();
    const pos2 = pos + 50;
    const scrollBottom = pos + $(window).height();

    if (!isMobile) {
      if (pos >= navPos + $('nav').height() && lastPos < pos) {
        $('nav').addClass('fixed');
      }
      if (pos < navPos && lastPos > pos) {
        $('nav').removeClass('fixed');
      }
      lastPos = pos;
    }

    // Link Highlighting
    if (pos2 > $('#home').offset().top) {
      highlightLink('home');
    }
    if (pos2 > $('#about').offset().top) {
      highlightLink('about');
    }
    if (pos2 > $('#portfolio').offset().top) {
      highlightLink('portfolio');
    }
    if (pos2 > $('#blog').offset().top) {
      highlightLink('blog');
    }
    if (
      pos2 > $('#contact').offset().top ||
      pos + $(window).height() === $(document).height()
    ) {
      highlightLink('contact');
    }

    // Prevent Hover on Scroll
    clearTimeout(lockTimer);
    if (!$('body').hasClass('disable-hover')) {
      $('body').addClass('disable-hover');
    }

    lockTimer = setTimeout(() => {
      $('body').removeClass('disable-hover');
    }, 500);
  });

  function highlightLink(anchor) {
    $('nav .active').removeClass('active');
    $('nav')
      .find('[dest="' + anchor + '"]')
      .addClass('active');
  }

  // EVENT HANDLERS
  $('.page-link').click(function () {
    const anchor = $(this).attr('dest');
    $('.link-wrap').removeClass('visible');

    $('nav span').removeClass('active');
    $('nav')
      .find('[dest="' + anchor + '"]')
      .addClass('active');

    $('html, body').animate(
      {
        scrollTop: $('#' + anchor).offset().top
      },
      400
    );
  });

  $('.mdi-menu').click(() => {
    $('.link-wrap').toggleClass('visible');
  });

  $('.blog-wrap').hover(
    function () {
      $('.blog-wrap')
        .not(this)
        .addClass('fade');
      $(this).addClass('hover');
    },
    function () {
      $(this).removeClass('hover');
      $('.blog-wrap').removeClass('fade');
    }
  );

  posFilterBar($('.filter').first());

  $('.filter').click(function () {
    posFilterBar(this);
  });

  function posFilterBar(elem) {
    const origin = $(elem)
      .parent()
      .offset().left;
    const pos = $(elem).offset().left;
    $('.float-bar').css({
      left: pos - origin,
      width: $(elem).innerWidth()
    });
    $('.float-bar .row').css('left', (pos - origin) * -1);
  }

  // GALLERY
  $('#gallery').mixItUp({});

  function mixClear() {
    setTimeout(function () {
      $('#gallery').removeClass('waypoint');
    }, 2000);
  }

  // SCROLL ANIMATIONS
  function onScrollInit(items, elemTrigger) {
    const offset = $(window).height() / 1.6;
    items.each(function () {
      let elem = $(this),
        animationClass = elem.attr('data-animation'),
        animationDelay = elem.attr('data-delay');

      elem.css({
        '-webkit-animation-delay': animationDelay,
        '-moz-animation-delay': animationDelay,
        'animation-delay': animationDelay
      });

      let trigger = elemTrigger ? trigger : elem;

      trigger.waypoint(
        function () {
          elem.addClass('animated').addClass(animationClass);
          if (elem.get(0).id === 'gallery') mixClear(); //OPTIONAL
        },
        {
          triggerOnce: true,
          offset: offset
        }
      );
    });
  }

  setTimeout(function () {
    onScrollInit($('.waypoint'));
  }, 10);

  // CONTACT FORM
  $('#close').click(function () {
    $('#success').removeClass('expand');
  });
});
