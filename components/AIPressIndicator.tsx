'use client'

import { Mic2, Volume2 } from 'lucide-react'
import { useState, useEffect } from 'react'

interface AIPressIndicatorProps {
  isVisible: boolean
  onSearchTrigger?: () => void
  onCancel?: () => void
}

export default function AIPressIndicator({ 
  isVisible, 
  onSearchTrigger,
  onCancel 
}: AIPressIndicatorProps) {
  const [holdProgress, setHoldProgress] = useState(0)
  const [isHolding, setIsHolding] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  
  // 重置状态
  useEffect(() => {
    if (!isVisible) {
      setHoldProgress(0)
      setIsHolding(false)
      setShowSuccess(false)
    } else {
      // 显示时开始进度动画
      setIsHolding(true)
      const duration = 2000 // 2秒完成进度
      const interval = 50 // 每50ms更新一次
      const increment = (interval / duration) * 100
      
      const progressInterval = setInterval(() => {
        setHoldProgress(prev => {
          const newProgress = prev + increment
          if (newProgress >= 100) {
            clearInterval(progressInterval)
            return 100
          }
          return newProgress
        })
      }, interval)
      
      return () => clearInterval(progressInterval)
    }
  }, [isVisible])
  
  // 处理搜索触发
  const triggerSearch = () => {
    setIsHolding(false)
    setShowSuccess(true)
    
    // 显示成功状态1秒，然后触发搜索
    setTimeout(() => {
      onSearchTrigger?.()
    }, 800)
  }
  
  // 处理取消
  const handleCancel = () => {
    setIsHolding(false)
    setHoldProgress(0)
    onCancel?.()
  }
  
  if (!isVisible) return null
  
  return (
    <div className="fixed inset-0 z-[9998] pointer-events-none">
      {/* 背景遮罩 - 非常轻微，几乎看不见 */}
      <div 
        className="absolute inset-0 bg-black/5 pointer-events-auto"
        onClick={handleCancel}
      />
      
      {/* 指示器定位在底部导航上方 */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 pointer-events-auto">
        {/* 外圈光环 - 缩小 */}
        <div className="absolute inset-0 -m-6">
          <div className={`absolute inset-0 rounded-full border-3 ${isHolding ? 'border-primary/30' : 'border-green-500/30'} animate-pulse`} />
          <div className={`absolute inset-3 rounded-full border-1.5 ${isHolding ? 'border-primary-variant/50' : 'border-green-500/50'} animate-ping`} />
        </div>
        
        {/* 中心指示器 - 缩小 */}
        <div 
          className={`relative w-24 h-24 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
            isHolding 
              ? 'bg-gradient-to-br from-primary/15 to-primary-variant/15 shadow-lg shadow-primary/20 backdrop-blur-sm' 
              : showSuccess
                ? 'bg-gradient-to-br from-green-500/15 to-emerald-500/15 shadow-lg shadow-green-500/20 backdrop-blur-sm'
                : 'bg-white/80 backdrop-blur-sm shadow-lg'
          }`}
        >
          {/* 图标 */}
          <div className={`p-2.5 rounded-full transition-all duration-300 ${
            isHolding 
              ? 'bg-gradient-to-br from-primary to-primary-variant' 
              : showSuccess
                ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                : 'bg-gradient-to-br from-gray-700 to-gray-900'
          }`}>
            {isHolding ? (
              <Volume2 size={20} className="text-white animate-pulse" />
            ) : showSuccess ? (
              <Mic2 size={20} className="text-white" />
            ) : (
              <Mic2 size={20} className="text-white" />
            )}
          </div>
          
          {/* 状态文本 */}
          <div className="text-center px-2">
            <p className={`font-bold text-sm ${
              isHolding ? 'text-primary' : showSuccess ? 'text-green-600' : 'text-gray-800'
            }`}>
              {isHolding ? '说话中...' : showSuccess ? '搜索中' : '准备'}
            </p>
            <p className="text-xs text-gray-600 mt-0.5">
              {isHolding ? '松手搜索' : showSuccess ? '匹配中...' : '长按AI按钮'}
            </p>
          </div>
          
          {/* 进度条（只在按住时显示） - 缩小 */}
          {isHolding && (
            <div className="w-4/5 mt-1">
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-primary-variant transition-all duration-100"
                  style={{ width: `${holdProgress}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 mt-0.5 text-center">
                {Math.round(holdProgress)}%
              </p>
            </div>
          )}
          
          {/* 提示文本 */}
          {!isHolding && !showSuccess && (
            <p className="text-xs text-gray-500 mt-1 px-2">
              长按AI按钮
            </p>
          )}
        </div>
        
        {/* 取消按钮 - 缩小 */}
        <button
          onClick={handleCancel}
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-4 py-1.5 bg-white/80 backdrop-blur-sm text-gray-700 text-xs rounded-full font-medium shadow hover:bg-white transition-colors"
        >
          取消
        </button>
      </div>
    </div>
  )
}