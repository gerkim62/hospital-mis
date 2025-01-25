"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, X, ArrowLeft } from "lucide-react";
import { ApiResponseType } from "@/types/api";
import { toast } from "sonner";

type FetchedMedication = {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unit: string;
};

export type DispensedMedication = {
  id: string;
  medicationId: string;
  medicationName: string;
  quantity: number;
  unit: string;
  description: string;
  dosage: string;
};

interface DispenseMedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDispense: (medication: DispensedMedication) => void;
  onRemove: (id: string) => void;
  dispensedMedications: DispensedMedication[];
}

export function DispenseMedicationModal({
  isOpen,
  onClose,
  onDispense,
  onRemove,
  dispensedMedications,
}: DispenseMedicationModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [fetchedMedications, setFetchedMedications] = useState<
    FetchedMedication[]
  >([]);
  const [selectedMedication, setSelectedMedication] =
    useState<FetchedMedication | null>(null);
  const [noResult, setNoResult] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [dosage, setDosage] = useState("");

  async function searchStock(term: string) {
    const res = await fetch("/api/v1/stock?search_term=" + term);

    const json = (await res.json()) as ApiResponseType<
      {
        name: string;
        id: string;
        description: string;
        quantity: number;
        unit: string;
      }[]
    >;

    console.log(json);

    if (!json.success) {
      return [];
    }

    return json.data;
  }
  const handleSearch = async () => {
    setIsSearching(true);
    // Simulating an API call

    const items = await searchStock(searchTerm);

    if (!items.length) setNoResult(true);
    else setSearchTerm("");

    setFetchedMedications(items);
    setIsSearching(false);
  };

  const handleSelectMedication = (medication: FetchedMedication) => {
    setSelectedMedication(medication);
    setQuantity("");
    setDescription("");
    setDosage("");
  };

  const handleDispense = () => {
    if (selectedMedication) {
      onDispense({
        medicationId: selectedMedication.id,
        medicationName: selectedMedication.name,
        quantity: Number(quantity),
        unit: selectedMedication.unit,
        description,
        dosage,
        id: Date.now().toString(),
      });
      resetForm();
    }
  };

  const resetForm = () => {
    setSelectedMedication(null);
    setQuantity("");
    setDescription("");
    setDosage("");
    setSearchTerm("");
    setFetchedMedications([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>
            {selectedMedication ? (
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedMedication(null)}
                  className="mr-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                Dispense {selectedMedication.name}
              </div>
            ) : (
              "Dispense Medication"
            )}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {!selectedMedication && (
            <>
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                {dispensedMedications.map((medication) => (
                  <div
                    key={medication.id}
                    className="flex items-center justify-between py-2"
                  >
                    <div>
                      <p className="font-medium">{medication.medicationName}</p>
                      <p className="text-sm text-gray-500">
                        {medication.quantity} {medication.unit}
                      </p>
                      <p className="text-xs text-gray-400">
                        {medication.dosage}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemove(medication.id)}
                      aria-label={`Remove ${medication.medicationName}`}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </ScrollArea>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="medicationSearch" className="text-right">
                  Search
                </Label>
                <div className="col-span-3 flex gap-2">
                  <Input
                    id="medicationSearch"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setNoResult(false);
                    }}
                    placeholder="Enter medication name"
                  />
                  <Button onClick={handleSearch} disabled={isSearching}>
                    {isSearching ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Find"
                    )}
                  </Button>
                </div>
              </div>
              {fetchedMedications.length > 0 ? (
                <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                  {fetchedMedications.map((medication) => (
                    <div
                      key={medication.id}
                      className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-100 rounded px-2"
                      onClick={() => handleSelectMedication(medication)}
                    >
                      <div>
                        <p className="font-medium">{medication.name}</p>
                        <p className="text-sm text-gray-500">
                          {medication.description}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500">
                        {medication.quantity} {medication.unit}
                      </p>
                    </div>
                  ))}
                </ScrollArea>
              ) : (
                noResult && (
                  <p className="text-center text-gray-500">
                    No results found for "{searchTerm}"
                  </p>
                )
              )}
            </>
          )}
          {selectedMedication && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Quantity
                </Label>
                <div className="col-span-3 flex items-center gap-2">
                  <Input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      if (Number(e.target.value) < 0) {
                        setQuantity("0");
                        toast.error("Quantity cannot be less than 1");
                      } else if (
                        selectedMedication.quantity < Number(e.target.value)
                      ) {
                        setQuantity(selectedMedication.quantity.toString());
                        toast.error(
                          "Quantity to dispense cannot exceed available quantity"
                        );
                      } else {
                        setQuantity(e.target.value);
                      }
                    }}
                    min="1"
                    max={selectedMedication.quantity.toString()}
                    required
                  />
                  <span>{selectedMedication.unit}</span>
                </div>
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
            </>
          )}
        </div>
        <DialogFooter>
          {selectedMedication ? (
            <Button
              onClick={handleDispense}
              disabled={
                !quantity ||
                !dosage ||
                Number(quantity) > selectedMedication.quantity ||
                Number(quantity) < 1
              }
            >
              Dispense Medication
            </Button>
          ) : (
            <Button className="w-full" onClick={onClose}>
              Finish
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
