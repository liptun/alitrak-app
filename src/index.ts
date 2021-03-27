import express from 'express'
import Cainiao from './utils/Cainiao'

import './mongoose'


const app = express()
const port: number = 3333

app.get('/track/:no', (req, res) => {
    const tracker = new Cainiao()
    const trackingNumber = req.params.no
    console.log(`tracking request for: ${trackingNumber}`)

    tracker
        .get(trackingNumber)
        .then((trackingData: string) => {
            res.send(trackingData)
            console.log(`tracking request for: ${trackingNumber} succesed`)
        })
        .catch((e: any) => {
            res.statusCode = 400
            res.json({ error: e.message })
            console.log(`tracking request for: ${trackingNumber} failed`)
        })
})

app.get('*', (_, res) => {
    res.statusCode = 404
    res.json({ title: 'Alitrak', message: "Route don't exist" })
})

app.listen(port, () => {
    return console.log(`Server is listening ${port}`)
})
