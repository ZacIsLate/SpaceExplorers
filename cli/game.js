const inquirer = require('inquirer');
const authQuestions = [
    {
        type: 'list',
        name: 'auth',
        message: 'Do you want to sign in or sign up?',
        choices: [{name: 'Sign in', value: 'signIn' },{name:'Sign up', value: 'signUp'}]
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

const characterQuestions =[
    {
        type: 'input',
        name: 'character name',
        message: 'enter character name'
    },
    {
        type: 'password',
        name: 'password',
        message: 'enter your password'
    }
];


class Game{
    constructor(api){
        this.api = api;
    }
    start(){
        inquirer.prompt(authQuestions)
            .then(({ auth, email, password }) => this.api[auth]({email, password}))
            .then(({ token, _id}) =>{
                this.api.token = token;
                this.chooseCharacter(_id);
            })
            .catch(console.log);
    }
    createNewCharacter(id){
        this.api.getShips();

    }
    chooseCharacter(id){
        this.api.getCharacters(id)
            .then( characters => {
                const choices = characters.map(character => {
                    return {value: character._id, name: character.name};
                });
                choices.push({value: 'Create', name: 'Create a new character'});
                inquirer.prompt({
                    type: 'list',
                    name: 'character',
                    message: 'choose a character',
                    choices
                })
                    .then(({ character }) => {
                        console.log('character', character);
                        this.generateEvent();
                    });
                
            });
    }
    generateEvent(){
        this.api.loadEvent()
            .then( event => this.resolveEvent(event));
    }
    resolveEvent(event){
        console.log(event.description);
        if(event.win) console.log('You win!');
        if(event.lose) console.log('You lose!');
        if(!event.resolved){
            const chooseAction = event.prompts.map( prompt => {
                return {value: prompt.action, name: prompt.text};
            });
            const choices = {
                type: 'list',
                name: 'action',
                message: 'Choose an action',
                choices: chooseAction,
            };
            inquirer.prompt(choices)
                .then(choice => {
                    console.log('you have chosen', choice);
                    this.api.resolveAction(choice)
                        .then(resolution => this.resolveEvent(resolution));
                });                   
        } else {
            this.generateEvent()
        }
    }
}

    



module.exports = Game;