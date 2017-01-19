// Form Validation
function initFormValidation(){
  $('#new_post').validate({
    highlight: function(element) {
    	$(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function(element) {
      $(element).closest('.form-group').removeClass('has-error');
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function(error, element) {
	    if(element.parent('.input-group').length) {
	        error.insertAfter(element.parent());
	    } else {
	        error.insertAfter(element);
	    }
    },
    ignore: '.ignore',
    rules: {
      'post[title]': {
        required: true
      },
      'post[image]': {
        required: true
      }
    },
    messages: {
      'post[title]': {
        required: 'Please enter a title.',
      },
      'post[image]': {
        required: 'Please upload an image.'
      }

    }
  });
}

// DOM Loaded
$(document).ready(function(){
  initFormValidation();
  $('#new_post').submit(function(e){
    if($('#new_post').valid()){
      if (grecaptcha.getResponse() == ''){
        e.preventDefault();
        swal('reCAPTCHA Required', 'Please confirm you are a person.', 'warning');
      }
    } else {
      e.preventDefault();
    }
  });
});
