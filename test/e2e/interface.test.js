const assert = require('chai').assert;
const mockInput = require('mock-stdin').stdin();
const Interface = require('../../lib/routes/interface');

describe.only('Interface test',() => {

    it('should write a question to the command line and receive a response', () => {
        const interface = new Interface();
        const promise = interface.ask('Hi, what is your name')
            .then((res) => assert.ok(res));
        mockInput.send('SHANE MOYO\n');
        return promise;
    });

    it('should write multiple questions to command line and receive a response', () => {
        const interface = new Interface();
        const promise = interface.ask(['Hi, what is your first name?', 'What is your last name?'])
            .then((res) => {
                console.log('i am response res', res);
                assert.ok(res);
                assert.deepEqual(res['Hi, what is your first name?'], 'SHANE');
                assert.deepEqual(res['What is your last name?'], 'MOYO');
            });
        mockInput.send('SHANE\n');
        mockInput.send('MOYO\n');
        return promise;
    });
});