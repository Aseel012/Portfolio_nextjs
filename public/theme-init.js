// Set the theme before first paint so there is no flash.
// External file (not inline) so script-src 'self' allows it under the site's CSP.
try {
  var t = localStorage.getItem('theme')
  var r = t === 'light' || t === 'dark' ? t : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
  document.documentElement.dataset.theme = r
} catch (e) { document.documentElement.dataset.theme = 'dark' }
