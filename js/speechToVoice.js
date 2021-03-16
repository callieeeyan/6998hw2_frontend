function Speech() {
  if ('webkitSpeechRecognition' in window) {
    this.recognition = new webkitSpeechRecognition();

    this.recognition.continuous = false; 
    this.recognition.interimResults = true;

    this.startCapture = function() {
      this.recognition.start();
    }

    this.stopCapture = function() {
      this.recognition.stop();
    }

    this.recognition.onresult = function(event) {
      console.log(event.results[0][0].transcript);
      $('#RecognitionResult').text(event.results[0][0].transcript);      
      searchFromVoice(event.results[0][0].transcript);
    }
 
    this.recognition.onerror = function(event) {
      console.log(event.error);
    }
  } else {
    console.log("recognition error");
  }
}
