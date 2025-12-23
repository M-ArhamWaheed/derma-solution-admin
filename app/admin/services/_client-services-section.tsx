"use client"

import { useState, useEffect } from "react"
import { ServiceForm } from "@/components/admin/service-form"
import type { Category, ServiceWithCategory } from "@/types"

export default function ClientServicesSection({ categories }: { categories: Category[] }) {
  const [services, setServices] = useState<ServiceWithCategory[]>([])
  const [editService, setEditService] = useState<ServiceWithCategory | null>(null)

  useEffect(() => {
    const fetchServices = async () => {
      const res = await fetch("/api/services")
      if (res.ok) setServices(await res.json())
    }
    fetchServices()
  }, [])

  const refreshServices = async () => {
    const res = await fetch("/api/services")
    if (res.ok) setServices(await res.json())
  }

  const handleServiceSaved = () => {
    setEditService(null)
    refreshServices()
  }

  const handleEdit = (service: ServiceWithCategory) => {
    setEditService(service)
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (service: ServiceWithCategory) => {
    if (!window.confirm(`Delete service \"${service.name}\"?`)) return
    const res = await fetch(`/api/services/${service.id}`, { method: "DELETE" })
    if (res.ok) {
      setServices(services.filter((s) => s.id !== service.id))
    }
  }

  const handleCancelEdit = () => {
    setEditService(null)
  }

  return (
    <>
      <div className="mb-8">
        <ServiceForm 
          onServiceSaved={handleServiceSaved} 
          initialValues={editService} 
          categories={categories}
          onCancel={handleCancelEdit}
        />
      </div>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="min-w-full bg-card">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border">Category</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border">Price</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-foreground border-b border-border">Popular</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-foreground border-b border-border">Active</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-foreground border-b border-border">Manage</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 font-semibold text-foreground">{service.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{categories.find((c) => c.id === service.category_id)?.name || '-'}</td>
                <td className="px-4 py-3 text-foreground">£{service.base_price}</td>
                <td className="px-4 py-3 text-center text-foreground">{service.is_popular ? 'Yes' : 'No'}</td>
                <td className="px-4 py-3 text-center text-foreground">{service.is_active ? 'Yes' : 'No'}</td>
                <td className="px-4 py-3 text-center">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded mr-2" onClick={() => handleEdit(service)}>Edit</button>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded" onClick={() => handleDelete(service)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
