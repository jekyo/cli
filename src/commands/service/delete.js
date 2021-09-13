const { Command, flags } = require("@oclif/command")
const util = require("../../util")
const cli = require("cli-ux").cli
class DeleteCommand extends Command {
  async run() {
    const { flags } = this.parse(DeleteCommand)
    const name = flags.name || (await cli.prompt("Service name?"))
    const jekyoClient = util.Client(this.config.dataDir)
    const result = await jekyoClient.DeleteService(name)
    console.log(result.data.message)
  }
  async catch(error) {
    util.ErrorHandler(this.error, error)
  }
}

DeleteCommand.description = "Deletes an existing service deployed on jekyo"

DeleteCommand.flags = {
  name: flags.string({ char: "n", description: "jekyo service name" }),
}

module.exports = DeleteCommand
