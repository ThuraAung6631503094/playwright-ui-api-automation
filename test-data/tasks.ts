
export const taskData = {
  valid: {
    title: 'Prepare QA internship portfolio',
    completed: false
  },

  updated: {
    title: 'Complete QA automation portfolio',
    completed: true
  },

  invalid: {
    emptyTitle: '',
    whitespaceTitle: '   ',
    numericTitle: 12345,
    tooLongTitle: 'A'.repeat(101)
  }
};
