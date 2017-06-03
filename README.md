window.fetch() vs. XMLHttpRequest benchmark
===========================================

This benchmark compares three different approaches to fetching and parsing a large JSON file:

- Using the window.fetch() API.
- Using the XMLHttpRequest object and a manual JSON.parse().
- Using the XMLHttpRequest object and setting responseType to "json".

**tl;dr:** If performance is critical, you're better off using XMLHttpRequest without setting the
responseType *for now*.

Results using Chrome 58 on Linux:

    useFetch x 5.25 ops/sec ±2.61% (30 runs sampled)
    useXhr x 7.29 ops/sec ±3.13% (37 runs sampled)
    useXhrWithResponseTypeJson x 4.82 ops/sec ±6.02% (27 runs sampled)

Results using Firefox 53 on Linux:

    useFetch x 9.99 ops/sec ±6.41% (48 runs sampled)
    useXhr x 8.84 ops/sec ±7.32% (43 runs sampled)
    useXhrWithResponseTypeJson x 5.72 ops/sec ±74.22% (39 runs sampled)

These results suggest that when it comes to performance, using XMLHttpRequest with responseType
set to "json" is never preferred. Combined with the fact that it's not supported on Internet
Explorer, I simply advise against setting responseType to retrieve parsed JSON.

Whether plain XMLHttpRequest or window.fetch() is faster depends on the browser. Using Firefox,
fetch() wins, whereas in Chrome XHR wins. The relative differences however (as well as market share)
suggest that your users are better off if you use the XHR object for now. If performance is not
really critical for your project however, I'd say the differences are small enough that it shouldn't
be the deciding factor.

Finally, it seems plausible that Chrome should be able to improve its performance with the fetch()
API. My expectation before running these benchmarks was that the fetch() API would be more
performant in both browsers. Because the fetch() API does not need to build an intermediate string
representation before parsing the JSON, it should theoretically be able to be faster. The results
seem to suggest that Firefox is already able to successfully take advantage of this, so it is my
hope Chrome too will step up its game and fetch() will be the universally better API in the future.

To run the benchmarks yourself: `npm install && npm start` or `yarn && yarn start`
