const detailsection = document.querySelector("#anime-detail-view");
detailsection.style.display = "block";
let currentPage = 1;
const limit = 14;
const loadMoreBtn = document.querySelector("#loadMore");
const backbtn = document.querySelector("#back-btn")
const obj = document.querySelector("#Search-result");
const Animecall = async () =>{
    try {
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
    document.querySelector(".hero").style.display = "none";
    document.querySelector("#search-view").style.display = "none";
    document.querySelector(".home-view").style.display = "none";
    const anime_title = document.querySelector("#anime-title");
    const anime_cover = document.querySelector("#anime-cover");
    const anime_description = document.querySelector("#anime-description");
    const episode_list = document.querySelector("#episode-list");
    const anime_player = document.querySelector("#anime-player");
    anime_cover.src =anime.images.jpg.image_url;
    anime_description.textContent = anime.synopsis || "not available"
    anime_title.textContent = anime.title;
    episode_list.innerHTML = ""; // Clear previous
    if (anime.episodes) {
    episode_list.textContent = `Episodes: ${anime.episodes}`;
    } else {
    episode_list.textContent = `Episodes info not available.`;
  }
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
        
})