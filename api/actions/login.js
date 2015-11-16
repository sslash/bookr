import models from '../../models';

export default function login(req) {

    return new Promise((resolve, reject) => {

        models.User.findOne({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        })
        .then((res) => {
            if(!res) {
                console.log('login failed, empty result');
                return reject({message: 'Feil brukernavn eller passord'});
            }
            
            console.log('Login success', res);
            req.session.user = res;
            resolve(res);
        })
        .catch((err) => {
            console.log('login failed: ', err);
            reject(err);
        });

    });
}
