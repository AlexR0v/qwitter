import { ConfigProvider } from 'antd'
import locale             from 'antd/es/locale/ru_RU'
import ReactDOM           from 'react-dom/client'
import { Provider }       from 'react-redux'
import App                from './app/App.tsx'
import './styles/index.css'
import { store }          from './redux'
import { theme }          from './ui/theme-ant.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ConfigProvider
      theme={theme}
      locale={locale}
    >
      <App />
    </ConfigProvider>
  </Provider>,
)
