'use client'

import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Users, Star, MapPin, Calendar, ShoppingBag, Heart, Share2, ChevronRight, Target, Award, Globe, Users2, BookOpen, Phone, Mail, MessageCircle } from 'lucide-react'
import { useState } from 'react'

// 模拟子团体数据
const mockSubgroupDetail = {
  id: '1',
  name: '行星疗愈探索团',
  logoColor: 'from-purple-500 to-pink-500',
  coverColor: 'from-indigo-500 to-purple-500',
  mission: `行星疗愈探索团是一个专注于探索和传播行星能量疗愈方法的服务团体。我们相信地球能量与人类健康之间存在着深刻的连接，通过科学的方法和灵性的智慧，我们可以更好地理解、运用这些能量来促进集体觉醒与疗愈。

我们的使命是：
1. 探索行星能量疗愈的科学原理与实践方法
2. 培养专业的能量疗愈师和意识觉醒导师
3. 建立跨领域的能量疗愈研究与交流平台
4. 推广地球能量连接与环境保护的觉醒意识
5. 为地球能量网格的和谐共振贡献集体智慧

我们坚信，每个个体都是地球能量网络的一部分，通过集体的探索和分享，我们可以共同创造更加和谐、健康、觉醒的地球社群。`,
  description: `行星疗愈探索团成立于2020年，由一群能量疗愈师、意识研究者、环保主义者和灵性探索者共同创立。我们致力于将现代科学与古老智慧相结合，探索地球能量疗愈的无限可能。

成立背景：
随着人类对身心健康和环境保护意识的提升，越来越多的人开始关注地球能量与个体健康的关系。我们认识到，传统的疗愈方法往往忽视了地球这个最大的能量源，而现代科学也开始证实地球能量场对人类健康的深远影响。

团体特色：
• 跨学科研究团队（能量医学、量子物理、灵性科学）
• 严谨的科学实验与灵性实践相结合
• 开放式的研究成果分享机制
• 国际化的交流合作网络`,
  createdYear: 2020,
  memberCount: 156,
  fieldBrands: [
    {
      id: '1',
      name: '行星能量中心',
      logoColor: 'from-purple-400 to-pink-400',
      contribution: '提供能量疗愈研究场地和设备支持，参与行星能量网格连接实验',

    },
    {
      id: '2',
      name: '心灵疗愈空间',
      logoColor: 'from-blue-400 to-cyan-400',
      contribution: '负责团体成员的疗愈技能培训和心理支持工作',

    },
    {
      id: '3',
      name: '地球能量网格中心',
      logoColor: 'from-green-400 to-emerald-400',
      contribution: '提供地球能量网格数据监测和分析技术支持',

    }
  ],
  courses: [
    {
      id: '1',
      title: '行星能量疗愈入门',
      type: '课程',
      color: 'from-purple-400 to-pink-400',
      description: '学习基础的行星能量感知与疗愈技巧',
      price: 380
    },
    {
      id: '2',
      title: '地球能量网格连接',
      type: '课程',
      color: 'from-green-400 to-emerald-400',
      description: '掌握地球能量网格的连接与运用方法',
      price: 520
    }
  ],
  events: [
    {
      id: '1',
      title: '满月集体疗愈仪式',
      type: '活动',
      color: 'from-indigo-400 to-purple-400',
      description: '利用满月能量进行集体能量净化',
      price: 180
    },
    {
      id: '2',
      title: '春分能量启动工作坊',
      type: '活动',
      color: 'from-blue-400 to-cyan-400',
      description: '春分时节的能量转换与启动仪式',
      price: 280
    }
  ],
  products: [
    {
      id: '1',
      title: '行星能量水晶套装',
      type: '产品',
      color: 'from-purple-300 to-pink-300',
      description: '特别设计的行星能量净化水晶',
      price: 680
    },
    {
      id: '2',
      title: '能量网格测量工具',
      type: '产品',
      color: 'from-green-300 to-emerald-300',
      description: '用于测量地球能量网格的工具包',
      price: 420
    }
  ],
  tags: ['行星能量', '疗愈研究', '集体觉醒', '地球连接', '科学灵性']
}

