var socket;
var fileNamesString;
$(window).load(function(){
    socket = new WebSocket("ws://localhost:3614", "binary");

    socket.onmessage = function (evt) {
        var blob = evt.data;
        var reader = new FileReader();

        reader.addEventListener("loadend", function() {
            fileNamesString = reader.result;
            console.log(reader.result);
        });

        reader.readAsText(blob);
    }

    socket.onclose = function(){
        console.log("closed");
    };

    socket.onopen = function(){
        socket.send("Dis be a message yo");
        console.log("sent message");
    };
});
