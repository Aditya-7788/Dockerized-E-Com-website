import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext)
  const [orderData, setorderData] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) return null
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setorderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <div className="pt-10 pb-24">
      <div className="mb-8">
        <Title numeral={`No. XVI — ${orderData.length} Order${orderData.length !== 1 ? 's' : ''}`} text1="My" text2="Orders" />
      </div>

      {orderData.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20 border border-dashed border-ink/15">
          <p className="font-display text-xl mb-2">No orders yet</p>
          <p className="text-sm text-stone mb-6 max-w-xs">Once you place an order, it will show up here.</p>
          <Link to="/collection" className="btn-primary">Browse the Collection</Link>
        </div>
      ) : (
        <div>
          {orderData.map((item, index) => (
            <div key={index} className="py-6 border-t border-ink/10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <div className="flex items-start gap-6 text-sm">
                <img className="w-20 sm:w-24 bg-ivory-dark" src={item.image[0]} alt={item.name} />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex items-center gap-4 mt-2 text-stone">
                    <p className="text-wine font-display">{currency}{item.price}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="mt-2 text-stone text-xs">Date: {new Date(item.date).toDateString()}</p>
                  <p className="mt-1 text-stone text-xs">Payment: {item.paymentMethod}</p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="min-w-2 h-2 rounded-full bg-gold"></span>
                  <p className="text-sm">{item.status}</p>
                </div>
                <button onClick={loadOrderData} className="btn-outline text-[11px] px-5 py-2.5">Track Order</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders
