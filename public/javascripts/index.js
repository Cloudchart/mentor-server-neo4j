(function(d, s, id) {
  if (d.getElementById(id)) return
  var fjs = d.getElementsByTagName(s)[0]
  var js = d.createElement(s)
  js.id = id
  js.src = '//connect.facebook.net/en_US/sdk.js'
  fjs.parentNode.insertBefore(js, fjs)
})(document, 'script', 'facebook-jssdk')

window.fbAsyncInit = function() {
  FB.init({
    appId   : '819582651492181',
    version : 'v2.6',
    xfbml   : true,
    cookie  : true,
  })
}
