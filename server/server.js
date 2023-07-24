
const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const app = express();

const port = process.env.PORT || 3000;

app.use(fileUpload());
app.use(cors());
app.use(express.json());

app.post("/upload",(req,res)=>{
    console.log(req.files.file);
    res.send(`${req.files.file.name}`)
    
    /* fileUpload.mv(req.files.file.) */
})

app.set('port', port);

app.listen(app.get('port'), () =>{ 
    console.log('server on port ' + app.get('port') )
})


module.exports = app ;