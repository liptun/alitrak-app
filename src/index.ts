import express from 'express'
import Cainiao from './utils/Cainiao'

const app = express()
const port: number = 3333

app.get('/track/:no', (req, res) => {
    const tracker = new Cainiao()
    const trackingNumber = req.params.no
    tracker
        .get(trackingNumber)
        .then((trackingData: string) => {
            res.send(trackingData)
        })
        .catch((e: any) => {
            res.statusCode = 400
            res.json({ error: e.message })
        })
})

app.get('*', (_, res) => {
    res.statusCode = 404
    res.json({ title: 'Alitrak', message: "Route don't exist" })
})

app.listen(port, () => {
    return console.log(`Server is listening ${port}`)
})
