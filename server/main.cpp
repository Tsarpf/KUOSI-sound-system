#include <string>
#include <iostream>
#include <sys/socket.h>
#include <netinet/in.h>
#include <errno.h>
#include <cstring>
#include <dirent.h>

std::string GetFileNamesString()
{
    DIR* dirStream;
    struct dirent* dir;

    //Todo: load paths like this from configuration file
    dirStream = opendir("/home/tsarpf/public_html/KUOSI-sound-system/songs/");


    std::string files = "";
    if(dirStream != NULL)
    {
        while(dir = readdir(dirStream))
        {
            files += dir->d_name;
            files += "\n";
        }
    }

    return files;
}

int main(int argc, char** argv)
{
    //Now that this stuff works, pls refactor it into
    //functions instead of having everything inside main...


    //construct
    sockaddr_in m_addr;
    memset(&m_addr, 0, sizeof(m_addr));

    int port = 3612;

    //create
    int m_sock = socket(AF_INET, SOCK_STREAM, 0);
    std::cout << "created socket" << std::endl;

    int on = 1;
    int err = setsockopt (m_sock, SOL_SOCKET, SO_REUSEADDR, &on, sizeof(on));

    std::cout << "setsockopt'd socket (err was " << err << ")" << std::endl;

    //bind

    m_addr.sin_family = AF_INET;
    m_addr.sin_addr.s_addr = INADDR_ANY;
    m_addr.sin_port = htons(port);

    //:: resolves scope, ie. forces to global namespace
    int bind_return = ::bind (m_sock, (struct sockaddr *) &m_addr, sizeof(m_addr));
    std::cout << "bind'd socket" << std::endl;


    //listen
    int maxConnections = 5;
    ::listen(m_sock, maxConnections);
    std::cout << "listening" << std::endl;


    //accept
    int addr_length = sizeof(m_addr);


    int maxLength = 500;
    char buf[maxLength + 1];
    memset(buf, 0, maxLength + 1);


    while(true)
    {
        std::cout << "waiting to accept" << std::endl;
        int newSocket = accept(m_sock, (sockaddr *) &m_addr, (socklen_t *) &addr_length);
        std::cout << "accepted" << std::endl;

        //while(true)
        //{            
        try
        {
            int status = ::recv(newSocket, &buf, maxLength, 0);
            if(status == -1)
            {
                std::cout << "Error number: " << errno
                    << " when tried to receive." << std::endl;
            }
            else if(status == 0)
            {
                std::cout << "Status was 0 when tried to receive" << std::endl;
            }
            else
            {
                std::cout << "Received: '" << buf << "'." << std::endl;
            }

            //filenames were enumerated at the start of main.
            std::string data = GetFileNamesString();
            ::send(newSocket, data.c_str(), data.size(), MSG_NOSIGNAL);
            std::cout << "sent: '" << data << "'" << std::endl;
        }
        catch(std::string&)
        {
            std::cout << "Socket closed" << std::endl;
        }
        //}
    }
}

