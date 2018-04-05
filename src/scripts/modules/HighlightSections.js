import waypoints from '../../../node_modules/waypoints/lib/noframework.waypoints.min';


class Highlight {
    constructor(offset, elementToHighlight, attributeSelector, classToAdd) {
        this.offset = offset;
        this.classToAdd = classToAdd;
        this.elementToHighlight = document.querySelectorAll(elementToHighlight);
        this.attributeSelector = attributeSelector;
        this.pageSection = document.querySelectorAll('.page-section');
        this.landingSection = document.querySelector('.large-hero')
        this.addHighlights = this.addHighlights.bind(this);
        this.addHighlightsLanding = this.addHighlightsLanding.bind(this);
        this.addHighlightsLanding();
        this.addHighlights();

    }

    removeHighlight() {
        for (let i = 0; i < this.elementToHighlight.length; i++) {
            this.elementToHighlight[i].classList.remove(this.classToAdd);
        }
    }

    addHighlightsLanding(){
        let currentItem = this.landingSection;
        let matchingLink = this.landingSection.getAttribute(this.attributeSelector);

        new Waypoint({
            element: currentItem,
            handler: ((direction) => {
                if (direction === "down") {
                    this.removeHighlight();
                    document.getElementById(matchingLink).classList.add(this.classToAdd);
                }
            }),
            offset: this.offset
        })

        new Waypoint({
            element: currentItem,
            handler: ((direction) => {
                if (direction = 'up') {
                    this.removeHighlight();
                    document.getElementById(matchingLink).classList.add(this.classToAdd);
                }
            }),
            offset: '-40%'
        })
    }

    addHighlights() {
        for (let i = 0; i < this.pageSection.length; i++) {
            let currentItem = this.pageSection[i];
            let matchingLink = this.pageSection[i].getAttribute(this.attributeSelector);


            new Waypoint({
                element: currentItem,
                handler: ((direction) => {
                    if (direction === "down") {
                        this.removeHighlight();
                        document.getElementById(matchingLink).classList.add(this.classToAdd);
                    }
                }),
                offset: this.offset
            })

            new Waypoint({
                element: currentItem,
                handler: ((direction) => {
                    if (direction = "up") {
                        this.removeHighlight();
                        document.getElementById(matchingLink).classList.add(this.classToAdd);
                    }
                }), 
                offset: '-40%'
            })
        }
    }
}


export default Highlight;




// 1.Create waypoints for each page-section
// 2. When top of waypoint reaches top of viewport we change navigation bar to add class