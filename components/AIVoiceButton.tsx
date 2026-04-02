'use client'

import { useState, useEffect } from 'react'
import { Mic2, Search, X, Sparkles, Volume2, Headphones } from 'lucide-react'

interface AIVoiceButtonProps {
  open?: boolean
  onClose?: () => void
  onSearchComplete?: (query: string, results: any[]) => void
  fullScreen?: boolean
}

export default function AIVoiceButton({ 
  open = false, 
  onClose, 
  onSearchComplete,
  fullScreen = false 
}: AIVoiceButtonProps) {
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [transcript, setTranscript] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // 同步外部open状态
  useEffect(() => {
    if (open) {
      startVoiceRecognition()
    } else {
      resetState()
    }
  }, [open])

  const startVoiceRecognition = () => {
    resetState()
    setIsListening(true)
    setTranscript('')
    
    // 模拟语音识别
    setTimeout(() => {
      setIsListening(false)
      setIsProcessing(true)
      setTranscript('我想找一个适合初学者的冥想场牌，最好是提供集体能量疗愈的')
      
      // 模拟搜索结果
      setTimeout(() => {
        setIsProcessing(false)
        const results = [
          {
            id: 1,
            type: 'brand',
            name: '行星能量中心',
            description: '专注于集体能量疗愈与冥想指导，提供初学者友好的环境。',
            matchScore: 96,
            tags: ['冥想', '集体', '能量', '初学者'],
            distance: '2.3km',
            rating: 4.9,
            priceRange: '¥299-¥888'
          },
          {
            id: 2,
            type: 'course',
            name: '冥想入门七日课',
            description: '从零开始的冥想系统课程，包含呼吸法、专注力训练等。',
            matchScore: 92,
            tags: ['课程', '冥想', '入门', '7天'],
            duration: '7天',
            rating: 4.8,
            price: '¥499'
          },
          {
            id: 3,
            type: 'product',
            name: '能量水晶冥想套装',
            description: '精选7种天然水晶，帮助提升冥想深度与能量感知。',
            matchScore: 89,
            tags: ['水晶', '能量', '工具', '套装'],
            sales: 1284,
            rating: 4.9,
            price: '¥680'
          },
          {
            id: 4,
            type: 'event',
            name: '新月集体疗愈仪式',
            description: '每月一次的新月能量疗愈活动，适合寻求心灵净化的初学者。',
            matchScore: 87,
            tags: ['活动', '集体', '新月', '疗愈'],
            date: '2026-04-05',
            participants: '限30人',
            price: '¥199'
          }
        ]
        setSearchResults(results)
        onSearchComplete?.(transcript, results)
      }, 1500)
    }, 2000)
  }

  const resetState = () => {
    setIsListening(false)
    setIsProcessing(false)
    setTranscript('')
    setSearchResults([])
  }

  const handleClose = () => {
    resetState()
    onClose?.()
  }

  const handleRetry = () => {
    startVoiceRecognition()
  }

  if (!open && !fullScreen) return null

  return (
    <div className={`${fullScreen ? 'min-h-screen bg-gradient-to-br from-gray-900 to-black' : 'fixed inset-0 z-[9999] bg-black/40 backdrop-blur-[2px] pointer-events-auto'} flex flex-col items-center justify-center p-4`}
      onClick={(e) => {
        if (!fullScreen) {
          e.stopPropagation()
        }
      }}
      onTouchMove={(e) => {
        if (!fullScreen) {
          e.stopPropagation()
        }
      }}
    >
      {/* 关闭按钮（非全屏模式显示） */}
      {!fullScreen && (
        <button
          onClick={handleClose}
          className="absolute top-8 right-8 p-4 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50"
          aria-label="关闭"
        >
          <X size={28} className="text-white" />
        </button>
      )}

      <div className="max-w-2xl w-full text-center px-4">
        {/* 标题和引导 */}
        <div className="mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-primary/20 to-primary-variant/20 rounded-full">
              <Mic2 size={32} className="text-primary" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-primary-variant to-purple-400 bg-clip-text text-transparent">
              1043 AI语音助手
            </h1>
          </div>
          <p className="text-white/70 text-lg">
            说出你的需求，AI为你精准匹配场牌、课程、产品
          </p>
        </div>

        {/* 语音识别状态区域 */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 mb-8 border border-white/10">
          {/* 状态指示器 */}
          <div className="flex items-center justify-center gap-4 mb-6">
            {isListening ? (
              <>
                <div className="p-3 bg-red-500/20 rounded-full animate-pulse">
                  <Volume2 size={24} className="text-red-400" />
                </div>
                <span className="text-2xl font-bold text-white animate-pulse">正在聆听...</span>
              </>
            ) : isProcessing ? (
              <>
                <div className="p-3 bg-blue-500/20 rounded-full">
                  <Headphones size={24} className="text-blue-400" />
                </div>
                <span className="text-2xl font-bold text-white">分析中...</span>
              </>
            ) : searchResults.length > 0 ? (
              <>
                <div className="p-3 bg-green-500/20 rounded-full">
                  <Sparkles size={24} className="text-green-400" />
                </div>
                <span className="text-2xl font-bold text-white">匹配完成！</span>
              </>
            ) : (
              <>
                <div className="p-3 bg-primary/20 rounded-full">
                  <Mic2 size={24} className="text-primary" />
                </div>
                <span className="text-2xl font-bold text-white">准备就绪</span>
              </>
            )}
          </div>

          {/* 语音波纹动画 */}
          {isListening && (
            <div className="my-10">
              <div className="flex justify-center items-end h-24 gap-1.5 mb-6">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-2 bg-gradient-to-t from-primary via-primary-variant to-purple-500 rounded-full animate-pulse"
                    style={{
                      height: `${30 + Math.random() * 50}px`,
                      animationDelay: `${i * 0.05}s`,
                      animationDuration: '0.6s'
                    }}
                  />
                ))}
              </div>
              <p className="text-white/60 text-sm">请清晰地说出你的需求...</p>
            </div>
          )}

          {/* 处理中动画 */}
          {isProcessing && (
            <div className="my-10">
              <div className="flex justify-center mb-6">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 border-4 border-primary/30 rounded-full animate-ping"></div>
                  <div className="absolute inset-2 border-4 border-primary-variant/50 rounded-full animate-pulse"></div>
                  <div className="absolute inset-4 border-4 border-purple-500/70 rounded-full animate-spin"></div>
                </div>
              </div>
              <p className="text-white/60 text-sm">正在分析你的语音内容...</p>
            </div>
          )}

          {/* 转录文本 */}
          {transcript && (
            <div className="mb-8">
              <div className="text-white/80 text-sm mb-3 font-medium">你说的是：</div>
              <div className="p-5 bg-gradient-to-r from-primary/10 to-primary-variant/10 rounded-2xl border border-primary/30">
                <p className="text-white text-xl font-medium leading-relaxed">
                  "{transcript}"
                </p>
              </div>
            </div>
          )}

          {/* 控制按钮 */}
          {!isListening && !isProcessing && searchResults.length === 0 && (
            <div className="mt-8">
              <button
                onClick={startVoiceRecognition}
                className="group relative px-12 py-5 bg-gradient-to-br from-primary via-primary-variant to-purple-500 text-white rounded-2xl font-bold text-xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl shadow-primary/30"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-2xl blur opacity-70 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative flex items-center justify-center gap-3">
                  <Mic2 size={28} />
                  开始说话
                </span>
              </button>
              <p className="text-white/50 text-sm mt-4">或点击上方按钮模拟语音输入</p>
            </div>
          )}
        </div>

        {/* 搜索结果展示 */}
        {searchResults.length > 0 && (
          <div className="text-left animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  🎯 为你找到 {searchResults.length} 个精准匹配
                </h2>
                <p className="text-white/60">基于你的需求"{transcript.substring(0, 20)}..."</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-white/50">匹配准确率</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  {Math.max(...searchResults.map(r => r.matchScore))}%
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  onClick={() => {
                    // 根据类型导航到不同页面
                    console.log('点击结果:', result)
                    handleClose()
                  }}
                >
                  {/* 匹配分数徽章 */}
                  <div className="absolute -top-3 -right-3 bg-gradient-to-br from-green-500 to-emerald-600 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
                    {result.matchScore}%
                  </div>

                  {/* 类型标签 */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      result.type === 'brand' ? 'bg-blue-500/20 text-blue-300' :
                      result.type === 'course' ? 'bg-purple-500/20 text-purple-300' :
                      result.type === 'product' ? 'bg-green-500/20 text-green-300' :
                      'bg-orange-500/20 text-orange-300'
                    }`}>
                      {result.type === 'brand' ? '场牌' : 
                       result.type === 'course' ? '课程' : 
                       result.type === 'product' ? '产品' : '活动'}
                    </span>
                    {result.rating && (
                      <span className="text-xs text-white/60 flex items-center">
                        ⭐ {result.rating}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{result.name}</h3>
                  <p className="text-white/70 text-sm mb-4 line-clamp-2">{result.description}</p>

                  {/* 标签和附加信息 */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {result.tags.map((tag: string, idx: number) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1 bg-white/10 text-white/80 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* 底部信息 */}
                  <div className="flex items-center justify-between text-xs text-white/50">
                    <div className="flex items-center gap-4">
                      {result.distance && <span>📏 {result.distance}</span>}
                      {result.duration && <span>⏱️ {result.duration}</span>}
                      {result.date && <span>📅 {result.date}</span>}
                    </div>
                    <div className="font-bold text-white">
                      {result.price || result.priceRange}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-4">
              <button
                onClick={handleClose}
                className="flex-1 py-4 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-colors"
              >
                关闭
              </button>
              <button
                onClick={handleRetry}
                className="flex-1 py-4 bg-gradient-to-br from-primary to-primary-variant text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
              >
                重新搜索
              </button>
            </div>
          </div>
        )}

        {/* 使用提示 */}
        {!isListening && !isProcessing && searchResults.length === 0 && (
          <div className="mt-10 text-white/50 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-2xl mb-2">🎤</div>
                <div className="font-medium">清晰说话</div>
                <div className="text-xs mt-1">如"我想找冥想场牌"</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-2xl mb-2">🔍</div>
                <div className="font-medium">AI精准匹配</div>
                <div className="text-xs mt-1">基于需求匹配场牌、课程、产品</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-2xl mb-2">🚀</div>
                <div className="font-medium">快速体验</div>
                <div className="text-xs mt-1">点击"开始说话"立即尝试</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}