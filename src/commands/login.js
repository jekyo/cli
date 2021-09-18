const { Command, flags } = require("@oclif/command")
const Login = require("./user/signin")
const util = require("../util")

class LoginCommand extends Command {
  async run() {
    const { flags } = this.parse(LoginCommand)
    if (flags.email && flags.password) {
      await Login.run(["-e", flags.email, "-p", flags.password])
    } else {
      await Login.run([])
    }
  }
  async catch(error) {
    util.ErrorHandler(this.error, error)
  }
}

LoginCommand.description = "Sign in an existing jekyo user"

LoginCommand.flags = {
  password: flags.string({ char: "p", description: "jekyo account password", required: false }),
  email: flags.string({ char: "e", description: "jekyo account email", required: false }),
}

module.exports = LoginCommand
