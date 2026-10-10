(function(){
  var PHONE='2348037740298';
  var $=function(id){return document.getElementById(id)};

  /* ---------- general ---------- */
  $('yr').textContent=new Date().getFullYear();
  var nav=$('nav'),burger=$('burger');
  function closeMenu(){nav.classList.remove('open');burger.setAttribute('aria-expanded','false');}
  burger.addEventListener('click',function(){
    var o=nav.classList.toggle('open');burger.setAttribute('aria-expanded',String(o));
  });
  nav.addEventListener('click',function(e){if(e.target.tagName==='A')closeMenu();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeMenu();});

  var links=[].slice.call(nav.querySelectorAll('a'));
  var ids=links.map(function(a){return a.getAttribute('href').slice(1)});
  window.addEventListener('scroll',function(){
    var y=window.scrollY+160,cur=ids[0];
    ids.forEach(function(id){var el=$(id);if(el&&el.offsetTop<=y)cur=id;});
    links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+cur)});
  },{passive:true});

  function openWA(lines){
    window.open('https://wa.me/'+PHONE+'?text='+encodeURIComponent(lines.join('\n')),'_blank','noopener');
  }

  /* ---------- outfit designer data ---------- */
  var STYLES=[
    {id:'gown',name:'Gown',
     d:'M80 44Q100 60 120 44L134 52 126 100 120 114 172 304Q100 318 28 304L80 114 74 100 66 52ZM66 52 46 76 62 88 74 100ZM134 52 154 76 138 88 126 100Z',
     seams:'M80 114H120'},
    {id:'iro',name:'Iro and Buba',
     d:'M78 44Q100 58 122 44L142 54 176 122 152 138 134 110 138 170H62L66 110 48 138 24 122 58 54ZM64 174H136L150 308H50Z',
     seams:'M64 174H136M92 174 84 308'},
    {id:'kaftan',name:'Kaftan',
     d:'M78 44Q100 60 122 44L148 58 188 196 158 206 144 148 152 308H48L56 148 42 206 12 196 52 58Z',
     seams:'M100 58V120'},
    {id:'agbada',name:'Agbada',
     d:'M74 44Q100 60 126 44L156 58 196 236H146L140 170 150 310H50L60 170 54 236H4L44 58Z',
     seams:'M88 52 84 308M112 52 116 308'},
    {id:'skirt',name:'Skirt and Blouse',
     d:'M80 44Q100 58 120 44L138 54 156 98 136 104 130 134H70L64 104 44 98 62 54ZM72 138H128L138 200Q148 256 170 308H30Q52 256 62 200Z',
     seams:'M70 136H130'},
    {id:'abaya',name:'Abaya',scarf:'M80 22Q100 4 120 22L128 56 100 72 72 56Z',
     d:'M76 52H124L152 64 162 228 142 232 136 124 148 310H52L64 124 58 232 38 228 48 64Z',
     seams:'M100 72V120'}
  ];
  var FABRICS=[
    {id:'ankara',name:'Ankara',ov:'url(#p-ankara)'},
    {id:'aso',name:'Aso-Oke',ov:'url(#p-aso)'},
    {id:'lace',name:'Lace',ov:'url(#p-lace)'},
    {id:'adire',name:'Adire',ov:'url(#p-adire)'},
    {id:'satin',name:'Satin or silk',ov:'url(#g-sheen)'},
    {id:'chiffon',name:'Chiffon',ov:'url(#g-sheen)',op:.88},
    {id:'velvet',name:'Velvet',ov:'url(#g-velvet)'},
    {id:'plain',name:'Plain cotton',ov:''}
  ];
  var NOTSURE={id:'unsure',name:'Not sure',ov:''};
  var COLORS=[['Burgundy','#7b1e2e'],['Wine','#4a1230'],['Gold','#c9a24b'],['Champagne','#e0c9a6'],['Blush pink','#e8b4b8'],['Royal blue','#27408b'],['Teal','#1e7f7a'],['Emerald','#1f6b45'],['Orange','#e07a1f'],['Brown','#6b4630'],['Ivory','#f4efe2'],['Black','#1a1816']];
  var SLEEVES=['Sleeveless','Short sleeves','Three-quarter sleeves','Long sleeves'];
  var LENGTHS=['Knee length','Midi','Ankle length','Floor length'];
  var NECKS=['Round neck','V-neck','Square neck','Boat neck','High neck'];

  var S={style:'gown',mat:'own',fabric:'ankara',color:{name:'Burgundy',hex:'#7b1e2e'},sleeve:SLEEVES[1],len:LENGTHS[3],neck:NECKS[0]};

  function styleById(id){return STYLES.filter(function(s){return s.id===id})[0]||STYLES[0];}
  function fabricById(id){return (id==='unsure'?NOTSURE:FABRICS.filter(function(f){return f.id===id})[0])||FABRICS[0];}

  /* ---------- build the option controls ---------- */
  function radio(group,value,label,checked,boxClass,inner){
    return '<label class="choice '+(boxClass.wrap||'')+'"><input type="radio" name="'+group+'" value="'+value+'"'+(checked?' checked':'')+'><span class="box">'+inner+'</span></label>';
  }
  function thumb(s){
    return '<svg viewBox="0 0 200 330" aria-hidden="true"><path d="'+s.d+'" fill="currentColor"/>'+(s.scarf?'<path d="'+s.scarf+'" fill="currentColor"/>':'')+'</svg>';
  }
  $('styles').innerHTML=STYLES.map(function(s){
    return radio('style',s.id,s.name,s.id===S.style,{},thumb(s)+s.name);
  }).join('');

  function buildFabrics(){
    var list=FABRICS.slice(); if(S.mat==='own')list.push(NOTSURE);
    if(!list.some(function(f){return f.id===S.fabric}))S.fabric=list[0].id;
    $('fabrics').innerHTML=list.map(function(f){
      return radio('fabric',f.id,f.name,f.id===S.fabric,{},f.name);
    }).join('');
  }
  buildFabrics();

  $('swatches').innerHTML=COLORS.map(function(c,i){
    return '<label class="choice sw"><input type="radio" name="color" value="'+i+'" aria-label="'+c[0]+'"'+(i===0?' checked':'')+'><span class="box" style="background:'+c[1]+'"></span></label>';
  }).join('')+
  '<label class="sw custom" title="Pick any colour"><input type="color" id="customColor" aria-label="Pick your own colour" value="#7b1e2e"><span class="box" aria-hidden="true">+</span></label>';

  function chipGroup(el,name,arr,cur){
    $(el).innerHTML=arr.map(function(v){return radio(name,v,v,v===cur,{},v);}).join('');
  }
  chipGroup('sleeves','sleeve',SLEEVES,S.sleeve);
  chipGroup('lengths','len',LENGTHS,S.len);
  chipGroup('necks','neck',NECKS,S.neck);

  /* ---------- preview ---------- */
  function lum(hex){
    var n=parseInt(hex.slice(1),16),r=n>>16&255,g=n>>8&255,b=n&255;
    return (0.299*r+0.587*g+0.114*b)/255;
  }
  function render(){
    var st=styleById(S.style),fb=fabricById(S.fabric);
    var hex=S.color.hex,svg=$('pvsvg');
    svg.style.setProperty('--pat',lum(hex)>0.6?'rgba(0,0,0,.28)':'rgba(255,255,255,.42)');
    var op=fb.op||1,stroke='rgba(0,0,0,.28)';
    var out='<g opacity="'+op+'">';
    if(st.scarf)out+='<path d="'+st.scarf+'" fill="'+hex+'" stroke="'+stroke+'" stroke-width="1.2"/>';
    out+='<path d="'+st.d+'" fill="'+hex+'" stroke="'+stroke+'" stroke-width="1.2" stroke-linejoin="round"/>';
    if(fb.ov){
      if(st.scarf)out+='<path d="'+st.scarf+'" fill="'+fb.ov+'"/>';
      out+='<path d="'+st.d+'" fill="'+fb.ov+'"/>';
    }
    out+='<path d="'+st.seams+'" fill="none" stroke="rgba(0,0,0,.35)" stroke-width="1.4" stroke-linecap="round"/></g>';
    $('garm').innerHTML=out;
    $('form').style.display=st.scarf?'none':'';
    $('pvTitle').textContent=st.name;
    $('pvSum').textContent=summary(st,fb);
    $('colName').textContent='Selected colour: '+S.color.name;
  }
  function summary(st,fb){
    var fabName=fb.id==='unsure'?'':fb.name+' ';
    var mat=S.mat==='own'?'Your own material':'Material sourced by us';
    var col=S.color.name.indexOf('Custom')===0?'Custom colour':S.color.name;
    return col+' '+fabName+st.name.toLowerCase()+'. '+mat+'. '+S.sleeve+', '+S.len.toLowerCase()+', '+S.neck.toLowerCase()+'.';
  }

  /* ---------- events ---------- */
  var form=$('designForm');
  form.addEventListener('change',function(e){
    var t=e.target,n=t.name;
    if(n==='style')S.style=t.value;
    else if(n==='mat'){
      S.mat=t.value;
      $('ownBox').hidden=S.mat!=='own';
      $('srcBox').hidden=S.mat!=='source';
      $('fabLegend').textContent=S.mat==='own'?'What type of material is it?':'Which fabric would you like?';
      buildFabrics();
    }
    else if(n==='fabric')S.fabric=t.value;
    else if(n==='color'){var c=COLORS[+t.value];S.color={name:c[0],hex:c[1]};}
    else if(n==='sleeve')S.sleeve=t.value;
    else if(n==='len')S.len=t.value;
    else if(n==='neck')S.neck=t.value;
    render();
  });
  $('customColor').addEventListener('input',function(e){
    S.color={name:'Custom colour ('+e.target.value+')',hex:e.target.value};
    [].forEach.call(form.querySelectorAll('input[name=color]'),function(r){r.checked=false;});
    render();
  });

  // collection tiles preselect a style
  [].forEach.call(document.querySelectorAll('.tile[data-style]'),function(t){
    t.addEventListener('click',function(){
      var id=t.getAttribute('data-style');
      if(!id)return;
      S.style=id;
      var r=form.querySelector('input[name=style][value='+id+']'); if(r)r.checked=true;
      render();
    });
  });

  form.addEventListener('submit',function(e){
    e.preventDefault();
    var name=$('dname').value.trim(),err=$('derr');
    if(!name){err.textContent='Please enter your name so we know who to reply to.';$('dname').focus();return;}
    err.textContent='';
    var st=styleById(S.style),fb=fabricById(S.fabric);
    var L=['Hello Olope Style, my name is '+name+'. I would like to order a custom outfit.','',
      'Style: '+st.name];
    if(S.mat==='own'){
      var y=$('yards').value.trim();
      L.push('Material: I have my own material'+(y?' ('+y+')':'')+'. I will send a photo of it here.');
    }else{
      var b=$('budget').value.trim();
      L.push('Material: Please source it for me'+(b?'. Budget: '+b:'')+'.');
    }
    L.push('Fabric type: '+fb.name);
    L.push('Colour: '+S.color.name+(S.color.name.indexOf('#')>-1?'':' ('+S.color.hex+')'));
    L.push('Sleeves: '+S.sleeve,'Length: '+S.len,'Neckline: '+S.neck);
    var d=$('ddate').value.trim(),n=$('dnotes').value.trim();
    if(d)L.push('Needed by: '+d);
    if(n)L.push('Notes: '+n);
    openWA(L);
  });

  $('contactForm').addEventListener('submit',function(e){
    e.preventDefault();
    var name=$('cname').value.trim(),err=$('cerr');
    if(!name){err.textContent='Please enter your name so we know who to reply to.';$('cname').focus();return;}
    err.textContent='';
    var L=['Hello Olope Style, my name is '+name+'.','Topic: '+$('ctopic').value];
    var m=$('cmsg').value.trim(); if(m)L.push(m);
    openWA(L);
  });

  render();
})();