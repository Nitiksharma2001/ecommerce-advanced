export interface ProductType {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags?: string[] | null
  brand: string
  sku: string
  weight: number
  dimensions: Dimensions
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  reviews?: ReviewsEntity[] | null
  returnPolicy: string
  minimumOrderQuantity: number
  meta: Meta
  images?: string[] | null
  thumbnail: string
}
export interface Dimensions {
  width: number
  height: number
  depth: number
}
export interface ReviewsEntity {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}
export interface Meta {
  createdAt: string
  updatedAt: string
  barcode: string
  qrCode: string
}
