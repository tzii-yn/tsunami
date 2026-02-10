let RADIUS_X = 12
let HEIGHT_Y = 5
let RADIUS_Z = 15
let PAUSE = 4000 // milliseconds

let triggered = false // make sure tsunami only happens once

loops.forever(function () {
    let playerPos = player.position()

    // check if player is near the target coordinates
    if (!triggered && playerPos.getValue(Axis.X) >= 20 && playerPos.getValue(Axis.X) <= 30
        && playerPos.getValue(Axis.Z) >= 45 && playerPos.getValue(Axis.Z) <= 55) {

        triggered = true // prevent repeating

        // Retreat water
        blocks.fill(
            AIR,
            pos(playerPos.getValue(Axis.X) - RADIUS_X, playerPos.getValue(Axis.Y) - 1, playerPos.getValue(Axis.Z) - RADIUS_Z),
            pos(playerPos.getValue(Axis.X) + RADIUS_X, playerPos.getValue(Axis.Y) + HEIGHT_Y, playerPos.getValue(Axis.Z) + RADIUS_Z),
            FillOperation.Replace
        )

        loops.pause(PAUSE)

        // Return water
        blocks.fill(
            WATER,
            pos(playerPos.getValue(Axis.X) - RADIUS_X, playerPos.getValue(Axis.Y) - 1, playerPos.getValue(Axis.Z) - RADIUS_Z),
            pos(playerPos.getValue(Axis.X) + RADIUS_X, playerPos.getValue(Axis.Y) + HEIGHT_Y, playerPos.getValue(Axis.Z) + RADIUS_Z),
            FillOperation.Replace
        )
    }
})

player.onChat("checkWater", function () {
    let playerPos = player.position()
    let checkPos = pos(
        playerPos.getValue(Axis.X),
        playerPos.getValue(Axis.Y),
        playerPos.getValue(Axis.Z) + 2
    )

    // Save a temporary block
    blocks.fill(
        AIR,       // try replacing WATER with AIR
        checkPos,
        checkPos,
        FillOperation.Replace
    )

    // If the block was water, it is now AIR, so we can "detect"
    // Immediately restore it
    blocks.fill(
        WATER,
        checkPos,
        checkPos,
        FillOperation.Replace
    )

    player.say("Check complete (assumes WATER present if replaced).")
})