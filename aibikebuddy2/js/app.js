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
  var siteContext = "You are chat bot assistant on bike-themed site. we sell 3 types of bikes: electric 'City Spark', city 'Road Bike' and forest 'Forest Explorer'. We have special plan for students that provides 10% discount. We ship to every country for 100$. You need to answer the question and provide maxium information in 2-3 sentences. based on given information"

  // Set up the OpenAI API request
  
  const url = 'https://api.openai.com/v1/chat/completions';
  const data = {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: siteContext }, 
      { role: 'user', content: userInput }
  ],
    max_tokens: 500,
    temperature: 0.5,
  };
  const jsonData = JSON.stringify(data);
  console.log('API request:', url, data);

  // Make the OpenAI API request
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ',
    },
    body: jsonData,
  })
 .then(response => {
    console.log('API response:', response);
    return response.json();
  })
 .then(data => {
    console.log('API response data:', data);
    const chatbotResponse = data.choices[0].message.content;
    chatDisplay.innerHTML += "<p><strong>Chatbot:</strong> " + chatbotResponse + "</p>";

  // Clear user input field
  document.getElementById('user-input').value = "";

  // Scroll to the bottom of the chat display
  chatDisplay.scrollTop = chatDisplay.scrollHeight;
})
}
var audio = document.getElementById("myAudio");

function playAudio() {
  audio.play();
}

function pauseAudio() {
  audio.pause();
}
function saveData() {
  const name = document.getElementById('nameInput').value;
  const email = document.getElementById('emailInput').value;
  const review = document.getElementById('reviewInput').value;

  const data = { name, email, review };

  fetch('http://localhost:3000/data', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Error storing data');
      }
      return response.text();
  })
  .then(message => {
      console.log(message); // Log success message
      // Optionally, display a success message to the user
  })
  .catch(error => {
      console.error('Error:', error);
      // Optionally, display an error message to the user
  });
}
