import { showNotification } from './index';
import toast from 'react-hot-toast';

jest.mock('react-hot-toast');

describe('showNotification', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows success notification with custom styles', () => {
    const text = 'Test success message';
    const type = 'success';

    showNotification(text, type);

    expect(toast).toHaveBeenCalledWith(text, {
      icon: '🚀',
      style: { backgroundColor: '#4CAF50', color: '#ffffff', padding: '16px' },
    });
  });

  it('shows warning notification with custom styles', () => {
    const text = 'Test warning message';
    const type = 'warning';

    showNotification(text, type);

    expect(toast).toHaveBeenCalledWith(text, {
      icon: '⚠️',
      style: { backgroundColor: '#fbc02d', color: '#000000', padding: '16px' },
    });
  });

  it('shows error notification with custom styles', () => {
    const text = 'Test error message';
    const type = 'error';

    showNotification(text, type);

    expect(toast).toHaveBeenCalledWith(text, {
      icon: '✖',
      style: { backgroundColor: '#f44336', color: '#ffffff', padding: '16px' },
    });
  });

});
