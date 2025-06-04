const express = require('express');
const router = express.Router();
var XLSX = require('xlsx')
const glossaryEnglish = require('./public/glossaryEnglish.json')
var fs = require('fs');
const { redirect } = require('express/lib/response');
const { upperFirst } = require('lodash');

router.get('/glossary', glossary);
router.get('/sheets/:id', readFile);
router.get('/', home)
router.get('/resources', resources);
router.get('/contact-us', contactUs)
router.get('/all', allRender);
router.get('/about-us', renderAboutUs);
module.exports = router;

function renderAboutUs(req, res, next){
    res.render('aboutus', { 'cropName': "About-Us"})
}
function allRender(req, res, next){
    try {
        var workbook = XLSX.readFile(`./content/newcontent/english/All.xlsx`);
        var sheet_name_list = workbook.SheetNames;
        var rowsic = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
        var rowstl = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[1]]);
    } catch (error) {
        console.log(error)
    }
    try {
        var workbook = XLSX.readFile(`./content/newcontent/english/Intro.xlsx`);
        var sheet_name_list = workbook.SheetNames;
        var descriptionEnglish = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[1]]);
    } catch (error) {
        console.log(error)
    }
    try {
        var workbookHindi = XLSX.readFile(`./content/newcontent/hindi/Intro.xlsx`);
        var sheet_name_listHindi = workbookHindi.SheetNames;
        var descriptionHindi = XLSX.utils.sheet_to_json(workbookHindi.Sheets[sheet_name_listHindi[1]]);
    } catch (error) {
        console.log(error)
    }
 
    try {
        for (i = 0; i < descriptionEnglish.length; i++) {
            if (descriptionEnglish[i].cropEnglish === "All")
                var descriptionEnglishI = descriptionEnglish[i]
        }
    } catch (error) {
        console.log(error)
    }
    try {
        for (i = 0; i < descriptionHindi.length; i++) {
            if (descriptionHindi[i].cropEnglish == "All")
                var descriptionHindiI = descriptionHindi[i]
        }
    } catch (error) {
        console.log(error)
    }
 
    var myArray = [];

    for (var i = 0; i < rowsic.length; i++) {
        var string = rowsic[i].Season.split(',').map(function(item) {
            return upperFirst(item.trim());
        });
        for (j = 0; j < string.length; j++) {
            myArray.push(string[j]);
        }
    }
    var uniqueSeasons = myArray.filter((v, i, a) => a.indexOf(v) === i);
    

    myArray = [];
    for (var i = 0; i < rowsic.length; i++) {
        var string = rowsic[i].Caste.split(',').map(function(item) {
            return upperFirst(item.trim());
        });
        //console.log("STRINGS ARE:")
        for (j = 0; j < string.length; j++) {
            //console.log(string[j])
            myArray.push(string[j]);
        }
    }
    var uniqueCastes = myArray.filter((v, i, a) => a.indexOf(v) === i);

    myArray = [];
    for (var i = 0; i < rowsic.length; i++) {
        var string = rowsic[i].Geography.split(',').map(function(item) {
            return upperFirst(item.trim());
        });
        for (j = 0; j < string.length; j++) {
            myArray.push(string[j]);
        }
    }
    var cardType = [];
    var uniqueArr = [];
    for (i = 0; i < rowsic.length; i++)
        if (rowsic[i].Statement.toLowerCase().indexOf("youtube") > -1)
            cardType.push("Video");
        else if (rowsic[i].Statement.toLowerCase().indexOf("imagekit") > -1) {
        cardType.push("Image");
    } else
        cardType.push("Text");
    uniqueArr = cardType.filter((item, i, ar) => ar.indexOf(item) === i);
    var uniqueSoils = myArray.filter((v, i, a) => a.indexOf(v) === i);

    res.render("pages", {
        dataic: rowsic,
        datatl: rowstl,
        cropName: "All",
        cropNameHindi: "सभी खान-पान",
        soilfilter: uniqueSoils,
        seasonsfilter: uniqueSeasons,
        castefilter: uniqueCastes,
        typeFilter: uniqueArr,
        description: descriptionEnglishI.Text,
        descriptionHindi: descriptionHindiI.Text,
        image1: descriptionEnglishI.Image1,
        image1Hindi: descriptionEnglishI.Image1,
        caption1: descriptionEnglishI.Caption1,
        caption2: descriptionEnglishI.Caption2,
        image2: descriptionEnglishI.Image2,
        image2Hindi: descriptionEnglishI.Image2,
        caption1Hindi: descriptionHindiI.Caption1,
        caption2Hindi: descriptionHindiI.Caption2,
        hindiContent: false
    });
}
function glossary(req, res, next) {
    
    res.render("glossary", { 'cropName': "Glossary", 'glossaryEnglish': glossaryEnglish });
}

