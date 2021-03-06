const { Command, flags } = require("@oclif/command")
const util = require("../util")
const inquirer = require("inquirer")
const chalk = require("chalk")

class LinkCommand extends Command {
  async run() {
    const { flags } = this.parse(LinkCommand)
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
    await util.Git(this.config.dataDir).CreateRemote(flags.name)
    this.log(`Application ${chalk.cyanBright(flags.name)} linked, use ${chalk.greenBright("jekyo deploy")} to deploy`)
  }
  async catch(error) {
    util.ErrorHandler(this.error, error)
  }
}

LinkCommand.description = "Links an existing application"

LinkCommand.flags = {
  name: flags.string({ char: "n", description: "Application name" }),
}

module.exports = LinkCommand
