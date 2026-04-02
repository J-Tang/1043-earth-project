import BottomNav from '@/components/BottomNav'
import HomeContent from '@/components/HomeContent'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="content-area">
        <HomeContent />
      </main>
      <BottomNav activeTab="home" />
    </div>
  )
}