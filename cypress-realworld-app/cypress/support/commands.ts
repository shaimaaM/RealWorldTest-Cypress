// @ts-check
///<reference path="../global.d.ts" />

import { pick } from "lodash/fp";
import { format as formatDate } from "date-fns";
import { isMobile } from "./utils";

// Import Cypress Percy plugin command (https://docs.percy.io/docs/cypress)
import "@percy/cypress";

// Import commands for third-party auth providers
import "./auth-provider-commands/cognito";
import "./auth-provider-commands/auth0";
import "./auth-provider-commands/okta";

import "cypress-file-upload";
//My custom command

//My custom command
Cypress.Commands.add('SignUpSubmission',(FirstName,LastName,Username,Password,ConfirmPass)=>{
  //fill signup feilds
  cy.get('#firstName').type(FirstName).should('have.value',FirstName).and('be.focused')
  cy.get('#lastName').type(LastName).should('have.value',LastName).and('be.focused')
  cy.get('#username').type(Username).should('have.value', Username).and('be.focused')
  cy.get('#password').type(Password).should('be.focused').and('not.have.value', '')
  cy.get('#confirmPassword').type(ConfirmPass).should('be.focused').and('not.have.value', '')
  //click on submit button
  cy.get('button[data-test="signup-submit"]').click()
  cy.url().should('include','signin')
})


Cypress.Commands.add('SignInSubmission',(UserName,Password)=>{
   //fill signin feilds
  cy.get('#username').type(UserName).should('be.focused').and('have.value',UserName)
  cy.get('#password').type(Password).should('be.focused').and('not.have.value', '')
  //click on submit button
  cy.get('[data-test=signin-submit]').click()
  cy.url().should('contain', '/')
})

Cypress.Commands.add('FirstLogin',(BankName,RoutingNo,AccountNo)=>{
  //existence of modal
  cy.get('.MuiDialog-paper.MuiDialog-paperScrollPaper').should('exist').first().contains('Get Started with Real World App')
  //fill required feilds: BankAccountName , RoutingNo, AccountNunmber
  cy.get('[data-test=user-onboarding-next]').click()
  cy.get('#bankaccount-bankName-input').focus().type(BankName).should('have.value',BankName)
  cy.get('#bankaccount-routingNumber-input').focus().type(RoutingNo).should('have.value',RoutingNo)
  cy.get('#bankaccount-accountNumber-input').focus().type(AccountNo).should('have.value',AccountNo)
  cy.get('[data-test=bankaccount-submit]').click()
  cy.get('.MuiDialog-paper.MuiDialog-paperScrollPaper').should('exist').first().contains('Finished')
  cy.get('[data-test=user-onboarding-dialog-title]').should('exist').contains('Finished')
  cy.get('[data-test=user-onboarding-next]').click()
  //check title page
  //cy.get('[data-test=app-name-logo]').should('exist').contains('RealWorld')
  
})


