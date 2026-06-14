/// <reference types="cypress" />
const  { faker }  =  require ( '@faker-js/faker' ) ;

const goalsM = require ( '../../modules/goals');

describe('Tests for goals api in Clickup', () => {

    it('Create and Delete a Goal with a random name, status code is 200', () => {
    
        // create a goal

          goalsM.createGoal()
          .then((response)=>{
            cy.wrap(response.body.goal.id).as('goalIdAlias')
            expect(response.status).to.eq(200)
            cy.log('The goals is created. Name is ' + response.body.goal.name)
          })

        // delete the goal

          cy.get('@goalIdAlias').then((goalId)=>{
              goalsM.deleteGoal(goalId)
              .then((response)=>{
                  expect(response.status).to.eq(200)
                  if(response.status === 200) {
                      cy.log('The goals is deleted')
                  }
                  else {
                      cy.log('Somthing is wrong.' + response.status)
                  }
              })
          })
    })


    it('Get goals, status code is 200', () => {

        //create 2 goals

          const count=2;

          Cypress._.times(count, (i) => {
              goalsM.createGoal()
              .then((response)=>{
                  expect(response.status).to.eq(200)
                  cy.log('The goals is created. Name is ' + response.body.goal.name)
                  cy.wrap(response.body.goal.name).as('goalNameAlias')
              })
          })

        //get goals

          cy.get('@goalNameAlias').then((goalName)=>{
              goalsM.getGoals()
              .then((response)=>{
                  expect(response.status).to.eq(200)
                  expect(response.body.goals[response.body.goals.length-1].name).to.eq(goalName)
                  cy.log('Goal has the correct name')

                  //delete all goals

                    cy.wrap(response.body.goals).each((goal)=>{
                        goalsM.deleteGoal(goal.id)
                    })
              })
          }) 
    })


  it('Update a goal name, status code is 200', () => {

    // create a goal

        goalsM.createGoal()
        .then((response)=>{
          cy.wrap(response.body.goal.id).as('goalIdAlias')
          expect(response.status).to.eq(200)
          cy.log('The goals is created. Id is ' + response.body.goal.id + ' Name is ' + response.body.goal.name)
        })

    //update name of the created goal
    
      cy.get('@goalIdAlias').then((goalId)=>{
        goalsM.updateGoal(goalId)
          .then((response) => {
            expect(response.status).to.eq(200)
            cy.get('@nameAlias').then((name)=>{
              expect(name).to.eq(response.body.goal.name)
              if(name === response.body.goal.name) {
                      cy.log('The goals contains the updated name: Id is ' + response.body.goal.id + ' Name is ' + response.body.name)
                  }
            })
          })

        //delete the goal
        
          goalsM.deleteGoal(goalId)
          .then((response)=>{
                  expect(response.status).to.eq(200)
                  if(response.status === 200) {
                      cy.log('The goals is deleted')
                  }
                  else {
                      cy.log('Somthing is wrong.' + response.status)
                  }
              })
      })
    })



  it('Get a goal info, status code is 200', () => {

      // create a goal
          goalsM.createGoal()
          .then((response)=>{
            cy.wrap(response.body.goal.id).as('goalIdAlias')
            cy.wrap(response.body.goal.name).as('goalNAlias')
            expect(response.status).to.eq(200)
            cy.log('The goals is created. Id is ' + response.body.goal.id + ' Name is ' + response.body.goal.name)
          })

      // get the goal info
          cy.get('@goalIdAlias').then((goalId)=>{
            cy.get('@goalNAlias').then((goalN)=>{

              goalsM.getGoalInfo(goalId)
              .then((response)=>{
                expect(response.status).to.eq(200)
                expect(response.body.goal.id).to.eq(goalId)
                cy.log('Goal contains correct ID: ' + response.body.goal.id)
                expect(response.body.goal.name).to.eq(goalN)
                cy.log('Goal contains correct name: ' + response.body.goal.name)
              })

              // delete the created goal
                goalsM.deleteGoal(goalId)
                .then((response)=>{
                  expect(response.status).to.eq(200)
                      if(response.status === 200) {
                          cy.log('The goals is deleted')
                      }
                      else {
                          cy.log('Somthing is wrong.' + response.status)
                      }
                })
            })
          })
  })

})