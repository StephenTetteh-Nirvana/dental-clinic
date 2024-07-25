const path = require('path')


module.exports = {
    entry: {
     login: './Login/index.js',
     register: './Register/index.js',
     booking: './Booking/booking.js',
     index: './index.js',
    },
    output: {
        filename: '[name].bundle.js',
        path:path.resolve(__dirname,'dist'),
    },
    mode:"development"
}