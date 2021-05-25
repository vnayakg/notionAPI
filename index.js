const getLectures = require('./services/notion')
const express = require('express')
const PORT = process.env.PORT || 3000;

const app = express()

app.use(express.static('public'))

app.get('/lectures', async(req, res)=>{
    const lectures = await getLectures();
    res.json(lectures)
})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})

// ;(async ()=>{
//     const lec = await getLectures();
//     console.log(lec);
// })()

