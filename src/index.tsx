import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { ConfigProvider, App as AntdApp } from 'antd';
import frFR from 'antd/locale/fr_FR'
import store from '@/store'
import App from '@/App'
import './index.less'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ConfigProvider locale={frFR} theme={{ token: { colorPrimary: '#51c4d3' } }}>
    <AntdApp message={{ maxCount: 1, duration: 1 }}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </AntdApp>
  </ConfigProvider>
)

