export default class RangePicker {
    subElements = {};

    constructor({
        from = new Date(),
        to = new Date()
      } = {}) {
        this.from = from;
        this.to = to
    
        this.render();
      }
    
    render () {
        const wrapper  = document.createElement('div');
        wrapper.innerHTML = this.getTemplate();
        const element = wrapper;

        this.element = element;
        this.subElements = this.getSubElements(element);

        this.initEventListeners();
    }

    initEventListeners = () => { 
        this.subElements.input.addEventListener('pointerdown', this.openRangePicker);
        // window.addEventListener('scroll', this.onScrollLoad);
    }

    getTemplate () {
        return `
            <div class="rangepicker rangepicker_open">
                ${this.getRangePickerInput()}
                ${this.getRangePickerSkeletor()}
            </div>
            `
    }

    getRangePickerInput () {
        return `
            <div class="rangepicker__input" data-element="input">
                <span data-element="from">${this.getFormatDate(this.from)}</span> -
                <span data-element="to">${this.getFormatDate(this.to)}</span>
            </div>
        `
    }

    getRangePickerSkeletor () {
        return `
            <div class="rangepicker__selector" data-element="selector">
                <div class="rangepicker__selector-arrow"></div>
                <div class="rangepicker__selector-control-left"></div>
                <div class="rangepicker__selector-control-right"></div>
                ${this.getPrevMounthCalendar()}
                ${this.getNextMounthCalendar()}
            </div>
        `
    }

    getPrevMounthCalendar (date) {
        return `
            <div class="rangepicker__calendar">
                <div class="rangepicker__month-indicator">
                    <time datetime="November">November</time>
                </div>
                <div class="rangepicker__day-of-week">
                    <div>Пн</div>
                    <div>Вт</div>
                    <div>Ср</div>
                    <div>Чт</div>
                    <div>Пт</div>
                    <div>Сб</div>
                    <div>Вс</div>
                </div>
                <div class="rangepicker__date-grid">
                    ${this.getMounthDays(9,2021)}
                </div>
            </div>
        `
    }

    getNextMounthCalendar (date) {
        return `
            <div class="rangepicker__calendar">
                <div class="rangepicker__month-indicator">
                    <time datetime="December">December</time>
                </div>
                <div class="rangepicker__day-of-week">
                    <div>Пн</div>
                    <div>Вт</div>
                    <div>Ср</div>
                    <div>Чт</div>
                    <div>Пт</div>
                    <div>Сб</div>
                    <div>Вс</div>
                </div>
                <div class="rangepicker__date-grid">
                    ${this.getMounthDays(10,2021)}
                </div>
            </div>
        `
    }

    getMounthDays (month, year) {
        function getDaysInMonth(month, year) {
        const date = new Date(Date.UTC(year, month, 1));
        let days = [];
        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
            return days;
        }
        const data = getDaysInMonth(month, year)   
        const firstDay = new Date(data[0]).getDay()

        return data.map((item, index)=> {
            return `
                <button type="button" class="rangepicker__cell rangepicker__selected-between" data-value="${item}" ${index === 0 ? `style="--start-from: ${firstDay}` : null}">
                    ${item.getDate()}
                </button>
            `
          }).join('')     
    }

    getFormatDate (date) {
        return date.toLocaleDateString('pl', {day: 'numeric', month: 'numeric', year: '2-digit'}).toString()
    }

    getSubElements (element) {
        const result = {}
        const elements = element.querySelectorAll('[data-element]')
        
        for (const subElement of elements) {
          const name = subElement.dataset.element;
    
          result[name] = subElement;
        }
        return result;
    }

    openRangePicker = (e) => {
        this.subElements.selector.classList.toggle('rangepicker_open')
    }

    remove () {
        if(this.element) {
            this.element.remove();
        }
    }
    
    destroy () { 
        this.remove();
        this.subElements = {};
    }  
}
