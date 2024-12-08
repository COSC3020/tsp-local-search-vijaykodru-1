function tsp_ls(distance_matrix) {
    var n = distance_matrix.length;

    // Base case where there is only one or less than one city
    if (n === 0 || n === 1) {
        return 0; 
    }

    let currentRoute = generateRandomRoute(n); // Initialize with a random route
    let bestRoute = currentRoute; // Track the best route
    let currentLength = calculateRouteLength(currentRoute, distance_matrix);
    let bestLength = currentLength;

    const maxIterations = n * n;  // Limit iterations to prevent excessive runtime
    let iterations = 0;
    
    // Stopping criterion: no improvement for a set number of iterations
    while (iterations < maxIterations) {
        let i = Math.floor(Math.random() * (n - 1)); // Ensure i < n - 1
        let k = Math.floor(Math.random() * (n - i - 1)) + i + 1; // Ensure k > i

        let newRoute = twoOptSwap(currentRoute, i, k); // Perform 2-opt swap
        let newLength = calculateRouteLength(newRoute, distance_matrix);
        
        if (newLength < bestLength) {
            bestRoute = newRoute;
            bestLength = newLength;  // Update best route and best length
        }

        if (newLength < currentLength) {
            currentRoute = newRoute;
            currentLength = newLength;
        }

        iterations++;
    }

    return bestLength; // Return the length of the best route
}

// Function for swapping elements between i and k in reverse order
function twoOptSwap(route, i, k) {
    let newRoute = route.slice();
    let temp = newRoute.slice(i, k + 1).reverse();
    newRoute.splice(i, k - i + 1, ...temp);
    return newRoute;
}

// Calculates the route length
function calculateRouteLength(route, distance_matrix) {
    let length = 0;
    for (let i = 0; i < route.length - 1; i++) {
        length += distance_matrix[route[i]][route[i + 1]];
    }
    return length;
}

// Generates a random route for the given number of cities
function generateRandomRoute(n) {
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
