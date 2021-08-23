export default class NotificationMessage {
    constructor (
        message = '', 
        {duration = 1000, type = 'success'} = {}
    ) {
        this.message = message;
        this.duration = duration;
        this.type = type;
        this.render();
        this.destroy();
    } 

    render() {
      const element = document.createElement('div');
      element.innerHTML = this.template;
      this.element = element.firstElementChild;
    }

    show(element) {
      if(element) {
        this.element = element;
        document.body.append(this.element)
      } else {
        document.body.append(this.element)
      }
    }

    get template() {
        return `
          <div class="notification ${this.type}" style="--value:${this.duration}ms">
            <div class="timer"></div>
            <div class="inner-wrapper">
              <div class="notification-header">${this.type}</div>
              <div class="notification-body">
                ${this.message}
              </div>
            </div>
          </div>
        `
    }

    destroy() {
        const notificationList = document.querySelectorAll('.notification')
        for(let item of notificationList) {
            item.remove()
        }
        setTimeout(()=>{
            this.element.remove()
        },this.duration)
    }

    
}
