## Curl commands

### Product

Create product

```bash
curl --location --request POST 'http://localhost:3000/dev/products' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "A new product",
    "color": "blue",
    "price": "99",
    "brandId": 1
}'
```

Get a product

```bash
curl --location --request GET 'http://localhost:3000/dev/products/1'
```

Delete a product

```bash
curl --location --request DELETE 'http://localhost:3000/dev/products/102'
```

Update a product

```bash
curl --location --request PUT 'http://localhost:3000/dev/products/2' \
--header 'Content-Type: text/plain' \
--data-raw '{
    "name": "A new product",
    "price": "99",
    "color": "yellow"
}'
```

List products

```bash
curl --location --request GET 'http://localhost:3000/dev/products'
```

Search products by name

```bash
curl --location --request GET 'http://localhost:3000/dev/products?search=Pizza'
```

Custom pagination

```bash
 curl --location --request GET 'http://localhost:3000/dev/products?page=2&pageSize=10'
```

Filter by colors

```bash
 curl --location --request GET 'http://localhost:3000/dev/products?color=red,blue'
```

Filter by brand

```bash
curl --location --request GET 'http://localhost:3001/dev/products?brand=dior'
```

### Activity logs

List activity log

```bash
curl --location --request GET 'http://localhost:3001/dev/activityLogs'
```

Create activity logs

```bash
curl --location --request POST 'http://localhost:3001/dev/activityLogs' \
--header 'Content-Type: application/json' \
--data-raw '{
    "type": "search",
    "searchTerm": "shoe"
}'
```
