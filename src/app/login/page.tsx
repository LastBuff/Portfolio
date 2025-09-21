'use client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center space-y-6">
        <h1 className="text-2xl text-black font-bold">เข้าสู่ระบบ TCAS69</h1>

        <div className="space-y-4">
          <button
            onClick={() => router.push('/user/form')} // ← ไปที่ form โดยตรง
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            เข้าสู่ระบบนักเรียน
          </button>
          <button
            onClick={() => router.push('/admin/table')} // ← ไปที่ตารางอาจารย์
            className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            เข้าสู่ระบบอาจารย์
          </button>
        </div>
      </div>
    </div>
  )
}
