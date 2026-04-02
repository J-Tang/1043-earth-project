'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, MapPin, CreditCard, Wallet, QrCode, Check, ChevronRight } from 'lucide-react'
import { useState } from 'react'

// 模拟订单数据
const mockOrderData = {
  items: [
    {
      id: '1',
      name: '行星能量精油',
      sku: 'FB-AURA-OIL-001',
      price: 299,
      quantity: 2,
      imageColor: 'from-purple-400 to-pink-500'
    },
    {
      id: '2',
      name: '冥想坐垫',
      sku: 'FB-MEDITATION-CUSHION-001',
      price: 189,
      quantity: 1,
      imageColor: 'from-blue-400 to-blue-600'
    }
  ],
  shippingAddress: {
    name: '张觉醒',
    phone: '13888881043',
    address: '北京市朝阳区能量大道1043号',
    isDefault: true
  },
  paymentMethods: [
    { id: 'wechat', name: '微信支付', icon: '💳', description: '推荐使用', fee: 0 },
    { id: 'alipay', name: '支付宝', icon: '📱', description: '快捷支付', fee: 0 },
    { id: 'balance', name: '余额支付', icon: '💰', description: '余额: ¥1,284.50', fee: 0 },
    { id: 'bank', name: '银行卡支付', icon: '🏦', description: '储蓄卡/信用卡', fee: 0 }
  ]
}

export default function OrderConfirmPage() {
  const router = useRouter()
  const [selectedPayment, setSelectedPayment] = useState('wechat')
  const [orderNote, setOrderNote] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const calculateSubtotal = () => {
    return mockOrderData.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    const shipping = subtotal >= 299 ? 0 : 15
    return subtotal + shipping
  }

  const handleSubmitOrder = () => {
    setIsSubmitting(true)
    // 模拟API调用
    setTimeout(() => {
      console.log('Order submitted:', {
        paymentMethod: selectedPayment,
        note: orderNote,
        total: calculateTotal()
      })
      setIsSubmitting(false)
      router.push(`/order/order-${Date.now()}`)
    }, 1500)
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
            <h1 className="text-lg font-bold text-on-surface">确认订单</h1>
            <div className="w-10" /> {/* 占位保持对称 */}
          </div>
        </header>

        <div className="px-4 py-6 space-y-6">
          {/* 收货地址 */}
          <div className="bg-surface rounded-2xl p-4 border border-surface-variant">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <MapPin size={20} className="text-primary" />
                <h2 className="font-bold text-on-surface">收货地址</h2>
              </div>
              <button className="text-sm text-primary hover:underline">更改</button>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-on-surface">{mockOrderData.shippingAddress.name}</span>
                <span className="text-on-surface-variant">{mockOrderData.shippingAddress.phone}</span>
                {mockOrderData.shippingAddress.isDefault && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">默认</span>
                )}
              </div>
              <p className="text-on-surface-variant">{mockOrderData.shippingAddress.address}</p>
            </div>
          </div>

          {/* 订单商品 */}
          <div className="bg-surface rounded-2xl p-4 border border-surface-variant">
            <h2 className="font-bold text-on-surface mb-4">订单商品</h2>
            <div className="space-y-4">
              {mockOrderData.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.imageColor} rounded-xl`} />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-on-surface">{item.name}</h3>
                      <span className="font-bold text-on-surface">¥{item.price * item.quantity}</span>
                    </div>
                    <div className="flex justify-between text-sm text-on-surface-variant mt-1">
                      <span>SKU: {item.sku}</span>
                      <span>×{item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 支付方式 */}
          <div className="bg-surface rounded-2xl p-4 border border-surface-variant">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard size={20} className="text-primary" />
              <h2 className="font-bold text-on-surface">支付方式</h2>
            </div>
            
            <div className="space-y-2">
              {mockOrderData.paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${
                    selectedPayment === method.id
                      ? 'bg-primary/10 border border-primary/20'
                      : 'hover:bg-surface-variant'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{method.icon}</div>
                    <div className="text-left">
                      <div className="font-medium text-on-surface">{method.name}</div>
                      <div className="text-xs text-on-surface-variant">{method.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {method.fee > 0 && (
                      <span className="text-sm text-on-surface-variant mr-3">手续费 ¥{method.fee}</span>
                    )}
                    <div className={`
                      w-5 h-5 rounded-full border-2 flex items-center justify-center
                      ${selectedPayment === method.id ? 'bg-primary border-primary' : 'border-on-surface-variant'}
                    `}>
                      {selectedPayment === method.id && <Check size={12} className="text-white" />}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 订单备注 */}
          <div className="bg-surface rounded-2xl p-4 border border-surface-variant">
            <h2 className="font-bold text-on-surface mb-3">订单备注</h2>
            <textarea
              value={orderNote}
              onChange={(e) => setOrderNote(e.target.value)}
              placeholder="可选：对本次订单的特殊要求、配送时间等"
              rows={3}
              className="w-full px-4 py-3 bg-surface border border-surface-variant rounded-xl text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary resize-none"
            />
          </div>

          {/* 价格明细 */}
          <div className="bg-surface rounded-2xl p-4 border border-surface-variant">
            <h2 className="font-bold text-on-surface mb-4">价格明细</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">商品金额</span>
                <span className="font-medium text-on-surface">¥{calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">运费</span>
                <span className="font-medium text-on-surface">
                  {calculateSubtotal() >= 299 ? '包邮' : '¥15.00'}
                </span>
              </div>
              <div className="border-t border-surface-variant pt-2">
                <div className="flex justify-between">
                  <span className="font-bold text-on-surface">实付款</span>
                  <div>
                    <span className="text-2xl font-bold text-primary">¥{calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 服务协议 */}
          <div className="flex items-start gap-2">
            <div className="mt-1">
              <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                <Check size={12} className="text-primary" />
              </div>
            </div>
            <div className="text-xs text-on-surface-variant">
              提交订单即表示您已阅读并同意
              <button className="text-primary hover:underline mx-1">《服务协议》</button>
              和
              <button className="text-primary hover:underline mx-1">《隐私政策》</button>
            </div>
          </div>
        </div>

        {/* 底部操作栏 */}
        <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-surface-variant p-4 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-sm text-on-surface-variant">实付款</div>
              <div className="text-2xl font-bold text-primary">¥{calculateTotal().toFixed(2)}</div>
            </div>
            <button
              onClick={handleSubmitOrder}
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-br from-primary to-primary-variant text-white rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '提交中...' : '提交订单'}
            </button>
          </div>
          <p className="text-xs text-center text-on-surface-variant">
            支付完成后，订单将在24小时内发货
          </p>
        </div>
      </main>
    </div>
  )
}