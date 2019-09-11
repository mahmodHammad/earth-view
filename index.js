const availableDates='https://epic.gsfc.nasa.gov/api/natural/available?api_key=4sXteRBfA51qWHoLzWocOdu3DcXcW67b9LZjW0C6'

let image     =document.querySelector('.mimg')
let container =document.querySelector('.x')
let submit    =document.querySelector('#btn')
let minlat , maxlat, minlong, maxlong

submit.addEventListener('click',()=>{
     minlat    =document.querySelector('#minlat').value
     maxlat    =document.querySelector('#maxlat').value
     minlong   =document.querySelector('#minlong').value
     maxlong   =document.querySelector('#maxlong').value

     //more input validations must be writen later  
     if(minlat!='' &&maxlong!='' && minlong!=''&&maxlat!='')
        fetch(availableDates).then((f)=>f.json()).then((arrOfAllDates)=>dis12(arrOfAllDates))
})

function dis12(arr){
    for(let i=0  ;i< 900 ; i++)
        getJson(arr[i])       
}
   
function getJson (idate){     
    const earths=`https://epic.gsfc.nasa.gov/api/natural/date/${idate} api_key=4sXteRBfA51qWHoLzWocOdu3DcXcW67b9LZjW0C6`
        fetch(earths).then((f)=>f.json()).then((array)=> select(array))  
    }
    
function select(array){
    for(let i of array){

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX IM MUST MAKE THIS DAMN CONDITION VALID FOR NEGATIVE VALUES xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
       
        if(( i.centroid_coordinates.lat) <(maxlat)  && ( i.centroid_coordinates.lat)>( minlat)  
        && ( i.centroid_coordinates.lon) <(maxlong) && ( i.centroid_coordinates.lon)>( minlong) ){    
            playwithJson(i)   
        }
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//   console.log(array)
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