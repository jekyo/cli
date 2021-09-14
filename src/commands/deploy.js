const { Command, flags } = require("@oclif/command")
const util = require("../util")

class DeployCommand extends Command {
  async run() {
    const remote = await util.Git(this.config.dataDir).Remote()
    if (!remote) {
      this.error("No app present, use `jekyo link` to link and existing one or `jekyo create` to create one")
    }
  }
  async catch(error) {
    util.ErrorHandler(this.error, error)
  }
}

DeployCommand.description = `Describe the command here
...
Extra documentation goes here
`

DeployCommand.flags = {
  name: flags.string({ char: "n", description: "name to print" }),
}

module.exports = DeployCommand
