import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import store from './redux/store'
import { Provider } from 'react-redux'

import App from './components/App/App'
import { CssBaseline, ThemeProvider } from '@mui/material'
import  Theme  from './components/Themes'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './styles/main.scss'
import ScrollToTop from './components/ScrollToTop'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <ThemeProvider theme={Theme}>
        <Provider store={store}>    
            <ScrollToTop />
            <CssBaseline />
            <App />
        </Provider>
        </ThemeProvider>
    </BrowserRouter>

)
