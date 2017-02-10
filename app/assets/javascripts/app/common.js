$(document).ready(function(){
  // Auto remove alerts after 4.5 seconds.
  setTimeout(function(){
    $('.alert').slideUp('slow', function(){
      $(this).remove();
    });
  }, 4500);

  // Initalize Tooltips
  $('[data-toggle="tooltip"]').tooltip();

  // Use SweetAlert for Delete Requests
  $("[data-behavior='delete']").click(function(e){
    e.preventDefault();
    destroy($(this).attr('href'))
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
});

function destroy(url) {
  swal({
    title: "Are you sure?",
    text: "Your post will be permanently deleted!",
    type: "warning",
    showCancelButton: true,
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
    closeOnConfirm: false,
    closeOnCancel: false
  }, function(confirmed){
    if (confirmed) {
      $.ajax({
        url: url,
        dataType: 'JSON',
        method: 'DELETE',
        success: function(){
          swal({
            title: 'Deleted!',
            text: 'Your post has been deleted.',
            type: 'success'
          }, function(){
            window.location.replace('/');
          });

        }
      });
    } else {
      swal('Cancelled!', 'Your post was NOT deleted.', 'error');
    }
    return;
  });
}
