export interface INote {
  _id?: string;
  userId: string;
  title: string;
  description: string;
  createdAt?: any;
}

export const initialState: INote[] = []