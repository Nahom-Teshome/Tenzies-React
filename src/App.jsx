import {useEffect, useState} from "react"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'
import Die from "./Die"
function App() {
  const [die, setDie]= useState(getRandomNum())
  const [tenzies, setTenzies] = useState(false)
  const [count , setCount ] = useState(0)
  const [time, setTime] = useState({min:0,sec:0})
  const [highScore, setHighScore] = useState(count)
 // seting the time state at the start to then calculate the time spent
  const now = new Date();
  const minutes = now.getMinutes();
  const sec = now.getSeconds();
  useEffect(() => {
   
    setTime({min:minutes,sec:sec});
  }, []); 

  //calculating time
  let minuteTaken = minutes-time.min
    let secondsTaken 
    if(tenzies){
      if(sec > time.sec && ((sec + (60 -time.sec )) > 60) && (minuteTaken ===0))
      {
        secondsTaken = (sec + (60 -time.sec ))-60
      
      }
      else if(sec > time.sec && ((sec + (60 -time.sec )) > 60) && (minuteTaken != 0))
      {
        secondsTaken = (sec + (time.sec - 60))-60
        minuteTaken +=1
      }
     
      else if (time.sec > sec){
        secondsTaken = (sec + (60 -time.sec))
        minuteTaken -=1
      }
    }
   
    
  //Storing High score in Local storage
  useEffect(()=>{
  
   tenzies && localStorage.setItem("highScore",JSON.stringify(highScore))
  },[highScore])
  console.log("This is the high Score : ",highScore)
  //Tenzies is won if the following are true
  useEffect(()=>{
    const checker = die[9].value
      const won = die.every(dice => dice.value === checker && dice.isHeld===true)
      setTenzies(won)
      //setting highscore state
      won && setHighScore(prev => prev===0? count:count<prev? count:prev)
  },[die])
function getRandomNum()
  {
    let randomNum = []
    for(let i =0 ; i < 10 ; i++)
    {
      randomNum.push({value:Math.floor(Math.random()*7),isHeld:false,id:nanoid()})
    }
    return randomNum
  }
  function toggle(id){
    //toggle isHeld property to change color 
      setDie(prevDie=>{
        const isHeldFlip = prevDie.map(die =>{
         return die.id === id?{...die,isHeld:!die.isHeld}:die
        })
        return isHeldFlip
      })

     
  }
  // Loop through die state and render DIE for each
  const dice = die.map(die => {
    return(
      <Die
      key={die.id}
      value={die.value}
      id={die.id}
      isHeld={die.isHeld}
      toggle ={()=>toggle(die.id)}
      />
    )
  })
    function generate()
    {
//if the game is won generate all new dice, if not hold value and generate
      tenzies ||die.every(dice=> dice.isHeld) ?setDie(getRandomNum()) 
      :setDie(prevDie =>{
        //hold the value of the dice that has a true ISHELD property
                const holdValue = prevDie.map(die =>{
              return die.isHeld? die : {value:Math.floor(Math.random()*7),isHeld:false,id:nanoid()}
                })
          return holdValue
      })

    
      die.every(dice=> dice.isHeld)?setCount(0):setCount(prevCount => prevCount + 1)
       tenzies && setTime({min:minutes,sec:sec})
       
      }
      

    const styles={
      fontSize:tenzies?"3rem":"2rem",
      color:tenzies?"lightblue": "rgb(91, 189, 130)",
      fontFamily: tenzies ? "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif":"karla",
      textShadow: tenzies ? "1.5px 1.5px 3px rgb(110, 77, 77)":"none"
    }
  
    
  //RENDERING
    return (
      <>
        {tenzies && <Confetti/>}
          <h2 className="instruction" style={styles}>
            {tenzies? "YOU HAVE BEAT THE GAME!!!" :die.every(dice=> dice.isHeld)?"Better Luck NEXT time :(":"Roll until all dice are the same. Click each die to freeze it at its current value between rolls." }
        </h2>
        <div className="die--container">
            {dice}
        </div>
        <div className="button--container">
            <button className="roll--button" onClick={generate}>{tenzies || die.every(dice=> dice.isHeld)?"Play Again":"Roll"}</button>
        </div>
        <div className="tries">
            {tenzies && <h3>{`Attempts :${count} tries (start time${time.min}:${time.sec})`}</h3>}
            {tenzies && <h3>{`Time :  ${(minuteTaken)+":"+secondsTaken  } ${minuteTaken!= 0?"minutes":"seconds"} (end time ${minutes}:${sec})`}</h3>}
            { <h5>HighScore: {highScore}</h5>}
        </div>
        
      </>
    )
}

export default App
