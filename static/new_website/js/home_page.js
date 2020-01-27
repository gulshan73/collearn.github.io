$(document).ready(function () {
    // todo the document ready constraint
    //from-pace-wisdom.com
    $('.f1_card').on('click', function () {
        if ($(this).hasClass("animate")) {
            $(this).removeClass("animate")
        } else {

            $(this).addClass("animate")
        }
    })

    // $('.front img').mouseover(function () {
    //     var newSrc = $(this).attr("src").replace("static/new_website/img/artificial-intelligence.svg", "static/new_website/img/artificial-intelligence.svg");
    //     $(this).attr("src", newSrc);
    // });
    // $('img').mouseout(function () {
    //     var newSrc = $(this).attr("src").replace("static/new_website/img/artificial-intelligence.svg", "static/new_website/img/artificial-intelligence.svg");
    //     $(this).attr("src", newSrc);
    // });
    

    $('.slider').each(function() {
        var $this = $(this);
        var $group = $this.find('.slide_group');
        var $slides = $this.find('.slide');
        var bulletArray = [];
        var currentIndex = 0;
        var timeout;
        
        function move(newIndex) {
          var animateLeft, slideLeft;
          
          advance();
          
          if ($group.is(':animated') || currentIndex === newIndex) {
            return;
          }
          
          bulletArray[currentIndex].removeClass('active');
          bulletArray[newIndex].addClass('active');
          
          if (newIndex > currentIndex) {
            slideLeft = '100%';
            animateLeft = '-100%';
          } else {
            slideLeft = '-100%';
            animateLeft = '100%';
          }
          
          $slides.eq(newIndex).css({
            display: 'block',
            left: slideLeft
          });
          $group.animate({
            left: animateLeft
          }, function() {
            $slides.eq(currentIndex).css({
              display: 'none'
            });
            $slides.eq(newIndex).css({
              left: 0
            });
            $group.css({
              left: 0
            });
            currentIndex = newIndex;
          });
        }
        
        function advance() {
          clearTimeout(timeout);
          timeout = setTimeout(function() {
            if (currentIndex < ($slides.length - 1)) {
              move(currentIndex + 1);
            } else {
              move(0);
            }
          }, 4000);
        }
        
        $('.next_btn').on('click', function() {
          if (currentIndex < ($slides.length - 1)) {
            move(currentIndex + 1);
          } else {
            move(0);
          }
        });
        
        $('.previous_btn').on('click', function() {
          if (currentIndex !== 0) {
            move(currentIndex - 1);
          } else {
            move(3);
          }
        });
        
        $.each($slides, function(index) {
          var $button = $('<a class="slide_btn">&bull;</a>');
          
          if (index === currentIndex) {
            $button.addClass('active');
          }
          $button.on('click', function() {
            move(index);
          }).appendTo('.slide_buttons');
          bulletArray.push($button);
        });
        
        advance();
      });

    

    var win_w = $(window).width();
    var win_h = screen.height;
    var user_name, user_number, img, imgClass, imgURL, svg, banner_height;

    $('#banner_video').html("<source src='" + $("#banner_video").data(
        win_w > 500 ? 'src_desk' : 'src_mob') + "' type='video/mp4'>");

    $.each(['.title-one', '.title-two', '.title-three', '.tagline-text', '.location-text', '.btn-div',], function (i, item) {
        $(item).addClass('move_to_pos_visible');
    });

    $('#home-cta').on('click', function () {
        $('html, body').animate({ scrollTop: $("#about_openhouse").offset().top }, 1000);
    });

    if (win_w >= 500) {
        var visible = false;
        $(document).scroll(function () {
            var y = $(this).scrollTop();
            console.log(y,.8*win_h);
            if ((y > .8 * win_h) & !visible) {
                visible = true;
                $('.header').animate({ 'opacity': 1 }, 'fast');
            } else if ((y <= .8 * win_h) & visible) {
                visible = false;
                $('.header').animate({ 'opacity': 0 }, 'fast');
            }
        });
    }
    var subjects = [],
        loader = $('#loader_modal'),
        age = $('#user_age').html(),
        location = $('#user_location').html(),
        source = $("#utm_source").html();

    $("#contact_us_form").on("submit", function (e) {
        e.preventDefault();
        $('#loader_modal').modal('show');
        if ($('#select-ac_market').is(':checked')) {
            location = 'Theatre Road'
        }
        if ($('#select-salt_lake').is(':checked')) {
            location = 'Salt Lake'
        }
        $(this).children('.location').val(location);

        $.ajax({
            type: $(this).attr('method'),
            url: $(this).attr('action'),
            data: $(this).serialize(),
            dataType: 'json',
            success: function (data) {
                setTimeout(function () {
                    $('#loader_modal').modal('hide');
                    Swal.fire({
                        type: 'success',
                        title: 'Thank You!',
                        html: '<br>' + data.body +
                            '<br><br><br><div>Location: <a href="' + data.loc_link +
                            '">' +
                            data.location + '</a><br><br><a href="tel:9073223854"><i class="fa fa-phone w3-margin-right"></i>9073223854</a></div><br>',
                        confirmButtonColor: '#4DB6AC',
                        width: Math.min(win_w, 500).toString() + 'px',
                        padding: '3em',
                        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!'
                    });
                }, 500);
                gtag('config', 'UA-124077418-1', { 'page_path': '/thank_you' });
                fbq('track', 'CompleteRegistration');
            },
            error: function (data) {
                setTimeout(function () {
                    $('#loader_modal').modal('hide');
                    Swal.fire({
                        type: 'error',
                        html: 'Error signing up',
                    })
                }, 500);
            }
        });
        return false;
    });
    $("#school").autocomplete({
        source: "/school_name/",
        minLength: 0,
        select: function (event, ui) {
            $(this).val(ui.item.value);
        },
        appendTo: "#schools",
        open: function () {
            var position = $("#school").position(),
                left = position.left, top = position.top;
            $("#schools > ul").css({
                left: left - 5 + "px",
                top: top + 3 + "px"
            });
        }
    }).bind('focus', function () { $(this).autocomplete("search"); });
});

