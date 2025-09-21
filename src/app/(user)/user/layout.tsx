export default function UserLayout({ children }: { children: React.ReactNode }) {
return (
<div className="max-w-4xl mx-auto">
<main>{children}</main>
</div>
)
}