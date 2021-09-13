const {Command, flags} = require('@oclif/command')

class ListCommand extends Command {
  async run() {
    const {flags} = this.parse(ListCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /volumes/code/jekyo-cli/src/commands/service/list.js`)
  }
}

ListCommand.description = `Describe the command here
...
Extra documentation goes here
`

ListCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = ListCommand
