'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import BottomNav from '@/components/BottomNav'
import { MapPin } from 'lucide-react'
const brands = [
  { 
    id: 1, 
    name: '行星能量中心', 
    tags: ['冥想', '能量'], 
    slogan: '连接地球能量网格，提供集体冥想与能量疗愈服务，帮助个人觉醒与意识提升',
    location: '北京', 
    distance: '2.3km' 
  },
  { 
    id: 2, 
    name: '心灵疗愈空间', 
    tags: ['疗愈', '心灵'], 
    slogan: '专业心理咨询与能量疗愈结合，提供一对一心灵成长指导与团体疗愈工作坊',
    location: '上海', 
    distance: '5.1km' 
  },
  { 
    id: 3, 
    name: '觉醒瑜伽馆', 
    tags: ['瑜伽', '觉醒'], 
    slogan: '融合传统瑜伽与能量觉醒理念，提供身心灵平衡的瑜伽课程与冥想训练',
    location: '广州', 
    distance: '3.7km' 
  },
  { 
    id: 4, 
    name: '自然能量场', 
    tags: ['自然', '能量'], 
    slogan: '在大自然中连接地球能量，提供户外疗愈、森林冥想与自然能量工作坊',
    location: '深圳', 
    distance: '6.2km' 
  },
  { 
    id: 5, 
    name: '心灵成长工作室', 
    tags: ['心灵', '成长'], 
    slogan: '专注于个人心灵成长与潜能开发，提供系统的心灵成长课程与工作坊',
    location: '杭州', 
    distance: '4.5km' 
  },
  { 
    id: 6, 
    name: '冥想静修中心', 
    tags: ['冥想', '静修'], 
    slogan: '专业的冥想指导与静修环境，帮助现代人在喧嚣中找到内心平静与自我连接',
    location: '成都', 
    distance: '7.8km' 
  },
]

export default function ExplorePage() {
  const router = useRouter()
  const [activeView, setActiveView] = useState<'list' | 'map'>('list')
  
  const handleBrandClick = (brandId: number) => {
    router.push(`/explore/brand/${brandId}`)
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="content-area">
        {/* 顶部切换控件 */}
        <div className="flex bg-surface-variant rounded-xl p-1 mb-4">
          <button
            className={`flex-1 py-3 rounded-lg text-center transition-all ${
              activeView === 'list'
                ? 'bg-surface text-primary font-bold shadow-sm'
                : 'text-on-surface-variant'
            }`}
            onClick={() => setActiveView('list')}
          >
            📋 列表模式
          </button>
          <button
            className={`flex-1 py-3 rounded-lg text-center transition-all ${
              activeView === 'map'
                ? 'bg-surface text-primary font-bold shadow-sm'
                : 'text-on-surface-variant'
            }`}
            onClick={() => setActiveView('map')}
          >
            🗺️ 地图模式
          </button>
        </div>

        {/* 列表模式内容 */}
        {activeView === 'list' ? (
          <div className="space-y-4">
            {/* 冥想引导语 */}
            <div className="mb-6 p-4 bg-primary/5 rounded-xl">
              <p className="text-on-surface text-center italic leading-relaxed">
                此刻深呼吸，用你的身心感受，去链接那个注定和你结缘的场牌。
                <br />
                <span className="text-sm mt-2 block text-on-surface-variant">
                  放下思考，让直觉带你找到最适合的能量场域。
                </span>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {brands.map((brand) => (
                <div
                  key={brand.id}
                  onClick={() => handleBrandClick(brand.id)}
                  className="bg-surface border border-surface-variant rounded-xl p-4 cursor-pointer hover:translate-y-[-2px] transition-transform hover:border-primary/30"
                >
                  <div className="w-full h-32 bg-gradient-to-br from-surface-variant to-primary/10 rounded-lg mb-3" />
                  <h3 className="font-bold text-on-surface mb-2">{brand.name}</h3>
                  {/* slogan显示 */}
                  <p className="text-xs text-on-surface-variant mb-2 line-clamp-2">
                    {brand.slogan}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {brand.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-surface-variant rounded-full text-xs text-on-surface-variant"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-on-surface-variant">
                    <div className="flex items-center">
                      <MapPin size={12} className="mr-1" />
                      {brand.location} • {brand.distance}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* 地图模式内容 */
          <div>
            <div className="h-[calc(100vh-180px)] bg-gradient-to-br from-blue-100 to-blue-300 rounded-2xl mb-4 relative overflow-hidden">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-on-surface">
                <div className="text-6xl mb-4">🗺️</div>
                <p className="text-xl font-medium">能量场牌地图</p>
                <p className="text-sm opacity-75 mt-2 max-w-md text-center">
                  探索你周围的能量场域，标记代表不同疗愈方向的活动中心
                </p>
              </div>
              {/* 模拟地图标记 - 与品牌数据关联 */}
              {brands.slice(0, 4).map((brand, i) => {
                const positions = [
                  { top: '30%', left: '40%' },
                  { top: '50%', left: '60%' },
                  { top: '70%', left: '30%' },
                  { top: '40%', left: '70%' },
                ]
                const pos = positions[i % positions.length]
                return (
                  <div
                    key={brand.id}
                    className="absolute w-6 h-6 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-125 transition-transform"
                    style={{ top: pos.top, left: pos.left }}
                    onClick={() => handleBrandClick(brand.id)}
                  >
                    <div className="absolute inset-0 animate-ping bg-primary/30 rounded-full" />
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-surface px-3 py-1 rounded-lg shadow-lg text-xs font-medium border border-surface-variant">
                      {brand.name}
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="bg-surface-variant rounded-xl p-4 mb-4">
              <h3 className="font-bold text-on-surface mb-2">地图使用说明</h3>
              <ul className="text-sm text-on-surface-variant space-y-1">
                <li>• 点击地图上的标记查看场牌详情</li>
                <li>• 标记颜色表示场牌类型（蓝色：冥想，绿色：疗愈）</li>
                <li>• 标记大小表示距离你的远近</li>
                <li>• 拖动地图或缩放查看不同区域</li>
              </ul>
            </div>
            <div className="text-center text-sm text-on-surface-variant">
              <p>实际地图功能需要高德地图API集成</p>
              <p className="mt-1">当前显示模拟数据，点击标记可跳转</p>
            </div>
          </div>
        )}
      </main>
      <BottomNav activeTab="explore" />
    </div>
  )
}