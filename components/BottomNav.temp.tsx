'use client'

import { Home, Map, Mic2, ShoppingBag, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { id: 'home', label: '首页', icon: Home, href: '/' },
  { id: 'explore', label: '场牌', icon: Map, href: '/explore' },
  { id: 'ai', label: 'AI', icon: Mic2, href: '/ai' },
  { id: 'shop', label: '商城', icon: ShoppingBag, href: '/shop' },
  { id: 'profile', label: '我的', icon: User, href: '/profile' },
]

export default function BottomNav({ activeTab = 'home' }: { activeTab?: string }) {
  const pathname = usePathname()

  const getActiveTab = () => {
    if (activeTab) return activeTab
    const path = pathname || '/'
    if (path === '/') return 'home'
    if (path.startsWith('/explore')) return 'explore'
    if (path.startsWith('/ai')) return 'ai'
    if (path.startsWith('/shop')) return 'shop'
    if (path.startsWith('/profile')) return 'profile'
    return 'home'
  }

  const currentActive = getActiveTab()

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const isActive = currentActive === item.id
        const isAI = item.id === 'ai'
        
        return (
          <Link
            key={item.id}
            href={item.href}
            className={`nav-item ${isActive ? 'active' : ''} ${isAI ? 'nav-ai-button' : ''}`}
          >
            <div className="nav-icon">
              <item.icon size={isAI ? 24 : 20} />
            </div>
            <span className="nav-text">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}