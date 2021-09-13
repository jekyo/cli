const {Command, flags} = require('@oclif/command')

class StatusCommand extends Command {
  async run() {
    const {flags} = this.parse(StatusCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /volumes/code/jekyo-cli/src/commands/status.js`)
  }
}

StatusCommand.description = `Describe the command here
...
Extra documentation goes here
`

StatusCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = StatusCommand
