import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="home">
      <h1>TravelTrucks</h1>
      <p>Your journey starts here.</p>
      <Link to="/catalog">View Now</Link>
    </div>
  )
}

export default Home
