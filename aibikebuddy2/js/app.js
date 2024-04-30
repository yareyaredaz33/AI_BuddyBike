// script.js

document.addEventListener("DOMContentLoaded", function() {
  var chatToggle = document.getElementById('chat-toggle');
  var chatContainer = document.getElementById('chat-container');
  var userInput = document.getElementById('user-input');
  chatToggle.addEventListener('click', function() {
    if (chatContainer.style.display === "none" || !chatContainer.style.display) {
      chatContainer.style.display = "block";
    } else {
      chatContainer.style.display = "none";
    }
  });

  userInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });
  // Add event listener to the send button
  var sendButton = document.getElementById('send-button');
  sendButton.addEventListener('click', sendMessage);
});

function sendMessage() {
  var userInput = document.getElementById('user-input').value;
  var chatDisplay = document.getElementById('chat-display');

  // Display user message
  chatDisplay.innerHTML += "<p><strong>You:</strong> " + userInput + "</p>";

  // Dummy response for testing
  var dummyResponse = "This is a dummy response. Replace it with the actual response from GPT-3.";

  // Display response from GPT-3
  chatDisplay.innerHTML += "<p><strong>Chatbot:</strong> " + dummyResponse + "</p>";

  // Clear user input field
  document.getElementById('user-input').value = "";

  // Scroll to the bottom of the chat display
  chatDisplay.scrollTop = chatDisplay.scrollHeight;
}
var audio = document.getElementById("myAudio");

function playAudio() {
  audio.play();
}

function pauseAudio() {
  audio.pause();
}
