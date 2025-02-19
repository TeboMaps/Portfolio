(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })
})();

//download Curriculum vitae method
function downloadResume(){
    const resumePath = "/Resume/Tebogo maphatsoe cv (1).pdf";
    const link = document.createElement("a");
    link.href = resumePath;
    link.download = "TebogoMaphatsoe_Resume.pdf";
    document.body.appendChild(link);

    fetch(resumePath)
    .then(function(response){
      if (!response.ok) {
        throw new Error("File not found 🤷‍♀️!")
      }
      link.click();
      alert("File downloading...👍")

    })
    .catch(function(error){
       alert("Resume file not found 🤦!");
       console.error(error);
    })
    .finally(function(){
        document.body.removeChild(link);
    });

}

//chatbot
const API_KEY = 'API KEY'; 
// Replace with your actual Gemini API key – this stores the API key to authenticate requests to the Gemini API.

const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');


function cleanMarkdown(text) {
    return text
        .replace(/#{1,6}\s?/g, '') // Remove headers
        .replace(/\*\*/g, '') // Remove bold
        .replace(/\n{3,}/g, '\n\n') // Limit newlines
        .trim(); // Trim whitespace
}

function addMessage(message, isUser) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', isUser ? 'user-message' : 'bot-message');

    const profileImage = document.createElement('img');
    profileImage.classList.add('profile-image');
    profileImage.src = isUser ? '/Images/me.jpg' : '/Images/bot.jpg';
    profileImage.alt = isUser ? 'User' : 'Bot';

    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.textContent = message;

    messageElement.appendChild(profileImage);
    messageElement.appendChild(messageContent);
    chatMessages.appendChild(messageElement);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function handleUserInput() {
    const userMessage = userInput.value.trim();

    if (userMessage) {
        addMessage(userMessage, true);
        userInput.value = '';
        sendButton.disabled = true;
        userInput.disabled = true;

        try {
            const botMessage = await generateResponse(userMessage);
            addMessage(cleanMarkdown(botMessage), false);
        } catch (error) {
            console.error('Error:', error);
            addMessage('Sorry, I encountered an error. Please try again.', false);
        } finally {
            sendButton.disabled = false;
            userInput.disabled = false;
            userInput.focus();
        }
    }
}

sendButton.addEventListener('click', handleUserInput);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleUserInput();
    }
});