'use client'

import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Star, MapPin, Users, Phone, Heart, Share2, Check, Calendar, Clock, Award, Shield, ChevronRight, MessageCircle, Mail, Globe, User } from 'lucide-react'
import { useState } from 'react'

// 模拟咨询师详细数据
const mockConsultantDetail = {
  id: '1',
  name: '张能量',
  photoColor: 'from-purple-500 to-pink-500',
  brandName: '行星能量中心',
  brandLogoColor: 'from-purple-400 to-pink-400',
  energyAttribute: '直觉疗愈',
  shortIntro: '专注能量疗愈20年，帮助数千人恢复能量平衡',
  description: `张能量老师是一位资深的能量疗愈师，拥有超过20年的专业经验。她专注于直觉疗愈领域，帮助客户识别和清理能量阻塞，恢复身心平衡。

专业背景：
• 能量疗愈认证导师（国际能量疗愈协会）
• 20年专业疗愈经验，服务超过3000名客户
• 多维度能量感知能力，精准识别能量问题
• 个性化疗愈方案设计

咨询特色：
• 直觉引导的能量诊断
• 个性化的疗愈方案
• 安全舒适的咨询环境
• 长期的能量维护指导

服务流程：
1. 初步能量诊断（15分钟）
2. 核心疗愈环节（30分钟）
3. 能量平衡调整（10分钟）
4. 后续维护建议（5分钟）`,
  price: 580,
  duration: '60分钟',
  contactInfo: '微信：EnergyZhang_1043（请备注1043地球）',
  contactMethod: '微信预约',
  availableTimes: [
    '周一 09:00-12:00, 14:00-18:00',
    '周三 09:00-12:00, 14:00-18:00',
    '周五 09:00-12:00, 14:00-18:00'
  ],
  rating: 4.9,
  reviewCount: 128,
  successCases: 2850,
  location: '北京市朝阳区能量大道1043号',
  locationDetail: '行星能量中心2楼咨询室',
  latitude: 39.9042,
  longitude: 116.4074,
  specialties: [
    '能量阻塞清理',
    '脉轮平衡调整',
    '情绪能量释放',
    '直觉能力开发'
  ],
  tags: ['能量疗愈', '脉轮平衡', '直觉引导', '资深导师', '个性化方案'],
  isVerified: true,
  isFeatured: true
}

// 模拟咨询流程
const consultationProcess = [
  {
    step: 1,
    title: '预约咨询',
    description: '通过微信或电话联系咨询师，预约合适的时间',
    icon: '📅'
  },
  {
    step: 2,
    title: '能量诊断',
    description: '咨询师进行初步能量感知，识别能量问题',
    icon: '🔍'
  },
  {
    step: 3,
    title: '疗愈过程',
    description: '针对性的能量疗愈，清理阻塞，恢复平衡',
    icon: '✨'
  },
  {
    step: 4,
    title: '后续指导',
    description: '提供能量维护建议和日常练习指导',
    icon: '📝'
  }
]

