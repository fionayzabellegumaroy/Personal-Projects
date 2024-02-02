const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

//var images = [];
//var rooms = ["room1", "room2", "room3", "bathroom", "hallway"];




let state = {
  //room:"room1",

  hasNotes: false,
  hasPills: false,

  sane: true,
  hazy: false,
  crazy: false,
  delusional: false,
  psychotic: false,
  ascension: false
}

function startGame() {
  state = {}
  document.body.style.backgroundImage = "url('backgroundgame.png')"
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}



function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  //changeBackgroundImage(state.room)
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

/*function changeBackgroundImage(room){
  if (room === 'room1'){
    document.body.style.backgroundImage = "url('canusurviveroom1.jpg')"
  } else if (room === 'room2'){
    document.body.style.backgroundImage = "url('canusurviveroom1.jpg')"
  }  else if (room === 'room2'){
    document.body.style.backgroundImage = "url('canusurviveroom1.jpg')"
  } else if (room === 'room3'){
    document.body.style.backgroundImage = "url('canusurviveroom3.jpg')"
  }else if (room === 'bathroom'){
    document.body.style.backgroundImage = "url('canusurviveroom3.jpg')"
  } else if (room === 'hallway'){
   document.body.style.backgroundImage = "url('hallway.jpg)"
  }

}*/


