const EventsEmitter = require('events'); //return a class

//const emitter = new EventsEmitter(); //object of EventsEmitter class

class School extends EventsEmitter{
    startPeriod(){
        console.log('Class started');
    
        //raise event when bell rings
        //rasie an event
        setTimeout(()=>{
            this.emit('bellRing','Second period ended'); //emit or raise an event
        },2000);
    }
}


module.exports = School;