#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
// Define the Player and Enemy classes
class Character {
    name;
    health = 100;
    constructor(name) {
        this.name = name;
    }
    healthDecrease(amount) {
        this.health -= amount;
        if (this.health < 0)
            this.health = 0;
    }
    healthIncrease(amount) {
        this.health += amount;
        if (this.health > 100)
            this.health = 100;
    }
}
class Player extends Character {
    constructor(name) {
        super(name);
    }
}
class Enemy extends Character {
    constructor(name) {
        super(name);
    }
}
const enemies = ['Goblin', 'Troll', 'Dragon'];
async function main() {
    console.log(chalk.bold.italic.yellow("******** Welcome To The RPG Adventure Game ********"));
    // Get player's name
    const playerResponse = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter Your Name: ',
    });
    const playerName = playerResponse.name;
    const player = new Player(playerName);
    console.log(chalk.bold.green(`Hello ${playerName}, get ready for the adventure!`));
    while (true) {
        // Select an enemy
        const enemyName = enemies[Math.floor(Math.random() * enemies.length)];
        const enemy = new Enemy(enemyName);
        console.log(chalk.bold.red(`A wild ${enemy.name} appears!`));
        while (enemy.health > 0 && player.health > 0) {
            // Player's turn
            const actionResponse = await inquirer.prompt({
                type: 'list',
                name: 'action',
                message: 'What do you want to do?',
                choices: ['Attack', 'Use Health Potion', 'Run Away'],
            });
            const action = actionResponse.action;
            if (action === 'Attack') {
                const damage = Math.floor(Math.random() * 20) + 1;
                enemy.healthDecrease(damage);
                console.log(chalk.bold.yellow(`You attacked the ${enemy.name} for ${damage} damage.`));
                console.log(chalk.bold.red(`${enemy.name} Health: ${enemy.health}`));
            }
            else if (action === 'Use Health Potion') {
                const healAmount = Math.floor(Math.random() * 20) + 10;
                player.healthIncrease(healAmount);
                console.log(chalk.bold.green(`You used a health potion and recovered ${healAmount} health.`));
                console.log(chalk.bold.green(`${player.name} Health: ${player.health}`));
            }
            else if (action === 'Run Away') {
                console.log(chalk.bold.red(`You ran away from the ${enemy.name}.`));
                break;
            }
            if (enemy.health <= 0) {
                console.log(chalk.bold.green(`You defeated the ${enemy.name}!`));
                break;
            }
            // Enemy's turn
            const enemyDamage = Math.floor(Math.random() * 15) + 1;
            player.healthDecrease(enemyDamage);
            console.log(chalk.bold.red(`The ${enemy.name} attacked you for ${enemyDamage} damage.`));
            console.log(chalk.bold.green(`${player.name} Health: ${player.health}`));
            if (player.health <= 0) {
                console.log(chalk.bold.red(`You were defeated by the ${enemy.name}. Game over.`));
                process.exit();
            }
        }
        // Ask if the player wants to continue
        const continueResponse = await inquirer.prompt({
            type: 'confirm',
            name: 'continue',
            message: 'Do you want to continue your adventure?',
        });
        if (!continueResponse.continue) {
            console.log(chalk.bold.green('Thanks for playing!'));
            break;
        }
    }
}
main();
