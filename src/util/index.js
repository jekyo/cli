const axios = require("axios").default
const JSONStore = require("json-store")
const fs = require("fs")
module.exports = {
  ErrorHandler(logger, err) {
    if (err.response) {
      switch (err.response.status) {
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
        default:
          logger(`unhandled status ${err.response.status}, ${JSON.stringify(err.response.data)}`)
      }
    } else {
      logger(err)
    }
  },

  Client(config) {
    if (!fs.existsSync(config)) {
      fs.mkdirSync(config, { recursive: true })
    }
    const configStore = JSONStore(`${config}/config.json`)
    axios.defaults.baseURL = "http://localhost:8000"
    const token = configStore.get("token")
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
        configStore.set("token", result.data.token)
        configStore.set("user", user)
        return result
      },
      async Recover(email) {
        return await axios.post("/api/user/recover", { email })
      },
      async ChangePassword(request) {
        return await axios.post("/api/user/changePassword", request)
      },
    }
  },
}
