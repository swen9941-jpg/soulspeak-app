// Ambient sounds setup
const sounds = {
  Happy: new Howl({ src: ['assets/sounds/happy-loop.mp3'], loop: true, volume: 0.3 }),
  Sad: new Howl({ src: ['assets/sounds/sad-loop.mp3'], loop: true, volume: 0.3 }),
  Anxious: new Howl({ src: ['assets/sounds/anxious-loop.mp3'], loop: true, volume: 0.3 }),
  Neutral: new Howl({ src: ['assets/sounds/neutral-loop.mp3'], loop: true, volume: 0.2 }),
  Spoon: new Howl({ src: ['assets/sounds/spoon-loop.mp3'], loop: true, volume: 0.2 })
};

// Play sound by mood
function playMoodSound(mood) {
  stopAllSounds();
  if (sounds[mood]) sounds[mood].play();
}

function stopAllSounds() {
  Object.values(sounds).forEach(sound => sound.stop());
}

// Update mood selection to play ambient sound
function selectMood(mood) {
  userMood = mood;
  playMoodSound(mood);
  showInsight();
}

// Play Spoon ambient when entering Spoon screen
function showSpoon() {
  insightScreen.classList.remove('active');
  spoonScreen.classList.add('active');
  playMoodSound('Spoon');
}
