import '@fontsource/inter'
import { CssBaseline, CssVarsProvider } from '@mui/joy'

export type ThemeProviderProps = {
  children?: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <CssVarsProvider defaultMode='dark'>
      <CssBaseline />
      {children}
    </CssVarsProvider>
  )
}
