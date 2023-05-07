import * as icons from 'npm:simple-icons'

const promises: Array<Promise<void>> = []

try{
  await Deno.remove("./icons/", { recursive: true })
}catch{}
await Deno.mkdir("./icons/")

const icons: string[] = []

for(const [name,data] of Object.entries(icons)){
  promises.push(async ()=>{
    const vue = `<template>${data.svg}</template>`
    await Deno.writeTextFile(data.slug+".vue",vue)
    icons.push(`./icons/${data.slug}.vue`)
  })
}
await Promise.all(promises)
console.log(icons)
