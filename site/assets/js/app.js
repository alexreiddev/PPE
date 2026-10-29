/* Oasis Star General Trading — front-end behaviour.
   No build step, no framework. The catalogue carries no prices, so the
   basket is an enquiry list: product, size, quantity. */

(function () {
  'use strict';

  /* ---------- storage ------------------------------------------------ */
  var KEY = 'os.enquiry.v1';
  var memory = null; /* fallback when storage is blocked */

  function read() {
    try {
      var raw = window.localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return memory || []; }
  }

  function write(items) {
    memory = items;
    try { window.localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) {}
    paintTally();
  }

  function keyOf(l) { return l.pid + '::' + (l.size || '-'); }

  var Enq = {
    all: read,
    units: function () { return read().reduce(function (n, l) { return n + l.qty; }, 0); },
    lines: function () { return read().length; },
    add: function (pid, size, qty) {
      var items = read();
      var k = keyOf({ pid: pid, size: size });
      var hit = items.filter(function (l) { return keyOf(l) === k; })[0];
      if (hit) { hit.qty += qty; } else { items.push({ pid: pid, size: size, qty: qty }); }
      write(items);
    },
    setQty: function (k, qty) {
      write(read().map(function (l) {
        if (keyOf(l) === k) { l.qty = Math.max(1, qty); }
        return l;
      }));
    },
    remove: function (k) {
      write(read().filter(function (l) { return keyOf(l) !== k; }));
    },
    clear: function () { write([]); }
  };
  window.OSEnquiry = Enq;

  /* ---------- WhatsApp ----------------------------------------------- */
  /* Quote requests go to the sales WhatsApp number. wa.me takes the number
     in international form with no plus, spaces or leading zero. */
  var WA_NUMBER = '971561821086';

  function waLink(text) {
    return 'https://wa.me/' + WA_NUMBER + (text ? '?text=' + encodeURIComponent(text) : '');
  }
  window.OSWhatsApp = waLink;

  /* Prefilled messages carry the model and the marking, so the reply can
     quote against the standard without a round of questions. */
  function quoteText(p, size, qty) {
    return 'Quote request: ' + p.brand + ' ' + p.name + ' (model ' + p.model + ')' +
      '\nStandards: ' + p.standards.join(', ') +
      (size ? '\nSize: ' + size.label + (size.code ? ' (' + size.code + ')' : '') : '') +
      '\nQuantity: ' + (qty || 1);
  }
  function docText(p) {
    return 'Please send the datasheet and certificates for ' + p.brand + ' ' + p.name +
      ' (model ' + p.model + ').';
  }

  /* ---------- helpers ------------------------------------------------ */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function product(id) {
    return window.OS_PRODUCTS.filter(function (p) { return p.id === id; })[0];
  }
  function category(id) {
    return window.OS_CATEGORIES.filter(function (c) { return c.id === id; })[0];
  }
  function sizeOf(p, value) {
    if (!p.sizes) { return null; }
    return p.sizes.options.filter(function (o) { return o.value === value; })[0] || null;
  }

  function paintTally() {
    $$('[data-tally]').forEach(function (el) {
      var n = Enq.units();
      el.textContent = n;
      el.setAttribute('data-empty', n === 0 ? 'true' : 'false');
    });
  }

  var toastTimer;
  function toast(msg) {
    var el = $('#toast');
    if (!el) { return; }
    el.textContent = msg;
    el.setAttribute('data-show', 'true');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.setAttribute('data-show', 'false'); }, 2600);
  }

  function stepper(value) {
    return '<div class="stepper">' +
      '<button type="button" data-step="-1" aria-label="Reduce quantity">&minus;</button>' +
      '<input type="number" inputmode="numeric" min="1" value="' + value + '" aria-label="Quantity">' +
      '<button type="button" data-step="1" aria-label="Increase quantity">+</button>' +
      '</div>';
  }

  function wireStepper(root, onChange) {
    var input = $('input', root);
    $$('button[data-step]', root).forEach(function (b) {
      b.addEventListener('click', function () {
        var next = Math.max(1, (parseInt(input.value, 10) || 1) + parseInt(b.dataset.step, 10));
        input.value = next;
        if (onChange) { onChange(next); }
      });
    });
    input.addEventListener('change', function () {
      var next = Math.max(1, parseInt(input.value, 10) || 1);
      input.value = next;
      if (onChange) { onChange(next); }
    });
  }

  /* Posts to Netlify Forms. The form must exist in the static HTML with
     data-netlify="true" so the build-time parser registers it. */
  function netlifyPost(formName, data) {
    var body = new URLSearchParams();
    body.append('form-name', formName);
    Object.keys(data).forEach(function (k) { body.append(k, data[k]); });
    return fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString()
    });
  }

  function fields(form, names) {
    var out = {};
    names.forEach(function (n) {
      if (form.elements[n]) { out[n] = form.elements[n].value.trim(); }
    });
    return out;
  }

  function validate(form, required) {
    var ok = true;
    required.forEach(function (name) {
      var input = form.elements[name];
      if (!input) { return; }
      var valid = input.value.trim().length > 1 &&
        (name !== 'email' || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.value));
      input.closest('.field').setAttribute('data-invalid', valid ? 'false' : 'true');
      if (!valid && ok) { input.focus(); }
      if (!valid) { ok = false; }
    });
    return ok;
  }

  /* ---------- header -------------------------------------------------- */
  function initNav() {
    var burger = $('#burger'), nav = $('#nav');
    if (!burger || !nav) { return; }
    burger.addEventListener('click', function () {
      var open = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', open ? 'false' : 'true');
      burger.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
  }

  /* ---------- products page -------------------------------------------- */
  function initProducts() {
    var host = $('#sheets');
    if (!host) { return; }

    /* category chips */
    var chips = $('#chips');
    var stocked = window.OS_CATEGORIES.filter(function (c) { return c.stocked; });
    chips.innerHTML = '<li><a class="chip" href="#" data-cat="all">All lines <span class="chip__n">' +
      window.OS_PRODUCTS.length + '</span></a></li>' +
      stocked.map(function (c) {
        var n = window.OS_PRODUCTS.filter(function (p) { return p.cat === c.id; }).length;
        return '<li><a class="chip" href="#" data-cat="' + c.id + '">' + c.label +
          ' <span class="chip__n">' + n + '</span></a></li>';
      }).join('');

    /* Escape a value destined for an HTML attribute. Product copy is
       author-controlled, but alt text is prose and may contain quotes. */
    function attr(v) {
      return String(v == null ? '' : v)
        .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
        .replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    /* Documents row. A product with `datasheet` set links the PDF; without
       one the buyer can ask for it on WhatsApp, so every line still offers
       its paperwork. */
    function docs(p) {
      var ds = p.datasheet
        ? '<a class="doc" href="' + attr(p.datasheet) + '" download>Datasheet (PDF)</a>'
        : '<a class="doc" href="' + waLink(docText(p)) + '" target="_blank" rel="noopener">Request datasheet and certificates</a>';
      return '<div class="docs">' + ds +
        '<a class="doc doc--quiet" href="certificates.html#' + p.id + '">Certification details</a></div>';
    }

    function sheet(p) {
      var c = category(p.cat);
      var picker = '';
      if (p.sizes) {
        picker = '<div class="pick__field"><span class="pick__label">' + p.sizes.label + '</span>' +
          '<select class="js-size" aria-label="' + p.sizes.label + '">' +
          p.sizes.options.map(function (o) {
            return '<option value="' + o.value + '">' + o.label +
              (o.code ? ' \u00b7 ' + o.code : '') + '</option>';
          }).join('') + '</select></div>';
      }

      /* Image slot. A product with `photo` set shows the photograph; without
         one it falls back to the category pictogram, so an unphotographed
         line still looks deliberate. Adding imagery is a data edit in
         data.js — see the product shape documented at the top of that file. */
      var visual = p.photo
        ? '<img class="sheet__photo" src="' + attr(p.photo) + '" alt="' +
            attr(p.photoAlt || (p.brand + ' ' + p.name)) + '" loading="lazy" decoding="async">'
        : '<span class="sheet__sign"><svg><use href="#' + c.icon + '"></use></svg></span>';

      return '' +
      '<article class="sheet" id="' + p.id + '" data-id="' + p.id + '" data-cat="' + p.cat + '">' +
        '<div class="sheet__panel">' +
          visual +
          '<span class="sheet__brand">' + p.brand + '</span>' +
          '<span class="sheet__origin">' + p.origin + '</span>' +
        '</div>' +
        '<div class="sheet__body">' +
          '<span class="sheet__eyebrow">' + c.label + ' &middot; Model ' + p.model + '</span>' +
          '<h2 class="sheet__name">' + p.name + '</h2>' +
          '<p class="sheet__lede">' + p.lede + '</p>' +
          '<span class="marking">' + p.standards.join(' &nbsp;/&nbsp; ') + '</span>' +
          '<dl class="specs">' + p.specs.map(function (s) {
            return '<div><dt>' + s[0] + '</dt><dd>' + s[1] + '</dd></div>';
          }).join('') + '</dl>' +
          docs(p) +
          '<div class="pick">' + picker +
            '<div class="pick__field"><span class="pick__label">Quantity</span>' + stepper(1) + '</div>' +
            '<button class="add" type="button">Add to enquiry</button>' +
            '<a class="wa-quote" href="' + waLink(quoteText(p)) + '" target="_blank" rel="noopener">Quote on WhatsApp</a>' +
          '</div>' +
        '</div>' +
      '</article>';
    }

    host.innerHTML = window.OS_PRODUCTS.map(sheet).join('');

    $$('.sheet', host).forEach(function (el) {
      var pid = el.dataset.id;
      var qty = 1;
      var wa = $('.wa-quote', el);
      var sizeSel = $('.js-size', el);
      function syncWa() {
        var s = sizeSel ? sizeOf(product(pid), sizeSel.value) : null;
        wa.href = waLink(quoteText(product(pid), s, qty));
      }
      if (sizeSel) { sizeSel.addEventListener('change', syncWa); }
      wireStepper($('.stepper', el), function (v) { qty = v; syncWa(); });
      syncWa();
      var btn = $('.add', el);
      btn.addEventListener('click', function () {
        var sel = $('.js-size', el);
        var size = sel ? sel.value : null;
        Enq.add(pid, size, qty);
        btn.dataset.added = 'true';
        btn.textContent = 'Added \u2713';
        toast(qty + ' \u00d7 ' + product(pid).name + (size ? ', size ' + size : '') + ' added');
        setTimeout(function () {
          btn.dataset.added = 'false';
          btn.textContent = 'Add to enquiry';
        }, 1800);
      });
    });

    /* request-only categories */
    var req = $('#requests');
    if (req) {
      req.innerHTML = window.OS_CATEGORIES.filter(function (c) { return !c.stocked; })
        .map(function (c) {
          return '<div class="req__item">' +
            '<span class="req__sign"><svg><use href="#' + c.icon + '"></use></svg></span>' +
            '<h3>' + c.label + '</h3>' +
            '<p>' + c.note + '. Supplied to order against your specification &mdash; tell us the standard you need to meet and we will come back with options and lead time.</p>' +
            '<a class="btn btn--quiet" href="contact.html">Request details</a>' +
          '</div>';
        }).join('');
    }

    /* filtering */
    function applyFilter(cat) {
      $$('.chip', chips).forEach(function (a) {
        a.style.borderColor = a.dataset.cat === cat ? 'var(--mandate)' : '';
      });
      $$('.sheet', host).forEach(function (el) {
        el.style.display = (cat === 'all' || el.dataset.cat === cat) ? '' : 'none';
      });
    }
    chips.addEventListener('click', function (e) {
      var a = e.target.closest('.chip');
      if (!a) { return; }
      e.preventDefault();
      applyFilter(a.dataset.cat);
    });

    var params = new URLSearchParams(window.location.search);
    applyFilter(params.get('cat') && category(params.get('cat')) ? params.get('cat') : 'all');

    /* Deep links from the finder (products.html?cat=foot#rw-3228) arrive
       before the sheets exist, so the browser cannot jump on its own. */
    if (window.location.hash) {
      var target = document.getElementById(window.location.hash.slice(1));
      if (target) { target.scrollIntoView(); }
    }
  }

  /* ---------- enquiry page ---------------------------------------------- */
  function initEnquiry() {
    var host = $('#lines');
    if (!host) { return; }

    function summaryText() {
      return Enq.all().map(function (l) {
        var p = product(l.pid);
        var s = sizeOf(p, l.size);
        return l.qty + ' x ' + p.brand + ' ' + p.name +
          (s ? '  size ' + s.label + (s.code ? ' (' + s.code + ')' : '') : '') +
          '  [model ' + p.model + ']';
      }).join('\n');
    }

    function render() {
      var items = Enq.all();

      if (!items.length) {
        $('#enquiry-body').innerHTML =
          '<div class="empty"><h3>Your enquiry list is empty</h3>' +
          '<p>Add products and sizes from the catalogue and they collect here. We reply with pricing, stock and lead time.</p>' +
          '<a class="btn btn--dark" href="products.html">Browse the catalogue</a></div>';
        return;
      }

      host.innerHTML = items.map(function (l) {
        var p = product(l.pid);
        var c = category(p.cat);
        var s = sizeOf(p, l.size);
        return '<div class="line" data-key="' + keyOf(l) + '">' +
          '<span class="line__sign"><svg><use href="#' + c.icon + '"></use></svg></span>' +
          '<div>' +
            '<p class="line__name">' + p.brand + ' &mdash; ' + p.name + '</p>' +
            '<p class="line__meta">Model ' + p.model + ' &middot; ' + c.label + '</p>' +
            (s ? '<span class="line__size">Size ' + s.label +
                 (s.code ? ' &middot; ' + s.code : '') + '</span>' : '') +
            '<span class="marking">' + p.standards.join(' &nbsp;/&nbsp; ') + '</span>' +
            '<div class="line__ctrl" style="margin-top:11px">' + stepper(l.qty) +
              '<button class="link-danger" type="button" data-remove>Remove</button>' +
            '</div>' +
          '</div>' +
          '<span class="line__sum">' + l.qty + ' unit' + (l.qty === 1 ? '' : 's') + '</span>' +
        '</div>';
      }).join('');

      $$('.line', host).forEach(function (el) {
        var k = el.dataset.key;
        wireStepper($('.stepper', el), function (v) { Enq.setQty(k, v); render(); });
        $('[data-remove]', el).addEventListener('click', function () {
          Enq.remove(k);
          render();
          toast('Removed from enquiry');
        });
      });

      $('#tallybar').innerHTML =
        '<div><dt>Lines</dt><dd>' + Enq.lines() + '</dd></div>' +
        '<div><dt>Total units</dt><dd>' + Enq.units() + '</dd></div>';
    }

    var form = $('#rfq');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!Enq.all().length) { toast('Add at least one product first'); return; }
        if (!validate(form, ['company', 'contact', 'email', 'phone'])) { return; }

        var ref = 'OS-' + new Date().toISOString().slice(2, 10).replace(/-/g, '') +
                  '-' + Math.random().toString(36).slice(2, 6).toUpperCase();

        var text = ['Reference: ' + ref, '', summaryText(), ''].join('\n');
        ['company', 'contact', 'email', 'phone', 'emirate', 'needed', 'notes'].forEach(function (n) {
          var v = form.elements[n] ? form.elements[n].value.trim() : '';
          if (v) { text += '\n' + n.charAt(0).toUpperCase() + n.slice(1) + ': ' + v; }
        });

        var payload = fields(form, ['company', 'contact', 'email', 'phone', 'emirate', 'needed', 'notes']);
        payload.reference = ref;
        payload.items = summaryText();

        var btn = $('button[type=submit]', form);
        btn.disabled = true;
        btn.textContent = 'Sending\u2026';

        function finish(delivered) {
          $('#enquiry-body').innerHTML =
            '<div class="receipt">' +
              '<span class="eyebrow eyebrow--mandate">' +
                (delivered ? 'Enquiry received' : 'Enquiry prepared') + '</span>' +
              '<h2>' + (delivered ? 'We have your list' : 'Send it through') + '</h2>' +
              '<p class="receipt__ref">' + ref + '</p>' +
              '<p>' + (delivered
                ? 'Quote this reference when you call. We come back with pricing, stock and lead time, normally within one working day.'
                : 'We could not reach the server, so nothing has been sent. Email the list or copy it across \u2014 the reference is already assigned.') +
              '</p>' +
              '<div class="actions">' +
                '<a class="btn btn--primary" id="mailto" href="#">Email a copy</a>' +
                '<a class="btn btn--quiet" id="wasend" href="#" target="_blank" rel="noopener">Send on WhatsApp</a>' +
                '<button class="btn btn--quiet" type="button" id="copy">Copy list</button>' +
              '</div>' +
            '</div>';

          $('#mailto').href = 'mailto:info@oasisstargt.com?subject=' +
            encodeURIComponent('Enquiry ' + ref) + '&body=' + encodeURIComponent(text);

          $('#wasend').href = waLink(text);

          $('#copy').addEventListener('click', function () {
            navigator.clipboard.writeText(text).then(function () { toast('List copied'); });
          });

          Enq.clear();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        netlifyPost('product-enquiry', payload)
          .then(function (r) { finish(r.ok); })
          .catch(function () { finish(false); });
      });
    }

    render();
  }

  /* ---------- suit-up hero + kit finder ---------------------------------- */
  /* One state drives both: the finder picks a line per protection zone from
     data.js (scored on the hazards its datasheet covers, then industry), the
     worker's zone cards show the pick, and the kit list multiplies by crew.
     Zones with no documented line are listed as sourced to order with the
     standard a buyer would specify — never as a stocked product. */
  function initKit() {
    var panel = $('#kit');
    if (!panel) { return; }
    var state = { industry: '', hazards: {}, crew: 25 };
    var ZONES = [
      { id: 'head',  label: 'Head',  icon: 'pic-head' },
      { id: 'eyes',  label: 'Eyes',  icon: 'pic-eye' },
      { id: 'body',  label: 'Body',  icon: 'pic-body' },
      { id: 'hands', label: 'Hands', icon: 'pic-hand', cat: 'hand' },
      { id: 'feet',  label: 'Feet',  icon: 'pic-foot', cat: 'foot' },
      { id: 'dev',   label: 'Ex devices', icon: 'pic-gas', cat: 'exdev' }
    ];
    var last = {};

    function has(h) { return !!state.hazards[h]; }
    function hzLabel(id) { return window.OS_HAZARDS.filter(function (h) { return h.id === id; })[0].label; }
    function indLabel(id) { var x = window.OS_INDUSTRIES.filter(function (i) { return i.id === id; })[0]; return x ? x.label : 'Any'; }

    function best(cat) {
      var picked = Object.keys(state.hazards);
      var scored = window.OS_PRODUCTS.filter(function (p) { return p.cat === cat; }).map(function (p, n) {
        var hits = picked.filter(function (h) { return p.covers && p.covers[h]; });
        var score = hits.length * 2;
        if (state.industry) { score += (p.industries || []).indexOf(state.industry) >= 0 ? 1 : -1; }
        return { p: p, hits: hits, score: score, n: n };
      });
      scored.sort(function (a, b) { return b.score - a.score || a.n - b.n; });
      return scored[0];
    }

    function recommend() {
      var fr = has('chemical') || has('explosive');
      var out = {
        head: { item: 'Hard hat', std: 'EN 397', note: 'Sourced to order', state: 'request' },
        eyes: { item: 'Safety glasses', std: 'EN 166', note: 'Sourced to order', state: 'request' },
        body: fr
          ? { item: 'FR anti-static coverall', std: 'EN ISO 11612 / EN 1149-5', note: 'Sourced to order', state: 'request' }
          : { item: 'Hi-vis vest', std: 'EN ISO 20471', note: 'Sourced to order', state: 'request' }
      };
      ['hands', 'feet', 'dev'].forEach(function (z) {
        var zone = ZONES.filter(function (x) { return x.id === z; })[0];
        var b = best(zone.cat);
        if (z === 'dev' && !(has('explosive') || has('lone'))) {
          out.dev = { item: 'Ex smartphone', std: 'ATEX Zone 1/21', note: 'Add explosive atmosphere or lone working if your permit needs it', state: 'idle', p: b.p, off: true };
          return;
        }
        out[z] = {
          p: b.p, item: b.p.name, std: b.p.standards.slice(0, 2).join(' · '),
          note: b.hits.length ? b.p.covers[b.hits[0]] : b.p.brand + ' ' + b.p.model,
          state: 'ok'
        };
      });
      return out;
    }

    function render(lightAll) {
      var rec = recommend();

      /* worker zone cards */
      ZONES.forEach(function (z) {
        var el = $('[data-zone="' + z.id + '"]');
        if (!el) { return; }
        var r = rec[z.id];
        var st = $('.zone__state', el);
        st.dataset.state = r.state;
        st.textContent = r.state === 'ok' ? 'OK' : r.state === 'request' ? 'To order' : 'Optional';
        $('.zone__item', el).textContent = r.item;
        $('.zone__std', el).textContent = r.std;
        $('.zone__note', el).textContent = r.note;
        var sig = r.item + r.state;
        if (lightAll || (last[z.id] && last[z.id] !== sig)) {
          el.dataset.lit = 'true';
          setTimeout(function () { el.dataset.lit = 'false'; }, 1400);
        }
        last[z.id] = sig;
      });

      /* kit list */
      var lines = ZONES.map(function (z) { return { z: z, r: rec[z.id] }; }).filter(function (x) { return !x.r.off; });
      $('[data-kit-list]').innerHTML = lines.map(function (x) {
        var p = x.r.p, thumb = p && p.photo
          ? '<img src="' + p.photo + '" alt="">'
          : '<svg><use href="#' + x.z.icon + '"></use></svg>';
        return '<li><span class="kitlist__thumb">' + thumb + '</span>' +
          '<div><p class="kitlist__name">' + x.r.item + '</p>' +
          '<p class="kitlist__std" data-state="' + x.r.state + '">' + x.r.std + (x.r.state === 'request' ? ' · to order' : '') + '</p></div>' +
          '<span class="kitlist__qty">' + state.crew + ' pcs</span></li>';
      }).join('');

      /* site profile + ring */
      var stock = lines.filter(function (x) { return x.r.state === 'ok'; });
      var order = lines.filter(function (x) { return x.r.state === 'request'; });
      var prof = { industry: indLabel(state.industry), hazards: Object.keys(state.hazards).length,
        crew: state.crew, stock: stock.length, order: order.length };
      Object.keys(prof).forEach(function (k) { var el = $('[data-prof="' + k + '"]'); if (el) { el.textContent = prof[k]; } });
      var ring = $('[data-ring]');
      if (ring) {
        ring.textContent = stock.length + ' / ' + lines.length;
        $('.ring__fg').setAttribute('stroke-dashoffset', String(207.3 * (1 - stock.length / lines.length)));
      }

      /* chips and tiles */
      $$('[data-kit-industries] .tile').forEach(function (t) {
        t.setAttribute('aria-pressed', t.dataset.id === state.industry ? 'true' : 'false');
      });
      $$('[data-kit-hazards] button').forEach(function (b) {
        b.setAttribute('aria-pressed', has(b.dataset.id) ? 'true' : 'false');
      });

      /* WhatsApp quote for the whole kit, sourced-to-order lines included */
      $('[data-kit-wa]').href = waLink('Kit request (' + state.crew + ' workers)' +
        '\nIndustry: ' + indLabel(state.industry) +
        (prof.hazards ? '\nHazards: ' + Object.keys(state.hazards).map(hzLabel).join(', ') : '') + '\n' +
        lines.map(function (x) {
          return '- ' + state.crew + ' x ' + (x.r.p ? x.r.p.brand + ' ' + x.r.p.model + ' ' + x.r.item : x.r.item) +
            ' (' + x.r.std + ')' + (x.r.state === 'request' ? ' — to order' : '');
        }).join('\n'));
      return stock;
    }

    $('[data-kit-industries]').innerHTML = window.OS_INDUSTRIES.map(function (i) {
      return '<button type="button" class="tile" data-id="' + i.id + '" aria-pressed="false">' +
        '<svg aria-hidden="true"><use href="#' + i.icon + '"></use></svg>' + i.label + '</button>';
    }).join('');
    $('[data-kit-hazards]').innerHTML = window.OS_HAZARDS.map(function (h) {
      return '<button type="button" data-id="' + h.id + '" aria-pressed="false">' + h.label + '</button>';
    }).join('');

    panel.addEventListener('click', function (e) {
      var t = e.target.closest('.tile');
      var h = e.target.closest('[data-kit-hazards] button');
      if (t) { state.industry = state.industry === t.dataset.id ? '' : t.dataset.id; render(); }
      if (h) { if (has(h.dataset.id)) { delete state.hazards[h.dataset.id]; } else { state.hazards[h.dataset.id] = true; } render(); }
    });
    var crew = $('[data-kit-crew]');
    crew.addEventListener('input', function () {
      state.crew = Math.max(1, Math.min(5000, parseInt(crew.value, 10) || 1));
      render();
    });
    $('[data-kit-go]').addEventListener('click', function () {
      render(true);
      var stage = $('.stage');
      if (stage) { stage.scrollIntoView({ block: 'center' }); }
    });
    $('[data-kit-reset]').addEventListener('click', function () {
      state = { industry: '', hazards: {}, crew: 25 };
      crew.value = 25;
      render(true);
    });
    $('[data-kit-add]').addEventListener('click', function () {
      var stock = render();
      stock.forEach(function (x) { Enq.add(x.r.p.id, null, state.crew); });
      toast(stock.length + ' line' + (stock.length === 1 ? '' : 's') + ' × ' + state.crew +
        ' added. Items to order go in the WhatsApp quote.');
    });
    $('[data-kit-pdf]').addEventListener('click', function () {
      document.body.classList.add('print-kit');
      window.print();
    });
    window.addEventListener('afterprint', function () { document.body.classList.remove('print-kit'); });

    render();
  }

  /* Gulf Standard Time on the hero ticker — a real clock, not a feed. */
  function initClock() {
    var el = $('[data-gst]');
    if (!el) { return; }
    function tick() {
      try {
        el.textContent = new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Dubai', hour12: false });
      } catch (e) { el.textContent = ''; }
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- certificates page ------------------------------------------ */
  /* One row per documented line, built from the same data as the catalogue
     so the register can never drift from the datasheets. */
  function initCertificates() {
    var host = $('#register');
    if (!host) { return; }
    host.innerHTML = window.OS_PRODUCTS.map(function (p) {
      var c = category(p.cat);
      var certs = (p.certs || []).map(function (x) {
        return '<li>' + x.standard + (x.body ? ' &middot; ' + x.body : '') +
          (x.ref ? ' &middot; <span class="mono">' + x.ref + '</span>' : '') + '</li>';
      }).join('');
      return '<article class="cert" id="' + p.id + '">' +
        '<span class="line__sign"><svg><use href="#' + c.icon + '"></use></svg></span>' +
        '<div class="cert__body">' +
          '<span class="sheet__eyebrow">' + c.label + ' &middot; Model ' + p.model + '</span>' +
          '<h3 class="cert__name">' + p.brand + ' &mdash; ' + p.name + '</h3>' +
          '<span class="marking">' + p.standards.join(' &nbsp;/&nbsp; ') + '</span>' +
          (certs
            ? '<ul class="cert__list">' + certs + '</ul>'
            : '<p class="cert__note">Certificates of conformity are supplied with the quotation, or on request.</p>') +
          '<div class="docs">' +
            (p.datasheet
              ? '<a class="doc" href="' + p.datasheet + '" download>Datasheet (PDF)</a>'
              : '<a class="doc" href="' + waLink(docText(p)) + '" target="_blank" rel="noopener">Request datasheet and certificates</a>') +
            '<a class="doc doc--quiet" href="products.html?cat=' + p.cat + '">View in catalogue</a>' +
          '</div>' +
        '</div>' +
      '</article>';
    }).join('');

    /* Deep links (certificates.html#rn-267) arrive before the rows exist. */
    if (window.location.hash) {
      var target = document.getElementById(window.location.hash.slice(1));
      if (target) { target.scrollIntoView(); target.setAttribute('data-target', 'true'); }
    }
  }

  /* ---------- contact page ---------------------------------------------- */
  function initContact() {
    var form = $('#contactform');
    if (!form) { return; }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(form, ['company', 'contact', 'email'])) { return; }

      var btn = $('button[type=submit]', form);
      btn.disabled = true;
      btn.textContent = 'Sending\u2026';

      var payload = fields(form, ['interest', 'company', 'contact', 'email', 'phone', 'emirate', 'message']);

      function done(delivered) {
        form.innerHTML = '<div class="receipt">' +
          '<span class="eyebrow eyebrow--mandate">' + (delivered ? 'Enquiry received' : 'Could not send') + '</span>' +
          '<h2>' + (delivered ? 'Thank you' : 'Try email instead') + '</h2>' +
          '<p>' + (delivered
            ? 'One of our team replies within one working day. For anything urgent, call the number opposite.'
            : 'We could not reach the server. Email info@oasisstargt.com and we will pick it up from there.') +
          '</p></div>';
      }

      netlifyPost('general-enquiry', payload)
        .then(function (r) { done(r.ok); })
        .catch(function () { done(false); });
    });
  }

  /* ---------- scroll reveal (separately quoted add-on, off by default) ----
     Disabled unless <body class="motion">, or ?motion=1 on the URL for a
     demo without editing files. Everything here is additive: with the flag
     absent the function returns immediately and the page stays static.
     Styling lives at the end of site.css.                                */
  function initReveal() {
    var body = document.body;

    /* ?motion=1 turns the flag on at runtime, for demos. */
    if (/[?&]motion=1\b/.test(window.location.search)) body.classList.add('motion');
    if (!body.classList.contains('motion')) return;

    /* Never animate for visitors who asked not to. */
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced && reduced.matches) return;

    /* Without IntersectionObserver, leave content at rest rather than
       hiding it — a reveal that never fires would hide the catalogue. */
    if (!('IntersectionObserver' in window)) return;

    var groups = ['.gate__grid .disc', '.sheet', '.steps .step', '.req__item'];
    var targets = [];

    groups.forEach(function (sel) {
      var found = Array.prototype.slice.call(document.querySelectorAll(sel));
      found.forEach(function (el, i) {
        el.setAttribute('data-reveal', '');
        /* Stagger within the group, capped so late items don't lag. */
        el.style.setProperty('--reveal-delay', Math.min(i * 60, 300) + 'ms');
        targets.push(el);
      });
    });

    if (!targets.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.setAttribute('data-inview', 'true');
        io.unobserve(el);
        /* Release the compositor hint once the transition has run. */
        window.setTimeout(function () { el.classList.add('is-settled'); }, 900);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---------- boot ------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    paintTally();
    initProducts();
    initEnquiry();
    initContact();
    initCertificates();
    initKit();
    initClock();
    initReveal();   /* last — product sheets must exist before observing */
  });
})();
