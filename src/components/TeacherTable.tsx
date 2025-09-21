'use client'

import Link from 'next/link'
import { usePortfolioStore } from '@/store/portfolioStore'

export default function TeacherTable() {
  const { students } = usePortfolioStore()

  return (
    <div className="overflow-x-auto bg-white shadow rounded-xl">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-left">ชื่อ</th>
            <th className="p-2 text-left">โรงเรียน</th>
            <th className="p-2 text-left">GPA</th>
            <th className="p-2 text-left">รายละเอียด</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id} className="border-t">
              <td className="p-2">{s.firstName} {s.lastName}</td>
              <td className="p-2">{s.school}</td>
              <td className="p-2">{s.gpa}</td>
              <td className="p-2">
                <Link href={`/student/${s.id}`} className="text-blue-600 hover:underline">
                  ดูรายละเอียด
                </Link>
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center text-gray-500 py-4">
                ยังไม่มีข้อมูลนักศึกษา
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
