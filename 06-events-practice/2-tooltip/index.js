class Tooltip {
    static tooltip = null;
    constructor () {
        if(!Tooltip.tooltip) {
            Tooltip.tooltip = this
        } else {
            return Tooltip.tooltip
        }
    }   

    initialize () {      
        this.createEventListeners()
    }

    render (text) {
        const element = document.createElement('div');
        element.innerHTML = text;
        element.classList.add('tooltip')
        this.element = element;
        document.body.append(this.element)
    }

    pointerMove = (e) => {
        const tooltipHtml = e.target.dataset.tooltip;
        if (!tooltipHtml) return;

        this.render(tooltipHtml)

        e.target.addEventListener('pointermove', (e)=> {
            const left = e.clientX
            const top = e.clientY
            const shiftCursor = 20

            this.element.style.left = shiftCursor + left + 'px';
            this.element.style.top = shiftCursor + top + 'px';
        })
    }


    createEventListeners () {
        document.addEventListener('pointerover', this.pointerMove)
        document.addEventListener('pointerout', this.remove)
    }
    
    destroyEventListeners () {
        document.removeEventListener('pointerover', this.pointerMove)
        document.removeEventListener('pointerout', this.remove)
    }

    remove = () => {
        if(this.element) {
            this.element.remove();
        }
    }
      
    destroy() { 
        this.remove()
        this.destroyEventListeners()
    }
}

export default Tooltip;
