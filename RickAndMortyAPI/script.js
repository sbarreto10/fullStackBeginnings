const capitalize_first = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const createElementWithAtt = (tag, att, value) => {
   let element = document.createElement(tag);
   element.setAttribute(att, value);
   return element;
}

const getSeasonEpisode = (code) => {
   let match = code.match(/S(\d+)E(\d+)/);
   return [parseInt(match[1]),parseInt(match[2])];
}

const baseURL = "https://rickandmortyapi.com/api"

async function getData(url){
   const res = await fetch(url);
   const data = await res.json();
   return data;
}

async function formatEpisodes(c, seasons = {}){
   for(const ep of c.episode){
      [_s, _e] = getSeasonEpisode((await getData(ep)).episode)
      if(!(_s in seasons)){
         seasons[_s] = [_e]
      }else{
         seasons[_s].push(_e);
      }
   }
   return seasons;
}

async function createSeasonExplorerBox(c, id, seasonsLinks){
   const seasons = await formatEpisodes(c);
   for(const e of Object.entries(seasons)){
      seasonsLinks.innerHTML += ` <span class="n-season" id="c-${id}-s-${e[0]}">${e[0]}<div class="episode-box" id="c-${id}-s-${e[0]}-box">on episodes:</div></span>`;
      seasonsLinks.addEventListener("mouseover", (ev) => {
         if(/^c-\d+-s-\d+$/.test(ev.target.id)){
            document.querySelector("#"+ev.target.id+"-box").style.display = "block";
         }
      })
      seasonsLinks.addEventListener("mouseout", (ev) => {
         if(/^c-\d+-s-\d+$/.test(ev.target.id)){
            document.querySelector("#"+ev.target.id+"-box").style.display = "none";
         }
      })
      for(const nEp of e[1]){
         document.querySelector(`#c-${id}-s-${e[0]}-box`).innerText += ` ${nEp}`;
      };
   };
}

function newCard(id){
   const card = createElementWithAtt("div", "class", "card");
   const cardImg = document.createElement("img");
   const cardText = createElementWithAtt("div", "class", "card-text");
   const cardLinks = createElementWithAtt("div", "class", "card-links");
   const seasonsLinks = createElementWithAtt("div", "class", "seasons-links");
   const deadText = createElementWithAtt("div", "class", "dead-text");

   getData(`${baseURL}/character/${id}`)
   .then(c => {
      deadText.innerText = c.status=="Dead" ? "Dead" : "";
      cardImg.src = c.image;
      cardText.innerHTML += `<span class="char-name">${c.name}</span><br><span class="char-species">${c.species}</span>, <span class="char-gender">${c.gender}</span><br><span class="char-type">${c.type}</span>`;
      locationClass = (c.location.name=="unknown")?`class="unknown-location"`:`class="current-location"`;
      originClass = (c.origin.name=="unknown")?`class="unknown-location"`:`class="current-location"`;
      cardLinks.innerHTML += `
      Origin: <span ${originClass} onclick=loadLocation("${c.location.url}")>${c.origin.name}</span><br>
      Location: <span ${locationClass} onclick=loadLocation("${c.location.url}")>${c.location.name}</span><br>`;
      if(c.episode.length){
         seasonsLinks.innerText = "Appears on seasons:";
         cardLinks.appendChild(seasonsLinks);
         createSeasonExplorerBox(c, id, seasonsLinks);
      }
   });

   card.appendChild(deadText)
   card.appendChild(cardImg);
   card.appendChild(cardText);
   card.appendChild(cardLinks);

   return card;
}

function loadLocation(url){
   document.querySelector("main").innerHTML = "";
   document.querySelector("main").innerHTML += "<span class=current-location onclick=loadRandomCharacterTable(20)>GO BACK</span>";
}

function loadRandomCharacterTable(size){
   document.querySelector("main").innerHTML = "";
   const ids = [];
   for(let i=0; i<size; i++){
      let randId = Math.ceil(Math.random()*826);
      while (ids.includes(randId)) {
         randId = Math.ceil(Math.random()*826);
      }
      ids.push(randId);
      document.querySelector("main").appendChild(newCard(randId));
      
   }
}

loadRandomCharacterTable(20);