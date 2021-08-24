export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.render();
  }

  render() { 
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
    this.getSubElements();
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
              <img class="sortable-table-image" alt="Image" src="${item.images[0].url}">
            </div>
            <div class="sortable-table__cell">${item.title}</div>

            <div class="sortable-table__cell">${item.quantity}</div>
            <div class="sortable-table__cell">${item.price}</div>
            <div class="sortable-table__cell">${item.sales}</div>
          </a>
      `
    }).join('')
  }

  sort(arr, param = "asc") {
    // const sortData = this.data.slice();
    console.log(this.data)
    // console.log(sortData)
    
    function sortStr(a, b) {
      return a.localeCompare(b, ["ang-u-kf-upper", "ru-u-kf-upper"], {
        sensitivity: "variant",
      });     
    }
    return this.data.sort((a, b) => {
      if(typeof a[arr] === "string") {
        if (param === "asc") {
          return sortStr(a[arr], b[arr]);
        }
        return sortStr(b[arr], a[arr]);
      } else if(typeof a[arr] === "number")
        if (param === "asc") {
          return a[arr] - b[arr]
        }
        return b[arr] - a[arr]
    });
    // this.destroy()
    // this.render()
  }
  
  getSubElements() {
    console.log(this.element)
    // console.log(this.element.querySelectorAll('sortable-table__cell'))
    console.log(this.data)
    this.element.lastElementChild.innerHTML = this.getBody(this.data)
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

