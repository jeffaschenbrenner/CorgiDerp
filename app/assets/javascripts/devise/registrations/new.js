function initFormValidation(){
  $.validator.addMethod('alphaNumeric', function(value, element){
    return this.optional(element) || /^[a-z0-9]+$/i.test(value);
  }, "Username may only contain letters and numbers.");

  $('#new_user').validate({
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
      'user[username]': {
        required: true,
        maxlength: 22,
        alphaNumeric: true
      },
      'user[email]': {
        required: true,
        email: true
      },
      'user[password]': {
        required: true,
        minlength: 8
      },
      'user[password_confirmation]': {
        required: true,
        minlength: 8,
        equalTo: '#user_password'
      }
    },
    messages: {
        'user[username]': {
          required: 'Please choose a username.',
          length: 'Username may not be over 22 characters.'
        },
				'user[email]': {
					required: 'Please enter a valid email address.'
				},
        'user[password]': {
            required: "Please provide a password.",
            minlength: "Your password must be at least 8 characters long."
        },
        'user[password_confirmation]': {
            required: "Please confirm password.",
            minlength: "Your password must be at least 8 characters long.",
            equalTo: "Passwords do not match."
        }
    }
  });
}

$(document).ready(function(){
  initFormValidation();

  $('#new_user').submit(function(e){
    if($('#new_user').valid()){
      if (grecaptcha.getResponse() == ''){
        e.preventDefault();
        swal('reCAPTCHA Required', 'Please confirm you are a person.', 'warning');
      }
    } else {
      e.preventDefault();
    }
  });
});
