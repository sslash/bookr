import models from '../../../models';




export default function loadInfo() {
    return new Promise((resolve, reject) => {

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
