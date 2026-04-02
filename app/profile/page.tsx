'use client'

import { useRouter } from 'next/navigation'
import BottomNav from '@/components/BottomNav'
import { User, ShoppingBag, Calendar, Heart, Settings, LogOut, ChevronRight, Star, MapPin, Phone, Mail, Edit2 } from 'lucide-react'
import { useState } from 'react'

// 模拟用户数据
const mockUser = {
  name: '张觉醒',
  avatarColor: 'from-purple-500 to-pink-500',
  gender: 'male', // 'male' 或 'female'
  energyTags: ['直觉', '疗愈', '共情', '灵感'],
  bio: '能量探索者，致力于心灵成长与地球疗愈',
  isBrandManager: false, // 模拟场牌权限
  // 以下字段在编辑页面使用，但不在个人主页显示
  phone: '138****8888',
  email: 'juexing@1043.world',
  birthday: '1990-01-01',
  signature: '探索宇宙能量，连接地球频率',
  tags: ['能量疗愈', '冥想', '水晶'],
  wechatBound: true,
  emailVerified: true,
}

// 模拟数据统计
const mockStats = {
  productOrders: 12,
  productOrdersPending: 3, // 待收货
  courseOrders: 5,
  courseOrdersPending: 2, // 待上课
  eventOrders: 3,
  eventOrdersPending: 1, // 待参加
  favorites: 8,
}

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState(mockUser)

  // 跳转函数
  const handleProductOrders = () => {
    // 跳转到订单列表页
    router.push('/order/list')
  }
  
  const handleCourseEventOrders = () => {
    // 跳转到订单列表页
    router.push('/order/list')
  }
  
  const handleFavorites = () => {
    // 跳转到收藏列表页
    router.push('/favorites')
  }
  
  const handleBrandManagement = () => {
    if (user.isBrandManager) {
      // 进入场牌管理
      router.push('/brand/manage')
    } else {
      // 加入1043服务团
      router.push('/service/join')
    }
  }

  const handleEditProfile = () => {
    // 跳转到编辑个人信息页面
    router.push('/profile/edit')
  }

  // 菜单项 - 按照用户要求从上到下排列
  const menuItems = [
    {
      id: 'product-orders',
      icon: ShoppingBag,
      label: '我的订单',
      description: '产品订单',
      count: mockStats.productOrdersPending, // 待收货数量
      countText: `${mockStats.productOrdersPending}待收货`, // 显示文本
      onClick: handleProductOrders
    },
    {
      id: 'course-event-orders',
      icon: Calendar,
      label: '我的课程和活动订单',
      description: '课程和活动订单',
      count: mockStats.courseOrdersPending + mockStats.eventOrdersPending, // 待参加数量
      countText: `${mockStats.courseOrdersPending + mockStats.eventOrdersPending}待参加`,
      onClick: handleCourseEventOrders
    },
    {
      id: 'favorites',
      icon: Heart,
      label: '我的收藏',
      description: '场牌、课程、产品收藏',
      count: mockStats.favorites,
      countText: `${mockStats.favorites}收藏`,
      onClick: handleFavorites
    }
  ]

  // 根据权限显示不同按钮
  const actionButton = user.isBrandManager 
    ? {
        label: '进入场牌管理',
        onClick: handleBrandManagement
      }
    : {
        label: '加入1043服务团',
        onClick: handleBrandManagement
      }

  return (
    <div className="min-h-screen bg-white">
      <main className="content-area">
        {/* 顶部用户信息卡片 - 精巧设计 */}
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl mx-4 mt-4 p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              {/* 头像 */}
              <div className="relative">
                <div className={`w-16 h-16 bg-gradient-to-br ${user.avatarColor} rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
                  {user.name.charAt(0)}
                </div>
                {/* 编辑按钮 */}
                <button onClick={handleEditProfile} className="absolute -bottom-1 -right-1 w-6 h-6 bg-surface rounded-full flex items-center justify-center shadow-md hover:bg-surface-variant transition-colors">
                  <Edit2 size={12} className="text-on-surface" />
                </button>
              </div>
              
              {/* 用户基本信息 */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-xl font-bold text-on-surface">{user.name}</h1>
                  <div className="flex items-center gap-1">
                    <span className="text-lg">
                      {user.gender === 'male' ? '♂' : '♀'}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-on-surface-variant mb-3 line-clamp-1">{user.bio}</p>
                
                {/* 能量标签 - 精巧设计 */}
                <div className="flex flex-wrap gap-1">
                  {user.energyTags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>


        </div>

        {/* 主功能菜单 - 从上到下排列 */}
        <div className="mx-4 mt-6 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={item.onClick}
              className="w-full bg-surface rounded-xl p-4 flex items-center justify-between hover:bg-surface-variant transition-colors border border-surface-variant/50"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <item.icon size={20} className="text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-on-surface">{item.label}</div>
                  <div className="text-xs text-on-surface-variant">{item.description}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap">
                  {item.countText}
                </div>
                <ChevronRight size={18} className="text-on-surface-variant" />
              </div>
            </button>
          ))}
        </div>

        {/* 设置按钮 */}
        <div className="mx-4 mt-4">
          <button className="w-full bg-surface rounded-xl p-4 flex items-center justify-between hover:bg-surface-variant transition-colors border border-surface-variant/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-surface-variant rounded-lg">
                <Settings size={20} className="text-on-surface" />
              </div>
              <div className="font-medium text-on-surface">设置中心</div>
            </div>
            <ChevronRight size={18} className="text-on-surface-variant" />
          </button>
        </div>

        {/* 根据权限显示的行动按钮 */}
        <div className="mx-4 mt-6">
          <button
            onClick={actionButton.onClick}
            className={`w-full py-3 rounded-xl font-bold transition-opacity ${
              user.isBrandManager
                ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:opacity-90'
                : 'bg-gradient-to-br from-primary to-primary-variant text-white hover:opacity-90'
            }`}
          >
            {actionButton.label}
          </button>
          
          {!user.isBrandManager && (
            <p className="text-xs text-center text-on-surface-variant mt-2">
              加入服务团，为地球能量贡献一份力量
            </p>
          )}
        </div>



        {/* 退出登录 */}
        <div className="mx-4 mt-6 mb-8 text-center">
          <button className="inline-flex items-center gap-2 px-6 py-3 text-on-surface-variant hover:text-on-surface transition-colors">
            <LogOut size={16} />
            退出登录
          </button>
        </div>
      </main>
      <BottomNav activeTab="profile" />
    </div>
  )
}