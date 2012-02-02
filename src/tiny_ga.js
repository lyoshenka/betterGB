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


function tiny_ga(propertyId, domain, url, uniqueVisitorId, requestType) {
  var target = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com',
      params = tiny_ga_params(propertyId, domain, url, uniqueVisitorId);

  if (!requestType || requestType == 'img')
  {
    tiny_ga_img(target, params);
  }
  else if (requestType == 'xhr')
  {
    tiny_ga_xhr(target, params);
  }
  else
  {
    console.log('tiny_ga: Bad request type: ' + requestType);
  }
}
//window['tiny_ga'] = tiny_ga; // for closure compiler

function tiny_ga_params(propertyId, domain, url, uniqueVisitorId) {
  var rand = function(min,max) { return min + Math.floor(Math.random() * (max - min)); },
//      cookie = rand(1e7,1e8), //random cookie number
//      now = (new Date()).getTime(),
      uid = uniqueVisitorId || rand(1e9,-(1<<31)); //number under 2147483647

  return 'utmwv=1.3'+  // tracking code version
         '&utmn='+rand(1e9,1e10)+ // random number to prevent GIF caching
         '&utmhn='+domain+ // hostname (should be url-encoded)
         '&utmr='+window.location+ // complete url of page
         '&utmp='+url+ // url of the requested page (what page it will say the user visited)
         '&utmac='+propertyId+ // account id
         '&utmvid='+uid+
         '&utmcc=__utma%3D999.999.999.999.999.1%3B'
//          '&utmcc='+ // cookies
//            '__utma%3D'+cookie+'.'+uid+'.'+now+'.'+now+'.'+now+'.2%3B%2B' // num visits, time of visits (first, previous, current)
//            +
//            '__utmb%3D'+cookie+'%3B%2B'+ // tracks when visit starts
//            '__utmc%3D'+cookie+'%3B%2B'+ // tracks when visit ends
//            '__utmz%3D'+cookie+'.'+now+'.2.2.utmccn%3D(referral)%7Cutmcsr%3D'+win.host+'%7Cutmcct%3D'+win.pathname+'%7Cutmcmd%3Dreferral%3B%2B'+ // tracks where you came from
//            '__utmv%3D'+cookie+'.-%3B' // custom Analytics variables
         ;

//__utma=<domain hash>.<unique visitor id>.<timstamp of first visit>.<timestamp of previous (most recent) visit>.<timestamp of current visit>.<visit count>

}


function tiny_ga_img(target, params) {
  var img = new Image(),
      imgUrl = target + '/__utm.gif?' + params;

//  console.log(imgUrl);

//  img.onload = function () { console.log('utm loaded');alert('utm loaded'); };
//  img.onerror = function () { console.log('utm not loaded');alert('utm not loaded'); };

  // trigger the tracking
  img.src = imgUrl;
};




function tiny_ga_xhr(target, params, callback) {
  var xhr,
      url = target + "/p/__utm.gif",
      type = window.XDomainRequest;

  if (type)
  {
    xhr = new type;
    xhr.open("POST", url);
  }
  else if (type = window.XMLHttpRequest)
  {
    type = new type;
    if("withCredentials" in type)
    {
      xhr = type;
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "text/plain");
    }
  }

  if (xhr)
  {
    xhr.onreadystatechange = function () {
      if(callback && 4 == xhr.readyState)
      {
        callback();
        xhr = null;
      }
    };
    xhr.send(params);
    return true;
  }
}
