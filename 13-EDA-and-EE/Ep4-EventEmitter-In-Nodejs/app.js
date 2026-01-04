import EventEmitter from 'events';

const emitter  = new EventEmitter();

emitter.on('abc', () => {
    console.log("A new event has been fired");
    
});

console.log(emitter);


