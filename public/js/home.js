console.log("BOI");
$.getJSON("/api/video").done((data) => {
    console.log(data);
    for (const i in data) {
        const cosmetic = document.createElement("button");
        const img = document.createElement("img");
        const titleBackground = document.createElement("div");
        const title = document.createElement("p");
        cosmetic.classList.add("cosmetic");
        img.src = data[i].icon;
        img.classList.add("cosmetic-img");
        titleBackground.classList.add("cosmetic-title-background");
        title.innerHTML = data[i].displayName;
        title.classList.add("cosmetic-title");
        titleBackground.appendChild(title);
        cosmetic.appendChild(img);
        cosmetic.appendChild(titleBackground);
        cosmetic.setAttribute("uuid", data[i].id);
        document.getElementsByClassName("cosmetic-grid")[0].appendChild(cosmetic);

        cosmetic.addEventListener("click", (e) => {
          console.log("CLICK " + data[i].id);
          location.href = `/cosmetics/manage/${data[i].id}`;
        })
    }
})
