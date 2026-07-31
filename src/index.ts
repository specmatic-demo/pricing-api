import express, { type Request, type Response } from 'express';
import type {
  BulkQuoteRequest,
  BulkQuoteResponse,
  QuotePriceRequest,
  QuotePriceResponse
} from './types';

const host = process.env.PRICING_HOST || '0.0.0.0';
const port = Number.parseInt(process.env.PRICING_PORT || '9000', 10);

function quotePrice(request: QuotePriceRequest): QuotePriceResponse {
  const quantityValue = Number(request.quantity ?? 1);
  const quantity = Number.isFinite(quantityValue) && quantityValue > 0 ? quantityValue : 1;
  const unitPrice = 100.0;

  return {
    sku: request.sku || 'SKU-DEFAULT',
    quantity,
    unitPrice,
    totalPrice: unitPrice * quantity,
    currency: 'USD'
  };
}

function getBulkQuote(request: BulkQuoteRequest): BulkQuoteResponse {
  const lines = Array.isArray(request.lines) ? request.lines : [];
  const quotes = lines.map((line, index) => {
    const quantityValue = Number(line.quantity ?? 1);
    const quantity = Number.isFinite(quantityValue) && quantityValue > 0 ? quantityValue : 1;
    const unitPrice = 100 + index * 5;

    return {
      sku: line.sku || `SKU-${index + 1}`,
      quantity,
      unitPrice,
      totalPrice: unitPrice * quantity,
      currency: 'USD'
    };
  });

  return {
    quotes,
    grandTotal: quotes.reduce((sum, quote) => sum + quote.totalPrice, 0),
    currency: 'USD'
  };
}

const app = express();
app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

app.post('/quote-price', (req: Request, res: Response) => {
  res.status(200).json(quotePrice(req.body as QuotePriceRequest));
});

app.post('/bulk-quote', (req: Request, res: Response) => {
  res.status(200).json(getBulkQuote(req.body as BulkQuoteRequest));
});

const server = app.listen(port, host, () => {
  console.log(`pricing-api listening on http://${host}:${port}`);
});

function shutdown(): void {
  server.close(() => process.exit(0));
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
