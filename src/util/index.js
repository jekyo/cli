const axios = require("axios").default
const JSONStore = require("json-store")
const git = require("isomorphic-git")
const http = require("isomorphic-git/http/node")
const fs = require("fs")
const BaseUrl = "https://jekyo.com"
const cli = require("cli-ux").cli
const chalk = require("chalk")

module.exports = {
  ErrorHandler(logger, err) {
    if (err.response) {
      switch (err.response.status) {
        case 404:
          logger(err.message)
          break
        case 401:
          logger("Session expired: please signin !")
          break
        case 422:
          if (err.response.data.errors) {
            const firstError = Object.keys(err.response.data.errors)[0]
            logger(err.response.data.errors[firstError])
          } else {
            logger(err.response.data.message)
          }
          break
        case 503:
          logger(`${err.response.data.message}, please try again later`)
          break
        case 413:
          logger("The data you are trying to send is too big")
          break
        default:
          logger(`please handle ${err.response.status}, ${JSON.stringify(err.response.data)}`)
      }
    } else {
      if (err.caller === "git.push") {
        switch (err.data.statusCode) {
          case 404:
            logger("Application not found, use `jekyo link` to link and existing one or `jekyo create` to create one")
            break

          default:
            logger(`please handle: status:${err.data.statusCode}, message:${err.message}`)
            break
        }
        logger("Session expired: please signin !")
      } else {
        logger(`${err}`)
      }
    }
  },
  Client(config) {
    if (!fs.existsSync(config)) {
      fs.mkdirSync(config, { recursive: true })
    }
    const configStore = JSONStore(`${config}/config.json`)
    axios.defaults.baseURL = BaseUrl
    const token = configStore.get("token")
    const user = configStore.get("user")
    if (token) {
      axios.defaults.headers.common["Authorization"] = token
    }
    return {
      async SignUp(user) {
        return await axios.post("/api/user/signup", user)
      },
      async Confirm(token) {
        return await axios.post("/api/user/confirm", { token })
      },
      async SignIn(user) {
        const result = await axios.post("api/user/signin", user)
        configStore.set("token", `Bearer ${result.data.token}`)
        configStore.set("credentials", user)
        axios.defaults.headers.common["Authorization"] = token
        const me = await axios.post("api/user/me", { token: result.data.token })
        configStore.set("user", me.data)
        return result
      },
      async Recover(email) {
        return await axios.post("/api/user/recover", { email })
      },
      async ChangePassword(request) {
        return await axios.post("/api/user/changePassword", request)
      },
      async ApplicationCreate(name) {
        return await axios.post(`/api/application/${user.username}/create`, { name })
      },
      async ApplicationDelete(name) {
        return await axios.post(`/api/application/${user.username}/delete`, { name })
      },
      async ApplicationList() {
        return await axios.get(`/api/application/${user.username}/list`)
      },
      async ApplicationEnumerate() {
        return await axios.get(`/api/application/${user.username}/enumerate`)
      },
      async ApplicationLogs(service) {
        return await axios.get(`/api/application/${user.username}/${service}/logs`)
      },
      async ApplicationStatus(service) {
        return await axios.get(`/api/application/${user.username}/${service}/status`)
      },
    }
  },
  Git(config) {
    const configStore = JSONStore(`${config}/config.json`)
    const credentials = configStore.get("credentials")
    const user = configStore.get("user")
    return {
      async Remote() {
        let remotes = await git.listRemotes({ fs, dir: process.cwd() })
        return remotes.filter((remote) => remote.remote === "jekyo")[0]
      },
      async CreateRemote(repository) {
        return await git.addRemote({
          fs,
          dir: process.cwd(),
          force: true,
          remote: "jekyo",
          url: `${BaseUrl}/api/repository/${user.username}/${repository}.git`,
        })
      },
      async Deploy() {
        await git.push({
          fs,
          http,
          onProgress: () => {
            console.log("progress")
          },
          onMessage: (message) => {
            cli.action.stop(chalk.greenBright("OK"))
            cli.action.start(`${chalk.cyanBright("➜ ")} ${chalk.gray(message.replace(/\r?\n|\r/, " "))}`)
          },
          onAuth: () => ({ username: credentials.email, password: credentials.password }),
          dir: process.cwd(),
          remote: "jekyo",
          force: true,
          remoteRef: "master",
        })
        cli.action.stop(chalk.greenBright("OK"))
      },
      async Clone(repository, dir) {
        cli.action.start(chalk.gray("Cloning source code"))
        await git.clone({
          fs,
          http,
          dir: dir,
          url: repository,
          singleBranch: true,
        })
        cli.action.stop(chalk.greenBright("OK"))
      },
    }
  },
  Github() {
    delete axios.defaults.headers.common["Authorization"]
    return {
      async GettingStartedTemplates() {
        return await axios.get("https://api.github.com/users/jekyo/repos")
      },
    }
  },
}
