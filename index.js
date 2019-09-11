//https://api.nasa.gov/planetary/apod?api_key=4sXteRBfA51qWHoLzWocOdu3DcXcW67b9LZjW0C6
//https://api.nasa.gov/planetary/earth/imagery/?lon=100.75&lat=1.5&date=2014-02-01&cloud_score=True&api_key=4sXteRBfA51qWHoLzWocOdu3DcXcW67b9LZjW0C6
//29.9773° N, 31.1325° E

//https://epic.gsfc.nasa.gov/api/natural?api_key=4sXteRBfA51qWHoLzWocOdu3DcXcW67b9LZjW0C6

//https://epic.gsfc.nasa.gov/archive/natural/2019/06/27/png/epic_1b_20190627131403.png
//"epic_1b_20190627 074644"

//let url2='https://api.nasa.gov/planetary/apod?api_key=4sXteRBfA51qWHoLzWocOdu3DcXcW67b9LZjW0C6'

// console.log( image)

//let url='https://api.nasa.gov/planetary/earth/imagery/?lon=31.1325&lat=29.9773&date=2014-02-01&cloud_score=True&api_key=4sXteRBfA51qWHoLzWocOdu3DcXcW67b9LZjW0C6'
// fetch(url).then((f)=>f.json()).then((s)=>{
    //     image.setAttribute('src' ,s.url )
    
    // })
    // image.setAttribute('src' ,source )
    
    
    // console.log( image)
    let url3='https://epic.gsfc.nasa.gov/api/natural?api_key=4sXteRBfA51qWHoLzWocOdu3DcXcW67b9LZjW0C6'
    let image=document.querySelector('.mimg')
    let cont =document.querySelector('.x')
    
    
    fetch(url3).then((f)=>f.json()).then((earths)=>{
        // console.table(s)
        for(let earth of earths){
            console.log(earth) 

            let unresDate=earth.date
            let nstr=unresDate.substr( 0,unresDate.indexOf(' ')).replace(/-/g , '/')    
            //to convert date from(year-month-day houre) to (year/month/day) ;to be used in the url of image     
            let sou= `https://epic.gsfc.nasa.gov/archive/natural/${nstr}/png/${earth.image}.png`  
            let newImg= document.createElement("img")
            newImg.setAttribute('src' ,sou )
            cont.appendChild(newImg)
        }

})
