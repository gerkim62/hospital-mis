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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

export type LabTest = {
  id: string;
  name: string;
  description: string;
  status: "PENDING" | "IN_PROGRESS" | "DONE";
};

interface AddLabTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLabTest: (labTest: LabTest) => void;
  onRemoveLabTest: (id: string) => void;
  labTests: LabTest[];
}

export function AddLabTestModal({
  isOpen,
  onClose,
  onAddLabTest,
  onRemoveLabTest,
  labTests,
}: AddLabTestModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<LabTest["status"]>("PENDING");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddLabTest({
      name,
      description,
      status,
      id: Date.now().toString(),
    });
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setStatus("PENDING");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Lab Test Manager</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <ScrollArea className="h-[200px] w-full rounded-md border p-4">
            {labTests.map((labTest) => (
              <div
                key={labTest.id}
                className="flex items-center justify-between py-2"
              >
                <div>
                  <p className="font-medium">{labTest.name}</p>
                  <p className="text-sm text-gray-500">{labTest.status}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveLabTest(labTest.id)}
                  aria-label={`Remove ${labTest.name}`}
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
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  onValueChange={(value: LabTest["status"]) => setStatus(value)}
                  value={status}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="DONE">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button type="submit">Add Lab Test</Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
