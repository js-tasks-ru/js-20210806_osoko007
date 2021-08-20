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
      if(Object.keys(this.data).length == 0) {
        element.classList.add('column-chart');
        element.classList.add('column-chart_loading');
        element.setAttribute("style", `--chart-height: ${this.chartHeight}`);
      } else {
        element.classList.add('column-chart');
        element.setAttribute("style", `--chart-height: ${this.chartHeight}`);
      }
      this.element = element;


      const titleChart = document.createElement('div');
      titleChart.classList.add('column-chart__title');
      titleChart.innerHTML = this.label;
      element.append(titleChart);
      this.titleChart = titleChart;

      if(this.link) {
        const linkChart = document.createElement('a');
        linkChart.classList.add('column-chart__link');
        linkChart.setAttribute('href', `${this.link}`);
        linkChart.innerHTML = "View all";
        titleChart.append(linkChart);
        this.linkChart = linkChart;
      }
      
      const containerChart = document.createElement('div');
      containerChart.classList.add('column-chart__container');
      element.append(containerChart);
      this.containerChart = containerChart;

      const headerChart = document.createElement('div');
      headerChart.classList.add('column-chart__header');
      headerChart.setAttribute("data-element", "header");
      headerChart.innerHTML = this.formatHeading(this.value);
      containerChart.append(headerChart)
      this.headerChart = headerChart;

      const chartsChart = document.createElement('div');
      chartsChart.classList.add('column-chart__chart');
      chartsChart.setAttribute("data-element", "body");
      containerChart.append(chartsChart)
      this.chartsChart = chartsChart;

      const remakeDataForChart = this.data ? this.data.map( (item, index, array) => {
        const maxValue = Math.max(...this.data);
        const scale = 50 / maxValue;
        return ({
          value : Math.floor(item * scale),
          percent : (item / maxValue * 100).toFixed(0) + '%',
        })
      }) : []
      for(let item of remakeDataForChart) {
          const oneChart = document.createElement('div');
          oneChart.setAttribute('data-tooltip',`${item.percent}`);
          oneChart.setAttribute('style', `--value:${item.value}`);
          chartsChart.append(oneChart);
      };
    }

    formatHeading (value) {
      return this.formatHeading(value)
    }

    update (data) {
      this.data = data
    }
  
    initEventListeners () {
      // NOTE: в данном методе добавляем обработчики событий, если они есть
    }
  
    remove () {
      this.element.remove();
    }
  
    destroy() {
      this.remove();
      // NOTE: удаляем обработчики событий, если они есть
    }
}