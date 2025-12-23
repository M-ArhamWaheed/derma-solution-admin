"use client"

import { useState, useEffect } from "react"
import { ServiceForm } from "@/components/admin/service-form"
import type { Category, ServiceWithCategory } from "@/types"

export default function ClientServicesSection({ categories }: { categories: Category[] }) {
  const [services, setServices] = useState<ServiceWithCategory[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editService, setEditService] = useState<ServiceWithCategory | null>(null)

  useEffect(() => {
    const fetchServices = async () => {
      const res = await fetch("/api/services")
      if (res.ok) setServices(await res.json())
    }
    fetchServices()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const refreshServices = async () => {
    const res = await fetch("/api/services")
    if (res.ok) setServices(await res.json())
  }

  const handleServiceSaved = () => {
    setShowForm(false)
    setEditService(null)
    refreshServices()
  }

  const handleEdit = (service: ServiceWithCategory) => {
    setEditService(service)
    setShowForm(true)
  }

  const handleDelete = async (service: ServiceWithCategory) => {
    if (!window.confirm(`Delete service \"${service.name}\"?`)) return
    const res = await fetch(`/api/services/${service.id}`, { method: "DELETE" })
    if (res.ok) {
      setServices(services.filter((s) => s.id !== service.id))
    }
  }

  return (
    <>
      <div className="mb-6">
        <button className="bg-primary text-white px-4 py-2 rounded" onClick={() => { setShowForm(v => !v); setEditService(null); }}>
          {showForm && !editService ? "Cancel" : "Add Service"}
        </button>
      </div>
      {showForm && (
        <ServiceForm onServiceSaved={handleServiceSaved} initialValues={editService} categories={categories} />
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Popular</th>
              <th className="px-4 py-2 border">Active</th>
              <th className="px-4 py-2 border">Manage</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="border-b">
                <td className="px-4 py-2 border font-semibold">{service.name}</td>
                <td className="px-4 py-2 border">{categories.find((c) => c.id === service.category_id)?.name || '-'}</td>
                <td className="px-4 py-2 border">£{service.base_price}</td>
                <td className="px-4 py-2 border text-center">{service.is_popular ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2 border text-center">{service.is_active ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2 border text-center">
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
