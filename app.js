'use strict'

const fs = require('fs')
const logfile = "logs/app.log"

function log() {
  const now = new Date()
  const event = {"@timestamp": now.toJSON(), app: "someapp", msg: `NOW: ${now}`, hash:"somehash"}
  fs.appendFileSync(logfile, `${JSON.stringify(event)}\n`)
}

fs.unlinkSync(logfile)
log()
setInterval(log, 30000)
