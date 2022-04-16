import Header from '../components/Header'
import Row from '../components/Row'
import Banner from '../components/Banner'
import PageMeta from '../shared/PageMeta'
import requests from '../shared/requests'
import { Movie } from '../typings'
import useAuth from '../hooks/useAuth'
import { useRecoilValue } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import Modal from '../components/Modal'

interface Props {
  netflixOriginals: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]
}

const Home = ({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
}: Props) => {
  const { logout, loading } = useAuth()
  const showModal = useRecoilValue(modalState)
  const movie = useRecoilValue(movieState)

  if (loading) {
    return 'loading...'
  }

  return (
    <div className="relative h-screen bg-gradient-to-b   lg:h-[140vh]">
      <PageMeta />
      <Header />
      <main className="relative pb-24 pl-4 lg:space-y-24 lg:pl-16 ">
        {/* Banner */}
        <Banner netflixOriginals={netflixOriginals} />
        <section className="md:space-y-24">
          {/* Row */}
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
          {/* My favorites */}
          {/* {list.length > 0 && <Row title="My List" movies={list} />} */}

          <Row title="Comedy" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
      </main>

      {/* Modal */}
      {showModal && <Modal />}
    </div>
  )
}

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ])

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  }
}

export default Home
