interface ResponseJSON {
    trackingFound: boolean
    trackingNumber: string
    delivered: boolean
    originCountry: string
    destinationCountry: string
    track: [TrackChunkJSON]
}

interface TrackChunkJSON {
    desc: string
    status: string
    time: string
    timeZone: string
}

export { ResponseJSON, TrackChunkJSON }
