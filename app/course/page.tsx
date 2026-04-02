'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Filter, Calendar, MapPin, Users, Clock, ChevronRight } from 'lucide-react'
import { useState } from 'react'

// 模拟课程数据
const mockCourses = [
  {
    id: '1',
    title: '觉醒之路·意识提升初阶课程',
    subtitle: '开启内在觉醒之旅，连接高我能量',
    coverColor: 'from-purple-500 to-pink-500',
    brandName: '行星能量中心',
    teacherName: '张觉醒',
    teacherTitle: '首席能量导师',
    price: 1280,
    originalPrice: 1680,
    duration: 12,
    location: '北京市朝阳区能量大道1043号',
    startTime: '2026-04-15 10:00',
    maxParticipants: 30,
    currentParticipants: 18,

    tags: ['意识提升', '冥想', '能量疗愈']
  },
  {
    id: '2',
    title: '水晶能量疗愈工作坊',
    subtitle: '学习水晶能量运用，掌握疗愈技巧',
    coverColor: 'from-blue-500 to-cyan-500',
    brandName: '心灵疗愈空间',
    teacherName: '李能量',
    teacherTitle: '水晶疗愈师',
    price: 680,
    originalPrice: 880,
    duration: 6,
    location: '上海市静安区能量中心',
    startTime: '2026-04-20 14:00',
    maxParticipants: 20,
    currentParticipants: 12,

    tags: ['水晶疗愈', '能量清理', '工作坊']
  },
  {
    id: '3',
    title: '满月集体冥想仪式',
    subtitle: '在满月能量下集体冥想，净化能量场',
    coverColor: 'from-indigo-500 to-purple-500',
    brandName: '月亮女神能量圈',
    teacherName: '王明月',
    teacherTitle: '月亮能量导师',
    price: 280,
    originalPrice: 380,
    duration: 3,
    location: '线上直播 + 线下分会场',
    startTime: '2026-04-25 20:00',
    maxParticipants: 100,
    currentParticipants: 78,    tags: ['集体冥想', '满月仪式', '能量净化']
  },
  {
    id: '4',
    title: '行星能量网格连接课程',
    subtitle: '学习连接地球能量网格，提升个人频率',
    coverColor: 'from-green-500 to-emerald-500',
    brandName: '地球能量网格中心',
    teacherName: '赵地球',
    teacherTitle: '地球能量导师',
    price: 980,
    originalPrice: 1280,
    duration: 8,
    location: '深圳市南山区能量中心',
    startTime: '2026-05-01 09:00',
    maxParticipants: 25,
    currentParticipants: 15,    tags: ['地球能量', '频率提升', '网格连接']
  },
  {
    id: '5',
    title: '声音疗愈师认证培训',
    subtitle: '成为认证声音疗愈师，掌握音疗技巧',
    coverColor: 'from-orange-500 to-red-500',
    brandName: '声音疗愈学院',
    teacherName: '孙音律',
    teacherTitle: '声音疗愈大师',
    price: 2580,
    originalPrice: 3280,
    duration: 24,
    location: '杭州市西湖区疗愈中心',
    startTime: '2026-05-10 10:00',
    maxParticipants: 15,
    currentParticipants: 8,    tags: ['声音疗愈', '认证培训', '专业技能']
  },
  {
    id: '6',
    title: '能量心理学入门课程',
    subtitle: '学习能量心理学基础，提升自我认知',
    coverColor: 'from-pink-500 to-rose-500',
    brandName: '能量心理学研究所',
    teacherName: '周心灵',
    teacherTitle: '能量心理学专家',
    price: 580,
    originalPrice: 780,
    duration: 6,
    location: '成都市武侯区能量中心',
    startTime: '2026-04-30 14:00',
    maxParticipants: 40,
    currentParticipants: 32,    tags: ['能量心理学', '自我认知', '入门课程']
  }
]

