export interface Faculty {
  id: string;
  name: string;
  designation: string;
  department: string;
  qualification: string;
  image_url: string | null;
  display_order: number;
  featured: boolean;
  created_at: string;
}
