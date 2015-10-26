export default function create(req) {
    return new Promise((resolve) => {

        const booking = req.body;
        console.log('body: ', booking);

        resolve({});
    });
}
