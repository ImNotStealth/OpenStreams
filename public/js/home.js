console.log("BOI");
$.getJSON("/api/video").done((data) => {
    console.log(data);
    for (const i in data) {
        const video = document.createElement("button");
        const img = document.createElement("img");
        video.classList.add("video");
        img.src = data[i].thumbnail;
        img.classList.add("video-img");
        video.appendChild(img);
        video.setAttribute("v-id", data[i].id);
        document.getElementsByClassName("container")[0].appendChild(video);

        video.addEventListener("click", (e) => {
          console.log("CLICK " + data[i].id);
          location.href = `/watch/${data[i].id}`;
        })
    }
})
