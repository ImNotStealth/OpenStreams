$.getJSON("/api/video").done((data) => {
    for (const i in data) {
        const video = document.createElement("button");
        const img = document.createElement("img");
        video.classList.add("video");
        img.src = data[i].thumbnail;
        img.classList.add("video-img");
        video.appendChild(img);
        document.getElementsByClassName("container")[0].appendChild(video);

        video.addEventListener("click", (e) => {
          location.href = `/watch/${data[i].id}`;
        })
    }
})
