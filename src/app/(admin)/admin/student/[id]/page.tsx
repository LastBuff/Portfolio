'use client'

import StudentDetails from '@/components/StudentDetails'
import { useRouter } from 'next/navigation'

export default function StudentDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  return (
    <div className="p-6">
      <StudentDetails id={params.id} onClose={() => router.back()} />
    </div>
  )
}
