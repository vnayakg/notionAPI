const dotenv = require('dotenv').config()
const {Client} = require('@notionhq/client')

// client initialization

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})

const database_id = process.env.NOTION_DATABASE_ID

module.exports = async function getLectures(){
    const payload = {
        path : `databases/${database_id}/query`,
        method : 'POST',
    }

    const {results} = await notion.request(payload)

    const lectures = results.map(page => {
        //console.log(page.properties.Date.date.start.split("T",2))
        return {
            id: page.id,
            name: page.properties.Name.title[0].plain_text,
            startDate: page.properties.Date.date.start,
            endDate: page.properties.Date.date.end,
            subject: page.properties.Subject.multi_select[0].name,

        }
    })
    return lectures;
}
