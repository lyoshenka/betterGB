betterGB = function(options) {
  /* options is the extension's localStorage */
  var selector = "input:visible,a.kd-button-submit"
      tabindex = 1,
      count = $(selector).length;

//  window.resizeTo(600,450); /* should be configurable? should depend on content? */

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
  
  if (options['close_on_esc'])
  {
    $(document).keyup(function(e) {
      if((e.keyCode || e.which) == 27) /* close popup on esc key */
      {
        window.close();
      }
    });
  }


  $('a.kd-button-submit').on('keydown', function(e){
    if((e.keyCode || e.which) == 13) /* simulate button click on enter */
    {
      $(this).click();
    }
  });
  
  if (options['hide_cancel_button'])
  {
    $('a.kd-button').each(function(){
      if ($(this).text() == "Cancel")
      {
        $(this).hide();
      }
    });
  }

};


$(document).ready(function(){
  chrome.extension.sendRequest({method: "getOptions"}, function(response) {
      betterGB(response.options);
  });
});
