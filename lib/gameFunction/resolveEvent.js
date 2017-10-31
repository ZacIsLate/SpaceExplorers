const request = require('../../test/e2e/request');

module.exports = function resolveEvent(char_id, event_id){
    console.log('we are here the ideas are:!!!',char_id, event_id);
    //let char = null;
    return Promise.all([
        request.get(`/api/characters/${char_id}`),
        request.get(`/api/events/${event_id}`)
    ])
        .then( ([{body:char}, {body:event}]) =>{
            console.log('we win!!!!!!:', char, event);
        });
};