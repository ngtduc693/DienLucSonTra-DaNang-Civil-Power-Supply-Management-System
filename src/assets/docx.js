function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}


function urlToPromise(url) {
  return new Promise(function(resolve, reject) {
    PizZipUtils.getBinaryContent(url, function (err, data) {
          if(err) {
              reject(err);
          } else {
              resolve(data);
          }
      });
    });
  }

function generate(khachhang, duLieuTyLe, duLieuCongSuat, tongSoCongSuat) {
  loadFile("/assets/data/mytemplate.docx", function (error, content) {
    if (error) {
      throw error
    };

    // The error object contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
   
    console.log('* Du lieu khi xuat Bien ban thoa thuan: ');
    console.log("--Bat dau ");
    console.log(khachhang);
    console.log(duLieuTyLe);
    console.log(duLieuCongSuat);
    console.log(tongSoCongSuat);
    console.log("--Ket thuc ");
    var zip = new PizZip(content);
    var doc;
    try {
      doc = new window.docxtemplater(zip);
    } catch (error) {
      // Catch compilation errors (errors caused by the compilation of the template : misplaced tags)
      errorHandler(error);
    }
    doc.setData({
      
      "NGAYHT": new Date().getDate(),
      "THANGHT": (new Date().getMonth()) + 1,
      "NAMHT": new Date().getFullYear(),

      "TEN_KHANG": khachhang.TEN_KHANG,
      "DIA_CHI_KH": khachhang.DIA_CHI_KH,
      "DIA_CHI_DDO": khachhang.DIA_CHI_DDO,
      "DTHOAI": khachhang.DTHOAI,      
      "mdsd": duLieuCongSuat,
      "tyle": duLieuTyLe,
      "TCCS":  tongSoCongSuat.TCCS,
      "TCSL":tongSoCongSuat.TCSL,
     "TCHS":tongSoCongSuat.TCHS,
    "TCCSSD":tongSoCongSuat.TCCSSD,
      "TCTGSDN":tongSoCongSuat.TCTGSDN,
      "TCTCSSD": tongSoCongSuat.TCTCSSD,
      "TCHSD":tongSoCongSuat.TCHSD
    });

    try {
      debugger;
      // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
      doc.render();
      
    } catch (error) {
      // Catch rendering errors (errors relating to the rendering of the template : angularParser throws an error)
      errorHandler(error);
    }

    var out = doc.getZip().generate({
      type: "blob",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    }) //Output the document using Data-URI
    saveAs(out, khachhang.MA_KHACH_HANG +  "-" + khachhang.DTHOAI +  ".docx")
  })
}

