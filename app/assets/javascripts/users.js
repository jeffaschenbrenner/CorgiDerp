function resetEventHandlers(){
  $('ul.post-actions li.share').on('click', function(){
    $('ul.post-actions li.share').not(this).removeClass('active');
    $(this).toggleClass('active');
  });

  // Infinite Scrolling
  if ($('.more-posts').length > 0) {
    $(window).scroll(function(){
      var next_page_url = $('.pagination .next_page').hasClass('disabled') ? false : $('.pagination .next_page a').attr('href');
      console.log(next_page_url);
      if (next_page_url && $(window).scrollTop() > $(document).height() - $(window).height() - 60){
        $('.more-posts').html('<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>');
        $.ajax({
          url: next_page_url,
          success: function(json, status, xhr){
            console.log(json);
            $('.more-posts').remove();
            $('.posts').append(json.content);
            resetEventHandlers();
          }
        })
      }
    });
  }

  $('.panel.animated .panel-heading, .more-posts li.animated, .comment .post-image.animated').mouseenter(function(){
    var src = $(".animated-img", this).attr('src');
    $('img', this).attr('src', src);
    $('.play', this).hide();
  });

  $('.panel.animated .panel-heading, .more-posts li.animated, .comment .post-image.animated').mouseleave(function(){
    var src = $(".static-img", this).data('src');
    $('.static-img', this).attr('src', src);
    $('.play', this).show();
  });
}

$(document).ready(function(){
  resetEventHandlers();
});
