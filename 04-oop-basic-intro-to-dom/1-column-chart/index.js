export default class ColumnChart {
    constructor({
      data = [],
      label = '',
      link = '',
      value = 0,
      formatHeading = data => data,
    } = {}) {
        this.data = data;
        this.label = label;
        this.link = link;
        this.value = value;
        this.formatHeading = formatHeading;
        this.chartHeight = 50;
        this.render();
        this.initEventListeners();
    }

    render() {
      const element = document.createElement('div');
      element.innerHTML = this.template;
      this.element = element.firstElementChild
      if(Object.keys(this.data).length > 0) {
        this.element.classList.remove('column-chart_loading')
      }
    }

    get template() {
      return `
        <div class="column-chart column-chart_loading" style="--chart-height:${this.chartHeight}">
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
      `
    }

    getLink () {
      return this.link ?
        `<a class="column-chart__link" href="${this.link}">Viev all</a>` : '';
    }

    getChartColumn (data) {
      const remakeDataForChart = data ? data.map( (item, index, array) => {
        const maxValue = Math.max(...this.data);
        const scale = 50 / maxValue;
        return ({
          value : Math.floor(item * scale),
          percent : (item / maxValue * 100).toFixed(0) + '%',
        })
      }) : []
      return remakeDataForChart.map(item => `<div style="--value:${item.value}" data-tooltip="${item.percent}"></div>`).join('')
    }

    formatHeading (value) {
      return this.formatHeading(value)
    }

    update (data) {
      this.data = data
    }
  
    initEventListeners () {

    }
  
    remove () {
      this.element.remove();
    }
  
    destroy() {
      this.remove();
    }
}