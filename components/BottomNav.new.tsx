'use client'

import { useState } from 'react'
import { Home, Map, Mic2, ShoppingBag, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AIVoiceButton from './AIVoiceButton'

const navItems = [
  { id: 'home', label: '首页', icon: Home, href: '/' },
  { id: 'explore', label: '场牌', icon: Map, href: '/explore' },
  { id: 'ai', label: 'AI', icon: Mic2, href: '/ai' },
  { id: 'shop', label: '商城', icon: ShoppingBag, href: '/shop' },
  { id: 'profile', label: '我的', icon: User, href: '/profile' },
]

export default function BottomNav({ activeTab = 'home' }: { activeTab?: string }) {
  const pathname = usePathname()
  const [showVoiceModal, setShowVoiceModal] = useState(false)

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

  const handleAIClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowVoiceModal(true)
  }

  return (
    <>
      <nav className="bottom-nav">
        {navItems.map((item) => {
          const isActive = currentActive === item.id
          const isAI = item.id === 'ai'
          
          if (isAI) {
            // AI按钮：触发模态框，不是导航链接
            return (
              <button
                key={item.id}
                onClick={handleAIClick}
                className={`nav-item ${isActive ? 'active' : ''} nav-ai-button`}
                aria-label="AI语音助手"
              >
                <div className="nav-icon">
                  <Mic2 size={28} className="text-white" />
                </div>
                <span className="nav-text">{item.label}</span>
              </button>
            )
          }
          
          // 其他导航项：正常链接
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <div className="nav-icon">
                <item.icon size={20} />
              </div>
              <span className="nav-text">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* AI语音识别模态框 */}
      <AIVoiceButton 
        open={showVoiceModal}
        onClose={() => setShowVoiceModal(false)}
        onSearchComplete={(query, results) => {
          console.log('搜索完成:', query, results)
          // 这里可以处理搜索结果，比如导航到相应页面
        }}
      />
    </>
  )
}