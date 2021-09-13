const menuOpen = document.querySelector(".menu");
const menuClose = document.querySelector(".close");
const overlay = document.querySelector(".overlay");
const buttons = document.getElementsByClassName("cta");

const drop_btn = document.querySelector(".drop-btn");
const userAvatar = document.getElementsByClassName("user-avatar")[0];
const menu_wrapper = document.querySelector(".wrapper");
const menu_bar = document.querySelector(".menu-bar");
const setting_drop = document.querySelector(".setting-drop");
const help_drop = document.querySelector(".help-drop");
const setting_item = document.querySelector(".setting-item");
const help_item = document.querySelector(".help-item");
const setting_btn = document.querySelector(".back-setting-btn");
const help_btn = document.querySelector(".back-help-btn");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].style.width = "auto + 50px";
}

$.getJSON(`/api/user/${session.username}`).done((data) => {
  if (data.avatar) userAvatar.src = data.avatar;
})

drop_btn.onclick = (()=>{
  menu_wrapper.classList.toggle("show");
  if (!menu_wrapper.classList.contains("show")) {
    menu_bar.style.marginLeft = "0px";
    setting_drop.style.display = "none";
  }
});
setting_item.onclick = (()=>{
  menu_bar.style.marginLeft = "-350px";
  setTimeout(()=>{
    setting_drop.style.display = "block";
  }, 100);
});
setting_btn.onclick = (()=>{
  menu_bar.style.marginLeft = "0px";
  setting_drop.style.display = "none";
});