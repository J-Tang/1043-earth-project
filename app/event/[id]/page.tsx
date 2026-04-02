'use client'

import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Calendar, Clock, MapPin, Users, Star, ChevronRight, Check, User, Share2, Heart, Award, Shield, Package, PartyPopper, Users2, Globe } from 'lucide-react'
import { useState } from 'react'

// 模拟活动详细数据
const mockEventDetail = {
  id: '1',
  title: '满月集体冥想仪式',
  subtitle: '在满月能量下集体冥想，净化能量场，连接宇宙能量',
  coverColor: 'from-indigo-500 to-purple-500',
  brandName: '月亮女神能量圈',
  brandLogoColor: 'from-indigo-400 to-purple-400',
  organizer: {
    name: '王明月',
    title: '月亮能量导师',
    bio: '15年月亮能量研究经验，满月仪式引领者，帮助数千人连接月亮能量',
    avatarColor: 'from-blue-300 to-purple-300'
  },
  price: 280,
  originalPrice: 380,
  duration: 3,
  durationUnit: '小时',
  location: '北京市朝阳区月光公园',
  locationDetail: '月光公园中心草坪',
  latitude: 39.9042,
  longitude: 116.4074,
  startTime: '2026-04-25T20:00:00',
  endTime: '2026-04-25T23:00:00',
  eventType: '户外集体仪式',
  eventFormat: '线下活动',
  schedule: [
    '20:00-20:30 满月能量讲解与准备工作',
    '20:30-21:30 集体冥想与能量净化',
    '21:30-22:00 能量分享与交流',
    '22:00-23:00 自由冥想与连接'
  ],
  maxParticipants: 100,
  currentParticipants: 78,
  rating: 4.9,
  reviewCount: 89,
  description: `满月是能量最强的时刻，本次集体冥想仪式旨在利用满月能量，帮助参与者净化个人能量场，连接宇宙能量，提升灵性感知能力。

活动特色：
• 在自然环境中进行，月光能量加持
• 专业月亮能量导师引导
• 集体能量场共振效果
• 安全舒适的冥想环境

适合人群：
• 希望净化能量场的探索者
• 对月亮能量感兴趣的朋友
• 寻求集体冥想体验的参与者
• 想要提升冥想深度的练习者

你将体验：
1. 满月能量的直接感受
2. 集体能量场的共振效果
3. 能量净化的实际体验
4. 月亮能量的连接技巧`,
  benefits: [
    '获得满月能量净化证书',
    '加入月亮能量爱好者社群',
    '获得后续满月活动优先报名权',
    '活动照片与能量记录'
  ],
  preparation: [
    '穿着舒适宽松的衣物',
    '准备防寒衣物（户外活动）',
    '可自带冥想坐垫或使用场地提供',
    '保持开放与敬畏的心态'
  ],
  tags: ['集体冥想', '满月仪式', '能量净化', '户外活动', '月光能量'],
  needRegistrationForm: true,
  needPayment: true,
  formFields: [
    { id: 'name', label: '姓名', type: 'text', required: true },
    { id: 'phone', label: '手机号', type: 'phone', required: true },
    { id: 'email', label: '邮箱', type: 'email', required: false },
    { id: 'participation', label: '参与意图', type: 'textarea', required: false }
  ]
}

