$(document).ready(function() {
  var options = chrome.extension.getBackgroundPage().options;


  /* load saved options into form*/
  $.each(options,function(option,defaultValue) {
    var value = localStorage.getItem(option) === null ? defaultValue : localStorage[option];
    input = $('#'+option);
    if (!input)
    {
      console.log('Did not find input ' + option);
    }
    if (input.attr('type') == 'checkbox')
    {
      console.log('Option is a checkox');
      input.attr('checked', value == 'true');
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

    $.each(options, function(option,defaultValue) {
      input = $('#'+option);
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
