betterGB = function(options) {
  var selector = "input:visible,a.kd-button-submit"
      tabindex = 1,
      count = $(selector).length;

//  window.resizeTo(600,450); /* should be configurable? should depend on content? */

//
// Bind Keys
//

  if(options['submit_on_enter'])
  {
    $('form').keydown(function(e) {
      var aclist = $('#ac-list');
      if ((e.keyCode || e.which) == 13 && (!aclist.length || aclist.is(':empty'))) // and target is not a textarea
      {
        e.preventDefault(); // is this line necessary?
        $('a.kd-button-submit').click();
      }
    });
  }

  // always submit if enter is pressed on submit button
  $('a.kd-button-submit').keydown(function(e){
    if((e.keyCode || e.which) == 13) /* simulate button click on enter */
    {
      $(this).click();
    }
  });


  if (options['close_on_esc'])
  {
    $(document).keydown(function(e) {
      if((e.keyCode || e.which) == 27) /* close popup on esc key */
      {
        window.close();
      }
    });
  }



//
// Fix Tabindex
//

  $(selector).each(function() {
    $(this).attr('data-tindex', tabindex).attr('tabindex', tabindex); /* set our own tabindex */
    tabindex++;
    $(this).keydown(function(e) {
      if ((e.keyCode || e.which) == 9)  /* hijack tab key and only tab through the elements we care about */
      {
        e.preventDefault();
        tindex = $(this).attr('data-tindex') % count + (e.shiftKey ? -1 : 1);
        if (tindex < 1) tindex += count; // loop around backwards
        $('*[data-tindex=' + tindex + ']').focus();
      }
    });
  });
  


//
// Hide UI Elements
//
  if (options['hide_top_bar'])
  {
    $('#gb').hide();
  }

  if (options['hide_cancel_button'] || options['hide_all_bookmarks_button'])
  {
    $('a.kd-button').each(function(){
      if ((options['hide_cancel_button'] && $(this).text() == "Cancel") ||
          (options['hide_all_bookmarks_button'] && $(this).text() == "See all bookmarks »"))
      {
        $(this).hide();
      }
    });
  }

  if (options['hide_bottom_links'])
  {
    $('form').next('div').next('div').hide();
  }



//
// Insert Options Link
//
  $(document.createElement('a'))
    .attr('href', chrome.extension.getURL('options.html'))
    .text('BetterGB Options')
//    .css('float': 'left')
    .insertAfter('body > form');

};



chrome.extension.sendRequest({method: "getOptions"}, function(response) {
  betterGB(response.options);
});
