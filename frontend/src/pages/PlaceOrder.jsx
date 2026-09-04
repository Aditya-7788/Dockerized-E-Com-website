import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

    const [method, setMethod] = useState('cod');
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setFormData(data => ({ ...data, [name]: value }))
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name:'Order Payment',
            description:'Order Payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                console.log(response)
                try {
                    
                    const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay',response,{headers:{token}})
                    if (data.success) {
                        navigate('/orders')
                        setCartItems({})
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error)
                }
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {

            let orderItems = []

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }
            

            switch (method) {

                // API Calls for COD
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}})
                    if (response.data.success) {
                        setCartItems({})
                        navigate('/orders')
                    } else {
                        toast.error(response.data.message)
                    }
                    break;

                case 'stripe':
                    const responseStripe = await axios.post(backendUrl + '/api/order/stripe',orderData,{headers:{token}})
                    if (responseStripe.data.success) {
                        const {session_url} = responseStripe.data
                        window.location.replace(session_url)
                    } else {
                        toast.error(responseStripe.data.message)
                    }
                    break;

                case 'razorpay':

                    const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, {headers:{token}})
                    if (responseRazorpay.data.success) {
                        initPay(responseRazorpay.data.order)
                    }

                    break;

                default:
                    break;
            }


        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-14 pt-10 min-h-[80vh]'>
            {/* ------------- Left Side ---------------- */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

                <div className='mb-4'>
                    <Title numeral="No. XV — Ship To" text1='Delivery' text2='Information' />
                </div>
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-ink/20 bg-transparent py-3 px-4 w-full text-sm outline-none focus:border-gold' type="text" placeholder='First name' />
                    <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-ink/20 bg-transparent py-3 px-4 w-full text-sm outline-none focus:border-gold' type="text" placeholder='Last name' />
                </div>
                <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-ink/20 bg-transparent py-3 px-4 w-full text-sm outline-none focus:border-gold' type="email" placeholder='Email address' />
                <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-ink/20 bg-transparent py-3 px-4 w-full text-sm outline-none focus:border-gold' type="text" placeholder='Street' />
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-ink/20 bg-transparent py-3 px-4 w-full text-sm outline-none focus:border-gold' type="text" placeholder='City' />
                    <input onChange={onChangeHandler} name='state' value={formData.state} className='border border-ink/20 bg-transparent py-3 px-4 w-full text-sm outline-none focus:border-gold' type="text" placeholder='State' />
                </div>
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-ink/20 bg-transparent py-3 px-4 w-full text-sm outline-none focus:border-gold' type="number" placeholder='Zipcode' />
                    <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-ink/20 bg-transparent py-3 px-4 w-full text-sm outline-none focus:border-gold' type="text" placeholder='Country' />
                </div>
                <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-ink/20 bg-transparent py-3 px-4 w-full text-sm outline-none focus:border-gold' type="number" placeholder='Phone' />
            </div>

            {/* ------------- Right Side ------------------ */}
            <div className='w-full sm:w-[420px]'>

                <CartTotal />

                <div className='mt-12'>
                    <Title text1='Payment' text2='Method' />
                    <div className='flex gap-3 flex-col mt-5'>
                        <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border border-ink/15 p-3 px-4 cursor-pointer hover:border-gold transition-colors'>
                            <span className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-wine border-wine' : 'border-ink/30'}`}></span>
                            <img className='h-5 mx-2' src={assets.stripe_logo} alt="Stripe" />
                        </div>
                        <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border border-ink/15 p-3 px-4 cursor-pointer hover:border-gold transition-colors'>
                            <span className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-wine border-wine' : 'border-ink/30'}`}></span>
                            <img className='h-5 mx-2' src={assets.razorpay_logo} alt="Razorpay" />
                        </div>
                        <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border border-ink/15 p-3 px-4 cursor-pointer hover:border-gold transition-colors'>
                            <span className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-wine border-wine' : 'border-ink/30'}`}></span>
                            <p className='text-stone text-sm font-medium mx-2'>Cash on Delivery</p>
                        </div>
                    </div>

                    <div className='w-full mt-8'>
                        <button type='submit' className='btn-primary w-full'>Place Order</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder
