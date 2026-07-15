/* ==========================================================================
   MY COFFEE CO. — Global Theme Scripts
   ========================================================================== */

/**
 * Typing effect for the hero section.
 * Sequentially types out text in elements with the `type-target` class.
 */
async function typeEffect() {
  const targets = Array.from(document.querySelectorAll('.type-target'));
  const typingSpeed = 50;
  const pauseBetweenWords = 150;

  for (const target of targets) {
    const fullText = target.getAttribute('data-text');
    if (!fullText) continue;

    target.textContent = '';

    for (let i = 0; i <= fullText.length; i++) {
      target.textContent = fullText.substring(0, i);
      await new Promise(resolve => setTimeout(resolve, typingSpeed));
    }

    target.classList.add('done');
    await new Promise(resolve => setTimeout(resolve, pauseBetweenWords));
  }
}

/**
 * SVG Journey path animation.
 * Draws the path line and reveals markers when the section enters the viewport.
 */
function initJourneyAnimation() {
  const path = document.getElementById('journey-path');
  const markers = document.querySelectorAll('.marker');
  const section = document.getElementById('journey-section');

  if (!path || !section) return;

  const length = path.getTotalLength();
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        path.style.strokeDashoffset = '0';

        const markerTimings = [200, 1000, 2000, 2800];
        markers.forEach((marker, index) => {
          setTimeout(() => {
            marker.classList.add('active');
          }, markerTimings[index]);
        });

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(section);
}

/**
 * Scroll reveal animations.
 * Adds the `active` class to `.reveal` elements when they enter the viewport.
 */
function initScrollReveals() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/**
 * Initialize all scripts on DOM ready.
 */
window.addEventListener('DOMContentLoaded', () => {
  typeEffect();
  initJourneyAnimation();
  initScrollReveals();
});
