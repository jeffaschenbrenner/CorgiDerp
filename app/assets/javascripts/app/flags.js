$(document).ready(function(){
  $('#submitReport').on('click', function(){
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
        console.log(json);
      },
      error: function(xhr, status, error){
        $('#flagPost').modal('hide');
        swal(error, xhr.responseText, 'error');
      }
    });
  });
});
