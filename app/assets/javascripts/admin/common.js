$(document).ready(function(){
  // Initalize Tooltips
  $('[data-toggle="tooltip"]').tooltip();

  // Use SweetAlert for Delete Requests
  $("[data-behavior='delete']").click(function(e){
    e.preventDefault();
    var url = $(this).attr('href')
    var recordType = $(this).data('record-type') || 'record'
    var redirect = $(this).data('redirect') || '/admin'
    destroy(url, recordType, redirect);
  });

  // Display Notifications
  var time = 0;
  $('#notifications li').each(function(index, notification){
    var type = $(this).data('type') || 'info';
    var message = $(this).data('message') || '';
    if(message.length){
      setTimeout( function(){
        $.notify({
        	title: '<strong>' + type + '</strong>',
        	message: message
        },{
        	type: type,
          timer: 3000,
          placement: {
            from: 'bottom',
            align: 'right'
          },
          animate: {
        		enter: 'animated fadeInRight',
        		exit: 'animated fadeOutRight'
        	}
        });
      }, time)
      time += 800;
    }
  });
});

function destroy(url, item = 'record', redirect = '/admin') {
  swal({
    title: "Are you sure?",
    text: "Your " + item + " will be permanently deleted!",
    type: "warning",
    showCancelButton: true,
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
    closeOnConfirm: false,
    closeOnCancel: true
  }, function(confirmed){
    if (confirmed) {
      $.ajax({
        url: url,
        dataType: 'JSON',
        method: 'DELETE',
        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
        success: function(){
          swal({
            title: 'Deleted!',
            text: 'Your ' + item + ' has been deleted.',
            type: 'success'
          }, function(){
            window.location.replace(redirect);
          });

        }
      });
    }
    return;
  });
}
