// Pomodoro timer

let pomoMinutes = 25
let pomoSeconds = 0
let pomoInterval = null
let pomoCompleted = 0

let pomoDisplay = document.getElementById("pomoDisplay")
let pomoStart = document.getElementById("pomoStart")
let pomoStop = document.getElementById("pomoStop")
let pomoReset = document.getElementById("pomoReset")
let pomoSessions = document.getElementById("pomoSessions")

function updatePomoDisplay() {
  let minutesText = pomoMinutes
  let secondsText = pomoSeconds
  if (minutesText < 10) { minutesText = "0" + minutesText }
  if (secondsText < 10) { secondsText = "0" + secondsText }
  pomoDisplay.textContent = minutesText + ":" + secondsText
}

function startPomo() {
  if (pomoInterval) return

  pomoInterval = setInterval(function() {
    if (pomoSeconds === 0) {
      if (pomoMinutes === 0) {
        clearInterval(pomoInterval)
        pomoInterval = null
        pomoCompleted = pomoCompleted + 1
        pomoSessions.textContent = "Sessions Completed: " + pomoCompleted
        pomoMinutes = 25
        pomoSeconds = 0
        updatePomoDisplay()
        return
      } else {
        pomoMinutes = pomoMinutes - 1
        pomoSeconds = 59
      }
    } else {
      pomoSeconds = pomoSeconds - 1
    }
    updatePomoDisplay()
  }, 1000)
}

function stopPomo() {
  clearInterval(pomoInterval)
  pomoInterval = null
}

function resetPomo() {
  clearInterval(pomoInterval)
  pomoInterval = null
  pomoMinutes = 25
  pomoSeconds = 0
  updatePomoDisplay()
}

pomoStart.onclick = startPomo
pomoStop.onclick = stopPomo
pomoReset.onclick = resetPomo

updatePomoDisplay()


// Breathing exercise

let breathingInterval = null
let step = 0
let rounds = 0

let ball = document.getElementById("breathingBall")
let cue = document.getElementById("breathingCue")
let countDisplay = document.getElementById("breathingCount")

function startBreathing() {
  if (breathingInterval) return

  step = 0
  rounds = 0

  function nextStep() {
    step = step + 1
    if (step === 1) {
      cue.textContent = "Inhale"
      ball.className = "breathing-ball inhale"
    } else if (step === 2) {
      cue.textContent = "Hold"
      ball.className = "breathing-ball hold"
    } else if (step === 3) {
      cue.textContent = "Exhale"
      ball.className = "breathing-ball exhale"
    } else if (step === 4) {
      step = 0
      rounds = rounds + 1
      countDisplay.textContent = rounds
      nextStep()
      return
    }
  }

  nextStep()
  breathingInterval = setInterval(nextStep, 4000)
}

function stopBreathing() {
  clearInterval(breathingInterval)
  breathingInterval = null
  step = 0
  cue.textContent = ""
  countDisplay.textContent = "0"
  ball.className = "breathing-ball"
}


// Ambient sounds and background

let currentAudio = null
let breathingSection = document.getElementById("breathingSection")

function playSound(name) {
  if (currentAudio) {
    currentAudio.pause()
    currentAudio.currentTime = 0
  }

  let audio = document.getElementById("audio-" + name)

  if (currentAudio === audio) {
    currentAudio = null
    return
  }

  audio.play()
  currentAudio = audio

 
}

// --- Hamburger Menu ---
let hamburgerButton = document.getElementById("hamburger");
let navigationMenu = document.getElementById("navMenu");

function toggleMenu() {
  navigationMenu.classList.toggle("open");
}

hamburgerButton.addEventListener("click", toggleMenu);


