function initFormValidation(){
  $('#flagPostForm').validate({
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
      flag_type: {
        required: true
      }
    },
    messages: {
      flag_type: {
        required: 'Please select a report reason.',
      }
    }
  });
}


$(document).ready(function(){
  initFormValidation();
  $('#submitReport').on('click', function(){
    if($('#flagPostForm').valid()){
      if(grecaptcha.getResponse() != ''){
        $.ajax({
          url: '/flags',
          type: 'POST',
          data: {
            post_id: $('#flagPost #post_id').val(),
            flag_type_id: $('#flagPost #flag_type').val(),
            comment: $('#flagPost #comment').val()
          },
          success: function(json, status, xhr){
            $('#flagPost').modal('hide');
            if (json.result) {
              swal('Report Submitted!', 'We have recieved your report and will be reviewing the post shortly, thank you.', 'success');
            } else {
              swal('Report Failed', 'Sorry something went wrong and we were unable to process your report, please try again later', 'error');
            }
          },
          error: function(xhr, status, error){
            $('#flagPost').modal('hide');
            swal(error, xhr.responseText, 'error');
          }
        });
      } else {
        swal('reCAPTCHA Required', 'Please confirm you are a person.', 'warning');
      }
    }
  });
});
