import { Box, Typography } from '@mui/material'

function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minHeight: '100vh',
      }}
    >
      <Typography
        variant='h1'
        fontWeight="bold"
        sx={({ palette }) => ({
          color: palette.primary.main
        })}
      >
        AT Software Solutions
      </Typography>
    </Box>
  )
}

export default App
