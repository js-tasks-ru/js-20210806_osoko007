import RangePicker from './components/range-picker/src/index.js';
import SortableTable from './components/sortable-table/src/index.js';
import ColumnChart from './components/column-chart/src/index.js';
import header from './bestsellers-header.js';

import fetchJson from './utils/fetch-json.js';

const BACKEND_URL = 'https://course-js.javascript.ru/';

export default class Page {
    element;
    subElements = {};
    components = {};

    render () {
        const element = document.createElement('div')
        element.innerHTML = this.template;

        this.element = element.firstElementChild;
        this.subElements = this.getSubElements(element);

        this.initComponents();
        this.renderComponents();
        this.initEventListeners();

        return this.element
    }

    initComponents () {
        const now = new Date();
        const to = new Date();
        const from = new Date(now.setMonth(now.getMonth()-1));

        const rangePicker = new RangePicker({from, to})        

        const ordersChart = new ColumnChart({
            label : 'orders',
            link : "#",
            range : {
                from,
                to,
            },
            url : 'api/dashboard/orders',
        })

        const salesChart = new ColumnChart({
            label : 'sales',
            link : "#",
            range : {
                from,
                to,
            },
            url : 'api/dashboard/sales',
        })

        const customersChart = new ColumnChart({
            label : 'customers',
            link : "#",
            range : {
                from,
                to,
            },
            url : 'api/dashboard/customers',
        })

        const sortableTable = new SortableTable(header, {
            url : `api/dashboard/bestsellers?from=${from.toISOString()}&to=${to.toISOString()}&_sort=title&_order=asc&_start=0&_end=30`,
            isSortLocally : true,
        })

        this.components = {
            rangePicker,
            ordersChart,
            salesChart,
            customersChart,
            sortableTable,
        }
    }

    renderComponents () {
        Object.keys(this.components).forEach(component => {
            const root = this.subElements[component];
            const {element} = this.components[component];
            root.append(element)
        })
    }

    initEventListeners () {
        this.components.rangePicker.element.addEventListener('date-select', (event) => {
            const {from, to} = event.detail;

            this.updateComponents(from, to)
        })
    }

    updateComponents = async (from,to) => {
        const data = await fetchJson(`${BACKEND_URL}api/dashboard/bestsellers?from=${from.toISOString()}&to=${to.toISOString()}&_sort=title&_order=asc&_start=0&_end=30`);

        this.components.sortableTable.update(data);
        this.components.ordersChart.update(from,to);
        this.components.salesChart.update(from,to);
        this.components.customersChart.update(from,to);
    }

    getSubElements(element) {
        const subElements = {};
        const elements = element.querySelectorAll('[data-element]');
    
        for (const item of elements) {
          subElements[item.dataset.element] = item;
        }
    
        return subElements;
    }

    get template () {
        return `
            <div class="dashboard">
                <div class="content__top-panel">
                    <h2 class="page-title">Панель управления</h2>
                    <div data-element="rangePicker"></div>
                </div>
                <div data-element="chartsRoot" class="dashboard__charts">
                    <div data-element="ordersChart" class="dashboard__chart_orders"></div>
                    <div data-element="salesChart" class="dashboard__chart_sales"></div>
                    <div data-element="customersChart" class="dashboard__chart_customers"></div>
                </div>
                <h3 class="block-title">Лидеры продаж</h3>
                <div data-element="sortableTable"></div>
            </div>
        `
    }

    remove () {
        this.element.remove();
    }
    
    destroy() {
        this.remove();
        
        for (const component of Object.values(this.components)) {
            component.destroy()
        }
    }
}
