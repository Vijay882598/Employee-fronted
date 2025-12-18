import { PipesPipe } from './pipes.pipe';

describe('PipesPipe', () => {
  let pipe: PipesPipe;

  beforeEach(() => {
    pipe = new PipesPipe(); // Safe hai kyunki koi dependency nahi
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform "Admin" to "Administrator"', () => {
    expect(pipe.transform('Admin')).toBe('Administrator');
  });

  it('should transform "User" to "Regular User"', () => {
    expect(pipe.transform('User')).toBe('Regular User');
  });

  it('should return original value if not matched', () => {
    expect(pipe.transform('Manager')).toBe('Manager');
  });
});