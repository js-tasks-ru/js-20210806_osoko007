class Tooltip {
    constructor () {
        this.linkTooltip = this.linkTooltip.bind(this)
    }
    static tooltip;

    initialize () {       
        Tooltip.tooltip = this;
        const element = document.createElement('div');
        element.className = 'tooltip';
        this.element = element;
        this.createEventListeners()
    }

    linkTooltip (e) {
        if(Tooltip.tooltip) {
            Tooltip.tooltip.remove()
        }
        let tooltipHtml = e.target.dataset.tooltip;
        if (!tooltipHtml) return;

        this.element.innerHTML = tooltipHtml
        document.body.append(this.element);

        let left = e.clientX
        let top = e.clientY

        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px';
    }

    createEventListeners () {
        document.addEventListener('pointerover', this.linkTooltip)
        document.addEventListener('pointerout', this.remove)
    }
    
    destroyEventListeners () {
        document.removeEventListener('pointerover', this.linkTooltip)
        document.removeEventListener('pointerout', this.remove)
    }

    remove () {
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
