const { Command, flags } = require("@oclif/command")
const util = require("../../util")
const cli = require("cli-ux").cli

class RecoverCommand extends Command {
  async run() {
    const { flags } = this.parse(RecoverCommand)
    const email = flags.email || (await cli.prompt("Your email?", { type: "mask" }))
    const jekyoClient = util.Client(this.config.dataDir)
    const result = await jekyoClient.Recover(email)
    this.log(result.data.message)
    const recoveryRequest = {
      email: email,
      token: await cli.prompt("Recovery token?", { type: "mask" }),
      password: await cli.prompt("New Password?", { type: "hide" }),
      passwordConfirmation: await cli.prompt("Confirmation Password?", { type: "hide" }),
    }
    if (recoveryRequest.password != recoveryRequest.passwordConfirmation) {
      this.error("Your passwords do not match!")
    } else {
      const changePasswordResult = await jekyoClient.ChangePassword(recoveryRequest)
      this.log(changePasswordResult.data.message)
    }
  }
  async catch(error) {
    util.ErrorHandler(this.error, error)
  }
}

RecoverCommand.description = "Recover jekyo account password"

RecoverCommand.flags = {
  password: flags.string({ char: "p", description: "jekyo account password", required: false }),
}

module.exports = RecoverCommand
