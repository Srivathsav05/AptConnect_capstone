export interface Parking {
  id: number;
  parkingSlotNumber: string;
  booked: boolean;
  guestName: string;
  date?: string; // Optional if you want to store the date for each slot
}
