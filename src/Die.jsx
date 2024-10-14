

function Die(props){
    const styles ={
        backgroundColor:props.isHeld?"rgb(91, 189, 130)":"rgb(30, 47, 87)",
         color:props.isHeld?"rgb(7, 40, 40)": "rgb(155, 217, 255)"
    }
    //RENDERING 
    return(
        <>
     <div className={`die--face face-${props.index+1}`} style={styles} onClick={props.toggle}>
        <div className="die--value" style={styles}>{props.value}</div>
      </div>
        </>
    )
}

export default Die