async function generateFileDocRegSolar(data) {
  var dataStep1 =  await urlToPromise("/assets/data/DMT/BIEU MAU/1.Dang-Ky-Nhu-Cau-Lap-Dat-Dmtmn-.docx")
  var dataStep2 = await urlToPromise("/assets/data/DMT/BIEU MAU/2. Mau-Moi-Kiem-Tra-Dau-Noi-DMTMN-Duoi-50Kw-4-.docx")
  var dataStep3 = await  urlToPromise("/assets/data/DMT/BIEU MAU/3. PHIEU-TIEP-NHAN-Ho-So-De-Nghi-Dau-Noi-Du-An-DMTMN-Duoi-50Kw-1-.docx")
  var dataStep4 = await urlToPromise("/assets/data/DMT/BIEU MAU/4. BAN CAM KET.docx")
  var dataStep5 = await urlToPromise("/assets/data/DMT/BIEU MAU/5. De-Nghi-Ban-Dien-Mat-Troi.docx")
  var dataStep6 = await urlToPromise("/assets/data/DMT/BIEU MAU/6. Phu-Luc-4-1-Moi.docx")
  var dataStep7 = await urlToPromise("/assets/data/DMT/BIEU MAU/7. BB TREO THAO CONG TO 2 CHIEU.docx")
  var dataStep8 = await urlToPromise("/assets/data/DMT/BIEU MAU/8.HOP DONG MUA BAN DIEN MTMN.docx")

  var outputZip = new PizZip();

  // The error object contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).

  var zip1 = new PizZip(dataStep1);
  var zip2 = new PizZip(dataStep2);
  var zip3 = new PizZip(dataStep3);
  var zip4 = new PizZip(dataStep4);
  var zip5 = new PizZip(dataStep5);
  var zip6 = new PizZip(dataStep6);
  var zip7 = new PizZip(dataStep7);
  var zip8 = new PizZip(dataStep8);
  var doc1 = initDoc(zip1);
  var doc2 = initDoc(zip2);
  var doc3 = initDoc(zip3);
  var doc4 = initDoc(zip4);
  var doc5 = initDoc(zip5);
  var doc6 = initDoc(zip6);
  var doc7 = initDoc(zip7);
  var doc8 = initDoc(zip8);
  //setDataForDoc(doc,data);
  doc1.setData(data.BUOC_1).render();
  doc2.setData(data.BUOC_2).render();
  doc3.setData(data.BUOC_3).render();
  doc4.setData(data.BUOC_4).render();
  doc5.setData(data.BUOC_5).render();
  // doc6.setData(data.BUOC_6).render();
  doc7.setData(data.BUOC_7).render();
  doc8.setData(data.BUOC_8).render();

  try {
    var buffer1 =getBufferFromDoc(doc1);
    var buffer2 =getBufferFromDoc(doc2);
    var buffer3 =getBufferFromDoc(doc3);
    var buffer4 =getBufferFromDoc(doc4);
    var buffer5 =getBufferFromDoc(doc5);
    var buffer6 =getBufferFromDoc(doc6);
    var buffer7 =getBufferFromDoc(doc7);
    var buffer8 =getBufferFromDoc(doc8);

   

    

    outputZip.file("1.Dang-Ky-Nhu-Cau-Lap-Dat-Dmtmn-.docx", buffer1);
    outputZip.file("2. Mau-Moi-Kiem-Tra-Dau-Noi-DMTMN-Duoi-50Kw-4-.docx", buffer2);
    outputZip.file("3. PHIEU-TIEP-NHAN-Ho-So-De-Nghi-Dau-Noi-Du-An-DMTMN-Duoi-50Kw-1-.docx", buffer3);
    outputZip.file("4. BAN CAM KET.docx", buffer4);
    outputZip.file("5. De-Nghi-Ban-Dien-Mat-Troi.docx", buffer5);
    outputZip.file("6. Phu-Luc-4-1-Moi.docx", buffer6);
    outputZip.file("7. BB TREO THAO CONG TO 2 CHIEU.docx", buffer7);
    outputZip.file("8.HOP DONG MUA BAN DIEN MTMN.docx", buffer8);

  } catch (error) {
    // Catch rendering errors (errors relating to the rendering of the template : angularParser throws an error)
    errorHandler(error);
  }

  var outputBlob = outputZip.generate({
    type: "blob",
    compression: "DEFLATE",
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
});

  saveAs(outputBlob, "DangKyDienMatTroi.zip")

}


function setDataForDoc(doc, data) {
  doc.setData({
    data
  });
}

function getBufferFromDoc(doc) {
  var buffer = doc.getZip().generate({
    type: "arraybuffer",
    compression: "DEFLATE",
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
  return buffer;
}

function initDoc(zip) {
  var doc;
  try {
    doc = new window.docxtemplater(zip);
  } catch (error) {
    // Catch compilation errors (errors caused by the compilation of the template : misplaced tags)
    errorHandler(error);
  }
  return doc;
}
function replaceErrors(key, value) {
  if (value instanceof Error) {
    return Object.getOwnPropertyNames(value).reduce(function (error, key) {
      error[key] = value[key];
      return error;
    }, {});
  }
  return value;
}

function errorHandler(error) {
  console.log(JSON.stringify({
    error: error
  }, replaceErrors));

  if (error.properties && error.properties.errors instanceof Array) {
    var errorMessages = error.properties.errors.map(function (error) {
      return error.properties.explanation;
    }).join("\n");
    console.log('errorMessages', errorMessages);
    // errorMessages is a humanly readable message looking like this :
    // 'The tag beginning with "foobar" is unopened'
  }
  throw error;
}