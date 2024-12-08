function tsp_ls(distance_matrix) {
    var n = distance_matrix.length;

    // Base case where there is only one or less than one city
    if (n === 0 || !distance_matrix) {
        return 0; 
    }
    if (n === 1) {
        return 0; 
    }

    // Function for swapping elements between i and k in reverse order
    function twoOptSwap(route, i, k) {
        let newRoute = route.slice();
        let temp = newRoute.slice(i, k + 1).reverse();
        newRoute.splice(i, k - i + 1, ...temp);
        return newRoute;
    }

    // Calculates the route length
    function calculateRouteLength(route) {
        let length = 0;
        for (let i = 0; i < route.length - 1; i++) {
            length += distance_matrix[route[i]][route[i + 1]];
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
    let bestRoute = currentRoute; // Track the best route

    // Stopping criterion where no improvement is seen for a set number of iterations
    let noImprovementCount = 0;
    const maxNoImprovement = 10; 

    while (noImprovementCount < maxNoImprovement) {
        let i = Math.floor(Math.random() * n); // Randomly choose i
        let k = Math.floor(Math.random() * n); // Randomly choose k, ensuring k > i
        while (k <= i) {
            k = Math.floor(Math.random() * n); 
        }

        let newRoute = twoOptSwap(currentRoute, i, k); // Perform 2-opt swap
        if (calculateRouteLength(newRoute) < calculateRouteLength(currentRoute)) {
            currentRoute = newRoute;
            if (calculateRouteLength(currentRoute) < calculateRouteLength(bestRoute)) {
                bestRoute = currentRoute; // Update best route
                noImprovementCount = 0; // Reset count
            }
        } else {
            noImprovementCount++; // Increment count if no improvement
        }
    }

    return calculateRouteLength(bestRoute); // Return the length of the best route
}
