const { Command, flags } = require("@oclif/command")
const AppLogs = require("./app/logs")
class LogsCommand extends Command {
  async run() {
    const { flags } = this.parse(LogsCommand)
    const name = flags.name || "world"
    this.log(`hello ${name} from /volumes/code/jekyo-cli/src/commands/logs.js`)
  }
  async catch(error) {
    util.ErrorHandler(this.error, error)
  }
}

LogsCommand.description = `Describe the command here
...
Extra documentation goes here
`

LogsCommand.flags = {
  name: flags.string({ char: "n", description: "name to print" }),
}

module.exports = LogsCommand
