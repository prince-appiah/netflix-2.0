import { InformationCircleIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { FaPlay } from 'react-icons/fa'
import { Movie } from '../typings'
import { BASE_URL } from '../shared/constants'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'

interface Props {
  netflixOriginals: Movie[]
}

const Banner = ({ netflixOriginals }: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
  const [showModal, setShowModal] = useRecoilState(modalState)

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    )
  }, [netflixOriginals])

  return (
    <div className="flex flex-col space-y-2 py-24   md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        <Image
          layout="fill"
          src={`${BASE_URL}${movie?.backdrop_path || movie?.poster_path}`}
          alt=""
          objectFit="cover"
        />
      </div>

      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
        {movie?.title || movie?.original_name}
      </h1>
      <p className="md:text-md max-w-xs text-xs text-shadow-md line-clamp-3 md:max-w-lg lg:max-w-2xl lg:text-xl">
        {movie?.overview}
      </p>

      <div className="flex space-x-3">
        <button className="bannerBtn bg-white text-black">
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" /> Play
        </button>

        <button
          className="bannerBtn bg-[gray]/70"
          onClick={() => {
            setCurrentMovie(movie)
            setShowModal(true)
          }}
        >
          More Info
          <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
        </button>
      </div>
    </div>
  )
}

export default Banner
