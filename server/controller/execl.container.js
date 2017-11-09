const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');

module.exports = function(req,res){
	let filename = (req.body.filename ? req.body.filename + Date.now() : Date.now()) + '.xlsx';


	try{
		let buffer = xlsx.build([{name:'mySheetName',data:req.body.data},'binary']);
		// fs.writeFileSync('user.xlsx', file, 'binary');
		


        fs.writeFile(path.resolve(__dirname ,'../static/',filename), buffer, function(err,file) {
        	if(err)return console.log('写入文件失败',err);

     		res.send({
     			filename:filename,
     			status:200
     		});

	  	});

	}catch(e){
		console.log(e)
	}

	

}