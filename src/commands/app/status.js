const { Command, flags } = require("@oclif/command")
const util = require("../../util")
const cli = require("cli-ux").cli
const chalk = require("chalk")

class StatusCommand extends Command {
  async run() {
    const { flags } = this.parse(StatusCommand)
    const name = flags.name || (await cli.prompt("Application name?"))
    const jekyoClient = util.Client(this.config.dataDir)
    const result = await jekyoClient.ApplicationStatus(name)

    cli.table(result.data.data.pods, {
      Name: {
        minWidth: 5,
        get: (row) => chalk.cyanBright(row.name),
      },

      Phase: {
        get: (row) => chalk.greenBright(row.phase),
      },
      QOS: {
        get: (row) => chalk.magenta(row.qos),
      },
      Date: {
        get: (row) => chalk.yellowBright(row.startTime),
      },
    })
  }
  async catch(error) {
    util.ErrorHandler(this.error, error)
  }
}

StatusCommand.description = "Retrieves the status of a jekyo application"

StatusCommand.flags = {
  name: flags.string({ char: "n", description: "Application name" }),
}

module.exports = StatusCommand
