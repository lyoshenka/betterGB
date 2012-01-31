$(document).ready(function() {
  var options = chrome.extension.getBackgroundPage().getOptions(),
      load = function() {
        $.each(options,function(option,value) {
          input = $('#'+option);
          if (!input)
          {
            return;
          }
          if (input.attr('type') == 'checkbox')
          {
            input.attr('checked', value);
          }
          else
          {
            input.val(value);
          }
        });
      },
      save = function() {
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
      };

  load();

  $('#submit').click(function(e) {
    e.preventDefault();
    save();
    $('#saved').show().fadeOut(850);
  });

  $('#reset').click(function(e) {
    e.preventDefault();
    $.each(options, function(option,value) {
      localStorage.removeItem(option);
    });
    options = chrome.extension.getBackgroundPage().getOptions();
    load();
  });
});
