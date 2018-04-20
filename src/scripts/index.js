import 'normalize.css';
import '../styles/styles.css';
import lozad from 'lozad';
import AnimateOnScroll from '../scripts/modules/AnimateOnScroll.js';
import Highlight from '../scripts/modules/HighlightSections.js';
import Stickyfill from 'stickyfilljs';
import zenscroll from 'zenscroll';
import Modal from '../scripts/modules/Modal.js';
import IntersectionObserver from 'intersection-observer';

const observer = lozad();
observer.observe();

new AnimateOnScroll.SingleElement(document.querySelectorAll('.generic-title'), '80%', 'animations--opacity--hide', 'animations__generic-title--slidein');
new AnimateOnScroll.SingleElement(document.querySelectorAll('.generic-title__hr'), '85%', 'animations--opacity--hide', 'animations__generic-hr--slidein');

new AnimateOnScroll.SingleElement(document.querySelectorAll('.about__me'), '80%', 'animations--translate-right--hide', "animations__about-me--slidein-right");

new AnimateOnScroll.SingleElement(document.querySelectorAll('.skills-bar__container'), '80%', 'animations--translate-left--hide', 'animations__skills-bar--slidein');
new AnimateOnScroll.MultipleElements(document.querySelectorAll('.skills-bar--fill'), '80%', 'animations--width--hide', 'animations__skills-bar--fill');


new AnimateOnScroll.SingleElement(document.querySelectorAll('.about-item'), '85%', 'animations--ease-out', 'animations--ease-out--is-visible');

new AnimateOnScroll.DelayAnimate(document.querySelectorAll(".my-work__thumbnail"), '65%', 'animations--opacity--hide', 'animations--delay-stack');

new Highlight("10%", '.primary-nav li', 'data-matching-li', 'primary-nav--li-is-highlighted');
new Highlight("10%", '.primary-nav a', 'data-matching-a', 'primary-nav--a-is-highlighted');


new Modal();


var stickyElements = document.querySelectorAll('.sticky');
Stickyfill.add(stickyElements);
