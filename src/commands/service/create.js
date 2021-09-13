const {Command, flags} = require('@oclif/command')

class CreateCommand extends Command {
  async run() {
    const {flags} = this.parse(CreateCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /volumes/code/jekyo-cli/src/commands/service/create.js`)
  }
}

CreateCommand.description = `Describe the command here
...
Extra documentation goes here
`

CreateCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = CreateCommand
