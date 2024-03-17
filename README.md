# COMPSCI 732 / SOFTENG 750 Lab 03

In this lab, we begin our exploration of the backend, introducing Node.js and Express. We also look at how to communicate between frontend and backend. Finally, we investigate the use of Service Workers to provide some offline functionality to our apps.

## Exercise One - A Pokédex API

In this exercise, we will build a simple API which will allow users to obtain a list of all pokémon names, and to query for a particular pokémon by id.

To begin, get [exercise-01](./exercise-01/)'s `backend` up and running (making sure to `npm install` dependencies first). When you do, you'll notice the following existing functionality:

- You can browse to any file within the `public` folder. For example, browsing to <http://localhost:3000/images/Dragonite.png> within your browser should display a picture of that pokémon. This is achieved through the use of `express.static` in `server.js` line 16.

- You can browse to <http://localhost:3000/api/hello>, which will result in the text "Hello, World" being displayed. The API routes are loaded in `server.js` line 12, and the route itself can be seen in `index.js` in the `routes` folder.

Now, let's add an aditional route to this backend. When the server receives a `GET` request to `/api/pokemon`, a JSON array should be returned. The array should contain objects of the form:

```json
{
  "id": 0,
  "name": "Missingno."
}
```

In other words, an array should be created and returned (using `res.json()`), consisting of a list of objects with the `id` and `name` properties of the pokémon objects which exist in the provided `pokemon` array. **Hint:** You can create such a list using a single line of code, involving the JavaScript array `map()` function.

Once you've created your new route handler for the above functionality, be sure to test it by browsing to <http://localhost:3000/api/pokemon> and ensuring that the correct data is received by the browser.

Once that's done, we'll now add an additional route. When the server receives a `GET` request to `/api/pokemon/:id`, where `:id` is a valid pokémon `id`, the full pokémon object in the `pokemonList` array with the matching `id` should be returned as JSON. If the `id` doesn't match, then instead a status code of `404` should be returned, with no content in the response body.

**Hints:** In Express, path params (also known as _path params_) can be accessed using the `req.params` object. Similarly to React Router 6 path params, they are always strings, so you may need to use e.g. `parseInt()` to convert to a number. If you want to send an error status code, you can use `res.sendStatus()`.

Now that's done, you should be able to view data for any pokémon by navigating to its `id`. For example, browsing to <http://localhost:3000/api/pokemon/149> will show Dragonite's data. If instead you attempt to navigate to an invalid `id` (e.g. <http://localhost:3000/api/pokemon/nope>), then a `404` error status will be returned to the browser. The default error text of "Not Found" will display, unless you have changed it.

## Exercise Two - Hooking up the frontend

In this exercise, we'll hook up a React frontend to the backend we've created in exercise one. Running [exercise-01](./exercise-01/)'s `frontend` project, we can see the skeleton of a Pokédex app similar to the one developed in a previous lab, except that the hardcoded pokémon data has been removed. We will instead load data from our backend.

Firstly, we will add functionality to our `PokemonList` component, located in `PokedexLayout.jsx` line 27. Currently, we can see that we are simply rendering a blank list. Our desired functionality is as follows:

1. When the component first renders, make a `GET` request to `${API_BASE_URL}/api/pokemon`.
2. Before we get a response back, continue to render an empty list as we have been.
3. If we get back a successful response, update our state so we're now rendering the list which was returned from the API.

**Hint:** Investigate the `useGet()` hook which is discussed in the lecture material. Consider adding it to your app and using it, rather than implementing this functionality from scratch. Axios has already been added as a dependency within the frontend.

**Hint 2:** In step 1 above, the const `API_BASE_URL` is loaded from the provided `.env` file as follows. We load this variable from an env file so that we can easily reconfigure our app to point to a different backend location if we need to:

```
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';
```

When you're done, assuming you have your backend up and running at the same time as your frontend, you should see the lefthand list populated with the list of pokémon returned from our API.

## Exercise Three - Continuing our hookup

Continuing on from exercise two, now let's make another API call to display the currently selected pokémon in the `PokedexPage` component.

Here, at the marked location within `PokedexPage.jsx` (line 11), make a `GET` request to `${API_BASE_URL}/api/pokemon/:id`, where `:id` is the `id` obtained from the path (remembering to get `API_BASE_URL` from the env file again). Have this component render different child components depending on the current status:

1. If we haven't yet received a response, render a `PokemonLoading` component, as we currently are.
2. If we have received a successful response, instead render a `PokedexEntry` component, supplying the pokémon data which we retrieved from our API.
3. If we have received an error response, instead render a `PokemonNotFound` component, supplying the `id` of the pokémon which we failed to retrieve.

**Hint:** If using `useGet()` as introduced in the material, you may need to add additional functionality to handle case 3. When doing so, information about [how Axios handles errors](https://axios-http.com/docs/handling_errors) may be relevant.

Once complete, clicking on any valid pokémon in our lefthand menu - or directly navigating to a valid id by typing one in the browser (valid ids are between 1 and 150, inclusive), a pokémon's page should be displayed. Or, if we try to navigate to an invalid id, our error page should be displayed.

## Exercise Four - POSTing data

In this exercise, we'll switch to a version of the Shop app which we also worked on during the previous lab. Currently, [`exercise-04](./exercise-04/)'s frontend is setup as a copy of the previous lab's model solution, except that it now gets its product data from the provided API (in the backend folder). There's also a new page - an "order history" page - which can be accessed by clicking the link on the homepage. Start by getting the frontend and backend working, playing around with it, and reading and understanding the code.

### Backend code

Next, we'll add a new API method (i.e. route handler) to our backend. Currently in `orders.js`, there's a single route handler - when we make a `GET` request to `/api/orders`, the orders list (which is currently just an empty array) will be returned.

We'll add a new API method, allowing users to add new orders. Specifically, when we receive a `POST` request to `/api/orders`, we will add the order contained in the request body to the `orders` list. The request body will be simply an array of product ids, e.g.:

```json
["1", "1", "3", "2", "4", "5"]
```

We can access this supplied array using `req.body`. We will then add a new object to the `orders` list as follows:

```js
{
    id: uuid(),
    order: req.body
}
```

Once we've added this to the list, we should return a `201` status (the HTTP status code for "created"). We should also include a Location header in the response, to be consistent with good REST principles. You can use the following:

```js
return res.status(201).location(`/api/orders/${id}`);
```

Where `id` is the id of the newly created order.

### Frontend code

Now that we have our new backend code, let's modify our frontend.

To begin, go to `OrdersPage`, and modify this component so that it gets its data with a `GET` request to `/api/orders`, rather than the provided dummy data.

Next, go to `CheckoutPage`. Here, modify the `handlePay()` function so that it does the following:

1. Send a `POST` request to `/api/orders`, supplying the user's `cart` as the request body (remembering that the user's cart can be obtained from app contenxt).
2. If we get a successful response, clear the shopping cart then redirect the user to the orders page. They should see their new order.
3. If the response is not successful, instead, don't clear the cart, and display an error message.
