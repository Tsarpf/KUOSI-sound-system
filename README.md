An exercise in how to make simple stuff difficult.


The client-side javascript music player needs a list of filenames so it can create a playlist or something. So the server needs to supply the client with the filenames.

I decided that coding a nodejs server for the task would be too trivial so I made a C++ server that uses normal TCP sockets for communication. A problem arose that javascript can't handle "pure TCP" but it does support the WebSocket protocol.

I solved the problem by using websockify which works as a converter between the two. Now the C++ server can send and receive everything in TCP, and client-side javascript can send&receive everything conforming to the WebSocket protocol.

Yay.
