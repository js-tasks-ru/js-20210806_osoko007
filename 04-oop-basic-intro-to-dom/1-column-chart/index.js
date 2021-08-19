export default class ColumnChart {
    constructor(data) {
        this.data = data;
        this.dataSet = data.data.length > 1 ? data.data : null;
        this.label = data.label ? data.label : null;
        this.value = data.value ? data.value : null;
        this.link = data.link ? data.link : null;
        this.render();
        this.initEventListeners();
      }
    
      render() {
     

        


        const element = document.createElement('div');
        element.classList.add('column-chart');
        if(this.dataSet === null) {
          element.classList.add('column-chart_loading');
          element.setAttribute("style", "--chart-height: 50");
        }
        this.element = element;


        const titleChart = document.createElement('div');
        titleChart.classList.add('column-chart__title');
        titleChart.innerText = this.data.label;
        element.append(titleChart);
        this.titleChart = titleChart;
        
        const linkChart = document.createElement('a');
        if(this.link) {
          linkChart.classList.add('column-chart__link');
          linkChart.setAttribute('href', `${this.link}`);
          linkChart.innerText = "View all";
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
        headerChart.innerText = this.value;
        containerChart.append(headerChart)
        this.headerChart = headerChart;

        const chartsChart = document.createElement('div');
        chartsChart.classList.add('column-chart__chart');
        containerChart.append(chartsChart)
        this.chartsChart = chartsChart;

        const remakeDataForChart = this.dataSet ? this.dataSet.map( (item) => {
          const max = 50;
          return Math.round((item * max) / 100)
        }) : []
        for(let item of remakeDataForChart) {
            const oneChart = document.createElement('div');
            oneChart.setAttribute('data-tooltip', `${item}%`);
            oneChart.setAttribute('style', `--value : ${item}`);
            chartsChart.append(oneChart);
        };

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












// const element = document.createElement('div'); // (*)
        
//     element.innerHTML = `
//     <div class="wrapper">
//       <h1>Hello, Component!</h1>
//     </div>
//   `;