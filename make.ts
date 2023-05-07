import * as icons from 'npm:simple-icons'

const promises: Array<Promise<void>> = []

try{
  await Deno.remove("./icons/", { recursive: true })
}catch{}
await Deno.mkdir("./icons/")

const iconsPaths: string[] = []

for(const [name,data] of Object.entries(icons)){
    const vue = `<template>${data.svg}</template>`
    await Deno.writeTextFile("./icons/"+data.slug+".vue",vue)
    iconsPaths.push([data.slug, `./icons/${data.slug}.vue`])
}
await Promise.all(promises)

const exports = iconsPaths.map(([name,path]) => `export { default as Icon${name[0].toUpperCase() + name.slice(1)} } from "${path}"`).join("\n")

await Deno.writeTextFile("./icons/index.ts",exports)
