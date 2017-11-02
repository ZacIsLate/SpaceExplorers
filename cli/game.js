const inquirer = require('inquirer');
const colors = require('colors');
const lineBreak = () => console.log('\n\n\n\n\n');

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


class Game{
    constructor(api){
        this.api = api;
    }
    start(){
        inquirer.prompt(authQuestions)
            .then(({ auth, email, password }) => this.api[auth]({email, password}))
            .then(({ token, _id}) =>{
                lineBreak();
                this.api.token = token;
                this.chooseCharacter(_id);
            })
            .catch(console.log);
    }
    createNewCharacter(id) {
        this.api.getShips()
            .then(ships => {
                ships = ships.map(ship => {
                    return { name: `${ship.name.green.bold.underline}:  ${ship.description}`, value: ship._id };
                });
                return ships;
            })
            .then(shipChoices => {
                lineBreak();
                this.api.getCharacterTemplates()
                    .then(templates => {
                        templates = templates.map(template => {
                            return { name: `${template.name.green.bold.underline}:  ${template.description}`, value: template._id };
                        });
                        return inquirer.prompt([
                            {
                                type: 'list',
                                name: 'Character choice',
                                message: 'Choose a character',
                                choices: templates
                            },
                            {
                                type: 'list',
                                name: 'ship',
                                message: 'Choose a ship',
                                choices: shipChoices
                            }
                        ]);
                    })
                    .then(answers => {
                        answers.userId = id;
                        this.api.char_id = answers;
                        console.log('characterID', this.api.char_id);
                        this.api.saveCharacter(answers)
                            .then( save => {
                                this.api.char_id = save;
                                console.log('characterID', this.api.char_id);
                                this.chooseCharacter(id);
                            });
                    });
            });
    }
    chooseCharacter(id){
        lineBreak();
        this.api.getCharacters(id)
            .then( characters => {
                const choices = characters.map(character => {
                    return {value: character._id, name: character.name};
                });
                choices.push(new inquirer.Separator());
                choices.push({value: 'Create', name: 'Create a new character'});
                inquirer.prompt({
                    type: 'list',
                    name: 'character',
                    message: 'choose a character',
                    choices
                })
                    .then(({ character }) => {
                        console.log('character', character);
                        if( character === 'Create') this.createNewCharacter(id);
                        else this.generateEvent();
                    });
                
            });
    }
    generateEvent(){
        this.api.loadEvent(this.api.char_id)
            .then( event => this.resolveEvent(event));
    }
    resolveEvent(event){
        lineBreak();
        lineBreak();
        console.log(event.description.yellow);
        if(event.win) console.log('You win!');
        if(event.lose) console.log('You lose!');
        if(!event.resolved){
            const chooseAction = event.prompts.map( prompt => {
                return {value: prompt.action, name: prompt.text};
            });
            chooseAction[0].name = chooseAction[0].name.red;
            chooseAction[1].name = chooseAction[1].name.green;
            chooseAction[2].name = chooseAction[2].name.blue;
            const choices = {
                type: 'list',
                name: 'action',
                message: 'Choose an action',
                choices: chooseAction,
            };
            inquirer.prompt(choices)
                .then(choice => {
                    choice.char_id = this.api.char_id;
                    console.log('you have chosen', choice);
                    this.api.resolveAction(choice)
                        .then(resolution => this.resolveEvent(resolution));
                });                   
        } else {
            this.generateEvent();
        }
    }
}

    



module.exports = Game;