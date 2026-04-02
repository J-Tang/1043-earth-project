'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Star, MapPin, Clock, Users, TrendingUp, Sparkles, X, ChevronLeft, Share2, Bookmark } from 'lucide-react'
import AIVoiceButton from '@/components/AIVoiceButton'

// 模拟搜索结果数据
const mockSearchResults = [
  {
    id: 1,
    type: 'brand',
    name: '行星能量中心',
    description: '专注于集体能量疗愈与冥想指导的顶级场牌，拥有10年专业经验，提供初学者到高级的完整课程体系。',
    matchScore: 96,
    tags: ['冥想', '集体疗愈', '能量净化', '初学者友好', '专业导师'],
    distance: '2.3km',
    rating: 4.9,
    reviewCount: 428,
    priceRange: '¥299-¥888',
    features: ['小班教学', '能量诊断', '个性化方案', '线上预约'],
    images: ['能量场1', '冥想室2', '疗愈空间3'],
    isVerified: true,
    isFeatured: true
  },
  {
    id: 2,
    type: 'course',
    name: '冥想入门七日系统课',
    description: '从零开始的冥想系统课程，包含呼吸法、专注力训练、能量感知等7个核心模块，每天30分钟渐进式学习。',
    matchScore: 92,
    tags: ['课程', '冥想入门', '7天系统', '线上学习', '证书'],
    duration: '7天',
    lessons: 21,
    rating: 4.8,
    reviewCount: 312,
    price: '¥499',
    originalPrice: '¥799',
    features: ['视频课程', '练习指导', '社群支持', '结业证书'],
    instructor: '李静能量导师',
    students: 1284,
    isNew: true
  },
  {
    id: 3,
    type: 'product',
    name: '能量水晶冥想七脉轮套装',
    description: '精选7种天然水晶对应人体七大脉轮，每颗水晶经过能量净化和祝福，帮助提升冥想深度与能量感知能力。',
    matchScore: 89,
    tags: ['水晶', '能量工具', '七脉轮', '套装', '天然'],
    sales: 1284,
    rating: 4.9,
    reviewCount: 567,
    price: '¥680',
    originalPrice: '¥980',
    features: ['天然水晶', '能量净化', '使用指南', '精美包装'],
    stock: 42,
    delivery: '次日达',
    isBestSeller: true
  },
  {
    id: 4,
    type: 'event',
    name: '新月集体疗愈仪式',
    description: '每月一次的新月能量疗愈活动，在特殊天象下进行集体能量清理与提升，适合寻求心灵净化的参与者。',
    matchScore: 87,
    tags: ['活动', '集体疗愈', '新月', '仪式', '限时'],
    date: '2026-04-05',
    time: '19:30-21:30',
    location: '行星能量中心（浦东分馆）',
    participants: '限30人',
    rating: 4.7,
    reviewCount: 89,
    price: '¥199',
    features: ['能量导师', '疗愈工具', '茶点', '纪念品'],
    remaining: 12
  },
  {
    id: 5,
    type: 'brand',
    name: '心灵花园冥想空间',
    description: '都市中的静谧绿洲，提供一对一冥想指导和团体疗愈课程，环境优雅舒适，适合都市人群放松身心。',
    matchScore: 85,
    tags: ['冥想空间', '都市绿洲', '一对一', '环境优美'],
    distance: '3.5km',
    rating: 4.6,
    reviewCount: 156,
    priceRange: '¥199-¥699',
    features: ['私密空间', '专业指导', '茶饮供应', '会员优惠'],
    isVerified: true
  },
  {
    id: 6,
    type: 'product',
    name: '能量净化香薰喷雾',
    description: '天然植物提取物制作的空间净化喷雾，能够快速清除负能量，提升环境频率，创造纯净能量场。',
    matchScore: 83,
    tags: ['香薰', '净化', '空间能量', '植物提取'],
    sales: 2345,
    rating: 4.5,
    reviewCount: 892,
    price: '¥199',
    originalPrice: '¥299',
    features: ['天然成分', '便携设计', '多种香型', '快速见效'],
    stock: 156,
    delivery: '当日达',
    isPopular: true
  }
]



