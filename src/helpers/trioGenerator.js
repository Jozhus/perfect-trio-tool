function* generateNextTrio(input, halfPool, max, verbose) {
    const good = []
    const dontCares = [...new Set(input.join('').split(''))].filter(n => !halfPool.includes(n));
    input = input.filter(l => !l.split('').every(el => dontCares.includes(el)));

    function* subset(arr, pool, memo) {
        memo = memo || [];

        for (var l of arr) {
            const solution = memo.concat(l);
            let localPool = pool;
            l.split('').forEach(num => localPool = localPool.replace(new RegExp(`${num}`), ''));
            if (verbose) console.log(solution);

            if (localPool.length === 0 && solution.length <= max && good.every(sol => sol.sort().join('') !== solution.sort().join(''))) {
                good.push(solution);
                yield solution;
            }

            yield* subset(arr.filter(el => el[0] !== l[0] && el.split('').every(ell => localPool.concat(dontCares).includes(ell))), localPool, solution);
        }
    }

    yield* subset([...new Set(input)], halfPool + halfPool);
}

export { generateNextTrio };