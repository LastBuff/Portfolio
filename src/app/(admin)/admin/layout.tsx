export default function AdminLayout({ children }: { children: React.ReactNode }) {
return (
<div className="max-w-6xl mx-auto">
<main>{children}</main>
</div>
)
}