import https from 'https'
import axios from 'axios'
import { parse as htmlParser } from 'node-html-parser'

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
                const parsedData = JSON.parse(rawData)
                resolve(parsedData)
            } catch (e) {
                reject(e)
            }
        })
    }
}

export default Cainiao
