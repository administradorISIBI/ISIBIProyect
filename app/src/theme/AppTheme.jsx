import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import { createCustomTheme } from './themeConfig'
import { useSelector } from 'react-redux'
import { selectPalette } from '@store/config/selectors'
import { useEffect, useState } from 'react'

export const AppTheme = ({ children }) => {
  const { palette } = useSelector(selectPalette)
  const [colorConfig, setColorConfig] = useState(null)

  useEffect(() => {
    if (palette) {  
      const themeConfig = createCustomTheme(
        palette.primaryColor,
        palette.secondaryColor,
        palette.backgroundColor
      )
      setColorConfig(themeConfig)
    }
  }, [palette])

  if (!colorConfig) return null // Evita renderizar hasta tener el tema

  return (
    <ThemeProvider theme={colorConfig}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
