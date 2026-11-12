/* Puppy Timbo – Cookie-Consent-Manager (Google Consent Mode v2) + Analytics-Ereignisse
   Kategorien: notwendig (immer) · statistik (analytics_storage) · marketing (ad_storage, ad_user_data, ad_personalization)
   Die Standard-Einstellung "alles abgelehnt" wird im <head> gesetzt, BEVOR der Google-Tag lädt (siehe consent-default). */
(function () {
  var KEY = 'timbo-consent-v1';
  function read() { try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; } }
  function save(c) { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {} }
  function de() { return (document.documentElement.lang || 'de') === 'de'; }
  function g() { if (window.gtag) window.gtag.apply(null, arguments); }

  function apply(c, fromUser) {
    g('consent', 'update', {
      analytics_storage: c.statistik ? 'granted' : 'denied',
      ad_storage: c.marketing ? 'granted' : 'denied',
      ad_user_data: c.marketing ? 'granted' : 'denied',
      ad_personalization: c.marketing ? 'granted' : 'denied'
    });
    if (fromUser) g('event', 'consent_choice', { consent_statistik: c.statistik ? 'ja' : 'nein', consent_marketing: c.marketing ? 'ja' : 'nein' });
  }

  function choose(c) { c.ts = new Date().toISOString(); save(c); apply(c, true); close(); }
  function close() { var b = document.getElementById('cc'); if (b) b.remove(); }

  function ui(showDetails) {
    close();
    var c = read() || { statistik: false, marketing: false }, D = de();
    var d = document.createElement('div'); d.id = 'cc'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-modal', 'false');
    d.setAttribute('aria-label', D ? 'Cookie-Einstellungen' : 'Cookie settings');
    d.innerHTML =
      '<p class="cc-t">🍪 ' + (D ? 'Kekse? Wuff!' : 'Cookies? Woof!') + '</p>' +
      '<p>' + (D
        ? 'Mit deiner Zustimmung nutze ich <b>Google Analytics</b> (Statistik) und <b>Google-Werbefunktionen</b> (Marketing): So sehe ich, wie viele vorbeischauen, woher sie kommen und welche Links geklickt werden, und kann Zielgruppen für Werbung bilden. Daten können an Google (auch in die USA) gehen. Du kannst das jederzeit unten über „Cookie-Einstellungen“ ändern.'
        : 'With your consent I use <b>Google Analytics</b> (statistics) and <b>Google advertising features</b> (marketing) to see how many people visit, where they come from and which links they click, and to build audiences for ads. Data may be sent to Google (incl. the USA). You can change this anytime via “Cookie settings” at the bottom.') + '</p>' +
      '<div class="cc-d"' + (showDetails ? '' : ' hidden') + '>' +
        row('notwendig', D ? 'Notwendig' : 'Necessary', D ? 'Sprache & deine Cookie-Wahl (nur in deinem Browser).' : 'Language & your cookie choice (stored in your browser only).', true, true) +
        row('statistik', D ? 'Statistik' : 'Statistics', D ? 'Google Analytics 4: Besuche, Herkunft, Klicks.' : 'Google Analytics 4: visits, sources, clicks.', c.statistik) +
        row('marketing', 'Marketing', D ? 'Google Signals & Werbe-Zielgruppen (Alter, Interessen, Remarketing).' : 'Google Signals & ad audiences (age, interests, remarketing).', c.marketing) +
      '</div>' +
      '<div class="cc-b">' +
        '<button data-a="all">' + (D ? 'Alle akzeptieren' : 'Accept all') + '</button>' +
        '<button data-a="none" class="sec">' + (D ? 'Nur notwendige' : 'Necessary only') + '</button>' +
        '<button data-a="details" class="lnk">' + (D ? 'Einstellungen' : 'Settings') + '</button>' +
        '<button data-a="save" class="sec" hidden>' + (D ? 'Auswahl speichern' : 'Save selection') + '</button>' +
      '</div>';
    function row(k, t, s, on, fixed) {
      return '<label class="cc-r"><span><b>' + t + '</b><small>' + s + '</small></span>' +
        '<input type="checkbox" data-k="' + k + '"' + (on ? ' checked' : '') + (fixed ? ' disabled' : '') + '><i></i></label>';
    }
    d.addEventListener('click', function (e) {
      var a = e.target.getAttribute && e.target.getAttribute('data-a'); if (!a) return;
      if (a === 'all') choose({ statistik: true, marketing: true });
      if (a === 'none') choose({ statistik: false, marketing: false });
      if (a === 'details') { d.querySelector('.cc-d').hidden = false; e.target.hidden = true; d.querySelector('[data-a=save]').hidden = false; }
      if (a === 'save') choose({ statistik: d.querySelector('[data-k=statistik]').checked, marketing: d.querySelector('[data-k=marketing]').checked });
    });
    document.body.appendChild(d);
    if (showDetails) { d.querySelector('[data-a=details]').hidden = true; d.querySelector('[data-a=save]').hidden = false; }
  }
  window.timboCookieSettings = function () { ui(true); return false; };

  /* ---------- zusätzliche Ereignisse für GA4 ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-track]');
    if (!a) return;
    var p = a.getAttribute('data-track');
    g('event', 'link_click', { link_platform: p, link_url: a.href, link_text: ((a.querySelector('b') || a).textContent || '').trim().slice(0, 60), transport_type: 'beacon' });
    if (p.indexOf('instagram') === 0) g('event', 'instagram_click', { placement: p, transport_type: 'beacon' }); // als Schlüsselereignis markieren
  });
  document.addEventListener('toggle', function (e) {
    var t = e.target; if (!t.matches || !t.matches('details.faq') || !t.open) return;
    var q = t.querySelector('summary [data-lang="de"]');
    g('event', 'faq_open', { faq_question: q ? q.textContent.trim().slice(0, 100) : '' });
  }, true);
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.lang button');
    if (b) { g('event', 'language_change', { language: b.dataset.set }); g('set', 'user_properties', { site_language: b.dataset.set }); }
  });
  // Besucher, die sich wirklich umschauen: 30 Sekunden aktiv auf der Seite
  var t30 = setTimeout(function () { if (!document.hidden) g('event', 'engaged_30s', { page: location.pathname }); }, 30000);
  // Instagram-Karte gesehen?
  if ('IntersectionObserver' in window) {
    document.addEventListener('DOMContentLoaded', function () {
      var ig = document.querySelector('.card.main'); if (!ig) return;
      var o = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { g('event', 'instagram_card_view'); o.disconnect(); } }, { threshold: .6 });
      o.observe(ig);
    });
  }

  /* ---------- Start ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    var c = read();
    g('set', 'user_properties', { site_language: document.documentElement.lang || 'de' });
    if (c) apply(c, false); else ui(false);
  });
})();
