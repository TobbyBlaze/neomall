import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const Dictaphone = () => {

    const [message, setMessage] = useState('')

    // useEffect(() => {
    //     console.log("Effect")
    //     console.log(message)
    // });

    const commands = [
        {
        command: 'I would like to order *',
        callback: (food) => setMessage(`Your order is for: ${food}`)
        },
        //Store
        {
            command: '* store *',
            callback: () => setMessage(`store`)
        },
        {
            command: 'store *',
            callback: () => setMessage(`store`)
        },
        {
            command: 'store *',
            callback: () => setMessage(`store`)
        },
        {
            command: 'store',
            callback: () => setMessage(`store`)
        },
        //Account
        {
            command: '* account *',
            callback: () => setMessage(`profile`)
        },
        {
            command: '* account',
            callback: () => setMessage(`profile`)
        },
        {
            command: 'account *',
            callback: () => setMessage(`profile`)
        },
        {
            command: 'account',
            callback: () => setMessage(`profile`)
        },
        {
        command: 'The weather is :condition today',
        callback: (condition) => setMessage(`Today, the weather is ${condition}`)
        },
        {
        command: 'My top sports are * and *',
        callback: (sport1, sport2) => setMessage(`#1: ${sport1}, #2: ${sport2}`)
        },
        {
        command: 'Pass the salt (please)',
        callback: () => setMessage('My pleasure')
        },
        {
        command: 'hello',
        callback: () => setMessage('Hi there!'),
        matchInterim: true
        },
        {
        command: 'Beijing',
        callback: (command, spokenPhrase, similarityRatio) => setMessage(`${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`),
        // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.2
        },
        {
        command: 'clear',
        callback: ({ resetTranscript }) => resetTranscript()
        }
    ]

  const { transcript, resetTranscript } = useSpeechRecognition({ commands })

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    // return (
    //     <div>
    //         <p>Browser does not support</p>
    //     </div>
    // )
    return null
  }

  return (
    <div class="float">
      <button class="btn btn-success btn-circle btn-sm" onClick={SpeechRecognition.startListening}>Start</button>
      <button class="btn btn-danger btn-circle btn-sm" onClick={SpeechRecognition.stopListening}>Stop</button>
      <button class="btn btn-primary btn-circle btn-sm" onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
      <p>{message}</p>
      {/* <Link to={transcript}>{transcript}</Link> */}
      {message?
      window.location.href = "http://localhost:3000/"+message
    :
    <div></div>
    }
    </div>
  )
}
export default Dictaphone