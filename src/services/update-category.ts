//update-category.ts
import { PATHS } from "./paths"
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define the interface for the update category request
export interface UpdateCategoryRequest {
  name?: string
  active?: boolean
  display_name?: string
  description?: string | null
  image_url?: string | null
  display_order?: number
  available_from?: string
  available_to?: string
  parent_id?: string | null
}

// Define the API for updating a category
export const updateCategoryApi = createApi({
  reducerPath: 'updateCategoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    updateCategory: builder.mutation<any, { id: string; data: UpdateCategoryRequest }>({
      query: ({ id, data }) => ({
        url: `${PATHS.update_category.replace('{id}', id)}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      }),
    }),
  }),
})

export const { useUpdateCategoryMutation } = updateCategoryApi