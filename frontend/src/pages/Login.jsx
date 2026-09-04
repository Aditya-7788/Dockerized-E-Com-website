import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [currentState, setCurrentState] = useState('Login')
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name, setName] = useState('')
  const [password, setPasword] = useState('')
  const [email, setEmail] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-14">
      <form onSubmit={onSubmitHandler} className="flex flex-col w-[90%] sm:max-w-sm gap-5 border border-ink/10 px-8 py-12">
        <div className="text-center mb-2">
          <span className="eyebrow">Members Only</span>
          <h1 className="font-display text-3xl mt-2">{currentState}</h1>
        </div>

        {currentState !== 'Login' && (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="w-full px-4 py-3 border border-ink/20 bg-transparent text-sm outline-none focus:border-gold"
            placeholder="Full name"
            required
          />
        )}
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="w-full px-4 py-3 border border-ink/20 bg-transparent text-sm outline-none focus:border-gold"
          placeholder="Email"
          required
        />
        <input
          onChange={(e) => setPasword(e.target.value)}
          value={password}
          type="password"
          className="w-full px-4 py-3 border border-ink/20 bg-transparent text-sm outline-none focus:border-gold"
          placeholder="Password"
          required
        />
        <div className="w-full flex justify-between text-xs text-stone -mt-1">
          <p className="cursor-pointer hover:text-ink">Forgot your password?</p>
          {currentState === 'Login' ? (
            <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer hover:text-ink">Create account</p>
          ) : (
            <p onClick={() => setCurrentState('Login')} className="cursor-pointer hover:text-ink">Login here</p>
          )}
        </div>
        <button className="btn-primary mt-2">{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
      </form>
    </div>
  )
}

export default Login
