'use client'

import { Heart, Star, ShoppingBag, Calendar, MapPin } from 'lucide-react'

export default function FavoritesPage() {
  const favorites = [
    {
      id: 1,
      type: 'product',
      title: '能量水晶套装',
      brand: '灵性之光',
      price: 1280,
      imageColor: 'from-purple-500 to-pink-500',
    },
    {
      id: 2,
      type: 'course',
      title: '七日冥想入门',
      brand: '心灵成长学院',
      price: 299,
      imageColor: 'from-blue-500 to-teal-500',
    },
    {
      id: 3,
      type: 'brand',
      title: '灵性之光',
      description: '专注水晶能量疗愈',
      location: '北京',
      imageColor: 'from-amber-500 to-orange-500',
    },
    {
      id: 4,
      type: 'event',
      title: '满月能量疗愈会',
      brand: '地球能量联盟',
      date: '2026-04-01',
      price: 199,
      imageColor: 'from-indigo-500 to-purple-500',
    },
  ]

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'product': return '产品'
      case 'course': return '课程'
      case 'brand': return '场牌'
      case 'event': return '活动'
      default: return '收藏'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'product': return <ShoppingBag size={16} />
      case 'course': return <Calendar size={16} />
      case 'brand': return <Star size={16} />
      case 'event': return <MapPin size={16} />
      default: return <Heart size={16} />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="content-area p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-on-surface">我的收藏</h1>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-primary text-white rounded-lg text-sm">全部</button>
            <button className="px-3 py-1 bg-surface rounded-lg text-sm">场牌</button>
            <button className="px-3 py-1 bg-surface rounded-lg text-sm">课程</button>
            <button className="px-3 py-1 bg-surface rounded-lg text-sm">产品</button>
          </div>
        </div>

        <div className="space-y-3">
          {favorites.map((item) => (
            <div key={item.id} className="bg-surface rounded-xl p-4 border border-surface-variant/50">
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 ${item.imageColor} rounded-lg flex items-center justify-center text-white`}>
                  {getTypeIcon(item.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-on-surface">{item.title}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                          {getTypeLabel(item.type)}
                        </span>
                        {'brand' in item && (
                          <span className="text-xs text-on-surface-variant">场牌: {item.brand}</span>
                        )}
                        {'location' in item && (
                          <span className="text-xs text-on-surface-variant flex items-center gap-1">
                            <MapPin size={10} /> {item.location}
                          </span>
                        )}
                      </div>
                    </div>
                    {'price' in item && (
                      <div className="text-right">
                        <div className="font-bold text-primary">¥{item.price}</div>
                        <button className="mt-1 text-xs px-2 py-1 bg-red-500/10 text-red-500 rounded-full hover:bg-red-500/20">
                          取消收藏
                        </button>
                      </div>
                    )}
                  </div>
                  {'description' in item && (
                    <p className="text-sm text-on-surface-variant mt-2">{item.description}</p>
                  )}
                  {'date' in item && (
                    <div className="text-xs text-on-surface-variant mt-2">活动时间: {item.date}</div>
                  )}
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-3">
                <button className="px-3 py-1.5 text-sm border border-primary text-primary rounded-lg hover:bg-primary/5">
                  查看详情
                </button>
                <button className="px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:opacity-90">
                  {item.type === 'product' ? '立即购买' : item.type === 'course' ? '报名参加' : item.type === 'event' ? '立即报名' : '进入场牌'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-on-surface-variant text-sm">
          共 {favorites.length} 个收藏
        </div>
      </main>
    </div>
  )
}