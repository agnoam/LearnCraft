import { useEffect } from 'react';

import logo from './logo.svg';
import './App.css';
import { useAuth } from './contexts/auth-user';

function App() {
  const auth = useAuth();

  useEffect(() => {
    (async () => {
      console.log('currentUser idToken:', await auth.user?.getIdToken());
    })();
  }, [auth.user])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        
        {/* Example for login */}
        <button className="App-link" onClick={() => auth.signIn()}>Learn React</button>
      </header>
    </div>
  );
}

export default App;
