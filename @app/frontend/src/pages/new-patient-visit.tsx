"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { PlusCircle } from "lucide-react"

const NewPatientVisitPage: React.FC = () => {
  const [symptoms, setSymptoms] = useState("")
  const [diagnosis, setDiagnosis] = useState("")
  const [treatment, setTreatment] = useState("")
  const [notes, setNotes] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log({ symptoms, diagnosis, treatment, notes })
  }

  const handleAddition = (type: string) => {
    // Handle adding medications, expenses, or labs
    console.log(`Adding ${type}`)
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">Emily Rodriguez</CardTitle>
              <p className="text-sm text-muted-foreground">Patient ID: P12345</p>
            </div>
            <Button variant="outline">View History</Button>
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
                  onClick={() => handleAddition("medications prescribed")}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Medications Prescribed
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleAddition("medications dispensed")}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Medications Dispensed
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleAddition("expenses")}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Expenses
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleAddition("labs")}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Labs
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
  )
}

export default NewPatientVisitPage