(function () {
    // Vertical Timeline - by CodyHouse.co
    function VerticalTimeline(element) {
        this.element = element;
        this.blocks = this.element.getElementsByClassName("js-cd-block");
        this.images = this.element.getElementsByClassName("js-cd-img");
        this.contents = this.element.getElementsByClassName("js-cd-content");
        this.offset = 0.8;
        this.hideBlocks();
    };

    VerticalTimeline.prototype.hideBlocks = function () {
        //hide timeline blocks which are outside the viewport
        if (!"classList" in document.documentElement) {
            return;
        }
        var self = this;
        for (var i = 0; i < this.blocks.length; i++) {
            (function (i) {
                if (self.blocks[i].getBoundingClientRect().top > window.innerHeight * self.offset) {
                    if (self.images[i]) { self.images[i].classList.add("cd-is-hidden"); }
                    self.contents[i].classList.add("cd-is-hidden");
                }
            })(i);
        }
    };

    VerticalTimeline.prototype.showBlocks = function () {
        if (!"classList" in document.documentElement) {
            return;
        }
        var self = this;
        for (var i = 0; i < this.blocks.length; i++) {
            (function (i) {
                if (self.contents[i].classList.contains("cd-is-hidden") && self.blocks[i].getBoundingClientRect().top <= window.innerHeight * self.offset) {
                    // add bounce-in animation
                    self.contents[i].classList.add("cd-timeline__content--bounce-in");
                    self.contents[i].classList.remove("cd-is-hidden");

                    if (self.images[i]) {
                        self.images[i].classList.add("cd-timeline__img--bounce-in");
                        self.images[i].classList.remove("cd-is-hidden");
                    }
                }
            })(i);
        }
    };

    var verticalTimelines = document.getElementsByClassName("js-cd-timeline"),
        verticalTimelinesArray = [],
        scrolling = false;
    if (verticalTimelines.length > 0) {
        for (var i = 0; i < verticalTimelines.length; i++) {
            (function (i) {
                verticalTimelinesArray.push(new VerticalTimeline(verticalTimelines[i]));
            })(i);
        }

        //show timeline blocks on scrolling
        window.addEventListener("scroll", function (event) {
            if (!scrolling) {
                scrolling = true;
                (!window.requestAnimationFrame) ? setTimeout(checkTimelineScroll, 250) : window.requestAnimationFrame(checkTimelineScroll);
            }
        });
    }

    function checkTimelineScroll() {
        verticalTimelinesArray.forEach(function (timeline) {
            timeline.showBlocks();
        });
        scrolling = false;
    };
})();
