$(document).ready(function() {
    $('#js-centered-navigation-menu').removeClass("show");

    $('#js-centered-navigation-mobile-menu').on('click', function(e) {
        e.preventDefault();
        $('#js-centered-navigation-menu').slideToggle(function() {
            if ($('#js-centered-navigation-menu').is(':hidden')) {
                $('#js-centered-navigation-menu').removeAttr('style');
            }
        });
    });
});

// jQuery.BgSwitcher
$(".mainVisual").bgswitcher({
  images: ["../images/pic1.jpg", "../images/pic2.jpg", "../images/pic3.jpg"]
});


// gmaps
var map = new GMaps({
    el: '#map',
    lat: 35.581196,
    lng: 140.163724,
    zoom: 16,
    scrollwheel: false
});
map.addMarker({
    lat: 35.581196,
    lng: 140.163724,
    title: "株式会社北原防災"
});

