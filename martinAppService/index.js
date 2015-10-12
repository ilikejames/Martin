
var seneca = require('seneca')()


seneca
.use( require('./Statements') , {} )
.use( require('./Users'), {} )
.listen();

return;








