/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 10/11/2022 - 22:07:12
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 10/11/2022
    * - Author          : 
    * - Modification    : 
**/
const express =require('express');
const fs = require('fs-extra');
const multer = require('multer');
const excelToJson =require('convert-excel-to-json');

//server
const app = express();
app.use(express.json());

const port= 8551;

var upload = multer({ dest: 'uploads/' });


app.post('/read', upload.single('file'), (req, res) => { 
    try{
         if(req.file?.filename == null || req.file?.filename == "undefined")
         {
        res.status(400).json("No file!!");
  
    } else{
            var filePath = "uploads/" + req.file.filename;

            const excelData = excelToJson({
                sourceFile: filePath,
                header : {
                    rows:1,
                },
                columnToKey:{

                    "*" : "{{columnHeader}}",
                },
            });
         remove(filePath);
         res.status(200).json(excelData);
        }
    
  } catch(error){
res.status(500);
}

});

app.listen(port,() =>{
    console.log("It is running!");
})