'use client'

import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, ShoppingCart, Star, Package, Truck, Shield, Heart, Share2, Minus, Plus } from 'lucide-react'
import { useState } from 'react'

// 模拟产品数据
const mockProductData = {
  id: '1',
  sku: 'FB-AURA-OIL-001',
  name: '行星能量精油',
  description: '精选天然植物精油，经过能量净化与祝福，能帮助平衡情绪、提升能量频率，适合冥想、疗愈等场景使用。',
  price: 299,
  originalPrice: 399,
  stock: 42,
  soldCount: 1284,
  rating: 4.8,
  reviewCount: 236,
  images: [
    { id: 1, color: 'from-purple-400 to-pink-500' },
    { id: 2, color: 'from-blue-400 to-cyan-500' },
    { id: 3, color: 'from-green-400 to-emerald-500' },
  ],
  weight: 0.15,
  dimensions: '5×5×10 cm',
  isVirtual: false,
  fieldBrandId: '1',
  fieldBrandName: '行星能量中心',
  ingredients: ['薰衣草精油', '檀香精油', '乳香精油', '能量净化水晶'],
  benefits: ['情绪平衡', '能量提升', '深度放松', '意识清晰'],
  usage: '取2-3滴于手心，轻轻搓热后深呼吸吸入，或用于空间扩香。',
  specifications: {
    volume: '10ml',
    origin: '法国普罗旺斯',
    shelfLife: '24个月',
    storage: '阴凉干燥处，避免阳光直射'
  }
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  
  const product = mockProductData
  const productId = params.id

  const addToCart = () => {
    // 模拟添加到购物车
    console.log(`Added ${quantity} of ${product.name} to cart`)
    // 这里可以调用实际的购物车API
  }

  const buyNow = () => {
    addToCart()
    router.push('/order/confirm')
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
            <h1 className="text-lg font-bold text-on-surface">商品详情</h1>
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

        {/* 商品图片轮播 */}
        <div className="relative h-80">
          <div className={`absolute inset-0 bg-gradient-to-br ${product.images[activeImage].color}`} />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {product.images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeImage ? 'bg-white scale-125' : 'bg-white/50'
                }`}
                onClick={() => setActiveImage(index)}
              />
            ))}
          </div>
          {/* 折扣标签 */}
          {product.originalPrice > product.price && (
            <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
              限时优惠
            </div>
          )}
        </div>

        {/* 商品基本信息 */}
        <div className="px-4 pt-6">
          <div className="mb-2">
            <span className="text-sm text-on-surface-variant bg-surface-variant px-2 py-1 rounded">
              能量产品
            </span>
            <span className="text-sm text-on-surface-variant ml-2">SKU: {product.sku}</span>
          </div>
          
          <h1 className="text-2xl font-bold text-on-surface mb-2">{product.name}</h1>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="flex text-yellow-500 mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} fill="currentColor" />
                ))}
              </div>
              <span className="font-bold text-on-surface mr-2">{product.rating}</span>
              <span className="text-sm text-on-surface-variant">({product.reviewCount}条评价)</span>
            </div>
            <span className="text-sm text-on-surface-variant">已售 {product.soldCount}</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl font-bold text-primary">¥{product.price}</div>
            {product.originalPrice > product.price && (
              <>
                <div className="text-lg text-on-surface-variant line-through">¥{product.originalPrice}</div>
                <div className="text-sm font-bold text-red-500">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </div>
              </>
            )}
          </div>

          <p className="text-on-surface-variant">{product.description}</p>
        </div>

        {/* 关联场牌 */}
        <div className="mx-4 mt-6 p-3 bg-surface-variant/30 rounded-xl">
          <div className="text-sm text-on-surface-variant mb-1">所属场牌</div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center">
                <div className="text-xs font-bold text-primary">P</div>
              </div>
              <span className="font-medium text-on-surface">{product.fieldBrandName}</span>
            </div>
            <button className="text-sm text-primary hover:underline">
              查看场牌详情 →
            </button>
          </div>
        </div>

        {/* 数量选择 */}
        <div className="mx-4 mt-6 p-4 bg-surface rounded-2xl border border-surface-variant">
          <div className="flex items-center justify-between mb-3">
            <div className="font-medium text-on-surface">购买数量</div>
            <div className="text-sm text-on-surface-variant">
              库存: <span className="font-bold text-primary">{product.stock}</span> 件
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center bg-surface-variant rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:bg-surface-variant/80 transition-colors"
                disabled={quantity <= 1}
              >
                <Minus size={16} className={quantity <= 1 ? 'text-on-surface-variant' : 'text-on-surface'} />
              </button>
              <span className="px-6 font-bold text-on-surface text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="p-3 hover:bg-surface-variant/80 transition-colors"
                disabled={quantity >= product.stock}
              >
                <Plus size={16} className={quantity >= product.stock ? 'text-on-surface-variant' : 'text-on-surface'} />
              </button>
            </div>
            <div className="text-right">
              <div className="text-sm text-on-surface-variant">小计</div>
              <div className="text-2xl font-bold text-primary">¥{product.price * quantity}</div>
            </div>
          </div>
        </div>

        {/* 产品规格 */}
        <div className="mx-4 mt-6 p-4 bg-surface rounded-2xl border border-surface-variant">
          <h3 className="font-bold text-on-surface mb-3">产品规格</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-sm text-on-surface-variant">净含量</div>
              <div className="font-medium text-on-surface">{product.specifications.volume}</div>
            </div>
            <div>
              <div className="text-sm text-on-surface-variant">产地</div>
              <div className="font-medium text-on-surface">{product.specifications.origin}</div>
            </div>
            <div>
              <div className="text-sm text-on-surface-variant">保质期</div>
              <div className="font-medium text-on-surface">{product.specifications.shelfLife}</div>
            </div>
            <div>
              <div className="text-sm text-on-surface-variant">储存方式</div>
              <div className="font-medium text-on-surface">{product.specifications.storage}</div>
            </div>
            <div>
              <div className="text-sm text-on-surface-variant">重量</div>
              <div className="font-medium text-on-surface">{product.weight} kg</div>
            </div>
            <div>
              <div className="text-sm text-on-surface-variant">尺寸</div>
              <div className="font-medium text-on-surface">{product.dimensions}</div>
            </div>
          </div>
        </div>

        {/* 主要成分与功效 */}
        <div className="mx-4 mt-6">
          <h3 className="font-bold text-on-surface mb-3">主要成分</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {product.ingredients.map((ingredient, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-surface-variant text-on-surface-variant text-sm rounded-full"
              >
                {ingredient}
              </span>
            ))}
          </div>

          <h3 className="font-bold text-on-surface mb-3">主要功效</h3>
          <div className="flex flex-wrap gap-2">
            {product.benefits.map((benefit, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
              >
                {benefit}
              </span>
            ))}
          </div>
        </div>

        {/* 使用说明 */}
        <div className="mx-4 mt-6 p-4 bg-surface rounded-2xl border border-surface-variant">
          <h3 className="font-bold text-on-surface mb-3">使用说明</h3>
          <p className="text-on-surface-variant">{product.usage}</p>
        </div>

        {/* 服务保障 */}
        <div className="mx-4 mt-6">
          <h3 className="font-bold text-on-surface mb-3">服务保障</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Truck size={20} className="text-primary" />
              <div>
                <div className="text-sm font-medium text-on-surface">快速发货</div>
                <div className="text-xs text-on-surface-variant">24小时内发货</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Package size={20} className="text-primary" />
              <div>
                <div className="text-sm font-medium text-on-surface">正品保障</div>
                <div className="text-xs text-on-surface-variant">官方授权</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={20} className="text-primary" />
              <div>
                <div className="text-sm font-medium text-on-surface">能量净化</div>
                <div className="text-xs text-on-surface-variant">专业能量祝福</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-primary font-bold text-lg">7</div>
              <div>
                <div className="text-sm font-medium text-on-surface">无忧退货</div>
                <div className="text-xs text-on-surface-variant">7天无理由</div>
              </div>
            </div>
          </div>
        </div>

        {/* 底部购买栏 */}
        <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-surface-variant p-4 shadow-lg">
          <div className="flex gap-3">
            <button 
              onClick={addToCart}
              className="flex-1 py-3 bg-surface-variant text-on-surface rounded-xl font-medium hover:bg-surface-variant/80 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20} />
              加入购物车
            </button>
            <button 
              onClick={buyNow}
              className="flex-1 py-3 bg-gradient-to-br from-primary to-primary-variant text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
            >
              立即购买
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}