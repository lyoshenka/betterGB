betterGB = function(options) {
  var submitButton = 'a.kd-button-submit',
      tabElements = 'input:visible,' + submitButton,
      tabindex = 1,
      count = $(tabElements).length,
      extensionId = 'lkihgbnjeomjkfgdkimldpipggffikjo',
      dev = chrome.i18n.getMessage('@@extension_id') != extensionId, // true if developing, false if installed for real
      analyticsId = dev ? 'UA-28704123-2' : 'UA-28704123-1',
      ga = function(page) { tiny_ga(analyticsId,'none',page,options['_uid'], 'xhr'); }
      ;


//
// Bind Keys
//

  if(options['submit_on_enter'])
  {
    $('form').keydown(function(e) {
      var aclist = $('#ac-list');
      if ((e.keyCode || e.which) == 13 && (!aclist.length || aclist.is(':empty')) && !$(e.target).is('textarea'))
      {
        e.preventDefault(); // is this line necessary?
        ga('/submit_enter');
        $(submitButton).click();
      }
      return true;
    });
  }

  // always submit if enter is pressed on submit button
  $(submitButton).keydown(function(e) {
    if((e.keyCode || e.which) == 13)
    {
      ga('/submit_button_enter');
      $(this).click();
    }
    return true;
  });

  $(submitButton).click(function(e) {
    if(e.hasOwnProperty('originalEvent'))
    {
      ga('/submit_button_click');
    }
    return true;
  });


  if (options['close_on_esc'])
  {
    $(document).keydown(function(e) {
      if((e.keyCode || e.which) == 27) /* close popup on esc key */
      {
        ga('/close_esc');
        window.close();
      }
    });
  }



//
// Fix Tabindex
//

  $(tabElements).each(function() {
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
    .insertAfter('body > form');



  ga('/popup_open'); // analytics

};



chrome.extension.sendRequest({method: "getOptions"}, function(response) {
  betterGB(response.options);
});
