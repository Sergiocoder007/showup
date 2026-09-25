// Invite landing on the GitHub Pages 404 fallback: <base>j/<CODE> shows the invite; anything else
// stays "Page not found". No network requests; the only data is the code in the URL.
import { formatInviteCode, parseInviteCode, platformOf } from './invite-lib.js';

const $ = (id) => document.getElementById(id);
const base = new URL(document.baseURI).pathname;
const code = parseInviteCode(location.pathname, base);

if (code) {
  document.title = 'Join a crew · Showup';
  $('not-found').hidden = true;
  $('code').textContent = formatInviteCode(code);
  $('open-app').href = `showup://j/${code}`;
  // Google Play only until the App Store listing exists.
  if (platformOf(navigator.userAgent) === 'ios') $('get-android').hidden = true;
  $('invite').hidden = false;
}
