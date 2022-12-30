export type Tone = 'formal' | 'informal' | 'curious' | 'friendly';
export type PlatformType = 'socialMedia' | 'ecomm' | 'other';

export type ProductInfoInput = {
  name: string;
  description: string;
  features?: string[];
  audience?: string;
  guarantee?: string;
  tone?: Tone;
  wordCount?: number;
};

export type IProductInfo = ProductInfoInput & {
  id: number;
  createdAt: Date;
};

// "Raw" is a term used for the database version
// where snake case is used instead of camel case
export type IProductInfoRaw = Omit<IProductInfo, 'createdAt' | 'wordCount'> & {
  created_at: Date;
  word_count?: number;
};

export type ProductDescriptionInput = {
  user_id?: string;
  productInfoId: number;
  content: string;
  title?: string;
};

// "Raw" is a term used for the database version
// where snake case is used instead of camel case
export type ProductDescriptionInputRaw = Omit<ProductDescriptionInput, 'productInfoId'> & {
  product_info_id: number;
};

export type IProductDescription = ProductDescriptionInput & {
  id: number;
  createdAt: Date;
};

// "Raw" is a term used for the database version
// where snake case is used instead of camel case
export type IProductDescriptionRaw = Omit<IProductDescription, 'productInfoId'> & {
  product_info_id: number;
};
