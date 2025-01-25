import z from "zod";

// name,description,quantity, unit
const NewStockItemSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  quantity: z.coerce.number().positive(),
  unit: z.string().nonempty(),
});

export type NewStockItemOutput = z.output<typeof NewStockItemSchema>;

export { NewStockItemSchema };
