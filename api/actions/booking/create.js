import models from '../../../models';

export default function create(req) {
    return new Promise((resolve, reject) => {
        console.log('body: ', req.body);
        let booking = req.body;
        booking.UserId = req.session.user.id

        models.Booking.create(booking)
        .then(function(res) {
            resolve(res);
        })
        .catch(reject);
    });
}
