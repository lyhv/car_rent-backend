/**
 * 
Sure! Here's a list of suggested rental statuses that you can consider including in your application:

"Pending": The rental request has been received but not yet confirmed.
"Confirmed": The rental has been confirmed and is scheduled.
"Active": The rental is currently in progress.
"Completed": The rental has been successfully completed.
"Canceled": The rental has been canceled by either the user or the system.
"Expired": The rental request or reservation has expired without confirmation.
"Returned": The rental has been returned by the user.
"Damaged": The rented item or vehicle has been damaged during the rental period.
"Delayed": The rental return is delayed beyond the scheduled return date.
"Refunded": The rental payment has been refunded.
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = Object.freeze({
  payment_status: ['pending', 'paid', 'cancel'],
  payment_method: ['cod', 'credit_card'],
  car_type: ['support', 'suv', 'mpv', 'sedan', 'coupe', 'hatchback'],
  rental_statuses: ['pending', 'confirmed', 'active', 'returned'],
  user_role: ['admin', 'user'],
});
