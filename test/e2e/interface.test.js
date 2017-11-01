const assert = require('chai').assert;
const mockInput = require('mock-stdin').stdin();
const Interface = require('../../lib/routes/interface');

describe.only('Interface test',() => {

   

    it.only('should write multiple questions to command line and receive a response', () => {
        const interface = new Interface();
        const question = {
            type: 'input',
            name: 'name',
            message: 'Hi, What is your name?'
        };
        const promise = interface.askQuestions(question)
            .then((res) => {
                assert.ok(res);
                assert.deepEqual(res.name, 'SHANE');
            });
        mockInput.send('SHANE\n');
        return promise;
    });
});