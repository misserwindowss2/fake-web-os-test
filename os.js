import {config} from "./config.js"
import * as UI from "./ui.js"

export const OS = {
  phoneName:"My Phone",
  speed:1,
  iconSize:64,
  radius:18
}

export const apps = [
  "Phone","Messaging","Browser","Camera",
  "Gallery","Calendar","Clock","Files"
]

export const screen = document.getElementById("screen")

export const wait = ms => new Promise(r=>setTimeout(r,ms))

export function applyTheme(){
  document.documentElement.style.setProperty("--speed",OS.speed)
  document.documentElement.style.setProperty("--icon",OS.iconSize+"px")
  document.documentElement.style.setProperty("--radius",OS.radius+"px")
}

UI.lock()