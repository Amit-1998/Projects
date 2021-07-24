const puppeteer = require("puppeteer");
const fs = require("fs");
let json2xls = require('json2xls');
//const xlsx = require("xlsx")//npm install xlsx

let addresses = [];
//let contacts = [];

async function main(){
    let browser = await puppeteer.launch( { headless: false, defaultViewport: null, args: ["--start-maximized"]} );
    let pages = await browser.pages();
    let tab = pages[0];

    //await tab.goto("https://www.google.com");
    await landOnGoogle(tab);
    await tab.waitForTimeout(2000);
    await testing(tab);
    await tab.click(".I3evme a.sns1Sc");
    
    await vaccineCenters(tab);
    await tab.click("div.I3evme a");
    
    await hospitalBeds(tab);

    // await tab.goto("https://alpha2320.github.io/covid-19.io/index.html");
    
    // await tab.waitForTimeout(4000);
    // await covidResources(tab,"OxygenCylinders",0);
    
    // await tab.waitForTimeout(4000);
    // await covidResources(tab,"Hospitalbeds",2);
    
    // await tab.waitForTimeout(4000);
    // await covidResources(tab,"Onlineconsultation",3);
    
    // await tab.waitForTimeout(4000);
    // await covidResources(tab,"FoodSupply",4);
    
    // await tab.waitForTimeout(4000);
    // await covidResources(tab,"HomeQuarantine",5);
    
    // await tab.waitForTimeout(4000);
    // await covidResources(tab,"AmbulanceService",6);

};
main();

async function landOnGoogle(tab){
    await tab.goto("https://www.google.com");
    await tab.waitForTimeout(3000);
    await tab.type(".gLFyf.gsfi","coronavirus");
    await tab.keyboard.press("Enter");
}

async function testing(tab){
    await tab.waitForSelector('span[title="Testing"]',{visible: true});
    await tab.click('span[title="Testing"]');
    await tab.waitForSelector(".dbg0pd",{visible: true});
    await tab.click(".dbg0pd");
    await tab.waitForNavigation({waitUntil: "networkidle2"});
    let rows = await tab.$$(".cXedhc"); //21
    let allCentersNames = await tab.$$(".dbg0pd div");

    //let informations = await tab.$$(".cXedhc span.rllt__details.lqhpac div");
    let types = await tab.$$(".dXnVAb"); 
    let hospitaldetails = [];
    
    
    let allRowsDivs = await tab.$$(".VkpGBb");
    for(let i=0; i<allRowsDivs.length; i++){
        let rowIdiv = allRowsDivs[i];
        await rowIdiv.click();
        await tab.waitForTimeout(2000);
        let addressNPhone = await tab.$$(".zloOqf.PZPZlf span.LrzXr");
        let address = await tab.evaluate(function(elem){ return elem.textContent; },addressNPhone[0]);
        //let phone = await tab.evaluate(function(elem){ return elem.textContent; },addressNPhone[1]);;
        addresses.push(address);
        //contacts.push(phone);
    }  
    

    for(let i=0; i<rows.length; i++){
        let name = await tab.evaluate(function(elem){ return elem.textContent; },allCentersNames[i]);
        let info = addresses[i];
        let type = await tab.evaluate(function(elem){ return elem.textContent; },types[i]);
        
        let parts = type.split('·');
        let ForwhichPatients = parts[0];    
        let typeOfHospital = parts[1];
        hospitaldetails.push( {
            "Name" : name,
             "information" : info,
             "OnlyFor" : ForwhichPatients,
             "Hospital" : typeOfHospital 
        });
        if(i==rows.length-1){
            fs.writeFileSync("TestingCenters.json",JSON.stringify(hospitaldetails));
        }
        
    }
    
}

