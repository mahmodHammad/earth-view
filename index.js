const availableDates='https://epic.gsfc.nasa.gov/api/natural/available?api_key=4sXteRBfA51qWHoLzWocOdu3DcXcW67b9LZjW0C6'

let image=document.querySelector('.mimg')
let container =document.querySelector('.x')

fetch(availableDates).then((f)=>f.json()).then((arrOfAllDates)=>dis12(arrOfAllDates))

function dis12(arr){
    for(let i=0  ;i< arr.length ; i++)
        getJson(arr[i])       
}
   
function getJson (idate){     
    const earths=`https://epic.gsfc.nasa.gov/api/natural/date/${idate} api_key=4sXteRBfA51qWHoLzWocOdu3DcXcW67b9LZjW0C6`
        fetch(earths).then((f)=>f.json()).then((array)=> select(array))  
    }
    
function select(array){
    for(let i of array){
        if(i.centroid_coordinates.lat<25&&i.centroid_coordinates.lat>14 
        &&i.centroid_coordinates.lon<22 &&i.centroid_coordinates.lon>15 ){
            playwithJson(i)   
        }
    }
}

function playwithJson(earth){
    let newh1= document.createElement("h1")
    newh1.innerHTML='Token at :'+fixdate(earth.date)
    container.appendChild(newh1)

    let modifiedDate=fixdate(earth.date)        
    let source= `https://epic.gsfc.nasa.gov/archive/natural/${modifiedDate}/png/${earth.image}.png`  
    let newImg= document.createElement("img")
    
    newImg.setAttribute('src' ,source )
    container.appendChild(newImg)
}

function fixdate(inpdate){
    return inpdate.substr( 0,inpdate.indexOf(' ')).replace(/-/g , '/')    
}    