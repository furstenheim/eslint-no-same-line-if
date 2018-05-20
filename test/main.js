const {RuleTester} = require('eslint')
const rule = require('../index')
const ruleTester = new RuleTester()

ruleTester.run('no-same-line-if', rule, {
  valid: [
    `
      if (a) {
      
      }
      if (b) {
      }
    `,
    `
      if (a) {
      
      } else if (b) {
      }
    `,
    `
      if (a) {
      
      } else {
      }
    `,
    `
      function c () {
        if (a) {
        
        } else {
        }
      }
    `
  ],
  invalid: [
    invalid(
      `if (a) {
      
      } if (b) {
      
      }`,
      `if (a) {
      
      }
      if (b) {
      
      }`
    ),
    invalid(
      `if (a) {
      
      } else if (b) {
      
      } if (c) {
      }`,
      `if (a) {
      
      } else if (b) {
      
      }
      if (c) {
      }`
    ),
    invalid(
      `try {
      
      } catch (e) {
      
      } if (b) {
      
      }`,
      `try {
      
      } catch (e) {
      
      }
      if (b) {
      
      }`
    )
  ]

})

function invalid (code, output) {
  return {
    code,
    errors: [{message: 'if condition should start a new line.'}],
    output
  }
}
