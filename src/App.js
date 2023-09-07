import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Post } from './components/Post';
import axios from 'axios';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([])
  const [items, setItems] = useState([])


  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then((respPosts) => {
      axios.get('https://jsonplaceholder.typicode.com/users').then((respUser) => {
        setUsers(respUser.data);
        respPosts.data.map((post) => {
          post.author = respUser.data.find(user => user.id === post.userId).name;
        })

        const items = respPosts.data.filter((obj) => {
        
          if (obj.author.includes(searchValue)) {
            return true;
          }  
          return false;
        }) 
        .map((obj) => <div class="col-12 col-md-6 col-lg-4"><Post post={obj} /> </div>)
        setItems(items)
        setPosts(respPosts.data);
      });
    });
     
  }, [setPosts, setUsers, searchValue]);


  return (
    <div className="App bg-primary-subtle">
      <div className='container flex pt-3 align-center'>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </span>
          <input value={searchValue} onChange={e => setSearchValue(e.target.value)} class="form-control" placeholder="Filter by author..." aria-label="Имя пользователя" aria-describedby="basic-addon1"/>
        </div>
        <div className='row gy-3'>
          {items}
        </div>
      </div>
    </div>

  );
}

export default App;