export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const event = mockEventDetail
  const eventId = params.id
  
  const [isLiked, setIsLiked] = useState(false)
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    participation: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registrationStep, setRegistrationStep] = useState<'form' | 'payment' | 'complete'>('form')

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmitForm = () => {
    if (!formData.name || !formData.phone) {
      alert('请填写必填字段')
      return
    }
    
    setIsSubmitting(true)
    
    // 模拟表单提交
    setTimeout(() => {
      if (event.needPayment) {
        setRegistrationStep('payment')
      } else {
        setRegistrationStep('complete')
        // 生成订单
        console.log('Event registration created:', {
          eventId: event.id,
          formData,
          price: event.price
        })
      }
      setIsSubmitting(false)
    }, 1500)
  }

  const handlePayment = () => {
    setIsSubmitting(true)
    
    // 模拟支付
    setTimeout(() => {
      setRegistrationStep('complete')
      setIsSubmitting(false)
      console.log('Payment completed for event registration')
    }, 2000)
  }

  const calculateDiscount = () => {
    return event.originalPrice - event.price
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const isOnlineEvent = event.eventFormat === '线上活动'

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
            <h1 className="text-lg font-bold text-on-surface">活动详情</h1>
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

        {/* 活动封面 */}
        <div className={`h-64 bg-gradient-to-br ${event.coverColor} relative`}>
          {/* 活动类型标签 */}
          <div className="absolute top-4 left-4">
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-on-surface">
                {event.eventType}
              </div>
              {isOnlineEvent && (
                <div className="px-2 py-1 bg-blue-500/90 text-white text-xs rounded-full">
                  线上
                </div>
              )}
            </div>
          </div>
          
          {/* 价格标签 */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
            <div className="text-center">
              {event.price === 0 ? (
                <div className="text-2xl font-bold text-green-600">免费</div>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl font-bold text-primary">¥{event.price}</span>
                    {event.originalPrice > event.price && (
                      <span className="text-sm text-on-surface-variant line-through">
                        ¥{event.originalPrice}
                      </span>
                    )}
                  </div>
                  {calculateDiscount() > 0 && (
                    <div className="text-xs text-green-500 font-medium mt-1">
                      立减 ¥{calculateDiscount()}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          
          {/* 活动图标 */}
          <div className="absolute bottom-4 left-4">
            <PartyPopper size={32} className="text-white/80" />
          </div>
        </div>

        {/* 活动基本信息 */}
        <div className="px-4 pt-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h1 className="text-2xl font-bold text-on-surface mb-2">{event.title}</h1>
              <p className="text-on-surface-variant">{event.subtitle}</p>
            </div>
            <div className="flex items-center gap-1">
              <Star size={16} className="fill-yellow-500 text-yellow-500" />
              <span className="font-bold text-on-surface">{event.rating}</span>
              <span className="text-sm text-on-surface-variant">({event.reviewCount})</span>
            </div>
          </div>

          {/* 主办方信息 */}
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 bg-gradient-to-br ${event.brandLogoColor} rounded-xl flex items-center justify-center text-white font-bold`}>
              {event.brandName.charAt(0)}
            </div>
            <div>
              <div className="font-medium text-on-surface">{event.brandName}</div>
              <div className="text-sm text-on-surface-variant">主办方</div>
            </div>
          </div>

          {/* 标签 */}
          <div className="flex flex-wrap gap-2 mb-6">
            {event.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-surface-variant text-on-surface-variant text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 主办方信息 */}
        <div className="mx-4 mt-6 bg-surface rounded-2xl p-4 border border-surface-variant">
          <h3 className="font-bold text-on-surface mb-3 flex items-center gap-2">
            <User size={20} className="text-primary" />
            活动主办方
          </h3>
          <div className="flex items-center gap-3">
            <div className={`w-16 h-16 bg-gradient-to-br ${event.organizer.avatarColor} rounded-full flex items-center justify-center text-white font-bold text-xl`}>
              {event.organizer.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-on-surface">{event.organizer.name}</h4>
              <p className="text-primary mb-1">{event.organizer.title}</p>
              <p className="text-sm text-on-surface-variant">{event.organizer.bio}</p>
            </div>
          </div>
        </div>

        {/* 活动详情卡片 */}
        <div className="mx-4 mt-6 bg-surface rounded-2xl p-4 border border-surface-variant">
          <h3 className="font-bold text-on-surface mb-3 flex items-center gap-2">
            <Calendar size={20} className="text-primary" />
            活动详情
          </h3>
          
          <div className="space-y-4">
            {/* 时间 */}
            <div className="flex items-start">
              <Calendar size={18} className="text-on-surface-variant mr-3 mt-1" />
              <div>
                <div className="text-sm text-on-surface-variant">活动时间</div>
                <div className="text-on-surface font-medium">
                  {formatDate(event.startTime)} {formatTime(event.startTime)}
                </div>
                <div className="text-xs text-on-surface-variant mt-1">
                  至 {formatTime(event.endTime)}
                </div>
              </div>
            </div>

            {/* 时长 */}
            <div className="flex items-center">
              <Clock size={18} className="text-on-surface-variant mr-3" />
              <div>
                <div className="text-sm text-on-surface-variant">活动时长</div>
                <div className="text-on-surface font-medium">{event.duration} {event.durationUnit}</div>
              </div>
            </div>

            {/* 地点/形式 */}
            <div className="flex items-start">
              {isOnlineEvent ? (
                <>
                  <Globe size={18} className="text-on-surface-variant mr-3 mt-1" />
                  <div>
                    <div className="text-sm text-on-surface-variant">活动形式</div>
                    <div className="text-on-surface font-medium">线上直播</div>
                    <div className="text-sm text-on-surface-variant mt-1">{event.locationDetail}</div>
                  </div>
                </>
              ) : (
                <>
                  <MapPin size={18} className="text-on-surface-variant mr-3 mt-1" />
                  <div>
                    <div className="text-sm text-on-surface-variant">活动地点</div>
                    <div className="text-on-surface font-medium">{event.location}</div>
                    <div className="text-sm text-on-surface-variant mt-1">{event.locationDetail}</div>
                  </div>
                </>
              )}
            </div>

            {/* 名额 */}
            <div className="flex items-center">
              <Users size={18} className="text-on-surface-variant mr-3" />
              <div className="flex-1">
                <div className="text-sm text-on-surface-variant">活动名额</div>
                <div className="flex items-center gap-3">
                  <div className="text-on-surface font-medium">
                    {event.currentParticipants}/{event.maxParticipants}人
                  </div>
                  <div className="flex-1 bg-surface-variant h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-primary h-full rounded-full"
                      style={{ width: `${(event.currentParticipants / event.maxParticipants) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 活动安排 */}
        <div className="mx-4 mt-6">
          <h3 className="font-bold text-on-surface mb-3 flex items-center gap-2">
            <Clock size={20} className="text-primary" />
            活动安排
          </h3>
          <div className="space-y-2">
            {event.schedule.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-surface rounded-xl border border-surface-variant/50">
                <div className="w-6 h-6 bg-primary/10 text-primary text-xs rounded-full flex items-center justify-center font-bold mt-1">
                  {index + 1}
                </div>
                <div className="text-on-surface">{item}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 活动描述 */}
        <div className="mx-4 mt-6">
          <h3 className="font-bold text-on-surface mb-3">活动介绍</h3>
          <div className="text-on-surface-variant whitespace-pre-line">
            {event.description}
          </div>
        </div>

        {/* 你将获得 */}
        <div className="mx-4 mt-6">
          <h3 className="font-bold text-on-surface mb-3">你将获得</h3>
          <div className="space-y-2">
            {event.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check size={16} className="text-green-500" />
                <span className="text-on-surface">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 活动准备 */}
        <div className="mx-4 mt-6">
          <h3 className="font-bold text-on-surface mb-3">活动准备</h3>
          <div className="space-y-2">
            {event.preparation.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                <span className="text-on-surface-variant">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 服务保障 */}
        <div className="mx-4 mt-6 bg-surface rounded-2xl p-4 border border-surface-variant">
          <h3 className="font-bold text-on-surface mb-3">服务保障</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Shield size={20} className="text-primary" />
              <div>
                <div className="text-sm font-medium text-on-surface">平台保障</div>
                <div className="text-xs text-on-surface-variant">官方认证活动</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Package size={20} className="text-primary" />
              <div>
                <div className="text-sm font-medium text-on-surface">无忧退款</div>
                <div className="text-xs text-on-surface-variant">活动前3天可退</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Award size={20} className="text-primary" />
              <div>
                <div className="text-sm font-medium text-on-surface">参与证书</div>
                <div className="text-xs text-on-surface-variant">完成颁发证书</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users2 size={20} className="text-primary" />
              <div>
                <div className="text-sm font-medium text-on-surface">社群连接</div>
                <div className="text-xs text-on-surface-variant">加入活动社群</div>
              </div>
            </div>
          </div>
        </div>

        {/* 报名/支付模态框 */}
        {showRegistrationForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
            <div className="bg-surface rounded-t-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="sticky top-0 bg-surface border-b border-surface-variant p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-on-surface">
                    {registrationStep === 'form' ? '填写报名信息' : 
                     registrationStep === 'payment' ? '确认支付' : '报名成功'}
                  </h3>
                  <button
                    onClick={() => setShowRegistrationForm(false)}
                    className="p-2 hover:bg-surface-variant rounded-full"
                  >
                    <ArrowLeft size={20} className="text-on-surface" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                {registrationStep === 'form' && (
                  <>
                    <div className="mb-6">
                      <h4 className="font-bold text-on-surface mb-3">报名信息</h4>
                      <div className="space-y-4">
                        {event.formFields.map((field) => (
                          <div key={field.id}>
                            <label className="block text-sm font-medium text-on-surface mb-1">
                              {field.label}
                              {field.required && <span className="text-red-500 ml-1">*</span>}
                            </label>
                            {field.type === 'textarea' ? (
                              <textarea
                                value={formData[field.id as keyof typeof formData] || ''}
                                onChange={(e) => handleFormChange(field.id, e.target.value)}
                                className="w-full px-4 py-3 bg-surface border border-surface-variant rounded-xl text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary resize-none"
                                rows={3}
                                placeholder={`请输入${field.label}`}
                              />
                            ) : (
                              <input
                                type={field.type}
                                value={formData[field.id as keyof typeof formData] || ''}
                                onChange={(e) => handleFormChange(field.id, e.target.value)}
                                className="w-full px-4 py-3 bg-surface border border-surface-variant rounded-xl text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary"
                                placeholder={`请输入${field.label}`}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-surface-variant/30 rounded-xl p-4 mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-on-surface-variant">活动费用</span>
                        <span className="font-medium text-on-surface">¥{event.price}</span>
                      </div>
                      <div className="border-t border-surface-variant pt-2">
                        <div className="flex justify-between">
                          <span className="font-bold text-on-surface">实付款</span>
                          <span className="text-xl font-bold text-primary">¥{event.price}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleSubmitForm}
                      disabled={isSubmitting || !formData.name || !formData.phone}
                      className={`w-full py-3 rounded-xl font-bold transition-opacity ${
                        isSubmitting || !formData.name || !formData.phone
                          ? 'bg-surface-variant text-on-surface-variant cursor-not-allowed'
                          : 'bg-gradient-to-br from-primary to-primary-variant text-white hover:opacity-90'
                      }`}
                    >
                      {isSubmitting ? '提交中...' : event.needPayment ? '确认并支付' : '确认报名'}
                    </button>
                  </>
                )}

                {registrationStep === 'payment' && (
                  <>
                    <div className="mb-6">
                      <h4 className="font-bold text-on-surface mb-4">选择支付方式</h4>
                      <div className="space-y-3">
                        {[
                          { id: 'wechat', name: '微信支付', icon: '💳', description: '推荐使用' },
                          { id: 'alipay', name: '支付宝', icon: '📱', description: '快捷支付' },
                          { id: 'balance', name: '余额支付', icon: '💰', description: '余额: ¥0.00' }
                        ].map((method) => (
                          <div
                            key={method.id}
                            className="flex items-center justify-between p-3 border border-surface-variant rounded-xl hover:border-primary/30 cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">{method.icon}</div>
                              <div>
                                <div className="font-medium text-on-surface">{method.name}</div>
                                <div className="text-sm text-on-surface-variant">{method.description}</div>
                              </div>
                            </div>
                            <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                              <Check size={12} className="text-primary" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handlePayment}
                      disabled={isSubmitting}
                      className={`w-full py-3 rounded-xl font-bold transition-opacity ${
                        isSubmitting
                          ? 'bg-surface-variant text-on-surface-variant cursor-not-allowed'
                          : 'bg-gradient-to-br from-primary to-primary-variant text-white hover:opacity-90'
                      }`}
                    >
                      {isSubmitting ? '支付中...' : `支付 ¥${event.price}`}
                    </button>
                  </>
                )}

                {registrationStep === 'complete' && (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-on-surface mb-2">报名成功！</h3>
                    <p className="text-on-surface-variant mb-6">
                      您已成功报名《{event.title}》
                    </p>
                    <div className="space-y-3">
                      <div className="p-3 bg-surface-variant/30 rounded-xl">
                        <div className="text-sm text-on-surface-variant mb-1">活动凭证</div>
                        <div className="font-mono font-bold text-primary text-lg">EV-{Date.now().toString().slice(-8)}</div>
                        <div className="text-xs text-on-surface-variant mt-1">
                          请妥善保存，活动时出示验证
                        </div>
                      </div>
                      <button
                        onClick={() => setShowRegistrationForm(false)}
                        className="w-full py-3 bg-gradient-to-br from-primary to-primary-variant text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
                      >
                        返回活动详情
                      </button>
                      <button
                        onClick={() => router.push('/profile?tab=orders')}
                        className="w-full py-3 bg-surface-variant text-on-surface rounded-xl font-medium hover:bg-surface-variant/80 transition-colors"
                      >
                        查看我的订单
                      </button>
                    </div>
                  </div>
                )}
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
            onClick={() => setShowRegistrationForm(true)}
            className="flex-1 py-3 bg-gradient-to-br from-primary to-primary-variant text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            立即报名
          </button>
        </div>
        {event.currentParticipants >= event.maxParticipants * 0.8 && (
          <div className="text-center text-xs text-orange-500 mt-2">
            仅剩 {event.maxParticipants - event.currentParticipants} 个名额，即将报满
          </div>
        )}
      </div>
    </div>
  )
}