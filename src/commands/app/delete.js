const { Command, flags } = require("@oclif/command")
const util = require("../../util")
const cli = require("cli-ux").cli
class DeleteCommand extends Command {
  async run() {
    const { flags } = this.parse(DeleteCommand)
    const name = flags.name || (await cli.prompt("Application name?"))
    const jekyoClient = util.Client(this.config.dataDir)
    const result = await jekyoClient.ApplicationDelete(name)
    console.log(result.data.message)
  }
  async catch(error) {
    util.ErrorHandler(this.error, error)
  }
}

DeleteCommand.description = "Deletes an existing application deployed on jekyo"

DeleteCommand.flags = {
  name: flags.string({ char: "n", description: "Application name" }),
}

module.exports = DeleteCommand
