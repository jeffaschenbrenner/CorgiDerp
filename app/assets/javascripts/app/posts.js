$(function(){
  window.resetEventHandlers = function resetEventHandlers(){
    $('#post_image').on('change', function(){
      previewImg(this);
    });

    $('ul.post-actions li.share').off().on('click', function(){
      $('ul.post-actions li.share').not(this).removeClass('active');
      $(this).toggleClass('active');
    });

    // Facebook Share
    $('ul.social li.facebook').off().on('click', function(){
      var url = $(this).data('url');
      FB.ui({
        method: 'share',
        display: 'popup',
        href: url,
      }, function(response){});
    });

    // Twitter Share
    $('ul.social li.twitter').off().on('click', function(){
      var url = $(this).data('url');
      var title = $(this).data('title');
      window.open('http://twitter.com/share?url='+ url +'&text='+ title + '&via=corgiderp', 'sharer', 'toolbar=0,status=0,width=626,height=443');
    });

    $('ul.post-actions li.inappropriate').off().on('click', function(){
      flagPost(this);
    });

    // Infinite Scrolling
    if ($('.more-posts').length > 0) {
      $(window).scroll(function(){
        var next_page_url = $('.pagination .next_page').hasClass('disabled') ? false : $('.pagination .next_page a').attr('href');
        if (next_page_url && $(window).scrollTop() > $(document).height() - $(window).height() - 60){
          $('.more-posts').html('<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>');
          $.ajax({
            url: next_page_url,
            success: function(json, status, xhr){
              $('.more-posts').remove();
              $('.posts').append(json.content);
              resetEventHandlers();
            }
          });
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
});

// Preview of image after upload.
function previewImg(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      $('#img-preview').attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
}

// Flag Post
function flagPost(element) {
  var id = $(element).data('post-id');
  var title = $(element).data('post-title');
  var author = $(element).data('post-author');
  $('#flagPost #post_id').val(id);
  $('#flagPost .title').html(title);
  $('#flagPost .author').html('Posted by ' + author);
  $('#flagPost').modal('show');
}
