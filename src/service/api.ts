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

const host = 'localhost';
const app = express();
const port = 3000;

const credentialsPath = path.resolve(__dirname, '../../ga-credentials.json');

const analytics = new AnalyticsService(
    process.env.GA4_PROPERTY_ID!,
    credentialsPath
);

// Analytics API endpoint
app.get('/api', async (req, res) => {
    try {
        const visitors = await analytics.getUniqueVisitors();
        res.json({ visitors });
    } catch (error) {
        console.error('❌ Analytics API error:', error);
        res.status(500).json({ error: 'Failed to fetch analytics data' });
    }
});

// Serve the demo app
app.get('/', (req, res) => {
    console.log('🔍 Serving demo app');
    if (process.env.NODE_ENV === 'development') {
        res.sendFile(path.resolve(__dirname, '../../demo/index.html'));
    }
    res.sendFile(path.join(__dirname, 'demo', 'index.html'));
});

app.listen(port, () => {
    console.log(`🚀 Server running at http://${host}:${port}`);
    console.log(`📊 Analytics API available at http://${host}:${port}/api`);
});
