const {Command, flags} = require('@oclif/command')

class RecoverCommand extends Command {
  async run() {
    const {flags} = this.parse(RecoverCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /volumes/code/jekyo-cli/src/commands/user/recover.js`)
  }
}

RecoverCommand.description = `Describe the command here
...
Extra documentation goes here
`

RecoverCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = RecoverCommand
