const {Command, flags} = require('@oclif/command')

class ServiceCommand extends Command {
  async run() {
    const {flags} = this.parse(ServiceCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /volumes/code/jekyo-cli/src/commands/service.js`)
  }
}

ServiceCommand.description = `Describe the command here
...
Extra documentation goes here
`

ServiceCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = ServiceCommand
