import React from 'react'
import MarkdownEditor from '../../components/MarkdownEditor'
import {Toaster,toast} from "sonner"
import axios from 'axios'
import { BACKEND_URL } from '../../../lib'
const JobAdd = () => {
    const [data,setData] = React.useState({
        title: "",
        description:"",
        pay: "",
        jobtype: [],
        shift: "",
        location: "",
        benefits: "",
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
    const handleCheckbox = (event) => {
        const { value, checked } = event.target;
        setData.jobtype((prev) =>
            checked ? [...prev, value] : prev.filter((val) => val !== value)
        );
    };

    async function handleSubmit(e){
        e.preventDefault()
        try {
            const response = await axios.post(`${BACKEND_URL}/employee/postjobs`,data,{
                headers:{
                    authorization: localStorage.getItem("token")
                }
            })
        } catch (error) {
            console.log("error while posting job",error)
            toast("unable to post now please try later")
        }
    }

  return (
    <div>
         <h1>Add Job</h1>
         <form className='px-32' onSubmit={handleSubmit}>
            <Input id="title" type="text" name="Title" placeholder="Software Engineer" onChange={(e)=>{handleChange("title",e)}} />
            <LabelledMarkdownEditor value={data.description} id="description" name="Description" maxHeigth="200px" placeholder="...." onChange={(e)=>{handleChange("description",e)}} />
            <Input id="pay" type="number" name="Pay" placeholder="Software Engineer" onChange={(e)=>{handleChange("title",e)}} />
            <label htmlFor="">
                <p>Job Type</p>
                <div>
                    <div>
                    <input type="checkbox" value="OnSite" name="onsite" id="onsite" onChange={handleCheckbox} /> <span>OnSite</span>
                    </div>
                    <div>
                    <input type="checkbox" value="Hybrid" name="hybrid" id="hybrid" onChange={handleCheckbox} /> <span>Hybrid</span>
                    </div>
                    <div>
                    <input type="checkbox" value="Remote" name="remote" id="remote" onChange={handleCheckbox} /> <span>Remote</span>
                    </div>
                    <div>
                    <input type="checkbox" value="Full-Time" name="full" id="full" onChange={handleCheckbox} /> <span>Full-Time</span>
                    </div>
                    <div>
                    <input type="checkbox" value="Part-Time" name="part" id="remote" onChange={handleCheckbox} /> <span>Part-Time</span>
                    </div>
                </div>
            </label>
            <Input id="location" type="text" name="Location" placeholder="Mohali" onChange={(e)=>{handleChange("location",e)}} />
            <select name="" id="" onChange={(e)=>{handleChange("shift",e)}}>
                <option value="">Select</option>
                <option value="Day">Day</option>
                <option value="Night">Night</option>
                <option value="Rotational">Rotational</option>
            </select>
            
            <LabelledMarkdownEditor id="benefits" value={data.benefits} maxHeigth="200px" name="Benefits" placeholder="..." onChange={(e)=>{handleChange("benefits",e)}} />
            <LabelledMarkdownEditor id="responsi" value={data.responsibilities} maxHeigth="200px" name="Responsibilities" placeholder="..." onChange={(e)=>{handleChange("responsiblities",e)}} />
            <LabelledMarkdownEditor id="require" value={data.requirements} maxHeigth="200px" name="Requirements" placeholder="..." onChange={(e)=>{handleChange("Requirements",e)}} />
            <LabelledMarkdownEditor id="benefits" value={data.benefits} maxHeigth="200px" name="Benefits" placeholder="..." onChange={(e)=>{handleChange("benefits",e)}} />
            <Input id="work" name="Work Location" type="text" placeholder="Mohali" onChange={(e)=>{handleChange("worklocation",e)}} />
            <Input id="deadline" name="Deadline" type="date" placeholder="" onChange={(e)=>{handleChange("deadline",e)}} />
            <button type="submit">Post</button>
         </form>
    </div>
  )
}

export default JobAdd

export const Input = ({id,name,placeholder,onChange,type})=>{
    return(
        <label htmlFor={id} className='px-32'>
            <p>{name}: </p>
            <input type={type} id={id} placeholder={placeholder} onChange={onChange}  />
        </label>
    )
}

export const LabelledMarkdownEditor = ({id,name,placeholder,onChange,value,maxHeigth}) =>{
    return(
        <label htmlFor={id}>
            <p>{name}: </p>
            <MarkdownEditor value={value} placeholder={placeholder} onChange={onChange} maxHeights={maxHeigth} />
        </label>
    )
}