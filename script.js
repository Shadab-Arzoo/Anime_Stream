const RandomBtn = document.getElementById("Random");
const Home = document.querySelectorAll("#home, #logo");
const genreResultsContainer = document.createElement("div");
genreResultsContainer.classList = "anime-grid";
genreResultsContainer.id = "Genrecontainer"
const Genre_moreBtn = document.querySelector("#Genre_moreBtn");
const Search_More_Btn = document.getElementById("Search_More_Btn");
const Genres_Section = document.getElementById("Genres_Section");
Genres_Section.appendChild(genreResultsContainer);
const Genres = document.getElementById("Genres");
const Search_Results = document.querySelector("#search-results")
const detailsection = document.querySelector("#anime-detail-view");
detailsection.style.display = "block";
let HomePage = 1;
let SearchPage = 1;
let GenrePage =1;
const limit = 14;
const loadMoreBtn = document.querySelector("#loadMore");
const backbtn = document.querySelector("#back-btn")
const obj = document.querySelector("#Search-result");
const Animecall = async () =>{
    try {
    detailsection.style.display = "none";
    console.log("Fetching data");
    const anime =  await fetch(`https://api.jikan.moe/v4/top/anime?page=${HomePage}&limit=${limit}`); 
    const data = await anime.json();
    const animeList = data.data;
    animeList.forEach(anime => {
    const card = document.createElement("div");
    card.classList.add("anime-card");
    card.innerHTML =  `<img src="${anime.images.jpg.image_url}" alt="${anime.title}">
        <h3>${anime.title}</h3>
     `;
    card.addEventListener("click",()=>{
        ShowAnimeDetails(anime);
    })
    obj.appendChild(card);
    
    });
 } catch (error) {
    console.log("Noooo");
 }
}
Animecall();
loadMoreBtn.addEventListener("click",()=>{
    HomePage++
    Animecall();
})
function ShowAnimeDetails(anime){
    Genres_Section.style.display = "none";
    detailsection.style.display = "block";
    document.querySelector(".hero").style.display = "none";
    document.querySelector("#search-view").style.display = "none";
    document.querySelector(".home-view").style.display = "none";
    document.querySelector("#Genrecontainer").style.display = "none";
    document.querySelector("#Genre_moreBtn").style.display = "none";
    const anime_title = document.querySelector("#anime-title");
    const anime_cover = document.querySelector("#anime-cover");
    const anime_description = document.querySelector("#anime-description");
    const episode_list = document.querySelector("#episode-list");
    const video = document.querySelector(".video");
    video.innerHTML = `<iframe id="anime-player" controls style="display: none;"></iframe> `;
    const anime_player = document.querySelector("#anime-player");
    anime_cover.src =anime.images.jpg.image_url;
    anime_description.textContent = anime.synopsis || "not available"
    anime_title.textContent = anime.title;
    const Episode_Function = async () => {
        try {
            console.log("Episode");
            const episode = await fetch(`https://api.jikan.moe/v4/anime/${anime.mal_id}/episodes`);
            const response =  await episode.json();
            const data = response.data
            console.log(data);
            data.forEach(episode=>{
                const ep = document.createElement("div");
                ep.innerHTML = `<h3>Episode ${episode.mal_id} : ${episode.title || "Untitled"}</h3>
                <h3>Score : ${episode.score}</h3>`
                episode_list.append(ep);
            })
        } catch (error) {
            console.log("Whyyyyy")
        }
    }
   episode_list.innerHTML = "";
   Episode_Function();
    if(anime.trailer && anime.trailer.embed_url){
        anime_player.src = anime.trailer.embed_url;
        anime_player.style.display = "block";
    }else{
        anime_player.style.display = "none";
    }
}
backbtn.addEventListener("click",()=>{
    document.querySelector(".hero").style.display = "block";
    document.querySelector(".home-view").style.display = "block";
    detailsection.style.display = "none";
    const video = document.querySelector(".video");
    const anime_player = document.querySelector("#anime-player");
    video.removeChild(anime_player);     
})
const Search_Bar = document.querySelector("#Search-Bar");
const Search_btn = document.querySelector("#Search");
Search_btn.addEventListener("click",()=>{
SearchPage = 1;
document.querySelector("#search-view").style.display = "block";
document.querySelector(".hero").style.display = "none";
document.querySelector(".home-view").style.display = "none";
detailsection.style.display = "none";
Search_Results.innerHTML = "";
search();
})

