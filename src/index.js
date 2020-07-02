import dva from 'dva';
import './index.css';
import App from './components/APP'

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/products').default);
app.model(require('./models/cart').default);

// 4. Router
// app.router(require('./router').default);
app.router(() => <App />);

// 5. Start
app.start('#root');
