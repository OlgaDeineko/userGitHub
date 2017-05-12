# Myanswers
## Business purpose
Our product myanswers.io will be a web-based, simple and easy-to-use, highly-searchable, multilingual, multi-tenant knowledge base (KB) that will answer customers’ questions, without them having to email the customer service department. It can also be used to centrally access and manage organizational knowledge of employees. This product will be initially used within our own organisation. Once fully tested, it will be rolled out to our existing customers, and finally to new customers.
The end product is a commercial Software-as-a-Service product to be sold in Europe and the U.S. It will need to be integrated with an hosted search engine, an authentication service, a subscription management product, email notifications management software, an external mail provider and a payment gateway. It will also have eventually its own API, so customers can integrate our product with their applications.

## Install

- `clone` this repo
- `npm install` to install dependencies

## Run
```sh
npm run serve
```

## Build 
```sh
npm build
```

## Create components

```sh
npm run component -- --name ComponetnName --parent ComponentFolder
```

example: running `npm run component -- --name footer --parent common` creates a `footer` component at `client/app/common/footer`.

## File structure

```
client/
    app/
        common/             contains common components and directives
        components/         contains components (page)
        constants/          contains constants
        helpers/            contains helpers
        modals/             contains modal windows
        services/           contains services
        styles/             contains common styles
```
