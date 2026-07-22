(function () {
  'use strict';

  /* ---------- header: switch to solid background on scroll ---------- */
  var header = document.getElementById('header');
  function updateHeaderState() {
    if (!header) return;
    if (window.scrollY > 10) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });

  /* ---------- mobile nav toggle ---------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  function closeNav() {
    if (!burger || !nav) return;
    burger.classList.remove('is-active');
    burger.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function toggleNav() {
    if (!burger || !nav) return;
    var isOpen = nav.classList.toggle('is-open');
    burger.classList.toggle('is-active', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (burger) {
    burger.addEventListener('click', toggleNav);
  }

  document.querySelectorAll('[data-nav]').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  /* ---------- scroll reveal animation ---------- */
  var revealTargets = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealTargets.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealTargets.forEach(function (target) {
      observer.observe(target);
    });
  } else {
    revealTargets.forEach(function (target) {
      target.classList.add('is-visible');
    });
  }

  /* ---------- faq: keep only one item open at a time ---------- */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (item.open) {
        faqItems.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  /* ---------- voice track: pagination dots (mobile swipe) ---------- */
  var voiceTrack = document.getElementById('voiceTrack');
  var voiceDots = document.querySelectorAll('#voiceDots .dot');

  if (voiceTrack && voiceDots.length) {
    var voiceCards = voiceTrack.querySelectorAll('.voice-card');

    voiceDots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        var card = voiceCards[i];
        if (card) {
          voiceTrack.scrollTo({ left: card.offsetLeft - voiceTrack.offsetLeft, behavior: 'smooth' });
        }
      });
    });

    if ('IntersectionObserver' in window) {
      var voiceObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var idx = Array.prototype.indexOf.call(voiceCards, entry.target);
              voiceDots.forEach(function (dot, i) {
                dot.classList.toggle('is-active', i === idx);
              });
            }
          });
        },
        { root: voiceTrack, threshold: 0.6 }
      );
      voiceCards.forEach(function (card) {
        voiceObserver.observe(card);
      });
    }
  }
})();
