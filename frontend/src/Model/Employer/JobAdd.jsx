import React from 'react'

const JobAdd = () => {
    const [data,setData] = React.useState({
        title: "",
        description:"",
        pay: "",
        jobtype: "",
        shift: "",
        location: "",
        benefits: [],
        description: "",
        responsibilities: "",
        requirements: "",
        experience: "",
        worklocation: "",
        deadline :"",
    })

    function handleChange(type,e){
        setData({
            ...data,
            [type]: e.target.value
        })
    }
  return (
    <div>
         <h1>Add Job</h1>
         <form action="">
            <Input id="title" name="Title" placeholder="Software Engineer" onChange={(e)=>{handleChange("title",e)}} />
            <Input id="title" name="Title" placeholder="Software Engineer" onChange={(e)=>{handleChange("title",e)}} />
            <Input id="title" name="Title" placeholder="Software Engineer" onChange={(e)=>{handleChange("title",e)}} />
            <Input id="title" name="Title" placeholder="Software Engineer" onChange={(e)=>{handleChange("title",e)}} />
            <Input id="title" name="Title" placeholder="Software Engineer" onChange={(e)=>{handleChange("title",e)}} />
            <Input id="title" name="Title" placeholder="Software Engineer" onChange={(e)=>{handleChange("title",e)}} />
            <Input id="title" name="Title" placeholder="Software Engineer" onChange={(e)=>{handleChange("title",e)}} />
            <Input id="title" name="Title" placeholder="Software Engineer" onChange={(e)=>{handleChange("title",e)}} />
            <Input id="title" name="Title" placeholder="Software Engineer" onChange={(e)=>{handleChange("title",e)}} />
            <Input id="title" name="Title" placeholder="Software Engineer" onChange={(e)=>{handleChange("title",e)}} />
            <Input id="title" name="Title" placeholder="Software Engineer" onChange={(e)=>{handleChange("title",e)}} />
            <Input id="title" name="Title" placeholder="Software Engineer" onChange={(e)=>{handleChange("title",e)}} />
            <Input id="title" name="Title" placeholder="Software Engineer" onChange={(e)=>{handleChange("title",e)}} />
         </form>
    </div>
  )
}

export default JobAdd

export const Input = ({id,name,placeholder,onChange})=>{
    return(
        <label htmlFor={id}>
            <p>{name}: </p>
            <input type="text" id={id} placeholder={placeholder} onChange={onChange}  />
        </label>
    )
}