const { Command, flags } = require("@oclif/command")
const util = require("../../util")
const cli = require("cli-ux").cli

class SigninCommand extends Command {
  async run() {
    const { flags } = this.parse(SigninCommand)
    const user = {
      email: flags.email || (await cli.prompt("Your email?", { type: "mask" })),
      password: flags.password || (await cli.prompt("Your password?", { type: "hide" })),
    }
    const jekyoClient = util.Client(this.config.dataDir)
    const result = await jekyoClient.SignIn(user)
    this.log(result.data.message)
  }
  async catch(error) {
    util.ErrorHandler(this.error, error)
  }
}

SigninCommand.description = "Sign in an existing jekyo user"

SigninCommand.flags = {
  password: flags.string({ char: "p", description: "jekyo account password", required: false }),
  email: flags.string({ char: "e", description: "jekyo account email", required: false }),
}

module.exports = SigninCommand
