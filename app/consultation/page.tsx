'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Filter, MapPin, Users, Phone, Heart, ChevronRight, Sparkles } from 'lucide-react'
import { useState } from 'react'

// 模拟咨询师数据
const mockConsultants = [
  {
    id: '1',
    name: '张能量',
    photoColor: 'from-purple-500 to-pink-500',
    brandName: '行星能量中心',
    energyAttribute: '直觉疗愈',
    shortIntro: '专注能量疗愈20年，帮助数千人恢复能量平衡',
    price: 580,
    duration: '60分钟',

    location: '北京',
    tags: ['能量疗愈', '脉轮平衡', '直觉引导'],
    contactType: '微信预约',
    isVerified: true,
    isFeatured: true
  },
  {
    id: '2',
    name: '李心灵',
    photoColor: 'from-blue-500 to-cyan-500',
    brandName: '心灵疗愈空间',
    energyAttribute: '共情连接',
    shortIntro: '深度共情能力，帮助客户解决情感与关系问题',
    price: 480,
    duration: '50分钟',

    location: '上海',
    tags: ['情感咨询', '关系疗愈', '共情支持'],
    contactType: '电话预约',
    isVerified: true,
    isFeatured: false
  },
  {
    id: '3',
    name: '王觉醒',
    photoColor: 'from-green-500 to-emerald-500',
    brandName: '觉醒之路中心',
    energyAttribute: '意识提升',
    shortIntro: '意识觉醒导师，帮助人们连接高我，提升意识层级',
    price: 680,
    duration: '90分钟',

    location: '深圳',
    tags: ['意识提升', '高我连接', '灵性成长'],
    contactType: '微信预约',
    isVerified: true,
    isFeatured: true
  },
  {
    id: '4',
    name: '陈平静',
    photoColor: 'from-indigo-500 to-purple-500',
    brandName: '静心疗愈馆',
    energyAttribute: '情绪平衡',
    shortIntro: '情绪管理专家，帮助客户建立内在平静与和谐',
    price: 380,
    duration: '45分钟',    location: '杭州',
    tags: ['情绪管理', '压力释放', '内在平静'],
    contactType: '在线预约',
    isVerified: true,
    isFeatured: false
  },
  {
    id: '5',
    name: '赵连接',
    photoColor: 'from-orange-500 to-yellow-500',
    brandName: '地球能量网格中心',
    energyAttribute: '地球连接',
    shortIntro: '地球能量连接者，帮助人们与地球能量网格建立连接',
    price: 520,
    duration: '75分钟',

    location: '成都',
    tags: ['地球能量', '网格连接', '自然疗愈'],
    contactType: '微信预约',
    isVerified: true,
    isFeatured: false
  },
  {
    id: '6',
    name: '孙音律',
    photoColor: 'from-pink-500 to-rose-500',
    brandName: '声音疗愈学院',
    energyAttribute: '声音频率',
    shortIntro: '声音疗愈师，通过声音频率调节能量场',
    price: 450,
    duration: '60分钟',

    location: '广州',
    tags: ['声音疗愈', '频率调节', '能量净化'],
    contactType: '电话预约',
    isVerified: true,
    isFeatured: false
  }
]

