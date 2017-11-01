const inquirer = require('inquirer');
const authQuestions = [
    {
        type: 'list',
        name: 'auth',
        message: 'Do you want to sign in or sign up?',
        choices: [{name: 'Sign in', value: 'signIn' },{name:'Sign up', value: 'signUp'}],
    },
    {
        type: 'input',
        name: 'email',
        message: 'enter your email'
    },
    {
        type: 'password',
        name: 'password',
        message: 'enter your password'
    }

];
//controls flow of the game based on results obtained from api. 
class Game{
    constructor(api){
        this.api = api;
    }
    start(){
        inquirer.prompt(authQuestions)
            .then( ({ auth, email, password }) => {
                return this.api[auth]({email, password});
            })
            .then(({ token, _id}) =>{
                this.api.token = token;
                if(!_id) this.chooseCharacter();
                else this.loadEvent();
            })
            .catch(console.log);
    }
    chooseCharacter(){
        this.api.getCharacters()
            .then( characters => {
                const choices = characters.map(character => {
                    return {value: character._id, name: character.name};
                });
                inquirer.prompt({
                    type: 'list',
                    name: 'character',
                    message: 'choose a character',
                    choices
                })
                    .then(({ character }) => {
                        console.log('character', character);
                    });
                
            });
    }
    generateEvent(){
        this.api.loadEvent()
            .then( )
        console.log('Load an event');
    }
}

    



module.exports = Game;