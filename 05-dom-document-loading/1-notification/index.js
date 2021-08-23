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

    static notification;

    render() { 
      if(NotificationMessage.notification) {
        NotificationMessage.notification.remove()
      } 
      NotificationMessage.notification = this;
      const element = document.createElement('div');
      element.innerHTML = this.template;
      this.element = element.firstElementChild;
    }

    show(element) {
      if(NotificationMessage.notification) {
        NotificationMessage.notification.remove()
      } 
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

    remove () {
      if(this.element) {
        this.element.remove();
      }
    }
    
    destroy() { 
      setTimeout(()=>{
          this.remove()
      },this.duration)
    }
}
