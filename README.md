### Eslint: No same line if

This package prevents the following coding error:


    const b = 1
    if (b >= 1) {
      console.log('Greater than 1')
    } if (b >= 0) {
      console.log('Between 0 and 1')
    } else {
      console.log('Smaller than 0')
    }

Just a quick glance at the code might mistake the second if by an else if, which is not the case.
