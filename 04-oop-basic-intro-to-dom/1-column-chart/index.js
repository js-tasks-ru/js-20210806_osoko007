export default class ColumnChart {
    constructor(data, label ,value) {
        this.data = data
        this.label = label
        this.value = value
        this.render();
        this.initEventListeners();
      }
    
      render() {
        console.log(this.data.value)


        const element = document.createElement('div');
        element.classList.add('column-chart');
        this.element = element;


        const titleChart = document.createElement('div');
        titleChart.classList.add('column-chart__title');
        titleChart.innerText = this.data.label;
        element.append(titleChart);
        this.titleChart = titleChart;


        const containerChart = document.createElement('div');
        containerChart.classList.add('column-chart__container');
        element.append(containerChart);
        this.containerChart = containerChart;

        const headerChart = document.createElement('div');
        headerChart.classList.add('column-chart__header');
        headerChart.innerText = this.data.value;
        containerChart.append(headerChart)
        this.headerChart = headerChart;

        const chartsChart = document.createElement('div');
        chartsChart.classList.add('column-chart__chart');
        containerChart.append(chartsChart)
        this.chartsChart = chartsChart;

        for(let item of this.data.data) {
            const oneChart = document.createElement('div');
            // oneChart.setAttribute('data-tooltip', item)
            oneChart.setAttribute('style', `--value : ${item}`)
            // oneChart.innerText = item
            // oneChart.innerText = item
            chartsChart.append(oneChart)
            // this.oneChart = oneChart;
        }

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