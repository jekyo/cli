const { Command, flags } = require("@oclif/command")
const cli = require("cli-ux").cli
const util = require("../../util")

class LogsCommand extends Command {
  async run() {
    const { flags } = this.parse(LogsCommand)
    const name = flags.name || (await cli.prompt("Service name?"))
    const jekyoClient = util.Client(this.config.dataDir)
    const result = await jekyoClient.LogsService(name)
    console.log(result.data.data.logs)
  }
  async catch(error) {
    util.ErrorHandler(this.error, error)
  }
}

LogsCommand.description = "Retrieves the logs for a service deployed on jekyo"

LogsCommand.flags = {
  name: flags.string({ char: "n", description: "jekyo service name" }),
}

module.exports = LogsCommand
