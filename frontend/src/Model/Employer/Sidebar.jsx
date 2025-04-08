import React from 'react'

const Sidebar = ({setPage}) => {
    const obj = [{
        name: "Jobs",
        link: ()=>{setPage("job")}
    },{
        name: "Add Jobs",
        link: ()=>{setPage("add")}
    }]
  return (
    <div className='fixed w-[25%] min-h-screen'>
        <div className='bg-orange-400 min-h-screen text-white'>
        <h1 className=' h-24 border flex justify-center items-center text-2xl font-bold '>SkillMatch</h1>
        <div>
            {
                obj.map((item,index)=>(
                    <div className=' h-16 flex justify-center items-center hover:bg-orange-600 transition-all ease-linear duration-500 cursor-pointer' key={index} onClick={item.link}>{item.name}</div>
                ))
            }
        </div>
    </div>
    </div>
  )
}

export default Sidebar