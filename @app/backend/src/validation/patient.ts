import z from "zod";

const NewPatientSchema = z.object({
  name: z.string().nonempty({
    message: "Please enter a valid patient full name",
  }),
  phone: z.string().nonempty({
    message: "Please enter a valid phone number",
  }),
  address: z.string().nonempty({
    message: "Please enter a valid address",
  }),
  dateOfBirth: z.coerce.date({
    message: "Please enter a valid date of birth",
  }),
});

export type NewPatientInput = z.input<typeof NewPatientSchema>;
export type NewPatientValues = z.output<typeof NewPatientSchema>;

export { NewPatientSchema };

