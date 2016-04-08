$(document).ready(function(){
  // Auto remove alerts after 4.5 seconds.
  setTimeout(function(){
    $('.alert').slideUp('slow', function(){
      $(this).remove();
    });
  }, 4500);

  // Initalize Tooltips
  $('[data-toggle="tooltip"]').tooltip();
});
