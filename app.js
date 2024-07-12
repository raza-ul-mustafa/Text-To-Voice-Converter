document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.querySelector("#text-input");
    const listenButton = document.querySelector("#listen-btn");
    const volumeRange = document.querySelector("#volume");
    const rateRange = document.querySelector("#rate");
    const pitchRange = document.querySelector("#pitch");
    const pauseButton = document.querySelector("#pause-btn");
    const resumeButton = document.querySelector("#resume-btn");
    const stopButton = document.querySelector("#stop-btn");
    const recordButton = document.querySelector("#record-btn");

    // Event listener for "Listen" button click (Text-to-Speech)
    listenButton.addEventListener("click", () => {
        let text = textInput.value;
        if (text.trim() !== "") {
            speakText(text);
        } else {
            alert("Please enter some text to convert to speech.");
        }
    });

    // Function to convert text to speech
    function speakText(text) {
        let speech = new SpeechSynthesisUtterance();
        speech.text = text;
        speech.volume = volumeRange.value;
        speech.rate = rateRange.value;
        speech.pitch = pitchRange.value;

        window.speechSynthesis.cancel(); // Cancel previous speech (if any)
        window.speechSynthesis.speak(speech);
    }

    // Event listener for pause, resume, stop buttons (Text-to-Speech)
    pauseButton.addEventListener("click", () => {
        window.speechSynthesis.pause();
    });

    resumeButton.addEventListener("click", () => {
        window.speechSynthesis.resume();
    });

    stopButton.addEventListener("click", () => {
        window.speechSynthesis.cancel();
    });

    // Event listener for "Record" button click (Start recording)
    recordButton.addEventListener("click", () => {
        startRecording();
    });

    // Function to start recording voice and convert to text
    function startRecording() {
        const recognition = new webkitSpeechRecognition(); // Using webkitSpeechRecognition for Chrome support
        recognition.lang = 'en-US'; // Language for speech recognition (adjust as needed)
        recognition.continuous = false; // Recognize speech only once
        recognition.interimResults = true; // Get interim results during speech recognition

        recognition.onstart = function() {
            console.log('Speech recognition started');
        };

        recognition.onresult = function(event) {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    transcript += event.results[i][0].transcript;
                }
            }
            textInput.value = transcript;
            analyzeText(transcript); // Analyze text after recognition
        };

        recognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error);
            alert('Error recognizing speech. Please try again.');
        };

        recognition.onend = function() {
            console.log('Speech recognition ended');
        };

        // Start speech recognition
        recognition.start();
    }

    // Function to analyze text (sentiment analysis and topic detection)
    function analyzeText(text) {
        // Simulating server response for sentiment and topic analysis
        const sentimentScore = Math.random(); // Replace with actual sentiment analysis logic
        const speakerCount = Math.floor(Math.random() * 5) + 1; // Random speaker count between 1 and 5
        const topics = ["Technology", "Health", "Business"]; // Replace with actual topic detection logic

        displayAnalysisResults(sentimentScore, speakerCount, topics);
    }

    // Function to display analysis results
    function displayAnalysisResults(sentiment, speakerCount, topics) {
        document.querySelector("#sentiment").textContent = sentiment.toFixed(2);
        document.querySelector("#speaker-count").textContent = speakerCount;
        document.querySelector("#topics").textContent = topics.join(', ');
    }

});
