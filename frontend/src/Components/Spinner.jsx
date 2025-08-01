import React from 'react'
function Spinner() {
  return (

    <div className='h-[106vh]  flex items-center justify-center   -mt-10 fixed inset-0 bg-black/65 backdrop-blur-sm z-50'>

    <div className='  flex items-center justify-center   -mt-10 '>

        <div  className=''>
            <img src="https://stackblitz.com/files/react-spinner-sample/github/RahmanM/react-spinner-sample/master/loading.gif" alt="" width={200} />

        </div>
    </div>

    </div>
  )
}

export default Spinner
