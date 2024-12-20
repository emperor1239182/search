function speak() {
    let text = document.getElementById("input").value;
    let ulter = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(ulter);
}


let result = document.getElementById("display");
let input = document.getElementById("input");
let search = document.getElementById("search");

search.addEventListener("click", () => {
    const text = input.value.trim(); // Get and trim user input
    fetchData(text); // Call fetchData with user input
});

const fetchData = async (text) => {
    result.innerHTML = "";
    if(text){
    try{
    const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=${encodeURIComponent(text)}`);
    const data = await response.json();

    if(data.query.search.length > 0 ){
        data.query.search.forEach(item => {
            const info = document.createElement("div");
            info.innerHTML = `<p><a href="https://en.wikipedia.org/wiki/${encodeURIComponent(item.title)}" target="_blank">${item.title}</a>: ${item.snippet}</p>`;
            result.appendChild(info);
        });
    }  else{
        result.innerHTML = "No result found";
    }
    }
    catch (error){
        console.log(error);
        result.innerHTML = "An error occurred while fetching data."
    }
} else{
    result.innerHTML = 'Enter a valid input'
}
    
};

