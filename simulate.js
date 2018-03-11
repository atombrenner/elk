'use strict'

// simulate some logentries for playing with machine learning

const fs = require('fs')
const logfile = "logs/app.log"

// This calculate a rate of log events.
// It resembles a sinus curve with a period of 24 hours.
// The peak occurs at 17 hour
// There is some random jitter of 10 percent added to the rate
// returns the ratePerMinute for the given hour (which can be fractional)
function ratePerMinute(hour) {
  const minRatePerMinute = 2
  const maxRatePerMinute = 10
  const peakHour = 17 // at this hour we have the maximum rate
  const jitter = 1 + (Math.random() - 0.5) * 0.2

  // sin is going from -1 to 1
  // 0 -> 0,  PI/2 -> 1, PI -> 0, 3*PI/2 -> -1
  return (((Math.cos((hour - peakHour) * 2 * Math.PI / 24) + 1) / 2) * (maxRatePerMinute - minRatePerMinute) + minRatePerMinute) * jitter
}

function log(t, error, warn) {
  const event = {"@timestamp": new Date(t), level: "info", msg: "some info message"}
  const rnd = Math.random()

  if (rnd < error) {
    event.level = "error"
    event.msg = "some error occured"
  } else if (rnd < warn) {
    event.level = "warn"
    event.msg = "something unusual happened"
  }

  fs.appendFileSync(logfile, `${JSON.stringify(event)}\n`)
}


if (fs.existsSync(logfile)) fs.unlinkSync(logfile)

const msPerHour =  60 * 60 * 1000
const now = Date.now()
const start = now - 7 * 24 * msPerHour
const stop  = now - 1 * 24 * msPerHour

for (let t = start; t < stop; ) {
  log(t, 0.02, 0.2)
  t += 60000 / ratePerMinute(t / msPerHour)
}
for (let t = stop; t < stop + msPerHour;) {
  log(t, 0.2, 0.4)
  t += 60000 / ratePerMinute(t / msPerHour)
}
for (let t = stop + msPerHour; t < now;) {
  log(t, 0.02, 0.2)
  t += 60000 / ratePerMinute(t / msPerHour)
}
