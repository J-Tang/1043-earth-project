'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Filter, Calendar, MapPin, Users, Clock, ChevronRight, PartyPopper } from 'lucide-react'
import { useState } from 'react'

// 模拟活动数据
const mockEvents = [
  {
    id: '1',
    title: '满月集体冥想仪式',
    subtitle: '在满月能量下集体冥想，净化能量场，连接宇宙能量',
    coverColor: 'from-indigo-500 to-purple-500',
    brandName: '月亮女神能量圈',
    organizerName: '王明月',
    organizerTitle: '月亮能量导师',
    price: 280,
    originalPrice: 380,
    duration: 3,
    location: '北京市朝阳区月光公园',
    locationDetail: '月光公园中心草坪',
    latitude: 39.9042,
    longitude: 116.4074,
    startTime: '2026-04-25 20:00',
    endTime: '2026-04-25 23:00',
    maxParticipants: 100,
    currentParticipants: 78,    tags: ['集体冥想', '满月仪式', '能量净化', '户外活动']
  },
  {
    id: '2',
    title: '春分能量启动仪式',
    subtitle: '春分时节能量转换，启动新年能量周期',
    coverColor: 'from-green-500 to-emerald-500',
    brandName: '地球能量网格中心',
    organizerName: '赵地球',
    organizerTitle: '地球能量导师',
    price: 180,
    originalPrice: 250,
    duration: 2,
    location: '上海市静安区能量中心',
    locationDetail: '3楼仪式大厅',
    latitude: 31.2304,
    longitude: 121.4737,
    startTime: '2026-03-20 10:00',
    endTime: '2026-03-20 12:00',
    maxParticipants: 50,
    currentParticipants: 42,    tags: ['节气仪式', '能量启动', '集体活动']
  },
  {
    id: '3',
    title: '行星能量音乐会',
    subtitle: '行星频率音乐疗愈，声音能量沉浸体验',
    coverColor: 'from-blue-500 to-cyan-500',
    brandName: '声音疗愈学院',
    organizerName: '孙音律',
    organizerTitle: '声音疗愈大师',
    price: 380,
    originalPrice: 480,
    duration: 2.5,
    location: '杭州市西湖区疗愈中心',
    locationDetail: '音乐厅',
    latitude: 30.2741,
    longitude: 120.1551,
    startTime: '2026-05-15 19:30',
    endTime: '2026-05-15 22:00',
    maxParticipants: 80,
    currentParticipants: 65,    tags: ['音乐疗愈', '声音能量', '沉浸体验']
  },
  {
    id: '4',
    title: '水晶能量集市',
    subtitle: '天然水晶展览与能量交换，水晶疗愈体验',
    coverColor: 'from-purple-500 to-pink-500',
    brandName: '心灵疗愈空间',
    organizerName: '李能量',
    organizerTitle: '水晶疗愈师',
    price: 0,
    originalPrice: 0,
    duration: 6,
    location: '深圳市南山区能量中心',
    locationDetail: '1楼大厅',
    latitude: 22.5431,
    longitude: 114.0579,
    startTime: '2026-04-10 10:00',
    endTime: '2026-04-10 16:00',
    maxParticipants: 200,
    currentParticipants: 156,    tags: ['水晶集市', '免费活动', '能量交换', '疗愈体验']
  },
  {
    id: '5',
    title: '觉醒者交流会',
    subtitle: '觉醒者社群交流分享，智慧碰撞与能量共振',
    coverColor: 'from-orange-500 to-yellow-500',
    brandName: '行星能量中心',
    organizerName: '张觉醒',
    organizerTitle: '首席能量导师',
    price: 0,
    originalPrice: 0,
    duration: 3,
    location: '线上直播',
    locationDetail: 'Zoom会议室',
    latitude: null,
    longitude: null,
    startTime: '2026-04-05 19:00',
    endTime: '2026-04-05 22:00',
    maxParticipants: 300,
    currentParticipants: 245,    tags: ['社群交流', '线上活动', '免费参与', '智慧分享']
  },
  {
    id: '6',
    title: '能量绘画工作坊',
    subtitle: '通过绘画表达能量，释放潜意识，连接内在智慧',
    coverColor: 'from-pink-500 to-rose-500',
    brandName: '艺术疗愈工作室',
    organizerName: '陈艺心',
    organizerTitle: '艺术疗愈师',
    price: 480,
    originalPrice: 580,
    duration: 4,
    location: '成都市武侯区艺术中心',
    locationDetail: '2楼画室',
    latitude: 30.6509,
    longitude: 104.0758,
    startTime: '2026-04-18 14:00',
    endTime: '2026-04-18 18:00',
    maxParticipants: 20,
    currentParticipants: 15,    tags: ['艺术疗愈', '绘画工作坊', '创意表达']
  }
]

