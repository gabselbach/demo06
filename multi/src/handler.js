const settings = require("./../config/settings")
const axios = require("axios")
const cheerio = require("cheerio")

class Handler {
  static async main(event) {
    console.log('at', new Date().toISOString(), JSON.stringify(event, null, 2))
    const  { data } = await axios.get(settings.commitMessagesUrl)
    const $ = cheerio.load(data)
    const [commitMessage] = await $('#content').text().trim().split('\n')
    console.log('Message', commitMessage )
    const body = {
        commitMessage,
        createdAt: new Date().toISOString()
    }
    console.log('process finished at', new Date().toISOString())

    return {
      statusCode: 200,
      body
    }
  }
}

module.exports = {
  hello: Handler.main
}