function tsp_ls(distance_matrix) {

    var n = distance_matrix.length
    //base case where there is only one or less than one city present, it returns 0
    if (!distance_matrix || n === 0) {
        return 0; 
    }

    if (n === 1) {
        return 0; 
    }

    if (distance_matrix.every(row => row.every(val => val === 0))) {
        return 0; 
    }

    // function for swapping the elements between i and k in reverse order
    function twoOptSwap(route, i, k) {
        let newRoute = route.slice();
        let temp = newRoute.slice(i, k + 1).reverse();
        newRoute.splice(i, k - i + 1, ...temp);
        return newRoute;
    }

    //calculates the route length in the given distanceMatrix
    function calculateRouteLength(route, distanceMatrix) {
        let length = 0;
        for (let i = 0; i < route.length - 1; i++) {
          length += distanceMatrix[route[i]][route[i + 1]];
        }
        return length;
      }

      // Generates a random route
    function generateRandomRoute() {
        let route = [];
        for (let i = 0; i < n; i++) {
            route.push(i);
        }

        // Shuffle the route randomly
        for (let i = route.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [route[i], route[j]] = [route[j], route[i]];
        }
        return route;
    }
 
    let currentRoute = generateRandomRoute(); // Initialize with a random route
    let bestRoute = currentRoute; // Keep track of the best route found so far

    // Stopping criterion where the code iterates until no improvement is seen for a set number of 10 iterations 
    let noImprovementCount = 0;
    //no more than 10 iterations to confirm no improvement
    const maxNoImprovement = 10; 

    while (noImprovementCount < maxNoImprovement) {
        let i = Math.floor(Math.random() * (n - 1)); // Randomly choose i
        let k = Math.floor(Math.random() * (n - 1)); // Randomly choose k, ensuring k > i
        while (k <= i) {
        k = Math.floor(Math.random() * (n - 1)); 
        }

        let newRoute = twoOptSwap(currentRoute, i, k); // Perform 2-opt swap
        if (calculateRouteLength(newRoute) < calculateRouteLength(currentRoute)) {
            currentRoute = newRoute;
            if (calculateRouteLength(currentRoute) < calculateRouteLength(bestRoute)) {
                bestRoute = currentRoute; // Update best route if necessary
                noImprovementCount = 0;
            }
        } else {
        noImprovementCount++; // Increment count if no improvement
        }
    }

    return calculateRouteLength(bestRoute); // Return the length of the best route
}


  


