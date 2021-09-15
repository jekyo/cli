const { Command, flags } = require("@oclif/command")
const AppStatus = require("./app/status")
const util = require("../util")
class StatusCommand extends Command {
  async run() {
    const git = util.Git(this.config.dataDir)
    const remote = await git.Remote()
    if (!remote) {
      this.error("Application not found, use `jekyo link` to link and existing one or `jekyo create` to create one")
    }
    const runes = remote.url.split("/")
    //quick and dirty
    const application = runes[runes.length - 1].split(".git")[0]
    await AppStatus.run(["-n", application])
  }
  async catch(error) {
    util.ErrorHandler(this.error, error)
  }
}

StatusCommand.description = "Retrieves the status for the current application"

StatusCommand.flags = {
  name: flags.string({ char: "n", description: "name to print" }),
}

module.exports = StatusCommand
