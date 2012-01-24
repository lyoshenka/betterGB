$(document).ready(function(){
  
var selector = "input:visible,a.kd-button-submit:visible"
    tabindex = 1,
    count = $(selector).length;


$(selector).each(function() {
  $(this).attr('data-tindex', tabindex).attr('tabindex', tabindex); /* set our own tabindex */
  tabindex++;
  $(this).on('keydown', function(e) {
    if ((e.keyCode || e.which) == 9)  /* hijack tab key and only tab through the elements we care about */
    {
      e.preventDefault();
      tindex = $(this).attr('data-tindex') % count + 1;
      $('*[data-tindex=' + tindex + ']').focus();
    }
  });
});

$(document).keyup(function(e) {
  if((e.keyCode || e.which) == 27) /* close popup on esc key */
  {
    window.close();
  }
});


});

/* autosubmit, focus submit, tab into notes, color for highlight, add options to selectively hide different elements*/