// State
let userMood = 'Neutral';
let userStory = '';
const moodScreen = document.getElementById('moodScreen');
const insightScreen = document.getElementById('insightScreen');
const spoonScreen = document.getElementById('spoonScreen');
const storyScreen = document.getElementById('storyScreen');
const quoteText = document.getElementById('quoteText');
const explanationText = document.getElementById('explanationText');
const guidanceText = document.getElementById('guidanceText');
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

// Mood-based responses
const moodResponses = {
  Happy: {
    quote: "Joy is your soul's sunlight.",
    explanation: "Happiness arises when your energy aligns with what nourishes your heart.",
    guidance: "Stir emotions gently in the Spoon and anchor gratitude in your story."
  },
  Sad: {
    quote: "Sadness is a river seeking release.",
    explanation: "Feeling sad signals your need to process loss or unmet expectations.",
    guidance: "Let the Spoon carry the weight of sadness and transform it into words."
  },
  Anxious: {
    quote: "Anxiety whispers lessons in disguise.",
    explanation: "Anxious feelings arise when your inner compass senses uncertainty.",
    guidance: "Use the Spoon to acknowledge anxious energy, then guide it into a calming mantra."
  },
  Neutral: {
    quote: "Quietude is fertile ground.",
    explanation: "Neutral moments allow your soul to reset and sense what truly matters.",
    guidance: "Observe your emotions in the Spoon without judgment, then craft a story of clarity."
  }
};

// Select mood
function selectMood(mood) {
  userMood = mood;
  playMoodSound(mood);
  const response = moodResponses[mood];
  quoteText.textContent = response.quote;
  explanationText.textContent = response.explanation;
  guidanceText.textContent = response.guidance;
  moodScreen.classList.remove('active');
  insightScreen.classList.add('active');
}

// Voice output
function speakInsight() {
  const msg = new SpeechSynthesisUtterance(`${quoteText.textContent}. ${explanationText.textContent}. ${guidanceText.textContent}`);
  msg.rate = 0.9; msg.pitch = 1.0;
  window.speechSynthesis.speak(msg);
}

// Navigation
function showSpoon() { insightScreen.classList.remove('active'); spoonScreen.classList.add('active'); playMoodSound('Spoon'); }
function showStory() { spoonScreen.classList.remove('active'); storyScreen.classList.add('active'); }

// Save story
function saveStory() { userStory = storyInput.value; alert("Your Soul Story is anchored. 🌟"); storyScreen.classList.remove('active'); moodScreen.classList.add('active'); storyInput.value = ''; }

// Voice input
function startVoiceInput() {
  if (!('webkitSpeechRecognition' in window)) { alert('Voice input not supported'); return; }
  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'en-US'; recognition.interimResults = true; recognition.continuous = false;
  recognition.onresult = event => storyInput.value = event.results[0][0].transcript;
  recognition.start();
}

// Play story
function speakStory() { const msg = new SpeechSynthesisUtterance(storyInput.value); msg.rate=0.9; msg.pitch=1.0; window.speechSynthesis.speak(msg); }

// Spoon drag interaction
spoonArea.addEventListener('dragover', e => e.preventDefault());
spoonArea.addEventListener('drop', e => {
  e.preventDefault();
  const data = e.dataTransfer.getData('text/plain');
  const particle = document.createElement('div');
  particle.className = 'particle'; particle.textContent = data;
  particle.style.left = `${Math.random()*80 +10}%`; particle.style.top = `${Math.random()*50 +20}%`;
  spoonScreen.appendChild(particle);
  setTimeout(()=>particle.remove(),1500);
  new Howl({src:['assets/sounds/stir.mp3'],volume:0.5}).play();
});
