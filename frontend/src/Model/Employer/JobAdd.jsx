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

    const handleChange = React.useCallback((type, e) => {
        setData(prevData => ({
            ...prevData,
            [type]: e.target.value
        }));
    }, []);
    
    const handleCheckbox = React.useCallback((event) => {
        const { value, checked } = event.target;
        setData(prevData => ({
            ...prevData,
            jobtype: checked ? [...prevData.jobtype, value] : prevData.jobtype.filter((val) => val !== value)
        }));
    },[]);

    async function handleSubmit(e){
        console.log(data)
        e.preventDefault()
        try {
            const response = await axios.post(`${BACKEND_URL}/employee/postjobs`,data,{
                headers:{
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            alert("job added")
        } catch (error) {
            console.log("error while posting job",error)
            toast("unable to post now please try later")
        }
    }

  return (
    <div className='p-10 '>
         <h1 className='text-center text-2xl uppercase underline font-bold'>Add Job</h1>
         <form className='px-32 flex flex-col gap-5' onSubmit={handleSubmit}>
            <Input id="title" type="text" name="Title" placeholder="Software Engineer" onChange={(e)=>{handleChange("title",e)}} />
            <LabelledMarkdownEditor value={data.description} id="description" name="Description" maxHeigth="200px" placeholder="...." onChange={(value) => setData(prevData => ({ ...prevData, description: value }))} />
            <Input id="pay" type="number" name="Pay" placeholder="Software Engineer" onChange={(e)=>{handleChange("pay",e)}} />
            <label htmlFor="">
                <p>Job Type</p>
                <div>
                    <div>
                    <input type="checkbox" value="OnSite" name="onsite" id="onsite" onChange={handleCheckbox} /> <label htmlFor="onsite">OnSite</label>
                    </div>
                    <div>
                    <input type="checkbox" value="Hybrid" name="hybrid" id="hybrid" onChange={handleCheckbox} /> <label htmlFor="hybrid">Hybrid</label>
                    </div>
                    <div>
                    <input type="checkbox" value="Remote" name="remote" id="remote" onChange={handleCheckbox} /> <label htmlFor="remote">Remote</label>
                    </div>
                    <div>
                    <input type="checkbox" value="Full-Time" name="full" id="full" onChange={handleCheckbox} /> <label htmlFor="full">Full-Time</label>
                    </div>
                    <div>
                    <input type="checkbox" value="Part-Time" name="part" id="part" onChange={handleCheckbox} /> <label htmlFor="part">Part-Time</label>
                    </div>
                </div>
            </label>
            <Input id="location" type="text" name="Location" placeholder="Mohali" onChange={(e)=>{handleChange("location",e)}} />
            <label htmlFor="">
                <p>Shift:</p>
                <select className='w-full h-10' name="" id="" onChange={(e)=>{handleChange("shift",e)}}>
                <option value="">Select</option>
                <option value="Day">Day</option>
                <option value="Night">Night</option>
                <option value="Rotational">Rotational</option>
            </select>
            </label>
            
            
            <LabelledMarkdownEditor id="benefits" value={data.benefits} maxHeigth="200px" name="Benefits" placeholder="..." onChange={(value) => setData(prevData => ({ ...prevData, benefits: value }))} />
            <LabelledMarkdownEditor id="responsi" value={data.responsibilities} maxHeigth="200px" name="Responsibilities" placeholder="..." onChange={(value) => setData(prevData => ({ ...prevData, responsibilities: value }))} />
            <LabelledMarkdownEditor id="require" value={data.requirements} maxHeigth="200px" name="Requirements" placeholder="..." onChange={(value) => setData(prevData => ({ ...prevData, requirements: value }))} />
            <LabelledMarkdownEditor id="experience" value={data.experience} maxHeigth="200px" name="Experience" placeholder="..." onChange={(value) => setData(prevData => ({ ...prevData, experience: value }))} />
            <Input id="work" name="Work Location" type="text" placeholder="Mohali" onChange={(e)=>{handleChange("worklocation",e)}} />
            <Input id="deadline" name="Deadline" type="date" placeholder="" onChange={(e)=>{handleChange("deadline",e)}} />
            <button className='w-full h-12 bg-orange-400 hover:bg-orange-600 transition-all ease-linear duration-500 rounded-md text-white text-xl font-bold' type="submit">Post</button>
         </form>
    </div>
  )
}

export default JobAdd

export const Input = ({id,name,placeholder,onChange,type})=>{
    return(
        <label htmlFor={id} className=''>
            <p>{name}: </p>
            <input className=" px-3 py-1 h-10 border rounded-md w-[100%] focus:shadow-lg" type={type} id={id} placeholder={placeholder} onChange={onChange}  />
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