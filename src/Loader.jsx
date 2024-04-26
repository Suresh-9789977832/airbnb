import React from 'react'
import { Oval } from 'react-loader-spinner'

function Loader() {
    return <>
        <div className="flex content-center">
        <Oval
                visible={true}
  height="20"
     width="20"
  color="black"
  ariaLabel="oval-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
 
        </div>
          </>
}

export default Loader
