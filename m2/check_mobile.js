var ua = navigator.userAgent.toLowerCase();
if (ua.indexOf('android') > -1 || ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1 || ua.indexOf('ipod') > -1 || ua.indexOf('mobile') > -1) {
  var url = location.href;
  if (url.indexOf('www') > -1) {
	  location.href = url.replace('www.', 'm.');
  }
}