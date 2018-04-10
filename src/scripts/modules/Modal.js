class Modal {
    constructor() {
        this.modal = document.querySelector('.modal');
        this.modalTrigger = document.querySelectorAll('.my-work__thumbnail__button');
        this.modalCloseButton = document.querySelector('.modal__close');
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
                this.modal.classList.remove('modal--is-visible');
            }
        }));

        this.modalCloseButton.addEventListener('click', this.closeModal);
    }

    openModal() {
        this.modal.classList.add('modal--is-visible');
    }

    closeModal() {
        this.modal.classList.remove('modal--is-visible');
    }
}

export default Modal;


// class Modal{
// 	constructor(){
// 		this.openModalButton = $('.open-modal');
// 		this.modal = $('.modal');
// 		this.closeModalButton = $('.modal__close');
// 		this.events();
// 	}

// 	events(){
// 		this.openModalButton.click(this.openModal.bind(this));
// 		this.closeModalButton.click(this.closeModal.bind(this));
// 		$(document).keyup(this.keyPressHandler.bind(this));

// 	}

// 	keyPressHandler(e){
// 		if (e.keyCode === 27){
// 			this.closeModal();
// 		}
// 	}

// 	openModal(){
// 		this.modal.addClass('modal--is-visible');
// 		return false;
// 	}

// 	closeModal(){
// 		this.modal.removeClass('modal--is-visible');
// 	}

// }
