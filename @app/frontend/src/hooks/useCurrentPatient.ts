import { ApiResponseType } from "@/types/api";
import { useEffect, useState } from "react";

// {"id":1,"name":"Gerison Kimathi","birthDate":"2003-01-23T00:00:00.000Z","phone":"0715870654","address":"463","createdAt":"2025-01-23T14:32:01.055Z","updatedAt":"2025-01-23T14:32:01.055Z"}

async function getPatient(id: number) {
  const res = await fetch(`/api/v1/patients/${id}`);
  const json = (await res.json()) as ApiResponseType<{
    id: number;
    name: string;
    birthDate: Date;
    phone: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
  }>;

  if (!json.success) {
    return null;
  }

  return json.data;
}

function useCurrentPatient(patientId: number) {
  const [patient, setPatient] = useState<{
    id: number;
    name: string;
    birthDate: Date;
    phone: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
  } | null>(null);

  useEffect(() => {
    getPatient(Number(patientId)).then((data) => {
      if (data) {
        setPatient(data);
      }
    });
  }, [patientId]);

  return { patient };
}

export default useCurrentPatient;