function resources(req, res, next) {
    try {
        var workbook = XLSX.readFile(`./content/Resources.xlsx`);
        var sheet_name_list = workbook.SheetNames;
        var primary = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
        var gazetteers = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[1]]);
        var research = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[2]]);
        var reports = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[3]]);
    } catch (error) {
        console.log(error)
    }
    var pageTitlePrimary = "Primary Material";
    var pageDescriptionPrimary = "These papers, presentations etc. are outputs of this research and touch on various aspects of our findings"
    var pageTitleGazetteers = "Colonial reports";
    var pageDescriptionGazetteers = "Reports and documents produced by the British (and occasionally native) officials in colonial India. While they reflect the bias of the colonial powers, they also provide useful information about the region such as natural formations, crops and wildlife. They also describe developments such as the introduction of railways and the construction of the Sarda canal, a major source of irrigation in the region. A post-independence gazetteer and supplementary gazetteer can also be found here - they documents more recent developments such as the spread of tubewell irrigation and the 1979-80 drought."
    var pageTitleResearch = "Research papers";
    var pageDescriptionResearch = "These published papers touch on various aspects of the history of western Avadh, from archeological investigations to narratives of peasant revolts, as well as dietary transitions and wild or uncultivated foods."
    var pageTitleReports = "Reports & articles";
    var pageDescriptionReports = "These reports and articles cover topics of interest such as uncultivated foods, changes in land use etc."
    res.render("resources", {
        cropName: "Resources",
        resourcePrimary: primary,
        resourceGazetteers: gazetteers,
        resourceResearch: research,
        resourceReports: reports,
        pageTitlePrimary: pageTitlePrimary,
        pageDescriptionPrimary: pageDescriptionPrimary,
        pageTitleGazetteers: pageTitleGazetteers,
        pageDescriptionGazetteers: pageDescriptionGazetteers,
        pageTitleResearch: pageTitleResearch,
        pageDescriptionResearch: pageDescriptionResearch,
        pageTitleReports: pageTitleReports,
        pageDescriptionReports: pageDescriptionReports,
    });
}

function convertToJSON(array) {
    var first = array[0].join()
    var headers = first.split(',');

    var jsonData = [];
    for (var i = 1, length = array.length; i < length; i++) {

        var myRow = array[i].join();
        var row = myRow.split(',');

        var data = {};
        for (var x = 0; x < row.length; x++) {
            data[headers[x]] = row[x];
        }
        jsonData.push(data);

    }
    return jsonData;
};

