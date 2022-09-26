describe("vortex topup flow", () => {
  it("user will process topup", () => {
    //User will visit the app
    cy.visit("http://localhost:8000/")
    //User will click load service
    cy.get(":nth-child(5) > :nth-child(2) > a > img").click()

    //User will wait for the loading to finish

    //Select brand to topup e.g. smart
    cy.get(
      ":nth-child(2) > .MuiButtonBase-root > .lazy-load-image-background > img"
    ).click()
    //Select brand products
    cy.get(".css-0 > :nth-child(3) > :nth-child(2)").click()
    //User will type his/her account number
    cy.get(".MuiInput-input").type(639273342196)
    //User will clicked on continue
    cy.get(".css-13f3otb-MuiStack-root > .MuiButton-root").click()

    //If user didn't login it will show the login screen

    //user will input email
    cy.get(
      ":nth-child(1) > .MuiGrid-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input"
    ).type("markjoseultra@gmail.com")
    //user will input password
    cy.get(
      ":nth-child(2) > .MuiGrid-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input"
    ).type("Sparkle1234")
    //user will press login
    cy.get("form > .MuiButton-text").click()
    //user will confirm the dialog button
    cy.get('[style="margin: 10px;"] > .MuiButtonBase-root').click()

    //if user already logged in it will show the payment method page

    //user will type the card number
    cy.get(
      ":nth-child(1) > .MuiOutlinedInput-root > .MuiOutlinedInput-input"
    ).type(4120000000000007)

    //user will type the expiration date
    cy.get(
      ":nth-child(2) > .MuiOutlinedInput-root > .MuiOutlinedInput-input"
    ).type(1129)

    //user will type the cvc
    cy.get(
      ":nth-child(3) > .MuiOutlinedInput-root > .MuiOutlinedInput-input"
    ).type(313)

    //user will click on next
    cy.get(".MuiBox-root > div > .MuiButton-root").click()

    //user will type the city
    cy.get(
      ":nth-child(5) > .MuiOutlinedInput-root > .MuiOutlinedInput-input"
    ).type("Manila")

    //user will type the state
    cy.get(
      ":nth-child(6) > .MuiOutlinedInput-root > .MuiOutlinedInput-input"
    ).type("Metro Manila")

    //user will type zipcode
    cy.get(
      ":nth-child(7) > .MuiOutlinedInput-root > .MuiOutlinedInput-input"
    ).type("1008")

    //user will click the continue button
    cy.get(".MuiBox-root > div > .MuiButton-contained").click()

    //user will click proceed payment
    cy.get(".css-ey9uir-MuiStack-root > :nth-child(2)").click()
  })
})
