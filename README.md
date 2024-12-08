# Traveling Salesperson Problem -- Local Search

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The 2-opt algorithm for solving the Traveling Salesperson Problem is a
randomized local search algorithm that, at each iteration, reverses part of the
route. It starts with a random route (this is the randomized part), and changes
part of the route in each step (this is the local search part, sprinkled with
more randomness). The pseudocode for one iteration is as follows:

```javascript
2optSwap(route, i, k)
  cities 1 to i-1 stay in the order they are
  cities i to k are reversed
  cities k + 1 to n stay in the order they are
```

For example, if I call the above function with route A--B--C--D--E--F, $i=2$,
$k=4$, the resulting route is A--B--E--D--C--F.

The algorithm starts with a random route; if the new route at the end of an
iteration decreases the total length, it is retained as the current incumbent.
The incumbent after the final iteration is returned as the solution.

Implement the 2-opt algorithm, which repeatedly runs the above steps. Your
implementation needs to fix two design parameters that I have left open. First,
you need to design a stopping criterion -- when would it make sense to stop and
return the shortest route found so far rather than trying another iteration?
Second, design a way to choose $i$ and $k$ -- note that they need to be
different in subsequent iterations, as one iteration would simply undo what
the previous one did otherwise. Start with the template I provided in `code.js`.
Describe in your code how you designed your stopping criterion and ways of
choosing $i$ and $k$ and why.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.

#### Stoping Criterion:
The stopping criterion I choose is n * n where n is the number of cities in the given distance_matrix. This ensures that as the matrix gets bigger the stopping criterion is increased to find the best route. while going through the iterations the code checks if there is any improvment in the route found so far. If there is improvement it updates the best route and sets the current route to it. if no improvment found it only sets the new route to be current route and continues through the iterations

#### Choosing i and k:
I choose to select i randomly between 0 and (distance_matrix.length - 1) and k is choosen randomly ensuring that it is greater than i so we dont end up making the same swapped list again.

## Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.


The worst case time complexity for the code I did is $O(n^3)$. This is because the outer loop runs a maximum of $n * n$ iterations and the calculateRoute is called in each iteration which takes about n time complexity. Together the total time complexity is $O(n^3)$

The worst case memory complexity for the code implemented is $O(n)$. This is because bestroute, currentroute, newroute all are arrays of size n, which are stored until we find the best route. In total they add up to 3n. Asymptotically we ignore constants. So the total worst-case memory complexity is $O(n)$ 


References Used:

Pseudocode provided in the question was very helpful in getting started. I was able to figure most of the helper functions like genraterandom, calculateRoute, twooptswap. The main part of the code was also easy, however I struggled in handling the edge cases where the tests ran forever.

I looked at the following repo to get help with the edge cases: I used this repo to write my edge cases. In the repo the person tested for an empty graph, a  graph with one enter, and a graph with all zeroes.  I think that we do not need to do anything for graphs with all zeroes because this can be easily done by running the rest of the code. Whereas the empty graph or the graph with one entry would need to be checked before going through the code

tsp-local-search-swilso59

The following repo helped me handle the stopping criterion. I originally used having max iterations until no improvement was found. But this made the test run forever. I used the idea of var numOfIterations=length*length from the below repository. I originally started by having the code run through only about 10 iterations instead of using the size of the matrix given. This leads the code to run forever for the values like a matrix that is only a 2 x 2 which should at most run for 4 iterations. My original code tried to run that for 10 iterations even though there was no need which took forever.

tsp-local-search-ClaytonBrown4741

I have also used ChatGPT to help me figure out where I messed up for some of the tries I did where I made a silly mistake calling the calculateRoute function without the distance_matrix being passed to it

I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice
