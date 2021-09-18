const { Command, flags } = require("@oclif/command")
const util = require("../../util")
const inquirer = require("inquirer")
class DeleteCommand extends Command {
  async run() {
    const { flags } = this.parse(DeleteCommand)
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
    const result = await jekyoClient.ApplicationDelete(flags.name)
    console.log(result.data.message)
  }
  async catch(error) {
    util.ErrorHandler(this.error, error)
  }
}

DeleteCommand.description = "Deletes an existing application deployed on jekyo"

DeleteCommand.flags = {
  name: flags.string({ char: "n", description: "Application name" }),
}

module.exports = DeleteCommand
