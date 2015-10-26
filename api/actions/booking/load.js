import models from '../../../models';




export default function loadInfo() {
    console.log('bookings fetch: first ');
    console.log('bookings fetch:2 ', models.Booking.all);

    return new Promise((resolve, reject) => {

        console.log('bookings fetch: ', models.Booking.all);

        models.Booking.all()
        .then((res) => {
            console.log('bookings: ', res);
            resolve(res);
        })
        .catch((err) => {
            console.log('bookings failed: ', err);
            reject(err);
        });
    });
}
