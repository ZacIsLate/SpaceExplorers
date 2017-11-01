const prompt = require('prompt');
//const colors = require('colors/safe');
const inquirer = require('inquirer');


class Interface{
    ask(question){
        prompt.start();
        return new Promise((resolve, reject) =>{ 
            prompt.get(question, (err, answer)=>{
                if (err) reject(err);
                else resolve(answer);
            });

        });
    }
    askQuestions(questions) {    
        return inquirer.prompt(questions)
            .then(res => {
                console.log('INQ', res);
                return res;
            });
    }
}

    



module.exports = Interface;