var recommedationsJson;

fetch('travel_recommendation_api.json')
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
})
.then(data => {
    console.log(data);
    recommedationsJson=data;
})

function search(){
    let query = document.getElementById("search_input").value;
    let lcQuery = query.toLowerCase().replace(/\s+/g, ' ').trim();
    let results = [];
    if(lcQuery == "country" || lcQuery == "countries"){
        results = recommedationsJson.countries;
    }
    if(lcQuery == "temple" || lcQuery == "temples"){
        results = recommedationsJson.temples;
    }
    if(lcQuery == "beach" || lcQuery == "beaches"){
        results = recommedationsJson.beaches;
    }
    displayResults(results);
}

function displayResults(results){
    let container = document.getElementById("results_segment");
    container.innerHTML="";

    if(results.length > 0){
        const sep = document.createElement('div');
        sep.className = 'separator';
        container.appendChild(sep);

        results.forEach(result => {
            const div = document.createElement('div');
            div.className = 'result';
          
            const img = document.createElement('img');
            img.className = 'result-image';
            img.src = result.imageUrl;
          
            const label = document.createElement('label');
            label.textContent = result.name;
          
            const p = document.createElement('p');
            p.style.color = 'gray';
            p.textContent = result.description;
          
            const btn = document.createElement('button');
            btn.className = 'result-button';
            btn.textContent = 'Visit';
          
            div.append(img, label, p, btn);
            container.appendChild(div);
          });
               
    }
}

document.getElementById("search_button").addEventListener('click', () => search())

function clear(){
    let container = document.getElementById("results_segment");
    container.innerHTML="";
}

document.getElementById("reset_button").addEventListener('click', () => clear())

