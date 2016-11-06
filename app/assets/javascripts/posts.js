$(document).ready(function(){
  $('#post_image').on('change', function(){
    previewImg(this);
  });

  // Remove Click to Play, Update to switch image src to full gif on hover.
  // $('.panel.animated .panel-heading, .more-posts li.animated').mouseenter(function(){
  //   var src = $(".animated-img", this).attr('src');
  //   $('img', this).attr('src', src);
  //   $('.play', this).hide();
  // });
  //
  // $('.panel.animated .panel-heading, .more-posts li.animated').mouseleave(function(){
  //   var src = $(".static-img", this).data('src');
  //   $('.static-img', this).attr('src', src);
  //   $('.play', this).show();
  // });

  $('ul.post-actions li.share').on('click', function(){
    $('ul.post-actions li.share').not(this).removeClass('active');
    $(this).toggleClass('active');
  });

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
