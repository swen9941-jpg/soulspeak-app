// State
let userMood = 'Neutral';
const moodScreen = document.getElementById('moodScreen');
const insightScreen = document.getElementById('insightScreen');
const insightText = document.getElementById('insightText');

// Mood selection
function selectMood(mood) {
  userMood = mood;
  showInsight();
}

// Show AI Insight Screen
function showInsight() {
  moodScreen.classList.remove('active');
  insightScreen.classList.add('active');

  // Set dynamic insight based on mood
  let insightMessage = '';
  switch(userMood) {
    case 'Happy':
      insightMessage = "Your joy is a light. Let it guide your day.";
      break;
    case 'Sad':
      insightMessage = "Your sadness is a river. Flow with it, release it.";
      break;
    case 'Anxious':
      insightMessage = "Your anxious instinct is a signal, not a sentence. Let it speak, then let it go.";
      break;
    default:
      insightMessage = "Your soul waits in quiet. Listen closely.";
  }

  insightText.textContent = insightMessage;
}

// Voice output using Web Speech API
function speakInsight() {
  const msg = new SpeechSynthesisUtterance(insightText.textContent);
  msg.rate = 0.9;
  msg.pitch = 1.0;
  window.speechSynthesis.speak(msg);
}
