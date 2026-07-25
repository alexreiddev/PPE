/* Pictogram sprite.
   Mandatory-action style glyphs, drawn on a 24x24 grid, white on the
   ISO-blue disc. Injected once per page so the markup stays clean. */

window.SG_ICONS = `
<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true" focusable="false">
  <symbol id="pic-head" viewBox="0 0 24 24">
    <path d="M12 3c-3.6 0-6.5 2.9-6.5 6.5V11h13V9.5C18.5 5.9 15.6 3 12 3z"/>
    <rect x="2.6" y="11.5" width="18.8" height="2.2" rx="1.1"/>
    <path d="M7.6 15h8.8c-.5 3.5-2.3 5.8-4.4 5.8S8.1 18.5 7.6 15z"/>
  </symbol>

  <symbol id="pic-eye" viewBox="0 0 24 24">
    <rect x="1.4" y="6" width="21.2" height="1.9" rx=".95"/>
    <path d="M3.2 8.6h17.6c1 0 1.8.9 1.6 1.9l-.6 3.2A3.5 3.5 0 0 1 18.4 16.5h-2.2a3 3 0 0 1-2.7-1.7l-.7-1.4a.9.9 0 0 0-1.6 0l-.7 1.4a3 3 0 0 1-2.7 1.7H5.6a3.5 3.5 0 0 1-3.4-2.8l-.6-3.2c-.2-1 .6-1.9 1.6-1.9z"/>
  </symbol>

  <symbol id="pic-ear" viewBox="0 0 24 24">
    <path d="M12 2.4c-4.5 0-8.2 3.5-8.2 7.9V12H6v-1.7c0-3.2 2.7-5.8 6-5.8s6 2.6 6 5.8V12h2.2v-1.7c0-4.4-3.7-7.9-8.2-7.9z"/>
    <rect x="2.4" y="11.6" width="4.8" height="9.2" rx="2.4"/>
    <rect x="16.8" y="11.6" width="4.8" height="9.2" rx="2.4"/>
  </symbol>

  <symbol id="pic-resp" viewBox="0 0 24 24">
    <circle cx="12" cy="8.4" r="4.6"/>
    <path d="M4.4 13.6h15.2c.6 0 1.1.5 1.1 1.1 0 4.1-3.9 7.1-8.7 7.1s-8.7-3-8.7-7.1c0-.6.5-1.1 1.1-1.1z"/>
    <rect x="1" y="14.6" width="3" height="1.7" rx=".85"/>
    <rect x="20" y="14.6" width="3" height="1.7" rx=".85"/>
  </symbol>

  <symbol id="pic-hand" viewBox="0 0 24 24">
    <path d="M6.4 9.6V4.8a1.75 1.75 0 0 1 3.5 0v3.9h.7V3a1.75 1.75 0 0 1 3.5 0v5.7h.7V4.6a1.75 1.75 0 0 1 3.5 0v9.8c0 4.3-2.8 7.7-6.6 7.7s-6.5-3.4-6.5-7.7v-2.5c0-.9.4-1.7 1.2-2.3z"/>
  </symbol>

  <symbol id="pic-body" viewBox="0 0 24 24">
    <path fill-rule="evenodd" d="M9.1 2h5.8l4.6 2.3c.7.4 1.1 1.1 1.1 1.9v4.6c0 .6-.5 1.1-1.1 1.1h-2.3V21c0 .6-.4 1-1 1H7.8c-.6 0-1-.4-1-1v-9.1H4.5c-.6 0-1.1-.5-1.1-1.1V6.2c0-.8.4-1.5 1.1-1.9L9.1 2zm2.1 7.2h1.6V22h-1.6V9.2z"/>
  </symbol>

  <symbol id="pic-foot" viewBox="0 0 24 24">
    <path d="M6 2h6.4c.6 0 1 .5 1 1v8.2c0 1.5.8 2.9 2 3.7l4.1 2.5c.9.6 1.5 1.6 1.5 2.7V22H6c-.6 0-1-.4-1-1V3c0-.5.4-1 1-1z"/>
  </symbol>

  <symbol id="pic-fall" viewBox="0 0 24 24">
    <circle cx="12" cy="3.6" r="2.5"/>
    <path d="M8.2 7h7.6c.7 0 1.2.6 1.1 1.3l-.8 4.2c-.1.5-.5.8-1 .8h-.4l.9 7.5c.1.7-.4 1.2-1 1.2h-1c-.5 0-.9-.4-1-.9L12 16.6l-.6 4.5c-.1.5-.5.9-1 .9h-1c-.6 0-1.1-.5-1-1.2l.9-7.5h-.4c-.5 0-.9-.3-1-.8L7.1 8.3C7 7.6 7.5 7 8.2 7z"/>
    <rect x="5.8" y="9.7" width="12.4" height="1.8" rx=".9"/>
  </symbol>

  <symbol id="pic-gas" viewBox="0 0 24 24">
    <path fill-rule="evenodd" d="M6.6 1.8h10.8c1.2 0 2.1.9 2.1 2.1v16.2c0 1.2-.9 2.1-2.1 2.1H6.6a2.1 2.1 0 0 1-2.1-2.1V3.9c0-1.2.9-2.1 2.1-2.1zm.7 3.3v6.4h9.4V5.1H7.3zm1.4 9.7a1.35 1.35 0 1 0 0 2.7 1.35 1.35 0 0 0 0-2.7zm3.3 0a1.35 1.35 0 1 0 0 2.7 1.35 1.35 0 0 0 0-2.7zm3.3 0a1.35 1.35 0 1 0 0 2.7 1.35 1.35 0 0 0 0-2.7z"/>
  </symbol>

  <symbol id="pic-fire" viewBox="0 0 24 24">
    <path d="M9.8 1.6h3.6c.5 0 .9.4.9.9v1.2h2.4c.6 0 1 .4 1 1s-.4 1-1 1h-1.4l1.5 2v1.6h-1.9V21c0 .6-.4 1-1 1H8.3c-.6 0-1-.4-1-1V9.6c0-2 1.1-3.8 2.8-4.7V2.5c0-.5.3-.9.7-.9z"/>
  </symbol>
</svg>`;

document.addEventListener('DOMContentLoaded', function () {
  document.body.insertAdjacentHTML('afterbegin', window.SG_ICONS);
});
