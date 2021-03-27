import https from 'https'
import axios from 'axios'
import { parse as htmlParser } from 'node-html-parser'
import { ResponseJSON, TrackChunkJSON } from './Response.interface'

class Cainiao {
    httpsAgent: https.Agent = null
    constructor() {
        this.httpsAgent = new https.Agent({ keepAlive: true })
    }
    get(trackingNumber: string) {
        return new Promise((resolve, reject) => {
            const url = `https://global.cainiao.com/detail.htm?mailNoList=${trackingNumber}`
            axios
                .get(url, {
                    httpsAgent: this.httpsAgent,
                })
                .then((res) => {
                    this.parse(res.data)
                        .then((jsonData) => {
                            resolve(jsonData)
                        })
                        .catch((e) => {
                            reject(e)
                        })
                })
                .catch((e) => {
                    reject(e)
                })
        })
    }
    parse(data: string) {
        return new Promise((resolve, reject) => {
            const dom = htmlParser(data)
            const rawData = dom
                .querySelector('#waybill_list_val_box')
                .innerHTML.replace(/&quot;/g, '"')
            try {
                const parsedJson = JSON.parse(rawData)
                const parsedData = parsedJson.data[0]
                const {
                    mailNo,
                    status,
                    originCountry,
                    destCountry,
                } = parsedData
                const { detailList } = parsedData.section2

                const outputJson: ResponseJSON = {
                    trackingFound: detailList.length > 0,
                    trackingNumber: mailNo,
                    delivered: Array('CWS_SIGNIN', 'SIGNIN').includes(status),
                    originCountry: originCountry || null,
                    destinationCountry: destCountry || null,
                    track: detailList.map((chunk: TrackChunkJSON) => ({
                        desc: chunk.desc,
                        status: chunk.status,
                        time: chunk.time,
                        timeZone: chunk.timeZone,
                    })),
                }

                resolve(outputJson)
            } catch (e) {
                reject(e)
            }
        })
    }
}

export default Cainiao
