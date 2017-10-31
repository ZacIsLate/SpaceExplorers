const request = require('../../test/e2e/request');

module.exports = function resolveEvent(char){
    console.log('we are in functrion and the char is:!!!',char);
    console.log('here is the current event in resolveEvent:', char.log.currentEvent);
    //let char = null;
    return Promise.all([
        request.get(`/api/characters/${char._id}`),
        request.get(`/api/events/${char.log.currentEvent}`)
    ])
        .then( ([{body:char}, {body:event}]) =>{
            console.log('we win!!!!!!:', char, event);
        });
};