document.addEventListener('DOMContentLoaded', function () {
    const textInput = document.getElementById('text-input');
    const voiceSelect = document.getElementById('voice-select');
    const speakButton = document.getElementById('speak-button');
    let voices = [];

    function populateVoiceList() {
        voices = speechSynthesis.getVoices();
        voiceSelect.innerHTML = '';
        voices.forEach((voice, index) => {
            const option = document.createElement('option');
            option.textContent = `${voice.name} (${voice.lang})`;
            option.value = index;
            voiceSelect.appendChild(option);
        });
    }

    populateVoiceList();
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoiceList;
    }

    speakButton.addEventListener('click', () => {
        const text = textInput.value;
        const utterance = new SpeechSynthesisUtterance(text);
        const selectedVoice = voices[voiceSelect.value];
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }
        speechSynthesis.speak(utterance);
    });
});
