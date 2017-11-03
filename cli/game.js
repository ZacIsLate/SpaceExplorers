const inquirer = require('inquirer');
const colors = require('colors');//eslint-disable-line
const lineBreak = () => console.log('\n\n\n\n\n');
const ShortLineBreak = () => console.log('\n');

const authQuestions = [
    {
        type: 'list',
        name: 'auth',
        message: 'Do you want to sign in or sign up?',
        choices: [{name: 'Sign in', value: 'signIn' },{name:'Sign up', value: 'signUp'}]
    },
    {
        type: 'input',
        name: 'name',
        message: 'enter your name'
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
            .then(({ auth, name, password }) => this.api[auth]({name, password}))
            .then(({ token, userId}) =>{
                lineBreak();
                this.api.token = token;
                this.chooseCharacter(userId);
            })
            .catch(console.log);
    }
    createNewCharacter(id) {
        this.api.getShips()
            .then(ships => {
                ships = ships.map(ship => {
                    const dmg = ship.damage.toString();
                    const speed = ship.speed.toString();
                    return { name: `${ship.name.green.bold.underline}: (Damage:${dmg.magenta.bold} Speed:${speed.magenta}) ${ship.description}`, value: ship._id };
                });
                return ships;
            })
            .then(shipChoices => {
                lineBreak();
                console.log('Your beloved planet, Morag, is dying. Rapidly. A series of volcanic explosions is tearing the planet apart. Pretty soon, there will be no breathable air and no viable food sources. You have collected supplies and a crew and soon will be heading out to another galaxy where there is a habitable planet. The journey will be onerous and grueling but critical for the continuation of your people. In order to make the journey, you must choose a ship.'.yellow);
                ShortLineBreak();
                this.api.getCharacterTemplates()
                    .then(templates => {
                        templates = templates.filter( each =>each.template === true);
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
                        this.api.saveCharacter(answers)
                            .then( save => {
                                this.api.char_id = save;
                                this.chooseCharacter(id);
                            });
                    });
            });
    }
    chooseCharacter(id){
        console.log('we are choosing a char with id:', id);
        lineBreak();
        this.api.getCharacters(id)
            .then( characters => {
                let choices = [];
                if(characters){
                    choices = characters.map(character => {
                        return {value: character._id, name: character.name};
                    });
                }
                choices.push(new inquirer.Separator());
                choices.push({value: 'Create', name: 'Create a new character'});
                inquirer.prompt({
                    type: 'list',
                    name: 'character',
                    message: 'choose a character',
                    choices
                })
                    .then(({ character }) => {
                        if( character === 'Create') this.createNewCharacter(id);
                        else {
                            this.generateEvent(character);
                        }
                    });
                
            });
    }
    generateEvent(id){
        console.log('generate event is called with id of', id);
        this.api.loadEvent(id)
            .then(event => {
                return this.resolveEvent(event);
            });
    }
    resolveEvent(event) {
        let eventDescription = null;
        event.resolved ? eventDescription = event.description.green : eventDescription = event.description.yellow;
        ShortLineBreak();
        console.log(eventDescription);
        if (!event.resolved) lineBreak();
        if (event.win) {
            lineBreak();
            console.log('You win!'.bold.green);
            lineBreak();
            return;
        } else if (event.lose) {
            lineBreak();
            console.log('You lose!'.bold.orange);
            lineBreak();
            return;
        } else {
            if (!event.resolved) {
                const chooseAction = event.prompts.map(prompt => {
                    return { value: prompt.action, name: prompt.text };
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
                        this.api.resolveAction(choice)
                            .then(resolution => {
                                this.resolveEvent(resolution.result);
                            });
                    });
            } else {
                this.generateEvent(this.api.char_id.charId);
            }
        }
    }
}





module.exports = Game;