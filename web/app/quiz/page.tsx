import React from 'react'

const Quiz = () => {
  return (
    <div>
        <h2 className='text-cyan-800 text-end text-3xl m-10 font-bold'>QUIMER</h2>
        <div className='flex text-cyan-800 text-xl justify-between m-12'>
        <svg className="h-8 w-8 text-cyan-800 hover:text-cyan-300"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="5" y1="12" x2="19" y2="12" />  <line x1="5" y1="12" x2="11" y2="18" />  <line x1="5" y1="12" x2="11" y2="6" />
        </svg>
        <h2 className='text-2xl'>02 of 60</h2>
        <h2 className='text-2xl'>Time: 10:13</h2>
        </div>
        <div className="border text-2xl rounded-lg flex flex-col m-12 p-20 text-cyan-800">
            <h2>Who is the richest man in Africa</h2>
            <label className=''>
                <input type="checkbox"className='m-4'/>
                Aliko Dangote
            </label>
            <label>
                <input type="checkbox" className='m-4' />
                Bola Ahmed Tinubu
            </label>
            <label>
                <input type="checkbox" className='m-4' />
                Peter Obi
            </label>
            <label>
                <input type="checkbox" className='m-4' />
                Sanni Abacha
            </label>
        </div>
        <div  className='flex justify-between text-cyan-800 text-2xl m-14'>
            <button className='border rounded-lg py-2 px-6 hover:bg-cyan-500'>Previous</button>
            <button className='border rounded-lg py-2 px-6 hover:bg-cyan-500'>Next</button>
        </div>
    </div>
  )
}

export default Quiz
