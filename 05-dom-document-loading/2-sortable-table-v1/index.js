export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = Array.isArray(data) ? data : data.data;
    this.render();
  }

  render() { 
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
  }

  get template() {
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

  getHeader() {
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

  getBody(data) { 
    return data.map((item)=> {
      return `
          <a href="#" class="sortable-table__row">
            <div class="sortable-table__cell">
              <img class="sortable-table-image" alt="Image" src="${item.images ? item.images[0].url : "#"}">
            </div>
            <div class="sortable-table__cell">${item.title}</div>

            <div class="sortable-table__cell">${item.quantity}</div>
            <div class="sortable-table__cell">${item.price}</div>
            <div class="sortable-table__cell">${item.sales}</div>
          </a>
      `
    }).join('')
  }

  sort(field, param = "asc") {
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
    this.getSubElements(sortData)
  }


  
  
  getSubElements(data) {
    const body = this.element.querySelector('.sortable-table__body')
    this.subElements = {
      body : body
    }

    
    this.subElements.body.innerHTML = this.getBody(data)
    console.log(this.subElements.body.firstElementChild.children[1].textContent)
    console.log(this.subElements.body.lastElementChild.children[1].textContent)
  }

  remove() {
    if(this.element) {
      this.element.remove();
    }
  }
  
  destroy() { 
    this.remove()
  }

}

