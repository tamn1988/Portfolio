class Modal {
    constructor() {
        this.modal = document.querySelector('.modal');
        this.modalInner = document.querySelector('.modal__inner');
        this.modalTrigger = document.querySelectorAll('.my-work__thumbnail__button');
        this.modalCloseButton = document.querySelector('.modal__close');
        this.body = document.querySelector('body');
        this.events = this.events.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.events();
    }

    events() {
        for (let i = 0; i < this.modalTrigger.length; i++) {
            this.modalTrigger[i].addEventListener('click', this.openModal);
        }
        this.modal.addEventListener('click', ((event) => {
            if (event.target === this.modal){
                this.closeModal();
            }
        }));

        this.modalCloseButton.addEventListener('click', this.closeModal);
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