export default function CourseListPage() {
  const router = useRouter()
  const [filter, setFilter] = useState('all') // all, free, paid, upcoming
  const [sortBy, setSortBy] = useState('recommended') // recommended, price_low, price_high, date

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter)
  }

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort)
  }

  const filteredCourses = mockCourses.filter(course => {
    if (filter === 'free') return course.price === 0
    if (filter === 'paid') return course.price > 0
    if (filter === 'upcoming') {
      const now = new Date()
      const courseDate = new Date(course.startTime)
      return courseDate > now
    }
    return true
  })

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === 'price_low') return a.price - b.price
    if (sortBy === 'price_high') return b.price - a.price
    if (sortBy === 'date') {
      return new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    }
    // recommended: 按参与度和价格综合排序
    const scoreA = a.currentParticipants / a.maxParticipants * 100 + (a.price === 0 ? 50 : 0)
    const scoreB = b.currentParticipants / b.maxParticipants * 100 + (b.price === 0 ? 50 : 0)
    return scoreB - scoreA
  })

  return (
    <div className="min-h-screen bg-white">
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
            <h1 className="text-lg font-bold text-on-surface">课程中心</h1>
            <div className="w-10" /> {/* 占位保持对称 */}
          </div>
        </header>

        {/* 筛选和排序 */}
        <div className="px-4 py-3 border-b border-surface-variant">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2 overflow-x-auto">
              {[
                { id: 'all', label: '全部' },
                { id: 'paid', label: '付费课程' },
                { id: 'free', label: '免费体验' },
                { id: 'upcoming', label: '即将开始' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => handleFilterChange(item.id)}
                  className={`px-4 py-1.5 rounded-full whitespace-nowrap text-sm transition-colors ${
                    filter === item.id
                      ? 'bg-primary text-white'
                      : 'bg-surface-variant text-on-surface-variant hover:bg-surface-variant/80'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                // 弹出排序选项
                const sorts = ['recommended', 'price_low', 'price_high', 'date']
                const currentIndex = sorts.indexOf(sortBy)
                const nextSort = sorts[(currentIndex + 1) % sorts.length]
                handleSortChange(nextSort)
              }}
              className="p-2 rounded-full hover:bg-surface-variant transition-colors"
            >
              <Filter size={20} className="text-on-surface" />
            </button>
          </div>
        </div>

        {/* 课程列表 */}
        <div className="px-4 py-4 space-y-4">
          {sortedCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => router.push(`/course/${course.id}`)}
              className="bg-surface rounded-2xl overflow-hidden border border-surface-variant hover:border-primary/30 transition-colors cursor-pointer"
            >
              {/* 课程封面 */}
              <div className={`h-48 bg-gradient-to-br ${course.coverColor} relative`}>
                {/* 价格标签 */}
                <div className="absolute bottom-4 right-4 bg-white/70 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
                  <div className="flex items-center gap-1">
                    {course.price === 0 ? (
                      <span className="font-bold text-green-600">免费</span>
                    ) : (
                      <>
                        <span className="font-bold text-primary">¥{course.price}</span>
                        {course.originalPrice > course.price && (
                          <span className="text-xs text-on-surface-variant line-through ml-1">
                            ¥{course.originalPrice}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
                
                {/* 场牌标签 */}
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-white/70 backdrop-blur-sm rounded-full text-sm font-medium text-on-surface">
                    {course.brandName}
                  </span>
                </div>
              </div>

              {/* 课程信息 */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-on-surface line-clamp-1 mb-1">
                      {course.title}
                    </h2>
                    <p className="text-sm text-on-surface-variant line-clamp-2 mb-3">
                      {course.subtitle}
                    </p>
                  </div>
                </div>

                {/* 讲师信息 */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-surface-variant rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">
                      {course.teacherName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-on-surface">{course.teacherName}</div>
                    <div className="text-xs text-on-surface-variant">{course.teacherTitle}</div>
                  </div>
                </div>

                {/* 课程详情 */}
                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-on-surface-variant" />
                    <span className="text-on-surface-variant">开课时间</span>
                    <span className="font-medium text-on-surface ml-auto">
                      {new Date(course.startTime).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-on-surface-variant" />
                    <span className="text-on-surface-variant">时长</span>
                    <span className="font-medium text-on-surface ml-auto">{course.duration}小时</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-on-surface-variant" />
                    <span className="text-on-surface-variant">地点</span>
                    <span className="font-medium text-on-surface ml-auto line-clamp-1">
                      {course.location.length > 6 ? `${course.location.substring(0, 6)}...` : course.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-on-surface-variant" />
                    <span className="text-on-surface-variant">名额</span>
                    <span className="font-medium text-on-surface ml-auto">
                      {course.currentParticipants}/{course.maxParticipants}
                    </span>
                  </div>
                </div>

                {/* 标签和评分 */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {course.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-surface-variant text-on-surface-variant text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 底部统计 */}
        <div className="px-4 py-3 border-t border-surface-variant">
          <div className="text-center text-sm text-on-surface-variant">
            共 {sortedCourses.length} 门课程 • {mockCourses.filter(c => c.price === 0).length} 门免费课程 • {mockCourses.filter(c => c.price > 0).length} 门付费课程
          </div>
        </div>
      </main>
    </div>
  )
}