export default class SortableTable {
  constructor(headerConfig, {
    data = [],
    sorted = {}
  } = {}) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.sorted = sorted;
    this.render();
    this.loadingSort();
  }

  render() { 
    const element = document.createElement('div');
    element.innerHTML = this.getTemplate()
    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(this.element);
  }

  loadingSort () {
    const { id, order } = this.sorted;
    this.sort(id, order)
  }


  getTemplate () {
      return `
        <div class="sortable-table">
          <div class="sortable-table__header sortable-table__row" data-element="header">
            ${this.getHeader()}
          </div>
          <div class="sortable-table__body" data-element="body">
            ${this.getBody(this.data)}
          </div>
        </div>
      `
  }

  getHeader () {
    return this.headerConfig.map((item)=> {
      return `
        <div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}" data-order>
          <span>
            ${item.title}
          </span>
          <span data-element="arrow" class="sortable-table__sort-arrow">
            <span class="sort-arrow"></span>
          </span>
        </div>
      `
    }).join('')
  }

  getTableRow (item) {
    const cells = this.headerConfig.map(({id, template})=> {
      return {
        id,
        template
      };
    });

    return cells.map(({id, template})=> {
      return template
        ? template(item[id])
        : `<div class="sortable-table__cell">${item[id]}</div>`
    }).join('');
  }

  getBody (data) { 
    return data.map((item)=> {
      return `
          <a href="#" class="sortable-table__row">
            ${this.getTableRow(item)}
          </a>
      `
    }).join('')
  }

  sort (field, param = "asc") {
    const sortData = this.data.slice();
   
    function sortStr(a, b) {
      return a.localeCompare(b, ["ang-u-kf-upper", "ru-u-kf-upper"], {
        sensitivity: "variant",
      });     
    }

    sortData.sort((a, b) => {
      if(typeof a[field] === "string") {
        if (param === "asc") {
          return sortStr(a[field], b[field]);
        }
        return sortStr(b[field], a[field]);
      } else if(typeof a[field] === "number")
        if (param === "asc") {
          return a[field] - b[field]
        }
        return b[field] - a[field]
    });

    this.subElements.body.innerHTML = this.getBody(sortData)
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

  remove () {
    if(this.element) {
      this.element.remove();
    }
  }
  
  destroy () { 
    this.remove()
  }
}