async function vaccineCenters(tab){
     await tab.waitForTimeout(3000);
     await tab.click(".gLFyf.gsfi");
     await tab.keyboard.down("Control");
     await tab.keyboard.press("A");
     await tab.keyboard.up("Control");
     await tab.type(".gLFyf.gsfi","vaccine centres near me");
     await tab.keyboard.press("Enter");
     await tab.waitForTimeout(3000);

     await tab.waitForSelector(".l44Vof.H93uF",{visible: true,timeout: 2000});
     await tab.click(".l44Vof.H93uF");
     await tab.waitForNavigation({waitUntil: "networkidle2"});
     let rows = await tab.$$(".VkpGBb");
     let vaccCentersNames = await tab.$$("div.dbg0pd");
     let ReqnLim = await tab.$$("div.dXnVAb");
     let vaccHospdetails = [];
     //"span.rllt__details.lqhpac"
     //.MJ1Rwc.raB6Pe
    //let allRowsDivs = await tab.$$(".dbg0pd div");
    let addressesForVacciHosp = [];
    for(let i=0; i<rows.length; i++){
         let rowIdiv = rows[i];
         await rowIdiv.click();
         await tab.waitForTimeout(2000);
         //await tab.evaluate(function(elem){ return elem.click(); },rowIdiv);
         let address = await tab.$(".zloOqf.PZPZlf span.LrzXr");
         
         let addresstext = await tab.evaluate(function(elem){ return elem.textContent; },address);
         
         addressesForVacciHosp.push(addresstext);
    }
    

    for(let i=0; i<rows.length; i++){
        let name = await tab.evaluate(function(elem){ return elem.textContent; },vaccCentersNames[i]);
        let info = addressesForVacciHosp[i];
        

        // let req = await tab.$$("span.BI0Dve span.ar1Tgb");
        // let covid19string = await tab.evaluate(function(elem){ return elem.textContent; },req[0]);
        
        
        let data = await tab.evaluate(function(elem){ return elem.textContent; },ReqnLim[i]); 
        let parts = data.split("\n");
        let onlyReq = parts[0];
        let onlyLim = parts[1];
        // console.log("-------------------------------------");
        // console.log(data);
        // //console.log(onlyLim);
        // console.log("-------------------------------------");
        // if(onlyReq==="COVID-19 hospital"){
        //     onlyReq = "Not Available";
        // }
        vaccHospdetails.push( {
             "VaccineCentre" : name,
             "Info" : info,
             "Requirements" : onlyReq,
             "Limit" : onlyLim
        });

       if(i==rows.length-1){
           fs.writeFileSync("VaccineCenters.json",JSON.stringify(vaccHospdetails));
       }
    }


}


