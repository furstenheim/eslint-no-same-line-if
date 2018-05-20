module.exports = {
  create (context) {
    const sourceCode = context.getSourceCode()
    return {
      Program () {
        sourceCode.tokensAndComments.forEach(function (leftToken, leftIndex, tokensAndComments) {
          if (leftIndex === tokensAndComments.length - 1) {
            return
          }
          const rightToken = tokensAndComments[ leftIndex + 1 ]

          // Search for if conditions that start just after a block
          if (
            !(
              leftToken.value === '}' &&
              rightToken.value === 'if' &&
              leftToken.loc.end.line === rightToken.loc.start.line
            )
          ) {
            return
          }

          context.report({
            node: rightToken,
            loc: rightToken.loc.start,
            message: 'if condition should start a new line.',
            fix: fixer => fixer.replaceTextRange([ leftToken.range[ 1 ], rightToken.range[ 0 ] ], '\n' + ' '.repeat(leftToken.loc.end.column - 1))
          })
        })
      }
    }
  }
}
