export class RequestLoanDto {
  amount: number;
  duration: number; // 3, 6, 12 months
  purpose: string;
  images: string[]; // Image URLs
}
