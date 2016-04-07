$(document).ready(function(){

	// Preview of image after upload.
  function previewImg(input) {
  	console.log(input.files);
  	if (input.files && input.files[0]) {
  		var reader = new FileReader();
  		reader.onload = function(e) {
  			console.log(e);
  			$('#img-preview').attr('src', e.target.result);
  		}
  		reader.readAsDataURL(input.files[0]);
  	}
  }

  $('#post_image').on('change', function(){
  	previewImg(this);
  });

  $('.panel.animated .static-img .play').click(function(){
    $(this).closest('.static-img').addClass('hidden');
    $(this).closest('.panel-heading').children('.animated-img').removeClass('hidden');
  });

  $('.panel.animated .animated-img .pause').click(function(){
    $(this).closest('.animated-img').addClass('hidden');
    $(this).closest('.panel-heading').children('.static-img').removeClass('hidden');
  });
});
