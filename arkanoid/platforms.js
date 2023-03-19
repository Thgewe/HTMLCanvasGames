import {Platform} from "./Platform.js";

export let platforms = []

export function destroy(platformToDestroy) {
    platforms = platforms.filter((platform) => {
        return platform !== platformToDestroy
    })
}

export function createPlatforms({width, height, gap, rows, cols, ctx}) {
    const amount = rows * cols;
    const newPlatforms = [];
    for (let i = 0; i < amount; i++) {
        newPlatforms.push(new Platform(
            i % cols * (width + gap) + gap,
            Math.floor(i / (cols)) * (height + gap) + gap,
            width,
            height,
            ctx
        ))
    }
    platforms = newPlatforms;
}