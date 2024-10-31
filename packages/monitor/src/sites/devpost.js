import instance from '../utils/instance.js';
import sendWebhook from '../utils/webhook.js';
import sleep from '../utils/sleep.js';

const fetchHackathons = async() => {
    const url = 'https://devpost.com/api/hackathons?order_by=recently-added'
    try {
        const res = await instance.get(url)
        return res.data.hackathons
    } catch (e) {
        console.log(e)
    }
}

export default {
    execute: async () => {
        console.log("starting devpost monitor")

        let previousHackathons = await fetchHackathons()

        while (true) {
            const currentHackathons = await fetchHackathons()
            for (const c of currentHackathons) {
                if (previousHackathons.find(p => p.id == c.id) == undefined) {
                    console.log("new hackathon found")
                    sendWebhook(c)
                }
            }
            previousHackathons = [...currentHackathons]
            await sleep(5000)
        }
    }
}
