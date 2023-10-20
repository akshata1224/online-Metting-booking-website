import react from 'react'

export const InputStart=()=>{
    return(
        <div>
            <select name="from" id="from">
                <option value="1">1:00</option>
                <option value="2">2:00</option>
                <option value="3">3:00</option>
                <option value="4">4:00</option>
                <option value="5">5:00</option>
            </select>
        </div>
    )
}

export const InputEnd=()=>{
    const v = document.getElementById("from");
    console.log(v)
    return(
        <div>
            <select name="to" id="to">
                <option value="1">1</option>
                
            </select>
        </div>
    )
}