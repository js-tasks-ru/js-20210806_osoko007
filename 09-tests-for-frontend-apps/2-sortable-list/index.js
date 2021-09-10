export default class SortableList {
    element;

    constructor (elementList) {
        this.elementList = elementList.items
        this.render()
    }
    
    render () {
        const element = this.getTemplate(this.elementList)

        this.element = element;
        this.initEventListeners()
    }

    initEventListeners = () => { 
        for ( const li of this.element.childNodes) {
            li.addEventListener('pointerdown',(event)=>{
                this.placeholderElement = li;
                this.placeholder = this.placeholderElement.cloneNode()
                this.placeholder.classList.add('sortable-list__placeholder')

                let shiftY = event.clientY - li.getBoundingClientRect().top;

                
                this.prevElem = this.placeholderElement.previousElementSibling;
                
                li.style.position = 'absolute';
               
                li.style.zIndex = 1000;

                moveAt(event.pageX, event.pageY);

                function moveAt(pageY) {
                    li.style.top = pageY - shiftY + 'px';
                }

                const onMouseMove = (event) => {
                    moveAt(event.pageX, event.pageY);
                    this.prevElem = this.placeholderElement.previousElementSibling;
                    this.nextElem = this.placeholderElement.nextElementSibling;

                    if(this.prevElem && this.placeholderElement.getBoundingClientRect().top < this.prevElem.getBoundingClientRect().bottom) {
                        this.prevElem.before(this.placeholder) 
                        this.prevElem.before(this.placeholderElement)
                    } 

                    if(this.nextElem && this.placeholderElement.getBoundingClientRect().top > this.nextElem.getBoundingClientRect().top) {
                        this.nextElem.after(this.placeholder)
                        this.nextElem.after(this.placeholderElement)
                    } 
                }

                this.element.addEventListener('pointermove', onMouseMove);

                this.element.addEventListener('pointerup', (event) =>{
                    this.placeholderElement.style.position = "static"
                    this.placeholder.remove()
                    this.element.removeEventListener('pointermove', onMouseMove);
                    li.onmouseup = null;
                });
            })
            li.ondragstart = function() {
                return false;
            };
        }
        
    }

    getTemplate (elementList) {
        const wrap = document.createElement('ul')
        wrap.classList.add('sortable-list')

        elementList.map((item)=> {
            item.classList.add('sortable-list__item')
            wrap.append(item)
        })

        return wrap    
    }


    remove () {
        if(this.element) {
            this.element.remove();
        }
    }
    
    destroy () { 
        this.remove();
    }  
}
