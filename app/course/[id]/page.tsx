'use client'

import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Calendar, Clock, MapPin, Users, Star, ChevronRight, Check, User, Mail, Phone, BookOpen, Share2, Heart, Award, Shield, Package } from 'lucide-react'
import { useState } from 'react'

// 模拟课程详细数据
const mockCourseDetail = {
  id: '1',
  title: '觉醒之路·意识提升初阶课程',
  subtitle: '开启内在觉醒之旅，连接高我能量，提升个人频率与意识层级',
  coverColor: 'from-purple-500 to-pink-500',
  brandName: '行星能量中心',
  brandLogoColor: 'from-purple-400 to-pink-500',
  teacher: {
    name: '张觉醒',
    title: '首席能量导师',
    bio: '20年能量疗愈经验，行星能量网络认证导师，帮助超过1000人完成意识觉醒',
    avatarColor: 'from-purple-300 to-pink-300'
  },
  price: 1280,
  originalPrice: 1680,
  duration: 12,
  durationUnit: '小时',
  location: '北京市朝阳区能量大道1043号',
  locationDetail: '行星能量中心3楼大教室',
  latitude: 39.9042,
  longitude: 116.4074,
  startTime: '2026-04-15T10:00:00',
  endTime: '2026-04-16T18:00:00',
  schedule: [
    '第一天 10:00-12:00 意识觉醒基础理论',
    '第一天 14:00-17:00 能量感知与连接练习',
    '第二天 10:00-12:00 高我连接实操',
    '第二天 14:00-17:00 集体能量场构建'
  ],
  maxParticipants: 30,
  currentParticipants: 18,
  rating: 4.9,
  reviewCount: 56,
  description: `本课程旨在帮助参与者开启内在觉醒之旅，通过系统化的理论学习和实践练习，连接高我能量，提升个人频率与意识层级。

课程特色：
• 系统化的意识提升路径
• 理论与实践相结合
• 小班制教学，个性化指导
• 课后社群持续支持

适合人群：
• 对灵性成长感兴趣的初学者
• 希望提升个人能量频率的探索者
• 寻求内在平衡与和谐的生活者

你将学到：
1. 意识觉醒的基本原理
2. 能量感知与连接技巧
3. 高我沟通与指导接收
4. 日常能量维护与提升`,
  benefits: [
    '获得意识觉醒基础证书',
    '加入学员专属能量社群',
    '获得课后3个月导师答疑',
    '优先参加进阶课程资格'
  ],
  requirements: [
    '开放的心态和探索精神',
    '准备一本笔记本记录心得',
    '穿着舒适宽松的衣物',
    '课前24小时避免饮酒'
  ],
  tags: ['意识提升', '冥想', '能量疗愈', '灵性成长', '工作坊'],
  needRegistrationForm: true,
  needPayment: true,
  formFields: [
    { id: 'name', label: '姓名', type: 'text', required: true },
    { id: 'phone', label: '手机号', type: 'phone', required: true },
    { id: 'email', label: '邮箱', type: 'email', required: false },
    { id: 'intention', label: '学习意图', type: 'textarea', required: false }
  ]
}

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const course = mockCourseDetail
  const courseId = params.id
  
  const [isLiked, setIsLiked] = useState(false)
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    intention: ''
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
      if (course.needPayment) {
        setRegistrationStep('payment')
      } else {
        setRegistrationStep('complete')
        // 生成订单
        console.log('Order created:', {
          courseId: course.id,
          formData,
          price: course.price
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
      console.log('Payment completed for order')
    }, 2000)
  }

  const calculateDiscount = () => {
    return course.originalPrice - course.price
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
            <h1 className="text-lg font-bold text-on-surface">课程详情</h1>
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

        {/* 课程封面 */}
        <div className={`h-64 bg-gradient-to-br ${course.coverColor} relative`}>
          {/* 价格标签 */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
            <div className="text-center">
              {course.price === 0 ? (
                <div className="text-2xl font-bold text-green-600">免费</div>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl font-bold text-primary">¥{course.price}</span>
                    {course.originalPrice > course.price && (
                      <span className="text-sm text-on-surface-variant line-through">
                        ¥{course.originalPrice}
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
        </div>

        {/* 课程基本信息 */}
        <div className="px-4 pt-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h1 className="text-2xl font-bold text-on-surface mb-2">{course.title}</h1>
              <p className="text-on-surface-variant">{course.subtitle}</p>
            </div>
            <div className="flex items-center gap-1">
              <Star size={16} className="fill-yellow-500 text-yellow-500" />
              <span className="font-bold text-on-surface">{course.rating}</span>
              <span className="text-sm text-on-surface-variant">({course.reviewCount})</span>
            </div>
          </div>

          {/* 场牌信息 */}
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 bg-gradient-to-br ${course.brandLogoColor} rounded-xl flex items-center justify-center text-white font-bold`}>
              {course.brandName.charAt(0)}
            </div>
            <div>
              <div className="font-medium text-on-surface">{course.brandName}</div>
              <div className="text-sm text-on-surface-variant">主办方</div>
            </div>
          </div>

          {/* 标签 */}
          <div className="flex flex-wrap gap-2 mb-6">
            {course.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-surface-variant text-on-surface-variant text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 讲师信息 */}
        <div className="mx-4 mt-6 bg-surface rounded-2xl p-4 border border-surface-variant">
          <h3 className="font-bold text-on-surface mb-3 flex items-center gap-2">
            <User size={20} className="text-primary" />
            课程讲师
          </h3>
          <div className="flex items-center gap-3">
            <div className={`w-16 h-16 bg-gradient-to-br ${course.teacher.avatarColor} rounded-full flex items-center justify-center text-white font-bold text-xl`}>
              {course.teacher.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-on-surface">{course.teacher.name}</h4>
              <p className="text-primary mb-1">{course.teacher.title}</p>
              <p className="text-sm text-on-surface-variant">{course.teacher.bio}</p>
            </div>
          </div>
        </div>

        {/* 课程详情卡片 */}
        <div className="mx-4 mt-6 bg-surface rounded-2xl p-4 border border-surface-variant">
          <h3 className="font-bold text-on-surface mb-3 flex items-center gap-2">
            <BookOpen size={20} className="text-primary" />
            课程详情
          </h3>
          
          <div className="space-y-4">
            {/* 时间 */}
            <div className="flex items-start">
              <Calendar size={18} className="text-on-surface-variant mr-3 mt-1" />
              <div>
                <div className="text-sm text-on-surface-variant">开课时间</div>
                <div className="text-on-surface font-medium">
                  {formatDate(course.startTime)} {formatTime(course.startTime)}
                </div>
                <div className="text-xs text-on-surface-variant mt-1">
                  至 {formatDate(course.endTime)} {formatTime(course.endTime)}
                </div>
              </div>
            </div>

            {/* 时长 */}
            <div className="flex items-center">
              <Clock size={18} className="text-on-surface-variant mr-3" />
              <div>
                <div className="text-sm text-on-surface-variant">课程时长</div>
                <div className="text-on-surface font-medium">{course.duration} {course.durationUnit}</div>
              </div>
            </div>

            {/* 地点 */}
            <div className="flex items-start">
              <MapPin size={18} className="text-on-surface-variant mr-3 mt-1" />
              <div>
                <div className="text-sm text-on-surface-variant">上课地点</div>
                <div className="text-on-surface font-medium">{course.location}</div>
                <div className="text-sm text-on-surface-variant mt-1">{course.locationDetail}</div>
              </div>
            </div>

            {/* 名额 */}
            <div className="flex items-center">
              <Users size={18} className="text-on-surface-variant mr-3" />
              <div className="flex-1">
                <div className="text-sm text-on-surface-variant">课程名额</div>
                <div className="flex items-center gap-3">
                  <div className="text-on-surface font-medium">
                    {course.currentParticipants}/{course.maxParticipants}人
                  </div>
                  <div className="flex-1 bg-surface-variant h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-primary h-full rounded-full"
                      style={{ width: `${(course.currentParticipants / course.maxParticipants) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 课程安排 */}
        <div className="mx-4 mt-6">
          <h3 className="font-bold text-on-surface mb-3">课程安排</h3>
          <div className="space-y-2">
            {course.schedule.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-surface rounded-xl">
                <div className="w-6 h-6 bg-primary/10 text-primary text-xs rounded-full flex items-center justify-center font-bold mt-1">
                  {index + 1}
                </div>
                <div className="text-on-surface">{item}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 课程描述 */}
        <div className="mx-4 mt-6">
          <h3 className="font-bold text-on-surface mb-3">课程介绍</h3>
          <div className="text-on-surface-variant whitespace-pre-line">
            {course.description}
          </div>
        </div>

        {/* 你将获得 */}
        <div className="mx-4 mt-6">
          <h3 className="font-bold text-on-surface mb-3">你将获得</h3>
          <div className="space-y-2">
            {course.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check size={16} className="text-green-500" />
                <span className="text-on-surface">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 课前准备 */}
        <div className="mx-4 mt-6">
          <h3 className="font-bold text-on-surface mb-3">课前准备</h3>
          <div className="space-y-2">
            {course.requirements.map((req, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                <span className="text-on-surface-variant">{req}</span>
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
                <div className="text-xs text-on-surface-variant">官方认证课程</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Package size={20} className="text-primary" />
              <div>
                <div className="text-sm font-medium text-on-surface">无忧退款</div>
                <div className="text-xs text-on-surface-variant">开课前7天可退</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Award size={20} className="text-primary" />
              <div>
                <div className="text-sm font-medium text-on-surface">证书认证</div>
                <div className="text-xs text-on-surface-variant">完成颁发证书</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-primary font-bold text-lg">3</div>
              <div>
                <div className="text-sm font-medium text-on-surface">持续支持</div>
                <div className="text-xs text-on-surface-variant">3个月课后答疑</div>
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
                        {course.formFields.map((field) => (
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
                        <span className="text-on-surface-variant">课程费用</span>
                        <span className="font-medium text-on-surface">¥{course.price}</span>
                      </div>
                      <div className="border-t border-surface-variant pt-2">
                        <div className="flex justify-between">
                          <span className="font-bold text-on-surface">实付款</span>
                          <span className="text-xl font-bold text-primary">¥{course.price}</span>
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
                      {isSubmitting ? '提交中...' : course.needPayment ? '确认并支付' : '确认报名'}
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
                      {isSubmitting ? '支付中...' : `支付 ¥${course.price}`}
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
                      您已成功报名《{course.title}》
                    </p>
                    <div className="space-y-3">
                      <div className="p-3 bg-surface-variant/30 rounded-xl">
                        <div className="text-sm text-on-surface-variant mb-1">课程凭证</div>
                        <div className="font-mono font-bold text-primary text-lg">TK-{Date.now().toString().slice(-8)}</div>
                        <div className="text-xs text-on-surface-variant mt-1">
                          请妥善保存，上课时出示验证
                        </div>
                      </div>
                      <button
                        onClick={() => setShowRegistrationForm(false)}
                        className="w-full py-3 bg-gradient-to-br from-primary to-primary-variant text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
                      >
                        返回课程详情
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
            onClick={() => {
              // 收藏功能
              setIsLiked(!isLiked)
            }}
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
        {course.currentParticipants >= course.maxParticipants * 0.8 && (
          <div className="text-center text-xs text-orange-500 mt-2">
            仅剩 {course.maxParticipants - course.currentParticipants} 个名额，即将报满
          </div>
        )}
      </div>
    </div>
  )
}