const { Command, flags } = require("@oclif/command")
const Create = require("./app/create")
const util = require("../util")
const inquirer = require("inquirer")

class CreateCommand extends Command {
  async run() {
    const { flags } = this.parse(CreateCommand)
    if (flags.name && flags.password) {
      await Create.run(["-n", flags.name, "-t", "flags.template"])
    } else {
      await Create.run([])
    }
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
