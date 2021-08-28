const request =require('request');
const cheerio=require('cheerio');
const path=require("path");
const fs=require("fs");
const PDFDocument = require('pdfkit');
let url="https://github.com/topics";
request(url,f1);
function f1(error,response,html){
    if(error){
        console.log(error);
    }else if(response.status==202){
        console.log("page not found");
    }else{
        f2(html);
    }
}
function f2(html){
    let searchtool=cheerio.load(html);
    // let ans=searchtool(".topic-box");
    let ans=searchtool(".topic-box");
    for(let i=0;i<ans.length;i++){
        let atag=searchtool(ans[i]).find("a");
        let link=atag.attr("href");
        let fulllink=`https://github.com/${link}`;
        // console.log(fulllink+"+++++++++++++++++++ extract data"); 
        let foldername=fulllink.split('/').pop();
        // console.log(foldername);
        let folder=path.join(__dirname,foldername);
        // console.log(folder);
        makingdir(folder);
        // request(fulllink,f3);
        f3(fulllink,foldername);
    }
}
function f3(url,foldername){
  request(url,cb);
      function cb(error,response,html){
        if(error){
          console.log(error);
        }else if(response.statusCode==404){
          console.log("page not found");
        }else{
          f4(html,foldername);
        }
      }
}
function f4(html,foldername){
      let stool=cheerio.load(html);
      let box1=stool(".border.rounded.color-shadow-small h3");
      for(let i=0;i<8;i++){
        let twoatag=stool(box1[i]).find("a");
        let sectag=stool(twoatag[1]).attr("href");
        let full=`https://github.com/${sectag}`;
        let respname=full.split('/').pop();
        // console.log(respname);
        let subpath=path.join(__dirname,foldername,respname);
        // console.log(subpath);
        // makingdir(subpath);
        let fulltags=`https://github.com/${sectag}/issues`
        // console.log(fulltags);
       f5(fulltags,subpath);
        // request(fulltags,f5);
      }
  }
  function f5(fulltags,subpath){
    request(fulltags,cb1);
    function cb1(error,response,html){
      if(error){
        console.log(error);
      }else if(response.statusCode==404){
        console.log("page not found");
      }else{
        f6(html,subpath);
      }
    }
  }

  function f6(html,subpath){
      let sert=cheerio.load(html);
      let issues=sert(".js-navigation-container.js-active-navigation-container .Box-row .flex-auto");
      let arr=[];
      for(let i=0;i<8;i++){
       let iss=sert(issues[i]).find("a");
       let l=sert(iss).attr("href");
       arr.push(l);
      }
      let reppath=path.join(subpath+".pdf");
      let text=JSON.stringify(arr);
      let pdfDoc = new PDFDocument;
      pdfDoc.pipe(fs.createWriteStream(reppath));
      pdfDoc.text(text);
      pdfDoc.end();

//       console.log(reppath);
// fs.writeFileSync(reppath,JSON.stringify(arr));
       
console.log(arr);
arr=[];
  }

  function makingdir(path){
    if(fs.existsSync(path)==false){
      fs.mkdirSync(path);
    }
  }
