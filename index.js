alert('use google to know the lat and log of the place you want to see , then enter it as range in min ,max ')
let image     =document.querySelector('.mimg')
let container =document.querySelector('.x')
let submit    =document.querySelector('#btn')
let form      =document.querySelector('.signupSection')
let minlat , maxlat, minlong, maxlong

/*
return true only when :
    all data entered
    min < max 
    range from -180 to 180
*/
function validate(minlat, maxlong , minlat ,maxlat){
    if(Number.isFinite( minlat)  &&  Number.isFinite( maxlong)  &&  Number.isFinite(minlong)  &&  Number.isFinite( maxlat) ){   
        if(minlat >maxlat || minlong>maxlong){
            alert('min value can not be bigger then this damn max value')
            return false
        }
        else{
            if(minlat<-180 ||maxlong>180 ||minlong<-180 ||maxlong>180){
                alert('values ranged only from -180 ')
                return false
            }
            else {
                return true
            }
        }
    }
    else{
        alert('please fill all this fucken fields with numbers')
        return false
    }
}

submit.addEventListener('click',()=>{
     minlat    =parseFloat( document.querySelector('#minlat' ).value)
     maxlat    =parseFloat( document.querySelector('#maxlat' ).value)
     minlong   =parseFloat( document.querySelector('#minlong').value)
     maxlong   =parseFloat( document.querySelector('#maxlong').value)

     if(validate(minlat , maxlong , minlat , maxlat))
        run()
})

function run(){
    alert('please be patient till data loaded form nasa api :) ')
    form.remove()
    const availableDates='https://epic.gsfc.nasa.gov/api/natural/available?api_key=4sXteRBfA51qWHoLzWocOdu3DcXcW67b9LZjW0C6'
    fetch(availableDates).then((f)=>f.json()).then((arrOfAllDates)=>passSomeDates(arrOfAllDates))
}

function passSomeDates(arr){
    for(let i=0  ;i< arr.length ; i++)
        getJson(arr[i])       
}
   
function getJson (idate){     
    const earths=`https://epic.gsfc.nasa.gov/api/natural/date/${idate} api_key=4sXteRBfA51qWHoLzWocOdu3DcXcW67b9LZjW0C6`
    fetch(earths).then((f)=>f.json()).then((array)=> select(array))  
}
    
function select(array){
    for(let i of array){       
        if(( i.centroid_coordinates.lat) <(maxlat)  && ( i.centroid_coordinates.lat)>( minlat)  
        && ( i.centroid_coordinates.lon) <(maxlong) && ( i.centroid_coordinates.lon)>( minlong) ){    
            playwithJson(i)   
        }
    }
}

function playwithJson(earth){
    let newh1= document.createElement("h1")
    newh1.innerHTML='Token at :'+fixdate(earth.date)
    newh1.classList.add('head')
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