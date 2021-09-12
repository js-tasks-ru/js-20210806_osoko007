import fetchJson from '../../../utils/fetch-json.js';
import Tooltip from '../../../../../06-events-practice/2-tooltip/index.js';

const BACKEND_URL = "https://course-js.javascript.ru";

export default class ColumnChart {
  element;
  subElements = {};

  constructor({
    data = [],
    url = "",
    range = {
      from: new Date(),
      to: new Date(),
    },
    label = "",
    link = "",
    value = 0,
    formatHeading = (data) => data,
  } = {}) {
    this.data = data;
    this.url = url;
    this.range = range;
    this.label = label;
    this.link = link;
    this.value = value;
    this.formatHeading = formatHeading;
    this.chartHeight = 50;
    this.render();
  }

  render = async () => {
    const element = document.createElement("div");
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(element);
    if (Object.keys(this.data).length > 0) {
      this.element.classList.remove("column-chart_loading");
    }
    await this.update(this.range.from,this.range.to)
    this.initEventListeners();
  }

  get template() {
    return `
        <div class="column-chart column-chart_loading" style="--chart-height:${
          this.chartHeight
        }">
        <div class="column-chart__title">
            Total ${this.label}
            ${this.getLink()}
        </div>
        <div class="column-chart__container">
            <div data-element="header" class="column-chart__header">
                ${this.formatHeading(this.value)}
            </div>
            <div data-element="body" class="column-chart__chart">
                ${this.getChartColumn(this.data)}
            </div>
        </div>
        </div>
    `;
  }

  getLink() {
    return this.link
      ? `<a class="column-chart__link" href="${this.link}">Viev all</a>`
      : "";
  }

  getChartColumn(data) {  
    const newArray = data.map(item=>item[1]);
    const remakeDataForChart = data
    ? data.map((item, index, array) => {
        const [date, value] = item;
        const maxValue = Math.max(...newArray);
        const scale = 50 / maxValue;
        return {
          value: Math.floor(value * scale),
          // percent: ((value / maxValue) * 100).toFixed(0) + "%",
          date: date
        };
      })
    : [];
    return remakeDataForChart
      .map(
        (item) =>
          `<div style="--value:${item.value}" data-tooltip="<div><small>${item.date}</small></div><strong>${this.formatHeading(item.value)}</strong>"></div>`
      )
      .join("");
  }

  formatHeading(value) {
    return this.formatHeading(value);
  }

  update = async (from, to) => {
    this.element.classList.add('column-chart_loading')
    const newData = await this.loadData(from,to)

    if(newData && Object.values(newData).length) {
      this.data = Object.entries(newData);
      this.value = Object.values(newData).reduce((prev,curr)=> prev + curr)
  
      this.subElements.header.innerHTML = this.formatHeading(this.value)
      this.subElements.body.innerHTML = this.getChartColumn(this.data)

      this.element.classList.remove("column-chart_loading");
    }
    return newData
  }

  loadData = async (from, to) => {
    let url = new URL(this.url, BACKEND_URL);
    url.searchParams.set('from', from);
    url.searchParams.set('to', to);
    const newDate = await fetchJson(url)

    return newDate
  }

  getSubElements (element) {
    const result = {}
    const elements = element.querySelectorAll('[data-element]')
    
    for (const subElement of elements) {
      const name = subElement.dataset.element;
      result[name] = subElement;
    }

    const btn = document.getElementById('loadOrders');
    result['btn'] = btn;

    return result;
  }

  initEventListeners = () => {
    const tooltip = new Tooltip();
    tooltip.initialize();
  }

  loadNewData = () => {
    this.update(this.range.from, this.range.to)
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
