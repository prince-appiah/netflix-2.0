import Image from 'next/image'
import PageMeta from '../shared/PageMeta'

import bgHero from '../assets/login-bg.jpeg'
import logo2 from '../assets/netflix-logo-2.svg'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { signInWithRedirect } from 'firebase/auth'
import useAuth from '../hooks/useAuth'

interface Inputs {
  email: string
  password: string
}

const Login = () => {
  const [login, setLogin] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const { signIn, signUp } = useAuth()

  const handleSignIn: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password)
    } else {
      await signUp(email, password)
    }
  }

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <PageMeta title="Login - Netflix 2.0" />
      <Image
        src={bgHero}
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
        layout="fill"
      />

      <Image
        src={logo2}
        alt=""
        width={150}
        height={150}
        className="absolute top-4 left-4 cursor-pointer object-contain md:left-10 md:top-6"
      />

      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="relative mt-24 space-y-8 rounded bg-black/75 px-6 py-10 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <span className="text-red-600">Enter a valid email</span>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input"
              {...register('password', { required: true })}
            />
            {errors.password && (
              <span className="text-red-600">Password is required</span>
            )}
          </label>
        </div>

        <button
          type="submit"
          className="w-full rounded bg-[#e50914] py-3 font-semibold "
          onClick={() => setLogin(true)}
        >
          Sign In
        </button>

        <div className="text-[gray]">
          New to Netflix?{' '}
          <button
            className="text-white hover:underline"
            onClick={() => setLogin(false)}
          >
            Sign up here
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
