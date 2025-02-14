import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir 2 caractères au minimum" }).max(50),
  email: z
    .string()
    .email({ message: "L'adresse email n'est pas valide" })
    .min(2, { message: "Le nom doit contenir 2 caractères au minimum" })
    .max(75),
});
