import { Link } from 'react-router-dom'
export default function Nav(){
  return (
    <nav className="bg-white shadow mb-6">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg">Biine Buy & Sell</Link>
        <div className="space-x-3">
          <Link to="/post-ad" className="px-3 py-1 rounded border">Post an ad</Link>
          <Link to="/auth" className="px-3 py-1 rounded bg-blue-600 text-white">Login</Link>
        </div>
      </div>
    </nav>
  )
}
