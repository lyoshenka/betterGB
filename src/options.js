$(document).ready(function() {
  var options = chrome.extension.getBackgroundPage().getOptions(),
      saveLoad = function(saveOrLoad) {
        $.each(options,function(option,value) {
          input = $('#'+option);
          if (option[0] == '_' || !input)
          {
            return;
          }
          if (input.attr('type') == 'checkbox')
          {
            saveOrLoad == 'load' ?
              input.attr('checked', value) :
              localStorage[option] = input.attr('checked') == 'checked';
          }
          else
          {
            saveOrLoad == 'load' ?
              input.val(value) :
              localStorage[option] = input.val();
          }
        });
      },
      load = function() { saveLoad('load'); },
      save = function() { saveLoad('save'); }
      ;

  load();

  $('#submit').click(function(e) {
    e.preventDefault();
    save();
    $('#saved').show().fadeOut(850);
  });

  $('#reset').click(function(e) {
    e.preventDefault();
    $.each(options, function(option,value) {
      if (option[0] == '_') return;
      localStorage.removeItem(option);
    });
    options = chrome.extension.getBackgroundPage().getOptions();
    load();
  });
});
