import { serverFetch } from "../core/server"

export const getBookingsByUserId = async (userId) =>{
    return serverFetch(`/api/bookings?userId=${userId}`);
}