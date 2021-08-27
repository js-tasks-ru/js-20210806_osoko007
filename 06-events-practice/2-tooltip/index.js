class Tooltip {
    static tooltip = null;
    constructor () {
        if(!Tooltip.tooltip) {
            Tooltip.tooltip = this
        } else {
            return Tooltip.tooltip
        }
        this.pointerMove = this.pointerMove.bind(this)
        this.remove = this.remove.bind(this)
    }   

    initialize () {      
        const element = document.createElement('div');
        element.className = 'tooltip';
        this.element = element;
        this.createEventListeners()
    }

    pointerMove (e) {
        const tooltipHtml = e.target.dataset.tooltip;
        if (!tooltipHtml) return;

        e.target.addEventListener('pointermove', (e)=> {
            this.element.innerHTML = e.target.dataset.tooltip
            document.body.append(this.element);

            const left = e.clientX
            const top = e.clientY

            this.element.style.left = left + 'px';
            this.element.style.top = top + 'px';
        })
    }


    createEventListeners () {
        document.addEventListener('pointerover', this.pointerMove, {bubbles: true})
        document.addEventListener('pointerout', this.remove)
    }
    
    destroyEventListeners () {
        document.removeEventListener('pointerover', this.pointerMove)
        document.removeEventListener('pointerout', this.remove)
    }

    remove () {
        if(this.element) {
            this.element.remove();
        }
    }
      
    destroy() { 
        this.remove()
    }
}

export default Tooltip;
