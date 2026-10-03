// Techembrace static site — shared behaviour
document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('is-open');
      toggle.classList.toggle('is-open');
    });
  }

  // Highlight current nav link (works with or without .html in the URL)
  var page = window.location.pathname.split('/').pop().replace(/\.html$/, '');
  document.querySelectorAll('.main-nav a').forEach(function (a) {
    var href = a.getAttribute('href').replace(/^\//, '').replace(/\.html$/, '');
    var isHome = (page === '' || page === 'index') && (href === '' || href === 'index');
    if (isHome || (href !== '' && href === page)) {
      a.classList.add('is-active');
    }
  });

  // Projects page filter
  var filterRow = document.querySelector('[data-filter-row]');
  var projectCards = document.querySelectorAll('[data-project-grid] .project-card');
  if (filterRow && projectCards.length) {
    filterRow.querySelectorAll('.filter-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterRow.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        var filter = btn.getAttribute('data-filter');
        projectCards.forEach(function (card) {
          var tags = (card.getAttribute('data-tags') || '').split(' ');
          card.hidden = !(filter === 'all' || tags.indexOf(filter) !== -1);
        });
      });
    });
  }

  // Basic contact/newsletter form handling (no backend wired up yet)
  document.querySelectorAll('form[data-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = form.querySelector('.form-success');
      if (note) {
        note.style.display = 'block';
      } else {
        alert('Thanks — this form is not yet connected to an inbox. Ask your developer to wire it up to Formspree, Netlify Forms, or a mail API.');
      }
      form.reset();
    });
  });
});

/* ==========================================================
   EDUCATION + BUSINESS MEGA MENUS (added to the shared header)
   Adds two links to the main menu on every page. Each opens a
   mega menu on hover, focus or the arrow button, and is also a
   normal link to its own page (/education, /business).
   ========================================================== */
