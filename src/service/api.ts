
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import AnalyticsService from './simple-analytics.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.resolve(__dirname, '../../.env')
});

const host = '0.0.0.0';
const app = express();
const port = 3000;

const credentialsPath = path.resolve(__dirname, '../../ga-credentials.json');

const analytics = new AnalyticsService(
    process.env.GA4_PROPERTY_ID!,
    credentialsPath
);

app.use(express.static(path.resolve(__dirname, '../../public')));

// Add debugging middleware
app.use((req, res, next) => {
    if (req.method !== 'GET' ) {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }
    if (!['/', '/app', '/health', '/api'].includes(req.url)) {
        res.status(404).json({ error: 'Not found' });
        return;
    }
    next();
});

app.get('/health', (req, res) => {
    console.log('💚 Health check hit!');
    res.json({ status: 'OK', message: 'Server is working' });
});


app.get('/api', async (req, res) => {
    console.log('📊 Analytics API endpoint hit!');
    try {
        const visitors = await analytics.getUniqueVisitors();
        console.log(`✨ Returning ${visitors} visitors`);
        return res.json({ visitors });
    } catch (error) {
        console.error('❌ Analytics API error:', error);
        return res.status(500).json({ error: 'Failed to fetch analytics data' });
    }
});

// Serve the demo at http://localhost:3000/
app.get('/', (req, res) => {
    console.log('🔍 Serving variants');
    if (process.env.NODE_ENV === 'development') {
        res.sendFile(path.resolve(__dirname, '../../public/index.html'));
        return;
    }
    res.sendFile(path.resolve(__dirname, '../../public/index.html'));
});

app.get('/app', (req, res) => {
    console.log('🔍 Serving demo');
    res.sendFile(path.resolve(__dirname, '../../public/app.html'));
});

app.listen(port, host, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
    console.log(`🚀 Server also available at http://127.0.0.1:${port}`);
    console.log(`📊 Analytics API available at http://localhost:${port}/api`);
});
