import React from 'react'

function Loader() {
  return (
    <div className="Loader">
      <div className="loader">
        <div class="circle" style={{"--i" : "0.25"}}></div>
        <div class="circle" style={{"--i" : "0.5"}}></div>
        <div class="circle" style={{"--i" : "0.75"}}></div>
        <div class="circle" style={{"--i" : "1"}}></div>
      </div>
    </div>
  );
}

export default Loader