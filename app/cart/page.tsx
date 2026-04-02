'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, ShoppingCart, Trash2, Plus, Minus, Truck, Shield, Package } from 'lucide-react'
import { useState } from 'react'

// 模拟购物车数据
const mockCartItems = [
  {
    id: '1',
    sku: 'FB-AURA-OIL-001',
    name: '行星能量精油',
    description: '精选天然植物精油，能量净化与祝福',
    price: 299,
    originalPrice: 399,
    quantity: 2,
    stock: 42,
    imageColor: 'from-purple-400 to-pink-500',
    fieldBrandName: '行星能量中心'
  },
  {
    id: '2',
    sku: 'FB-MEDITATION-CUSHION-001',
    name: '冥想坐垫',
    description: '人体工学设计，帮助深度冥想',
    price: 189,
    originalPrice: 249,
    quantity: 1,
    stock: 28,
    imageColor: 'from-blue-400 to-blue-600',
    fieldBrandName: '心灵疗愈空间'
  },
  {
    id: '3',
    sku: 'FB-CRYSTAL-SET-001',
    name: '能量水晶套装',
    description: '精选天然水晶，提升个人能量场',
    price: 520,
    originalPrice: 699,
    quantity: 1,
    stock: 15,
    imageColor: 'from-green-400 to-green-600',
    fieldBrandName: '行星能量中心'
  }
]