function readFile(req, res, next) {
    const id = req.params.id;
    var hindiContent = true;
    id.replace(/\s(.)/g, function(a) {
            return a.toUpperCase();
        })
        .replace(/\s/g, '')
        .replace(/^(.)/, function(b) {
            return b.toLowerCase();
        })
    const language = req.cookies.language;


    res.cookie("cropid", id, { maxAge: 900000, httpOnly: true })
    try {
        var workbook = XLSX.readFile(`./content/newcontent/english/${id}.xlsx`);
        var sheet_name_list = workbook.SheetNames;
        var rowstl = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[1]]);
        var rowsic = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

    } catch (error) {
        console.log(error)
        if (req.cookies.language == "hi")
            res.render('coming-soon-language', { "cropName": "Food histories" })
        else
            res.redirect("/");
    }
    try {
        var workbookHindi = XLSX.readFile(`./content/newcontent/hindi/${id}.xlsx`);
        var sheet_name_listHindi = workbookHindi.SheetNames;
        var rowstlHindi = XLSX.utils.sheet_to_json(workbookHindi.Sheets[sheet_name_listHindi[1]]);
        var rowsicHindi = XLSX.utils.sheet_to_json(workbookHindi.Sheets[sheet_name_listHindi[0]]);
    } catch (error) {
        console.log("ERROR READING HINDI CONTENT")
        hindiContent = false;
        var rowstlHindi = [];
        var rowsicHindi = [];
    }
    try {
        var workbook = XLSX.readFile(`./content/newcontent/english/Intro.xlsx`);
        var sheet_name_list = workbook.SheetNames;
        var descriptionEnglish = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[1]]);
    } catch (error) {
        console.log(error)
    }
    try {
        var workbookHindi = XLSX.readFile(`./content/newcontent/hindi/Intro.xlsx`);
        var sheet_name_listHindi = workbookHindi.SheetNames;
        var descriptionHindi = XLSX.utils.sheet_to_json(workbookHindi.Sheets[sheet_name_listHindi[1]]);
    } catch (error) {
        console.log(error)
    }
    var myArray = [];

    for (var i = 0; i < rowsic.length; i++) {
        var string = rowsic[i].Season.split(',').map(function(item) {
            return upperFirst(item.trim());
        });
        for (j = 0; j < string.length; j++) {
            myArray.push(string[j]);
        }
    }
    var uniqueSeasons = myArray.filter((v, i, a) => a.indexOf(v) === i);
    

    myArray = [];
    for (var i = 0; i < rowsic.length; i++) {
        var string = rowsic[i].Caste.split(',').map(function(item) {
            return upperFirst(item.trim());
        });
        //console.log("STRINGS ARE:")
        for (j = 0; j < string.length; j++) {
            //console.log(string[j])
            myArray.push(string[j]);
        }
    }
    var uniqueCastes = myArray.filter((v, i, a) => a.indexOf(v) === i);

    myArray = [];
    for (var i = 0; i < rowsic.length; i++) {
        var string = rowsic[i].Geography.split(',').map(function(item) {
            return upperFirst(item.trim());
        });
        for (j = 0; j < string.length; j++) {
            myArray.push(string[j]);
        }
    }
    var uniqueSoils = myArray.filter((v, i, a) => a.indexOf(v) === i);


    //hindi-filters
    try {
        myArray = [];
        for (var i = 0; i < rowsicHindi.length; i++) {
            var string = rowsicHindi[i].Season.split(',').map(function(item) {
                return item.trim();
            });
            for (j = 0; j < string.length; j++) {
                myArray.push(string[j]);
            }
        }

        var uniqueSeasonsHindi = myArray.filter((v, i, a) => a.indexOf(v) === i);
        myArray = [];
        for (var i = 0; i < rowsicHindi.length; i++) {
            var string = rowsicHindi[i].Caste.split(',').map(function(item) {
                return item.trim();
            });
            for (j = 0; j < string.length; j++) {
                myArray.push(string[j]);
            }
        }
        var uniqueCastesHindi = myArray.filter((v, i, a) => a.indexOf(v) === i);
        myArray = [];
        for (var i = 0; i < rowsicHindi.length; i++) {
            var string = rowsicHindi[i].Soil.split(',').map(function(item) {
                return item.trim();
            });
            for (j = 0; j < string.length; j++) {
                myArray.push(string[j]);
            }
        }
        var uniqueSoilsHindi = myArray.filter((v, i, a) => a.indexOf(v) === i);
    } catch (error) {
        console.log(error)
        var uniqueSeasonsHindi = [];
        var uniqueCastesHindi = [];
        var uniqueSoilsHindi = []
    }
    var cardType = [];
    var uniqueArr = [];
    for (i = 0; i < rowsic.length; i++)
        if (rowsic[i].Statement.toLowerCase().indexOf("youtube") > -1)
            cardType.push("Video");
        else if (rowsic[i].Statement.toLowerCase().indexOf("imagekit") > -1) {
        cardType.push("Image");
    } else
        cardType.push("Text");
    uniqueArr = cardType.filter((item, i, ar) => ar.indexOf(item) === i);
    cardTypeHindi = [];
    uniqueArrHindi = [];
    for (i = 0; i < rowsicHindi.length; i++)
        if (rowsicHindi[i].Statement.toLowerCase().indexOf("youtube") > -1)
            cardTypeHindi.push("Video");
        else if (rowsicHindi[i].Statement.toLowerCase().indexOf("imagekit") > -1)
        cardTypeHindi.push("Image");
    else
        cardTypeHindi.push("Text");
    uniqueArrHindi = cardTypeHindi.filter((item, i, ar) => ar.indexOf(item) === i);
    try {
        for (i = 0; i < descriptionEnglish.length; i++) {
            if (descriptionEnglish[i].cropEnglish.toLowerCase().indexOf(id.toLowerCase()) > -1)
                var descriptionEnglishI = descriptionEnglish[i]
        }
    } catch (error) {
        console.log(error)
        var description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis elit justo, sit amet tristique justo porttitor sit amet. In condimentum eros vel egestas tempor. Etiam tincidunt diam urna, idconsectetur erat tincidunt at. Aenean vitaeorci quam. Aliquam id risus nunc. Nunc efficitur pretium sapien. Phasellus lobortis a lorem eget blandit."
    }
    try {
        for (i = 0; i < descriptionHindi.length; i++) {
            if (descriptionHindi[i].cropEnglish.toLowerCase().indexOf(id.toLowerCase()) > -1)
                var descriptionHindiI = descriptionHindi[i]
        }
    } catch (error) {
        console.log(error)
        var description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis elit justo, sit amet tristique justo porttitor sit amet. In condimentum eros vel egestas tempor. Etiam tincidunt diam urna, idconsectetur erat tincidunt at. Aenean vitaeorci quam. Aliquam id risus nunc. Nunc efficitur pretium sapien. Phasellus lobortis a lorem eget blandit."
    }
    uniqueSeasons=uniqueSeasons.sort();
    uniqueCastes=uniqueCastes.sort();
    uniqueSoils=uniqueSoils.sort();
    res.render("pages", {
        crop: id,
        datatl: rowstl,
        dataic: rowsic,
        datatlHindi: rowstlHindi,
        dataicHindi: rowsicHindi,
        seasonsfilter: uniqueSeasons,
        castefilter: uniqueCastes,
        soilfilter: uniqueSoils,
        typeFilter: uniqueArr,
        typeFilterHindi: uniqueArrHindi,
        seasonsfilterHindi: uniqueSeasonsHindi,
        castefilterHindi: uniqueCastesHindi,
        soilfilterHindi: uniqueSoilsHindi,
        cropName: descriptionEnglishI.food,
        description: descriptionEnglishI.Text,
        image1: descriptionEnglishI.Image1,
        image2: descriptionEnglishI.Image2,
        caption1: descriptionEnglishI.Caption1,
        caption2: descriptionEnglishI.Caption2,
        cropNameHindi: descriptionHindiI.crop,
        descriptionHindi: descriptionHindiI.Text,
        image1Hindi: descriptionEnglishI.Image1,
        image2Hindi: descriptionEnglishI.Image2,
        caption1Hindi: descriptionHindiI.Caption1,
        caption2Hindi: descriptionHindiI.Caption2,
        hindiContent: hindiContent,
    });

}

