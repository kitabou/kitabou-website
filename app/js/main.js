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
    scrollwheel: false,
    draggable: false
});
map.addMarker({
    lat: 35.581196,
    lng: 140.163724,
    title: "株式会社北原防災"
});

// scrollUp
$(function() {
    $.scrollUp({
        scrollText: '<i class="fa fa-chevron-up"></i>'
    });
});

// items bannner
var loop = setInterval(function() {
    //li先頭要素のクローンを作成
    var clone = $(".items-banner li:first").clone(true);
    //li先頭要素のマージントップにマイナスを指定しアニメーションさせる
    $(".items-banner li:first").animate({
        marginTop: "-95px"
    }, {
        duration: 500,
        complete: function() {
            //処理完了時に先頭要素を削除
            $(".items-banner li:first").remove();
            //クローンをliの最後に追加
            clone.clone(true).insertAfter($(".items-banner li:last"));
        }
    });
}, 3000);

// page-menu__sp-menu
$(".page-menu__sp-menu").click(function (e) {
    console.log(e.type);
    $(this).next().slideToggle();
}).next().hide();

// modal
$(function() {
  $("#modal-1").on("change", function() {
    if ($(this).is(":checked")) {
      $("body").addClass("modal-open");
    } else {
      $("body").removeClass("modal-open");
    }
  });

  $(".modal-window").on("click", function() {
    $(".modal-state:checked").prop("checked", false).change();
  });

  $(".modal-inner").on("click", function(e) {
    e.stopPropagation();
  });
});
