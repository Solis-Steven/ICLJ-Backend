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
            message: "El correo no es válido"
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [6, "La contraseña debe ser de al menos 6 caracteres"]
    },
    phone: {
        type: String,
        trim: true,
        validate: {
            validator: function (value) {
                return /^\d{8}$/.test(value);
            },
            message: "El número de teléfono debe contener 8 dígitos"
        }
    },
    address: {
        type: String,
        trim: true,
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9\s,.-]+$/.test(value);
            },
            message: "La dirección de residencia no es válida"
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
    },
    isActive: {
        type: Boolean,
        default: true
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