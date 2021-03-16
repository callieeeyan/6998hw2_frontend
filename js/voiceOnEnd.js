$( document ).ready(function() {
	console.log('Speech Recognition ready');
	var speech = new Speech();

    speech.recognition.onstart = function() {
		$('#startRecognition').text("Stop");
		$('#startRecognition').val("false");
		$('#CurrentStatus').text("Translating...");
    }

	speech.recognition.onend = function() {
		$('#startRecognition').text("Start");
		$('#startRecognition').val("true");
		$('#CurrentStatus').text("Ready to start!");
    	// console.log('Listening stopped.');
    }
 
	$('#startRecognition').click(function(){
		if ($('#startRecognition').val() == "true") {
			speech.startCapture();
		}
		else {
			speech.stopCapture();
		}
	});
});