export default function AIPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchHistory, setSearchHistory] = useState<Array<{
    id: number
    query: string
    timestamp: string
    resultsCount: number
  }>>([])
  
  const [showResults, setShowResults] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])

  const [isLoading, setIsLoading] = useState(false)

  // 检查URL参数，判断是否从底部导航触发搜索
  useEffect(() => {
    const searching = searchParams.get('searching')
    const query = searchParams.get('query')
    
    if (searching === 'true') {
      startSearch(query || '我想找一个适合初学者的冥想场牌')
    }
  }, [searchParams])

  const startSearch = (query: string) => {
    setShowResults(true)
    setSearchError(null)
    setSearchQuery(query)
    setIsLoading(true)
    
    // 模拟搜索过程
    setTimeout(() => {
      setIsLoading(false)
      
      // 90%成功率，10%失败率
      const isSuccess = Math.random() > 0.1
      
      if (isSuccess) {
        // 使用模拟数据
        setSearchResults([...mockSearchResults])
        
        // 添加到搜索历史
        const newSearch = {
          id: Date.now(),
          query,
          timestamp: new Date().toLocaleTimeString('zh-CN', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          resultsCount: mockSearchResults.length
        }
        setSearchHistory(prev => [newSearch, ...prev.slice(0, 4)])
      } else {
        // 模拟网络错误
        setSearchError('网络连接失败，请检查网络后重试')
        setSearchResults([])
      }
    }, 1500)
  }

  const handleSearchComplete = (query: string, results: any[]) => {
    // 添加到搜索历史
    const newSearch = {
      id: Date.now(),
      query,
      timestamp: new Date().toLocaleTimeString('zh-CN', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      resultsCount: results.length
    }
    
    setSearchHistory(prev => [newSearch, ...prev.slice(0, 4)])
  }

  const handleBackToVoice = () => {
    setShowResults(false)
    setSearchError(null)
    setSearchResults([])
  }

  const handleNewSearch = () => {
    handleBackToVoice()
    // 给一点时间让页面切换，然后可以重新开始
    setTimeout(() => {
      // 这里可以触发新的搜索，或者让用户再次按住AI按钮
    }, 300)
  }

  const handleResultClick = (result: any) => {
    console.log('点击结果:', result)
    // 根据类型导航到不同页面
    if (result.type === 'brand') {
      router.push(`/explore/brand/${result.id}`)
    } else if (result.type === 'product') {
      router.push(`/shop/product/${result.id}`)
    } else if (result.type === 'course') {
      // 课程详情页
      router.push(`/course/${result.id}`)
    } else if (result.type === 'event') {
      // 活动详情页
      router.push(`/event/${result.id}`)
    }
  }

  const handleShare = () => {
    console.log('分享搜索结果')
    // 实际实现中这里会是分享功能
  }

  const handleSaveSearch = () => {
    console.log('保存搜索')
    // 实际实现中这里会是保存搜索历史功能
  }

  // 搜索结果（不筛选不排序）
  const filteredResults = searchResults

  return (
    <div className="min-h-screen bg-white">
      {/* 根据状态显示不同内容 */}
      {showResults ? (
        // 搜索结果页面（全屏，完整卡片内容）
        <div className="min-h-screen">
          {/* 顶部导航栏 */}
          <div className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-xl border-b border-white/10">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={handleBackToVoice}
                  className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft size={20} className="text-white" />
                </button>
                <h1 className="text-xl font-bold text-white">AI搜索结果</h1>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <Share2 size={18} className="text-white" />
                  </button>
                  <button
                    onClick={handleSaveSearch}
                    className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <Bookmark size={18} className="text-white" />
                  </button>
                </div>
              </div>
              
              {/* 搜索查询显示 */}
              <div className="mb-4">

                <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
                  <p className="text-white text-lg font-medium">"{searchQuery}"</p>
                </div>
              </div>
              
              {/* 结果统计 */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-white/60 text-sm">
                  找到 <span className="text-white font-bold">{filteredResults.length}</span> 个相关结果
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-white/60">匹配准确率</span>
                  <span className="bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent font-bold">
                    {searchResults.length > 0 ? Math.max(...searchResults.map(r => r.matchScore)) : 0}%
                  </span>
                </div>
              </div></div>
          </div>
          
          {/* 主要内容区域 */}
          <div className="p-4">
            {/* 错误状态 */}
            {searchError && (
              <div className="mb-6 p-6 bg-red-500/20 border border-red-500/30 rounded-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-red-500/30 rounded-full">
                    <svg className="w-6 h-6 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">网络连接错误</h3>
                    <p className="text-white/80 text-sm">{searchError}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => window.location.reload()}
                    className="flex-1 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
                  >
                    重试搜索
                  </button>
                  <button
                    onClick={handleBackToVoice}
                    className="flex-1 py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-colors"
                  >
                    返回
                  </button>
                </div>
              </div>
            )}
            
            {/* 加载中状态 */}
            {isLoading && (
              <div className="py-20 flex flex-col items-center justify-center">
                <div className="relative mb-8">
                  <div className="w-20 h-20 border-4 border-primary/30 rounded-full animate-ping"></div>
                  <div className="absolute inset-4 border-4 border-primary-variant/50 rounded-full animate-spin"></div>
                </div>
                <p className="text-white text-xl font-bold mb-3">智能匹配中</p>
                <p className="text-white/60 text-center max-w-md">
                  正在分析您的需求，从超过100个场牌、课程和产品中寻找最佳匹配...
                </p>
                <div className="mt-6 flex items-center gap-3 text-sm text-white/40">
                  <TrendingUp size={14} />
                  <span>匹配准确率预估: 92%</span>
                  <Clock size={14} />
                  <span>预计完成: 2秒</span>
                </div>
              </div>
            )}
            
            {/* 搜索结果网格 */}
            {!isLoading && !searchError && filteredResults.length > 0 && (
              <div className="space-y-4">
                {filteredResults.map((result) => (
                  <div
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className="group bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:border-primary/50 transition-all duration-300 hover:scale-[1.01] cursor-pointer"
                  >
                    {/* 顶部信息栏 */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        {/* 类型和标签 */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                            result.type === 'brand' ? 'bg-blue-500/20 text-blue-300' :
                            result.type === 'course' ? 'bg-purple-500/20 text-purple-300' :
                            result.type === 'product' ? 'bg-green-500/20 text-green-300' :
                            'bg-orange-500/20 text-orange-300'
                          }`}>
                            {result.type === 'brand' ? '场牌' : 
                             result.type === 'course' ? '课程' : 
                             result.type === 'product' ? '产品' : '活动'}
                          </span>
                          
                          {result.isVerified && (
                            <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full flex items-center gap-1">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              已认证
                            </span>
                          )}
                          
                          {result.isFeatured && (
                            <span className="px-2 py-1 bg-amber-500/20 text-amber-300 text-xs rounded-full">
                              ⭐ 精选推荐
                            </span>
                          )}
                          
                          {result.isNew && (
                            <span className="px-2 py-1 bg-rose-500/20 text-rose-300 text-xs rounded-full">
                              新上线
                            </span>
                          )}
                        </div>
                        
                        {/* 标题和匹配度 */}
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                            {result.name}
                          </h3>
                          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white text-sm font-bold px-3 py-1.5 rounded-full">
                            {result.matchScore}% 匹配
                          </div>
                        </div>
                        
                        {/* 描述 */}
                        <p className="text-white/70 text-sm mb-4 line-clamp-2">
                          {result.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* 中间信息栏 */}
                    <div className="flex flex-wrap gap-3 mb-4">
                      {/* 标签 */}
                      <div className="flex flex-wrap gap-1.5">
                        {result.tags.map((tag: string, idx: number) => (
                          <span
                            key={idx}
                            className="text-xs px-2.5 py-1 bg-white/10 text-white/80 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* 特色功能 */}
                      {result.features && (
                        <div className="flex flex-wrap gap-1.5">
                          {result.features.slice(0, 3).map((feature: string, idx: number) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                            >
                              ✓ {feature}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* 底部信息栏 */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center gap-4 text-sm text-white/60">
                        {/* 评分 */}
                        <div className="flex items-center gap-1">
                          <Star size={14} className="text-amber-500 fill-amber-500" />
                          <span className="text-white font-medium">{result.rating}</span>
                          <span className="text-white/40">({result.reviewCount}评价)</span>
                        </div>
                        
                        {/* 距离/时长 */}
                        {result.distance && (
                          <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span>{result.distance}</span>
                          </div>
                        )}
                        
                        {result.duration && (
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{result.duration}</span>
                          </div>
                        )}
                        
                        {/* 参与人数/销量 */}
                        {result.participants && (
                          <div className="flex items-center gap-1">
                            <Users size={14} />
                            <span>{result.participants}</span>
                          </div>
                        )}
                        
                        {result.sales && (
                          <div className="flex items-center gap-1">
                            <TrendingUp size={14} />
                            <span>{result.sales}人购买</span>
                          </div>
                        )}
                      </div>
                      
                      {/* 价格 */}
                      <div className="text-right">
                        {result.price ? (
                          <div>
                            <div className="text-2xl font-bold text-white">
                              {result.price}
                            </div>
                            {result.originalPrice && (
                              <div className="text-sm text-white/40 line-through">
                                {result.originalPrice}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div>
                            <div className="text-lg font-bold text-white">
                              {result.priceRange}
                            </div>
                            <div className="text-xs text-white/60">价格区间</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* 没有结果的状态 */}
            {!isLoading && !searchError && filteredResults.length === 0 && (
              <div className="py-20 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">未找到匹配结果</h3>
                <p className="text-white/60 mb-8 max-w-md mx-auto">
                  尝试调整搜索词或筛选条件，或者让AI为您推荐其他相关内容。
                </p>
                <button
                  onClick={handleNewSearch}
                  className="px-8 py-3 bg-gradient-to-br from-primary to-primary-variant text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
                >
                  重新搜索
                </button>
              </div>
            )}
            
            {/* 底部操作栏 */}
            {!isLoading && !searchError && filteredResults.length > 0 && (
              <div className="mt-8 mb-6">
                <div className="text-center text-white/40 text-sm mb-6">
                  已显示全部 {filteredResults.length} 个结果 • AI匹配完成
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={handleNewSearch}
                    className="flex-1 py-4 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-colors"
                  >
                    重新搜索
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex-1 py-4 bg-gradient-to-br from-primary to-primary-variant text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
                  >
                    分享结果
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        // 默认：全屏AI语音助手
        <AIVoiceButton 
          fullScreen={true}
          onSearchComplete={handleSearchComplete}
        />
      )}

      {/* 仅在没有显示结果时显示搜索历史 */}
      {!showResults && searchHistory.length > 0 && (
        <div className="fixed bottom-24 left-0 right-0 z-40 px-4">
          <div className="bg-black/70 backdrop-blur-xl rounded-2xl p-4 border border-white/10 max-w-md mx-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-bold">最近搜索</h3>
              <button 
                onClick={() => setSearchHistory([])}
                className="text-xs text-white/50 hover:text-white"
              >
                清空
              </button>
            </div>
            
            <div className="space-y-2">
              {searchHistory.map((item) => (
                <div 
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <div className="flex-1">
                    <div className="text-white text-sm line-clamp-1">
                      "{item.query.substring(0, 30)}..."
                    </div>
                    <div className="text-xs text-white/40 mt-1">
                      {item.timestamp} • 找到 {item.resultsCount} 个结果
                    </div>
                  </div>
                  <button 
                    onClick={() => startSearch(item.query)}
                    className="text-xs text-primary hover:text-primary-variant"
                  >
                    再次搜索
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 使用指引（仅在没有显示结果时） */}
      {!showResults && (
        <div className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-30">
          <div className="text-center">
            <div className="text-white/40 text-xs mb-2">
              提示：长按底部中间的AI按钮进行语音搜索
            </div>
            <div className="flex items-center justify-center gap-2 text-white/30 text-xs">
              <span className="px-2 py-0.5 bg-white/10 rounded-full">🎤 按住说话</span>
              <span className="px-2 py-0.5 bg-white/10 rounded-full">🔍 智能匹配</span>
              <span className="px-2 py-0.5 bg-white/10 rounded-full">📱 全屏结果</span>
            </div>
          </div>
        </div>
      )}


    </div>
  )
}