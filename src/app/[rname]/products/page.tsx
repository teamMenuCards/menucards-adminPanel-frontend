"use client"
import { useGetMenuListByNameQuery } from "@/services/get-menu-list"
import EditableAccordion from "./EditableAccordion"
import { Button, CircularProgress } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from "react"
import RefreshIcon from '@mui/icons-material/Refresh';
import { useParams } from "next/navigation"

export default function AdminEditProductsPage() {

  const { rname } = useParams<{ rname: string }>()
  const { currentData: menudata, refetch: refetchMenu, isLoading } = useGetMenuListByNameQuery(rname)
  const categories = menudata?.categories || []
  const [isUpdating, setIsUpdating] = useState(false)
 console.log("menudata:",menudata);
  
 const handleUpdateProducts = async () => {
    setIsUpdating(true)
    try {
      await refetchMenu()
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Products</h1>
        <div className="flex items-center">
          {/* <span className="mr-4">Restaurant: {rname}</span> */}
          {/* <Button
            variant="contained"
            color="primary"
            startIcon={isUpdating ? <CircularProgress size={20} color="inherit" /> : <RefreshIcon />}
            onClick={handleUpdateProducts}
            disabled={isUpdating}
            sx={{
              minWidth: 120,
              transition: 'all 0.3s ease',
              '&:hover': { transform: 'translateY(-1px)', boxShadow: 3 }
            }}
          >
            {isUpdating ? 'Refreshing...' : 'Refresh'}
          </Button> */}
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <CircularProgress />
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      ) : (
        <EditableAccordion 
          sections={categories} 
          onUpdateProducts={handleUpdateProducts} 
        />
      )}
    </div>
  )
}


