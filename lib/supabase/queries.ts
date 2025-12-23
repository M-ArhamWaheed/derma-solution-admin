import { createClient } from './server'
import type { 
  Category, 
  ServiceWithCategory,
  OrderWithDetails,
  ReviewWithDetails 
} from '@/types'

// Category Queries
export async function getCategories() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
  
  if (error) throw error
  return data as Category[]
}

export async function getCategoryById(id: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data as Category
}

// Service Queries
export async function getServices() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('services')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data as ServiceWithCategory[]
}

export async function getServicesByCategory(categoryId: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('services')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('category_id', categoryId)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data as ServiceWithCategory[]
}

export async function getPopularServices() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('services')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('is_popular', true)
    .eq('is_active', true)
    .limit(3)
  
  if (error) throw error
  return data as ServiceWithCategory[]
}

export async function getServiceById(id: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('services')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data as ServiceWithCategory
}

// Order Queries
export async function getOrders() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      service:services(
        *,
        category:categories(*)
      ),
      customer:profiles(*)
    `)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data as OrderWithDetails[]
}

export async function getOrdersByCustomer(customerId: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      service:services(
        *,
        category:categories(*)
      ),
      customer:profiles(*)
    `)
    .eq('customer_id', customerId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data as OrderWithDetails[]
}

export async function getRecentOrders(limit: number = 10) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      service:services(
        *,
        category:categories(*)
      ),
      customer:profiles(*)
    `)
    .order('created_at', { ascending: false })
    .limit(limit)
  
  if (error) throw error
  return data as OrderWithDetails[]
}

// Review Queries
export async function getFeaturedReviews() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      customer:profiles(*),
      service:services(*)
    `)
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data as ReviewWithDetails[]
}

// Stats Queries (for admin dashboard)
export async function getStats() {
  const supabase = await createClient()
  
  // Get total customers
  const { count: totalCustomers, error: customersError } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'customer')
  
  if (customersError) throw customersError
  
  // Get total orders
  const { count: totalOrders, error: ordersError } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })
  
  if (ordersError) throw ordersError
  
  // Get total categories
  const { count: totalCategories, error: categoriesError } = await supabase
    .from('categories')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)
  
  if (categoriesError) throw categoriesError
  
  // Get total services
  const { count: totalServices, error: servicesError } = await supabase
    .from('services')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)
  
  if (servicesError) throw servicesError
  
  return {
    totalCustomers: totalCustomers || 0,
    totalOrders: totalOrders || 0,
    totalCategories: totalCategories || 0,
    totalServices: totalServices || 0,
  }
}

