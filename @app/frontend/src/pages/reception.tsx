"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { User } from "lucide-react";
import { ApiResponseType } from "@/types/api";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export default function ReceptionPage() {
  const [entryType, setEntryType] = useState<"existing" | "new">("existing");
  const [patientNumber, setPatientNumber] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const navigate = useNavigate();

  useEffect(() => {
    fetchDate();
  }, []);

  async function fetchDate() {
    const res = await fetch("/api/v1/date");
    const json = (await res.json()) as ApiResponseType<{
      current_date: string;
    }>;
    if (!json.success) {
      toast.error(json.message);
      return;
    }

    setCurrentDate(new Date(json.data.current_date));
  }

  function getAge(dateOfBirth: Date) {
    const diff = currentDate.getTime() - dateOfBirth.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  function getDateOfBirth(age: number) {
    const date = new Date();
    date.setFullYear(date.getFullYear() - age);
    return date;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (entryType === "existing") {
      // Implement existing patient logic
    } else {
      if (!name || !age || !dateOfBirth || !address || !phoneNumber) {
        toast.error("Please fill all fields.");
        setLoading(false);
        return;
      }
      await createPatient({
        name,
        phone: phoneNumber,
        address,
        dateOfBirth: dateOfBirth.toISOString().split("T")[0],
      });
    }

    setLoading(false);
  };

  async function createPatient(data: {
    name: string;
    phone: string;
    address: string;
    dateOfBirth: string;
  }) {
    try {
      console.log(data);
      const response = await fetch("/api/v1/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = (await response.json()) as ApiResponseType<{
        id: string;
        name: string;
        birthDate: Date;
        phone: string;
        address: string;
        createdAt: Date;
        updatedAt: Date;
      }>;
      console.log(json);

      if (!json.success) {
        toast.error(json.message);
        return;
      }

      toast.success(json.message);
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      navigate({
        to: "/patients",
      });
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gray-50 space-y-1">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Reception Entry
          </CardTitle>
          <CardDescription>Enter patient information</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <RadioGroup
              defaultValue="existing"
              className="flex gap-4"
              onValueChange={(value) =>
                setEntryType(value as "existing" | "new")
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="existing" id="existing" />
                <Label htmlFor="existing">Existing Patient</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="new" id="new" />
                <Label htmlFor="new">New Patient</Label>
              </div>
            </RadioGroup>

            {entryType === "existing" ? (
              <div className="space-y-2">
                <Label htmlFor="patientNumber">Patient Number</Label>
                <Input
                  id="patientNumber"
                  value={patientNumber}
                  onChange={(e) => setPatientNumber(e.target.value)}
                  placeholder="Enter patient number"
                  className="max-w-md"
                />
              </div>
            ) : (
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      value={age}
                      onChange={(e) => {
                        const age = Number(e.target.value);
                        const dateOfBirth = getDateOfBirth(age);
                        setAge((age || "").toString());
                        setDateOfBirth(dateOfBirth);
                      }}
                      placeholder="Enter age"
                      type="number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      value={dateOfBirth?.toISOString().split("T")[0] || ""}
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        const age = getAge(date);
                        setAge(age.toString());
                        setDateOfBirth(date);
                      }}
                      type="date"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter place name (e.g., Nairobi)"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter phone number"
                    type="tel"
                  />
                </div>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="bg-gray-50 px-6 py-4">
          <Button
            disabled={loading}
            type="submit"
            className="w-full"
            onClick={handleSubmit}
          >
            Proceed
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
