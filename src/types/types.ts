export type TProduct = {
  _id?:string
  name: string;
  brand: string;
  category: string;
  price: number;
  ratings: number;
  off: number;
  quantity: number;
  description: string;
  imageLink: string;
};
export type TBlog = {
  _id?: string;
  blogTitle: string;
  category: string;
  authorName: string;
  imageLink: string;
  description: string;
  isDeleted: boolean;
};
