import { Student } from './student.entity';

describe('Student.Entity', () => {
  it('should be defined', () => {
    expect(new Student()).toBeDefined();
  });
});
