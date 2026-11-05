(function(){
  var doc = document.documentElement, body = document.body;
  doc.classList.add('js');
  body.dataset.scene = 'cover'; body.dataset.ground = 'paper';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var stories = Array.prototype.slice.call(document.querySelectorAll('.story'));
  var railLinks = Array.prototype.slice.call(document.querySelectorAll('#rail a'));
  var bar = document.getElementById('progress');
  var count = document.getElementById('count');
  var ticking = false, current = null;

  function clamp(v){ return v < 0 ? 0 : v > 1 ? 1 : v; }

  function update(){
    ticking = false;
    var vh = window.innerHeight, mid = vh * 0.5, active = stories[0];
    for (var i = 0; i < stories.length; i++){
      var r = stories[i].getBoundingClientRect();
      if (r.top <= mid && r.bottom > mid){ active = stories[i]; break; }
      if (r.top > mid) break;
      active = stories[i];
    }
    var ar = active.getBoundingClientRect();
    var p = clamp((mid - ar.top) / ar.height);
    doc.style.setProperty('--p', p.toFixed(4));

    if (active !== current){
      if (current) current.classList.remove('is-active');
      active.classList.add('is-active');
      current = active;
      body.dataset.scene = active.dataset.scene;
      body.dataset.ground = active.dataset.ground;
      railLinks.forEach(function(a){ a.setAttribute('aria-current', a.getAttribute('href') === '#' + active.id ? 'true' : 'false'); });
    }

    // nearest step within the active story drives the stage tiles
    var steps = active.querySelectorAll('.step'), best = -1, bestD = Infinity;
    for (var s = 0; s < steps.length; s++){
      var sr = steps[s].getBoundingClientRect(), d = Math.abs(sr.top + sr.height / 2 - mid);
      if (d < bestD){ bestD = d; best = s; }
    }
    for (var t = 0; t < steps.length; t++) steps[t].classList.toggle('is-on', t === best);
    if (best >= 0) body.dataset.step = String(best); else delete body.dataset.step;

    if (active.dataset.scene === 'milestone') count.textContent = reduce ? '26' : String(Math.round(26 * clamp(p / 0.45)));

    var max = document.documentElement.scrollHeight - vh;
    bar.style.transform = 'scaleX(' + (max > 0 ? clamp(window.scrollY / max) : 0) + ')';
  }

  function request(){ if (!ticking){ ticking = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  update();

  var copy = document.getElementById('copy');
  copy.addEventListener('click', function(){
    var text = 'https://' + document.getElementById('site').textContent;
    function selectIt(){ var r = document.createRange(); r.selectNodeContents(document.getElementById('site')); var sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); copy.textContent = 'Selected – press copy'; }
    try {
      navigator.clipboard.writeText(text).then(function(){ copy.textContent = 'Copied'; setTimeout(function(){ copy.textContent = 'Copy link'; }, 1800); }, selectIt);
    } catch (e) { selectIt(); }
  });
})();
