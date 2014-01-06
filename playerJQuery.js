$(window).load(function(){
var audio    = new Audio();

    playlist = $('#playlist');

    playlist.on('click', 'li', function() {
        playlist.find('.current').removeClass('current');
        $(this).addClass('current');
        audio.src = $(this).data('src');
        audio.play();
    });

audio.controls = true;
document.body.appendChild(audio);
});

function onSongListReady()
{
    console.log("penis");
    var songs = buildSongArray();
    console.log("penis");

    createListElements(songs); 
    console.log("penis");
}

var jotain;
function createListElements(songArray)
{
    console.log("penis");
    jotain = songArray;
    for(var i = 0; i < songArray.length; i++)
    {
        console.log("penis");
        $('ul').append('<li data-src="songs/' + songArray[i] + '"> ' + songArray[i] + ' </li>');
        console.log("tys");
    }


}

var fileNamesString; //populated in findFileNames.js
function buildSongArray()
{
    var songArray = fileNamesString.split("\n");
    
    var songArrayCleaned = [];
    for(var i = 0; i < songArray.length; i++)
    {
        if(songArray[i].toString().length >= 4) //ie. filename has something else than a dot and a file extension (".mp3")
        {
            songArrayCleaned.push(songArray[i]);
        }
    }

    return songArrayCleaned;
}



