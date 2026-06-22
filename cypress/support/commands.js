// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Cypress.Commands.add('printMessage', (message) => {
//     cy.log(message)
// })

Cypress.Commands.add('sendRequest', (type, endpoint, body = null) => {
    cy.request({
        method: type,
        url: endpoint,
        headers: {
        'Authorization': 'pk_302569192_H8G5ELRN8N4VV08M4RN6DPKG52H52YHF'
        },
        body: body,
        failOnStatusCode: false
    })
})