export default function SubgroupDetailPage() {
  const params = useParams()
  const router = useRouter()
  const subgroup = mockSubgroupDetail
  const subgroupId = params.id
  
  const [isLiked, setIsLiked] = useState(false)
  const [joinModalOpen, setJoinModalOpen] = useState(false)

  const handleBrandClick = (brandId: string) => {
    router.push(`/explore/brand/${brandId}`)
  }

  const handleContentClick = (type: string, id: string) => {
    switch (type) {
      case '课程':
        router.push(`/course/${id}`)
        break
      case '活动':
        router.push(`/event/${id}`)
        break
      case '产品':
        router.push(`/shop/product/${id}`)
        break
    }
  }

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
            <h1 className="text-lg font-bold text-on-surface">服务子团体</h1>
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

        {/* 团体封面 */}
        <div className={`h-48 bg-gradient-to-br ${subgroup.coverColor} relative`}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-4 left-4">
            <div className="flex items-center gap-3">
              <div className={`w-16 h-16 bg-gradient-to-br ${subgroup.logoColor} rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                {subgroup.name.charAt(0)}
              </div>
              <div className="text-white">
                <h1 className="text-xl font-bold">{subgroup.name}</h1>
                <div className="flex items-center gap-2 text-sm opacity-90">
                  <Users size={14} />
                  <span>{subgroup.memberCount} 名成员</span>
                  <span>•</span>
                  <span>成立于 {subgroup.createdYear} 年</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 团体使命 */}
        <div className="px-4 pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Target size={24} className="text-primary" />
            <h2 className="text-xl font-bold text-on-surface">团体使命</h2>
          </div>
          
          <div className="bg-surface rounded-xl p-4 border border-surface-variant">
            <div className="text-on-surface whitespace-pre-line text-sm leading-relaxed">
              {subgroup.mission}
            </div>
          </div>
        </div>

        {/* 团体介绍 */}
        <div className="px-4 mt-6">
          <h3 className="font-bold text-on-surface mb-3">团体介绍</h3>
          <div className="text-on-surface-variant whitespace-pre-line text-sm">
            {subgroup.description}
          </div>
        </div>

        {/* 团体标签 */}
        <div className="px-4 mt-6">
          <h3 className="font-bold text-on-surface mb-3">团体标签</h3>
          <div className="flex flex-wrap gap-2">
            {subgroup.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-surface-variant text-on-surface-variant text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 所属场牌 */}
        <div className="px-4 mt-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Globe size={20} className="text-primary" />
              <h2 className="text-lg font-bold text-on-surface">参与场牌</h2>
            </div>
            <span className="text-sm text-on-surface-variant">{subgroup.fieldBrands.length} 个场牌</span>
          </div>
          
          <div className="space-y-3">
            {subgroup.fieldBrands.map((brand) => (
              <div
                key={brand.id}
                onClick={() => handleBrandClick(brand.id)}
                className="bg-surface rounded-xl p-4 border border-surface-variant hover:border-primary/30 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${brand.logoColor} rounded-xl flex items-center justify-center text-white font-bold`}>
                    {brand.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="mb-1">
                      <h4 className="font-bold text-on-surface">{brand.name}</h4>
                    </div>
                    <p className="text-xs text-on-surface-variant line-clamp-2">{brand.contribution}</p>
                  </div>
                  <ChevronRight size={16} className="text-on-surface-variant" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 团体成就统计 */}
        <div className="mx-4 mt-8 mb-6 bg-surface rounded-2xl p-4 border border-surface-variant">
          <h3 className="font-bold text-on-surface mb-4">团体成就</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{subgroup.memberCount}</div>
              <div className="text-sm text-on-surface-variant mt-1">成员数量</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{subgroup.fieldBrands.length}</div>
              <div className="text-sm text-on-surface-variant mt-1">合作场牌</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{subgroup.courses.length + subgroup.events.length}</div>
              <div className="text-sm text-on-surface-variant mt-1">课程与活动</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{subgroup.products.length}</div>
              <div className="text-sm text-on-surface-variant mt-1">专属产品</div>
            </div>
          </div>
        </div>

        {/* 团体专属课程 */}
        {subgroup.courses.length > 0 && (
          <div className="px-4 mt-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BookOpen size={20} className="text-primary" />
                <h2 className="text-lg font-bold text-on-surface">团体专属课程</h2>
              </div>
              <span className="text-sm text-on-surface-variant">{subgroup.courses.length} 门课程</span>
            </div>
            
            <div className="space-y-3">
              {subgroup.courses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => handleContentClick('课程', course.id)}
                  className="bg-surface rounded-xl p-4 border border-surface-variant hover:border-primary/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${course.color} rounded-lg`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-on-surface">{course.title}</h4>
                        <div className="text-primary font-bold">¥{course.price}</div>
                      </div>
                      <p className="text-xs text-on-surface-variant">{course.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                          {course.type}
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-on-surface-variant" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 团体专属活动 */}
        {subgroup.events.length > 0 && (
          <div className="px-4 mt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar size={20} className="text-primary" />
                <h2 className="text-lg font-bold text-on-surface">团体专属活动</h2>
              </div>
              <span className="text-sm text-on-surface-variant">{subgroup.events.length} 场活动</span>
            </div>
            
            <div className="space-y-3">
              {subgroup.events.map((event) => (
                <div
                  key={event.id}
                  onClick={() => handleContentClick('活动', event.id)}
                  className="bg-surface rounded-xl p-4 border border-surface-variant hover:border-primary/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${event.color} rounded-lg`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-on-surface">{event.title}</h4>
                        <div className="text-primary font-bold">¥{event.price}</div>
                      </div>
                      <p className="text-xs text-on-surface-variant">{event.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                          {event.type}
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-on-surface-variant" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 团体专属产品 */}
        {subgroup.products.length > 0 && (
          <div className="px-4 mt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-primary" />
                <h2 className="text-lg font-bold text-on-surface">团体专属产品</h2>
              </div>
              <span className="text-sm text-on-surface-variant">{subgroup.products.length} 个产品</span>
            </div>
            
            <div className="space-y-3">
              {subgroup.products.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleContentClick('产品', product.id)}
                  className="bg-surface rounded-xl p-4 border border-surface-variant hover:border-primary/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${product.color} rounded-lg`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-on-surface">{product.title}</h4>
                        <div className="text-primary font-bold">¥{product.price}</div>
                      </div>
                      <p className="text-xs text-on-surface-variant">{product.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                          {product.type}
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-on-surface-variant" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}



        {/* 加入团体按钮 */}
        <div className="px-4 mt-6 pb-8">
          <button 
            onClick={() => setJoinModalOpen(true)}
            className="w-full py-3 bg-gradient-to-br from-primary to-primary-variant text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            申请加入团体
          </button>
          <p className="text-xs text-center text-on-surface-variant mt-2">
            加入后可以参与团体研究、活动和享受专属福利
          </p>
        </div>

        {/* 申请加入模态框 */}
        {joinModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="bg-surface rounded-2xl max-w-md w-full mx-4 overflow-hidden border border-surface-variant">
              {/* 模态框头部 */}
              <div className="p-6 border-b border-surface-variant">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-on-surface">申请加入团体</h2>
                  <button
                    onClick={() => setJoinModalOpen(false)}
                    className="p-2 rounded-full hover:bg-surface-variant transition-colors"
                  >
                    <ArrowLeft size={20} className="text-on-surface" />
                  </button>
                </div>
                
                {/* 团体信息 */}
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${subgroup.logoColor} rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                    {subgroup.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-on-surface">{subgroup.name}</h3>
                    <p className="text-sm text-on-surface-variant mt-1">{subgroup.memberCount} 名成员 • {subgroup.fieldBrands.length} 个合作场牌</p>
                  </div>
                </div>
              </div>

              {/* 团长联系方式 */}
              <div className="p-6">
                <h3 className="font-bold text-on-surface mb-3">团长联系方式</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-surface-variant rounded-lg">
                    <div className="flex items-center gap-3">
                      <Phone size={20} className="text-primary" />
                      <div>
                        <div className="font-medium text-on-surface">张团长</div>
                        <div className="text-xs text-on-surface-variant">团体创始人兼总负责人</div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-primary">138****8888</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-surface-variant rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mail size={20} className="text-primary" />
                      <div>
                        <div className="font-medium text-on-surface">电子邮箱</div>
                        <div className="text-xs text-on-surface-variant">官方联系邮箱</div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-primary">leader@example.com</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-surface-variant rounded-lg">
                    <div className="flex items-center gap-3">
                      <MessageCircle size={20} className="text-primary" />
                      <div>
                        <div className="font-medium text-on-surface">微信</div>
                        <div className="text-xs text-on-surface-variant">官方微信账号</div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-primary">PlanetHealingGroup</div>
                  </div>
                </div>
                
                {/* 申请须知 */}
                <div className="mt-4 p-3 bg-surface-variant/50 rounded-lg">
                  <h4 className="font-medium text-on-surface mb-2">申请须知：</h4>
                  <ul className="list-disc pl-4 text-sm text-on-surface-variant space-y-1">
                    <li>请简要介绍您的背景和对团体使命的理解</li>
                    <li>申请后3个工作日内会收到回复</li>
                    <li>新成员需参加一次线上介绍会</li>
                    <li>同意遵守团体章程和行为准则</li>
                  </ul>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="p-6 pt-0">
                <div className="flex gap-3">
                  <button
                    onClick={() => setJoinModalOpen(false)}
                    className="flex-1 py-3 bg-surface-variant text-on-surface rounded-lg font-medium hover:bg-surface-variant/80 transition-colors"
                  >
                    稍后申请
                  </button>
                  <button
                    onClick={() => {
                      // 模拟提交申请
                      alert(`已提交加入 ${subgroup.name} 的申请\n团长将尽快与您联系`)
                      setJoinModalOpen(false)
                    }}
                    className="flex-1 py-3 bg-gradient-to-br from-primary to-primary-variant text-white rounded-lg font-bold hover:opacity-90 transition-opacity"
                  >
                    提交申请
                  </button>
                </div>
                <button
                  onClick={() => {
                    // 复制联系方式
                    const contactInfo = `团长：张团长\n电话：138****8888\n邮箱：leader@example.com\n微信：PlanetHealingGroup`
                    navigator.clipboard.writeText(contactInfo)
                    alert('团长联系方式已复制到剪贴板')
                  }}
                  className="w-full py-3 text-center text-on-surface-variant hover:text-on-surface transition-colors mt-3"
                >
                  复制联系方式
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}