import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: "The email is not valid"
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [6, "The password must be at least 6 characters long"]
    },
    phone: {
        type: String,
        trim: true,
        validate: {
            validator: function (value) {
                return /^\d{8}$/.test(value);
            },
            message: "The phone number must contain exactly 8 digits"
        }
    },
    address: {
        type: String,
        trim: true,
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9\s,.-]+$/.test(value);
            },
            message: "The address is not valid"
        }
    },
    role: {
        type: String,
        enum: ['Miembro', 'Lider', 'Administrador'],
        default: 'Miembro'
    },
    token: {
        type: String
    },
    confirmed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});


userSchema.pre("save", async function(next) {
    
    if(!this.isModified("password")) {
        next();
    }
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.checkPassword = async function(password) {
    return(await bcrypt.compare(password, this.password));
}

export const User = mongoose.model("User", userSchema);