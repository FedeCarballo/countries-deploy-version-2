import React from 'react'
import {loader, loadercontainer} from './Loading.module.css'
function Loading() {
  return (
    <div className={loadercontainer}>
      <div className={loader}></div>
    </div>
  )
}

export default Loading