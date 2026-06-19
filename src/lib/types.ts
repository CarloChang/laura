export type Category = "nails" | "makeup";

export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string | null;
  category: Category;
  sold_out: boolean;
  sort_order: number;
}

export interface AboutSection {
  id: string;
  title: string;
  text: string;
  images: string[];
  sort_order: number;
}

export type OrderStatus = "new" | "in_progress" | "done" | "archived";

export interface CustomOrder {
  id: string;
  name: string;
  address: string;
  instagram: string | null;
  shape: string | null;
  size: string | null;
  budget: string | null;
  size_photo: string | null;
  design_images: string[];
  comments: string | null;
  status: OrderStatus;
  created_at: string;
}
