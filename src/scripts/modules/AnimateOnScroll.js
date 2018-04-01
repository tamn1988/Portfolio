import waypoints from '../../../node_modules/waypoints/lib/noframework.waypoints.min';


// var waypoint = new Waypoint ({
//     element: document.querySelector(".generic-title"),
//     handler: function(){
//         alert("waypoint triggered");
//     },
//     offset: "40%"
// })


class SingleElement{
    constructor (el, offset, classToHide, classToAdd){
        this.elToAnimate = el;
        this.offset = offset;
        this.classToHide = classToHide;
        this.classToAdd = classToAdd;
        this.hideInitially = this.hideInitially.bind(this);
        this.hideInitially();
        this.createWaypoints = this.createWaypoints.bind(this);
        this.createWaypoints();
    }

    hideInitially(){
        for (let i = 0; i < this.elToAnimate.length; i++){
            this.elToAnimate[i].classList.add(this.classToHide);
        }
    }


    createWaypoints(){
        for (let i = 0; i < this.elToAnimate.length; i++){
            let currentItem = this.elToAnimate[i];
            new Waypoint({
                element: currentItem,
                handler: ( ()=> {
                    currentItem.classList.add(this.classToAdd);
                }),
                offset: this.offset
            })
        }
    }
}

class MultipleElements{
    constructor(el, offset, classToHide, classToAdd){
        this.elToAnimate = el;
        this.offset = offset;
        this.classToHide = classToHide;
        this.classToAdd = classToAdd;
        this.hideInitially = this.hideInitially.bind(this);
        this.hideInitially();
        this.createWaypoints = this.createWaypoints.bind(this);
        this.createWaypoints();   
    }

    hideInitially(){
        for (let i = 0; i < this.elToAnimate.length; i++){
            this.elToAnimate[i].classList.add(this.classToHide);
        }
    }

    createWaypoints(){
        new Waypoint({
            element: this.elToAnimate[0],
            handler: ( () => {
                for (let i = 0; i < this.elToAnimate.length; i++){
                    this.elToAnimate[i].classList.add(this.classToAdd);
                }
            }),
            offset: this.offset
        })
    }
}

module.exports = {
    SingleElement,
    MultipleElements
}