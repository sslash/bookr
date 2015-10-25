import models from '../../models';




export default function loadInfo() {
    return new Promise((resolve, reject) => {

        models.Booking.find()
        .then((res) => {
            resolve(res);
        })
        .catch(reject);
    });
}
