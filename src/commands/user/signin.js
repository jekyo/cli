const { Command, flags } = require("@oclif/command")

class SigninCommand extends Command {
  async run() {
    const { flags } = this.parse(SigninCommand)
    const name = flags.name || "world"
    this.log(`hello ${name} from /volumes/code/jekyo-cli/src/commands/user/signin.js`)
  }
}

SigninCommand.description = `Sign in an existing jekyo user`

SigninCommand.flags = {
  password: flags.string({ char: "p", description: "jekyo account password", required: false }),
  email: flags.string({ char: "e", description: "jekyo account email", required: false }),
}

module.exports = SigninCommand
