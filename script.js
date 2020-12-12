const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const linkedBtn = document.getElementById('linkedin');

let apiQuotes = [];
//Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show New Quote
function newQuote(){

    loading();
    //Pick a random quote from apiQutoes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    //Check if Autho field is blank and replace it with 'Unknown'
    if(!quote.author){
        authorText.textContent = 'Unknown'
    }else {
        authorText.textContent = quote.author;
    }
    // Check the quote length to determine the styling
    if(quote.text.length < 120){
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }   
    //Set Quote, Hide the Loder

    quoteText.textContent = quote.text;
    complete();
    
    //console.log(quote);
   


}

//Get Quotes From API
async function getQuotes(){
    loading();
    const proxyUrl = "https://immense-lowlands-07187.herokuapp.com/";
    const apiUrl = 'http://type.fit/api/quotes';
    try{
        const response = await fetch(proxyUrl + apiUrl);
        apiQuotes = await response.json();
        //console.log(apiQuotes[12]);
        newQuote();
    } catch(error){
        //Catch Error Here

    }
}

//Tweet a quote
//https://twitter.com/intent/tweet
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}
// Post quote linkedin
// find url
function linkQuote(){
    const linkedinUrl = `https://www.linkedin.com/feed?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(linkedinUrl, '_blank')

}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)
linkedBtn.addEventListener('click', linkQuote )
//On Load
getQuotes();
//newQuote();
//loading();