
const Firm = require("../models/Firm")
const Vendor = require("../models/Vendor")
const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename : function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})


const addFirm = async(req, res) => {
    try {
        const {firmName, area, category, region, offer} = req.body;

        const image = req.file ? req.file.filename : undefined

        const vendor = await Vendor.findById(req.vendorId)   

        if(!vendor) {
            res.status(404).json({message : "Vendor Not Found"})
        }

        const firm = new Firm({
            firmName, area, category, region, offer, image, vendor: vendor._id
        })

        const savedFirm = await firm.save()

        vendor.firm.push(savedFirm)    

        await vendor.save()

        return res.status(200).json({message: "Firm Added Successfully"}) 

    } catch (error) {
        console.log(`There is an error : ${error}`)
        res.status(500).json("Internal server error") 
    }
}


const deleteFirmById = async(req,res) => {
    try {
        const firmId = req.params.firmId 
        const firm = await Firm.findByIdAndDelete(firmId) 

        if(!firm) {
            return res.status(401).json({error: "Firm Not Found to delete"})
        }

        console.log("Firm deleted successfully")

    } catch (error) {
        console.log(`There is an error : ${error}`)
        res.status(500).json("Internal server error") 
    }
}



module.exports = {addFirm: [upload.single('image'), addFirm], deleteFirmById}
