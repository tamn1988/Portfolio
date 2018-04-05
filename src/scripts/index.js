import 'normalize.css';
import '../styles/styles.css';
import '../scripts/modules/AnimateOnScroll.js'
import AnimateOnScroll from '../scripts/modules/AnimateOnScroll.js';
import Highlight from '../scripts/modules/HighlightSections.js';
import Stickyfill from 'stickyfilljs';
import zenscroll from 'zenscroll';

new AnimateOnScroll.SingleElement(document.querySelectorAll('.generic-title'), '80%', 'animations--opacity--hide', 'animations__generic-title--slidein');
new AnimateOnScroll.SingleElement(document.querySelectorAll('.generic-title__hr'), '85%', 'animations--opacity--hide', 'animations__generic-hr--slidein');

new AnimateOnScroll.SingleElement(document.querySelectorAll('.skills-bar__container'), '80%', 'animations--margin-left--hide', 'animations__skills-bar--slidein');
new AnimateOnScroll.MultipleElements(document.querySelectorAll('.skills-bar--fill'), '80%', 'animations--width--hide', 'animations__skills-bar--fill');


new AnimateOnScroll.SingleElement(document.querySelectorAll('.about-item'), '85%', 'animations--ease-out', 'animations--ease-out--is-visible');

new AnimateOnScroll.SingleElement(document.querySelectorAll('.about__me'), '80%', 'animations--margin-right--hide', "animations__about-me--slidein-right");

new Highlight("10%", '.primary-nav li', 'data-matching-li', 'primary-nav--li-is-highlighted');
new Highlight("10%", '.primary-nav a', 'data-matching-a', 'primary-nav--a-is-highlighted');

var stickyElements = document.querySelectorAll('.sticky');
Stickyfill.add(stickyElements);

window.addEventListener('scroll', function(){
    let el = document.querySelector('#my-work');
    let b = document.querySelectorAll('.my-work__thumbnail');
    if (window.scrollY > (el.offsetTop-350)){
        for (let i = 0; i < b.length; i++){
            setTimeout(function(){
                b[i].classList.add('animations--delay-stack')
            }, i*200)
        }
    }
})
