import { Weather, Visibility } from "./types";
import { z } from "zod";

const NewEntrySchema = z.object({
  weather: z.nativeEnum(Weather),
  visibility: z.nativeEnum(Visibility),
  date: z.string().date(),
  comment: z.string().optional(),
});

export default NewEntrySchema;
