// src/store/portfolioStore.ts
import { create } from 'zustand'

export interface Student {
  id: string
  firstName: string
  lastName: string
  school: string
  gpa: number
  major: string
  university: string
  reason: string
  skills?: string
  imageUrl: string
  awards?: string[]
  activities?: string[]
  projects?: string[]
}

interface PortfolioStore {
  students: Student[]
  addStudent: (student: Student) => void
  loadStudents: () => void
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  students: [],
  addStudent: (student) => set(state => {
    const updated = [...state.students, student]
    localStorage.setItem('students', JSON.stringify(updated))
    return { students: updated }
  }),
  loadStudents: () => {
    const saved = localStorage.getItem('students')
    if (saved) set({ students: JSON.parse(saved) })
  }
}))
