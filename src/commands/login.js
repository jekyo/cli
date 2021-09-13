const {Command, flags} = require('@oclif/command')

class LoginCommand extends Command {
  async run() {
    const {flags} = this.parse(LoginCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /volumes/code/jekyo-cli/src/commands/login.js`)
  }
}

LoginCommand.description = `Describe the command here
...
Extra documentation goes here
`

LoginCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = LoginCommand
