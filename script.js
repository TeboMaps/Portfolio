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
const chatWindow = document.getElementById('chat-messages-left');
const inputField = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
 
sendButton.addEventListener('click', sendMessage);
inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
 
function sendMessage() {
    const message = inputField.value.trim();
    if (message === '') return;
 
    appendMessage('user', message);
    inputField.value = '';
 
    setTimeout(() => {
        const response = getBotResponse(message);
        appendMessage('bot', response);
    }, 1000);
}


function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
   
 
    
}
 
function getBotResponse(userMessage) {
    const botData = {
        name: "Tebogo Maphatsoe",
        birthdate: "September 28, 1993",
        education: "NQF Level 5 in Software Engineering ,JIET(Johannesburg Institute of Engineering and Technology)",
        skills: "C#, C++, SQL, Java, HTML5, CSS, JavaScript, Java, SceneBuilder, Database Design and Management, Git",
        work: "Information Technology Hardware Technician at Digital Generation (March 2018 - Feb 2019) ,Full Stack Development at Capaciti UVU Africa (Dec 2024- Present) ",
        hobbies: "Cooking and reading",
        contact: "tebogo.maphatsoe@yahoo.com| GitHub: https://github.com/TeboMaps | LinkedIn: https://www.linkedin.com/in/tebogo-maphatsoe-5bb223151/"
    };
 
    if (matches(userMessage, ["hi", "hello", "hy"])) return `Hi, My name is ${botData.name}, how may I help you?.`;
    if (matches(userMessage, ["your name", "who are you"])) return `My name is ${botData.name}.`;
    if (matches(userMessage, ["your age", "how old are you"])) return `I was born on ${botData.birthdate}, so you can do the math!`;
    if (matches(userMessage, ["your education", "where did you study", "where did you go to school"])) return `I studied at ${botData.education}.`;
    if (matches(userMessage, ["your skills", "what are you good at", "what can you do"])) return `I have experience with ${botData.skills}.`;
    if (matches(userMessage, ["your work", "where do you work", "what do you do"])) return `Currently, I work in ${botData.work}.`;
    if (matches(userMessage, ["your hobbies", "what do you like", "what do you do for fun"])) return `I enjoy ${botData.hobbies}.`;
    if (matches(userMessage, ["your contact", "how can I reach you", "give me your email"])) return `Here’s how you can reach me: ${botData.contact}.`;
 
    return "I’m not sure how to answer that. Ask me about my name, education, skills, work, hobbies, or contact info!";
}
 
function matches(input, keywords) {
    return keywords.some(keyword => input.toLowerCase().includes(keyword));
}
 
// Initial chatbot message
setTimeout(() => {
    appendMessage('bot', 'Hey there! 👋 I am TeeBot, your virtual assistant. How can I help you today?');
}, 500);
 