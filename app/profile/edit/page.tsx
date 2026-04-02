'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Camera, User, MapPin, Phone, Mail, Calendar, Edit2, Check } from 'lucide-react'

// 模拟用户数据
const mockUser = {
  name: '张觉醒',
  avatarColor: 'from-purple-500 to-pink-500',
  gender: 'male',
  phone: '138****8888',
  email: 'juexing@1043.world',
  birthday: '1990-01-01',
  signature: '探索宇宙能量，连接地球频率',
  tags: ['能量疗愈', '冥想', '水晶'],
  wechatBound: true,
  emailVerified: true,
}

// 可选头像颜色
const avatarColors = [
  'from-purple-500 to-pink-500',
  'from-blue-500 to-teal-500',
  'from-amber-500 to-orange-500',
  'from-green-500 to-emerald-500',
  'from-red-500 to-pink-500',
  'from-indigo-500 to-purple-500',
]

export default function EditProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState(mockUser)
  const [isEditingName, setIsEditingName] = useState(false)
  const [tempName, setTempName] = useState(user.name)
  const [tempSignature, setTempSignature] = useState(user.signature)

  const handleSave = () => {
    setUser({ ...user, name: tempName, signature: tempSignature })
    setIsEditingName(false)
    // 实际应调用API保存
    alert('个人信息已保存')
    router.back()
  }

  const handleAvatarColorSelect = (color: string) => {
    setUser({ ...user, avatarColor: color })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-white border-b border-surface-variant/50">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => router.back()} className="p-2">
            <ArrowLeft size={20} className="text-on-surface" />
          </button>
          <h1 className="text-lg font-semibold text-on-surface">编辑个人信息</h1>
          <button onClick={handleSave} className="text-primary font-medium">
            保存
          </button>
        </div>
      </div>

      <main className="p-4">
        {/* 头像编辑 */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className={`w-24 h-24 ${user.avatarColor} rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl`}>
              {user.name.charAt(0)}
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <Camera size={16} className="text-white" />
            </button>
          </div>
          <p className="text-sm text-on-surface-variant mb-4">点击相机可上传自定义头像</p>
          
          {/* 头像颜色选择 */}
          <div className="w-full">
            <h3 className="text-sm font-medium text-on-surface mb-3">选择头像背景色</h3>
            <div className="grid grid-cols-3 gap-3">
              {avatarColors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => handleAvatarColorSelect(color)}
                  className={`h-12 rounded-lg ${color} ${user.avatarColor === color ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 基本信息表单 */}
        <div className="space-y-4">
          {/* 姓名编辑 */}
          <div className="bg-surface rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-on-surface flex items-center gap-2">
                <User size={16} />
                姓名
              </label>
              {isEditingName ? (
                <button onClick={() => { setIsEditingName(false); setTempName(user.name) }} className="text-sm text-on-surface-variant">
                  取消
                </button>
              ) : (
                <button onClick={() => setIsEditingName(true)} className="text-sm text-primary">
                  编辑
                </button>
              )}
            </div>
            {isEditingName ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full p-2 bg-white border border-surface-variant rounded-lg"
                  placeholder="请输入姓名"
                />
                <div className="flex gap-2">
                  <button onClick={() => { setUser({ ...user, name: tempName }); setIsEditingName(false) }} className="flex-1 py-2 bg-primary text-white rounded-lg">
                    确认
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-lg font-medium text-on-surface">{user.name}</div>
            )}
          </div>

          {/* 性别 */}
          <div className="bg-surface rounded-xl p-4">
            <label className="text-sm font-medium text-on-surface mb-2 block">性别</label>
            <div className="flex gap-3">
              <button
                onClick={() => setUser({ ...user, gender: 'male' })}
                className={`flex-1 py-2 rounded-lg ${user.gender === 'male' ? 'bg-primary text-white' : 'bg-surface-variant text-on-surface'}`}
              >
                男
              </button>
              <button
                onClick={() => setUser({ ...user, gender: 'female' })}
                className={`flex-1 py-2 rounded-lg ${user.gender === 'female' ? 'bg-primary text-white' : 'bg-surface-variant text-on-surface'}`}
              >
                女
              </button>
            </div>
          </div>

          {/* 个性签名 */}
          <div className="bg-surface rounded-xl p-4">
            <label className="text-sm font-medium text-on-surface mb-2 block">个性签名</label>
            <textarea
              value={tempSignature}
              onChange={(e) => setTempSignature(e.target.value)}
              className="w-full p-2 bg-white border border-surface-variant rounded-lg"
              rows={2}
              placeholder="一句话介绍自己"
            />
          </div>

          {/* 联系信息（只读） */}
          <div className="bg-surface rounded-xl p-4">
            <h3 className="text-sm font-medium text-on-surface mb-3">联系信息</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-on-surface-variant" />
                  <span className="text-on-surface">手机号</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{user.phone}</span>
                  {user.wechatBound && <Check size={14} className="text-green-500" />}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-on-surface-variant" />
                  <span className="text-on-surface">邮箱</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{user.email}</span>
                  {user.emailVerified && <Check size={14} className="text-green-500" />}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-on-surface-variant" />
                  <span className="text-on-surface">生日</span>
                </div>
                <span>{user.birthday}</span>
              </div>
            </div>
          </div>

          {/* 兴趣标签 */}
          <div className="bg-surface rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium text-on-surface">兴趣标签</h3>
              <button className="text-sm text-primary">管理</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {user.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm">
                  {tag}
                </span>
              ))}
              <button className="px-3 py-1.5 border border-primary text-primary rounded-full text-sm">
                + 添加
              </button>
            </div>
          </div>

          {/* 安全设置 */}
          <div className="bg-surface rounded-xl p-4">
            <h3 className="text-sm font-medium text-on-surface mb-3">安全设置</h3>
            <div className="space-y-2">
              <button className="w-full text-left py-2 text-on-surface hover:text-primary">
                修改密码
              </button>
              <button className="w-full text-left py-2 text-on-surface hover:text-primary">
                绑定微信
              </button>
              <button className="w-full text-left py-2 text-on-surface hover:text-primary">
                隐私设置
              </button>
            </div>
          </div>
        </div>

        {/* 保存按钮 */}
        <div className="mt-8">
          <button onClick={handleSave} className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:opacity-90">
            保存所有修改
          </button>
          <button onClick={() => router.back()} className="w-full py-3 mt-2 text-on-surface-variant hover:text-on-surface">
            取消
          </button>
        </div>
      </main>
    </div>
  )
}