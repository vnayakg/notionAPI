const lec_el = document.querySelector('#lectures')
const loading_el = document.querySelector('#loading')

let loading = false
const getLectures = async () =>{
    loading = true;
    const res = await fetch('http://localhost:3000/lectures')
    const data = await res.json()
    loading = false;
    return data;
}

const getTime = (st) =>{
     return st.substring(st.indexOf('T')+1, st.indexOf('.'))
}

const addLectures = async ()=>{
    const lectures = await getLectures();
    if(!loading){
        loading_el.innerHTML = ''
    }

    lectures.forEach(lecture=> {
        const date = lecture.startDate.split("T")[0];
        
        const div = document.createElement('div')
        div.className = 'lecture'
        div.innerHTML = `
        <h3>${lecture.name}</h3>
        <h5>Date: ${date}</h5>
        <h5>Start Time: ${getTime(lecture.startDate)}</h5>
        <h5>End Time: ${getTime(lecture.endDate)}</h5>
        <h5>Subject: ${lecture.subject}</h5>
        `
        lec_el.appendChild(div)
    })
    console.log(lectures)
}

addLectures();
