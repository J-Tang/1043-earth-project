'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Upload, MapPin, Globe, User, Mail, Phone, Check } from 'lucide-react'
import { useState } from 'react'

export default function BrandApplyPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // 步骤1: 基本信息
    brandName: '',
    shortIntro: '',
    description: '',
    website: '',
    phone: '',
    email: '',
    
    // 步骤2: 详细信息
    address: '',
    coordinates: '',
    services: [] as string[],
    tags: [] as string[],
    
    // 步骤3: 主理人信息
    principalName: '',
    principalTitle: '',
    principalBio: '',
    principalExperience: '',
    
    // 文件上传
    logoFile: null as File | null,
    stellarCodeFile: null as File | null,
  })

  const serviceOptions = [
    '能量疗愈', '水晶净化', '声音疗愈', '冥想指导', '瑜伽课程',
    '灵气治疗', '塔罗解读', '占星咨询', '心理辅导', '能量产品',
    '工作坊', ' retreat', '线上课程', '一对一咨询', '团体活动'
  ]

  const tagOptions = [
    '冥想', '能量', '疗愈', '觉醒', '灵性', '心灵', '成长',
    '自然', '环保', '社区', '创意', '艺术', '音乐', '舞蹈',
    '健康', '养生', '禅修', '正念', '教练', '导师'
  ]

  const handleInputChange = (field: string, value: string | string[] | File) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleServiceToggle = (service: string) => {
    const newServices = formData.services.includes(service)
      ? formData.services.filter(s => s !== service)
      : [...formData.services, service]
    handleInputChange('services', newServices)
  }

  const handleTagToggle = (tag: string) => {
    const newTags = formData.tags.includes(tag)
      ? formData.tags.filter(t => t !== tag)
      : [...formData.tags, tag]
    handleInputChange('tags', newTags)
  }

  const handleFileUpload = (field: 'logoFile' | 'stellarCodeFile', file: File) => {
    handleInputChange(field, file)
  }

  const handleSubmit = () => {
    console.log('Form submitted:', formData)
    // 这里应该调用API提交申请
    alert('申请提交成功！我们将在3个工作日内审核您的申请。')
    router.push('/profile')
  }

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const isStep1Valid = () => {
    return formData.brandName.length > 0 && 
           formData.shortIntro.length > 0 && 
           formData.description.length > 0 &&
           formData.email.length > 0 &&
           formData.phone.length > 0
  }

  const isStep2Valid = () => {
    return formData.address.length > 0 && formData.services.length > 0
  }

  const isStep3Valid = () => {
    return formData.principalName.length > 0 && 
           formData.principalTitle.length > 0 &&
           formData.principalBio.length > 0
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
            <h1 className="text-lg font-bold text-on-surface">场牌申请</h1>
            <div className="w-10" /> {/* 占位保持对称 */}
          </div>
        </header>

        {/* 进度指示器 */}
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
                  ${step === stepNumber ? 'bg-primary text-white' : 
                    step > stepNumber ? 'bg-primary/20 text-primary' : 
                    'bg-surface-variant text-on-surface-variant'}
                `}>
                  {step > stepNumber ? <Check size={16} /> : stepNumber}
                </div>
                <div className="text-xs mt-2 text-center text-on-surface-variant">
                  {stepNumber === 1 && '基本信息'}
                  {stepNumber === 2 && '详细信息'}
                  {stepNumber === 3 && '主理人信息'}
                </div>
              </div>
            ))}
          </div>
          <div className="h-1 bg-surface-variant rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
          </div>
        </div>

        {/* 步骤1: 基本信息 */}
        {step === 1 && (
          <div className="px-4 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-on-surface mb-2">场牌基本信息</h2>
              <p className="text-on-surface-variant">请填写您要申请的场牌基本信息</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-on-surface mb-2">
                  场牌名称 *
                </label>
                <input
                  type="text"
                  value={formData.brandName}
                  onChange={(e) => handleInputChange('brandName', e.target.value)}
                  placeholder="请输入场牌名称"
                  className="w-full px-4 py-3 bg-surface border border-surface-variant rounded-xl text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-on-surface mb-2">
                  一句话介绍 *
                </label>
                <input
                  type="text"
                  value={formData.shortIntro}
                  onChange={(e) => handleInputChange('shortIntro', e.target.value)}
                  placeholder="用一句话介绍您的场牌特色"
                  className="w-full px-4 py-3 bg-surface border border-surface-variant rounded-xl text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-on-surface mb-2">
                  详细描述 *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="请详细描述您的场牌理念、服务内容、特色等"
                  rows={4}
                  className="w-full px-4 py-3 bg-surface border border-surface-variant rounded-xl text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-on-surface mb-2">
                  联系方式
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-on-surface-variant mb-1">联系电话</div>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="138****8888"
                      className="w-full px-4 py-3 bg-surface border border-surface-variant rounded-xl text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <div className="text-xs text-on-surface-variant mb-1">电子邮箱 *</div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="contact@yourbrand.com"
                      className="w-full px-4 py-3 bg-surface border border-surface-variant rounded-xl text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-on-surface mb-2">
                  官方网站
                </label>
                <div className="flex items-center">
                  <Globe size={18} className="text-on-surface-variant mr-2" />
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="https://yourbrand.com"
                    className="flex-1 px-4 py-3 bg-surface border border-surface-variant rounded-xl text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 步骤2: 详细信息 */}
        {step === 2 && (
          <div className="px-4 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-on-surface mb-2">场牌详细信息</h2>
              <p className="text-on-surface-variant">请填写场牌的详细信息和特色</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-on-surface mb-2">
                  详细地址 *
                </label>
                <div className="flex items-center">
                  <MapPin size={18} className="text-on-surface-variant mr-2" />
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="请输入详细地址"
                    className="flex-1 px-4 py-3 bg-surface border border-surface-variant rounded-xl text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-on-surface mb-2">
                  地理坐标（可选）
                </label>
                <input
                  type="text"
                  value={formData.coordinates}
                  onChange={(e) => handleInputChange('coordinates', e.target.value)}
                  placeholder="格式：39.9042,116.4074"
                  className="w-full px-4 py-3 bg-surface border border-surface-variant rounded-xl text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary"
                />
                <p className="text-xs text-on-surface-variant mt-1">
                  用于地图显示，可在地图应用中获取坐标
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-on-surface mb-2">
                  服务项目 *
                </label>
                <div className="flex flex-wrap gap-2">
                  {serviceOptions.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => handleServiceToggle(service)}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        formData.services.includes(service)
                          ? 'bg-primary text-white'
                          : 'bg-surface-variant text-on-surface-variant hover:bg-surface-variant/80'
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-on-surface mb-2">
                  场牌标签
                </label>
                <div className="flex flex-wrap gap-2">
                  {tagOptions.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagToggle(tag)}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        formData.tags.includes(tag)
                          ? 'bg-primary/20 text-primary'
                          : 'bg-surface-variant text-on-surface-variant hover:bg-surface-variant/80'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">
                    场牌LOGO（可选）
                  </label>
                  <div className="border-2 border-dashed border-surface-variant rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload size={32} className="text-on-surface-variant mx-auto mb-2" />
                    <p className="text-on-surface-variant">点击上传LOGO图片</p>
                    <p className="text-xs text-on-surface-variant mt-1">建议尺寸：512×512px</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">
                    星际编码图片（可选）
                  </label>
                  <div className="border-2 border-dashed border-surface-variant rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload size={32} className="text-on-surface-variant mx-auto mb-2" />
                    <p className="text-on-surface-variant">点击上传星际编码图片</p>
                    <p className="text-xs text-on-surface-variant mt-1">支持PNG、JPG格式</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 步骤3: 主理人信息 */}
        {step === 3 && (
          <div className="px-4 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-on-surface mb-2">主理人信息</h2>
              <p className="text-on-surface-variant">请填写场牌主理人的详细信息</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-on-surface mb-2">
                  主理人姓名 *
                </label>
                <div className="flex items-center">
                  <User size={18} className="text-on-surface-variant mr-2" />
                  <input
                    type="text"
                    value={formData.principalName}
                    onChange={(e) => handleInputChange('principalName', e.target.value)}
                    placeholder="请输入您的姓名"
                    className="flex-1 px-4 py-3 bg-surface border border-surface-variant rounded-xl text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-on-surface mb-2">
                  主理人头衔 *
                </label>
                <input
                  type="text"
                  value={formData.principalTitle}
                  onChange={(e) => handleInputChange('principalTitle', e.target.value)}
                  placeholder="例如：首席能量导师、创始人"
                  className="w-full px-4 py-3 bg-surface border border-surface-variant rounded-xl text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-on-surface mb-2">
                  个人简介 *
                </label>
                <textarea
                  value={formData.principalBio}
                  onChange={(e) => handleInputChange('principalBio', e.target.value)}
                  placeholder="请简要介绍您的背景、专长和经验"
                  rows={3}
                  className="w-full px-4 py-3 bg-surface border border-surface-variant rounded-xl text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-on-surface mb-2">
                  相关经验
                </label>
                <textarea
                  value={formData.principalExperience}
                  onChange={(e) => handleInputChange('principalExperience', e.target.value)}
                  placeholder="请详细描述您在相关领域的经验和成就"
                  rows={4}
                  className="w-full px-4 py-3 bg-surface border border-surface-variant rounded-xl text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary resize-none"
                />
              </div>
            </div>

            {/* 申请说明 */}
            <div className="bg-surface-variant/30 rounded-xl p-4">
              <h3 className="font-medium text-on-surface mb-2">申请说明</h3>
              <ul className="text-sm text-on-surface-variant space-y-1">
                <li>• 申请提交后，我们将在3个工作日内完成审核</li>
                <li>• 审核通过后，您将收到邮件通知</li>
                <li>• 成为场牌主理人后，您可以管理自己的场牌页面</li>
                <li>• 1043地球平台将为您提供技术支持与运营指导</li>
                <li>• 如有疑问，请联系客服：support@1043.world</li>
              </ul>
            </div>
          </div>
        )}

        {/* 底部操作栏 */}
        <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-surface-variant p-4 shadow-lg">
          <div className="flex gap-3">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="flex-1 py-3 bg-surface-variant text-on-surface rounded-xl font-medium hover:bg-surface-variant/80 transition-colors"
              >
                上一步
              </button>
            )}
            <button
              onClick={nextStep}
              disabled={
                (step === 1 && !isStep1Valid()) ||
                (step === 2 && !isStep2Valid()) ||
                (step === 3 && !isStep3Valid())
              }
              className={`flex-1 py-3 rounded-xl font-bold transition-opacity ${
                (step === 1 && !isStep1Valid()) ||
                (step === 2 && !isStep2Valid()) ||
                (step === 3 && !isStep3Valid())
                  ? 'bg-surface-variant text-on-surface-variant cursor-not-allowed'
                  : 'bg-gradient-to-br from-primary to-primary-variant text-white hover:opacity-90'
              }`}
            >
              {step < 3 ? '下一步' : '提交申请'}
            </button>
          </div>
          <p className="text-xs text-on-surface-variant text-center mt-2">
            步骤 {step}/3 • 带 * 的为必填项
          </p>
        </div>
      </main>
    </div>
  )
}