import React from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const Dictaphone = () => {
  const { transcript, resetTranscript } = useSpeechRecognition()

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
        <div>
            <p>Browser does not support</p>
        </div>
    )
  }

  return (
    <div>
      <button class="btn btn-success" onClick={SpeechRecognition.startListening({ continuous: true })}>Start</button>
      <button class="btn btn-danger" onClick={SpeechRecognition.stopListening}>Stop</button>
      <button class="btn btn-default" onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  )
}
export default Dictaphone