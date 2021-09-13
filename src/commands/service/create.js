const { Command, flags } = require("@oclif/command")
const util = require("../../util")
const cli = require("cli-ux").cli

class CreateCommand extends Command {
  async run() {
    const { flags } = this.parse(CreateCommand)
    const name = flags.name || (await cli.prompt("Service name?"))
    const jekyoClient = util.Client(this.config.dataDir)
    const result = await jekyoClient.CreateService(name)
    console.log(result.data.message)
  }
  async catch(error) {
    util.ErrorHandler(this.error, error)
  }
}

CreateCommand.description = "Creates a new service that can be deployed on jekyo"

CreateCommand.flags = {
  name: flags.string({ char: "n", description: "jekyo service name" }),
}

module.exports = CreateCommand
