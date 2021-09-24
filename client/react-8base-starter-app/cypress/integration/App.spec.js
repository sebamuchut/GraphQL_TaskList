require('dotenv').config();
const { USER_EMAIL, USER_PASSWORD } = process.env

describe('App testing', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    }) 
    it('webpage renders', () => {
        cy.contains('Task')
    } )
    it('click on login button', () => {
        cy.contains('Login').click()
    } )
    it('User login', () => {
        cy.contains('Login').click()
        cy.get('[placeholder="Email"]').first().type('seba')
        cy.get('[placeholder="Password"]').last().type('123')
    } )
    it('Icorrect login', () => {
        cy.contains('Login').click()
        cy.get('[placeholder="Email"]').first().type('seba')
        cy.get('[placeholder="Password"]').last().type('123')
        cy.contains('Login').click()
        cy.wait(2000)
        cy.contains('Incorrect')

    } )
    it('Correct login', () => {
        cy.contains('Login').click()
        cy.get('[placeholder="Email"]').first().type(Cypress.env('USER_EMAIL'))
        cy.get('[placeholder="Password"]').last().type(Cypress.env('USER_PASSWORD'))
        cy.contains('Login').click()
        cy.wait(8000)
        cy.contains('Welcome')

    } )
    it('User Logout', () => {
        cy.get('[placeholder="Email"]').first().type(Cypress.env('USER_EMAIL'))
        cy.get('[placeholder="Password"]').last().type(Cypress.env('USER_PASSWORD'))
        cy.contains('Login').click()
        cy.wait(5000)
        cy.contains('Welcome')
        cy.contains('Logout').click()
        cy.contains('Login')
    } )
    it('Add new task', () => {
        cy.get('[placeholder="Email"]').first().type(Cypress.env('USER_EMAIL'))
        cy.get('[placeholder="Password"]').last().type(Cypress.env('USER_PASSWORD'))
        cy.contains('Login').click()
        cy.wait(5000)
        cy.contains('Welcome')
        cy.get('[placeholder="Add new task!"]').type('Testing').type('{enter}')
        cy.contains('Testing')
    })
})
