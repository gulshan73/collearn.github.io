$(document).click(function(event) {
    var clickover = $(event.target);
    var _opened = $(".navbar-collapse").hasClass("in");
    if (_opened === true && !(clickover.closest('.navbar-collapse') == null || clickover.hasClass('navbar-collapse'))) {
        $("button.navbar-toggler").click();
    }
});

$(document).ready(function() {
    jQuery('img.svg').each(function() {
        $('svg').addClass('hidden');
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            var $svg = jQuery(data).find('svg');
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }
            $svg = $svg.removeAttr('xmlns:a');
            if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }
            $svg.removeClass('hidden');
            $img.replaceWith($svg);
        }, 'xml');
    });

    var age = $('#user_age').html(),
        location = $('#user_location').html(),
        source = $("#utm_source").html(),
        loader = $('#loader_modal'),
        classes_url = '/classes/',
        workshops_url = '/workshops/',
        workshop_filter = window.location.pathname.indexOf('workshops') > -1 ? true : false;

    function url_add_param(url, param_name, param_val) {
        return url + (url.indexOf('?') > -1 ? '&' : '?') + param_name + '=' + param_val;
    }

    $('.location-select-checkbox').prop('checked', false);
    $('.age-card').removeClass('btn-selected');
    if (location != '') {
        $('.location-card').removeClass('btn-selected');
        $('.location-select-checkbox').prop('checked', false);
        $('.location_name').each(function() {
            if ($(this).html() == location) {
                loc_card = $(this).closest('.location-card');
                loc_card.addClass('btn-selected');
                $('.location-select-checkbox', loc_card).prop('checked', true);
                return false;
            }
        });
    }
    if (age != '') {
        $('.age-card').removeClass('btn-selected');
        $('.age-select-checkbox').prop('checked', false);
        $('.age-card').each(function() {
            if ($(this).data('age') == age) {
                $(this).addClass('btn-selected');
                $('.age-select-checkbox', this).prop('checked', true);
                return false;
            }
        });
    }
    // if (age != '') {
    //     $('.standard-btn').removeClass('btn-selected');
    //     $('.standard-btn').each(function() {
    //         if ($(this).data('age') == age) {
    //             $(this).addClass('btn-selected');
    //             return false;
    //         }
    //     });
    // }

    function load_page() {
        base_url = workshop_filter ? workshops_url : classes_url;
        if (location != '' & age != '') {
            loader.modal('toggle');
            base_url = url_add_param(base_url, 'age', age);
            base_url = url_add_param(base_url, 'openhouse', location);
            if (source != '') {
                classes_url = url_add_param(base_url, 'utm_source', source);
            }
            window.location.href = base_url;
        }
    };

    // $('.standard-btn').each( function() {
    //     var btn = $(this);
    //     btn.on('click', function() {
    //         if (btn.hasClass('btn-selected')) {
    //             $('.standard-btn').removeClass('btn-selected');
    //             age = '';
    //         } else {
    //             $('.standard-btn').removeClass('btn-selected');
    //             btn.addClass('btn-selected');
    //             age = btn.data('age');
    //             $('.filter-applied-age').html(age);
    //             load_page();
    //         }
    //     });
    // });

    $('.location-card').each( function() {
        var loc_card = $(this);
        loc_card.on('click', function() {
            if (loc_card.hasClass('btn-selected')) {
                loc_card.removeClass('btn-selected');
                $('.location-select-checkbox', loc_card).prop('checked', false);
                location = '';
            } else {
                $('.location-card').removeClass('btn-selected');
                loc_card.addClass('btn-selected');
                location = $('.location_name', loc_card).html();
                $('.location-select-checkbox').prop('checked', false);
                $('.location-select-checkbox', loc_card).prop('checked', true);
                load_page();
            }
        });
    });
    $('.location-checkbox-div').each( function() {
        var checkbox = $(this);
        checkbox.on('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            loc_card = $(this).closest('.location-card');
            if (loc_card.hasClass('btn-selected')) {
                loc_card.removeClass('btn-selected');
                $('.location-select-checkbox', loc_card).prop('checked', false);
                location = '';
            } else {
                $('.location-card').removeClass('btn-selected');
                loc_card.addClass('btn-selected');
                location = $('.location_name', loc_card).html();
                $('.location-select-checkbox').prop('checked', false);
                $('.location-select-checkbox', loc_card).prop('checked', true);
                load_page();
            }
        });
    });

    $('.age-card').each( function() {
        var age_card = $(this);
        age_card.on('click', function() {
            if (age_card.hasClass('btn-selected')) {
                age_card.removeClass('btn-selected');
                $('.age-select-checkbox', age_card).prop('checked', false);
                age = '';
            } else {
                $('.age-card').removeClass('btn-selected');
                age_card.addClass('btn-selected');
                age = age_card.data('age');
                $('.age-select-checkbox').prop('checked', false);
                $('.age-select-checkbox', age_card).prop('checked', true);
                load_page();
            }
        });
    });
    $('.age-checkbox-div').each( function() {
        var checkbox = $(this);
        checkbox.on('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            age_card = $(this).closest('.age-card');
            if (age_card.hasClass('btn-selected')) {
                age_card.removeClass('btn-selected');
                $('.age-select-checkbox', age_card).prop('checked', false);
                age = '';
            } else {
                $('.age-card').removeClass('btn-selected');
                age_card.addClass('btn-selected');
                age = age_card.data('age');
                $('.age-select-checkbox').prop('checked', false);
                $('.age-select-checkbox', age_card).prop('checked', true);
                load_page();
            }
        });
    });
    $('.adjust-height').each(function() {
        var element = $(this);
        element.css('height', element.closest('.row').height());
    });
    $('.adjust-height-row').each(function() {
        var element = $(this);
        element.css('height', element.closest('.row').height());
    });

    $('#selection-modal').on('shown.bs.modal', function(e) {
        $('.adjust-height').each(function() {
            $(this).css('height', $(this).closest('.row').height() - 30);
            $(this).css('margin-top', '15px');
        })
    });
    $('.filter-btn').on('click', function(){
       workshop_filter = $(this).hasClass('workshops-btn') ? true :  false;
    })
});
