import { z } from "zod";

// ========================================================================================================

export const createUserSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Le nom doit contenir 2 caractères au minimum" })
    .max(50, { message: "Le nom doit contenir 50 caractères au maximum" }),
  email: z
    .string()
    .min(2, { message: "L'adresse email doit contenir 2 caractères au minimum" })
    .max(75)
    .email({ message: "L'adresse email n'est pas valide" }),
});

// ========================================================================================================

export const updateUserSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(2, { message: "Le nom doit contenir 2 caractères au minimum" })
    .max(50, { message: "Le nom doit contenir 50 caractères au maximum" }),
  email: z
    .string()
    .min(2, { message: "L'adresse email doit contenir 2 caractères au minimum" })
    .max(75)
    .email({ message: "L'adresse email n'est pas valide" }),
});

// ========================================================================================================
