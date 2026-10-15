/* GeneralTeam – saját fiók: a böngésző megjegyzi a megnyitott személyes felületeket (ügyfélportál, alvállalkozói felület, iroda),
   a fejlécben a „Belépés” helyett „Fiókom” jelenik meg, és a belépés oldalon egy kattintással folytatható. */
(function(){var K='gt_fiok';
  function get(){try{var a=JSON.parse(localStorage.getItem(K)||'[]');return Array.isArray(a)?a:[]}catch(_){return []}}
  function put(a){try{localStorage.setItem(K,JSON.stringify(a.slice(0,12)))}catch(_){}}
  var GTF={list:get,
    add:function(t,u){u=u||(location.pathname.replace(/^.*\//,'')+location.search);if(!/[?&](t|k)=/.test(u))return;var a=get().filter(function(x){return x.u!==u});a.unshift({t:String(t||'Saját felület').slice(0,120),u:u,d:Date.now()});put(a);GTF.hdr()},
    del:function(u){put(get().filter(function(x){return x.u!==u}));GTF.hdr()},
    clear:function(){try{localStorage.removeItem(K);localStorage.removeItem('gt_iroda_k')}catch(_){}GTF.hdr()},
    hdr:function(){var n=get().length;try{if(localStorage.getItem('gt_iroda_k'))n++}catch(_){}
      [].forEach.call(document.querySelectorAll('a[href="belepes.html"],a[href="/belepes.html"],a[href="../belepes.html"]'),function(a){if(a.dataset.keep)return;a.textContent=n?'Fiókom':'Belépés';if(n)a.classList.add('fiok-on');else a.classList.remove('fiok-on')})}};
  window.GTF=GTF;
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',GTF.hdr);else GTF.hdr();
})();