const textNodes = [ //array named textNodes that contains multiple objects
  {
    id: 1,
    text: `You wake up in a room. Your clothes look dishelved and you try to fumble through your pockets.`,
    options: [
      {
        text: 'You find nothing.',
        nextText: 1.5
      },
    ]
  },
  {
    id: 1.001,
    text: `You close your eyes but nothing happens.`,
    options: [
      {
        text: 'Wake up.',
        nextText: 1.25
      },
      {
        text: 'Continue closing your eyes.',
        nextText: 1.001
      },
    ]
  },
  {
    id: 1.001,
    text: `You continue closing your eyes but nothing happens.`,
    options: [
      {
        text: 'Wake up.',
        nextText: 1.25
      },
      {
        text: 'Continue closing your eyes.',
        nextText: 1.01
      },
    ]
  },
  {
    id: 1.01,
    text: `You begin to hear whispers around you as your eyes are shut closed.`,
    options: [
      {
        text: 'Wake up.',
        nextText: 1.25
      },
      {
        text: 'Continue observing and listening.',
        nextText: 1.02
      },
    ]
  },
  {
    id: 1.02,
    text: `You begin to feel light touches here and there as your eyes are shut closed.`,
    options: [
      {
        text: 'Wake up.',
        nextText: 1.25
      },
      {
        text: 'Continue observing and listening.',
        nextText: 1.03
      },
    ]
  },
  {
    id: 1.03,
    text: `Congratulations: it's been several months now; your body has given up on you, your mind has given up on you, and your relatives as well.`,
    options: [
      {
        text: 'Do not wake up again.',
        nextText: -1
      },
    ]
  },
  {
    id: 1.25,
    text: `You wake up in a room. Your clothes look dishelved and you try to fumble through your pockets.`,
    options: [
      {
        text: `You find nothing.`,
        requiredState: (currentState) => (currentState.hasNotes===false),
        nextText: 1.5
      },
      {
        text: `You find note(s) shoved in your pants.`,
        requiredState: (currentState) => (currentState.hasNotes===true ),
        nextText: 1.5
      },
      {
        text: `You are tired and decide to sleep a little bit.`,
        requiredState: (currentState) => (currentState.ascension===true ),
        nextText: 1.5
      },
    ]
  },
  {
    id: 1.26,
    text: `You wake up in a room. Your clothes look dishelved and you try to fumble through your pockets.`,
    options: [
      {
        text: `You find note(s) and a bottle of pills shoved in your pants.`,
        requiredState: (currentState) => (currentState.hasPills===true),
        nextText: 1.5
      },
    ]
  },
  {
    id: 1.5,
    text: `Apart from the bed you are on, you notice a door.`, 
    options: [
      {
        text: 'Leave through the door.',
        //setState: () => ({room:"hallway"}),
        nextText: 4
      },
      {
        text: 'Observe the room further.', 
        requiredState: (currentState) => currentState.hasNotes === true,
        nextText: 2
      },
      {
        text: 'Kill yourself.', 
        requiredState: (currentState) => currentState.psychotic === true,
        nextText: 21
      }
    ]
  },
  {
    id: 2,
    text: 'You notice something under the bed: it is a chest!',
    options: [
      {
        text: 'Ignore the chest and leave through the door.',
        nextText: 4
      },
      {
        text: 'Open the chest.', 
        nextText: 3
      },
      {
        text: 'Observe the room further.',
        requiredState: (currentState) => (currentState.hasNotes=== true),
        nextText:2.25 
      },
      
    ]
  },
  {
    id:2.25,
    text: 'There is a medication bottle hidden under the blanket that you seem to not have noticed before.',
    options:[
      {
        text: 'Leave the pills on the bed and leave through the door.',
        nextText:4
      },
      {
        text: 'Swallow a pill or two because why not?',
        setState: {sane: false, hazy: true, hasPills: true},
        nextText: 2.5
      },
      {
        text: 'Shove it into your sweater pocket and leave through the door.',
        setState: {hasPills: true},
        nextText: 4
      },
      
    ]
  },
  {
    id: 2.5,
    text: 'You seem to not feel any after effects.',
    options:[
      {
        text: 'Leave through the door.',
        //setState: {room:"hallway"},
        nextText: 4
      },
      {
        text: 'Take some more.',
        requiredState: (currentState) => currentState.crazy === true,
        nextText: 2.75
      }
    ]
  },
  {
    id: 2.75,
    text: 'You seem to not feel any after effects.',
    options:[
      {
        text: 'Leave through the door.',
        //setState: {room:"hallway"},
        nextText: 4
      },
      {
        text: 'Take some more.',
        //setState: {room:"hallway"},
        requiredState: (currentState) => (currentState.delusional === true),
        nextText: 2.76
      }
    ]
  },
  {
    id: 2.76,
    text: 'You seem to not feel any after effects.',
    options:[
      {
        text: 'Leave through the door.',
        //setState: {room:"hallway"},
        nextText: 4
      },
      {
        text: 'Take some more.',
        //setState: {room:"hallway"},
        requiredState: (currentState) => (currentState.psychotic === true),
        nextText: 4
      }
    ]
  },
  {
    id: 2.79,
    text: 'You seem to not feel any after effects.',
    options:[
      {
        text: 'Leave through the door.',
        //setState: {room:"hallway"},
        nextText: 4
      },
      {
        text: 'Finish the bottle.',
        //setState: {room:"hallway"},
        requiredState: (currentState) => (currentState.ascension === true),
        nextText: 2.8
      }
    ]
  },
  {
    id: 2.8,
    text: 'Several minutes pass before you collapse forward into the bed, into the floor--you do not know. But what you do know is that nothing matters any longer; congratulations!',
    options:[
      {
        text: 'Do not wake up again.',
        //setState: {room:"hallway"},
        nextText: -1
      },
    ]
  },
  {
    id: 3,
    text: 'Upon opening the chest, you pull out a note that says, "die".',
    options: [
      {
        text: 'Take the note with you and leave through the door.',
        setState: {hasNotes: true},
        nextText: 4
      }
    ]
  },
  {
    id: 4,
    text: `You enter the hallway.`,
    options: [
      {
        text: 'Look in the mirror by the door.',
        requiredState: (currentState) => (currentState.hasNotes===true),
        nextText: 5
      },
      {
        text: 'Enter the room in front of you.', //bathroom
        //setState: {room:"bathroom"},
        nextText: 6
      },
      {
        text: 'Enter the room to the side of you.', //exact replica
        //setState: {room:"room2"},
        nextText: 7
      },
      {
        text: 'Enter the room farthest away in the hallway.', //slightly different room
        //setState: {room:"room3"},
        nextText: 8
      },
    ]
  },
  {
    id: 5,
    text: 'A person stares back at you.',
    options: [
      {
        text: 'Look away.',
        nextText: 4
      },
      {
        text: 'They seem to smile, and you have the urge to smile back.',
        setState: {crazy: true},
        requiredState: (currentState) => currentState.hazy===true,
        nextText: 5.1
      },
      {
        text: 'Reach out to the shadow behind the person.',
        requiredState: (currentState) => currentState.crazy===true,
        nextText: 5.2
      },
    ]
  },
  {
    id: 5.1,
    text: 'They stare back.',
    options: [
      {
        text: 'Look away.',
        nextText: 4
      },
      {
        text: 'Continue staring.',
        nextText: 5.11
      },
    ]
  },
  {
    id: 5.11,
    text: 'A person stares back at you.',
    options: [
      {
        text: 'Look away.',
        nextText: 4
      },
      {
        text: 'A smile creeps on your lips as you continue to stare.',
        setState: {delusional:true},
        nextText: 5.12
      },
      {
        text: 'Furrow your brows in concentration as you continue to stare.',
        nextText: 5.13
      },
    ]
  },
  {
    id: 5.12,
    text: 'The person blinks-- you win!',
    options: [
      {
        text: 'Look away.',
        nextText: 4
      },
    ]
  },
  {
    id: 5.13,
    text: 'To much of your effort, a sweat caused by your focus drips onto your lashes triggering you to blink. You lose!',
    options: [
      {
        text: 'Look away.',
        nextText: 5.14
      },
    ]
  },
  {
    id: 5.14,
    text: 'The person leans forward, even to the point that it looks like they are leaning out of the frame and into you. However, you pass out milliseconds before their forehead reaches yours.',
    options: [
      {
        text: 'Wake up again.',
        nextText: 1.25
      },
      {
        text: 'Do not wake up.',
        nextText: -1
      },
    ]
  },
  {
    id: 5.2,
    text: 'Your fingers cross glass.',
    options: [
      {
        text: 'Flinch your hand away from the mirror and look away.',
        nextText: 4
      },
      {
        text: 'Reach out to touch the shadowy figure.',
        nextText: 5.21
      },
      {
        text: 'Reach out for something behind them, if there is anything.',
        requiredState: (currentState) => (currentState.delusional === true),
        nextText: 5.3
      },
    ]
  },
  {
    id: 5.21,
    text: 'They do not recoil at your touch; somehow, it feels like they are easing into your palms.',
    options: [
      {
        text: 'Flinch backwards and look away.',
        nextText: 4
      },
      {
        text: 'You examine the figure further.',
        nextText: 5.22
      },
      {
        text: 'Reach both of your hands into the mirror.',
        requiredState: (currentState) => (currentState.ascension === true),
        nextText: 5.4
      },
    ]
  },
  {
    id: 5.22,
    text: 'As your fingers glide through the shape of the shadow, you notice that it resembles one of a person--and not a mere blob like you initially thought.',
    options: [
      {
        text: 'Recoil your whole body opposite the mirror and look away.',
        nextText: 4
      },
      {
        text: 'You examine the figure further.',
        nextText: 5.23
      },
    ]
  },
  {
    id: 5.23,
    text: 'You continue your examination until your hands reach a metallic material. As soon as you can process it, the shadow swings the object forward, piercing both the person you were staring at and you. You collapse.',
    options: [
      {
        text: 'Wake up again.',
        nextText: 1.25
      },
      {
        text: 'Do not wake up.',
        nextText: -1
      },
    ]
  },
  {
    id: 5.3,
    text: 'Your hand travels past the shadow but are met with sharp blades that slice your palm and fingers.',
    options: [
      {
        text: 'Flinch your hand backwards.',
        setState: {psychotic: true},
        nextText: 5.31
      },
      {
        text: 'Leave your hand there for a few seconds.',
        setState: {psychotic: true},
        nextText: 5.32
      },
    ]
  },
  {
    id: 5.31,
    text: 'Before your hand can fully come to your side, a set of grimy hands tug at your hand forward, causing you to tumble down into the mirror. When you fully enter the mirror, you lose consciousness.',
    options: [
      {
        text: 'Wake up again.',
        nextText: 1.25
      },
      {
        text: 'Do not wake up.',
        nextText: -1
      },
    ]
  },
  {
    id: 5.32,
    text: 'You surprisingly find solace in the tickling pain',
    options: [
      {
        text: 'Flinch your hand backwards.',
        nextText: 5.31
      },
      {
        text: 'Continue to leave your hand there.',
        nextText: 5.33
      },
    ]
  },
  {
    id: 5.33,
    text: 'You leave it there for minutes, maybe hours... until you lose consciousness as your severed hand bleeds out.',
    options: [
      {
        text: 'Wake up again.',
        nextText: 1.25
      },
      {
        text: 'Do not wake up.',
        nextText: -1
      },
    ]
  },
  {
    id: 5.4,
    text: 'A set of grimy hands pull on yours, and eventually tug you into the mirror; but you are not scared. This place is unusually depressingly familiar.',
    options: [
      {
        text: 'Explore the place.',
        nextText: 5.41
      },
    ]
  },
  {
    id: 5.41,
    text: '...',
    options: [
      {
        text: 'Continue exploring.',
        nextText: 5.42
      },
    ]
  },
  {
    id: 5.42,
    text: '...',
    options: [
      {
        text: 'Continue exploring.',
        nextText: 5.43
      },
    ]
  },
  {
    id: 5.42,
    text: 'Congratulations: as you tumbled into the mirror, the glass cut deep gashes into several parts of your body. Unfortunately, no help arrived and you bled to death.',
    options: [
      {
        text: 'Do not wake up again.',
        nextText: -1
      },
    ]
  },
  {
    id: 6,
    text: 'You enter the room, but you cannot seem to find the lights.',
    options: [
      {
        text: 'Leave the room.',
        //setState: {room:"hallway"},
        nextText: 4
      },
      {
        text: 'Your hands roam the walls.',
        requiredState: (currentState) => currentState.hasPills===true,
        nextText: 6.25
      },
      {
        text: 'Stay in the dark for a little while because you find solace in it. ',
        requiredState: (currentState) => currentState.delusional===true
      }
    ]
  },
  {
    id: 6.25,
    text: 'You successfully turn on the lights and find a toilet, a shower, a sink, a trashcan, and a mirror.',
    options: [
      {
        text: 'Leave the room.',
        //setState: {room:"hallway"},
        nextText: 4
      },
      {
        text: 'Look at yourself in the mirror.',
        requiredState: (currentState) => currentState.hasPills===true,
        nextText: 6.3
      },
      {
        text: 'Turn on the shower.',
        nextText: 6.4
      },
      {
        text: 'Wash your hands.',
        nextText: 6.5
      },
    ]
  },
  {
    id: 6.3,
    text: 'A person stares at you.',
    options: [
      {
        text: 'Leave the room.',
        //setState: {room:"hallway"},
        nextText: 4
      },
      {
        text: 'Stare back.',
        requiredState: (currentState) => currentState.hasPills===true,
        nextText: 6.25
      },
      {
        text: 'A shadow looms over the person.',
        requiredState: (currentState) => currentState.delusional===true,
        nextText: 6.25
      },
      {
        text: 'Your hand makes its way to the person.',
        requiredState: (currentState) => currentState.crazy===true,
        nextText: 6.31
      },
    ]
  },
  {
    id: 6.31,
    text: 'As your hand is about to graze the mirror, the person smiles.',
    options: [
      {
        text: 'Smile back.', 
        setState: {delusional:true},
        nextText: 6.32
      },
      {
        text: 'Smile back before leaving the room.',
        //setState: {room:"hallway"},
        nextText: 4
      },
      {
        text: 'Flinch and take your hand away, leaving the room.',
        //setState: {room:"hallway"},
        nextText: 4
      },
      {
        text: 'Laugh.',
        setState: {psychotic: true},
        requiredState: (currentState) => currentState.delusional===true,
        nextText: 6.25
      },
    ]
  },
  {
    id: 6.32,
    text: 'Somehow, your fingers go through the mirror all the while the person reaches out to you. However, as soon as you touch, the world goes dark.',
    options: [
      { 
        text: 'Wake up again.',
        nextText: 1.25
      },
      {
        text: 'Do not wake up.',
        nextText: -1
      }
    ]
  },
  {
    id: 6.4,
    text: 'You flip the knob all the way to the left.',
    options: [
      { 
        text: 'Turn off the shower.',
        nextText: 6.25
      },
      {
        text: 'You decide to sit on floor of the shower to feel the water dripping down.',
        setState: {psychotic:true}, //idk if this is right
        requiredState: (currentState) => currentState.delusional===true,
        nextText: 6.42
      },
      {
        text: 'Reach your hand out to feel the temperature of the water.',
        nextText: 6.41
      }
    ]
  },
  {
    id: 6.41,
    text: 'It is scalding hot.',
    options: [
      { 
        text: 'Turn off the shower.',
        nextText: 6.25
      },
      {
        text: 'You decide to sit on floor of the shower to feel the water dripping down.',
        requiredState: (currentState) => currentState.delusional===true,
        nextText: 6.42
      },
    ]
  },
  {
    id: 6.42,
    text: 'The temperature intices you and it lulls you into sleep.',
    options: [
      { 
        text: 'Wake up again.',
        nextText: 1.25
      },
      {
        text: 'Do not wake up.',
        nextText: -1
      },
    ]
  },
  {
    id: 7,
    text: 'You enter the room, but there is someone in there sleeping.',
    options: [
      {
        text: 'Leave the room.',
        //setState: {room:"hallway"},
        nextText: 4
      },
      {
        text: 'Observe the room.',
        nextText: 7.1
      },
      {
        text: 'Observe the person sleeping.',
        requiredState: (currentState) => {currentState.crazy === true},
        nextText: 7.2
      }
    ]
  },
  {
    id: 7.1,
    text: 'Upon further observation, you notice that this room is the exact replica as the room you woke up in.',
    options: [
      {
        text: 'Leave the room.',
        //setState: {room:"hallway"},
        nextText: 4
      },
      {
        text: 'Check under the bed.',
        nextText: 7.11
      }
    ]
  },
  {
    id: 7.11,
    text: 'Like the one in the room you woke up in, there is a chest.',
    options: [
      {
        text: 'Leave the room.',
        //setState: {room:"hallway"},
        nextText: 4
      },
      {
        text: 'Open the chest.',
        nextText: 7.12
      },
      
    ]
  },
  {
    id: 7.12,
    text: 'Upon opening the chest, there is a note that says, "die".',
    options: [
      {
        text: 'Push the note deep into your jean pocket.',
        setState: {hasNotes:true},
        nextText: 7.13
      },
      {
        text: 'Leave the note inside the chest.',
        setState: {hasNotes:false},
        nextText: 7.13
      },
      {
        text: 'Throw the note on the floor.',
        setState: {hasNotes:false},
        nextText: 7.13
      },
    ]
  },
  {
    id: 7.13,
    text: 'When you close the chest, the person wakes up but it is too late. While you are bent over, they stab a knife into your neck, screaming until everything around you turns black.',
    options: [
      {
        text: `Wake up again. `,
        nextText: 1.25
      },
      {
        text: 'No, do not wake up',
        nextText: -1
      }
    ]
  },
  {
    id: 7.2,
    text: 'You walk closer to the person to get a closer look.',
    options: [
      {
        text: 'Retreat and leave the room.',
        //setState: {room:"hallway"},
        nextText: 4
      },
      {
        text: 'Continue your investigation',
        nextText: 7.21
      }
    ]
  },
  {
    id: 7.21,
    text: 'All of a suddens, the person wakes up.',
    options: [
      {
        text: 'Leave the room.',
        //setState: {room:"hallway"},
        nextText: 4
      },
      {
        text: 'Awkwardly greet the person.',
        nextText: 7.22
      },
      {
        text: 'Back up a little  bit.',
        nextText: 7.3
      },
      
    ]
  },
  {
    id: 7.22,
    text: 'They do not say anything but merely stare at you.',
    options: [
      {
        text: 'Leave the room.',
        //setState: {room:"hallway"},
        nextText: 4
      },
      {
        text: 'Ask them about what is currently happening.',
        nextText: 7.23
      },
      {
        text: 'Try to deescelate the situation by attempting to calm the person down.',
        nextText: 7.3
      },
      {
        text: 'Introduce yourself to the person.',
        nextText: 7.4
      },
      
    ]
  },
  {
    id: 7.23,
    text: 'You wait for their reply, but there is simply no response.',
    options: [
      {
        text: 'Leave the room.',
        //setState: {room:"hallway"},
        nextText: 4
      },
      {
        text: 'Repeat your question.',
        nextText: 7.24
      },
      {
        text: 'Introduce yourself to the person.',
        nextText: 7.24
      },
      
    ]
  },
  {
    id: 7.23,
    text: 'They stare at you for a second, before opening their mouth to scream.',
    options: [
      {
        text: 'Leave the room.',
        //setState: {room:"hallway"},
        nextText: 4.1
      },
      {
        text: 'Try to deescelate the situation by attempting to calm the person down.',
        nextText: 7.3
      },
      
    ]
  },
  {
    id: 7.3,
    text: 'Somehow, your coddling triggers them and they go on a frenzy. Grabbing a hidden knife under their pillow, they run for you.',
    options: [
      {
        text: 'Leave the room.',
        nextText: 4.1
      },
      {
        text: 'Stand still.',
        nextText: 20
      },
      {
        text: 'Attempt to evade the person.',
        //setState: {room:"hallway"},
        nextText: 20
      },
      
    ]
  },
  {
    id: 4.1,
    text: 'Before you can sucessfully leave, they grab a knife hidden under their pillow and run for you.',
    options: [
      {
        text: 'Try to deescelate the situation by attempting to calm the person down.',
        nextText: 7.3
      },
      {
        text: 'Attempt to evade.',
        //setState: {room:"hallway"},
        nextText: 4
      },
      {
        text: 'Stay still.',
        //setState: {room:"hallway"},
        nextText: 4
      },
    ]
  },
  {
    id: 8,
    text: 'Upon entering the room, you notice that is it the same exact one you entered but the bed is on the opposite side of the room and it is more colorful; full of life. There is also a person sitting on the bed staring at you.',
    options: [
      {
        text: 'Leave the room.',
        //setState: {room:"hallway"},
        nextText: 1
      },
      {
        text: 'Awkwardly greet the person.',
        nextText: 8.1
      },
      {
        text: 'Back up a little bit.',
        requiredState: (currentState) => currentState.hazy,
        nextText: 8.2
      },
      {
        text: 'Demand what is happening to you.',
        requiredState: (currentState) => currentState.psychotic,
        nextText: 8.3
      },
    ]
  },
  {
    id: 8.1,
    text: 'The person is hesistant, but they reply with a "You should go back to your room".',
    options: [
      {
        text: 'Leave the room.',
        //setState: {room:"hallway"},
        nextText: 4
      },
      {
        text: 'Ask the person who they are.',
        nextText: 8.101
      },
      {
        text: 'Question why you need to go back to your room .',
        nextText: 8.111
      },
    ]
  },
  {
    id: 8.101,
    text: 'The person replies, "I am one of the residents here".',
    options: [
      {
        text: 'Leave the room.',
        //setState: {room:"hallway"},
        nextText: 4
      },
      {
        text: 'Ask the person, "Where are we?"',
        requiredState: (currentState) => currentState.hazy === true,
        nextText: 8.102
      },
      {
        text: 'Ask the person, "Why do I need to go back to my room?"',
        requiredState: (currentState) => currentState.crazy === true,
        nextText: 8.111
      },
    ]
  },
  {
    id: 8.102,
    text: 'The person thinks for a moment and responds, "We are at one of the homes."',
    options: [
      {
        text: 'Leave the room.',
        //setState: {room:"hallway"},
        nextText: 4
      },
      {
        text: 'Ask the person, "What kind of homes?',
        nextText: 8.103
      },
      {
        text: 'Ask the person, "Why do I need to go back to my room?"',
        requiredState: (currentState) => currentState.crazy === true,
        nextText: 8.111
      },
    ]
  },
  {
    id: 20,
    text: 'The person successfully stabs you in the chest, but it takes a few minutes before you pass out from the blood loss and everything turns dark.',
    options: [
      {
        text: 'Wake up again.',
        //setState: {room:"hallway"},
        nextText: 1.25
      },
      {
        text: 'Wake up again.',
        //setState: {room:"hallway"},
        requiredState: (currentState) => (currentState.hasPills === true),
        nextText: 1.26
      },
      {
        text: 'Do not wake up.',
        nextText: -1
      },
    ]
  },
  {
    id: 21,
    text: 'At last, everything is okay.',
    options: [
      
    ]
  },
]

startGame()