"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight, Star, Users, Book, Calendar, ShoppingBag, MessageCircle, Search, MapPin } from 'lucide-react'

// 四大类别区：课程、活动、商品、咨询 (需求文档要求)
const fourCategories = [
  { icon: Book, name: '课程', color: 'from-blue-400 to-blue-600' },
  { icon: Calendar, name: '活动', color: 'from-green-400 to-green-600' },
  { icon: ShoppingBag, name: '商品', color: 'from-purple-400 to-purple-600' },
  { icon: MessageCircle, name: '咨询', color: 'from-orange-400 to-orange-600' },
]

// 子团体测试数据 (用户2026-03-29评审要求：从数据库读取，先用测试数据)
// 每行4个小文字块，仅用文字显示
const subgroups = [
  { title: '青少年', color: 'bg-blue-100 text-blue-800' },
  { title: '婚恋', color: 'bg-pink-100 text-pink-800' },
  { title: '地脉疗愈', color: 'bg-green-100 text-green-800' },
  { title: 'DNA', color: 'bg-purple-100 text-purple-800' },
  { title: '特需孩子', color: 'bg-yellow-100 text-yellow-800' },
  { title: '身体筑基', color: 'bg-orange-100 text-orange-800' },
  { title: '法律', color: 'bg-indigo-100 text-indigo-800' },
  { title: '公益', color: 'bg-red-100 text-red-800' },
]

// 推荐内容流 (需求文档要求：内容卡片包含大图片、内容名称、简介)
const recommendations = [
  {
    id: 1,
    type: 'brand', // 场牌
    title: '行星能量中心',
    description: '连接地球能量网格的顶级疗愈场',
    category: '场牌',
    rating: 4.9,
    matchRate: 92,
    location: '北京',
    imageColor: 'from-blue-400 to-purple-600',
  },
  {
    id: 2,
    type: 'product', // 产品
    title: '能量水晶套装',
    description: '精选天然水晶，经过能量净化',
    category: '商品',
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    imageColor: 'from-purple-400 to-pink-600',
  },
  {
    id: 3,
    type: 'course', // 课程
    title: '觉醒之路工作坊',
    description: '7天内在觉醒课程，引导自我认知',
    category: '课程',
    price: 888,
    rating: 4.9,
    duration: '7天',
    imageColor: 'from-green-400 to-teal-600',
  },
  {
    id: 4,
    type: 'event', // 活动
    title: '满月疗愈仪式',
    description: '满月能量的集体疗愈与净化活动',
    category: '活动',
    date: '2026-04-12',
    participants: 42,
    imageColor: 'from-yellow-400 to-orange-600',
  },
]

