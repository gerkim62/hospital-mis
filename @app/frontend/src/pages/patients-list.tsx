'use client'

import { NewPatientModal } from '@/components/modals/new-patient'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { ChevronDown, ChevronRight, ChevronUp, Clock, Search } from 'lucide-react'
import React, { useMemo, useState } from 'react'

type Patient = {
  id: string
  name: string
  labCount: number
  arrivalTime: Date
  leftAt: Date | null
}

type SortOption = 'name' | 'arrivalTime'

const PatientsListView: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  
  // Sample data - replace with actual data
  const patients: Patient[] = [
    {
      id: "1",
      name: "John Doe",
      labCount: 3,
      arrivalTime: new Date("2024-01-17T08:30:00"),
      leftAt: new Date("2024-01-17T10:45:00"),
    },
    {
      id: "2",
      name: "Jane Smith",
      labCount: 0,
      arrivalTime: new Date("2024-01-17T09:15:00"),
      leftAt: null,
    },
    {
      id: "3",
      name: "Alice Johnson",
      labCount: 2,
      arrivalTime: new Date("2024-01-17T10:00:00"),
      leftAt: null,
    },
    {
      id: "4",
      name: "Bob Williams",
      labCount: 0,
      arrivalTime: new Date("2024-01-17T11:30:00"),
      leftAt: new Date("2024-01-17T12:45:00"),
    },
  ]

  const itemsPerPage = 10
  const formatTime = (date: Date | null) => date?.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })

  const filteredAndSortedPatients = useMemo(() => {
    return patients
      .filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        let comparison = 0
        switch (sortBy) {
          case 'name':
            comparison = a.name.localeCompare(b.name)
            break
          case 'arrivalTime':
            comparison = a.arrivalTime.getTime() - b.arrivalTime.getTime()
            break
        }
        return sortOrder === 'asc' ? comparison : -comparison
      })
  }, [patients, searchTerm, sortBy, sortOrder])

  const totalPages = Math.ceil(filteredAndSortedPatients.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedPatients = filteredAndSortedPatients.slice(startIndex, startIndex + itemsPerPage)

  const handleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortOrder(current => current === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(option)
      setSortOrder('asc')
    }
  }

  const handleNewPatient = () => {
    // Implement new patient functionality
    console.log("New patient button clicked")
  }

  const SortableHeader: React.FC<{ title: string, option: SortOption, className?: string }> = ({ title, option, className }) => (
    <Button 
      variant="ghost" 
      onClick={() => handleSort(option)}
      className={`h-full w-full justify-start px-2 py-1 hover:bg-muted/80 hover:text-accent-foreground transition-colors ${className}`}
    >
      <div className="flex items-center gap-2">
        <span className="font-semibold">{title}</span>
        {sortBy === option && (
          sortOrder === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
        )}
      </div>
    </Button>
  )

  return (
    <Card className="container mx-auto max-w-6xl p-4">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-2xl">Patients List</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <NewPatientModal 
            onAddPatient={handleNewPatient}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[200px]">
                  <SortableHeader title="Name" option="name" />
                </TableHead>
                <TableHead className="w-[150px]">
                  <SortableHeader title="Arrival Time" option="arrivalTime" />
                </TableHead>
                <TableHead className="w-[150px]">Left At</TableHead>
                <TableHead className="w-[150px]">Pending Labs</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedPatients.map((patient) => (
                <TableRow key={patient.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {formatTime(patient.arrivalTime)}
                    </div>
                  </TableCell>
                  <TableCell>
                    {patient.leftAt ? (
                      formatTime(patient.leftAt)
                    ) : (
                      <span className="text-green-600 font-medium">In Facility</span>
                    )}
                  </TableCell>
                  <TableCell >
                    {patient.labCount > 0 ? "Yes" : "No"}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="w-full hover:bg-primary hover:text-primary-foreground transition-colors">
                      View Details
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className={`${currentPage === 1 ? "pointer-events-none opacity-50" : ""} hover:bg-muted hover:text-accent-foreground transition-colors`}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                    className="hover:bg-muted hover:text-accent-foreground transition-colors"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className={`${currentPage === totalPages ? "pointer-events-none opacity-50" : ""} hover:bg-muted hover:text-accent-foreground transition-colors`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  )
}

export default PatientsListView
