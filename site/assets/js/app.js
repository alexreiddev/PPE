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

      return '' +
      '<article class="sheet" data-id="' + p.id + '" data-cat="' + p.cat + '">' +
        /* Image slot — replace .sheet__sign with
           <img class="sheet__photo" src="…" alt="…"> when photos are licensed. */
        '<div class="sheet__panel">' +
          '<span class="sheet__sign"><svg><use href="#' + c.icon + '"></use></svg></span>' +
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
          '<div class="pick">' + picker +
            '<div class="pick__field"><span class="pick__label">Quantity</span>' + stepper(1) + '</div>' +
            '<button class="add" type="button">Add to enquiry</button>' +
          '</div>' +
        '</div>' +
      '</article>';
    }

    host.innerHTML = window.OS_PRODUCTS.map(sheet).join('');

    $$('.sheet', host).forEach(function (el) {
      var pid = el.dataset.id;
      var qty = 1;
      wireStepper($('.stepper', el), function (v) { qty = v; });
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
              '<span class="eyebrow eyebrow--blue">' +
                (delivered ? 'Enquiry received' : 'Enquiry prepared') + '</span>' +
              '<h2>' + (delivered ? 'We have your list' : 'Send it through') + '</h2>' +
              '<p class="receipt__ref">' + ref + '</p>' +
              '<p>' + (delivered
                ? 'Quote this reference when you call. We come back with pricing, stock and lead time, normally within one working day.'
                : 'We could not reach the server, so nothing has been sent. Email the list or copy it across \u2014 the reference is already assigned.') +
              '</p>' +
              '<div class="actions">' +
                '<a class="btn btn--primary" id="mailto" href="#">Email a copy</a>' +
                '<button class="btn btn--quiet" type="button" id="copy">Copy list</button>' +
              '</div>' +
            '</div>';

          $('#mailto').href = 'mailto:sales@oasisstar.ae?subject=' +
            encodeURIComponent('Enquiry ' + ref) + '&body=' + encodeURIComponent(text);

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
          '<span class="eyebrow eyebrow--blue">' + (delivered ? 'Enquiry received' : 'Could not send') + '</span>' +
          '<h2>' + (delivered ? 'Thank you' : 'Try email instead') + '</h2>' +
          '<p>' + (delivered
            ? 'One of our team replies within one working day. For anything urgent, call the number opposite.'
            : 'We could not reach the server. Email sales@oasisstar.ae and we will pick it up from there.') +
          '</p></div>';
      }

      netlifyPost('general-enquiry', payload)
        .then(function (r) { done(r.ok); })
        .catch(function () { done(false); });
    });
  }

  /* ---------- boot ------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    paintTally();
    initProducts();
    initEnquiry();
    initContact();
  });
})();
