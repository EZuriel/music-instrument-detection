const startButton = document.getElementById('startRecording');
const stopButton = document.getElementById('stopRecording');
const uploadInput = document.getElementById('uploadAudio');
const audioPlayer = document.getElementById('audioPlayer');
const statusText = document.getElementById('status');

let mediaRecorder;
let audioChunks = [];

startButton.addEventListener('click', async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      audioChunks.push(event.data);
    }
  };

  mediaRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    const audioUrl = URL.createObjectURL(audioBlob);
    audioPlayer.src = audioUrl;
    audioPlayer.controls = true;

    // Reset for next recording
    audioChunks = [];
    startButton.disabled = false;
    stopButton.disabled = true;
    uploadInput.disabled = false;
    statusText.textContent = '';
  };

  mediaRecorder.start();
  startButton.disabled = true;
  stopButton.disabled = false;
  uploadInput.disabled = true;
  statusText.textContent = 'Recording in progress...';
});

stopButton.addEventListener('click', () => {
  if (mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
    statusText.textContent = 'Recording stopped.';
  }
});

uploadInput.addEventListener('change', (event) => {
  const uploadedFile = event.target.files[0];
  const audioUrl = URL.createObjectURL(uploadedFile);
  audioPlayer.src = audioUrl;
  audioPlayer.controls = true;
});