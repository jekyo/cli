const { Command, flags } = require("@oclif/command")
const ConfirmCommand = require("./confirm")
const cli = require("cli-ux").cli
const util = require("../../util")

class SignupCommand extends Command {
  async run() {
    const { flags } = this.parse(SignupCommand)
    const user = {
      fullName: flags.name || (await cli.prompt("Your name?")),
      username: flags.username || (await cli.prompt("Desired username?")),
      email: flags.email || (await cli.prompt("Your email?", { type: "mask" })),
      password: flags.password || (await cli.prompt("Desired password?", { type: "hide" })),
      passwordConfirmation: flags.password || (await cli.prompt("Confirm password?", { type: "hide" })),
    }
    if (user.password != user.passwordConfirmation) {
      this.error("Your passwords do not match!")
    } else {
      try {
        const jekyoClient = util.Client(this.config.dataDir)
        const result = await jekyoClient.SignUp(user)
        this.log(result.data.message)
        await ConfirmCommand.run([])
      } catch (err) {
        util.ErrorHandler(this.error, err)
      }
    }
  }
}

SignupCommand.description = "Sign up a new jekyo user"

SignupCommand.flags = {
  username: flags.string({ char: "u", description: "your desired username", required: false }),
  password: flags.string({ char: "p", description: "your desired password", required: false }),
  name: flags.string({ char: "n", description: "your full name", required: false }),
  email: flags.string({ char: "e", description: "your email address", required: false }),
}
module.exports = SignupCommand
