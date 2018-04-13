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



// const button = document.querySelector('.contact__form__button');
// const form = document.querySelector('.contact__form');

// button.addEventListener('click', (event)=>{
//     event.preventDefault();
//     let XHR = new XMLHttpRequest();
//     let data = new FormData(form);

//     XHR.addEventListener('load', function(event) {
//         alert('Yeah! Data sent and response loaded.');
//       });

//       XHR.addEventListener('error', function(event) {
//         alert('Oops! Something goes wrong.');
//       });

//       XHR.open('POST', 'https://mailthis.to/tamn1988@gmail.com');

//       XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

//       XHR.send(data);
// })


