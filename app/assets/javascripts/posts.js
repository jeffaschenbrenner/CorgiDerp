$(document).ready(function(){
  console.log('Document Ready!');
  $('#post_image').on('change', function(){
    console.log("File Uploaded!");
    previewImg(this);
  });

  // Remove Click to Play, Update to switch image src to full gif on hover.
  $('.panel.animated .panel-heading, .more-posts li.animated').mouseenter(function(){
    var src = $(".animated-img", this).attr('src');
    $('img', this).attr('src', src);
    $('.play', this).hide();
  });

  $('.panel.animated .panel-heading, .more-posts li.animated').mouseleave(function(){
    var src = $(".static-img", this).data('src');
    $('.static-img', this).attr('src', src);
    $('.play', this).show();
  });

  // $('.panel.animated .static-img .play').click(function(){
  //   $(this).closest('.static-img').addClass('hidden');
  //   $(this).closest('.panel-heading').children('.animated-img').removeClass('hidden');
  // });
  //
  // $('.panel.animated .animated-img .pause').click(function(){
  //   $(this).closest('.animated-img').addClass('hidden');
  //   $(this).closest('.panel-heading').children('.static-img').removeClass('hidden');
  // });

});

$('#post_image').on('change', function(){
  console.log("File Uploaded! [outsite of doc ready]");
  previewImg(this);
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
