"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X } from "lucide-react"

export type MedicationPrescribed = {
  name: string
  description: string
  dosage: string
  id: string
}

interface MedicationPrescribedModalProps {
  isOpen: boolean
  onClose: () => void
  onAddMedication: (medication: MedicationPrescribed) => void
  onRemoveMedication: (id: string) => void
  medications: MedicationPrescribed[]
}

export function AddMedicationPrescribedModal({
  isOpen,
  onClose,
  onAddMedication,
  onRemoveMedication,
  medications,
}: MedicationPrescribedModalProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [dosage, setDosage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddMedication({
      name,
      description,
      dosage,
      id: Date.now().toString(),
    })
    resetForm()
  }

  const resetForm = () => {
    setName("")
    setDescription("")
    setDosage("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Medication Prescribed Manager</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <ScrollArea className="h-[200px] w-full rounded-md border p-4">
            {medications.map((medication) => (
              <div key={medication.id} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">{medication.name}</p>
                  <p className="text-sm text-gray-500">{medication.dosage}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveMedication(medication.id)}
                  aria-label={`Remove ${medication.name}`}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </ScrollArea>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dosage" className="text-right">
                  Dosage
                </Label>
                <Input
                  id="dosage"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button type="submit">Add Medication Prescribed</Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

