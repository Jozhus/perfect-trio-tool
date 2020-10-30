/**
 * Generator function that recursively brute-forces trios together until they create a perfect trio grouping.
 * Small optimizations to the inputs here and there to increase efficiency.
 * Overall, this is very dumb. Don't do this.
 * 
 * This breaks if the needed amount of skills goes into the double digits. This wouldn't be hard to fix, but whatever.
 * 
 * @param input An array of all trios.
 * @param need A list of skills that need to be maxed.
 * @param max Max amount of node slots to use.
 */
function* generateNextTrioGroup(input, need, max) {
    input = removeDuplicates(input).map(trio => trio.map(String));
    need = need.map(String);
    const seen = []
    // Get all the skills that were included, but not needed.
    const dontCares = [...new Set(input.join().split(','))].filter(n => !need.includes(n));
    // Get rid of all trios that contain only useless skills.
    input = input.filter(l => !l.every(el => dontCares.includes(el)));

    function* subset(arr, pool, memo) {
        memo = memo || [];

        for (var trio of arr) {
            const perfectGroup = [...memo, trio];
            let localPool = pool;
            // Get rid of skills that are already maxed from the pool of needed skills.
            trio.forEach(num => localPool = localPool.replace(new RegExp(`${num}`), ''));

            // A group is perfect IFF the pool of needed skills is exhausted. Make sure no duplicates ordered differently get added.
            if (localPool.length === 0 && perfectGroup.length <= max && seen.every(sol => sol.sort().join('') !== perfectGroup.sort().join(''))) {
                seen.push(perfectGroup);
                yield perfectGroup.map(trio => trio.map(num => parseInt(num)));
            }

            // Get rid of all trios that start with the same skill as the current trio and make sure every skill in each trio still needs to be maxed or is a useless skill. Recurse.
            yield* subset(arr.filter(el => el[0] !== trio[0] && el.every(ell => localPool.concat(dontCares).includes(ell))), localPool, perfectGroup);
        }
    }

    // Get rid of duplicate trios.
    yield* subset(removeDuplicates(input), need.concat(need).join(''));
}

function removeDuplicates(input) {
    const seen = [];

    return input.filter(trio => {
        const hasSeen = seen.some(saw => trio.join() === saw.join());

        if (!hasSeen) seen.push(trio);

        return !hasSeen;
    })
}

export { generateNextTrioGroup };