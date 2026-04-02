'use client'

import { useState, useRef } from 'react'
import { Home, Map, Mic2, ShoppingBag, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import AIVoiceButton from './AIVoiceButton'
import AIPressIndicator from './AIPressIndicator'

const navItems = [
  { id: 'home', label: '首页', icon: Home, href: '/' },
  { id: 'explore', label: '场牌', icon: Map, href: '/explore' },
  { id: 'ai', label: 'AI', icon: Mic2, href: '/ai' },
  { id: 'shop', label: '商城', icon: ShoppingBag, href: '/shop' },
  { id: 'profile', label: '我的', icon: User, href: '/profile' },
]

export default function BottomNav({ activeTab = 'home' }: { activeTab?: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const [showPressIndicator, setShowPressIndicator] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const pressStartTimeRef = useRef<number>(0)
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null)

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

  const handleAIPressStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // 记录按下时间
    pressStartTimeRef.current = Date.now()
    
    // 立即显示按压指示器
    setShowPressIndicator(true)
    
    // 清除之前的计时器
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current)
      holdTimerRef.current = null
    }
    
    // 设置计时器，如果按住时间足够长，标记为准备搜索
    holdTimerRef.current = setTimeout(() => {
      // 这里不立即触发，只是标记状态
      // 实际触发在松手时判断
    }, 200)
  }

  const handleAIPressEnd = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // 计算按住时间
    const pressDuration = Date.now() - pressStartTimeRef.current
    
    // 清除计时器
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current)
      holdTimerRef.current = null
    }
    
    // 如果按住时间足够（200ms以上），触发搜索
    if (pressDuration >= 200 && showPressIndicator) {
      // 隐藏按压指示器
      setShowPressIndicator(false)
      
      // 标记为搜索中
      setIsSearching(true)
      
      // 模拟搜索过程
      setTimeout(() => {
        setIsSearching(false)
        
        // 搜索成功，导航到AI搜索结果页面
        // 这里可以传递搜索参数
        router.push('/ai?searching=true')
      }, 1500)
    } else {
      // 按住时间太短，直接隐藏指示器
      setShowPressIndicator(false)
    }
  }

  const handleAICancel = () => {
    // 清除计时器（鼠标离开或触摸取消）
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current)
      holdTimerRef.current = null
    }
    
    // 隐藏按压指示器
    setShowPressIndicator(false)
  }

  return (
    <>
      <nav className="bottom-nav">
        {navItems.map((item) => {
          const isActive = currentActive === item.id
          const isAI = item.id === 'ai'
          
          if (isAI) {
            // AI按钮：按住触发语音搜索，不是导航链接
            return (
              <button
                key={item.id}
                onMouseDown={handleAIPressStart}
                onMouseUp={handleAIPressEnd}
                onMouseLeave={handleAICancel}
                onTouchStart={handleAIPressStart}
                onTouchEnd={handleAIPressEnd}
                onTouchCancel={handleAICancel}
                className={`nav-item ${isActive ? 'active' : ''} nav-ai-button`}
                aria-label="AI语音助手"
                disabled={isSearching}
              >
                <div className="nav-icon">
                  {isSearching ? (
                    <div className="animate-spin">
                      <Mic2 size={28} className="text-white" />
                    </div>
                  ) : (
                    <Mic2 size={28} className="text-white" />
                  )}
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

      {/* AI按压指示器 */}
      <AIPressIndicator 
        isVisible={showPressIndicator}
        onSearchTrigger={() => {
          setShowPressIndicator(false)
          setIsSearching(true)
          
          // 模拟搜索过程
          setTimeout(() => {
            setIsSearching(false)
            
            // 搜索成功，导航到AI搜索结果页面
            // 传递搜索查询（模拟用户可能说的内容）
            const queries = [
              '我想找一个适合初学者的冥想场牌',
              '能量疗愈课程推荐',
              '购买能量水晶',
              '附近有什么好的能量场牌',
              '冥想入门指导'
            ]
            const randomQuery = queries[Math.floor(Math.random() * queries.length)]
            router.push(`/ai?searching=true&query=${encodeURIComponent(randomQuery)}`)
          }, 1500)
        }}
        onCancel={() => {
          setShowPressIndicator(false)
        }}
      />
    </>
  )
}