export default function EventListPage() {
  const router = useRouter()
  const [filter, setFilter] = useState('all') // all, free, paid, upcoming, online
  const [sortBy, setSortBy] = useState('recommended') // recommended, price_low, price_high, date

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter)
  }

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort)
  }

  const filteredEvents = mockEvents.filter(event => {
    if (filter === 'free') return event.price === 0
    if (filter === 'paid') return event.price > 0
    if (filter === 'upcoming') {
      const now = new Date()
      const eventDate = new Date(event.startTime)
      return eventDate > now
    }
    if (filter === 'online') return event.location === '线上直播'
    return true
  })

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === 'price_low') return a.price - b.price
    if (sortBy === 'price_high') return b.price - a.price
    if (sortBy === 'date') {
      return new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    }
    // recommended: 按参与度和免费活动综合排序
    const scoreA = a.currentParticipants / a.maxParticipants * 100 + (a.price === 0 ? 50 : 0)
    const scoreB = b.currentParticipants / b.maxParticipants * 100 + (b.price === 0 ? 50 : 0)
    return scoreB - scoreA
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = date.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return '今天'
    if (diffDays === 1) return '明天'
    if (diffDays === 2) return '后天'
    if (diffDays > 0 && diffDays <= 7) return `${diffDays}天后`
    
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="content-area">
        {/* 顶部导航栏 */}
        <header className="sticky top-0 z-10 bg-surface/95 backdrop-blur-sm border-b border-surface-variant">
          <div className="flex items-center justify-between p-4">
            <button 
              onClick={() => router.back()}
              className="p-2 rounded-full hover:bg-surface-variant transition-colors"
            >
              <ArrowLeft size={24} className="text-on-surface" />
            </button>
            <h1 className="text-lg font-bold text-on-surface">活动中心</h1>
            <div className="w-10" /> {/* 占位保持对称 */}
          </div>
        </header>

        {/* 筛选和排序 */}
        <div className="px-4 py-3 border-b border-surface-variant">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2 overflow-x-auto">
              {[
                { id: 'all', label: '全部' },
                { id: 'upcoming', label: '即将开始' },
                { id: 'free', label: '免费活动' },
                { id: 'paid', label: '付费活动' },
                { id: 'online', label: '线上活动' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => handleFilterChange(item.id)}
                  className={`px-4 py-1.5 rounded-full whitespace-nowrap text-sm transition-colors ${
                    filter === item.id
                      ? 'bg-primary text-white'
                      : 'bg-surface-variant text-on-surface-variant hover:bg-surface-variant/80'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                // 弹出排序选项
                const sorts = ['recommended', 'price_low', 'price_high', 'date']
                const currentIndex = sorts.indexOf(sortBy)
                const nextSort = sorts[(currentIndex + 1) % sorts.length]
                handleSortChange(nextSort)
              }}
              className="p-2 rounded-full hover:bg-surface-variant transition-colors"
            >
              <Filter size={20} className="text-on-surface" />
            </button>
          </div>
        </div>

        {/* 活动列表 */}
        <div className="px-4 py-4 space-y-4">
          {sortedEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => router.push(`/event/${event.id}`)}
              className="bg-surface rounded-2xl overflow-hidden border border-surface-variant hover:border-primary/30 transition-colors cursor-pointer"
            >
              {/* 活动封面 */}
              <div className={`h-48 bg-gradient-to-br ${event.coverColor} relative`}>
                {/* 价格标签 */}
                <div className="absolute bottom-4 right-4 bg-white/70 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
                  <div className="flex items-center gap-1">
                    {event.price === 0 ? (
                      <span className="font-bold text-green-600">免费</span>
                    ) : (
                      <>
                        <span className="font-bold text-primary">¥{event.price}</span>
                        {event.originalPrice > event.price && (
                          <span className="text-xs text-on-surface-variant line-through ml-1">
                            ¥{event.originalPrice}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
                
                {/* 场牌标签 */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-on-surface">
                    {event.brandName}
                  </span>
                </div>
                
                {/* 时间标签 */}
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-on-surface">
                      {formatDate(event.startTime)}
                    </div>
                    {event.location === '线上直播' && (
                      <div className="px-2 py-1 bg-blue-500/90 backdrop-blur-sm rounded-full text-sm font-medium text-white text-xs">
                        线上
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 活动信息 */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-on-surface line-clamp-1 mb-1">
                      {event.title}
                    </h2>
                    <p className="text-sm text-on-surface-variant line-clamp-2 mb-3">
                      {event.subtitle}
                    </p>
                  </div>
                </div>

                {/* 主办方信息 */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-surface-variant rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">
                      {event.organizerName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-on-surface">{event.organizerName}</div>
                    <div className="text-xs text-on-surface-variant">{event.organizerTitle}</div>
                  </div>
                </div>

                {/* 活动详情 */}
                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-on-surface-variant" />
                    <span className="text-on-surface-variant">时间</span>
                    <span className="font-medium text-on-surface ml-auto">
                      {formatTime(event.startTime)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-on-surface-variant" />
                    <span className="text-on-surface-variant">时长</span>
                    <span className="font-medium text-on-surface ml-auto">{event.duration}小时</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-on-surface-variant" />
                    <span className="text-on-surface-variant">地点</span>
                    <span className="font-medium text-on-surface ml-auto line-clamp-1">
                      {event.location.length > 6 ? `${event.location.substring(0, 6)}...` : event.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-on-surface-variant" />
                    <span className="text-on-surface-variant">名额</span>
                    <span className="font-medium text-on-surface ml-auto">
                      {event.currentParticipants}/{event.maxParticipants}
                    </span>
                  </div>
                </div>

                {/* 标签和评分 */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {event.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-surface-variant text-on-surface-variant text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {event.tags.length > 3 && (
                      <span className="px-2 py-1 text-on-surface-variant text-xs">
                        +{event.tags.length - 3}
                      </span>
                    )}
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 底部统计 */}
        <div className="px-4 py-3 border-t border-surface-variant">
          <div className="text-center text-sm text-on-surface-variant">
            共 {sortedEvents.length} 场活动 • {mockEvents.filter(e => e.price === 0).length} 场免费活动 • {mockEvents.filter(e => e.location === '线上直播').length} 场线上活动
          </div>
        </div>
      </main>
    </div>
  )
}