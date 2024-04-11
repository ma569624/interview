import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [store, setStore] = useState([])
  const [id, setId] = useState('')
  const [editsore, seteditsore] = useState({})

  const submit = (event) => {
    event.preventDefault()
    const newData = {
      id: uuidv4(),
      name: name,
      email: email,
      password: password
    };
    setStore([...store, newData]);
    console.warn(store);
    console.warn('sdhash')
    clearInputs();
  }

  const clearInputs = () => {
    setName('');
    setEmail('');
    setPassword('');
  };
  const deleteData = (id) => {
    const updatedStore = store.filter(data => data.id !== id);
    setStore(updatedStore);
  };

  const editData = () => {
    const updatedStore = store.map(data => {
      if (data.id === editsore.id) {
        return { ...data, ...editsore };
      }
      return data;
    });
    setStore(updatedStore);
    seteditsore({}); // Reset editStore after editing
  };

  const editfill = (id) => {
    const filldata = store.map(data => {
      const filterdatanew = store.filter(data => data.id == id);
      console.warn(filterdatanew)
      setEmail(filterdatanew[0].name)
      setName(filterdatanew[0].email)
      setPassword(filterdatanew[0].password)
      seteditsore(
        {id: id,
        name: name,
        email: email,
        password: password}
      )
    });
  }

  return (
    <div className="App">
      <table>
        <tbody>
          {store.map((data) => (
            <tr key={data.id}>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.password}</td>
              <td>
                <button onClick={() => deleteData(data.id)}>Delete</button>
              </td>
              <td>
                <button onClick={() => editfill(data.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={submit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} /><br />
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        <input type="submit" />
        <button onClick={() => editData()}>Edit</button>
      </form>
    </div>
  );
}

export default App;
