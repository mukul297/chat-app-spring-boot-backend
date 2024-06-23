var stompClient = null;
var username = document.getElementById('username');
function connect() {
    let socket = new SockJS("/server1")
    stompClient = Stomp.over(socket)
    stompClient.connect({}, function (frame) {
        console.log("Connected: " + frame);

        stompClient.subscribe("/topic/return-to", function (response) {
            showMessage(JSON.parse(response.body))
        })
    });
}

function showMessage(message) {
    const myDiv = document.getElementById('message-container');
    if (myDiv) {
        const newText = document.createTextNode(message.name + ':' + message.content);
        myDiv.appendChild(newText);
    } else {
        console.error("Element with id 'message-container' not found.");
    }

}

document.addEventListener('DOMContentLoaded', () => {
    // Find the button element by its ID
    const myButton = document.getElementById('login');
    const sendButton = document.getElementById('send-btn');
    const logOutButton = document.getElementById('logout-btn');

    function handleClick() {
        // Add text to the output div
        console.log(username.value)
        localStorage.setItem("name", username.value)
        connect();
    }

    function handleSend() {
        const message = document.getElementById('message-value');
        let jsonOb = {
            name : localStorage.getItem("name"),
            content : message.value
        }

        stompClient.send("/app/message", {}, JSON.stringify(jsonOb));
    }

    function handleLogout() {
        localStorage.removeItem("name");
        if(stompClient != null) {
            stompClient.disconnect();
        }
    }

    myButton.addEventListener('click', handleClick);
    sendButton.addEventListener('click', handleSend);
    logOutButton.addEventListener('click', handleLogout);
});