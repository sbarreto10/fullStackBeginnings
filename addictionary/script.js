const capitalize_first = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const createElementWithAtt = (tag, att, value) => {
   let element = document.createElement(tag);
   element.setAttribute(att, value);
   return element;
}

function addData(data, where){
   if(data.title == "No Definitions Found"){
      where.innerHTML = `<span id=\"no-def-found\">Oops! The word you're looking for is on vacation from our dictionary.<span>`;
      return;
   }

   where.innerHTML += "<h1>Results:</h1>";
   let results_list = createElementWithAtt("ul", "id", "results-list");

   data.forEach(w => {
      let result = createElementWithAtt("li", "class", "result");
      let meanings_list = createElementWithAtt("ul", "class", "meanings-list");
     
      w.meanings.forEach(m => {
         let meaning = createElementWithAtt("div", "class", "meaning");
         let POS = m.partOfSpeech;
         meaning.innerHTML += `<h2>${capitalize_first(w.word)} (${POS}):</h2>`;

         let def_box = createElementWithAtt("div", "class", "def-box");
         def_box.innerHTML += "<h3>Definitions:</h3>"
         let def_list = document.createElement("ul");
         m.definitions.forEach(def => def_list.innerHTML += `<li class="m-li">${def.definition}</li>`);
         def_box.appendChild(def_list);
         meaning.appendChild(def_box);
            
         if(m.synonyms.length){
            let syn_box = createElementWithAtt("div", "class", "syn-box");
            syn_box.innerHTML += "<h3>Synonyms:</h3>"
            let syn_list = document.createElement("ul");
            m.synonyms.forEach(syn => syn_list.innerHTML += `<li class="m-li">${capitalize_first(syn)}</li>`);
            syn_box.appendChild(syn_list);
            meaning.appendChild(syn_box);
         }

         if(m.antonyms.length){
            let ant_box = createElementWithAtt("div", "class", "ant-box");
            ant_box.innerHTML += "<h3>Antonyms:</h3>"
            let ant_list = document.createElement("ul");
            m.antonyms.forEach(ant => ant_list.innerHTML += `<li class="m-li">${capitalize_first(ant)}</li>`);
            ant_box.appendChild(ant_list);
            meaning.appendChild(ant_box);
         }

         meanings_list.appendChild(meaning);
      });

      result.appendChild(meanings_list);
      results_list.appendChild(result);
   });

   where.appendChild(results_list);
}

function showResults(url, where){
   fetch(url)
   .then((data) => data.json())
   .then((res) => {
      where.innerHTML = "";
      console.log(res);
      addData(res, where);
   })
   .catch((err) => where.innerHTML += err);
}

const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const results_box = document.querySelector("#results");
const search_box = document.querySelector("#search-box");
const search_form = document.querySelector("#search-form");

const where_to_show = results_box;

search_form.addEventListener("submit", (e) => {
   e.preventDefault();
   where_to_show.innerHTML = "";
   if(/^[a-zA-Z]+$/.test(search_box.value)){
      where_to_show.innerHTML = "<img src=\"ZKZg.gif\" alt=\"loading...\">";
      showResults(url+search_box.value.toLowerCase(), results_box);
   }
});

