'use client'

import { usePortfolioStore } from '@/store/portfolioStore'

interface StudentDetailsProps {
  id: string
  onClose: () => void
}

export default function StudentDetails({ id, onClose }: StudentDetailsProps) {
  const { students } = usePortfolioStore()
  const student = students.find(s => s.id === id)

  if (!student) return <p className="text-red-600 text-center mt-4">ไม่พบข้อมูลนักเรียน</p>

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-gray-50 text-black rounded-xl shadow-lg space-y-4">
      <h1 className="text-3xl font-bold text-indigo-700 text-center">รายละเอียด Portfolio</h1>

      <div className="flex items-center gap-4">
        <img src={student.imageUrl} className="w-32 h-32 object-cover rounded-full border-2 border-indigo-300" />
        <div className="space-y-1">
          <p><span className="font-semibold text-black">ชื่อ:</span> {student.firstName}</p>
          <p><span className="font-semibold text-black">นามสกุล:</span> {student.lastName}</p>
          <p><span className="font-semibold text-black">GPA:</span> {student.gpa}</p>
          <p><span className="font-semibold text-black">สาขาที่เลือก:</span> {student.major}</p>
          <p><span className="font-semibold text-black">มหาวิทยาลัย:</span> {student.university}</p>
          <p><span className="font-semibold text-black">ความสามารถพิเศษ:</span> {student.skills || '-'}</p>
        </div>
      </div>

      <div>
        <p className="font-semibold mb-1 text-black">เหตุผลในการสมัคร:</p>
        <p className="border p-2 rounded bg-white text-black">{student.reason}</p>
      </div>

      <div>
        <p className="font-semibold mb-1 text-black">รางวัล:</p>
        <div className="flex flex-wrap gap-2">
          {student.awards.length > 0
            ? student.awards.map((img, i) => (
                <img key={i} src={img} className="w-24 h-24 object-cover rounded border-2 border-blue-300" />
              ))
            : <p className=" text-black">ไม่มีรางวัล</p>
          }
        </div>
      </div>

      <div>
        <p className="font-semibold mb-1 text-black">กิจกรรม:</p>
        <div className="flex flex-wrap gap-2">
          {student.activities.length > 0
            ? student.activities.map((img, i) => (
                <img key={i} src={img} className="w-24 h-24 object-cover rounded border-2 border-blue-300" />
              ))
            : <p className="text-black">ไม่มีกิจกรรม</p>
          }
        </div>
      </div>

      <div>
        <p className="font-semibold mb-1 text-black">ผลงาน:</p>
        <div className="flex flex-wrap gap-2">
          {student.projects.length > 0
            ? student.projects.map((img, i) => (
                <img key={i} src={img} className="w-24 h-24 object-cover rounded border-2 border-blue-300" />
              ))
            : <p className="text-black">ไม่มีผลงาน</p>
          }
        </div>
      </div>

      <div className="text-center mt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          กลับ
        </button>
      </div>
    </div>
  )
}
