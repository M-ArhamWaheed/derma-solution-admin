"use client"

import { memo } from "react"
import type { ServiceWithCategory } from "@/types"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash } from "lucide-react"

interface ServicesTableProps {
  services: ServiceWithCategory[]
}

function ServicesTableComponent({ services }: ServicesTableProps) {
  if (services.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No services yet
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Popular</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id}>
              <TableCell className="font-medium">{service.name}</TableCell>
              <TableCell>{service.category.name}</TableCell>
              <TableCell>£{service.base_price.toFixed(2)}</TableCell>
              <TableCell>
                {service.is_popular && (
                  <Badge variant="secondary">Popular</Badge>
                )}
              </TableCell>
              <TableCell>
                <Badge variant={service.is_active ? "default" : "secondary"}>
                  {service.is_active ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export const ServicesTable = memo(ServicesTableComponent)

