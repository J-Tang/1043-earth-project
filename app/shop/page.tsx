'use client'

import { useState } from "react"
import { ShoppingBag, ShoppingCart, Plus, Minus, Trash2 } from "lucide-react"
import BottomNav from "@/components/BottomNav"

type Product = {
  id: number
  name: string
  price: number
  category: string
  imageUrl: string
}

export default function ShopPage() {
  const [cartItems, setCartItems] = useState<{product: Product, quantity: number}[]>([])
  const [products] = useState<Product[]>([
    { id: 1, name: "能量水晶套装", price: 299, category: "能量产品", imageUrl: "" },
    { id: 2, name: "疗愈香薰", price: 189, category: "疗愈工具", imageUrl: "" },
    { id: 3, name: "灵性书籍", price: 98, category: "书籍课程", imageUrl: "" },
    { id: 4, name: "冥想坐垫", price: 159, category: "冥想工具", imageUrl: "" },
    { id: 5, name: "能量手链", price: 89, category: "能量饰品", imageUrl: "" },
    { id: 6, name: "精油套装", price: 249, category: "疗愈产品", imageUrl: "" },
  ])

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const totalAmount = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0)

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id)
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prev, { product, quantity: 1 }]
      }
    })
  }

  const updateQuantity = (productId: number, delta: number) => {
    setCartItems(prev => {
      const updated = prev.map(item => {
        if (item.product.id === productId) {
          const newQuantity = item.quantity + delta
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item
        }
        return item
      }).filter(item => item.quantity > 0)
      return updated
    })
  }

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId))
  }

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <div className="p-4 max-w-6xl mx-auto pb-20">
        <h1 className="text-2xl font-bold mb-6">能量商城</h1>
        
        {/* 商品网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {products.map((product) => (
            <div key={product.id} className="bg-surface rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-40 bg-gradient-to-br from-primary/20 to-primary-variant/20 rounded-xl mb-4 flex items-center justify-center">
                <ShoppingBag size={48} className="text-primary/60" />
              </div>
              <h3 className="font-medium mb-2">{product.name}</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-primary">¥{product.price}</span>
                <span className="text-sm text-on-surface-variant bg-surface-variant/30 px-2 py-1 rounded">
                  {product.category}
                </span>
              </div>
              <button 
                onClick={() => addToCart(product)}
                className="w-full mt-2 py-2.5 bg-gradient-to-br from-primary to-primary-variant text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} />
                加入购物车
              </button>
            </div>
          ))}
        </div>

        {/* 购物车侧边栏 */}
        {cartCount > 0 && (
          <div className="fixed bottom-24 left-4 right-4 bg-surface border border-primary/20 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-medium">购物车</h3>
                <p className="text-sm text-on-surface-variant">
                  {cartCount}件商品 · ¥{totalAmount}
                </p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={clearCart}
                  className="px-3 py-1.5 text-sm border border-error/30 text-error rounded-lg hover:bg-error/10"
                >
                  清空
                </button>
                <button className="px-4 py-1.5 bg-gradient-to-br from-primary to-primary-variant text-white rounded-lg font-medium">
                  结算
                </button>
              </div>
            </div>
            
            <div className="space-y-3 max-h-40 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between p-2 bg-surface-variant/20 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-on-surface-variant">¥{item.product.price} × {item.quantity}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => updateQuantity(item.product.id, -1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-variant/50 hover:bg-surface-variant"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.product.id, 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-variant/50 hover:bg-surface-variant"
                    >
                      <Plus size={14} />
                    </button>
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-error/20 text-error hover:bg-error/30 ml-2"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <BottomNav />
    </div>
  )
}