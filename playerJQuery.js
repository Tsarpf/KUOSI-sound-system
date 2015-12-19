var audio;
$(window).load(function(){
    audio = new Audio();
    playlist = $('#playlist');
    playlist.on('click', 'li', playSong);

audio.controls = true;
document.body.appendChild(audio);
});

function playSong(elem) {
    playlist.find('.current').removeClass('current');
    if(!elem) {
        elem = $(this);
    }
    elem.addClass('current');
    audio.src = elem.data('src');
    audio.play();
}

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function onSongListReady()
{
    var songs = buildSongArray();

    createListElements(songs); 


    var link;

    var vars = getUrlVars();
    for(var param in vars) {
        var name = vars[param];
        if(songs.indexOf(name) >= 0) {
            playLinkedSong(name);
        }
    }

}

function playLinkedSong(name) {
    var elem = $('li:contains("' + name + '")');
    playSong(elem);

}

var jotain;
function createListElements(songArray)
{
    jotain = songArray;
    for(var i = 0; i < songArray.length; i++)
    {
        $('ul').append('<li data-src="songs/' + songArray[i] + '"> ' + songArray[i] + ' </li>');
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



