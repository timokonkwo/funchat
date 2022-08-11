// DOM queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMsg = document.querySelector('.update-msg');
const rooms = document.querySelector('.chatrooms');

// Add a new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();

    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err))

})

// Add a new name
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    // update name via chatroom
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    newNameForm.reset();
    // show then hide update message;
    updateMsg.innerText = `Name updated to ${newName}`;
    setTimeout(() => updateMsg.innerText = '', 3000)
});

// update the chatroom
rooms.addEventListener('click', e => {
    if (e.target.tagName === "BUTTON"){
        chatUI.clear();
        chatroom.updateRoom(e.target.id);

        // Get the chats and render
        chatroom.getChats(chat => {
        chatUI.render(chat);
        });
    }
})

// Check localstorage for username and room
const username = localStorage.username ? localStorage.username : 'Unknown';

const room = localStorage.room ? localStorage.room : 'general';
// Class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom(room, username);

// Get the chats and render
chatroom.getChats(data => {
    chatUI.render(data);
});