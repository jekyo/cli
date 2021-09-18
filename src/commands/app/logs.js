const { Command, flags } = require("@oclif/command")
const util = require("../../util")
const inquirer = require("inquirer")

class LogsCommand extends Command {
  async run() {
    const { flags } = this.parse(LogsCommand)
    const jekyoClient = util.Client(this.config.dataDir)
    if (!flags.name) {
      const apps = (await jekyoClient.ApplicationEnumerate()).data.map((app) => {
        return { name: app.name }
      })
      if (apps.length > 0) {
        const response = await inquirer.prompt([
          {
            name: "application",
            message: "Select application",
            type: "list",
            choices: apps,
          },
        ])
        flags.name = response.application
      } else {
        this.error("No applications found, use `jekyo create` to create one")
      }
    }
    const result = await jekyoClient.ApplicationLogs(flags.name)
    console.log(result.data.data.logs)
  }
  async catch(error) {
    util.ErrorHandler(this.error, error)
  }
}

LogsCommand.description = "Retrieves the logs for a application deployed on jekyo"

LogsCommand.flags = {
  name: flags.string({ char: "n", description: "jekyo application name" }),
}

module.exports = LogsCommand
