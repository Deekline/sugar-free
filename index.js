const cron = require('node-cron')
const firebase = require ("firebase/app")
require('firebase/database')
const moment = require('moment')
const express = require('express')
const firebaseConfig =require('./firebase.config')

const app = express()
firebase.initializeApp(firebaseConfig)

let database = firebase.database()
cron.schedule('* */3 * * *', () => {
  database.ref('without')
    .once('value', (snapshot) => {
      const snapshotData = {}
      snapshot.forEach((child) => {
        snapshotData[child.key] = child.val()
      })
      const startTime = moment(snapshotData.start)
      const today = moment().format('YYYY-MM-DD HH:mm:ss')
      const difference = startTime.diff(today, 'days')
      database.ref('without').update({count: Math.abs(difference)}).then((resp) => console.log(resp))
    })
})

const port = process.env.PORT || 8080

app.listen(port)
