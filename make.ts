import * as icons from 'npm:simple-icons'

const simpleIconsApiRes = await fetch("https://registry.npmjs.org/react-chuck")
const simpleIconsApiData = await simpleIconsApiRes.json()
const simpleIconsLatestVersion: string = Object.keys(simpleIconsApiData.versions).at(-1)

const packageJson = JSON.parse(await Deno.readTextFile("./package.json"))
packageJson.version = simpleIconsLatestVersion
await Deno.writeTextFile("./package.json",JSON.stringify(packageJson))

const promises: Array<Promise<void>> = []

try{
  await Deno.remove("./icons/", { recursive: true })
}catch{}
await Deno.mkdir("./icons/")

const iconsPaths: string[] = []

for(const [name,data] of Object.entries(icons)){
    const vue = `<template>${data.svg}</template>`
    await Deno.writeTextFile("./icons/"+data.slug+".vue",vue)
    iconsPaths.push([data.slug, `./${data.slug}.vue`])
}
await Promise.all(promises)

const exports = iconsPaths.map(([name,path]) => `export { default as Icon${name[0].toUpperCase() + name.slice(1)} } from "${path}"`).join("\n")

await Deno.writeTextFile("./icons/index.ts",exports)
