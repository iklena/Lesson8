const  { faker }  =  require ( '@faker-js/faker' ) ;

const teamId = 90121846530;

export function createGoal(){
     return cy.sendRequest('POST', `/team/${teamId}/goal`, {"name": faker.person.firstName() })
}


export function deleteGoal(goalId){
    return cy.sendRequest('DELETE', `/goal/${goalId}`)
}

export function updateGoal(goalId){
    const name = faker.person.firstName()
    cy.wrap(name).as('nameAlias')
    return cy.sendRequest('PUT', `/goal/${goalId}`, {"name": name})
}

export function getGoals(){
    return cy.sendRequest('GET', `/team/${teamId}/goal`)
}

export function getGoalInfo(goalId){
    return cy.sendRequest('GET', `/goal/${goalId}`)
}


// export function createGoalFromFile() {
//     return cy.fixture('example.json').then((body)=>{
//         body.name = faker.person.firstName()
//         return cy.sendRequest('POST', '/folder/90149614048/list', body)
//     })
// }