export default function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState(mockCartItems)
  const [selectedItems, setSelectedItems] = useState<string[]>(mockCartItems.map(item => item.id))

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, Math.min(item.stock, item.quantity + delta))
        return { ...item, quantity: newQuantity }
      }
      return item
    }))
  }

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
    setSelectedItems(prev => prev.filter(itemId => itemId !== id))
  }

  const toggleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(cartItems.map(item => item.id))
    }
  }

  const getSelectedItems = () => {
    return cartItems.filter(item => selectedItems.includes(item.id))
  }

  const calculateSubtotal = () => {
    return getSelectedItems().reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  const calculateDiscount = () => {
    return getSelectedItems().reduce((sum, item) => {
      const originalTotal = item.originalPrice * item.quantity
      const actualTotal = item.price * item.quantity
      return sum + (originalTotal - actualTotal)
    }, 0)
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    const shipping = subtotal >= 299 ? 0 : 15 // 满299包邮
    return subtotal + shipping
  }

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert('请选择要结算的商品')
      return
    }
    router.push('/order/confirm')
  }

  const isAllSelected = cartItems.length > 0 && selectedItems.length === cartItems.length

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
            <h1 className="text-lg font-bold text-on-surface">购物车</h1>
            <div className="w-10" /> {/* 占位保持对称 */}
          </div>
        </header>

        {/* 购物车内容 */}
        <div className="px-4 py-6">
          {/* 全选与操作 */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={toggleSelectAll}
              className="flex items-center gap-2"
            >
              <div className={`
                w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${isAllSelected ? 'bg-primary border-primary' : 'border-on-surface-variant'}
              `}>
                {isAllSelected && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <span className="text-sm text-on-surface">
                全选 ({selectedItems.length}/{cartItems.length})
              </span>
            </button>
            <button
              onClick={() => {
                selectedItems.forEach(id => removeItem(id))
                setSelectedItems([])
              }}
              className="text-sm text-on-surface-variant hover:text-on-surface flex items-center gap-1"
            >
              <Trash2 size={14} />
              删除选中
            </button>
          </div>

          {/* 购物车商品列表 */}
          <div className="space-y-4">
            {cartItems.map((item) => {
              const isSelected = selectedItems.includes(item.id)
              
              return (
                <div key={item.id} className="bg-surface rounded-2xl border border-surface-variant overflow-hidden">
                  <div className="p-4">
                    <div className="flex gap-3">
                      {/* 选择框 */}
                      <button
                        onClick={() => toggleSelectItem(item.id)}
                        className="mt-1"
                      >
                        <div className={`
                          w-5 h-5 rounded-full border-2 flex items-center justify-center
                          ${isSelected ? 'bg-primary border-primary' : 'border-on-surface-variant'}
                        `}>
                          {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                      </button>

                      {/* 商品图片 */}
                      <div className={`w-20 h-20 bg-gradient-to-br ${item.imageColor} rounded-xl`} />

                      {/* 商品信息 */}
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-bold text-on-surface line-clamp-1">{item.name}</h3>
                            <p className="text-xs text-on-surface-variant line-clamp-1">{item.description}</p>
                            <div className="text-xs text-on-surface-variant mt-1">
                              场牌: {item.fieldBrandName}
                            </div>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1 hover:bg-surface-variant rounded-full transition-colors"
                          >
                            <Trash2 size={16} className="text-on-surface-variant" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <div className="text-lg font-bold text-primary">¥{item.price}</div>
                            {item.originalPrice > item.price && (
                              <div className="text-sm text-on-surface-variant line-through">¥{item.originalPrice}</div>
                            )}
                          </div>

                          {/* 数量选择器 */}
                          <div className="flex items-center bg-surface-variant rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-2 hover:bg-surface-variant/80 transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={14} className={item.quantity <= 1 ? 'text-on-surface-variant' : 'text-on-surface'} />
                            </button>
                            <span className="px-3 font-bold text-on-surface">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-2 hover:bg-surface-variant/80 transition-colors"
                              disabled={item.quantity >= item.stock}
                            >
                              <Plus size={14} className={item.quantity >= item.stock ? 'text-on-surface-variant' : 'text-on-surface'} />
                            </button>
                          </div>
                        </div>

                        {/* 小计 */}
                        <div className="text-right text-sm text-on-surface-variant mt-1">
                          小计: <span className="font-bold text-primary">¥{item.price * item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            {cartItems.length === 0 && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-surface-variant rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart size={32} className="text-on-surface-variant" />
                </div>
                <h3 className="text-lg font-medium text-on-surface mb-2">购物车空空如也</h3>
                <p className="text-on-surface-variant mb-6">快去挑选心仪的能量产品吧！</p>
                <button
                  onClick={() => router.push('/shop')}
                  className="px-6 py-3 bg-gradient-to-br from-primary to-primary-variant text-white rounded-full font-bold hover:opacity-90 transition-opacity"
                >
                  去商城逛逛
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 服务保障 */}
        {cartItems.length > 0 && (
          <div className="mx-4 mt-6 p-4 bg-surface-variant/30 rounded-2xl">
            <h3 className="font-medium text-on-surface mb-3">服务保障</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Truck size={20} className="text-primary" />
                <div>
                  <div className="text-sm font-medium text-on-surface">快速发货</div>
                  <div className="text-xs text-on-surface-variant">24小时内发货</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={20} className="text-primary" />
                <div>
                  <div className="text-sm font-medium text-on-surface">正品保障</div>
                  <div className="text-xs text-on-surface-variant">官方授权</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Package size={20} className="text-primary" />
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
        )}

        {/* 订单汇总 */}
        {cartItems.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-surface-variant p-4 shadow-lg">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">商品金额</span>
                <span className="font-medium text-on-surface">¥{calculateSubtotal().toFixed(2)}</span>
              </div>
              {calculateDiscount() > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">优惠折扣</span>
                  <span className="font-medium text-green-500">-¥{calculateDiscount().toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">运费</span>
                <span className="font-medium text-on-surface">
                  {calculateSubtotal() >= 299 ? '包邮' : '¥15.00'}
                </span>
              </div>
              <div className="border-t border-surface-variant pt-2">
                <div className="flex justify-between">
                  <span className="font-bold text-on-surface">合计</span>
                  <div>
                    <span className="text-xs text-on-surface-variant line-through mr-2">
                      ¥{(calculateSubtotal() + calculateDiscount()).toFixed(2)}
                    </span>
                    <span className="text-2xl font-bold text-primary">¥{calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={selectedItems.length === 0}
              className={`w-full py-3 rounded-xl font-bold transition-opacity ${
                selectedItems.length === 0
                  ? 'bg-surface-variant text-on-surface-variant cursor-not-allowed'
                  : 'bg-gradient-to-br from-primary to-primary-variant text-white hover:opacity-90'
              }`}
            >
              去结算 ({selectedItems.length}件商品)
            </button>

            {calculateSubtotal() < 299 && (
              <p className="text-xs text-center text-on-surface-variant mt-2">
                还差 ¥{(299 - calculateSubtotal()).toFixed(2)} 即可享受包邮
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  )
}