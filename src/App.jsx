import React from 'react'
import Buttons from './Buttons'
import drumAudio from '../public/drum-audio'
import pianoAudio from '../public/piano-audio'

function App() {
  const [power, setPower] = React.useState(true);
  const [bank, setBank] = React.useState("drum");
  const [note, setNote] = React.useState("");
  const [volume, setVolume] = React.useState();
  const [recentAction, setRecentAction] = React.useState("");

  const letters = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C']
  let sounds = []

  if (bank === "drum") {
    sounds = letters.map((beat, index) => (
      <button className='drum-pad' key={index} onClick={() => power && makeSound(beat)}>
        {beat}
        <audio id={beat} src={drumAudio[index].link}></audio>
      </button>)
    )
  } else if (bank === "piano") {
    sounds = letters.map((beat, index) => (
      <button className="keynote" key={index} onClick={() => power && makeSound(beat)}>
        <div className="black-note"></div>
        <h4 className="keynote-letter">{beat}</h4>
        <audio id={beat} src={pianoAudio[index].link}></audio>
      </button>)
    )
  }
  


  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (power) {
        makeSound(event)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [power])


  React.useEffect(() => {
    const volumeBar = document.getElementById("volume-bar")
    const volumeStick = document.getElementById("volume-stick")
    // eventListeners and functions for volume arrangement
    let isDragging = false;


    volumeStick.addEventListener('mousedown', (event) => {
        isDragging = true
        updateVolume(event.clientX);
    })

    volumeBar.addEventListener('mousedown', (event) => {
      isDragging = true;
      updateVolume(event.clientX);
    })

    document.addEventListener('mousemove', (event) => {
      if (isDragging) {
        updateVolume(event.clientX);
      }
    })

    document.addEventListener('mouseup', () => {
      isDragging = false;
    })

    function updateVolume(clientX) {
      const rect = volumeBar.getBoundingClientRect();
      let relativeX = clientX - rect.left;
      relativeX = Math.max(0, Math.min(relativeX, rect.width))
      const volumePercentage = (relativeX / rect.width) * 100;
      displayAction(volumePercentage)

      if (volumePercentage >= 0 && volumePercentage <= 100) {
          volumeStick.style.left = `${volumePercentage}%`;
          const volumeLevel = volumePercentage / 100; // .volume() functions expect a value between 0-1
          letters.forEach((letter) => {
            const audioElement = document.getElementById(letter)
            audioElement.volume = volumeLevel
          })
      }
    }
  }, [])

  function displayAction(volumePercentage) {
    setVolume(volumePercentage)
    setRecentAction(`Volume: ${volumePercentage.toFixed(0)}`)
  }

  function makeSound(eventOrKey) {
    const keyPressed = eventOrKey.key ? eventOrKey.key.toUpperCase() : eventOrKey.toUpperCase()
    const audioElement = document.getElementById(keyPressed);
    if (audioElement && power) {
      audioElement.currentTime = 0;
      audioElement.play();
    }
    let noteName;
    if (audioElement && audioElement.src) {
      if (bank === "drum") {
        const drumAudioItem = drumAudio.find(item => item.link === audioElement.src);
        noteName = drumAudioItem ? drumAudioItem.name : undefined;
      } else {
        const pianoAudioItem = pianoAudio.find(item => item.link === audioElement.src);
        noteName = pianoAudioItem ? pianoAudioItem.name : undefined;
      }
    }
  

    console.log('Key Pressed:', keyPressed);
    console.log('Audio Element Src:', audioElement.src);
    console.log('Note Name:', noteName);
  }

  function switchPower(prevState) {
    setPower((prevPower) => !prevPower)
  }

  function switchBank (prevState) {
    if (prevState === "drum") {
      setBank("piano")
    } else {
      setBank("drum")
    }
  }
  

  return (
    <div className='drum'>
      <div className='drumbeat-container'>
        {sounds}
      </div>
      <Buttons power={power} switchPower={switchPower} bank={bank} switchBank={switchBank} recentAction={recentAction}/>
    </div>
  )
}

export default App
