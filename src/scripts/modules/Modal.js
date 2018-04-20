class Modal {
    constructor() {
        this.modal = document.querySelector('.modal');
        this.modalInner = document.querySelector('.modal__inner');
        this.modalTrigger = document.querySelectorAll('.my-work__thumbnail__button');
        this.modalCloseButton = document.querySelector('.modal__close');
        this.modalHeader = document.querySelector('.modal__info h3');
        this.modalBody = document.querySelector('.modal__info p');
        this.modalImage = document.querySelector('.modal__image');
        this.modalButton = document.querySelector('.modal__button');
        this.body = document.querySelector('body');
        this.events = this.events.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.events();
    }

    events() {
        for (let i = 0; i < this.modalTrigger.length; i++) {
            this.modalTrigger[i].addEventListener('click', ((e) => {
                this.injectContent(e);
            }));
        }
        this.modal.addEventListener('click', ((event) => {
            if (event.target === this.modal) {
                this.closeModal();
            }
        }));

        this.modalCloseButton.addEventListener('click', this.closeModal);
    }


    injectContent(e) {
        switch (e.srcElement.getAttribute('data-matching-link')) {
            case "pomodoro":
                this.modalHeader.innerHTML = 'Pomodoro Timer';
                this.modalBody.innerHTML = 'A Pomodoro timer created in pure javascript. It includes start, stop, reset, and time interval changing functions'
                this.modalImage.src = '../docs/images/pomodoro-medium.jpg'
                this.modalButton.href = 'https://codepen.io/Tamn1988/full/NwNGpa/';
                this.modalButton.innerHTML = 'View on CodePen';
                break;
            case "travel-site":
                this.modalHeader.innerHTML = 'Travel Site';
                this.modalBody.innerHTML = 'A Mock Travel Agency website created using grunt, postcss, JQuery, ES6 class modules, and BEM naming practices.'
                this.modalImage.src = '../docs/images/travel-site-medium.jpg'
                this.modalButton.href = 'https://tamn1988.github.io/travel-site/';
                this.modalButton.innerHTML = 'View';
                break;
            case "wikipedia":
                this.modalHeader.innerHTML = 'Wikipedia Viewer';
                this.modalBody.innerHTML = 'A Wikipedia Viewer created using JQuery. Search string is parsed and the wikipedia api is called to return the result'
                this.modalImage.src = '../docs/images/wikipedia-medium.jpg'
                this.modalButton.href = 'https://codepen.io/Tamn1988/pen/QdjJqO';
                this.modalButton.innerHTML = 'View on CodePen';
                break;
            case "nail-site":
                this.modalHeader.innerHTML = 'Miro Nails';
                this.modalBody.innerHTML = 'A clone of Miro Nails built with pure javascript, ES6 class modules, flexbox and BEM naming practices. It has minor changes for mobile and large viewports for a better responsive layout'
                this.modalImage.src = '../docs/images/nail-site-medium.jpg'
                this.modalButton.href = 'https://tamn1988.github.io/Nails/';
                this.modalButton.innerHTML = 'View';
                break;
        }
        this.openModal();
    }


    openModal() {
        this.modal.classList.remove('animations--close-modal');
        this.modalInner.classList.remove('animations--close-modal--inner');
        this.modal.classList.add('animations--open-modal');
        this.modalInner.classList.add('animations--open-modal--inner');
        this.body.classList.add('modal--body-prevent-scroll');



    }

    closeModal() {
        this.modal.classList.add('animations--close-modal');
        this.modalInner.classList.add('animations--close-modal--inner');
        this.modal.classList.remove('animations--open-modal');
        this.modalInner.classList.remove('animations--open-modal--inner');
        this.body.classList.remove('modal--body-prevent-scroll');

    }
}

export default Modal;


// 1. data matching link to determine which modal content to inject
// 2. use the same image since it is already cached
// 3. inject header, paragraph, and link.