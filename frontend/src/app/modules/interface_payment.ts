// payment.interface.ts
export interface Payment {
    _id?: string;
    payerId: string;
    amount: number;
    currency: string;
    paymentMethod: string;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  