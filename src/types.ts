export type QuotePriceRequest = {
  sku?: string;
  quantity?: number;
  customerTier?: string;
};

export type QuotePriceResponse = {
  sku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  currency: string;
};

export type BulkQuoteLine = {
  sku?: string;
  quantity?: number;
};

export type BulkQuoteRequest = {
  customerTier?: string;
  lines?: BulkQuoteLine[];
};

export type BulkQuoteResponse = {
  quotes: QuotePriceResponse[];
  grandTotal: number;
  currency: string;
};
