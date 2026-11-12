// DE/EN-Umschalter: merkt sich die Wahl, Standard = Browsersprache
(function(){
  var KEY='timbo-lang', saved=null;
  try{saved=localStorage.getItem(KEY)}catch(e){}
  var lang=saved||((navigator.language||'de').toLowerCase().indexOf('de')===0?'de':'en');
  function set(l){
    document.documentElement.lang=l;
    document.querySelectorAll('.lang button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.set===l)});
    try{localStorage.setItem(KEY,l)}catch(e){}
  }
  document.addEventListener('DOMContentLoaded',function(){
    document.querySelectorAll('.lang button').forEach(function(b){b.addEventListener('click',function(){set(b.dataset.set)})});
    set(lang);
  });
  set(lang);
})();
