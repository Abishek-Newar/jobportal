import multer from "multer"
import fs from "fs"
import {s3} from "../../config/db.js"
import path from "path"

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"/")
    },
    filename: (req,file,cb)=>{
        cb(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

export const upload = multer({storage: storage})

export const fileUpload = async(file) =>{
    const params = {
        Bucket: "abihotel",
        Key: file.filename,
        body: fs.readFileSync(file.path)
    }

    await s3.upload(params,(err,data)=>{
        if(err){
            console.log(err)
            return err
        }
    })

    return {
        filename: file.filename
    }
}