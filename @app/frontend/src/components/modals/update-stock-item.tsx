'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Minus } from 'lucide-react'

interface StockUpdateModalProps {
  isAdd: boolean
  itemName: string
  currentQuantity: number
  unit: string
  onUpdate: (amount: number) => void
}

export function UpdateStockModal({ isAdd, itemName, currentQuantity, unit, onUpdate }: StockUpdateModalProps) {
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const updateAmount = parseInt(amount, 10)
    if (updateAmount > 0) {
      onUpdate(isAdd ? updateAmount : -updateAmount)
      setOpen(false)
      setAmount('')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          {isAdd ? (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Restock
            </>
          ) : (
            <>
              <Minus className="mr-2 h-4 w-4" />
              Withdraw
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isAdd ? 'Restock' : 'Withdraw'} {itemName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="col-span-3"
              required
              min="1"
              max={isAdd ? undefined : currentQuantity}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Current</Label>
            <div className="col-span-3">
              {currentQuantity} {unit}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">After</Label>
            <div className="col-span-3">
              {isAdd 
                ? currentQuantity + (parseInt(amount) || 0)
                : currentQuantity - (parseInt(amount) || 0)} {unit}
            </div>
          </div>
          <Button type="submit" className="ml-auto">
            {isAdd ? 'Restock' : 'Withdraw'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

