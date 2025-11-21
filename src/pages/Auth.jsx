// src/pages/Auth.jsx
import React, { useState, useEffect } from 'react'
import {
  auth,
  googleProvider,
  facebookProvider,
  createRecaptcha,
} from '../firebaseConfig'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
  signOut,
  signInWithPhoneNumber,
} from 'firebaseConfig'
import { useNavigate } from 'react-router-dom'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('') // E.164 e.g. +260977123456
  const [otp, setOtp] = useState('')
  const [confirmationResult, setConfirmationResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  useEffect(() => {
    // ensure recaptcha prepared on mount so phone flows will work
    try {
      createRecaptcha()
    } catch (e) {
      /* ignore */
    }
  }, [])

  // Email register (sends verification)
  async function handleRegister(e) {
    e?.preventDefault()
    setLoading(true)
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      await sendEmailVerification(res.user)
      alert('Verification email sent — check your inbox.')
    } catch (err) {
      console.error(err)
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Email login
  async function handleLogin(e) {
    e?.preventDefault()
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      nav('/')
    } catch (err) {
      console.error(err)
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Third-party providers
  async function handleGoogle() {
    try {
      await signInWithPopup(auth, googleProvider)
      nav('/')
    } catch (err) {
      console.error(err)
      alert(err.message)
    }
  }
  async function handleFacebook() {
    try {
      await signInWithPopup(auth, facebookProvider)
      nav('/')
    } catch (err) {
      console.error(err)
      alert(err.message)
    }
  }

  // Phone -> send OTP
  async function sendOtp(e) {
    e?.preventDefault()
    if (!phone) return alert('Enter phone in E.164 format, e.g. +26097xxxxxxx')
    setLoading(true)
    try {
      const appVerifier = createRecaptcha('recaptcha-container')
      // signInWithPhoneNumber returns a confirmationResult
      const result = await signInWithPhoneNumber(auth, phone, appVerifier)
      setConfirmationResult(result)
      alert('OTP sent to ' + phone)
    } catch (err) {
      console.error(err)
      alert('Failed to send OTP: ' + err.message)
      // reset reCAPTCHA so user can retry
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear()
        window.recaptchaVerifier = null
      }
    } finally {
      setLoading(false)
    }
  }

  // Confirm OTP
  async function confirmOtp(e) {
    e?.preventDefault()
    if (!confirmationResult) return alert('No confirmation result — request OTP first')
    setLoading(true)
    try {
      const userCredential = await confirmationResult.confirm(otp)
      // the user is now signed in (phone-auth)
      console.log('Phone auth success', userCredential)
      nav('/')
    } catch (err) {
      console.error(err)
      alert('Invalid OTP: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  async function doSignOut() {
    await signOut(auth)
    alert('Signed out')
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Sign In / Register</h2>

      {/* Email form */}
      <form onSubmit={handleLogin} className="space-y-2">
        <input
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            Login
          </button>
          <button type="button" onClick={handleRegister} className="btn btn-outline" disabled={loading}>
            Register (send verification)
          </button>
        </div>
      </form>

      <hr className="my-4" />

      {/* Social */}
      <div className="space-y-2">
        <button onClick={handleGoogle} className="w-full p-2 border rounded">Continue with Google</button>
        <button onClick={handleFacebook} className="w-full p-2 border rounded">Continue with Facebook</button>
      </div>

      <hr className="my-4" />

      {/* Phone OTP */}
      <div>
        <label className="text-sm text-gray-600">Phone (E.164)</label>
        <input className="input" placeholder="+26097xxxxxxx" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <div className="flex gap-2 mt-2">
          <button onClick={sendOtp} className="btn btn-primary" disabled={loading}>Send OTP</button>
        </div>

        {confirmationResult && (
          <form onSubmit={confirmOtp} className="mt-3">
            <input className="input" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
            <button type="submit" className="btn btn-primary mt-2" disabled={loading}>Confirm OTP</button>
          </form>
        )}
      </div>

      <div id="recaptcha-container" />

      <hr className="my-4" />
      <div className="flex gap-2">
        <button onClick={doSignOut} className="btn btn-outline">Sign Out</button>
      </div>
    </div>
  )
}
