import html from './message.html';
import './message.css';
import { TweenMax, TimelineMax, Linear, Back } from 'gsap/all'

let elements = [];
let body;

export function show(text) {
    // convert plain HTML string into DOM elements
    let temporary = document.createElement('div');
    temporary.innerHTML = html;
    // temporary.getElementsByClassName('js-widget-dialog')[0].textContent = text;

    const closeButton = temporary.querySelector("#close");
    const overlay = temporary.querySelector("#overlay");
    const modal = temporary.querySelector("#modal");

    // append elements to body
    body = document.getElementsByTagName('body')[0];
    while (temporary.children.length > 0) {
        elements.push(temporary.children[0]);
        body.appendChild(temporary.children[0]);
    }

    transitionIn(overlay, modal);

    overlay.addEventListener("click", () => transitionOut(overlay, modal));
    closeButton.addEventListener("click", () => transitionOut(overlay, modal));
    // body.addEventListener('click', close);
}

export function close() {
    while (elements.length > 0) {
        elements.pop().remove();
    }
    // body.removeEventListener('click', close);
}

export function transitionIn(overlay, modal) {
    TweenMax.fromTo(
        overlay, 0.75,
        { opacity: 0},
        { opacity: 1, ease: Linear.easeNone, delay: 0.5}
    );
    TweenMax.fromTo(
        modal, 0.75,
        { y: (0 - body.clientHeight)},
        { y: 0, ease: Back.easeOut.config(0.1), delay: 0.5}
    );
}

export function transitionOut(overlay, modal)  {
    TweenMax.to(overlay, 0.4, {opacity: 0, ease: Linear.easeNone, delay: 0.3,
        onComplete: () => { overlay.style.display = "none"; }});
    TweenMax.to(modal, 0.4, {scale: 0.65, ease: Back.easeIn.config(0.75), 
        onComplete: () => { 
            modal.style.display = "none"; 
            close();
    }});
}