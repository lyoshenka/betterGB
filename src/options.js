$(document).ready(function() {
  var options = chrome.extension.getBackgroundPage().getOptions();

  /* load saved options into form*/
  $.each(options,function(option,value) {
    input = $('#'+option);
    if (!input)
    {
      return;
    }
    if (input.attr('type') == 'checkbox')
    {
      console.log('Option is a checkox');
      input.attr('checked', value);
    }
    else
    {
      console.log('Not a checkbox');
      input.val(value);
    }
  });



  /* save options */
  $('#submit').click(function(e) {
    e.preventDefault();

    $.each(options, function(option,value) {
      input = $('#'+option);
      if (!input)
      {
        return;
      }
      if (input.attr('type') == 'checkbox')
      {
        localStorage[option] = input.attr('checked') == 'checked';
      }
      else
      {
        localStorage[option] = input.val();
      }
    });

    $('#saved').show().fadeOut(850);
  });
});
