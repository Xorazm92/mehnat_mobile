export interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
  color: string;
  path: string;
}

export interface Material {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  type: "pdf" | "ppt" | "doc" | "video" | "image";
  fileUrl: string;
  thumbnailUrl?: string;
  size: number;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  isBookmarked: boolean;
  progress: number;
  views: number;
  downloads: number;
}
