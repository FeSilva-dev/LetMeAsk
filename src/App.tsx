import {Routes} from './routes'
import {AuthContextProvider} from './contexts/AuthContext'

function App() {
  return (
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
  );
}

export default App;
