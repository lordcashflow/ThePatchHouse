
let currentSlide = 0;
const slides = document.querySelectorAll('#slider .slide');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Change slide every 3 seconds
setInterval(nextSlide, 3000);

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}))

document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('.nav-link');

    links.forEach(link => {
        link.addEventListener('click', function() {
            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

const chatIcon = document.getElementById('chat-icon');
const chatBox = document.getElementById('chat-box');
const closeChat = document.getElementById('close-chat');
const sendBtn = document.getElementById('send-btn');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

// Load saved messages on load
window.addEventListener('load', () => {
    const savedChats = JSON.parse(localStorage.getItem('chatMessages')) || [];
    savedChats.forEach(msg => addMessageToChat(msg.text, msg.sender));
    scrollToBottom();
});

// Open chat
chatIcon.addEventListener('click', function() {
    chatBox.classList.add('active');
});

// Close chat
closeChat.addEventListener('click', function() {
    chatBox.classList.remove('active');
});

// Send message
sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const text = chatInput.value.trim();
    if (text === '') return;
    addMessageToChat(text, 'user');
    saveMessage(text, 'user');
    chatInput.value = '';

    // Simulate auto-response after 1s
    setTimeout(() => {
        const response = generateAutoResponse(text);
        addMessageToChat(response, 'bot');
        saveMessage(response, 'bot');
        scrollToBottom();
    }, 1000);

    scrollToBottom();
}

// Add message to chat box
function addMessageToChat(text, sender) {
    const msg = document.createElement('div');
    msg.textContent = text;
    msg.style.margin = '5px 0';
    msg.style.padding = '8px 12px';
    msg.style.borderRadius = '15px';
    msg.style.maxWidth = '80%';
    msg.style.wordWrap = 'break-word';

    if (sender === 'user') {
        msg.style.background = '#DE8900';
        msg.style.color = 'white';
        msg.style.alignSelf = 'flex-end';
        msg.style.marginLeft = 'auto';
    } else {
        msg.style.background = '#f1f0f0';
        msg.style.color = 'black';
        msg.style.alignSelf = 'flex-start';
        msg.style.marginRight = 'auto';
    }

    chatMessages.appendChild(msg);
}

// Auto-response generator
function generateAutoResponse(userText) {
    userText = userText.toLowerCase();
    if (userText.includes('hello') || userText.includes('hi')) {
        return 'Hi there! How can we assist you today?';
    } else if (userText.includes('price') || userText.includes('cost')) {
        return 'Our pricing depends on the service you need. Please specify your request.';
    } else if (userText.includes('thanks') || userText.includes('thank you')) {
        return 'You\'re welcome! Let us know if you need anything else.';
    } else {
        return 'Thank you for your message. We will get back to you shortly. Subscribe to our Newsletter for more updates';
    }
}

// Save messages to localStorage
function saveMessage(text, sender) {
    const chats = JSON.parse(localStorage.getItem('chatMessages')) || [];
    chats.push({ text, sender });
    localStorage.setItem('chatMessages', JSON.stringify(chats));
}

// Scroll to bottom
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
