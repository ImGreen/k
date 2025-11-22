let userName = "";

// Registration → Profile
document.getElementById("registrationForm").addEventListener("submit", e => {
  e.preventDefault();
  const dobValue = document.getElementById("dob").value;
  const dob = new Date(dobValue);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  if (age < 16) { alert("You must be at least 16 years old to register."); return; }

  userName = document.getElementById("firstName").value || "You";

  document.getElementById("registrationPopup").classList.remove("active");
  document.getElementById("profilePopup").classList.add("active");
});

// Profile → Chat
document.getElementById("profileForm").addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("profilePopup").classList.remove("active");
  const chatUI = document.getElementById("chatUI");
  chatUI.classList.remove("hidden");
  chatUI.classList.remove("blur"); 
  startWebcam();
});

// Dark/Light Mode
document.getElementById("modeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const btn = document.getElementById("modeToggle");
  btn.textContent = document.body.classList.contains("dark-mode") ? "🌙" : "☀️";
});

// Icebreakers
const icebreakers = [
  "What inspired your major?",
  "What project are you most proud of?",
  "What's your dream internship?",
  "Which class has been your favorite?",
  "What career are you aiming for long-term?"
];
function showIcebreaker() {
  alert(icebreakers[Math.floor(Math.random() * icebreakers.length)]);
}

// Chat Logic
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const messagesDiv = document.getElementById("messages");

function sendMessage(isPartner=false) {
  const text = chatInput.value.trim();
  if (!text) return;
  const msgDiv = document.createElement("div");
  const nameClass = isPartner ? 'partner' : 'you';
  const nameText = isPartner ? 'Partner' : userName;
  msgDiv.innerHTML = `<span class="name ${nameClass}">${nameText}:</span> <span class="message">${text}</span>`;
  messagesDiv.appendChild(msgDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
  if (!isPartner) chatInput.value = "";
}

sendBtn.addEventListener("click", () => sendMessage(false));
chatInput.addEventListener("keydown", e => {
  if(e.key==="Enter"){ e.preventDefault(); sendMessage(false); }
});

// Chat Controls
function startChat(){ alert("Starting chat..."); }
function stopChat(){
  alert("Chat stopped.");
  messagesDiv.innerHTML = "";
  chatInput.value = "";
  const partnerInfo = document.getElementById("partnerInfo");
  partnerInfo.innerHTML = "";
  document.getElementById("remoteVideo").src = "";
}
function connect(){
  const partnerInfo = document.getElementById("partnerInfo");
  partnerInfo.innerHTML = `<strong>Name:</strong> Sean<br><strong>Year:</strong> Freshman<br><strong>Major:</strong> Finance<br><img src="https://s6.ezgif.com/tmp/ezgif-6e1bca399ff27eaa.webp" alt="Partner GIF" style="width:100%; margin-top:8px; border-radius:8px;">`;
  alert("Connected!");
}
function disconnect(){
  document.getElementById("partnerInfo").innerHTML = "";
  alert("Disconnected.");
}

// Webcam
async function startWebcam() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    const localVideo = document.getElementById("localVideo");
    localVideo.srcObject = stream;
    localVideo.play();
  } catch (err) {
    console.error("Error accessing webcam: ", err);
    alert("Unable to access webcam. Please check permissions.");
  }
}
