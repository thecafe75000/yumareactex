import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd';
import App from '@/App'
import './index.less'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ConfigProvider theme={{ token: { colorPrimary: '#bdaead' } }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConfigProvider>
)

