let play = document.querySelector("#play")
let img = document.querySelector(".img__container");
let imgSrc = document.querySelector(".img__container >  img");
let audio = document.querySelector('audio');
let title = document.querySelector('#title');
let artist = document.querySelector('#artist');
let prev = document.querySelector('#prev');
let next = document.querySelector('#next');
let docTittle = document.title;
let isPlaying = false;
let progress_div = document.getElementById('progress_div');
let songIndex=0;

let songs=[
    {
        id:1,
        title:'kuch kuch hota h',
        artist:'udit narayan',
        cover:"kkhh",
        audio:"kkhh",
        ext:"png",
    },
    {
        id:2,
        title:'sandesha aate hain',
        artist:'sunny deol',
        cover:"sath",
        ext:"jpeg",
        audio:"sandese",
    },
]

// implementing play functionality 
play.addEventListener("click", (e) => {

       switch ( e.target.classList[1] ) {
           case "fa-play":
               songPlay()
               break;
            case "fa-pause":
               songPause()
               break;
           default:
               break;
       }
});



const songPlay = ( ) => {    
            // whey user click on play btn
            audio.play();
            isPlaying = true;
            play.classList.replace("fa-play", 'fa-pause');
            // add animate to img container
            img.classList.add("animate");
         
}
 const songPause = ( ) => {
                 // implementing pause functionality 
            // whey user click on pause btn
            audio.pause();
            isPlaying = false;
            play.classList.replace('fa-pause', "fa-play");
            // remove animate from img container
            img.classList.remove("animate");
 }


const loadSongData = (song) => {

    console.log(song);
    document.title=song.title+'.mp3';
    play.title= `you are listening ${song.title}.mp3  song`
    title.textContent=  song.title;
    artist.textContent=song.artist;
    imgSrc.src=  `./images/${song.cover}.${song.ext}`;
    audio.src= `./music/${song.audio}.mp3`;

}
const songNext = (params) => {
        songIndex= ( songIndex+1) % songs.length;    
         loadSongData(songs[songIndex]);
         songPlay();
     
}
loadSongData(songs[songIndex]);
next.addEventListener('click',songNext);



prev.addEventListener('click',(e) => {
    // (88-1+3)%3
    songIndex= ( songIndex -  1 +  songs.length) % songs.length;;
    loadSongData(songIndex[songIndex]);
    songPlay();

});



// audio time update

audio.addEventListener('timeupdate', (e) => {
    console.log(e);
    let {duration,currentTime,}= e.srcElement;
    if (duration) {
        let percent= ( currentTime/duration )*100; 
        var hrs = Math.floor(duration / 3600);
        var mins = Math.floor((duration % 3600) / 60);
        var secs = Math.floor(duration % 60);
                document.getElementById('duration').innerText=` ${mins} : ${secs}  `
        document.getElementById('progress').style.width=`${percent}%`;  

        
        /*
        currrent timestamp
        */ 
       var hrs = Math.floor(currentTime / 3600);
       var mins = Math.floor((currentTime % 3600) / 60);
       var secs = Math.floor(currentTime % 60);


          if ( secs <0) {
              secs= `0${secs}`
          }
          document.getElementById('current').innerText=` ${mins} : ${secs}  `

    } else {
        document.getElementById('duration').innerText=` 00 : 00 `
        
    }
    
  });


audio.addEventListener('ended',(e) => {
songNext()
})


progress_div.addEventListener('click', (e) => {
      console.log(e);   
      let offsetx= e.offsetX;
      let clientWidth = e.srcElement.clientWidth;
      let duration=audio.duration
      ;
      let current = (offsetx/clientWidth)* duration;
      audio.currentTime=current;
})