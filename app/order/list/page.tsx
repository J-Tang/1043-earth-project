import { Suspense } from 'react'
import Link from 'next/link'

export default function OrderListPage() {
  const orders = [
    { id: 1, product: '场牌合作套餐', status: '已完成', date: '2026-03-28', amount: '¥2999' },
    { id: 2, product: 'AI营销课程', status: '进行中', date: '2026-03-30', amount: '¥999' },
    { id: 3, product: '地球日活动门票', status: '待支付', date: '2026-04-01', amount: '¥199' },
    { id: 4, product: '品牌入驻服务', status: '已取消', date: '2026-03-25', amount: '¥4999' },
  ]

  const statusColors = {
    '已完成': 'bg-green-100 text-green-800',
    '进行中': 'bg-blue-100 text-blue-800',
    '待支付': 'bg-yellow-100 text-yellow-800',
    '已取消': 'bg-gray-100 text-gray-800',
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* 头部 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">我的订单</h1>
          <p className="text-gray-600 mt-2">查看和管理您的所有订单</p>
        </div>

        {/* 订单筛选 */}
        <div className="flex flex-wrap gap-4 mb-6">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            全部订单
          </button>
          <button className="px-4 py-2 bg-white text-gray-700 border rounded-lg hover:bg-gray-50">
            待支付
          </button>
          <button className="px-4 py-2 bg-white text-gray-700 border rounded-lg hover:bg-gray-50">
            进行中
          </button>
          <button className="px-4 py-2 bg-white text-gray-700 border rounded-lg hover:bg-gray-50">
            已完成
          </button>
          <button className="px-4 py-2 bg-white text-gray-700 border rounded-lg hover:bg-gray-50">
            已取消
          </button>
        </div>

        {/* 订单列表 */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    订单号
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    商品/服务
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    日期
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    金额
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order.id.toString().padStart(6, '0')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.product}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[order.status] || 'bg-gray-100 text-gray-800'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link 
                        href={`/order/${order.id}`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        查看详情
                      </Link>
                      {order.status === '待支付' && (
                        <button className="text-green-600 hover:text-green-900">
                          立即支付
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 空状态提示 */}
        {orders.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">暂无订单</h3>
            <p className="text-gray-600 mb-6">您还没有任何订单，快去选购商品吧！</p>
            <Link
              href="/shop"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
            >
              去商城逛逛
            </Link>
          </div>
        )}

        {/* 底部提示 */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>如有订单问题，请联系客服：400-xxx-xxxx</p>
          <p className="mt-1">或发送邮件至：support@1043earth.com</p>
        </div>
      </div>
    </div>
  )
}
