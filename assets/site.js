/* Puppy Timbo – Teilen-Button + Schmutzwuffel (18+) */
(function(){
  var NSFW="<a class=\"card n-x\" href=\"https://x.com/puppy_timbo\" target=\"_blank\" rel=\"nofollow noopener\"><span class=\"ico\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z\"/></svg></span><span><b>X / Twitter</b><small data-lang=\"de\">Unzensiert: Videos & Fotos</small><small data-lang=\"en\">Uncensored: videos & photos</small></span><span class=\"go\" aria-hidden=\"true\">→</span></a><a class=\"card n-of\" href=\"https://onlyfans.com/puppy_timbo\" target=\"_blank\" rel=\"nofollow noopener\"><span class=\"ico\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M24 4.003h-4.015c-3.45 0-5.3.197-6.748 1.957a7.996 7.996 0 1 0 2.103 9.211c3.182-.231 5.39-2.134 6.085-5.173 0 0-2.399.585-4.43 0 4.018-.777 6.333-3.037 7.005-5.995zM5.61 11.999A2.391 2.391 0 0 1 9.28 9.97a2.966 2.966 0 0 1 2.998-2.528h.008c-.92 1.778-1.407 3.352-1.998 5.263A2.392 2.392 0 0 1 5.61 12Zm2.386-7.996a7.996 7.996 0 1 0 7.996 7.996 7.996 7.996 0 0 0-7.996-7.996Zm0 10.394A2.399 2.399 0 1 1 10.395 12a2.396 2.396 0 0 1-2.399 2.398Z\"/></svg></span><span><b>OnlyFans</b><small data-lang=\"de\">Exklusiver Content</small><small data-lang=\"en\">Exclusive content</small></span><span class=\"go\" aria-hidden=\"true\">→</span></a><a class=\"card n-ph\" href=\"https://www.pornhub.com/model/puppy_timbo\" target=\"_blank\" rel=\"nofollow noopener\"><span class=\"ico\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M8 5v14l11-7z\"/></svg></span><span><b>Pornhub</b><small data-lang=\"de\">Videos</small><small data-lang=\"en\">Videos</small></span><span class=\"go\" aria-hidden=\"true\">→</span></a>";
  function g(){ if(window.gtag) window.gtag.apply(null, arguments); }
  window.timboShare=function(){
    var d={title:'Puppy Timbo 🐾',text:'Wandlungsfähig. Cute. Böse. – Puppy Timbo',url:'https://puppytimbo.github.io/'};
    g('event','share_click');
    if(navigator.share){navigator.share(d).catch(function(){});}
    else if(navigator.clipboard){navigator.clipboard.writeText(d.url).then(function(){toast(document.documentElement.lang==='en'?'Link copied 🐾':'Link kopiert 🐾');});}
  };
  function toast(t){var x=document.createElement('div');x.className='toast';x.textContent=t;document.body.appendChild(x);setTimeout(function(){x.remove();},2200);}
  function reveal(){
    var box=document.getElementById('nsfw'),btn=document.getElementById('nsfw-open');
    if(!box.innerHTML) box.innerHTML='<p class="sub warn" data-lang="de">🔞 Nur für Erwachsene. Explizite Inhalte auf externen Seiten.</p><p class="sub warn" data-lang="en">🔞 Adults only. Explicit content on external sites.</p>'+NSFW;
    box.hidden=false; btn.setAttribute('aria-expanded','true'); btn.classList.add('open');
  }
  document.addEventListener('DOMContentLoaded',function(){
    var btn=document.getElementById('nsfw-open'),dlg=document.getElementById('agegate');
    if(!btn) return;
    btn.addEventListener('click',function(){
      var box=document.getElementById('nsfw');
      if(!box.hidden){box.hidden=true;btn.setAttribute('aria-expanded','false');btn.classList.remove('open');return;}
      var ok=false;try{ok=sessionStorage.getItem('timbo-18')==='1';}catch(e){}
      if(ok){reveal();return;}
      if(dlg.showModal) dlg.showModal(); else if(confirm('18+?')){reveal();}
    });
    dlg.addEventListener('close',function(){
      if(dlg.returnValue==='yes'){try{sessionStorage.setItem('timbo-18','1');}catch(e){} g('event','schmutzwuffel_open'); reveal();}
    });
  });
})();
