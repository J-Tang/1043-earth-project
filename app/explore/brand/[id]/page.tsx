'use client'

import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, MapPin, Star, Users, Calendar, Phone, Globe, Share2, Heart } from 'lucide-react'
import { useState } from 'react'

// 模拟场牌数据
const mockBrandData = {
  id: '1',
  name: '行星能量中心',
  logoColor: 'from-purple-500 to-pink-500',
  stellarCode: 'ST-2024-AURA-001',
  shortIntro: '连接地球能量网格，开启集体觉醒',
  description: '行星能量中心是一个专注于能量疗愈与意识提升的顶级场牌。我们致力于通过地球能量网格连接、水晶疗愈、声音频率调节等方式，帮助人们实现身心灵的全面平衡与觉醒。',
  rating: 4.9,
  reviewCount: 128,
  location: '北京市朝阳区能量大道1043号',
  coordinates: { lat: 39.9042, lng: 116.4074 },
  phone: '138-8888-1043',
  website: 'https://planetary-energy.1043.world',
  services: ['能量疗愈', '水晶净化', '声音疗愈', '意识提升', '团体冥想'],
  tags: ['冥想', '能量', '疗愈', '觉醒', '集体'],
  images: [
    { id: 1, color: 'from-purple-400 to-pink-500' },
    { id: 2, color: 'from-blue-400 to-cyan-500' },
    { id: 3, color: 'from-green-400 to-emerald-500' },
  ],
  principal: {
    name: '张觉醒',
    title: '首席能量导师',
    bio: '20年能量疗愈经验，行星能量网络认证导师'
  }
}

export default function BrandDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [activeImage, setActiveImage] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  
  const brand = mockBrandData
  const brandId = params.id

  return (
    <div className="min-h-screen">
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
            <h1 className="text-lg font-bold text-on-surface">场牌详情</h1>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className="p-2 rounded-full hover:bg-surface-variant transition-colors"
              >
                <Heart size={20} className={isLiked ? 'text-red-500 fill-red-500' : 'text-on-surface'} />
              </button>
              <button className="p-2 rounded-full hover:bg-surface-variant transition-colors">
                <Share2 size={20} className="text-on-surface" />
              </button>
            </div>
          </div>
        </header>

        {/* 场牌图片轮播 */}
        <div className="relative h-64 bg-gradient-to-br from-primary/20 to-primary/5">
          <div className={`absolute inset-0 bg-gradient-to-br ${brand.images[activeImage].color}`} />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {brand.images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeImage ? 'bg-white scale-125' : 'bg-white/50'
                }`}
                onClick={() => setActiveImage(index)}
              />
            ))}
          </div>
          {/* 场牌logo */}
          <div className="absolute -bottom-8 left-4">
            <div className={`w-16 h-16 bg-gradient-to-br ${brand.logoColor} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
              {brand.name.charAt(0)}
            </div>
          </div>
        </div>

        {/* 场牌基本信息 */}
        <div className="pt-10 px-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h1 className="text-2xl font-bold text-on-surface">{brand.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center text-yellow-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={16} fill="currentColor" />
                  ))}
                </div>
                <span className="font-bold text-on-surface">{brand.rating}</span>
                <span className="text-sm text-on-surface-variant">({brand.reviewCount}条评价)</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-on-surface-variant">星际编码</div>
              <div className="font-mono font-bold text-primary">{brand.stellarCode}</div>
            </div>
          </div>

          <p className="text-on-surface-variant mt-2">{brand.shortIntro}</p>
        </div>

        {/* 服务标签 */}
        <div className="px-4 mt-6">
          <h3 className="text-sm font-medium text-on-surface-variant mb-2">服务项目</h3>
          <div className="flex flex-wrap gap-2">
            {brand.services.map((service, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-surface-variant text-on-surface-variant text-sm rounded-full"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* 详细信息卡片 */}
        <div className="mx-4 mt-6 bg-surface rounded-2xl p-4 border border-surface-variant">
          <h3 className="font-bold text-on-surface mb-3">详细信息</h3>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <MapPin size={18} className="text-on-surface-variant mr-3" />
              <div>
                <div className="text-sm text-on-surface-variant">位置</div>
                <div className="text-on-surface">{brand.location}</div>
              </div>
            </div>

            <div className="flex items-center">
              <Phone size={18} className="text-on-surface-variant mr-3" />
              <div>
                <div className="text-sm text-on-surface-variant">联系电话</div>
                <div className="text-on-surface">{brand.phone}</div>
              </div>
            </div>

            <div className="flex items-center">
              <Globe size={18} className="text-on-surface-variant mr-3" />
              <div>
                <div className="text-sm text-on-surface-variant">官方网站</div>
                <div className="text-primary">{brand.website}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 地图预览 */}
        <div className="mx-4 mt-6 bg-surface rounded-2xl overflow-hidden border border-surface-variant">
          <div className="p-4">
            <h3 className="font-bold text-on-surface mb-3">地理位置</h3>
            <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-300 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">🗺️</div>
                <p className="text-on-surface font-medium">高德地图集成</p>
                <p className="text-sm text-on-surface-variant mt-1">点击查看详细地图</p>
              </div>
              {/* 模拟地图标记 */}
              <div className="absolute w-8 h-8 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2">
                <div className="absolute inset-0 animate-ping bg-primary/30 rounded-full" />
              </div>
            </div>
            <p className="text-xs text-on-surface-variant text-center mt-2">
              坐标: {brand.coordinates.lat}, {brand.coordinates.lng}
            </p>
          </div>
        </div>

        {/* 场牌主理人 */}
        <div className="mx-4 mt-6 bg-surface rounded-2xl p-4 border border-surface-variant">
          <h3 className="font-bold text-on-surface mb-3">场牌主理人</h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center">
              <Users size={24} className="text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-on-surface">{brand.principal.name}</h4>
              <p className="text-sm text-primary mb-1">{brand.principal.title}</p>
              <p className="text-xs text-on-surface-variant">{brand.principal.bio}</p>
            </div>
          </div>
        </div>

        {/* 场牌详细描述 */}
        <div className="mx-4 mt-6">
          <h3 className="font-bold text-on-surface mb-3">场牌介绍</h3>
          <div className="text-on-surface-variant space-y-3">
            <p>{brand.description}</p>
            <p>我们的使命是帮助每个人连接内在能量，通过地球能量网格的共振，实现个人与集体的意识提升。我们提供多种能量疗愈服务，包括但不限于水晶能量调节、声音频率疗愈、能量场净化等。</p>
          </div>
        </div>

        {/* 行动按钮 */}
        <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-surface-variant p-4 shadow-lg">
          <div className="flex gap-3">
            <button className="flex-1 py-3 bg-surface-variant text-on-surface rounded-xl font-medium hover:bg-surface-variant/80 transition-colors">
              立即预约
            </button>
            <button className="flex-1 py-3 bg-gradient-to-br from-primary to-primary-variant text-white rounded-xl font-bold hover:opacity-90 transition-opacity">
              联系场牌
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}