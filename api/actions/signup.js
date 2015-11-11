import models from '../../models';

export default function login(req) {

    return new Promise((resolve, reject) => {

        models.User.create({
            email: req.body.email,
            password: req.body.password
        })
        .then((res) => {
            const user = res.toJSON();
            req.session.user = user;
            resolve(user);
        })
        .catch(reject);
    });
}
