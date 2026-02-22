import {OS, apps, screen, wait, applyTheme} from "./os.js"
import {config} from "./config.js"

export function lock(){
  screen.innerHTML = `
    <div class="screen" onclick="import('./ui.js').then(m=>m.unlock())">
      🔒 Tap to unlock
    </div>`
}

export async function unlock(){
  const el = document.querySelector(".screen")

  el.style.transform="scale(1.1)"
  await wait(120)

  el.style.transform="translateY(-100%)"
  await wait(600 * OS.speed)

  home()
}

export async function home(){

  applyTheme()

  screen.innerHTML = `
  <div class="screen">
    <div class="grid">
      ${apps.map((a,i)=>`
        <div class="icon"
         style="opacity:0;transform:scale(.8);transition-delay:${i*config.iconStagger}s"
         onclick="import('./ui.js').then(m=>m.openApp('${a}'))">${a}</div>
      `).join("")}

      <div class="icon"
       onclick="import('./ui.js').then(m=>m.settings())">⚙️</div>
    </div>
  </div>`

  await wait(50)

  document.querySelectorAll(".icon").forEach(i=>{
    i.style.opacity=1
    i.style.transform="scale(1)"
  })
}

export async function openApp(name){

  const icons = document.querySelectorAll(".icon")

  icons.forEach((i,idx)=>{
    i.style.transitionDelay = idx*config.iconStagger+"s"
    i.style.transform="scale(.7)"
    i.style.opacity=0
  })

  await wait(330 * OS.speed)

  screen.innerHTML += `
    <div class="screen">
      <div>
        <h2>${name}</h2>
        <button onclick="import('./ui.js').then(m=>m.home())">Close</button>
      </div>
    </div>`
}

export function settings(){
  screen.innerHTML = `
  <div class="screen">
    <button onclick="import('./ui.js').then(m=>m.about())">About phone</button>
    <button onclick="import('./ui.js').then(m=>m.anim())">Animations</button>
    <button onclick="import('./ui.js').then(m=>m.theme())">Theme</button>
    <button onclick="import('./ui.js').then(m=>m.home())">Back</button>
  </div>`
}

export function about(){
  screen.innerHTML = `
  <div class="screen">
    <img src="os.png" width="80"><br>
    <input value="${OS.phoneName}"
     oninput="OS.phoneName=this.value">
    <button onclick="import('./ui.js').then(m=>m.settings())">Back</button>
  </div>`
}

export function anim(){
  screen.innerHTML = `
  <div class="screen">
    Animation speed
    <input type="range" min="0.5" max="2" step="0.1"
     value="${OS.speed}"
     oninput="OS.speed=this.value;document.documentElement.style.setProperty('--speed',this.value)">
    <button onclick="import('./ui.js').then(m=>m.settings())">Back</button>
  </div>`
}

export function theme(){
  screen.innerHTML = `
  <div class="screen">
    Icon size
    <input type="range" min="48" max="100"
     value="${OS.iconSize}"
     oninput="OS.iconSize=this.value;applyTheme()">

    Radius
    <input type="range" min="0" max="30"
     value="${OS.radius}"
     oninput="OS.radius=this.value;applyTheme()">

    <button onclick="import('./ui.js').then(m=>m.settings())">Back</button>
  </div>`
}