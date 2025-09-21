'use client'

import { usePortfolioStore } from '@/store/portfolioStore'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface StudentDetailsProps {
  id: string
  onClose?: () => void
}

export default function StudentDetails({ id, onClose }: StudentDetailsProps) {
  const { students } = usePortfolioStore()
  const student = students.find(s => s.id === id)
  const router = useRouter()
  const [modalImage, setModalImage] = useState<string | null>(null)

  if (!student) return <p className="text-black text-center mt-8">ไม่พบข้อมูลนักเรียน</p>

  const renderImageGallery = (label: string, images?: string[]) => (
    <div className="mb-4">
      <h3 className="font-semibold text-black mb-2">{label}</h3>
      <div className="flex flex-wrap gap-2">
        {images?.map((img, i) => (
          <Image
            key={i}
            src={img}
            alt={`${label} ${i + 1}`}
            width={96}
            height={96}
            className="object-cover rounded border-2 border-gray-300 cursor-pointer"
            onClick={() => setModalImage(img)}
          />
        ))}
      </div>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-gray-50 rounded-xl shadow-lg text-black">
      {/* ปุ่มกลับ */}
      <div className="mb-4 text-right">
        <button
          onClick={() => router.push('/login')}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          กลับหน้า Login
        </button>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            กลับไปรายชื่อ
          </button>
        )}
      </div>

      <h1 className="text-3xl font-bold text-black text-center mb-6">รายละเอียดนักเรียน</h1>

      {/* รูปนักเรียน */}
      <div className="mb-4 text-center">
        <Image
          src={student.imageUrl || '/default-avatar.png'}
          alt="รูปนักเรียน"
          width={160}
          height={160}
          className="object-cover rounded-full mx-auto cursor-pointer border-2 border-indigo-300"
          onClick={() => setModalImage(student.imageUrl || '/default-avatar.png')}
        />
      </div>

      {/* ข้อมูลส่วนตัว */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <p><strong>ชื่อ:</strong> {student.firstName}</p>
        <p><strong>นามสกุล:</strong> {student.lastName}</p>
        <p><strong>โรงเรียน:</strong> {student.school}</p>
        <p><strong>GPA:</strong> {student.gpa}</p>
        <p><strong>สาขาที่เลือก:</strong> {student.major}</p>
        <p><strong>มหาวิทยาลัย:</strong> {student.university}</p>
      </div>

      <div className="mb-4">
        <p><strong>เหตุผลในการสมัคร:</strong> {student.reason}</p>
      </div>

      <div className="mb-4">
        <p><strong>ความสามารถพิเศษ:</strong> {student.skills}</p>
      </div>

      {/* Galleries */}
      {renderImageGallery('รางวัล', student.awards)}
      {renderImageGallery('กิจกรรม', student.activities)}
      {renderImageGallery('ผลงาน', student.projects)}

      {/* Modal แสดงรูป */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setModalImage(null)}
        >
          <Image
            src={modalImage}
            alt="Preview"
            width={600}
            height={600}
            className="object-contain rounded shadow-lg"
          />
        </div>
      )}
    </div>
  )
}
