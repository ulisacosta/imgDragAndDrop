const express = require('express')

const app = express();

const port = process.env.PORT  ;

app.set('port', port);

app.listen(app.get('port'), () =>{ 
    console.log('server on port ' + app.get('port') )
})