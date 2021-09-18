const { Command, flags } = require("@oclif/command")
const util = require("../../util")
const cli = require("cli-ux").cli
const inquirer = require("inquirer")
const chalk = require("chalk")
const path = require("path")
const fs = require("fs")
class CreateCommand extends Command {
  async run() {
    const { flags } = this.parse(CreateCommand)
    const templates = (await util.Github().GettingStartedTemplates()).data
    let response
    if (templates.length > 0) {
      let choices = templates.reduce((sum, template) => {
        if (template.name.includes("-getting-started")) {
          sum.push({
            name: `${template.name.split("-getting-started")[0]} ${chalk.gray(template.description)}`,
            description: template.description,
            value: template.clone_url,
          })
        }
        return sum
      }, [])
      choices.unshift({
        name: `None ${chalk.gray("Creates only the application")}`,
        description: "No template",
      })

      response = await inquirer.prompt([
        {
          name: "template",
          message: "Select template",
          type: "list",
          choices: choices,
        },
      ])
    }
    const name = flags.name || (await cli.prompt("Application name?"))
    if (response && response.template) {
      const dirName = path.join(process.cwd(), name)
      if (!fs.existsSync(dirName)) {
        await util.Git(this.config.dataDir).Clone(response.template, dirName)
        process.chdir(dirName)
        await util.Git(this.config.dataDir).CreateRemote(name)
      } else {
        this.error(`Directory ${name} already exists`)
      }
    }
    const jekyoClient = util.Client(this.config.dataDir)
    const result = await jekyoClient.ApplicationCreate(name)
    console.log(result.data.message)
  }
  async catch(error) {
    util.ErrorHandler(this.error, error)
  }
}

CreateCommand.description = "Creates a new application that can be deployed on jekyo"

CreateCommand.flags = {
  name: flags.string({ char: "n", description: "Application name" }),
  template: flags.string({ char: "t", description: "Template name, use none for no template" }),
}

module.exports = CreateCommand
