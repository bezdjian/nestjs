import { Course } from './courses.entity';

describe('Course Entity', () => {
  it('should be defined', () => {
    expect(new Course()).toBeDefined();
  });
});
