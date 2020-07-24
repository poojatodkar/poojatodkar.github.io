$(document).ready(function () {
  // MODAL
  var modalText = {
    coverfoxcrm: {
      title: 'Coverfox CRM',
      tag: 'COVERFOX CRM TOOL.',
      detail: 'This is inhouse CRM tool of coverfox with dialer integration.',
      link: 'https://ultron.coverfox.com/'
    },
    coverfox: {
      title: 'Coverfox',
      tag: 'COVERFOX INSURANCE PVT LTD.',
      detail:
        'Coverfox is an IRDAI authorised insurance broking firm. Helps comparing features and prices of an insurance policy and buy the best policy that you deserve.',
      link: 'https://coverfox.com/'
    },
    cfsupport: {
      title: 'CFSupport',
      tag: 'INSURANCE SALES ANND REPORT MONITORING.',
      detail:
        'CFsupport is an internal tool that provides analytics and reporting for the company to use on the go.',
      link: 'https://www.coverfox.com/user/cfsupport/'
    },
    campuskudos: {
      title: 'CampusKudos',
      tag: 'ALUMNI STUDENT NETWORKING PLATFORM.',
      detail:
        'Product that help institutions bring personalized, mentor-focused communities to students and alumni from enrollment to long after graduation.',
      link: 'https://careerquest.umgc.edu/'
    },
    vdm: {
      title: 'Montessori Connect',
      tag: 'SCHOOL MANAGEMENT CMS.',
      detail:
        'Merging the power of technology and Montessori education, Infojini has developed application to streamline Montessori school daily management and communication with parents. The app aims at providing details on the educational growth of the student and simplifying staff management.',
      link: 'https://www.infojiniconsulting.com/montessori-connect/'
    },
    mmscnycms: {
      title: 'GetThereSCNY CMS',
      tag: 'CLIENT CMS.',
      detail:
        'Client CMS to maintain the content of website "https://gettherescny.org/"',
      link: 'https://cms.gettherescny.org/'
    },
    mmscny: {
      title: 'GetThereSCNY',
      tag: 'CLIENT WEBSITE.',
      detail:
        'Getthere is a mobility management program of the Rural Health Network of South Central New York whose mission is to advance the health and well-being of rural people and communities.',
      link: 'https://gettherescny.org/'
    },
    talentdome: {
      title: 'TalentDome',
      tag: 'JOB PORTAL CMS.',
      detail:
        'Job portal CMS to manage job positions and applications along with career page and analytics.',
      link: 'https://talentdome.infojiniconsulting.com/'
    },
    chatapp: {
      title: 'Chat App',
      tag: 'CHAT APP.',
      detail:
        'A simple chat app using NodeJs and Web sockets.',
      link: 'https://chat-app-pt.herokuapp.com/'
    },
    tictactoe: {
      title: 'Tic Tac Toe',
      tag: 'GAMING APPLICATION.',
      detail:
        'No need to waste paper to play puzzle games! Now you can play Tic Tac Toe on your device for free.',
      link: 'https://tictactoe-pt.herokuapp.com/'
    },
    weatherforecast: {
      title: 'Weather Forecast',
      tag: 'WEATHER FORECAST APPLICATION.',
      detail:
        'Get weather forecast details of one or more cities.',
      link: 'https://weather-forecast-pt.herokuapp.com/'
    },
    producthunt: {
      title: 'ProductHunt',
      tag: 'PRODUCT SEARCH APPLICATION',
      detail:
        'Get product list and their details using date filter.',
      link: 'https://products-pt.herokuapp.com/'
    }
  };

  $('#gallery .button').on('click', function () {
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function () {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function () {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
    slideWidth = 700,
    threshold = slideWidth / 3,
    dragStart,
    dragEnd;

  setDimensions();

  $('#next').click(function () {
    shiftSlide(-1);
  });
  $('#prev').click(function () {
    shiftSlide(1);
  });

  carousel.on('mousedown', function () {
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function () {
      dragEnd = event.pageX;
      $(this).css('transform', 'translateX(' + dragPos() + 'px)');
    });
    $(document).on('mouseup', function () {
      if (dragPos() > threshold) {
        return shiftSlide(1);
      }
      if (dragPos() < -threshold) {
        return shiftSlide(-1);
      }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      slideWidth = $(window).innerWidth();
    }
    $('.carousel-wrap, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1);
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup');
    carousel
      .off('mousemove')
      .addClass('transition')
      .css('transform', 'translateX(' + direction * slideWidth + 'px)');
    setTimeout(function () {
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition');
      carousel.css('transform', 'translateX(0px)');
    }, 700);
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link)
      $('#modal .button')
        .addClass('visible')
        .parent()
        .attr('href', modalText[id].link);

    $.each($('#modal li'), function (index, value) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function (index, value) {
      $(this).css({
        background:
          "url('./assets/images/" + id + '-' + index + ".jpg') center center/contain no-repeat",
        backgroundSize: 'contain'
      });
    });
  }
});
