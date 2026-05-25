import { Document, Schema, Types, model } from 'mongoose';
import { validateHeaderName } from 'node:http';
import validator from 'validator';

export type genre =  "acción" | "aventura" | "drama" | "suspense" | "deportivo" | "humor" | "biografía";

interface numEpisodesperSeason {
    nameSeason: string,
    numberEpisodes: number
}

export interface TvShowDocumentInterface extends Document {
  name: string;
  sinopsis: string;
  year: number,
  lastSeasonYear: number,
  seasonNumber: number,
  averageDuration: number,
  numEpisodesperSeason: numEpisodesperSeason[],
  cast: string[],
  direction: string[],
  genre: genre[],
  users: Types.ObjectId[]
}

const TvShowSchema = new Schema<TvShowDocumentInterface>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  sinopsis: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true,
    validate(n: number) {
        if (n > new Date().getFullYear()) {
            throw new Error("Año invalido")
        }
    }
  },
  lastSeasonYear: {
    type: Number,
    required: true,
    validate(n: number) {
        if (n > new Date().getFullYear()) {
            throw new Error("Año invalido")
        }
    }
  },
  seasonNumber: {
    type: Number,
    required: true,
    validate(n: number) {
        if (n <= 0) {
            throw new Error("Número invalido")
        }
    }
  },
  averageDuration: {
    type: Number,
    required: true,
    validate(n: number) {
        if (n <= 0) {
            throw new Error("Número invalido")
        }
    }
  },
  numEpisodesperSeason: [{
    _id: false,
    nameSeason: {
        type: String,
        required: true
    },
    numberEpisodes: {
        type: Number,
        required: true,
        validate(n: number) {
            if (n <= 0 || !Number.isInteger(n)) {
                throw new Error("Error");
            }
        }
    }   
  }],
  cast: [{
    type: String,
    required: true
  }],
  direction: [{
    type: String,
    required: true
  }],
  genre: [{
    type: String,
    enum: ["acción", "aventura", "drama", "suspense", "deportivo", "humor", "biografía"]
  }],
  users: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }]
});

export const TvShow = model<TvShowDocumentInterface>('TvShow', TvShowSchema);