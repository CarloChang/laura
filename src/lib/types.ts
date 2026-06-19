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
  email: string;
  instagram: string | null;
  shape: string | null;
  length: string | null;
  size_status: string | null;
  design: string;
  reference_image: string | null;
  budget: string | null;
  notes: string | null;
  status: OrderStatus;
  created_at: string;
}
