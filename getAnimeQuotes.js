function downloadJSONContent(jsonData, name, type) {
	let text = JSON.stringify(jsonData);
    let a = document.createElement("a");
    let file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}

//Global variables
let animeQuotes = []
let totalPages = 426;

function addId(quote,index){
	quote.quote_id = index + 1;
	return quote;
}


function collectQuotes(quotePage,quoteArray){
	let quoteContainers = $(quotePage).find("div.quoteSmall.droppable")
	for(let i = 0; i < quoteContainers.length; i++){
		let quoteDiv = $(quoteContainers[i]).find("div.quote");
		let quoteChildren = quoteDiv.children();
		let character = $(quoteChildren[0]).find("a")[0].innerText
		let anime = $(quoteChildren[1]).find("a")[0].innerText.substr(1).slice(0, -1)
		let quote = $(quoteChildren[4])[0].innerText
		let newQuote = {
		 "anime" : anime,
		 "quote" : quote,
		 "character" : character
		}
		quoteArray.push(newQuote);
	}
}

function loadPage(currentPage){
	if(currentPage <= totalPages) {		
		let div = document.createElement('div');
		let pageUrl = "http://www.less-real.com/quotes?p=" + currentPage;
		console.log('-----------page No:: ' + currentPage + '  ----------');
		$(div).load(pageUrl,function(){ 
			collectQuotes(div,animeQuotes);
			loadPage(++currentPage)
		});
	}
	else {
		console.log('----all pages loaded : Downloading content---');
		let quotes = animeQuotes.map(addId)
		downloadJSONContent(quotes, 'animeQuotes.json', 'text/plain');
	}
}

loadPage(1);
