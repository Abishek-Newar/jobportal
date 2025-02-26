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
    <div>
        <h1>SkillMatch</h1>
        <div>
            {
                obj.map((item,index)=>{
                    <div key={index} onClick={item.link}>{item.name}</div>
                })
            }
        </div>
    </div>
  )
}

export default Sidebar