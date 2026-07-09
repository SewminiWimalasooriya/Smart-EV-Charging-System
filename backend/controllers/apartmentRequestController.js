import ApartmentRequest from "../models/ApartmentRequest.js";
import Apartment from "../models/Apartment.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../models/User.js";
import fs from "fs";
import sendEmail from "../utils/sendEmail.js"

//create station request form 
export const createApartmentRequest = async (req, res) => {
    try {
        const { name, email } = req.body;

        // 1. Check existing pending request
        const existingRequest = await ApartmentRequest.findOne({
            name,
            email,
            status: "PENDING",
        });

        if (existingRequest) {

            // delete uploaded image
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }

            return res.status(400).json({
                message: "Request already pending for this apartment",
            });
        }



        // 2. Check already approved apartment
        const existingApartment = await Apartment.findOne({
            name,
            email,
        });

        if (existingApartment) {
            return res.status(400).json({
                message: "Apartment already exists",
            });
        }
        


        // 3. Upload image
        const image = req.file
            ? `http://localhost:5000/${req.file.path.replace(/\\/g, "/")}`
            : null;

        // 4. Create request
        const request = await ApartmentRequest.create({
            ...req.body,
            image,
        });

        res.status(201).json({
            message: "Request sent for approval",
            request,
        });

    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
};

//Get all apartment request ( for admin panel show )
export const getPendingRequest = async (req, res) => {
    try {
        const requests = await ApartmentRequest.find({ status: "PENDING" });

        res.json(requests);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//Approve request (for admnn panel approve button)
export const approveRequest = async (req, res) => {
    try {
        const requestId = req.params.id;

        const request = await ApartmentRequest.findById(requestId);


        if (!request) {
            return res.status(404).json({ message: "Not found" });
        }

        if (request.status !== "PENDING") {
            return res.status(400).json({ message: "Already processed" });
        }

        //create apartment 
        const apartment = await Apartment.create({
            name: request.name,
            address: request.address,
            ownerName: request.ownerName,
            email: request.email,
            phone: request.phone,
            image: request.image,
            status: "approved",
            location: request.location,
        });

        // 2️⃣ generate temp password
        const tempPassword = crypto.randomBytes(4).toString("hex");

        // 3️⃣ hash password
        const hashedPassword = await bcrypt.hash(tempPassword, 10);

        // 4️⃣ create OWNER account
        const owner = await User.create({
            username: request.ownerName,
            email: request.email,
            password: hashedPassword,
            role: "owner",
            apartment: apartment._id,
            mustChangePassword: true
        });

        // 5️⃣ TODO: send email (you can plug nodemailer here)
        await sendEmail({

    email: owner.email,

    subject:"VoltSpot Owner Account Created",

    message:`

       <h2>Welcome ${owner.username} ⚡</h2>

<p>
Your EV station request has been approved.
</p>

<p>
Login Email:
${owner.email}
</p>


<p>
Temporary Password:
<b>${tempPassword}</b>
</p>


<p>
Please change your password after login.
</p>


`

});

        request.status = "APPROVED";
        await request.save();

        res.json({
            message: "Approved successfully",
            apartment,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// REJECT REQUEST
export const rejectRequest = async (req, res) => {
    const request = await ApartmentRequest.findById(req.params.id);

    if (!request) {
        return res.status(404).json({ message: "Not found" });
    }

    request.status = "REJECTED";
    await request.save();

    res.json({ message: "Rejected successfully" });
};