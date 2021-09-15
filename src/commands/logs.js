const { Command, flags } = require("@oclif/command")
const AppLogs = require("./app/logs")
const util = require("../util")

class LogsCommand extends Command {
  async run() {
    const git = util.Git(this.config.dataDir)
    const remote = await git.Remote()
    if (!remote) {
      this.error("Application not found, use `jekyo link` to link and existing one or `jekyo create` to create one")
    }
    const runes = remote.url.split("/")
    //quick and dirty
    const application = runes[runes.length - 1].split(".git")[0]
    await AppLogs.run(["-n", application])
  }
  async catch(error) {
    util.ErrorHandler(this.error, error)
  }
}

LogsCommand.description = "Retrieves the logs for the current application"

LogsCommand.flags = {
  name: flags.string({ char: "n", description: "jekyo application name" }),
}

module.exports = LogsCommand
