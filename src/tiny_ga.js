/**
 * Tiny Google Analytics
 * https://github.com/lyoshenka/tiny_ga
 * Copyright (c) 2012 Alex Grintsvayg / MIT License
 * Original code copied from Remy Sharp (see license below)
 *
 *
 * ORIGINAL LICENSE:
 * Google Analytics JS v1
 * http://code.google.com/p/google-analytics-js/
 * Copyright (c) 2009 Remy Sharp remysharp.com / MIT License
 * $Date: 2009-02-25 14:25:01 +0000 (Wed, 25 Feb 2009) $
 */


function tiny_ga(propertyId, domain, url, uniqueVisitorId) {
  var rand = function(min,max) { return min + Math.floor(Math.random() * (max - min)); },
      utmn=rand(1e9,1e10), //random request number
      cookie=rand(1e7,1e8), //random cookie number
      uid=uniqueVisitorId || rand(1e9,-(1<<31)), //number under 2147483647
      now=(new Date()).getTime(),
      win = window.location,
      img = new Image(),
      imgUrl = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + 
          '.google-analytics.com/__utm.gif'+
          '?utmwv=1.3'+  // tracking code version
          '&utmn='+utmn+ // unique id to prevent GIF caching
//          '&utmsr=-'+ // screen resolution
//          '&utmsc=-'+ // screen color depth
//          '&utmul=-'+ // browser language
//          '&utmje=0'+ // whether or not browser is java-enabled
//          '&utmfl=-'+ // flash version
//          '&utmdt=-'+ // page title
//          '$utme=-'+  // extensible parameter used for events
          '&utmhn='+domain+ // hostname (should be url-encoded)
          '&utmr='+win+ // complete url of page
          '&utmp='+url+ // url of the requested page (what page it will say the user visited)
          '&utmac='+propertyId+ // account id
          '&utmcc='+ // cookies
            '__utma%3D'+cookie+'.'+uid+'.'+now+'.'+now+'.'+now+'.2%3B%2B'+
            '__utmb%3D'+cookie+'%3B%2B'+
            '__utmc%3D'+cookie+'%3B%2B'+
            '__utmz%3D'+cookie+'.'+now+'.2.2.utmccn%3D(referral)%7Cutmcsr%3D'+win.host+'%7Cutmcct%3D'+win.pathname+'%7Cutmcmd%3Dreferral%3B%2B'+
            '__utmv%3D'+cookie+'.-%3B';


//__utma=<domain hash>.<unique visitor id>.<timstamp of first visit>.<timestamp of previous (most recent) visit>.<timestamp of current visit>.<visit count> 


  // trigger the tracking
  img.src = imgUrl;
}
