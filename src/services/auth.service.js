import createHttpError from 'http-errors';
import validator from 'validator';
import UserModal from "../models/userModal.js";


export const createUser = async (userData) => {
    const {name, email, picture, status, password} = userData;

    // Check if fields are empty
    if(!name || !email || !password) {
        throw createHttpError.BadRequest("Please fill all fields");
    }

    // Check name length 
    if (
        !validator.isLength(name, {
            min: 2,
            max: 16
        })
    ) {
        throw createHttpError.BadRequest("Please make sure your name is between 2 and 16 characters");
    }

    // check status
    if (status && status.length > 64) {
        throw createHttpError.BadRequest('Please make sure your status is less than 64 characters')
    }

    if (!validator.isEmail(email)) {
        throw createHttpError.BadRequest('Please provide a valid email address');
    }

    const checkDB = await UserModal.find({email});
    
    if (checkDB.length) {
        throw createHttpError.Conflict("This email address is already registered ! Please try with a different one.");
    }

    if (!validator.isLength(password, {
        min: 6,
        max: 128
    })) {
        throw createHttpError.BadRequest("Please make sure your password is between 6 and 128 characters.");
    }

    const user = new UserModal({
        name,
        email,
        password,
        picture: picture || "https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png",
        status: status || "Hey there ! I am using whatsapp."
    }).save();

    return user;
}