async function hospitalBeds(tab){
    await tab.waitForTimeout(2000);
    // await tab.click("div input.gLFyf.gsfi");
    // await tab.keyboard.down("Control");
    // await tab.keyboard.press("A");
    // await tab.keyboard.up("Control");
    // await tab.type("div input.gLFyf.gsfi","Hospital beds for Covid Patients near me");
    // await tab.keyboard.press("Enter");
    
    tab.goto("https://dshm.delhi.gov.in/mis/(S(tjrhcih50rrxkiozszvg345s))/Private/frmFreeBedMonitoringReport.aspx");
    await tab.waitForTimeout(2000);
    
    let HospitalBedDetails = [];
    let allRows = await tab.$$(".DataGridBody tbody tr"); //53
    
    //let firstR = allRows[1];
    let itsTds = await tab.$$eval(".DataGridBody tbody tr",rows => { return Array.from(rows,row => { const cols = row.querySelectorAll('td'); return Array.from(cols,col => col.textContent); } ); } );
    
    //console.log(itsTds);
    // for(let i=1; i<allRows.length; i++){
    //     let oneHospitalRow = allRows[i];
    //     let alltds = await tab.evaluate(function(elem){ return elem.getAttribute(td); },oneHospitalRow);

    // }
    for(let i=1; i<allRows.length; i++){

         let hospitalId = itsTds[i][0];
         let hospitalName = itsTds[i][1];
         let totFreeeBeds = itsTds[i][2];
         let totFCBWOV = itsTds[i][3];
         let totFCBWV = itsTds[i][4];
         let totFNCB = itsTds[i][5];
         let AFCBWOV = itsTds[i][6];
         let AFCBWV = itsTds[i][7];
         let AFNCB = itsTds[i][8];
         let hospPhoneNo = itsTds[i][9];
         let contPerName = itsTds[i][10];
         let contPersonMob = itsTds[i][11];
         let LiasonOffNum = itsTds[i][12];

        //  HospitalBedDetails.push({
        //       "Hospital ID": hospitalId,
        //       "Hospital Name": hospitalName,
        //       "Total Free Bed": totFreeeBeds,
        //       "Total Free Critical Bed (without Ventilator)": totFCBWOV,
        //       "Total Free Critical Bed (with Ventilator)": totFCBWV,
        //       "Total Free Non-Critical Bed": totFNCB,
        //       "Available Free Critical Bed (without Ventilator)": AFCBWOV,
        //       "Available Free Critical Bed (with Ventilator)": AFCBWV,
        //       "Available Free Non-Critical Bed": AFNCB,
        //       "Hospital Phone No." : hospPhoneNo,
        //       "Contact Person Name": contPerName,
        //       "Contact Person Mobile": contPersonMob,
        //       "Liason Officer Number": LiasonOffNum
        //  });

        let obj = {
            "Hospital ID": hospitalId,
            "Hospital Name": hospitalName,
            "Total Free Bed": totFreeeBeds,
            "Total Free Critical Bed (without Ventilator)": totFCBWOV,
            "Total Free Critical Bed (with Ventilator)": totFCBWV,
            "Total Free Non-Critical Bed": totFNCB,
            "Available Free Critical Bed (without Ventilator)": AFCBWOV,
            "Available Free Critical Bed (with Ventilator)": AFCBWV,
            "Available Free Non-Critical Bed": AFNCB,
            "Hospital Phone No." : hospPhoneNo,
            "Contact Person Name": contPerName,
            "Contact Person Mobile": contPersonMob,
            "Liason Officer Number": LiasonOffNum
        } 
        HospitalBedDetails.push(obj);

         

         if(i==allRows.length-1){
            fs.writeFileSync("HospBeddetails.json",JSON.stringify(HospitalBedDetails));        
            let xls = json2xls(HospitalBedDetails);
            fs.writeFileSync("HospBedsdata.xlsx",xls,"binary");
         }
         
    }
     
}


// async function covidResources(tab,boxName,i){
//      await tab.waitForSelector(".text-2xl.font-semibold.items-center.py-6",{visible: true});
//      let boxes = await tab.$$(".text-2xl.font-semibold.items-center.py-6");
//      await tab.waitForTimeout(4000);
//      await tab.evaluate(function(elem){ return elem.click(); },boxes[i]);
     
//      await tab.waitForSelector(".text-xl.font-semibold.my-2",{visible: true});
//      let names = await tab.$$(".text-xl.font-semibold.my-2");
//      let info = await tab.$$(".flex.space-x-2.text-gray-400.text-sm");
//      let verifiedAt = await tab.$$(".text-base.text-gray-400.font-semibold");
     
//      let j=0;
//      let box = [];
//      for(let i=0; i<names.length; i++){
//          let name = await tab.evaluate(function(elem){ return elem.textContent},names[i]);
//          j = 2*i;
//          let information1 = await tab.evaluate(function(elem){ return elem.textContent},info[j]);
//          //let parts = information1.split("\n");
//          //let info1 = parts.join("");
         
//          let information2 = await tab.evaluate(function(elem){ return elem.textContent},info[j+1]);
//          let verify = await tab.evaluate(function(elem){ return elem.textContent},verifiedAt[i]);
//          box.push({
//              "Name": name,
//              "Information1": information1,
//              "Information2": information2,
//              "Verified at": verify 
//          });
//          if(i==name.length-1){
//              fs.writeFileSync(boxName + ".json",JSON.stringify(box));
//          }
//         await tab.waitForTimeout(3000);
//         //await tab.goBack();
//         await tab.click('a[href="./index.html"]');
//      }
// }

