"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, PlusCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Route } from "@/routes/patients/$patientId/visits/new";
import useCurrentPatient from "@/hooks/useCurrentPatient";
import { AddExpenseModal, Expense } from "@/components/modals/new-expense";
import {
  AddMedicationPrescribedModal,
  MedicationPrescribed,
} from "@/components/modals/new-medication-prescribed";
import {
  DispensedMedication,
  DispenseMedicationModal,
} from "@/components/modals/new-medication-dispense";

type Modal =
  | "medicationsPrescribed"
  | "expenses"
  | "labs"
  | "medicationsDispensed";

const NewPatientVisitPage: React.FC = () => {
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [notes, setNotes] = useState("");

  const [modal, setModal] = useState<Modal | null>(null);

  const [medicationsPrescribed, setMedicationsPrescribed] = useState<
    MedicationPrescribed[]
  >([]);
  const [medicationsDispensed, setMedicationsDispensed] = useState<
    DispensedMedication[]
  >([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [labs, setLabs] = useState([]);

  const { patientId } = Route.useParams();

  const { patient } = useCurrentPatient(Number(patientId));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log({ symptoms, diagnosis, treatment, notes });
  };

  const handleAddition = (type: Modal) => {
    setModal(type);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <AddExpenseModal
        expenses={expenses}
        onRemoveExpense={(id) =>
          setExpenses((prev) => prev.filter((expense) => expense.id !== id))
        }
        isOpen={modal === "expenses"}
        onClose={() => setModal(null)}
        onAddExpense={(expense) => setExpenses((prev) => [...prev, expense])}
      />
      <AddMedicationPrescribedModal
        isOpen={modal === "medicationsPrescribed"}
        medications={medicationsPrescribed}
        onClose={() => setModal(null)}
        onAddMedication={(medication) =>
          setMedicationsPrescribed((prev) => [...prev, medication])
        }
        onRemoveMedication={(id) =>
          setMedicationsPrescribed((prev) =>
            prev.filter((medication) => medication.id !== id)
          )
        }
      />
      <DispenseMedicationModal
        dispensedMedications={medicationsDispensed}
        isOpen={modal === "medicationsDispensed"}
        onClose={() => setModal(null)}
        onDispense={(medication) => {
          setMedicationsDispensed((prev) => [...prev, medication]);
        }}
        onRemove={(id) => {
          setMedicationsDispensed((prev) =>
            prev.filter((medication) => medication.id !== id)
          );
        }}
      />
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">
                {patient?.name ?? "N/A"}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Patient ID: {patient?.id ?? "N/A"}
              </p>
            </div>
            <Link to="/patients/$patientId/visits" params={{ patientId }}>
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous Visits
              </Button>
            </Link>
          </div>
        </CardHeader>
        <Separator className="my-4" />
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="symptoms" className="text-base">
                  Symptoms <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="symptoms"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  required
                  className="mt-1 w-full"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="diagnosis" className="text-base">
                    Diagnosis
                  </Label>
                  <Input
                    id="diagnosis"
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="treatment" className="text-base">
                    Treatment
                  </Label>
                  <Input
                    id="treatment"
                    value={treatment}
                    onChange={(e) => setTreatment(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notes" className="text-base">
                  Notes
                </Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1 w-full"
                  rows={3}
                />
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Additional Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleAddition("medicationsPrescribed")}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Medications Prescribed ({medicationsPrescribed.length})
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleAddition("medicationsDispensed")}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Medications Dispensed ({medicationsDispensed.length})
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleAddition("expenses")}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Expenses ({expenses.length})
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleAddition("labs")}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Labs ({labs.length})
                </Button>
              </div>
            </div>

            <div className="pt-6">
              <Button type="submit" className="w-full sm:w-auto">
                Save Visit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewPatientVisitPage;
