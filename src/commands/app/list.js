const { Command } = require("@oclif/command")
const util = require("../../util")
const cli = require("cli-ux").cli
const chalk = require("chalk")

class ListCommand extends Command {
  async run() {
    const jekyoClient = util.Client(this.config.dataDir)
    const applications = await jekyoClient.ApplicationList()
    cli.table(applications.data, {
      Name: {
        minWidth: 5,
        get: (row) => chalk.cyanBright(row.name),
      },
      On: {
        get: (row) => chalk.greenBright(row.instances.ready),
      },
      Up: {
        get: (row) => chalk.greenBright(row.instances.available),
      },
      Down: {
        get: (row) => chalk.red(row.instances.unavailable),
      },
      status: {
        minWidth: 7,
        get: (data) => chalk.green(data.status),
      },
    })
  }
  async catch(error) {
    util.ErrorHandler(this.error, error)
  }
}

ListCommand.description = "Lists all applications that a user has created on jekyo"

module.exports = ListCommand
