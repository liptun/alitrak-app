import express from 'express'

const app = express()
const port: number = 3333

app.get('/', (req, res) => {
    res.json({ message: 'Hello, World!' })
})

app.listen(port, () => {
    return console.log(`Server is listening ${port}`)
})
