/**
 * There is a line of holes (count ranging from 4-100 randomly), with a gopher living under the hole.
 * 
 * Given the rules:
 * - you can only look into one hole at a time;
 * - if you did not see the gopher in the hole, the gopher will ALWAYS move to adjacent holes.
 * 
 * for example, there are 4 holes and gopher is living under hole index 2:
 *    Hole: 0 1 2 3
 *              G
 * 
 * you look into hole index 1, and you don't see the gopher.
 *    Hole: 0 [1] 2 3
 *                G
 * 
 * before you take the next look, gopher will move to either hole index 1 or 3.
 *    Hole: 0 1 2 3
 *            ?   ?
 * 
 * Your task is to write a catcher's algorithm to find the gopher.
 */

/**
 * Catcher's algorithm. 
 * @param {number} holesCount - Integer. Total hole counts.
 */
function* catcherAlgorithm(holesCount) {
    // yields the sequence of looking into the hole. 
    //
    // e.g 1 - if you wanted to look from first hole to last hole in sequence, do:
    // > for (let i=0; i<holesCount; i++)
    // >     yield i;
    //
    // e.g 2 - if you wanted to look into specific holes, you can do:
    // > yield 1;
    // > yield 2;
    // > yield 3;
}


/**
 * @private
 * function to simulate gopher movement and catcher's algorithm.
 */
function catchGopher() {
    const HOLES_COUNT = Math.max(4, Math.round(Math.random() * 100));  // 4 - 100 holes randomly.
    const INITIAL_POSITION = Math.min(Math.round(Math.random() * HOLES_COUNT), HOLES_COUNT - 1);
    
    function moveGopher(currentPosition) {
        if (currentPosition === (HOLES_COUNT - 1)) return currentPosition - 1;
        else if (currentPosition === 0) return currentPosition + 1;
        return (Math.random() > .5) ? currentPosition + 1 : currentPosition - 1;
    }

    const catcher = catcherAlgorithm(HOLES_COUNT);
    let gopherPosition = INITIAL_POSITION;
    for (let guessCount=1; guessCount < (HOLES_COUNT * 10); guessCount++) {
        const nextGuess = catcher.next().value;
        if (nextGuess === undefined)
            return {pass: false, holesCount: HOLES_COUNT, efficiency: -1};
        if (nextGuess === gopherPosition)
            return {pass: true, holesCount: HOLES_COUNT, efficiency: guessCount / HOLES_COUNT};  // normalize guess count to 0 ~ 1
        gopherPosition = moveGopher(gopherPosition);
    }
    return {pass: false, holesCount: HOLES_COUNT, efficiency: -1};
}

(function() {
    const SAMPLE_SIZE = 100000;
    let best = -1;
    let worst = -1;
    let averageSum = 0;
    for (let playCount=0; playCount < SAMPLE_SIZE; playCount++) {
        const {pass, holesCount, efficiency} = catchGopher();
        if (!pass) {
            console.log(`Inefficient algorithm, unable to catch Gopher reliably when holes count = ${holesCount}; succeed ${playCount} rounds.`);
            return false;
        }
        if (best === -1 || efficiency < best) 
            best = efficiency;
        if (worst === -1 || worst < efficiency)
            worst = efficiency
        averageSum += efficiency;
    }
    console.log(`Efficiency (1 = O(n), smaller value indicates better efficiency); Best: ${best}, Worst: ${worst}, Average: ${averageSum / SAMPLE_SIZE}`);
    return true;
})();
