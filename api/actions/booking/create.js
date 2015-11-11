import models from '../../../models';

export default function create(req) {
    return new Promise((resolve, reject) => {

        const booking = req.body;

        models.Booking.create(booking)
        .then(function(res) {
            resolve(res);
        })
        .catch(reject);
    });
}
