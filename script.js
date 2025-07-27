let limit_Search = 7;
 const Search_Results = document.querySelector("#search-results")
const detailsection = document.querySelector("#anime-detail-view");
detailsection.style.display = "block";
let currentPage = 1;
const limit = 14;
const loadMoreBtn = document.querySelector("#loadMore");
const backbtn = document.querySelector("#back-btn")
const obj = document.querySelector("#Search-result");
const Animecall = async () =>{
    try {
    detailsection.style.display = "none";
    console.log("Fetching data");
    const anime =  await fetch(`https://api.jikan.moe/v4/top/anime?page=${currentPage}&limit=${limit}`); 
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
    currentPage++
    Animecall();
})
function ShowAnimeDetails(anime){
    detailsection.style.display = "block";
    document.querySelector(".hero").style.display = "none";
    document.querySelector("#search-view").style.display = "none";
    document.querySelector(".home-view").style.display = "none";
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
document.querySelector("#search-view").style.display = "block";
document.querySelector(".hero").style.display = "none";
document.querySelector(".home-view").style.display = "none";
detailsection.style.display = "none";
obj.innerHTML = "";
search();
})

const search = async () => {
    const query = Search_Bar.value.trim();
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=${limit_Search}`);
    const data = await response.json();
    const result = data.data;
    console.log("Searching Resulttt");
    result.forEach(search=>{
    const Search_Card = document.createElement("div");
    Search_Card.classList.add("anime-card");
    Search_Card.innerHTML =  `<img src="${search.images.jpg.image_url}" alt="${search.title}">
        <h3>${search.title}</h3>
     `;   
    Search_Results.appendChild(Search_Card);
    })
}    
const Search_More_Btn = document.createElement("button")
    Search_More_Btn.addEventListener("click",()=>{
    limit_Search = limit_Search + limit_Search;
    search();        
    })
Search_Results.appendChild(Search_More_Btn);