const senderUser = 'salem93'
const senderfisrtName = 'salem193'
const recieverUser = 'Hani93'
const recfisrtName = 'Hani193'


describe('Real World App Test Scenario for sending and recieving ',()=>{
 
  before(()=>{
    cy.clearCookies()
    cy.visit('/signin')  
  })

  context('Sign Up form Filling and Submission for sender',()=>{
   
    it('verify navigation to signup page',()=>{
      cy.get('a[data-test="signup"]').click()
      cy.url().should('include','signup')
      
    })

    it('verify the signup button is disable when feilds are empty',()=>{
      cy.get('h1[data-test="signup-title"]').click()
      cy.get('button[data-test="signup-submit"]').should('be.disabled')
    })

    it('verify filling and submission signup form',()=>{    
      cy.SignUpSubmission(`${senderfisrtName}`,'sender',`${senderUser}`,'123456','123456')  
    }) 
        
  })


  context('Sign Up form Filling and Submission for reciever',()=>{
   
    it('verify navigation to signup page',()=>{
      cy.get('a[data-test="signup"]').click()
      cy.url().should('include','signup')      
    })

    it('verify the signup button is disable when feilds are empty',()=>{
      cy.get('h1[data-test="signup-title"]').click()
      cy.get('button[data-test="signup-submit"]').should('be.disabled')
    })

    it('verify signup fill and submit',()=>{
      cy.SignUpSubmission(`${recfisrtName}`,'reciever',`${recieverUser}`,'654321','654321')  
    }) 
        
  })


  context('Filling and Submission Sign In form for sender',()=>{
  
    it('verify navigation to signin page',()=>{
     // cy.get('a[data-test="signup"]').click()
     // cy.get('a[href="/signin"]').click()
      cy.url().should('include','signin') 
        
    })

    it('verify the signin button is disable when feilds are empty',()=>{
      cy.contains('Sign in').click()
      cy.get('[data-test=signin-submit]').should('be.disabled')
    })

    it('verify filling and submitting the signin form',()=>{     
      cy.SignInSubmission(`${senderUser}`,'123456')    
    })
           
  })


  context('Getting started for sender user',()=>{
    it('verify filling required feilds when first login',()=>{
      cy.FirstLogin('bankacc1','123456789','987655432')   
     // cy.wait(5000)    
    })

    it('verify first name and username in page',()=>{
      cy.get('[data-test="sidenav-user-full-name"]').should('contain',`${senderfisrtName}`)
      cy.get('[data-test="sidenav-username"]').should('contain',`${senderUser}`)
      cy.wait(2000)
      cy.get('[data-test=sidenav-signout]').click() 
      cy.SignInSubmission(`${senderUser}`,'123456')
    })

  })


  context('Create and send new transaction from sender user',()=>{
    it('verify clicking on new button',()=>{
      cy.get('a[data-test="nav-top-new-transaction"]').click()
      cy.url().should('include','transaction/new') 
    })

    it('verify searching and choosing the reciever',()=>{
      cy.get('#user-list-search-input').focus().type(`${recfisrtName}`).should('have.value',`${recfisrtName}`)
    // cy.get('ul[data-test="users-list"] li').first().should('exist').and('contain',`${recfisrtName}`).click({force: true})
     cy.get('ul[data-test="users-list"] li').should('exist').contains(`${recfisrtName}`).click({force: true})
    })

     it('verify the second step element is active ',()=>{
      cy.get(':nth-child(3) > .MuiStepLabel-root svg').should('have.class','MuiStepIcon-active')
    })

    it('verify the signin button is disable when feilds are empty',()=>{
      cy.get('[data-test="transaction-create-submit-request"]').should('be.disabled')
      cy.get('[data-test="transaction-create-submit-payment"]').should('be.disabled')      
    })

    it('verify filling the ammount and description feilds',()=>{
      //check the name of reciever
      cy.get('.MuiGrid-root h2').contains(`${recfisrtName}`)
      cy.get('#amount').focus().type('55').should('include.value','55')
      cy.get('#transaction-create-description-input').focus().type('this is test transaction')//.should('contain','transaction')
    })

    it('verify clicking the request button',()=>{
      cy.get('[data-test="transaction-create-submit-request"]').click()         
    })

    it('verify visibility of validation message',()=>{
      cy.get('.MuiAlert-message').should('be.visible')
     /* cy.wait(2000)
      cy.get('[data-test=new-transaction-return-to-transactions]').click() 
      cy.get('[data-test=nav-personal-tab]').click() 
      cy.get('div[data-test="transaction-list"] li').should('exist').contains(`${senderfisrtName}`).click({force: true})
      */
    })
    //msg: requested
  
    it('verify the third step element (complete) is active ',()=>{
      cy.get(':nth-child(3) > .MuiStepLabel-root svg').should('have.class','MuiStepIcon-active')
    })

    it('verify clicking on logout bitton',()=>{
      cy.get('[data-test=sidenav-signout]').click()     
    })
  })


  context('Filling and Submission Sign In form for reciever user',()=>{
    it('verify navigation to signin page',()=>{
      cy.url().should('include','signin') 
    })

    it('verify the signin button is disable when feilds are empty',()=>{
      cy.contains('Sign in').click()
      cy.get('[data-test=signin-submit]').should('be.disabled')
    })

    it('verify filling and submitting the signin form',()=>{   
      cy.SignInSubmission(`${recieverUser}`,'654321') 
    })
  })

  context('Getting started for reciever user',()=>{

    it('verify filling required feilds when first login',()=>{
      cy.FirstLogin('bankacc2','123433389','987777432')     
    })
     
    it('verify first name and username in page',()=>{
      cy.get('[data-test="sidenav-user-full-name"]').should('contain',`${recfisrtName}`)
      cy.get('[data-test="sidenav-username"]').should('contain',`${recieverUser}`)
    })

    it('verify the visibility of notifications',()=>{
      cy.get('[data-test=sidenav-signout]').click() 
      cy.SignInSubmission(`${recieverUser}`,'654321')
      cy.get('[data-test=nav-top-notifications-link]').click()
      cy.url().should('include','notifications')
      cy.get('span.MuiBadge-anchorOriginTopRightRectangle').contains('1')
      cy.get('ul[data-test="notifications-list"] li').first().should('exist').contains(`${senderfisrtName}`)
    })

    it('verify navigation to Mine transactions tab',()=>{
      cy.get('[data-test=sidenav-home]').click()
      cy.get('a[data-test=nav-personal-tab]').click()
            //check url
      cy.url().should('include','personal')
    })

    it('verify existence of received transactions',()=>{
      cy.get('div[data-test="transaction-list"] li').should('exist').contains(`${senderfisrtName}`).click({force: true})
      cy.get('[data-test="transaction-detail-header"]').should('exist').contains('Transaction Detail')
      cy.get('[data-test="transaction-detail-header"] + div div.MuiGrid-container').should('exist').contains(`${senderfisrtName}`)
      cy.get('[data-test^="transaction-amount"]').should('contain','55')
    })

     it('verify accepting the request',()=>{  
      cy.get('[data-test^="transaction-accept-request"]').click()
      cy.get('[data-test^=transaction-comment-input]').type('comment'+`{enter}`)
      //check commented on a transaction. notify (2)
    })

    it('verify clicking on logout bitton',()=>{
      cy.get('[data-test=sidenav-signout]').click()     
    })
    //check sender account balance changed
    //check another notify(2)
    //show in mine transaction
  })

  
 /* after(()=>{
   cy.clearCookies()
  })*/

})