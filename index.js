const cron = require('node-cron')
const firebase = require ("firebase/app")
require('firebase/database')
const moment = require('moment')
const express = require('express')
const firebaseConfig =require('./firebase.config')

const app = express()
firebase.initializeApp(firebaseConfig)

let database = firebase.database()
cron.schedule('*/10 * * * * *', () => {
  database.ref('without')
    .once('value', (snapshot) => {
      const snapshotData = {}
      snapshot.forEach((child) => {
        snapshotData[child.key] = child.val()
      })
      if(true) {
        database.ref('without').update({count: snapshotData.count + 1}).then((resp) => console.log(resp))
      }
    })
})

const port = process.env.PORT || 8080

app.listen(port)
/*
const childKey = child.key
const childData = child.val()
if(childKey === 'start') {
  database.ref('without').update({count: 1}).then((resp) => console.log(resp))
}*/
