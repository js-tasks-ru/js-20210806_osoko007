import fetchJson from './utils/fetch-json.js';

const BACKEND_URL = 'https://course-js.javascript.ru';

export default class SortableTable {
  element;
  subElements = {};

  onSortClick = event => {
    const column = event.target.closest('[data-sortable="true"]');

    const toggleOrder = order => {
      const orders = {
        asc: 'desc',
        desc: 'asc'
      };

      return orders[order];
    };

    if (column) {
      const { id, order } = column.dataset;
      const newOrder = toggleOrder(order);
      const sortedData = this.isSortLocally ? this.sortOnClient(id, newOrder) : this.sortOnServer(id, newOrder);

      const arrow = column.querySelector('.sortable-table__sort-arrow');

      column.dataset.order = newOrder;

      if (!arrow) {
        column.append(this.subElements.arrow);
      }

      sortedData
        .then((data)=>this.subElements.body.innerHTML = this.getBody(data));
    }
  };


  constructor(headerConfig, {
    data = [],
    url = '',
    isSortLocally = false,
    sorted = {
      id: headerConfig.find(item => item.sortable).id,
      order: 'asc'
    }
  } = {}) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.url = url;
    this.isSortLocally = isSortLocally;
    this.sorted = sorted;

    this.loadData()
    this.render();
  }

  async render () { 
    // const { id, order } = this.sorted;
    const wrapper  = document.createElement('div');
    // const sortedData = this.sortOnClient(id, order)
    wrapper.innerHTML = this.getTemplate(this.data)
    const element = wrapper.firstElementChild;

    this.element = element;
    this.subElements = this.getSubElements(element);

    this.initEventListeners();
  }

  initEventListeners = () => {
    this.subElements.header.addEventListener('pointerdown', this.onSortClick);
  }

  getTemplate (data) {
      return `
        <div class="sortable-table">
          <div class="sortable-table__header sortable-table__row" data-element="header">
            ${this.headerConfig.map(item => this.getHeaderRow(item)).join('')}
          </div>
          <div class="sortable-table__body" data-element="body">
            ${this.getBody(data)}
          </div>
        </div>
      `
  }

  getHeaderRow ({id, title, sortable}) {
    const order = this.sorted.id === id ? this.sorted.order : 'asc';
    return `
      <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-order="${order}">
        <span>
          ${title}
        </span>
        ${this.getHeaderSortingArrow(id)}
      </div>
    `
  }

  getHeaderSortingArrow (id) {
    const isOrderExist = this.sorted.id === id ? this.sorted.order : '';

    return isOrderExist
      ? `<span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>`
      : '';
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

  getBody = (data) => { 
    return data.map((item)=> {
      return `
          <a href="#" class="sortable-table__row">
            ${this.getTableRow(item)}
          </a>
      `
    }).join('')
  }

  async sortOnClient (field, param = "asc") {
    const sortData = this.data.slice()
   
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
    return sortData
  }

  sortOnServer = async (id, order) => {
    let url = new URL(this.url, BACKEND_URL);
    url.searchParams.set('_embed', 'subcategory.category');
    url.searchParams.set('_sort', id);
    url.searchParams.set('_order', order);
    url.searchParams.set('_start', 0);
    url.searchParams.set('_end', 30);
    const newDate = await fetchJson(url)
    this.data = await newDate;
    return this.data
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

  async loadData () {
    const { id, order } = this.sorted;
    await this.sortOnServer(id, order)
    this.subElements.body.innerHTML = this.getBody(this.data)
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