export default function ConsultationDetailPage() {
  const params = useParams()
  const router = useRouter()
  const consultant = mockConsultantDetail
  const consultantId = params.id
  
  const [isLiked, setIsLiked] = useState(false)
  const [showContactInfo, setShowContactInfo] = useState(false)

  const formatPrice = (price: number) => {
    return `¥${price}/次`
  }

  const handleBookConsultation = () => {
    // 显示联系方式
    setShowContactInfo(true)
  }

  const handleCopyContact = () => {
    // 模拟复制联系方式
    navigator.clipboard.writeText(consultant.contactInfo)
      .then(() => {
        alert('联系方式已复制到剪贴板')
      })
      .catch(() => {
        // 备用方案
        const textArea = document.createElement('textarea')
        textArea.value = consultant.contactInfo
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        alert('联系方式已复制到剪贴板')
      })
  }

  return (
    <div className="min-h-screen">
      <main className="content-area pb-24">
        {/* 顶部导航栏 */}
        <header className="sticky top-0 z-10 bg-surface/95 backdrop-blur-sm border-b border-surface-variant">
          <div className="flex items-center justify-between p-4">
            <button 
              onClick={() => router.back()}
              className="p-2 rounded-full hover:bg-surface-variant transition-colors"
            >
              <ArrowLeft size={24} className="text-on-surface" />
            </button>
            <h1 className="text-lg font-bold text-on-surface">咨询师详情</h1>
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

        {/* 咨询师头部信息 */}
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6">
          <div className="flex items-center gap-4">
            {/* 咨询师照片 */}
            <div className="relative">
              <div className={`w-24 h-24 bg-gradient-to-br ${consultant.photoColor} rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                {consultant.name.charAt(0)}
              </div>
              {consultant.isVerified && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
                  <Check size={14} className="text-white" />
                </div>
              )}
              {consultant.isFeatured && (
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-md">
                  <Star size={14} className="text-white" fill="white" />
                </div>
              )}
            </div>

            {/* 基本信息 */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-on-surface">{consultant.name}</h1>
                <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-full">
                  {consultant.energyAttribute}
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-on-surface-variant mb-2">
                <MapPin size={14} />
                <span>{consultant.brandName}</span>
                <span>•</span>
                <span>{consultant.location}</span>
              </div>

              <p className="text-on-surface-variant mb-3">{consultant.shortIntro}</p>

              {/* 评分和成就 */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star size={16} className="fill-yellow-500 text-yellow-500" />
                  <span className="font-bold text-on-surface">{consultant.rating}</span>
                  <span className="text-sm text-on-surface-variant">({consultant.reviewCount}评价)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={16} className="text-primary" />
                  <span className="font-medium text-on-surface">{consultant.successCases}</span>
                  <span className="text-sm text-on-surface-variant">成功案例</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 价格和预约 */}
        <div className="mx-4 mt-6 bg-surface rounded-2xl p-4 border border-surface-variant">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-2xl font-bold text-primary">{formatPrice(consultant.price)}</div>
              <div className="text-sm text-on-surface-variant">{consultant.duration}</div>
            </div>
            <div className="flex items-center gap-2 text-sm text-on-surface-variant">
              <Clock size={14} />
              <span>咨询时长：{consultant.duration}</span>
            </div>
          </div>

          <button
            onClick={handleBookConsultation}
            className="w-full py-3 bg-gradient-to-br from-primary to-primary-variant text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            预约咨询
          </button>

          <div className="text-center text-xs text-on-surface-variant mt-2">
            通过 {consultant.contactMethod} 联系，获取更多时间选择
          </div>
        </div>

        {/* 标签 */}
        <div className="mx-4 mt-6">
          <h3 className="font-bold text-on-surface mb-3">专业领域</h3>
          <div className="flex flex-wrap gap-2">
            {consultant.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-surface-variant text-on-surface-variant text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 场牌信息 */}
        <div className="mx-4 mt-6 bg-surface rounded-2xl p-4 border border-surface-variant">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-12 h-12 bg-gradient-to-br ${consultant.brandLogoColor} rounded-xl flex items-center justify-center text-white font-bold`}>
              {consultant.brandName.charAt(0)}
            </div>
            <div>
              <div className="font-bold text-on-surface">{consultant.brandName}</div>
              <div className="text-sm text-on-surface-variant">所属场牌</div>
            </div>
          </div>
          
          <div className="text-sm text-on-surface-variant">
            专业的能量疗愈中心，提供全方位的能量服务，包括课程、活动和一对一咨询。
          </div>
        </div>

        {/* 咨询流程 */}
        <div className="mx-4 mt-6">
          <h3 className="font-bold text-on-surface mb-4">咨询流程</h3>
          <div className="space-y-4">
            {consultationProcess.map((process) => (
              <div key={process.step} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-sm">
                  {process.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{process.icon}</span>
                    <h4 className="font-medium text-on-surface">{process.title}</h4>
                  </div>
                  <p className="text-sm text-on-surface-variant">{process.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 专业特长 */}
        <div className="mx-4 mt-6">
          <h3 className="font-bold text-on-surface mb-3">专业特长</h3>
          <div className="space-y-2">
            {consultant.specialties.map((specialty, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check size={16} className="text-green-500" />
                <span className="text-on-surface">{specialty}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 咨询师详细介绍 */}
        <div className="mx-4 mt-6">
          <h3 className="font-bold text-on-surface mb-3">咨询师介绍</h3>
          <div className="text-on-surface-variant whitespace-pre-line">
            {consultant.description}
          </div>
        </div>

        {/* 可预约时间 */}
        <div className="mx-4 mt-6 bg-surface rounded-2xl p-4 border border-surface-variant">
          <h3 className="font-bold text-on-surface mb-3 flex items-center gap-2">
            <Calendar size={20} className="text-primary" />
            可预约时间
          </h3>
          <div className="space-y-2">
            {consultant.availableTimes.map((time, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                <span className="text-on-surface">{time}</span>
              </div>
            ))}
          </div>
          <div className="text-xs text-on-surface-variant mt-3">
            具体时间可能会有调整，请提前与咨询师确认
          </div>
        </div>

        {/* 服务保障 */}
        <div className="mx-4 mt-6 bg-surface rounded-2xl p-4 border border-surface-variant">
          <h3 className="font-bold text-on-surface mb-3">服务保障</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Shield size={20} className="text-primary" />
              <div>
                <div className="text-sm font-medium text-on-surface">隐私保护</div>
                <div className="text-xs text-on-surface-variant">咨询内容严格保密</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Award size={20} className="text-primary" />
              <div>
                <div className="text-sm font-medium text-on-surface">专业认证</div>
                <div className="text-xs text-on-surface-variant">官方认证咨询师</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Check size={20} className="text-primary" />
              <div>
                <div className="text-sm font-medium text-on-surface">个性化方案</div>
                <div className="text-xs text-on-surface-variant">量身定制疗愈计划</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle size={20} className="text-primary" />
              <div>
                <div className="text-sm font-medium text-on-surface">持续支持</div>
                <div className="text-xs text-on-surface-variant">咨询后答疑指导</div>
              </div>
            </div>
          </div>
        </div>

        {/* 联系方式模态框 */}
        {showContactInfo && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
            <div className="bg-surface rounded-t-2xl w-full max-h-[60vh] overflow-y-auto">
              <div className="sticky top-0 bg-surface border-b border-surface-variant p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-on-surface">联系方式</h3>
                  <button
                    onClick={() => setShowContactInfo(false)}
                    className="p-2 hover:bg-surface-variant rounded-full"
                  >
                    <ArrowLeft size={20} className="text-on-surface" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User size={32} className="text-primary" />
                  </div>
                  <h4 className="text-xl font-bold text-on-surface mb-2">{consultant.name}</h4>
                  <p className="text-on-surface-variant">咨询师</p>
                </div>

                <div className="bg-surface-variant/30 rounded-xl p-4 mb-6">
                  <div className="text-center">
                    <div className="text-sm text-on-surface-variant mb-2">联系方式</div>
                    <div className="text-lg font-mono font-bold text-primary mb-3">
                      {consultant.contactInfo}
                    </div>
                    <div className="text-sm text-on-surface-variant">
                      请备注：1043地球咨询
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleCopyContact}
                    className="w-full py-3 bg-gradient-to-br from-primary to-primary-variant text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
                  >
                    复制联系方式
                  </button>
                  <button
                    onClick={() => setShowContactInfo(false)}
                    className="w-full py-3 bg-surface-variant text-on-surface rounded-xl font-medium hover:bg-surface-variant/80 transition-colors"
                  >
                    返回
                  </button>
                </div>

                <div className="text-xs text-center text-on-surface-variant mt-4">
                  温馨提示：请尊重咨询师时间，预约后请准时参加咨询
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-surface-variant p-4 shadow-lg">
        <div className="flex gap-3">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-3 rounded-xl flex items-center justify-center ${
              isLiked 
                ? 'bg-red-50 text-red-500' 
                : 'bg-surface-variant text-on-surface-variant hover:bg-surface-variant/80'
            } transition-colors`}
          >
            <Heart size={20} className={isLiked ? 'fill-red-500' : ''} />
          </button>
          <button
            onClick={handleBookConsultation}
            className="flex-1 py-3 bg-gradient-to-br from-primary to-primary-variant text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            预约咨询
          </button>
        </div>
      </div>
    </div>
  )
}