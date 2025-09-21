'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePortfolioStore } from '@/store/portfolioStore'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const schema = z.object({
  firstName: z.string().min(1, 'กรุณากรอกชื่อ'),
  lastName: z.string().min(1, 'กรุณากรอกนามสกุล'),
  school: z.string().min(1),
  gpa: z.number().min(0).max(4),
  reason: z.string().min(1),
  major: z.string().min(1),
  university: z.string().min(1),
  skills: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export default function PortfolioForm() {
  const { addStudent } = usePortfolioStore()
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const router = useRouter()
  const [studentImage, setStudentImage] = useState<string>('')
  const [awards, setAwards] = useState<string[]>([])
  const [activities, setActivities] = useState<string[]>([])
  const [projects, setProjects] = useState<string[]>([])
  const [saved, setSaved] = useState(false)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => setter(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleMultipleFiles = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string[]) => void) => {
    const files = e.target.files
    if (!files) return
    const arr: string[] = []
    Array.from(files).forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        arr.push(reader.result as string)
        if (arr.length === files.length) setter(arr)
      }
      reader.readAsDataURL(file)
    })
  }

  const onSubmit = (data: FormData) => {
    addStudent({
      id: Date.now().toString(),
      ...data,
      imageUrl: studentImage || '/default-avatar.png',
      awards,
      activities,
      projects,
    })
    reset()
    setStudentImage('')
    setAwards([])
    setActivities([])
    setProjects([])
    setSaved(true)
  }

  const renderFileInput = (
    label: string,
    single: boolean,
    fileState: string | string[],
    setter: any,
    borderColor: string,
    id: string
  ) => (
    <div className="mb-4">
      <label className="block mb-1 font-medium text-gray-800">{label}</label>
      <div className="relative inline-block">
        <input
          type="file"
          accept="image/*"
          multiple={!single}
          id={id}
          className="absolute w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => single ? handleFile(e, setter) : handleMultipleFiles(e, setter)}
        />
        <label
          htmlFor={id}
          className={`bg-indigo-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-indigo-700`}
        >
          {single ? 'เลือกไฟล์' : 'เลือกหลายไฟล์'}
        </label>
      </div>
      <p className="mt-1 text-gray-700">
        {single
          ? fileState ? 'ไฟล์: ' + (fileState as string).slice(-15) : 'ยังไม่ได้เลือกไฟล์'
          : (fileState as string[]).length > 0 ? 'จำนวนไฟล์: ' + (fileState as string[]).length : 'ยังไม่ได้เลือกไฟล์'}
      </p>
      <div className="flex flex-wrap gap-2 mt-2">
        {single
          ? fileState && <img src={fileState as string} className={`w-32 h-32 object-cover rounded border-2 ${borderColor}`} />
          : (fileState as string[]).map((img, i) => <img key={i} src={img} className={`w-24 h-24 object-cover rounded border-2 ${borderColor}`} />)
        }
      </div>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto mt-8">
      {/* ปุ่มกลับหน้า Login */}
      <div className="mb-4 text-right">
        <button
          onClick={() => router.push('/login')}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          กลับไปหน้า Login
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-gray-50 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-indigo-700">ฟอร์ม Portfolio นักเรียน</h1>

        {saved && (
          <div className="p-4 bg-green-100 text-green-800 rounded text-center">
            บันทึก Portfolio เรียบร้อยแล้ว
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-gray-800">ชื่อ</label>
            <input {...register('firstName')} className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-400 text-black" />
            {errors.firstName && <p className="text-red-600 text-sm">{errors.firstName.message}</p>}
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-800">นามสกุล</label>
            <input {...register('lastName')} className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-400 text-black" />
            {errors.lastName && <p className="text-red-600 text-sm">{errors.lastName.message}</p>}
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-800">โรงเรียน</label>
          <input {...register('school')} className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-400 text-black" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-gray-800">GPA</label>
            <input type="number" step="0.01" {...register('gpa', { valueAsNumber: true })} className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-400 text-black" />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-800">สาขาที่เลือก</label>
            <input {...register('major')} className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-400 text-black" />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-800">มหาวิทยาลัย</label>
          <input {...register('university')} className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-400 text-black" />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-800">เหตุผลในการสมัคร</label>
          <textarea {...register('reason')} className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-400 text-black" rows={3} />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-800">ความสามารถพิเศษ</label>
          <input {...register('skills')} className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-400 text-black" />
        </div>

        {renderFileInput('รูปนักเรียน', true, studentImage, setStudentImage, 'border-indigo-300', 'studentImage')}
        {renderFileInput('รางวัล', false, awards, setAwards, 'border-green-300', 'awards')}
        {renderFileInput('กิจกรรม', false, activities, setActivities,'border-blue-300', 'activities')}
        {renderFileInput('ผลงาน', false, projects,setProjects, 'border-purple-300', 'projects')}

        <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          บันทึก Portfolio
        </button>
      </form>
    </div>
  )
}
