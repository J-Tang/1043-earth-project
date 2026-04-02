import { notFound } from 'next/navigation'

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  // 这里应该从API获取订单详情
  const orderId = params.id
  
  if (!orderId) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">订单详情 #{orderId}</h1>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-600">订单详情页面正在开发中...</p>
          <p className="mt-4">这里将显示订单的详细信息、物流状态、支付信息等。</p>
          <div className="mt-6">
            <a href="/order/list" className="text-blue-600 hover:text-blue-800">
              ← 返回订单列表
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
