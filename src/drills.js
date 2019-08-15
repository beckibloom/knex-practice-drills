const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
  connection: 'postgresql://dunder-mifflin@localhost/knex-practice'
})

// search for an item by name

const searchTerm = 'burger'

function searchForItem(searchTerm) {
  knexInstance
      .select('name', 'price', 'checked')
      .from('shopping_list')
      .where(
          'name', 'ILIKE', `%${searchTerm}`)
      .then(searchResult => {
          console.log({searchTerm}, {searchResult})
      })
}

// searchForItem(searchTerm)

// get all items paginated

const pageNumber = 2

function getItemsPaginated(pageNumber) {
  const productsPerPage = 6
  const offset = productsPerPage * (pageNumber - 1)
  knexInstance
    .select('name', 'price', 'checked')
    .from('shopping_list')
    .limit(productsPerPage)
    .offset(offset)
    .then(paginatedResult => {
        console.log({pageNumber},{paginatedResult})
  })
}

// getItemsPaginated(pageNumber)

// get all items added after date

const daysAgo = 3

function addedAfterDate(daysAgo) {
  knexInstance
    .select('name', 'price', 'checked', 'date_added')
    .where(
      'date_added',
      '>',
      knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
    )
    .from('shopping_list')
    .then(addedAfterResult => {
      console.log({daysAgo}, {addedAfterResult})
    })
}

// addedAfterDate(daysAgo)

function getTotalsByCategory() {
  knexInstance
    .select('category')
    .sum('price')
    .from('shopping_list')
    .groupBy('category')
    .then(pricesResults => {
      console.log(pricesResults)
    })
}

// getTotalsByCategory()