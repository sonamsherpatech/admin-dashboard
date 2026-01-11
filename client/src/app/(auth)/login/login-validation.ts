import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty("*email cannot be empty")
    .email("*invalid email format"),
  password: z.string().nonempty("*password cannot be empty"),
});

export default loginSchema;
