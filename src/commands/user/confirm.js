const { Command, flags } = require("@oclif/command")
const util = require("../../util")
const cli = require("cli-ux").cli

class ConfirmCommand extends Command {
  async run() {
    const { flags } = this.parse(ConfirmCommand)
    const token = flags.token || (await cli.prompt("Confirmation token?", { type: "mask" }))
    const jekyoClient = util.Client(this.config.dataDir)
    const result = await jekyoClient.Confirm(token)
    this.log(result.data.message)
  }
  async catch(error) {
    util.ErrorHandler(this.error, error)
  }
}

ConfirmCommand.description = "Confirms the email of a jekyo account"

ConfirmCommand.flags = {
  token: flags.string({ char: "t", description: "Account confirmation token" }),
}

module.exports = ConfirmCommand