export default function ConsultationListPage() {
  const router = useRouter()
  const [filter, setFilter] = useState('all') // all, featured, affordable, available
  const [sortBy, setSortBy] = useState('recommended') // recommended, price_low, price_high
  const [selectedEnergy, setSelectedEnergy] = useState<string | null>(null)
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [selectedConsultant, setSelectedConsultant] = useState<any>(null)

  // 所有能量属性
  const energyAttributes = Array.from(new Set(mockConsultants.map(c => c.energyAttribute)))

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter)
  }

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort)
  }

  const handleEnergySelect = (energy: string) => {
    setSelectedEnergy(selectedEnergy === energy ? null : energy)
  }

  const filteredConsultants = mockConsultants.filter(consultant => {
    if (filter === 'featured' && !consultant.isFeatured) return false
    if (filter === 'affordable' && consultant.price > 500) return false
    if (selectedEnergy && consultant.energyAttribute !== selectedEnergy) return false
    return true
  })

  const sortedConsultants = [...filteredConsultants].sort((a, b) => {
    if (sortBy === 'price_low') return a.price - b.price
    if (sortBy === 'price_high') return b.price - a.price
    // recommended: 基于特色和价格综合排序
    const scoreA = (a.isFeatured ? 100 : 0) + (a.price <= 500 ? 50 : 0)
    const scoreB = (b.isFeatured ? 100 : 0) + (b.price <= 500 ? 50 : 0)
    return scoreB - scoreA
  })

  const formatPrice = (price: number) => {
    return `¥${price}/次`
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
            <h1 className="text-lg font-bold text-on-surface">咨询服务</h1>
            <div className="w-10" /> {/* 占位保持对称 */}
          </div>
        </header>

        {/* 筛选和排序 */}
        <div className="px-4 py-3 border-b border-surface-variant">
          <div className="flex items-center justify-between mb-3">
            <div className="flex space-x-2 overflow-x-auto">
              {[
                { id: 'all', label: '全部' },
                { id: 'featured', label: '推荐咨询师' },
                { id: 'affordable', label: '高性价比' }
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
                const sorts = ['recommended', 'price_low', 'price_high']
                const currentIndex = sorts.indexOf(sortBy)
                const nextSort = sorts[(currentIndex + 1) % sorts.length]
                handleSortChange(nextSort)
              }}
              className="p-2 rounded-full hover:bg-surface-variant transition-colors"
            >
              <Filter size={20} className="text-on-surface" />
            </button>
          </div>

          {/* 能量属性筛选 */}
          <div className="mt-2">
            <div className="text-xs text-on-surface-variant mb-2">能量属性</div>
            <div className="flex flex-wrap gap-2">
              {energyAttributes.map((energy) => (
                <button
                  key={energy}
                  onClick={() => handleEnergySelect(energy)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${
                    selectedEnergy === energy
                      ? 'bg-primary text-white'
                      : 'bg-surface-variant text-on-surface-variant hover:bg-surface-variant/80'
                  }`}
                >
                  {energy}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 咨询师列表 */}
        <div className="px-4 py-4 space-y-4">
          {sortedConsultants.map((consultant) => (
            <div
              key={consultant.id}
              onClick={() => router.push(`/consultation/${consultant.id}`)}
              className="bg-surface rounded-2xl overflow-hidden border border-surface-variant hover:border-primary/30 transition-colors cursor-pointer"
            >
              <div className="p-4">
                <div className="flex gap-4">
                  {/* 咨询师照片 */}
                  <div className="relative">
                    <div className={`w-20 h-20 bg-gradient-to-br ${consultant.photoColor} rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
                      {consultant.name.charAt(0)}
                    </div>
                    {consultant.isVerified && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Sparkles size={12} className="text-white" />
                      </div>
                    )}
                    {consultant.isFeatured && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Sparkles size={12} className="text-white" />
                      </div>
                    )}
                  </div>

                  {/* 咨询师信息 */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-lg font-bold text-on-surface">{consultant.name}</h2>
                          <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                            {consultant.energyAttribute}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-on-surface-variant mt-1">
                          <MapPin size={12} />
                          <span>场牌：{consultant.brandName}</span>
                          <span>•</span>
                          <span>{consultant.location}</span>
                        </div>
                      </div>

                    </div>

                    {/* 一句话介绍 */}
                    <p className="text-sm text-on-surface-variant mt-2 line-clamp-2">
                      {consultant.shortIntro}
                    </p>

                    {/* 标签 */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {consultant.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 bg-surface-variant text-on-surface-variant text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {consultant.tags.length > 2 && (
                        <span className="px-2 py-0.5 text-on-surface-variant text-xs">
                          +{consultant.tags.length - 2}
                        </span>
                      )}
                    </div>

                    {/* 价格和联系方式 */}
                    <div className="flex items-center justify-between mt-3">
                      <div>
                        <div className="text-xl font-bold text-primary">{formatPrice(consultant.price)}</div>
                        <div className="text-xs text-on-surface-variant">{consultant.duration}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-on-surface-variant flex items-center gap-1">
                          <Phone size={12} />
                          <span>{consultant.contactType}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 底部操作 */}
              <div className="px-4 pb-4 pt-0">
                <div className="flex gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      console.log('收藏咨询师', consultant.id)
                    }}
                    className="flex-1 py-2 bg-surface-variant text-on-surface rounded-lg font-medium hover:bg-surface-variant/80 transition-colors flex items-center justify-center gap-2"
                  >
                    <Heart size={16} />
                    收藏
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedConsultant(consultant)
                      setContactModalOpen(true)
                    }}
                    className="flex-1 py-2 bg-gradient-to-br from-primary to-primary-variant text-white rounded-lg font-bold hover:opacity-90 transition-opacity"
                  >
                    联系咨询师
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 联系咨询师模态框 */}
        {contactModalOpen && selectedConsultant && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="bg-surface rounded-2xl max-w-md w-full mx-4 overflow-hidden border border-surface-variant">
              {/* 模态框头部 */}
              <div className="p-6 border-b border-surface-variant">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-on-surface">联系咨询师</h2>
                  <button
                    onClick={() => setContactModalOpen(false)}
                    className="p-2 rounded-full hover:bg-surface-variant transition-colors"
                  >
                    <ArrowLeft size={20} className="text-on-surface" />
                  </button>
                </div>
                
                {/* 咨询师信息 */}
                <div className="flex items-center gap-4">
                  <div className={`w-20 h-20 bg-gradient-to-br ${selectedConsultant.photoColor} rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                    {selectedConsultant.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-on-surface">{selectedConsultant.name}</h3>
                    <p className="text-sm text-on-surface-variant mt-1">场牌：{selectedConsultant.brandName}</p>
                    <p className="text-sm text-on-surface-variant">{selectedConsultant.energyAttribute} • {selectedConsultant.location}</p>
                  </div>
                </div>
              </div>

              {/* 联系方式 */}
              <div className="p-6">
                <h3 className="font-bold text-on-surface mb-3">联系方式</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-surface-variant rounded-lg">
                    <div className="flex items-center gap-3">
                      <Phone size={20} className="text-primary" />
                      <div>
                        <div className="font-medium text-on-surface">{selectedConsultant.contactType}</div>
                        <div className="text-xs text-on-surface-variant">点击下方按钮直接联系</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-on-surface-variant p-3 bg-surface-variant/50 rounded-lg">
                    <p className="font-medium mb-1">预约须知：</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>请提前至少24小时预约</li>
                      <li>首次咨询可享受15分钟免费沟通</li>
                      <li>如需取消或改期，请提前12小时通知</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="p-6 pt-0">
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      // 复制联系方式到剪贴板
                      navigator.clipboard.writeText(selectedConsultant.contactType)
                      alert('联系方式已复制到剪贴板')
                    }}
                    className="flex-1 py-3 bg-surface-variant text-on-surface rounded-lg font-medium hover:bg-surface-variant/80 transition-colors"
                  >
                    复制联系方式
                  </button>
                  <button
                    onClick={() => {
                      // 模拟拨打电话或打开微信
                      if (selectedConsultant.contactType.includes('微信')) {
                        alert(`即将打开微信添加 ${selectedConsultant.name} 为好友`)
                        // 实际应用中可跳转微信
                      } else if (selectedConsultant.contactType.includes('电话')) {
                        alert(`即将拨打 ${selectedConsultant.name} 的电话`)
                        // 实际应用中可调用 tel: 链接
                      } else {
                        alert(`即将联系 ${selectedConsultant.name}`)
                      }
                      setContactModalOpen(false)
                    }}
                    className="flex-1 py-3 bg-gradient-to-br from-primary to-primary-variant text-white rounded-lg font-bold hover:opacity-90 transition-opacity"
                  >
                    立即联系
                  </button>
                </div>
                <button
                  onClick={() => setContactModalOpen(false)}
                  className="w-full py-3 text-center text-on-surface-variant hover:text-on-surface transition-colors mt-3"
                >
                  稍后联系
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 底部统计 */}
        <div className="px-4 py-3 border-t border-surface-variant">
          <div className="text-center text-sm text-on-surface-variant">
            共 {sortedConsultants.length} 位咨询师 • {mockConsultants.filter(c => c.isFeatured).length} 位推荐咨询师 • 平均价格 ¥{Math.round(mockConsultants.reduce((sum, c) => sum + c.price, 0) / mockConsultants.length)}
          </div>
        </div>
      </main>
    </div>
  )
}