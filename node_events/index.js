//const EventsEmitter = require('events'); //return a class

//const emitter = new EventsEmitter(); //object of EventsEmitter class

const School = require('./school.js');//return a class

const school = new School();
//registered an event listener 'bellRing'
school.on('bellRing',(period)=>{
    console.log(` registered an event 'bellRing' ${period} `);
});

school.startPeriod();





