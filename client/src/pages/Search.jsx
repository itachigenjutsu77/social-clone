import { useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const search = async (e) => {
    e.preventDefault();
    const res = await API.get(`/users/search?q=${query}`);
    setResults(res.data);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <form onSubmit={search} className="mb-4 flex gap-2">
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search users..." className="input flex-1" />
        <button className="btn">Search</button>
      </form>
      <ul>
        {results.map(user => (
          <li key={user._id}>
            <Link to={`/profile/${user.username}`}>{user.username}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
