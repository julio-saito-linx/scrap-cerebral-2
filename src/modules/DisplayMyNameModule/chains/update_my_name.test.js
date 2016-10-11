import { Controller } from 'cerebral';
import update_my_name from './update_my_name';

describe('update_my_name', () => {
  it('should change display_my_name.my_name', (done) => {
    const OLD_NAME = 'OLD_NAME';
    const NEW_NAME = 'NEW_NAME';
    const controller = Controller({
      state: {
        display_my_name: {
          my_name: OLD_NAME,
        }
      },
      signals: {
        testRun: [
          update_my_name
        ]
      },
    });

    // before
    expect(controller.getState()).toEqual({
      display_my_name: {
        my_name: OLD_NAME,
      }
    });

    // after
    const input = { value: NEW_NAME };
    controller.runTree.on('end', () => {
      expect(controller.getState()).toEqual({
        display_my_name: {
          my_name: NEW_NAME,
        }
      });
      done();
    });

    controller.getSignal('testRun')(input);
  })
});
