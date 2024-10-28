import { Box } from '@mui/material'
import PersistentDrawerLeft from './components/Header'
import Dashboard from './components/Dashboard'
import Form from './components/Form'

function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minHeight: '100vh',
        flexDirection: 'column'
      }}
    >
      <PersistentDrawerLeft form = {<Form/>} chart={<Dashboard/>}/>
    </Box>
  )
}

export default App
