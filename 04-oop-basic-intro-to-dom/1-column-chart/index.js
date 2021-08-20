export default class ColumnChart {
    constructor(data) {
      if(data) {
        this.chartHeight = 50;
        this.data = data;
        this.dataForCharts = data.data;
        this.render();
        this.initEventListeners();
      } else {
        this.isUndefined =  true
        this.chartHeight = 50;
        this.data = {};
        this.dataForCharts = [];
        this.render();
        this.initEventListeners();
      }   
    }
    render() {
      const element = document.createElement('div');
      if(this.isUndefined) {
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
      this.label = Object.keys(this.data).includes('label') ? this.data.label : '';
      titleChart.innerHTML = this.label;
      element.append(titleChart);
      this.titleChart = titleChart;
      
      this.link = Object.keys(this.data).includes('link') ? this.data.link : '';
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

      this.value = Object.keys(this.data).includes('value') ? this.data.value : 0;
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

      const remakeDataForChart = this.dataForCharts ? this.dataForCharts.map( (item, index, array) => {
        const maxValue = Math.max(...this.dataForCharts);
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
      return this.data.hasOwnProperty('formatHeading')
        ? `${this.data.formatHeading(value)}`
        : value;
    }

    update (data) {
      this.dataForCharts = data
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