function contactUs(req, res, next) {
    res.render('contact-us', { "cropName": "Contact Us" })
}

function home(req, res, next) {
    try {
        var workbooktl = XLSX.readFile(`./content/newcontent/english/Intro.xlsx`);
        var sheet_name_listtl = workbooktl.SheetNames;
        var introEnglish = XLSX.utils.sheet_to_json(workbooktl.Sheets[sheet_name_listtl[0]]);
    } catch (error) {
        console.log(error)
        if (req.cookies.language == "hi")
            res.render('coming-soon-language', { "cropName": "Food histories" })
        else
            res.redirect("/");
    }
    try {
        var workbooktlHindi = XLSX.readFile(`./content/newcontent/hindi/Intro.xlsx`);
        var sheet_name_listtlHindi = workbooktlHindi.SheetNames;
        var introHindi = XLSX.utils.sheet_to_json(workbooktlHindi.Sheets[sheet_name_listtlHindi[0]]);
    } catch (error) {
        console.log(error)
        var rowstlHindi = [];
        var rowsicHindi = [];
    }
    
    res.render('home', { 'cropName': "Home", 'homeTitle': introEnglish[0].Title, 'homeText1': introEnglish[0].Text, 'homeTitleHindi': introHindi[0].Title, 'homeTextHindi1': introHindi[0].Text });
}
