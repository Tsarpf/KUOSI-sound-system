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
