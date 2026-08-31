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

  // Highlight current nav link
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
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
