
const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

// Configura la carpeta de archivos estáticos (por ejemplo, donde se encuentra index.html)
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload());
app.use(cors());
app.use(express.json());

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

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