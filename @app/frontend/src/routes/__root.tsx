import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Toaster } from 'sonner'

import { FlaskConical, HomeIcon, Package, Users } from 'lucide-react'

export const Route = createRootRoute({
  component: () => (
    <>
  <nav className="bg-background shadow-xs border-b">
    <div className="container mx-auto px-4">
      <div className="flex items-center h-16 gap-8">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-foreground font-medium hover:text-foreground/80 transition-colors [&.active]:font-bold [&.active]:text-foreground [&.active]:border px-2 py-1  rounded "
        >
          <HomeIcon size={20} className="text-muted-foreground" />
          <span>Home</span>
        </Link>

        <Link 
          to="/patients" 
          className="flex items-center gap-2 text-foreground font-medium hover:text-foreground/80 transition-colors [&.active]:font-bold [&.active]:text-foreground [&.active]:border px-2 py-1  rounded "
        >
          <Users size={20} className="text-muted-foreground" />
          <span>Patients</span>
        </Link>

        <Link 
          to="/labs" 
          className="flex items-center gap-2 text-foreground font-medium hover:text-foreground/80 transition-colors [&.active]:font-bold [&.active]:text-foreground [&.active]:border px-2 py-1  rounded "
        >
          <FlaskConical size={20} className="text-muted-foreground" />
          <span>Labs</span>
        </Link>

        <Link 
          to="/stock" 
          className="flex items-center gap-2 text-foreground font-medium hover:text-foreground/80 transition-colors [&.active]:font-bold [&.active]:text-foreground [&.active]:border px-2 py-1  rounded "
        >
          <Package size={20} className="text-muted-foreground" />
          <span>Stock</span>
        </Link>
      </div>
    </div>
  </nav>

  <main className="container mx-auto px-4 py-4 bg-card ">
    <Outlet />
    <Toaster />

  </main>

  <TanStackRouterDevtools />
</>
  
  ),
})