export default function HomeContent() {
  const router = useRouter()
  const [visibleCount, setVisibleCount] = useState(2) // 初始显示2个推荐项
  
  const handleCategoryClick = (categoryName: string) => {
    switch(categoryName) {
      case '课程':
        router.push('/course')
        break
      case '活动':
        router.push('/event')
        break
      case '商品':
        router.push('/shop')
        break
      case '咨询':
        router.push('/consultation')
        break
      default:
        console.log('点击了类别:', categoryName)
    }
  }
  
  const handleRecommendationClick = (item: any) => {
    switch(item.type) {
      case 'brand':
        router.push(`/explore/brand/${item.id}`)
        break
      case 'product':
        router.push(`/shop/product/${item.id}`)
        break
      case 'course':
        router.push(`/course/${item.id}`)
        break
      case 'event':
        router.push(`/event/${item.id}`)
        break
      default:
        console.log('点击了推荐项:', item)
    }
  }
  
  const handleSearchClick = () => {
    router.push('/search')
  }
  
  const handleSubgroupClick = (subgroupTitle: string) => {
    // 暂时跳转到第一个子团体，实际应该根据subgroupTitle找到对应ID
    router.push('/subgroup/1')
  }
  
  return (
    <div className="space-y-6 pb-6">
      {/* 1. 置顶内容区域 - 黄金比例轮播图 (需求文档要求) */}
      <div className="relative h-56 bg-gradient-to-br from-primary to-primary-variant rounded-2xl overflow-hidden flex items-center justify-center text-white">
        <div className="text-center px-4">
          <h1 className="text-2xl font-bold mb-2">能量觉醒 · 开启你的1043旅程</h1>
          <p className="opacity-90">行星疗愈团 · 连接场牌与能量</p>
        </div>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-white' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>

      {/* 2. 四大类别区 - 网格布局 (需求文档要求：课程、活动、商品、咨询) */}
      <div>
        <div className="grid grid-cols-4 gap-4">
          {fourCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(category.name)}
              className="text-center focus:outline-none"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mx-auto mb-2 hover:opacity-90 transition-opacity`}>
                <category.icon className="text-white" size={20} />
              </div>
              <span className="text-xs text-on-surface-variant">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. 子团体模块 - 每行4个小文字块 (用户2026-03-29评审要求) */}
      <div className="mt-6">
        <div className="grid grid-cols-4 gap-2">
          {subgroups.map((group, index) => (
            <button
              key={index}
              onClick={() => handleSubgroupClick(group.title)}
              className={`px-2 py-2 rounded-lg text-center ${group.color} text-sm font-medium hover:opacity-90 transition-opacity focus:outline-none`}
            >
              {group.title}
            </button>
          ))}
        </div>
      </div>

      {/* 4. 搜索框 - 页面中部明显位置 (需求文档要求) */}
      <div className="pt-2">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-on-surface-variant" size={18} />
          <input
            type="text"
            placeholder="搜索场牌、课程、商品..."
            className="w-full pl-12 pr-4 py-3 bg-surface-variant text-on-surface rounded-xl border border-surface-variant focus:outline-none focus:ring-2 focus:ring-primary"
            readOnly
            onClick={handleSearchClick}
          />
        </div>
        <p className="text-xs text-on-surface-variant text-center mt-2">
          点击搜索框进入全局搜索页面
        </p>
      </div>

      {/* 5. 推荐内容流 - 内容卡片组成 (需求文档要求) */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-on-surface">推荐内容</h2>
          <button className="text-primary text-sm flex items-center">
            更多推荐 <ChevronRight size={16} />
          </button>
        </div>
        <div className="space-y-4">
          {recommendations.slice(0, visibleCount).map((item) => (
            <div 
              key={item.id} 
              onClick={() => handleRecommendationClick(item)}
              className="bg-surface rounded-xl overflow-hidden border border-surface-variant hover:border-primary/30 transition-colors cursor-pointer"
            >
              <div className={`h-40 bg-gradient-to-br ${item.imageColor} relative`}>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2">
                    <h3 className="text-white font-bold">{item.title}</h3>
                    <p className="text-white/90 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="inline-block px-2 py-1 bg-surface-variant text-on-surface-variant text-xs rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex items-center">
                    {item.price && (
                      <div>
                        <span className="font-bold text-on-surface">¥{item.price}</span>
                        {item.originalPrice && (
                          <span className="text-xs text-on-surface-variant line-through ml-1">¥{item.originalPrice}</span>
                        )}
                      </div>
                    )}
                    {!item.price && item.type === 'brand' && (
                      <div className="text-xs text-on-surface-variant">
                        匹配度 {item.matchRate}%
                      </div>
                    )}
                    {!item.price && item.type === 'event' && (
                      <div className="text-xs text-on-surface-variant">
                        {item.participants}人参与
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-2 text-xs text-on-surface-variant">
                  <div className="flex items-center">
                    {item.type === 'brand' && (
                      <>
                        <MapPin size={12} className="mr-1" />
                        <span>{item.location}</span>
                        <span className="mx-2">•</span>
                        <span>匹配度 {item.matchRate}%</span>
                      </>
                    )}
                    {item.type === 'course' && (
                      <>
                        <Calendar size={12} className="mr-1" />
                        <span>{item.duration}</span>
                      </>
                    )}
                    {item.type === 'event' && (
                      <>
                        <Users size={12} className="mr-1" />
                        <span>{item.participants}人参与</span>
                      </>
                    )}
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRecommendationClick(item)
                    }}
                    className="text-primary text-sm font-medium hover:underline"
                  >
                    查看详情
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {/* 加载更多按钮 */}
          {visibleCount < recommendations.length && (
            <div className="pt-4 text-center">
              <button
                onClick={() => setVisibleCount(prev => Math.min(prev + 2, recommendations.length))}
                className="px-6 py-3 bg-surface-variant text-on-surface rounded-xl hover:bg-surface-variant/80 transition-colors font-medium"
              >
                加载更多推荐 ({visibleCount}/{recommendations.length})
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}