(function () {
  var nav = document.querySelector('.main-nav');
  var list = nav && nav.querySelector('ul');
  if (!list) return;
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');

  var PANELS = {"education": "<section aria-labelledby=\"mn-tab-education\" class=\"mn-panel mn-panel--education\" hidden id=\"mn-panel-education\" role=\"region\">\n<p class=\"mn-eyebrow\">Education &amp; Training</p>\n<ul class=\"mn-grid\">\n<li><a href=\"/education#thinglink\"><span class=\"mn-ico\"><svg aria-hidden=\"true\"><use href=\"#mn-i-globe\"></use></svg></span><span class=\"mn-txt\"><strong>Virtual field trips &amp; heritage</strong><span>Take learners somewhere real with 360° scenes.</span></span></a></li>\n<li><a href=\"/education#thinglink\"><span class=\"mn-ico\"><svg aria-hidden=\"true\"><use href=\"#mn-i-layers\"></use></svg></span><span class=\"mn-txt\"><strong>Interactive lessons</strong><span>Turn slides and documents into tap-to-explore learning.</span></span></a></li>\n<li><a href=\"/education#work\"><span class=\"mn-ico\"><svg aria-hidden=\"true\"><use href=\"#mn-i-book\"></use></svg></span><span class=\"mn-txt\"><strong>Learner showcases</strong><span>Student work published with ThingLink and Book Creator.</span></span></a></li>\n<li><a href=\"/education#thinglink\"><span class=\"mn-ico\"><svg aria-hidden=\"true\"><use href=\"#mn-i-compass\"></use></svg></span><span class=\"mn-txt\"><strong>Vocational &amp; technical skills</strong><span>Walk through a workplace or workshop before the real thing.</span></span></a></li>\n<li><a href=\"/education#use-cases\"><span class=\"mn-ico\"><svg aria-hidden=\"true\"><use href=\"#mn-i-infinity\"></use></svg></span><span class=\"mn-txt\"><strong>Neuro-inclusive design</strong><span>Clear routes, plain language and audio from the first draft.</span></span></a></li>\n<li><a href=\"/education#use-cases\"><span class=\"mn-ico\"><svg aria-hidden=\"true\"><use href=\"#mn-i-users\"></use></svg></span><span class=\"mn-txt\"><strong>Staff CPD</strong><span>Practical training that builds confidence, not overwhelm.</span></span></a></li>\n</ul>\n<div class=\"mn-foot\">\n<p><strong>Inclusive by design, adopted by staff.</strong></p>\n<div class=\"mn-foot__btns\">\n<a class=\"mn-btn\" href=\"/education#thinglink\">See our ThingLink work <svg aria-hidden=\"true\"><use href=\"#mn-i-arrow\"></use></svg></a>\n<a class=\"mn-link\" href=\"/education#partner\">Our partners <svg aria-hidden=\"true\"><use href=\"#mn-i-arrow\"></use></svg></a>\n</div>\n</div>\n</section>", "business": "<section aria-labelledby=\"mn-tab-business\" class=\"mn-panel mn-panel--business\" hidden id=\"mn-panel-business\" role=\"region\">\n<p class=\"mn-eyebrow\">Business &amp; Enterprise</p>\n<ul class=\"mn-grid\">\n<li><a href=\"/business#thinglink\"><span class=\"mn-ico\"><svg aria-hidden=\"true\"><use href=\"#mn-i-compass\"></use></svg></span><span class=\"mn-txt\"><strong>Immersive onboarding</strong><span>Show new starters the workplace before day one.</span></span></a></li>\n<li><a href=\"/business#thinglink\"><span class=\"mn-ico\"><svg aria-hidden=\"true\"><use href=\"#mn-i-shield\"></use></svg></span><span class=\"mn-txt\"><strong>Safety &amp; procedure training</strong><span>Hotspot walk-throughs for kitchens, sites and workshops.</span></span></a></li>\n<li><a href=\"/business#thinglink\"><span class=\"mn-ico\"><svg aria-hidden=\"true\"><use href=\"#mn-i-users\"></use></svg></span><span class=\"mn-txt\"><strong>Employment &amp; workforce skills</strong><span>Courses that connect learning to work.</span></span></a></li>\n<li><a href=\"/business#work\"><span class=\"mn-ico\"><svg aria-hidden=\"true\"><use href=\"#mn-i-image\"></use></svg></span><span class=\"mn-txt\"><strong>Interactive products &amp; tours</strong><span>Images and 360° tours that explain, not just show.</span></span></a></li>\n<li><a href=\"/business#use-cases\"><span class=\"mn-ico\"><svg aria-hidden=\"true\"><use href=\"#mn-i-spark\"></use></svg></span><span class=\"mn-txt\"><strong>Staff enablement &amp; AI</strong><span>Role-based training so teams use AI well.</span></span></a></li>\n<li><a href=\"/business#partner\"><span class=\"mn-ico\"><svg aria-hidden=\"true\"><use href=\"#mn-i-trend\"></use></svg></span><span class=\"mn-txt\"><strong>EdTech &amp; go-to-market</strong><span>Launch support for learning-technology founders.</span></span></a></li>\n</ul>\n<div class=\"mn-foot\">\n<p><strong>Immersive learning your people finish.</strong></p>\n<div class=\"mn-foot__btns\">\n<a class=\"mn-btn\" href=\"/business#thinglink\">See our ThingLink work <svg aria-hidden=\"true\"><use href=\"#mn-i-arrow\"></use></svg></a>\n<a class=\"mn-link\" href=\"/business#partner\">Our partners <svg aria-hidden=\"true\"><use href=\"#mn-i-arrow\"></use></svg></a>\n</div>\n</div>\n</section>"};
  var CARET = "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M6 9l6 6 6-6\"/></svg>";
  var SPRITE = "<svg aria-hidden=\"true\" focusable=\"false\" width=\"0\" height=\"0\" style=\"position:absolute\"><defs><symbol fill=\"none\" id=\"mn-i-arrow\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.8\" viewBox=\"0 0 24 24\"><path d=\"M4 12h15M13 6l6 6-6 6\"></path></symbol><symbol fill=\"none\" id=\"mn-i-book\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.6\" viewBox=\"0 0 24 24\"><path d=\"M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5z\"></path><path d=\"M4 21a2 2 0 0 1 2-2h13\"></path></symbol><symbol fill=\"none\" id=\"mn-i-compass\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.6\" viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"9\"></circle><path d=\"M15.5 8.5l-2 5-5 2 2-5 5-2z\"></path></symbol><symbol fill=\"none\" id=\"mn-i-globe\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.6\" viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"9\"></circle><path d=\"M3 12h18\"></path><path d=\"M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18\"></path></symbol><symbol fill=\"none\" id=\"mn-i-image\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.6\" viewBox=\"0 0 24 24\"><rect height=\"16\" rx=\"2\" width=\"18\" x=\"3\" y=\"4\"></rect><circle cx=\"9\" cy=\"10\" r=\"1.5\"></circle><path d=\"M3 17l5-4 4 3 3-2 6 4\"></path></symbol><symbol fill=\"none\" id=\"mn-i-infinity\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.6\" viewBox=\"0 0 24 24\"><path d=\"M12 12c-2-2.5-3.5-4-5.5-4a4 4 0 0 0 0 8c2 0 3.5-1.5 5.5-4zm0 0c2 2.5 3.5 4 5.5 4a4 4 0 0 0 0-8c-2 0-3.5 1.5-5.5 4z\"></path></symbol><symbol fill=\"none\" id=\"mn-i-layers\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.6\" viewBox=\"0 0 24 24\"><path d=\"M12 3 3 8l9 5 9-5-9-5z\"></path><path d=\"M3 12l9 5 9-5\"></path><path d=\"M3 16l9 5 9-5\"></path></symbol><symbol fill=\"none\" id=\"mn-i-shield\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.6\" viewBox=\"0 0 24 24\"><path d=\"M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z\"></path><path d=\"M9 12l2 2 4-4\"></path></symbol><symbol fill=\"none\" id=\"mn-i-spark\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.6\" viewBox=\"0 0 24 24\"><path d=\"M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z\"></path><path d=\"M19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z\"></path></symbol><symbol fill=\"none\" id=\"mn-i-trend\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.6\" viewBox=\"0 0 24 24\"><path d=\"M3 17l6-6 4 4 8-8\"></path><path d=\"M15 7h6v6\"></path></symbol><symbol fill=\"none\" id=\"mn-i-users\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.6\" viewBox=\"0 0 24 24\"><circle cx=\"9\" cy=\"8\" r=\"3\"></circle><path d=\"M3 20a6 6 0 0 1 12 0\"></path><circle cx=\"17\" cy=\"9\" r=\"2.5\"></circle><path d=\"M16 14.5a5 5 0 0 1 5 5.5\"></path></symbol></defs></svg>";

  var wrap = document.createElement('div');
  wrap.innerHTML = SPRITE;
  document.body.insertBefore(wrap.firstChild, document.body.firstChild);

  function findItem(slug) {
    var links = list.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      var h = (links[i].getAttribute('href') || '').replace(/^\//, '').replace(/\.html$/, '');
      if (h === slug) return links[i].parentNode;
    }
    return null;
  }
  /* AI Ethics lives in the footer now */
  var ethics = findItem('ai-ethics-safety');
  if (ethics && ethics.parentNode === list) list.removeChild(ethics);
  /* Blog link, called Insight */
  if (!findItem('blog')) {
    var ins = document.createElement('li');
    ins.innerHTML = '<a href="/blog">Insight</a>';
    var proj = findItem('projects');
    if (proj && proj.nextSibling) list.insertBefore(ins, proj.nextSibling); else list.appendChild(ins);
  }
  var anchorItem = findItem('our-services');
  var made = [];
  [['education', 'Education'], ['business', 'Business']].forEach(function (pair) {
    var slug = pair[0], label = pair[1];
    var li = findItem(slug);
    if (!li) {
      li = document.createElement('li');
      li.innerHTML = '<a href="/' + slug + '">' + label + '</a>';
      if (anchorItem && anchorItem.nextSibling) list.insertBefore(li, anchorItem.nextSibling);
      else list.appendChild(li);
      anchorItem = li;
    }
    li.classList.add('mn-item');
    li.querySelector('a').id = 'mn-tab-' + slug;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'mn-toggle';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'mn-panel-' + slug);
    btn.setAttribute('aria-label', 'Show ' + label + ' menu');
    btn.innerHTML = CARET;
    li.appendChild(btn);
    var holder = document.createElement('div');
    holder.innerHTML = PANELS[slug];
    var panel = holder.firstChild;
    li.appendChild(panel);
    made.push({ li: li, btn: btn, panel: panel });
  });

  var timer = null;
  var desktop = function () { return window.matchMedia('(min-width: 1181px)').matches; };
  var hoverOK = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  function closeAll(returnFocus) {
    var f = null;
    made.forEach(function (m) {
      if (m.btn.getAttribute('aria-expanded') === 'true') f = m.btn;
      m.btn.setAttribute('aria-expanded', 'false');
      m.panel.hidden = true;
    });
    if (returnFocus && f) f.focus();
  }
  function open(m) {
    closeAll(false);
    m.btn.setAttribute('aria-expanded', 'true');
    m.panel.hidden = false;
  }
  function cancel() { clearTimeout(timer); }
  function later() { cancel(); timer = setTimeout(function () { closeAll(false); }, 220); }

  made.forEach(function (m) {
    m.btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (m.btn.getAttribute('aria-expanded') === 'true') closeAll(false); else open(m);
    });
    if (hoverOK) {
      m.li.addEventListener('mouseenter', function () { if (desktop()) { cancel(); open(m); } });
      m.li.addEventListener('mouseleave', function () { if (desktop()) later(); });
    }
    m.li.addEventListener('focusin', cancel);
    m.li.addEventListener('focusout', function (e) {
      if (!m.li.contains(e.relatedTarget) && desktop()) later();
    });
    m.panel.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        closeAll(false);
        nav.classList.remove('is-open');
        if (toggle) toggle.classList.remove('is-open');
      });
    });
  });
  document.addEventListener('click', function (e) {
    if (header && !header.contains(e.target)) closeAll(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeAll(true);
      nav.classList.remove('is-open');
      if (toggle) toggle.classList.remove('is-open');
    }
  });
  if (toggle) toggle.addEventListener('click', function () {
    toggle.setAttribute('aria-expanded', nav.classList.contains('is-open') ? 'true' : 'false');
    closeAll(false);
  });
})();
