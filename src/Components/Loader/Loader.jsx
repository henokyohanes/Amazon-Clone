import React from 'react'
import { FadeLoader } from "react-spinners";

const Loader = () => {
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"30vw"}}>
      <FadeLoader color='#F3A847'/>
    </div>
  );
}

export default Loader