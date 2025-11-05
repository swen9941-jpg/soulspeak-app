// State
let userMood = 'Neutral';
let userStory = '';
const moodScreen = document.getElementById('moodScreen');
const insightScreen = document.getElementById('insightScreen');
const spoonScreen = document.getElementById('spoonScreen');
const storyScreen = document.getElementById('storyScreen');
const insightText = document.getElementById('insightText');
const storyInput = document.getElementById('storyInput');
const spoonArea = document.getElementById('spoonArea');

// Ambient Sounds
const sounds = {
  Happy: new Howl({ src: ['assets/sounds/happy-loop.mp3'], loop: true, volume: 0.3 }),
  Sad: new Howl({ src: ['assets/sounds/sad-loop.mp3'], loop: true, volume: 0.3 }),
  Anxious: new Howl({ src: ['assets/sounds/anxious-loop.mp3'], loop: true, volume: 0.3 }),
  Neutral: new Howl({ src: ['assets/sounds/neutral-loop.mp3'], loop: true, volume: 0.2 }),
  Spoon: new Howl({ src: ['assets/sounds/spoon-loop.mp3'], loop: true, volume: 0.2 })
};

function stopAllSounds() { Object.values(sounds).forEach(sound => sound.stop()); }
function playMoodSound(mood) { stopAllSounds(); if (sounds[mood]) sounds[mood].play(); }

// Mood selection
function selectMood(mood) {
  userMood = mood;
  playMoodSound(mood);
  showInsight();
}

// Show AI Insight
function showInsight() {
  moodScreen.classList.remove('active');
  insightScreen.classList.add('active');
  const messages = {
    Happy: "Your joy is a light. Let it guide your day.",
    Sad: "Your sadness is a river. Flow with it, release it.",
    Anxious: "Your anxious instinct is a signal, not a sentence. Let it speak, then let it go.",
    Neutral: "Your soul waits in quiet. Listen closely."
  };
  insightText.textContent = messages[userMood] || messages.Neutral;
}

// Voice output
function speakInsight() {
  const msg = new SpeechSynthesisUtterance(insightText.textContent);
  msg.rate = 0.9; msg.pitch = 1.0;
  window.speechSynthesis.speak(msg);
}

// Navigation
function showSpoon() { insightScreen.classList.remove('active'); spoonScreen.classList.add('active'); playMoodSound('Spoon'); }
function showStory() { spoonScreen.classList.remove('active'); storyScreen.classList.add('active'); }

// Save story
function saveStory() {
  userStory = storyInput.value;
  alert("Your Soul Story is anchored. 🌟");
  storyScreen.classList.remove('active'); moodScreen.classList.add('active'); storyInput.value = '';
}

// Voice input for story
function startVoiceInput() {
  if (!('webkitSpeechRecognition' in window)) { alert('Voice input not supported in this browser.'); return; }
  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'en-US'; recognition.interimResults = true; recognition.continuous = false;
  recognition.onresult = event => storyInput.value = event.results[0][0].transcript;
  recognition.start();
}

// Play story with voice
function speakStory() {
  const msg = new SpeechSynthesisUtterance(storyInput.value);
  msg.rate = 0.9; msg.pitch = 1.0;
  window.speechSynthesis.speak(msg);
}

// Spoon drag interaction
spoonArea.addEventListener('dragover', e => e.preventDefault());
spoonArea.addEventListener('drop', e => {
  e.preventDefault();
  const data = e.dataTransfer.getData('text/plain');
  const particle = document.createElement('div');
  particle.className = 'particle'; particle.textContent = data;
  particle.style.left = `${Math.random() * 80 + 10}%`;
  particle.style.top = `${Math.random() * 50 + 20}%`;
  spoonScreen.appendChild(particle);
  setTimeout(() => particle.remove(), 1500);
  new Howl({ src: ['assets/sounds/stir.mp3'], volume: 0.5 }).play();
});
