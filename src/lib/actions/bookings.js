'use server'

import { serverMutation } from "../core/server"

export const submitBookings = async(BookingsData)=>{
    return serverMutation('/api/bookings', BookingsData)
}