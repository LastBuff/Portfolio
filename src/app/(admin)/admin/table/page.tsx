'use client'

import { usePortfolioStore } from '@/store/portfolioStore'
import { useState } from 'react'
import StudentDetails from '@/components/StudentDetails'
import { useRouter } from 'next/navigation'

export default function AdminTable() {
  const { students } = usePortfolioStore()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const router = useRouter() // สำหรับ redirect

  if (selectedId) {
    return <StudentDetails id={selectedId} onClose={() => setSelectedId(null)} />
  }

  return (
    <div className="max-w-5xl mx-auto mt-8 p-4 bg-gray-50 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-indigo-700 text-center flex-1">รายชื่อนักเรียน</h1>
        <button
          onClick={() => router.push('/login')}
          className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          กลับไปหน้า Login
        </button>
      </div>

      <table className="w-full border border-gray-300 rounded overflow-hidden">
        <thead className="bg-green-200">
          <tr>
            <th className="border px-4 py-2 text-black">ชื่อ</th>
            <th className="border px-4 py-2 text-black">นามสกุล</th>
            <th className="border px-4 py-2 text-black">GPA</th>
            <th className="border px-4 py-2 text-black">รายละเอียด</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2 text-black">{s.firstName}</td>
              <td className="border px-4 py-2 text-black">{s.lastName}</td>
              <td className="border px-4 py-2 text-black">{s.gpa}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  onClick={() => setSelectedId(s.id)}
                >
                  ดูรายละเอียด
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
