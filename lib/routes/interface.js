const prompt = require('prompt');
//const colors = require('colors/safe');


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
        //let count = questions.length;
        prompt.start();
        return new Promise((resolve, reject) => {
            prompt.get(questions, (err, answer) => {
                
                if (err) reject(err);
                else resolve(answer);
            });

        });
    }
}

    



module.exports = Interface;