const search = async () => {
    const query = Search_Bar.value.trim();
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=7&page=${SearchPage}`);
    const data = await response.json();
    const result = data.data;
    if (result.length === 0) {
  Search_Results.innerHTML = "<p>No results found. Try a different anime name 👀</p>";
  return;
}
    console.log("Searching Resulttt");
    result.forEach(search=>{
    const Search_Card = document.createElement("div");
    Search_Card.classList.add("anime-card");
    Search_Card.innerHTML =  `<img src="${search.images.jpg.image_url}" alt="${search.title}">
        <h3>${search.title}</h3>
     `;   
    Search_Card.addEventListener("click",()=>{
    ShowAnimeDetails(search);
    })
    Search_Results.appendChild(Search_Card);
    })
}    
    Search_More_Btn.addEventListener("click",()=>{
    SearchPage++
    search();        
    })
Search_Bar.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    Search_btn.click();
  }
});
const Body = document.querySelector("body")
let isLightMode = false;
function ChangeMode(){
    if(isLightMode == false){
    Body.style.backgroundColor = "white";
    isLightMode = true;
    }else{
    Body.style.backgroundColor = "black";
    isLightMode = false;
    }
}
const LightMode = document.getElementById("LightMode");
LightMode.addEventListener("click",()=>{
  ChangeMode();
})
Genres.addEventListener("click",()=>{
    Genres_Section.style.display = "block";
    detailsection.style.display = "none";
    document.querySelector(".hero").style.display = "none";
    document.querySelector("#search-view").style.display = "none";
    document.querySelector(".home-view").style.display = "none";
})
const genre_btn = document.querySelectorAll(".genre-btn");
genre_btn.forEach(button=>{
button.addEventListener("click",()=>{
    genreResultsContainer.innerHTML ="";
Genre_moreBtn.style.display = "block";
const Genres_Result = async () =>{
    try {
        const response = await fetch(`https://api.jikan.moe/v4/anime?genres=${button.dataset.genre}&limit=7&page=${GenrePage}`)
        const data = await response.json();
        const Genre_data = data.data;
        Genre_data.forEach(Genres_Result_I => {
        const Genre_Card = document.createElement("div");
        Genre_Card.classList.add("anime-card");
        Genre_Card.innerHTML = `<img src="${Genres_Result_I.images.jpg.image_url}" alt="${Genres_Result_I.title}">
        <h3>${Genres_Result_I.title}</h3>
     `;   
    Genre_Card.addEventListener("click",()=>{
    ShowAnimeDetails(Genres_Result_I);
    })
    genreResultsContainer.appendChild(Genre_Card);
    })
    } catch (error) {
        console.log("Show it why wont u work")
    }
}
Genres_Result();
Genre_moreBtn.addEventListener("click",()=>{
    GenrePage++;
    Genres_Result();
})
})
})
Home.forEach(search=>{
search.addEventListener("click",()=>{
    document.querySelector(".hero").style.display = "block";
    document.querySelector(".home-view").style.display = "block";
    detailsection.style.display = "none";
    const video = document.querySelector(".video");
    const anime_player = document.querySelector("#anime-player");
    video.removeChild(anime_player);   
})
})
RandomBtn.addEventListener("click",()=>{
    const Random = async ()=>{
        try {
            response = await fetch(`https://api.jikan.moe/v4/random/anime`);
            const data = await response.json();
            const RandomAnime = data.data;
            ShowAnimeDetails(RandomAnime);
        } catch (error) {
            console.log("Random didnt work")
        }
    }
    Random();
})