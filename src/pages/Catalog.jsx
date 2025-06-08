import { Link } from 'react-router-dom'

function Catalog() {
  // placeholder vehicles
  const vehicles = [
    { id: 1, name: 'Camper 1' },
    { id: 2, name: 'Camper 2' },
  ]

  return (
    <div>
      <h2>Catalog</h2>
      <ul>
        {vehicles.map((v) => (
          <li key={v.id}>
            {v.name} <Link to={`/catalog/${v.id}`}>Show more</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Catalog
