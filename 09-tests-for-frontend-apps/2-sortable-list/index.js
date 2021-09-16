export default class SortableList {
    element;

    onPointerMove = ({ clientX, clientY }) => {
        this.moveDraggingAt(clientX, clientY);

        const prevElem = this.placeholderElement.previousElementSibling;
        const nextElem = this.placeholderElement.nextElementSibling;

        const { firstElementChild, lastElementChild } = this.element;
        const { top: firstElementTop } = firstElementChild.getBoundingClientRect();
        const { bottom } = this.element.getBoundingClientRect();

        if (clientY < firstElementTop) {
            return firstElementChild.before(this.placeholderElement);
        }

        if (clientY > bottom) {
            return lastElementChild.after(this.placeholderElement);
        }

        if (prevElem) {
            const { top, height } = prevElem.getBoundingClientRect();
            const middlePrevElem = top + height / 2;

            if (clientY < middlePrevElem) {
            return prevElem.before(this.placeholderElement);
            }
        }

        if (nextElem) {
            const { top, height } = nextElem.getBoundingClientRect();
            const middleNextElem = top + height / 2;

            if (clientY > middleNextElem) {
                return nextElem.after(this.placeholderElement);
            }
        }

        this.scrollIfCloseToWindowEdge(clientY);
    };
    
    onPointerUp = () => {
        this.dragStop();
    };

    constructor ({items}={}) {
        this.items = items
        this.render()
    }
    
    render () {
        const element = this.getTemplate()

        this.element = element;
        this.initEventListeners()
    }

    initEventListeners = () => {
        this.element.addEventListener('pointerdown', event => {
            this.onPointerDown(event);
        });
    }

    onPointerDown = (event) => {
        const elem = event.target.closest('.sortable-list__item')

        if(elem) {
            if(event.target.closest('[data-grab-handle]')) {
                event.preventDefault()

                this.dragStart(elem, event)
            }

            if(event.target.closest('[data-delete-handle]')) {
                event.preventDefault()

                elem.remove()
            }
        }
    }

    dragStart = (element, {clientX, clientY}) => {
        this.draggingElem = element;
        this.initialIndex = [...this.element.children].indexOf(element);

        const {x,y} = element.getBoundingClientRect();
        const { offsetWidth, offsetHeight } = element;
    
        this.pointerShift = {
            x : clientX - x,
            y : clientY - y,
        };

        this.draggingElem.style.width = `${offsetWidth}px`;
        this.draggingElem.style.height = `${offsetHeight}px`;
        this.draggingElem.classList.add('sortable-list__item_dragging');

        this.placeholderElement = this.createPlaceholderElement(offsetWidth, offsetHeight);
        this.draggingElem.after(this.placeholderElement);
        this.element.append(this.draggingElem);

        this.moveDraggingAt(clientX, clientY);
        this.addDocumentEventListeners();
    }

    moveDraggingAt(clientX, clientY) {
        this.draggingElem.style.left = `${clientX - this.pointerShift.x}px`;
        this.draggingElem.style.top = `${clientY - this.pointerShift.y}px`;
    };

    scrollIfCloseToWindowEdge(clientY) {
        const scrollingValue = 10;
        const threshold = 20;
    
        if (clientY < threshold) {
          window.scrollBy(0, -scrollingValue);
        } else if (clientY > document.documentElement.clientHeight - threshold) {
          window.scrollBy(0, scrollingValue);
        }
    }
    
    dragStop() {
        const placeholderIndex = [...this.element.children].indexOf(this.placeholderElement);
    
        this.draggingElem.style.cssText = '';
        this.draggingElem.classList.remove('sortable-list__item_dragging');
        this.placeholderElement.replaceWith(this.draggingElem);
        this.draggingElem = null;
    
        this.removeDocumentEventListeners();
    
        if (placeholderIndex !== this.initialIndex) {
          this.dispatchEvent('sortable-list-reorder', {
            from: this.initialIndex,
            to: placeholderIndex
          });
        }
    }

    addDocumentEventListeners () {
        document.addEventListener('pointermove', this.onPointerMove);
        document.addEventListener('pointerup', this.onPointerUp);
    };

    removeDocumentEventListeners () {
        document.removeEventListener('pointermove', this.onPointerMove);
        document.removeEventListener('pointerup', this.onPointerUp);
    }

    createPlaceholderElement (width, height) {
        const element = document.createElement('li');
    
        element.className = 'sortable-list__placeholder';
        element.style.width = `${width}px`;
        element.style.height = `${height}px`;
    
        return element;
    }

    getTemplate () {
        const wrap = document.createElement('ul')
        wrap.classList.add('sortable-list')

        this.items.map((item)=> {
            item.classList.add('sortable-list__item')
        })

        wrap.append(...this.items)   

        return wrap
    }


    remove () {
        if(this.element) {
            this.element.remove();
        }
    }
    
    destroy () {
        this.remove();
        this.removeDocumentEventListeners();
        this.element = null;
    } 
}
