import prisma from "../config/prisma";
import { NewPatientValues } from "../validation/patient";

async function createPatient(data: NewPatientValues) {
  const patient = await prisma.patient.create({
    data: {
      name: data.name,
      phone: data.phone,
      address: data.address,
      birthDate: data.dateOfBirth,
    },
  });

  return patient;
}

export { createPatient };
