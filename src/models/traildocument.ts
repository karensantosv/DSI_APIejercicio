import { Document, Schema, model } from 'mongoose';
import validator  from 'validator';

/**
 * Interface para traildoucmnet
 */
export interface TrailDocumentInterface extends Document {
    name: string;
    description: string;
    difficulty: "Easy" | "Moderate" | "Hard" | "Expert"
    distanceKm: number;
    elevationGainM: number;
    durationMinutes: number;
    location: LocationDocumentInterface;
    tags: string[];
    createdAt: Date;
}

/**
 * Interface para location
 */
interface LocationDocumentInterface {
    country: string;
    region: string;
    coordinates: {
        lat: number;
        lng: number;
    }
}

/**
 * Schema para definiir trail en la case de datos
 */
const TrailSchema = new Schema<TrailDocumentInterface>({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 500
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Moderate', 'Hard', 'Expert'],
    },
    distanceKm: {
        type: Number,
        required: true,
        validate: {
            // numero decimal positivo
            validator: (value: number) => value > 0,
            message: 'La distancia debe ser un núemro postivo'
        }
    },
    elevationGainM: {
        type: Number,
        required: true,
        validate: {
            // numero entero positivo
            validator: (value: number) => Number.isInteger(value) && value >= 0,
            message: 'Debe ser un número entero positivo'
        }
    }, 
    durationMinutes: {
        type: Number,
        required: true,
        validate: {
            // numero entero positivo
            validator: (value: number) => Number.isInteger(value) && value >= 0,
            message: 'Debe ser un número entero positivo'
        }
    },
    location: {
        country: { type: String, required: true },
        region: { type: String, required: true },
        coordinates: {
            lat: {
                type: Number,
                required: true,
                validate: {
                    validator: (value: number) => value >= -90 && value <= 90,
                    message: 'La latitud debe ser un número entre -90 y 90'
                }
            },
            lng: {
                type: Number,
                required: true,
                validate: {
                    validator: (value: number) => value >= -180 && value <= 180,
                    message: 'La longitud debe ser un número entre -180 y 180'
                }
            }
        }
    },
    tags: {
        type: [String],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

/**
 * Colección de l abase de datos
 */
export const Trail = model<TrailDocumentInterface>('Trail', TrailSchema);