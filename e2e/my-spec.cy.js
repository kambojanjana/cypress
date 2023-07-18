describe('Test Contact App', () => {
  beforeEach(() => {
    cy.visit('./contact_app.html')
  })

  it('should load the application correctly', () => {
    cy.get('h1.text-center').should('have.text', 'Contact List App');
    cy.get('table tbody tr').should('have.length', 1)
  })

  it('should add a contact to the list', () => {
    cy.get('input[placeholder="Name"]').type('John Doe');
    cy.get('input[placeholder="Phone"]').type('1234567890');
    cy.get('input[placeholder="Email"]').type('john@example.com');
    cy.get('button[name="add"]').click();
    cy.get('table tbody tr').should('have.length', 2);
  })

  
  it('should edit a contact in the list', () => {
    cy.get('input[placeholder="Name"]').type('John Doe');
    cy.get('input[placeholder="Phone"]').type('1234567890');
    cy.get('input[placeholder="Email"]').type('john@example.com');
    cy.get('button[name="add"]').click();
    cy.get('table tbody tr').should('have.length', 2);
  
    cy.get('table tbody tr:eq(1) .btn-info').click(); // Assuming the edit button has a CSS class 'btn-info'
    cy.get('table tbody tr:eq(1) input[type="text"]').eq(0).clear().type('Jane Doe');
    cy.get('table tbody tr:eq(1) input[type="text"]').eq(1).clear(); // Clear the phone field
    cy.get('table tbody tr:eq(1) input[type="text"]').eq(2).clear(); // Clear the email field
    cy.get('table tbody tr:eq(1) button[name="update"]').click();
  
    cy.get('table tbody tr:eq(1) td').eq(0).should('have.text', 'Jane Doe');
    cy.get('table tbody tr:eq(1) td').eq(1).should('have.text', ''); // Check for empty phone field
    cy.get('table tbody tr:eq(1) td').eq(2).should('have.text', ''); // Check for empty email field
  })
  it('should delete a contact from the list', () => {
    cy.get('input[placeholder="Name"]').type('John Doe');
    cy.get('input[placeholder="Phone"]').type('1234567890');
    cy.get('input[placeholder="Email"]').type('john@example.com');
    cy.get('button[name="add"]').click();
    cy.get('table tbody tr').should('have.length', 2);

    cy.get('table tbody tr:eq(1) button[name="delete"]').click();
    cy.get('table tbody tr').should('have.length', 1);
  })


  it('should clear input fields after adding a contact', () => {
    cy.get('input[placeholder="Name"]').type('John Doe');
    cy.get('input[placeholder="Phone"]').type('1234567890');
    cy.get('input[placeholder="Email"]').type('john@example.com');
    cy.get('button[name="add"]').click();
    cy.get('table tbody tr').should('have.length', 2);

    cy.get('input[placeholder="Name"]').should('have.value', '');
    cy.get('input[placeholder="Phone"]').should('have.value', '');
    cy.get('input[placeholder="Email"]').should('have.value', '');
  })


})
